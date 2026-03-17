import { base, arbitrum } from 'wagmi/chains'

// Chain IDs
export const CHAINS = {
  BASE: 8453,
  ARBITRUM: 42161,
} as const

export type ChainId = typeof CHAINS[keyof typeof CHAINS]

// Network configurations
export const getNetworkConfig = (chainId: number) => {
  switch (chainId) {
    case CHAINS.BASE:
      return {
        chainId: CHAINS.BASE,
        name: 'Base',
        rpcUrl: 'https://mainnet.base.org',
        blockExplorer: 'https://basescan.org',
      }
    case CHAINS.ARBITRUM:
      return {
        chainId: CHAINS.ARBITRUM,
        name: 'Arbitrum',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        blockExplorer: 'https://arbiscan.io',
      }
    default:
      return {
        chainId: CHAINS.BASE,
        name: 'Base',
        rpcUrl: 'https://mainnet.base.org',
        blockExplorer: 'https://basescan.org',
      }
  }
}

// Contract addresses from deployment files
// Base deployment (deployment-lzv2-resume-base-stakingfix-1771584423316.json)
const BASE_CONTRACTS = {
  onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
  vault: '0xFd06Ecbd22b208f398E4d822904F7114642eF9b9',
  staking: '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe',
  achievementNFT: '0x11EEEB62b2b2B66475642f82502989D671fC5855',
  rewardsPool: '0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85',
  yieldDistributor: '0x8c91384EbF767C1C434d127c82020380F4A8afC7',
  stakingRouter: '0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B',
  governor: '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9',
  liquidityManager: '0xb362Af3da1497A551C08F79bC03CbA12D2b7e908',
  insuranceFund: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
  stabilizer: '0x26D75024c2491636a1A1145a3d6966788EF54667',
  incentiveController: '0x7b06795D31482fef0213b24E8ad5f348692A73BD',
  revenueRouter: '0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0',
}

// Arbitrum deployment (deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json)
const ARBITRUM_CONTRACTS = {
  onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
  vault: '0x85fE97c69350Be8B9A6bC026006907E34324CD6A',
  staking: '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44',
  achievementNFT: '0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb',
  rewardsPool: '0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1',
  yieldDistributor: '0x2085ca5081480e8634eF4295ef477fe8cE97B892',
  stakingRouter: '0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64',
  governor: '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854',
  liquidityManager: '0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3',
  insuranceFund: '0x85BB4B6268446a71110db6f296885AA1EE36c695',
  stabilizer: '0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587',
  incentiveController: '0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50',
  revenueRouter: '0xa66CA14df740B142d8E2DE515A8743ad1eE25850',
}

// Get contract addresses by chain ID
export const getContractAddresses = (chainId: number) => {
  if (chainId === CHAINS.ARBITRUM) {
    return ARBITRUM_CONTRACTS
  }
  // Default to Base
  return BASE_CONTRACTS
}

// Export chains for Wagmi configuration
export const baseChain = base
export const arbitrumChain = arbitrum

export const SUPPORTED_CHAINS = [base, arbitrum] as const

// Token metadata for wallet integrations
export const TOKEN_METADATA = {
  [CHAINS.BASE]: {
    address: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    symbol: 'ONBT',
    decimals: 18,
    name: 'ONBT Token',
    logo: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafkreigjb7v4h7ttwigkjxwlz357iml5h7njn7thtwnljor5e5m527cghq',
  },
  [CHAINS.ARBITRUM]: {
    address: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    symbol: 'ONBT',
    decimals: 18,
    name: 'ONBT Token',
    logo: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafkreigjb7v4h7ttwigkjxwlz357iml5h7njn7thtwnljor5e5m527cghq',
  },
} as const
