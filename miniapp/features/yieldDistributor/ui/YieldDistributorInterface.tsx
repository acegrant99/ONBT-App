'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatEther } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_YIELD_DISTRIBUTOR_ABI,
  ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS,
  ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

export function YieldDistributorInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [validationError, setValidationError] = useState<string | null>(null);
  const publicClient = usePublicClient({ chainId: selectedChainId });

  const distributorAddress = (selectedChainId === 42161
    ? ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS
    : ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS) as `0x${string}`;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;

  const { data: totalShares } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'totalShares',
    query: { refetchInterval: 15_000 },
  });

  const { data: accRewardsPerShare } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'accRewardsPerShare',
    query: { refetchInterval: 30_000 },
  });

  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 15_000 },
  });

  const { data: pendingRewards, refetch: refetchPending } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 15_000 },
  });

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  React.useEffect(() => {
    if (!isConfirmed) return;
    void refetchUserInfo();
    void refetchPending();
  }, [isConfirmed, refetchPending, refetchUserInfo]);

  const handleClaimRewards = async () => {
    setValidationError(null);

    if (!address) {
      setValidationError('Connect wallet to claim rewards.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Claim yield rewards',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: distributorAddress,
        abi: ONBT_YIELD_DISTRIBUTOR_ABI,
        functionName: 'claimRewards',
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      return;
    }

    writeContract({
      chainId: selectedChainId,
      address: distributorAddress,
      abi: ONBT_YIELD_DISTRIBUTOR_ABI,
      functionName: 'claimRewards',
    });
  };

  const tuple = (userInfo ?? [0n, 0n, 0n]) as readonly [bigint, bigint, bigint];
  const shares = tuple[0];
  const pendingFromInfo = tuple[1];
  const totalClaimed = tuple[2];

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-4 sm:p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Distributor chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Yield wallet" />}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-900">Distributor state</span>
          <span className="ml-auto text-[11px] text-slate-400 font-mono">{chainName}</span>
        </div>
        <p><strong>Address:</strong> <span className="font-mono text-xs break-all">{distributorAddress}</span></p>
        <p><strong>Total shares:</strong> {totalShares ? Number(totalShares).toLocaleString() : '0'}</p>
        <p><strong>Acc rewards/share:</strong> {accRewardsPerShare ? Number(accRewardsPerShare).toLocaleString() : '0'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {[
          { label: 'Your Shares', value: Number(shares).toLocaleString(), sub: 'staked weight' },
          { label: 'Pending', value: `${parseFloat(formatEther((pendingRewards ?? pendingFromInfo) as bigint)).toFixed(4)} ONBT`, sub: 'claimable now' },
          { label: 'Claimed', value: `${parseFloat(formatEther(totalClaimed)).toFixed(4)} ONBT`, sub: 'all time' },
        ].map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">{card.label}</span>
            <span className="block text-base font-bold text-slate-900 leading-tight">{card.value}</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">{card.sub}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action</p>
        <motion.button
          type="button"
          whileHover={{ scale: address && !isPending && !isConfirming ? 1.02 : 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => void handleClaimRewards()}
          disabled={!address || isPending || isConfirming}
          className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
        >
          {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming...' : 'Claim Rewards'}
        </motion.button>
        <AnimatePresence initial={false}>
          {isConfirmed && txHash ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 font-mono break-all"
            >
              Claim confirmed: {txHash}
            </motion.div>
          ) : null}
          {validationError ? (
            <motion.div
              key={validationError}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700"
            >
              {validationError}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
