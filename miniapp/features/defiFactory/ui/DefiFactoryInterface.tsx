'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { isAddress } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_DEFI_FACTORY_ABI,
  ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS,
  ONBT_DEFI_FACTORY_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

type ActionKey = 'distributor' | 'staking' | 'pool';

export function DefiFactoryInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [activeAction, setActiveAction] = useState<ActionKey>('distributor');
  const [validationError, setValidationError] = useState<string | null>(null);

  // register* inputs — each takes a single contract address
  const [stakingAddr, setStakingAddr] = useState('');
  const [poolAddr, setPoolAddr] = useState('');
  const [distributorAddr, setDistributorAddr] = useState('');

  const publicClient = usePublicClient({ chainId: selectedChainId });

  const factoryAddress = (selectedChainId === 42161
    ? ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS
    : ONBT_DEFI_FACTORY_BASE_ADDRESS) as `0x${string}`;
  const isConfigured = factoryAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const explorerBase = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;

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

  const { data: deploymentCounts, refetch: refetchCounts } = useReadContract({
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

  const { data: txHash, writeContract, isPending, reset: resetWrite } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) void refetchCounts();
  }, [isConfirmed, refetchCounts]);

  const counts = useMemo(() => {
    const tuple = (deploymentCounts ?? [0n, 0n, 0n]) as readonly [bigint, bigint, bigint];
    return {
      staking: Number(tuple[0]),
      pools: Number(tuple[1]),
      distributors: Number(tuple[2]),
    };
  }, [deploymentCounts]);

  const canDeploy = Boolean(address) && isConfigured;
  const isBusy = isPending || isConfirming;

  const ensureOnChain = () => {
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return false;
    }
    return true;
  };

  const handleRegister = async (action: ActionKey) => {
    setValidationError(null);
    resetWrite();
    if (!canDeploy) { setValidationError('Connect wallet and configure registry address first.'); return; }
    const addrMap: Record<ActionKey, string> = {
      distributor: distributorAddr,
      staking: stakingAddr,
      pool: poolAddr,
    };
    const fnMap: Record<ActionKey, string> = {
      distributor: 'registerYieldDistributor',
      staking: 'registerStaking',
      pool: 'registerLiquidityPool',
    };
    const argAddr = addrMap[action];
    if (!argAddr || !isAddress(argAddr)) { setValidationError('Enter a valid contract address.'); return; }
    if (!ensureOnChain()) return;
    const fnName = fnMap[action] as 'registerYieldDistributor' | 'registerStaking' | 'registerLiquidityPool';
    const preflight = await runActionPreflight({
      actionLabel: `Register ${action}`,
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: { address: factoryAddress, abi: ONBT_DEFI_FACTORY_ABI, functionName: fnName, args: [argAddr as `0x${string}`] },
    });
    if (!preflight.ok) { setValidationError(preflight.copy); return; }
    writeContract({ chainId: selectedChainId, address: factoryAddress, abi: ONBT_DEFI_FACTORY_ABI, functionName: fnName, args: [argAddr as `0x${string}`] });
  };

  const ACTION_TABS: { key: ActionKey; label: string; icon: string }[] = [
    { key: 'distributor', label: 'Yield Distributor', icon: '💸' },
    { key: 'staking', label: 'Staking', icon: '🔒' },
    { key: 'pool', label: 'Liquidity Pool', icon: '🌊' },
  ];

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-4 sm:p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Factory chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Factory caller" />}
      </div>

      {/* Not-configured banner */}
      <AnimatePresence>
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <p className="font-semibold">DeFi Factory not deployed on {chainName}</p>
            <p className="mt-1 font-mono text-xs">
              Set <strong>NEXT_PUBLIC_ONBT_DEFI_FACTORY_{selectedChainId === 42161 ? 'ARBITRUM' : 'BASE'}_ADDRESS</strong> in <code>miniapp/.env.local</code> after deployment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deployment counters */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          { label: 'Staking', value: counts.staking, icon: '🔒' },
          { label: 'Pools', value: counts.pools, icon: '🌊' },
          { label: 'Yield Dist.', value: counts.distributors, icon: '💸' },
        ].map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.06)] text-center"
          >
            <span className="text-base" aria-hidden="true">{card.icon}</span>
            <span className="block text-2xl font-bold text-slate-900 mt-1">{card.value}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">{card.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Factory state */}
      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-1.5">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-900">Factory state · {chainName}</span>
        </div>
        <p className="font-mono text-xs break-all">
          <strong className="text-slate-500 font-normal">Factory: </strong>
          {isConfigured ? (
            <MiniAppExternalLink href={`${explorerBase}/address/${factoryAddress}`} className="text-violet-700 hover:underline">
              {factoryAddress}
            </MiniAppExternalLink>
          ) : factoryAddress}
        </p>
        <p className="font-mono text-xs break-all"><strong className="text-slate-500 font-normal">Owner: </strong>{owner ? String(owner) : '—'}</p>
        <p className="font-mono text-xs break-all"><strong className="text-slate-500 font-normal">ONBT token: </strong>{onbtToken ? String(onbtToken) : '—'}</p>
      </div>

      {/* Latest deployments */}
      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-slate-900">Latest deployments</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse ml-auto" />
        </div>
        <div className="space-y-1.5 font-mono text-xs text-slate-700">
          {[
            { label: 'Staking', list: stakingContracts },
            { label: 'Pool', list: liquidityPools },
            { label: 'Y-Dist', list: yieldDistributors },
          ].map(({ label, list }) => {
            const addr = Array.isArray(list) && list.length > 0 ? String(list[list.length - 1]) : null;
            return (
              <p key={label}>
                <span className="text-slate-400">{label}: </span>
                {addr ? (
                  <MiniAppExternalLink href={`${explorerBase}/address/${addr}`} className="text-violet-700 hover:underline">
                    {addr}
                  </MiniAppExternalLink>
                ) : 'none'}
              </p>
            );
          })}
        </div>
      </div>

      {/* Write actions */}
      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-4">
        <p className="text-sm font-semibold text-slate-900">Register contract (owner only)</p>

        {/* Action selector */}
        <div className="flex gap-2 flex-wrap">
          {ACTION_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => { setActiveAction(tab.key); setValidationError(null); resetWrite(); }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors border ${
                activeAction === tab.key
                  ? 'border-violet-400 bg-violet-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Shared address input + register button for each action */}
        {activeAction === 'distributor' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Register an already-deployed <strong>ONBTYieldDistributor</strong> (e.g. <code className="font-mono">0x8c91…afC7</code> on Base). This records it in the registry; it does not deploy a new contract.</p>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Yield distributor address</label>
              <input type="text" value={distributorAddr} onChange={(e) => setDistributorAddr(e.target.value.trim())} placeholder="0x…" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30" />
            </div>
            <motion.button type="button" whileHover={{ scale: canDeploy && !isBusy ? 1.02 : 1 }} whileTap={{ scale: 0.97 }} onClick={() => void handleRegister('distributor')} disabled={!canDeploy || isBusy} className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50 transition-opacity">
              {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming...' : '💸 Register Yield Distributor'}
            </motion.button>
          </div>
        )}

        {activeAction === 'staking' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Register an already-deployed staking contract (e.g. <strong>ONBTOmnichainStaking</strong> at <code className="font-mono">0xf51B…cDfe</code> on Base).</p>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Staking contract address</label>
              <input type="text" value={stakingAddr} onChange={(e) => setStakingAddr(e.target.value.trim())} placeholder="0x…" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30" />
            </div>
            <motion.button type="button" whileHover={{ scale: canDeploy && !isBusy ? 1.02 : 1 }} whileTap={{ scale: 0.97 }} onClick={() => void handleRegister('staking')} disabled={!canDeploy || isBusy} className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50 transition-opacity">
              {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming...' : '🔒 Register Staking Contract'}
            </motion.button>
          </div>
        )}

        {activeAction === 'pool' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Register an already-deployed liquidity pool or liquidity manager contract (e.g. <strong>ONBTLiquidityManager</strong> at <code className="font-mono">0xb362…908</code> on Base).</p>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Pool / liquidity manager address</label>
              <input type="text" value={poolAddr} onChange={(e) => setPoolAddr(e.target.value.trim())} placeholder="0x…" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30" />
            </div>
            <motion.button type="button" whileHover={{ scale: canDeploy && !isBusy ? 1.02 : 1 }} whileTap={{ scale: 0.97 }} onClick={() => void handleRegister('pool')} disabled={!canDeploy || isBusy} className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50 transition-opacity">
              {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming...' : '🌊 Register Liquidity Pool'}
            </motion.button>
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence initial={false}>
          {isConfirmed && txHash && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800"
            >
              <p className="font-semibold">Registration confirmed ✅</p>
              <MiniAppExternalLink href={`${explorerBase}/tx/${txHash}`} className="font-mono break-all text-emerald-700 hover:underline">
                {txHash}
              </MiniAppExternalLink>
            </motion.div>
          )}
          {validationError && (
            <motion.div
              key={validationError}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700"
            >
              {validationError}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
