// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../libraries/ONBTMathLib.sol";
import "../libraries/ONBTSecurityLib.sol";

/**
 * @title ONBTUniversalLiquidityPool
 * @dev Universal AMM liquidity pool supporting ANY ERC20 token pair
 * 
 * Features:
 * - Support for any token pair (not limited to ONBT/ETH)
 * - Constant product formula (x * y = k)
 * - LP token minting for liquidity providers
 * - Advanced security with comprehensive checks
 * - Pausable for emergency situations
 * - Price oracle data for external integrations
 * - Configurable fees
 * - OnchainKit compatible for Base miniapp
 * 
 * Security:
 * - ReentrancyGuard on all state-changing functions
 * - SafeERC20 for all token transfers
 * - Pausable mechanism
 * - Address validation
 * - Slippage protection
 * - Deadline checks
 */
contract ONBTUniversalLiquidityPool is ERC20, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    using ONBTMathLib for uint256;
    using ONBTSecurityLib for address;
    
    // ============ State Variables ============
    
    /// @notice Token 0 (lexicographically smaller address)
    IERC20 public immutable token0;
    
    /// @notice Token 1 (lexicographically larger address)
    IERC20 public immutable token1;
    
    /// @notice Trading fee in basis points (30 = 0.3%)
    uint256 public feeBps = 30;
    
    /// @notice Maximum fee allowed (5% = 500 basis points)
    uint256 public constant MAX_FEE_BPS = 500;
    
    /// @notice Minimum liquidity locked forever
    uint256 public constant MINIMUM_LIQUIDITY = 1000;
    
    /// @notice Reserve of token0
    uint256 public reserve0;
    
    /// @notice Reserve of token1
    uint256 public reserve1;
    
    /// @notice Last block timestamp when reserves were updated
    uint256 public blockTimestampLast;
    
    /// @notice Cumulative price of token0 (for TWAP)
    uint256 public price0CumulativeLast;
    
    /// @notice Cumulative price of token1 (for TWAP)
    uint256 public price1CumulativeLast;
    
    /// @notice Protocol fee recipient
    address public feeRecipient;
    
    /// @notice Protocol fee share (1000 = 10% of trading fees)
    uint256 public protocolFeeShare = 1000;
    
    /// @notice Maximum protocol fee share (50% = 5000)
    uint256 public constant MAX_PROTOCOL_FEE_SHARE = 5000;
    
    /// @notice Accumulated protocol fees for token0
    uint256 public protocolFees0;
    
    /// @notice Accumulated protocol fees for token1
    uint256 public protocolFees1;
    
    // ============ Events ============
    
    event LiquidityAdded(
        address indexed provider,
        uint256 amount0,
        uint256 amount1,
        uint256 liquidity
    );
    
    event LiquidityRemoved(
        address indexed provider,
        uint256 amount0,
        uint256 amount1,
        uint256 liquidity
    );
    
    event Swap(
        address indexed user,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    
    event Sync(uint256 reserve0, uint256 reserve1);
    
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    
    event ProtocolFeeShareUpdated(uint256 oldShare, uint256 newShare);
    
    event ProtocolFeesCollected(
        address indexed recipient,
        uint256 amount0,
        uint256 amount1
    );
    
    // ============ Constructor ============
    
    /**
     * @notice Create a new universal liquidity pool
     * @param _token0 Address of first token
     * @param _token1 Address of second token
     * @param _feeRecipient Address to receive protocol fees
     */
    constructor(
        address _token0,
        address _token1,
        address _feeRecipient
    ) ERC20(
        string(abi.encodePacked("Universal LP: ", IERC20Metadata(_token0).symbol(), "-", IERC20Metadata(_token1).symbol())),
        string(abi.encodePacked(IERC20Metadata(_token0).symbol(), "-", IERC20Metadata(_token1).symbol(), "-LP"))
    ) {
        // Validate and sort tokens
        ONBTSecurityLib.validateTokenPair(_token0, _token1);
        (address sorted0, address sorted1) = ONBTSecurityLib.sortTokens(_token0, _token1);
        
        token0 = IERC20(sorted0);
        token1 = IERC20(sorted1);
        
        ONBTSecurityLib.requireValidAddress(_feeRecipient);
        feeRecipient = _feeRecipient;
        
        blockTimestampLast = block.timestamp;
    }
    
    // ============ Liquidity Functions ============
    
    /**
     * @notice Add liquidity to the pool
     * @param amount0Desired Desired amount of token0
     * @param amount1Desired Desired amount of token1
     * @param amount0Min Minimum amount of token0 (slippage protection)
     * @param amount1Min Minimum amount of token1 (slippage protection)
     * @param to Address to receive LP tokens
     * @param deadline Transaction deadline
     * @return liquidity Amount of LP tokens minted
     */
    function addLiquidity(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused returns (uint256 liquidity) {
        // Security checks
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        ONBTSecurityLib.requirePositiveAmount(amount0Desired);
        ONBTSecurityLib.requirePositiveAmount(amount1Desired);
        
        // Calculate optimal amounts
        (uint256 amount0, uint256 amount1) = _calculateOptimalAmounts(
            amount0Desired,
            amount1Desired,
            amount0Min,
            amount1Min
        );
        
        // Transfer tokens from user
        token0.safeTransferFrom(msg.sender, address(this), amount0);
        token1.safeTransferFrom(msg.sender, address(this), amount1);
        
        // Calculate liquidity tokens to mint
        liquidity = _mintLiquidity(to, amount0, amount1);
        
        // Update reserves and price accumulators
        _update(reserve0 + amount0, reserve1 + amount1);
        
        emit LiquidityAdded(msg.sender, amount0, amount1, liquidity);
    }
    
    /**
     * @notice Remove liquidity from the pool
     * @param liquidity Amount of LP tokens to burn
     * @param amount0Min Minimum amount of token0 to receive
     * @param amount1Min Minimum amount of token1 to receive
     * @param to Address to receive tokens
     * @param deadline Transaction deadline
     * @return amount0 Amount of token0 received
     * @return amount1 Amount of token1 received
     */
    function removeLiquidity(
        uint256 liquidity,
        uint256 amount0Min,
        uint256 amount1Min,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused returns (uint256 amount0, uint256 amount1) {
        // Security checks
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        ONBTSecurityLib.requirePositiveAmount(liquidity);
        
        // Calculate amounts to return using library
        (amount0, amount1) = ONBTMathLib.calculateRemoveLiquidity(
            liquidity,
            totalSupply(),
            reserve0,
            reserve1
        );
        
        // Check slippage
        ONBTSecurityLib.requireMinimumOutput(amount0, amount0Min);
        ONBTSecurityLib.requireMinimumOutput(amount1, amount1Min);
        
        // Burn LP tokens
        _burn(msg.sender, liquidity);
        
        // Transfer tokens to user
        token0.safeTransfer(to, amount0);
        token1.safeTransfer(to, amount1);
        
        // Update reserves
        _update(reserve0 - amount0, reserve1 - amount1);
        
        emit LiquidityRemoved(msg.sender, amount0, amount1, liquidity);
    }
    
    // ============ Swap Functions ============
    
    /**
     * @notice Swap tokens
     * @param amount0In Amount of token0 to swap in (0 if swapping token1)
     * @param amount1In Amount of token1 to swap in (0 if swapping token0)
     * @param amount0OutMin Minimum amount of token0 to receive
     * @param amount1OutMin Minimum amount of token1 to receive
     * @param to Address to receive output tokens
     * @param deadline Transaction deadline
     */
    function swap(
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0OutMin,
        uint256 amount1OutMin,
        address to,
        uint256 deadline
    ) external nonReentrant whenNotPaused {
        // Security checks
        ONBTSecurityLib.requireNotExpired(deadline);
        ONBTSecurityLib.requireValidAddress(to);
        require(amount0In > 0 || amount1In > 0, "Insufficient input amount");
        require(amount0In == 0 || amount1In == 0, "Only one input allowed");
        
        // Calculate output amounts
        uint256 amount0Out;
        uint256 amount1Out;
        
        if (amount0In > 0) {
            // Swapping token0 for token1
            amount1Out = ONBTMathLib.getAmountOut(amount0In, reserve0, reserve1, feeBps);
            ONBTSecurityLib.requireMinimumOutput(amount1Out, amount1OutMin);
            
            // Transfer token0 from user
            token0.safeTransferFrom(msg.sender, address(this), amount0In);
            
            // Calculate and collect protocol fee
            uint256 protocolFee = (amount1Out * protocolFeeShare) / 10000;
            protocolFees1 += protocolFee;
            amount1Out -= protocolFee;
            
            // Transfer token1 to user
            token1.safeTransfer(to, amount1Out);
            
            // Update reserves
            _update(reserve0 + amount0In, reserve1 - amount1Out - protocolFee);
        } else {
            // Swapping token1 for token0
            amount0Out = ONBTMathLib.getAmountOut(amount1In, reserve1, reserve0, feeBps);
            ONBTSecurityLib.requireMinimumOutput(amount0Out, amount0OutMin);
            
            // Transfer token1 from user
            token1.safeTransferFrom(msg.sender, address(this), amount1In);
            
            // Calculate and collect protocol fee
            uint256 protocolFee = (amount0Out * protocolFeeShare) / 10000;
            protocolFees0 += protocolFee;
            amount0Out -= protocolFee;
            
            // Transfer token0 to user
            token0.safeTransfer(to, amount0Out);
            
            // Update reserves
            _update(reserve0 - amount0Out - protocolFee, reserve1 + amount1In);
        }
        
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get current reserves
     */
    function getReserves() external view returns (
        uint256 _reserve0,
        uint256 _reserve1,
        uint256 _blockTimestampLast
    ) {
        return (reserve0, reserve1, blockTimestampLast);
    }
    
    /**
     * @notice Calculate output amount for a given input
     */
    function getAmountOut(
        uint256 amountIn,
        address tokenIn
    ) external view returns (uint256 amountOut) {
        require(tokenIn == address(token0) || tokenIn == address(token1), "Invalid token");
        
        if (tokenIn == address(token0)) {
            amountOut = ONBTMathLib.getAmountOut(amountIn, reserve0, reserve1, feeBps);
        } else {
            amountOut = ONBTMathLib.getAmountOut(amountIn, reserve1, reserve0, feeBps);
        }
    }
    
    /**
     * @notice Calculate input amount needed for desired output
     */
    function getAmountIn(
        uint256 amountOut,
        address tokenOut
    ) external view returns (uint256 amountIn) {
        require(tokenOut == address(token0) || tokenOut == address(token1), "Invalid token");
        
        if (tokenOut == address(token0)) {
            amountIn = ONBTMathLib.getAmountIn(amountOut, reserve1, reserve0, feeBps);
        } else {
            amountIn = ONBTMathLib.getAmountIn(amountOut, reserve0, reserve1, feeBps);
        }
    }
    
    /**
     * @notice Get price of token0 in terms of token1
     */
    function getPrice0() external view returns (uint256) {
        require(reserve0 > 0, "No liquidity");
        return (reserve1 * 1e18) / reserve0;
    }
    
    /**
     * @notice Get price of token1 in terms of token0
     */
    function getPrice1() external view returns (uint256) {
        require(reserve1 > 0, "No liquidity");
        return (reserve0 * 1e18) / reserve1;
    }
    
    /**
     * @notice Calculate price impact for a swap
     */
    function calculatePriceImpact(
        uint256 amountIn,
        address tokenIn
    ) external view returns (uint256 impact) {
        require(tokenIn == address(token0) || tokenIn == address(token1), "Invalid token");
        
        if (tokenIn == address(token0)) {
            impact = ONBTMathLib.calculatePriceImpact(amountIn, reserve0, reserve1);
        } else {
            impact = ONBTMathLib.calculatePriceImpact(amountIn, reserve1, reserve0);
        }
    }
    
    // ============ Internal Functions ============
    
    /**
     * @notice Calculate optimal amounts for adding liquidity
     */
    function _calculateOptimalAmounts(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min
    ) internal view returns (uint256 amount0, uint256 amount1) {
        if (reserve0 == 0 && reserve1 == 0) {
            // First liquidity provider
            (amount0, amount1) = (amount0Desired, amount1Desired);
        } else {
            // Calculate optimal ratio
            uint256 amount1Optimal = (amount0Desired * reserve1) / reserve0;
            
            if (amount1Optimal <= amount1Desired) {
                ONBTSecurityLib.requireMinimumOutput(amount1Optimal, amount1Min);
                (amount0, amount1) = (amount0Desired, amount1Optimal);
            } else {
                uint256 amount0Optimal = (amount1Desired * reserve0) / reserve1;
                ONBTSecurityLib.requireMinimumOutput(amount0Optimal, amount0Min);
                (amount0, amount1) = (amount0Optimal, amount1Desired);
            }
        }
    }
    
    /**
     * @notice Mint liquidity tokens
     */
    function _mintLiquidity(
        address to,
        uint256 amount0,
        uint256 amount1
    ) internal returns (uint256 liquidity) {
        uint256 _totalSupply = totalSupply();
        
        if (_totalSupply == 0) {
            // First liquidity provider
            liquidity = ONBTMathLib.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(1), MINIMUM_LIQUIDITY); // Lock minimum liquidity
        } else {
            // Subsequent liquidity providers
            liquidity = ONBTMathLib.min(
                (amount0 * _totalSupply) / reserve0,
                (amount1 * _totalSupply) / reserve1
            );
        }
        
        require(liquidity > 0, "Insufficient liquidity minted");
        _mint(to, liquidity);
    }
    
    /**
     * @notice Update reserves and price accumulators
     */
    function _update(uint256 balance0, uint256 balance1) private {
        uint256 blockTimestamp = block.timestamp;
        uint256 timeElapsed = blockTimestamp - blockTimestampLast;
        
        if (timeElapsed > 0 && reserve0 > 0 && reserve1 > 0) {
            // Update cumulative prices (for TWAP oracles)
            price0CumulativeLast += (reserve1 * 1e18 / reserve0) * timeElapsed;
            price1CumulativeLast += (reserve0 * 1e18 / reserve1) * timeElapsed;
        }
        
        reserve0 = balance0;
        reserve1 = balance1;
        blockTimestampLast = blockTimestamp;
        
        emit Sync(reserve0, reserve1);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update trading fee
     */
    function setFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= MAX_FEE_BPS, "Fee too high");
        uint256 oldFee = feeBps;
        feeBps = newFeeBps;
        emit FeeUpdated(oldFee, newFeeBps);
    }
    
    /**
     * @notice Update protocol fee share
     */
    function setProtocolFeeShare(uint256 newShare) external onlyOwner {
        require(newShare <= MAX_PROTOCOL_FEE_SHARE, "Share too high");
        uint256 oldShare = protocolFeeShare;
        protocolFeeShare = newShare;
        emit ProtocolFeeShareUpdated(oldShare, newShare);
    }
    
    /**
     * @notice Update fee recipient
     */
    function setFeeRecipient(address newRecipient) external onlyOwner {
        ONBTSecurityLib.requireValidAddress(newRecipient);
        feeRecipient = newRecipient;
    }
    
    /**
     * @notice Collect accumulated protocol fees
     */
    function collectProtocolFees() external onlyOwner {
        uint256 amount0 = protocolFees0;
        uint256 amount1 = protocolFees1;
        
        protocolFees0 = 0;
        protocolFees1 = 0;
        
        if (amount0 > 0) token0.safeTransfer(feeRecipient, amount0);
        if (amount1 > 0) token1.safeTransfer(feeRecipient, amount1);
        
        emit ProtocolFeesCollected(feeRecipient, amount0, amount1);
    }
    
    /**
     * @notice Pause the contract
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}

// Interface for getting token metadata
interface IERC20Metadata is IERC20 {
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}
