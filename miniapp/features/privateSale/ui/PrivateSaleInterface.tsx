'use client';

import React, { useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatEther, formatUnits, isAddress, parseEther, parseUnits } from 'viem';
import {
  ERC20_PAYMENT_ABI,
  ONBT_PRIVATE_SALE_ABI,
  PRIVATE_SALE_ADDRESSES,
  PRIVATE_SALE_PAYMENT_TOKENS,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { PrivateSaleReport } from './PrivateSaleReport';

type PaymentAsset = 'ETH' | 'USDC' | 'USDT';

const PAYMENT_CONFIG: Record<PaymentAsset, { symbol: string; address?: `0x${string}`; defaultDecimals: number }> = {
  ETH: { symbol: 'ETH', defaultDecimals: 18 },
  USDC: { symbol: 'USDC', defaultDecimals: 6 },
  USDT: { symbol: 'USDT', defaultDecimals: 6 },
};

function formatCountdown(msRemaining: number) {
  if (msRemaining <= 0) return '00:00:00';
  const totalSeconds = Math.floor(msRemaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(v => String(v).padStart(2, '0')).join(':');
}

export function PrivateSaleInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [paymentAsset, setPaymentAsset] = useState<PaymentAsset>('ETH');
  const [payAmount, setPayAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preflightDetail, setPreflightDetail] = useState<{ decodedReason?: string; rawError?: string } | null>(null);
  const [timeNow, setTimeNow] = useState(Date.now());

  const [txMode, setTxMode] = useState<'approve' | 'buy'>('buy');

  const {
    data: txHash,
    error: writeError,
    isPending,
    writeContract,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  React.useEffect(() => {
    const t = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const hasBaseSaleAddress = !!PRIVATE_SALE_ADDRESSES[8453];
  const hasArbitrumSaleAddress = !!PRIVATE_SALE_ADDRESSES[42161];
  const hasSaleContractsConfigured = hasBaseSaleAddress && hasArbitrumSaleAddress;
  const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const activeSaleAddress = PRIVATE_SALE_ADDRESSES[selectedChainId] || undefined;
  const publicClient = usePublicClient({ chainId: selectedChainId });
  const saleContractConfiguredForChain = !!activeSaleAddress;
  const paymentTokens = PRIVATE_SALE_PAYMENT_TOKENS[selectedChainId];
  const paymentTokenAddress = paymentAsset === 'ETH'
    ? undefined
    : paymentAsset === 'USDC'
      ? paymentTokens?.USDC
      : paymentTokens?.USDT;
  const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
  const explorerTxBaseUrl = `${explorerBaseUrl}/tx/`;

  const { data: saleStart } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'saleStart',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 30_000 },
  });

  const { data: saleEnd } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'saleEnd',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 30_000 },
  });

  const { data: remainingTokens, refetch: refetchRemainingTokens } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'remainingTokens',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 15_000 },
  });

  const { data: saleAllocation } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'saleAllocation',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 60_000 },
  });

  const { data: totalSold } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'totalSold',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 15_000 },
  });

  const { data: saleContractPaused } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'paused',
    query: { enabled: saleContractConfiguredForChain, refetchInterval: 30_000 },
  });

  const isPaused = !!saleContractPaused;

  const { data: purchased, refetch: refetchPurchased } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'purchased',
    args: address ? [address] : undefined,
    query: { enabled: !!address && saleContractConfiguredForChain, refetchInterval: 15_000 },
  });

  const isTokenPayment = paymentAsset !== 'ETH';

  const { data: tokenDecimals } = useReadContract({
    chainId: selectedChainId,
    address: paymentTokenAddress,
    abi: ERC20_PAYMENT_ABI,
    functionName: 'decimals',
    query: { refetchInterval: 30_000, enabled: isTokenPayment && !!paymentTokenAddress },
  });

  const decimals = Number(tokenDecimals ?? PAYMENT_CONFIG[paymentAsset].defaultDecimals);

  const amountIn = useMemo(() => {
    if (!payAmount || Number(payAmount) <= 0) return 0n;
    try {
      return paymentAsset === 'ETH' ? parseEther(payAmount) : parseUnits(payAmount, decimals);
    } catch {
      return 0n;
    }
  }, [payAmount, paymentAsset, decimals]);

  // quotePurchase is only valid for ERC-20 payment tokens — ETH uses buyWithETH, which has no quote.
  // Passing the zero address for ETH causes a contract revert → never enable for ETH.
  const { data: quoteOut } = useReadContract({
    chainId: selectedChainId,
    address: activeSaleAddress,
    abi: ONBT_PRIVATE_SALE_ABI,
    functionName: 'quotePurchase',
    args: isTokenPayment && paymentTokenAddress && amountIn > 0n
      ? [paymentTokenAddress, amountIn]
      : undefined,
    query: { refetchInterval: 30_000,
      enabled: saleContractConfiguredForChain && amountIn > 0n && isTokenPayment && !!paymentTokenAddress,
      retry: false,
    },
  });

  const { data: paymentBalance } = useReadContract({
    chainId: selectedChainId,
    address: paymentTokenAddress,
    abi: ERC20_PAYMENT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: isTokenPayment && !!address && !!paymentTokenAddress, refetchInterval: 15_000 },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    chainId: selectedChainId,
    address: paymentTokenAddress,
    abi: ERC20_PAYMENT_ABI,
    functionName: 'allowance',
    args: address && paymentTokenAddress && activeSaleAddress ? [address, activeSaleAddress] : undefined,
    query: { enabled: isTokenPayment && !!address && !!paymentTokenAddress && saleContractConfiguredForChain, refetchInterval: 30_000 },
  });

  const recipientAddress = recipient || address || '';
  const recipientValid = !!recipientAddress && isAddress(recipientAddress);

  const nowSec = BigInt(Math.floor(timeNow / 1000));
  const saleStartSec = BigInt(saleStart ?? 0);
  const saleEndSec = BigInt(saleEnd ?? 0);

  const saleNotStarted = saleStartSec > 0n && nowSec < saleStartSec;
  const saleEnded = saleEndSec > 0n && nowSec > saleEndSec;
  const saleActive = saleStartSec > 0n && saleEndSec > 0n && nowSec >= saleStartSec && nowSec <= saleEndSec;

  const startsIn = saleStartSec > nowSec ? Number((saleStartSec - nowSec) * 1000n) : 0;
  const endsIn = saleEndSec > nowSec ? Number((saleEndSec - nowSec) * 1000n) : 0;

  const needsApproval = isTokenPayment && amountIn > 0n && (allowance ?? 0n) < amountIn;

  const canSubmit =
    !!address &&
    isSupportedChain &&
    saleContractConfiguredForChain &&
    saleActive &&
    !isPaused &&
    amountIn > 0n &&
    recipientValid;

  const handleApprove = async () => {
    setValidationError(null);
    setPreflightDetail(null);
    if (!paymentTokenAddress || amountIn <= 0n) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Private sale approval',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: paymentTokenAddress,
        abi: ERC20_PAYMENT_ABI,
        functionName: 'approve',
        args: [activeSaleAddress as `0x${string}`, amountIn],
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }

    setTxMode('approve');
    reset();
    writeContract({
      address: paymentTokenAddress,
      abi: ERC20_PAYMENT_ABI,
      functionName: 'approve',
      args: [activeSaleAddress as `0x${string}`, amountIn],
    });
  };

  const handleBuy = async () => {
    setValidationError(null);
    setPreflightDetail(null);
    if (!canSubmit) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Private sale purchase',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: paymentAsset === 'ETH'
        ? {
            address: activeSaleAddress as `0x${string}`,
            abi: ONBT_PRIVATE_SALE_ABI,
            functionName: 'buyWithETH',
            args: [recipientAddress as `0x${string}`],
            value: amountIn,
          }
        : {
            address: activeSaleAddress as `0x${string}`,
            abi: ONBT_PRIVATE_SALE_ABI,
            functionName: 'buyWithToken',
            args: [paymentTokenAddress as `0x${string}`, amountIn, recipientAddress as `0x${string}`],
          },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }

    setTxMode('buy');
    reset();

    if (paymentAsset === 'ETH') {
      writeContract({
        address: activeSaleAddress as `0x${string}`,
        abi: ONBT_PRIVATE_SALE_ABI,
        functionName: 'buyWithETH',
        args: [recipientAddress as `0x${string}`],
        value: amountIn,
      });
      return;
    }

    writeContract({
      address: activeSaleAddress as `0x${string}`,
      abi: ONBT_PRIVATE_SALE_ABI,
      functionName: 'buyWithToken',
      args: [paymentTokenAddress as `0x${string}`, amountIn, recipientAddress as `0x${string}`],
    });
  };

  React.useEffect(() => {
    if (!isConfirmed) return;
    refetchRemainingTokens();
    refetchPurchased();
    if (txMode === 'approve') {
      refetchAllowance();
    }
  }, [isConfirmed, txMode, refetchAllowance, refetchRemainingTokens, refetchPurchased]);

  React.useEffect(() => {
    if (writeError) {
      publishGlobalTxStatus({
        source: 'private-sale',
        stage: 'error',
        errorMessage: writeError.message,
        explorerBaseUrl,
      });
      return;
    }

    if (isPending) {
      publishGlobalTxStatus({
        source: 'private-sale',
        stage: 'pending',
        txHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isConfirming && txHash) {
      publishGlobalTxStatus({
        source: 'private-sale',
        stage: 'confirming',
        txHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isConfirmed && txHash) {
      publishGlobalTxStatus({
        source: 'private-sale',
        stage: 'success',
        txHash,
        explorerBaseUrl,
      });
    }
  }, [writeError, isPending, isConfirming, isConfirmed, txHash, explorerBaseUrl]);

  return (
    <div className="brand-card module-shell module-shell-sale module-grid-bg scanline-panel max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      <div className="mb-6 border-b border-sky-900/15 pb-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">Sale Window</button>
          <button type="button" className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900">ONBT Private Sale</button>
          <button type="button" className="rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950">Multi Asset</button>
        </div>
        <div className="status-rail mb-2">
          <span className="status-rail-dot" />
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">Guarded Window</button>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">Recipient Verified</button>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">{selectedChainId === 8453 ? 'Base' : 'Arbitrum'}</button>
          </div>
        </div>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        {address && (
          <WalletIdentityBadge address={address} className="mt-3" label="Purchase wallet" />
        )}
      </div>

      {!hasSaleContractsConfigured && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">⚠ Sale contracts not configured — set env vars to enable
          </span>
        </div>
      )}

      {!chain && hasSaleContractsConfigured && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900">Connect wallet to continue</span>
        </div>
      )}

      {chain && isSupportedChain && !saleContractConfiguredForChain && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">⚠ Sale not configured for this chain</span>
        </div>
      )}

      {chain && !isWalletOnSelectedChain && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900">⇄ Wallet chain differs — will auto-switch on Approve/Buy</span>
        </div>
      )}

      {chain && !isSupportedChain && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">⛔ Switch to Base or Arbitrum</span>
        </div>
      )}

      {isPaused && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">⏸ Sale paused</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-tile motion-card p-4 rounded-lg">
          <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-forest)]">
            {isPaused ? '⏸️ Paused' : saleNotStarted ? 'Not Started' : saleEnded ? 'Ended' : saleActive ? 'Active' : 'Unknown'}
          </button>
          {saleNotStarted && <button type="button" className="mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80">Starts in {formatCountdown(startsIn)}</button>}
          {saleActive && <button type="button" className="mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80">Ends in {formatCountdown(endsIn)}</button>}
        </div>

        <div className="brand-stat-card p-4 rounded-lg">
          {saleAllocation && saleAllocation > 0n ? (
            <>
              <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]">
                {Number(formatEther(totalSold ?? 0n)).toLocaleString(undefined, { maximumFractionDigits: 2 })} /
                {' '}{Number(formatEther(saleAllocation as bigint)).toLocaleString(undefined, { maximumFractionDigits: 0 })} ONBT
              </button>
              <progress
                className="mt-2 w-full h-1.5 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[color:var(--brand-forest)] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[color:var(--brand-forest)]"
                value={Number(totalSold ?? 0n)}
                max={Number(saleAllocation as bigint)}
              />
            </>
          ) : (
            <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]">
              Remaining: {remainingTokens ? Number(formatEther(remainingTokens as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'} ONBT
            </button>
          )}
          <button type="button" className="mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80">
            You purchased: {purchased ? Number(formatEther(purchased as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'} ONBT
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">Payment Asset</button>
          <div className="flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1">
            {(['ETH', 'USDC', 'USDT'] as PaymentAsset[]).map(asset => (
              <button
                key={asset}
                type="button"
                onClick={() => setPaymentAsset(asset)}
                className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                  paymentAsset === asset
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-orange-300 shadow-[0_10px_20px_rgba(245,158,11,0.25)]'
                    : 'bg-[color:var(--brand-cream)]/70 border-[color:var(--brand-leaf)]/40 text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/40'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
            Amount ({PAYMENT_CONFIG[paymentAsset].symbol})
          </button>
          <input
            type="number"
            min="0"
            step="any"
            value={payAmount}
            onChange={e => setPayAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
          />
          {isTokenPayment && (
            <button type="button" className="mt-1 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">
              Wallet {paymentAsset}: {paymentBalance ? Number(formatUnits(paymentBalance, decimals)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '--'}
            </button>
          )}
        </div>

        <div>
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">Recipient</button>
          <input
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder={address || '0x...'}
            className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
          />
        </div>

        <div className="brand-highlight-bar rounded-lg p-4">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">Estimated ONBT Out</button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]">
            {quoteOut ? Number(formatEther(quoteOut)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '--'} ONBT
          </button>
        </div>

        <button
          type="button"
          className="brand-button w-full text-white font-medium py-3 rounded-lg disabled:opacity-70"
          onClick={needsApproval ? handleApprove : handleBuy}
          disabled={!canSubmit || isPending || isConfirming}
        >
          {isPaused
            ? 'Sale Paused'
            : needsApproval
              ? isPending || isConfirming
                ? 'Processing Approval...'
                : !isWalletOnSelectedChain
                  ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}`
                  : `Approve ${paymentAsset}`
              : isPending || isConfirming
                ? 'Processing Purchase...'
                : !isWalletOnSelectedChain
                  ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}`
                  : `Buy ONBT with ${paymentAsset}`}
        </button>

        {txHash && (
          <MiniAppExternalLink
            href={`${explorerTxBaseUrl}${txHash}`}
            className="inline-flex text-sm text-[color:var(--brand-forest)] hover:underline"
          >
            View transaction on explorer
          </MiniAppExternalLink>
        )}

        {writeError && (
          <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100">
            <button type="button" className="w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">{writeError.message}</button>
          </div>
        )}

        {validationError && (
          <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100">
            <button type="button" className="w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">{validationError}</button>
            {preflightDetail?.decodedReason && <button type="button" className="mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Decoded: {preflightDetail.decodedReason}</button>}
          </div>
        )}

        {isConfirmed && (
          <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-3 text-sm text-emerald-100">
            <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{txMode === 'approve' ? 'Approval confirmed.' : 'Purchase confirmed.'}</button>
          </div>
        )}
      </div>

      <PrivateSaleReport
        chainId={selectedChainId}
        contractAddress={activeSaleAddress}
        saleAllocation={saleAllocation as bigint | undefined}
        totalSold={totalSold as bigint | undefined}
      />
    </div>
  );
}
