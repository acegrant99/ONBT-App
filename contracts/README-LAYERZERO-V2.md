# ONBT Contract Directory - LayerZero V2 Status

## ✅ All Contracts LayerZero V2 Enabled

```
contracts/
├── token/
│   └── ONBT.sol                           ✅ LayerZero V2 OFT (Deployed)
│       • Base: 0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD
│       • Arbitrum: 0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da
│
├── defi/
│   ├── ONBTOmnichainStaking.sol          ✅ LayerZero V2 OApp
│   │   • Hub-spoke staking with cross-chain sync
│   │   • Delegation, achievements, leaderboard
│   │   • Messages: STAKE, UNSTAKE, COMPOUND, DELEGATION
│   │
│   ├── ONBTRewardsPool.sol               ✅ LayerZero V2 OApp (NEW)
│   │   • Auto-refill staking contracts
│   │   • Cross-chain reward distribution
│   │   • Messages: REQUEST_REWARDS, SEND_REWARDS
│   │
│   ├── ONBTStakingRouter.sol             ✅ LayerZero V2 OApp (NEW)
│   │   • Integration layer (staking + yield + rewards)
│   │   • Metrics aggregation on hub
│   │   • Messages: SHARE_UPDATE, SYNC_METRICS, DISTRIBUTE_YIELD
│   │
│   ├── ONBTYieldDistributor.sol          ✅ LayerZero V2 OApp (UPGRADED)
│   │   • Proportional yield distribution
│   │   • Cross-chain share synchronization
│   │   • Messages: SYNC_SHARES, DISTRIBUTE_YIELD, REPORT_CLAIMS
│   │
│   ├── ONBTAchievementNFT.sol            ✅ LayerZero V2 ONFT721 (NEW)
│   │   • Cross-chain achievement NFTs
│   │   • Portable across all chains
│   │   • Uses ONFT standard for bridging
│   │
│   ├── ONBTGovernor.sol                  ✅ LayerZero V2 OApp (NEW)
│   │   • Cross-chain DAO governance
│   │   • Vote aggregation from all chains
│   │   • Messages: PROPOSAL_CREATED, VOTE_CAST, EXECUTED
│   │
│   └── README-STAKING.md                 📄 Documentation
│
├── treasury/
│   └── ONBTOmnichainVault.sol            ✅ LayerZero V2 OApp (UPGRADED from V1)
│       • Cross-chain treasury management
│       • Budget allocations per chain
│       • Messages: TRANSFER_FUNDS, ALLOCATE_BUDGET, REQUEST_FUNDS
│
└── libraries/
    └── (OpenZeppelin, LayerZero libraries)
```

---

## 📊 Contract Statistics

| Category | Count | LayerZero V2 | Status |
|----------|-------|--------------|--------|
| **Token** | 1 | 1 OFT | ✅ Deployed |
| **DeFi** | 6 | 5 OApp + 1 ONFT | ✅ Complete |
| **Treasury** | 1 | 1 OApp | ✅ Upgraded |
| **Total** | **8** | **8** | ✅ **100%** |

---

## 🔄 Migration Status

### Upgraded from V1 to V2
- **ONBTOmnichainVault.sol**: `NonblockingLzApp` → `OApp` ✅
- **ONBTYieldDistributor.sol**: No LZ → `OApp` ✅

### Already V2
- **ONBT.sol**: OFT (deployed) ✅

### Newly Created with V2
- **ONBTOmnichainStaking.sol**: OApp ✅
- **ONBTRewardsPool.sol**: OApp ✅
- **ONBTStakingRouter.sol**: OApp ✅
- **ONBTAchievementNFT.sol**: ONFT721 ✅
- **ONBTGovernor.sol**: OApp ✅

---

## 🎯 LayerZero Import Patterns

### OApp (Standard Messaging)
```solidity
import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
```
**Used by**: Staking, RewardsPool, Router, YieldDistributor, Governor, Vault

### ONFT (NFT Bridging)
```solidity
import { ONFT721 } from "@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol";
```
**Used by**: AchievementNFT

### OFT (Token Bridging)
```solidity
import { OFT } from "@layerzerolabs/oft-evm/contracts/OFT.sol";
```
**Used by**: ONBT

---

## 🏗️ Deployment Dependencies

### Phase 1: Infrastructure
1. ONBT Token (✅ Already deployed)
2. ONBTOmnichainVault

### Phase 2: Rewards System
3. ONBTRewardsPool
4. ONBTYieldDistributor

### Phase 3: Staking System
5. ONBTAchievementNFT
6. ONBTOmnichainStaking
7. ONBTStakingRouter

### Phase 4: Governance
8. ONBTGovernor

---

## 📋 Cross-Chain Message Types

| Contract | Outbound Messages | Inbound Messages |
|----------|-------------------|------------------|
| **Staking** | STAKE, UNSTAKE, COMPOUND, DELEGATION | Acknowledgments |
| **RewardsPool** | SEND_REWARDS | REQUEST_REWARDS |
| **Router** | DISTRIBUTE_YIELD | SYNC_METRICS, SHARE_UPDATE |
| **YieldDist** | SYNC_SHARES, REPORT_CLAIMS | DISTRIBUTE_YIELD |
| **NFT** | ONFT transfers | ONFT receipts |
| **Governor** | PROPOSAL_CREATED, EXECUTED | VOTE_CAST |
| **Vault** | TRANSFER_FUNDS, ALLOCATE_BUDGET | REQUEST_FUNDS, REPORT_BALANCE |

---

## 🔗 Inter-Contract Communication

```
User Stakes ONBT
    ↓
ONBTOmnichainStaking.stake()
    ↓
ONBTStakingRouter.updateShares()
    ↓
ONBTYieldDistributor.updateShares()
    │
    ├─→ LayerZero → Hub (sync shares)
    │
    └─→ Check achievements → ONBTAchievementNFT.mintAchievement()
            ↓
        LayerZero → Any chain (NFT portable)

Rewards Distribution:
    ↓
ONBTRewardsPool (Hub)
    ↓
LayerZero → ONBTRewardsPool (Spoke)
    ↓
ONBTStakingRouter.requestRewardRefill()
    ↓
ONBTYieldDistributor.depositRewards()
    ↓
Users claim via ONBTOmnichainStaking.claimRewards()
```

---

## 🎯 Hub vs Spoke Roles

### Hub Chain (Base - 8453)
- **Staking**: Aggregates global metrics
- **RewardsPool**: Distributes rewards to all chains
- **Router**: Coordinates yield distribution
- **YieldDist**: Calculates global yield
- **Governor**: Executes proposals
- **Vault**: Main treasury

### Spoke Chains (Arbitrum - 42161, etc.)
- **Staking**: Local stakes, sync to hub
- **RewardsPool**: Requests rewards from hub
- **Router**: Reports metrics to hub
- **YieldDist**: Receives yield from hub
- **Governor**: Collects votes, relays to hub
- **Vault**: Receives allocations from hub

---

## ✅ Verification Commands

```bash
# Compile all contracts
npx hardhat compile

# Check for LayerZero V2 imports
grep -r "@layerzerolabs/oapp-evm" contracts/
grep -r "@layerzerolabs/onft-evm" contracts/
grep -r "@layerzerolabs/oft-evm" contracts/

# Verify no V1 imports remain
grep -r "NonblockingLzApp" contracts/  # Should return nothing

# Run tests
npx hardhat test

# Deploy to testnet
npx hardhat run scripts/deploy-all.js --network baseGoerli
```

---

**Last Updated**: February 14, 2026
**Status**: ✅ All contracts LayerZero V2 enabled and ready for deployment
