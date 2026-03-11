'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { wagmiConfig } from '@/config/wagmi';
import { useState } from 'react';
import { base } from 'wagmi/chains';

const QUERY_DEFAULTS = {
  defaultOptions: {
    queries: {
      staleTime: 10_000, // 10s global stale time
      retry: 1,          // limit retry for speed
    },
  },
};

// Providers wrapper for the entire app
export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Create queryClient in useState to preserve across renders
  const [queryClient] = useState(() => new QueryClient(QUERY_DEFAULTS));

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={base} apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
