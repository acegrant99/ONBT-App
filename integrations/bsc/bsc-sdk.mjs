/**
 * BSC (BNB Chain) Ecosystem Integration
 * BSC SDK, bridge utilities, and BNB Chain tools
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * BSC Network Configuration
 */
export const BSCConfig = {
  mainnet: {
    chainId: 56,
    name: "BNB Smart Chain",
    rpcUrl: process.env.BSC_RPC || "https://bsc-dataseed1.binance.org",
    explorer: "https://bscscan.com",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
  testnet: {
    chainId: 97,
    name: "BSC Testnet",
    rpcUrl: process.env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545",
    explorer: "https://testnet.bscscan.com",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
  opBNB: {
    chainId: 204,
    name: "opBNB Mainnet",
    rpcUrl: process.env.OPBNB_RPC || "https://opbnb-mainnet-rpc.bnbchain.org",
    explorer: "https://opbnbscan.com",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
};

/**
 * Get BSC provider
 * @param {string} network - Network name (mainnet, testnet, opBNB)
 * @returns {object} Ethers provider
 */
export function getBSCProvider(network = "mainnet") {
  const config = BSCConfig[network];
  if (!config) {
    throw new Error(`Unknown BSC network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get BNB balance
 * @param {string} address - BSC address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in BNB
 */
export async function getBNBBalance(address, provider = null) {
  if (!provider) {
    provider = getBSCProvider("mainnet");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * BSC Bridge Integration
 */
export const BSCBridge = {
  /**
   * Binance Bridge
   */
  binanceBridgeUrl: "https://www.binance.com/en/bridge",
  
  /**
   * Cross-chain bridges
   */
  bridges: {
    celer: "https://cbridge.celer.network/",
    multichain: "https://multichain.org/",
    stargate: "https://stargate.finance/",
  },
  
  /**
   * Estimate bridge time
   */
  estimateBridgeTime: () => {
    return "~3-5 minutes for most bridges";
  },
  
  /**
   * Token standards
   */
  tokenStandards: {
    BEP20: "BSC token standard (similar to ERC20)",
    BEP721: "BSC NFT standard (similar to ERC721)",
    BEP1155: "BSC multi-token standard (similar to ERC1155)",
  },
};

/**
 * BSC Gas Price (dynamic fees)
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Gas price info
 */
export async function getBSCGasPrice(provider = null) {
  if (!provider) {
    provider = getBSCProvider("mainnet");
  }
  
  const feeData = await provider.getFeeData();
  
  return {
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : null,
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") : null,
    note: "BSC uses EIP-1559 style dynamic fees",
  };
}

/**
 * BSC DeFi Protocols
 */
export const BSCDeFi = {
  // PancakeSwap (Largest BSC DEX)
  pancakeSwapRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  pancakeSwapV3Router: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
  
  // BiSwap
  biswapRouter: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
  
  // Venus Protocol (Lending)
  venusComptroller: "0xfD36E2c2a6789Db23113685031d7F16329158384",
  
  // Alpaca Finance (Leveraged yield farming)
  alpacaLending: "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F",
  
  // Thena (Ve(3,3) DEX)
  thenaRouter: "0xd4ae6eCA985340Dd434D38F470aCCce4DC78D109",
};

/**
 * BNB Beacon Chain Integration
 */
export const BNBBeaconChain = {
  /**
   * Original Binance Chain (now called Beacon Chain)
   */
  name: "BNB Beacon Chain",
  chainId: "Binance-Chain-Tigris",
  
  /**
   * Purpose
   */
  purpose: "Fast, decentralized exchange (DEX)",
  
  /**
   * Relationship to BSC
   */
  relationship: "BSC and Beacon Chain can communicate via cross-chain bridges",
  
  /**
   * Documentation
   */
  docsUrl: "https://docs.bnbchain.org/docs/beaconchain/learn/intro",
};

/**
 * opBNB Layer 2
 */
export const opBNB = {
  /**
   * opBNB is BSC's Layer 2 solution
   */
  name: "opBNB",
  type: "Optimistic Rollup (OP Stack)",
  
  /**
   * Features
   */
  features: [
    "Lower gas fees (~$0.001 per tx)",
    "Higher throughput",
    "EVM compatible",
    "Built on OP Stack",
  ],
  
  /**
   * Bridge
   */
  bridgeUrl: "https://opbnb-bridge.bnbchain.org/",
  
  /**
   * Documentation
   */
  docsUrl: "https://docs.bnbchain.org/opbnb-docs/",
};

/**
 * BSC Validators and Staking
 */
export const BSCStaking = {
  /**
   * BSC uses Proof of Staked Authority (PoSA)
   */
  consensus: "Proof of Staked Authority (PoSA)",
  
  /**
   * Number of validators
   */
  validators: 21, // Active validators
  
  /**
   * Staking info
   */
  stakingUrl: "https://www.binance.com/en/staking",
  
  /**
   * Validator requirements
   */
  requirements: {
    minStake: "10,000 BNB",
    hardware: "High-performance servers",
  },
};

/**
 * Check BSC transaction status
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction status
 */
export async function getBSCTxStatus(txHash, provider = null) {
  if (!provider) {
    provider = getBSCProvider("mainnet");
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
    blockTime: "~3 seconds",
  };
}

/**
 * BSC Utilities
 */
export const BSCUtils = {
  /**
   * Get block explorer URL
   */
  getExplorerUrl: (txHash, network = "mainnet") => {
    const config = BSCConfig[network];
    return `${config.explorer}/tx/${txHash}`;
  },
  
  /**
   * Get address explorer URL
   */
  getAddressExplorerUrl: (address, network = "mainnet") => {
    const config = BSCConfig[network];
    return `${config.explorer}/address/${address}`;
  },
  
  /**
   * Convert BNB to Wei
   */
  bnbToWei: (bnb) => {
    return ethers.parseEther(bnb.toString());
  },
  
  /**
   * Convert Wei to BNB
   */
  weiToBnb: (wei) => {
    return ethers.formatEther(wei);
  },
  
  /**
   * Check if address is contract
   */
  isContract: async (address, provider = null) => {
    if (!provider) provider = getBSCProvider("mainnet");
    const code = await provider.getCode(address);
    return code !== "0x";
  },
};

/**
 * BSC Token Addresses
 */
export const BSCTokens = {
  // Wrapped BNB
  WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  
  // USDT
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  
  // USDC
  USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  
  // BUSD (Binance USD)
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  
  // DAI
  DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  
  // ETH (Binance-Peg)
  ETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  
  // BTCB (Bitcoin BEP2)
  BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  
  // CAKE (PancakeSwap)
  CAKE: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  
  // ADA (Cardano)
  ADA: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
};

/**
 * BSC GameFi and Metaverse
 */
export const BSCGameFi = {
  /**
   * Popular GameFi projects on BSC
   */
  projects: [
    "MOBOX",
    "My DeFi Pet",
    "X World Games",
    "Era7: Game of Truth",
  ],
  
  /**
   * GameFi hub
   */
  gameFiUrl: "https://www.bnbchain.org/en/gamefi",
};

/**
 * Get BSC network statistics
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Network stats
 */
export async function getBSCStats(provider = null) {
  if (!provider) {
    provider = getBSCProvider("mainnet");
  }
  
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    getBSCGasPrice(provider),
  ]);
  
  return {
    network: "BNB Smart Chain",
    blockNumber,
    gasPrice,
    blockTime: "~3 seconds",
    consensus: BSCStaking.consensus,
    validators: BSCStaking.validators,
    timestamp: new Date().toISOString(),
  };
}

export default {
  BSCConfig,
  getBSCProvider,
  getBNBBalance,
  BSCBridge,
  getBSCGasPrice,
  BSCDeFi,
  BNBBeaconChain,
  opBNB,
  BSCStaking,
  getBSCTxStatus,
  BSCUtils,
  BSCTokens,
  BSCGameFi,
  getBSCStats,
};
