// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTSecurityLib
 * @dev Security utilities for DeFi contracts
 * 
 * Features:
 * - Address validation
 * - Balance verification
 * - Deadline checks
 * - Slippage protection
 * - Reentrancy helpers
 */
library ONBTSecurityLib {
    using SafeERC20 for IERC20;
    
    // ============ Errors ============
    
    error InvalidAddress();
    error InsufficientBalance();
    error DeadlineExpired();
    error SlippageExceeded();
    error IdenticalAddresses();
    error InvalidAmount();
    
    // ============ Address Validation ============
    
    /**
     * @notice Validate that address is not zero
     */
    function requireValidAddress(address addr) internal pure {
        if (addr == address(0)) revert InvalidAddress();
    }
    
    /**
     * @notice Validate that multiple addresses are not zero
     */
    function requireValidAddresses(address[] memory addresses) internal pure {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == address(0)) revert InvalidAddress();
        }
    }
    
    /**
     * @notice Validate that two addresses are different
     */
    function requireDifferentAddresses(address addr1, address addr2) internal pure {
        if (addr1 == addr2) revert IdenticalAddresses();
    }
    
    /**
     * @notice Check if address is a contract
     */
    function isContract(address addr) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
    
    // ============ Balance Checks ============
    
    /**
     * @notice Verify that user has sufficient token balance
     */
    function requireSufficientBalance(
        IERC20 token,
        address user,
        uint256 amount
    ) internal view {
        if (token.balanceOf(user) < amount) revert InsufficientBalance();
    }
    
    /**
     * @notice Verify that user has sufficient allowance
     */
    function requireSufficientAllowance(
        IERC20 token,
        address owner,
        address spender,
        uint256 amount
    ) internal view {
        if (token.allowance(owner, spender) < amount) revert InsufficientBalance();
    }
    
    /**
     * @notice Verify contract has sufficient balance for transfer
     */
    function requireContractBalance(
        IERC20 token,
        address contractAddress,
        uint256 amount
    ) internal view {
        if (token.balanceOf(contractAddress) < amount) revert InsufficientBalance();
    }
    
    // ============ Time-based Checks ============
    
    /**
     * @notice Verify that current time is before deadline
     */
    function requireNotExpired(uint256 deadline) internal view {
        if (block.timestamp > deadline) revert DeadlineExpired();
    }
    
    /**
     * @notice Check if deadline has passed
     */
    function isExpired(uint256 deadline) internal view returns (bool) {
        return block.timestamp > deadline;
    }
    
    // ============ Slippage Protection ============
    
    /**
     * @notice Verify that output amount meets minimum requirement
     */
    function requireMinimumOutput(
        uint256 actualAmount,
        uint256 minimumAmount
    ) internal pure {
        if (actualAmount < minimumAmount) revert SlippageExceeded();
    }
    
    /**
     * @notice Verify that input amount doesn't exceed maximum
     */
    function requireMaximumInput(
        uint256 actualAmount,
        uint256 maximumAmount
    ) internal pure {
        if (actualAmount > maximumAmount) revert SlippageExceeded();
    }
    
    /**
     * @notice Calculate if slippage is within tolerance
     * @param actualAmount Actual amount received/paid
     * @param expectedAmount Expected amount
     * @param slippageBps Maximum slippage in basis points
     * @return withinTolerance Whether slippage is acceptable
     */
    function isWithinSlippageTolerance(
        uint256 actualAmount,
        uint256 expectedAmount,
        uint256 slippageBps
    ) internal pure returns (bool withinTolerance) {
        if (expectedAmount == 0) return false;
        
        uint256 difference;
        if (actualAmount > expectedAmount) {
            difference = actualAmount - expectedAmount;
        } else {
            difference = expectedAmount - actualAmount;
        }
        
        uint256 maxDifference = (expectedAmount * slippageBps) / 10000;
        return difference <= maxDifference;
    }
    
    // ============ Amount Validation ============
    
    /**
     * @notice Validate that amount is greater than zero
     */
    function requirePositiveAmount(uint256 amount) internal pure {
        if (amount == 0) revert InvalidAmount();
    }
    
    /**
     * @notice Validate that multiple amounts are greater than zero
     */
    function requirePositiveAmounts(uint256[] memory amounts) internal pure {
        for (uint256 i = 0; i < amounts.length; i++) {
            if (amounts[i] == 0) revert InvalidAmount();
        }
    }
    
    /**
     * @notice Validate amount is within range
     */
    function requireAmountInRange(
        uint256 amount,
        uint256 min,
        uint256 max
    ) internal pure {
        if (amount < min || amount > max) revert InvalidAmount();
    }
    
    // ============ Safe Token Operations ============
    
    /**
     * @notice Safely transfer tokens with balance verification
     */
    function safeTransferWithVerification(
        IERC20 token,
        address from,
        address to,
        uint256 amount
    ) internal {
        requireValidAddress(to);
        requirePositiveAmount(amount);
        requireSufficientBalance(token, from, amount);
        
        token.safeTransferFrom(from, to, amount);
    }
    
    /**
     * @notice Safely transfer tokens from contract with balance check
     */
    function safeTransferOut(
        IERC20 token,
        address to,
        uint256 amount
    ) internal {
        requireValidAddress(to);
        requirePositiveAmount(amount);
        requireContractBalance(token, address(this), amount);
        
        token.safeTransfer(to, amount);
    }
    
    // ============ Pair Validation ============
    
    /**
     * @notice Validate token pair for liquidity pool
     */
    function validateTokenPair(
        address token0,
        address token1
    ) internal pure {
        requireValidAddress(token0);
        requireValidAddress(token1);
        requireDifferentAddresses(token0, token1);
    }
    
    /**
     * @notice Sort two tokens by address (for consistent ordering)
     */
    function sortTokens(
        address tokenA,
        address tokenB
    ) internal pure returns (address token0, address token1) {
        requireDifferentAddresses(tokenA, tokenB);
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }
    
    // ============ Emergency Checks ============
    
    /**
     * @notice Check if contract is paused (requires Pausable)
     * @dev This is a helper for checking pause state
     */
    function requireNotPaused(bool paused) internal pure {
        require(!paused, "Contract is paused");
    }
    
    /**
     * @notice Validate that caller is authorized
     */
    function requireAuthorized(address caller, address authorized) internal pure {
        require(caller == authorized, "Unauthorized");
    }
}
