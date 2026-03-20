'use client';

import React, { useMemo, useState } from 'react';
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
  ONBT_DISTRIBUTOR_ABI,
  ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS,
  ONBT_DISTRIBUTOR_BASE_ADDRESS,
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

interface RoundResult {
  merkleRoot: `0x${string}`;
  totalAmount: bigint;
  claimedAmount: bigint;
  startTime: bigint;
  endTime: bigint;
  paused: boolean;
  closed: boolean;
  mirrorOnly: boolean;
  description: string;
  originEid: number;
}

export function AirdropInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(
    chain?.id === 42161 ? 42161 : 8453,
  );
  const [roundIdInput, setRoundIdInput] = useState('0');
  const [amountInput, setAmountInput] = useState('');
  const [proofInput, setProofInput] = useState('');
  const [proofError, setProofError] = useState<string | null>(null);
  const [previewValid, setPreviewValid] = useState<boolean | null>(null);

  const distributorAddress = (selectedChainId === 42161
    ? ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS
    : ONBT_DISTRIBUTOR_BASE_ADDRESS) as `0x${string}`;

  const isConfigured = distributorAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName = selectedChainId === 42161
    ? CHAIN_CONFIG.arbitrum.name
    : CHAIN_CONFIG.base.name;
  const explorerUrl = selectedChainId === 42161
    ? CHAIN_CONFIG.arbitrum.blockExplorer
    : CHAIN_CONFIG.base.blockExplorer;

  const roundId = BigInt(Number.isFinite(parseInt(roundIdInput, 10)) ? parseInt(roundIdInput, 10) : 0);

  // ── Parse proof from textarea ─────────────────────────────────────────────
  const parsedProof = useMemo((): `0x${string}`[] | null => {
    const raw = proofInput.trim();
    if (!raw) return [];
    try {
      // Accept JSON array or newline-separated hex strings
      let arr: string[];
      if (raw.startsWith('[')) {
        arr = JSON.parse(raw) as string[];
      } else {
        arr = raw.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
      }
      if (!arr.every((h) => /^0x[0-9a-fA-F]{64}$/.test(h))) return null;
      return arr as `0x${string}`[];
    } catch {
      return null;
    }
  }, [proofInput]);

  const proofIsValid = parsedProof !== null;
  const parsedAmount = useMemo((): bigint | null => {
    try {
      return BigInt(amountInput);
    } catch {
      return null;
    }
  }, [amountInput]);

  // ── Read: total rounds ──────────────────────────────────────────────────
  const { data: nextRoundIdData } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'nextRoundId',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });
  const totalRounds = nextRoundIdData !== undefined ? Number(nextRoundIdData as bigint) : null;

  // ── Read: selected round ────────────────────────────────────────────────
  const { data: roundData } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'getRound',
    args: [roundId],
    query: {
      enabled: isConfigured && totalRounds !== null && Number(roundId) < (totalRounds ?? 0),
      refetchInterval: 15_000,
    },
  });
  const round = roundData as RoundResult | undefined;

  // ── Read: user already claimed? ──────────────────────────────────────────
  const { data: alreadyClaimed, refetch: refetchClaimed } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'claimed',
    args: [roundId, address!],
    query: { enabled: isConfigured && Boolean(address) && round !== undefined, refetchInterval: 15_000 },
  });

  // ── Read: verify proof (dry-run) ─────────────────────────────────────────
  const { data: verifyData, refetch: refetchVerify } = useReadContract({
    chainId: selectedChainId,
    address: distributorAddress,
    abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'verifyProof',
    args: [roundId, address!, parsedAmount ?? 0n, parsedProof ?? []],
    query: {
      enabled:
        isConfigured &&
        Boolean(address) &&
        proofIsValid &&
        parsedAmount !== null &&
        parsedAmount > 0n,
      refetchInterval: false,
    },
  });

  // ── Write ─────────────────────────────────────────────────────────────────
  const { data: txHash, writeContract, isPending, reset: resetWrite } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const isBusy = isPending || isConfirming;

  const handleClaim = () => {
    setProofError(null);
    if (!parsedProof || parsedProof.length === 0) {
      setProofError('Paste your Merkle proof first');
      return;
    }
    if (!parsedAmount || parsedAmount <= 0n) {
      setProofError('Enter a valid claimable amount (in wei)');
      return;
    }
    const err = runActionPreflight({ address, isWalletOnSelectedChain });
    if (err) {
      if (!isWalletOnSelectedChain) switchChain({ chainId: selectedChainId });
      return;
    }
    writeContract({
      chainId: selectedChainId,
      address: distributorAddress,
      abi: ONBT_DISTRIBUTOR_ABI,
      functionName: 'claim',
      args: [roundId, parsedAmount, parsedProof],
    });
  };

  const handleVerify = () => {
    setPreviewValid(null);
    void refetchVerify().then((r) => {
      setPreviewValid(r.data as boolean | null ?? false);
    });
  };

  // ── Round status ─────────────────────────────────────────────────────────
  const now = Math.floor(Date.now() / 1000);
  const roundActive =
    round &&
    !round.paused &&
    !round.closed &&
    Number(round.startTime) <= now &&
    now < Number(round.endTime);

  const roundLabel = !round
    ? '—'
    : round.closed
    ? 'Closed'
    : round.paused
    ? 'Paused'
    : roundActive
    ? 'Active'
    : now < Number(round.startTime)
    ? `Starts ${new Date(Number(round.startTime) * 1000).toLocaleDateString()}`
    : 'Expired';

  const claimedPercent =
    round && round.totalAmount > 0n
      ? Math.min(100, Number((round.claimedAmount * 10000n) / round.totalAmount) / 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 border border-emerald-500/20 p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-white">🪂 Airdrop Claim</h2>
          <WalletIdentityBadge />
        </div>
        <p className="text-xs text-gray-400">
          Claim your ONBT from active Merkle distribution rounds
        </p>
      </div>

      {/* Chain selector */}
      <ChainSelector selectedChainId={selectedChainId} onChange={setSelectedChainId} label="Chain" />

      {/* Not configured */}
      {!isConfigured && (
        <div className="rounded-xl bg-yellow-900/30 border border-yellow-700/40 px-4 py-3 text-sm text-yellow-300">
          Distributor not yet deployed on {chainName}.
        </div>
      )}

      {isConfigured && (
        <>
          {/* Round selector */}
          <div className="rounded-xl bg-gray-800/40 border border-gray-700/30 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 shrink-0">Round ID</label>
              <input
                type="number"
                min={0}
                value={roundIdInput}
                onChange={(e) => setRoundIdInput(e.target.value)}
                className="w-24 bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-600 focus:outline-none focus:border-emerald-500"
              />
              {totalRounds !== null && (
                <span className="text-[11px] text-gray-500">{totalRounds} round(s) total</span>
              )}
            </div>
          </div>

          {/* Round info */}
          <AnimatePresence mode="wait">
            {round && (
              <motion.div
                key={roundIdInput}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl bg-gray-800/40 border border-emerald-500/20 p-4 space-y-3"
              >
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {round.description || `Round #${roundIdInput}`}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      roundActive
                        ? 'bg-green-900/40 text-green-300'
                        : round.paused
                        ? 'bg-yellow-900/40 text-yellow-300'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {roundLabel}
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Claimed</span>
                    <span>
                      {fmt(round.claimedAmount)} / {fmt(round.totalAmount)} ONBT ({claimedPercent.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${claimedPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                  <div>
                    <p className="text-[10px] mb-0.5">Start</p>
                    <p className="text-gray-300">{new Date(Number(round.startTime) * 1000).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] mb-0.5">End</p>
                    <p className="text-gray-300">{new Date(Number(round.endTime) * 1000).toLocaleString()}</p>
                  </div>
                </div>

                {/* Already claimed badge */}
                {alreadyClaimed && (
                  <div className="rounded-lg bg-green-900/30 border border-green-700/40 px-3 py-2 text-xs text-green-300 text-center">
                    ✓ You have already claimed from this round
                  </div>
                )}

                {/* Claim form */}
                {!alreadyClaimed && address && roundActive && (
                  <div className="space-y-3 pt-1">
                    {/* Amount in wei */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Claimable amount <span className="text-gray-500">(wei)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 500000000000000000000"
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-emerald-500"
                      />
                      {parsedAmount !== null && parsedAmount > 0n && (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ≈ {fmt(parsedAmount)} ONBT
                        </p>
                      )}
                    </div>

                    {/* Proof */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Merkle proof <span className="text-gray-500">(JSON array or one hash per line)</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder={'["0xabc...","0xdef..."]'}
                        value={proofInput}
                        onChange={(e) => { setProofInput(e.target.value); setPreviewValid(null); }}
                        className="w-full bg-gray-700 text-white text-xs font-mono rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                      {!proofIsValid && proofInput.trim() && (
                        <p className="text-[11px] text-red-400 mt-0.5">Invalid proof format — each element must be a 0x-prefixed 32-byte hex</p>
                      )}
                    </div>

                    {/* Verify button */}
                    <button
                      onClick={handleVerify}
                      disabled={!proofIsValid || !parsedAmount || parsedAmount <= 0n || !address}
                      className="w-full py-2 rounded-xl text-sm font-medium border border-emerald-600 text-emerald-400 hover:bg-emerald-900/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Verify proof (dry-run)
                    </button>

                    {previewValid !== null && (
                      <p className={`text-xs text-center ${previewValid ? 'text-green-400' : 'text-red-400'}`}>
                        {previewValid ? '✓ Proof is valid — ready to claim' : '✗ Proof invalid for your address / amount'}
                      </p>
                    )}

                    {proofError && (
                      <p className="text-xs text-red-400 text-center">{proofError}</p>
                    )}

                    {/* Claim button */}
                    <button
                      disabled={isBusy || !proofIsValid || !parsedAmount || parsedAmount <= 0n}
                      onClick={handleClaim}
                      className="w-full py-3 rounded-xl font-semibold text-sm transition-all
                        bg-gradient-to-r from-emerald-600 to-cyan-600
                        hover:from-emerald-500 hover:to-cyan-500
                        disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isBusy
                        ? isConfirming
                          ? 'Confirming…'
                          : 'Claiming…'
                        : 'Claim tokens'}
                    </button>

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
                  </div>
                )}

                {/* Not connected prompt */}
                {!address && (
                  <p className="text-xs text-gray-400 text-center pt-1">Connect wallet to claim</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {totalRounds === 0 && (
            <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
              No distribution rounds on {chainName} yet.
            </div>
          )}
        </>
      )}

      {/* Contract link */}
      {isConfigured && (
        <a
          href={`${explorerUrl}/address/${distributorAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[11px] text-gray-500 hover:text-gray-400 underline"
        >
          Distributor contract on {chainName} ↗
        </a>
      )}
    </div>
  );
}
