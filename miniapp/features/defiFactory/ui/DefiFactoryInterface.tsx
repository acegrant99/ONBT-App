'use client';

import React, { useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import {
  CHAIN_CONFIG,
  ONBT_DEFI_FACTORY_ABI,
  ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS,
  ONBT_DEFI_FACTORY_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function DefiFactoryInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [validationError, setValidationError] = useState<string | null>(null);
  const publicClient = usePublicClient({ chainId: selectedChainId });

  const factoryAddress = (selectedChainId === 42161
    ? ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS
    : ONBT_DEFI_FACTORY_BASE_ADDRESS) as `0x${string}`;
  const isConfigured = factoryAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;

  const { data: owner } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'owner',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });

  const { data: onbtToken } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'onbtToken',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });

  const { data: deploymentCounts } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'getDeploymentCounts',
    query: { enabled: isConfigured, refetchInterval: 15_000 },
  });

  const { data: stakingContracts } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'getStakingContracts',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });

  const { data: liquidityPools } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'getLiquidityPools',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });

  const { data: yieldDistributors } = useReadContract({
    chainId: selectedChainId,
    address: factoryAddress,
    abi: ONBT_DEFI_FACTORY_ABI,
    functionName: 'getYieldDistributors',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const counts = useMemo(() => {
    const tuple = (deploymentCounts ?? [0n, 0n, 0n]) as readonly [bigint, bigint, bigint];
    return {
      staking: Number(tuple[0]),
      pools: Number(tuple[1]),
      distributors: Number(tuple[2]),
    };
  }, [deploymentCounts]);

  const canDeploy = Boolean(address) && isConfigured;

  const handleDeployYieldDistributor = async () => {
    setValidationError(null);

    if (!canDeploy) {
      setValidationError('Connect wallet and configure factory address first.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Deploy Yield Distributor',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: factoryAddress,
        abi: ONBT_DEFI_FACTORY_ABI,
        functionName: 'deployYieldDistributor',
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      return;
    }

    writeContract({
      chainId: selectedChainId,
      address: factoryAddress,
      abi: ONBT_DEFI_FACTORY_ABI,
      functionName: 'deployYieldDistributor',
    });
  };

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Factory chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Factory caller" />}
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          DeFi Factory is not configured on {chainName}. Set NEXT_PUBLIC_ONBT_DEFI_FACTORY_{selectedChainId === 42161 ? 'ARBITRUM' : 'BASE'}_ADDRESS.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Staking {counts.staking}
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Pools {counts.pools}
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Yield Dist. {counts.distributors}
        </button>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <p><strong>Factory:</strong> {factoryAddress}</p>
        <p><strong>Owner:</strong> {owner ? String(owner) : '—'}</p>
        <p><strong>ONBT token:</strong> {onbtToken ? String(onbtToken) : '—'}</p>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm">
        <p className="font-semibold mb-2">Latest deployments (live)</p>
        <p>Staking: {Array.isArray(stakingContracts) && stakingContracts.length > 0 ? String(stakingContracts[stakingContracts.length - 1]) : 'none'}</p>
        <p>Pool: {Array.isArray(liquidityPools) && liquidityPools.length > 0 ? String(liquidityPools[liquidityPools.length - 1]) : 'none'}</p>
        <p>Yield Distributor: {Array.isArray(yieldDistributors) && yieldDistributors.length > 0 ? String(yieldDistributors[yieldDistributors.length - 1]) : 'none'}</p>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action (owner only)</p>
        <button
          onClick={() => void handleDeployYieldDistributor()}
          disabled={!canDeploy || isPending || isConfirming}
          className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Deploy Yield Distributor'}
        </button>
        {isConfirmed && txHash && <p className="text-xs text-emerald-700">Deployment confirmed: {txHash}</p>}
        {validationError && <p className="text-xs text-rose-700">{validationError}</p>}
      </div>
    </div>
  );
}
