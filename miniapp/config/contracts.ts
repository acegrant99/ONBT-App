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

// DeFi factory deployments
export const ONBT_DEFI_FACTORY_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_DEFI_FACTORY_BASE_ADDRESS as `0x${string}`) ||
  '0xe3Fb063Fc96307CCB7E59D073A8C10cA96a52D95';
export const ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x31F3595D6d5F371bB3413F8E31237791FbfFcfdB';

// Universal Liquidity Pool (ONBT/USDC)
export const ONBT_UNIVERSAL_POOL_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_UNIVERSAL_POOL_BASE_ADDRESS as `0x${string}`) ||
  '0xfab5a9B2e0Fc2D2e4E1e4b1ceAa7e64511a0e03e';
export const ONBT_UNIVERSAL_POOL_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_UNIVERSAL_POOL_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0x884A26b195b5661B4e90a7b66350572fD3C3e02c';

// Token Vesting — deployed after TGE
export const ONBT_VESTING_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_VESTING_BASE_ADDRESS as `0x${string}`) ||
  '0xC964d39F30768D6Fa5891Ab6e5EF5F47E2d930ED';
export const ONBT_VESTING_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_VESTING_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xcA4C161c43641e9083e240CAd4fC27899cD4A50c';

// Merkle Distributor — airdrop/campaign distributions
export const ONBT_DISTRIBUTOR_BASE_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_DISTRIBUTOR_BASE_ADDRESS as `0x${string}`) ||
  '0x8c14A90e4fe11532eB8596FB918d865733135F69';
export const ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS =
  (process.env.NEXT_PUBLIC_ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS as `0x${string}`) ||
  '0xB5870bAF387c62b2eB1528197Bb0FFe1C8F31E95';

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

// ONBTAchievementNFT: minimal read interface (balanceOf, owned tokens, per-token detail)
export const ONBT_ACHIEVEMENT_NFT_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'getAchievementsByOwner',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getAchievement',
    outputs: [
      { name: 'achievementType', type: 'uint8' },
      { name: 'name', type: 'string' },
      { name: 'rarity', type: 'uint8' },
      { name: 'unlockedAt', type: 'uint256' },
      { name: 'originChain', type: 'uint32' },
      { name: 'originalRecipient', type: 'address' },
      { name: 'transfers', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalMinted',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ONBT Governor ABI (minimal read/write interface used by miniapp governance page)
export const ONBT_GOVERNOR_ABI = [
  // ── View: proposal state (enum: 0=Pending 1=Active 2=Canceled 3=Defeated 4=Succeeded 5=Queued 6=Executed)
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'state',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  // ── View: get full proposal details
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'getProposal',
    outputs: [
      { name: 'proposer', type: 'address' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'forVotes', type: 'uint256' },
      { name: 'againstVotes', type: 'uint256' },
      { name: 'abstainVotes', type: 'uint256' },
      { name: 'startBlock', type: 'uint256' },
      { name: 'endBlock', type: 'uint256' },
      { name: 'currentState', type: 'uint8' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // ── View: get voter receipt for a proposal
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'voter', type: 'address' }
    ],
    name: 'getReceipt',
    outputs: [
      { name: 'hasVoted', type: 'bool' },
      { name: 'support', type: 'uint8' },
      { name: 'votes', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // ── View: public state variable getters
  {
    inputs: [],
    name: 'proposalCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'votingPeriod',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'proposalThreshold',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'quorumPercentage',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'stakingContract',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  // ── Write: cast vote (support: 0=Against 1=For 2=Abstain)
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'uint8' }
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // ── Write: create proposal (hub only)
  {
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'targets', type: 'address[]' },
      { name: 'values', type: 'uint256[]' },
      { name: 'calldatas', type: 'bytes[]' }
    ],
    name: 'propose',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// ONBTDeFiFactory ABI (minimal live-data + deployment interface)
export const ONBT_DEFI_FACTORY_ABI = [
  {
    inputs: [],
    name: 'onbtToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDeploymentCounts',
    outputs: [
      { name: 'stakingCount', type: 'uint256' },
      { name: 'poolCount', type: 'uint256' },
      { name: 'distributorCount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakingContracts',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLiquidityPools',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getYieldDistributors',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'distributor', type: 'address' }],
    name: 'registerYieldDistributor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'pool', type: 'address' }],
    name: 'registerLiquidityPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'staking', type: 'address' }],
    name: 'registerStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'addr', type: 'address' }],
    name: 'isRegisteredContract',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ── User registration ──────────────────────────────────────────
  {
    inputs: [{ name: 'syncFee', type: 'uint256' }],
    name: 'registerUser',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'registerUserFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'deregisterUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }, { name: 'newRole', type: 'uint8' }],
    name: 'setUserRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'isRegisteredUser',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUser',
    outputs: [
      {
        components: [
          { name: 'registered',     type: 'bool' },
          { name: 'role',           type: 'uint8' },
          { name: 'registeredAt',   type: 'uint256' },
          { name: 'registrationId', type: 'uint256' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRegisteredUsers',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'offset', type: 'uint256' },
      { name: 'limit',  type: 'uint256' },
    ],
    name: 'getUsersPaginated',
    outputs: [{ name: 'page', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EARLY_ADOPTER_THRESHOLD',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ── Events ─────────────────────────────────────────────────────
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'user',           type: 'address' },
      { indexed: true,  name: 'registrationId', type: 'uint256' },
      { indexed: false, name: 'role',           type: 'uint8'   },
      { indexed: false, name: 'originEid',      type: 'uint32'  },
    ],
    name: 'UserRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'user', type: 'address' }],
    name: 'UserDeregistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'user',    type: 'address' },
      { indexed: false, name: 'oldRole', type: 'uint8'   },
      { indexed: false, name: 'newRole', type: 'uint8'   },
    ],
    name: 'UserRoleUpdated',
    type: 'event',
  },
  // ── LayerZero cross-chain ──────────────────────────────────────
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'broadcastUser',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'dstEid',  type: 'uint32'  },
      { name: 'target',  type: 'address' },
      { name: 'payload', type: 'bytes'   },
    ],
    name: 'sendNotification',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'quoteUserSync',
    outputs: [{ name: 'totalFee', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'eid', type: 'uint32' }],
    name: 'addPeerEid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'eid', type: 'uint32' }],
    name: 'removePeerEid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'enabled', type: 'bool' }],
    name: 'setSyncEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'gas', type: 'uint128' }],
    name: 'setDefaultLzReceiveGas',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_eid',  type: 'uint32'  },
      { name: '_peer', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // ── LZ state vars ─────────────────────────────────────────────
  {
    inputs: [],
    name: 'localEid',
    outputs: [{ name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'syncEnabled',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defaultLzReceiveGas',
    outputs: [{ name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPeerEids',
    outputs: [{ name: '', type: 'uint32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint32' }],
    name: 'isPeerEid',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ── LZ message type constants ─────────────────────────────────
  {
    inputs: [],
    name: 'MSG_SYNC_USER',
    outputs: [{ name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MSG_SYNC_CONTRACT',
    outputs: [{ name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MSG_NOTIFY',
    outputs: [{ name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ── LZ events ─────────────────────────────────────────────────
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'msgType', type: 'uint16'  },
      { indexed: false, name: 'dstEid',  type: 'uint32'  },
      { indexed: false, name: 'payload', type: 'bytes'   },
    ],
    name: 'SyncSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'msgType', type: 'uint16' },
      { indexed: false, name: 'srcEid',  type: 'uint32' },
    ],
    name: 'SyncReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'target', type: 'address' },
      { indexed: false, name: 'dstEid', type: 'uint32'  },
      { indexed: false, name: 'payload',type: 'bytes'   },
    ],
    name: 'NotificationSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'eid', type: 'uint32' }],
    name: 'PeerEidAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'eid', type: 'uint32' }],
    name: 'PeerEidRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'enabled', type: 'bool' }],
    name: 'SyncEnabledUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'gas', type: 'uint128' }],
    name: 'DefaultGasUpdated',
    type: 'event',
  },
] as const;

// ONBTYieldDistributor ABI (minimal live-data + claim interface)
export const ONBT_YIELD_DISTRIBUTOR_ABI = [
  {
    inputs: [],
    name: 'onbtToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalShares',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'accRewardsPerShare',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'pendingRewards',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserInfo',
    outputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'pending', type: 'uint256' },
      { name: 'totalClaimed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'depositor', type: 'address' }],
    name: 'rewardDepositors',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ONBTOmnichainVault ABI (minimal live-data + user deposit interface)
export const ONBT_VAULT_ABI = [
  {
    inputs: [],
    name: 'localEid',
    outputs: [{ name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubChainEid',
    outputs: [{ name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isHub',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'governance',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasuryManager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getAvailableBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'token', type: 'address' }],
    name: 'whitelistedTokens',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositNative',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
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

// ─────────────────────────────────────────────────────────────
// ONBTTokenVesting ABI
// ─────────────────────────────────────────────────────────────
export const ONBT_VESTING_ABI = [
  // ── Views ──
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'schedules',
    outputs: [{
      components: [
        { name: 'active',          type: 'bool'    },
        { name: 'revocable',       type: 'bool'    },
        { name: 'revoked',         type: 'bool'    },
        { name: 'beneficiary',     type: 'address' },
        { name: 'totalAmount',     type: 'uint256' },
        { name: 'claimedAmount',   type: 'uint256' },
        { name: 'startTime',       type: 'uint256' },
        { name: 'cliffDuration',   type: 'uint256' },
        { name: 'vestingDuration', type: 'uint256' },
        { name: 'originEid',       type: 'uint32'  },
      ],
      name: '', type: 'tuple',
    }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'vestedAmount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'claimableAmount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'beneficiary', type: 'address' }],
    name: 'getScheduleIds',
    outputs: [{ name: '', type: 'bytes32[]' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'totalSchedules',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [
      { name: 'offset', type: 'uint256' },
      { name: 'limit',  type: 'uint256' },
    ],
    name: 'getSchedulesPaginated',
    outputs: [{ name: 'page', type: 'bytes32[]' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'quoteScheduleSync',
    outputs: [{ name: 'totalFee', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'localEid',
    outputs: [{ name: '', type: 'uint32' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'syncEnabled',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'defaultLzReceiveGas',
    outputs: [{ name: '', type: 'uint128' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'getPeerEids',
    outputs: [{ name: '', type: 'uint32[]' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'onbtToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view', type: 'function',
  },
  // ── Writes ──
  {
    inputs: [
      { name: 'beneficiary',      type: 'address' },
      { name: 'totalAmount',      type: 'uint256' },
      { name: 'startTime',        type: 'uint256' },
      { name: 'cliffDuration',    type: 'uint256' },
      { name: 'vestingDuration',  type: 'uint256' },
      { name: 'revocable',        type: 'bool'    },
    ],
    name: 'createSchedule',
    outputs: [{ name: 'scheduleId', type: 'bytes32' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'scheduleId', type: 'bytes32' }],
    name: 'revoke',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'broadcastUser',
    outputs: [],
    stateMutability: 'payable', type: 'function',
  },
  {
    inputs: [{ name: 'eid',  type: 'uint32'  }],
    name: 'addPeerEid',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'eid',  type: 'uint32'  }],
    name: 'removePeerEid',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: '_eid', type: 'uint32' }, { name: '_peer', type: 'bytes32' }],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'enabled', type: 'bool' }],
    name: 'setSyncEnabled',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'gas', type: 'uint128' }],
    name: 'setDefaultLzReceiveGas',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  // ── Events ──
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'scheduleId',      type: 'bytes32' },
      { indexed: true,  name: 'beneficiary',     type: 'address' },
      { indexed: false, name: 'totalAmount',     type: 'uint256' },
      { indexed: false, name: 'startTime',       type: 'uint256' },
      { indexed: false, name: 'cliffDuration',   type: 'uint256' },
      { indexed: false, name: 'vestingDuration', type: 'uint256' },
      { indexed: false, name: 'revocable',       type: 'bool'    },
      { indexed: false, name: 'originEid',       type: 'uint32'  },
    ],
    name: 'ScheduleCreated', type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'scheduleId',  type: 'bytes32' },
      { indexed: true,  name: 'beneficiary', type: 'address' },
      { indexed: false, name: 'amount',      type: 'uint256' },
    ],
    name: 'Claimed', type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'scheduleId',    type: 'bytes32' },
      { indexed: true,  name: 'beneficiary',   type: 'address' },
      { indexed: false, name: 'returnedAmount',type: 'uint256' },
    ],
    name: 'Revoked', type: 'event',
  },
] as const;

// ─────────────────────────────────────────────────────────────
// ONBTMerkleDistributor ABI
// ─────────────────────────────────────────────────────────────
export const ONBT_DISTRIBUTOR_ABI = [
  // ── Views ──
  {
    inputs: [{ name: 'roundId', type: 'uint256' }],
    name: 'getRound',
    outputs: [{
      components: [
        { name: 'merkleRoot',    type: 'bytes32' },
        { name: 'totalAmount',   type: 'uint256' },
        { name: 'claimedAmount', type: 'uint256' },
        { name: 'startTime',     type: 'uint256' },
        { name: 'endTime',       type: 'uint256' },
        { name: 'paused',        type: 'bool'    },
        { name: 'closed',        type: 'bool'    },
        { name: 'mirrorOnly',    type: 'bool'    },
        { name: 'description',   type: 'string'  },
        { name: 'originEid',     type: 'uint32'  },
      ],
      name: '', type: 'tuple',
    }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [
      { name: 'roundId',     type: 'uint256' },
      { name: 'beneficiary', type: 'address' },
    ],
    name: 'claimed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'roundId', type: 'uint256' }],
    name: 'remainingAmount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'nextRoundId',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'roundId', type: 'uint256' }],
    name: 'quoteRoundSync',
    outputs: [{ name: 'totalFee', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [
      { name: 'roundId',     type: 'uint256'   },
      { name: 'beneficiary', type: 'address'   },
      { name: 'amount',      type: 'uint256'   },
      { name: 'proof',       type: 'bytes32[]' },
    ],
    name: 'verifyProof',
    outputs: [{ name: 'valid', type: 'bool' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'localEid',
    outputs: [{ name: '', type: 'uint32' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'syncEnabled',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'getPeerEids',
    outputs: [{ name: '', type: 'uint32[]' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'onbtToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view', type: 'function',
  },
  // ── Writes ──
  {
    inputs: [
      { name: 'merkleRoot',   type: 'bytes32' },
      { name: 'totalAmount',  type: 'uint256' },
      { name: 'startTime',    type: 'uint256' },
      { name: 'endTime',      type: 'uint256' },
      { name: 'description',  type: 'string'  },
    ],
    name: 'createRound',
    outputs: [{ name: 'roundId', type: 'uint256' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [
      { name: 'roundId', type: 'uint256' },
      { name: 'paused',  type: 'bool'    },
    ],
    name: 'setRoundPaused',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'roundId', type: 'uint256' }],
    name: 'withdrawRemainder',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [
      { name: 'roundId', type: 'uint256'   },
      { name: 'amount',  type: 'uint256'   },
      { name: 'proof',   type: 'bytes32[]' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'eid',  type: 'uint32'  }],
    name: 'addPeerEid',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'eid',  type: 'uint32'  }],
    name: 'removePeerEid',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: '_eid', type: 'uint32' }, { name: '_peer', type: 'bytes32' }],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'enabled', type: 'bool' }],
    name: 'setSyncEnabled',
    outputs: [],
    stateMutability: 'nonpayable', type: 'function',
  },
  // ── Events ──
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'roundId',      type: 'uint256' },
      { indexed: false, name: 'merkleRoot',   type: 'bytes32' },
      { indexed: false, name: 'totalAmount',  type: 'uint256' },
      { indexed: false, name: 'startTime',    type: 'uint256' },
      { indexed: false, name: 'endTime',      type: 'uint256' },
      { indexed: false, name: 'description',  type: 'string'  },
      { indexed: false, name: 'mirrorOnly',   type: 'bool'    },
      { indexed: false, name: 'originEid',    type: 'uint32'  },
    ],
    name: 'RoundCreated', type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'roundId',     type: 'uint256' },
      { indexed: true,  name: 'beneficiary', type: 'address' },
      { indexed: false, name: 'amount',      type: 'uint256' },
    ],
    name: 'Claimed', type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'roundId', type: 'uint256' },
      { indexed: false, name: 'paused',  type: 'bool'    },
    ],
    name: 'RoundPaused', type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: 'roundId', type: 'uint256' },
      { indexed: false, name: 'amount',  type: 'uint256' },
    ],
    name: 'RemainderWithdrawn', type: 'event',
  },
] as const;

// ── USDC addresses ──────────────────────────────────────────────────────────
export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;
export const USDC_ARBITRUM_ADDRESS = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as const;

// ── ONBTUniversalLiquidityPool ABI ─────────────────────────────────────────
export const ONBT_UNIVERSAL_POOL_ABI = [
  // ── Immutables ──
  { inputs: [], name: 'token0', outputs: [{ name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'token1', outputs: [{ name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'stable', outputs: [{ name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'decimals0', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'decimals1', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  // ── State ──
  { inputs: [], name: 'reserve0', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'reserve1', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'feeBps', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'feeRecipient', outputs: [{ name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'protocolFeeShare', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'lpFees0', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'lpFees1', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'price0CumulativeLast', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'price1CumulativeLast', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  // ── Per-user LP fee claimable ──
  { inputs: [{ name: 'user', type: 'address' }], name: 'claimable0', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'user', type: 'address' }], name: 'claimable1', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'user', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  // ── Quote helpers ──
  {
    inputs: [{ name: 'amountIn', type: 'uint256' }, { name: 'tokenInIsToken0', type: 'bool' }],
    name: 'getAmountOut',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [{ name: 'lpTokens', type: 'uint256' }],
    name: 'getLiquidityValue',
    outputs: [{ name: 'amount0', type: 'uint256' }, { name: 'amount1', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  {
    inputs: [],
    name: 'getReserves',
    outputs: [{ name: '_reserve0', type: 'uint256' }, { name: '_reserve1', type: 'uint256' }, { name: '_ts', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  // ── Swap ──
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'tokenInIsToken0', type: 'bool' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  // ── Liquidity ──
  {
    inputs: [
      { name: 'amount0Desired', type: 'uint256' },
      { name: 'amount1Desired', type: 'uint256' },
      { name: 'amount0Min', type: 'uint256' },
      { name: 'amount1Min', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [{ name: 'amount0', type: 'uint256' }, { name: 'amount1', type: 'uint256' }, { name: 'liquidity', type: 'uint256' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [
      { name: 'liquidity', type: 'uint256' },
      { name: 'amount0Min', type: 'uint256' },
      { name: 'amount1Min', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'removeLiquidity',
    outputs: [{ name: 'amount0', type: 'uint256' }, { name: 'amount1', type: 'uint256' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  // ── Fee claim ──
  {
    inputs: [],
    name: 'claimFees',
    outputs: [{ name: 'claimed0', type: 'uint256' }, { name: 'claimed1', type: 'uint256' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  // ── ERC20 approve (for LP tokens) ──
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable', type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view', type: 'function',
  },
  // ── Events ──
  { anonymous: false, inputs: [{ indexed: true, name: 'provider', type: 'address' }, { indexed: false, name: 'amount0', type: 'uint256' }, { indexed: false, name: 'amount1', type: 'uint256' }, { indexed: false, name: 'liquidity', type: 'uint256' }], name: 'LiquidityAdded', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'provider', type: 'address' }, { indexed: false, name: 'amount0', type: 'uint256' }, { indexed: false, name: 'amount1', type: 'uint256' }, { indexed: false, name: 'liquidity', type: 'uint256' }], name: 'LiquidityRemoved', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: false, name: 'amount0In', type: 'uint256' }, { indexed: false, name: 'amount1In', type: 'uint256' }, { indexed: false, name: 'amount0Out', type: 'uint256' }, { indexed: false, name: 'amount1Out', type: 'uint256' }, { indexed: true, name: 'to', type: 'address' }], name: 'Swap', type: 'event' },
] as const;
