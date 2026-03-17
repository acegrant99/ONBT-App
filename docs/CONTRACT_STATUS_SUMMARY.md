# ONBT Contracts: Quick Reference

## Currently Deployed ✅

```
OmnichainNabatOFT.sol (Basic)
├── Base Chain: 0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
├── Arbitrum: 0x169aC761Ebb210B5A93B68B44DA394776a7B230C
│
└── Features:
    ✅ ERC20 standard
    ✅ LayerZero V2 cross-chain
    ✅ 1B total supply
    ✅ Immutable
    ❌ No governance
    ❌ No pause
    ❌ No permit
    ❌ No voting
    ❌ No analytics
```

## Built but NOT Deployed 🟡

```
Advanced Modules:
│
├── 🔐 OmnichainNabatGovernance.sol (262 lines)
│   ├── Pause/unpause
│   ├── Admin timelock
│   ├── Transfer limits
│   ├── Rate limiting
│   ├── Whitelist
│   ├── Transfer hooks
│   └── Emergency recovery
│
├── ✍️  OmnichainNabatPermit.sol (19 lines)
│   ├── EIP-2612 gasless approvals
│   ├── Meta-transaction support
│   └── DEX UX improvement
│
├── 🗳️  OmnichainNabatVotes.sol (92 lines)
│   ├── On-chain voting power
│   ├── Delegation
│   ├── Historical queries
│   └── Governor compatible
│
├── 📊 OmnichainNabatTracking.sol (217 lines)
│   ├── Cross-chain supply tracking
│   ├── Bridge analytics
│   ├── Holder counting
│   ├── Transfer metrics
│   └── Distribution queries
│
├── 💾 OmnichainNabatStorage.sol (160 lines)
│   ├── Organized state variables
│   ├── Branding storage
│   └── Structured layout
│
├── 🌐 OmnichainNabatOFTDestination.sol
│   └── Zero-supply constructor for destinations
│
└── 🛡️  Precrime.sol
    └── LayerZero security module
```

## Libraries 🔧

```
ONBTMathLib.sol (291 lines)
├── Safe arithmetic
├── Fixed-point math
├── Square root
├── Percentages
└── Price calculations

ONBTSecurityLib.sol (269 lines)
├── Address validation
├── Balance checks
├── Deadline enforcement
├── Slippage protection
└── Reentrancy helpers
```

## Feature Comparison

| Feature | V1 (Deployed) | V2 (Possible) |
|---------|---------------|---------------|
| Cross-chain transfers | ✅ | ✅ |
| ERC20 standard | ✅ | ✅ |
| Pause functionality | ❌ | ✅ |
| Gasless approvals (Permit) | ❌ | ✅ |
| Transfer limits | ❌ | ✅ |
| Rate limiting | ❌ | ✅ |
| Whitelist | ❌ | ✅ |
| Voting/delegation | ❌ | ✅ |
| Analytics tracking | ❌ | ✅ |
| Emergency recovery | ❌ | ✅ |
| Transfer hooks | ❌ | ✅ |
| Gas cost | Low ✅ | Higher ⚠️ |

## Deployment Options

### Option 1: Enhanced V2 (New Contract)
```
Pros:
✅ All advanced features
✅ Professional-grade security
✅ Better UX (permit)
✅ Emergency controls

Cons:
❌ New address
❌ Requires migration
❌ DEX liquidity migration
❌ Higher gas costs
❌ Needs audit ($5-15k)
```

### Option 2: Extend V1 (Companions)
```
Pros:
✅ Keep current address
✅ No migration needed
✅ Modular approach
✅ Lower gas costs

Cons:
❌ Limited integration
❌ More complex architecture
❌ Multiple contracts
```

### Option 3: Hybrid (Best of Both)
```
Strategy:
1. Keep V1 on Base + Arbitrum ✅
2. Deploy V2 on NEW chains (Optimism, Polygon, etc) ⭐
3. Add Permit to V2 for better UX 🎯
4. Cross-chain bridge between V1 and V2 🌉

Benefits:
✅ No disruption to existing holders
✅ Enhanced features on new chains
✅ Test V2 before full migration
✅ Progressive upgrade path
```

## Quick Decisions

### Deploy Permit Next? (Easy Win)
```bash
# When deploying to Optimism/Polygon
# Use: OFT + ERC20Permit
# Cost: Same as basic
# Benefit: Gasless approvals! ⭐⭐⭐⭐⭐
```

### Add Analytics? (Transparency)
```bash
# Deploy tracking module
# Show distribution across chains
# Build Dune dashboard
# Benefit: Professional image ⭐⭐⭐⭐
```

### Enable Pause? (Security)
```bash
# Add governance module
# Emergency stop capability
# Requires new contract or upgrade plan
# Benefit: Protection ⭐⭐⭐⭐
```

## Gas Impact

```
Current (V1):
├── Transfer: ~50k gas
├── Approve: ~45k gas
└── Cross-chain: ~200k gas

Enhanced (V2):
├── Transfer: ~80k gas (+60%) ⚠️
├── Approve: ~45k gas (same) ✅
├── Permit: ~70k gas (new!) ⭐
└── Cross-chain: ~230k gas (+15%)
```

## Recommended Path

```
Phase 1 (Now):
├── ✅ Keep V1 on Base + Arbitrum
├── 🔥 Deploy V2 with Permit on Optimism
├── 📊 Set up analytics tracking
└── 📝 Document governance plan

Phase 2 (1-2 months):
├── 🌐 Deploy V2 to Polygon, BSC, Avalanche
├── 🏛️ Implement governance (if needed)
├── 🧪 Test V2 thoroughly
└── 📢 Community feedback

Phase 3 (3-6 months):
├── 🤔 Decide: Migrate Base/Arbitrum to V2?
├── 🔒 Audit V2 contracts
├── 💰 Launch staking (use libraries)
└── 🚀 Full ecosystem launch
```

## Action Items

**This Week:**
- [ ] Decide: V2 for new chains? YES/NO
- [ ] Get Optimism/Polygon API keys
- [ ] Test Permit module locally
- [ ] Set up Dune Analytics

**This Month:**
- [ ] Deploy to Optimism (with or without enhancements)
- [ ] Create analytics dashboard
- [ ] Document governance model
- [ ] Begin DEX partnerships

**This Quarter:**
- [ ] Complete multi-chain expansion
- [ ] Launch V2 (if chosen)
- [ ] Deploy staking/rewards
- [ ] Professional audit

---

**See full assessment**: [CONTRACT_ECOSYSTEM_ASSESSMENT.md](./CONTRACT_ECOSYSTEM_ASSESSMENT.md)
