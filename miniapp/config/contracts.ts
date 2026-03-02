/**
 * Contract Configuration for ONBT DeFi Ecosystem
 * ABIs sourced from compiled Hardhat artifacts — full read/write coverage.
 * To regenerate ABI files: node scripts/sync-abis.mjs
 */
import { OmnichainNabatOFT_ABI } from './abis/OmnichainNabatOFT.abi';
import { ONBTOmnichainStaking_ABI } from './abis/ONBTOmnichainStaking.abi';
import { ONBTPrivateSaleOApp_ABI } from './abis/ONBTPrivateSaleOApp.abi';

// LayerZero OFT Addresses (mainnet)
// Source: current deployment status (Base hub + Arbitrum)
export const ONBT_TOKEN_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_BASE_ADDRESS as `0x${string}`) ||
  '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5'; // Base current
export const ONBT_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x169aC761Ebb210B5A93B68B44DA394776a7B230C'; // Arbitrum current

// ONBT Private Sale OApp addresses
export const ONBT_PRIVATE_SALE_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS as `0x${string}`) ||
  (process.env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_ADDRESS as `0x${string}`) ||
  '0xEA52c0c5Cb4962490d1132d9c255aa044296576e';

export const ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';

// Backward compatibility alias (defaults to Base)
export const ONBT_PRIVATE_SALE_ADDRESS = ONBT_PRIVATE_SALE_BASE_ADDRESS;

// Private sale payment assets by chain
export const BASE_USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
export const BASE_USDT_ADDRESS = '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2';
export const ARBITRUM_USDC_ADDRESS = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
export const ARBITRUM_USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';

export const PRIVATE_SALE_ADDRESSES: Record<number, `0x${string}`> = {
  8453: ONBT_PRIVATE_SALE_BASE_ADDRESS,
  42161: ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
};

export const PRIVATE_SALE_PAYMENT_TOKENS: Record<number, { USDC: `0x${string}`; USDT: `0x${string}` }> = {
  8453: {
    USDC: BASE_USDC_ADDRESS as `0x${string}`,
    USDT: BASE_USDT_ADDRESS as `0x${string}`,
  },
  42161: {
    USDC: ARBITRUM_USDC_ADDRESS as `0x${string}`,
    USDT: ARBITRUM_USDT_ADDRESS as `0x${string}`,
  },
};

// ONBTOmnichainStaking Addresses (deployed)
// Source: deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json
//         deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json
export const ONBT_STAKING_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STAKING_BASE_ADDRESS as `0x${string}`) ||
  '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe';
export const ONBT_STAKING_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STAKING_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44';

// -----------------------------------------------------------------------
// Ecosystem Contracts — Base (8453)
// Source: deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json
// -----------------------------------------------------------------------
export const ONBT_VAULT_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_VAULT_BASE_ADDRESS as `0x${string}`) ||
  '0xFd06Ecbd22b208f398E4d822904F7114642eF9b9';
export const ONBT_REWARDS_POOL_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_REWARDS_POOL_BASE_ADDRESS as `0x${string}`) ||
  '0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85';
export const ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS as `0x${string}`) ||
  '0x8c91384EbF767C1C434d127c82020380F4A8afC7';
export const ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS as `0x${string}`) ||
  '0x11EEEB62b2b2B66475642f82502989D671fC5855';
export const ONBT_STAKING_ROUTER_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STAKING_ROUTER_BASE_ADDRESS as `0x${string}`) ||
  '0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B';
export const ONBT_GOVERNOR_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_GOVERNOR_BASE_ADDRESS as `0x${string}`) ||
  '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9';
export const ONBT_LIQUIDITY_MANAGER_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_LIQUIDITY_MANAGER_BASE_ADDRESS as `0x${string}`) ||
  '0xb362Af3da1497A551C08F79bC03CbA12D2b7e908';
export const ONBT_INSURANCE_FUND_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_INSURANCE_FUND_BASE_ADDRESS as `0x${string}`) ||
  '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';
export const ONBT_STABILIZER_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STABILIZER_BASE_ADDRESS as `0x${string}`) ||
  '0x26D75024c2491636a1A1145a3d6966788EF54667';
export const ONBT_INCENTIVE_CONTROLLER_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_INCENTIVE_CONTROLLER_BASE_ADDRESS as `0x${string}`) ||
  '0x7b06795D31482fef0213b24E8ad5f348692A73BD';
export const ONBT_REVENUE_ROUTER_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_REVENUE_ROUTER_BASE_ADDRESS as `0x${string}`) ||
  '0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0';

// -----------------------------------------------------------------------
// Ecosystem Contracts — Arbitrum (42161)
// Source: deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json
// -----------------------------------------------------------------------
export const ONBT_VAULT_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_VAULT_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x85fE97c69350Be8B9A6bC026006907E34324CD6A';
export const ONBT_REWARDS_POOL_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_REWARDS_POOL_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1';
export const ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x2085ca5081480e8634eF4295ef477fe8cE97B892';
export const ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb';
export const ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64';
export const ONBT_GOVERNOR_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_GOVERNOR_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854';
export const ONBT_LIQUIDITY_MANAGER_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_LIQUIDITY_MANAGER_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3';
export const ONBT_INSURANCE_FUND_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_INSURANCE_FUND_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x85BB4B6268446a71110db6f296885AA1EE36c695';
export const ONBT_STABILIZER_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_STABILIZER_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587';
export const ONBT_INCENTIVE_CONTROLLER_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_INCENTIVE_CONTROLLER_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50';
export const ONBT_REVENUE_ROUTER_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_REVENUE_ROUTER_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xa66CA14df740B142d8E2DE515A8743ad1eE25850';

// LayerZero Endpoint IDs
export const LZ_ENDPOINT_ID = {
  BASE: 30184,
  ARBITRUM: 30110,
} as const;

// -----------------------------------------------------------------------
// Real ABIs — sourced from compiled Hardhat artifacts
// -----------------------------------------------------------------------

// OmnichainNabatOFT: full ERC-20 + LayerZero OFT interface
export const ONBT_OFT_ABI = OmnichainNabatOFT_ABI;

// ONBT_TOKEN_ABI is the same contract — alias for component clarity
export const ONBT_TOKEN_ABI = OmnichainNabatOFT_ABI;

// ERC20 ABI (payment token operations — minimal interface for USDC/USDT)
export const ERC20_PAYMENT_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// ONBTPrivateSaleOApp: full private sale interface
export const ONBT_PRIVATE_SALE_ABI = ONBTPrivateSaleOApp_ABI;

// ONBTOmnichainStaking: full omnichain staking interface
export const ONBT_STAKING_ABI = ONBTOmnichainStaking_ABI;

// ONBT Governor ABI (minimal read/write interface used by miniapp governance page)
export const ONBT_GOVERNOR_ABI = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'state',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'proposalVotes',
    outputs: [
      { name: 'againstVotes', type: 'uint256' },
      { name: 'forVotes', type: 'uint256' },
      { name: 'abstainVotes', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'account', type: 'address' }
    ],
    name: 'hasVoted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'timepoint', type: 'uint256' }
    ],
    name: 'getVotes',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'uint8' }
    ],
    name: 'castVote',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// Lockup Period Enum
export enum LockupPeriod {
  NONE = 0,
  DAYS_30 = 1,
  DAYS_90 = 2,
  DAYS_180 = 3,
  DAYS_365 = 4
}

// Lockup Period Info
export const LOCKUP_INFO = [
  { period: LockupPeriod.NONE, label: 'No Lockup', days: 0, bonus: '1x', multiplier: 10000 },
  { period: LockupPeriod.DAYS_30, label: '30 Days', days: 30, bonus: '1.2x', multiplier: 12000 },
  { period: LockupPeriod.DAYS_90, label: '90 Days', days: 90, bonus: '1.5x', multiplier: 15000 },
  { period: LockupPeriod.DAYS_180, label: '180 Days', days: 180, bonus: '2x', multiplier: 20000 },
  { period: LockupPeriod.DAYS_365, label: '365 Days', days: 365, bonus: '3x', multiplier: 30000 },
] as const;



// Chain Configuration
export const CHAIN_CONFIG = {
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    tokenAddress: ONBT_TOKEN_ADDRESS
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    tokenAddress: ONBT_ARBITRUM_ADDRESS
  }
} as const;

// Token Info
export const TOKEN_INFO = {
  name: 'Omnichain Nabat Token',
  symbol: 'ONBT',
  decimals: 18,
  totalSupply: '1000000000', // 1 billion
  website: 'https://nabat.finance',
  description: 'ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero'
} as const;
