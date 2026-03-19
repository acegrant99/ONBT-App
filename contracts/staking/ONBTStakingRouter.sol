// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ONBTStakingRouter
 * @dev LayerZero-enabled router coordinating staking, yield distribution, and rewards
 * 
 * Purpose: Integration layer between:
 * - ONBTOmnichainStaking (handles deposits/withdrawals)
 * - ONBTYieldDistributor (distributes yield proportionally)
 * - ONBTRewardsPool (funds reward payouts)
 * 
 * Architecture:
 * Hub: Base (aggregates all metrics, coordinates distributions)
 * Spokes: All other chains (report to hub, execute locally)
 * 
 * Message Flow:
 * 1. User stakes -> Staking contract -> Router.updateShares()
 * 2. Router -> YieldDistributor.updateShares() (local)
 * 3. Router -> Hub via LayerZero (cross-chain sync)
 * 4. Hub aggregates -> Calculates global yield distribution
 * 5. Hub -> Spokes: Distribute rewards instruction
 * 6. Spoke Router -> Staking.distributeRewards()
 */
contract ONBTStakingRouter is OApp, ReentrancyGuard {
    
    // ============ Message Types ============
    
    uint16 public constant MSG_SHARE_UPDATE = 1;
    uint16 public constant MSG_CLAIM_REWARDS = 2;
    uint16 public constant MSG_DISTRIBUTE_YIELD = 3;
    uint16 public constant MSG_SYNC_METRICS = 4;
    
    // ============ State Variables ============
    
    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Hub chain LayerZero EID (Base)
    uint32 public immutable hubChainEid;
    
    /// @notice Whether this is the hub deployment
    bool public immutable isHub;
    
    /// @notice Staking contract
    address public stakingContract;
    
    /// @notice Yield distributor contract
    address public yieldDistributor;
    
    /// @notice Rewards pool contract
    address public rewardsPool;

    /// @notice Default options for LZ receive (type 3 options)
    uint128 public defaultLzReceiveGas;
    uint128 public defaultLzReceiveValue;
    
    /// @notice Total value staked across all chains (hub only)
    uint256 public globalTotalStaked;
    
    /// @notice Total value staked per chain (hub only)
    mapping(uint32 => uint256) public chainTotalStaked;
    
    /// @notice Total shares per chain
    mapping(uint32 => uint256) public chainTotalShares;
    
    /// @notice Last sync timestamp per chain
    mapping(uint32 => uint256) public lastSyncTime;
    
    /// @notice Yield distribution ratios (basis points, 10000 = 100%)
    mapping(uint32 => uint256) public chainYieldRatio;
    
    /// @notice Pending yield per chain
    mapping(uint32 => uint256) public pendingYield;
    
    // ============ Events ============
    
    event SharesUpdated(address indexed user, uint256 oldShares, uint256 newShares, uint32 eid);
    event YieldDistributed(uint32 indexed eid, uint256 amount);
    event GlobalMetricsSynced(uint256 totalStaked, uint256 timestamp);
    event ContractsUpdated(address staking, address yieldDist, address rewards);
    event ChainYieldRatioUpdated(uint32 indexed eid, uint256 ratio);
    
    // ============ Constructor ============

    /**
     * @notice Initializes staking router.
     * @param _lzEndpoint LayerZero endpoint address.
     * @param _localEid Local chain endpoint ID.
     * @param _hubChainEid Hub chain endpoint ID.
     * @param _isHub Whether this deployment is the hub.
     * @param _stakingContract Staking contract address.
     * @param _yieldDistributor Yield distributor contract address.
     * @param _rewardsPool Rewards pool contract address.
     */
    constructor(
        address _lzEndpoint,
        uint32 _localEid,
        uint32 _hubChainEid,
        bool _isHub,
        address _stakingContract,
        address _yieldDistributor,
        address _rewardsPool
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        localEid = _localEid;
        hubChainEid = _hubChainEid;
        isHub = _isHub;
        stakingContract = _stakingContract;
        yieldDistributor = _yieldDistributor;
        rewardsPool = _rewardsPool;

        defaultLzReceiveGas = 200000;
        defaultLzReceiveValue = 0;
    }
    
    // ============ Core Router Functions ============
    
    /**
     * @notice Update user shares in yield distributor
     * @dev Called by staking contract when user stakes/unstakes
     */
    function updateShares(address user, uint256 newShares) external nonReentrant {
        require(msg.sender == stakingContract, "Only staking contract");
        
        // Update local yield distributor
        if (yieldDistributor != address(0)) {
            (bool success, ) = yieldDistributor.call(
                abi.encodeWithSignature("updateShares(address,uint256)", user, newShares)
            );
            require(success, "YieldDistributor update failed");
        }
        
        emit SharesUpdated(user, 0, newShares, localEid);
        
        // Sync to hub if not already hub
        if (!isHub) {
            _syncToHub();
        }
    }
    
    /**
     * @notice Claim rewards for user
     * @dev Routes through yield distributor and rewards pool
     */
    function claimRewards(address user) external nonReentrant returns (uint256) {
        require(msg.sender == stakingContract, "Only staking contract");
        
        if (yieldDistributor == address(0)) return 0;
        
        (bool success, bytes memory data) = yieldDistributor.call(
            abi.encodeWithSignature("claimRewards(address)", user)
        );
        
        if (!success) return 0;
        
        uint256 amount = abi.decode(data, (uint256));
        return amount;
    }
    
    /**
     * @notice Sync local metrics to hub
     */
    function syncToHub() external payable nonReentrant {
        require(!isHub, "Hub doesn't sync to itself");
        _syncToHub();
    }
    
    /**
     * @notice Internal sync to hub
     */
    function _syncToHub() internal {
        if (isHub) return;
        
        // Get current chain stats
        uint256 totalStaked = _getTotalStakedLocal();
        uint256 totalShares = _getTotalSharesLocal();
        
        bytes memory payload = abi.encode(
            MSG_SYNC_METRICS,
            totalStaked,
            totalShares,
            block.timestamp
        );
        
        bytes memory options = _getLzReceiveOptions();
        MessagingFee memory fee = MessagingFee(address(this).balance, 0);
        
        if (fee.nativeFee > 0) {
            _lzSend(
                hubChainEid,
                payload,
                options,
                fee,
                payable(address(this))
            );
        }
    }
    
    /**
     * @notice Distribute yield from hub to destination chains
     * @dev Hub only - called after yield is calculated
     */
    function distributeYieldToChains(uint32[] calldata chainEids, uint256[] calldata amounts) 
        external 
        payable 
        onlyOwner 
        nonReentrant 
    {
        require(isHub, "Only hub distributes");
        require(chainEids.length == amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < chainEids.length; i++) {
            uint32 chainEid = chainEids[i];
            uint256 amount = amounts[i];
            
            if (chainEid == localEid) {
                // Local distribution
                _executeYieldDistribution(amount);
            } else {
                // Remote distribution via LayerZero
                bytes memory payload = abi.encode(
                    MSG_DISTRIBUTE_YIELD,
                    amount,
                    block.timestamp
                );
                
                bytes memory options = _getLzReceiveOptions();
                MessagingFee memory fee = MessagingFee(msg.value / chainEids.length, 0);
                
                _lzSend(
                    chainEid,
                    payload,
                    options,
                    fee,
                    payable(msg.sender)
                );
                
                pendingYield[chainEid] += amount;
            }
            
            emit YieldDistributed(chainEid, amount);
        }
    }
    
    /**
     * @notice Execute yield distribution locally
     */
    function _executeYieldDistribution(uint256 amount) internal {
        if (yieldDistributor != address(0) && amount > 0) {
            (bool success, ) = yieldDistributor.call(
                abi.encodeWithSignature("depositRewards(uint256)", amount)
            );
            require(success, "Yield distribution failed");
        }
    }
    
    /**
     * @notice Request reward refill from RewardsPool
     */
    function requestRewardRefill(uint256 amount) external payable nonReentrant {
        require(msg.sender == stakingContract || msg.sender == owner(), "Unauthorized");
        
        if (rewardsPool != address(0)) {
            (bool success, ) = rewardsPool.call{value: msg.value}(
                abi.encodeWithSignature("requestRewards(uint256)", amount)
            );
            require(success, "Refill request failed");
        }
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get total staked on local chain
     */
    function _getTotalStakedLocal() internal view returns (uint256) {
        if (stakingContract == address(0)) return 0;
        
        (bool success, bytes memory data) = stakingContract.staticcall(
            abi.encodeWithSignature("totalStaked()")
        );
        
        if (!success) return 0;
        return abi.decode(data, (uint256));
    }
    
    /**
     * @notice Get total shares on local chain
     */
    function _getTotalSharesLocal() internal view returns (uint256) {
        if (yieldDistributor == address(0)) return 0;
        
        (bool success, bytes memory data) = yieldDistributor.staticcall(
            abi.encodeWithSignature("totalShares()")
        );
        
        if (!success) return 0;
        return abi.decode(data, (uint256));
    }
    
    /**
     * @notice Get global staking metrics (hub only)
     */
    function getGlobalMetrics() external view returns (
        uint256 totalStaked,
        uint256 totalChains,
        uint256 totalYieldPending
    ) {
        require(isHub, "Only hub tracks global metrics");
        totalStaked = globalTotalStaked;
        totalChains = 0;
        totalYieldPending = 0;
        // Count active chains
        // Sum pending yield
    }
    
    /**
     * @notice Get chain metrics
     */
    function getChainMetrics(uint32 eid) external view returns (
        uint256 totalStaked,
        uint256 totalShares,
        uint256 yieldRatio,
        uint256 pendingYieldAmount,
        uint256 lastSync
    ) {
        totalStaked = chainTotalStaked[eid];
        totalShares = chainTotalShares[eid];
        yieldRatio = chainYieldRatio[eid];
        pendingYieldAmount = pendingYield[eid];
        lastSync = lastSyncTime[eid];
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
        uint16 msgType = abi.decode(_payload, (uint16));
        uint32 srcEid = _origin.srcEid;
        
        if (msgType == MSG_SYNC_METRICS) {
            _handleMetricsSync(srcEid, _payload);
        } else if (msgType == MSG_DISTRIBUTE_YIELD) {
            _handleYieldDistribution(_payload);
        }
    }
    
    /**
     * @notice Handle metrics sync from spoke chains (hub only)
     */
    function _handleMetricsSync(uint32 srcEid, bytes memory payload) internal {
        require(isHub, "Only hub handles sync");
        
        (, uint256 totalStaked, uint256 totalShares, uint256 timestamp) = abi.decode(
            payload,
            (uint16, uint256, uint256, uint256)
        );
        
        // Update global metrics
        uint256 oldStaked = chainTotalStaked[srcEid];
        globalTotalStaked = globalTotalStaked - oldStaked + totalStaked;
        
        chainTotalStaked[srcEid] = totalStaked;
        chainTotalShares[srcEid] = totalShares;
        lastSyncTime[srcEid] = timestamp;
        
        emit GlobalMetricsSynced(globalTotalStaked, block.timestamp);
    }
    
    /**
     * @notice Handle yield distribution from hub
     */
    function _handleYieldDistribution(bytes memory payload) internal {
        require(!isHub, "Hub doesn't receive distribution");
        
        (, uint256 amount, ) = abi.decode(payload, (uint16, uint256, uint256));
        
        _executeYieldDistribution(amount);
        
        uint32 chainEid = localEid;
        if (pendingYield[chainEid] >= amount) {
            pendingYield[chainEid] -= amount;
        }
        
        emit YieldDistributed(chainEid, amount);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update contract addresses
     * @param _staking New staking contract address.
     * @param _yieldDist New yield distributor contract address.
     * @param _rewards New rewards pool contract address.
     */
    function updateContracts(
        address _staking,
        address _yieldDist,
        address _rewards
    ) external onlyOwner {
        if (_staking != address(0)) stakingContract = _staking;
        if (_yieldDist != address(0)) yieldDistributor = _yieldDist;
        if (_rewards != address(0)) rewardsPool = _rewards;
        
        emit ContractsUpdated(stakingContract, yieldDistributor, rewardsPool);
    }
    
    /**
     * @notice Set yield ratio for a chain (hub only)
        * @param eid Chain endpoint ID.
        * @param ratio Yield ratio in basis points.
     */
    function setChainYieldRatio(uint32 eid, uint256 ratio) external onlyOwner {
        require(isHub, "Only hub sets ratios");
        require(ratio <= 10000, "Ratio exceeds 100%");
        
        chainYieldRatio[eid] = ratio;
        emit ChainYieldRatioUpdated(eid, ratio);
    }
    
    /**
     * @notice Set peer for a chain
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }
    
    /**
     * @notice Get current chain ID
     */
    function _getLocalEid() internal view returns (uint32) {
        return localEid;
    }
    
    /**
     * @notice Estimate LayerZero fees
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
     * @notice Update default LZ receive options (type 3)
     * @param gas LZ receive gas limit
     * @param value Native value for execution
     */
    function setDefaultLzReceiveOptions(uint128 gas, uint128 value) external onlyOwner {
        defaultLzReceiveGas = gas;
        defaultLzReceiveValue = value;
    }

    function _getLzReceiveOptions() internal view returns (bytes memory) {
        bytes memory option = defaultLzReceiveValue == 0
            ? abi.encodePacked(defaultLzReceiveGas)
            : abi.encodePacked(defaultLzReceiveGas, defaultLzReceiveValue);

        uint16 optionSize = uint16(option.length + 1); // +1 for optionType

        return abi.encodePacked(
            uint16(3),
            uint8(1),
            optionSize,
            uint8(1),
            option
        );
    }
    
    /**
     * @notice Receive ETH for gas fees
     */
    receive() external payable {}
}

