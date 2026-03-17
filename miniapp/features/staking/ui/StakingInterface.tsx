'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, usePublicClient, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import type { Abi } from 'viem';
import { parseEther, formatEther, isAddress } from 'viem';
import {
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_STAKING_ABI,
  ONBT_TOKEN_ABI,
  LOCKUP_INFO,
  LockupPeriod,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { StakingYieldChart } from '@/components/charts';

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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preflightDetail, setPreflightDetail] = useState<{ decodedReason?: string; rawError?: string } | null>(null);

  const isOnBase = selectedChainId === 8453;
  const isOnArbitrum = selectedChainId === 42161;
  const isSupportedChain = isOnBase || isOnArbitrum;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const stakingContract = (isOnArbitrum ? ONBT_STAKING_ARBITRUM_ADDRESS : ONBT_STAKING_ADDRESS) as `0x${string}`;
  const tokenContract = (isOnArbitrum ? ONBT_ARBITRUM_ADDRESS : ONBT_TOKEN_ADDRESS) as `0x${string}`;
  const publicClient = usePublicClient({ chainId: selectedChainId });
  // Both Base and Arbitrum staking contracts are deployed - writes enabled on both chains
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

  // On-chain achievements (hub = Base only)
  const { data: achievementBitmap } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'achievementsBitmap',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isStakingDeployed, refetchInterval: 30_000 },
  });

  // User's leaderboard rank
  const { data: leaderboardRank } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'getLeaderboardRank',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isStakingDeployed, refetchInterval: 30_000 },
  });

  // Top 10 stakers
  const { data: topStakers } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'getTopStakers',
    args: [10n],
    query: { enabled: isStakingDeployed, refetchInterval: 60_000 },
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

  // Base reward rate (ONBT wei/sec distributed across all stakers)
  const { data: baseRewardRate } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'baseRewardRate',
    query: { refetchInterval: 60_000, enabled: isStakingDeployed },
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

  // LayerZero fee quotes — only needed on spoke chains (Arbitrum, isHub=false)
  const stakeAmountBigInt = stakeAmount && parseFloat(stakeAmount) > 0 ? parseEther(stakeAmount) : undefined;
  const unstakeAmountBigInt = unstakeAmount && parseFloat(unstakeAmount) > 0 ? parseEther(unstakeAmount) : undefined;
  const compoundAmountBigInt = pendingRewards ? (pendingRewards as bigint) : 1n;
  const isSpokeChain = isHubChain === false;

  const { data: stakeFeeQuote } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'quoteStakeSyncFee',
    args: address && stakeAmountBigInt ? [address, stakeAmountBigInt, true] : undefined,
    query: { enabled: isStakingDeployed && !!address && !!stakeAmountBigInt && isSpokeChain, refetchInterval: 30_000 },
  });

  const { data: unstakeFeeQuote } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'quoteStakeSyncFee',
    args: address && unstakeAmountBigInt ? [address, unstakeAmountBigInt, false] : undefined,
    query: { enabled: isStakingDeployed && !!address && !!unstakeAmountBigInt && isSpokeChain, refetchInterval: 30_000 },
  });

  const { data: compoundFeeQuote } = useReadContract({
    chainId: selectedChainId,
    address: stakingContract as `0x${string}`,
    abi: ONBT_STAKING_ABI,
    functionName: 'quoteStakeSyncFee',
    args: address ? [address, compoundAmountBigInt, true] : undefined,
    query: { enabled: isStakingDeployed && !!address && isSpokeChain, refetchInterval: 30_000 },
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

  // Estimated base APR (no lockup bonus): rate * seconds_per_year / totalStaked
  const SECONDS_PER_YEAR = 31_557_600n;
  const estimatedApr = (() => {
    if (!baseRewardRate || !totalStaked) return null;
    const rate = baseRewardRate as bigint;
    const staked = totalStaked as bigint;
    if (rate === 0n || staked === 0n) return null;
    // Compute as float: (rate_per_sec * seconds_per_year / staked) * 100
    const annualRewardWei = rate * SECONDS_PER_YEAR;
    const aprFloat = (Number(annualRewardWei) / Number(staked)) * 100;
    return Number.isFinite(aprFloat) ? aprFloat : null;
  })();

  // User's share of the chain staking pool
  const userPoolShare = (() => {
    const userAmt = parseFloat(userStakeAmount);
    const poolAmt = parseFloat(chainTotalStaked);
    if (!Number.isFinite(userAmt) || !Number.isFinite(poolAmt) || poolAmt === 0) return null;
    return (userAmt / poolAmt) * 100;
  })();

  const runStakingPreflight = async (input: {
    actionLabel: string;
    functionName: string;
    args?: readonly unknown[];
    value?: bigint;
    checks?: Array<{ ok: boolean; reason: string }>;
    addressOverride?: `0x${string}`;
    abiOverride?: typeof ONBT_STAKING_ABI | typeof ONBT_TOKEN_ABI;
  }) => {
    const result = await runActionPreflight({
      actionLabel: input.actionLabel,
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      checks: input.checks,
      request: {
        address: input.addressOverride || stakingContract,
        abi: (input.abiOverride || ONBT_STAKING_ABI) as unknown as Abi,
        functionName: input.functionName,
        args: input.args,
        value: input.value,
      },
    });

    if (!result.ok) {
      setValidationError(result.copy);
      setPreflightDetail({ decodedReason: result.decodedReason, rawError: result.rawError });
      return false;
    }

    setValidationError(null);
    setPreflightDetail(null);

    return true;
  };

  // LZ fee readiness guards (only blocking on spoke chains)
  const stakeFeeReady = !isSpokeChain || !!stakeAmountBigInt === false || !!(stakeFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee;
  const unstakeFeeReady = !isSpokeChain || !!unstakeAmountBigInt === false || !!(unstakeFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee;
  const compoundFeeReady = !isSpokeChain || !!(compoundFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee;

  // Check if needs approval
  const needsApproval = !allowance || (allowance as bigint) < parseEther(stakeAmount || '0');
  const belowMinStake = !!stakeAmount && parseFloat(stakeAmount) > 0 && minStake &&
    parseEther(stakeAmount) < (minStake as bigint);

  // Handlers
  const handleApprove = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const amount = parseEther(stakeAmount);
    const ok = await runStakingPreflight({
      actionLabel: 'Staking approval',
      functionName: 'approve',
      args: [stakingContract, amount],
      addressOverride: tokenContract,
      abiOverride: ONBT_TOKEN_ABI,
    });
    if (!ok) return;

    approveToken({
      address: tokenContract,
      abi: ONBT_TOKEN_ABI,
      functionName: 'approve',
      args: [stakingContract, amount],
    });
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const amount = parseEther(stakeAmount);

    if (isSpokeChain) {
      const lzFee = (stakeFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee ?? 0n;
      const ok = await runStakingPreflight({
        actionLabel: 'Stake ONBT',
        functionName: 'stakeWithFee',
        args: [amount, selectedLockup],
        value: lzFee,
        checks: [{ ok: amount > 0n, reason: 'Stake amount must be greater than zero.' }],
      });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stakeTokens({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'stakeWithFee', args: [amount, selectedLockup], value: lzFee } as any);
    } else {
      const ok = await runStakingPreflight({
        actionLabel: 'Stake ONBT',
        functionName: 'stake',
        args: [amount, selectedLockup],
        checks: [{ ok: amount > 0n, reason: 'Stake amount must be greater than zero.' }],
      });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stakeTokens({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'stake', args: [amount, selectedLockup] } as any);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const amount = parseEther(unstakeAmount);

    if (isSpokeChain) {
      const lzFee = (unstakeFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee ?? 0n;
      const ok = await runStakingPreflight({
        actionLabel: 'Unstake ONBT',
        functionName: 'unstakeWithFee',
        args: [amount],
        value: lzFee,
        checks: [{ ok: amount > 0n, reason: 'Unstake amount must be greater than zero.' }],
      });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unstakeTokens({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'unstakeWithFee', args: [amount], value: lzFee } as any);
    } else {
      const ok = await runStakingPreflight({
        actionLabel: 'Unstake ONBT',
        functionName: 'unstake',
        args: [amount],
        checks: [{ ok: amount > 0n, reason: 'Unstake amount must be greater than zero.' }],
      });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unstakeTokens({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'unstake', args: [amount] } as any);
    }
  };

  const handleClaim = async () => {
    if (!canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const ok = await runStakingPreflight({
      actionLabel: 'Claim rewards',
      functionName: 'claimRewards',
    });
    if (!ok) return;

    claimRewards({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'claimRewards',
    });
  };

  const handleCompound = async () => {
    if (!canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (isSpokeChain) {
      const lzFee = (compoundFeeQuote as { nativeFee: bigint } | undefined)?.nativeFee ?? 0n;
      const ok = await runStakingPreflight({ actionLabel: 'Compound rewards', functionName: 'compoundWithFee', value: lzFee });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compoundRewards({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'compoundWithFee', value: lzFee } as any);
    } else {
      const ok = await runStakingPreflight({ actionLabel: 'Compound rewards', functionName: 'compound' });
      if (!ok) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compoundRewards({ address: stakingContract as `0x${string}`, abi: ONBT_STAKING_ABI, functionName: 'compound' } as any);
    }
  };

  const handleDelegate = async () => {
    if (!delegateAddress || !canWriteStaking) return;
    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const normalizedDelegate = delegateAddress.trim();
    const ok = await runStakingPreflight({
      actionLabel: 'Delegate votes',
      functionName: 'delegate',
      args: [normalizedDelegate as `0x${string}`],
      checks: [{ ok: isAddress(normalizedDelegate), reason: 'Delegate address is invalid.' }],
    });
    if (!ok) return;

    delegateVotes({
      address: stakingContract as `0x${string}`,
      abi: ONBT_STAKING_ABI,
      functionName: 'delegate',
      args: [normalizedDelegate as `0x${string}`],
    });
  };

  // If staking not deployed, show coming soon
  if (!isStakingDeployed) {
    return (
      <div className="brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
        <div className="mb-6 border-b border-sky-900/15 pb-4">
          <button type="button" className="kicker-label mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1">Yield Engine</button>
          <button type="button" className="rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-left text-2xl font-semibold brand-display">ONBT Staking</button>
        </div>
        <div className="glass-tile motion-card p-8 text-center border border-[color:var(--brand-sun)]/40">
          <div className="text-4xl mb-4">🚧</div>
          <button type="button" className="mb-3 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-xl font-semibold text-[color:var(--brand-ink)]">
            Staking Contract Deploying Soon
          </button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-[color:var(--brand-ink)]/70">
            Omnichain staking with LayerZero V2 is ready for deployment. Check back soon!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header */}
      <div className="mb-6 border-b border-sky-900/15 pb-4">
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        {address && (
          <WalletIdentityBadge address={address} label="Staking wallet" />
        )}
      </div>

      {!isSupportedChain && (
        <div className="mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4">
          <button type="button" className="rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900">
            Please connect to Base or Arbitrum to stake, unstake, claim, compound, or delegate.
          </button>
        </div>
      )}

      {!isWalletOnSelectedChain && (
        <div className="mb-6 rounded-xl border border-sky-400/35 bg-sky-500/10 p-4">
          <button type="button" className="rounded-2xl border border-sky-300/45 bg-sky-50 px-3 py-2 text-left text-sm font-semibold text-sky-900">
            Wallet chain differs from selected chain. Submit an action to switch wallet to {isOnBase ? 'Base' : 'Arbitrum'}.
          </button>
        </div>
      )}

      {isPaused && (
        <div className="mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4">
          <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">
            ⛔ Staking contract is currently paused. Reads are live; writes are temporarily disabled.
          </button>
        </div>
      )}

      {validationError && (
        <div className="mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4">
          <button type="button" className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700">{validationError}</button>
          {preflightDetail?.decodedReason && (
            <button type="button" className="mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Decoded: {preflightDetail.decodedReason}</button>
          )}
        </div>
      )}

      {/* Stats Overview */}
      <div className="brand-stat-card motion-card rounded-xl px-3 py-3 mb-6">
        <div className="mb-2 flex flex-wrap gap-2">
          <button type="button" className="kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1">Position Telemetry</button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]">Staked {parseFloat(userStakeAmount).toFixed(2)} ONBT</button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]">Rewards {parseFloat(userRewards).toFixed(4)} ONBT</button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]">
            Chain Total {parseFloat(chainTotalStaked).toFixed(0)} ONBT {isHubChain !== undefined ? (isHubChain ? '· Hub' : '· Spoke') : ''}
            {userPoolShare !== null && userPoolShare > 0 && (
              <span className="ml-1 rounded-full border border-slate-900/10 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">{userPoolShare < 0.01 ? '<0.01' : userPoolShare.toFixed(2)}%</span>
            )}
          </button>
          <button type="button" className={`rounded-2xl border px-3 py-3 text-left font-semibold ${
            estimatedApr !== null && estimatedApr > 0
              ? 'border-emerald-300/60 bg-emerald-50/80 text-emerald-900'
              : 'border-slate-900/10 bg-white/92 text-[color:var(--brand-ink)]/60'
          }`}>
            {estimatedApr !== null && estimatedApr > 0
              ? `Est. APR ${estimatedApr.toFixed(1)}%`
              : 'APR not set'}
          </button>
          <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]">
            {leaderboardRank !== undefined && address
              ? `Rank #${Number(leaderboardRank as bigint) > 0 ? Number(leaderboardRank as bigint) : '—'}`
              : 'Rank —'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1">
        {(['stake', 'manage', 'rewards', 'delegate'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 font-medium transition-all ${
              activeTab === tab
              ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]'
                : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'
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
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Amount to Stake
            </button>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75">Available {parseFloat(userBalance).toFixed(4)} ONBT</button>
              <button
                onClick={() => setStakeAmount(userBalance)}
                className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]"
              >
                Max
              </button>
            </div>
            {minStakeAmount !== '0' && (
              <button type="button" className="mt-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">
                Minimum stake: {parseFloat(minStakeAmount).toLocaleString()} ONBT
              </button>
            )}
            {belowMinStake && (
              <button type="button" className="mt-1 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                Amount is below minimum stake of {parseFloat(minStakeAmount).toLocaleString()} ONBT
              </button>
            )}
          </div>

          <div>
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Select Lockup Period
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LOCKUP_INFO.map((lockup) => (
                <button
                  key={lockup.period}
                  onClick={() => setSelectedLockup(lockup.period)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLockup === lockup.period
                      ? 'border-[color:var(--brand-leaf)] bg-[color:var(--brand-cream)] shadow-[0_12px_24px_rgba(16,185,129,0.16)]'
                      : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 bg-[color:var(--brand-cream)]/55'
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
              className="brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Approve ONBT'}
            </button>
          ) : (
            <button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking || isPaused || !!belowMinStake || !stakeFeeReady}
              className="brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isStaking
                ? 'Staking...'
                : isPaused
                  ? 'Paused'
                  : !isWalletOnSelectedChain
                    ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}`
                    : !stakeFeeReady
                      ? 'Estimating fee...'
                      : 'Stake ONBT'}
            </button>
          )}

          {isStakeSuccess && (
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">✓ Tokens staked successfully!</button>
            </div>
          )}
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="brand-stat-card rounded-xl p-4">
            <button type="button" className="mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Your Stake Details</button>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">Staked Amount</button>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">{parseFloat(userStakeAmount).toFixed(4)} ONBT</button>
              </div>
              <div className="flex justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">Lockup</button>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">{LOCKUP_INFO[userLockup]?.label || 'None'}</button>
              </div>
              <div className="flex justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">Status</button>
                <button type="button" className={`rounded-full border px-2.5 py-1 font-semibold ${isLocked ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'}`}>
                  {isLocked ? '🔒 Locked' : '✓ Unlocked'}
                </button>
              </div>
              {lockupEndTime > 0 && (
                <div className="flex justify-between">
                  <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">Unlocks</button>
                  <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">
                    {new Date(lockupEndTime * 1000).toLocaleDateString()}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Amount to Unstake
            </button>
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75">Staked {parseFloat(userStakeAmount).toFixed(4)} ONBT</button>
              <button
                onClick={() => setUnstakeAmount(userStakeAmount)}
                className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]"
              >
                Max
              </button>
            </div>
          </div>

          <button
            onClick={handleUnstake}
            disabled={isUnstaking || isLocked || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking || !unstakeFeeReady}
            className="w-full rounded-xl bg-rose-500 text-white font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50"
          >
            {isUnstaking
              ? 'Unstaking...'
              : isLocked
                ? 'Locked - Cannot Unstake'
                : !isWalletOnSelectedChain
                  ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}`
                  : !unstakeFeeReady
                    ? 'Estimating fee...'
                    : 'Unstake ONBT'}
          </button>

          {isUnstakeSuccess && (
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">✓ Tokens unstaked successfully!</button>
            </div>
          )}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="brand-highlight-bar rounded-xl p-6">
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Pending Rewards</button>
            <button type="button" className="mb-4 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-4xl font-bold text-[color:var(--brand-forest)]">
              {parseFloat(userRewards).toFixed(6)} ONBT
            </button>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">
              APY: 10% base + {LOCKUP_INFO[userLockup]?.bonus || '1x'} lockup multiplier
            </button>
          </div>

          {/* Yield schedule chart */}
          <StakingYieldChart />

          {/* On-chain Achievements */}
          <div className="brand-stat-card rounded-xl p-4">
            <button type="button" className="mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">On-Chain Achievements</button>
            {!address ? (
              <p className="text-sm text-[color:var(--brand-ink)]/60">Connect wallet to view your achievements.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {([
                  { name: 'First Stake', icon: '\uD83E\uDD47', rarity: 'Common' },
                  { name: 'Diamond Hands', icon: '\uD83D\uDC8E', rarity: 'Rare' },
                  { name: 'Whale Staker', icon: '\uD83D\uDC0B', rarity: 'Rare' },
                  { name: 'Early Adopter', icon: '\u26A1', rarity: 'Legendary' },
                  { name: 'Compounding King', icon: '\uD83D\uDC51', rarity: 'Uncommon' },
                  { name: 'Cross-Chain User', icon: '\uD83C\uDF10', rarity: 'Uncommon' },
                  { name: 'Governance Participant', icon: '\uD83D\uDDF3\uFE0F', rarity: 'Uncommon' },
                  { name: 'Leaderboard Top 10', icon: '\uD83C\uDFC6', rarity: 'Legendary' },
                ] as const).map((ach, i) => {
                  const bitmap = achievementBitmap !== undefined ? Number(achievementBitmap as bigint) : 0;
                  const earned = (bitmap >> i) & 1;
                  const rarityColor = ach.rarity === 'Legendary'
                    ? 'border-amber-400/60 bg-amber-50'
                    : ach.rarity === 'Rare'
                      ? 'border-violet-300/60 bg-violet-50'
                      : ach.rarity === 'Uncommon'
                        ? 'border-sky-300/50 bg-sky-50'
                        : 'border-slate-200 bg-white';
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        earned ? rarityColor : 'border-slate-200 bg-slate-50 opacity-40'
                      }`}
                    >
                      <div className="text-2xl mb-1">{ach.icon}</div>
                      <div className="text-xs font-semibold text-[color:var(--brand-ink)] leading-tight">{ach.name}</div>
                      <div className={`mt-1 text-[10px] font-semibold ${
                        earned ? 'text-emerald-600' : 'text-slate-400'
                      }`}>{earned ? '\u2713 Earned' : ach.rarity}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="brand-stat-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">Staker Leaderboard</button>
              {leaderboardRank !== undefined && address && (
                <span className="rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]">
                  Your rank: #{Number(leaderboardRank as bigint) > 0 ? Number(leaderboardRank as bigint) : 'Unranked'}
                </span>
              )}
            </div>
            {topStakers && (topStakers as `0x${string}`[]).length > 0 ? (
              <div className="space-y-1">
                {(topStakers as `0x${string}`[]).map((addr, idx) => (
                  <div key={addr} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    addr.toLowerCase() === address?.toLowerCase()
                      ? 'border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)]/60 font-semibold'
                      : 'bg-white/60'
                  }`}>
                    <span className="font-mono text-[color:var(--brand-ink)]/50 w-6 text-center">#{idx + 1}</span>
                    <span className="flex-1 ml-3 font-mono text-xs text-[color:var(--brand-ink)]">
                      {addr.slice(0, 6)}&hellip;{addr.slice(-4)}
                      {addr.toLowerCase() === address?.toLowerCase() && (
                        <span className="ml-2 rounded-full border border-emerald-300 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">You</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[color:var(--brand-ink)]/60">No stakers ranked yet.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleClaim}
              disabled={isClaiming || parseFloat(userRewards) <= 0 || !canWriteStaking}
              className="brand-button text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isClaiming ? 'Claiming...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Claim Rewards'}
            </button>
            <button
              onClick={handleCompound}
              disabled={isCompounding || parseFloat(userRewards) <= 0 || !canWriteStaking || !compoundFeeReady}
              className="w-full rounded-xl bg-amber-500 text-slate-950 font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isCompounding ? 'Compounding...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : !compoundFeeReady ? 'Estimating fee...' : 'Compound'}
            </button>
          </div>

          {(isClaimSuccess || isCompoundSuccess) && (
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                ✓ {isClaimSuccess ? 'Rewards claimed!' : 'Rewards compounded!'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* Delegate Tab */}
      {activeTab === 'delegate' && (
        <div className="space-y-6">
          <div>
            <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80">
              Delegate Address
            </button>
            <input
              type="text"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
            />
          </div>

          <button
            onClick={handleDelegate}
            disabled={isDelegating || !delegateAddress || !canWriteStaking}
            className="brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50"
          >
            {isDelegating ? 'Delegating...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Delegate Votes'}
          </button>

          {isDelegateSuccess && (
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
              <button type="button" className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">✓ Voting power delegated successfully!</button>
            </div>
          )}
        </div>
      )}

      {/* Global Stats */}
      <div className="brand-highlight-bar mt-6 rounded-lg p-4">
        <button type="button" className="mb-2 rounded-full border border-slate-900/10 bg-white/92 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">📊 Omnichain Stats</button>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">This Chain</button>
            <button type="button" className="ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">{parseFloat(chainTotalStaked).toFixed(0)} ONBT</button>
          </div>
          <div>
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70">All Chains</button>
            <button type="button" className="ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">{parseFloat(globalStaked).toFixed(0)} ONBT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
