'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { wagmiConfig } from '@/config/wagmi';
import { getAppUrl } from '@/config/app-url';
import { useState } from 'react';
import { base, mainnet } from 'wagmi/chains';
import { createPublicClient, http } from 'viem';

const QUERY_DEFAULTS = {
  defaultOptions: {
    queries: {
      staleTime: 10_000, // 10s global stale time
      retry: 1,          // limit retry for speed
    },
  },
};

const appName = 'ONabat';

// Suppress known-benign OnchainKit basename resolution errors.
// When ConnectWallet renders with a connected address, OnchainKit attempts to verify
// the basename via mainnet ENS forward resolution. If the CCIP gateway returns a contract
// revert (e.g. "Internal error"), getName() logs it at console.error level even though
// it gracefully falls back to showing the address. Silence only this specific message.
if (typeof window !== 'undefined') {
  const _origConsoleError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (
      msg.includes('basename forward resolution verification') ||
      msg.includes('ENS forward resolution verification') ||
      msg.includes('Error resolving Base names')
    ) {
      return; // suppress known-benign OnchainKit resolution noise
    }
    _origConsoleError(...args);
  };
}

// Public mainnet client using Cloudflare's CORS-friendly RPC (avoids eth.merkle.io CORS errors)
const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://cloudflare-eth.com'),
});

// Providers wrapper for the entire app
export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Create queryClient in useState to preserve across renders
  const [queryClient] = useState(() => new QueryClient(QUERY_DEFAULTS));
  const appUrl = getAppUrl();
  const appLogoUrl = `${appUrl}/branding/onabat-logo-dark.png`;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          analytics={false}
          defaultPublicClients={{ [mainnet.id]: mainnetPublicClient }}
          config={{
            appearance: {
              mode: 'auto',
              name: appName,
              logo: appLogoUrl,
            },
            wallet: {
              display: 'modal',
              preference: 'all',
            },
          }}
          miniKit={{
            enabled: true,
            autoConnect: true,
            notificationProxyUrl: '/api/notify',
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
