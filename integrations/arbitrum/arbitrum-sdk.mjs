/**
 * Arbitrum Ecosystem Integration
 * Arbitrum SDK, bridge utilities, and Nitro tools
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * Arbitrum Network Configuration
 */
export const ArbitrumConfig = {
  one: {
    chainId: 42161,
    name: "Arbitrum One",
    rpcUrl: process.env.ARBITRUM_RPC || "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    bridges: {
      standard: "0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a", // Arbitrum Bridge
      token: "0xa3A7B6F88361F48403514059F1F16C8E78d60EeC", // Token Bridge
    },
  },
  nova: {
    chainId: 42170,
    name: "Arbitrum Nova",
    rpcUrl: process.env.ARBITRUM_NOVA_RPC || "https://nova.arbitrum.io/rpc",
    explorer: "https://nova.arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  goerli: {
    chainId: 421613,
    name: "Arbitrum Goerli",
    rpcUrl: process.env.ARBITRUM_GOERLI_RPC || "https://goerli-rollup.arbitrum.io/rpc",
    explorer: "https://goerli.arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  sepolia: {
    chainId: 421614,
    name: "Arbitrum Sepolia",
    rpcUrl: process.env.ARBITRUM_SEPOLIA_RPC || "https://sepolia-rollup.arbitrum.io/rpc",
    explorer: "https://sepolia.arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

/**
 * Get Arbitrum provider
 * @param {string} network - Network name (one, nova, goerli, sepolia)
 * @returns {object} Ethers provider
 */
export function getArbitrumProvider(network = "one") {
  const config = ArbitrumConfig[network];
  if (!config) {
    throw new Error(`Unknown Arbitrum network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get ETH balance on Arbitrum
 * @param {string} address - Arbitrum address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in ETH
 */
export async function getArbitrumETHBalance(address, provider = null) {
  if (!provider) {
    provider = getArbitrumProvider("one");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Arbitrum Bridge Integration
 */
export const ArbitrumBridge = {
  /**
   * Get bridge contract addresses
   */
  getBridgeAddresses: (network = "one") => {
    return ArbitrumConfig[network]?.bridges;
  },
  
  /**
   * Estimate bridge time
   * L1 -> L2: ~10-15 minutes
   * L2 -> L1: ~7 days (challenge period)
   */
  estimateBridgeTime: (direction) => {
    if (direction === "l1-to-l2") {
      return "10-15 minutes";
    } else if (direction === "l2-to-l1") {
      return "~7 days (challenge period)";
    }
    return "Unknown";
  },
  
  /**
   * Bridge URLs
   */
  bridgeUrl: "https://bridge.arbitrum.io/",
  docsUrl: "https://docs.arbitrum.io/",
};

/**
 * Arbitrum Gas Price (ArbGas)
 * Arbitrum uses L1 + L2 gas pricing
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Gas price breakdown
 */
export async function getArbitrumGasPrice(provider = null) {
  if (!provider) {
    provider = getArbitrumProvider("one");
  }
  
  const feeData = await provider.getFeeData();
  
  return {
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : null,
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") : null,
    note: "Arbitrum gas includes L1 data costs + L2 execution costs",
  };
}

/**
 * Arbitrum Nitro Features
 */
export const ArbitrumNitro = {
  /**
   * Check if using Nitro stack
   */
  isNitro: true, // Arbitrum One upgraded to Nitro in August 2022
  
  /**
   * Nitro improvements
   */
  features: [
    "10x faster throughput",
    "Lower gas costs",
    "EVM+ equivalence",
    "Better fraud proof system",
    "WASM-based execution",
  ],
  
  /**
   * Nitro documentation
   */
  docsUrl: "https://docs.arbitrum.io/for-devs/concepts/public-chains",
};

/**
 * Arbitrum DeFi Protocols
 */
export const ArbitrumDeFi = {
  // Uniswap V3 on Arbitrum
  uniswapV3Router: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  
  // SushiSwap on Arbitrum
  sushiswapRouter: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  
  // Camelot (Native Arbitrum DEX)
  camelotRouter: "0xc873fEcbd354f5A56E00E710B90EF4201db2448d",
  
  // GMX (Arbitrum native perpetuals)
  gmxVault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
  gmxRouter: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
  
  // Radiant Capital (Arbitrum native lending)
  radiantLending: "0xF4B1486DD74D07706052A33d31d7c0AAFD0659E1",
  
  // Aave V3 on Arbitrum
  aaveV3Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
};

/**
 * Arbitrum Stylus (WASM support)
 */
export const ArbitrumStylus = {
  /**
   * Stylus allows Rust/C++ smart contracts
   */
  info: "Stylus enables WASM-based smart contracts on Arbitrum",
  languages: ["Rust", "C", "C++"],
  docsUrl: "https://docs.arbitrum.io/stylus/stylus-gentle-introduction",
};

/**
 * Check Arbitrum transaction status
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction status
 */
export async function getArbitrumTxStatus(txHash, provider = null) {
  if (!provider) {
    provider = getArbitrumProvider("one");
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
  };
}

/**
 * Arbitrum Utilities
 */
export const ArbitrumUtils = {
  /**
   * Get block explorer URL
   */
  getExplorerUrl: (txHash, network = "one") => {
    const config = ArbitrumConfig[network];
    return `${config.explorer}/tx/${txHash}`;
  },
  
  /**
   * Get address explorer URL
   */
  getAddressExplorerUrl: (address, network = "one") => {
    const config = ArbitrumConfig[network];
    return `${config.explorer}/address/${address}`;
  },
  
  /**
   * Calculate L1 data cost (approximate)
   */
  estimateL1DataCost: (dataSize) => {
    // Rough estimate: L1 gas is more expensive
    const l1GasPerByte = 16; // Approximate
    const estimatedCost = dataSize * l1GasPerByte;
    return `~${estimatedCost} gas for L1 data`;
  },
};

/**
 * Arbitrum One Token Addresses
 */
export const ArbitrumTokens = {
  // Wrapped ETH
  WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  
  // USDC
  USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  "USDC.e": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", // Bridged USDC
  
  // USDT
  USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  
  // DAI
  DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  
  // ARB (Arbitrum governance token)
  ARB: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  
  // GMX
  GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
};

/**
 * Get Arbitrum network statistics
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Network stats
 */
export async function getArbitrumStats(provider = null) {
  if (!provider) {
    provider = getArbitrumProvider("one");
  }
  
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    getArbitrumGasPrice(provider),
  ]);
  
  return {
    network: "Arbitrum One",
    blockNumber,
    gasPrice,
    isNitro: ArbitrumNitro.isNitro,
    timestamp: new Date().toISOString(),
  };
}

export default {
  ArbitrumConfig,
  getArbitrumProvider,
  getArbitrumETHBalance,
  ArbitrumBridge,
  getArbitrumGasPrice,
  ArbitrumNitro,
  ArbitrumDeFi,
  ArbitrumStylus,
  getArbitrumTxStatus,
  ArbitrumUtils,
  ArbitrumTokens,
  getArbitrumStats,
};
