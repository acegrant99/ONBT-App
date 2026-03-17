// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";

/**
 * @title OmnichainNabatStorage
 * @dev Storage module for OmnichainNabatOFT - contains all state variables
 * 
 * This module separates storage concerns from business logic, making the
 * contract more maintainable and easier to audit. All storage variables
 * are organized by category for clarity.
 * 
 * ⚡ LayerZero V2 Enabled - Full omnichain messaging support
 */
abstract contract OmnichainNabatStorage {
    // ============ LayerZero V2 Configuration ============
    // Note: endpoint, owner, delegate, peers are provided by OApp/OAppCore
    // This contract focuses on additional ONBT-specific storage
    
    /// @notice Inbound message nonce counter (for replay protection)
    uint64 public inboundNonce;
    
    /// @notice Outbound message nonce counter (for message ordering)
    uint64 public outboundNonce;
    
    /// @notice Mapping to track sent messages by nonce
    /// @dev Used for message history and retry logic
    mapping(uint64 => bytes) public sentMessages;
    
    /// @notice Mapping to track received messages to prevent replay
    /// @dev Maps (srcEid => nonce) to message hash
    mapping(uint32 => mapping(uint64 => bytes32)) public receivedMessageHashes;
    
    /// @notice Per-chain message delivery statistics
    struct MessageStats {
        uint256 sentCount;
        uint256 receivedCount;
        uint256 failedCount;
        uint256 totalGasUsed;
    }
    
    /// @notice Message statistics per remote chain EID
    mapping(uint32 => MessageStats) public messageStats;
    
    /// @notice Configuration for optional DVN (Decentralized Verifier Network) setup
    /// @dev Maps EID to DVN address
    mapping(uint32 => address) public dvnAddresses;
    
    /// @notice Configuration for required DVN count per chain
    mapping(uint32 => mapping(uint256 => address)) public requiredDVNs;
    
    /// @notice Configuration for optional DVN count per chain
    mapping(uint32 => mapping(uint256 => address)) public optionalDVNs;
    
    /// @notice Mapping to track which chain is the hub (canonical source of truth)
    uint32 public hubChainEid;
    
    /// @notice Enable or disable LayerZero messaging (emergency pause)
    bool public layerZeroMessagingEnabled;
    
    // ============ Branding Storage ============
    
    /// @notice Token logo URI (IPFS, HTTP, or data URI)
    string public logoURI;
    
    /// @notice Project website URL
    string public website;
    
    /// @notice Project description
    string public description;
    
    /// @notice Social media links (JSON format)
    string public socialLinks;
    
    // ============ Deployment Data ============

    /// @notice Total supply cap for source chain checks (0 disables check)
    uint256 public totalSupplyCap;

    /// @notice Block timestamp when deployment was recorded (0 if unset)
    uint256 public deploymentTime;

    // ============ Transfer Tracking ============
    
    /// @notice Total count of local transfers (excludes mint/burn)
    uint256 public totalLocalTransferCount;

    /// @notice Total volume of local transfers (excludes mint/burn)
    uint256 public totalLocalTransferVolume;

    // ============ Bridge Tracking ============
    
    /// @notice Total tokens bridged out from this chain (local decimals)
    uint256 public totalBridgedOut;

    /// @notice Total tokens bridged in to this chain (local decimals)
    uint256 public totalBridgedIn;

    /// @notice Total count of cross-chain sends from this chain
    uint256 public totalCrossChainSendCount;

    /// @notice Total count of cross-chain receives to this chain
    uint256 public totalCrossChainReceiveCount;

    // ============ Supply & Holder Tracking ============
    
    /// @notice Highest observed total supply on this chain
    uint256 public peakLocalSupply;

    /// @notice Approximate unique holder count on this chain
    uint256 public holderCount;

    /// @notice Last known balance state for holder counting
    mapping(address => bool) internal _hasBalance;

    // ============ Transfer Limits & Rate Limiting ============
    
    /// @notice Max transfer amount (0 disables)
    uint256 public maxTransferAmount;

    /// @notice Rate limit window size in seconds
    uint256 public rateLimitWindowSeconds;

    /// @notice Max transferable amount per window
    uint256 public rateLimitMaxAmount;

    /// @notice Enable or disable rate limiting
    bool public rateLimitEnabled;

    /// @notice Enable or disable whitelist bypass
    bool public whitelistEnabled;

    /// @notice Transfer whitelist for bypassing limits
    mapping(address => bool) public transferWhitelist;

    /// @notice Per-address rate limit state
    struct RateLimitState {
        uint256 windowStart;
        uint256 amountInWindow;
    }

    /// @notice Mapping of addresses to their rate limit state
    mapping(address => RateLimitState) public rateLimitState;

    // ============ Hook & Admin Controls ============
    
    /// @notice Optional transfer hook contract
    address public transferHook;

    /// @notice Minimum delay for admin actions (0 disables timelock)
    uint256 public adminActionDelay;

    /// @notice Scheduled action timestamps
    mapping(bytes32 => uint256) public scheduledActions;

    // ============ Rewards Tracking ============
    
    /// @notice Total rewards distributed via owner transfers
    uint256 public totalRewardsDistributed;

    // ============ Per-Chain Bridge Tracking ============
    
    /// @notice Per-destination chain bridge volume (local decimals)
    mapping(uint32 => uint256) public bridgedOutByEid;

    /// @notice Per-source chain bridge volume (local decimals)
    mapping(uint32 => uint256) public bridgedInByEid;

    /// @notice Per-destination chain send count
    mapping(uint32 => uint256) public crossChainSendCountByEid;

    /// @notice Per-source chain receive count
    mapping(uint32 => uint256) public crossChainReceiveCountByEid;

    /// @notice Preferred chain routing order for UIs
    uint32[] public preferredChainRoute;
    
    // ============ Remote Chain Supply Tracking ============
    
    /// @notice Mapping of remote chain EIDs to their token supply
    mapping(uint32 => uint256) public remoteChainSupply;
    
    /// @notice Array of all registered remote chain EIDs
    uint32[] public registeredChains;
    
    /// @notice Mapping to check if a chain is registered
    mapping(uint32 => bool) public isChainRegistered;
    
    // ============ LayerZero Message Tracking & Analytics ============
    
    /// @notice Total messages sent across all chains
    uint256 public totalMessagesSent;
    
    /// @notice Total messages received from all chains
    uint256 public totalMessagesReceived;
    
    /// @notice Total cross-chain operations succeeded
    uint256 public successfulCrossChainOps;
    
    /// @notice Total cross-chain operations failed (needs retry)
    uint256 public failedCrossChainOps;
    
    /// @notice Last LayerZero message sent timestamp
    uint256 public lastMessageTimestamp;
    
    /// @notice Pending cross-chain message queue
    struct PendingMessage {
        uint32 destEid;
        bytes payload;
        uint256 gasLimit;
        uint256 timestamp;
        bool executed;
    }
    
    /// @notice Queue of pending messages waiting for confirmation
    mapping(uint256 => PendingMessage) public pendingMessages;
    uint256 public pendingMessageCount;
    
    /// @notice Confirmation state for hub chain (only hub chain tracks this)
    uint256 public remoteChainSupplyLastUpdated;
    
    // ============ Cross-Chain Event History ============
    
    /// @notice Track cross-chain transfers by destination
    mapping(uint32 => uint256) public crossChainTransfersByDestination;
    
    /// @notice Track cross-chain receives by source
    mapping(uint32 => uint256) public crossChainReceivesBySource;
    
    /// @notice Last message from each remote chain (for deduplication)
    mapping(uint32 => bytes32) public lastMessageFromChain;
    
    // ============ Constructor ============
    
    /**
     * @dev Initializes immutable storage variables and LayerZero defaults
     * @param _totalSupply Total supply to be minted at deployment
     * @param _endpoint LayerZero endpoint address
     */
    // Note: Constructor removed - initialization handled by OFT/OApp
    // Abstract contract uses parent class initialization
    
    /**
     * @dev Reserved storage gap for future upgrades (if needed)
     * Note: This contract is designed to be immutable, but the gap
     * provides flexibility for potential proxy-based upgrades if
     * governance decides to pursue that path in the future.
     */
    uint256[50] private __gap;
    
    // ============ LayerZero V2 Events ============
    
    /**
     * @notice PeerSet event inherited from IOAppCore
     * @dev Do not redeclare - use event from LayerZero interface
     */
    
    /**
     * @notice Emitted when a message is sent to a remote chain
     * @param destEid Destination chain endpoint ID
     * @param nonce Message nonce
     * @param payload Message payload
     * @param gasLimit Gas limit for remote execution
     */
    event MessageSent(
        uint32 indexed destEid,
        uint64 indexed nonce,
        bytes payload,
        uint256 gasLimit
    );
    
    /**
     * @notice Emitted when a message is received from a remote chain
     * @param srcEid Source chain endpoint ID
     * @param nonce Message nonce
     * @param payload Message payload
     * @param success Whether message processing succeeded
     */
    event MessageReceived(
        uint32 indexed srcEid,
        uint64 indexed nonce,
        bytes payload,
        bool success
    );
    
    /**
     * @notice Emitted when LayerZero messaging state changes
     * @param enabled Whether messaging is enabled
     */
    event LayerZeroMessagingStateChanged(bool indexed enabled);
    
    /**
     * @notice Emitted when enforced options are set for a chain
     * @param eid Destination chain endpoint ID
     * @param options Enforced options (gas limits, etc.)
     */
    event EnforcedOptionsSet(uint32 indexed eid, bytes options);
    
    /**
     * @notice Emitted when cross-chain supply is updated
     * @param eid Remote chain endpoint ID
     * @param supply New supply on remote chain
     */
    event RemoteChainSupplyUpdated(uint32 indexed eid, uint256 supply);
}
