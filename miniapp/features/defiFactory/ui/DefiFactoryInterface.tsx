'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div className="brand-card module-shell max-w-3xl mx-auto p-4 sm:p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Factory chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Factory caller" />}
      </div>

      <AnimatePresence>
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            DeFi Factory is not configured on {chainName}. Set NEXT_PUBLIC_ONBT_DEFI_FACTORY_{selectedChainId === 42161 ? 'ARBITRUM' : 'BASE'}_ADDRESS.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {[
          { label: 'Staking', value: counts.staking },
          { label: 'Pools', value: counts.pools },
          { label: 'Yield Dist.', value: counts.distributors },
        ].map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{card.label}</span>
            <span className="block text-2xl font-bold text-slate-900">{card.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-900">Factory state</span>
          <span className="ml-auto text-[11px] text-slate-400 font-mono">live</span>
        </div>
        <p><strong>Factory:</strong> <span className="font-mono text-xs break-all">{factoryAddress}</span></p>
        <p><strong>Owner:</strong> <span className="font-mono text-xs break-all">{owner ? String(owner) : '—'}</span></p>
        <p><strong>ONBT token:</strong> <span className="font-mono text-xs break-all">{onbtToken ? String(onbtToken) : '—'}</span></p>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-slate-900">Latest deployments</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse ml-auto" />
        </div>
        <div className="space-y-1.5 font-mono text-xs text-slate-700">
          <p><span className="text-slate-400">Staking:</span> {Array.isArray(stakingContracts) && stakingContracts.length > 0 ? String(stakingContracts[stakingContracts.length - 1]) : 'none'}</p>
          <p><span className="text-slate-400">Pool:</span> {Array.isArray(liquidityPools) && liquidityPools.length > 0 ? String(liquidityPools[liquidityPools.length - 1]) : 'none'}</p>
          <p><span className="text-slate-400">Y-Dist:</span> {Array.isArray(yieldDistributors) && yieldDistributors.length > 0 ? String(yieldDistributors[yieldDistributors.length - 1]) : 'none'}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action (owner only)</p>
        <motion.button
          type="button"
          whileHover={{ scale: canDeploy && !isPending && !isConfirming ? 1.02 : 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => void handleDeployYieldDistributor()}
          disabled={!canDeploy || isPending || isConfirming}
          className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
        >
          {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming on-chain...' : 'Deploy Yield Distributor'}
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
              Deployment confirmed: {txHash}
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
