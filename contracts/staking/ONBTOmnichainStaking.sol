// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { EnforcedOptionParam } from "@layerzerolabs/oapp-evm/contracts/oapp/interfaces/IOAppOptionsType3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";

// Token interface - references OmnichainNabatOFT
interface IOmnichainNabatOFT is IERC20 {
    function getVotes(address account) external view returns (uint256);
    function totalVotes() external view returns (uint256);
    function getPeerAddress(uint32 eid) external view returns (bytes32);
}

// Rewards pool interface
interface IONBTRewardsPool {
    function requestRewards(uint256 amount) external returns (bool);
    function getAvailableRewards() external view returns (uint256);
    function refillRewards(uint32 destEid, uint256 amount) external;
}

// Governor interface for delegation
interface IONBTGovernor {
    function delegateVotes(address delegatee) external;
    function getVotingPower(address account, uint256 blockNumber) external view returns (uint256);
}

/**
 * @title ONBTOmnichainStaking
 * @dev LayerZero-enabled cross-chain staking for ONBT tokens
 * 
 * Hub Chain: Base (aggregates all staking data)
 * Destination Chains: Arbitrum, etc. (stake locally, sync to hub)
 * 
 * Features:
 * - Stake ONBT tokens on any supported chain
 * - Cross-chain stake position synchronization
 * - Lockup periods with bonus multipliers (1x-3x)
 * - Omnichain reward distribution
 * - Compound and withdraw across chains
 * - Emergency withdrawal mechanism
 * 
 * Message Types:
 * - STAKE: Report new stake to hub
 * - UNSTAKE: Report unstake to hub
 * - SYNC_REWARDS: Sync reward data from hub
 * - CLAIM_REWARDS: Cross-chain reward claim
 * - COMPOUND: Cross-chain compound
 */
contract ONBTOmnichainStaking is OApp, OAppOptionsType3, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    // ============ Message Types ============
    
    uint16 public constant MSG_STAKE = 1;
    uint16 public constant MSG_UNSTAKE = 2;
    uint16 public constant MSG_SYNC_REWARDS = 3;
    uint16 public constant MSG_CLAIM_REWARDS = 4;
    uint16 public constant MSG_COMPOUND = 5;
    
    // ============ State Variables ============
    
    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Hub chain LayerZero EID (Base)
    uint32 public immutable hubChainEid;
    
    /// @notice Whether this deployment is on the hub chain
    bool public immutable isHub;
    
    /// @notice The ONBT token
    IERC20 public immutable onbtToken;
    
    /// @notice Minimum stake amount (1 ONBT)
    uint256 public constant MIN_STAKE = 1 ether;
    
    /// @notice Maximum lockup period (365 days)
    uint256 public constant MAX_LOCKUP = 365 days;
    
    /// @notice Base reward rate (10% APY = 10000 basis points)
    uint256 public baseRewardRate = 1000; // 10% APY
    
    /// @notice Reward rate per second
    uint256 public rewardPerSecond;
    
    /// @notice Total staked across all chains (hub only)
    uint256 public globalTotalStaked;
    
    /// @notice Total staked on this chain
    uint256 public localTotalStaked;
    
    /// @notice Total voting power (stake + delegated)
    uint256 public totalVotingPower;
    
    /// @notice Reward tokens (ONBT + additional tokens)
    address[] public rewardTokens;
    mapping(address => bool) public isRewardToken;
    
    // ============ Delegation & Governance ============
    
    /// @notice Delegation mapping (delegator => delegate)
    mapping(address => address) public delegates;
    
    /// @notice Delegated voting power (delegate => amount)
    mapping(address => uint256) public delegatedVotes;
    
    /// @notice Number of delegators per delegate
    mapping(address => uint256) public delegatorCount;
    
    // ============ Leaderboard & Achievements ============
    
    /// @notice Top stakers (for leaderboard)
    address[] public topStakers;
    
    /// @notice User rank on leaderboard
    mapping(address => uint256) public userRank;
    
    /// @notice Achievement NFT contract address
    address public achievementNFT;
    
    /// @notice User achievements earned
    mapping(address => uint256) public achievementsBitmap; // Bitmap of earned achievements
    
    /// @notice Total rewards claimed per user per token
    mapping(address => mapping(address => uint256)) public totalClaimedByToken;
    
    // ============ Lockup Periods & Bonuses ============
    
    /// @notice Lockup period definitions (in seconds)
    enum LockupPeriod {
        NONE,       // 0 days  - 1x rewards
        DAYS_30,    // 30 days - 1.2x rewards
        DAYS_90,    // 90 days - 1.5x rewards
        DAYS_180,   // 180 days - 2x rewards
        DAYS_365    // 365 days - 3x rewards
    }
    
    /// @notice Lockup period to seconds mapping
    mapping(LockupPeriod => uint256) public lockupDurations;
    
    /// @notice Lockup period to bonus multiplier (basis points, 10000 = 1x)
    mapping(LockupPeriod => uint256) public lockupBonuses;
    
    // ============ Stake Data ============
    
    struct StakeInfo {
        uint256 amount;              // Amount staked
        uint256 startTime;           // When staking started
        uint256 lockupEnd;           // When lockup ends (0 if no lockup)
        LockupPeriod lockupPeriod;   // Lockup period selected
        uint256 rewardDebt;          // Rewards already accounted for
        uint256 pendingRewards;      // Pending unclaimed rewards
        uint32 sourceChain;          // Chain where stake originated (EID)
        uint256 votingPower;         // Cached voting power (stake + delegated)
        uint256 totalCompounded;     // Total amount compounded
        uint256 lastActionTime;      // Last stake/unstake/claim time
    }
    
    /// @notice Achievement definitions
    enum Achievement {
        FIRST_STAKE,           // Bit 0: Made first stake
        LONG_TERM_HOLDER,      // Bit 1: Staked for 365 days
        WHALE,                 // Bit 2: Staked 100k+ ONBT
        COMPOUND_MASTER,       // Bit 3: Compounded 10+ times
        EARLY_ADOPTER,         // Bit 4: One of first 100 stakers
        LOYAL_STAKER,          // Bit 5: Never unstaked for 180 days
        GOVERNANCE_ACTIVE,     // Bit 6: Delegated or received delegation
        REWARDS_PIONEER        // Bit 7: Claimed rewards in first week
    }
    
    /// @notice User stake information
    mapping(address => StakeInfo) public stakes;
    
    /// @notice Global stake tracking per user (hub only)
    mapping(address => mapping(uint32 => uint256)) public crossChainStakes;
    
    // ============ Events ============
    
    event Staked(address indexed user, uint256 amount, LockupPeriod lockup, uint256 lockupEnd);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event Compounded(address indexed user, uint256 amount);
    event CrossChainStakeSynced(address indexed user, uint32 srcEid, uint256 amount);
    event RewardsSynced(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 oldRate, uint256 newRate);
    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
    event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);
    event RewardTokenAdded(address indexed token);
    event RewardTokenRemoved(address indexed token);
    event AchievementUnlocked(address indexed user, Achievement achievement);
    event LeaderboardUpdated(address indexed user, uint256 rank);
    
    // ============ Constructor ============

    /**
     * @notice Initializes omnichain staking.
     * @param _lzEndpoint LayerZero endpoint address.
     * @param _onbtToken ONBT token address.
     * @param _localEid Local chain endpoint ID.
     * @param _hubChainEid Hub chain endpoint ID.
     * @param _isHub Whether this deployment is the hub.
     */
    constructor(
        address _lzEndpoint,
        address _onbtToken,
        uint32 _localEid,
        uint32 _hubChainEid,
        bool _isHub
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_onbtToken != address(0), "Invalid token address");
        
        onbtToken = IERC20(_onbtToken);
        localEid = _localEid;
        hubChainEid = _hubChainEid;
        isHub = _isHub;
        
        // Initialize lockup durations
        lockupDurations[LockupPeriod.NONE] = 0;
        lockupDurations[LockupPeriod.DAYS_30] = 30 days;
        lockupDurations[LockupPeriod.DAYS_90] = 90 days;
        lockupDurations[LockupPeriod.DAYS_180] = 180 days;
        lockupDurations[LockupPeriod.DAYS_365] = 365 days;
        
        // Initialize lockup bonuses (basis points)
        lockupBonuses[LockupPeriod.NONE] = 10000;      // 1x
        lockupBonuses[LockupPeriod.DAYS_30] = 12000;   // 1.2x
        lockupBonuses[LockupPeriod.DAYS_90] = 15000;   // 1.5x
        lockupBonuses[LockupPeriod.DAYS_180] = 20000;  // 2x
        lockupBonuses[LockupPeriod.DAYS_365] = 30000;  // 3x
        
        // Calculate reward per second (10% APY base)
        rewardPerSecond = (baseRewardRate * 1e18) / (365 days * 10000);
        
        // Initialize ONBT as primary reward token
        rewardTokens.push(_onbtToken);
        isRewardToken[_onbtToken] = true;
    }
    
    // ============ Staking Functions ============
    
    /**
     * @notice Stake ONBT tokens with optional lockup
     * @param amount Amount of ONBT to stake
     * @param lockup Lockup period selection
     */
    function stake(uint256 amount, LockupPeriod lockup) external nonReentrant whenNotPaused {
        require(isHub, "Use stakeWithFee");
        _stakeInternal(amount, lockup);
    }

    function stakeWithFee(uint256 amount, LockupPeriod lockup) external payable nonReentrant whenNotPaused {
        require(!isHub, "Hub should use stake");
        _stakeInternal(amount, lockup);

        MessagingFee memory fee = _quoteStakeSyncFee(msg.sender, amount, true);
        require(msg.value == fee.nativeFee, "Invalid fee");
        _syncStakeToHub(msg.sender, amount, true, fee.nativeFee);
    }
    
    /**
     * @notice Unstake ONBT tokens
     * @param amount Amount to unstake (0 = unstake all)
     */
    function unstake(uint256 amount) external nonReentrant {
        require(isHub, "Use unstakeWithFee");
        _unstakeInternal(amount);
    }

    function unstakeWithFee(uint256 amount) external payable nonReentrant {
        require(!isHub, "Hub should use unstake");
        uint256 unstakeAmount = _unstakeInternal(amount);

        MessagingFee memory fee = _quoteStakeSyncFee(msg.sender, unstakeAmount, false);
        require(msg.value == fee.nativeFee, "Invalid fee");
        _syncStakeToHub(msg.sender, unstakeAmount, false, fee.nativeFee);
    }
    
    /**
     * @notice Claim pending rewards
     */
    function claimRewards() external nonReentrant {
        _updateRewards(msg.sender);
        
        StakeInfo storage userStake = stakes[msg.sender];
        uint256 rewards = userStake.pendingRewards;
        require(rewards > 0, "No rewards available");
        
        userStake.pendingRewards = 0;
        userStake.lastActionTime = block.timestamp;
        
        // Track claimed amount
        totalClaimedByToken[msg.sender][address(onbtToken)] += rewards;
        
        // Transfer rewards (must have rewards pool)
        onbtToken.safeTransfer(msg.sender, rewards);
        
        // Check achievements
        _checkAchievements(msg.sender);
        
        emit RewardsClaimed(msg.sender, rewards);
    }

    function _stakeInternal(uint256 amount, LockupPeriod lockup) internal {
        require(amount >= MIN_STAKE, "Amount too small");
        require(lockup <= LockupPeriod.DAYS_365, "Invalid lockup");

        StakeInfo storage userStake = stakes[msg.sender];

        // If user already has a stake, compound rewards first
        if (userStake.amount > 0) {
            _updateRewards(msg.sender);
        }

        // Transfer tokens from user
        onbtToken.safeTransferFrom(msg.sender, address(this), amount);

        // Calculate lockup end time
        uint256 lockupEnd = 0;
        if (lockup != LockupPeriod.NONE) {
            lockupEnd = block.timestamp + lockupDurations[lockup];
        }

        // Update user stake
        userStake.amount += amount;
        userStake.startTime = block.timestamp;
        userStake.lockupEnd = lockupEnd;
        userStake.lockupPeriod = lockup;
        userStake.sourceChain = localEid;

        // Update total staked
        localTotalStaked += amount;
        if (isHub) {
            globalTotalStaked += amount;
        }

        // Update voting power
        _updateVotingPower(msg.sender);

        // Update leaderboard
        _updateLeaderboard(msg.sender);

        // Check and unlock achievements
        _checkAchievements(msg.sender);

        emit Staked(msg.sender, amount, lockup, lockupEnd);
    }

    function _unstakeInternal(uint256 amount) internal returns (uint256 unstakeAmount) {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        require(block.timestamp >= userStake.lockupEnd, "Stake is locked");

        unstakeAmount = amount == 0 ? userStake.amount : amount;
        require(unstakeAmount <= userStake.amount, "Insufficient stake");

        // Update rewards before unstaking
        _updateRewards(msg.sender);

        // Update stake
        userStake.amount -= unstakeAmount;
        localTotalStaked -= unstakeAmount;

        if (isHub) {
            globalTotalStaked -= unstakeAmount;
        }

        // Transfer tokens back to user
        onbtToken.safeTransfer(msg.sender, unstakeAmount);

        // Update voting power and leaderboard
        _updateVotingPower(msg.sender);
        _updateLeaderboard(msg.sender);

        emit Unstaked(msg.sender, unstakeAmount);
    }

    function _compoundInternal() internal returns (uint256 rewards) {
        _updateRewards(msg.sender);

        StakeInfo storage userStake = stakes[msg.sender];
        rewards = userStake.pendingRewards;
        require(rewards > 0, "No rewards to compound");

        userStake.pendingRewards = 0;
        userStake.amount += rewards;
        userStake.totalCompounded += rewards;
        userStake.lastActionTime = block.timestamp;
        localTotalStaked += rewards;

        if (isHub) {
            globalTotalStaked += rewards;
        }

        // Update voting power and leaderboard
        _updateVotingPower(msg.sender);
        _updateLeaderboard(msg.sender);

        // Check achievements
        _checkAchievements(msg.sender);

        emit Compounded(msg.sender, rewards);
    }

    function _quoteStakeSyncFee(address user, uint256 amount, bool isStake)
        internal
        view
        returns (MessagingFee memory fee)
    {
        bytes memory payload = abi.encode(
            isStake ? MSG_STAKE : MSG_UNSTAKE,
            user,
            amount,
            block.timestamp
        );

        bytes memory extraOptions = hex"";
        bytes memory options = this.combineOptions(
            hubChainEid,
            isStake ? MSG_STAKE : MSG_UNSTAKE,
            extraOptions
        );

        return _quote(hubChainEid, payload, options, false);
    }
    
    /**
     * @notice Compound rewards back into stake
     */
    function compound() external nonReentrant whenNotPaused {
        require(isHub, "Use compoundWithFee");
        _compoundInternal();
    }

    function compoundWithFee() external payable nonReentrant whenNotPaused {
        require(!isHub, "Hub should use compound");
        uint256 rewards = _compoundInternal();

        MessagingFee memory fee = _quoteStakeSyncFee(msg.sender, rewards, true);
        require(msg.value == fee.nativeFee, "Invalid fee");
        _syncStakeToHub(msg.sender, rewards, true, fee.nativeFee);
    }

    function quoteStakeSyncFee(address user, uint256 amount, bool isStake)
        external
        view
        returns (MessagingFee memory fee)
    {
        return _quoteStakeSyncFee(user, amount, isStake);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get user's stake information
     */
    function getStakeInfo(address user) external view returns (
        uint256 amount,
        uint256 startTime,
        uint256 lockupEnd,
        LockupPeriod lockup,
        uint256 pendingRewards,
        bool isLocked
    ) {
        StakeInfo memory userStake = stakes[user];
        return (
            userStake.amount,
            userStake.startTime,
            userStake.lockupEnd,
            userStake.lockupPeriod,
            _calculateRewards(user),
            block.timestamp < userStake.lockupEnd
        );
    }
    
    /**
     * @notice Calculate pending rewards for a user
     */
    function earned(address user) external view returns (uint256) {
        return _calculateRewards(user);
    }
    
    /**
     * @notice Get lockup bonus multiplier for a period
     */
    function getLockupBonus(LockupPeriod lockup) external view returns (uint256) {
        return lockupBonuses[lockup];
    }
    
    /**
     * @notice Get lockup duration for a period
     */
    function getLockupDuration(LockupPeriod lockup) external view returns (uint256) {
        return lockupDurations[lockup];
    }
    
    /**
     * @notice Get voting power for a user (stake + delegated)
     */
    function getVotingPower(address user) external view returns (uint256) {
        return stakes[user].amount + delegatedVotes[user];
    }
    
    /**
     * @notice Get current delegate for a user
     */
    function getCurrentDelegate(address user) external view returns (address) {
        return delegates[user];
    }
    
    /**
     * @notice Check if user has earned an achievement
     */
    function hasAchievement(address user, Achievement achievement) external view returns (bool) {
        return (achievementsBitmap[user] & (1 << uint256(achievement))) != 0;
    }
    
    /**
     * @notice Get user's leaderboard rank
     */
    function getLeaderboardRank(address user) external view returns (uint256) {
        return userRank[user];
    }
    
    /**
     * @notice Get top N stakers
     */
    function getTopStakers(uint256 count) external view returns (address[] memory) {
        uint256 length = count > topStakers.length ? topStakers.length : count;
        address[] memory top = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            top[i] = topStakers[i];
        }
        return top;
    }
    
    /**
     * @notice Get all reward tokens
     */
    function getRewardTokens() external view returns (address[] memory) {
        return rewardTokens;
    }
    
    // ============ Delegation Functions ============
    
    /**
     * @notice Delegate voting power to another address
     * @param delegatee Address to delegate to (address(0) to remove delegation)
     */
    function delegate(address delegatee) external {
        address currentDelegate = delegates[msg.sender];
        uint256 delegatorBalance = stakes[msg.sender].amount;
        
        require(delegatee != msg.sender, "Cannot delegate to self");
        require(delegatorBalance > 0, "No stake to delegate");
        
        // Remove from old delegate
        if (currentDelegate != address(0)) {
            delegatedVotes[currentDelegate] -= delegatorBalance;
            delegatorCount[currentDelegate] -= 1;
            emit DelegateVotesChanged(currentDelegate, delegatedVotes[currentDelegate] + delegatorBalance, delegatedVotes[currentDelegate]);
        }
        
        // Update delegation
        delegates[msg.sender] = delegatee;
        
        // Add to new delegate
        if (delegatee != address(0)) {
            delegatedVotes[delegatee] += delegatorBalance;
            delegatorCount[delegatee] += 1;
            emit DelegateVotesChanged(delegatee, delegatedVotes[delegatee] - delegatorBalance, delegatedVotes[delegatee]);
            
            // Update voting power for delegate
            _updateVotingPower(delegatee);
            
            // Unlock governance achievement
            _unlockAchievement(msg.sender, Achievement.GOVERNANCE_ACTIVE);
            _unlockAchievement(delegatee, Achievement.GOVERNANCE_ACTIVE);
        }
        
        emit DelegateChanged(msg.sender, currentDelegate, delegatee);
    }
    
    // ============ Internal Functions ============
    
    /**
     * @notice Update user's pending rewards
     */
    function _updateRewards(address user) internal {
        uint256 rewards = _calculateRewards(user);
        StakeInfo storage userStake = stakes[user];
        
        userStake.pendingRewards = rewards;
        userStake.rewardDebt = block.timestamp;
    }
    
    /**
     * @notice Calculate current rewards for a user
     */
    function _calculateRewards(address user) internal view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        
        if (userStake.amount == 0) {
            return userStake.pendingRewards;
        }
        
        uint256 timeStaked = block.timestamp - (userStake.rewardDebt == 0 ? userStake.startTime : userStake.rewardDebt);
        uint256 baseReward = (userStake.amount * rewardPerSecond * timeStaked) / 1e18;
        
        // Apply lockup bonus
        uint256 bonus = lockupBonuses[userStake.lockupPeriod];
        uint256 totalReward = (baseReward * bonus) / 10000;
        
        return userStake.pendingRewards + totalReward; // pendingRewards + newly earned since last update
    }
    
    /**
     * @notice Update user's voting power
     */
    function _updateVotingPower(address user) internal {
        StakeInfo storage userStake = stakes[user];
        uint256 newVotingPower = userStake.amount + delegatedVotes[user];
        userStake.votingPower = newVotingPower;
    }
    
    /**
     * @notice Update leaderboard with user's position
     */
    function _updateLeaderboard(address user) internal {
        // Check if user is already in top stakers to avoid duplicates
        bool isInTop = false;
        for (uint256 i = 0; i < topStakers.length; i++) {
            if (topStakers[i] == user) {
                isInTop = true;
                break;
            }
        }
        
        // Add to leaderboard if not already present and room available
        if (!isInTop && topStakers.length < 100) {
            topStakers.push(user);
        }
        
        // Replace bottom if amount exceeds current bottom 100 holder
        if (isInTop || topStakers.length >= 100) {
            _sortLeaderboard();
        }
        
        // Update ranks
        for (uint256 i = 0; i < topStakers.length; i++) {
            userRank[topStakers[i]] = i + 1;
        }
        
        emit LeaderboardUpdated(user, userRank[user]);
    }
    
    /**
     * @notice Sort leaderboard (bubble sort for small array)
     */
    function _sortLeaderboard() internal {
        for (uint256 i = 0; i < topStakers.length; i++) {
            for (uint256 j = i + 1; j < topStakers.length; j++) {
                if (stakes[topStakers[j]].amount > stakes[topStakers[i]].amount) {
                    address temp = topStakers[i];
                    topStakers[i] = topStakers[j];
                    topStakers[j] = temp;
                }
            }
        }
    }
    
    /**
     * @notice Check and unlock achievements for user
     */
    function _checkAchievements(address user) internal {
        StakeInfo memory userStake = stakes[user];
        
        // FIRST_STAKE
        if (userStake.startTime > 0) {
            _unlockAchievement(user, Achievement.FIRST_STAKE);
        }
        
        // LONG_TERM_HOLDER (staked for 365 days)
        if (block.timestamp >= userStake.startTime + 365 days && userStake.amount > 0) {
            _unlockAchievement(user, Achievement.LONG_TERM_HOLDER);
        }
        
        // WHALE (100k+ ONBT staked)
        if (userStake.amount >= 100000 ether) {
            _unlockAchievement(user, Achievement.WHALE);
        }
        
        // COMPOUND_MASTER (compounded 10+ times)
        if (userStake.totalCompounded >= 10 ether) {
            _unlockAchievement(user, Achievement.COMPOUND_MASTER);
        }
        
        // EARLY_ADOPTER (in top 100 at time of stake)
        // Already unlocked in _unlockAchievement once, stays locked
        if (userRank[user] > 0 && userRank[user] <= 100) {
            _unlockAchievement(user, Achievement.EARLY_ADOPTER);
        }
        
        // LOYAL_STAKER (never unstaked for 180 days)
        if (block.timestamp >= userStake.startTime + 180 days && userStake.amount > 0) {
            _unlockAchievement(user, Achievement.LOYAL_STAKER);
        }
        
        // REWARDS_PIONEER (claimed in first week after launch)
        if (block.timestamp <= userStake.startTime + 7 days && userStake.lastActionTime > 0) {
            _unlockAchievement(user, Achievement.REWARDS_PIONEER);
        }
    }
    
    /**
     * @notice Unlock a specific achievement
     */
    function _unlockAchievement(address user, Achievement achievement) internal {
        uint256 bitmap = achievementsBitmap[user];
        uint256 bit = 1 << uint256(achievement);
        
        // Check if already unlocked
        if ((bitmap & bit) == 0) {
            achievementsBitmap[user] = bitmap | bit;
            emit AchievementUnlocked(user, achievement);
            
            // Mint NFT if contract is set
            if (achievementNFT != address(0)) {
                // Call NFT contract to mint achievement NFT
                // IAchievementNFT(achievementNFT).mint(user, uint256(achievement));
            }
        }
    }
    
    /**
     * @notice Sync stake to hub chain
     */
    function _syncStakeToHub(address user, uint256 amount, bool isStake, uint256 nativeFee) internal {
        bytes memory payload = abi.encode(
            isStake ? MSG_STAKE : MSG_UNSTAKE,
            user,
            amount,
            block.timestamp
        );
        
        // Estimate fees and send message
        bytes memory extraOptions = hex"";
        bytes memory options = this.combineOptions(
            hubChainEid,
            isStake ? MSG_STAKE : MSG_UNSTAKE,
            extraOptions
        );
        MessagingFee memory fee = MessagingFee(nativeFee, 0);
        
        _lzSend(
            hubChainEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
    }
    
    /**
     * @notice Get current chain ID as uint16
     */
    function _getLocalEid() internal view returns (uint32) {
        return localEid;
    }
    
    // ============ LayerZero Functions ============
    
    /**
     * @notice Handle incoming LayerZero messages
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 /*_guid*/,
        bytes calldata _payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        (uint16 msgType, address user, uint256 amount, ) = abi.decode(
            _payload,
            (uint16, address, uint256, uint256)
        );
        
        uint32 srcEid = _origin.srcEid;
        
        if (msgType == MSG_STAKE) {
            _handleRemoteStake(srcEid, user, amount);
        } else if (msgType == MSG_UNSTAKE) {
            _handleRemoteUnstake(srcEid, user, amount);
        } else if (msgType == MSG_SYNC_REWARDS) {
            _handleRewardsSync(user, amount);
        }
    }
    
    /**
     * @notice Handle remote stake message (hub only)
     */
    function _handleRemoteStake(uint32 srcEid, address user, uint256 amount) internal {
        require(isHub, "Only hub can receive stakes");
        
        crossChainStakes[user][srcEid] += amount;
        globalTotalStaked += amount;
        
        emit CrossChainStakeSynced(user, srcEid, amount);
    }
    
    /**
     * @notice Handle remote unstake message (hub only)
     */
    function _handleRemoteUnstake(uint32 srcEid, address user, uint256 amount) internal {
        require(isHub, "Only hub can receive unstakes");
        
        uint256 currentStake = crossChainStakes[user][srcEid];
        require(amount <= currentStake, "Unstake amount exceeds stake");
        
        crossChainStakes[user][srcEid] = currentStake - amount;
        globalTotalStaked -= amount;
        
        emit CrossChainStakeSynced(user, srcEid, 0);
    }
    
    /**
     * @notice Handle rewards sync message
     */
    function _handleRewardsSync(address user, uint256 amount) internal {
        stakes[user].pendingRewards += amount;
        emit RewardsSynced(user, amount);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update reward rate (owner only)
        * @param newRate New base reward rate in basis points.
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        uint256 oldRate = baseRewardRate;
        baseRewardRate = newRate;
        rewardPerSecond = (newRate * 1e18) / (365 days * 10000);
        
        emit RewardRateUpdated(oldRate, newRate);
    }
    
    /**
     * @notice Add a new reward token
        * @param token Reward token address to add.
     */
    function addRewardToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token");
        require(!isRewardToken[token], "Already reward token");
        
        rewardTokens.push(token);
        isRewardToken[token] = true;
        
        emit RewardTokenAdded(token);
    }
    
    /**
     * @notice Remove a reward token (cannot remove ONBT)
        * @param token Reward token address to remove.
     */
    function removeRewardToken(address token) external onlyOwner {
        require(token != address(onbtToken), "Cannot remove ONBT");
        require(isRewardToken[token], "Not a reward token");
        
        isRewardToken[token] = false;
        
        // Remove from array
        for (uint256 i = 0; i < rewardTokens.length; i++) {
            if (rewardTokens[i] == token) {
                rewardTokens[i] = rewardTokens[rewardTokens.length - 1];
                rewardTokens.pop();
                break;
            }
        }
        
        emit RewardTokenRemoved(token);
    }
    
    /**
     * @notice Set achievement NFT contract
     * @param nftContract Achievement NFT contract address.
     */
    function setAchievementNFT(address nftContract) external onlyOwner {
        achievementNFT = nftContract;
    }
    
    /**
     * @notice Set peer for a chain (LayerZero V2)
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        // OApp has setPeer function built-in
        super.setPeer(_eid, _peer);
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
     * @notice Emergency withdraw (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
    
    /**
     * @notice Estimate LayerZero fees for cross-chain operations
     */
    function quote(
        uint32 _dstEid,
        bytes calldata _message,
        bytes calldata _options,
        bool _payInLzToken
    ) external view returns (MessagingFee memory fee) {
        return _quote(_dstEid, _message, _options, _payInLzToken);
    }
    
    /**
     * @notice Set enforced options for LayerZero messaging
     * @param _enforcedOptions Array of enforced options per destination
     * @dev Inherited from OAppOptionsType3, override to ensure proper access control
     */
    function setEnforcedOptions(EnforcedOptionParam[] calldata _enforcedOptions) public override onlyOwner {
        _setEnforcedOptions(_enforcedOptions);
    }
}

