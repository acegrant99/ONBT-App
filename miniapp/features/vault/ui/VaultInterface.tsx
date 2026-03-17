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
import { formatEther, parseEther } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_VAULT_ABI,
  ONBT_VAULT_ARBITRUM_ADDRESS,
  ONBT_VAULT_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000' as `0x${string}`;

export function VaultInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [depositAmount, setDepositAmount] = useState('0.01');
  const [validationError, setValidationError] = useState<string | null>(null);
  const publicClient = usePublicClient({ chainId: selectedChainId });

  const vaultAddress = (selectedChainId === 42161
    ? ONBT_VAULT_ARBITRUM_ADDRESS
    : ONBT_VAULT_BASE_ADDRESS) as `0x${string}`;
  const tokenAddress = (selectedChainId === 42161 ? ONBT_ARBITRUM_ADDRESS : ONBT_TOKEN_ADDRESS) as `0x${string}`;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;

  const { data: isHub } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'isHub',
    query: { refetchInterval: 30_000 },
  });

  const { data: localEid } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'localEid',
    query: { refetchInterval: 60_000 },
  });

  const { data: governance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'governance',
    query: { refetchInterval: 30_000 },
  });

  const { data: nativeBalance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [NATIVE_TOKEN],
    query: { refetchInterval: 15_000 },
  });

  const { data: tokenBalance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [tokenAddress],
    query: { refetchInterval: 15_000 },
  });

  const { data: tokenAvailable } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getAvailableBalance',
    args: [tokenAddress],
    query: { refetchInterval: 15_000 },
  });

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const parsedDeposit = useMemo(() => {
    try {
      if (!depositAmount || Number(depositAmount) <= 0) return 0n;
      return parseEther(depositAmount);
    } catch {
      return 0n;
    }
  }, [depositAmount]);

  const handleDepositNative = async () => {
    setValidationError(null);

    if (!address) {
      setValidationError('Connect wallet to deposit native gas token.');
      return;
    }

    if (parsedDeposit <= 0n) {
      setValidationError('Enter a valid deposit amount.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Vault native deposit',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: vaultAddress,
        abi: ONBT_VAULT_ABI,
        functionName: 'depositNative',
        value: parsedDeposit,
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      return;
    }

    writeContract({
      chainId: selectedChainId,
      address: vaultAddress,
      abi: ONBT_VAULT_ABI,
      functionName: 'depositNative',
      value: parsedDeposit,
    });
  };

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-4 sm:p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Vault chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {isHub !== undefined && (
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
            isHub
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            {isHub ? 'Hub' : 'Spoke'}
          </span>
        )}
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Vault operator" />}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-900">Vault state</span>
          <span className="ml-auto text-[11px] text-slate-400 font-mono">{chainName} · EID {localEid ? String(localEid) : '—'}</span>
        </div>
        <p><strong>Vault:</strong> <span className="font-mono text-xs break-all">{vaultAddress}</span></p>
        <p><strong>Governance:</strong> <span className="font-mono text-xs break-all">{governance ? String(governance) : '—'}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {[
          { label: 'Native Balance', value: `${parseFloat(formatEther((nativeBalance ?? 0n) as bigint)).toFixed(4)} ETH` },
          { label: 'ONBT Balance', value: `${parseFloat(formatEther((tokenBalance ?? 0n) as bigint)).toFixed(4)}` },
          { label: 'ONBT Available', value: `${parseFloat(formatEther((tokenAvailable ?? 0n) as bigint)).toFixed(4)}` },
        ].map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{card.label}</span>
            <span className="block text-base font-bold text-slate-900">{card.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={depositAmount}
            onChange={(event) => setDepositAmount(event.target.value)}
            placeholder="0.01"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <motion.button
            type="button"
            whileHover={{ scale: address && !isPending && !isConfirming ? 1.02 : 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => void handleDepositNative()}
            disabled={!address || isPending || isConfirming}
            className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
          >
            {isPending ? 'Broadcasting...' : isConfirming ? 'Confirming...' : 'Deposit Native'}
          </motion.button>
        </div>
        <AnimatePresence initial={false}>
          {isConfirmed && txHash ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 font-mono break-all"
            >
              Deposit confirmed: {txHash}
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
