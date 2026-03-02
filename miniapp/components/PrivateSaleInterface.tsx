import React, { useMemo, useState } from 'react';
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatEther, formatUnits, isAddress, parseEther, parseUnits } from 'viem';
import { Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ERC20_PAYMENT_ABI,
  ONBT_PRIVATE_SALE_ABI,
  PRIVATE_SALE_ADDRESSES,
  PRIVATE_SALE_PAYMENT_TOKENS,
} from '../config/contracts';
import { publishGlobalTxStatus } from '../lib/txStatus';
import { ChainSelector } from './ChainSelector';

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

  const handleApprove = () => {
    if (!paymentTokenAddress || amountIn <= 0n) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
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

  const handleBuy = () => {
    if (!canSubmit) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
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
    <div className="brand-card max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-2">🛡️ ONBT Private Sale OApp</h2>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        <p className="text-sm text-[color:var(--brand-ink)]/65">
          Base + Arbitrum private sale interface with time-window enforcement and ETH/USDC/USDT payment rails.
        </p>
        <div className="mt-3 inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs text-[color:var(--brand-ink)]/75">
          Capability: Buy ONBT on Base and Arbitrum using ETH, USDC, or USDT
        </div>
        {address && (
          <Identity address={address} className="mt-3">
            <Avatar />
            <Name />
          </Identity>
        )}
      </div>

      {!hasSaleContractsConfigured && (
        <div className="mb-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
          Set `NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS` and `NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS` in miniapp env to enable purchases.
        </div>
      )}

      {!chain && hasSaleContractsConfigured && (
        <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          Connect your wallet to activate the private sale flow.
        </div>
      )}

      {chain && isSupportedChain && !saleContractConfiguredForChain && (
        <div className="mb-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
          Private sale contract is not configured for the selected chain.
        </div>
      )}

      {chain && !isWalletOnSelectedChain && (
        <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          Wallet chain and selected chain differ. Click Approve/Buy to switch wallet to {selectedChainId === 8453 ? 'Base' : 'Arbitrum'}.
        </div>
      )}

      {chain && !isSupportedChain && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900">
          Connect wallet to Base Mainnet (8453) or Arbitrum One (42161) to participate.
        </div>
      )}

      {isPaused && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 font-medium">
          ⛔ Private sale contract is currently paused. Purchases are temporarily disabled.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Sale Status</p>
          <p className="font-semibold text-[color:var(--brand-forest)]">
            {isPaused ? '⏸️ Paused' : saleNotStarted ? 'Not Started' : saleEnded ? 'Ended' : saleActive ? 'Active' : 'Unknown'}
          </p>
          {saleNotStarted && <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">Starts in {formatCountdown(startsIn)}</p>}
          {saleActive && <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">Ends in {formatCountdown(endsIn)}</p>}
        </div>

        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Sale Progress</p>
          {saleAllocation && saleAllocation > 0n ? (
            <>
              <p className="font-semibold text-[color:var(--brand-ink)]">
                {Number(formatEther(totalSold ?? 0n)).toLocaleString(undefined, { maximumFractionDigits: 2 })} /
                {' '}{Number(formatEther(saleAllocation as bigint)).toLocaleString(undefined, { maximumFractionDigits: 0 })} ONBT
              </p>
              <progress
                className="mt-2 w-full h-1.5 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[color:var(--brand-forest)] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[color:var(--brand-forest)]"
                value={Number(totalSold ?? 0n)}
                max={Number(saleAllocation as bigint)}
              />
            </>
          ) : (
            <p className="font-semibold text-[color:var(--brand-ink)]">
              Remaining: {remainingTokens ? Number(formatEther(remainingTokens as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'} ONBT
            </p>
          )}
          <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
            You purchased: {purchased ? Number(formatEther(purchased as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'} ONBT
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[color:var(--brand-ink)]/75 mb-2">Payment Asset</label>
          <div className="flex gap-2">
            {(['ETH', 'USDC', 'USDT'] as PaymentAsset[]).map(asset => (
              <button
                key={asset}
                type="button"
                onClick={() => setPaymentAsset(asset)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  paymentAsset === asset
                    ? 'bg-[color:var(--brand-forest)] text-white border-[color:var(--brand-forest)]'
                    : 'bg-[color:var(--brand-cream)] border-[color:var(--brand-leaf)]/40 text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/40'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[color:var(--brand-ink)]/75 mb-2">
            Amount ({PAYMENT_CONFIG[paymentAsset].symbol})
          </label>
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
            <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
              Wallet {paymentAsset}: {paymentBalance ? Number(formatUnits(paymentBalance, decimals)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '--'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[color:var(--brand-ink)]/75 mb-2">Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder={address || '0x...'}
            className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
          />
          <p className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
            Leave empty to buy for connected wallet.
          </p>
        </div>

        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Estimated ONBT Out</p>
          <p className="font-semibold text-[color:var(--brand-ink)]">
            {quoteOut ? Number(formatEther(quoteOut)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '--'} ONBT
          </p>
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
          <a
            href={`${explorerTxBaseUrl}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-[color:var(--brand-forest)] hover:underline"
          >
            View transaction on explorer
          </a>
        )}

        {writeError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {writeError.message}
          </div>
        )}

        {isConfirmed && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            {txMode === 'approve' ? 'Approval confirmed.' : 'Purchase confirmed.'}
          </div>
        )}
      </div>
    </div>
  );
}
