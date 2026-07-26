'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { parseEther, formatEther, isAddress } from 'viem';
import {
  ONBT_TOKEN_ABI,
  TOKEN_INFO,
  CHAIN_CONFIG,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_STAKING_ROUTER_BASE_ADDRESS,
  ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { validateTransfer } from '@/lib/validation/transferSchema';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { CandleChart } from '@/components/charts';
import { useOHLCVHistory } from '@/hooks/useOHLCVHistory';
import type { OHLCVBar } from '@/hooks/useOHLCVHistory';

type TokenInterfaceProps = {
  quantumSignal?: 'risk-on' | 'caution';
  quantumConfidence?: number;
};

/**
 * TokenInterface Component
 * OnchainKit-powered token interface for ONBT
 * View balance, transfer tokens, and check allowances
 */
export function TokenInterface({ quantumSignal = 'caution', quantumConfidence }: TokenInterfaceProps) {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'transfer' | 'info'>('transfer');
  const [chartTimeframe, setChartTimeframe] = useState<'1h' | '4h' | '1d'>('1d');
  // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(8453);
  const [reviewArmedKey, setReviewArmedKey] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preflightDetail, setPreflightDetail] = useState<{ decodedReason?: string; rawError?: string } | null>(null);
  const [allowanceSnapshotTime, setAllowanceSnapshotTime] = useState('--');

  const isArbitrum = selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const effectiveAddress = hasHydrated ? address : undefined;
  const effectiveWalletOnSelectedChain = hasHydrated ? isWalletOnSelectedChain : false;
  const activeTokenAddress = (isArbitrum
    ? CHAIN_CONFIG.arbitrum.tokenAddress
    : CHAIN_CONFIG.base.tokenAddress) as `0x${string}`;
  const explorerBase = isArbitrum ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;
  const chainName = isArbitrum ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const cautionMode = quantumSignal === 'caution';

  // Real OHLCV candles from DexScreener
  const limitByTimeframe: Record<string, number> = { '1h': 168, '4h': 90, '1d': 90 };
  const { data: ohlcvData, isFetching: ohlcvFetching } = useOHLCVHistory({
    tokenAddress: activeTokenAddress,
    chainId: selectedChainId,
    timeframe: chartTimeframe,
    limit: limitByTimeframe[chartTimeframe] ?? 90,
  });
  const chartCandles: OHLCVBar[] | undefined = ohlcvData?.candles?.length ? ohlcvData.candles : undefined;

  const publicClient = usePublicClient({ chainId: selectedChainId });
  const selectedStakingAddress = (isArbitrum
    ? ONBT_STAKING_ARBITRUM_ADDRESS
    : ONBT_STAKING_ADDRESS) as `0x${string}`;
  const selectedStakingRouterAddress = (isArbitrum
    ? ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS
    : ONBT_STAKING_ROUTER_BASE_ADDRESS) as `0x${string}`;

  // Read user's balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: effectiveAddress ? [effectiveAddress] : undefined,
    query: { refetchInterval: 15_000 },
  });

  // Read total supply
  const { data: totalSupply } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'totalSupply',
    query: { refetchInterval: 60_000 },
  });

  const { data: stakingAllowance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'allowance',
    args: effectiveAddress ? [effectiveAddress, selectedStakingAddress] : undefined,
    query: { refetchInterval: 30_000 },
  });

  const { data: stakingRouterAllowance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'allowance',
    args: effectiveAddress ? [effectiveAddress, selectedStakingRouterAddress] : undefined,
    query: { refetchInterval: 30_000 },
  });

  // Write functions
  const { data: txHash, writeContract: transfer, isPending, error } = useWriteContract();

  useEffect(() => {
    // Hydration marker for wallet/address-dependent UI logic.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    const updateSnapshotTime = () => {
      setAllowanceSnapshotTime(new Date().toLocaleTimeString());
    };

    updateSnapshotTime();
    const interval = window.setInterval(updateSnapshotTime, 30_000);
    return () => window.clearInterval(interval);
  }, [hasHydrated]);

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const knownRecipients = useMemo(() => {
    if (!effectiveAddress || typeof window === 'undefined') return [] as string[];
    const storageKey = `onbt_known_recipients_${effectiveAddress.toLowerCase()}`;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [] as string[];

    try {
      const parsed = JSON.parse(raw) as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [] as string[];
    }
  }, [effectiveAddress, txHash, isConfirmed]); // eslint-disable-line react-hooks/exhaustive-deps -- txHash/isConfirmed are intentional refresh triggers that re-read localStorage after tx confirmation

  const normalizedRecipient = transferTo.trim();
  const isRecipientValid = normalizedRecipient ? isAddress(normalizedRecipient) : false;
  const isSelfTransfer = Boolean(
    effectiveAddress && isRecipientValid && effectiveAddress.toLowerCase() === normalizedRecipient.toLowerCase()
  );
  const reviewContextKey = `${selectedChainId}:${normalizedRecipient.toLowerCase()}:${transferAmount}`;
  const reviewArmed = reviewArmedKey === reviewContextKey;
  const numericTransferAmount = Number(transferAmount);
  const hasValidAmount = Number.isFinite(numericTransferAmount) && numericTransferAmount > 0;
  const availableBalance = Number(balance ? formatEther(balance) : '0');
  const hasSufficientBalance = hasValidAmount && numericTransferAmount <= availableBalance;
  const suggestedTestAmount = useMemo(() => {
    if (!Number.isFinite(availableBalance) || availableBalance <= 0) return '0.1';
    const candidate = Math.min(Math.max(availableBalance * 0.02, 0.1), 10);
    return candidate.toFixed(2);
  }, [availableBalance]);
  const isKnownRecipient = isRecipientValid && knownRecipients.includes(normalizedRecipient.toLowerCase());
  const requiresTwoStepReview = Boolean(isRecipientValid && !isSelfTransfer && (!isKnownRecipient || cautionMode));
  const isHighRiskTransfer = requiresTwoStepReview || cautionMode;
  const identityConfidence = !effectiveAddress
    ? 'disconnected'
    : !effectiveWalletOnSelectedChain
      ? 'medium'
      : isHighRiskTransfer
        ? 'medium'
        : 'high';

  const handleTransfer = async () => {
    setValidationError(null);
    setPreflightDetail(null);

    // Zod schema validation — covers recipient + amount formatting
    const zodError = validateTransfer(normalizedRecipient, transferAmount);
    if (zodError) {
      setValidationError(zodError);
      return;
    }

    if (!effectiveWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (isSelfTransfer) {
      setValidationError('Recipient is your connected wallet. Use a different destination address.');
      return;
    }

    if (!hasSufficientBalance) {
      setValidationError('Amount exceeds your available ONBT balance on this chain.');
      return;
    }

    if (requiresTwoStepReview && !reviewArmed) {
      setReviewArmedKey(reviewContextKey);
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Token transfer',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: activeTokenAddress,
        abi: ONBT_TOKEN_ABI,
        functionName: 'transfer',
        args: [normalizedRecipient as `0x${string}`, parseEther(transferAmount)],
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }

    setReviewArmedKey(null);

    try {
      transfer({
        address: activeTokenAddress,
        abi: ONBT_TOKEN_ABI,
        functionName: 'transfer',
        args: [normalizedRecipient as `0x${string}`, parseEther(transferAmount)],
      });
    } catch (err) {
      console.error('Transfer error:', err);
      setValidationError(err instanceof Error ? err.message : 'Failed to submit transfer.');
    }
  };

  // Refetch balance after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      if (effectiveAddress && isRecipientValid && !isSelfTransfer) {
        const storageKey = `onbt_known_recipients_${effectiveAddress.toLowerCase()}`;
        const normalized = normalizedRecipient.toLowerCase();
        const next = knownRecipients.includes(normalized)
          ? knownRecipients
          : [...knownRecipients, normalized].slice(-24);
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      }
    }
  }, [isConfirmed, refetchBalance, effectiveAddress, isRecipientValid, isSelfTransfer, normalizedRecipient, knownRecipients]);

  useEffect(() => {
    if (error) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'error',
        errorMessage: error.message,
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isPending) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'pending',
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isConfirming && txHash) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'confirming',
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isConfirmed && txHash) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'success',
        txHash,
        explorerBaseUrl: explorerBase,
      });
    }
  }, [error, isPending, isConfirming, isConfirmed, txHash, explorerBase]);

  const userBalance = balance ? formatEther(balance) : '0';
  const supply = totalSupply ? formatEther(totalSupply) : TOKEN_INFO.totalSupply;
  const formattedStakingAllowance = stakingAllowance ? formatEther(stakingAllowance) : '0';
  const formattedStakingRouterAllowance = stakingRouterAllowance ? formatEther(stakingRouterAllowance) : '0';

  return (
    <div className="brand-card module-shell module-shell-token module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector
          label="Chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        {hasHydrated && !effectiveWalletOnSelectedChain && (
          <button onClick={() => switchChain({ chainId: selectedChainId })} className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100">
            Switch to {chainName}
          </button>
        )}
        {effectiveAddress && (
          <WalletIdentityBadge address={effectiveAddress} className="ml-auto" />
        )}
      </div>

      {/* Balance Card */}
      <div className="brand-stat-card motion-card mb-6 rounded-2xl p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900">
            {parseFloat(userBalance).toFixed(4)} ONBT
          </button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900">
            Supply {parseFloat(supply).toLocaleString()}
          </button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900">
            {chainName}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1">
        {(['transfer', 'info'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-xl px-4 py-2 font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]'
                : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transfer Tab */}
      {activeTab === 'transfer' && (
        <div className="space-y-4">
          {cautionMode && (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              ⚠ Caution{typeof quantumConfidence === 'number' ? ` · ${(quantumConfidence * 100).toFixed(0)}% confidence` : ''}
            </span>
          )}
          <div>
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Recipient Address
            </button>
            <input
              type="text"
              value={transferTo}
              onChange={(e) => {
                setTransferTo(e.target.value);
                setValidationError(null);
              }}
              placeholder="0x..."
              className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
            />
            {normalizedRecipient && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {!isRecipientValid && <span className="rounded-full border border-rose-300 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">Invalid address</span>}
                {isRecipientValid && isSelfTransfer && <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Self-transfer</span>}
                {isRecipientValid && !isSelfTransfer && <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">✓ {normalizedRecipient.slice(0,6)}…{normalizedRecipient.slice(-4)}</span>}
                {isRecipientValid && !isSelfTransfer && !isKnownRecipient && <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">New recipient</span>}
              </div>
            )}
          </div>

          <div>
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Amount
            </button>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => {
                setTransferAmount(e.target.value);
                setValidationError(null);
              }}
              placeholder="0.0"
              className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">{parseFloat(userBalance).toFixed(4)} ONBT</span>
              {[0.25, 0.5, 0.75, 1].map((pct) => (
                <button key={pct} onClick={() => setTransferAmount((availableBalance * pct).toFixed(4))} className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-leaf)]/10">
                  {pct === 1 ? 'Max' : `${pct * 100}%`}
                </button>
              ))}
            </div>
            {!hasSufficientBalance && transferAmount && (
              <button type="button" className="mt-2 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">Amount exceeds available balance on {chainName}</button>
            )}
          </div>

          <div className="brand-stat-card rounded-xl px-3 py-2 text-xs text-[color:var(--brand-ink)]/85">
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Allowances</button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85">Staking {Number(formattedStakingAllowance).toFixed(4)} ONBT</button>
              <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85">Router {Number(formattedStakingRouterAllowance).toFixed(4)} ONBT</button>
            </div>
            {(Number(formattedStakingAllowance) > 100000 || Number(formattedStakingRouterAllowance) > 100000) && (
              <button type="button" className="mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700">High approval snapshot detected. Reduce stale spender approvals before high-value transfers.</button>
            )}
            <button type="button" className="mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/70">Snapshot {allowanceSnapshotTime}</button>
          </div>

          {requiresTwoStepReview && (
            <div className="rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
              <div className="flex flex-wrap gap-2">
                <button type="button" className="rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900">Review</button>
                <button type="button" className="rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900">Confirm</button>
                <button type="button" className="rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900">Then Size Up</button>
              </div>
              <button type="button" className="mt-2 rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900">Suggested test {suggestedTestAmount} ONBT</button>
              <button
                type="button"
                onClick={() => setTransferAmount(suggestedTestAmount)}
                className="brand-secondary-button mt-2 rounded-md px-2 py-1 text-xs font-medium"
              >
                Use Suggested Test Amount
              </button>
            </div>
          )}

          {reviewArmed && requiresTwoStepReview && (
            <div className="rounded-xl border border-orange-400/35 bg-orange-500/10 px-3 py-2 text-xs text-orange-100">
              <button type="button" className="rounded-2xl border border-orange-300/45 bg-orange-50 px-3 py-2 font-semibold text-orange-900">
                Ready {transferAmount || '0'} ONBT to {isRecipientValid ? `${normalizedRecipient.slice(0, 6)}...${normalizedRecipient.slice(-4)}` : 'invalid'} on {chainName}
              </button>
            </div>
          )}

          {validationError && (
            <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
              <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700">{validationError}</button>
              {preflightDetail?.decodedReason && (
                <button type="button" className="mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700">Decoded reason: {preflightDetail.decodedReason}</button>
              )}
              {preflightDetail?.rawError && (
                <button type="button" className="mt-1 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-left text-[11px] font-semibold text-rose-700/90">Raw: {preflightDetail.rawError}</button>
              )}
            </div>
          )}

          <button
            type="button"
            className="brand-button w-full text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleTransfer}
            disabled={!normalizedRecipient || !hasValidAmount || isPending || isConfirming || !address}
          >
            {isPending
              ? 'Confirming...'
              : isConfirming
                ? 'Processing...'
                : !effectiveWalletOnSelectedChain
                  ? `Switch to ${chainName}`
                  : requiresTwoStepReview
                    ? reviewArmed
                      ? 'Confirm Reviewed Transfer'
                      : 'Review Transfer Safety'
                    : 'Transfer ONBT'}
          </button>

          {txHash && (
            <MiniAppExternalLink
              href={`${explorerBase}/tx/${txHash}`}
              className="inline-flex text-sm text-[color:var(--brand-forest)] hover:underline"
            >
              View transaction on explorer
            </MiniAppExternalLink>
          )}

          {error && (
            <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 p-4">
              <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">Error: {error.message}</button>
            </div>
          )}

          {isConfirmed && (
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">✓ Transfer successful!</button>
            </div>
          )}
        </div>
      )}

      {/* Info Tab */}
      {activeTab === 'info' && (
        <div className="brand-stat-card rounded-xl p-4 space-y-4">
          {/* Timeframe selector */}
          <div className="flex gap-1.5">
            {(['1h', '4h', '1d'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setChartTimeframe(tf)}
                className={`rounded-full border px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-wider transition-all ${
                  chartTimeframe === tf
                    ? 'border-violet-400 bg-violet-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {tf}
              </button>
            ))}
            {ohlcvData?.source && ohlcvData.source !== 'dex' && (
              <span className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] text-amber-700">
                Pre-DEX
              </span>
            )}
          </div>
          {/* Candlestick chart + volume */}
          <CandleChart
            candles={chartCandles}
            timeframe={chartTimeframe}
            loading={ohlcvFetching}
            source={ohlcvData?.source}
            heightClass="h-64"
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]">{TOKEN_INFO.name}</button>
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]">{TOKEN_INFO.symbol} · {TOKEN_INFO.decimals}d</button>
            <MiniAppExternalLink
              href={TOKEN_INFO.website}
              className="rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 text-sm font-semibold text-[color:var(--brand-forest)]"
            >
              Website ↗
            </MiniAppExternalLink>
            <MiniAppExternalLink
              href={`${explorerBase}/token/${activeTokenAddress}`}
              className="rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 text-sm font-semibold text-[color:var(--brand-forest)]"
            >
              Explorer ↗
            </MiniAppExternalLink>
          </div>
          <MiniAppExternalLink
            href={`${explorerBase}/address/${activeTokenAddress}`}
            className="mt-2 block rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 font-mono text-xs text-[color:var(--brand-forest)]"
          >
            {activeTokenAddress}
          </MiniAppExternalLink>
        </div>
      )}
    </div>
  );
}
