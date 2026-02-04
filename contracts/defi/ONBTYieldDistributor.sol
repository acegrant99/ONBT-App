// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ONBTYieldDistributor
 * @dev Distributes yield/rewards to ONBT holders and stakers
 * 
 * Features:
 * - Proportional yield distribution
 * - Multiple reward sources
 * - Claim and compound functionality
 * - OnchainKit compatible for Base miniapp
 */
contract ONBTYieldDistributor is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ============ State Variables ============
    
    /// @notice The ONBT token
    IERC20 public immutable onbtToken;
    
    /// @notice Total shares (weighted holdings)
    uint256 public totalShares;
    
    /// @notice Accumulated rewards per share
    uint256 public accRewardsPerShare;
    
    /// @notice Precision multiplier for calculations
    uint256 private constant PRECISION = 1e18;
    
    // ============ User Data ============
    
    struct UserInfo {
        uint256 shares;
        uint256 rewardDebt;
        uint256 pendingRewards;
        uint256 totalClaimed;
    }
    
    /// @notice User information mapping
    mapping(address => UserInfo) public users;
    
    /// @notice Whitelisted reward depositors
    mapping(address => bool) public rewardDepositors;
    
    // ============ Events ============
    
    event SharesUpdated(address indexed user, uint256 oldShares, uint256 newShares);
    event RewardsDeposited(address indexed depositor, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event RewardsCompounded(address indexed user, uint256 amount);
    
    // ============ Constructor ============
    
    constructor(address _onbtToken) {
        require(_onbtToken != address(0), "Invalid token address");
        onbtToken = IERC20(_onbtToken);
        rewardDepositors[msg.sender] = true;
    }
    
    // ============ Modifiers ============
    
    modifier onlyRewardDepositor() {
        require(rewardDepositors[msg.sender], "Not authorized");
        _;
    }
    
    // ============ User Functions ============
    
    /**
     * @notice Update user shares (called by staking contract or governance)
     * @param user User address
     * @param newShares New share amount
     */
    function updateShares(address user, uint256 newShares) external onlyRewardDepositor {
        _updateShares(user, newShares);
    }
    
    /**
     * @notice Claim pending rewards
     */
    function claimRewards() external nonReentrant {
        UserInfo storage user = users[msg.sender];
        
        uint256 pending = _calculatePending(msg.sender);
        require(pending > 0, "No rewards available");
        
        user.pendingRewards = 0;
        user.rewardDebt = (user.shares * accRewardsPerShare) / PRECISION;
        user.totalClaimed += pending;
        
        onbtToken.safeTransfer(msg.sender, pending);
        
        emit RewardsClaimed(msg.sender, pending);
    }
    
    /**
     * @notice Get pending rewards for a user
     */
    function pendingRewards(address user) external view returns (uint256) {
        return _calculatePending(user);
    }
    
    /**
     * @notice Get user information
     */
    function getUserInfo(address user) external view returns (
        uint256 shares,
        uint256 pending,
        uint256 totalClaimed
    ) {
        UserInfo memory info = users[user];
        return (
            info.shares,
            _calculatePending(user),
            info.totalClaimed
        );
    }
    
    // ============ Reward Distribution Functions ============
    
    /**
     * @notice Deposit rewards for distribution
     * @param amount Amount of ONBT to distribute
     */
    function depositRewards(uint256 amount) external onlyRewardDepositor nonReentrant {
        require(amount > 0, "Invalid amount");
        require(totalShares > 0, "No shares to distribute to");
        
        onbtToken.safeTransferFrom(msg.sender, address(this), amount);
        
        accRewardsPerShare += (amount * PRECISION) / totalShares;
        
        emit RewardsDeposited(msg.sender, amount);
    }
    
    /**
     * @notice Batch update shares for multiple users
     * @param users Array of user addresses
     * @param newShares Array of new share amounts
     */
    function batchUpdateShares(
        address[] calldata users,
        uint256[] calldata newShares
    ) external onlyRewardDepositor {
        require(users.length == newShares.length, "Length mismatch");
        
        for (uint256 i = 0; i < users.length; i++) {
            _updateShares(users[i], newShares[i]);
        }
    }
    
    // ============ Internal Functions ============
    
    /**
     * @notice Internal function to update user shares
     */
    function _updateShares(address user, uint256 newShares) internal {
        UserInfo storage userInfo = users[user];
        
        // Calculate and save pending rewards
        if (userInfo.shares > 0) {
            uint256 pending = (userInfo.shares * accRewardsPerShare) / PRECISION - userInfo.rewardDebt;
            userInfo.pendingRewards += pending;
        }
        
        // Update total shares
        uint256 oldShares = userInfo.shares;
        if (newShares > oldShares) {
            totalShares += (newShares - oldShares);
        } else if (newShares < oldShares) {
            totalShares -= (oldShares - newShares);
        }
        
        // Update user data
        userInfo.shares = newShares;
        userInfo.rewardDebt = (newShares * accRewardsPerShare) / PRECISION;
        
        emit SharesUpdated(user, oldShares, newShares);
    }
    
    /**
     * @notice Calculate pending rewards for a user
     */
    function _calculatePending(address user) internal view returns (uint256) {
        UserInfo memory userInfo = users[user];
        
        if (userInfo.shares == 0) {
            return userInfo.pendingRewards;
        }
        
        uint256 accumulatedRewards = (userInfo.shares * accRewardsPerShare) / PRECISION;
        uint256 pending = accumulatedRewards - userInfo.rewardDebt;
        
        return userInfo.pendingRewards + pending;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Add a reward depositor
     */
    function addRewardDepositor(address depositor) external onlyOwner {
        require(depositor != address(0), "Invalid address");
        rewardDepositors[depositor] = true;
    }
    
    /**
     * @notice Remove a reward depositor
     */
    function removeRewardDepositor(address depositor) external onlyOwner {
        rewardDepositors[depositor] = false;
    }
    
    /**
     * @notice Emergency withdrawal (only owner)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
}
