'use client';

import { useQuery } from '@tanstack/react-query';

export type TokenPrice = {
  priceUsd: string;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  volume24h: number;
  volume6h: number;
  liquidity: number;
  fdv: number;
  marketCap: number;
  pairAddress: string;
  dexId: string;
  chainSlug: string;
  /** 'dex' when sourced from live DEX pair, 'private-sale' when using fixed sale price */
  source?: 'dex' | 'private-sale';
} | null;

/**
 * Fetches live ONBT price from the /api/price/token proxy (DexScreener).
 * Refreshes every 30 seconds. Falls back to null on error or missing data.
 */
export function useLivePrice(
  tokenAddress: `0x${string}` | undefined,
  chainId: 8453 | 42161 = 8453
) {
  return useQuery<TokenPrice>({
    queryKey: ['live-price', tokenAddress, chainId],
    enabled: Boolean(tokenAddress),
    staleTime: 30_000,
    refetchInterval: 30_000,
    retry: 2,
    queryFn: async (): Promise<TokenPrice> => {
      if (!tokenAddress) return null;
      const res = await fetch(
        `/api/price/token?address=${encodeURIComponent(tokenAddress)}&chainId=${chainId}`
      );
      if (!res.ok) return null;
      const data: unknown = await res.json();
      return (data as TokenPrice) ?? null;
    },
  });
}
