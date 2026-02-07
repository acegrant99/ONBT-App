/**
 * Coinbase AgentKit Integration
 * Build AI agents that can interact with blockchain
 */

import { CdpAgentkit } from "@coinbase/agentkit";
import { initializeCDP } from "./cdp-sdk.mjs";

/**
 * Initialize AgentKit with CDP
 * @param {object} config - Configuration object
 * @param {string} config.apiKeyName - CDP API key name
 * @param {string} config.privateKey - CDP private key
 * @param {string} config.networkId - Network ID (default: base-sepolia)
 * @returns {Promise<CdpAgentkit>} Initialized AgentKit instance
 */
export async function initializeAgentKit(config = {}) {
  const {
    apiKeyName = process.env.CDP_API_KEY_NAME,
    privateKey = process.env.CDP_PRIVATE_KEY,
    networkId = "base-sepolia",
  } = config;

  // Initialize CDP
  const cdp = initializeCDP(apiKeyName, privateKey);
  
  // Create AgentKit instance
  const agentkit = await CdpAgentkit.configureWithWallet({
    cdp: cdp,
    networkId: networkId,
  });

  console.log("AgentKit initialized successfully");
  console.log(`Network: ${networkId}`);
  console.log(`Wallet address: ${await agentkit.wallet.getDefaultAddress()}`);

  return agentkit;
}

/**
 * Create an agent action for token deployment
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @param {object} tokenConfig - Token configuration
 * @returns {Promise<object>} Deployment result
 */
export async function deployTokenWithAgent(agentkit, tokenConfig) {
  const { name, symbol, initialSupply } = tokenConfig;
  
  const action = await agentkit.deployToken({
    name: name,
    symbol: symbol,
    totalSupply: initialSupply,
  });

  console.log(`Token deployed: ${action.contractAddress}`);
  return action;
}

/**
 * Create an agent action for NFT minting
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @param {string} contractAddress - NFT contract address
 * @param {string} to - Recipient address
 * @param {string} tokenURI - Token metadata URI
 * @returns {Promise<object>} Mint result
 */
export async function mintNFTWithAgent(agentkit, contractAddress, to, tokenURI) {
  const action = await agentkit.mintNFT({
    contractAddress: contractAddress,
    destination: to,
    tokenURI: tokenURI,
  });

  console.log(`NFT minted: ${action.transactionHash}`);
  return action;
}

/**
 * Create an agent action for token transfer
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @param {string} amount - Amount to transfer
 * @param {string} assetId - Asset ID
 * @param {string} destination - Destination address
 * @returns {Promise<object>} Transfer result
 */
export async function transferWithAgent(agentkit, amount, assetId, destination) {
  const action = await agentkit.transfer({
    amount: amount,
    assetId: assetId,
    destination: destination,
  });

  console.log(`Transfer completed: ${action.transactionHash}`);
  return action;
}

/**
 * Create an agent action for smart contract interaction
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @param {string} contractAddress - Contract address
 * @param {string} method - Method name
 * @param {Array} args - Method arguments
 * @returns {Promise<object>} Invocation result
 */
export async function invokeContractWithAgent(agentkit, contractAddress, method, args = []) {
  const action = await agentkit.invokeContract({
    contractAddress: contractAddress,
    method: method,
    args: args,
  });

  console.log(`Contract invoked: ${action.transactionHash}`);
  return action;
}

/**
 * Get agent wallet information
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @returns {Promise<object>} Wallet info
 */
export async function getAgentWalletInfo(agentkit) {
  const address = await agentkit.wallet.getDefaultAddress();
  const balance = await agentkit.wallet.getBalance("eth");
  
  return {
    address: address.toString(),
    balance: balance.toString(),
    networkId: agentkit.wallet.getNetworkId(),
  };
}

/**
 * Request testnet funds for agent wallet
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @returns {Promise<object>} Faucet result
 */
export async function requestFaucetForAgent(agentkit) {
  const faucet = await agentkit.wallet.faucet();
  await faucet.wait();
  
  return {
    transactionHash: faucet.getTransactionHash(),
    amount: faucet.getAmount(),
  };
}

/**
 * Export wallet data (for backup)
 * @param {CdpAgentkit} agentkit - AgentKit instance
 * @returns {object} Wallet export data
 */
export function exportAgentWallet(agentkit) {
  const walletData = agentkit.wallet.export();
  
  console.warn("⚠️  SECURITY WARNING: Store this data securely!");
  console.warn("This contains private keys for your wallet");
  
  return walletData;
}

export default {
  initializeAgentKit,
  deployTokenWithAgent,
  mintNFTWithAgent,
  transferWithAgent,
  invokeContractWithAgent,
  getAgentWalletInfo,
  requestFaucetForAgent,
  exportAgentWallet,
};
