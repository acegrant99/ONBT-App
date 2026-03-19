// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// ============================================================
//  Flash-loan callback interfaces
// ============================================================

/// @notice Uniswap V2-style flash loan callback
interface IUniswapV2Callee {
    function uniswapV2Call(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external;
}

/// @notice Aerodrome / Velodrome / Solidly flash loan hook callback
interface IAerodromeCallee {
    function hook(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external;
}

// ============================================================
//  Uniswap V2 pair interface (composability layer)
// ============================================================

/**
 * @notice Minimal Uniswap V2 Pair interface.
 * Implementing this allows aggregators (1inch, Paraswap, etc.)
 * and routers to treat ONBTUniversalLiquidityPool as a standard
 * V2 pair with no adapter needed.
 */
interface IUniswapV2Pair {
    // ---- Token metadata ----
    function token0() external view returns (address);
    function token1() external view returns (address);

    // ---- Reserves ----
    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32  blockTimestampLast
        );

    // ---- TWAP accumulators ----
    function price0CumulativeLast() external view returns (uint256);
    function price1CumulativeLast() external view returns (uint256);

    // ---- LP token ----
    function totalSupply()           external view returns (uint256);
    function balanceOf(address)      external view returns (uint256);
    function allowance(address, address) external view returns (uint256);
    function approve(address, uint256)   external returns (bool);
    function transfer(address, uint256)  external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);

    // ---- Core AMM ----

    /**
     * @notice Uniswap V2-compatible swap with optional flash-loan data.
     * Sends tokens optimistically then verifies the invariant.
     * If data.length > 0, calls the callee hook before the invariant check.
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes   calldata data
    ) external;

    /**
     * @notice V2-style mint — caller deposits tokens first, then calls mint().
     */
    function mint(address to) external returns (uint256 liquidity);

    /**
     * @notice V2-style burn — caller sends LP tokens to pool first, then calls burn().
     */
    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    /**
     * @notice Transfer any balance above active reserves + fee escrows to `to`.
     */
    function skim(address to) external;

    /**
     * @notice Force reserves to match current net balances.
     */
    function sync() external;
}

// ============================================================
//  Extended IPool interface (Aerodrome / ONBT-specific)
// ============================================================

/**
 * @notice Full interface for ONBTUniversalLiquidityPool.
 *
 * Extends IUniswapV2Pair with:
 *   - stable/volatile curve selection
 *   - per-token decimal normalisation for stable math
 *   - dual fee escrow (protocol + LP-claimable)
 *   - Aerodrome-style LP fee index for continuous accrual
 *   - convenience swap with slippage + deadline
 *   - convenient add/remove liquidity with slippage + deadline
 */
interface IPool is IUniswapV2Pair {

    // ---- Curve type ----
    /// @notice true = StableSwap (x³y+xy³=k), false = constant-product (xy=k)
    function stable()    external view returns (bool);

    // ---- Decimal scale factors (used in stable curve math) ----
    function decimals0() external view returns (uint256); // 10 ** token0.decimals()
    function decimals1() external view returns (uint256); // 10 ** token1.decimals()

    // ---- Fee config ----
    function feeBps()            external view returns (uint256); // e.g. 30 = 0.3%
    function protocolFeeShare()  external view returns (uint256); // share going to protocol
    function feeRecipient()      external view returns (address);

    // ---- Active reserves (fee escrows excluded) ----
    function reserve0() external view returns (uint256);
    function reserve1() external view returns (uint256);

    // ---- LP fee index (Aerodrome-style continuous accrual) ----
    function index0()                          external view returns (uint256);
    function index1()                          external view returns (uint256);
    function supplyIndex0(address)             external view returns (uint256);
    function supplyIndex1(address)             external view returns (uint256);
    function claimable0(address)               external view returns (uint256);
    function claimable1(address)               external view returns (uint256);

    // ---- Fee escrows ----
    function protocolFees0() external view returns (uint256);
    function protocolFees1() external view returns (uint256);
    function lpFees0()        external view returns (uint256);
    function lpFees1()        external view returns (uint256);

    // ---- Fee queries ----
    /// @notice Total claimable LP fees for an account (accrued + pending delta)
    function pendingFees(address account)
        external
        view
        returns (uint256 claimable0_, uint256 claimable1_);

    // ---- Fee actions ----
    /// @notice Claim accrued LP fee share for msg.sender
    function claimFees() external returns (uint256 amount0, uint256 amount1);

    /// @notice Sweep accumulated protocol fees to feeRecipient (owner only)
    function collectProtocolFees() external;

    // ---- Convenience swap (slippage + deadline) ----
    function swapExactInput(
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0OutMin,
        uint256 amount1OutMin,
        address to,
        uint256 deadline
    ) external;

    // ---- Convenience liquidity management (slippage + deadline) ----
    function addLiquidity(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external returns (uint256 liquidity);

    function removeLiquidity(
        uint256 liquidity,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external returns (uint256 amount0, uint256 amount1);

    // ---- Price helpers ----
    function getAmountOut(uint256 amountIn, address tokenIn)  external view returns (uint256);
    function getAmountIn(uint256 amountOut, address tokenOut) external view returns (uint256);
    function calculatePriceImpact(uint256 amountIn, address tokenIn) external view returns (uint256);
}
