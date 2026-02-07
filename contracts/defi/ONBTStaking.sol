// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ONBTStaking
 * @dev Staking contract for Omnichain Nabat Token (ONBT)
 * 
 * Features:
 * - Stake ONBT to earn rewards
 * - Flexible reward distribution
 * - Lockup periods for bonus rewards
 * - Emergency withdrawal
 * - OnchainKit compatible for Base miniapp
 */
contract ONBTStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ State Variables ============
    
    /// @notice The ONBT token being staked
    IERC20 public immutable stakingToken;
    
    /// @notice The reward token (can be same as staking token)
    IERC20 public immutable rewardToken;
    
    /// @notice Reward rate per second per token staked
    uint256 public rewardRate;
    
    /// @notice Last time rewards were calculated
    uint256 public lastUpdateTime;
    
    /// @notice Reward per token stored
    uint256 public rewardPerTokenStored;
    
    /// @notice Total tokens staked
    uint256 public totalStaked;
    
    /// @notice Minimum stake amount
    uint256 public minimumStake;
    
    /// @notice Lockup periods (in seconds) => bonus multiplier (in basis points, 10000 = 1x)
    mapping(uint256 => uint256) public lockupBonuses;
    
    // ============ User Data ============
    
    struct StakeInfo {
        uint256 amount;
        uint256 lockupEnd;
        uint256 lockupBonus; // bonus multiplier in basis points
        uint256 rewardPerTokenPaid;
        uint256 rewards;
        uint256 stakedAt;
    }
    
    /// @notice User stake information
    mapping(address => StakeInfo) public stakes;
    
    // ============ Events ============
    
    event Staked(address indexed user, uint256 amount, uint256 lockupPeriod, uint256 bonus);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    event LockupBonusUpdated(uint256 lockupPeriod, uint256 bonus);
    event MinimumStakeUpdated(uint256 newMinimum);
    
    // ============ Constructor ============
    
    constructor(
        address _stakingToken,
        address _rewardToken,
        uint256 _rewardRate,
        uint256 _minimumStake
    ) {
        require(_stakingToken != address(0), "Invalid staking token");
        require(_rewardToken != address(0), "Invalid reward token");
        
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = _rewardRate;
        minimumStake = _minimumStake;
        lastUpdateTime = block.timestamp;
        
        // Set default lockup bonuses
        lockupBonuses[0] = 10000; // No lockup = 1x (100%)
        lockupBonuses[30 days] = 12000; // 30 days = 1.2x (120%)
        lockupBonuses[90 days] = 15000; // 90 days = 1.5x (150%)
        lockupBonuses[180 days] = 20000; // 180 days = 2x (200%)
        lockupBonuses[365 days] = 30000; // 365 days = 3x (300%)
    }
    
    // ============ Modifiers ============
    
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            stakes[account].rewards = earned(account);
            stakes[account].rewardPerTokenPaid = rewardPerTokenStored;
        }
        _;
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Calculate reward per token
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        
        uint256 timeDelta = block.timestamp - lastUpdateTime;
        return rewardPerTokenStored + (timeDelta * rewardRate * 1e18 / totalStaked);
    }
    
    /**
     * @notice Calculate earned rewards for an account
     */
    function earned(address account) public view returns (uint256) {
        StakeInfo memory stake = stakes[account];
        
        if (stake.amount == 0) {
            return stake.rewards;
        }
        
        uint256 rewardDelta = rewardPerToken() - stake.rewardPerTokenPaid;
        uint256 baseReward = stake.amount * rewardDelta / 1e18;
        uint256 bonusReward = baseReward * stake.lockupBonus / 10000;
        
        return stake.rewards + bonusReward;
    }
    
    /**
     * @notice Get staking info for a user
     */
    function getStakeInfo(address account) external view returns (
        uint256 amount,
        uint256 lockupEnd,
        uint256 lockupBonus,
        uint256 earnedRewards,
        uint256 stakedAt,
        bool isLocked
    ) {
        StakeInfo memory stake = stakes[account];
        return (
            stake.amount,
            stake.lockupEnd,
            stake.lockupBonus,
            earned(account),
            stake.stakedAt,
            block.timestamp < stake.lockupEnd
        );
    }
    
    // ============ Staking Functions ============
    
    /**
     * @notice Stake tokens with optional lockup period
     * @param amount Amount to stake
     * @param lockupPeriod Lockup period in seconds (0 for no lockup)
     */
    function stake(uint256 amount, uint256 lockupPeriod) 
        external 
        nonReentrant 
        whenNotPaused 
        updateReward(msg.sender) 
    {
        require(amount >= minimumStake, "Amount below minimum stake");
        require(lockupBonuses[lockupPeriod] > 0, "Invalid lockup period");
        require(stakes[msg.sender].amount == 0, "Already staking, withdraw first");
        
        // Transfer tokens from user
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update stake info
        stakes[msg.sender] = StakeInfo({
            amount: amount,
            lockupEnd: block.timestamp + lockupPeriod,
            lockupBonus: lockupBonuses[lockupPeriod],
            rewardPerTokenPaid: rewardPerTokenStored,
            rewards: 0,
            stakedAt: block.timestamp
        });
        
        totalStaked += amount;
        
        emit Staked(msg.sender, amount, lockupPeriod, lockupBonuses[lockupPeriod]);
    }
    
    /**
     * @notice Withdraw staked tokens
     * @param amount Amount to withdraw (0 = all)
     */
    function withdraw(uint256 amount) 
        external 
        nonReentrant 
        updateReward(msg.sender) 
    {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        require(block.timestamp >= userStake.lockupEnd, "Stake is locked");
        
        uint256 withdrawAmount = amount == 0 ? userStake.amount : amount;
        require(withdrawAmount <= userStake.amount, "Insufficient staked amount");
        
        userStake.amount -= withdrawAmount;
        totalStaked -= withdrawAmount;
        
        stakingToken.safeTransfer(msg.sender, withdrawAmount);
        
        emit Withdrawn(msg.sender, withdrawAmount);
    }
    
    /**
     * @notice Claim earned rewards
     */
    function claimRewards() 
        external 
        nonReentrant 
        updateReward(msg.sender) 
    {
        uint256 reward = stakes[msg.sender].rewards;
        require(reward > 0, "No rewards available");
        
        stakes[msg.sender].rewards = 0;
        rewardToken.safeTransfer(msg.sender, reward);
        
        emit RewardPaid(msg.sender, reward);
    }
    
    /**
     * @notice Compound rewards (restake them)
     */
    function compound() 
        external 
        nonReentrant 
        whenNotPaused 
        updateReward(msg.sender) 
    {
        uint256 reward = stakes[msg.sender].rewards;
        require(reward > 0, "No rewards to compound");
        require(address(stakingToken) == address(rewardToken), "Cannot compound different tokens");
        
        stakes[msg.sender].rewards = 0;
        stakes[msg.sender].amount += reward;
        totalStaked += reward;
        
        emit RewardPaid(msg.sender, reward);
        emit Staked(msg.sender, reward, 0, stakes[msg.sender].lockupBonus);
    }
    
    /**
     * @notice Emergency withdrawal (forfeits rewards)
     */
    function emergencyWithdraw() external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        
        uint256 amount = userStake.amount;
        
        delete stakes[msg.sender];
        totalStaked -= amount;
        
        stakingToken.safeTransfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, amount);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update reward rate
     */
    function setRewardRate(uint256 newRate) external onlyOwner updateReward(address(0)) {
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }
    
    /**
     * @notice Set lockup bonus for a period
     */
    function setLockupBonus(uint256 lockupPeriod, uint256 bonus) external onlyOwner {
        require(bonus >= 10000, "Bonus must be >= 1x (10000)");
        lockupBonuses[lockupPeriod] = bonus;
        emit LockupBonusUpdated(lockupPeriod, bonus);
    }
    
    /**
     * @notice Set minimum stake amount
     */
    function setMinimumStake(uint256 newMinimum) external onlyOwner {
        minimumStake = newMinimum;
        emit MinimumStakeUpdated(newMinimum);
    }
    
    /**
     * @notice Fund rewards (owner adds reward tokens)
     */
    function fundRewards(uint256 amount) external onlyOwner {
        rewardToken.safeTransferFrom(msg.sender, address(this), amount);
    }
    
    /**
     * @notice Pause staking
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause staking
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Recover accidentally sent tokens
     */
    function recoverToken(address token, uint256 amount) external onlyOwner {
        require(token != address(stakingToken), "Cannot recover staking token");
        require(token != address(rewardToken) || 
                IERC20(token).balanceOf(address(this)) > totalStaked + amount, 
                "Cannot recover reward token reserves");
        
        IERC20(token).safeTransfer(owner(), amount);
    }
}
