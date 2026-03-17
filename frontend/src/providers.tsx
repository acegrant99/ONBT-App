import { FC, ReactNode } from 'react'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { base, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { Toaster, toasterConfig } from '@/lib/toast'
import { ThemeProvider } from '@/context/ThemeContext'
import { BRANDING } from '@/config/branding'
import './index.css'

// RPC URLs for Base and Arbitrum - use env vars if available, fallback to public RPCs
const BASE_RPC_URL = import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org'
const ARBITRUM_RPC_URL = import.meta.env.VITE_ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc'
const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || ''

// Log RPC configuration in development
if (import.meta.env.DEV) {
  console.log('🌐 RPC Configuration:')
  console.log('  Base:', BASE_RPC_URL.includes('alchemy') ? 'Alchemy (private)' : BASE_RPC_URL)
  console.log('  Arbitrum:', ARBITRUM_RPC_URL.includes('alchemy') ? 'Alchemy (private)' : ARBITRUM_RPC_URL)
  console.log('  WalletConnect:', WALLET_CONNECT_PROJECT_ID ? 'Configured ✓' : 'Not configured (optional)')
}

const config = createConfig(
  getDefaultConfig({
    chains: [base, arbitrum],
    transports: {
      [base.id]: http(BASE_RPC_URL, {
        batch: true,
        retryCount: 3,
        timeout: 30_000,
      }),
      [arbitrum.id]: http(ARBITRUM_RPC_URL, {
        batch: true,
        retryCount: 3,
        timeout: 30_000,
      }),
    },
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    appName: BRANDING.name,
    appDescription: BRANDING.tagline,
    appUrl: BRANDING.social.website,
    appIcon: BRANDING.logos.mark,
  })
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
})

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <ThemeProvider>
            {children}
            <Toaster {...toasterConfig} />
          </ThemeProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}
