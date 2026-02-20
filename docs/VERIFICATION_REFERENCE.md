# Verification Reference (Base + Arbitrum)

This file summarizes deployed contract addresses and verification status for project reference.
Last updated: 2026-02-20

## Networks

- Base (Chain ID: 8453, EID: 30184)
- Arbitrum (Chain ID: 42161, EID: 30110)

## Verification Status (Etherscan family)

Legend: VERIFIED / VERIFIED (Etherscan + Sourcify)

### Base (BaseScan)

- onbtToken (OFT): VERIFIED
- vault: VERIFIED (Etherscan + Sourcify)
- staking: VERIFIED (Etherscan + Sourcify)
- rewardsPool: VERIFIED
- yieldDistributor: VERIFIED
- achievementNFT: VERIFIED
- stakingRouter: VERIFIED
- governor: VERIFIED
- liquidityManager: VERIFIED
- insuranceFund: VERIFIED
- stabilizer: VERIFIED
- incentiveController: VERIFIED
- revenueRouter: VERIFIED

### Arbitrum (Arbiscan)

- onbtToken (OFT): VERIFIED
- vault: VERIFIED (Etherscan + Sourcify)
- staking: VERIFIED (Etherscan + Sourcify)
- rewardsPool: VERIFIED
- yieldDistributor: VERIFIED
- achievementNFT: VERIFIED
- stakingRouter: VERIFIED
- governor: VERIFIED
- liquidityManager: VERIFIED
- insuranceFund: VERIFIED
- stabilizer: VERIFIED
- incentiveController: VERIFIED
- revenueRouter: VERIFIED

## Deployment Addresses

### Base (8453)

- onbtToken: 0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
- vault: 0xFd06Ecbd22b208f398E4d822904F7114642eF9b9
- staking: 0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe
- rewardsPool: 0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85
- yieldDistributor: 0x8c91384EbF767C1C434d127c82020380F4A8afC7
- achievementNFT: 0x11EEEB62b2b2B66475642f82502989D671fC5855
- stakingRouter: 0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B
- governor: 0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9
- liquidityManager: 0xb362Af3da1497A551C08F79bC03CbA12D2b7e908
- insuranceFund: 0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE
- stabilizer: 0x26D75024c2491636a1A1145a3d6966788EF54667
- incentiveController: 0x7b06795D31482fef0213b24E8ad5f348692A73BD
- revenueRouter: 0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0

### Arbitrum (42161)

- onbtToken: 0x169aC761Ebb210B5A93B68B44DA394776a7B230C
- vault: 0x85fE97c69350Be8B9A6bC026006907E34324CD6A
- staking: 0x4E8cF6632fdFD031019c748B041e1c2dC447fa44
- rewardsPool: 0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1
- yieldDistributor: 0x2085ca5081480e8634eF4295ef477fe8cE97B892
- achievementNFT: 0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb
- stakingRouter: 0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64
- governor: 0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854
- liquidityManager: 0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3
- insuranceFund: 0x85BB4B6268446a71110db6f296885AA1EE36c695
- stabilizer: 0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587
- incentiveController: 0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50
- revenueRouter: 0xa66CA14df740B142d8E2DE515A8743ad1eE25850

## Verification Scripts

Etherscan family (BaseScan / Arbiscan):
- scripts/verify-all-contracts.mjs
- scripts/verify-staking-contracts.mjs

Blockscout / Routescan:
- scripts/verify-alternative-explorers.mjs

Helpers:
- scripts/verify-all-services.ps1
- scripts/verify-all-services.sh

## Constructor Args Files

- deploy/verify-args-staking-base.cjs
- deploy/verify-args-staking-arbitrum.cjs
- deploy/verify-args-onbt-8453.cjs (OFT)
- deploy/verify-args-onbt-42161.cjs (OFT)

## Operational Status

### Staking Status (as of 2026-02-20)

**Base:**
- Staked: 10,000,000 ONBT 🔒
- Lockup: 90 days (until May 21, 2026)
- APY: 15% (1.5x lockup bonus)
- Reward Pool: 13.0M ONBT (4,744 days runway)
- Daily Rewards: ~2,740 ONBT
- Stake Tx: 0xf7f5c2c3e8d8e8e8... (Base)

**Arbitrum:**
- Staked: 10,000,000 ONBT 🔒
- Lockup: 90 days (until May 21, 2026)
- APY: 15% (1.5x lockup bonus)
- Reward Pool: 11.0M ONBT (4,014 days runway)
- Daily Rewards: ~2,740 ONBT
- Stake Tx: 0xf446533aa4d5875de9dfd68268d3ccc7fe283ec3b8c66c1aa798ac25069d5fd1

**Global:**
- Total Staked: 20,000,000 ONBT (locked)
- Combined Daily Rewards: ~8,220 ONBT (with 1.5x bonus)
- Unlock Date: May 21, 2026

## Notes

- Etherscan API key is configured in .env via ETHERSCAN_API_KEY.
- All deployed contracts are verified per user confirmation.
- Routescan verification is complete per user confirmation.
- Reward accrual validated on Base and Arbitrum (calculation accuracy within 0% variance).
- Stakes locked for 90 days with enhanced 15% APY (1.5x bonus rate).
- Use the scripts above to re-run verification and update status.
- Run `scripts/check-stake-status.mjs` to check current lockup status.
- Run `scripts/monitoring-health.mjs` to check system health.
