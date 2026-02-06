/**
 * Polygon Ecosystem Integration
 * Polygon SDK, PoS bridge, and Polygon-specific tools
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * Polygon Network Configuration
 */
export const PolygonConfig = {
  mainnet: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpcUrl: process.env.POLYGON_RPC || "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    bridges: {
      pos: "0xA0c68C638235ee32657e8f720a23ceC1bFc77C77", // PoS Bridge
      plasma: "0x401F6c983eA34274ec46f84D70b31C151321188b", // Plasma Bridge
    },
  },
  mumbai: {
    chainId: 80001,
    name: "Mumbai Testnet",
    rpcUrl: process.env.MUMBAI_RPC || "https://rpc-mumbai.maticvigil.com",
    explorer: "https://mumbai.polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  zkEVM: {
    chainId: 1101,
    name: "Polygon zkEVM",
    rpcUrl: process.env.POLYGON_ZKEVM_RPC || "https://zkevm-rpc.com",
    explorer: "https://zkevm.polygonscan.com",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

/**
 * Get Polygon provider
 * @param {string} network - Network name (mainnet, mumbai, zkEVM)
 * @returns {object} Ethers provider
 */
export function getPolygonProvider(network = "mainnet") {
  const config = PolygonConfig[network];
  if (!config) {
    throw new Error(`Unknown Polygon network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get MATIC balance
 * @param {string} address - Polygon address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in MATIC
 */
export async function getMATICBalance(address, provider = null) {
  if (!provider) {
    provider = getPolygonProvider("mainnet");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Polygon PoS Bridge Integration
 */
export const PolygonBridge = {
  /**
   * Get bridge contract address
   */
  getBridgeAddress: (network = "mainnet") => {
    return PolygonConfig[network]?.bridges?.pos;
  },
  
  /**
   * Estimate bridge time
   * Ethereum -> Polygon: ~7-8 minutes
   * Polygon -> Ethereum: ~3 hours (checkpoint submission)
   */
  estimateBridgeTime: (direction) => {
    if (direction === "eth-to-polygon") {
      return "7-8 minutes";
    } else if (direction === "polygon-to-eth") {
      return "~3 hours";
    }
    return "Unknown";
  },
};

/**
 * Polygon Gas Station - Get recommended gas prices
 * @returns {Promise<object>} Gas price recommendations
 */
export async function getPolygonGasPrice() {
  try {
    const response = await fetch("https://gasstation.polygon.technology/v2");
    const data = await response.json();
    
    return {
      safeLow: data.safeLow?.maxFee || null,
      standard: data.standard?.maxFee || null,
      fast: data.fast?.maxFee || null,
      estimatedBaseFee: data.estimatedBaseFee || null,
      blockTime: data.blockTime || null,
      blockNumber: data.blockNumber || null,
    };
  } catch (error) {
    console.error("Failed to fetch Polygon gas prices:", error.message);
    return null;
  }
}

/**
 * Check if transaction is finalized on Polygon
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<boolean>} True if finalized
 */
export async function isTransactionFinalized(txHash, provider = null) {
  if (!provider) {
    provider = getPolygonProvider("mainnet");
  }
  
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt) return false;
  
  const currentBlock = await provider.getBlockNumber();
  const confirmations = currentBlock - receipt.blockNumber;
  
  // Consider finalized after 128 blocks (~4 minutes on Polygon)
  return confirmations >= 128;
}

/**
 * Polygon DeFi Protocols
 */
export const PolygonDeFi = {
  // QuickSwap (DEX)
  quickswapRouter: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
  
  // Aave V3 on Polygon
  aaveV3Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  
  // Curve Finance on Polygon
  curveRouter: "0x094d12e5b541784701FD8d65F11fc0598FBC6332",
  
  // Balancer Vault
  balancerVault: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
};

/**
 * Polygon zkEVM Utilities
 */
export const PolygonZkEVM = {
  /**
   * Check if address is on zkEVM
   */
  isZkEVMAddress: async (address, provider = null) => {
    if (!provider) provider = getPolygonProvider("zkEVM");
    try {
      await provider.getBalance(address);
      return true;
    } catch {
      return false;
    }
  },
  
  /**
   * Get zkEVM bridge status
   */
  bridgeUrl: "https://bridge.zkevm.polygon.technology/",
};

/**
 * Polygon Utilities
 */
export const PolygonUtils = {
  /**
   * Convert MATIC to Wei
   */
  maticToWei: (matic) => {
    return ethers.parseEther(matic.toString());
  },
  
  /**
   * Convert Wei to MATIC
   */
  weiToMatic: (wei) => {
    return ethers.formatEther(wei);
  },
  
  /**
   * Get block explorer URL
   */
  getExplorerUrl: (txHash, network = "mainnet") => {
    const config = PolygonConfig[network];
    return `${config.explorer}/tx/${txHash}`;
  },
  
  /**
   * Get address explorer URL
   */
  getAddressExplorerUrl: (address, network = "mainnet") => {
    const config = PolygonConfig[network];
    return `${config.explorer}/address/${address}`;
  },
};

/**
 * Polygon Token Standards
 */
export const PolygonTokens = {
  // Wrapped MATIC
  WMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  
  // USDC on Polygon
  USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  
  // USDT on Polygon
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  
  // DAI on Polygon
  DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  
  // WETH on Polygon
  WETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
};

/**
 * Monitor Polygon network status
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Network status
 */
export async function getPolygonNetworkStatus(provider = null) {
  if (!provider) {
    provider = getPolygonProvider("mainnet");
  }
  
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    getPolygonGasPrice(),
  ]);
  
  return {
    blockNumber,
    gasPrice,
    isHealthy: blockNumber > 0,
    timestamp: new Date().toISOString(),
  };
}

export default {
  PolygonConfig,
  getPolygonProvider,
  getMATICBalance,
  PolygonBridge,
  getPolygonGasPrice,
  isTransactionFinalized,
  PolygonDeFi,
  PolygonZkEVM,
  PolygonUtils,
  PolygonTokens,
  getPolygonNetworkStatus,
};
