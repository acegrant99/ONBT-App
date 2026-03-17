'use client';

import { useQuery } from '@tanstack/react-query';

export type OHLCVBar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

type HistoryResponse = {
  candles: OHLCVBar[];
  pairAddress?: string;
  source: 'dex' | 'unavailable' | 'no-pairs' | 'ohlcv-unavailable' | 'error';
};

interface UseOHLCVHistoryOptions {
  tokenAddress?: `0x${string}`;
  chainId?: number;
  timeframe?: Timeframe;
  limit?: number;
}

export function useOHLCVHistory({
  tokenAddress,
  chainId = 8453,
  timeframe = '1h',
  limit = 168,
}: UseOHLCVHistoryOptions = {}) {
  return useQuery<HistoryResponse>({
    queryKey: ['ohlcv-history', tokenAddress, chainId, timeframe, limit],
    enabled: Boolean(tokenAddress),
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
    queryFn: async () => {
      const params = new URLSearchParams({
        address: tokenAddress!,
        chainId: String(chainId),
        timeframe,
        limit: String(limit),
      });
      const res = await fetch(`/api/price/history?${params.toString()}`);
      if (!res.ok) return { candles: [], source: 'error' as const };
      return res.json() as Promise<HistoryResponse>;
    },
  });
}
