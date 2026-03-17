# ONBT System Architecture & Operations Guide (Feb 23, 2026)

## System Overview

ONBT is a LayerZero-enabled omnichain token ecosystem with Uniswap V3 pool liquidity management across Base and Arbitrum. The system is composed of:

1. **Token Layer** — Omnichain OFT (OmnichainNabatOFT) with governance
2. **Pool Management Layer** — ONBTPoolManager coordinating liquidity across chains
3. **Synchronization Layer** — LayerZero messaging for cross-chain state sync
4. **Operations Layer** — Worker-optimized deployment, verification, and monitoring scripts

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                       │
│  (Swap UI, Governance Portal, Liquidity Dashboard)     │
└────────────┬────────────────────────────────┬──────────┘
             │                                │
    ┌────────▼────────┐            ┌─────────▼────────┐
    │  BASE CHAIN     │            │ ARBITRUM CHAIN  │
    │  (8453)         │            │ (42161)         │
    ├─────────────────┤            ├─────────────────┤
    │ ONBTToken OFT   │            │ ONBTToken OFT   │
    │ ONBTPoolManager │◄───────────►│ ONBTPoolManager │
    │ ONBTGovernor    │  LayerZero  │ ONBTGovernor    │
    │ Uniswap V3      │  Messaging  │ Uniswap V3      │
    └─────────────────┘            └─────────────────┘
         │                                │
         │  Peer Config                  │
         └────────────────────────────────┘
```

---

## Core Components

### 1. ONBTToken (OftERC20)
**Location**: [contracts/token/OmnichainNabatOFT.sol](contracts/token/OmnichainNabatOFT.sol)

**Purpose**: 
- Immutable omnichain fungible token (1B total supply)
- Hub chain (Base) mints full supply; other chains receive via LayerZero bridge transfers
- Built on OpenZeppelin ERC20 + LayerZero OFT standard

**Key Operations**:
```solidity
// Bridge transfer (omnichain)
ONBT.sendFrom(msg.sender, dstEid, recipient, amount)

// Approve for pool operations
ONBT.approve(poolManager, amount)
```

### 2. ONBTPoolManager
**Location**: [contracts/defi/ONBTPoolManager.sol](contracts/defi/ONBTPoolManager.sol)

**Purpose**:
- Custom Uniswap V3 pool coordinator
- Manages liquidity allocation across chains
- Facilitates cross-chain pool sync via LayerZero
- Collects fees and distributes to treasury/rewards

**Key Functions**:
```solidity
// Pool registration
registerPool(poolId, token0, token1, fee, chainEid, allocation)

// Liquidity operations
allocateLiquidity(poolId, chainEid, amount)
addLiquidityPosition(poolId, amount0, amount1, tickLower, tickUpper)
removeLiquidityPosition(poolId, tokenId, liquidity)

// Cross-chain sync
syncPoolToPeer(poolId, dstEid)
registerCrossChainPool(poolId, dstEid, peerPoolAddress)

// Fee distribution
distributeFees(token)
```

**Data Structures**:
```solidity
struct PoolInfo {
    bytes32 poolId;
    address token0;
    address token1;
    uint24 fee;
    uint256 initialLiquidity;
    bool isActive;
}

struct CrossChainPoolSync {
    bytes32 poolId;
    uint32 srcEid;
    uint256 liquidity;
    uint256 swapVolume;
    uint256 feesCollected;
}
```

### 3. LayerZero OApp Integration
**LZ Endpoint**: `0x1a44076050125825900e736c501f859c50fE728c` (both chains)

**Purpose**:
- Enables omnichain messaging between pool managers
- Peer configuration for trusted cross-chain communication
- Transaction fee in native gas token

**Flow**:
1. Pool state change on Source chain
2. Pool Manager encodes payload (PoolSync struct)
3. `_lzSend()` via LayerZero endpoint with messaging fee
4. Peer Pool Manager on Destination receives via `_lzReceive()`
5. Events emitted: `CrossChainSyncInitiated` (src) + `CrossChainSyncReceived` (dst)

---

## Worker Memory Optimization

### Problem Statement
Memory-intensive operations like contract verification, large deployment scripts, and cross-chain event scanning could exceed available Node heap, causing OOM kills. Standard Node default (max ~1.4GB) is tight in constrained CI/worker environments.

### Solution: Centralized Worker Runner
**File**: [scripts/worker-runner.cjs](scripts/worker-runner.cjs)

**Design**:
- Single entry point for all worker-memory management
- Per-command `--mem=<MB>` override
- Global fallback via `WORKER_MAX_OLD_SPACE_SIZE` env var
- Injects `NODE_OPTIONS` before spawning child process

**Implementation**:
```javascript
const maxOldSpaceSize = commandLineMemOverride || envMemOverride || defaultMem ('1536');
env.NODE_OPTIONS = `--max-old-space-size=${maxOldSpaceSize}`;
spawn(command, args, { env, shell: true, stdio: 'inherit' });
```

### Memory Allocation Strategy

| Operation | Base Heap | Rationale |
|-----------|-----------|-----------|
| **Compile** | 2GB | Solidity AST parsing + codegen |
| **Tests** | 3GB | Test fixtures + artifacts in memory |
| **Deploy Scripts** | 1.5–2GB | ABI encoding, RPC calls, tx signing |
| **Verification** | 1–1.5GB | Explorer API calls, contract sources |
| **Pool Status Checks** | 512MB | Light RPC queries, event filtering |

### Usage

#### Pre-configured Scripts
```bash
npm run compile:worker              # 2GB
npm run deploy:v3:pools:base:worker # 2GB
npm run verify:pool-manager:worker  # 1GB
```

#### Generic Worker Launcher
```bash
# Use default 1.5GB
npm run worker:env -- npx hardhat compile

# Override to 4GB for heavy deployment
npm run worker:env -- --mem=4096 npx hardhat run deploy/deploy-v3-pools.js

# Set global env variable
export WORKER_MAX_OLD_SPACE_SIZE=2048
npm run worker:env -- npm run deploy:base:hub:worker
```

#### Direct Node Invocation (No npm)
```bash
node --max-old-space-size=2048 deploy/deploy-v3-pools.js
```

---

## Cross-Chain Pool Sync Workflow

### Setup Phase (One-time)
1. **Register Pool on Both Chains**:
   ```bash
   npm run register:pool-manager:pool:base
   npm run register:pool-manager:pool:arbitrum
   ```
   - Stores pool info (token0, token1, fee, allocation) locally
   - Initializes pool state mappings

2. **Configure Peers**:
   ```bash
   npm run configure:pool-manager:peers:base
   npm run configure:pool-manager:peers:arbitrum
   ```
   - Sets LayerZero peer addresses for each pool
   - Establishes trusted bidirectional channel

### Operational Phase (Ongoing)
3. **Deposit Liquidity**:
   ```solidity
   poolManager.depositLiquidity(poolId, amount)
   ```
   - Transfers ONBT from deployer to pool manager contract

4. **Create Liquidity Position** (optional, if using custom positions):
   ```solidity
   poolManager.addLiquidityPosition(poolId, amount0, amount1, tickLower, tickUpper)
   ```
   - Mints NFT position in Uniswap V3
   - Tracks position ID per pool

5. **Sync Pool State to Peer**:
   ```bash
   npm run sync:pool-manager:base    # Sync from Base → Arbitrum
   npm run sync:pool-manager:arbitrum # Sync from Arbitrum → Base
   ```
   - Encodes pool liquidity + fees into CrossChainPoolSync payload
   - Queries LayerZero for messaging fee
   - Sends via `_lzSend()` with fee in tx value
   - Receives event: `CrossChainSyncInitiated`

6. **Monitor Sync Status**:
   ```bash
   npm run sync:pool-manager:status:worker
   ```
   - Scans both chains for `CrossChainSyncInitiated` and `CrossChainSyncReceived` events
   - Uses chunked RPC queries (10-block windows) to respect free-tier limits
   - Reports initiated/received counts and transaction hashes

### Event Confirmation (Feb 22, 2026)
```
=== ARBITRUM 434810700-434810900 ===
initiated=2 received=1
  INIT block=434810715 tx=0xdd84ce... dstEid=30184 fee=98515377461372
  INIT block=434810802 tx=0x1e888c8... dstEid=30184 fee=98515377461372
  RECV block=434810737 tx=0xb98bc7e... srcEid=30184 liq=0 vol=0
```
✅ Bidirectional messaging confirmed operational.

---

## Deployment Runbook

### Prerequisites
```bash
# Node 20.19.0+
node --version

# Install dependencies
npm install

# Configure .env
cp .env.example .env
# Edit .env with:
# - PRIVATE_KEY (signer)
# - BASE_RPC_URL, ARBITRUM_RPC_URL (Alchemy/Infura)
# - ROUTESCAN_API_KEY for verification
```

### Step 1: Compile Contracts
```bash
npm run compile:worker
```
Output: Build artifacts in `artifacts/` and cache in `cache/`

### Step 2: Verify Existing Deployments
```bash
npm run verify:pool-manager:worker
```
Output: Confirmation of verified contracts on Routescan/Blockscout

### Step 3: Create USDT Pools (Optional)
```bash
npm run create:usdt:pools:worker
```
- Creates ONBT/USDT Uniswap v3 pools on both chains
- Initializes with 25 USDT + 100K ONBT per chain
- Registers in ONBTPoolManager
- Outputs pool IDs for `.env` update

### Step 4: Configure Pool Manager Peers
```bash
npm run configure:pool-manager:peers:base
npm run configure:pool-manager:peers:arbitrum
```
- Sets trusted peer addresses
- Establishes peer pool mappings

### Step 5: Register Pools
```bash
npm run register:pool-manager:pool:base
npm run register:pool-manager:pool:arbitrum
```
- Registers ONBT/WETH and/or ONBT/USDT pools
- Allocates TVL caps per pool

### Step 6: Sync Pools
```bash
npm run sync:pool-manager:base
npm run sync:pool-manager:arbitrum
```
- Broadcasts pool state to peer chains
- Triggers LayerZero messaging

### Step 7: Verify Sync
```bash
npm run sync:pool-manager:status:worker
```
- Checks for `CrossChainSyncInitiated` and `CrossChainSyncReceived` events
- Reports transaction hashes and block numbers

---

## RPC & Rate Limit Handling

### Alchemy Free-Tier Constraints
- **eth_getLogs**: Limited to 10-block range per query
- **Solution**: Chunked scanning in [scripts/check-pool-manager-sync-status.js](scripts/check-pool-manager-sync-status.js)

```javascript
for (let s = fromBlock; s <= toBlock; s += 10) {
  const e = Math.min(toBlock, s + 9);
  const logs = await provider.getLogs({
    address: manager,
    topics: [eventTopic, poolId],
    fromBlock: s,
    toBlock: e
  });
  results.push(...logs);
}
```

### Polling Interval
- Default: 2000ms between block checks
- Adjust in [hardhat.config.cjs](hardhat.config.cjs) per network if needed

---

## Error Recovery

### Out of Memory During Deploy
```bash
# Increase heap to 4GB and retry
npm run worker:env -- --mem=4096 npm run deploy:v3:pools:base:worker
```

### LayerZero Peer Not Configured
```bash
# Verify peer setup
npx hardhat run scripts/check-oft-config.mjs --network base
# If missing, run configure:pool-manager:peers again
```

### RPC Rate Limit Hit
```bash
# Use narrow block range
node -e "
  const from = 434810790, to = 434810850;
  // Scan with 10-block chunks
  for (let s = from; s <= to; s += 10) { ... }
"
```

---

## Performance Tuning

### Memory Profiling
```bash
npm run worker:env -- --mem=1024 node --expose-gc scripts/check-pool-manager-sync-status.js
```
Enable GC logs to track memory usage.

### Compilation Speed
Current settings in [hardhat.config.cjs](hardhat.config.cjs):
```javascript
optimizer: {
  enabled: true,
  runs: 1,     // Single run (deployment-optimized, not production)
},
viaIR: true,   // IR-based compilation for complex contracts
```

### Deployment Gas Estimation
```bash
REPORT_GAS=true npm run deploy:v3:pools:base:worker
```
Generates gas report for all transactions.

---

## Monitoring & Alerts

### Pool Health Checks
```bash
# Weekly sync status verification
npm run sync:pool-manager:status:worker

# Check fee accumulation
npm run fees:distribute:base
```

### Cross-Chain Latency
- Monitor block times on each chain
- Expected sync time: 5–15 minutes (LayerZero execution)
- Check executor status on LayerZero docs if delayed

### Contract Upgradability
- ONBTToken: Immutable (no proxy)
- ONBTPoolManager: Immutable (no proxy)
- ONBTGovernor: Immutable (no proxy)
- **Workaround**: Deploy new contract version and migrate state

---

## Security Considerations

### Private Key Management
- **NEVER** commit `.env` with `PRIVATE_KEY` to git
- Use CI/CD secrets for automated deployments
- Rotate key periodically for new deployments

### LayerZero Message Verification
- All messages verified via peer registration
- Unauthorized peers rejected in `_lzReceive()`
- Check peer address before executing sync

### Pool Manager Access Control
- All state-changing functions `onlyOwner`
- Owner = deployment account (typically multi-sig in production)
- Consider governance token voting for future upgrades

---

## Troubleshooting Matrix

| Issue | Symptom | Resolution |
|-------|---------|------------|
| Memory exhausted | OOM during `npm run deploy:*` | Increase `--mem=` to 4096+ |
| RPC timeout | "execution reverted" or "SERVER_ERROR" | Increase `timeout` in hardhat.config or retry |
| Peer not found | LayerZero message fails | Run `configure:pool-manager:peers` again |
| Pool not visible on DEX | Standard Uniswap UI shows 0 liquidity | Ensure pool created via factory and has >0 liquidity |
| Sync event missing | Status check returns 0 received events | Check block window range, try wider window |

---

## References

- [LayerZero V2 Documentation](https://docs.layerzero.network)
- [Uniswap V3 Smart Contracts](https://github.com/Uniswap/v3-core)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com)
- [Hardhat Documentation](https://hardhat.org)

---

**Document Version**: 1.0  
**Last Updated**: February 23, 2026  
**Maintained By**: ONBT Development Team
