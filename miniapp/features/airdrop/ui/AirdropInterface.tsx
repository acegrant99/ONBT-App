'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatUnits, keccak256, toBytes } from 'viem';
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

interface Round {
  active: boolean;
  paused: boolean;
  merkleRoot: `0x${string}`;
  totalAmount: bigint;
  claimedAmount: bigint;
  startTime: bigint;
  endTime: bigint;
  description: string;
}

type AdminTab = 'create' | 'manage';

export function AirdropInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(
    chain?.id === 42161 ? 42161 : 8453,
  );
  const [roundIdInput, setRoundIdInput] = useState('0');
  const [amountInput, setAmountInput]   = useState('');
  const [proofInput, setProofInput]     = useState('');
  const [proofError, setProofError]     = useState<string | null>(null);
  const [previewValid, setPreviewValid] = useState<boolean | null>(null);
  const [adminOpen, setAdminOpen]       = useState(false);
  const [adminTab, setAdminTab]         = useState<AdminTab>('create');
  const [newRoot, setNewRoot]           = useState('');
  const [newTotal, setNewTotal]         = useState('');
  const [newStart, setNewStart]         = useState('');
  const [newEnd, setNewEnd]             = useState('');
  const [newDesc, setNewDesc]           = useState('');
  const [adminError, setAdminError]     = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const distributorAddress = (selectedChainId === 42161
    ? ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS
    : ONBT_DISTRIBUTOR_BASE_ADDRESS) as `0x${string}`;

  const isConfigured = distributorAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName   = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const explorerUrl = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;

  const publicClient = usePublicClient({ chainId: selectedChainId });

  // ── Contract reads ────────────────────────────────────────────────────
  const { data: ownerData } = useReadContract({
    chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'owner',
    query: { enabled: isConfigured, refetchInterval: 60_000 },
  });
  const contractOwner = ownerData as `0x${string}` | undefined;
  const isOwner = Boolean(address && contractOwner && address.toLowerCase() === contractOwner.toLowerCase());

  const { data: nextRoundIdRaw } = useReadContract({
    chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'nextRoundId',
    query: { enabled: isConfigured, refetchInterval: 30_000 },
  });
  const totalRounds = nextRoundIdRaw !== undefined ? Number(nextRoundIdRaw as bigint) : 0;

  // ── Derived values (MUST appear before any handler that uses them) ────
  const roundId = useMemo(() => {
    const n = parseInt(roundIdInput, 10);
    return Number.isFinite(n) && n >= 0 ? BigInt(n) : 0n;
  }, [roundIdInput]);

  const parsedProof = useMemo<`0x${string}`[] | null>(() => {
    const raw = proofInput.trim();
    if (!raw) return null;
    try {
      const arr = JSON.parse(raw) as unknown;
      if (!Array.isArray(arr)) throw new Error();
      return arr as `0x${string}`[];
    } catch {
      try {
        const lines = raw.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
        return lines as `0x${string}`[];
      } catch {
        return null;
      }
    }
  }, [proofInput]);

  const parsedAmount = useMemo<bigint | null>(() => {
    try { const n = BigInt(amountInput); return n > 0n ? n : null; } catch { return null; }
  }, [amountInput]);

  const { data: roundRaw, refetch: refetchRound } = useReadContract({
    chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'getRound', args: [roundId],
    query: { enabled: isConfigured && totalRounds > 0, refetchInterval: 15_000 },
  });
  const round = roundRaw as Round | undefined;

  const { data: alreadyClaimedRaw } = useReadContract({
    chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'claimed', args: [roundId, address!],
    query: { enabled: isConfigured && Boolean(address) && totalRounds > 0, refetchInterval: 15_000 },
  });
  const alreadyClaimed = Boolean(alreadyClaimedRaw);

  const { data: verifyData, refetch: refetchVerify } = useReadContract({
    chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
    functionName: 'verifyProof', args: [roundId, address!, parsedAmount!, parsedProof!],
    query: { enabled: isConfigured && Boolean(address) && parsedAmount !== null && parsedProof !== null, gcTime: 0 },
  });

  const now = Date.now();
  const roundActive = round
    ? !round.paused && round.active && Number(round.startTime) * 1000 <= now && now < Number(round.endTime) * 1000
    : false;

  const roundLabel = !round ? '—'
    : round.paused  ? 'Paused'
    : !round.active ? 'Closed'
    : Number(round.startTime) * 1000 > now ? 'Upcoming'
    : roundActive   ? 'Active'
    : 'Ended';

  const claimedPercent = round && round.totalAmount > 0n
    ? Math.min(100, Number(round.claimedAmount * 10000n / round.totalAmount) / 100)
    : 0;

  // ── Write contract ────────────────────────────────────────────────────
  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) { void refetchRound(); setAdminError(null); }
  }, [isConfirmed, refetchRound]);

  const isBusy = isPending || isConfirming;

  // ── Handlers (placed AFTER derived constants) ─────────────────────────
  const handleClaim = async () => {
    if (!address || parsedAmount === null || parsedProof === null) {
      setValidationError('Fill in amount and proof before claiming'); return;
    }
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: 'Claim airdrop tokens',
      account: address, connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI as never,
        functionName: 'claim', args: [roundId, parsedAmount, parsedProof] },
    });
    if (!pf.ok) { setValidationError(pf.copy); return; }
    setValidationError(null);
    writeContract({ chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
      functionName: 'claim', args: [roundId, parsedAmount, parsedProof] });
  };

  const handleVerify = async () => {
    setProofError(null);
    if (!parsedProof) { setProofError('Enter a valid proof JSON array or hex list'); return; }
    const result = await refetchVerify();
    setPreviewValid(result.data === true);
  };

  const handleCreateRound = async () => {
    setAdminError(null);
    if (!address) return;
    if (!/^0x[0-9a-fA-F]{64}$/.test(newRoot)) { setAdminError('Enter a valid 32-byte merkle root (0x…)'); return; }
    let total: bigint;
    try { total = BigInt(newTotal); if (total <= 0n) throw new Error(); }
    catch { setAdminError('Enter a valid total amount in wei'); return; }
    if (!newStart || !newEnd) { setAdminError('Enter start and end times'); return; }
    const startTs = BigInt(Math.floor(new Date(newStart).getTime() / 1000));
    const endTs   = BigInt(Math.floor(new Date(newEnd).getTime()   / 1000));
    if (endTs <= startTs) { setAdminError('End time must be after start time'); return; }
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: 'Create airdrop round',
      account: address, connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI as never,
        functionName: 'createRound', args: [newRoot as `0x${string}`, total, startTs, endTs, newDesc] },
    });
    if (!pf.ok) { setAdminError(pf.copy); return; }
    writeContract({ chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
      functionName: 'createRound', args: [newRoot as `0x${string}`, total, startTs, endTs, newDesc] });
  };

  const handlePause = async (pause: boolean) => {
    if (!address) return;
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: pause ? 'Pause round' : 'Unpause round',
      account: address, connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI as never,
        functionName: 'setRoundPaused', args: [roundId, pause] },
    });
    if (!pf.ok) { setAdminError(pf.copy); return; }
    writeContract({ chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
      functionName: 'setRoundPaused', args: [roundId, pause] });
  };

  const handleWithdrawRemainder = async () => {
    if (!address) return;
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: 'Withdraw remainder',
      account: address, connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI as never,
        functionName: 'withdrawRemainder', args: [roundId] },
    });
    if (!pf.ok) { setAdminError(pf.copy); return; }
    writeContract({ chainId: selectedChainId, address: distributorAddress, abi: ONBT_DISTRIBUTOR_ABI,
      functionName: 'withdrawRemainder', args: [roundId] });
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-green-900/40 to-teal-900/40 border border-green-500/20 p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-white">🪂 Airdrop</h2>
          {address && <WalletIdentityBadge address={address} label="Wallet" />}
        </div>
        <p className="text-xs text-gray-400">Claim your ONBT airdrop allocation using a merkle proof</p>
      </div>

      <ChainSelector selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} label="Chain" />

      {!isConfigured && (
        <div className="rounded-xl bg-yellow-900/30 border border-yellow-700/40 px-4 py-3 text-sm text-yellow-300">
          Distributor contract not yet deployed on {chainName}.
        </div>
      )}

      {isConfigured && totalRounds === 0 && (
        <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
          No airdrop rounds created yet on {chainName}.
        </div>
      )}

      {isConfigured && totalRounds > 0 && (
        <>
          {/* Round selector */}
          <div className="rounded-xl bg-gray-800/40 border border-gray-700/30 p-3 flex items-center gap-3">
            <label className="text-xs text-gray-400 whitespace-nowrap">Round ID</label>
            <input type="number" min={0} max={totalRounds - 1} title="Round ID" value={roundIdInput}
              onChange={(e) => { setRoundIdInput(e.target.value); setPreviewValid(null); }}
              className="w-24 bg-gray-700 text-white text-sm rounded-lg px-2.5 py-1.5 border border-gray-600 focus:outline-none focus:border-green-500"
            />
            <span className="text-xs text-gray-500">of {totalRounds} round{totalRounds !== 1 ? 's' : ''}</span>
            {round && (
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                roundLabel === 'Active'   ? 'bg-green-900/40 text-green-300' :
                roundLabel === 'Paused'   ? 'bg-yellow-900/40 text-yellow-300' :
                roundLabel === 'Upcoming' ? 'bg-blue-900/40 text-blue-300' :
                'bg-gray-700 text-gray-400'
              }`}>{roundLabel}</span>
            )}
          </div>

          {/* Round detail card */}
          <AnimatePresence mode="wait">
            {round && (
              <motion.div key={roundIdInput} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl bg-gray-800/40 border border-green-500/20 p-4 space-y-4"
              >
                {round.description && (
                  <p className="text-sm text-gray-200 font-medium">{round.description}</p>
                )}

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Distributed</span><span>{claimedPercent.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                      initial={{ width: 0 }} animate={{ width: `${claimedPercent}%` }} transition={{ duration: 0.8 }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total', value: fmt(round.totalAmount) },
                    { label: 'Claimed', value: fmt(round.claimedAmount) },
                    { label: 'Start', value: new Date(Number(round.startTime) * 1000).toLocaleDateString() },
                    { label: 'End',   value: new Date(Number(round.endTime)   * 1000).toLocaleDateString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-gray-700/30 p-3">
                      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {alreadyClaimed && (
                  <div className="rounded-xl bg-green-900/20 border border-green-500/30 px-3 py-2 text-xs text-green-300">
                    ✓ You have already claimed from this round
                  </div>
                )}

                {!alreadyClaimed && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Your allocation <span className="text-gray-500">(wei)</span></label>
                      <input type="text" placeholder="e.g. 1000000000000000000" value={amountInput}
                        onChange={(e) => { setAmountInput(e.target.value); setPreviewValid(null); }}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-green-500"
                      />
                      {parsedAmount && <p className="text-[11px] text-gray-500 mt-0.5">≈ {fmt(parsedAmount)} ONBT</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Merkle proof <span className="text-gray-500">(JSON array or one per line)</span></label>
                      <textarea rows={3} placeholder={'["0xabc…","0xdef…"]'} value={proofInput}
                        onChange={(e) => { setProofInput(e.target.value); setPreviewValid(null); }}
                        className="w-full bg-gray-700 text-white text-xs rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-green-500 font-mono resize-none"
                      />
                      {proofError && <p className="text-xs text-red-400">{proofError}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => void handleVerify()}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-green-600 text-green-300 hover:bg-green-900/20 transition-colors"
                      >Verify proof</button>
                      {previewValid !== null && (
                        <div className={`flex items-center gap-1 px-3 text-xs rounded-xl ${
                          previewValid ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-400'
                        }`}>
                          {previewValid ? '✓ Valid' : '✗ Invalid'}
                        </div>
                      )}
                    </div>

                    {validationError && <p className="text-xs text-red-400">{validationError}</p>}

                    <button disabled={isBusy || !roundActive || !address}
                      onClick={() => void handleClaim()}
                      className="w-full py-3 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isBusy ? (isConfirming ? 'Confirming…' : 'Claiming…')
                        : !address ? 'Connect wallet'
                        : !roundActive ? `Round ${roundLabel.toLowerCase()}`
                        : 'Claim tokens'}
                    </button>
                  </div>
                )}

                <AnimatePresence>
                  {isConfirmed && txHash && (
                    <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      href={`${explorerUrl}/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="block text-center text-xs text-green-400 hover:text-green-300 underline"
                    >✓ Transaction confirmed ↗</motion.a>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Admin panel (owner only) ──────────────────────────────────────── */}
      {isConfigured && isOwner && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-950/20 p-4 space-y-3">
          <button onClick={() => setAdminOpen((v) => !v)} className="flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-orange-300">⚙️ Admin</span>
            <span className="text-xs text-orange-400">{adminOpen ? '▲ hide' : '▼ show'}</span>
          </button>
          <AnimatePresence>
            {adminOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-3"
              >
                <div className="flex gap-2">
                  {(['create', 'manage'] as AdminTab[]).map((t) => (
                    <button key={t} onClick={() => setAdminTab(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        adminTab === t ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >{t === 'create' ? '＋ New round' : '✎ Manage round'}</button>
                  ))}
                </div>

                {adminTab === 'create' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Merkle root</label>
                      <input type="text" placeholder="0x…" value={newRoot} onChange={(e) => setNewRoot(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500 font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Total allocation <span className="text-gray-500">(wei)</span></label>
                      <input type="text" placeholder="e.g. 1000000000000000000000" value={newTotal} onChange={(e) => setNewTotal(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      {(() => { try { const n = BigInt(newTotal); return n > 0n ? <p className="text-[11px] text-gray-500 mt-0.5">≈ {fmt(n)} ONBT</p> : null; } catch { return null; } })()}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Start time</label>
                        <input type="datetime-local" title="Round start time" value={newStart} onChange={(e) => setNewStart(e.target.value)}
                          className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">End time</label>
                        <input type="datetime-local" title="Round end time" value={newEnd} onChange={(e) => setNewEnd(e.target.value)}
                          className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Description <span className="text-gray-500">(optional)</span></label>
                      <input type="text" placeholder="e.g. Community airdrop round 1" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                    </div>
                    {adminError && <p className="text-xs text-red-400">{adminError}</p>}
                    <button disabled={isBusy} onClick={() => void handleCreateRound()}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    >{isBusy ? (isConfirming ? 'Confirming…' : 'Creating…') : 'Create round'}</button>
                  </div>
                )}

                {adminTab === 'manage' && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">Managing round <span className="font-mono text-white">#{roundIdInput}</span></p>
                    {!round && <p className="text-xs text-gray-500 italic">Select a round above first</p>}
                    {round && (
                      <>
                        <div className="flex gap-2">
                          <button disabled={isBusy || !round.active || round.paused} onClick={() => void handlePause(true)}
                            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-yellow-700 hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed"
                          >Pause</button>
                          <button disabled={isBusy || !round.active || !round.paused} onClick={() => void handlePause(false)}
                            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed"
                          >Unpause</button>
                        </div>
                        <button disabled={isBusy || !round.active} onClick={() => void handleWithdrawRemainder()}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-800 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        >Withdraw remainder</button>
                        {adminError && <p className="text-xs text-red-400">{adminError}</p>}
                        <p className="text-[11px] text-gray-500">Remaining: {fmt((round.totalAmount ?? 0n) - (round.claimedAmount ?? 0n))} ONBT</p>
                      </>
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {isConfirmed && txHash && (
                    <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      href={`${explorerUrl}/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="block text-center text-xs text-green-400 hover:text-green-300 underline"
                    >✓ Done — view transaction ↗</motion.a>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {isConfigured && (
        <a href={`${explorerUrl}/address/${distributorAddress}`} target="_blank" rel="noopener noreferrer"
          className="block text-center text-[11px] text-gray-500 hover:text-gray-400 underline"
        >Distributor contract on {chainName} ↗</a>
      )}
    </div>
  );
}
