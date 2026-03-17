# ONBT Full Ecosystem Architecture (OFTV2 + OApp)

## Overview

The ONBT ecosystem is a **future-proof omnichain protocol** built on **LayerZero V1 (OFTV2)** with advanced cross-chain capabilities. It combines DeFi primitives, governance messaging, treasury management, and complex composable operations across multiple blockchains.

**Hub Chain**: Base  
**Architecture**: Hub-and-spoke model with always-available destination chains

---

## Core Components

### 1. **ONBT Token (OFTV2)** 
**Contract**: [contracts/token/OmnichainNabatOFT.sol](../contracts/token/OmnichainNabatOFT.sol)

- **Type**: Omnichain Fungible Token (LayerZero V1 OFTV2)
- **Supply**: 1 billion tokens (minted on Base hub chain)
- **Cross-chain**: Burn/mint mechanism via LayerZero
- **Immutable**: No additional mint/burn functions
- **Branding**: Built-in metadata (logo, website, social links)

**Key Features**:
- Native cross-chain transfers
- Unified global supply tracking
- ERC-20 compatible
- Permit support (EIP-2612)

---

### 2. **Governance OApp**
**Contract**: [contracts/governance/ONBTGovernanceOApp.sol](../contracts/governance/ONBTGovernanceOApp.sol)

Cross-chain governance messaging layer for DAO operations.

**Message Types**:
- `BROADCAST_PROPOSAL`: Send proposals to all chains
- `AGGREGATE_VOTES`: Collect votes from destination chains
- `EXECUTE_ACTION`: Execute approved governance actions
- `SYNC_STATE`: Synchronize governance state
- `EMERGENCY_PAUSE`: Emergency pause across all chains

**Hub Functions** (Base):
- Broadcast proposals to all chains
- Aggregate votes from all chains
- Execute cross-chain governance actions
- Emergency controls

**Destination Functions**:
- Receive proposals
- Send vote counts to hub
- Execute local governance actions

---

### 3. **Omnichain Vault (OVault)**
**Contract**: [contracts/treasury/ONBTOmnichainVault.sol](../contracts/treasury/ONBTOmnichainVault.sol)

Multi-chain treasury with governance-controlled fund management.

**Features**:
- Multi-asset support (native + ERC20)
- Budget allocation per chain
- Cross-chain fund transfers
- Revenue tracking across chains
- Emergency withdrawal
- Governance-controlled operations

**Message Types**:
- `TRANSFER_FUNDS`: Send funds to destination chain
- `REPORT_BALANCE`: Report balance back to hub
- `ALLOCATE_BUDGET`: Set budget for destination
- `REQUEST_FUNDS`: Request funds from hub

**Security**:
- Whitelisted tokens only
- Budget constraints per chain
- Governance approval required
- Pausable mechanism

---

### 4. **DeFi Ecosystem**

#### **ONBTStaking**
**Contract**: [contracts/defi/ONBTStaking.sol](../contracts/defi/ONBTStaking.sol)

- Flexible lockup periods (0, 30, 90, 180, 365 days)
- Lockup bonuses (1x to 3x rewards)
- Compound staking
- Emergency withdrawal
- Owner-controlled reward rates

#### **ONBTLiquidityPool** (ONBT/ETH)
**Contract**: [contracts/defi/ONBTLiquidityPool.sol](../contracts/defi/ONBTLiquidityPool.sol)

- Constant product AMM (x * y = k)
- 0.3% trading fee
- LP token minting
- Protocol fee collection

#### **ONBTUniversalLiquidityPool** (Any Token Pair)
**Contract**: [contracts/defi/ONBTUniversalLiquidityPool.sol](../contracts/defi/ONBTUniversalLiquidityPool.sol)

- Support for any ERC20 token pair
- Advanced security (ReentrancyGuard, Pausable)
- Price oracle integration
- Configurable fees
- TWAP price accumulation

#### **ONBTRouter**
**Contract**: [contracts/defi/ONBTRouter.sol](../contracts/defi/ONBTRouter.sol)

Unified interface for all AMM operations.

**Functions**:
- `swapExactTokensForTokens`
- `swapTokensForExactTokens`
- `swapExactETHForTokens`
- `swapTokensForExactETH`
- `addLiquidity` / `addLiquidityETH`
- `removeLiquidity` / `removeLiquidityETH`

**Features**:
- Multi-hop swaps
- Slippage protection
- Deadline checks
- Gas-optimized routing

---

### 5. **Oracle Adapter**
**Contract**: [contracts/oracle/ONBTOracleAdapter.sol](../contracts/oracle/ONBTOracleAdapter.sol)

Time-Weighted Average Price (TWAP) oracle for DeFi integrations.

**Features**:
- TWAP calculation from pool observations
- Configurable observation windows (10 min - 24 hours)
- Price validation and bounds checking
- Stale price detection
- Emergency price feeds
- Multi-pool aggregation

**Use Cases**:
- Lending protocols (collateral valuation)
- Derivatives pricing
- Automated trading strategies
- Protocol fee calculations

---

### 6. **Compose Handler**
**Contract**: [contracts/compose/ONBTComposeHandler.sol](../contracts/compose/ONBTComposeHandler.sol)

Enables complex multi-step cross-chain operations in a single transaction.

**Supported Actions**:
- `ACTION_STAKE`: Bridge + Stake
- `ACTION_ADD_LIQUIDITY`: Bridge + Provide Liquidity
- `ACTION_SWAP`: Bridge + Swap
- `ACTION_UNSTAKE_AND_BRIDGE`: Unstake + Bridge back
- `ACTION_REMOVE_LIQUIDITY_AND_BRIDGE`: Remove LP + Bridge back

**Flow Example** (Bridge + Stake):
1. User calls `sendFrom` on ONBT with compose payload
2. Tokens bridged to destination chain
3. `onOFTReceived` triggered on ComposeHandler
4. Handler stakes tokens on behalf of user
5. Staking position transferred to user

**Failure Handling**:
- Failed operations refund tokens to user
- Failed messages stored for retry
- User can retry failed operations

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     BASE (HUB CHAIN)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ ONBT Token   │  │ Governance   │  │  Omnichain   │    │
│  │   (OFTV2)    │  │    OApp      │  │    Vault     │    │
│  │              │  │              │  │              │    │
│  │ 1B Supply    │  │ - Proposals  │  │ - Treasury   │    │
│  │ - Burn/Mint  │  │ - Vote Agg   │  │ - Budgets    │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │            │
│         │     LayerZero Messaging Layer      │            │
│         │                  │                  │            │
├─────────┼──────────────────┼──────────────────┼────────────┤
│  DeFi Ecosystem            │                  │            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │  Staking  │  Liquidity  │  Router  │  Oracle       │ │
│  │           │    Pools    │          │  Adapter      │ │
│  │                                                      │ │
│  │  Compose Handler (Bridge + DeFi Actions)            │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
             │                  │                  │
             │   Cross-Chain    │   Cross-Chain    │
             │   ONBT Transfers │   Governance     │   Vault
             │                  │   Messages       │   Transfers
             ▼                  ▼                  ▼
┌──────────────────┬──────────────────┬──────────────────────┐
│   ETHEREUM       │    POLYGON       │    ARBITRUM          │
│  (Destination)   │  (Destination)   │   (Destination)      │
├──────────────────┼──────────────────┼──────────────────────┤
│                  │                  │                      │
│  ONBT (0 supply) │  ONBT (0 supply) │  ONBT (0 supply)     │
│  Governance OApp │  Governance OApp │  Governance OApp     │
│  Omnichain Vault │  Omnichain Vault │  Omnichain Vault     │
│  DeFi Ecosystem  │  DeFi Ecosystem  │  DeFi Ecosystem      │
│                  │                  │                      │
└──────────────────┴──────────────────┴──────────────────────┘
```

---

## Deployment Flow

### Phase 1: Hub Chain (Base)

```bash
# Set environment
export IS_HUB_CHAIN=true

# Deploy full ecosystem
npm run deploy:full:base

# This deploys:
# - ONBT Token (1B supply)
# - Governance OApp (hub mode)
# - Omnichain Vault (hub mode)
# - DeFi contracts (staking, pools, router)
# - Oracle adapter
# - Compose handler
```

### Phase 2: Destination Chains

```bash
# For each destination chain (Ethereum, Polygon, Arbitrum, etc.)
export IS_HUB_CHAIN=false

# Deploy on destination
npm run deploy:full:ethereum
npm run deploy:full:polygon
npm run deploy:full:arbitrum
```

### Phase 3: Configure Peers

```bash
# On each chain, configure trusted remotes
npm run configure:peers:base
npm run configure:peers:ethereum
npm run configure:peers:polygon
npm run configure:peers:arbitrum

# This sets up bidirectional trust for:
# - ONBT token transfers
# - Governance messages
# - Vault fund transfers
```

---

## Cross-Chain Operations

### 1. **Token Transfers**

```javascript
// Send ONBT from Base to Ethereum
await onbt.sendFrom(
  userAddress,           // from
  ethereumChainId,       // destination
  recipientAddress,      // to
  amount,                // amount
  refundAddress,         // refund address
  zroPaymentAddress,     // ZRO payment
  adapterParams          // adapter params
);
```

### 2. **Governance Actions**

```javascript
// Hub broadcasts proposal to all chains
await governanceOApp.broadcastProposal(
  proposalHash,
  [ethereumChainId, polygonChainId, arbitrumChainId]
);

// Destination sends votes to hub
await governanceOApp.sendVotesToHub(proposalId, voteCount);

// Hub executes action on destination
await governanceOApp.sendExecutionMessage(
  destinationChainId,
  proposalId,
  targetContract,
  calldata
);
```

### 3. **Treasury Operations**

```javascript
// Hub allocates budget to destination
await vault.allocateBudget(ethereumChainId, tokenAddress, amount);

// Hub transfers funds to destination
await vault.transferFundsToChain(ethereumChainId, tokenAddress, amount);

// Destination requests funds from hub
await vault.requestFunds(tokenAddress, amount);
```

### 4. **Compose Operations**

```javascript
// Bridge + Stake in one transaction
const composePayload = ethers.AbiCoder.defaultAbiCoder().encode(
  ["address", "uint8", "bytes"],
  [userAddress, ACTION_STAKE, stakeParams]
);

await onbt.sendFrom(
  userAddress,
  destinationChainId,
  recipientAddress,
  amount,
  refundAddress,
  zroPaymentAddress,
  composePayload  // Compose payload triggers staking
);
```

---

## Security Features

### 1. **Access Control**
- Owner-controlled contract configuration
- Trusted executor model for sensitive operations
- Role-based permissions (governance, treasury manager)

### 2. **Cross-Chain Security**
- Trusted remote validation
- ULN/DVN configuration for message verification
- Rate limiting on cross-chain operations
- Emergency pause mechanism

### 3. **DeFi Security**
- ReentrancyGuard on all state-changing functions
- SafeERC20 for token transfers
- Pausable mechanism for emergency stops
- Price validation and bounds checking
- Slippage protection on swaps

### 4. **Failure Handling**
- Compose message retry mechanism
- Failed message storage and recovery
- Automatic refunds on failures
- Transaction deadline checks

---

## Monitoring & Maintenance

### Key Metrics to Monitor

1. **Token Distribution**
   - Hub chain supply = 1B minus bridged amounts
   - Sum of all chain supplies = 1B (global conservation)

2. **Cross-Chain Health**
   - LayerZero message delivery times
   - Failed message count
   - Gas costs per chain

3. **DeFi Metrics**
   - Total Value Locked (TVL)
   - Trading volume
   - Staking participation
   - Oracle price accuracy

4. **Governance Activity**
   - Active proposals
   - Cross-chain vote participation
   - Execution success rate

### Maintenance Tasks

- **Daily**: Monitor cross-chain message delivery
- **Weekly**: Update oracle prices, check stale feeds
- **Monthly**: Review treasury allocations, rebalance budgets
- **Quarterly**: Security audits, governance review

---

## Testing Guide

### Unit Tests

```bash
# Test individual contracts
npm test
```

### Integration Tests

```bash
# Test cross-chain flows
npm run test:integration
```

### Fork Tests

```bash
# Test on mainnet forks
npm run test:fork:base
npm run test:fork:ethereum
```

---

## Upgrade Path

While ONBT token is immutable, peripheral contracts can be upgraded:

1. **Router**: Deploy new version, update references
2. **Oracle**: Deploy new adapter, migrate feeds
3. **Compose Handler**: Deploy new handler, update whitelist
4. **Governance**: Deploy new OApp, configure peers

**Critical**: ONBT token, vault, and core pools should remain immutable for security.

---

## Support & Resources

- **Documentation**: `/docs` folder
- **Examples**: `/examples` folder
- **Deployment Scripts**: `/scripts` folder
- **Constants**: `/constants` folder

---

## Summary

The ONBT ecosystem provides a **complete omnichain protocol** with:

✅ **Token Layer**: OFTV2-based cross-chain fungible token  
✅ **Governance Layer**: Omnichain DAO with cross-chain voting  
✅ **Treasury Layer**: Multi-chain fund management  
✅ **DeFi Layer**: Staking, AMM, routing, and oracle integration  
✅ **Compose Layer**: Complex multi-step cross-chain operations  

**Built for the future** with LayerZero V1 stability and always-available cross-chain connectivity from Base hub to all supported chains.
