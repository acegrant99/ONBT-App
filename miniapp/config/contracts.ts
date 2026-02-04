/**
 * Contract Configuration for ONBT DeFi Ecosystem
 * Base Chain (Mainnet)
 */

// Contract Addresses (Update after deployment)
export const ONBT_TOKEN_ADDRESS = '0x...'; // OmnichainNabatOFT address
export const ONBT_STAKING_ADDRESS = '0x...'; // ONBTStaking address
export const ONBT_POOL_ADDRESS = '0x...'; // ONBTLiquidityPool address
export const ONBT_YIELD_DISTRIBUTOR_ADDRESS = '0x...'; // ONBTYieldDistributor address
export const ONBT_FACTORY_ADDRESS = '0x...'; // ONBTDeFiFactory address

// Contract ABIs (Minimal ABIs for frontend)
export const ONBT_STAKING_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'lockupPeriod', type: 'uint256' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'compound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'getStakeInfo',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'lockupEnd', type: 'uint256' },
      { name: 'lockupBonus', type: 'uint256' },
      { name: 'earnedRewards', type: 'uint256' },
      { name: 'stakedAt', type: 'uint256' },
      { name: 'isLocked', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

export const ONBT_POOL_ABI = [
  {
    inputs: [{ name: 'token0Amount', type: 'uint256' }],
    name: 'addLiquidity',
    outputs: [{ name: 'liquidity', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: 'liquidity', type: 'uint256' }],
    name: 'removeLiquidity',
    outputs: [
      { name: 'amount0', type: 'uint256' },
      { name: 'amount1', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'token0Amount', type: 'uint256' },
      { name: 'minToken1Out', type: 'uint256' }
    ],
    name: 'swapToken0ForToken1',
    outputs: [{ name: 'token1Out', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'minToken0Out', type: 'uint256' }],
    name: 'swapToken1ForToken0',
    outputs: [{ name: 'token0Out', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPrice0',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'reserveIn', type: 'uint256' },
      { name: 'reserveOut', type: 'uint256' }
    ],
    name: 'getAmountOut',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function'
  }
] as const;

export const ONBT_TOKEN_ABI = [
  {
    inputs: [
      { name: 'owner', type: 'address' }
    ],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// Chain Configuration
export const CHAIN_CONFIG = {
  chainId: 8453, // Base mainnet
  name: 'Base',
  rpcUrl: 'https://mainnet.base.org',
  blockExplorer: 'https://basescan.org'
};

// Lockup Periods (in seconds)
export const LOCKUP_PERIODS = {
  NONE: 0,
  DAYS_30: 30 * 24 * 60 * 60,
  DAYS_90: 90 * 24 * 60 * 60,
  DAYS_180: 180 * 24 * 60 * 60,
  DAYS_365: 365 * 24 * 60 * 60,
} as const;

// Lockup Bonuses (in basis points, 10000 = 1x)
export const LOCKUP_BONUSES = {
  [LOCKUP_PERIODS.NONE]: 10000,      // 1x
  [LOCKUP_PERIODS.DAYS_30]: 12000,   // 1.2x
  [LOCKUP_PERIODS.DAYS_90]: 15000,   // 1.5x
  [LOCKUP_PERIODS.DAYS_180]: 20000,  // 2x
  [LOCKUP_PERIODS.DAYS_365]: 30000,  // 3x
} as const;
