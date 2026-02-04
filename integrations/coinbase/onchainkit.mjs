/**
 * OnchainKit Integration
 * React components and utilities for building onchain apps
 * 
 * Note: OnchainKit is primarily for React/Next.js frontend applications
 * This file provides configuration and utility functions
 */

/**
 * OnchainKit Configuration
 * Use these configurations in your React app
 */
export const onchainKitConfig = {
  // Base Mainnet
  base: {
    chainId: 8453,
    rpcUrl: "https://mainnet.base.org",
    name: "Base",
    explorer: "https://basescan.org",
  },
  // Base Sepolia (Testnet)
  baseSepolia: {
    chainId: 84532,
    rpcUrl: "https://sepolia.base.org",
    name: "Base Sepolia",
    explorer: "https://sepolia.basescan.org",
  },
};

/**
 * Get OnchainKit chain configuration
 * @param {string} network - Network name (base or baseSepolia)
 * @returns {object} Chain configuration
 */
export function getChainConfig(network = "baseSepolia") {
  return onchainKitConfig[network];
}

/**
 * OnchainKit Component Example Configurations
 * These can be used in your React components
 */

// Wallet configuration example
export const walletConfig = {
  appName: "Nabat Omnichain dApp",
  appLogoUrl: "https://your-domain.com/logo.png",
};

// Identity configuration example
export const identityConfig = {
  schemaId: "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9",
};

// Transaction configuration example
export const transactionConfig = {
  chainId: 8453, // Base mainnet
  calls: [],
};

/**
 * Example: Format address for display
 * @param {string} address - Ethereum address
 * @returns {string} Formatted address
 */
export function formatAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Example: Get ENS/Basename
 * This would typically be done in the frontend with OnchainKit components
 * @param {string} address - Ethereum address
 * @returns {Promise<string|null>} Name or null
 */
export async function getName(address) {
  // In a real React app, you'd use OnchainKit's Identity component
  // This is a placeholder for backend logic
  console.log("Use OnchainKit Identity component in React for ENS/Basename");
  return null;
}

/**
 * Example: Transaction utilities
 */
export const transactionUtils = {
  /**
   * Build transaction call data
   * @param {string} to - Recipient address
   * @param {string} data - Call data
   * @param {string} value - ETH value
   * @returns {object} Transaction call
   */
  buildCall: (to, data, value = "0") => ({
    to,
    data,
    value,
  }),

  /**
   * Estimate gas for transaction
   * @param {Array} calls - Array of transaction calls
   * @returns {Promise<string>} Estimated gas
   */
  estimateGas: async (calls) => {
    // This would connect to RPC in production
    console.log("Estimating gas for calls:", calls.length);
    return "100000"; // Placeholder
  },
};

/**
 * OnchainKit React Component Usage Examples
 * (These are for documentation - use in React/Next.js apps)
 */

export const reactExamples = {
  // Wallet Connect Button
  walletConnect: `
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

export function MyWalletButton() {
  return (
    <ConnectWallet>
      <Avatar className="h-6 w-6" />
      <Name />
    </ConnectWallet>
  );
}
  `,

  // Identity Display
  identity: `
import { Identity, Name, Avatar, Address } from '@coinbase/onchainkit/identity';

export function UserIdentity({ address }) {
  return (
    <Identity address={address} schemaId={SCHEMA_ID}>
      <Avatar />
      <Name />
      <Address />
    </Identity>
  );
}
  `,

  // Transaction Component
  transaction: `
import { Transaction, TransactionButton } from '@coinbase/onchainkit/transaction';

export function SendTransaction() {
  return (
    <Transaction
      chainId={8453}
      calls={calls}
    >
      <TransactionButton text="Send Transaction" />
    </Transaction>
  );
}
  `,

  // Token Component
  token: `
import { Token, TokenChip, TokenImage } from '@coinbase/onchainkit/token';

export function TokenDisplay() {
  return (
    <Token>
      <TokenImage />
      <TokenChip />
    </Token>
  );
}
  `,
};

/**
 * Integration with existing contracts
 * @param {string} contractAddress - OFT/ONFT contract address
 * @returns {object} Contract interaction configuration
 */
export function getContractInteractionConfig(contractAddress) {
  return {
    address: contractAddress,
    // Add your contract ABI
    abi: [],
    chainId: 8453,
  };
}

/**
 * Frontend integration guide
 */
export const frontendGuide = {
  setup: `
// Install OnchainKit in your Next.js/React app
npm install @coinbase/onchainkit

// Configure in your app
import { OnchainKitProvider } from '@coinbase/onchainkit';

export default function App({ Component, pageProps }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <Component {...pageProps} />
    </OnchainKitProvider>
  );
}
  `,
  
  docs: "https://onchainkit.xyz/",
};

export default {
  onchainKitConfig,
  getChainConfig,
  walletConfig,
  identityConfig,
  transactionConfig,
  formatAddress,
  getName,
  transactionUtils,
  reactExamples,
  getContractInteractionConfig,
  frontendGuide,
};
