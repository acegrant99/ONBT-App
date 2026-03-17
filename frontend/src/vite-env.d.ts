/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Wallet & RPC Configuration
  readonly VITE_WALLET_CONNECT_PROJECT_ID?: string
  readonly VITE_BASE_RPC_URL?: string
  readonly VITE_ARBITRUM_RPC_URL?: string
  readonly VITE_BASE_SEPOLIA_RPC_URL?: string
  readonly VITE_ETHEREUM_RPC_URL?: string
  
  // Public Pinata gateway only
  readonly VITE_PINATA_GATEWAY?: string
  
  // Backend APIs
  readonly VITE_API_BASE_URL?: string
  readonly VITE_BACKEND_URL?: string
  
  // Branding
  readonly VITE_ONBT_LOGO_URI?: string
  readonly VITE_ONBT_WEBSITE?: string
  readonly VITE_ONBT_DESCRIPTION?: string
  
  // Feature Flags
  readonly VITE_ENABLE_TESTNET?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DEBUG?: string
  
  // Environment
  readonly DEV?: boolean
  readonly PROD?: boolean
  readonly MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
