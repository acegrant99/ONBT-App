# Enhanced DeFi Ecosystem - Universal Liquidity Pools

## Overview

The ONBT DeFi ecosystem now supports **universal liquidity pools** for ANY ERC20 token pair, not just ONBT/ETH. This provides maximum flexibility for creating trading pairs across the entire Base ecosystem.

## Key Features

### 🌐 Universal Token Support
- Create liquidity pools for **any ERC20 token pair**
- Not limited to ONBT - support DAI/USDC, WETH/WBTC, or any combination
- Automatic token sorting for consistent pair addresses
- Factory prevents duplicate pairs

### 🔒 Enhanced Security
- **ONBTSecurityLib**: Comprehensive security utilities
  - Address validation
  - Balance verification
  - Deadline checks
  - Slippage protection
  - Safe token operations

- **ONBTMathLib**: Advanced math library
  - Safe arithmetic with overflow protection
  - Fixed-point math (18 decimals)
  - Square root calculations
  - Price impact calculations
  - AMM formulas

### 📊 Advanced Features
- **TWAP Oracle Support**: Price accumulators for time-weighted average prices
- **Configurable Fees**: Adjustable trading fees (max 5%)
- **Protocol Fees**: Revenue sharing mechanism
- **Pausable**: Emergency stop functionality
- **Price Impact**: Calculate before swapping

## Smart Contracts

### Libraries

#### ONBTMathLib.sol
Advanced mathematical operations for DeFi:

```solidity
// Calculate swap output
uint256 amountOut = ONBTMathLib.getAmountOut(
    amountIn,
    reserveIn,
    reserveOut,
    feeBps
);

// Calculate price impact
uint256 impact = ONBTMathLib.calculatePriceImpact(
    amountIn,
    reserveIn,
    reserveOut
);

// Safe math operations
uint256 result = ONBTMathLib.mulFixed(a, b);  // Fixed-point multiply
uint256 sqrt = ONBTMathLib.sqrt(y);           // Square root
```

**Key Functions:**
- `getAmountOut()` - Calculate output for given input
- `getAmountIn()` - Calculate input for desired output
- `calculateLiquidity()` - LP token calculation
- `calculatePriceImpact()` - Price impact estimation
- `sqrt()` - Babylonian square root
- Safe arithmetic operations

#### ONBTSecurityLib.sol
Security utilities for safe contract operations:

```solidity
// Validate addresses
ONBTSecurityLib.requireValidAddress(token);
ONBTSecurityLib.validateTokenPair(token0, token1);

// Check deadlines
ONBTSecurityLib.requireNotExpired(deadline);

// Verify slippage
ONBTSecurityLib.requireMinimumOutput(actualAmount, minAmount);

// Safe transfers
ONBTSecurityLib.safeTransferWithVerification(
    token,
    from,
    to,
    amount
);
```

**Key Functions:**
- `requireValidAddress()` - Validate non-zero addresses
- `validateTokenPair()` - Validate and check token pairs
- `requireNotExpired()` - Deadline validation
- `requireMinimumOutput()` - Slippage protection
- `sortTokens()` - Consistent token ordering

### Core Contracts

#### ONBTUniversalLiquidityPool.sol
AMM liquidity pool supporting any ERC20 token pair:

```solidity
// Create pool for any token pair
ONBTUniversalLiquidityPool pool = new ONBTUniversalLiquidityPool(
    address(tokenA),
    address(tokenB),
    feeRecipient
);

// Add liquidity
pool.addLiquidity(
    amount0Desired,
    amount1Desired,
    amount0Min,     // Slippage protection
    amount1Min,     // Slippage protection
    msg.sender,
    deadline
);

// Swap tokens
pool.swap(
    amount0In,      // 0 if swapping token1
    amount1In,      // 0 if swapping token0
    amount0OutMin,  // Minimum output
    amount1OutMin,  // Minimum output
    recipient,
    deadline
);

// Remove liquidity
pool.removeLiquidity(
    liquidity,
    amount0Min,
    amount1Min,
    recipient,
    deadline
);
```

**Features:**
- Constant product AMM (x × y = k)
- Dynamic LP token naming
- Optimal liquidity ratio calculation
- Price oracles (TWAP support)
- Protocol fee collection
- Pausable for emergencies

#### ONBTMultiTokenFactory.sol
Factory for deploying any token pair pool:

```solidity
// Deploy universal pool for any token pair
address pool = factory.deployUniversalLiquidityPool(
    address(tokenA),
    address(tokenB),
    feeRecipient
);

// Check if pair exists
bool exists = factory.pairExists(tokenA, tokenB);

// Get pool address
address pool = factory.getPool(tokenA, tokenB);

// Get all pairs
address[] memory pairs = factory.getAllPairs();
```

**Features:**
- One pool per token pair
- Prevents duplicates
- Bi-directional lookup
- Tracks all deployments
- Validates token pairs

## Use Cases

### 1. ONBT/USDC Pool
Create a stable pair for ONBT trading:

```solidity
// Deploy ONBT/USDC pool
address pool = factory.deployUniversalLiquidityPool(
    ONBT_ADDRESS,
    USDC_ADDRESS,
    FEE_RECIPIENT
);

// Add liquidity
ONBTUniversalLiquidityPool(pool).addLiquidity(
    1000000 * 1e18,  // 1M ONBT
    50000 * 1e6,     // 50K USDC
    0,
    0,
    msg.sender,
    block.timestamp + 3600
);
```

### 2. WETH/DAI Pool
Create a trading pair without ONBT:

```solidity
// Deploy WETH/DAI pool
address pool = factory.deployUniversalLiquidityPool(
    WETH_ADDRESS,
    DAI_ADDRESS,
    FEE_RECIPIENT
);
```

### 3. Multi-Hop Swaps
Enable complex trading routes:

```solidity
// Swap ONBT → WETH → DAI
// 1. Swap ONBT for WETH in ONBT/WETH pool
// 2. Swap WETH for DAI in WETH/DAI pool
```

## Deployment Guide

### Step 1: Deploy Libraries
Libraries must be deployed first:

```bash
# Deploy ONBTMathLib
npx hardhat run scripts/deployMathLib.mjs --network base

# Deploy ONBTSecurityLib
npx hardhat run scripts/deploySecurityLib.mjs --network base
```

### Step 2: Link Libraries
Update hardhat.config.js with library addresses:

```javascript
solidity: {
  version: "0.8.22",
  settings: {
    optimizer: { enabled: true, runs: 200 },
    libraries: {
      "contracts/libraries/ONBTMathLib.sol": {
        ONBTMathLib: "0x..."
      },
      "contracts/libraries/ONBTSecurityLib.sol": {
        ONBTSecurityLib: "0x..."
      }
    }
  }
}
```

### Step 3: Deploy Factory
```bash
npx hardhat run scripts/deployMultiTokenFactory.mjs --network base
```

### Step 4: Deploy Pools
```bash
# Via factory
node scripts/createTokenPair.mjs --tokenA 0x... --tokenB 0x...
```

## Integration Examples

### Frontend (OnchainKit)

```typescript
import { useWriteContract, useReadContract } from 'wagmi';

// Add liquidity
const { writeContract } = useWriteContract();

await writeContract({
  address: poolAddress,
  abi: UniversalPoolABI,
  functionName: 'addLiquidity',
  args: [
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
    userAddress,
    deadline
  ]
});

// Get quote
const { data: amountOut } = useReadContract({
  address: poolAddress,
  abi: UniversalPoolABI,
  functionName: 'getAmountOut',
  args: [amountIn, tokenInAddress]
});
```

### Smart Contract Integration

```solidity
import "./ONBTUniversalLiquidityPool.sol";

contract MyDeFiApp {
    ONBTUniversalLiquidityPool public pool;
    
    function swapTokens(
        uint256 amountIn,
        address tokenIn,
        uint256 minAmountOut
    ) external {
        // Get quote
        uint256 amountOut = pool.getAmountOut(amountIn, tokenIn);
        
        // Check slippage
        require(amountOut >= minAmountOut, "Slippage too high");
        
        // Execute swap
        if (tokenIn == address(pool.token0())) {
            pool.swap(amountIn, 0, 0, minAmountOut, msg.sender, deadline);
        } else {
            pool.swap(0, amountIn, minAmountOut, 0, msg.sender, deadline);
        }
    }
}
```

## Security Considerations

### 1. Always Use Slippage Protection
```solidity
// ✅ GOOD: With slippage protection
pool.swap(amountIn, 0, 0, minAmountOut, recipient, deadline);

// ❌ BAD: No slippage protection
pool.swap(amountIn, 0, 0, 0, recipient, deadline);
```

### 2. Set Reasonable Deadlines
```solidity
// ✅ GOOD: 30 minute deadline
uint256 deadline = block.timestamp + 1800;

// ❌ BAD: No deadline
uint256 deadline = type(uint256).max;
```

### 3. Check Price Impact
```solidity
// Check price impact before large swaps
uint256 impact = pool.calculatePriceImpact(largeAmount, tokenIn);
require(impact < 100, "Price impact too high"); // < 1%
```

### 4. Verify Token Addresses
```solidity
// Always verify tokens before creating pools
require(token0 != address(0), "Invalid token0");
require(token1 != address(0), "Invalid token1");
require(token0 != token1, "Identical tokens");
```

## Gas Optimization

### Batch Operations
```solidity
// Instead of multiple small adds, batch them
pool.addLiquidity(totalAmount0, totalAmount1, ...);
```

### Use View Functions
```solidity
// Get quotes off-chain before transactions
uint256 quote = pool.getAmountOut(amountIn, tokenIn);
```

## Testing

### Unit Tests
```javascript
describe("ONBTUniversalLiquidityPool", () => {
  it("should add liquidity correctly", async () => {
    await pool.addLiquidity(
      amount0,
      amount1,
      0,
      0,
      user.address,
      deadline
    );
    
    expect(await pool.balanceOf(user.address)).to.be.gt(0);
  });
  
  it("should swap tokens correctly", async () => {
    const amountOut = await pool.getAmountOut(amountIn, token0.address);
    
    await pool.swap(amountIn, 0, 0, amountOut, user.address, deadline);
    
    expect(await token1.balanceOf(user.address)).to.equal(amountOut);
  });
});
```

## Roadmap

### Current Features ✅
- Universal token pair support
- AMM with constant product formula
- Advanced security libraries
- TWAP oracle preparation
- Pausable mechanism
- Protocol fee collection

### Future Enhancements 🚀
- Multi-hop routing
- Concentrated liquidity (Uniswap V3 style)
- Flash loan support
- Governance token rewards
- Cross-chain liquidity
- NFT position management

## Support

For questions or issues:
- Documentation: See DEFI_ECOSYSTEM.md
- GitHub Issues: [Create an issue](https://github.com/acegrant99/ONBT-App/issues)
- Security: security@nabat.finance

## License

MIT License - see LICENSE file for details
