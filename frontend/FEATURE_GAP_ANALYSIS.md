# Feature Gap Analysis: ONBT dApp

**Date:** February 21, 2026  
**Status:** Gap Analysis Complete

---

## 📊 High-Level Overview

| Category | Current Frontend | Available Contracts | Gap Status |
|----------|-----------------|-------------------|-----------|
| **Token Management** | ✅ Basic transfer | ✅ Full OFT + Permit | ⚠️ Permit features missing |
| **Staking** | ✅ Basic stake/unstake | ✅ Full Omnichain staking | ⚠️ Rewards detail missing |
| **Governance** | ❌ Not implemented | ✅ Full Governor contract | 🔴 **CRITICAL GAP** |
| **Liquidity** | ❌ Not implemented | ✅ Liquidity Manager | 🔴 **CRITICAL GAP** |
| **Yield Distribution** | ❌ Not implemented | ✅ Yield Distributor | 🔴 **CRITICAL GAP** |
| **Revenue Routing** | ❌ Not implemented | ✅ Revenue Router | 🔴 **CRITICAL GAP** |
| **Insurance** | ❌ Not implemented | ✅ Insurance Fund | 🔴 **CRITICAL GAP** |
| **Bridging** | ✅ Implemented | ✅ OFT Bridge | ✅ Complete match |
| **Achievements** | ✅ Basic NFT view | ✅ Achievement NFT | ⚠️ Minting/advanced features missing |

---

## ✅ What the dApp CAN Currently Do

### 1. **Wallet Connection** ✅
- Multi-wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- Network switching (Base ↔ Arbitrum)
- Address display and formatting
- Disconnect functionality

### 2. **Dashboard** ✅ (Minimal)
- View ONBT balance
- View achievement count
- Add ONBT to wallet
- Navigation to other features

### 3. **Staking** ✅ (Basic)
- Stake ONBT tokens
- Unstake tokens
- Claim rewards
- View staked balance
- View claimable rewards

### 4. **Cross-Chain Bridge** ✅
- Transfer ONBT between Base and Arbitrum
- View pending transactions
- Block explorer integration

### 5. **Achievements** ✅ (View-only)
- Display earned achievement NFTs
- Filter NFTs by status
- View achievement images from IPFS

### 6. **Enhanced UI Components** ✅
- Premium button component (5 variants)
- Card component (animated)
- Input component (with validation)
- Payment status indicator
- Wallet connection widget

---

## 🔴 What the dApp SHOULD Be Able to Do

### **CRITICAL FEATURES MISSING**

#### 1. **Governance & Voting** 🔴🔴🔴
**Available Contract:** `OmnichainNabatGovernor.sol`  
**Missing Frontend:** Governance dashboard

**Should Include:**
- [ ] List active proposals
- [ ] View proposal details (description, voting options, timeline)
- [ ] Vote on proposals (for/against/abstain)
- [ ] View voting power (delegated tokens)
- [ ] Delegate voting power to other addresses
- [ ] Create new proposals (for governors)
- [ ] View proposal execution history
- [ ] Time-lock integration for governance delays

**User Impact:** Cannot participate in protocol decisions

---

#### 2. **Advanced Staking & Rewards** 🔴🔴
**Available Contracts:** `ONBTYieldDistributor.sol`, `ONBTRewardsPool.sol`, `ONBTStakingRouter.sol`  
**Missing Frontend:** Detailed rewards dashboard

**Should Include:**
- [ ] Breakdown of staking rewards sources
- [ ] Projected APY/APR calculations
- [ ] Reward claiming schedule/timeline
- [ ] Historical rewards earned (chart)
- [ ] Stake stratification (by amount/duration)
- [ ] Compounding options
- [ ] Reward pool balance and total staked
- [ ] Claim multiple reward tiers at once

**User Impact:** Cannot see full reward opportunities or projections

---

#### 3. **Governance Revenue Participation** 🔴🔴
**Available Contract:** `ONBTRevenueRouter.sol`  
**Missing Frontend:** Revenue dashboard

**Should Include:**
- [ ] View protocol revenue sources
- [ ] View revenue allocation percentages
- [ ] Claim revenue share rewards
- [ ] Historical revenue received (chart)
- [ ] Revenue distribution timeline
- [ ] Total revenue pool
- [ ] Your revenue accrual rate

**User Impact:** Cannot claim passive income from protocol

---

#### 4. **Liquidity Management** 🔴🔴
**Available Contract:** `ONBTLiquidityManager.sol`  
**Missing Frontend:** Liquidity dashboard

**Should Include:**
- [ ] Provide liquidity (single-sided, dual-sided)
- [ ] View liquidity positions
- [ ] Remove liquidity
- [ ] View LP rewards
- [ ] Swap ONBT for other tokens
- [ ] View supported trading pairs
- [ ] Slippage settings
- [ ] LP fee breakdown

**User Impact:** Cannot provide liquidity or swap tokens

---

#### 5. **Incentive Tracking** 🔴
**Available Contract:** `ONBTIncentiveController.sol`  
**Missing Frontend:** Incentive dashboard

**Should Include:**
- [ ] Active incentive programs list
- [ ] APY/rewards for each incentive program
- [ ] View incentive eligibility
- [ ] Claim incentive rewards
- [ ] Historical incentive earnings
- [ ] Multi-tier incentive tracking
- [ ] Program participation status

**User Impact:** Cannot see or claim incentive rewards

---

#### 6. **Price Stabilization Features** 🔴
**Available Contract:** `ONBTStabilizer.sol`  
**Missing Frontend:** Stability dashboard

**Should Include:**
- [ ] Current ONBT price
- [ ] Price deviation from target
- [ ] Stabilization mechanisms active
- [ ] Participate in stabilization (if applicable)
- [ ] View stabilization history (price movements)
- [ ] Collateral ratio (if applicable)
- [ ] Emergency redemptions (if applicable)

**User Impact:** Cannot monitor protocol stability

---

#### 7. **Insurance Fund Management** 🔴
**Available Contract:** `ONBTInsuranceFund.sol`  
**Missing Frontend:** Insurance dashboard

**Should Include:**
- [ ] Insurance fund balance
- [ ] Coverage limits
- [ ] Claims process information
- [ ] Insurance history
- [ ] Risk assessment
- [ ] Fund utilization ratio
- [ ] Emergency insurance features

**User Impact:** Cannot see insurance coverage or file claims

---

#### 8. **Treasury & Multi-Sig Vault** 🔴
**Available Contract:** `ONBTOmnichainVault.sol`, `SimpleTimelock.sol`  
**Missing Frontend:** Treasury features

**Should Include:**
- [ ] View treasury balances
- [ ] View pending treasury transactions
- [ ] View timelock schedule
- [ ] Monitor multi-sig operations
- [ ] View treasury governance
- [ ] Historical treasury actions

**User Impact:** Community cannot monitor treasury

---

#### 9. **Permit/Gasless Transactions** ⚠️
**Available Contract:** `OmnichainNabatPermit.sol`  
**Missing Frontend:** Permit UI

**Should Include:**
- [ ] Sign permit messages (off-chain)
- [ ] Approve with signature instead of gas
- [ ] Batch operations with permits
- [ ] View existing permits
- [ ] Revoke permits

**User Impact:** Cannot use gasless approvals, higher transaction costs

---

#### 10. **Advanced Token Features** ⚠️
**Available Contracts:** `OmnichainNabatVotes.sol`, `OmnichainNabatTracking.sol`  
**Missing Frontend:** Token features

**Should Include:**
- [ ] View voting power (ERC20Votes)
- [ ] Voting power delegation
- [ ] View voting checkpoints (history)
- [ ] Token tracking/analytics
- [ ] Token holder statistics
- [ ] Supply monitoring
- [ ] Omnichain token bridge status

**User Impact:** Cannot delegate voting power, limited token visibility

---

## 📈 Feature Maturity Matrix

```
FEATURE               BACKEND    FRONTEND    MATURITY
─────────────────────────────────────────────────────
Token (OFT)             ✅✅✅      ✅✅        95%
Staking (Basic)         ✅✅✅      ✅✅        85%
Bridge                  ✅✅✅      ✅✅        90%
Achievements            ✅✅        ✅         75%
─────────────────────────────────────────────────────
Governance             ✅✅✅      🔴         0%
Liquidity              ✅✅✅      🔴         0%
Yield Distribution     ✅✅✅      🔴         0%
Revenue Routing        ✅✅✅      🔴         0%
Incentives             ✅✅        🔴         0%
Price Stabilization    ✅✅        🔴         0%
Insurance              ✅✅        🔴         0%
Treasury               ✅✅        🔴         0%
Permits                ✅✅        🔴         0%
Voting Power           ✅✅        🔴         0%
─────────────────────────────────────────────────────
```

---

## 🎯 Priority Roadmap for Feature Completion

### **Phase 1: Critical** (Required for MVP+)
1. **Governance Dashboard** - Unlock DAO functionality
2. **Rewards Dashboard** - Showcase full incentive ecosystem
3. **Liquidity Interface** - Enable token utility
4. **Revenue Sharing** - Monetize for users

**Impact:** Transforms dApp from single-feature tool to full ecosystem

### **Phase 2: High Priority** (Major features)
5. **Price Stabilization Monitoring** - Trust and transparency
6. **Insurance Fund Display** - Risk management
7. **Voting Power Management** - Governance participation enablement
8. **Permit Support** - Better UX (gasless approvals)

**Impact:** Completes core functionality

### **Phase 3: Medium Priority** (Polish)
9. **Advanced Staking UI** - Detailed breakdowns and history
10. **Treasury Monitoring** - Community transparency
11. **Incentive Tracking** - Better reward visibility
12. **Analytics Dashboard** - Protocol insights

**Impact:** Professional product experience

---

## 💡 Development Effort Estimate

| Feature | Complexity | Est. Hours | Component Count |
|---------|-----------|-----------|-----------------|
| Governance Dashboard | High | 40-50 | 8-10 components |
| Rewards Details | Medium | 20-25 | 5-6 components |
| Liquidity Manager | High | 35-40 | 7-8 components |
| Revenue Sharing | Medium | 20-25 | 5 components |
| Stabilizer Monitor | Low | 12-15 | 3-4 components |
| Insurance Manager | Medium | 15-20 | 4-5 components |
| Voting Power Mgmt | Low | 10-15 | 2-3 components |
| Permit Support | Medium | 15-20 | 2-3 components |
| Analytics | High | 30-40 | 6-8 components |
| Treasury Monitor | Low | 10-15 | 2-3 components |
|---|---|---|---|
| **TOTAL (All)** | - | **207-265 hours** | **45-55 components** |
| **Phase 1 Only** | - | **80-105 hours** | **20-25 components** |

---

## 📋 Recommended Implementation Strategy

### **Quick Wins (Can implement today):**
1. Add "View" pages for basic revenue/insurance/stabilizer info
2. Add governance proposal listing (read-only)
3. Display voting power information
4. Show rewards breakdown in dashboard

### **Medium Term (1-2 weeks):**
1. Full governance voting interface
2. Rewards claim interface
3. Liquidity provider basic form
4. Revenue claim button

### **Long Term (2-4 weeks):**
1. Advanced analytics
2. Complete liquidity management
3. Treasury monitoring
4. Full permit support

---

## 🚀 Next Steps

**Immediate Action Items:**

1. **Decision Point:** Which features are essential for launch?
   - Governance only? (Governance Dashboard required)
   - Full ecosystem? (All 4 core features required)
   - Revenue-focused? (Revenue + Staking details)

2. **Prioritization Meeting:** Align with team on Phase 1 scope

3. **Spike Stories:** For each feature, create technical specifications

4. **Component Library:** Extend Button/Card/Input for new features

5. **Contract Integration:** Add hooks for new contract interactions

---

## 📚 Current Frontend Inventory

**Components Available:**
- ✅ Button (5 variants)
- ✅ Card (animated)
- ✅ Input (validated)
- ✅ PaymentStatus (3 states)
- ✅ WalletConnection
- ✅ Dashboard (basic)
- ✅ Staking
- ✅ Bridge
- ✅ Achievements

**Hooks/Utilities:**
- ✅ useContract (Wagmi integration)
- ✅ Custom hooks library (13+ hooks)
- ✅ Toast notifications
- ✅ Animation utilities
- ✅ Format/utility functions

**Infrastructure Ready:**
- ✅ Wagmi v2 (contract interactions)
- ✅ Viem (low-level Ethereum)
- ✅ React Query (data fetching)
- ✅ Framer Motion (animations)
- ✅ TypeScript strict mode
- ✅ Tailwind CSS

---

## 🎉 Summary

**The Good:**
- ✅ Core infrastructure is solid
- ✅ Component library is extensible
- ✅ Smart contract ecosystem is feature-rich
- ✅ dApp is functional for basic use

**The Gap:**
- 🔴 Missing 70% of protocol features in UI
- 🔴 Cannot participate in governance
- 🔴 Cannot claim passive income streams
- 🔴 Limited visibility into rewards
- 🔴 No liquidity/swap functionality

**The Opportunity:**
- 📈 dApp can evolve from single-feature tool to complete ecosystem
- 📈 Significant value unlock with governance + revenue features
- 📈 Development roadmap is clear with 4 critical features
- 📈 15-25 additional components needed (vs. 9 existing)

**Recommendation:** Implement Phase 1 (Governance + Rewards + Liquidity) to unlock 80% of protocol value.

