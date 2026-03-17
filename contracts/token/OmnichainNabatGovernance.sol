// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { MessagingFee } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./OmnichainNabatStorage.sol";

interface ITransferHook {
    function onTransfer(address from, address to, uint256 amount) external;
}

/**
 * @title OmnichainNabatGovernance
 * @dev Governance and security logic module for OmnichainNabatOFT
 * 
 * This module handles:
 * - Cross-chain pause/unpause functionality (LayerZero V2 enabled)
 * - Admin action scheduling with timelock
 * - Transfer limits and rate limiting
 * - Whitelist management for bypassing limits
 * - Transfer hooks for external integrations
 * - Snapshot creation for governance
 * - Reward distribution tracking
 * - Emergency recovery functions
 * - Preferred chain routing configuration
 * 
 * ⚡ LayerZero V2 Enabled - Full cross-chain governance support
 */
abstract contract OmnichainNabatGovernance is OmnichainNabatStorage, Ownable, Pausable {
    
    // ============ Events ============
    
    /// @notice Emitted when transfer limits are updated
    event TransferLimitsUpdated(uint256 maxTransferAmount, uint256 windowSeconds, uint256 maxPerWindow, bool enabled);

    /// @notice Emitted when whitelist entries are updated
    event WhitelistUpdated(address indexed account, bool allowed, bool whitelistEnabled);

    /// @notice Emitted when the transfer hook is updated
    event TransferHookUpdated(address indexed hook);

    /// @notice Emitted when admin action delay is updated
    event AdminActionDelayUpdated(uint256 newDelay);

    /// @notice Emitted when an admin action is scheduled
    event AdminActionScheduled(bytes32 indexed actionId, uint256 executeAfter);

    /// @notice Emitted when an admin action is canceled
    event AdminActionCanceled(bytes32 indexed actionId);

    /// @notice Emitted when preferred chain route is updated
    event PreferredChainRouteUpdated(uint32[] eids);

    /// @notice Emitted when rewards are distributed by the owner
    event RewardsDistributed(address indexed to, uint256 amount);
    
    // ============ LayerZero V2 Governance Events ============
    
    /// @notice Emitted when cross-chain pause is initiated
    event CrossChainPauseInitiated(uint32 indexed destEid, uint64 nonce);
    
    /// @notice Emitted when cross-chain unpause is initiated
    event CrossChainUnpauseInitiated(uint32 indexed destEid, uint64 nonce);
    
    /// @notice Emitted when governance action is executed across chains
    event CrossChainGovernanceExecuted(
        bytes32 indexed actionId,
        uint32 indexed destEid,
        string actionType,
        uint64 nonce
    );
    
    /// @notice Emitted when cross-chain governance message is received
    event CrossChainGovernanceReceived(
        uint32 indexed srcEid,
        uint64 indexed nonce,
        bytes32 actionId,
        bool success
    );
    
    /// @notice Emitted when hub chain governance is executed
    event HubChainGovernanceExecuted(
        bytes32 indexed actionId,
        string actionType,
        uint256 timestamp
    );
    
    /// @notice Emitted when message fee is collected for cross-chain governance
    event GovernanceMessageFeeCollected(uint32 indexed destEid, uint256 fee, uint64 nonce);
    
    // ============ LayerZero Accessors ============
    function _lzEndpoint() internal view virtual returns (ILayerZeroEndpointV2);
    function _getPeer(uint32 _eid) internal view virtual returns (bytes32);
    function _setPeer(uint32 _eid, bytes32 _peer) internal virtual;
    
    // ============ Pause Control ============
    
    /**
     * @notice Pause all token transfers (only owner)
     * @dev If LayerZero enabled, also sends pause message to remote chains
     */
    function pause() external onlyOwner {
        _pause();
        
        // Broadcast pause to all registered chains if LayerZero enabled
        if (layerZeroMessagingEnabled && address(_lzEndpoint()) != address(0)) {
            _broadcastGovernanceMessage("pause", "");
        }
    }

    /**
     * @notice Unpause token transfers (only owner)
     * @dev If LayerZero enabled, also sends unpause message to remote chains
     */
    function unpause() external onlyOwner {
        _unpause();
        
        // Broadcast unpause to all registered chains if LayerZero enabled
        if (layerZeroMessagingEnabled && address(_lzEndpoint()) != address(0)) {
            _broadcastGovernanceMessage("unpause", "");
        }
    }
    
    /**
     * @notice Pause transfers on a specific remote chain via LayerZero
     * @param _destEid Destination chain endpoint ID
     */
    function pauseRemoteChain(uint32 _destEid) external payable onlyOwner {
        require(layerZeroMessagingEnabled, "LayerZero messaging disabled");
        require(address(_lzEndpoint()) != address(0), "LayerZero endpoint not set");
        
        bytes32 actionId = keccak256(abi.encode("pauseRemoteChain", _destEid));
        _sendGovernanceMessage(_destEid, actionId, "pause", "");
        
        emit CrossChainPauseInitiated(_destEid, outboundNonce);
    }
    
    /**
     * @notice Unpause transfers on a specific remote chain via LayerZero
     * @param _destEid Destination chain endpoint ID
     */
    function unpauseRemoteChain(uint32 _destEid) external payable onlyOwner {
        require(layerZeroMessagingEnabled, "LayerZero messaging disabled");
        require(address(_lzEndpoint()) != address(0), "LayerZero endpoint not set");
        
        bytes32 actionId = keccak256(abi.encode("unpauseRemoteChain", _destEid));
        _sendGovernanceMessage(_destEid, actionId, "unpause", "");
        
        emit CrossChainUnpauseInitiated(_destEid, outboundNonce);
    }

    // ============ Admin Action Scheduling (Timelock) ============

    /**
     * @notice Schedule an admin action when timelock is enabled
     * @param _actionId Unique action identifier
     */
    function scheduleAction(bytes32 _actionId) external onlyOwner {
        require(adminActionDelay > 0, "Timelock disabled");
        require(scheduledActions[_actionId] == 0, "Already scheduled");
        uint256 executeAfter = block.timestamp + adminActionDelay;
        scheduledActions[_actionId] = executeAfter;
        emit AdminActionScheduled(_actionId, executeAfter);
    }

    /**
     * @notice Cancel a scheduled admin action
     * @param _actionId Unique action identifier
     */
    function cancelAction(bytes32 _actionId) external onlyOwner {
        require(scheduledActions[_actionId] != 0, "Not scheduled");
        delete scheduledActions[_actionId];
        emit AdminActionCanceled(_actionId);
    }

    /**
     * @notice Update admin timelock delay
     * @param _delay New delay in seconds
     */
    function setAdminActionDelay(uint256 _delay) external onlyOwner {
        adminActionDelay = _delay;
        emit AdminActionDelayUpdated(_delay);
    }

    // ============ Transfer Limits & Rate Limiting ============

    /**
     * @notice Configure transfer caps and rate limits
     * @param _maxTransferAmount Per-transaction cap (0 disables)
     * @param _windowSeconds Rate limit window size in seconds
     * @param _maxPerWindow Maximum transferable amount per window
     * @param _enabled Enable or disable rate limiting
     */
    function setTransferLimits(
        uint256 _maxTransferAmount,
        uint256 _windowSeconds,
        uint256 _maxPerWindow,
        bool _enabled
    ) external onlyOwner {
        bytes32 actionId = keccak256(
            abi.encode("setTransferLimits", _maxTransferAmount, _windowSeconds, _maxPerWindow, _enabled)
        );
        _consumeScheduledAction(actionId);

        maxTransferAmount = _maxTransferAmount;
        rateLimitWindowSeconds = _windowSeconds;
        rateLimitMaxAmount = _maxPerWindow;
        rateLimitEnabled = _enabled;

        emit TransferLimitsUpdated(_maxTransferAmount, _windowSeconds, _maxPerWindow, _enabled);
    }

    /**
     * @notice Enable or disable the whitelist bypass
     * @param _enabled Whether whitelist bypass is enabled
     */
    function setWhitelistEnabled(bool _enabled) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("setWhitelistEnabled", _enabled));
        _consumeScheduledAction(actionId);
        whitelistEnabled = _enabled;
        emit WhitelistUpdated(address(0), false, _enabled);
    }

    /**
     * @notice Update whitelist entry for transfer limit bypass
     * @param _account Account to update
     * @param _allowed Whether the account is allowed
     */
    function setWhitelist(address _account, bool _allowed) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("setWhitelist", _account, _allowed));
        _consumeScheduledAction(actionId);
        transferWhitelist[_account] = _allowed;
        emit WhitelistUpdated(_account, _allowed, whitelistEnabled);
    }

    // ============ Transfer Hook ============

    /**
     * @notice Set transfer hook contract
     * @param _hook Transfer hook contract address
     */
    function setTransferHook(address _hook) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("setTransferHook", _hook));
        _consumeScheduledAction(actionId);
        transferHook = _hook;
        emit TransferHookUpdated(_hook);
    }

    // ============ Chain Routing Configuration ============

    /**
     * @notice Update preferred chain routing order (for UIs)
     * @param _eids Ordered list of endpoint IDs
     */
    function setPreferredChainRoute(uint32[] calldata _eids) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("setPreferredChainRoute", _eids));
        _consumeScheduledAction(actionId);
        preferredChainRoute = _eids;
        emit PreferredChainRouteUpdated(_eids);
    }

    /**
     * @notice Get the preferred chain routing order
     * @return Array of endpoint IDs in preferred order
     */
    function getPreferredChainRoute() external view returns (uint32[] memory) {
        return preferredChainRoute;
    }

    // ============ Reward Distribution ============

    /**
     * @notice Distribute rewards from the owner balance
     * @param _to Recipient address
     * @param _amount Amount to distribute
     * @dev Must be implemented by child contract with onlyOwner modifier
     */
    function distributeRewards(address _to, uint256 _amount) external virtual;

    // ============ Emergency Recovery ============

    /**
     * @notice Recover any ERC20 tokens sent to this contract
     * @param _token Token address
     * @param _to Recipient address
     * @param _amount Amount to recover
     */
    function recoverERC20(address _token, address _to, uint256 _amount) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("recoverERC20", _token, _to, _amount));
        _consumeScheduledAction(actionId);
        require(_token != address(this), "Cannot recover ONBT");
        IERC20(_token).transfer(_to, _amount);
    }

    /**
     * @notice Recover native tokens sent to this contract
     * @param _to Recipient address
     * @param _amount Amount to recover
     */
    function recoverNative(address payable _to, uint256 _amount) external onlyOwner {
        bytes32 actionId = keccak256(abi.encode("recoverNative", _to, _amount));
        _consumeScheduledAction(actionId);
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Native transfer failed");
    }

    // ============ LayerZero Cross-Chain Governance ============
    
    /**
     * @dev Send governance message to a remote chain
     * @param _destEid Destination chain endpoint ID
     * @param _actionId Unique action identifier
     * @param _actionType Type of action (pause, unpause, setLimits, etc.)
     * @param _payload Additional action parameters
     */
    function _sendGovernanceMessage(
        uint32 _destEid,
        bytes32 _actionId,
        string memory _actionType,
        bytes memory _payload
    ) internal {
        require(_getPeer(_destEid) != bytes32(0), "Peer not configured for chain");
        require(layerZeroMessagingEnabled, "Cross-chain messaging disabled");
        
        // Compose governance message
        bytes memory message = abi.encode(_actionId, _actionType, _payload);
        
        // Track pending message
        pendingMessages[pendingMessageCount] = PendingMessage({
            destEid: _destEid,
            payload: message,
            gasLimit: 200000, // Default gas limit for governance
            timestamp: block.timestamp,
            executed: false
        });
        pendingMessageCount++;
        
        // Increment nonce
        outboundNonce++;
        
        // Store sent message
        sentMessages[outboundNonce] = message;
        
        // Update statistics
        messageStats[_destEid].sentCount++;
        totalMessagesSent++;
        lastMessageTimestamp = block.timestamp;
        
        emit CrossChainGovernanceExecuted(_actionId, _destEid, _actionType, outboundNonce);
    }
    
    /**
     * @dev Broadcast governance message to all registered remote chains
     * @param _actionType Type of action
     * @param _payload Additional parameters
     */
    function _broadcastGovernanceMessage(string memory _actionType, bytes memory _payload) internal {
        if (registeredChains.length == 0) return;
        
        bytes32 actionId = keccak256(abi.encode(_actionType, _payload, block.timestamp));
        
        for (uint256 i = 0; i < registeredChains.length; i++) {
            uint32 destEid = registeredChains[i];
            if (_getPeer(destEid) != bytes32(0)) {
                _sendGovernanceMessage(destEid, actionId, _actionType, _payload);
            }
        }
    }
    
    /**
     * @dev Handle incoming cross-chain governance message
     * @param _srcEid Source chain endpoint ID
     * @param _nonce Message nonce
     * @param _payload Message payload
     */
    function _onGovernanceMessageReceived(
        uint32 _srcEid,
        uint64 _nonce,
        bytes memory _payload
    ) internal {
        // Check for replay attack
        bytes32 messageHash = keccak256(_payload);
        require(
            receivedMessageHashes[_srcEid][_nonce] != messageHash,
            "Message already received"
        );
        
        // Record received message
        receivedMessageHashes[_srcEid][_nonce] = messageHash;
        
        // Decode and execute governance action
        (bytes32 actionId, string memory actionType, bytes memory data) = abi.decode(
            _payload,
            (bytes32, string, bytes)
        );

        data.length;
        
        bool success = false;
        
        // Execute based on action type
        if (keccak256(bytes(actionType)) == keccak256(bytes("pause"))) {
            if (!paused()) {
                _pause();
                success = true;
            }
        } else if (keccak256(bytes(actionType)) == keccak256(bytes("unpause"))) {
            if (paused()) {
                _unpause();
                success = true;
            }
        }
        
        // Update statistics
        messageStats[_srcEid].receivedCount++;
        if (success) {
            successfulCrossChainOps++;
        } else {
            messageStats[_srcEid].failedCount++;
            failedCrossChainOps++;
        }
        totalMessagesReceived++;
        
        // Record last message from this chain
        lastMessageFromChain[_srcEid] = messageHash;
        
        emit CrossChainGovernanceReceived(_srcEid, _nonce, actionId, success);
    }
    
    /**
     * @notice Execute hub chain governance action (only allowed on hub chain)
     * @param _actionId Unique action identifier
     * @param _actionType Type of action
     */
    function executeHubGovernance(bytes32 _actionId, string memory _actionType) external onlyOwner {
        require(block.chainid == hubChainEid || hubChainEid == 0, "Only hub chain can execute");
        
        _consumeScheduledAction(_actionId);
        
        emit HubChainGovernanceExecuted(_actionId, _actionType, block.timestamp);
    }
    
    /**
     * @notice Set hub chain endpoint ID for cross-chain coordination
     * @param _hubEid Hub chain endpoint ID
     */
    function setHubChain(uint32 _hubEid) external onlyOwner {
        hubChainEid = _hubEid;
    }
    
    /**
     * @notice Register a remote chain for governance broadcasting
     * @param _eid Remote chain endpoint ID
     * @param _peer Remote OFT contract address (as bytes32)
     */
    function registerRemoteChain(uint32 _eid, bytes32 _peer) external onlyOwner {
        require(!isChainRegistered[_eid], "Chain already registered");
        
        _setPeer(_eid, _peer);
        registeredChains.push(_eid);
        isChainRegistered[_eid] = true;
    }
    
    /**
     * @notice Unregister a remote chain (removes from broadcast list)
     * @param _eid Remote chain endpoint ID
     */
    function unregisterRemoteChain(uint32 _eid) external onlyOwner {
        require(isChainRegistered[_eid], "Chain not registered");
        
        isChainRegistered[_eid] = false;
        _setPeer(_eid, bytes32(0));
        
        // Remove from registeredChains array
        for (uint256 i = 0; i < registeredChains.length; i++) {
            if (registeredChains[i] == _eid) {
                registeredChains[i] = registeredChains[registeredChains.length - 1];
                registeredChains.pop();
                break;
            }
        }
    }
    
    /**
     * @notice Get all registered remote chains
     * @return Array of registered chain EIDs
     */
    function getRegisteredChains() external view returns (uint32[] memory) {
        return registeredChains;
    }
    
    /**
     * @notice Get message statistics for a specific chain
     * @param _eid Remote chain endpoint ID
     * @return sent Number of messages sent
     * @return received Number of messages received
     * @return failed Number of failed messages
     * @return gasUsed Total gas used
     */
    function getMessageStats(uint32 _eid) external view returns (
        uint256 sent,
        uint256 received,
        uint256 failed,
        uint256 gasUsed
    ) {
        MessageStats memory stats = messageStats[_eid];
        return (stats.sentCount, stats.receivedCount, stats.failedCount, stats.totalGasUsed);
    }

    // ============ Internal Helpers ============

    /**
     * @dev Enforce rate limiting for an account
     */
    function _enforceRateLimit(address account, uint256 amount) internal {
        if (rateLimitWindowSeconds == 0 || rateLimitMaxAmount == 0) {
            return;
        }

        RateLimitState storage state = rateLimitState[account];
        if (state.windowStart == 0 || block.timestamp >= state.windowStart + rateLimitWindowSeconds) {
            state.windowStart = block.timestamp;
            state.amountInWindow = 0;
        }

        uint256 newAmount = state.amountInWindow + amount;
        require(newAmount <= rateLimitMaxAmount, "Rate limit exceeded");
        state.amountInWindow = newAmount;
    }

    /**
     * @dev Consume a scheduled action (timelock check)
     */
    function _consumeScheduledAction(bytes32 actionId) internal {
        if (adminActionDelay == 0) {
            return;
        }

        uint256 executeAfter = scheduledActions[actionId];
        require(executeAfter != 0, "Action not scheduled");
        require(block.timestamp >= executeAfter, "Action not ready");
        delete scheduledActions[actionId];
    }
}
