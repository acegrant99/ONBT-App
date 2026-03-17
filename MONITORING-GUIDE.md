# ONBT Monitoring & Diagnostics Tools

**Last Updated:** March 4, 2026  
**RPC Provider:** Alchemy  
**Status:** ✅ All tools operational

---

## Overview

The ONBT protocol includes several production monitoring and diagnostic tools:

| Tool | Purpose | Runtime | Output |
|------|---------|---------|--------|
| `health-check.mjs` | System health verification | ~10s | Console + JSON |
| `quick-integration-check.mjs` | Cross-contract wiring validation | ~10s | Console |
| `event-monitor.mjs` | Real-time event monitoring | Continuous | Console + JSON log |
| `check-achievement-config-status.mjs` | NFT configuration status | ~5s | Console |

---

## 1. Health Check

**Purpose:** Verify all systems are operational, check RPC connectivity, validate contracts.

**Usage:**
```bash
# Quick check
node scripts/health-check.mjs

# Save report to JSON
node scripts/health-check.mjs --save
```

**Checks Performed:**
- ✅ RPC connectivity (both networks)
- ✅ Token contract responsiveness
- ✅ Staking contract configuration
- ✅ NFT contract status
- ✅ Cross-contract wiring
- ✅ Current gas prices

**Output:**
```
✅ base: RPC Connected
   Block #42442837
✅ base: Token Contract
   Omnichain Nabat (ONBT) - Supply: 977999998.0
✅ base: Staking Contract
   AchievementNFT linked
✅ base: NFT Contract
  0 achievements minted
✅ base: Contract Wiring
  Staking↔NFT and RewardsPool↔Staking valid
```

**Alert Triggers:**
- ❌ RPC unreachable
- ❌ Token contract not responsive
- ❌ Critical wiring issues
- ⚠️ Any warning in health check should be investigated

**Report Location:** `health-check.json` (if --save used)

---

## 2. Quick Integration Check

**Purpose:** Fast validation of cross-contract wiring and LayerZero configuration.

**Usage:**
```bash
node scripts/quick-integration-check.mjs
```

**Tests Performed:**
- AchievementNFT linking (Staking → NFT)
- RewardsPool → Staking connection
- LayerZero endpoint configuration
- RevenueRouter destination wiring

**Expected Output:**
```
BASE:
  ✅ AchievementNFT
  ✅ RewardsPool→Staking
  ✅ Token Endpoint
  ✅ RevenueRouter Wiring
  4/4 tests passed

ARBITRUM:
  ✅ AchievementNFT
  ✅ RewardsPool→Staking
  ✅ Token Endpoint
  ✅ RevenueRouter Wiring
  4/4 tests passed

TOTAL: 8/8 tests passed
```

**Failure Response:**
```
❌ FAILED: AchievementNFT on Base
Expected: 0x11EEEB62b2b2B66475642f82502989D671fC5855
Got:      0x0000000000000000000000000000000000000000
```

---

## 3. Event Monitor

**Purpose:** Real-time monitoring of all contract events across both networks.

**Usage:**
```bash
# Start monitoring
node scripts/event-monitor.mjs

# Press Ctrl+C to stop (auto-saves log)
```

**Events Monitored:**

### Token Events
- 💰 **MINT** - New tokens created
- 🔥 **BURN** - Tokens destroyed
- ↔️ **TRANSFER** - Account-to-account transfers
- ✅ **APPROVAL** - Spend approvals

### Staking Events
- 📌 **STAKE** - User stakes ONBT
- 📌 **UNSTAKE** - User unstakes ONBT
- 🏆 **REWARDS CLAIMED** - User claims staking rewards
- ⚙️ **RATE UPDATE** - Reward rate adjusted

### NFT Events
- 🎖️ **ACHIEVEMENT MINT** - New achievement NFT created
- 🎖️ **ACHIEVEMENT TRANSFER** - NFT transferred between accounts

**Example Output:**
```
[11:57:32 AM] ✅ APPROVAL: 0x44497b9f... approved 0xf51be12a... for 1000 ONBT
[11:57:33 AM] 📌 STAKE: 0x1234567a... staked 1000 ONBT
[11:57:45 AM] 🏆 REWARDS CLAIMED: 0x1234567a... claimed 50 ONBT
[11:57:56 AM] 🎖️ ACHIEVEMENT MINT: Token #1 minted to 0x1234567a...
[11:58:02 AM] ↔️ TRANSFER: 100 ONBT (0x44497b9f... → 0xabcdef12...)
```

**Log File:** `event-monitor-log.json` (JSON array of events on exit)

**Log Entry Format:**
```json
{
  "timestamp": "2026-02-21T11:57:32.123Z",
  "type": "Token Transfer",
  "data": {
    "user": "0x1234567890123456789012345678901234567890",
    "amount": "1000",
    "tokenId": "N/A"
  }
}
```

---

## 4. Achievement NFT Config Status

**Purpose:** Quick check of whether achievement NFTs are properly configured.

**Usage:**
```bash
node scripts/check-achievement-config-status.mjs
```

**Output:**
```
BASE       ✅ CONFIGURED
  Staking:  0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe
  Expected: 0x11EEEB62b2b2B66475642f82502989D671fC5855
  Actual:   0x11EEEB62b2b2B66475642f82502989D671fC5855

ARBITRUM   ✅ CONFIGURED
  Staking:  0x4E8cF6632fdFD031019c748B041e1c2dC447fa44
  Expected: 0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb
  Actual:   0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb

✅ SUCCESS: Both networks properly configured!
```

---

## Configuration

### Environment Variables

All tools read from `.env`:

```bash
# Alchemy RPC URLs (required)
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY

# Optional
REPORT_GAS=true
```

### RPC Configuration

Scripts automatically use Alchemy RPC if `BASE_RPC_URL` and `ARBITRUM_RPC_URL` are set. If not found in `.env`, falls back to public RPCs (slower).

**To use Alchemy:**
1. Get API keys from [alchemy.com](https://alchemy.com)
2. Add to `.env`:
   ```
   BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
   ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
   ```
3. Scripts automatically detect and use them

---

## Output Files

### health-check.json (if --save used)
```json
{
  "timestamp": "2026-02-21T11:57:02.161Z",
  "summary": {
    "total": 12,
    "passed": 12,
    "warned": 0,
    "failed": 0
  },
  "checks": [
    {
      "timestamp": "2026-02-21T11:57:02.161Z",
      "name": "base: RPC Connected",
      "status": "pass",
      "detail": "Block #42442837"
    }
  ]
}
```

### event-monitor-log.json
```json
[
  {
    "timestamp": "2026-02-21T11:57:32.123Z",
    "type": "Token Transfer",
    "data": {
      "user": "0x...",
      "amount": "100",
      "tokenId": "N/A"
    }
  }
]
```

---

## Daily Operations

### Morning Check
```bash
# 1. System health
node scripts/health-check.mjs

# 2. Contract wiring
node scripts/quick-integration-check.mjs

# 3. NFT config
node scripts/check-achievement-config-status.mjs
```

**Expected Result:** All passing

**If Any Fail:**
1. Check RPC connectivity
2. Verify .env has correct Alchemy keys
3. Review DEPLOYMENT-STATUS.md for contract addresses
4. Check block explorers (basescan.io, arbiscan.io)

### Weekly Operations
```bash
# Full health report with save
node scripts/health-check.mjs --save

# Archive report
mv health-check.json reports/health-check-$(date +%Y%m%d).json
```

### Event Monitoring
```bash
# Start monitoring before marketing campaign/major transaction
node scripts/event-monitor.mjs

# Monitor runs in background until Ctrl+C
# On exit: Creates event-monitor-log.json

# Archive log
mv event-monitor-log.json reports/events-$(date +%Y%m%d-%H%M%S).json
```

---

## Troubleshooting

### "RPC endpoint not responding"
**Solution:**
1. Verify `.env` has valid Alchemy keys
2. Check Alchemy dashboard for rate limit issues
3. Try alternative RPC (temporarily change .env):
   ```
   BASE_RPC_URL=https://base.blockscout.com
   ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
   ```

### "Contract not responsive"
**Solution:**
1. Verify contract address in deployment JSON
2. Check if contract was deployed on this network
3. Review block explorer for recent activity
4. Confirm network in RPC URL is correct

### "Cannot read mint counters" or wiring warning
This is **not expected** with the current health-check script and deployment set.

**To fix:**
1. Pull latest changes and rerun health check.
2. Confirm deployment JSON files are the latest stakingfix files.
3. Confirm RPC URLs point to correct production networks.

**Verification command:**
```bash
node scripts/health-check.mjs --save
```

### "Health check passes but integration test fails"
**Solution:**
1. Health check validates basic connectivity
2. Integration test validates cross-contract wiring
3. Review CONTRACT-VALIDATION-RESULTS.md
4. Check if recent deployment changed addresses

---

## Best Practices

1. **Run daily health check** - catches issues early
2. **Archive weekly reports** - track system health over time
3. **Monitor during deployments** - real-time event visibility
4. **Set up alerts** - parse JSON output for automated monitoring
5. **Document issues** - save logs when problems occur

---

## Performance Metrics

| Tool | Alchemy Speed | Public RPC Speed | Improvement |
|------|---------------|------------------|------------|
| `health-check.mjs` | ~10s | ~25s | 2.5x faster |
| `quick-integration-check.mjs` | ~8s | ~20s | 2.5x faster |
| `check-achievement-config-status.mjs` | ~4s | ~10s | 2.5x faster |

**Recommendation:** Always use Alchemy RPC for production monitoring.

---

## Support

- **Monitoring Issues:** Check that RPC URLs are valid in `.env`
- **Alchemy Support:** https://www.alchemy.com/contact/support
- **Network Issues:** Check https://status.alchemy.com
- **Contract Issues:** Review contract addresses in deployment JSON

---

**Last Tested:** March 4, 2026  
**RPC Provider:** Alchemy (Production)  
**Status:** ✅ All tools operational
