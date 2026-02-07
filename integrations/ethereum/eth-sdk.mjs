/**
 * Ethereum Ecosystem Integration
 * Web3 utilities, ENS, and Ethereum-specific tools
 */

import hre from "hardhat";
const { ethers } = hre;

/**
 * Ethereum Network Configuration
 */
export const EthereumConfig = {
  mainnet: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: process.env.ETHEREUM_RPC || "https://eth-mainnet.g.alchemy.com/v2/your-api-key",
    explorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  goerli: {
    chainId: 5,
    name: "Goerli Testnet",
    rpcUrl: process.env.GOERLI_RPC || "https://goerli.infura.io/v3/your-api-key",
    explorer: "https://goerli.etherscan.io",
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: process.env.SEPOLIA_RPC || "https://sepolia.infura.io/v3/your-api-key",
    explorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

/**
 * Get Ethereum provider
 * @param {string} network - Network name (mainnet, goerli, sepolia)
 * @returns {object} Ethers provider
 */
export function getEthereumProvider(network = "mainnet") {
  const config = EthereumConfig[network];
  if (!config) {
    throw new Error(`Unknown Ethereum network: ${network}`);
  }
  
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  return provider;
}

/**
 * Get ENS name for an address
 * @param {string} address - Ethereum address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string|null>} ENS name or null
 */
export async function getENSName(address, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  try {
    const name = await provider.lookupAddress(address);
    return name;
  } catch (error) {
    console.error("ENS lookup failed:", error.message);
    return null;
  }
}

/**
 * Resolve ENS name to address
 * @param {string} ensName - ENS name (e.g., "vitalik.eth")
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string|null>} Ethereum address or null
 */
export async function resolveENS(ensName, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  try {
    const address = await provider.resolveName(ensName);
    return address;
  } catch (error) {
    console.error("ENS resolution failed:", error.message);
    return null;
  }
}

/**
 * Get ETH balance
 * @param {string} address - Ethereum address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Balance in ETH
 */
export async function getETHBalance(address, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Get gas price
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Gas price info
 */
export async function getGasPrice(provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  const feeData = await provider.getFeeData();
  
  return {
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : null,
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") : null,
  };
}

/**
 * Get block number
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<number>} Current block number
 */
export async function getBlockNumber(provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  return await provider.getBlockNumber();
}

/**
 * Get transaction receipt
 * @param {string} txHash - Transaction hash
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction receipt
 */
export async function getTransactionReceipt(txHash, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  return await provider.getTransactionReceipt(txHash);
}

/**
 * Wait for transaction confirmation
 * @param {string} txHash - Transaction hash
 * @param {number} confirmations - Number of confirmations to wait for
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<object>} Transaction receipt
 */
export async function waitForTransaction(txHash, confirmations = 1, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  console.log(`Waiting for ${confirmations} confirmation(s)...`);
  const receipt = await provider.waitForTransaction(txHash, confirmations);
  console.log("Transaction confirmed!");
  return receipt;
}

/**
 * Estimate gas for transaction
 * @param {object} transaction - Transaction object
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Estimated gas
 */
export async function estimateGas(transaction, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  const gasEstimate = await provider.estimateGas(transaction);
  return gasEstimate.toString();
}

/**
 * Get ERC20 token balance
 * @param {string} tokenAddress - ERC20 token contract address
 * @param {string} holderAddress - Address to check balance for
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} Token balance
 */
export async function getERC20Balance(tokenAddress, holderAddress, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  const abi = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  
  const [balance, decimals] = await Promise.all([
    contract.balanceOf(holderAddress),
    contract.decimals()
  ]);
  
  return ethers.formatUnits(balance, decimals);
}

/**
 * Get ERC721 (NFT) balance
 * @param {string} nftAddress - ERC721 contract address
 * @param {string} ownerAddress - Owner address
 * @param {object} provider - Ethers provider (optional)
 * @returns {Promise<string>} NFT count
 */
export async function getERC721Balance(nftAddress, ownerAddress, provider = null) {
  if (!provider) {
    provider = getEthereumProvider("mainnet");
  }
  
  const abi = ["function balanceOf(address) view returns (uint256)"];
  const contract = new ethers.Contract(nftAddress, abi, provider);
  
  const balance = await contract.balanceOf(ownerAddress);
  return balance.toString();
}

/**
 * Ethereum DeFi Integration Examples
 */
export const EthereumDeFi = {
  // Uniswap V3 Router address
  uniswapV3Router: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  
  // Aave V3 Pool address
  aaveV3Pool: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  
  // Curve Finance Registry
  curveRegistry: "0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5",
  
  // 1inch Router
  oneInchRouter: "0x1111111254EEB25477B68fb85Ed929f73A960582",
};

/**
 * Ethereum Utilities
 */
export const EthereumUtils = {
  /**
   * Check if address is a contract
   */
  isContract: async (address, provider = null) => {
    if (!provider) provider = getEthereumProvider("mainnet");
    const code = await provider.getCode(address);
    return code !== "0x";
  },
  
  /**
   * Format address for display
   */
  formatAddress: (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },
  
  /**
   * Validate Ethereum address
   */
  isValidAddress: (address) => {
    return ethers.isAddress(address);
  },
};

export default {
  EthereumConfig,
  getEthereumProvider,
  getENSName,
  resolveENS,
  getETHBalance,
  getGasPrice,
  getBlockNumber,
  getTransactionReceipt,
  waitForTransaction,
  estimateGas,
  getERC20Balance,
  getERC721Balance,
  EthereumDeFi,
  EthereumUtils,
};
