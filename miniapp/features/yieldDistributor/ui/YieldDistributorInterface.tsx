'use client';

import React, { useState } from 'react';
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
    <div className="brand-card module-shell max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Distributor chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Yield wallet" />}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <p><strong>Chain:</strong> {chainName}</p>
        <p><strong>Distributor:</strong> {distributorAddress}</p>
        <p><strong>Total shares:</strong> {totalShares ? Number(totalShares).toLocaleString() : '0'}</p>
        <p><strong>Acc rewards/share:</strong> {accRewardsPerShare ? Number(accRewardsPerShare).toLocaleString() : '0'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Shares {Number(shares).toLocaleString()}
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Pending {formatEther((pendingRewards ?? pendingFromInfo) as bigint)} ONBT
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Claimed {formatEther(totalClaimed)} ONBT
        </button>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action</p>
        <button
          onClick={() => void handleClaimRewards()}
          disabled={!address || isPending || isConfirming}
          className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Claiming...' : 'Claim Rewards'}
        </button>
        {isConfirmed && txHash && <p className="text-xs text-emerald-700">Claim confirmed: {txHash}</p>}
        {validationError && <p className="text-xs text-rose-700">{validationError}</p>}
      </div>
    </div>
  );
}
