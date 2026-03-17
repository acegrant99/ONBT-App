# ONBT System - Immediate Action Plan
**Date**: February 20, 2026  
**Status**: Contracts deployed, needs production prep

---

## ✅ Completed
- [x] Deploy ONBTOmnichainStaking to Base
- [x] Deploy ONBTOmnichainStaking to Arbitrum  
- [x] Configure peers (Base ↔ Arbitrum)
- [x] Set enforced options (all 5 message types)
- [x] Update dependent contracts
- [x] Validate reward calculations
- [x] Verify omnichain configuration

---

## 🎯 Immediate Actions (This Week)

### **Priority 1: Fund Reward Pools** ⚠️ **CRITICAL**

**Why**: Staking contracts can't pay 10% APY without ONBT tokens

**Action**:
```bash
# Check how much you need
npx hardhat run scripts/calculate-reward-funding.mjs --network base
npx hardhat run scripts/calculate-reward-funding.mjs --network arbitrum

# Then send ONBT to:
# Base:     0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe
# Arbitrum: 0x4E8cF6632fdFD031019c748B041e1c2dC447fa44
```

**Minimum**: Fund for 100k ONBT staked (conservative start)
- ~6,000 ONBT for 6 months per chain
- ~12,000 ONBT total (both chains)

**Status**: ⏳ **NOT DONE - DO FIRST**

---

### **Priority 2: Ownership Decision** 🔐

Choose ONE:

#### **Option A: Deploy Timelock (Recommended for solo)**
```bash
# 1. Compile new contract
npx hardhat compile

# 2. Deploy timelock (48hr delay)
npx hardhat run scripts/deploy-timelock.mjs --network base
npx hardhat run scripts/deploy-timelock.mjs --network arbitrum

# 3. Transfer ownership to timelock
# Update MULTISIG_ADDRESS in transfer-to-multisig.mjs with timelock address
npx hardhat run scripts/transfer-to-multisig.mjs --network base
npx hardhat run scripts/transfer-to-multisig.mjs --network arbitrum
```

**Pros**: Transparency, no co-signers needed, trustless
**Cons**: 48hr delay on all admin actions

#### **Option B: Keep Current Ownership (Temporary)**
- Move deployer key to hardware wallet (Ledger/Trezor)
- Document all admin actions publicly
- Transition to Timelock within 30 days

**Pros**: Fast iteration, no delays
**Cons**: Single point of failure, trust-based

**Status**: ⏳ **DECIDE TODAY**

---

### **Priority 3: Test Staking Flow** 🧪

**Why**: Verify everything works with real transactions

**Action**:
```bash
# 1. Get some ONBT to your wallet (100 ONBT recommended)

# 2. Visit BaseScan and interact with staking contract
# Address: 0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe

# 3. Approve ONBT spending
# Call: approve(stakingAddress, 100 ether)

# 4. Stake tokens
# Call: stake(10 ether, 0)  // 10 ONBT, no lockup
# Wait 1 hour

# 5. Check pending rewards
# Call: earned(yourAddress)

# 6. Claim rewards
# Call: claimRewards()

# 7. Unstake (optional)
# Call: unstake(10 ether)
```

**Test on Arbitrum too**:
- Same process on Arbitrum staking: 0x4E8cF6632fdFD031019c748B041e1c2dC447fa44

**Document any issues found**

**Status**: ⏳ **NEEDS TESTING**

---

### **Priority 4: Set Up Basic Monitoring** 📊

**Option A: Free - Manual Checks**
- Bookmark BaseScan/Arbiscan contract pages
- Check reward pool balance daily
- Monitor staking events
- [ ] Run health checks (scripts/monitoring-health.mjs)

**Option B: Automated - Tenderly (Free tier)**
1. Sign up at tenderly.co
2. Add your contracts
3. Set alerts:
   - Reward pool balance < threshold
   - Large unstakes
   - Failed transactions
   - Ownership changes

**Option C: OpenZeppelin Defender (Paid)**
- Advanced monitoring
- Auto-rebalancing
- Incident response

**Status**: ⏳ **SET UP THIS WEEK**

---

## 📅 Week 2-3 Actions

### **Week 2: Security & Stability**

- [ ] **Professional audit** (if budget allows: $20k-50k)
  - Or use free tools: Slither, Mythril, Aderyn
  
- [ ] **Bug bounty program** (HackenProof, Immunefi)
  - Start small: $500-5k for critical bugs
  
- [ ] **Monitor test stakes**
  - Watch reward accrual accuracy
  - Check leaderboard updates
  - Verify achievement unlocks

### **Week 3: Liquidity & Access**

- [ ] **Provide DEX liquidity**
  - Base: Uniswap V3 or Aerodrome (ONBT/ETH)
  - Arbitrum: Camelot or Uniswap (ONBT/ETH)
  - Minimum: $50k liquidity per chain
  
- [ ] **Simple frontend** (even basic is better than none)
  - Stake/unstake interface
  - Rewards dashboard
  - Leaderboard display
  - Or use existing templates (Scaffold-ETH, wagmi)

---

## 📅 Month 2 Actions

### **Community Building**

- [ ] **Launch announcement**
  - Twitter/X thread
  - Medium article
  - Discord/Telegram community
  
- [ ] **Documentation**
  - User guide (how to stake)
  - FAQ
  - Contract addresses page
  - Audit report (if done)
  
- [ ] **Incentives**
  - EARLY_ADOPTER for first 100 stakers
  - Bonus rewards for first month?
  - Referral program?

### **Governance Test**

- [ ] **First proposal** (small parameter change)
  - Test full DAO cycle
  - Document process
  - Get community involved
  
- [ ] **Delegate campaigns**
  - Explain delegation
  - Encourage participation

---

## 📅 Month 3+ Actions

### **Decentralization Path**

- [ ] **Find multisig signers** (if not using Timelock)
  - Trusted community members
  - Technical advisors
  - Security researchers
  
- [ ] **Transfer Timelock admin** to multisig
  - Move from solo to distributed control
  
- [ ] **Plan Governor transition**
  - When: 100+ stakers, 1M+ TVL, 3+ months stable
  - How: Community vote to approve
  - Emergency plan: Guardian role for pause

---

## 🚨 Emergency Contacts

**If you discover critical bug:**
1. DO NOT fix immediately (tips off attackers monitoring mempool)
2. Contact security researchers (Samczsun, etc. on Twitter)
3. Prepare fix privately
4. Coordinate disclosure + fix deployment
5. Post-mortem and compensation plan

**If contracts exploited:**
1. Pause if possible (if owner or guardian)
2. Alert community immediately (Discord/Twitter)
3. Contact security teams for help
4. Document what happened
5. Plan recovery/compensation

---

## 📊 Success Metrics (First Month)

Track these weekly:

**Adoption**:
- [ ] Unique stakers: Target 50+
- [ ] Total staked: Target 100k+ ONBT  
- [ ] Retention: % who stake >7 days

**Technical**:
- [ ] Uptime: 99.9%+
- [ ] Cross-chain messages: 100% success rate
- [ ] Bugs found: 0 critical, <5 minor

**Community**:
- [ ] Discord members: 200+
- [ ] Twitter followers: 500+
- [ ] Daily active users: 10+

---

## ⚡ DO RIGHT NOW (Next 2 Hours)

1. **Calculate reward needs**:
   ```bash
   npx hardhat run scripts/calculate-reward-funding.mjs --network base
   ```

2. **Get ONBT tokens ready** (for reward pools)
   - Check your balance
   - Buy/transfer what you need

3. **Make ownership decision**:
   - Timelock? → Compile and deploy today
   - Keep current? → Move key to hardware wallet

4. **Fund reward pools** (Base + Arbitrum)
   - Transfer ONBT to staking contracts

5. **Do test stake**:
   - 10 ONBT on Base
   - Wait 1 hour
   - Check rewards
   - Claim rewards

6. **Set up alerts** (basic):
   - Bookmark contract pages
   - Set calendar reminder to check daily

---

## 📝 Questions to Answer

Before launching to public:
- [ ] What's your target TVL? (100k? 1M? 10M?)
- [ ] Do you have ONBT liquidity on DEXs?
- [ ] How will users discover your system?
- [ ] What's your marketing budget?
- [ ] Do you have community moderators?
- [ ] Is there a support plan? (Discord/Telegram)

---

**Current Status**: ✅ Deployed | ⏳ Testing | ❌ Not Production Ready

**Blockers**: 
1. Reward pools not funded
2. No real-world testing
3. No monitoring set up

**Timeline to Production**: 1-2 weeks if you execute this plan

---

**Next Immediate Action**: Run the reward funding calculator, then send ONBT to staking contracts!
