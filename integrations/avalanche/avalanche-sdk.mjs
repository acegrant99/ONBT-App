/**
 * Avalanche Ecosystem Integration
 * Avalanche SDK, subnet tools, and C-Chain utilities
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * Avalanche Network Configuration
 */
export const AvalancheConfig = {
  mainnet: {
    chainId: 43114,
    name: "Avalanche C-Chain",
    rpcUrl: process.env.AVALANCHE_RPC || "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
  },
  fuji: {
    chainId: 43113,
    name: "Avalanche Fuji Testnet",
    rpcUrl: process.env.AVALANCHE_FUJI_RPC || "https://api.avax-test.network/ext/bc/C/rpc",
    explorer: "https://testnet.snowtrace.io",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
  },
};

/**
 * Get Avalanche provider
 * @param {string} network - Network name (mainnet, fuji)
 * @returns {object} Ethers provider
 */
export function getAvalancheProvider(network = "mainnet") {
  const config = AvalancheConfig[network];
  if (!config) {
    throw new Error(`Unknown Avalanche network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get AVAX balance
 * @param {string} address - Avalanche address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in AVAX
 */
export async function getAVAXBalance(address, provider = null) {
  if (!provider) {
    provider = getAvalancheProvider("mainnet");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Avalanche Primary Network Chains
 */
export const AvalancheChains = {
  /**
   * X-Chain (Exchange Chain)
   * For creating and trading assets (DAG-based)
   */
  xChain: {
    name: "X-Chain",
    purpose: "Asset creation and exchange",
    rpc: "https://api.avax.network/ext/bc/X",
  },
  
  /**
   * P-Chain (Platform Chain)
   * For staking and subnet management
   */
  pChain: {
    name: "P-Chain",
    purpose: "Staking and subnet coordination",
    rpc: "https://api.avax.network/ext/bc/P",
  },
  
  /**
   * C-Chain (Contract Chain)
   * EVM-compatible smart contract chain
   */
  cChain: {
    name: "C-Chain",
    purpose: "Smart contracts (EVM)",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
  },
};

/**
 * Avalanche Subnets
 */
export const AvalancheSubnets = {
  /**
   * Subnets are independent networks
   */
  info: "Subnets allow custom blockchain networks on Avalanche",
  
  /**
   * Popular subnets
   */
  examples: [
    { name: "DeFi Kingdoms (DFK Chain)", chainId: 53935 },
    { name: "Swimmer Network", chainId: 73772 },
    { name: "Dexalot Subnet", chainId: 432204 },
  ],
  
  /**
   * Subnet documentation
   */
  docsUrl: "https://docs.avax.network/subnets",
};

/**
 * Avalanche Consensus
 */
export const AvalancheConsensus = {
  /**
   * Avalanche uses novel consensus mechanism
   */
  mechanism: "Avalanche Consensus",
  
  /**
   * Key features
   */
  features: [
    "Sub-second finality",
    "High throughput (4,500+ TPS)",
    "Energy efficient",
    "Leaderless consensus",
    "Metastable decision making",
  ],
  
  /**
   * Documentation
   */
  docsUrl: "https://docs.avax.network/learn/avalanche/avalanche-consensus",
};

/**
 * Avalanche Gas Price
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Gas price info
 */
export async function getAvalancheGasPrice(provider = null) {
  if (!provider) {
    provider = getAvalancheProvider("mainnet");
  }
  
  const feeData = await provider.getFeeData();
  
  return {
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : null,
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") : null,
    note: "Avalanche C-Chain uses dynamic fees",
  };
}

/**
 * Avalanche DeFi Protocols
 */
export const AvalancheDeFi = {
  // Trader Joe (Native Avalanche DEX)
  traderJoeRouter: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
  traderJoeV2Router: "0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30",
  
  // Pangolin (Avalanche DEX)
  pangolinRouter: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106",
  
  // Platypus Finance (Stablecoin DEX)
  platypusRouter: "0x73256EC7575D999C360c1EeC118ECbEFd8DA7D12",
  
  // Aave V3 on Avalanche
  aaveV3Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  
  // Benqi (Avalanche native lending)
  benqiComptroller: "0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4",
  
  // Curve Finance on Avalanche
  curveRouter: "0x90f421832199e93d01b64DaF378b183809EB0988",
};

/**
 * Avalanche Bridge
 */
export const AvalancheBridge = {
  /**
   * Avalanche Bridge (AB)
   */
  bridgeUrl: "https://bridge.avax.network/",
  
  /**
   * Core Bridge (by Ava Labs)
   */
  coreUrl: "https://core.app/",
  
  /**
   * Estimate bridge time
   */
  estimateBridgeTime: () => {
    return "~2 minutes for Avalanche Bridge";
  },
  
  /**
   * Supported assets
   */
  supportedAssets: ["ETH", "WBTC", "USDC", "USDT", "DAI", "LINK", "AAVE"],
};

/**
 * Avalanche Core Wallet Integration
 */
export const AvalancheCore = {
  /**
   * Core is the official Avalanche wallet
   */
  name: "Core Wallet",
  website: "https://core.app/",
  
  /**
   * Features
   */
  features: [
    "Multi-chain support (C/P/X chains)",
    "Subnet management",
    "NFT gallery",
    "Built-in bridge",
    "Staking",
  ],
  
  /**
   * Extensions
   */
  extensions: {
    chrome: "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
  },
};

/**
 * Check Avalanche transaction status
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction status
 */
export async function getAvalancheTxStatus(txHash, provider = null) {
  if (!provider) {
    provider = getAvalancheProvider("mainnet");
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
    finality: "instant (< 1 second)",
  };
}

/**
 * Avalanche Utilities
 */
export const AvalancheUtils = {
  /**
   * Get block explorer URL
   */
  getExplorerUrl: (txHash, network = "mainnet") => {
    const config = AvalancheConfig[network];
    return `${config.explorer}/tx/${txHash}`;
  },
  
  /**
   * Get address explorer URL
   */
  getAddressExplorerUrl: (address, network = "mainnet") => {
    const config = AvalancheConfig[network];
    return `${config.explorer}/address/${address}`;
  },
  
  /**
   * Convert AVAX to nAVAX (nano AVAX)
   */
  avaxToNano: (avax) => {
    return ethers.parseEther(avax.toString());
  },
  
  /**
   * Convert nAVAX to AVAX
   */
  nanoToAvax: (nano) => {
    return ethers.formatEther(nano);
  },
};

/**
 * Avalanche Token Addresses (C-Chain)
 */
export const AvalancheTokens = {
  // Wrapped AVAX
  WAVAX: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  
  // USDC
  USDC: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  "USDC.e": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // Bridged
  
  // USDT
  USDT: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  "USDT.e": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118", // Bridged
  
  // DAI
  "DAI.e": "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  
  // WETH
  "WETH.e": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
  
  // WBTC
  "WBTC.e": "0x50b7545627a5162F82A992c33b87aDc75187B218",
  
  // JOE (TraderJoe token)
  JOE: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
  
  // QI (Benqi token)
  QI: "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5",
};

/**
 * Get Avalanche network statistics
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Network stats
 */
export async function getAvalancheStats(provider = null) {
  if (!provider) {
    provider = getAvalancheProvider("mainnet");
  }
  
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    getAvalancheGasPrice(provider),
  ]);
  
  return {
    network: "Avalanche C-Chain",
    blockNumber,
    gasPrice,
    finality: "< 1 second",
    consensus: AvalancheConsensus.mechanism,
    timestamp: new Date().toISOString(),
  };
}

export default {
  AvalancheConfig,
  getAvalancheProvider,
  getAVAXBalance,
  AvalancheChains,
  AvalancheSubnets,
  AvalancheConsensus,
  getAvalancheGasPrice,
  AvalancheDeFi,
  AvalancheBridge,
  AvalancheCore,
  getAvalancheTxStatus,
  AvalancheUtils,
  AvalancheTokens,
  getAvalancheStats,
};
