'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount, usePublicClient } from 'wagmi';
import { formatEther, parseAbiItem, type Address, type Log } from 'viem';

const BASE_CHAIN_ID = 8453;

export type WalletTx = {
  hash: `0x${string}`;
  type: 'in' | 'out';
  amountFormatted: string;
  counterpart: `0x${string}`;
  blockNumber: bigint;
  chainId: number;
  chainLabel: string;
};

/** Fetches recent ONBT Transfer events involving the connected address. */
export function useWalletTransactions(tokenAddress: `0x${string}` | undefined) {
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: BASE_CHAIN_ID });

  return useQuery<WalletTx[]>({
    queryKey: ['wallet-transactions', address, tokenAddress],
    enabled: Boolean(address && tokenAddress && publicClient),
    staleTime: 30_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      if (!address || !tokenAddress || !publicClient) return [];

      const latestBlock = await publicClient.getBlockNumber();
      const fromBlock = latestBlock > 5000n ? latestBlock - 5000n : 0n;

      const transferEvent = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');

      const [inLogs, outLogs] = await Promise.all([
        publicClient.getLogs({
          address: tokenAddress,
          event: transferEvent,
          args: { to: address },
          fromBlock,
          toBlock: latestBlock,
        }),
        publicClient.getLogs({
          address: tokenAddress,
          event: transferEvent,
          args: { from: address },
          fromBlock,
          toBlock: latestBlock,
        }),
      ]);

      const toTx = (log: Log, direction: 'in' | 'out'): WalletTx | null => {
        const args = (log as { args?: { from?: Address; to?: Address; value?: bigint } }).args;
        if (!args) return null;
        const amount = args.value ?? 0n;
        const counterpart = direction === 'in' ? (args.from ?? ('0x0' as Address)) : (args.to ?? ('0x0' as Address));
        return {
          hash: log.transactionHash ?? ('0x0' as `0x${string}`),
          type: direction,
          amountFormatted: parseFloat(formatEther(amount)).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          }),
          counterpart,
          blockNumber: log.blockNumber ?? 0n,
          chainId: BASE_CHAIN_ID,
          chainLabel: 'Base',
        };
      };

      const txs: WalletTx[] = [
        ...inLogs.map((l) => toTx(l, 'in')).filter((t): t is WalletTx => t !== null),
        ...outLogs.map((l) => toTx(l, 'out')).filter((t): t is WalletTx => t !== null),
      ]
        .sort((a, b) => (b.blockNumber > a.blockNumber ? 1 : -1))
        .slice(0, 20);

      return txs;
    },
  });
}
