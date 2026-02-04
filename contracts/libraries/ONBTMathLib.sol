// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title ONBTMathLib
 * @dev Advanced math library for DeFi calculations
 * 
 * Features:
 * - Safe arithmetic operations
 * - Fixed-point math (18 decimals)
 * - Square root calculations
 * - Percentage calculations
 * - Price impact calculations
 */
library ONBTMathLib {
    
    // ============ Constants ============
    
    uint256 private constant PRECISION = 1e18;
    uint256 private constant PERCENTAGE_PRECISION = 10000; // 0.01% precision
    
    // ============ Errors ============
    
    error DivisionByZero();
    error Overflow();
    error InvalidPercentage();
    
    // ============ Basic Math Functions ============
    
    /**
     * @notice Safely multiply two numbers with overflow check
     */
    function mulSafe(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        if (c / a != b) revert Overflow();
        return c;
    }
    
    /**
     * @notice Safely add two numbers with overflow check
     */
    function addSafe(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        if (c < a) revert Overflow();
        return c;
    }
    
    /**
     * @notice Safely subtract with underflow check
     */
    function subSafe(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "Underflow");
        return a - b;
    }
    
    // ============ Fixed Point Math ============
    
    /**
     * @notice Multiply two fixed-point numbers
     * @param a First number (18 decimals)
     * @param b Second number (18 decimals)
     * @return Result (18 decimals)
     */
    function mulFixed(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a * b) / PRECISION;
    }
    
    /**
     * @notice Divide two fixed-point numbers
     * @param a Numerator (18 decimals)
     * @param b Denominator (18 decimals)
     * @return Result (18 decimals)
     */
    function divFixed(uint256 a, uint256 b) internal pure returns (uint256) {
        if (b == 0) revert DivisionByZero();
        return (a * PRECISION) / b;
    }
    
    // ============ Square Root ============
    
    /**
     * @notice Calculate square root using Babylonian method
     * @param y Input number
     * @return z Square root
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
     * @notice Calculate square root for fixed-point number
     * @param y Input (18 decimals)
     * @return z Square root (18 decimals)
     */
    function sqrtFixed(uint256 y) internal pure returns (uint256 z) {
        if (y == 0) return 0;
        
        // Scale up for precision
        uint256 scaled = y * PRECISION;
        uint256 sqrtScaled = sqrt(scaled);
        
        return sqrtScaled;
    }
    
    // ============ Percentage Calculations ============
    
    /**
     * @notice Calculate percentage of a value
     * @param value The value to calculate percentage of
     * @param percentage Percentage in basis points (100 = 1%)
     * @return result The calculated percentage
     */
    function calculatePercentage(
        uint256 value,
        uint256 percentage
    ) internal pure returns (uint256 result) {
        if (percentage > PERCENTAGE_PRECISION) revert InvalidPercentage();
        return (value * percentage) / PERCENTAGE_PRECISION;
    }
    
    /**
     * @notice Calculate what percentage one value is of another
     * @param part The part value
     * @param whole The whole value
     * @return percentage in basis points
     */
    function calculatePercentageOf(
        uint256 part,
        uint256 whole
    ) internal pure returns (uint256 percentage) {
        if (whole == 0) revert DivisionByZero();
        return (part * PERCENTAGE_PRECISION) / whole;
    }
    
    // ============ Price Impact Calculations ============
    
    /**
     * @notice Calculate price impact of a swap
     * @param amountIn Amount being swapped in
     * @param reserveIn Reserve of input token
     * @param reserveOut Reserve of output token
     * @return impact Price impact in basis points
     */
    function calculatePriceImpact(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) internal pure returns (uint256 impact) {
        if (reserveIn == 0 || reserveOut == 0) return 0;
        
        // Price before = reserveOut / reserveIn
        uint256 priceBefore = divFixed(reserveOut, reserveIn);
        
        // Price after = (reserveOut - amountOut) / (reserveIn + amountIn)
        // Simplified: we can approximate impact as amountIn / (reserveIn + amountIn)
        uint256 denominator = reserveIn + amountIn;
        impact = (amountIn * PERCENTAGE_PRECISION) / denominator;
        
        return impact;
    }
    
    // ============ Min/Max Functions ============
    
    /**
     * @notice Return minimum of two numbers
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
    
    /**
     * @notice Return maximum of two numbers
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
    
    /**
     * @notice Return minimum of three numbers
     */
    function min3(uint256 a, uint256 b, uint256 c) internal pure returns (uint256) {
        return min(min(a, b), c);
    }
    
    /**
     * @notice Return maximum of three numbers
     */
    function max3(uint256 a, uint256 b, uint256 c) internal pure returns (uint256) {
        return max(max(a, b), c);
    }
    
    // ============ Liquidity Calculations ============
    
    /**
     * @notice Calculate optimal liquidity amount
     * @param amount0 Amount of token0
     * @param amount1 Amount of token1
     * @return liquidity Optimal liquidity tokens to mint
     */
    function calculateLiquidity(
        uint256 amount0,
        uint256 amount1
    ) internal pure returns (uint256 liquidity) {
        return sqrt(amount0 * amount1);
    }
    
    /**
     * @notice Calculate amounts for removing liquidity
     * @param liquidity LP tokens to burn
     * @param totalLiquidity Total LP token supply
     * @param reserve0 Reserve of token0
     * @param reserve1 Reserve of token1
     * @return amount0 Amount of token0 to return
     * @return amount1 Amount of token1 to return
     */
    function calculateRemoveLiquidity(
        uint256 liquidity,
        uint256 totalLiquidity,
        uint256 reserve0,
        uint256 reserve1
    ) internal pure returns (uint256 amount0, uint256 amount1) {
        if (totalLiquidity == 0) revert DivisionByZero();
        
        amount0 = (liquidity * reserve0) / totalLiquidity;
        amount1 = (liquidity * reserve1) / totalLiquidity;
        
        return (amount0, amount1);
    }
    
    // ============ AMM Formula ============
    
    /**
     * @notice Calculate output amount using constant product formula
     * @param amountIn Input amount
     * @param reserveIn Input reserve
     * @param reserveOut Output reserve
     * @param feeBps Fee in basis points (30 = 0.3%)
     * @return amountOut Output amount after fees
     */
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut,
        uint256 feeBps
    ) internal pure returns (uint256 amountOut) {
        if (amountIn == 0) revert DivisionByZero();
        if (reserveIn == 0 || reserveOut == 0) revert DivisionByZero();
        
        // Calculate with fee
        uint256 amountInWithFee = amountIn * (PERCENTAGE_PRECISION - feeBps);
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * PERCENTAGE_PRECISION) + amountInWithFee;
        
        amountOut = numerator / denominator;
    }
    
    /**
     * @notice Calculate input amount needed for desired output
     * @param amountOut Desired output amount
     * @param reserveIn Input reserve
     * @param reserveOut Output reserve
     * @param feeBps Fee in basis points
     * @return amountIn Required input amount
     */
    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut,
        uint256 feeBps
    ) internal pure returns (uint256 amountIn) {
        if (amountOut == 0) revert DivisionByZero();
        if (reserveIn == 0 || reserveOut == 0) revert DivisionByZero();
        if (amountOut >= reserveOut) revert Overflow();
        
        uint256 numerator = reserveIn * amountOut * PERCENTAGE_PRECISION;
        uint256 denominator = (reserveOut - amountOut) * (PERCENTAGE_PRECISION - feeBps);
        
        amountIn = (numerator / denominator) + 1; // Add 1 to round up
    }
}
