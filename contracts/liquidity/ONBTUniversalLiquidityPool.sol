// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../libraries/ONBTMathLib.sol";
import "../libraries/ONBTSecurityLib.sol";
import "./interfaces/ILiquidityPool.sol";

/**
 * @title ONBTUniversalLiquidityPool
 * @dev Universal AMM pool for any ERC20 pair.
 *
 * Implements the IPool interface which extends Uniswap V2 Pair for full
 * ecosystem composability (aggregators, routers, arbitrage bots).
 *
 * AMM curves
 * ----------
 * volatile (stable=false): constant-product  xy = k
 * stable   (stable=true):  StableSwap        xÂ³y + xyÂ³ = k  (Solidly/Aerodrome formula)
 *   The stable curve is far more capital-efficient for correlated pairs
 *   (e.g. USDC/USDT, ONBT/stONBT) because it maintains a near-flat price
 *   ratio until liquidity is depleted.
 *
 * Fee architecture  (Aerodrome-inspired)
 * -----------------
 * Trading fee (feeBps) is split into two portions, both excluded from reserves:
 *   protocolFee â†’ protocolFees0/1   (owner-claimable via collectProtocolFees)
 *   lpFee       â†’     lpFees0/1     (LP-claimable  via claimFees)
 *
 * LP fee accrual uses an index pattern:
 *   index0 += lpFee0 * PRECISION / totalSupply()
 *   claimable0[u] += balance[u] * (index0 - supplyIndex0[u]) / PRECISION
 *
 * Flash loans
 * -----------
 * The V2-style swap() supports flash loans via the `data` parameter.
 * Two callback interfaces are tried in order:
 *   1. IAerodromeCallee.hook()       (Aerodrome / Solidly ecosystem)
 *   2. IUniswapV2Callee.uniswapV2Call()  (Uniswap V2 ecosystem)
 *
 * Security
 * --------
 * - ReentrancyGuard on all state-changing functions
 * - SafeERC20 for all token operations
 * - Pausable for emergency stops
 * - Slippage + deadline on convenience functions
 * - Address validation via ONBTSecurityLib
 */
contract ONBTUniversalLiquidityPool is ERC20, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    using ONBTMathLib for uint256;
    using ONBTSecurityLib for address;

    // ============ Constants ============

    uint256 public constant PRECISION       = 1e18;
    uint256 public constant MINIMUM_LIQUIDITY    = 1000;
    uint256 public constant MAX_FEE_BPS          = 500;   // 5%
    uint256 public constant MAX_PROTOCOL_FEE_SHARE = 5000; // 50% of trading fee

    // ============ Immutables ============

    /// @notice Lexicographically smaller token
    IERC20 public immutable token0;
    /// @notice Lexicographically larger token
    IERC20 public immutable token1;

    /// @notice 10 ** token0.decimals()  â€” used for stable-curve normalisation
    uint256 public immutable decimals0;
    /// @notice 10 ** token1.decimals()  â€” used for stable-curve normalisation
    uint256 public immutable decimals1;

    /// @notice true  â†’ StableSwap invariant (xÂ³y + xyÂ³ = k)
    ///         false â†’ constant-product   (xy = k)
    bool public immutable stable;

    // ============ Mutable state ============

    uint256 public feeBps          = 30;   // 0.3%
    uint256 public protocolFeeShare = 1000; // 10% of fee
    address public feeRecipient;

    // Active reserves â€” exclude ALL fee balances
    uint256 public reserve0;
    uint256 public reserve1;

    // TWAP accumulators
    uint256 public blockTimestampLast;
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;

    // Protocol fee escrow (owner-claimable)
    uint256 public protocolFees0;
    uint256 public protocolFees1;

    // LP fee escrow (LP-claimable via index)
    uint256 public lpFees0;
    uint256 public lpFees1;

    // Aerodrome-style per-LP fee index
    uint256 public index0;  // cumulative fee0 per LP token (PRECISION basis)
    uint256 public index1;  // cumulative fee1 per LP token (PRECISION basis)
    mapping(address => uint256) public supplyIndex0;
    mapping(address => uint256) public supplyIndex1;
    mapping(address => uint256) public claimable0;
    mapping(address => uint256) public claimable1;

    // ============ Events ============

    event LiquidityAdded(address indexed provider, uint256 amount0, uint256 amount1, uint256 liquidity);
    event LiquidityRemoved(address indexed provider, uint256 amount0, uint256 amount1, uint256 liquidity);
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);
    event Sync(uint256 reserve0, uint256 reserve1);
    event Fees(address indexed sender, uint256 amount0, uint256 amount1);
    event Claim(address indexed provider, uint256 amount0, uint256 amount1);
    event ProtocolFeesCollected(address indexed recipient, uint256 amount0, uint256 amount1);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event ProtocolFeeShareUpdated(uint256 oldShare, uint256 newShare);

    // ============ Constructor ============

    constructor(
        address _token0,
        address _token1,
        address _feeRecipient,
        bool    _stable
    ) ERC20(
        string(abi.encodePacked(
            _stable ? "Stable LP: " : "vAMM LP: ",
            IERC20Metadata(_token0).symbol(), "-", IERC20Metadata(_token1).symbol()
        )),
        string(abi.encodePacked(
            IERC20Metadata(_token0).symbol(), "-", IERC20Metadata(_token1).symbol(), "-LP"
        ))
    ) {
        ONBTSecurityLib.validateTokenPair(_token0, _token1);
        (address sorted0, address sorted1) = ONBTSecurityLib.sortTokens(_token0, _token1);

        token0 = IERC20(sorted0);
        token1 = IERC20(sorted1);
        decimals0 = 10 ** IERC20Metadata(sorted0).decimals();
        decimals1 = 10 ** IERC20Metadata(sorted1).decimals();
        stable = _stable;

        ONBTSecurityLib.requireValidAddress(_feeRecipient);
        feeRecipient = _feeRecipient;
        blockTimestampLast = block.timestamp;
    }

    // ============ Liquidity (with slippage + deadline) ============

    function addLiquidity(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused returns (uint256 liquidity) {
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        ONBTSecurityLib.requirePositiveAmount(amount0Desired);
        ONBTSecurityLib.requirePositiveAmount(amount1Desired);

        (uint256 amount0, uint256 amount1) = _calculateOptimalAmounts(
            amount0Desired, amount1Desired, amount0Min, amount1Min
        );

        token0.safeTransferFrom(msg.sender, address(this), amount0);
        token1.safeTransferFrom(msg.sender, address(this), amount1);

        liquidity = _mintLiquidity(to, amount0, amount1);
        _update(reserve0 + amount0, reserve1 + amount1);

        emit LiquidityAdded(msg.sender, amount0, amount1, liquidity);
    }

    function removeLiquidity(
        uint256 liquidity,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused returns (uint256 amount0, uint256 amount1) {
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        ONBTSecurityLib.requirePositiveAmount(liquidity);

        (amount0, amount1) = ONBTMathLib.calculateRemoveLiquidity(
            liquidity, totalSupply(), reserve0, reserve1
        );
        ONBTSecurityLib.requireMinimumOutput(amount0, amount0Min);
        ONBTSecurityLib.requireMinimumOutput(amount1, amount1Min);

        _burn(msg.sender, liquidity);
        token0.safeTransfer(to, amount0);
        token1.safeTransfer(to, amount1);
        _update(reserve0 - amount0, reserve1 - amount1);

        emit LiquidityRemoved(msg.sender, amount0, amount1, liquidity);
    }

    // ============ Uniswap V2-compatible mint / burn ============

    /**
     * @notice V2-style mint: caller transfers tokens to the pool first,
     *         then calls mint() to receive LP tokens.
     */
    function mint(address to) external nonReentrant whenNotPaused returns (uint256 liquidity) {
        uint256 balance0 = token0.balanceOf(address(this)) - protocolFees0 - lpFees0;
        uint256 balance1 = token1.balanceOf(address(this)) - protocolFees1 - lpFees1;
        uint256 amount0  = balance0 - reserve0;
        uint256 amount1  = balance1 - reserve1;

        liquidity = _mintLiquidity(to, amount0, amount1);
        _update(balance0, balance1);

        emit LiquidityAdded(to, amount0, amount1, liquidity);
    }

    /**
     * @notice V2-style burn: caller transfers LP tokens to the pool first,
     *         then calls burn() to receive underlying tokens.
     */
    function burn(address to) external nonReentrant whenNotPaused returns (uint256 amount0, uint256 amount1) {
        uint256 liquidity = balanceOf(address(this));
        (amount0, amount1) = ONBTMathLib.calculateRemoveLiquidity(
            liquidity, totalSupply(), reserve0, reserve1
        );
        require(amount0 > 0 && amount1 > 0, "Insufficient liquidity burned");

        _burn(address(this), liquidity);
        token0.safeTransfer(to, amount0);
        token1.safeTransfer(to, amount1);

        uint256 b0 = token0.balanceOf(address(this)) - protocolFees0 - lpFees0;
        uint256 b1 = token1.balanceOf(address(this)) - protocolFees1 - lpFees1;
        _update(b0, b1);

        emit LiquidityRemoved(to, amount0, amount1, liquidity);
    }

    // ============ V2-compatible swap (+ flash loans) ============

    /**
     * @notice Uniswap V2-compatible optimistic swap with flash-loan support.
     *
     * Direct swap  (data.length == 0):
     *   1. Caller sends tokenIn to this contract.
     *   2. Calls swap(amountOut, 0, to, "").
     *   3. Pool verifies invariant holds and emits Swap.
     *
     * Flash loan  (data.length > 0):
     *   1. Pool sends requested tokens to `to`.
     *   2. Calls IUniswapV2Callee(to).uniswapV2Call() or IAerodromeCallee(to).hook().
     *   3. Callback must repay tokens + fee before returning.
     *   4. Pool checks invariant.
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external nonReentrant whenNotPaused {
        require(amount0Out > 0 || amount1Out > 0, "Insufficient output");
        require(amount0Out < reserve0 && amount1Out < reserve1, "Insufficient liquidity");
        ONBTSecurityLib.requireValidAddress(to);
        require(to != address(token0) && to != address(token1), "Invalid to");

        // Cache reserves
        uint256 _reserve0 = reserve0;
        uint256 _reserve1 = reserve1;
        // Total balances before (reserve + fee escrows)
        uint256 totalBefore0 = _reserve0 + protocolFees0 + lpFees0;
        uint256 totalBefore1 = _reserve1 + protocolFees1 + lpFees1;

        // Optimistic transfer
        if (amount0Out > 0) token0.safeTransfer(to, amount0Out);
        if (amount1Out > 0) token1.safeTransfer(to, amount1Out);

        // Flash-loan callback (try Aerodrome hook first, then V2)
        if (data.length > 0) {
            try IAerodromeCallee(to).hook(msg.sender, amount0Out, amount1Out, data) {}
            catch {
                IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
            }
        }

        // Observe actual balances (caller must have sent tokens by now)
        uint256 balance0 = token0.balanceOf(address(this));
        uint256 balance1 = token1.balanceOf(address(this));

        // Compute net amounts sent in
        uint256 amount0In = balance0 > totalBefore0 - amount0Out
            ? balance0 - (totalBefore0 - amount0Out) : 0;
        uint256 amount1In = balance1 > totalBefore1 - amount1Out
            ? balance1 - (totalBefore1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, "Insufficient input");

        // Distribute fees; returns new reserve values to check
        uint256 newReserve0 = _reserve0 - amount0Out;
        uint256 newReserve1 = _reserve1 - amount1Out;

        if (amount0In > 0) {
            (newReserve0,) = _applyFee(amount0In, newReserve0, true);
        }
        if (amount1In > 0) {
            (, newReserve1) = _applyFee(amount1In, newReserve1, false);
        }

        // Invariant check: net reserves must be at least as strong as before
        require(_k(newReserve0, newReserve1) >= _k(_reserve0, _reserve1), "K invariant violated");

        _update(newReserve0, newReserve1);

        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    // ============ Exact-input swap (deadline + slippage) ============

    function swapExactInput(
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0OutMin,
        uint256 amount1OutMin,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused {
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        require(amount0In > 0 || amount1In > 0, "Insufficient input");
        require(amount0In == 0 || amount1In == 0, "Only one input");

        uint256 amount0Out;
        uint256 amount1Out;

        if (amount0In > 0) {
            uint256 fee = (amount0In * feeBps) / 10000;
            uint256 inAfterFee = amount0In - fee;
            amount1Out = _getAmountOut(inAfterFee, reserve0, reserve1, true);
            ONBTSecurityLib.requireMinimumOutput(amount1Out, amount1OutMin);

            token0.safeTransferFrom(msg.sender, address(this), amount0In);
            _distributeFee(fee, true);
            token1.safeTransfer(to, amount1Out);
            _update(reserve0 + inAfterFee, reserve1 - amount1Out);
        } else {
            uint256 fee = (amount1In * feeBps) / 10000;
            uint256 inAfterFee = amount1In - fee;
            amount0Out = _getAmountOut(inAfterFee, reserve1, reserve0, false);
            ONBTSecurityLib.requireMinimumOutput(amount0Out, amount0OutMin);

            token1.safeTransferFrom(msg.sender, address(this), amount1In);
            _distributeFee(fee, false);
            token0.safeTransfer(to, amount0Out);
            _update(reserve0 - amount0Out, reserve1 + inAfterFee);
        }

        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    // ============ V2 sync helpers ============

    /**
     * @notice Skim surplus tokens (tokens sent directly, not via swap) to `to`.
     *         Reserves + fee escrows define the "owned" balance; anything above is excess.
     */
    function skim(address to) external nonReentrant {
        uint256 excess0 = token0.balanceOf(address(this)) - reserve0 - protocolFees0 - lpFees0;
        uint256 excess1 = token1.balanceOf(address(this)) - reserve1 - protocolFees1 - lpFees1;
        if (excess0 > 0) token0.safeTransfer(to, excess0);
        if (excess1 > 0) token1.safeTransfer(to, excess1);
    }

    /**
     * @notice Force reserves to match current net balances (excluding fee escrows).
     *         Useful after direct token transfers that should update the pool price.
     */
    function sync() external nonReentrant {
        _update(
            token0.balanceOf(address(this)) - protocolFees0 - lpFees0,
            token1.balanceOf(address(this)) - protocolFees1 - lpFees1
        );
    }

    // ============ Fee claiming ============

    /**
     * @notice Claim accrued LP fee share. Any LP token holder may call this.
     * Fees are distributed proportionally to LP token balance at the time of each swap.
     */
    function claimFees() external nonReentrant returns (uint256 c0, uint256 c1) {
        _updateFor(msg.sender);
        c0 = claimable0[msg.sender];
        c1 = claimable1[msg.sender];
        if (c0 > 0) {
            claimable0[msg.sender] = 0;
            lpFees0 -= c0;
            token0.safeTransfer(msg.sender, c0);
        }
        if (c1 > 0) {
            claimable1[msg.sender] = 0;
            lpFees1 -= c1;
            token1.safeTransfer(msg.sender, c1);
        }
        // Reserve unchanged: lpFees decrease equals balance decrease
        emit Claim(msg.sender, c0, c1);
    }

    /**
     * @notice Collect accumulated protocol fees. Owner only.
     */
    function collectProtocolFees() external onlyOwner nonReentrant {
        uint256 a0 = protocolFees0;
        uint256 a1 = protocolFees1;
        protocolFees0 = 0;
        protocolFees1 = 0;
        if (a0 > 0) token0.safeTransfer(feeRecipient, a0);
        if (a1 > 0) token1.safeTransfer(feeRecipient, a1);
        emit ProtocolFeesCollected(feeRecipient, a0, a1);
    }

    // ============ View functions ============

    /**
     * @notice Uniswap V2-compatible getReserves (returns uint112).
     * Reserves exclude fee escrows so the price reflects only active liquidity.
     */
    function getReserves()
        external
        view
        returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)
    {
        _reserve0 = uint112(reserve0);
        _reserve1 = uint112(reserve1);
        _blockTimestampLast = uint32(blockTimestampLast);
    }

    function getAmountOut(uint256 amountIn, address tokenIn)
        external
        view
        returns (uint256 amountOut)
    {
        require(tokenIn == address(token0) || tokenIn == address(token1), "Invalid token");
        uint256 inAfterFee = amountIn - (amountIn * feeBps) / 10000;
        if (tokenIn == address(token0)) {
            amountOut = _getAmountOut(inAfterFee, reserve0, reserve1, true);
        } else {
            amountOut = _getAmountOut(inAfterFee, reserve1, reserve0, false);
        }
    }

    function getAmountIn(uint256 amountOut, address tokenOut)
        external
        view
        returns (uint256 amountIn)
    {
        require(tokenOut == address(token0) || tokenOut == address(token1), "Invalid token");
        if (tokenOut == address(token0)) {
            amountIn = ONBTMathLib.getAmountIn(amountOut, reserve1, reserve0, feeBps);
        } else {
            amountIn = ONBTMathLib.getAmountIn(amountOut, reserve0, reserve1, feeBps);
        }
    }

    function getPrice0() external view returns (uint256) {
        require(reserve0 > 0, "No liquidity");
        return (reserve1 * PRECISION) / reserve0;
    }

    function getPrice1() external view returns (uint256) {
        require(reserve1 > 0, "No liquidity");
        return (reserve0 * PRECISION) / reserve1;
    }

    function calculatePriceImpact(uint256 amountIn, address tokenIn)
        external
        view
        returns (uint256 impact)
    {
        require(tokenIn == address(token0) || tokenIn == address(token1), "Invalid token");
        if (tokenIn == address(token0)) {
            impact = ONBTMathLib.calculatePriceImpact(amountIn, reserve0, reserve1);
        } else {
            impact = ONBTMathLib.calculatePriceImpact(amountIn, reserve1, reserve0);
        }
    }

    /**
     * @notice Total (accrued + already-materialised) LP fees for an account.
     */
    function pendingFees(address account)
        external
        view
        returns (uint256 _claimable0, uint256 _claimable1)
    {
        uint256 supply  = totalSupply();
        uint256 balance = balanceOf(account);
        uint256 pending0 = supply > 0
            ? (balance * (index0 - supplyIndex0[account])) / PRECISION : 0;
        uint256 pending1 = supply > 0
            ? (balance * (index1 - supplyIndex1[account])) / PRECISION : 0;
        _claimable0 = claimable0[account] + pending0;
        _claimable1 = claimable1[account] + pending1;
    }

    // ============ Internal: fee helpers ============

    /**
     * @notice Split `fee` into protocol + LP portions and update escrows + index.
     * @param fee    Total fee amount (already deducted from swap input).
     * @param isToken0  Which token the fee is denominated in.
     * Fees are placed entirely in escrow (protocolFees / lpFees); they never
     * enter the active reserves.
     */
    function _distributeFee(uint256 fee, bool isToken0) internal {
        uint256 protocolFee = (fee * protocolFeeShare) / 10000;
        uint256 lpFee       = fee - protocolFee;
        uint256 supply      = totalSupply();
        if (isToken0) {
            protocolFees0 += protocolFee;
            if (supply > 0 && lpFee > 0) {
                lpFees0  += lpFee;
                index0   += (lpFee * PRECISION) / supply;
                emit Fees(msg.sender, lpFee, 0);
            }
        } else {
            protocolFees1 += protocolFee;
            if (supply > 0 && lpFee > 0) {
                lpFees1  += lpFee;
                index1   += (lpFee * PRECISION) / supply;
                emit Fees(msg.sender, 0, lpFee);
            }
        }
    }

    /**
     * @notice Apply fee to an inbound amount in the V2 swap path.
     * @return newReserve0  Updated reserve0 (after adding net input if token0).
     * @return newReserve1  Updated reserve1 (after adding net input if token1).
     */
    function _applyFee(
        uint256 amountIn,
        uint256 existingReserve,
        bool    isToken0
    ) internal returns (uint256 newReserve0, uint256 newReserve1) {
        uint256 fee        = (amountIn * feeBps) / 10000;
        uint256 netIn      = amountIn - fee;
        _distributeFee(fee, isToken0);
        if (isToken0) {
            return (existingReserve + netIn, reserve1);
        } else {
            return (reserve0, existingReserve + netIn);
        }
    }

    /**
     * @notice Checkpoint LP fee index for an account before any balance change.
     */
    function _updateFor(address account) internal {
        uint256 _index0 = index0;
        uint256 _index1 = index1;
        uint256 balance = balanceOf(account);

        uint256 delta0 = _index0 - supplyIndex0[account];
        uint256 delta1 = _index1 - supplyIndex1[account];

        supplyIndex0[account] = _index0;
        supplyIndex1[account] = _index1;

        if (balance > 0) {
            claimable0[account] += (balance * delta0) / PRECISION;
            claimable1[account] += (balance * delta1) / PRECISION;
        }
    }

    /// @notice Called before every LP token transfer to checkpoint fee accrual.
    function _beforeTokenTransfer(address from, address to, uint256) internal override {
        if (from != address(0)) _updateFor(from);
        if (to   != address(0)) _updateFor(to);
    }

    // ============ Internal: AMM math ============

    function _getAmountOut(
        uint256 amountInAfterFee,
        uint256 reserveIn,
        uint256 reserveOut,
        bool    zeroForOne
    ) internal view returns (uint256) {
        if (stable) return _getAmountOutStable(amountInAfterFee, reserveIn, reserveOut, zeroForOne);
        // Volatile: standard xy=k formula (fee already deducted, pass 0 for internal fee)
        return ONBTMathLib.getAmountOut(amountInAfterFee, reserveIn, reserveOut, 0);
    }

    /**
     * @notice Newton's method solver for the stable-curve swap:
     *         Given x0 (new reserve after adding input) find y1 such that
     *         f(x0, y1) = k_old.  Returns output = y_old - y1.
     * @dev Normalises reserves to PRECISION before computing to handle
     *      tokens with different decimal places (e.g. USDC 6dec / ONBT 18dec).
     */
    function _getAmountOutStable(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut,
        bool    zeroForOne
    ) internal view returns (uint256) {
        (uint256 dIn, uint256 dOut) = zeroForOne
            ? (decimals0, decimals1)
            : (decimals1, decimals0);

        uint256 x  = (reserveIn  * PRECISION) / dIn;
        uint256 y  = (reserveOut * PRECISION) / dOut;
        uint256 k  = _fNorm(x, y);
        uint256 x0 = x + (amountIn * PRECISION) / dIn;
        uint256 y1 = _get_y(x0, k, y);

        return ((y - y1) * dOut) / PRECISION;
    }

    /**
     * @notice Invariant function: xy=k (volatile) or xÂ³y+xyÂ³=k (stable).
     * Both operands in raw reserve units.
     */
    function _k(uint256 x, uint256 y) internal view returns (uint256) {
        if (stable) {
            uint256 _x = (x * PRECISION) / decimals0;
            uint256 _y = (y * PRECISION) / decimals1;
            return _fNorm(_x, _y);
        }
        return x * y;
    }

    /// @notice f(x, y) = xÂ·yÂ·(xÂ² + yÂ²) / PRECISIONÂ³  (normalised stable invariant)
    function _fNorm(uint256 x, uint256 y) internal pure returns (uint256) {
        uint256 _a = (x * y) / PRECISION;                              // xÂ·y
        uint256 _b = ((x * x) / PRECISION) + ((y * y) / PRECISION);   // xÂ² + yÂ²
        return (_a * _b) / PRECISION;
    }

    /// @notice d/dy [f(x0, y)] for Newton's method
    function _dNorm(uint256 x0, uint256 y) internal pure returns (uint256) {
        // d/dy [x0Â·yÂ·(x0Â²+yÂ²)] = x0Â·(x0Â² + 3yÂ²)
        uint256 x0sq = (x0 * x0) / PRECISION;
        uint256 ysq3 = (3 * y * y) / PRECISION;
        return (x0 * (x0sq + ysq3)) / PRECISION;
    }

    /**
     * @notice Newton's method: find y1 such that f(x0, y1) = xy (the old k).
     * Converges in â‰¤ 255 iterations (typically <5 for normal price ranges).
     */
    function _get_y(uint256 x0, uint256 xy, uint256 y) internal pure returns (uint256) {
        for (uint256 i; i < 255; ++i) {
            uint256 k  = _fNorm(x0, y);
            uint256 d  = _dNorm(x0, y);
            uint256 dy;
            if (k < xy) {
                dy = ((xy - k) * PRECISION) / d;
                y += dy;
            } else {
                dy = ((k - xy) * PRECISION) / d;
                y -= dy;
            }
            if (dy <= 1) break;
        }
        return y;
    }

    // ============ Internal: liquidity math ============

    function _mintLiquidity(
        address to,
        uint256 amount0,
        uint256 amount1
    ) internal returns (uint256 liquidity) {
        uint256 supply = totalSupply();
        if (supply == 0) {
            liquidity = ONBTMathLib.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(1), MINIMUM_LIQUIDITY); // lock dead shares
        } else {
            liquidity = ONBTMathLib.min(
                (amount0 * supply) / reserve0,
                (amount1 * supply) / reserve1
            );
        }
        require(liquidity > 0, "Insufficient liquidity minted");
        _mint(to, liquidity);
    }

    function _calculateOptimalAmounts(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min
    ) internal view returns (uint256 amount0, uint256 amount1) {
        if (reserve0 == 0 && reserve1 == 0) {
            return (amount0Desired, amount1Desired);
        }
        uint256 amount1Optimal = (amount0Desired * reserve1) / reserve0;
        if (amount1Optimal <= amount1Desired) {
            ONBTSecurityLib.requireMinimumOutput(amount1Optimal, amount1Min);
            return (amount0Desired, amount1Optimal);
        }
        uint256 amount0Optimal = (amount1Desired * reserve0) / reserve1;
        ONBTSecurityLib.requireMinimumOutput(amount0Optimal, amount0Min);
        return (amount0Optimal, amount1Desired);
    }

    /// @notice Update reserves and TWAP accumulators.
    function _update(uint256 newReserve0, uint256 newReserve1) private {
        uint256 ts = block.timestamp;
        uint256 elapsed = ts - blockTimestampLast;
        if (elapsed > 0 && reserve0 > 0 && reserve1 > 0) {
            price0CumulativeLast += (reserve1 * PRECISION / reserve0) * elapsed;
            price1CumulativeLast += (reserve0 * PRECISION / reserve1) * elapsed;
        }
        reserve0 = newReserve0;
        reserve1 = newReserve1;
        blockTimestampLast = ts;
        emit Sync(reserve0, reserve1);
    }

    // ============ Admin ============

    function setFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= MAX_FEE_BPS, "Fee too high");
        uint256 old = feeBps;
        feeBps = newFeeBps;
        emit FeeUpdated(old, newFeeBps);
    }

    function setProtocolFeeShare(uint256 newShare) external onlyOwner {
        require(newShare <= MAX_PROTOCOL_FEE_SHARE, "Share too high");
        uint256 old = protocolFeeShare;
        protocolFeeShare = newShare;
        emit ProtocolFeeShareUpdated(old, newShare);
    }

    function setFeeRecipient(address newRecipient) external onlyOwner {
        ONBTSecurityLib.requireValidAddress(newRecipient);
        feeRecipient = newRecipient;
    }

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}

