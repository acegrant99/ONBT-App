/**
 * Optimism Ecosystem Integration
 * Optimism SDK, bridge, and Superchain utilities
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * Optimism Network Configuration
 */
export const OptimismConfig = {
  mainnet: {
    chainId: 10,
    name: "Optimism Mainnet",
    rpcUrl: process.env.OPTIMISM_RPC || "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    bridges: {
      standard: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1", // Standard Bridge
      optimismPortal: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed", // Optimism Portal
    },
  },
  goerli: {
    chainId: 420,
    name: "Optimism Goerli",
    rpcUrl: process.env.OPTIMISM_GOERLI_RPC || "https://goerli.optimism.io",
    explorer: "https://goerli-optimism.etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  sepolia: {
    chainId: 11155420,
    name: "Optimism Sepolia",
    rpcUrl: process.env.OPTIMISM_SEPOLIA_RPC || "https://sepolia.optimism.io",
    explorer: "https://sepolia-optimism.etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

/**
 * Get Optimism provider
 * @param {string} network - Network name (mainnet, goerli, sepolia)
 * @returns {object} Ethers provider
 */
export function getOptimismProvider(network = "mainnet") {
  const config = OptimismConfig[network];
  if (!config) {
    throw new Error(`Unknown Optimism network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get ETH balance on Optimism
 * @param {string} address - Optimism address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in ETH
 */
export async function getOptimismETHBalance(address, provider = null) {
  if (!provider) {
    provider = getOptimismProvider("mainnet");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Optimism Bridge Integration
 */
export const OptimismBridge = {
  /**
   * Get bridge contract addresses
   */
  getBridgeAddresses: (network = "mainnet") => {
    return OptimismConfig[network]?.bridges;
  },
  
  /**
   * Estimate bridge time
   * L1 -> L2: ~1-3 minutes (instant after Bedrock)
   * L2 -> L1: ~7 days (challenge period)
   */
  estimateBridgeTime: (direction) => {
    if (direction === "l1-to-l2") {
      return "1-3 minutes (instant after confirmation)";
    } else if (direction === "l2-to-l1") {
      return "~7 days (challenge period)";
    }
    return "Unknown";
  },
  
  /**
   * Bridge URLs
   */
  bridgeUrl: "https://app.optimism.io/bridge",
  docsUrl: "https://docs.optimism.io/",
};

/**
 * Optimism Gas Price (L1 + L2 costs)
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Gas price breakdown
 */
export async function getOptimismGasPrice(provider = null) {
  if (!provider) {
    provider = getOptimismProvider("mainnet");
  }
  
  const feeData = await provider.getFeeData();
  
  return {
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : null,
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") : null,
    note: "Optimism gas includes L1 data costs + L2 execution costs",
  };
}

/**
 * Optimism Bedrock Upgrade Features
 */
export const OptimismBedrock = {
  /**
   * Bedrock is Optimism's latest upgrade
   */
  upgraded: true, // Upgraded June 2023
  
  /**
   * Bedrock improvements
   */
  features: [
    "Lower gas fees (up to 40% reduction)",
    "Faster deposits (~1 minute vs 10-20 minutes)",
    "Improved EVM equivalence",
    "Modular architecture",
    "Part of OP Stack for Superchain",
  ],
  
  /**
   * Documentation
   */
  docsUrl: "https://docs.optimism.io/stack/protocol/overview",
};

/**
 * Optimism Superchain
 */
export const OptimismSuperchain = {
  /**
   * Superchain networks (OP Stack chains)
   */
  networks: [
    { name: "Optimism", chainId: 10 },
    { name: "Base", chainId: 8453 },
    { name: "OP Mainnet", chainId: 10 },
    { name: "Zora", chainId: 7777777 },
    { name: "Mode", chainId: 34443 },
  ],
  
  /**
   * Superchain features
   */
  features: [
    "Shared security model",
    "Cross-chain messaging",
    "Unified governance (OP token)",
    "Standardized OP Stack",
  ],
  
  /**
   * Superchain documentation
   */
  docsUrl: "https://docs.optimism.io/stack/explainer",
};

/**
 * Optimism DeFi Protocols
 */
export const OptimismDeFi = {
  // Uniswap V3 on Optimism
  uniswapV3Router: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  
  // Velodrome (Native Optimism DEX)
  velodromeRouter: "0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858",
  
  // Synthetix (Native to Optimism)
  synthetixCore: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
  
  // Aave V3 on Optimism
  aaveV3Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  
  // Curve Finance on Optimism
  curveRouter: "0x0DCCED1146EA4dCdF2e56089dc95DcA6e5D60c29",
};

/**
 * Optimism Attestation Station
 */
export const OptimismAttestation = {
  /**
   * On-chain attestations for identity/reputation
   */
  address: "0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77",
  
  /**
   * Use cases
   */
  useCases: [
    "Identity verification",
    "Reputation systems",
    "Credentials",
    "Social graphs",
  ],
  
  /**
   * Documentation
   */
  docsUrl: "https://docs.optimism.io/chain/identity/about-attestations",
};

/**
 * Check Optimism transaction status
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction status
 */
export async function getOptimismTxStatus(txHash, provider = null) {
  if (!provider) {
    provider = getOptimismProvider("mainnet");
  }
  
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt) {
    return { status: "pending", receipt: null };
  }
  
  return {
    status: receipt.status === 1 ? "success" : "failed",
    receipt,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    l1GasCost: "Check L1 data fee in receipt",
  };
}

/**
 * Optimism Utilities
 */
export const OptimismUtils = {
  /**
   * Get block explorer URL
   */
  getExplorerUrl: (txHash, network = "mainnet") => {
    const config = OptimismConfig[network];
    return `${config.explorer}/tx/${txHash}`;
  },
  
  /**
   * Get address explorer URL
   */
  getAddressExplorerUrl: (address, network = "mainnet") => {
    const config = OptimismConfig[network];
    return `${config.explorer}/address/${address}`;
  },
  
  /**
   * Check if part of Superchain
   */
  isSuperchainMember: (chainId) => {
    return OptimismSuperchain.networks.some(n => n.chainId === chainId);
  },
};

/**
 * Optimism Token Addresses
 */
export const OptimismTokens = {
  // Wrapped ETH
  WETH: "0x4200000000000000000000000000000000000006",
  
  // USDC
  USDC: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  "USDC.e": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", // Bridged USDC
  
  // USDT
  USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  
  // DAI
  DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  
  // OP (Optimism governance token)
  OP: "0x4200000000000000000000000000000000000042",
  
  // SNX (Synthetix)
  SNX: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
  
  // VELO (Velodrome)
  VELO: "0x3c8B650257cFb5f272f799F5e2b4e65093a11a05",
};

/**
 * Get Optimism network statistics
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Network stats
 */
export async function getOptimismStats(provider = null) {
  if (!provider) {
    provider = getOptimismProvider("mainnet");
  }
  
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    getOptimismGasPrice(provider),
  ]);
  
  return {
    network: "Optimism Mainnet",
    blockNumber,
    gasPrice,
    isBedrock: OptimismBedrock.upgraded,
    isSuperchain: true,
    timestamp: new Date().toISOString(),
  };
}

export default {
  OptimismConfig,
  getOptimismProvider,
  getOptimismETHBalance,
  OptimismBridge,
  getOptimismGasPrice,
  OptimismBedrock,
  OptimismSuperchain,
  OptimismDeFi,
  OptimismAttestation,
  getOptimismTxStatus,
  OptimismUtils,
  OptimismTokens,
  getOptimismStats,
};
