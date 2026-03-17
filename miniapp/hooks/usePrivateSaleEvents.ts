'use client';

import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { parseAbiItem } from 'viem';

export type SalePurchaseEvent = {
  buyer: `0x${string}`;
  recipient: `0x${string}`;
  paymentToken: `0x${string}`;
  amountIn: bigint;
  onbtOut: bigint;
  blockNumber: bigint;
  transactionHash: `0x${string}` | null;
};

const TOKENS_PURCHASED_ABI_ITEM = parseAbiItem(
  'event TokensPurchased(address indexed buyer, address indexed recipient, address indexed paymentToken, uint256 amountIn, uint256 onbtOut)',
);

const SCAN_BLOCKS = 100_000n;

export function usePrivateSaleEvents(
  chainId: 8453 | 42161,
  contractAddress: `0x${string}` | undefined,
  enabled = true,
) {
  const [events, setEvents] = useState<SalePurchaseEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const publicClient = usePublicClient({ chainId });

  useEffect(() => {
    if (!enabled || !contractAddress || !publicClient) return;

    let cancelled = false;

    async function fetchEvents() {
      if (!publicClient || !contractAddress) return;
      setLoading(true);
      try {
        const latestBlock = await publicClient.getBlockNumber();
        const fromBlock = latestBlock > SCAN_BLOCKS ? latestBlock - SCAN_BLOCKS : 0n;

        const logs = await publicClient.getLogs({
          address: contractAddress,
          event: TOKENS_PURCHASED_ABI_ITEM,
          fromBlock,
          toBlock: latestBlock,
        });

        if (cancelled) return;

        const parsed: SalePurchaseEvent[] = logs
          .map((log) => {
            const args = log.args as {
              buyer: `0x${string}`;
              recipient: `0x${string}`;
              paymentToken: `0x${string}`;
              amountIn: bigint;
              onbtOut: bigint;
            };
            return {
              buyer: args.buyer,
              recipient: args.recipient,
              paymentToken: args.paymentToken,
              amountIn: args.amountIn,
              onbtOut: args.onbtOut,
              blockNumber: log.blockNumber ?? 0n,
              transactionHash: log.transactionHash ?? null,
            };
          })
          .sort((a, b) => (a.blockNumber < b.blockNumber ? -1 : 1));

        setEvents(parsed);
      } catch {
        // silent — event history is a best-effort enhancement
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchEvents();
    return () => {
      cancelled = true;
    };
  }, [chainId, contractAddress, enabled, publicClient]);

  return { events, loading };
}
