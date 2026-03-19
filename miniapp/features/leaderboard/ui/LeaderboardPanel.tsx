'use client';

/**
 * LeaderboardPanel — ONBT staking leaderboard feature.
 *
 * Reads top-10 stakers from Base and Arbitrum staking contracts via two-step approach:
 * 1. getTopStakers(10) → address[]
 * 2. batch getStakeInfo(addr) → amounts
 * Social/gamification layer for the Farcaster MiniApp.
 */
import React, { useState } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { formatEther } from 'viem';
import { useComposeCast, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import {
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_STAKING_ABI,
  CHAIN_CONFIG,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

const TOP_N = 10n;
const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

type ChainId = 8453 | 42161;

type RankedStaker = {
  address: `0x${string}`;
  staked: bigint;
  rank: number;
  chain: 'Base' | 'Arbitrum';
};

function truncateAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatStaked(wei: bigint): string {
  const val = parseFloat(formatEther(wei));
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return val.toFixed(2);
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 font-['IBM_Plex_Mono'] text-[11px] font-bold text-slate-600">
      {rank}
    </span>
  );
}

function useTopStakers(chainId: ChainId) {
  const stakingContract = (chainId === 42161 ? ONBT_STAKING_ARBITRUM_ADDRESS : ONBT_STAKING_ADDRESS) as `0x${string}`;
  const chainLabel = chainId === 42161 ? 'Arbitrum' : 'Base';

  // Step 1: get ordered address list
  const { data: rawAddresses, isLoading: loadingAddrs, isError, refetch } = useReadContract({
    chainId,
    address: stakingContract,
    abi: ONBT_STAKING_ABI,
    functionName: 'getTopStakers',
    args: [TOP_N],
    query: { refetchInterval: 60_000 },
  });

  const addresses = (rawAddresses as readonly `0x${string}`[] | undefined) ?? [];
  const validAddrs = addresses.filter((a) => a && a.toLowerCase() !== ZERO_ADDR);

  // Step 2: batch getStakeInfo for each address to get amounts
  const stakeInfoContracts = validAddrs.map((addr) => ({
    chainId,
    address: stakingContract,
    abi: ONBT_STAKING_ABI,
    functionName: 'getStakeInfo' as const,
    args: [addr] as const,
  }));

  const { data: stakeInfoResults, isLoading: loadingInfo } = useReadContracts({
    contracts: stakeInfoContracts,
    query: { enabled: validAddrs.length > 0, refetchInterval: 60_000 },
  });

  const ranked: RankedStaker[] = validAddrs.map((addr, i) => {
    const result = stakeInfoResults?.[i];
    // getStakeInfo returns tuple: [amount, startTime, lockupEnd, lockup, pendingRewards, isLocked]
    const amount = result?.status === 'success' ? (result.result as readonly [bigint, bigint, bigint, number, bigint, boolean])[0] : 0n;
    return { address: addr, staked: amount ?? 0n, rank: i + 1, chain: chainLabel as 'Base' | 'Arbitrum' };
  });

  return { ranked, isLoading: loadingAddrs || (loadingInfo && !stakeInfoResults), isError, refetch };
}

export function LeaderboardPanel() {
  const { address } = useAccount();
  const { context } = useMiniKit();
  const { composeCast, isPending: isCasting } = useComposeCast();
  const [selectedChainId, setSelectedChainId] = useState<ChainId>(8453);
  const [castFeedback, setCastFeedback] = useState<string | null>(null);

  const { ranked, isLoading, isError, refetch } = useTopStakers(selectedChainId);

  const explorerBase = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;
  const chainName = selectedChainId === 42161 ? 'Arbitrum' : 'Base';

  // Find connected user's rank
  const userEntry = address
    ? ranked.find((r) => r.address.toLowerCase() === address.toLowerCase())
    : undefined;

  const shareCast = () => {
    const topThree = ranked.slice(0, 3).map((r) => `#${r.rank} ${truncateAddr(r.address)} (${formatStaked(r.staked)} ONBT)`).join(', ');
    let text = `👑 ONBT ${chainName} Staking Leaderboard:\n${topThree}`;
    if (userEntry) {
      text += `\n\nI'm ranked #${userEntry.rank} with ${formatStaked(userEntry.staked)} ONBT staked 🚀`;
    }
    text += '\n\nCheck the full board on ONabat 👇';
    composeCast({ text, embeds: ['https://www.nabat.finance'] });
    setCastFeedback('Cast composer opened!');
    setTimeout(() => setCastFeedback(null), 3000);
  };

  return (
    <div className="brand-card module-shell max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-5 border-b border-sky-900/15 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
              Community · Leaderboard
            </button>
            <div className="brand-display text-2xl font-extrabold text-slate-900">Top ONBT Stakers</div>
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ChainSelector label="Leaderboard chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
          {address && <WalletIdentityBadge address={address} label="Your wallet" />}
        </div>
      </div>

      {/* User's own rank highlight */}
      {userEntry && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-violet-300/60 bg-violet-50/80 px-4 py-3">
          <RankBadge rank={userEntry.rank} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-violet-900">Your rank on {chainName}</p>
            <p className="font-['IBM_Plex_Mono'] text-xs text-violet-700">{formatStaked(userEntry.staked)} ONBT staked</p>
          </div>
          <button
            type="button"
            disabled={!context || isCasting}
            onClick={shareCast}
            className="ml-auto rounded-2xl border border-violet-300/60 bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
          >
            {isCasting ? 'Opening…' : 'Share rank'}
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
          Could not load leaderboard. Check RPC or try refreshing.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && ranked.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No stakers found on {chainName} yet. Be the first!
        </div>
      )}

      {/* Leaderboard */}
      {!isLoading && ranked.length > 0 && (
        <div className="space-y-2">
          {ranked.map((staker) => {
            const isUser = address && staker.address.toLowerCase() === address.toLowerCase();
            return (
              <MiniAppExternalLink
                key={`${staker.chain}-${staker.rank}`}
                href={`${explorerBase}/address/${staker.address}`}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors hover:border-violet-300/60 ${
                  isUser
                    ? 'border-violet-300/60 bg-violet-50/80'
                    : 'border-slate-900/10 bg-white/92 hover:bg-violet-50/40'
                }`}
              >
                {/* Rank */}
                <div className="shrink-0">
                  <RankBadge rank={staker.rank} />
                </div>

                {/* Address */}
                <div className="min-w-0 flex-1">
                  <p className={`font-['IBM_Plex_Mono'] text-sm font-semibold ${isUser ? 'text-violet-900' : 'text-slate-900'}`}>
                    {truncateAddr(staker.address)}
                    {isUser && <span className="ml-2 text-[10px] font-normal text-violet-600">· You</span>}
                  </p>
                  <p className="font-['IBM_Plex_Mono'] text-[10px] text-slate-500">
                    {staker.chain}
                  </p>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <p className={`font-['IBM_Plex_Mono'] text-sm font-bold ${isUser ? 'text-violet-700' : 'text-slate-700'}`}>
                    {formatStaked(staker.staked)} ONBT
                  </p>
                  <p className="font-['IBM_Plex_Mono'] text-[10px] text-slate-400">staked ↗</p>
                </div>
              </MiniAppExternalLink>
            );
          })}
        </div>
      )}

      {/* Share section */}
      <div className="mt-5 space-y-2">
        {castFeedback && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {castFeedback}
          </div>
        )}
        <button
          type="button"
          onClick={shareCast}
          disabled={!context || ranked.length === 0 || isCasting}
          className="w-full rounded-2xl border border-violet-300/60 bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-400"
        >
          {isCasting ? 'Opening Farcaster Cast Composer…' : '📣 Share Leaderboard to Farcaster'}
        </button>
        <MiniAppExternalLink
          href={`${CHAIN_CONFIG.base.blockExplorer}/address/${ONBT_STAKING_ADDRESS}#readContract`}
          className="block w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-violet-300/60 hover:text-violet-700"
        >
          View Staking Contract on BaseScan ↗
        </MiniAppExternalLink>
      </div>
    </div>
  );
}
