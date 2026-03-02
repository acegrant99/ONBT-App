import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import {
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_STAKING_ABI,
  ONBT_TOKEN_ABI,
  LOCKUP_INFO,
  LockupPeriod,
} from '../config/contracts';
import { publishGlobalTxStatus } from '../lib/txStatus';
import { ChainSelector } from './ChainSelector';

/**
 * StakingInterface Component
 * Full-featured omnichain staking with:
 * - Lockup periods with reward multipliers
 * - Compound rewards
 * - Delegation for governance
 * - Achievement tracking
 * - Leaderboard display
 */
export function StakingInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [activeTab, setActiveTab] = useState<'stake' | 'manage' | 'rewards' | 'delegate'>('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [selectedLockup, setSelectedLockup] = useState<LockupPeriod>(LockupPeriod.NONE);
  const [delegateAddress, setDelegateAddress] = useState('');
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);

  const isOnBase = selectedChainId === 8453;
  const isOnArbitrum = selectedChainId === 42161;
  const isSupportedChain = isOnBase || isOnArbitrum;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const stakingContract = (isOnArbitrum ? ONBT_STAKING_ARBITRUM_ADDRESS : ONBT_STAKING_ADDRESS) as `0x${string}`;
  const tokenContract = (isOnArbitrum ? ONBT_ARBITRUM_ADDRESS : ONBT_TOKEN_ADDRESS) as `0x${string}`;
  // Both Base and Arbitrum staking contracts are deployed — writes enabled on both chains
  const canWriteStaking = isSupportedChain;

  // Check if staking contract is deployed
  const isStakingDeployed = stakingContract !== '0x0000000000000000000000000000000000000000';

  // Read user's ONBT balance
  const { data: tokenBalance, refetch: refetchBalance } = useReadContract({
    chainId: selectedChainId,
    address: tokenContract,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { refetchInterval: 15_000 },
  });

  // Read user's stake info
  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: isStakingDeployed && !!address,
      refetchInterval: 15_000,
    },
  });

  // Read user's pending rewards
  const { data: pendingRewards, refetch: refetchRewards } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
    query: {
      enabled: isStakingDeployed && !!address,
      refetchInterval: 15_000,
    },
  });

  // Read total staked
  const { data: totalStaked } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'localTotalStaked',
    query: {
      enabled: isStakingDeployed,
      refetchInterval: 30_000,
    },
  });

  // Read global total staked
  const { data: globalTotalStaked } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'globalTotalStaked',
    query: {
      enabled: isStakingDeployed,
      refetchInterval: 30_000,
    },
  });

  // Minimum stake amount
  const { data: minStake } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'MIN_STAKE',
    query: { refetchInterval: 30_000, enabled: isStakingDeployed },
  });

  // Contract pause status
  const { data: contractPaused } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'paused',
    query: { enabled: isStakingDeployed, refetchInterval: 30_000 },
  });

  // Hub detection
  const { data: isHubChain } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'isHub',
    query: { refetchInterval: 30_000, enabled: isStakingDeployed },
  });

  // Approval for staking
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    chainId: selectedChainId,
    address: tokenContract,
    abi: ONBT_TOKEN_ABI,
    functionName: 'allowance',
    args: address && stakingContract ? [address, stakingContract] : undefined,
    query: { refetchInterval: 30_000 },
  });

  // Write contracts
  const { data: approveTxHash, writeContract: approveToken, isPending: isApproving } = useWriteContract();
  const { data: stakeTxHash, writeContract: stakeTokens, isPending: isStaking } = useWriteContract();
  const { data: unstakeTxHash, writeContract: unstakeTokens, isPending: isUnstaking } = useWriteContract();
  const { data: claimTxHash, writeContract: claimRewards, isPending: isClaiming } = useWriteContract();
  const { data: compoundTxHash, writeContract: compoundRewards, isPending: isCompounding } = useWriteContract();
  const { data: delegateTxHash, writeContract: delegateVotes, isPending: isDelegating } = useWriteContract();

  // Wait for transactions
  const { isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ hash: approveTxHash });
  const { isSuccess: isStakeSuccess } = useWaitForTransactionReceipt({ hash: stakeTxHash });
  const { isSuccess: isUnstakeSuccess } = useWaitForTransactionReceipt({ hash: unstakeTxHash });
  const { isSuccess: isClaimSuccess } = useWaitForTransactionReceipt({ hash: claimTxHash });
  const { isSuccess: isCompoundSuccess } = useWaitForTransactionReceipt({ hash: compoundTxHash });
  const { isSuccess: isDelegateSuccess } = useWaitForTransactionReceipt({ hash: delegateTxHash });

  const activeTxHash = approveTxHash || stakeTxHash || unstakeTxHash || claimTxHash || compoundTxHash || delegateTxHash;
  const isTxPending = isApproving || isStaking || isUnstaking || isClaiming || isCompounding || isDelegating;
  const isTxSuccess = isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess || isDelegateSuccess;

  // Refetch on success
  useEffect(() => {
    if (isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess) {
      refetchBalance();
      refetchStakeInfo();
      refetchRewards();
      refetchAllowance();
    }
  }, [
    isApproveSuccess,
    isStakeSuccess,
    isUnstakeSuccess,
    isClaimSuccess,
    isCompoundSuccess,
    refetchBalance,
    refetchStakeInfo,
    refetchRewards,
    refetchAllowance,
  ]);

  useEffect(() => {
    const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';

    if (isTxPending) {
      publishGlobalTxStatus({
        source: 'staking',
        stage: 'pending',
        txHash: activeTxHash,
        explorerBaseUrl,
      });
      return;
    }

    if (isTxSuccess && activeTxHash) {
      publishGlobalTxStatus({
        source: 'staking',
        stage: 'success',
        txHash: activeTxHash,
        explorerBaseUrl,
      });
    }
  }, [isTxPending, isTxSuccess, activeTxHash, selectedChainId]);

  // Parse stake info
  const userStakeAmount = stakeInfo ? formatEther(stakeInfo[0] as bigint) : '0';
  const lockupEndTime = stakeInfo ? Number(stakeInfo[2]) : 0;
  const userLockup = stakeInfo ? Number(stakeInfo[3]) : 0;
  const userEarned = stakeInfo ? formatEther(stakeInfo[4] as bigint) : '0';
  const isLocked = stakeInfo ? (stakeInfo[5] as boolean) : false;

  const userBalance = tokenBalance ? formatEther(tokenBalance as bigint) : '0';
  const userRewards = pendingRewards ? formatEther(pendingRewards as bigint) : '0';
  const chainTotalStaked = totalStaked ? formatEther(totalStaked as bigint) : '0';
  const globalStaked = globalTotalStaked ? formatEther(globalTotalStaked as bigint) : '0';
  const minStakeAmount = minStake ? formatEther(minStake as bigint) : '0';
  const isPaused = !!contractPaused;

  // Check if needs approval
  const needsApproval = !allowance || (allowance as bigint) < parseEther(stakeAmount || '0');
  const belowMinStake = !!stakeAmount && parseFloat(stakeAmount) > 0 && minStake &&
    parseEther(stakeAmount) < (minStake as bigint);

  // Handlers
  const handleApprove = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    approveToken({
      address: tokenContract,
      abi: ONBT_TOKEN_ABI,
      functionName: 'approve',
      args: [stakingContract, parseEther(stakeAmount)],
    });
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    stakeTokens({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'stake',
      args: [parseEther(stakeAmount), selectedLockup],
    });
  };

  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    unstakeTokens({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'unstake',
      args: [parseEther(unstakeAmount)],
    });
  };

  const handleClaim = () => {
    if (!canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    claimRewards({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'claimRewards',
    });
  };

  const handleCompound = () => {
    if (!canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    compoundRewards({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'compound',
    });
  };

  const handleDelegate = () => {
    if (!delegateAddress || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    delegateVotes({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'delegate',
      args: [delegateAddress as `0x${string}`],
    });
  };

  // If staking not deployed, show coming soon
  if (!isStakingDeployed) {
    return (
      <div className="brand-card max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
        <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
          <h2 className="text-2xl font-semibold brand-display mb-4">🎯 ONBT Staking</h2>
        </div>
        <div className="p-8 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-sun)]/40 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold text-[color:var(--brand-ink)] mb-3">
            Staking Contract Deploying Soon
          </h3>
          <p className="text-[color:var(--brand-ink)]/70 mb-4">
            Omnichain staking with LayerZero V2 is ready for deployment. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-2">
          🎯 Omnichain Staking
        </h2>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        <p className="text-sm text-[color:var(--brand-ink)]/60 mb-4">
          Earn rewards with LayerZero V2 cross-chain staking
        </p>
        <div className="mb-3 inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs text-[color:var(--brand-ink)]/75">
          Capability: Read and write staking actions on selected chain ({isOnBase ? 'Base' : 'Arbitrum'})
        </div>
        {address && (
          <Identity address={address}>
            <Avatar />
            <Name />
          </Identity>
        )}
      </div>

      {!isSupportedChain && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Please connect to Base or Arbitrum to stake, unstake, claim, compound, or delegate.
          </p>
        </div>
      )}

      {!isWalletOnSelectedChain && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Wallet chain differs from selected chain. Submit an action to switch wallet to {isOnBase ? 'Base' : 'Arbitrum'}.
          </p>
        </div>
      )}

      {isPaused && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            ⛔ Staking contract is currently paused. Reads are live; writes are temporarily disabled.
          </p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Your Staked</p>
          <p className="text-2xl font-bold text-[color:var(--brand-forest)]">
            {parseFloat(userStakeAmount).toFixed(2)} ONBT
          </p>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Pending Rewards</p>
          <p className="text-2xl font-bold text-[color:var(--brand-sun)]">
            {parseFloat(userRewards).toFixed(4)} ONBT
          </p>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
          <p className="text-xs text-[color:var(--brand-ink)]/60 mb-1">Total Staked (Chain)</p>
          <p className="text-2xl font-bold text-[color:var(--brand-ink)]">
            {parseFloat(chainTotalStaked).toFixed(0)} ONBT
          </p>
          {isHubChain !== undefined && (
            <p className="text-xs text-[color:var(--brand-ink)]/50 mt-1">
              {isHubChain ? '🔵 Hub Chain' : '🔗 Spoke Chain'}
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[color:var(--brand-leaf)]/30">
        {(['stake', 'manage', 'rewards', 'delegate'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab
                ? 'text-[color:var(--brand-forest)] border-b-2 border-[color:var(--brand-forest)]'
                : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-ink)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stake Tab */}
      {activeTab === 'stake' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Amount to Stake
            </label>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
              <span>Available: {parseFloat(userBalance).toFixed(4)} ONBT</span>
              <button
                onClick={() => setStakeAmount(userBalance)}
                className="text-[color:var(--brand-forest)] hover:underline"
              >
                Max
              </button>
            </div>
            {minStakeAmount !== '0' && (
              <p className="mt-1 text-xs text-[color:var(--brand-ink)]/50">
                Minimum stake: {parseFloat(minStakeAmount).toLocaleString()} ONBT
              </p>
            )}
            {belowMinStake && (
              <p className="mt-1 text-xs text-red-600">
                Amount is below minimum stake of {parseFloat(minStakeAmount).toLocaleString()} ONBT
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Select Lockup Period
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LOCKUP_INFO.map((lockup) => (
                <button
                  key={lockup.period}
                  onClick={() => setSelectedLockup(lockup.period)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLockup === lockup.period
                      ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]'
                      : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70'
                  }`}
                >
                  <div className="font-medium text-[color:var(--brand-ink)]">{lockup.label}</div>
                  <div className="text-sm text-[color:var(--brand-forest)] font-bold mt-1">
                    {lockup.bonus} Rewards
                  </div>
                  {lockup.days > 0 && (
                    <div className="text-xs text-[color:var(--brand-ink)]/60 mt-1">
                      {lockup.days} days
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {needsApproval && stakeAmount && parseFloat(stakeAmount) > 0 ? (
            <button
              onClick={handleApprove}
              disabled={isApproving || !canWriteStaking || isPaused}
              className="w-full bg-[color:var(--brand-sun)] text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Approve ONBT'}
            </button>
          ) : (
            <button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking || isPaused || !!belowMinStake}
              className="w-full bg-[color:var(--brand-forest)] text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isStaking
                ? 'Staking...'
                : isPaused
                  ? 'Paused'
                  : !isWalletOnSelectedChain
                    ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}`
                    : 'Stake ONBT'}
            </button>
          )}

          {isStakeSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✓ Tokens staked successfully!</p>
            </div>
          )}
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
            <h3 className="font-medium text-[color:var(--brand-ink)] mb-3">Your Stake Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Staked Amount:</span>
                <span className="font-medium">{parseFloat(userStakeAmount).toFixed(4)} ONBT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Lockup:</span>
                <span className="font-medium">{LOCKUP_INFO[userLockup]?.label || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Status:</span>
                <span className={`font-medium ${isLocked ? 'text-red-600' : 'text-green-600'}`}>
                  {isLocked ? '🔒 Locked' : '✓ Unlocked'}
                </span>
              </div>
              {lockupEndTime > 0 && (
                <div className="flex justify-between">
                  <span className="text-[color:var(--brand-ink)]/60">Unlocks:</span>
                  <span className="font-medium">
                    {new Date(lockupEndTime * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Amount to Unstake
            </label>
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
              <span>Staked: {parseFloat(userStakeAmount).toFixed(4)} ONBT</span>
              <button
                onClick={() => setUnstakeAmount(userStakeAmount)}
                className="text-[color:var(--brand-forest)] hover:underline"
              >
                Max
              </button>
            </div>
          </div>

          <button
            onClick={handleUnstake}
            disabled={isUnstaking || isLocked || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking}
            className="w-full bg-red-600 text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isUnstaking
              ? 'Unstaking...'
              : isLocked
                ? 'Locked - Cannot Unstake'
                : !isWalletOnSelectedChain
                  ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}`
                  : 'Unstake ONBT'}
          </button>

          {isUnstakeSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✓ Tokens unstaked successfully!</p>
            </div>
          )}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-[color:var(--brand-sun)]/20 to-[color:var(--brand-forest)]/20 rounded-xl border border-[color:var(--brand-sun)]/40">
            <h3 className="font-medium text-[color:var(--brand-ink)] mb-2">Pending Rewards</h3>
            <p className="text-4xl font-bold text-[color:var(--brand-forest)] mb-4">
              {parseFloat(userRewards).toFixed(6)} ONBT
            </p>
            <p className="text-xs text-[color:var(--brand-ink)]/60">
              APY: 10% base + {LOCKUP_INFO[userLockup]?.bonus || '1x'} lockup multiplier
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleClaim}
              disabled={isClaiming || parseFloat(userRewards) <= 0 || !canWriteStaking}
              className="bg-[color:var(--brand-forest)] text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isClaiming ? 'Claiming...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Claim Rewards'}
            </button>
            <button
              onClick={handleCompound}
              disabled={isCompounding || parseFloat(userRewards) <= 0 || !canWriteStaking}
              className="bg-[color:var(--brand-sun)] text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isCompounding ? 'Compounding...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Compound'}
            </button>
          </div>

          {(isClaimSuccess || isCompoundSuccess) && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ {isClaimSuccess ? 'Rewards claimed!' : 'Rewards compounded!'}
              </p>
            </div>
          )}

          <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
            <p className="text-xs text-[color:var(--brand-ink)]/70">
              <strong>💡 Tip:</strong> Compounding automatically restakes your rewards, maximizing your returns
              through compound interest.
            </p>
          </div>
        </div>
      )}

      {/* Delegate Tab */}
      {activeTab === 'delegate' && (
        <div className="space-y-6">
          <div className="p-4 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20">
            <h3 className="font-medium text-[color:var(--brand-ink)] mb-2">Delegation</h3>
            <p className="text-sm text-[color:var(--brand-ink)]/60 mb-4">
              Delegate your voting power to participate in governance without moving your tokens.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Delegate Address
            </label>
            <input
              type="text"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
            />
            <p className="mt-2 text-xs text-[color:var(--brand-ink)]/60">
              Enter the address you want to delegate your voting power to, or use your own address to vote
              directly.
            </p>
          </div>

          <button
            onClick={handleDelegate}
            disabled={isDelegating || !delegateAddress || !canWriteStaking}
            className="w-full bg-[color:var(--brand-forest)] text-white font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isDelegating ? 'Delegating...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Delegate Votes'}
          </button>

          {isDelegateSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✓ Voting power delegated successfully!</p>
            </div>
          )}
        </div>
      )}

      {/* Global Stats */}
      <div className="mt-6 p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-sun)]/40">
        <p className="text-xs text-[color:var(--brand-ink)]/70 mb-2">
          <strong>📊 Omnichain Stats:</strong>
        </p>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[color:var(--brand-ink)]/60">This Chain:</span>
            <span className="ml-2 font-medium">{parseFloat(chainTotalStaked).toFixed(0)} ONBT</span>
          </div>
          <div>
            <span className="text-[color:var(--brand-ink)]/60">All Chains:</span>
            <span className="ml-2 font-medium">{parseFloat(globalStaked).toFixed(0)} ONBT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
