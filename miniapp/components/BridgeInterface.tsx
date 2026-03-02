import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseEther, formatEther, encodePacked, pad } from 'viem';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import { 
  ONBT_OFT_ABI, 
  ONBT_TOKEN_ADDRESS, 
  LZ_ENDPOINT_ID, 
  CHAIN_CONFIG,
  ONBT_STAKING_ABI,
  ONBT_STAKING_ADDRESS,
  LockupPeriod
} from '../config/contracts';
import { publishGlobalTxStatus } from '../lib/txStatus';
import { ChainSelector } from './ChainSelector';

/**
 * BridgeInterface Component
 * LayerZero-powered cross-chain bridge for ONBT with:
 * - Bridge + Auto-stake functionality
 * - Achievement tracking (first bridge, cross-chain user)
 * - Volume milestones
 */

// Achievement tracking types
interface BridgeAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function BridgeInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [bridgeAmount, setBridgeAmount] = useState('');
  const [destinationChain, setDestinationChain] = useState<'arbitrum' | 'base'>('arbitrum');
  const [selectedSourceChainId, setSelectedSourceChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [estimatedFee, setEstimatedFee] = useState<bigint | null>(null);
  const [autoStake, setAutoStake] = useState(false);
  const [autoStakeLockup, setAutoStakeLockup] = useState<LockupPeriod>(LockupPeriod.NONE);
  const [showAchievements, setShowAchievements] = useState(false);
  const [bridgeCount, setBridgeCount] = useState(0);
  const [totalBridgedVolume, setTotalBridgedVolume] = useState(0);
  const processedTxHashRef = useRef<string | null>(null);

  // Load bridge history from localStorage
  useEffect(() => {
    if (address) {
      const storageKey = `onbt_bridge_history_${address}`;
      const history = localStorage.getItem(storageKey);
      if (history) {
        const parsed = JSON.parse(history);
        setBridgeCount(parsed.count || 0);
        setTotalBridgedVolume(parsed.volume || 0);
      }
    }
  }, [address]);

  // Track achievements
  const achievements: BridgeAchievement[] = [
    {
      id: 'first_bridge',
      name: 'Cross-Chain Pioneer',
      description: 'Complete your first bridge transaction',
      icon: '🌉',
      earned: bridgeCount > 0
    },
    {
      id: 'bridge_master',
      name: 'Bridge Master',
      description: 'Complete 10 bridge transactions',
      icon: '🏆',
      earned: bridgeCount >= 10
    },
    {
      id: 'whale_bridger',
      name: 'Whale Bridger',
      description: 'Bridge 100,000 ONBT total',
      icon: '🐋',
      earned: totalBridgedVolume >= 100000
    },
    {
      id: 'omnichain_user',
      name: 'Omnichain User',
      description: 'Use ONBT on multiple chains',
      icon: '⛓️',
      earned: bridgeCount > 0
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.earned);
  const nextAchievement = achievements.find(a => !a.earned);

  // Determine current chain and contract
  const isOnBase = selectedSourceChainId === 8453;
  const isWalletOnSelectedChain = chain?.id === selectedSourceChainId;
  const currentContractAddress = isOnBase ? ONBT_TOKEN_ADDRESS : CHAIN_CONFIG.arbitrum.tokenAddress;

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

  const handleBridge = () => {
    if (!sendParams || !feeQuote) {
      alert('Unable to prepare bridge transaction');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedSourceChainId });
      return;
    }

    const fee = feeQuote as { nativeFee: bigint; lzTokenFee: bigint };

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

  // Track bridge completion and achievements
  const trackBridgeCompletion = useCallback(() => {
    if (!address || !bridgeAmount) return;

    const amount = parseFloat(bridgeAmount);
    const storageKey = `onbt_bridge_history_${address}`;
    
    // Update history
    const newCount = bridgeCount + 1;
    const newVolume = totalBridgedVolume + amount;
    
    localStorage.setItem(storageKey, JSON.stringify({
      count: newCount,
      volume: newVolume,
      lastBridge: Date.now()
    }));

    setBridgeCount(newCount);
    setTotalBridgedVolume(newVolume);

    // Check for new achievements
    const newlyUnlocked: string[] = [];
    
    if (newCount === 1) {
      newlyUnlocked.push('🎉 Achievement Unlocked: Cross-Chain Pioneer!');
    }
    if (newCount === 10) {
      newlyUnlocked.push('🏆 Achievement Unlocked: Bridge Master!');
    }
    if (newVolume >= 100000 && totalBridgedVolume < 100000) {
      newlyUnlocked.push('🐋 Achievement Unlocked: Whale Bridger!');
    }

    // Show achievement notifications
    if (newlyUnlocked.length > 0) {
      setShowAchievements(true);
      setTimeout(() => {
        alert(newlyUnlocked.join('\n'));
      }, 1000);
    }
  }, [address, bridgeAmount, bridgeCount, totalBridgedVolume]);

  // Refetch balance after successful transaction and track achievements
  useEffect(() => {
    if (!isConfirmed || !txHash) return;
    if (processedTxHashRef.current === txHash) return;

    processedTxHashRef.current = txHash;
    const bridgedAmount = bridgeAmount;

    refetchBalance();
    trackBridgeCompletion();
    setBridgeAmount('');

    // TODO: Auto-stake feature (requires waiting for tokens to arrive on destination chain)
    // This would require a separate monitoring service or manual action
    if (autoStake) {
      console.log(`Auto-stake enabled: Will stake ${bridgedAmount} ONBT with ${autoStakeLockup} lockup when tokens arrive`);
      // Future: Add notification for user to complete stake on destination chain
    }
  }, [isConfirmed, txHash, refetchBalance, trackBridgeCompletion, autoStake, autoStakeLockup, bridgeAmount]);

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
    <div className="brand-card max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-2">
          🌉 Omnichain Bridge
        </h2>
        <ChainSelector
          label="Source chain"
          selectedChainId={selectedSourceChainId}
          onSelectChain={setSelectedSourceChainId}
        />
        <p className="text-sm text-[color:var(--brand-ink)]/60 mb-4">
          Bridge ONBT across chains with LayerZero V2
        </p>
        <div className="mb-3 inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs text-[color:var(--brand-ink)]/75">
          Capability: Bridge ONBT between Base and Arbitrum from selected source chain ({currentChainName})
        </div>
        
        {/* Achievements Summary */}
        <div className="flex items-center justify-between bg-[color:var(--brand-cream)] rounded-lg p-3 border border-[color:var(--brand-sun)]/40">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[color:var(--brand-ink)]/70">
              🏆 {unlockedAchievements.length}/{achievements.length} Achievements
            </span>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="text-xs text-[color:var(--brand-forest)] hover:underline"
            >
              {showAchievements ? 'Hide' : 'View'}
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-[color:var(--brand-ink)]/60">
              {bridgeCount} bridges · {totalBridgedVolume.toFixed(0)} ONBT total
            </div>
          </div>
        </div>

        {/* Achievement Details */}
        {showAchievements && (
          <div className="mt-3 space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.earned
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-700'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm text-[color:var(--brand-ink)]">
                    {achievement.name}
                  </div>
                  <div className="text-xs text-[color:var(--brand-ink)]/60">
                    {achievement.description}
                  </div>
                </div>
                {achievement.earned && (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    ✓ Unlocked
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {address && (
          <Identity address={address} className="mt-4">
            <Avatar />
            <Name />
          </Identity>
        )}
      </div>

      {/* Current Chain Info */}
      <div className="mb-6 p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-[color:var(--brand-ink)]/60 mb-1">Current Chain</p>
            <p className="text-xl font-semibold text-[color:var(--brand-forest)]">{currentChainName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[color:var(--brand-ink)]/60 mb-1">Your Balance</p>
            <p className="text-xl font-semibold text-[color:var(--brand-ink)]">
              {parseFloat(userBalance).toFixed(4)} ONBT
            </p>
          </div>
        </div>
      </div>

      {!isWalletOnSelectedChain && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Wallet chain differs from selected source chain. Click Bridge to switch wallet to {currentChainName}.
          </p>
        </div>
      )}

      {/* Bridge Form */}
      <div className="space-y-4">
        {/* Destination Chain Selection */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
            Bridge To
          </label>
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

        {/* Auto-Stake Feature */}
        <div className="p-4 border-2 border-dashed border-[color:var(--brand-leaf)]/30 rounded-lg bg-[color:var(--brand-cream)]/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoStake"
                checked={autoStake}
                onChange={(e) => setAutoStake(e.target.checked)}
                className="w-4 h-4 text-[color:var(--brand-forest)] rounded focus:ring-[color:var(--brand-forest)]"
              />
              <label htmlFor="autoStake" className="text-sm font-medium text-[color:var(--brand-ink)]">
                🎯 Auto-Stake on Arrival
              </label>
            </div>
            <span className="text-xs bg-[color:var(--brand-sun)]/30 px-2 py-1 rounded">
              Coming Soon
            </span>
          </div>
          
          {autoStake && (
            <div>
              <label className="block text-xs font-medium text-[color:var(--brand-ink)]/70 mb-2">
                Select Lockup Period
              </label>
              <select
                value={autoStakeLockup}
                onChange={(e) => setAutoStakeLockup(parseInt(e.target.value) as LockupPeriod)}
                aria-label="Select lockup period for auto-staking"
                className="w-full px-3 py-2 text-sm border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]"
              >
                <option value={LockupPeriod.NONE}>No Lockup (1x rewards)</option>
                <option value={LockupPeriod.DAYS_30}>30 Days (1.2x rewards)</option>
                <option value={LockupPeriod.DAYS_90}>90 Days (1.5x rewards)</option>
                <option value={LockupPeriod.DAYS_180}>180 Days (2x rewards)</option>
                <option value={LockupPeriod.DAYS_365}>365 Days (3x rewards)</option>
              </select>
              <p className="mt-2 text-xs text-[color:var(--brand-ink)]/60">
                💡 Your tokens will automatically stake when they arrive on {destinationChainName}
              </p>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
            Amount to Bridge
          </label>
          <input
            type="number"
            value={bridgeAmount}
            onChange={(e) => setBridgeAmount(e.target.value)}
            placeholder="0.0"
            className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80 text-lg"
          />
          <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
            <span>Available: {parseFloat(userBalance).toFixed(4)} ONBT</span>
            <button
              onClick={() => setBridgeAmount(userBalance)}
              className="text-[color:var(--brand-forest)] hover:underline"
            >
              Max
            </button>
          </div>
        </div>

        {/* Fee Estimate */}
        {estimatedFee && bridgeAmount && parseFloat(bridgeAmount) > 0 && (
          <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[color:var(--brand-ink)]/60">Bridge Fee (LayerZero)</span>
              <span className="font-medium text-[color:var(--brand-ink)]">
                {formatEther(estimatedFee)} ETH
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[color:var(--brand-ink)]/60">You will receive</span>
              <span className="font-medium text-[color:var(--brand-forest)]">
                ~{bridgeAmount} ONBT
              </span>
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
          <a
            href={`https://${selectedSourceChainId === 42161 ? 'arbiscan.io' : 'basescan.org'}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-[color:var(--brand-forest)] hover:underline"
          >
            View transaction on explorer
          </a>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">Error: {error.message}</p>
          </div>
        )}

        {isConfirmed && (
          <div className="space-y-3">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">
                ✓ Bridge transaction submitted!
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                Tokens will arrive on {destinationChainName} in a few minutes.
              </p>
            </div>
            
            {/* Show achievement progress */}
            {nextAchievement && (
              <div className="p-3 bg-[color:var(--brand-sun)]/20 border border-[color:var(--brand-sun)]/40 rounded-lg">
                <p className="text-xs font-medium text-[color:var(--brand-ink)] mb-1">
                  🎯 Next Achievement: {nextAchievement.name}
                </p>
                <p className="text-xs text-[color:var(--brand-ink)]/60">
                  {nextAchievement.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 space-y-3">
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-sun)]/40">
          <p className="text-xs text-[color:var(--brand-ink)]/70 mb-2">
            <strong>🔒 Powered by LayerZero V2</strong>
          </p>
          <p className="text-xs text-[color:var(--brand-ink)]/70 mb-3">
            ONBT uses LayerZero&apos;s Omnichain Fungible Token (OFT) standard for secure cross-chain transfers.
            Your tokens are burned on the source chain and minted on the destination chain, maintaining a
            unified global supply.
          </p>
          <p className="text-xs text-[color:var(--brand-ink)]/70">
            <strong>🏆 Earn Achievements:</strong> Complete bridges to unlock achievements and showcase your
            omnichain journey!
          </p>
        </div>

        {/* Alternative Bridge Option */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
            <strong>Alternative Bridge:</strong>
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
            You can also bridge ONBT using Stargate Finance or other LayerZero-compatible bridges:
          </p>
          <a
            href="https://stargate.finance/transfer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Bridge via Stargate Finance →
          </a>
        </div>
      </div>
    </div>
  );
}
