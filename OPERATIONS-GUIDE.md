# ONBT Production Operations Guide

**Last Updated:** February 21, 2026  
**Status:** ✅ Production Ready  
**Deployment Version:** Staking Fix Release (Feb 20, 2026)

---

## Quick Reference

### Network Information

| Network | Chain ID | RPC URL | EID |
|---------|----------|---------|-----|
| **Base** | 8453 | https://mainnet.base.org | 30184 |
| **Arbitrum** | 42161 | https://arb1.arbitrum.io/rpc | 30110 |

### Admin Access

- **Admin Wallet:** `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`
- **Owner Role:** All 26 contracts
- **Timelock:** Governance actions require timelock delay

### Quick Diagnostics

```bash
# Check configuration status (30 seconds)
node scripts/check-achievement-config-status.mjs

# Run integration tests (10 seconds)
node scripts/quick-integration-check.mjs

# Validate all contracts (60 seconds)
node scripts/probe-contracts-simple.mjs
```

---

## Operational Tasks

### 1. Daily Health Check

**Frequency:** Daily or before critical operations  
**Duration:** ~2 minutes

```bash
# Run quick status check
node scripts/check-achievement-config-status.mjs

# Expected output: ✅ on both Base and Arbitrum
```

**What to Monitor:**
- AchievementNFT linked status
- Contract responsiveness
- Network connectivity

**Alert Triggers:**
- ❌ Configuration shows "NOT SET" (zero address)
- ⚠️ Network read timeouts
- Network RPC errors

---

### 2. Verify Contract State

**Frequency:** Before major operations  
**Duration:** ~10 seconds

```bash
# Check cross-contract wiring
node scripts/quick-integration-check.mjs

# Expected output: All 8 tests passing (4 per network)
```

**Tests Included:**
- AchievementNFT configuration
- RewardsPool → Staking connection
- Token LayerZero endpoint
- RevenueRouter destination wiring

---

### 3. Full Contract Validation

**Frequency:** Weekly or post-deployment  
**Duration:** ~60 seconds

```bash
# Comprehensive ABI validation
node scripts/probe-contracts-simple.mjs

# Expected output: 40/42 functions passing
```

**Validation Includes:**
- 42 function signatures across 13 contracts
- View function execution
- Return value verification
- Timeout handling (3s per call)

**Expected Failures** (normal):
- `staking.totalStaked()` - Access restricted
- `stakingRouter.getGlobalMetrics()` - Restricted access

---

## Contract Management

### Core Contracts by Category

#### Token & Cross-Chain
- **ONBTToken (OFT):** Cross-chain token, LayerZero V2 enabled
- **Base:** `0xe6d40Cee90a7A4aaeBAd03F4Bfc6a5C42bD3aB55`
- **Arbitrum:** `0x96819A0C209d98FcD8fE9E8A4e38Bd8d23CEaB18`

#### Staking & Rewards
- **Staking:** Main staking contract, achievement NFT integration
- **RewardsPool:** Distributes staking rewards
- **StakingRouter:** Synchronizes state across chains
- **RewardDistributor:** Yield distribution logic

#### Governance & Admin
- **Governor:** Proposal creation and voting
- **Timelock:** Enforces governance action delays
- **Admin Wallet:** `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`

#### DeFi Ecosystem
- **Vault:** Capital preservation and growth
- **YieldDistributor:** Yield farming integration
- **InsuranceFund:** Risk management and claims
- **Stabilizer:** Price stability mechanism
- **IncentiveController:** User incentive distribution
- **RevenueRouter:** Multi-destination revenue split (60% vault, 30% rewards, 10% insurance)

#### NFT Systems
- **AchievementNFT:** User achievement tracking
- **Base:** `0x11EEEB62b2b2B66475642f82502989D671fC5855`
- **Arbitrum:** `0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb`

### Ownership & Access Control

All contracts are owned by: `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`

**Actions Requiring Owner:**
- Contract configuration updates
- Parameter adjustments
- Admin function calls
- Emergency pause/unpause (if implemented)

**Actions Requiring Governance:**
- Major protocol upgrades
- Fee structure changes
- New authority delegation

---

## Common Operations

### Check Account Balance

```bash
# Requires: A network connection and account address
# Example: Check admin wallet balance

const balance = await provider.getBalance("0x44497B9FF645A995b18967b34eFeFDe82AeC8144");
```

### Transfer ONBT Across Chains

**Requires:**
- Source chain: Base or Arbitrum
- Destination chain: The other network
- ONBT balance sufficient for transfer + gas + LZ fee

**Process:**
1. Call `OFT.sendFrom()` on source chain
2. Specify destination chain EID (30184 or 30110)
3. Pay LayerZero messaging fee
4. Wait 30-90 seconds for cross-chain delivery

### Execute Governance Action

**Process:**
1. Create proposal (Governor contract)
2. Wait `votingDelay` blocks
3. Voting period: `votingPeriod` blocks
4. If passed, queue in Timelock
5. Wait `delay` seconds (typically 2 days)
6. Execute action

**Example: Update staking rewards rate**
- Requires: Governor proposal + vote + timelock
- Estimated time: 3-5 days total

---

## Emergency Procedures

### If AchievementNFT Not Linked

**Symptoms:**
- `check-achievement-config-status.mjs` shows ❌
- NFT address is `0x0000...`

**Fix:**
```bash
# Run configuration fix
npx hardhat run scripts/fix-achievement-nft-config.mjs --network [base|arbitrum]

# Verify fix
npx hardhat run scripts/verify-achievement-config.mjs --network [base|arbitrum]
```

**Cost:** ~$0.0001 per network (48K gas @ 0.02 gwei)

### If Network Unreachable

**Symptoms:**
- RPC connection timeouts
- Read operations fail but blockchain continues

**Actions:**
1. Wait 5-10 minutes (transient RPC issue)
2. Try alternate RPC: `https://base.blockscout.com` (Base alternative)
3. Contact RPC provider if issue persists

### If Contract State Corrupted

**Symptoms:**
- Unexpected return values
- Failed transactions with cryptic errors

**Recovery Steps:**
1. Run full validation: `node scripts/probe-contracts-simple.mjs`
2. Check integration: `node scripts/quick-integration-check.mjs`
3. Review recent transactions on Basescan/Arbiscan
4. Contact development team if issue cannot be identified

---

## Monitoring & Alerts

### Recommended Metrics

#### TVL Tracking
- Total ONBT staked across both chains
- Growth trend (daily/weekly)
- User count

#### Staking Metrics
- Daily active stakers
- Average stake size
- Unstaking rate
- Achievement NFT mints (per day)

#### Cross-Chain Activity
- Daily transfers (Base → Arbitrum)
- Daily transfers (Arbitrum → Base)
- Average transfer time
- Failed cross-chain messages

#### Revenue Flow
- Daily revenue to router (% of total)
- Distribution: Vault (60%), Rewards (30%), Insurance (10%)
- Processing efficiency

### Alert Thresholds

| Metric | Alert Level | Action |
|--------|------------|--------|
| TVL decrease > 50% | Critical | Investigate anomalies |
| Failed cross-chain msgs > 5 | High | Check LayerZero configuration |
| AchievementNFT not linked | High | Run fix script |
| Gas price spike > 2x normal | Medium | Monitor cost impact |
| Contract read timeouts | Medium | Check RPC health |

---

## Deployment History

### Current Release

**Date:** February 20, 2026  
**Version:** Staking Fix Release  
**Changes:**
- Fixed AchievementNFT configuration (was zero address)
- Verified all cross-contract wiring
- Validated 95% of contract functions
- Passed all integration tests

**Base Deployment ID:** `1771584423316`  
**Arbitrum Deployment ID:** `1771584790862`

### Configuration Status

✅ Both networks fully configured  
✅ All 26 contracts operational  
✅ All integrations verified  
✅ Ready for production use

---

## Support & Escalation

### Diagnostic Tools Available

| Tool | Purpose | Command |
|------|---------|---------|
| AchievementNFT Status | Quick config check | `node scripts/check-achievement-config-status.mjs` |
| Integration Tests | Contract wiring validation | `node scripts/quick-integration-check.mjs` |
| Contract Probe | Full ABI validation | `node scripts/probe-contracts-simple.mjs` |
| Fix Script | Repair NFT config | `npx hardhat run scripts/fix-achievement-nft-config.mjs --network [base\|arbitrum]` |
| Verify Config | Detailed NFT status | `npx hardhat run scripts/verify-achievement-config.mjs --network [base\|arbitrum]` |

### Explorer Links

- **Base Contracts:** https://basescan.org/address/0x... 
- **Arbitrum Contracts:** https://arbiscan.io/address/0x...
- **LayerZero Scan:** https://layerzeroscan.com/

### Development Setup

**Required:**
- Node.js 18+
- npm or yarn
- Hardhat 2.28.6
- ethers.js 5.7.2

**Installation:**
```bash
cd ONBT-App
npm install
npx hardhat compile
```

### Contact Information

- **Technical Issues:** Check DEPLOYMENT-STATUS.md for contract addresses
- **Emergency Access:** Admin wallet `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`
- **Documentation:** Review DEPLOYMENT-STATUS.md and contract ABIs in `artifacts/`

---

## Checklist: Pre-Launch Operations

- [ ] Run daily health check: `node scripts/check-achievement-config-status.mjs`
- [ ] Verify integration: `node scripts/quick-integration-check.mjs`
- [ ] Validate contracts: `node scripts/probe-contracts-simple.mjs`
- [ ] Check admin balance for operations (0.1+ ETH recommended)
- [ ] Confirm LayerZero endpoints configured
- [ ] Verify revenue router destination splits (60/30/10)
- [ ] Test cross-chain transfer (small amount)
- [ ] Review explorer links for recent activity
- [ ] Document any issues found
- [ ] Notify team if any tests fail

---

**Ready for Production:** ✅  
**Last Verified:** February 21, 2026  
**Next Review:** February 28, 2026
