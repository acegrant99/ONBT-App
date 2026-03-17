'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAccount, usePublicClient, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseEther, formatEther, encodePacked, pad } from 'viem';
import {
  ONBT_OFT_ABI,
  ONBT_TOKEN_ADDRESS,
  LZ_ENDPOINT_ID,
  CHAIN_CONFIG,
  ONBT_STAKING_ABI,
  ONBT_STAKING_ADDRESS,
  ONBT_ACHIEVEMENT_NFT_ABI,
  ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS,
  ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';

// On-chain achievement metadata matching ONBTOmnichainStaking.Achievement enum (bits 0–7)
const ACHIEVEMENT_META = [
  { bit: 0, name: 'First Stake',        icon: '🌱', desc: 'Made your first stake' },
  { bit: 1, name: 'Long-Term Holder',   icon: '⏳', desc: 'Staked for 365 consecutive days' },
  { bit: 2, name: 'Whale',              icon: '🐋', desc: 'Staked 100,000+ ONBT' },
  { bit: 3, name: 'Compound Master',    icon: '🔄', desc: 'Compounded rewards 10+ times' },
  { bit: 4, name: 'Early Adopter',      icon: '⭐', desc: 'One of the first 100 stakers' },
  { bit: 5, name: 'Loyal Staker',       icon: '🛡️', desc: 'Never unstaked for 180 days' },
  { bit: 6, name: 'Governance Active',  icon: '🗳️', desc: 'Delegated or received delegation' },
  { bit: 7, name: 'Rewards Pioneer',    icon: '🏆', desc: 'Claimed rewards in the first week' },
] as const;

export function BridgeInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [bridgeAmount, setBridgeAmount] = useState('');
  const [destinationChain, setDestinationChain] = useState<'arbitrum' | 'base'>('arbitrum');
  // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
  const [selectedSourceChainId, setSelectedSourceChainId] = useState<8453 | 42161>(8453);
  const publicClient = usePublicClient({ chainId: selectedSourceChainId });
  const [estimatedFee, setEstimatedFee] = useState<bigint | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preflightDetail, setPreflightDetail] = useState<{ decodedReason?: string; rawError?: string } | null>(null);
  const processedTxHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (chain?.id === 8453 || chain?.id === 42161) {
      setSelectedSourceChainId(chain.id);
    }
  }, [chain?.id]);

  // Determine current chain and contract
  const isOnBase = selectedSourceChainId === 8453;
  const isWalletOnSelectedChain = chain?.id === selectedSourceChainId;
  const currentContractAddress = isOnBase ? ONBT_TOKEN_ADDRESS : CHAIN_CONFIG.arbitrum.tokenAddress;
  const nftAddress = isOnBase
    ? ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS
    : ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS;

  // Achievement bitmap from staking contract (hub = Base, chainId 8453)
  const { data: achievementBitmap } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'achievementsBitmap',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  // Achievement NFT balance on current chain
  const { data: nftBalance } = useReadContract({
    chainId: selectedSourceChainId,
    address: nftAddress as `0x${string}`,
    abi: ONBT_ACHIEVEMENT_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const bitmap = (achievementBitmap ?? 0n) as bigint;
  const earnedCount = ACHIEVEMENT_META.filter((a) => (bitmap >> BigInt(a.bit)) & 1n).length;

  useEffect(() => {
    setDestinationChain(isOnBase ? 'arbitrum' : 'base');
  }, [isOnBase]);

  // Read user's balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    chainId: selectedSourceChainId,
    address: currentContractAddress as `0x${string}`,
    abi: ONBT_OFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { refetchInterval: 15_000 },
  });

  // Prepare send parameters for LayerZero
  const prepareSendParams = () => {
    if (!address || !bridgeAmount || parseFloat(bridgeAmount) <= 0) return null;

    const dstEid = destinationChain === 'arbitrum' ? LZ_ENDPOINT_ID.ARBITRUM : LZ_ENDPOINT_ID.BASE;
    const amountLD = parseEther(bridgeAmount);
    const minAmountLD = (amountLD * 98n) / 100n; // 2% slippage tolerance

    // Convert address to bytes32 for LayerZero
    const toBytes32 = pad(address as `0x${string}`, { size: 32 });

    return {
      dstEid,
      to: toBytes32,
      amountLD,
      minAmountLD,
      extraOptions: '0x' as `0x${string}`,
      composeMsg: '0x' as `0x${string}`,
      oftCmd: '0x' as `0x${string}`,
    };
  };

  // Quote the fee for sending
  const sendParams = prepareSendParams();
  const { data: feeQuote } = useReadContract({
    chainId: selectedSourceChainId,
    address: currentContractAddress as `0x${string}`,
    abi: ONBT_OFT_ABI,
    functionName: 'quoteSend',
    args: sendParams ? [sendParams, false] : undefined,
    query: { refetchInterval: 30_000,
      enabled: !!sendParams,
      retry: false,
    },
  });

  // Update estimated fee when quote changes
  useEffect(() => {
    if (feeQuote && typeof feeQuote === 'object' && 'nativeFee' in feeQuote) {
      setEstimatedFee(feeQuote.nativeFee as bigint);
    }
  }, [feeQuote]);

  // Write contract for bridging
  const { data: txHash, writeContract: sendCrossChain, isPending, error } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleBridge = async () => {
    setValidationError(null);
    setPreflightDetail(null);
    if (!sendParams || !feeQuote) {
      setValidationError('Unable to prepare bridge transaction.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedSourceChainId });
      return;
    }

    const fee = feeQuote as { nativeFee: bigint; lzTokenFee: bigint };
    const preflight = await runActionPreflight({
      actionLabel: 'Cross-chain bridge',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedSourceChainId,
      publicClient,
      checks: [
        { ok: Boolean(sendParams), reason: 'Unable to prepare LayerZero send parameters.' },
      ],
      request: {
        address: currentContractAddress as `0x${string}`,
        abi: ONBT_OFT_ABI,
        functionName: 'send',
        args: [sendParams, fee, address as `0x${string}`],
        value: fee.nativeFee,
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      setPreflightDetail({ decodedReason: preflight.decodedReason, rawError: preflight.rawError });
      return;
    }

    try {
      sendCrossChain({
        address: currentContractAddress as `0x${string}`,
        abi: ONBT_OFT_ABI,
        functionName: 'send',
        args: [sendParams, fee, address as `0x${string}`],
        value: fee.nativeFee,
      });
    } catch (err) {
      console.error('Bridge error:', err);
    }
  };

  // Refetch balance after successful transaction
  useEffect(() => {
    if (!isConfirmed || !txHash) return;
    if (processedTxHashRef.current === txHash) return;

    processedTxHashRef.current = txHash;
    refetchBalance();
    setBridgeAmount('');
  }, [isConfirmed, txHash, refetchBalance]);

  useEffect(() => {
    const explorerBaseUrl = selectedSourceChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';

    if (error) {
      publishGlobalTxStatus({
        source: 'bridge',
        stage: 'error',
        errorMessage: error.message,
        txHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isPending) {
      publishGlobalTxStatus({
        source: 'bridge',
        stage: 'pending',
        txHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isConfirming && txHash) {
      publishGlobalTxStatus({
        source: 'bridge',
        stage: 'confirming',
        txHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isConfirmed && txHash) {
      publishGlobalTxStatus({
        source: 'bridge',
        stage: 'success',
        txHash,
        explorerBaseUrl,
      });
    }
  }, [error, isPending, isConfirming, isConfirmed, txHash, selectedSourceChainId]);

  const userBalance = balance ? formatEther(balance) : '0';
  const currentChainName = isOnBase ? 'Base' : 'Arbitrum';
  const destinationChainName = destinationChain === 'arbitrum' ? 'Arbitrum' : 'Base';

  return (
    <div className="brand-card module-shell module-shell-bridge module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-sky-900/15 pb-4">
        <ChainSelector
          label="Source chain"
          selectedChainId={selectedSourceChainId}
          onSelectChain={setSelectedSourceChainId}
        />
        
        {/* On-Chain Achievements — from ONBTAchievementNFT + ONBTOmnichainStaking contracts */}
        <div className="brand-stat-card motion-card rounded-xl p-3 border border-[color:var(--brand-sun)]/30">
          <div className="flex items-center justify-between mb-2">
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              🏆 Staking Achievements {address ? `${earnedCount}/8` : '—'}
            </button>
            {address && (
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/60">
                {nftBalance !== undefined ? `${nftBalance.toString()} NFT${Number(nftBalance) === 1 ? '' : 's'}` : '…'}
              </button>
            )}
          </div>
          {address ? (
            <div className="grid grid-cols-4 gap-1.5">
              {ACHIEVEMENT_META.map((a) => {
                const earned = (bitmap >> BigInt(a.bit)) & 1n;
                return (
                  <div
                    key={a.bit}
                    title={`${a.name}: ${a.desc}`}
                    className={`flex flex-col items-center rounded-lg p-2 border text-center ${
                      earned
                        ? 'bg-emerald-500/10 border-emerald-400/35'
                        : 'bg-[color:var(--brand-cream)]/45 border-[color:var(--brand-leaf)]/15 opacity-45'
                    }`}
                  >
                    <span className="text-lg">{a.icon}</span>
                    <span className="text-[10px] font-medium leading-tight mt-0.5 text-[color:var(--brand-ink)]/70">{a.name}</span>
                    {earned ? <span className="text-[9px] text-emerald-400 font-bold">✓</span> : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[color:var(--brand-ink)]/55 text-center py-1">Connect wallet to view achievements</p>
          )}
        </div>

        {address && (
          <WalletIdentityBadge address={address} className="mt-4" label="Bridge wallet" />
        )}
      </div>

      {/* Current Chain Info */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" className="brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-leaf)]">{currentChainName}</button>
        <button type="button" className="brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-ink)]">{parseFloat(userBalance).toFixed(4)} ONBT</button>
      </div>

      {!isWalletOnSelectedChain && (
        <div className="mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4">
          <button type="button" className="rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900">
            Wallet chain differs from selected source chain. Click Bridge to switch wallet to {currentChainName}.
          </button>
        </div>
      )}

      {/* Bridge Form */}
      <div className="space-y-4">
        {/* Destination Chain Selection */}
        <div>
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
            Bridge To
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDestinationChain('arbitrum')}
              disabled={!isOnBase}
              className={`p-4 rounded-lg border-2 transition-all ${
                destinationChain === 'arbitrum' && isOnBase
                  ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]'
                  : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
                <div className="font-medium">Arbitrum</div>
              <div className="text-xs text-[color:var(--brand-ink)]/60 mt-1">EID: {LZ_ENDPOINT_ID.ARBITRUM}</div>
            </button>
            <button
              onClick={() => setDestinationChain('base')}
              disabled={isOnBase}
              className={`p-4 rounded-lg border-2 transition-all ${
                destinationChain === 'base' && !isOnBase
                  ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]'
                  : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
                <div className="font-medium">Base</div>
              <div className="text-xs text-[color:var(--brand-ink)]/60 mt-1">EID: {LZ_ENDPOINT_ID.BASE}</div>
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
            Amount to Bridge
          </button>
          <input
            type="number"
            value={bridgeAmount}
            onChange={(e) => setBridgeAmount(e.target.value)}
            placeholder="0.0"
            className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80 text-lg"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">{parseFloat(userBalance).toFixed(4)} ONBT</span>
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <button key={pct} onClick={() => setBridgeAmount((parseFloat(userBalance) * pct).toFixed(4))} className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-leaf)]/10">
                {pct === 1 ? 'Max' : `${pct * 100}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Fee Estimate */}
        {estimatedFee && bridgeAmount && parseFloat(bridgeAmount) > 0 && (
          <div className="brand-stat-card rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75">Bridge Fee</button>
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">
                {formatEther(estimatedFee)} ETH
              </button>
            </div>
            <div className="flex justify-between text-sm">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75">Receive</button>
              <button type="button" className="rounded-full border border-emerald-300/40 bg-emerald-50 px-3 py-1 font-semibold text-[color:var(--brand-forest)]">
                ~{bridgeAmount} ONBT
              </button>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        <button
          type="button"
          className="brand-button w-full text-white font-medium py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          onClick={handleBridge}
          disabled={
            !bridgeAmount ||
            parseFloat(bridgeAmount) <= 0 ||
            !estimatedFee ||
            isPending ||
            isConfirming
          }
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
            ? 'Bridging...'
            : !isWalletOnSelectedChain
              ? `Switch to ${currentChainName}`
              : `Bridge to ${destinationChainName}`}
        </button>

        {txHash && (
          <MiniAppExternalLink
            href={`https://${selectedSourceChainId === 42161 ? 'arbiscan.io' : 'basescan.org'}/tx/${txHash}`}
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

        {validationError && (
          <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 p-4">
            <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">{validationError}</button>
            {preflightDetail?.decodedReason && (
              <button type="button" className="mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Decoded: {preflightDetail.decodedReason}</button>
            )}
          </div>
        )}

        {isConfirmed && (
          <div className="space-y-3">
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="mb-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-sm font-semibold text-emerald-700">
                ✓ Bridge transaction submitted!
              </button>
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Tokens will arrive on {destinationChainName} in a few minutes.
              </button>
            </div>
            
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 space-y-3">
        <div className="brand-highlight-bar rounded-lg p-4">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80">
            🔒 Powered by LayerZero V2
          </button>
          <button type="button" className="mb-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75">
            ONBT uses LayerZero&apos;s Omnichain Fungible Token (OFT) standard for secure cross-chain transfers.
            Your tokens are burned on the source chain and minted on the destination chain, maintaining a
            unified global supply.
          </button>
          <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75">
            🏆 Achievements are minted as on-chain NFTs by the ONBTAchievementNFT contract when staking milestones are reached.
          </button>
        </div>

        {/* Alternative Bridge Option */}
        <div className="rounded-lg border border-sky-400/35 bg-sky-500/10 p-4">
          <button type="button" className="mb-2 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
            Alternative Bridge
          </button>
          <button type="button" className="mb-2 w-full rounded-2xl border border-sky-300/50 bg-sky-50 px-3 py-2 text-left text-xs font-semibold text-sky-800">
            Use Stargate or other LayerZero-compatible routes.
          </button>
          <MiniAppExternalLink
            href="https://stargate.finance/transfer"
            className="inline-flex items-center gap-1 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800"
          >
            Bridge via Stargate Finance →
          </MiniAppExternalLink>
        </div>
      </div>
    </div>
  );
}
