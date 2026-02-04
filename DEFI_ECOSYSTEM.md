# ONBT DeFi Ecosystem Documentation

## Overview

The Omnichain Nabat Token (ONBT) DeFi ecosystem is a comprehensive set of smart contracts and frontend components designed to provide staking, swapping, liquidity provision, and yield distribution for the ONBT token on Base chain.

---

## Smart Contracts

### 1. ONBTStaking.sol

**Purpose**: Allow users to stake ONBT tokens and earn rewards with optional lockup periods.

**Key Features**:
- Flexible lockup periods (0, 30, 90, 180, 365 days)
- Bonus multipliers for longer lockups (1x to 3x)
- Compound rewards functionality
- Emergency withdrawal
- Pausable for security

**Main Functions**:

```solidity
// Stake tokens with optional lockup
function stake(uint256 amount, uint256 lockupPeriod) external

// Withdraw staked tokens
function withdraw(uint256 amount) external

// Claim earned rewards
function claimRewards() external

// Compound rewards (restake automatically)
function compound() external

// View earned rewards
function earned(address account) external view returns (uint256)

// Get complete stake information
function getStakeInfo(address account) external view returns (...)
```

**Lockup Bonuses**:
- No lockup: 1x rewards (100%)
- 30 days: 1.2x rewards (120%)
- 90 days: 1.5x rewards (150%)
- 180 days: 2x rewards (200%)
- 365 days: 3x rewards (300%)

### 2. ONBTLiquidityPool.sol

**Purpose**: Automated Market Maker (AMM) for ONBT/ETH trading pair.

**Key Features**:
- Constant product formula (x * y = k)
- LP token minting for liquidity providers
- 0.3% trading fee
- Slippage protection
- Price oracle functions

**Main Functions**:

```solidity
// Add liquidity and receive LP tokens
function addLiquidity(uint256 token0Amount) external payable returns (uint256 liquidity)

// Remove liquidity and burn LP tokens
function removeLiquidity(uint256 liquidity) external returns (uint256 amount0, uint256 amount1)

// Swap ONBT for ETH
function swapToken0ForToken1(uint256 token0Amount, uint256 minToken1Out) external returns (uint256)

// Swap ETH for ONBT
function swapToken1ForToken0(uint256 minToken0Out) external payable returns (uint256)

// Calculate swap output
function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256)

// Get current reserves
function getReserves() external view returns (uint256, uint256)

// Get token prices
function getPrice0() external view returns (uint256)
function getPrice1() external view returns (uint256)
```

**Fee Structure**:
- Trading fee: 0.3% (30 basis points)
- Protocol fee: Configurable (default 10% of trading fees)

### 3. ONBTYieldDistributor.sol

**Purpose**: Distribute yield/rewards proportionally to ONBT holders and stakers.

**Key Features**:
- Share-based reward distribution
- Multiple reward sources
- Batch operations for gas efficiency
- Whitelisted depositors

**Main Functions**:

```solidity
// Update user shares (called by staking contract)
function updateShares(address user, uint256 newShares) external

// Deposit rewards for distribution
function depositRewards(uint256 amount) external

// Claim pending rewards
function claimRewards() external

// View pending rewards
function pendingRewards(address user) external view returns (uint256)

// Batch update shares
function batchUpdateShares(address[] calldata users, uint256[] calldata newShares) external
```

### 4. ONBTDeFiFactory.sol

**Purpose**: Factory contract for deploying DeFi ecosystem contracts.

**Key Features**:
- Centralized deployment management
- Track all deployed contracts
- Easy ecosystem expansion

**Main Functions**:

```solidity
// Deploy new staking contract
function deployStaking(address rewardToken, uint256 rewardRate, uint256 minimumStake) external returns (address)

// Deploy new liquidity pool
function deployLiquidityPool(address feeRecipient) external returns (address)

// Deploy new yield distributor
function deployYieldDistributor() external returns (address)

// Get all deployments
function getStakingContracts() external view returns (address[] memory)
function getLiquidityPools() external view returns (address[] memory)
function getYieldDistributors() external view returns (address[] memory)
```

---

## OnchainKit Miniapp

### Architecture

The ONBT miniapp is built with:
- **React** + **TypeScript**
- **OnchainKit** (Coinbase's web3 UI library)
- **wagmi** (React Hooks for Ethereum)
- **viem** (TypeScript Ethereum library)
- **Tailwind CSS** (Styling)

### Components

#### 1. App.tsx

Main application component that:
- Configures wagmi and OnchainKit providers
- Handles wallet connection
- Provides navigation between features
- Renders the active interface

#### 2. StakingInterface.tsx

Staking interface component featuring:
- Stake amount input
- Lockup period selection
- Real-time reward display
- Withdraw functionality
- Compound rewards
- Transaction status tracking

**User Actions**:
1. Connect wallet
2. Enter stake amount
3. Select lockup period (optional)
4. Confirm transaction
5. View staked balance and rewards
6. Claim or compound rewards
7. Withdraw after lockup

#### 3. SwapInterface.tsx

Swap interface component featuring:
- Token input/output fields
- Real-time price calculation
- Slippage tolerance settings
- Price impact display
- Swap direction toggle

**User Actions**:
1. Connect wallet
2. Enter swap amount
3. Review output and price
4. Set slippage tolerance
5. Confirm swap
6. Receive swapped tokens

---

## Deployment Guide

### Prerequisites

1. Node.js 18+ and npm
2. Hardhat configured
3. Base RPC endpoint
4. Wallet with ETH on Base for deployment

### Deploy Smart Contracts

```bash
# 1. Compile contracts
npx hardhat compile

# 2. Deploy ONBT token (if not deployed)
npx hardhat run scripts/deployONBT.mjs --network base

# 3. Deploy DeFi Factory
npx hardhat run scripts/deployDeFiFactory.mjs --network base

# 4. Deploy Staking contract
npx hardhat run scripts/deployStaking.mjs --network base

# 5. Deploy Liquidity Pool
npx hardhat run scripts/deployLiquidityPool.mjs --network base

# 6. Deploy Yield Distributor
npx hardhat run scripts/deployYieldDistributor.mjs --network base
```

### Configure Miniapp

1. **Update contract addresses** in `miniapp/config/contracts.ts`:
```typescript
export const ONBT_TOKEN_ADDRESS = '0x...'; // Your deployed token
export const ONBT_STAKING_ADDRESS = '0x...'; // Your staking contract
export const ONBT_POOL_ADDRESS = '0x...'; // Your pool contract
```

2. **Install dependencies**:
```bash
cd miniapp
npm install
```

3. **Set environment variables**:
```bash
# Create .env.local
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

4. **Run development server**:
```bash
npm run dev
```

5. **Build for production**:
```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd miniapp
vercel

# Add custom domain
vercel domains add nabat.finance
```

---

## Integration Examples

### Stake ONBT

```typescript
import { useWriteContract } from 'wagmi';
import { ONBT_STAKING_ADDRESS, ONBT_STAKING_ABI } from './config/contracts';

function StakeButton() {
  const { writeContract } = useWriteContract();

  const stake = () => {
    writeContract({
      address: ONBT_STAKING_ADDRESS,
      abi: ONBT_STAKING_ABI,
      functionName: 'stake',
      args: [parseEther('100'), 30 * 24 * 60 * 60], // 100 ONBT, 30 days
    });
  };

  return <button onClick={stake}>Stake 100 ONBT</button>;
}
```

### Swap Tokens

```typescript
import { useWriteContract } from 'wagmi';
import { ONBT_POOL_ADDRESS, ONBT_POOL_ABI } from './config/contracts';

function SwapButton() {
  const { writeContract } = useWriteContract();

  const swap = () => {
    writeContract({
      address: ONBT_POOL_ADDRESS,
      abi: ONBT_POOL_ABI,
      functionName: 'swapToken0ForToken1',
      args: [parseEther('10'), parseEther('0.001')], // 10 ONBT, min 0.001 ETH
    });
  };

  return <button onClick={swap}>Swap ONBT for ETH</button>;
}
```

---

## Security Considerations

### Smart Contracts

1. **ReentrancyGuard**: All state-changing functions protected
2. **Access Control**: Ownable pattern for admin functions
3. **Pausable**: Emergency pause functionality
4. **SafeERC20**: Safe token transfers
5. **Input Validation**: All inputs validated
6. **Emergency Withdrawal**: Users can always exit

### Frontend

1. **Slippage Protection**: User-defined slippage tolerance
2. **Transaction Confirmation**: Clear transaction details before signing
3. **Error Handling**: Graceful error messages
4. **Input Validation**: Client-side validation before submission

### Recommendations

1. **Get Security Audit**: Professional audit before mainnet
2. **Test Thoroughly**: Comprehensive testing on testnet
3. **Gradual Rollout**: Start with limited funds
4. **Monitor Closely**: Watch for unusual activity
5. **Have Emergency Plan**: Clear incident response process

---

## Testing

### Smart Contract Tests

```bash
# Run all tests
npx hardhat test

# Run specific test
npx hardhat test test/ONBTStaking.test.js

# Check coverage
npx hardhat coverage
```

### Frontend Tests

```bash
cd miniapp

# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

---

## Troubleshooting

### Common Issues

**1. Transaction Fails**
- Check token approval
- Verify sufficient balance
- Check gas settings
- Review slippage tolerance

**2. Cannot Withdraw**
- Check if lockup period has ended
- Verify you have staked balance
- Check if contract is paused

**3. Rewards Not Updating**
- Wait for transaction confirmation
- Refresh the page
- Check if rewards are funded

**4. Swap Price Impact High**
- Reduce swap amount
- Add more liquidity to pool
- Increase slippage tolerance

---

## API Reference

### Contract Events

#### ONBTStaking
```solidity
event Staked(address indexed user, uint256 amount, uint256 lockupPeriod, uint256 bonus);
event Withdrawn(address indexed user, uint256 amount);
event RewardPaid(address indexed user, uint256 reward);
```

#### ONBTLiquidityPool
```solidity
event LiquidityAdded(address indexed provider, uint256 token0Amount, uint256 token1Amount, uint256 liquidity);
event LiquidityRemoved(address indexed provider, uint256 token0Amount, uint256 token1Amount, uint256 liquidity);
event Swap(address indexed user, uint256 token0In, uint256 token1In, uint256 token0Out, uint256 token1Out);
```

---

## Support

For questions and support:
- GitHub: https://github.com/acegrant99/ONBT-App
- Twitter: @nabatfinance
- Discord: [Join our server]
- Email: support@nabat.finance

---

## License

MIT License - See LICENSE file for details
