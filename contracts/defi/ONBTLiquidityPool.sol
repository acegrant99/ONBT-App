// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ONBTLiquidityPool
 * @dev Automated Market Maker (AMM) liquidity pool for ONBT/ETH pair
 * 
 * Features:
 * - Constant product formula (x * y = k)
 * - LP token minting for liquidity providers
 * - Swap functionality
 * - Fee collection (0.3%)
 * - OnchainKit compatible for Base miniapp
 */
contract ONBTLiquidityPool is ERC20, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ============ State Variables ============
    
    /// @notice The ONBT token
    IERC20 public immutable token0; // ONBT
    
    /// @notice ETH is represented as address(0) for simplicity
    /// In practice, WETH would be used
    
    /// @notice Fee percentage (30 = 0.3%)
    uint256 public constant FEE_PERCENT = 30;
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    /// @notice Minimum liquidity locked forever
    uint256 public constant MINIMUM_LIQUIDITY = 1000;
    
    /// @notice Reserve balances
    uint256 public reserve0; // ONBT reserve
    uint256 public reserve1; // ETH reserve
    
    /// @notice Protocol fee recipient
    address public feeRecipient;
    
    /// @notice Protocol fee share (10 = 0.1% of the 0.3% fee)
    uint256 public protocolFeeShare = 1000; // 10% of fees
    
    // ============ Events ============
    
    event LiquidityAdded(
        address indexed provider,
        uint256 token0Amount,
        uint256 token1Amount,
        uint256 liquidity
    );
    
    event LiquidityRemoved(
        address indexed provider,
        uint256 token0Amount,
        uint256 token1Amount,
        uint256 liquidity
    );
    
    event Swap(
        address indexed user,
        uint256 token0In,
        uint256 token1In,
        uint256 token0Out,
        uint256 token1Out
    );
    
    event Sync(uint256 reserve0, uint256 reserve1);
    
    // ============ Constructor ============
    
    constructor(
        address _token0,
        address _feeRecipient
    ) ERC20("ONBT-ETH LP", "ONBT-LP") {
        require(_token0 != address(0), "Invalid token address");
        require(_feeRecipient != address(0), "Invalid fee recipient");
        
        token0 = IERC20(_token0);
        feeRecipient = _feeRecipient;
    }
    
    // ============ Liquidity Functions ============
    
    /**
     * @notice Add liquidity to the pool
     * @param token0Amount Amount of ONBT to add
     * @return liquidity LP tokens minted
     */
    function addLiquidity(uint256 token0Amount) 
        external 
        payable 
        nonReentrant 
        returns (uint256 liquidity) 
    {
        require(token0Amount > 0 && msg.value > 0, "Invalid amounts");
        
        uint256 token1Amount = msg.value;
        
        // Transfer ONBT from user
        token0.safeTransferFrom(msg.sender, address(this), token0Amount);
        
        // Calculate liquidity tokens to mint
        uint256 totalSupply = totalSupply();
        
        if (totalSupply == 0) {
            // First liquidity provider
            liquidity = sqrt(token0Amount * token1Amount) - MINIMUM_LIQUIDITY;
            _mint(address(1), MINIMUM_LIQUIDITY); // Lock minimum liquidity
        } else {
            // Subsequent liquidity providers
            liquidity = min(
                (token0Amount * totalSupply) / reserve0,
                (token1Amount * totalSupply) / reserve1
            );
        }
        
        require(liquidity > 0, "Insufficient liquidity minted");
        
        _mint(msg.sender, liquidity);
        _update(reserve0 + token0Amount, reserve1 + token1Amount);
        
        emit LiquidityAdded(msg.sender, token0Amount, token1Amount, liquidity);
    }
    
    /**
     * @notice Remove liquidity from the pool
     * @param liquidity Amount of LP tokens to burn
     * @return amount0 Amount of ONBT returned
     * @return amount1 Amount of ETH returned
     */
    function removeLiquidity(uint256 liquidity) 
        external 
        nonReentrant 
        returns (uint256 amount0, uint256 amount1) 
    {
        require(liquidity > 0, "Invalid liquidity amount");
        
        uint256 totalSupply = totalSupply();
        
        // Calculate amounts to return
        amount0 = (liquidity * reserve0) / totalSupply;
        amount1 = (liquidity * reserve1) / totalSupply;
        
        require(amount0 > 0 && amount1 > 0, "Insufficient liquidity burned");
        
        // Burn LP tokens
        _burn(msg.sender, liquidity);
        
        // Transfer tokens back to user
        token0.safeTransfer(msg.sender, amount0);
        (bool success, ) = msg.sender.call{value: amount1}("");
        require(success, "ETH transfer failed");
        
        _update(reserve0 - amount0, reserve1 - amount1);
        
        emit LiquidityRemoved(msg.sender, amount0, amount1, liquidity);
    }
    
    // ============ Swap Functions ============
    
    /**
     * @notice Swap ONBT for ETH
     * @param token0Amount Amount of ONBT to swap
     * @param minToken1Out Minimum ETH to receive (slippage protection)
     * @return token1Out Amount of ETH received
     */
    function swapToken0ForToken1(uint256 token0Amount, uint256 minToken1Out) 
        external 
        nonReentrant 
        returns (uint256 token1Out) 
    {
        require(token0Amount > 0, "Invalid input amount");
        
        token1Out = getAmountOut(token0Amount, reserve0, reserve1);
        require(token1Out >= minToken1Out, "Insufficient output amount");
        
        // Transfer ONBT from user
        token0.safeTransferFrom(msg.sender, address(this), token0Amount);
        
        // Transfer ETH to user
        (bool success, ) = msg.sender.call{value: token1Out}("");
        require(success, "ETH transfer failed");
        
        _update(reserve0 + token0Amount, reserve1 - token1Out);
        
        emit Swap(msg.sender, token0Amount, 0, 0, token1Out);
    }
    
    /**
     * @notice Swap ETH for ONBT
     * @param minToken0Out Minimum ONBT to receive (slippage protection)
     * @return token0Out Amount of ONBT received
     */
    function swapToken1ForToken0(uint256 minToken0Out) 
        external 
        payable 
        nonReentrant 
        returns (uint256 token0Out) 
    {
        require(msg.value > 0, "Invalid input amount");
        
        token0Out = getAmountOut(msg.value, reserve1, reserve0);
        require(token0Out >= minToken0Out, "Insufficient output amount");
        
        // Transfer ONBT to user
        token0.safeTransfer(msg.sender, token0Out);
        
        _update(reserve0 - token0Out, reserve1 + msg.value);
        
        emit Swap(msg.sender, 0, msg.value, token0Out, 0);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Calculate output amount for a swap
     * @param amountIn Input amount
     * @param reserveIn Input token reserve
     * @param reserveOut Output token reserve
     * @return amountOut Output amount after fees
     */
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256 amountOut) {
        require(amountIn > 0, "Invalid input amount");
        require(reserveIn > 0 && reserveOut > 0, "Invalid reserves");
        
        // Calculate with 0.3% fee
        uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - FEE_PERCENT);
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;
        
        amountOut = numerator / denominator;
    }
    
    /**
     * @notice Get current reserves
     */
    function getReserves() external view returns (uint256, uint256) {
        return (reserve0, reserve1);
    }
    
    /**
     * @notice Calculate price of token0 in terms of token1
     */
    function getPrice0() external view returns (uint256) {
        require(reserve0 > 0, "No liquidity");
        return (reserve1 * 1e18) / reserve0;
    }
    
    /**
     * @notice Calculate price of token1 in terms of token0
     */
    function getPrice1() external view returns (uint256) {
        require(reserve1 > 0, "No liquidity");
        return (reserve0 * 1e18) / reserve1;
    }
    
    // ============ Internal Functions ============
    
    /**
     * @notice Update reserves
     */
    function _update(uint256 balance0, uint256 balance1) private {
        reserve0 = balance0;
        reserve1 = balance1;
        emit Sync(reserve0, reserve1);
    }
    
    /**
     * @notice Square root function (Babylonian method)
     */
    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
    
    /**
     * @notice Return minimum of two numbers
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Set fee recipient
     */
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid address");
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @notice Set protocol fee share
     */
    function setProtocolFeeShare(uint256 _share) external onlyOwner {
        require(_share <= 5000, "Fee too high"); // Max 50% of fees
        protocolFeeShare = _share;
    }
    
    /**
     * @notice Emergency withdrawal (only owner, for recovery)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance0 = token0.balanceOf(address(this));
        uint256 balance1 = address(this).balance;
        
        if (balance0 > 0) {
            token0.safeTransfer(owner(), balance0);
        }
        
        if (balance1 > 0) {
            (bool success, ) = owner().call{value: balance1}("");
            require(success, "ETH transfer failed");
        }
    }
    
    // ============ Receive ETH ============
    
    receive() external payable {}
}
