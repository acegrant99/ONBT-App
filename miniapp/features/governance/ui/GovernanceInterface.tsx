'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useSwitchChain,
} from 'wagmi';
import { formatEther } from 'viem';
import {
  ONBT_GOVERNOR_ABI,
  ONBT_GOVERNOR_BASE_ADDRESS,
  ONBT_GOVERNOR_ARBITRUM_ADDRESS,
  ONBT_STAKING_ABI,
  ONBT_STAKING_ADDRESS,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';

/**
 * GovernanceInterface Component
 * Omnichain DAO governance with LayerZero V2:
 * - View proposals (cross-chain aggregated)
 * - Vote on proposals (votes relayed to hub)
 * - Create proposals (hub only)
 * - Track voting power from staking
 */
export function GovernanceInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [proposalIdInput, setProposalIdInput] = useState('');
  const [voteChoice, setVoteChoice] = useState<0 | 1 | 2>(1);
  // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(8453);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preflightDetail, setPreflightDetail] = useState<{ decodedReason?: string; rawError?: string } | null>(null);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [propTitle, setPropTitle] = useState('');
  const [propDesc, setPropDesc] = useState('');
  const publicClient = usePublicClient({ chainId: selectedChainId });

  useEffect(() => {
    if (chain?.id === 8453 || chain?.id === 42161) {
      setSelectedChainId(chain.id);
    }
  }, [chain?.id]);

  const governorAddress = (selectedChainId === 42161 ? ONBT_GOVERNOR_ARBITRUM_ADDRESS : ONBT_GOVERNOR_BASE_ADDRESS) as `0x${string}`;
  const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
  const parsedProposalId = proposalIdInput.trim() ? BigInt(proposalIdInput.trim()) : null;

  const { data: proposalState, refetch: refetchProposalState } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'state',
    args: parsedProposalId !== null ? [parsedProposalId] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && isSupportedChain },
  });

  const { data: proposalDetails, refetch: refetchProposalVotes } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'getProposal',
    args: parsedProposalId !== null ? [parsedProposalId] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && isSupportedChain },
  });

  const { data: receiptData } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'getReceipt',
    args: parsedProposalId !== null && address ? [parsedProposalId, address] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && !!address && isSupportedChain },
  });

  const { data: proposalCount } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'proposalCount',
    query: { refetchInterval: 30_000, enabled: isSupportedChain },
  });

  const { data: proposalThreshold } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'proposalThreshold',
    query: { enabled: isSupportedChain },
  });

  const { data: votingPeriod } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'votingPeriod',
    query: { enabled: isSupportedChain },
  });

  const { data: quorumPercentage } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'quorumPercentage',
    query: { enabled: isSupportedChain },
  });

  const { data: votingPower } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const {
    data: voteTxHash,
    error: voteError,
    isPending: isVoting,
    writeContract: writeVote,
    reset: resetVote,
  } = useWriteContract();

  const { isLoading: isVoteConfirming, isSuccess: isVoteConfirmed } = useWaitForTransactionReceipt({
    hash: voteTxHash,
  });

  const {
    data: proposalTxHash,
    error: proposalError,
    isPending: isPropSubmitting,
    writeContract: writePropose,
    reset: resetPropose,
  } = useWriteContract();

  const { isLoading: isPropConfirming, isSuccess: isPropConfirmed } = useWaitForTransactionReceipt({
    hash: proposalTxHash,
  });

  const handleCastVote = async () => {
    setValidationError(null);
    setPreflightDetail(null);
    if (!isSupportedChain || !address) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (parsedProposalId === null) {
      setValidationError('Enter a valid proposal ID.');
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Governance vote',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: governorAddress,
        abi: ONBT_GOVERNOR_ABI,
        functionName: 'castVote',
        args: [parsedProposalId, voteChoice],
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }

    resetVote();
    writeVote({
      address: governorAddress,
      abi: ONBT_GOVERNOR_ABI,
      functionName: 'castVote',
      args: [parsedProposalId, voteChoice],
    });
  };

  React.useEffect(() => {
    if (isVoteConfirmed) {
      refetchProposalState();
      refetchProposalVotes();
    }
  }, [isVoteConfirmed, refetchProposalState, refetchProposalVotes]);

  React.useEffect(() => {
    if (voteError) {
      publishGlobalTxStatus({
        source: 'governance',
        stage: 'error',
        errorMessage: voteError.message,
        txHash: voteTxHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isVoting) {
      publishGlobalTxStatus({
        source: 'governance',
        stage: 'pending',
        txHash: voteTxHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isVoteConfirming && voteTxHash) {
      publishGlobalTxStatus({
        source: 'governance',
        stage: 'confirming',
        txHash: voteTxHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isVoteConfirmed && voteTxHash) {
      publishGlobalTxStatus({
        source: 'governance',
        stage: 'success',
        txHash: voteTxHash,
        explorerBaseUrl,
      });
    }
  }, [voteError, isVoting, isVoteConfirming, isVoteConfirmed, voteTxHash, explorerBaseUrl]);

  React.useEffect(() => {
    if (proposalError) {
      publishGlobalTxStatus({ source: 'governance', stage: 'error', errorMessage: proposalError.message, txHash: proposalTxHash, explorerBaseUrl });
    } else if (isPropSubmitting) {
      publishGlobalTxStatus({ source: 'governance', stage: 'pending', txHash: proposalTxHash, explorerBaseUrl });
    } else if (isPropConfirming && proposalTxHash) {
      publishGlobalTxStatus({ source: 'governance', stage: 'confirming', txHash: proposalTxHash, explorerBaseUrl });
    } else if (isPropConfirmed && proposalTxHash) {
      publishGlobalTxStatus({ source: 'governance', stage: 'success', txHash: proposalTxHash, explorerBaseUrl });
    }
  }, [proposalError, isPropSubmitting, isPropConfirming, isPropConfirmed, proposalTxHash, explorerBaseUrl]);

  // Proposal list via React Query — refetches automatically when proposalCount changes
  const { data: recentProposals = [], isLoading: loadingProposals, refetch: refetchProposals } = useQuery({
    queryKey: ['governance-proposals', governorAddress, String(proposalCount), selectedChainId],
    enabled: !!publicClient && proposalCount !== undefined && isSupportedChain,
    staleTime: 30_000,
    refetchInterval: 30_000,
    queryFn: async () => {
      if (!publicClient || !proposalCount || !isSupportedChain) return [];
      const count = Number(proposalCount);
      if (count === 0) return [];
      const ids = Array.from({ length: Math.min(count, 10) }, (_, i) => BigInt(count - i));
      const results = await Promise.all(
        ids.map(async (id) => {
          const [details, stateVal] = await Promise.all([
            publicClient.readContract({ address: governorAddress, abi: ONBT_GOVERNOR_ABI, functionName: 'getProposal', args: [id] }) as Promise<readonly [string, string, string, bigint, bigint, bigint, bigint, bigint, number]>,
            publicClient.readContract({ address: governorAddress, abi: ONBT_GOVERNOR_ABI, functionName: 'state', args: [id] }) as Promise<number>,
          ]);
          return { id, title: details[1], description: details[2], state: Number(stateVal), forVotes: details[3], againstVotes: details[4] };
        })
      );
      return results;
    },
  });

  const handleCreateProposal = async () => {
    setValidationError(null);
    setPreflightDetail(null);
    if (!address || !propTitle.trim() || !propDesc.trim()) {
      setValidationError('Title and description are required.');
      return;
    }
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return; }
    const preflight = await runActionPreflight({
      actionLabel: 'Create proposal',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: governorAddress,
        abi: ONBT_GOVERNOR_ABI,
        functionName: 'propose',
        args: [propTitle.trim(), propDesc.trim(), [], [], []],
      },
    });
    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }
    resetPropose();
    writePropose({
      address: governorAddress,
      abi: ONBT_GOVERNOR_ABI,
      functionName: 'propose',
      args: [propTitle.trim(), propDesc.trim(), [], [], []],
    });
  };

  const proposalStateLabel = (() => {
    if (proposalState === undefined) return '--';
    const stateNum = Number(proposalState);
    const map: Record<number, string> = {
      0: 'Pending',
      1: 'Active',
      2: 'Canceled',
      3: 'Defeated',
      4: 'Succeeded',
      5: 'Queued',
      6: 'Expired',
      7: 'Executed',
    };
    return map[stateNum] ?? `Unknown (${stateNum})`;
  })();

  return (
    <div className="brand-card module-shell module-shell-governance module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-sky-900/15 pb-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">Governance Rail</button>
          <button type="button" className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900">DAO Governance</button>
          <button type="button" className="rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950">Vote Live</button>
        </div>
        <div className="status-rail mb-2">
          <span className="status-rail-dot" />
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">Proposal Intel</button>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">Vote Execution</button>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">{selectedChainId === 8453 ? 'Base' : 'Arbitrum'}</button>
          </div>
        </div>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        {address && (
          <WalletIdentityBadge address={address} label="Voting wallet" />
        )}
      </div>

      {/* Governance Stats */}
      <div className="brand-stat-card motion-card mb-6 grid grid-cols-1 gap-3 rounded-xl px-3 py-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Your Voting Power</div>
          <div className="font-semibold text-[color:var(--brand-ink)]">
            {!address
              ? 'Connect wallet'
              : votingPower !== undefined
                ? `${Number(formatEther(votingPower as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 })} ONBT`
                : 'Loading...'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Proposals On-Chain</div>
          <div className="font-semibold text-[color:var(--brand-ink)]">{proposalCount !== undefined ? Number(proposalCount).toString() : '—'}</div>
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Network</div>
          <div className="font-semibold text-[color:var(--brand-ink)]">{selectedChainId === 8453 ? 'Base' : 'Arbitrum'}</div>
        </div>
      </div>

      {/* Governor Parameters */}
      <div className="brand-stat-card motion-card mb-6 grid grid-cols-3 gap-3 rounded-xl px-3 py-3">
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Proposal Threshold</div>
          <div className="font-semibold text-[color:var(--brand-ink)] text-sm">
            {proposalThreshold !== undefined ? `${Number(formatEther(proposalThreshold as bigint)).toLocaleString()} ONBT` : '—'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Voting Period</div>
          <div className="font-semibold text-[color:var(--brand-ink)] text-sm">
            {votingPeriod !== undefined ? `${Math.round(Number(votingPeriod) / 86400)} days` : '—'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left">
          <div className="text-xs text-[color:var(--brand-ink)]/60 mb-0.5">Quorum</div>
          <div className="font-semibold text-[color:var(--brand-ink)] text-sm">
            {quorumPercentage !== undefined ? `${Number(quorumPercentage)}%` : '—'}
          </div>
        </div>
      </div>

      <div className="brand-stat-card motion-card p-4 rounded-xl mb-6">
        <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Vote on Proposal</button>
        {!isSupportedChain && (
          <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">Connect wallet to Base (8453) or Arbitrum (42161) to vote.</button>
        )}
        {isSupportedChain && (
          <>
            {!isWalletOnSelectedChain && (
              <button type="button" className="mb-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-800">
                Wallet chain differs from selected chain. Click Cast Vote to switch wallet to the selected network.
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                value={proposalIdInput}
                onChange={(e) => setProposalIdInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Proposal ID"
                className="px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
              />
              <select
                aria-label="Vote choice"
                value={voteChoice}
                onChange={(e) => setVoteChoice(Number(e.target.value) as 0 | 1 | 2)}
                className="px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
              >
                <option value={0}>Against</option>
                <option value={1}>For</option>
                <option value={2}>Abstain</option>
              </select>
              <button
                type="button"
                onClick={handleCastVote}
                disabled={!address || isVoting || isVoteConfirming || !proposalIdInput}
                className="brand-button text-white font-medium px-4 py-3 rounded-lg disabled:opacity-60"
              >
                {isVoting || isVoteConfirming
                  ? 'Submitting Vote...'
                  : !isWalletOnSelectedChain
                    ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}`
                    : 'Cast Vote'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2 text-sm">
              <button type="button" className="brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left">
                <span className="text-xs text-[color:var(--brand-ink)]/60">Proposal State</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{proposalStateLabel}</span>
              </button>
              <button type="button" className="brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left">
                <span className="text-xs text-[color:var(--brand-ink)]/60">For Votes</span>
                <span className="font-medium text-[color:var(--brand-ink)]">
                  {proposalDetails ? Number(formatEther(proposalDetails[3])).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
                </span>
              </button>
              <button type="button" className="brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left">
                <span className="text-xs text-[color:var(--brand-ink)]/60">Against Votes</span>
                <span className="font-medium text-[color:var(--brand-ink)]">
                  {proposalDetails ? Number(formatEther(proposalDetails[4])).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
                </span>
              </button>
              <button type="button" className="brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left">
                <span className="text-xs text-[color:var(--brand-ink)]/60">You Voted</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{receiptData?.[0] ? 'Yes' : 'No'}</span>
              </button>
            </div>

            {voteTxHash && (
              <MiniAppExternalLink
                href={`${explorerBaseUrl}/tx/${voteTxHash}`}
                className="inline-flex mt-2 text-sm text-[color:var(--brand-forest)] hover:underline"
              >
                View vote transaction
              </MiniAppExternalLink>
            )}
            {voteError && (
              <button type="button" className="mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">{voteError.message}</button>
            )}
            {validationError && (
              <div className="mt-2 rounded-lg border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
                <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700">{validationError}</button>
                {preflightDetail?.decodedReason && (
                  <button type="button" className="mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Decoded reason: {preflightDetail.decodedReason}</button>
                )}
              </div>
            )}
            {isVoteConfirmed && (
              <button type="button" className="mt-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Vote confirmed.</button>
            )}
          </>
        )}
      </div>

      {/* Recent Proposals Browser */}
      <div className="brand-stat-card motion-card p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-3">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Recent Proposals</button>
          <button
            type="button"
            onClick={() => { void refetchProposals(); }}
            disabled={loadingProposals || !isSupportedChain}
            className="rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)] disabled:opacity-50"
          >
            {loadingProposals ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {recentProposals.length === 0 && !loadingProposals && (
          <p className="text-sm text-[color:var(--brand-ink)]/60 py-2">{proposalCount !== undefined && Number(proposalCount) === 0 ? 'No proposals yet.' : 'Loading proposals…'}</p>
        )}
        <div className="space-y-2">
          {recentProposals.map((p) => {
            const stateMap: Record<number, { label: string; cls: string }> = {
              0: { label: 'Pending', cls: 'border-amber-300 bg-amber-50 text-amber-800' },
              1: { label: 'Active', cls: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
              2: { label: 'Canceled', cls: 'border-slate-300 bg-slate-50 text-slate-600' },
              3: { label: 'Defeated', cls: 'border-rose-300 bg-rose-50 text-rose-700' },
              4: { label: 'Succeeded', cls: 'border-sky-300 bg-sky-50 text-sky-800' },
              5: { label: 'Queued', cls: 'border-violet-300 bg-violet-50 text-violet-800' },
              6: { label: 'Expired', cls: 'border-slate-300 bg-slate-50 text-slate-500' },
              7: { label: 'Executed', cls: 'border-teal-300 bg-teal-50 text-teal-800' },
            };
            const s = stateMap[p.state] ?? { label: 'Unknown', cls: 'border-slate-200 bg-slate-50 text-slate-500' };
            return (
              <div key={p.id.toString()} className="rounded-xl border border-[color:var(--brand-leaf)]/20 bg-white/60 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[color:var(--brand-ink)]/50">#{p.id.toString()}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.cls}`}>{s.label}</span>
                    </div>
                    <p className="font-semibold text-[color:var(--brand-ink)] text-sm truncate">{p.title || '(no title)'}</p>
                    {p.description && <p className="text-xs text-[color:var(--brand-ink)]/60 mt-0.5 line-clamp-2">{p.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setProposalIdInput(p.id.toString())}
                    className="flex-shrink-0 rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]"
                  >Vote</button>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-[color:var(--brand-ink)]/60">
                  <span>For: <span className="font-semibold text-emerald-700">{Number(formatEther(p.forVotes)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></span>
                  <span>Against: <span className="font-semibold text-rose-600">{Number(formatEther(p.againstVotes)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Proposal */}
      <div className="brand-stat-card motion-card p-4 rounded-xl mb-2">
        <div className="flex items-center justify-between mb-3">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Create Proposal</button>
          <button
            type="button"
            onClick={() => setShowCreateProposal((v) => !v)}
            className="rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]"
          >
            {showCreateProposal ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {!showCreateProposal && (
          <p className="text-sm text-[color:var(--brand-ink)]/60">
            Requires {proposalThreshold !== undefined ? `${Number(formatEther(proposalThreshold as bigint)).toLocaleString()} ONBT` : '10,000 ONBT'} staked to propose.
          </p>
        )}
        {showCreateProposal && (
          <div className="space-y-3">
            <input
              type="text"
              value={propTitle}
              onChange={(e) => setPropTitle(e.target.value)}
              placeholder="Proposal title"
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-sm"
            />
            <textarea
              value={propDesc}
              onChange={(e) => setPropDesc(e.target.value)}
              placeholder="Description — explain the motivation, impact, and any relevant links."
              rows={4}
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-sm resize-none"
            />
            <div className="flex gap-2 flex-wrap">
              {['Signal Vote', 'Parameter Change', 'Treasury Action'].map((tpl) => (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => setPropTitle(tpl + ': ')}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                >{tpl}</button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCreateProposal}
              disabled={!address || !propTitle.trim() || !propDesc.trim() || isPropSubmitting || isPropConfirming}
              className="brand-button text-white font-medium px-4 py-3 rounded-lg disabled:opacity-60 w-full"
            >
              {isPropSubmitting || isPropConfirming ? 'Submitting…' : 'Submit Proposal'}
            </button>
            {proposalError && (
              <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700 w-full">{proposalError.message}</button>
            )}
            {isPropConfirmed && proposalTxHash && (
              <div className="flex flex-col gap-1">
                <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Proposal submitted!</button>
                <MiniAppExternalLink href={`${explorerBaseUrl}/tx/${proposalTxHash}`} className="text-sm text-[color:var(--brand-forest)] hover:underline">
                  View transaction
                </MiniAppExternalLink>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
