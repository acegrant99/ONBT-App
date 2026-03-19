// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";

// Token interface
interface IOmnichainNabatOFT is IERC20 {
    function getPeerAddress(uint32 eid) external view returns (bytes32);
    function getRegisteredChains() external view returns (uint32[] memory);
}

// Staking contract interface - consumes rewards
interface IONBTOmnichainStaking {
    function refillRewards(uint256 amount) external returns (bool);
    function getRewardsNeeded() external view returns (uint256);
}

// Treasury vault interface
interface IONBTOmnichainVault {
    function receiveRewards(uint256 amount) external payable;
    function withdrawForDistribution(uint256 amount) external returns (bool);
}

// Incentive controller interface
interface IONBTIncentiveController {
    function setRewardRate(uint32 eid, uint256 rateBps) external;
    function computeRewards(address user) external view returns (uint256);
    function getRewardRate(uint32 eid) external view returns (uint256);
}

/**
 * @title ONBTRewardsPool
 * @dev LayerZero-enabled omnichain rewards pool for ONBT staking
 * 
 * Hub Chain: Base (main reward treasury)
 * Destination Chains: Request and receive rewards as needed
 * 
 * Features:
 * - Auto-refill staking contracts when low on rewards
 * - Cross-chain reward distribution coordination
 * - Multi-token reward support
 * - Rate limiting for security
 * - Emergency withdrawal
 * - Transparent accounting
 * 
 * Message Types:
 * - REQUEST_REWARDS: Destination requests reward tokens
 * - SEND_REWARDS: Hub sends rewards to destination
 * - REPORT_BALANCE: Report current balance to hub
 * - UPDATE_ALLOCATION: Update reward allocation per chain
 */
contract ONBTRewardsPool is OApp, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    // ============ Message Types ============
    
    uint16 public constant MSG_REQUEST_REWARDS = 1;
    uint16 public constant MSG_SEND_REWARDS = 2;
    uint16 public constant MSG_REPORT_BALANCE = 3;
    uint16 public constant MSG_UPDATE_ALLOCATION = 4;
    
    // ============ State Variables ============
    
    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Hub chain LayerZero EID (Base)
    uint32 public immutable hubChainEid;
    
    /// @notice Whether this deployment is on the hub chain
    bool public immutable isHub;
    
    /// @notice ONBT token
    IERC20 public immutable onbtToken;
    
    /// @notice Staking contract that receives rewards
    address public stakingContract;

    /// @notice Incentive controller for reward policy
    address public incentiveController;
    
    /// @notice Minimum balance before auto-refill triggers
    uint256 public refillThreshold = 10000 ether; // 10k ONBT
    
    /// @notice Amount to refill when threshold reached
    uint256 public refillAmount = 50000 ether; // 50k ONBT
    
    /// @notice Maximum rewards per request (rate limiting)
    uint256 public maxRequestAmount = 100000 ether; // 100k ONBT
    
    /// @notice Cooldown period between requests (1 hour)
    uint256 public requestCooldown = 1 hours;
    
    /// @notice Reward allocation per chain (hub only)
    mapping(uint32 => uint256) public chainAllocations;
    
    /// @notice Total allocated across all chains
    uint256 public totalAllocated;
    
    /// @notice Last request time per chain
    mapping(uint32 => uint256) public lastRequestTime;
    
    /// @notice Total rewards distributed per chain
    mapping(uint32 => uint256) public totalDistributed;
    
    /// @notice Supported reward tokens
    mapping(address => bool) public isSupportedToken;
    address[] public supportedTokens;
    
    // ============ Events ============
    
    event RewardsRequested(uint32 indexed srcEid, uint256 amount);
    event RewardsSent(uint32 indexed dstEid, address token, uint256 amount);
    event AllocationUpdated(uint32 indexed eid, uint256 oldAllocation, uint256 newAllocation);
    event StakingContractUpdated(address oldContract, address newContract);
    event IncentiveControllerUpdated(address oldController, address newController);
    event RefillConfigured(uint256 threshold, uint256 amount);
    event TokenSupported(address token, bool supported);
    event EmergencyRefill(address to, uint256 amount);
    
    // ============ Constructor ============

    /**
     * @notice Initializes the rewards pool.
     * @param _lzEndpoint LayerZero endpoint address.
     * @param _onbtToken ONBT token address.
     * @param _localEid Local chain endpoint ID.
     * @param _hubChainEid Hub chain endpoint ID.
     * @param _isHub Whether this deployment is the hub.
     * @param _stakingContract Staking contract address receiving rewards.
     */
    constructor(
        address _lzEndpoint,
        address _onbtToken,
        uint32 _localEid,
        uint32 _hubChainEid,
        bool _isHub,
        address _stakingContract
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_onbtToken != address(0), "Invalid token");
        require(_stakingContract != address(0), "Invalid staking contract");
        
        onbtToken = IERC20(_onbtToken);
        localEid = _localEid;
        hubChainEid = _hubChainEid;
        isHub = _isHub;
        stakingContract = _stakingContract;
        
        // Add ONBT as supported token
        isSupportedToken[_onbtToken] = true;
        supportedTokens.push(_onbtToken);
    }
    
    // ============ Reward Distribution Functions ============
    
    /**
     * @notice Check staking contract balance and refill if needed
     */
    function checkAndRefill() external nonReentrant {
        uint256 stakingBalance = onbtToken.balanceOf(stakingContract);
        
        if (stakingBalance < refillThreshold) {
            uint256 amount = _getConfiguredRefillAmount();
            uint256 poolBalance = onbtToken.balanceOf(address(this));
            require(poolBalance >= amount, "Insufficient pool balance");
            
            onbtToken.safeTransfer(stakingContract, amount);
            emit EmergencyRefill(stakingContract, amount);
        }
    }
    
    /**
     * @notice Request rewards from hub (destination chains only)
     * @param amount Amount of rewards needed
     */
    function requestRewards(uint256 amount) external payable nonReentrant whenNotPaused {
        require(!isHub, "Hub doesn't request rewards");
        require(msg.sender == stakingContract, "Only staking contract");
        require(amount <= _getConfiguredRequestCap(), "Exceeds max request");
        require(block.timestamp >= lastRequestTime[localEid] + requestCooldown, "Cooldown active");
        
        lastRequestTime[localEid] = block.timestamp;
        
        bytes memory payload = abi.encode(
            MSG_REQUEST_REWARDS,
            amount,
            block.timestamp
        );
        
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            hubChainEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
        
        emit RewardsRequested(localEid, amount);
    }
    
    /**
     * @notice Send rewards to destination chain (hub only)
    * @param dstEid Destination chain EID
     * @param amount Amount to send
     */
    function sendRewards(uint32 dstEid, uint256 amount) external payable onlyOwner nonReentrant {
        require(isHub, "Only hub can send");
        require(amount <= chainAllocations[dstEid], "Exceeds allocation");
        require(onbtToken.balanceOf(address(this)) >= amount, "Insufficient balance");
        
        chainAllocations[dstEid] -= amount;
        totalDistributed[dstEid] += amount;
        
        bytes memory payload = abi.encode(
            MSG_SEND_REWARDS,
            address(onbtToken),
            amount,
            block.timestamp
        );
        
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            dstEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
        
        // Note: In production, you'd bridge the actual tokens via LayerZero OFT
        // For now, we assume tokens are pre-deployed on each chain
        
        emit RewardsSent(dstEid, address(onbtToken), amount);
    }
    
    /**
     * @notice Deposit rewards into pool (anyone can contribute)
     */
    function depositRewards(address token, uint256 amount) external nonReentrant {
        require(isSupportedToken[token], "Token not supported");
        require(amount > 0, "Invalid amount");
        
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
    }
    
    /**
     * @notice Emergency transfer rewards directly to staking contract
     */
    function emergencyRefill(uint256 amount) external onlyOwner nonReentrant {
        require(onbtToken.balanceOf(address(this)) >= amount, "Insufficient balance");
        onbtToken.safeTransfer(stakingContract, amount);
        emit EmergencyRefill(stakingContract, amount);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get available balance in pool
     */
    function availableBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
    
    /**
     * @notice Get staking contract balance
     */
    function stakingContractBalance() external view returns (uint256) {
        return onbtToken.balanceOf(stakingContract);
    }
    
    /**
     * @notice Check if refill is needed
     */
    function needsRefill() external view returns (bool) {
        return onbtToken.balanceOf(stakingContract) < refillThreshold;
    }
    
    /**
     * @notice Get allocation remaining for a chain
     */
    function getAllocationRemaining(uint32 eid) external view returns (uint256) {
        return chainAllocations[eid];
    }
    
    /**
     * @notice Get all supported tokens
     */
    function getSupportedTokens() external view returns (address[] memory) {
        return supportedTokens;
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
        
        if (msgType == MSG_REQUEST_REWARDS) {
            _handleRewardRequest(srcEid, _payload);
        } else if (msgType == MSG_SEND_REWARDS) {
            _handleRewardReceipt(_payload);
        } else if (msgType == MSG_REPORT_BALANCE) {
            _handleBalanceReport(srcEid, _payload);
        }
    }
    
    /**
     * @notice Handle reward request from destination chain (hub only)
     */
    function _handleRewardRequest(uint32 srcEid, bytes memory payload) internal view {
        require(isHub, "Only hub handles requests");
        
        (, uint256 amount, ) = abi.decode(payload, (uint16, uint256, uint256));
        
        // Validate and prepare reward transfer
        if (amount <= chainAllocations[srcEid] && 
            onbtToken.balanceOf(address(this)) >= amount) {
            // Auto-approve reward transfer
            // In production, this would trigger sendRewards()
        }
    }
    
    /**
     * @notice Handle reward receipt on destination chain
     */
    function _handleRewardReceipt(bytes memory payload) internal {
        require(!isHub, "Hub doesn't receive rewards");
        
        (, address token, uint256 amount, ) = abi.decode(
            payload, 
            (uint16, address, uint256, uint256)
        );
        
        // Transfer to staking contract
        if (token == address(onbtToken) && amount > 0) {
            onbtToken.safeTransfer(stakingContract, amount);
            emit EmergencyRefill(stakingContract, amount);
        }
    }
    
    /**
     * @notice Handle balance report from destination
     */
    function _handleBalanceReport(uint32 /*srcEid*/, bytes memory /*payload*/) internal view {
        require(isHub, "Only hub tracks balances");
        // Future: Store chain balances for monitoring
    }

    function _getConfiguredRefillAmount() internal view returns (uint256) {
        if (incentiveController == address(0)) {
            return refillAmount;
        }

        uint256 rateBps = IONBTIncentiveController(incentiveController).getRewardRate(localEid);
        if (rateBps == 0) {
            return refillAmount;
        }

        return (refillAmount * rateBps) / 10000;
    }

    function _getConfiguredRequestCap() internal view returns (uint256) {
        if (incentiveController == address(0)) {
            return maxRequestAmount;
        }

        uint256 rateBps = IONBTIncentiveController(incentiveController).getRewardRate(localEid);
        if (rateBps == 0) {
            return maxRequestAmount;
        }

        return (maxRequestAmount * rateBps) / 10000;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update staking contract address
        * @param newContract New staking contract address.
     */
    function setStakingContract(address newContract) external onlyOwner {
        require(newContract != address(0), "Invalid address");
        address oldContract = stakingContract;
        stakingContract = newContract;
        emit StakingContractUpdated(oldContract, newContract);
    }

    /**
     * @notice Update incentive controller address
        * @param newController New incentive controller address.
     */
    function setIncentiveController(address newController) external onlyOwner {
        require(newController != address(0), "Invalid address");
        emit IncentiveControllerUpdated(incentiveController, newController);
        incentiveController = newController;
    }
    
    /**
     * @notice Update refill configuration
        * @param threshold Minimum staking balance threshold.
        * @param amount Refill transfer amount.
     */
    function setRefillConfig(uint256 threshold, uint256 amount) external onlyOwner {
        refillThreshold = threshold;
        refillAmount = amount;
        emit RefillConfigured(threshold, amount);
    }
    
    /**
     * @notice Set allocation for a chain (hub only)
        * @param eid Chain endpoint ID.
        * @param allocation Allocation amount.
     */
    function setChainAllocation(uint32 eid, uint256 allocation) external onlyOwner {
        require(isHub, "Only hub sets allocations");
        
        uint256 oldAllocation = chainAllocations[eid];
        totalAllocated = totalAllocated - oldAllocation + allocation;
        chainAllocations[eid] = allocation;
        
        emit AllocationUpdated(eid, oldAllocation, allocation);
    }
    
    /**
     * @notice Add or remove supported token
        * @param token Token address.
        * @param supported Whether token is supported.
     */
    function setSupportedToken(address token, bool supported) external onlyOwner {
        require(token != address(0), "Invalid token");
        
        if (supported && !isSupportedToken[token]) {
            supportedTokens.push(token);
        } else if (!supported && isSupportedToken[token]) {
            // Remove from array
            for (uint256 i = 0; i < supportedTokens.length; i++) {
                if (supportedTokens[i] == token) {
                    supportedTokens[i] = supportedTokens[supportedTokens.length - 1];
                    supportedTokens.pop();
                    break;
                }
            }
        }
        
        isSupportedToken[token] = supported;
        emit TokenSupported(token, supported);
    }
    
    /**
     * @notice Update rate limiting parameters
        * @param maxAmount Maximum request amount.
        * @param cooldown Cooldown in seconds between requests.
     */
    function setRateLimits(uint256 maxAmount, uint256 cooldown) external onlyOwner {
        maxRequestAmount = maxAmount;
        requestCooldown = cooldown;
    }
    
    /**
     * @notice Set peer for a chain (LayerZero V2)
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }
    
    /**
     * @notice Pause operations
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause operations
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
     * @notice Returns local chain endpoint ID.
     * @return Local endpoint ID.
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
}

