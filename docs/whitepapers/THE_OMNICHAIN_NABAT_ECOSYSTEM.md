# The Omnichain Nabat Ecosystem White Paper

## Document Status

- Version: 1.1 (live-contracts-only)
- Date: 2026-03-04
- Scope: Production ecosystem on Base and Arbitrum
- Canonical source: `docs/MAINNET_DEPLOYMENT_STATUS.md`

## Executive Summary

The ONBT ecosystem is an omnichain deployment across Base (hub) and Arbitrum (spoke), coordinated through LayerZero V2 messaging. This white paper intentionally documents only contracts that are live, used, and operational in production.

Historical deployment attempts, superseded addresses, and failed deployment iterations are excluded from this document by policy.

## Production Scope Policy

- Included: contracts marked verified and operational in the final mainnet status report.
- Excluded: duplicate deployments, migration attempts, intermediate fixes, and failed deployment outputs.
- Inclusion rule: if a contract/address is not part of the active production set, it is not referenced here.

## Network Topology

- Base (chainId 8453, EID 30184): hub chain
- Arbitrum (chainId 42161, EID 30110): spoke chain
- Deployer authority: `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`

## Live Production Contracts

### Base Mainnet (Hub)

| Contract | Address | Production State |
|---|---|---|
| ONBT OFT | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` | Verified, operational |
| Vault | `0xFd06Ecbd22b208f398E4d822904F7114642eF9b9` | Verified, funded |
| RewardsPool | `0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85` | Verified, funded |
| YieldDistributor | `0x8c91384EbF767C1C434d127c82020380F4A8afC7` | Verified, configured |
| AchievementNFT | `0x11EEEB62b2b2B66475642f82502989D671fC5855` | Verified, linked |
| Staking | `0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe` | Verified, operational |
| StakingRouter | `0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B` | Verified, operational |
| Governor | `0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9` | Verified, operational |
| LiquidityManager | `0xb362Af3da1497A551C08F79bC03CbA12D2b7e908` | Wired, operational |
| InsuranceFund | `0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE` | Wired, operational |
| Stabilizer | `0x26D75024c2491636a1A1145a3d6966788EF54667` | Wired, operational |
| IncentiveController | `0x7b06795D31482fef0213b24E8ad5f348692A73BD` | Wired, operational |
| RevenueRouter | `0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0` | Wired, operational |

### Arbitrum Mainnet (Spoke)

| Contract | Address | Production State |
|---|---|---|
| ONBT OFT | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` | Verified, operational |
| Vault | `0x85fE97c69350Be8B9A6bC026006907E34324CD6A` | Verified, funded |
| RewardsPool | `0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1` | Verified, funded |
| YieldDistributor | `0x2085ca5081480e8634eF4295ef477fe8cE97B892` | Verified, configured |
| AchievementNFT | `0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb` | Verified, linked |
| Staking | `0x4E8cF6632fdFD031019c748B041e1c2dC447fa44` | Verified, operational |
| StakingRouter | `0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64` | Verified, operational |
| Governor | `0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854` | Verified, operational |
| LiquidityManager | `0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3` | Wired, operational |
| InsuranceFund | `0x85BB4B6268446a71110db6f296885AA1EE36c695` | Wired, operational |
| Stabilizer | `0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587` | Wired, operational |
| IncentiveController | `0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50` | Wired, operational |
| RevenueRouter | `0xa66CA14df740B142d8E2DE515A8743ad1eE25850` | Wired, operational |

## Active Omnichain Operations

- OFT transfers are live Base <-> Arbitrum.
- Staking and rewards are live on both chains with lock and claim flows active.
- Cross-chain peer wiring is active for the production OApp set.
- Governance and routing modules are deployed and integrated.

## Security and Integrity Controls

- Address allowlist: only the live contract set in this document is valid for production integrations.
- Deployment hygiene: reject historical deployment JSON outputs as authoritative sources.
- Verification gate: ABI and bytecode must match explorer-verified production addresses.
- Cross-chain gate: EID/peer mapping must be validated before any release.

## Integration Guidance

- Frontend and backend integrations must hardcode or config-map only the addresses listed above.
- Any address not listed in this white paper must be treated as non-production.
- When rotations occur, update this white paper and `docs/MAINNET_DEPLOYMENT_STATUS.md` in the same change set.

## Operational References

- `docs/MAINNET_DEPLOYMENT_STATUS.md`
- `DEPLOYMENT-STATUS.md`
- `MONITORING-GUIDE.md`
- `OPERATIONS-GUIDE.md`

## Conclusion

The ONBT ecosystem production footprint is defined by one live contract set per chain and excludes all failed or superseded deployment attempts. This white paper is the canonical, integration-safe reference for active ONBT ecosystem contracts.
