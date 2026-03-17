# ONBT Deployment Status (Feb 23, 2026)

## Overview
ONBT ecosystem fully deployed across Base and Arbitrum with LayerZero-enabled pool management, cross-chain synchronization, and memory-optimized worker infrastructure.

---

## Contract Deployments

### Base (Chain ID: 8453)
| Contract | Address | Status | Verified |
|----------|---------|--------|----------|
| **ONBTToken (OFT)** | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` | ✅ Deployed | ✅ Routescan |
| **ONBTPoolManager** | `0xf2515AAA691d6d1dd54a8d78db879646e8FD90C8` | ✅ Deployed | ✅ Routescan |
| **ONBTGovernor** | (Deployment via governance contract stack) | ✅ Deployed | ✅ Routescan |
| **LayerZero Endpoint** | `0x1a44076050125825900e736c501f859c50fE728c` | ✅ Active | N/A (OFT) |
| **Uniswap V3 Router** | `0x2626664c2603336E57B271c5C0b26F421741e481` | ✅ Active | N/A |
| **Uniswap V3 Position Manager** | `0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7` | ✅ Active | N/A |

### Arbitrum (Chain ID: 42161)
| Contract | Address | Status | Verified |
|----------|---------|--------|----------|
| **ONBTToken (OFT)** | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` | ✅ Deployed | ✅ Routescan |
| **ONBTPoolManager** | `0x85C5484460f7670Fe32cb598dC52221806d54d2B` | ✅ Deployed | ✅ Routescan |
| **ONBTGovernor** | (Deployment via governance contract stack) | ✅ Deployed | ✅ Routescan |
| **LayerZero Endpoint** | `0x1a44076050125825900e736c501f859c50fE728c` | ✅ Active | N/A (OFT) |
| **Uniswap V3 Router** | `0xE592427A0AEce92De3Edee1F18E0157C05861564` | ✅ Active | N/A |
| **Uniswap V3 Position Manager** | `0xc36442b4a4522E871399CD717AbDD847aB11218F` | ✅ Active | N/A |

---

## Pool Manager Configuration

### ONBT/WETH Pool (Initial Setup)
- **Pool ID**: `0x71758bdc403386abfdfcb212f36935e79e8a09c66001178b13cdc0f59addba4e`
- **Token0 (Base)**: ONBT `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5`
- **Token1 (Base)**: WETH `0x4200000000000000000000000000000000000006`
- **Token0 (Arbitrum)**: ONBT `0x169aC761Ebb210B5A93B68B44DA394776a7B230C`
- **Token1 (Arbitrum)**: WETH `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1`
- **Fee Tier**: 3000 basis points (0.30%)
- **Status**: ✅ Registered on both chains, peers configured, cross-chain sync validated

### ONBT/USDT Pools (Preparation)
- **Pool Creation Script**: `deploy/create-onbt-usdt-pools.js`
- **Initial Liquidity**: 25 USDT + 100,000 ONBT per chain
- **USDT Addresses**:
  - Base: `0xfde4C96c8593536E31F26E8989180B6098C8e32F` (Bridged USDT)
  - Arbitrum: `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` (Native USDT)
- **Status**: ⏳ Ready to deploy (use `npm run create:usdt:pools` or `:worker` variant)

---

## Cross-Chain Synchronization

### LayerZero Configuration
- **LZ Endpoint (both chains)**: `0x1a44076050125825900e736c501f859c50fE728c`
- **Base → Arbitrum Peer**: Configured and active
  - Base EID: `30110`
  - Arbitrum EID: `30184`
- **Arbitrum → Base Peer**: Configured and active

### Sync Validation (Feb 22, 2026)
**Cross-Chain Sync Events Confirmed:**
- **Arbitrum Block Window**: 434810700–434810900
  - **Initiated Events**: 2
    - Block 434810715: `0xdd84ce67599ed73f43fb0561fc1ec3c03582a7dca1274f6a2521924d0bbfb57b`
    - Block 434810802: `0x1e888c86ae59a5ca33e631dfca483ed1c1f05ddbccdc7807140596b041266ca5`
  - **Received Events**: 1
    - Block 434810737: `0xb98bc7e05351bfe7f50ac2edbc09d3c840390306c8e7467ff4a3b8f306160a91`
- **Status**: ✅ Bidirectional cross-chain messaging operational

---

## Memory Optimization & Worker Setup

### Worker Scripts Available
All memory-intensive operations (compilation, deployment, verification) now have optimized worker variants with capped heap sizes.

#### Compile & Test
```bash
npm run compile:worker        # 2GB heap
npm run test:worker           # 3GB heap
```

#### Deploy Operations
```bash
npm run deploy:base:hub:worker                    # 1.5GB heap
npm run deploy:v3:pools:base:worker               # 2GB heap
npm run deploy:v3:pools:arbitrum:worker           # 2GB heap
npm run create:usdt:pools:worker                  # 1GB heap
```

#### Verification Operations
```bash
npm run verify:contracts:worker                   # 1GB heap
npm run verify:hardhat:routescan:worker           # 1.5GB heap
npm run verify:pool-manager:worker                # 1GB heap
npm run verify:basescan:worker                    # 1GB heap
npm run verify:routescan:worker                   # 1GB heap
```

#### Generic Worker Runner
```bash
npm run worker:env -- --mem=<MB> <command>
# Example: npm run worker:env -- --mem=2048 npx hardhat compile
```

### Memory Management
- **Default Heap**: 1536MB (configurable via `WORKER_MAX_OLD_SPACE_SIZE` env var)
- **Override**: `--mem=<MB>` per command (e.g., `--mem=4096`)
- **Location**: [scripts/worker-runner.cjs](scripts/worker-runner.cjs)

---

## Key Operational Scripts

### Pool Manager Operations
```bash
# Register ONBT/USDT pools (requires running create-onbt-usdt-pools first)
npm run register:pool-manager:pool:base
npm run register:pool-manager:pool:arbitrum

# Configure cross-chain peers
npm run configure:pool-manager:peers:base
npm run configure:pool-manager:peers:arbitrum

# Sync pool state to peer chain
npm run sync:pool-manager:base
npm run sync:pool-manager:arbitrum

# Check sync status
npm run sync:pool-manager:status:worker
```

### Verification Operations
```bash
# Verify pool manager on Routescan
npm run verify:pool-manager:worker

# Verify all contracts
npm run verify:contracts:worker

# Verify on specific block explorer
npm run verify:routescan:worker
npm run verify:basescan:worker
```

### Fee Distribution
```bash
npm run fees:distribute:base
npm run fees:distribute:arbitrum
```

---

## Environment Variables (.env)

### Required for Deployments
```env
# RPC URLs
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/...
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/...

# Private Key (NEVER commit)
PRIVATE_KEY=...

# Pool Manager Addresses
BASE_POOL_MANAGER_ADDRESS=0xf2515AAA691d6d1dd54a8d78db879646e8FD90C8
ARBITRUM_POOL_MANAGER_ADDRESS=0x85C5484460f7670Fe32cb598dC52221806d54d2B

# Pool Configuration
POOL_ID=0x71758bdc403386abfdfcb212f36935e79e8a09c66001178b13cdc0f59addba4e
BASE_POOL_TOKEN0=0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
BASE_POOL_TOKEN1=0x4200000000000000000000000000000000000006
ARBITRUM_POOL_TOKEN0=0x169aC761Ebb210B5A93B68B44DA394776a7B230C
ARBITRUM_POOL_TOKEN1=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
POOL_FEE=3000

# Peer Configuration
BASE_POOL_CHAIN_EID=30110
ARBITRUM_POOL_CHAIN_EID=30184
BASE_PEER_POOL_MANAGER=0x85C5484460f7670Fe32cb598dC52221806d54d2B
ARBITRUM_PEER_POOL_MANAGER=0xf2515AAA691d6d1dd54a8d78db879646e8FD90C8

# Verification
ROUTESCAN_API_KEY=...
ETHERSCAN_API_KEY=...
```

---

## Verification Status

### Contract Verification Checklist
- ✅ ONBTPoolManager (Base) — Verified on Routescan
- ✅ ONBTPoolManager (Arbitrum) — Verified on Routescan
- ✅ ONBTToken (Base) — Verified on Routescan
- ✅ ONBTToken (Arbitrum) — Verified on Routescan
- ✅ ONBTGovernor & auxiliary contracts — Verified via governance stack

### Link Verification
- **Base Pool Manager**: https://basescan.org/address/0xf2515AAA691d6d1dd54a8d78db879646e8FD90C8
- **Arbitrum Pool Manager**: https://arbiscan.io/address/0x85C5484460f7670Fe32cb598dC52221806d54d2B

---

## Next Steps

1. **USDT Pool Creation**:
   ```bash
   npm run create:usdt:pools:worker
   ```
   - Creates ONBT/USDT pools on Uniswap v3 factory (both chains)
   - Initializes with 25 USDT + 100K ONBT per chain
   - Registers pools in ONBTPoolManager

2. **Liquidity Bootstrap** (optional):
   - Add additional liquidity via `allocateLiquidity` or direct Uniswap position manager calls

3. **Frontend Integration**:
   - Update pool USDT/WETH references in swap UI
   - Configure price feeds for USDT pairs

4. **Performance Monitoring**:
   - Use worker scripts for memory-bounded operations
   - Monitor pool sync via `sync:pool-manager:status:worker`

---

## Troubleshooting

### Memory Issues
- If a deployment/verify operation runs out of memory:
  ```bash
  npm run worker:env -- --mem=4096 npm run deploy:v3:pools:base
  ```
- Or set globally: `export WORKER_MAX_OLD_SPACE_SIZE=2048` before running scripts

### Cross-Chain Sync Failures
- Check LayerZero endpoint configuration: `npx hardhat run scripts/check-oft-config.mjs`
- Verify peer addresses are set correctly in ONBTPoolManager
- Inspect event logs in 200-block windows to avoid RPC limits

### Pool Not Showing on DEX
- Standard Uniswap v3 pools will appear on DEX Screener/app.uniswap.org after pool creation
- Custom ONBTPoolManager pools require manual indexing or direct contract interaction

---

## Documentation Artifacts
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) — Overall repo layout
- [README.md](README.md) — Quick start and overview
- [hardhat.config.cjs](hardhat.config.cjs) — Network and compiler configuration
- [.env](.env) — Deployment environment variables (not committed)

---

**Last Updated**: February 23, 2026  
**Deployed By**: Automated deployment system  
**Maintenance**: Monitor cross-chain sync health and pool liquidity regularly
