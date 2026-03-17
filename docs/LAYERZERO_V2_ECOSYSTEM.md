# ONBT LayerZero V2 Ecosystem - Complete Overview

## 🌐 All Contracts Are LayerZero V2 Enabled

All ONBT contracts now use **LayerZero V2 OApp architecture** for omnichain functionality.

---

## ✅ Contracts Status

### **DeFi Contracts** (`contracts/defi/`)

#### 1. **ONBTOmnichainStaking.sol** ✅ LayerZero V2
- **Architecture**: Hub-Spoke (Base hub, Arbitrum spoke)
- **LayerZero Features**:
  - Cross-chain stake synchronization
  - Vote delegation across chains
  - Achievement tracking globally
  - Leaderboard aggregation
- **Message Types**:
  - `MSG_STAKE`: Sync stake to hub
  - `MSG_UNSTAKE`: Sync unstake to hub
  - `MSG_COMPOUND`: Sync compound to hub
  - `MSG_VOTE_DELEGATION`: Sync delegation changes
  - `MSG_ACHIEVEMENT_UNLOCK`: Sync achievement unlocks
- **Imports**: `OApp`, `MessagingFee`, `Origin`

#### 2. **ONBTRewardsPool.sol** ✅ LayerZero V2
- **Architecture**: Hub-Spoke (Base treasury, spoke chains request)
- **LayerZero Features**:
  - Auto-refill staking contracts across chains
  - Cross-chain reward distribution coordination
  - Rate-limited reward requests
  - Emergency reward transfers
- **Message Types**:
  - `MSG_REQUEST_REWARDS`: Request rewards from hub
  - `MSG_SEND_REWARDS`: Send rewards to destination
  - `MSG_REPORT_BALANCE`: Report balance to hub
  - `MSG_UPDATE_ALLOCATION`: Update reward allocations
- **Imports**: `OApp`, `MessagingFee`, `Origin`

#### 3. **ONBTStakingRouter.sol** ✅ LayerZero V2
- **Architecture**: Hub-Spoke (Base aggregates, spokes report)
- **LayerZero Features**:
  - Coordinate staking, yield dist, and rewards
  - Sync metrics to hub for global tracking
  - Distribute yield from hub to spokes
  - Claims reporting and analytics
- **Message Types**:
  - `MSG_SHARE_UPDATE`: Update shares across chains
  - `MSG_CLAIM_REWARDS`: Coordinate reward claims
  - `MSG_DISTRIBUTE_YIELD`: Distribute yield to chains
  - `MSG_SYNC_METRICS`: Sync global metrics to hub
- **Imports**: `OApp`, `MessagingFee`, `Origin`

#### 4. **ONBTYieldDistributor.sol** ✅ LayerZero V2
- **Architecture**: Hub-Spoke (Base hub, spokes sync shares)
- **LayerZero Features**:
  - Proportional yield distribution across chains
  - Share synchronization to hub
  - Cross-chain yield distribution
  - Claims reporting for analytics
- **Message Types**:
  - `MSG_SYNC_SHARES`: Sync user shares to hub
  - `MSG_DISTRIBUTE_YIELD`: Distribute yield from hub
  - `MSG_REPORT_CLAIMS`: Report claims to hub
- **Imports**: `OApp`, `MessagingFee`, `Origin`

#### 5. **ONBTAchievementNFT.sol** ✅ LayerZero V2 ONFT721
- **Architecture**: ONFT standard (NFTs move between chains)
- **LayerZero Features**:
  - Cross-chain NFT transfers via ONFT721
  - Achievement NFTs portable across all chains
  - Transfer history tracking
  - Tradeable on any chain
- **Message Types**: Handled by ONFT721 base
- **Imports**: `ONFT721` (LayerZero V2 ONFT standard)

#### 6. **ONBTGovernor.sol** ✅ LayerZero V2
- **Architecture**: Hub-Spoke (Base hub executes, spokes vote)
- **LayerZero Features**:
  - Cross-chain voting aggregation
  - Proposal broadcasting to all chains
  - Vote relaying from spokes to hub
  - Voting power synchronization
- **Message Types**:
  - `MSG_PROPOSAL_CREATED`: Broadcast proposals
  - `MSG_VOTE_CAST`: Relay votes to hub
  - `MSG_PROPOSAL_EXECUTED`: Notify execution
  - `MSG_SYNC_VOTING_POWER`: Sync voting power
- **Imports**: `OApp`, `MessagingFee`, `Origin`

---

### **Treasury Contracts** (`contracts/treasury/`)

#### 7. **ONBTOmnichainVault.sol** ✅ LayerZero V2 (Upgraded from V1)
- **Architecture**: Hub-Spoke (Base treasury, spoke allocations)
- **LayerZero Features**:
  - Cross-chain fund transfers
  - Budget allocations per chain
  - Balance reporting to hub
  - Fund requests from destinations
- **Message Types**:
  - `MSG_TRANSFER_FUNDS`: Send funds to chain
  - `MSG_REPORT_BALANCE`: Report balance to hub
  - `MSG_ALLOCATE_BUDGET`: Set budget allocations
  - `MSG_REQUEST_FUNDS`: Request funds from hub
  - `MSG_EMERGENCY_WITHDRAW`: Emergency operations
- **Imports**: `OApp`, `MessagingFee`, `Origin`
- **Migration**: Upgraded from `NonblockingLzApp` (V1) to `OApp` (V2)

---

### **Token Contracts** (`contracts/token/`)

#### 8. **ONBT.sol** ✅ LayerZero V2 OFT (Already deployed)
- **Architecture**: OFT standard (token bridges seamlessly)
- **LayerZero Features**:
  - Cross-chain ONBT transfers
  - Composable across all chains
  - Gas-efficient bridging
  - Native token on all chains
- **Deployed Addresses**:
  - Base: `0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD`
  - Arbitrum: `0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da`
- **Imports**: `OFT` (LayerZero V2 OFT standard)

---

## 🏗️ LayerZero V2 Architecture

### **Hub-Spoke Model**
- **Hub Chain**: Base (8453) - Aggregates all data, executes governance
- **Spoke Chains**: Arbitrum (42161), Future chains - Report data, execute locally

### **Message Flow**
```
Spoke Chain (User Action)
    ↓
Local Contract Execution
    ↓
LayerZero _lzSend() → Hub Chain
    ↓
Hub Aggregates/Calculates
    ↓
Hub _lzSend() → All Spokes
    ↓
Spokes Execute Instructions
```

### **Key Features**
1. **Unified State**: Global metrics aggregated on hub
2. **Local Execution**: Fast operations on local chain
3. **Cross-Chain Sync**: Automatic synchronization via LayerZero
4. **Gas Efficiency**: Only sync when necessary
5. **Composability**: All contracts interoperate across chains

---

## 📦 Contract Dependencies

```
ONBTOmnichainStaking
    ↓
ONBTStakingRouter → ONBTYieldDistributor
    ↓                    ↓
ONBTRewardsPool → ONBTOmnichainVault
    ↓
ONBTGovernor (uses voting power from staking)
    ↓
ONBTAchievementNFT (minted by staking)
```

---

## 🔧 LayerZero V2 Imports Used

### **OApp Contracts** (Standard messaging)
```solidity
import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
```
- ONBTOmnichainStaking
- ONBTRewardsPool
- ONBTStakingRouter
- ONBTYieldDistributor
- ONBTGovernor
- ONBTOmnichainVault

### **ONFT Contracts** (NFT bridging)
```solidity
import { ONFT721 } from "@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol";
```
- ONBTAchievementNFT

### **OFT Contracts** (Token bridging)
```solidity
import { OFT } from "@layerzerolabs/oft-evm/contracts/OFT.sol";
```
- ONBT (already deployed)

---

## 🚀 Deployment Order

1. **ONBT Token** (✅ Already deployed)
   - Base: 0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD
   - Arbitrum: 0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da

2. **ONBTOmnichainVault** (Hub on Base, spoke on Arbitrum)
3. **ONBTRewardsPool** (Hub on Base, spoke on Arbitrum)
4. **ONBTYieldDistributor** (Hub on Base, spoke on Arbitrum)
5. **ONBTAchievementNFT** (Deploy on all chains)
6. **ONBTOmnichainStaking** (Hub on Base, spoke on Arbitrum)
7. **ONBTStakingRouter** (Hub on Base, spoke on Arbitrum)
8. **ONBTGovernor** (Hub on Base, spoke on Arbitrum)

---

## 🔗 LayerZero Endpoint IDs

| Chain | Chain ID | LZ Endpoint ID |
|-------|----------|----------------|
| Base | 8453 | 30184 |
| Arbitrum | 42161 | 30110 |
| Ethereum | 1 | 30101 |
| Optimism | 10 | 30111 |
| Polygon | 137 | 30109 |

---

## 📊 Cross-Chain Features Summary

| Contract | Cross-Chain Feature | Hub Chain | Spokes |
|----------|---------------------|-----------|--------|
| Staking | Stake sync, delegation, achievements | Base | Arbitrum |
| RewardsPool | Auto-refill, allocation | Base | All chains |
| Router | Metrics aggregation, yield distribution | Base | All chains |
| YieldDistributor | Share sync, yield distribution | Base | All chains |
| AchievementNFT | NFT bridging (ONFT) | Any | Any |
| Governor | Vote aggregation, execution | Base | All chains |
| Vault | Treasury management, budgets | Base | All chains |
| ONBT | Token bridging (OFT) | Any | Any |

---

## 🎯 Next Steps

1. **Install Dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Compile Contracts**:
   ```bash
   npx hardhat compile
   ```

3. **Deploy Contracts**:
   - Use deployment scripts in `deploy/` directory
   - Set up LayerZero peers after deployment
   - Configure hub-spoke relationships

4. **Test Cross-Chain Operations**:
   - Send test transactions
   - Verify message relaying
   - Check state synchronization

5. **Update Miniapp**:
   - Import new contract ABIs
   - Add staking interface
   - Add governance interface
   - Display achievements

---

## 📚 Documentation References

- **LayerZero V2 Docs**: https://docs.layerzero.network/v2
- **OApp Documentation**: https://docs.layerzero.network/v2/developers/evm/oapp/overview
- **ONFT Documentation**: https://docs.layerzero.network/v2/developers/evm/onft/overview
- **OFT Documentation**: https://docs.layerzero.network/v2/developers/evm/oft/quickstart

---

## ✅ Verification Checklist

- [x] All contracts use LayerZero V2 imports (OApp/ONFT/OFT)
- [x] No LayerZero V1 imports remaining (NonblockingLzApp removed)
- [x] All contracts implement `_lzReceive` with V2 signature
- [x] All contracts use V2 `_lzSend` with MessagingFee
- [x] Hub-spoke architecture clearly defined
- [x] Message types documented for each contract
- [x] Cross-chain features mapped to LayerZero messages
- [x] Deployment order established
- [x] Dependencies between contracts identified

---

**Status**: ✅ **All ONBT contracts are LayerZero V2 enabled and ready for deployment!**
