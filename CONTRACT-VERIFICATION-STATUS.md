# ONBT Live Contract Verification Status & Guide

**Last Updated:** 2026-03-05  
**Status:** ✅ **VERIFIED** - All live contracts verified on BaseScan and Arbiscan  
**Total Contracts:** 26 (13 per chain × 2 chains)

---

## Current Verification Result (Authoritative)

Verification status was re-checked using Etherscan V2 API (`chainid` + API key) from `scripts/check-verification-status.mjs`.

| Network | Verified | Total |
|---------|----------|-------|
| Base | 13 | 13 |
| Arbitrum | 13 | 13 |
| **Combined** | **26** | **26** |

All listed live contracts currently return verified source code metadata (`v0.8.22+commit.4fc1097e`).

---

## Historical Notes

The remaining sections in this file are retained as historical troubleshooting guidance from an earlier period when verification status checks were using deprecated explorer endpoints and could report false negatives.

---

## 📊 Quick Status Summary

| Metric | Count |
|--------|-------|
| **Total Live Contracts** | 26 |
| **Base Contracts** | 13 |
| **Arbitrum Contracts** | 13  |
| **Currently Verified** | 26 |
| **Pending Verification** | 0 |

---

## 🔗 Base Chain (8453) - Unverified Contracts

All 13 contracts below are deployed and operational on Base but not yet verified. Use the links below to manually verify each contract if automated processes fail.

### Core Token Contract
1. **OmnichainNabatOFT**
   - Address: `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5`
   - Explorer: https://basescan.org/address/0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
   - Manual Verify: https://basescan.org/verifyContract?a=0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
   - Source: `contracts/token/OmnichainNabatOFT.sol`

### Treasury & Rewards
2. **ONBTOmnichainVault**
   - Address: `0xFd06Ecbd22b208f398E4d822904F7114642eF9b9`
   - Explorer: https://basescan.org/address/0xFd06Ecbd22b208f398E4d822904F7114642eF9b9
   - Manual Verify: https://basescan.org/verifyContract?a=0xFd06Ecbd22b208f398E4d822904F7114642eF9b9

3. **ONBTRewardsPool**
   - Address: `0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85`
   - Explorer: https://basescan.org/address/0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85
   - Manual Verify: https://basescan.org/verifyContract?a=0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85

### DeFi Core
4. **ONBTYieldDistributor**
   - Address: `0x8c91384EbF767C1C434d127c82020380F4A8afC7`
   - Explorer: https://basescan.org/address/0x8c91384EbF767C1C434d127c82020380F4A8afC7
   - Manual Verify: https://basescan.org/verifyContract?a=0x8c91384EbF767C1C434d127c82020380F4A8afC7

5. **ONBTAchievementNFT**
   - Address: `0x11EEEB62b2b2B66475642f82502989D671fC5855`
   - Explorer: https://basescan.org/address/0x11EEEB62b2b2B66475642f82502989D671fC5855
   - Manual Verify: https://basescan.org/verifyContract?a=0x11EEEB62b2b2B66475642f82502989D671fC5855

6. **ONBTOmnichainStaking**
   - Address: `0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe`
   - Explorer: https://basescan.org/address/0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe
   - Manual Verify: https://basescan.org/verifyContract?a=0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe

7. **ONBTStakingRouter**
   - Address: `0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B`
   - Explorer: https://basescan.org/address/0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B
   - Manual Verify: https://basescan.org/verifyContract?a=0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B

8. **ONBTGovernor**
   - Address: `0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9`
   - Explorer: https://basescan.org/address/0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9
   - Manual Verify: https://basescan.org/verifyContract?a=0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9

### Liquidity & Risk Management
9. **ONBTLiquidityManager**
   - Address: `0xb362Af3da1497A551C08F79bC03CbA12D2b7e908`
   - Explorer: https://basescan.org/address/0xb362Af3da1497A551C08F79bC03CbA12D2b7e908
   - Manual Verify: https://basescan.org/verifyContract?a=0xb362Af3da1497A551C08F79bC03CbA12D2b7e908

10. **ONBTInsuranceFund**
    - Address: `0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE`
    - Explorer: https://basescan.org/address/0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE
    - Manual Verify: https://basescan.org/verifyContract?a=0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE

11. **ONBTStabilizer**
    - Address: `0x26D75024c2491636a1A1145a3d6966788EF54667`
    - Explorer: https://basescan.org/address/0x26D75024c2491636a1A1145a3d6966788EF54667
    - Manual Verify: https://basescan.org/verifyContract?a=0x26D75024c2491636a1A1145a3d6966788EF54667

### Revenue & Incentives
12. **ONBTIncentiveController**
    - Address: `0x7b06795D31482fef0213b24E8ad5f348692A73BD`
    - Explorer: https://basescan.org/address/0x7b06795D31482fef0213b24E8ad5f348692A73BD
    - Manual Verify: https://basescan.org/verifyContract?a=0x7b06795D31482fef0213b24E8ad5f348692A73BD

13. **ONBTRevenueRouter**
    - Address: `0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0`
    - Explorer: https://basescan.org/address/0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0
    - Manual Verify: https://basescan.org/verifyContract?a=0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0

---

## 🔗 Arbitrum Chain (42161) - Unverified Contracts

All 13 contracts are also deployed on Arbitrum and require verification.

### Core Token Contract
1. **OmnichainNabatOFT**
   - Address: `0x169aC761Ebb210B5A93B68B44DA394776a7B230C`
   - Explorer: https://arbiscan.io/address/0x169aC761Ebb210B5A93B68B44DA394776a7B230C
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x169aC761Ebb210B5A93B68B44DA394776a7B230C

### Treasury & Rewards
2. **ONBTOmnichainVault**
   - Address: `0x85fE97c69350Be8B9A6bC026006907E34324CD6A`
   - Explorer: https://arbiscan.io/address/0x85fE97c69350Be8B9A6bC026006907E34324CD6A
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x85fE97c69350Be8B9A6bC026006907E34324CD6A

3. **ONBTRewardsPool**
   - Address: `0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1`
   - Explorer: https://arbiscan.io/address/0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1

### DeFi Core
4. **ONBTYieldDistributor**
   - Address: `0x2085ca5081480e8634eF4295ef477fe8cE97B892`
   - Explorer: https://arbiscan.io/address/0x2085ca5081480e8634eF4295ef477fe8cE97B892
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x2085ca5081480e8634eF4295ef477fe8cE97B892

5. **ONBTAchievementNFT**
   - Address: `0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb`
   - Explorer: https://arbiscan.io/address/0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb
   - Manual Verify: https://arbiscan.io/verifyContract?a=0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb

6. **ONBTOmnichainStaking**
   - Address: `0x4E8cF6632fdFD031019c748B041e1c2dC447fa44`
   - Explorer: https://arbiscan.io/address/0x4E8cF6632fdFD031019c748B041e1c2dC447fa44
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x4E8cF6632fdFD031019c748B041e1c2dC447fa44

7. **ONBTStakingRouter**
   - Address: `0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64`
   - Explorer: https://arbiscan.io/address/0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64
   - Manual Verify: https://arbiscan.io/verifyContract?a=0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64

8. **ONBTGovernor**
   - Address: `0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854`
   - Explorer: https://arbiscan.io/address/0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854

### Liquidity & Risk Management
9. **ONBTLiquidityManager**
   - Address: `0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3`
   - Explorer: https://arbiscan.io/address/0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3
   - Manual Verify: https://arbiscan.io/verifyContract?a=0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3

10. **ONBTInsuranceFund**
    - Address: `0x85BB4B6268446a71110db6f296885AA1EE36c695`
    - Explorer: https://arbiscan.io/address/0x85BB4B6268446a71110db6f296885AA1EE36c695
    - Manual Verify: https://arbiscan.io/verifyContract?a=0x85BB4B6268446a71110db6f296885AA1EE36c695

11. **ONBTStabilizer**
    - Address: `0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587`
    - Explorer: https://arbiscan.io/address/0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587
    - Manual Verify: https://arbiscan.io/verifyContract?a=0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587

### Revenue & Incentives
12. **ONBTIncentiveController**
    - Address: `0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50`
    - Explorer: https://arbiscan.io/address/0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50
    - Manual Verify: https://arbiscan.io/verifyContract?a=0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50

13. **ONBTRevenueRouter**
    - Address: `0xa66CA14df740B142d8E2DE515A8743ad1eE25850`
    - Explorer: https://arbiscan.io/address/0xa66CA14df740B142d8E2DE515A8743ad1eE25850
    - Manual Verify: https://arbiscan.io/verifyContract?a=0xa66CA14df740B142d8E2DE515A8743ad1eE25850

---

## 🛠️ Verification Automation

### Available Scripts

All verification scripts are located in `scripts/`:

1. **check-verification-status.mjs** - Non-invasive status check
   ```bash
   node scripts/check-verification-status.mjs
   ```
   Shows which contracts are currently verified on each chain.

2. **batch-verify-contracts.mjs** - Hardhat batch verification
   ```bash
   node scripts/batch-verify-contracts.mjs
   ```
   Attempts to verify all contracts using Hardhat (requires constructor args).

3. **verify-live-contracts-direct.mjs** - Direct Etherscan API
   ```bash
   node scripts/verify-live-contracts-direct.mjs
   ```
   Submits verification directly to Etherscan API.

### Hardhat Verification (Single Contract)

```bash
npx hardhat --config hardhat-verify.config.cjs --network base verify \
  --contract contracts/token/OmnichainNabatOFT.sol:OmnichainNabatOFT \
  --constructor-args deploy/verify-args-onbt-base.cjs \
  0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
```

---

## 📋 Manual Verification Instructions

### For Basescan

1. Navigate to: https://basescan.org/verifyContract?a=0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5 (replace address)
2. Fill in contract details:
   - **Contract Address**: Address from table above
   - **Contract Name**: Contract name from table (e.g., "OmnichainNabatOFT")
   - **Compiler Version**: v0.8.22+commit.4fc1097e
   - **Optimization**: Enabled (200 runs)
   - **Source Code**: Copy from `contracts/` directory
3. Submit and wait for verification (typically 5-30 seconds)

### For Arbiscan

Same process as Basescan but use Arbiscan URLs:
- https://arbiscan.io/verifyContract?a=0x169aC761Ebb210B5A93B68B44DA394776a7B230C (replace address)

---

## 🔍 Verification Status Tracking

Run verification status check periodically to monitor progress:

```bash
node scripts/check-verification-status.mjs > verification-status-$(date +%s).txt
```

This creates a timestamped status report showing:
- ✅ Verified contracts
- ❌ Unverified contracts
- Direct links to each contract on the explorer

---

## 📝 Next Steps

1. **Immediate**: Manually verify OFT contracts (most critical)
2. **Short-term**: Complete automated verification for remaining 24 contracts
3. **Monitoring**: Check status weekly to ensure permanent verification
4. **Documentation**: Update [THE_OMNICHAIN_NABAT_ECOSYSTEM.md](docs/whitepapers/THE_OMNICHAIN_NABAT_ECOSYSTEM.md) with verification status

---

## 🚨 Important Notes

- Verification submissions may take **24-48 hours** to process
- Each contract requires **specific constructor arguments** for verification
- **Sourcify** can also be used as an alternative verification service
- **Blockscout** and **Routescan** support alternative verification paths

---

**Last Updated:** February 20, 2026  
**Status:** Verification submissions in progress  
**Contact:** Engineering Team
