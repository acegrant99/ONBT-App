# ONBT Uniswap V3 Pool System with LayerZero

## Overview

This system integrates **Uniswap V3** with **LayerZero** for omnichain liquidity pool management for ONBT tokens. It enables:

- **Concentrated Liquidity Pools**: Create ONBT trading pools on Uniswap V3 with custom tick ranges
- **Cross-Chain Synchronization**: Sync pool stats (liquidity, volume) across chains
- **ERC-721 Position Management**: Manage liquidity via NFT positions
- **Multi-Chain Coordination**: Register peer pools and sync state between chains
- **Fee Tier Flexibility**: Support multiple fee tiers (0.01%, 0.05%, 0.30%, 1.00%)

## Architecture

### Core Components

#### 1. **ONBTPoolManager.sol** (Uniswap V3 Manager)
Manages Uniswap V3 pools and liquidity positions:

```solidity
Pool Management:
├── registerPool()              // Register new ONBT pool
├── allocateLiquidity()         // Set pool allocation/TVL cap
├── depositLiquidity()          // Fund your pool
├── withdrawLiquidity()         // Pull funds
└── layerZero functions        // Cross-chain sync

Liquidity Positions:
├── addLiquidityPosition()      // Create concentrated liquidity position
└── removeLiquidityPosition()   // Close position & collect fees

Cross-Chain:
├── syncPoolToPeer()            // Sync single pool state
├── syncMultiPoolsToPeer()      // Batch sync pools
└── _lzReceive()                // Receive peer updates
```

**Key Differences from V4:**
- Uses NFT positions (ERC-721) instead of custom liquidity accounting
- Concentrated liquidity with tick ranges instead of hooks
- SwapRouter for swaps instead of PoolManager
- Standard fee tiers (3000 = 0.30%, 500 = 0.05%, etc.)

**State Tracking:**
- `poolInfos[poolId]` - Pool configuration (token0, token1, fee)
- `poolFunded[poolId]` - Current liquidity provided
- `poolTokenIds[poolId]` - Array of NFT position IDs
- `crossChainPeers[poolId][dstEid]` - Peer pool addresses

## Uniswap V3 Concepts

### Fee Tiers

| Fee Tier | Basis Points | Use Case |
|----------|-------------|----------|
| 0.01% | 100 | Stablecoins |
| 0.05% | 500 | Stablecoins/Blue chips |
| 0.30% | 3000 | Standard pairs |
| 1.00% | 10000 | Exotic/volatile pairs |

### Tick Ranges

Concentrated liquidity requires specifying a tick range:
- **Tick spacing** varies per fee tier (e.g., 1 for 0.01%, 200 for 1.00%)
- **tickLower & tickUpper** define the price range for liquidity concentration
- Tighter ranges = more capital efficiency but higher risk of being out of range

Example for ONBT/USDC at 0.30% fee:
```solidity
addLiquidityPosition(
  poolId,
  amount0,
  amount1,
  -887220,  // tickLower (e.g., ~0.5x current price)
  887220    // tickUpper (e.g., ~2.0x current price)
)
```

### NFT Positions

Each liquidity position is an ERC-721 NFT managed via `INonfungiblePositionManager`:
- Token ID uniquely identifies a position
- Can be transferred (but we keep them in contract)
- Contains liquidity amount, tick range, fee earned

## Integration Points

### With Uniswap V3

1. **SwapRouter** - Execute swaps:
   ```solidity
   swapRouter.exactInputSingle(params)
   ```

2. **NonfungiblePositionManager** - Manage positions:
   ```solidity
   nftPositionManager.mint(params)      // Create position
   nftPositionManager.decreaseLiquidity() // Reduce liquidity
   nftPositionManager.collect()         // Claim fees
   ```

3. **Fee Accounting** - Earned through concentrated liquidity:
   - Automatic fee collection on swap execution
   - Collected when position is modified
   - Tracked per position NFT

### With LayerZero

- **OApp Pattern**: Inherit from OApp for messaging
- **Trust Model**: Register peer addresses via `setPeer()`
- **Message Format**: CrossChainPoolSync struct encoded as calldata
- **Fee Quotes**: `quoteCrossChainSync()` for fee estimation

## Usage Examples

### 1. Deploy on Chain

```bash
npx hardhat run deploy/deploy-v3-pools.js --network base
```

### 2. Register a Pool

```solidity
// Register ONBT/USDC pool (0.30% fee) on Base
onbtPoolManager.registerPool(
  poolId,         // bytes32 pool identifier
  onbtToken,      // token0 address
  usdcToken,      // token1 address
  3000,           // 0.30% fee tier
  30184,          // Base chain EID (LayerZero V2)
  500_000e18      // $500k allocation
);
```

### 3. Fund Pool

```solidity
// Provide $100k of ONBT to pool
onbtPoolManager.depositLiquidity(poolId, 100_000e18);
```

### 4. Create Liquidity Position

```solidity
// Add 50k ONBT + 50k USDC with concentrated liquidity
(uint256 tokenId, uint128 liquidity) = onbtPoolManager.addLiquidityPosition(
  poolId,
  50_000e18,      // amount0Desired (ONBT)
  50_000e6,       // amount1Desired (USDC)
  -887220,        // tickLower (~0.5x price)
  887220          // tickUpper (~2.0x price)
);
```

### 5. Register Peer Pool (Cross-Chain)

```solidity
// Link Base pool to Arbitrum pool
onbtPoolManager.registerCrossChainPool(
  basePoolId,
  30110,                      // Arbitrum EID (LayerZero V2)
  arbitrumPoolAddress         // Peer contract address
);
```

### 6. Sync Pool State Across Chains

```solidity
// Sync Base pool to Arbitrum
uint256 estimatedFee = estimateCrossChainFee(basePoolId, 30110);

onbtPoolManager.syncPoolToPeer{value: estimatedFee}(basePoolId, 30110);
```

### 7. Batch Sync Multiple Pools

```solidity
// Sync 5 pools at once
bytes32[] memory poolIds = [id1, id2, id3, id4, id5];
uint256 totalFee = estimateCrossChainFee(poolIds, 30110);

onbtPoolManager.syncMultiPoolsToPeer{value: totalFee}(poolIds, 30110);
```

### 8. Close Position and Collect Fees

```solidity
// Remove liquidity position and claim swap fees
onbtPoolManager.removeLiquidityPosition(poolId, tokenId, liquidityAmount);
```

## LayerZero Chain IDs (EID)

| Chain | EID |
|-------|-----|
| Arbitrum | 30110 |
| Base | 30184 |

## Data Flow

### Adding Liquidity Flow

```
User calls addLiquidityPosition()
    ↓
Approve tokens to NonfungiblePositionManager
    ↓
Call nftPositionManager.mint()
    ↓
Position created with NFT tokenId
    ↓
Store tokenId in poolTokenIds[poolId]
    ↓
Emit PositionCreated event
```

### Cross-Chain Sync Flow

```
User calls syncPoolToPeer()
    ↓
Fetch pool liquidity from poolFunded[poolId]
    ↓
Encode CrossChainPoolSync payload
    ↓
Send via LayerZero to peer chain
    ↓
Peer ONBTPoolManager._lzReceive()
    ↓
Verify trusted peer via registered address
    ↓
Update local tracking (liquidity, volume)
    ↓
Emit CrossChainSyncReceived event
```

## Security Considerations

### 1. Peer Trust
- Cross-chain messages only from registered peers
- Peer addresses checked against registered list
- `Origin.sender` must match registered peer

### 2. Allocation Limits
- Funding capped to `poolAllocations[poolId]`
- Prevents overfunding across chains
- Admin-controlled allocations

### 3. Token Safety
- SafeERC20 for all transfers
- Approval only to trusted contracts
- Deadline checks on Uniswap operations

### 4. Position Management
- NFTs stored in contract (cannot be transferred)
- Tick ranges validated by Uniswap
- Liquidity amount confirmed on mint/burn

### 5. LayerZero Security
- Endpoint trusted by OApp
- Settings managed via OApp config
- Message verification included

## Fee Models

### Uniswap V3 Protocol Fees
- Collected automatically during swaps
- Applied to liquidity positions
- Claimed via `nftPositionManager.collect()`

### Pool Operation Fees (Optional)
- Can implement hook fee via custom swap wrapper
- Deduct fee before sending to router
- Track in separate mapping

## Deployment Checklist

- [ ] Deploy ONBTPoolManager to each chain
- [ ] Configure swapRouter addresses (Uniswap V3 router)
- [ ] Set nftPositionManager addresses
- [ ] Set ONBT token addresses
- [ ] Set fee collector address
- [ ] Configure LayerZero endpoints
- [ ] Register peer pools across chains
- [ ] Set peer addresses for LayerZero
- [ ] Register first pools
- [ ] Allocate liquidity per pool
- [ ] Fund initial liquidity
- [ ] Create liquidity positions
- [ ] Test cross-chain sync
- [ ] Verify on block explorers

## Gas Optimization Tips

1. **Batch Position Creation**: Create multiple positions in one transaction if possible
2. **Batch Syncs**: Use `syncMultiPoolsToPeer()` for multiple pools
3. **Fee Collection**: Collect multiple positions' fees in batches
4. **Minimal State**: Only track necessary pool data

## Testing

```bash
# Unit tests
npx hardhat test test/ONBTPoolManager.test.js

# Integration tests with LayerZero
npx hardhat test test/integration/v3-pools.integration.js

# Gas benchmarks
npx hardhat test test/gas/pools-gas.test.js
```

## Contract Addresses

Deployment artifacts saved in `deployment-v3-pools-{network}-{timestamp}.json`:

```json
{
  "network": "base",
  "contracts": {
    "ONBTPoolManager": "0x..."
  },
  "configuration": {
    "swapRouter": "0x...",
    "nftPositionManager": "0x...",
    "onbtToken": "0x..."
  }
}
```

## References

- [Uniswap V3 Docs](https://docs.uniswap.org/protocol/V3/introduction)
- [Concentrated Liquidity](https://docs.uniswap.org/concepts/protocol/concentrated-liquidity)
- [SwapRouter](https://docs.uniswap.org/contracts/v3/reference/periphery/SwapRouter)
- [Position Manager](https://docs.uniswap.org/contracts/v3/reference/periphery/NonfungiblePositionManager)
- [LayerZero OApp](https://docs.layerzero.network/v2/developers/evm/oapp/overview)
- [LayerZero Protocol](https://docs.layerzero.network/)

---

**Last Updated**: February 2026
**Solidity Version**: ^0.8.22
**Dependencies**: @uniswap/v3-core, @uniswap/v3-periphery, @uniswap/v3-sdk, @layerzerolabs/oapp-evm, @openzeppelin/contracts

