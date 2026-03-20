'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  usePublicClient,
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
const SECONDS_PER_DAY = 86400n;

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

function parseDays(s: string): bigint {
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? BigInt(n) * SECONDS_PER_DAY : 0n;
}

interface VestingSchedule {
  active: boolean;
  revocable: boolean;
  revoked: boolean;
  beneficiary: `0x${string}`;
  totalAmount: bigint;
  claimedAmount: bigint;
  startTime: bigint;
  cliffDuration: bigint;
  vestingDuration: bigint;
  originEid: number;
}

type AdminView = 'create' | 'revoke';

export function VestingInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(
    chain?.id === 42161 ? 42161 : 8453,
  );
  const [selectedId, setSelectedId] = useState<`0x${string}` | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminView, setAdminView] = useState<AdminView>('create');
  const [newBeneficiary, setNewBeneficiary] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCliff, setNewCliff] = useState('365');
  const [newVesting, setNewVesting] = useState('1461');
  const [newRevocable, setNewRevocable] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const vestingAddress = (selectedChainId === 42161
    ? ONBT_VESTING_ARBITRUM_ADDRESS
    : ONBT_VESTING_BASE_ADDRESS) as `0x${string}`;

  const isConfigured = vestingAddress.toLowerCase() !== ZERO_ADDRESS;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const explorerUrl = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;

  const publicClient = usePublicClient({ chainId: selectedChainId });

  const { data: ownerData } = useReadContract({
    chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI, functionName: 'owner',
    query: { enabled: isConfigured, refetchInterval: 60_000 },
  });
  const contractOwner = ownerData as `0x${string}` | undefined;
  const isOwner = Boolean(address && contractOwner && address.toLowerCase() === contractOwner.toLowerCase());

  const { data: scheduleIds, refetch: refetchIds } = useReadContract({
    chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI,
    functionName: 'getScheduleIds', args: [address!],
    query: { enabled: isConfigured && Boolean(address), refetchInterval: 30_000 },
  });
  const ids = useMemo(() => (scheduleIds ?? []) as `0x${string}`[], [scheduleIds]);

  useEffect(() => {
    if (ids.length > 0 && !selectedId) setSelectedId(ids[0]);
  }, [ids, selectedId]);

  const { data: scheduleRaw } = useReadContract({
    chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI,
    functionName: 'schedules', args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });
  const s = scheduleRaw as VestingSchedule | undefined;

  const { data: vestedRaw } = useReadContract({
    chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI,
    functionName: 'vestedAmount', args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });
  const { data: claimableRaw, refetch: refetchClaimable } = useReadContract({
    chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI,
    functionName: 'claimableAmount', args: [selectedId!],
    query: { enabled: isConfigured && Boolean(selectedId), refetchInterval: 15_000 },
  });
  const vestedAmt = vestedRaw as bigint | undefined;
  const claimableAmt = claimableRaw as bigint | undefined;

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) { void refetchIds(); void refetchClaimable(); setAdminError(null); }
  }, [isConfirmed, refetchIds, refetchClaimable]);

  const isBusy = isPending || isConfirming;

  const handleClaim = async () => {
    if (!selectedId || !address) return;
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: 'Claim vested tokens', account: address,
      connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: vestingAddress, abi: ONBT_VESTING_ABI as never, functionName: 'claim', args: [selectedId] },
    });
    if (!pf.ok) { setValidationError(pf.copy); return; }
    setValidationError(null);
    writeContract({ chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI, functionName: 'claim', args: [selectedId] });
  };

  const handleCreateSchedule = async () => {
    setAdminError(null);
    if (!address) return;
    if (!/^0x[0-9a-fA-F]{40}$/.test(newBeneficiary)) { setAdminError('Enter a valid beneficiary address'); return; }
    let amount: bigint;
    try { amount = BigInt(newAmount); if (amount <= 0n) throw new Error(); }
    catch { setAdminError('Enter a valid amount in wei'); return; }
    const cliff = parseDays(newCliff);
    const vest  = parseDays(newVesting);
    if (vest <= 0n) { setAdminError('Vesting duration must be > 0 days'); return; }
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const startTs = BigInt(Math.floor(Date.now() / 1000));
    const pf = await runActionPreflight({
      actionLabel: 'Create vesting schedule', account: address,
      connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: vestingAddress, abi: ONBT_VESTING_ABI as never, functionName: 'createSchedule',
        args: [newBeneficiary as `0x${string}`, amount, startTs, cliff, vest, newRevocable] },
    });
    if (!pf.ok) { setAdminError(pf.copy); return; }
    writeContract({ chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI,
      functionName: 'createSchedule', args: [newBeneficiary as `0x${string}`, amount, startTs, cliff, vest, newRevocable] });
  };

  const handleRevoke = async () => {
    if (!selectedId || !address) return;
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const pf = await runActionPreflight({
      actionLabel: 'Revoke vesting schedule', account: address,
      connectedChainId: chain?.id, targetChainId: selectedChainId, publicClient,
      request: { address: vestingAddress, abi: ONBT_VESTING_ABI as never, functionName: 'revoke', args: [selectedId] },
    });
    if (!pf.ok) { setAdminError(pf.copy); return; }
    writeContract({ chainId: selectedChainId, address: vestingAddress, abi: ONBT_VESTING_ABI, functionName: 'revoke', args: [selectedId] });
  };

  const progress = s && s.totalAmount > 0n ? Math.min(100, Number((vestedAmt ?? 0n) * 10000n / s.totalAmount) / 100) : 0;
  const now = Date.now();
  const cliffEndTs  = s ? Number(s.startTime + s.cliffDuration)  * 1000 : null;
  const vestEndTs   = s ? Number(s.startTime + s.vestingDuration) * 1000 : null;
  const inCliff     = cliffEndTs !== null && now < cliffEndTs;
  const vestComplete = vestEndTs !== null && now >= vestEndTs;
  const statusLabel = !s ? '—' : s.revoked ? 'Revoked' : vestComplete ? 'Fully vested'
    : inCliff ? `Cliff: ${new Date(cliffEndTs!).toLocaleDateString()}` : 'Vesting';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-white">🔒 Token Vesting</h2>
          {address && <WalletIdentityBadge address={address} label="Wallet" />}
        </div>
        <p className="text-xs text-gray-400">View and claim your ONBT vesting schedules</p>
      </div>

      <ChainSelector selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} label="Chain" />

      {!isConfigured && (
        <div className="rounded-xl bg-yellow-900/30 border border-yellow-700/40 px-4 py-3 text-sm text-yellow-300">
          Vesting contract not yet deployed on {chainName}.
        </div>
      )}

      {isConfigured && !address && (
        <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
          Connect your wallet to view vesting schedules
        </div>
      )}

      {isConfigured && address && ids.length === 0 && (
        <div className="rounded-xl bg-gray-800/50 border border-gray-700/40 px-4 py-3 text-sm text-gray-400 text-center">
          No vesting schedules found for your address on {chainName}.
        </div>
      )}

      {isConfigured && address && ids.length > 0 && (
        <>
          {ids.length > 1 && (
            <div className="rounded-xl bg-gray-800/40 border border-gray-700/30 p-3">
              <p className="text-xs text-gray-400 mb-2">Select schedule ({ids.length} total)</p>
              <div className="flex flex-wrap gap-2">
                {ids.map((id) => (
                  <button key={id} onClick={() => setSelectedId(id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      selectedId === id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >{shortId(id)}</button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {selectedId && (
              <motion.div key={selectedId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl bg-gray-800/40 border border-purple-500/20 p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-400">{shortId(selectedId)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    s?.revoked ? 'bg-red-900/40 text-red-300' : vestComplete ? 'bg-green-900/40 text-green-300' : 'bg-purple-900/40 text-purple-300'
                  }`}>{statusLabel}</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Vested</span><span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total',     value: fmt(s?.totalAmount) },
                    { label: 'Claimed',   value: fmt(s?.claimedAmount) },
                    { label: 'Vested',    value: fmt(vestedAmt) },
                    { label: 'Claimable', value: fmt(claimableAmt), highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className={`rounded-xl p-3 ${highlight ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-700/30'}`}>
                      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                      <p className={`text-sm font-semibold ${highlight ? 'text-purple-200' : 'text-white'}`}>
                        {value} <span className="text-[10px] font-normal text-gray-500">ONBT</span>
                      </p>
                    </div>
                  ))}
                </div>

                {s && (
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                    <div><p className="text-[10px] mb-0.5">Cliff ends</p>
                      <p className="text-gray-300">{new Date(Number(s.startTime + s.cliffDuration) * 1000).toLocaleDateString()}</p></div>
                    <div><p className="text-[10px] mb-0.5">Vest ends</p>
                      <p className="text-gray-300">{new Date(Number(s.startTime + s.vestingDuration) * 1000).toLocaleDateString()}</p></div>
                  </div>
                )}

                {validationError && <p className="text-xs text-red-400">{validationError}</p>}

                <button disabled={isBusy || !claimableAmt || claimableAmt === 0n || s?.revoked}
                  onClick={() => void handleClaim()}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isBusy ? (isConfirming ? 'Confirming…' : 'Claiming…') : claimableAmt && claimableAmt > 0n ? `Claim ${fmt(claimableAmt)} ONBT` : 'Nothing to claim'}
                </button>

                <AnimatePresence>
                  {isConfirmed && txHash && (
                    <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      href={`${explorerUrl}/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="block text-center text-xs text-green-400 hover:text-green-300 underline"
                    >✓ Claimed — view transaction ↗</motion.a>
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
                  {(['create', 'revoke'] as AdminView[]).map((v) => (
                    <button key={v} onClick={() => setAdminView(v)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        adminView === v ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >{v === 'create' ? '＋ Create schedule' : '✕ Revoke schedule'}</button>
                  ))}
                </div>

                {adminView === 'create' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Beneficiary address</label>
                      <input type="text" placeholder="0x…" value={newBeneficiary} onChange={(e) => setNewBeneficiary(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500 font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Total amount <span className="text-gray-500">(wei)</span></label>
                      <input type="text" placeholder="e.g. 500000000000000000000" value={newAmount} onChange={(e) => setNewAmount(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      {(() => { try { const n = BigInt(newAmount); return n > 0n ? <p className="text-[11px] text-gray-500 mt-0.5">≈ {fmt(n)} ONBT</p> : null; } catch { return null; } })()}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Cliff <span className="text-gray-500">(days)</span></label>
                        <input type="number" min={0} title="Cliff duration in days" value={newCliff} onChange={(e) => setNewCliff(e.target.value)}
                          className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Vesting <span className="text-gray-500">(days)</span></label>
                        <input type="number" min={1} title="Vesting duration in days" value={newVesting} onChange={(e) => setNewVesting(e.target.value)}
                          className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 border border-gray-600 focus:outline-none focus:border-orange-500" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={newRevocable} onChange={(e) => setNewRevocable(e.target.checked)} className="accent-orange-500" />
                      <span className="text-xs text-gray-300">Revocable</span>
                    </label>
                    {adminError && <p className="text-xs text-red-400">{adminError}</p>}
                    <button disabled={isBusy} onClick={() => void handleCreateSchedule()}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    >{isBusy ? (isConfirming ? 'Confirming…' : 'Creating…') : 'Create schedule'}</button>
                  </div>
                )}

                {adminView === 'revoke' && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">Select a schedule above then revoke it. Unvested tokens return to you; vested tokens stay claimable.</p>
                    {selectedId ? (
                      <>
                        <div className="rounded-lg bg-gray-700/40 px-3 py-2 font-mono text-xs text-gray-300 break-all">{selectedId}</div>
                        {s && !s.revocable && <p className="text-xs text-yellow-400">⚠ This schedule is non-revocable</p>}
                        {s && s.revoked   && <p className="text-xs text-red-400">Already revoked</p>}
                        {adminError && <p className="text-xs text-red-400">{adminError}</p>}
                        <button disabled={isBusy || !s || !s.revocable || s.revoked} onClick={() => void handleRevoke()}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                        >{isBusy ? (isConfirming ? 'Confirming…' : 'Revoking…') : 'Revoke schedule'}</button>
                      </>
                    ) : (
                      <p className="text-xs text-gray-500 italic">No schedule selected — connect a wallet that has schedules</p>
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
        <a href={`${explorerUrl}/address/${vestingAddress}`} target="_blank" rel="noopener noreferrer"
          className="block text-center text-[11px] text-gray-500 hover:text-gray-400 underline"
        >Vesting contract on {chainName} ↗</a>
      )}
    </div>
  );
}
