/**
 * ONBT Project Information
 * Data sourced from README.md and MAINNET_DEPLOYMENT_STATUS.md
 */

// Token Information
export const TOKEN_INFO = {
  name: 'Omnichain Nabat Token',
  symbol: 'ONBT',
  totalSupply: '1,000,000,000',
  decimals: 18,
  type: 'LayerZero V2 OFT (Omnichain Fungible Token)',
  
  addresses: {
    base: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    arbitrum: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
  },
  
  explorers: {
    base: 'https://basescan.org/token/0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    arbitrum: 'https://arbiscan.io/token/0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
  },
}

// Protocol Statistics
export const PROTOCOL_STATS = {
  totalStaked: '20,000,000', // 20M ONBT across both chains
  totalValueLocked: '20,000,000', // TVL in ONBT
  dailyRewards: '8,220', // Combined daily rewards
  baseAPY: '15', // Base APY percentage
  maxAPY: '30', // Max APY with 2x lockup multiplier
  rewardRunway: '4,000+', // Days of rewards remaining
  
  lockup: {
    minPeriod: 0,
    maxPeriod: 365,
    multiplierTiers: [
      { days: 0, multiplier: '1.0x' },
      { days: 7, multiplier: '1.1x' },
      { days: 30, multiplier: '1.25x' },
      { days: 90, multiplier: '1.5x' },
      { days: 365, multiplier: '2.0x' },
    ],
  },
  
  distribution: {
    base: {
      vault: '20,000,000',
      rewardsPool: '13,000,000',
      staked: '10,000,000',
      treasury: '944,000,000',
    },
    arbitrum: {
      vault: '10,000,000',
      rewardsPool: '11,000,000',
      staked: '10,000,000',
    },
  },
}

// Deployment Information
export const DEPLOYMENT_INFO = {
  deploymentDate: 'February 19, 2026',
  lastUpdated: 'February 20, 2026',
  deployer: '0x44497B9FF645A995b18967b34eFeFDe82AeC8144',
  status: 'FULLY OPERATIONAL',
  
  networks: {
    base: {
      chainId: 8453,
      name: 'Base',
      layerZeroEid: 30184,
      role: 'Hub Chain',
      rpc: 'https://mainnet.base.org',
      explorer: 'https://basescan.org',
    },
    arbitrum: {
      chainId: 42161,
      name: 'Arbitrum One',
      layerZeroEid: 30110,
      role: 'Spoke Chain',
      rpc: 'https://arb1.arbitrum.io/rpc',
      explorer: 'https://arbiscan.io',
    },
  },
  
  contractCount: 26, // 13 per chain
}

// Feature Highlights
export const FEATURES = [
  {
    id: 'oft',
    title: 'Omnichain Token (OFT)',
    icon: '🪙',
    description: '1B total supply with native LayerZero V2 bridging',
    highlights: [
      'No wrapping required',
      'Same token address semantics',
      'Unified liquidity across chains',
    ],
  },
  {
    id: 'staking',
    title: 'Omnichain Staking',
    icon: '🔒',
    description: 'Multi-chain staking with reward multipliers',
    highlights: [
      'Up to 2x APY for 1-year lockup',
      'Cross-chain metrics aggregation',
      'Auto-refill rewards system',
    ],
  },
  {
    id: 'governance',
    title: 'Cross-Chain DAO',
    icon: '🏛️',
    description: 'Vote from any chain, execute on hub',
    highlights: [
      '4% quorum requirement',
      'Voting power from staking',
      'Full proposal lifecycle',
    ],
  },
  {
    id: 'achievements',
    title: 'Achievement NFTs',
    icon: '🎖️',
    description: 'Portable ONFT721 cross-chain achievements',
    highlights: [
      '8 achievement types',
      'Auto-minting milestones',
      'Transfer between chains',
    ],
  },
  {
    id: 'treasury',
    title: 'Treasury & Yield',
    icon: '🏦',
    description: 'Omnichain treasury management',
    highlights: [
      'Secure vault management',
      'Proportional yield distribution',
      'Auto-refill staking rewards',
    ],
  },
]

// Security & Audits
export const SECURITY_INFO = {
  audits: [
    {
      auditor: 'Internal Security Review',
      date: 'February 2026',
      status: 'Completed',
      report: '/reports/audit-latest.md',
    },
  ],
  
  verifications: {
    basescan: true,
    arbiscan: true,
    routescan: true,
  },
  
  features: [
    'All contracts verified on-chain',
    'Peer configuration validated',
    'Cross-chain messaging tested',
    'Operational validation complete',
    'Module wiring verified',
    'Funding status confirmed',
  ],
}

// Ecosystem Contracts (Key Contracts)
export const KEY_CONTRACTS = {
  base: [
    { name: 'ONBT Token', address: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5' },
    { name: 'Staking', address: '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe' },
    { name: 'Governor', address: '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9' },
    { name: 'Vault', address: '0xFd06Ecbd22b208f398E4d822904F7114642eF9b9' },
    { name: 'Rewards Pool', address: '0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85' },
    { name: 'Achievement NFT', address: '0x11EEEB62b2b2B66475642f82502989D671fC5855' },
  ],
  arbitrum: [
    { name: 'ONBT Token', address: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C' },
    { name: 'Staking', address: '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44' },
    { name: 'Governor', address: '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854' },
    { name: 'Vault', address: '0x85fE97c69350Be8B9A6bC026006907E34324CD6A' },
    { name: 'Rewards Pool', address: '0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1' },
    { name: 'Achievement NFT', address: '0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb' },
  ],
}

// Documentation Links
export const DOCUMENTATION = {
  main: '/README.md',
  deployment: '/docs/MAINNET_DEPLOYMENT_STATUS.md',
  operations: '/OPERATIONS-GUIDE.md',
  integration: '/FRONTEND-INTEGRATION.md',
  architecture: '/PROJECT_STRUCTURE.md',
}

// Helper Functions
export const getNetworkName = (chainId: number): string => {
  return chainId === 8453 ? 'Base' : chainId === 42161 ? 'Arbitrum' : 'Unknown'
}

export const getExplorerLink = (chainId: number, type: 'tx' | 'address', hash: string): string => {
  const baseUrl = chainId === 8453 ? 'https://basescan.org' : 'https://arbiscan.io'
  return `${baseUrl}/${type}/${hash}`
}

export const formatTokenAmount = (amount: string | number, decimals: number = 2): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`
  }
  return num.toFixed(decimals)
}
