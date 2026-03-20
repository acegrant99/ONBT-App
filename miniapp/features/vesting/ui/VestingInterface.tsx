'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatUnits } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_VESTING_ABI,
  ONBT_VESTING_ARBITRUM_ADDRESS,
  ONBT_VESTING_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

function fmt(wei: bigint | undefined, decimals = 18): string {
  if (wei === undefined) return '—';
  const n = Number(formatUnits(wei, decimals));
  if (n === 0) return '0';
  if (n < 0.0001) return '<0.0001';
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function shortId(id: `0x${string}`): string {
  return `${id.slice(0, 10)}…${id.slice(-8)}`;
}

export function VestingInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(
    chain?.id === 42161 ? 42161 : 8453,
  );
  const [selectedId, setSelectedId] = useState<`0x${string}` | null>(null);

  const vestingAddress = (selectedChainId === 42161
    ? ONBT_VESTING_ARBITRUM_ADDRESS
    : ONBT_VESTING_BASE_ADDRESS) as `0x${string}`;

  const isConfigured = vestingAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName = selectedChainId === 42161
    ? CHAIN_CONFIG.arbitrum.name
    : CHAIN_CONFIG.base.name;
  const explorerUrl = selectedChainId === 42161
    ? CHAIN_CONFIG.arbitrum.blockExplorer
    : CHAIN_CONFIG.base.blockExplorer;

  // ── Read: schedule IDs for connected wallet ──────────────────────────────
  const { data: scheduleIds, refetch: refetchIds } = useReadContract({
    chainId: selectedChainId,
    address: vestingAddress,
    abi: ONBT_VESTING_ABI,
    functionName: 'getScheduleIds',
    args: [address!],
    query: { enabled: isConfigured && Boolean(address), refetchInterval: 30_000 },
  });

  const ids = useMemo(() => (scheduleIds ?? []) as `0x${string}`[], [scheduleIds]);

  // Auto-select first schedule
  useEffect(() => {
    if (ids.length > 0 && !selectedId) setSelectedId(ids[0]);
  }, [ids, selectedId]);

  // ── Read: full schedule struct ────────────────────────────────────────────
  const { data: schedule } = useReadContract({
    chainId: selectedChainId,
    address: vestingAddress,
    abi: ONBT_VESTING_ABI,
    functionName: 'schedules',
    args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });

  // ── Read: vested + claimable amounts ─────────────────────────────────────
  const { data: vestedRaw } = useReadContract({
    chainId: selectedChainId,
    address: vestingAddress,
    abi: ONBT_VESTING_ABI,
    functionName: 'vestedAmount',
    args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });
  const { data: claimableRaw, refetch: refetchClaimable } = useReadContract({
    chainId: selectedChainId,
    address: vestingAddress,
    abi: ONBT_VESTING_ABI,
    functionName: 'claimableAmount',
    args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });

  // ── Write ─────────────────────────────────────────────────────────────────
  const { data: txHash, writeContract, isPending, reset: resetWrite } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isConfirmed) {
      void refetchIds();
      void refetchClaimable();
    }
  }, [isConfirmed, refetchIds, refetchClaimable]);

  const isBusy = isPending || isConfirming;

  const handleClaim = () => {
    if (!selectedId) return;
    const err = runActionPreflight({ address, isWalletOnSelectedChain });
    if (err) {
      if (!isWalletOnSelectedChain) switchChain({ chainId: selectedChainId });
      return;
    }
    writeContract({
      chainId: selectedChainId,
      address: vestingAddress,
      abi: ONBT_VESTING_ABI,
      functionName: 'claim',
      args: [selectedId],
    });
  };

  // ── Derived display values ────────────────────────────────────────────────
  const s = schedule as
    | { active: boolean; revoked: boolean; beneficiary: `0x${string}`; totalAmount: bigint; claimedAmount: bigint; startTime: bigint; cliffDuration: bigint; vestingDuration: bigint }
    | undefined;

  const vestedAmt = vestedRaw as bigint | undefined;
  const claimableAmt = claimableRaw as bigint | undefined;

  const progress = s && s.totalAmount > 0n
    ? Math.min(100, Number((vestedAmt ?? 0n) * 10000n / s.totalAmount) / 100)
    : 0;

  const vestEndTs = s ? Number(s.startTime + s.vestingDuration) * 1000 : null;
  const cliffEndTs = s ? Number(s.startTime + s.cliffDuration) * 1000 : null;
  const now = Date.now();
  const inCliff = cliffEndTs !== null && now < cliffEndTs;
  const vestComplete = vestEndTs !== null && now >= vestEndTs;

  const statusLabel = !s
    ? '—'
    : s.revoked
    ? 'Revoked'
    : vestComplete
    ? 'Fully vested'
    : inCliff
    ? `Cliff: ${new Date(cliffEndTs!).toLocaleDateString()}`
    : 'Vesting';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-white">🔒 Token Vesting</h2>
          <WalletIdentityBadge />
        </div>
        <p className="text-xs text-gray-400">View and claim your ONBT vesting schedules</p>
      </div>

      {/* Chain selector */}
      <ChainSelector
        selectedChainId={selectedChainId}
        onChange={setSelectedChainId}
        label="Chain"
      />

      {/* Contract not configured */}
      {!isConfigured && (
        <div className="rounded-xl bg-yellow-900/30 border border-yellow-700/40 px-4 py-3 text-sm text-yellow-300">
          Vesting contract not yet deployed on {chainName}. Switch chain or check back after deployment.
        </div>
      )}

      {/* Not connected */}
      {isConfigured && !address && (
        <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
          Connect your wallet to view vesting schedules
        </div>
      )}

      {/* Schedule list */}
      {isConfigured && address && ids.length === 0 && (
        <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
          No vesting schedules found for your address on {chainName}.
        </div>
      )}

      {isConfigured && address && ids.length > 0 && (
        <>
          {/* Schedule picker */}
          {ids.length > 1 && (
            <div className="rounded-xl bg-gray-800/40 border border-gray-700/30 p-3">
              <p className="text-xs text-gray-400 mb-2">Select schedule ({ids.length} total)</p>
              <div className="flex flex-wrap gap-2">
                {ids.map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedId(id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      selectedId === id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {shortId(id)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Schedule detail card */}
          <AnimatePresence mode="wait">
            {selectedId && (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl bg-gray-800/40 border border-purple-500/20 p-4 space-y-4"
              >
                {/* Status + ID */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-400">{shortId(selectedId)}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s?.revoked
                        ? 'bg-red-900/40 text-red-300'
                        : vestComplete
                        ? 'bg-green-900/40 text-green-300'
                        : 'bg-purple-900/40 text-purple-300'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Vested</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Amounts grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total', value: fmt(s?.totalAmount) },
                    { label: 'Claimed', value: fmt(s?.claimedAmount) },
                    { label: 'Vested', value: fmt(vestedAmt) },
                    { label: 'Claimable', value: fmt(claimableAmt), highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className={`rounded-xl p-3 ${highlight ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-700/30'}`}
                    >
                      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                      <p className={`text-sm font-semibold ${highlight ? 'text-purple-200' : 'text-white'}`}>
                        {value} <span className="text-[10px] font-normal text-gray-500">ONBT</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dates */}
                {s && (
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                    <div>
                      <p className="text-[10px] mb-0.5">Cliff ends</p>
                      <p className="text-gray-300">{new Date(Number(s.startTime + s.cliffDuration) * 1000).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] mb-0.5">Vest ends</p>
                      <p className="text-gray-300">{new Date(Number(s.startTime + s.vestingDuration) * 1000).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {/* Claim button */}
                <button
                  disabled={isBusy || !claimableAmt || claimableAmt === 0n || s?.revoked}
                  onClick={handleClaim}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all
                    bg-gradient-to-r from-purple-600 to-blue-600
                    hover:from-purple-500 hover:to-blue-500
                    disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isBusy
                    ? isConfirming
                      ? 'Confirming…'
                      : 'Claiming…'
                    : claimableAmt && claimableAmt > 0n
                    ? `Claim ${fmt(claimableAmt)} ONBT`
                    : 'Nothing to claim'}
                </button>

                {/* Tx confirmed */}
                <AnimatePresence>
                  {isConfirmed && txHash && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={`${explorerUrl}/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-xs text-green-400 hover:text-green-300 underline"
                    >
                      ✓ Claimed — view transaction ↗
                    </motion.a>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Contract link */}
      {isConfigured && (
        <a
          href={`${explorerUrl}/address/${vestingAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[11px] text-gray-500 hover:text-gray-400 underline"
        >
          Vesting contract on {chainName} ↗
        </a>
      )}
    </div>
  );
}
