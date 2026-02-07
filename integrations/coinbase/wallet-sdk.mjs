/**
 * Coinbase Wallet SDK Integration
 * Connect to Coinbase Wallet from your dApp
 */

import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

/**
 * Initialize Coinbase Wallet SDK
 * @param {object} config - Configuration options
 * @returns {CoinbaseWalletSDK} SDK instance
 */
export function initializeWalletSDK(config = {}) {
  const {
    appName = "Nabat Omnichain dApp",
    appLogoUrl = "",
    darkMode = false,
  } = config;

  const sdk = new CoinbaseWalletSDK({
    appName: appName,
    appLogoUrl: appLogoUrl,
    darkMode: darkMode,
  });

  return sdk;
}

/**
 * Create Ethereum provider
 * @param {CoinbaseWalletSDK} sdk - Wallet SDK instance
 * @param {object} options - Provider options
 * @returns {object} Ethereum provider
 */
export function createProvider(sdk, options = {}) {
  const {
    chainId = 8453, // Base mainnet
    jsonRpcUrl = "https://mainnet.base.org",
  } = options;

  const provider = sdk.makeWeb3Provider(jsonRpcUrl, chainId);
  return provider;
}

/**
 * Connect to Coinbase Wallet
 * @param {object} provider - Ethereum provider
 * @returns {Promise<Array<string>>} Connected accounts
 */
export async function connectWallet(provider) {
  try {
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    
    console.log("Connected accounts:", accounts);
    return accounts;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
}

/**
 * Get current account
 * @param {object} provider - Ethereum provider
 * @returns {Promise<string>} Current account address
 */
export async function getCurrentAccount(provider) {
  const accounts = await provider.request({
    method: "eth_accounts",
  });
  return accounts[0];
}

/**
 * Get account balance
 * @param {object} provider - Ethereum provider
 * @param {string} address - Account address
 * @returns {Promise<string>} Balance in wei
 */
export async function getBalance(provider, address) {
  const balance = await provider.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  return balance;
}

/**
 * Switch network
 * @param {object} provider - Ethereum provider
 * @param {number} chainId - Target chain ID
 * @returns {Promise<void>}
 */
export async function switchNetwork(provider, chainId) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    // If network doesn't exist, add it
    if (error.code === 4902) {
      await addNetwork(provider, chainId);
    } else {
      throw error;
    }
  }
}

/**
 * Add network to wallet
 * @param {object} provider - Ethereum provider
 * @param {number} chainId - Chain ID
 * @returns {Promise<void>}
 */
export async function addNetwork(provider, chainId) {
  const networks = {
    8453: {
      chainId: "0x2105",
      chainName: "Base",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"],
    },
    84532: {
      chainId: "0x14a34",
      chainName: "Base Sepolia",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.base.org"],
      blockExplorerUrls: ["https://sepolia.basescan.org"],
    },
  };

  const networkConfig = networks[chainId];
  if (!networkConfig) {
    throw new Error(`Network ${chainId} not configured`);
  }

  await provider.request({
    method: "wallet_addEthereumChain",
    params: [networkConfig],
  });
}

/**
 * Send transaction
 * @param {object} provider - Ethereum provider
 * @param {object} transaction - Transaction object
 * @returns {Promise<string>} Transaction hash
 */
export async function sendTransaction(provider, transaction) {
  const txHash = await provider.request({
    method: "eth_sendTransaction",
    params: [transaction],
  });
  return txHash;
}

/**
 * Sign message
 * @param {object} provider - Ethereum provider
 * @param {string} message - Message to sign
 * @param {string} address - Signer address
 * @returns {Promise<string>} Signature
 */
export async function signMessage(provider, message, address) {
  const signature = await provider.request({
    method: "personal_sign",
    params: [message, address],
  });
  return signature;
}

/**
 * Watch for account changes
 * @param {object} provider - Ethereum provider
 * @param {Function} callback - Callback function
 */
export function onAccountsChanged(provider, callback) {
  provider.on("accountsChanged", callback);
}

/**
 * Watch for chain changes
 * @param {object} provider - Ethereum provider
 * @param {Function} callback - Callback function
 */
export function onChainChanged(provider, callback) {
  provider.on("chainChanged", callback);
}

/**
 * Disconnect wallet
 * @param {object} provider - Ethereum provider
 */
export function disconnect(provider) {
  provider.disconnect();
  console.log("Wallet disconnected");
}

/**
 * Complete wallet integration example
 * @returns {object} Wallet integration utilities
 */
export function createWalletIntegration() {
  const sdk = initializeWalletSDK();
  const provider = createProvider(sdk, {
    chainId: 8453, // Base mainnet
    jsonRpcUrl: "https://mainnet.base.org",
  });

  return {
    sdk,
    provider,
    connect: () => connectWallet(provider),
    disconnect: () => disconnect(provider),
    getAccount: () => getCurrentAccount(provider),
    getBalance: (address) => getBalance(provider, address),
    switchNetwork: (chainId) => switchNetwork(provider, chainId),
    sendTransaction: (tx) => sendTransaction(provider, tx),
    signMessage: (msg, addr) => signMessage(provider, msg, addr),
    onAccountsChanged: (cb) => onAccountsChanged(provider, cb),
    onChainChanged: (cb) => onChainChanged(provider, cb),
  };
}

export default {
  initializeWalletSDK,
  createProvider,
  connectWallet,
  getCurrentAccount,
  getBalance,
  switchNetwork,
  addNetwork,
  sendTransaction,
  signMessage,
  onAccountsChanged,
  onChainChanged,
  disconnect,
  createWalletIntegration,
};
