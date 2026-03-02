import React, { useState } from 'react';
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useSwitchChain,
} from 'wagmi';
import { formatEther } from 'viem';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import {
  ONBT_GOVERNOR_ABI,
  ONBT_GOVERNOR_BASE_ADDRESS,
  ONBT_GOVERNOR_ARBITRUM_ADDRESS,
} from '../config/contracts';
import { publishGlobalTxStatus } from '../lib/txStatus';
import { ChainSelector } from './ChainSelector';

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
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);

  const governorAddress = (selectedChainId === 42161 ? ONBT_GOVERNOR_ARBITRUM_ADDRESS : ONBT_GOVERNOR_BASE_ADDRESS) as `0x${string}`;
  const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
  const parsedProposalId = proposalIdInput.trim() ? BigInt(proposalIdInput.trim()) : null;

  const { data: currentBlock } = useBlockNumber({ chainId: selectedChainId, query: { refetchInterval: 10_000 } });

  const { data: governorName } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'name',
    query: { refetchInterval: 60_000, enabled: isSupportedChain },
  });

  const { data: votingPower, refetch: refetchVotingPower } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'getVotes',
    args: address && currentBlock ? [address, currentBlock] : undefined,
    query: { refetchInterval: 30_000, enabled: !!address && !!currentBlock && isSupportedChain },
  });

  const { data: proposalState, refetch: refetchProposalState } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'state',
    args: parsedProposalId !== null ? [parsedProposalId] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && isSupportedChain },
  });

  const { data: proposalVotes, refetch: refetchProposalVotes } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'proposalVotes',
    args: parsedProposalId !== null ? [parsedProposalId] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && isSupportedChain },
  });

  const { data: hasVoted } = useReadContract({
    chainId: selectedChainId,
    address: governorAddress,
    abi: ONBT_GOVERNOR_ABI,
    functionName: 'hasVoted',
    args: parsedProposalId !== null && address ? [parsedProposalId, address] : undefined,
    query: { refetchInterval: 20_000, enabled: parsedProposalId !== null && !!address && isSupportedChain },
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

  const handleCastVote = () => {
    if (!isSupportedChain || !address) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (parsedProposalId === null) {
      alert('Enter a valid proposal ID');
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
      refetchVotingPower();
      refetchProposalState();
      refetchProposalVotes();
    }
  }, [isVoteConfirmed, refetchVotingPower, refetchProposalState, refetchProposalVotes]);

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
    <div className="brand-card max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-2">
          🏛️ DAO Governance
        </h2>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        <p className="text-sm text-[color:var(--brand-ink)]/60 mb-4">
          Read/write governance directly on deployed governor contracts
        </p>
        <div className="mb-3 inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs text-[color:var(--brand-ink)]/75">
          Capability: Query proposals and cast votes on Base and Arbitrum governor contracts
        </div>
        {address && (
          <Identity address={address}>
            <Avatar />
            <Name />
          </Identity>
        )}
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Your Voting Power</p>
          <p className="text-2xl font-bold text-[color:var(--brand-forest)]">
            {votingPower ? `${Number(formatEther(votingPower)).toLocaleString(undefined, { maximumFractionDigits: 4 })} ONBT` : '0 ONBT'}
          </p>
          <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
            Stake tokens to gain voting power
          </p>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Governor Contract</p>
          <p className="text-2xl font-bold text-[color:var(--brand-sun)]">
            {governorName || 'Governor'}
          </p>
          <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
            {`${governorAddress.slice(0, 6)}...${governorAddress.slice(-4)}`}
          </p>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Network</p>
          <p className="text-2xl font-bold text-[color:var(--brand-ink)]">
            {selectedChainId === 8453 ? 'Base' : 'Arbitrum'}
          </p>
        </div>
      </div>

      <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20 mb-6">
        <h3 className="font-medium text-[color:var(--brand-ink)] mb-2">Vote on Proposal</h3>
        {!isSupportedChain && (
          <p className="text-sm text-red-700">Connect wallet to Base (8453) or Arbitrum (42161) to vote.</p>
        )}
        {isSupportedChain && (
          <>
            {!isWalletOnSelectedChain && (
              <p className="text-sm text-yellow-700 mb-2">
                Wallet chain differs from selected chain. Click Cast Vote to switch wallet to the selected network.
              </p>
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
              <div className="p-3 rounded-lg border border-[color:var(--brand-leaf)]/20">
                <p className="text-xs text-[color:var(--brand-ink)]/60">Proposal State</p>
                <p className="font-medium text-[color:var(--brand-ink)]">{proposalStateLabel}</p>
              </div>
              <div className="p-3 rounded-lg border border-[color:var(--brand-leaf)]/20">
                <p className="text-xs text-[color:var(--brand-ink)]/60">For Votes</p>
                <p className="font-medium text-[color:var(--brand-ink)]">
                  {proposalVotes ? Number(formatEther((proposalVotes as readonly [bigint, bigint, bigint])[1])).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-[color:var(--brand-leaf)]/20">
                <p className="text-xs text-[color:var(--brand-ink)]/60">Against Votes</p>
                <p className="font-medium text-[color:var(--brand-ink)]">
                  {proposalVotes ? Number(formatEther((proposalVotes as readonly [bigint, bigint, bigint])[0])).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-[color:var(--brand-leaf)]/20">
                <p className="text-xs text-[color:var(--brand-ink)]/60">You Voted</p>
                <p className="font-medium text-[color:var(--brand-ink)]">{hasVoted ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {voteTxHash && (
              <a
                href={`${explorerBaseUrl}/tx/${voteTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-2 text-sm text-[color:var(--brand-forest)] hover:underline"
              >
                View vote transaction
              </a>
            )}
            {voteError && (
              <p className="text-sm text-red-700 mt-2">{voteError.message}</p>
            )}
            {isVoteConfirmed && (
              <p className="text-sm text-green-700 mt-2">Vote confirmed.</p>
            )}
          </>
        )}
      </div>

      <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20 mb-6">
        <p className="text-xs text-[color:var(--brand-ink)]/70">
          Governance reads/writes are now bound directly to ONBT governor contracts on both Base and Arbitrum.
          Enter a proposal ID to view state/votes and cast your vote.
        </p>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-sun)]/40">
        <p className="text-xs text-[color:var(--brand-ink)]/70 mb-2">
          <strong>🌐 Omnichain Governance:</strong>
        </p>
        <p className="text-xs text-[color:var(--brand-ink)]/70">
          Your votes are aggregated across all chains via LayerZero V2. Stake ONBT on any chain to gain
          voting power that works everywhere!
        </p>
      </div>
    </div>
  );
}
