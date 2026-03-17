# ONBTOmnichainStaking Contract

## Overview

LayerZero V2-enabled cross-chain staking contract for ONBT tokens. Allows users to stake on any supported chain while maintaining a unified global staking position synchronized via LayerZero messaging.

## Architecture

```
┌─────────────────┐           ┌─────────────────┐
│   Base (Hub)    │◄─────────►│   Arbitrum      │
│                 │  LayerZero │                 │
│ Global Tracking │  Messages  │ Local Staking   │
│ Reward Pool     │           │ Stake Sync      │
└─────────────────┘           └─────────────────┘
```

### Chain Roles

- **Hub Chain (Base)**: 
  - Aggregates all staking data across chains
  - Tracks global total staked
  - Manages reward distribution
  - Receives stake/unstake sync messages

- **Destination Chains (Arbitrum, etc.)**:
  - Handle local staking operations
  - Sync stake changes to hub
  - Maintain local user stakes
  - Process withdrawals locally

## Features

### ✅ Omnichain Staking
- Stake ONBT on any supported chain (Base, Arbitrum)
- Cross-chain position synchronization via LayerZero
- Unified global staking pool

### 🔒 Lockup Periods with Bonuses
- **No Lockup**: 1x rewards (instant withdrawal)
- **30 Days**: 1.2x rewards multiplier
- **90 Days**: 1.5x rewards multiplier
- **180 Days**: 2x rewards multiplier
- **365 Days**: 3x rewards multiplier

### 💰 Flexible Reward System
- Base APY: 10% (configurable)
- Real-time reward calculation
- Compound rewards to increase stake
- Claim rewards on any chain

### 🌉 LayerZero Integration
- Automatic stake synchronization
- Cross-chain message passing
- Gas-efficient operations
- Secure trusted remotes

## Contract Functions

### User Functions

#### `stake(uint256 amount, LockupPeriod lockup)`
Stake ONBT tokens with optional lockup period.
- **Parameters**:
  - `amount`: Amount of ONBT to stake (min 1 ONBT)
  - `lockup`: Lockup period selection (NONE, DAYS_30, DAYS_90, DAYS_180, DAYS_365)
- **Emits**: `Staked(user, amount, lockup, lockupEnd)`

#### `unstake(uint256 amount)`
Unstake ONBT tokens (must wait for lockup period to end).
- **Parameters**:
  - `amount`: Amount to unstake (0 = unstake all)
- **Emits**: `Unstaked(user, amount)`

#### `claimRewards()`
Claim accumulated staking rewards.
- **Emits**: `RewardsClaimed(user, amount)`

#### `compound()`
Compound rewards back into stake for increased earnings.
- **Emits**: `Compounded(user, amount)`

### View Functions

#### `getStakeInfo(address user)`
Get complete stake information for a user.
- **Returns**:
  - `amount`: Total staked amount
  - `startTime`: When staking started
  - `lockupEnd`: When lockup period ends
  - `lockup`: Selected lockup period
  - `earned`: Current pending rewards
  - `isLocked`: Whether stake is currently locked

#### `earned(address user)`
Calculate pending rewards for a user.
- **Returns**: Pending reward amount

#### `getLockupBonus(LockupPeriod lockup)`
Get reward multiplier for a lockup period.
- **Returns**: Bonus multiplier in basis points (10000 = 1x)

### Admin Functions

#### `setRewardRate(uint256 newRate)`
Update the base reward rate (owner only).
- **Parameters**:
  - `newRate`: New rate in basis points (1000 = 10%)

#### `setTrustedRemoteAddress(uint16 remoteChainId, bytes remoteAddress)`
Configure trusted remote staking contract on another chain.

#### `pause()` / `unpause()`
Emergency pause/unpause staking operations.

## Deployment

### Prerequisites
- ONBT token deployed on target chain
- LayerZero endpoint available on chain
- Sufficient ETH for deployment

### Deploy on Base (Hub)
```bash
npx hardhat run deploy/deploy-staking.js --network base
```

### Deploy on Arbitrum
```bash
npx hardhat run deploy/deploy-staking.js --network arbitrum
```

### Post-Deployment Configuration

1. **Set Trusted Remotes** (both directions):
```javascript
// On Base
await stakingBase.setTrustedRemoteAddress(
  30110, // Arbitrum LZ chain ID
  arbitrumStakingAddress
);

// On Arbitrum
await stakingArbitrum.setTrustedRemoteAddress(
  30184, // Base LZ chain ID
  baseStakingAddress
);
```

2. **Fund Reward Pool** (on all chains):
```javascript
// Transfer ONBT to staking contract for rewards
await onbtToken.transfer(stakingAddress, rewardAmount);
```

3. **Verify Deployment**:
```bash
npx hardhat verify --network base <address> <lzEndpoint> <onbtToken> <hubChainId> true
npx hardhat verify --network arbitrum <address> <lzEndpoint> <onbtToken> <hubChainId> false
```

## Usage Examples

### Basic Staking (No Lockup)
```solidity
// Approve staking contract
onbtToken.approve(stakingAddress, amount);

// Stake with no lockup (1x rewards)
staking.stake(100 ether, LockupPeriod.NONE);
```

### Staking with Lockup (3x Rewards)
```solidity
// Stake with 365-day lockup for 3x rewards
staking.stake(1000 ether, LockupPeriod.DAYS_365);
```

### Compound Rewards
```solidity
// Automatically restake rewards
staking.compound();
```

### Unstake After Lockup
```solidity
// Check if lockup has ended
(, , uint256 lockupEnd, , , bool isLocked) = staking.getStakeInfo(userAddress);

if (!isLocked) {
  // Unstake all tokens
  staking.unstake(0);
}
```

## Security Features

- ✅ **ReentrancyGuard**: Prevents reentrancy attacks
- ✅ **Pausable**: Emergency pause capability
- ✅ **Ownable**: Admin functions protected
- ✅ **SafeERC20**: Safe token transfers
- ✅ **LayerZero Security**: Trusted remotes only
- ✅ **Lockup Enforcement**: Time-locked withdrawals
- ✅ **Minimum Stake**: Prevents dust attacks

## Gas Optimization

- Efficient reward calculation
- Batch operations where possible
- Minimal storage updates
- Optimized LayerZero messages

## Testing

```bash
# Run tests
npx hardhat test test/ONBTOmnichainStaking.test.js

# Test cross-chain functionality
npx hardhat test test/staking-crosschain.test.js

# Gas report
REPORT_GAS=true npx hardhat test
```

## Integration with Miniapp

Update `miniapp/config/contracts.ts`:

```typescript
export const ONBT_STAKING_ADDRESS = {
  base: '0x...', // Base deployment address
  arbitrum: '0x...', // Arbitrum deployment address
};

export const ONBT_STAKING_ABI = [
  // Import from artifacts or define minimal ABI
];
```

## Events

```solidity
event Staked(address indexed user, uint256 amount, LockupPeriod lockup, uint256 lockupEnd);
event Unstaked(address indexed user, uint256 amount);
event RewardsClaimed(address indexed user, uint256 amount);
event Compounded(address indexed user, uint256 amount);
event CrossChainStakeSynced(address indexed user, uint16 srcChain, uint256 amount);
event RewardsSynced(address indexed user, uint256 amount);
event RewardRateUpdated(uint256 oldRate, uint256 newRate);
```

## Limitations & Future Improvements

- [ ] Add support for multiple reward tokens
- [ ] Implement governance-based reward rate updates
- [ ] Add APY calculator based on current rates
- [ ] Support partial lockup extension
- [ ] Add emergency unstake with penalty
- [ ] Implement delegation for governance voting
- [ ] Add staking leaderboard tracking

## Support

For issues or questions:
- GitHub: [Repository Issues]
- Discord: [Community Link]
- Docs: [Documentation]

## License

MIT License - See LICENSE file for details
