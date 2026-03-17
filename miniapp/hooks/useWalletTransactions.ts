'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount, usePublicClient } from 'wagmi';
import { formatEther, parseAbiItem, type Address, type Log } from 'viem';
import { ONBT_ARBITRUM_ADDRESS } from '../config/contracts';

const BASE_CHAIN_ID = 8453;
const ARB_CHAIN_ID = 42161;

export type WalletTx = {
  hash: `0x${string}`;
  type: 'in' | 'out';
  amountFormatted: string;
  counterpart: `0x${string}`;
  blockNumber: bigint;
  chainId: number;
  chainLabel: string;
};

async function fetchLogsForChain(
  publicClient: ReturnType<typeof usePublicClient>,
  tokenAddress: `0x${string}`,
  userAddress: Address,
  chainId: number,
  chainLabel: string
): Promise<WalletTx[]> {
  if (!publicClient) return [];

  const latestBlock = await publicClient.getBlockNumber();
  const fromBlock = latestBlock > 5000n ? latestBlock - 5000n : 0n;

  const transferEvent = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');

  const [inLogs, outLogs] = await Promise.all([
    publicClient.getLogs({
      address: tokenAddress,
      event: transferEvent,
      args: { to: userAddress },
      fromBlock,
      toBlock: latestBlock,
    }),
    publicClient.getLogs({
      address: tokenAddress,
      event: transferEvent,
      args: { from: userAddress },
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
      chainId,
      chainLabel,
    };
  };

  return [
    ...inLogs.map((l) => toTx(l, 'in')).filter((t): t is WalletTx => t !== null),
    ...outLogs.map((l) => toTx(l, 'out')).filter((t): t is WalletTx => t !== null),
  ];
}

/**
 * Fetches recent ONBT Transfer events for the connected address across
 * Base (8453) and Arbitrum (42161).
 */
export function useWalletTransactions(tokenAddress: `0x${string}` | undefined) {
  const { address } = useAccount();
  const baseClient = usePublicClient({ chainId: BASE_CHAIN_ID });
  const arbClient = usePublicClient({ chainId: ARB_CHAIN_ID });

  return useQuery<WalletTx[]>({
    queryKey: ['wallet-transactions', address, tokenAddress],
    enabled: Boolean(address && tokenAddress),
    staleTime: 30_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      if (!address || !tokenAddress) return [];

      const [baseTxs, arbTxs] = await Promise.allSettled([
        fetchLogsForChain(baseClient, tokenAddress, address, BASE_CHAIN_ID, 'Base'),
        fetchLogsForChain(arbClient, ONBT_ARBITRUM_ADDRESS, address, ARB_CHAIN_ID, 'Arbitrum'),
      ]);

      const all: WalletTx[] = [
        ...(baseTxs.status === 'fulfilled' ? baseTxs.value : []),
        ...(arbTxs.status === 'fulfilled' ? arbTxs.value : []),
      ];

      return all
        .sort((a, b) => (b.blockNumber > a.blockNumber ? 1 : -1))
        .slice(0, 30);
    },
  });
}
