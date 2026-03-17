# ONBT Full Ecosystem - Quick Reference

## What Was Added

Building on your existing DeFi foundation (staking, pools, factories), we've added a **complete omnichain protocol** with:

### 🆕 New Contracts (6 contracts)

| Contract | Location | Purpose |
|----------|----------|---------|
| **ONBTGovernanceOApp** | `contracts/governance/` | Cross-chain governance messaging |
| **ONBTOmnichainVault** | `contracts/treasury/` | Multi-chain treasury management |
| **ONBTRouter** | `contracts/defi/` | Unified AMM interface |
| **ONBTOracleAdapter** | `contracts/oracle/` | TWAP price feeds |
| **ONBTComposeHandler** | `contracts/compose/` | Complex cross-chain operations |
| **OmnichainNabatOFT** (deprecated V2) | `contracts/` | Marked as deprecated, use OFTV2 |

### 📜 New Scripts (2 scripts)

| Script | Purpose |
|--------|---------|
| `scripts/deployFullEcosystem.mjs` | Deploy entire ecosystem on any chain |
| `scripts/configurePeers.mjs` | Set up cross-chain connections |

### 📚 New Documentation

| File | Content |
|------|---------|
| `FULL_ECOSYSTEM_ARCHITECTURE.md` | Complete architecture guide |
| `ECOSYSTEM_QUICK_REFERENCE.md` | This file |

---

## Architecture Summary

```
BASE (Hub Chain)
├── ONBT Token (OFTV2) - 1 billion supply
├── Governance OApp - Cross-chain DAO
├── Omnichain Vault - Treasury management
├── DeFi Layer (existing + new router)
├── Oracle Adapter - TWAP prices
└── Compose Handler - Complex operations

DESTINATIONS (Ethereum, Polygon, Arbitrum, etc.)
├── ONBT Token (OFTV2) - 0 initial supply
├── Governance OApp - Receives proposals
├── Omnichain Vault - Receives allocations
├── DeFi Layer (full suite)
├── Oracle Adapter - Local price feeds
└── Compose Handler - Local operations
```

---

## Quick Start

### 1. Deploy on Base (Hub)

```bash
# Set environment
export IS_HUB_CHAIN=true
export NETWORK=base

# Deploy everything
npx hardhat run scripts/deployFullEcosystem.mjs --network base

# Save deployed addresses from output
```

### 2. Deploy on Destinations

```bash
# For each chain
export IS_HUB_CHAIN=false

npx hardhat run scripts/deployFullEcosystem.mjs --network ethereum
npx hardhat run scripts/deployFullEcosystem.mjs --network polygon
npx hardhat run scripts/deployFullEcosystem.mjs --network arbitrum
```

### 3. Configure Cross-Chain Peers

```bash
# Update CONTRACT_ADDRESSES in configurePeers.mjs
# Then run on each chain:

export NETWORK=base
npx hardhat run scripts/configurePeers.mjs --network base

export NETWORK=ethereum
npx hardhat run scripts/configurePeers.mjs --network ethereum
# ... repeat for all chains
```

---

## Key Features

### ✅ What You Already Had (DeFi)
- ONBTStaking (flexible lockup periods)
- ONBTLiquidityPool (ONBT/ETH AMM)
- ONBTUniversalLiquidityPool (any token pair)
- ONBTYieldDistributor (yield distribution)
- ONBTDeFiFactory / ONBTMultiTokenFactory (deployment)
- ONBTMathLib & ONBTSecurityLib (utilities)

### 🆕 What Was Added (Omnichain)
1. **Governance OApp**: Cross-chain DAO proposals, voting, execution
2. **Omnichain Vault**: Multi-chain treasury with budget management
3. **Router**: Simplified interface for swaps and liquidity
4. **Oracle Adapter**: TWAP price feeds for integrations
5. **Compose Handler**: Bridge + Stake/LP/Swap in one transaction

---

## Use Case Examples

### Use Case 1: Cross-Chain Governance
```solidity
// Hub (Base) broadcasts proposal to all chains
governanceOApp.broadcastProposal(
    proposalHash,
    [ethereumChainId, polygonChainId, arbitrumChainId]
);

// Destination chains send votes back to hub
governanceOApp.sendVotesToHub(proposalId, voteCount);

// Hub executes action on destination chain
governanceOApp.sendExecutionMessage(
    destinationChainId,
    proposalId,
    targetContract,
    calldata
);
```

### Use Case 2: Treasury Management
```solidity
// Hub allocates budget to destination chain
vault.allocateBudget(ethereumChainId, usdcAddress, 100000e6);

// Hub transfers funds to destination
vault.transferFundsToChain(ethereumChainId, usdcAddress, 50000e6);

// Destination requests more funds if needed
vault.requestFunds(usdcAddress, 25000e6);
```

### Use Case 3: Compose Operations
```javascript
// User on Ethereum bridges ONBT to Base and stakes in one transaction
const stakeParams = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint256", "uint256"],
    [90 * 24 * 60 * 60, minStakeAmount] // 90-day lockup
);

const composePayload = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "uint8", "bytes"],
    [userAddress, ACTION_STAKE, stakeParams]
);

await onbt.sendFrom(
    userAddress,
    baseChainId,
    composeHandlerAddress,
    stakeAmount,
    refundAddress,
    zroPaymentAddress,
    composePayload  // Triggers automatic staking on Base
);
```

### Use Case 4: Oracle Integration
```solidity
// Get TWAP price for ONBT/USDC pair
(uint256 onbtPrice, uint256 usdcPrice, uint256 lastUpdate) = 
    oracle.getPrice(onbtAddress, usdcAddress);

// Use in lending protocol
uint256 collateralValue = userONBT * onbtPrice / 1e18;
```

---

## Contract Addresses Template

Save your deployed addresses here:

```bash
# Base (Hub Chain)
export ONBT_TOKEN_BASE="0x..."
export GOVERNANCE_OAPP_BASE="0x..."
export VAULT_BASE="0x..."
export ROUTER_BASE="0x..."
export ORACLE_BASE="0x..."
export COMPOSE_HANDLER_BASE="0x..."
export FACTORY_BASE="0x..."
export STAKING_BASE="0x..."
export POOL_BASE="0x..."

# Ethereum (Destination)
export ONBT_TOKEN_ETHEREUM="0x..."
export GOVERNANCE_OAPP_ETHEREUM="0x..."
export VAULT_ETHEREUM="0x..."
# ... etc

# Polygon (Destination)
export ONBT_TOKEN_POLYGON="0x..."
# ... etc
```

---

## Testing Checklist

### Local Testing
- [ ] Compile all contracts without errors
- [ ] Run unit tests for new contracts
- [ ] Test cross-chain message encoding/decoding

### Testnet Testing (Base Sepolia → Ethereum Sepolia)
- [ ] Deploy on Base Sepolia
- [ ] Deploy on Ethereum Sepolia
- [ ] Configure peers between chains
- [ ] Test ONBT token transfer
- [ ] Test governance message broadcast
- [ ] Test vault fund transfer
- [ ] Test compose operation (bridge + stake)
- [ ] Monitor LayerZero Scan for message delivery

### Mainnet Preparation
- [ ] Security audit completed
- [ ] Gas optimization review
- [ ] Deployment scripts tested on forks
- [ ] Monitoring/alerting configured
- [ ] Emergency procedures documented
- [ ] Bug bounty program ready

---

## Common Operations

### Check Token Balance Across Chains

```javascript
// Hub chain
const baseBalance = await onbt.balanceOf(userAddress);

// Destination chains
const ethBalance = await onbtEth.balanceOf(userAddress);
const polygonBalance = await onbtPoly.balanceOf(userAddress);

// Total should equal: baseBalance + ethBalance + polygonBalance + ... = 1B
```

### Update Oracle Price

```javascript
// Anyone (or keeper) can update
await oracle.updatePrice(tokenA, tokenB);

// Or batch update
await oracle.batchUpdatePrices(
    [tokenA1, tokenA2, tokenA3],
    [tokenB1, tokenB2, tokenB3]
);
```

### Execute Compose Operation

```javascript
// Get compose handler on destination chain
const composeHandler = await ethers.getContractAt(
    "ONBTComposeHandler",
    composeHandlerAddress
);

// Check supported actions
const ACTION_STAKE = 1;
const ACTION_ADD_LIQUIDITY = 2;
const ACTION_SWAP = 3;

// Prepare parameters
const stakeParams = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint256", "uint256"],
    [lockupPeriod, minStakeAmount]
);

// Send with compose
await onbt.sendFrom(
    userAddress,
    destinationChainId,
    composeHandlerAddress,
    amount,
    refundAddress,
    zroPaymentAddress,
    ethers.AbiCoder.defaultAbiCoder().encode(
        ["address", "uint8", "bytes"],
        [userAddress, ACTION_STAKE, stakeParams]
    )
);
```

---

## Troubleshooting

### Issue: Cross-chain message not delivered
**Solution**: Check LayerZero Scan, ensure peers are configured, verify gas sent

### Issue: Compose operation failed
**Solution**: Check ComposeHandler logs, retry failed message with `retryCompose(messageId)`

### Issue: Oracle price stale
**Solution**: Call `updatePrice()` or check if pool has liquidity

### Issue: Vault transfer rejected
**Solution**: Check budget allocation, ensure sufficient balance on hub

---

## Next Steps

1. **Deploy to Testnet**: Use Base Sepolia and destination testnets
2. **Test Cross-Chain Flows**: Verify all message types work
3. **Integrate Frontend**: Update miniapp with new contract addresses
4. **Security Review**: Audit all new contracts
5. **Mainnet Launch**: Deploy to production networks

---

## Support

- **Architecture Guide**: [FULL_ECOSYSTEM_ARCHITECTURE.md](FULL_ECOSYSTEM_ARCHITECTURE.md)
- **DeFi Docs**: [DEFI_ECOSYSTEM.md](DEFI_ECOSYSTEM.md)
- **LayerZero Docs**: https://docs.layerzero.network/
- **Repository**: https://github.com/acegrant99/ONBT-App

---

## Summary

You now have a **complete omnichain protocol** with:

| Layer | Status | Components |
|-------|--------|------------|
| **Token** | ✅ Ready | OFTV2 cross-chain fungible token |
| **Governance** | ✅ Ready | Cross-chain DAO messaging |
| **Treasury** | ✅ Ready | Multi-chain fund management |
| **DeFi** | ✅ Ready | Staking, AMM, router, oracle |
| **Advanced** | ✅ Ready | Compose handler for complex ops |

**Next**: Deploy to testnet and start testing cross-chain operations! 🚀
