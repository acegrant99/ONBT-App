/**
 * Coinbase Developer Platform (CDP) SDK Integration
 * Provides programmatic access to Coinbase services including wallets, trades, and more
 */

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

/**
 * Initialize CDP SDK
 * @param {string} apiKeyName - Your CDP API key name
 * @param {string} privateKey - Your CDP API private key
 * @returns {Coinbase} Configured Coinbase instance
 */
export function initializeCDP(apiKeyName, privateKey) {
  const coinbase = new Coinbase({
    apiKeyName: apiKeyName || process.env.CDP_API_KEY_NAME,
    privateKey: privateKey || process.env.CDP_PRIVATE_KEY,
  });
  
  return coinbase;
}

/**
 * Create a new wallet using CDP
 * @param {Coinbase} coinbase - Initialized Coinbase instance
 * @param {string} networkId - Network ID (e.g., 'base-sepolia', 'base-mainnet')
 * @returns {Promise<Wallet>} Created wallet
 */
export async function createWallet(coinbase, networkId = "base-sepolia") {
  const wallet = await coinbase.createWallet({
    networkId: networkId,
  });
  
  console.log(`Wallet created: ${wallet.getId()}`);
  console.log(`Default address: ${await wallet.getDefaultAddress()}`);
  
  return wallet;
}

/**
 * Get wallet balance
 * @param {Wallet} wallet - Wallet instance
 * @param {string} assetId - Asset ID (e.g., 'eth', 'usdc')
 * @returns {Promise<string>} Balance
 */
export async function getBalance(wallet, assetId = "eth") {
  const balance = await wallet.getBalance(assetId);
  return balance.toString();
}

/**
 * Transfer assets from wallet
 * @param {Wallet} wallet - Source wallet
 * @param {string} destination - Destination address
 * @param {string} amount - Amount to transfer
 * @param {string} assetId - Asset ID (default: 'eth')
 * @returns {Promise<object>} Transfer result
 */
export async function transferAssets(wallet, destination, amount, assetId = "eth") {
  const transfer = await wallet.createTransfer({
    amount: amount,
    assetId: assetId,
    destination: destination,
  });
  
  await transfer.wait();
  
  return {
    transactionHash: transfer.getTransactionHash(),
    status: transfer.getStatus(),
  };
}

/**
 * Deploy a smart contract using CDP
 * @param {Wallet} wallet - Wallet to deploy from
 * @param {string} contractCode - Contract bytecode
 * @param {Array} constructorArgs - Constructor arguments
 * @returns {Promise<object>} Deployment result
 */
export async function deployContract(wallet, contractCode, constructorArgs = []) {
  const deployment = await wallet.deployContract({
    bytecode: contractCode,
    constructorArgs: constructorArgs,
  });
  
  await deployment.wait();
  
  return {
    contractAddress: deployment.getContractAddress(),
    transactionHash: deployment.getTransactionHash(),
  };
}

/**
 * Invoke a smart contract method
 * @param {Wallet} wallet - Wallet to invoke from
 * @param {string} contractAddress - Contract address
 * @param {string} method - Method name
 * @param {Array} args - Method arguments
 * @returns {Promise<object>} Invocation result
 */
export async function invokeContract(wallet, contractAddress, method, args = []) {
  const invocation = await wallet.invokeContract({
    contractAddress: contractAddress,
    method: method,
    args: args,
  });
  
  await invocation.wait();
  
  return {
    transactionHash: invocation.getTransactionHash(),
    status: invocation.getStatus(),
  };
}

/**
 * Request faucet funds (testnet only)
 * @param {Wallet} wallet - Wallet to fund
 * @returns {Promise<object>} Faucet result
 */
export async function requestFaucetFunds(wallet) {
  const faucet = await wallet.faucet();
  await faucet.wait();
  
  return {
    transactionHash: faucet.getTransactionHash(),
    amount: faucet.getAmount(),
  };
}

export default {
  initializeCDP,
  createWallet,
  getBalance,
  transferAssets,
  deployContract,
  invokeContract,
  requestFaucetFunds,
};
