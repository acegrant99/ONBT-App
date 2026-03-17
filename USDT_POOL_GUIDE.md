# ONBT/USDT Pool Operations Guide

## Quick Start

### 1. Create Pools
```bash
npm run create:usdt:pools:worker
```
This script:
- Creates ONBT/USDT pools on Uniswap V3 (both Base & Arbitrum)
- Initializes with 25 USDT + 100K ONBT per chain
- Registers pools in ONBTPoolManager
- Outputs pool IDs for `.env` update

**Expected Output**:
```
======== Creating ONBT/USDT pool on Base ========
✓ Pool created at: 0x...
✓ Pool initialized
Registering in Base ONBTPoolManager...
✓ Pool registered: 0x...
Adding initial liquidity...
✓ Liquidity minted: 0x...

======== Creating ONBT/USDT pool on Arbitrum ========
[similar flow]

======== Summary ========
{
  "base": { "poolId": "0x...", "poolAddress": "0x...", ... },
  "arbitrum": { "poolId": "0x...", "poolAddress": "0x...", ... }
}

======== Add to .env ========
BASE_USDT_POOL_ID=0x...
BASE_USDT_POOL_ADDRESS=0x...
ARBITRUM_USDT_POOL_ID=0x...
ARBITRUM_USDT_POOL_ADDRESS=0x...
```

### 2. Update .env
Copy the output pool IDs and addresses to `.env`:
```env
BASE_USDT_POOL_ID=0x...
BASE_USDT_POOL_ADDRESS=0x...
BASE_USDT_POOL_TOKEN0=0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5
BASE_USDT_POOL_TOKEN1=0xfde4C96c8593536E31F26E8989180B6098C8e32F

ARBITRUM_USDT_POOL_ID=0x...
ARBITRUM_USDT_POOL_ADDRESS=0x...
ARBITRUM_USDT_POOL_TOKEN0=0x169aC761Ebb210B5A93B68B44DA394776a7B230C
ARBITRUM_USDT_POOL_TOKEN1=0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9
```

### 3. Register Pools in Pool Manager
```bash
# Base USDT pool
npm run register:pool-manager:pool:base

# Arbitrum USDT pool
npm run register:pool-manager:pool:arbitrum
```

### 4. Configure Cross-Chain Peers
```bash
npm run configure:pool-manager:peers:base
npm run configure:pool-manager:peers:arbitrum
```

### 5. Verify & Monitor
```bash
# Check pool creation on-chain
npm run sync:pool-manager:status:worker

# Verify contracts on block explorer
npm run verify:pool-manager:worker
```

---

## Detailed Configuration

### Token Addresses

#### Base
| Token | Address | Decimals | Notes |
|-------|---------|----------|-------|
| ONBT | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` | 18 | Native token |
| USDT | `0xfde4C96c8593536E31F26E8989180B6098C8e32F` | 6 | Bridged (Circle) |
| WETH | `0x4200000000000000000000000000000000000006` | 18 | Native wrapped ETH |

#### Arbitrum
| Token | Address | Decimals | Notes |
|-------|---------|----------|-------|
| ONBT | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` | 18 | Native token |
| USDT | `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` | 6 | Native (Tether) |
| WETH | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` | 18 | Native wrapped ETH |

### Pool Configuration

#### Initial Setup
- **Fee Tier**: 3000 basis points (0.30%)
- **Initial Liquidity**: 100,000 ONBT + 25 USDT per chain
- **Starting Price**: 1 USDT ≈ 4,000 ONBT (0.00025 USDT per ONBT)
- **Price Range**: Full range (-887272 to +887272 ticks)

#### Expected Price Impact
With 25 USDT initial liquidity on Base:
- 1,000 ONBT swap: ~0.25% slippage
- 10,000 ONBT swap: ~2.5% slippage
- 50,000 ONBT swap: ~12.5% slippage

**Recommendation**: Increase initial USDT to 500–1,000 for sustainable trading.

---

## Advanced Operations

### Add More Liquidity (After Initial Setup)

#### Option 1: Via Pool Manager
```bash
# Deposit additional ONBT to pool manager
node -e "
const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Pool manager ABI (simplified)
const abi = ['function depositLiquidity(bytes32 poolId, uint256 amount) external'];
const manager = new ethers.Contract(process.env.BASE_POOL_MANAGER_ADDRESS, abi, signer);

// Deposit 1,000,000 ONBT (1M tokens)
const amount = ethers.utils.parseEther('1000000');
const tx = await manager.depositLiquidity(
  process.env.BASE_POOL_ID,
  amount
);
console.log('Deposit tx:', tx.hash);
"
```

#### Option 2: Direct Uniswap Position Manager
```bash
# Add liquidity to existing position
node -e "
const { ethers } = require('ethers');
const { abi: posManagerAbi } = require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json');

// Mint new position with wide range
const posManager = new ethers.Contract(
  '0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7', // Base
  posManagerAbi,
  signer
);

const { tokenId } = await posManager.mint({
  token0: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5', // ONBT
  token1: '0xfde4C96c8593536E31F26E8989180B6098C8e32F', // USDT
  fee: 3000,
  tickLower: -887272,
  tickUpper: 887272,
  amount0Desired: ethers.utils.parseEther('100000'),
  amount1Desired: '25000000', // 25 USDT (6 decimals)
  amount0Min: 0,
  amount1Min: 0,
  recipient: '0x...', // Your address
  deadline: Math.floor(Date.now() / 1000) + 3600
});

console.log('Position minted:', tokenId.toString());
"
```

### Monitor Fee Accumulation
```bash
# Check fees collected on both chains
node -e "
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC_URL);

const manager = new ethers.Contract(
  process.env.BASE_POOL_MANAGER_ADDRESS,
  ['function getPoolInfo(bytes32 poolId) view returns (address token0, address token1, uint24 fee, uint256 allocation, uint256 funded, bool isActive)'],
  provider
);

const info = await manager.getPoolInfo(process.env.BASE_POOL_ID);
console.log('Base ONBT/USDT Pool:');
console.log('  Funded:', ethers.utils.formatEther(info.funded), 'ONBT');
console.log('  Active:', info.isActive);
"
```

### Withdraw Liquidity
```bash
# Remove position from Uniswap
node -e "
const { ethers } = require('ethers');
const { abi: posManagerAbi } = require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json');

const posManager = new ethers.Contract(
  '0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7',
  posManagerAbi,
  signer
);

// Decrease liquidity (80% withdrawal)
await posManager.decreaseLiquidity({
  tokenId: 123, // Your position ID
  liquidity: ethers.BigNumber.from('8000').mul(ethers.BigNumber.from('10').pow(15)),
  amount0Min: 0,
  amount1Min: 0,
  deadline: Math.floor(Date.now() / 1000) + 3600
});

// Collect all tokens
await posManager.collect({
  tokenId: 123,
  recipient: '0x...',
  amount0Max: ethers.constants.MaxUint128,
  amount1Max: ethers.constants.MaxUint128
});
"
```

---

## Pricing & Arbitrage

### Theoretical Price Points
At current initial setup (100K ONBT, 25 USDT):

| ONBT per USDT | Total USDT Value |
|---|---|
| 1,000 ONBT | $25 (0.0% trading) |
| 4,000 ONBT | $25 (current init) |
| 500 ONBT | $50 |
| 100 ONBT | $250 |
| 10 ONBT | $2,500 |

### Slippage Calculation (Uniswap V3 Constant Product)
```
price_impact = (input / liquidity_depth)^2
```

With 25 USDT depth:
- Swapping 1 USDT → expect 4,000 ± 20 ONBT
- Swapping 10 USDT → expect 40,000 ± 2,000 ONBT

### Arbitrage Considerations
- Monitor price differences between Base and Arbitrum pools
- Use LayerZero bridge for cross-chain arbitrage
- Expect 5–15 minute settlement per sync

---

## Emergency Procedures

### If Pool Creation Fails
```bash
# Check contract code size
etherscan.io/address/0xf2515AAA691d6d1dd54a8d78db879646e8FD90C8#code

# Retry with increased gas
HARDHAT_NETWORK=base npm run create:usdt:pools:worker
```

### If Liquidity Minting Fails (Insufficient Allowance)
```bash
# Approve tokens first
node -e "
const erc20Abi = ['function approve(address spender, uint256 amount) external'];
const onbt = new ethers.Contract('0x...', erc20Abi, signer);
await onbt.approve('0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7', ethers.constants.MaxUint256);
const usdt = new ethers.Contract('0x...', erc20Abi, signer);
await usdt.approve('0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7', ethers.constants.MaxUint256);
"
```

### If Cross-Chain Sync Hangs
```bash
# Check LayerZero executor status
curl https://api.layerzero.network/v1/status/{srcChain}/{dstChain}

# Or check pending messages
npx hardhat run scripts/check-pending-lz-messages.mjs --network base
```

---

## Testing (Local Testnet)

### Fork Mainnet Locally
```bash
# Run local fork
npx hardhat node --fork https://base-mainnet.g.alchemy.com/v2/YOUR_KEY

# In another terminal, run pool creation script
HARDHAT_NETWORK=hardhat npm run create:usdt:pools:worker
```

### Unit Tests
```bash
npm run test -- test/defi/ONBTPoolManager.test.sol
```

---

## Performance Notes

- **Pool Creation**: ~3–5 minutes (2 chains × 2–3 transactions)
- **Liquidity Minting**: ~1–2 minutes per pool
- **Cross-Chain Sync**: ~5–15 minutes (LayerZero executor)
- **Block Confirmation**: ~15–30 seconds Base, ~10–15 seconds Arbitrum

### Memory Usage
```bash
npm run create:usdt:pools:worker  # ~1GB heap
```

---

## FAQ

**Q: Can I change the initial liquidity amount?**  
A: Yes, edit `INITIAL_LIQUIDITY` in [deploy/create-onbt-usdt-pools.js](deploy/create-onbt-usdt-pools.js) before running.

**Q: What if USDT prices spike?**  
A: The pool adjusts price automatically. Arbitrageurs profit from the imbalance, bringing it back to market rate.

**Q: Can I create a 0.05% fee pool instead of 0.30%?**  
A: Yes, change `fee: 3000` to `fee: 500` in the script. Lower fees = more swaps but lower LP returns.

**Q: How do I verify the pools on a block explorer?**  
A: Run `npm run verify:routescan:worker` after creation. Pool addresses will appear on Basescan/Arbiscan.

**Q: Can I deposit directly without using the Pool Manager?**  
A: Yes, use Uniswap V3 Position Manager directly, but you lose Pool Manager features (cross-chain tracking, fee distribution).

---

## Deployment Checklist

- [ ] Run `npm run create:usdt:pools:worker`
- [ ] Copy output pool IDs to `.env`
- [ ] Run `npm run register:pool-manager:pool:base`
- [ ] Run `npm run register:pool-manager:pool:arbitrum`
- [ ] Run `npm run configure:pool-manager:peers:base`
- [ ] Run `npm run configure:pool-manager:peers:arbitrum`
- [ ] Run `npm run sync:pool-manager:base`
- [ ] Run `npm run sync:pool-manager:arbitrum`
- [ ] Run `npm run sync:pool-manager:status:worker` (verify events)
- [ ] Check pools visible on Basescan/Arbiscan
- [ ] Monitor initial trades and fee accumulation

---

**Version**: 1.0  
**Created**: February 23, 2026  
**For**: ONBT/USDT pool deployment and operations
