# Inter-Contract Wiring Architecture

## Overview

This document describes how all 16 contracts in the ONBT ecosystem reference and interact with each other. The architecture follows a **hub-and-spoke model** with **module-based composition** to enable modular, testable, and maintainable contract code.

**Key Principle**: Contracts reference each other via well-defined interfaces to maintain loose coupling while enabling tight functional integration.

---

## Core Token Architecture (contracts/token/)

### 1. OmnichainNabatOFT.sol ⭐ **Central Hub**

**Role**: Main omnichain fungible token that aggregates and coordinates all token modules.

**Inheritance Chain**:
```
OmnichainNabatOFT
  ├── OFT (LayerZero OApp)
  ├── OmnichainNabatGovernance
  │   └── OmnichainNabatStorage
  │       └── [Shared State Registry]
  ├── OmnichainNabatVotes
  │   └── ERC20Votes (OpenZeppelin)
  └── OmnichainNabatTracking
      └── OmnichainNabatStorage
```

**State Variables** (from Storage):
- `endpoint` - LayerZero endpoint address for cross-chain messaging
- `peers` - Mapping of remote chain EIDs to OFT addresses
- `hubChainEid` - Designates Base as canonical hub
- `inboundNonce/outboundNonce` - Message ordering
- `totalBridgedOut/In` - Bridge volume tracking
- `remoteChainSupply` - Supply on each chain
- `pauseState` - Emergency pause status

**External Module References**:
```solidity
IOmnichainNabatVotes public votingModule;        // Link to Votes contract
IOmnichainNabatTracking public trackingModule;   // Link to Tracking contract
```

**External Setters**:
- `setVotingModule(address)` - onlyOwner, sets voting power tracking
- `setTrackingModule(address)` - onlyOwner, sets analytics tracking

**Key Methods**:
- `getVotingPower(address account)` → Queries votingModule for voting power
- `_recordBridgeOut(uint32 destEid, uint256 amount)` → Records bridge events
- `_recordBridgeIn(uint32 srcEid, uint256 amount)` → Records bridge events
- `_recordLocalTransfer(uint256 amount)` → Records transfer analytics

**Integration Points**:
| Contract | Purpose | Reference |
|----------|---------|-----------|
| `OmnichainNabatVotes` | Voting power tracking | `IOmnichainNabatVotes votingModule` |
| `OmnichainNabatTracking` | Analytics/supply tracking | `IOmnichainNabatTracking trackingModule` |
| `ONBTOmnichainStaking` | Stake/unstake calls transfer() | `IERC20 reference` |
| `ONBTGovernor` | Uses votes for proposal voting | Interface-based |
| `ONBTRewardsPool` | Calls transfer() for rewards | `IERC20 reference` |

---

### 2. OmnichainNabatStorage.sol 📦 **State Registry** (Abstract)

**Role**: Central storage module containing all contract state variables and constants.

**Inheritance**: Abstract - inherited by Governance, Tracking, and (transitively) OFT

**Organized State Categories**:

#### LayerZero V2 Configuration
```solidity
mapping(uint32 => bytes32) peers;              // Remote OFT addresses
address endpoint;                               // LayerZero Endpoint
uint64 inboundNonce / outboundNonce;          // Message ordering
mapping(uint64 => bytes) sentMessages;         // Message history
mapping(uint32 => mapping(uint64 => bytes32)) receivedMessageHashes;  // Replay protection
mapping(uint32 => MessageStats) messageStats;  // Per-chain stats
mapping(uint32 => bytes) enforcedOptions;      // Gas configuration
uint32 hubChainEid;                            // Hub chain designation
bool layerZeroMessagingEnabled;                // Messaging kill switch
```

#### Bridge Tracking
```solidity
uint256 totalBridgedOut;                       // Total bridged out
uint256 totalBridgedIn;                        // Total bridged in
mapping(uint32 => uint256) bridgedOutByEid;    // Per-chain bridge volume
mapping(uint32 => uint256) bridgedInByEid;
mapping(uint32 => uint256) crossChainSendCountByEid;
mapping(uint32 => uint256) crossChainReceiveCountByEid;
```

#### Transfer Tracking
```solidity
uint256 totalLocalTransferCount;               // Local transfer count
uint256 totalLocalTransferVolume;              // Local transfer volume
mapping(uint32 => uint256) remoteChainSupply;  // Per-chain supply
uint32[] registeredChains;                     // Array of remote chains
```

#### Security Controls
```solidity
uint256 maxTransferAmount;                     // Transfer limit (0 = unlimited)
bool rateLimitEnabled;                         // Rate limiting flag
mapping(address => RateLimitState) rateLimitState;
bool whitelistEnabled;                         // Whitelist enforcement
mapping(address => bool) transferWhitelist;    // Whitelisted addresses
```

**References from Other Contracts**:
- `OmnichainNabatGovernance` - Inherits for pause/transfer control
- `OmnichainNabatTracking` - Inherits for supply tracking
- `OmnichainNabatVotes` - (via ERC20Votes) - Uses balance state

---

### 3. OmnichainNabatGovernance.sol 🛡️ **Security & Cross-Chain Control** (Abstract)

**Role**: Manages pause/unpause functionality and cross-chain governance messaging.

**Inheritance**:
```solidity
abstract contract OmnichainNabatGovernance is OmnichainNabatStorage, Ownable, Pausable
```

**Cross-Chain Functions**:
```solidity
// Pause/unpause on this chain
pause() external onlyOwner payable
unpause() external onlyOwner payable

// Cross-chain pause/unpause
pauseRemoteChain(uint32 _destEid) external payable
unpauseRemoteChain(uint32 _destEid) external payable

// Core messaging
_sendGovernanceMessage(uint32 _destEid, bytes calldata _message) internal
_broadcastGovernanceMessage(bytes calldata _message) internal
_onGovernanceMessageReceived(...) internal virtual

// Hub governance
setHubChain(uint32 _eid) external onlyOwner
registerRemoteChain(uint32 _eid) external onlyOwner
executeHubGovernance(bytes calldata proposal) external onlyOwner
```

**Transfer Control Integration**:
- Pause status blocks all ERC20 transfers via `_beforeTokenTransfer()` hook
- Rate limiting enforced via `_enforceRateLimit()` global function
- Whitelist bypass for critical accounts (liquidity providers, contracts)

**Key State Variables** (inherited from Storage):
- `pauseState` - Current pause status
- `peers` - Remote chain OFT addresses for messaging
- `endpoint` - LayerZero endpoint for sending messages
- `hubChainEid` - Hub chain identifier

**External References**: None direct, used by OFT via inheritance

---

### 4. OmnichainNabatVotes.sol 🗳️ **Voting Power Tracking** (Abstract)

**Role**: Tracks voting power with delegation support (ERC20Votes pattern).

**Inheritance**:
```solidity
abstract contract OmnichainNabatVotes is ERC20Votes
```

**Key Methods**:
```solidity
function getVotes(address account) public view returns (uint256)
function getPastVotes(address account, uint256 blockNumber) public view returns (uint256)
function delegate(address delegatee) external
```

**How It Works**:
- Voting power = balance by default
- Delegation allows users to transfer voting power without transferring tokens
- Checkpoints are created on delegation/transfer to track historical voting power
- Compatible with Governor contracts

**External References**: 
- Referenced by `ONBTGovernor` via `IOmnichainNabatVotes` interface
- Called by `ONBTOmnichainStaking` for voting power checks

---

### 5. OmnichainNabatTracking.sol 📊 **Analytics & Supply Tracking** (Abstract)

**Role**: Tracks cross-chain supply, bridge volumes, and transfer analytics.

**Inheritance**:
```solidity
abstract contract OmnichainNabatTracking is OmnichainNabatStorage, Ownable
```

**Key Methods**:
```solidity
// Remote chain management
registerRemoteChain(uint32 _eid) external onlyOwner
updateRemoteChainSupply(uint32 _eid, uint256 _supply) external onlyOwner

// Bridge recording (called by OFT)
recordBridgeOut(uint32 destEid, uint256 amount) external
recordBridgeIn(uint32 srcEid, uint256 amount) external
recordLocalTransfer(uint256 amount) external

// Query methods
getTotalDistribution() public view returns (uint256)
getLocalPercentage() public view returns (uint256)
getChainBreakdown() public view returns (uint32[] memory, uint256[] memory)
```

**Integration with OFT**:
- `OmnichainNabatOFT._recordBridgeOut()` calls `trackingModule.recordBridgeOut()`
- `OmnichainNabatOFT._recordBridgeIn()` calls `trackingModule.recordBridgeIn()`
- `OmnichainNabatOFT._recordLocalTransfer()` calls `trackingModule.recordLocalTransfer()`

**UI Query Support**:
- Real-time supply breakdown across all chains
- Bridge volume per destination/source
- Holder distribution analytics

---

### 6. OmnichainNabatPermit.sol ✍️ **Gasless Approvals** (Abstract)

**Role**: EIP-2612 permit support for gasless token approvals.

**Status**: Contract exists, not yet integrated into OFT

**Integration Needed**: Add to OFT inheritance chain when needed

---

## DeFi Ecosystem (contracts/defi/)

### 7. ONBTOmnichainStaking.sol 🏆 **Cross-Chain Staking**

**Role**: Enables users to stake ONBT tokens across multiple chains with locking tiers and multipliers.

**Architecture**: Extends `OApp` for LayerZero messaging

**Interface Dependencies**:
```solidity
interface IOmnichainNabatOFT {
    function getVotes(address) external view returns (uint256);
    function totalVotes() external view returns (uint256);
    function getPeerAddress(uint32 eid) external view returns (bytes32);
}

interface IONBTGovernor {
    function delegateVotes(address delegatee) external;
    function getVotingPower(address account, uint256 blockNumber) external view returns (uint256);
}

interface IONBTRewardsPool {
    function requestRewards(uint256 amount) external returns (bool);
    function getAvailableRewards() external view returns (uint256);
    function refillRewards(uint32 destEid, uint256 amount) external;
}
```

**Key Functions** (to be implemented):
```solidity
stake(uint256 amount, uint8 tier) external   // Stake tokens with lockup tier
unstake(uint256 stakeId) external             // Unstake and claim rewards
claimRewards(uint256 stakeId) external        // Claim pending rewards
recordBridgedStake(uint32 srcEid, address user, uint256 amount) external  // Cross-chain sync
```

**Cross-Chain Flow**:
1. User stakes on Arbitrum (spoke)
2. Message sent to Base (hub) via LayerZero
3. Votes delegated to Governor contract on hub
4. Rewards sync'd from RewardsPool
5. On unstake, message confirms unstake back to spoke

**Reference Points**:
- Calls `IOmnichainNabatOFT.transfer()` for stake/unstake
- Queries `IOmnichainNabatVotes.getVotes()` for voting power
- Calls `IONBTGovernor` for delegation
- Calls `IONBTRewardsPool.requestRewards()` for reward distribution

---

### 8. ONBTGovernor.sol 🏛️ **Omnichain Governance**

**Role**: DAO governance with voting aggregation across all chains.

**Architecture**: Extends `OApp` for LayerZero messaging

**Interface Dependencies**:
```solidity
interface IOmnichainNabatVotes {
    function getVotes(address) external view returns (uint256);
    function getPastVotes(address, uint256) external view returns (uint256);
}

interface IONBTOmnichainStaking {
    function getVotingPower(address) external view returns (uint256);
    function getUserStakes(address) external view returns (uint256[] memory);
}

interface IONBTOmnichainVault {
    function executeProposal(bytes calldata proposal) external payable;
    function getBalance() external view returns (uint256);
}
```

**Key Functions** (to be implemented):
```solidity
propose(address[] targets, uint[] values, bytes[] calldatas, string memory description) external returns (uint256)
castVote(uint256 proposalId, uint8 support) external
castVoteWithReason(uint256 proposalId, uint8 support, string calldata reason) external
execute(uint256 proposalId) external payable
_aggregateVotes(uint256 proposalId) external  // Collect votes from spokes
```

**Voting Aggregation**:
1. Proposal created on Base (hub)
2. Voting window opens across all chains
3. Users vote on their respective spoke chains
4. Messages sent to hub with vote counts
5. Hub aggregates and determines outcome
6. Winning proposal executed via Vault

**Reference Points**:
- Inherits voting power from `IOmnichainNabatVotes`
- Queries staking power from `IONBTOmnichainStaking`
- Executes approved actions via `IONBTOmnichainVault`

---

### 9. ONBTRewardsPool.sol 💰 **Reward Distribution**

**Role**: Auto-refill mechanism supplying rewards to staking pool.

**Architecture**: Extends `OApp` for LayerZero messaging

**Interface Dependencies**:
```solidity
interface IOmnichainNabatOFT {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface IONBTOmnichainStaking {
    function getRewardTarget(uint32 chainId) external view returns (address);
    function requestStakingRewards(uint256 amount) external;
}

interface IONBTOmnichainVault {
    function getAvailableFunds() external view returns (uint256);
    function withdrawForRewards(uint256 amount) external;
}
```

**Key Functions** (to be implemented):
```solidity
refillRewards(uint32 destEid, uint256 amount) external payable  // Request refill
receiveRewardRequest(uint32 srcEid, uint256 amount) external    // Handle request
claimRewards(address user) external    // Claim pending rewards
updateRewardRate(uint256 newRate) external onlyOwner
```

**Reward Flow**:
1. RewardsPool receives ONBT tokens from Vault
2. Staking contracts on spokes request rewards
3. RewardsPool distributes via LayerZero
4. Staking contract claims/compounds rewards
5. Auto-refill triggered when balance < threshold

**Reference Points**:
- Calls `IOmnichainNabatOFT.transfer()` to send reward tokens
- Receives requests from `IONBTOmnichainStaking`
- Calls `IONBTOmnichainVault.withdrawForRewards()` for refill

---

## Treasury (contracts/treasury/)

### 10. ONBTOmnichainVault.sol 🏦 **Treasury Management**

**Role**: Governance-controlled treasury managing funds across all chains.

**Architecture**: Extends `OApp` for LayerZero messaging

**Interface Dependencies**:
```solidity
interface IOmnichainNabatOFT {
    function transfer(address, uint256) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

interface IONBTGovernor {
    function isProposalExecuting(uint256) external view returns (bool);
    function getExecutingProposal() external view returns (uint256);
}

interface IONBTRewardsPool {
    function refillRewards(uint32 destEid, uint256 amount) external;
    function getRewardAllocation(uint256) external view returns (uint256);
}
```

**Key Functions** (to be implemented):
```solidity
deposit(uint256 amount) external    // Deposit funds
withdraw(uint256 amount) external onlyGovernance
allocateRewards(uint256 amount) external onlyGovernance
broadcastFund(uint32 destEid, uint256 amount) external onlyGovernance onlyWhenApproved
getBalance() external view returns (uint256)
```

**Fund Management**:
1. Protocol collects fees → Vault
2. Governance votes on allocations
3. Approved allocations executed
4. Rewards allocated to RewardsPool
5. Emergency funds managed via multi-sig

**Reference Points**:
- Holds `IOmnichainNabatOFT` token balance
- Controlled by `IONBTGovernor` (only executes approved proposals)
- Refills `IONBTRewardsPool` on governance approval

---

## Complete Inter-Contract Reference Matrix

| From \ To | OFT | Storage | Governance | Votes | Tracking | Staking | Governor | Vault | RewardsPool |
|-----------|-----|---------|-----------|-------|----------|---------|----------|-------|-------------|
| **OFT** | - | ✅ Inherit | ✅ Inherit | ✅ Inherit | ✅ Inherit | 📍 Via I/F | 📍 Via I/F | 📍 Via I/F | 📍 Via I/F |
| **Storage** | - | - | Parent | - | Parent | - | - | - | - |
| **Governance** | - | Parent | - | - | - | - | - | - | - |
| **Votes** | - | - | - | - | - | 📍 Via I/F | ✅ Direct | - | - |
| **Tracking** | - | Parent | - | - | - | - | - | - | - |
| **Staking** | 📍 Via I/F | - | - | 📍 Via I/F | - | - | 📍 Via I/F | - | 📍 Via I/F |
| **Governor** | - | - | - | 📍 Via I/F | - | 📍 Via I/F | - | 📍 Via I/F | - |
| **Vault** | 📍 Via I/F | - | - | - | - | - | 📍 Via I/F | - | 📍 Via I/F |
| **RewardsPool** | 📍 Via I/F | - | - | - | - | 📍 Via I/F | - | 📍 Via I/F | - |

**Legend**:
- ✅ **Inherit**: Direct inheritance (is-a relationship)
- 📍 **Via I/F**: Interface-based reference (has-a relationship, looser coupling)
- **Parent**: Inherited from this contract

---

## Deployment Order & Dependencies

**Phase 1 - Token Foundation**:
1. Deploy `OmnichainNabatStorage` (abstract, never deployed directly)
2. Deploy `OmnichainNabatGovernance` (abstract, never deployed directly)
3. Deploy `OmnichainNabatVotes` (abstract, never deployed directly)
4. Deploy `OmnichainNabatTracking` (abstract, never deployed directly)
5. Deploy `OmnichainNabatOFT` **REQUIRES**: Steps 1-4 (inheritance chain)

**Phase 2 - Module Setup**:
6. Deploy `OmnichainNabatPermit` (optional, for gasless approvals)
7. Call `OmnichainNabatOFT.setVotingModule()` 
8. Call `OmnichainNabatOFT.setTrackingModule()`

**Phase 3 - DeFi Ecosystem**:
9. Deploy `ONBTOmnichainStaking` **REQUIRES**: OFT deployed, Governor deployed
10. Deploy `ONBTGovernor` **REQUIRES**: OFT deployed, Staking deployed
11. Deploy `ONBTRewardsPool` **REQUIRES**: OFT deployed, Staking deployed
12. Deploy `ONBTOmnichainVault` **REQUIRES**: OFT deployed, Governor deployed

**Phase 4 - Cross-Chain Setup**:
13. Register all chains via LayerZero endpoint
14. Set peers for all contracts
15. Configure enforced options (gas limits per destination)
16. Set DVN validators for security

---

## Message Flow Examples

### Example 1: User Stakes on Arbitrum

```
User (Arbitrum) → ONBTOmnichainStaking.stake(100 ONBT, tier=2)
  ↓
Staking calls IOmnichainNabatOFT.transfer() to lock tokens
  ↓
Staking sends cross-chain message to Base (hub) via LayerZero
  ↓
Base ONBTGovernor receives message and updates voting power
  ↓
Base ONBTRewardsPool queues reward allocation
  ↓
Message sent back to Arbitrum confirming stake recorded
```

### Example 2: Governor Votes on Proposal

```
User (Base or Spoke) → ONBTGovernor.propose(...)
  ↓
Proposal created on Base hub (index = 1)
  ↓
Messages broadcast to all spoke chains announcing proposal
  ↓
Users vote on their respective chains
  ↓
Votes aggregated back to Base hub via LayerZero
  ↓
Voting window closes
  ↓
If approved: ONBTGovernor.execute() calls ONBTOmnichainVault.executeProposal()
```

### Example 3: Vault Refills Rewards

```
ONBTRewardsPool.refillRewards() when balance < threshold
  ↓
Vault receives governance-approved withdrawal request
  ↓
Vault calls IOmnichainNabatOFT.transfer() to RewardsPool
  ↓
RewardsPool broadcasts reward distribution to Staking contracts
  ↓
Each Staking contract receives allocation and updates reward queue
```

---

## Key Design Patterns

### 1. **Module Composition** (OFT Contract)
- OFT inherits from multiple modules (Governance, Votes, Tracking)
- Each module is independently testable
- Heavy use of internal helper methods (`_recordBridgeOut`, etc.)
- External module references via setter functions

### 2. **Interface-Based DeFi Integration**
- DeFi contracts don't inherit from Token modules
- Instead, they reference Token via `IOmnichainNabatOFT` interface
- Allows DeFi contracts to be deployed independently
- Decouples DeFi logic from core token logic

### 3. **Hub-and-Spoke Governance**
- Base chain considered "hub" (canonical governor)
- Other chains are "spokes" (send votes to hub)
- Hub aggregates and publishes governance decisions
- Better UX than fully distributed voting

### 4. **Shared State via OApp**
- All DeFi contracts extend `OApp` for LayerZero messaging
- Message delivery guarantees ordering via nonce
- Replay protection via message hash tracking
- Emergency pause toggleable via governance

---

## Testing Checklist

- [ ] OFT deployed on Base with endpoints/peers configured
- [ ] OFT deployed on Arbitrum with endpoints/peers configured
- [ ] `ONBTOmnichainStaking` can call `OFT.transfer()` for stake locking
- [ ] `ONBTGovernor` can query voting power via `OFT.getVotes()`
- [ ] `ONBTRewardsPool` can distribute rewards via `OFT.transfer()`
- [ ] `ONBTOmnichainVault` can withdraw and refill rewards
- [ ] Messages sent from Arbitrum arrive on Base within 15 blocks
- [ ] Pause on Base immediately pauses transfers on Arbitrum
- [ ] Cross-chain voting aggregates correctly
- [ ] Supply tracking shows correct distribution across chains

---

## Next Steps

1. **Implement ONBTOmnichainStaking** - Add staking tiers, lockup periods, reward integration
2. **Implement ONBTGovernor** - Add proposal/voting mechanics, vote aggregation
3. **Implement ONBTOmnichainVault** - Add governance-controlled fund management
4. **Implement ONBTRewardsPool** - Add reward distribution and auto-refill
5. **Integration Testing** - Test all 16 contracts together on testnet
6. **Deploy to Production** - Mainnet deployment with audit

