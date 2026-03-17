import React from 'react'
import { useAccount, useReadContract, useReadContracts, useChainId } from 'wagmi'
import { formatUnits } from 'viem'
import { getContractAddresses } from '@/config/contracts'
import { fetchFromApi } from '@/lib/utils'
import stakingAbi from '@/contracts/abi/ONBTOmnichainStaking.json'
import tokenAbi from '@/contracts/abi/OmnichainNabatOFT.json'
import rewardsPoolAbi from '@/contracts/abi/ONBTRewardsPool.json'

/**
 * Hook to fetch live protocol-wide statistics
 * Auto-refreshes every 30 seconds
 */
export const useProtocolStats = () => {
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || 8453)

  // Fetch multiple contract reads in parallel with auto-refresh
  const { data: results, isLoading, refetch } = useReadContracts({
    contracts: [
      // Global total staked across all chains
      {
        address: contracts.staking as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'globalTotalStaked',
      },
      // Local total staked on this chain
      {
        address: contracts.staking as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'localTotalStaked',
      },
      // Base reward rate (rewards per second per token)
      {
        address: contracts.staking as `0x${string}`,
        abi: stakingAbi.abi,
        functionName: 'baseRewardRate',
      },
      // Token total supply
      {
        address: contracts.onbtToken as `0x${string}`,
        abi: tokenAbi.abi,
        functionName: 'totalSupply',
      },
      // Available rewards in pool
      {
        address: contracts.rewardsPool as `0x${string}`,
        abi: rewardsPoolAbi.abi,
        functionName: 'availableBalance',
      },
      // Total distributed rewards
      {
        address: contracts.rewardsPool as `0x${string}`,
        abi: rewardsPoolAbi.abi,
        functionName: 'totalDistributed',
      },
    ],
    query: {
      refetchInterval: 30000, // Auto-refresh every 30 seconds
    },
  })

  // Parse results
  const globalTotalStaked = results?.[0]?.status === 'success' ? (results[0].result as bigint) : 0n
  const localTotalStaked = results?.[1]?.status === 'success' ? (results[1].result as bigint) : 0n
  const baseRewardRate = results?.[2]?.status === 'success' ? (results[2].result as bigint) : 0n
  const totalSupply = results?.[3]?.status === 'success' ? (results[3].result as bigint) : 0n
  const availableRewards = results?.[4]?.status === 'success' ? (results[4].result as bigint) : 0n
  const totalDistributed = results?.[5]?.status === 'success' ? (results[5].result as bigint) : 0n

  // Calculate derived metrics
  const secondsPerDay = 86400n

  // Daily rewards = baseRewardRate * globalTotalStaked * secondsPerDay
  // (baseRewardRate is per second per token staked)
  const dailyRewardsBigInt = globalTotalStaked > 0n 
    ? (baseRewardRate * globalTotalStaked * secondsPerDay) / (10n ** 18n)
    : 0n

  // Annual rewards = daily rewards * 365
  const annualRewardsBigInt = dailyRewardsBigInt * 365n

  // Base APY = (annual rewards / total staked) * 100
  const baseAPY = globalTotalStaked > 0n
    ? Number((annualRewardsBigInt * 10000n) / globalTotalStaked) / 100
    : 0

  // Max APY with 2x lockup multiplier
  const maxAPY = baseAPY * 2

  // Reward runway in days
  const rewardRunwayDays = dailyRewardsBigInt > 0n
    ? Number((availableRewards * 10n ** 18n) / dailyRewardsBigInt)
    : 0

  // Format values for display
  const formatNumber = (value: bigint, decimals: number = 18): string => {
    const formatted = formatUnits(value, decimals)
    const num = parseFloat(formatted)
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}K`
    }
    return num.toFixed(2)
  }

  return {
    // Raw values
    raw: {
      globalTotalStaked,
      localTotalStaked,
      baseRewardRate,
      totalSupply,
      availableRewards,
      totalDistributed,
    },
    // Formatted display values
    display: {
      globalTotalStaked: formatNumber(globalTotalStaked),
      localTotalStaked: formatNumber(localTotalStaked),
      totalSupply: formatNumber(totalSupply),
      dailyRewards: formatNumber(dailyRewardsBigInt),
      availableRewards: formatNumber(availableRewards),
      totalDistributed: formatNumber(totalDistributed),
      baseAPY: baseAPY.toFixed(2),
      maxAPY: maxAPY.toFixed(2),
      rewardRunwayDays: rewardRunwayDays > 0 ? rewardRunwayDays.toFixed(0) : 'N/A',
    },
    // Calculated metrics
    metrics: {
      baseAPY,
      maxAPY,
      rewardRunwayDays,
      stakingRatio: totalSupply > 0n ? Number((globalTotalStaked * 10000n) / totalSupply) / 100 : 0,
    },
    // State
    isLoading,
    refetch,
  }
}

/**
 * Hook to get user's staking statistics with live updates
 * Auto-refreshes every 15 seconds
 */
export const useUserStakingStats = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || 8453)

  const { data: stakeInfo, isLoading, refetch } = useReadContract({
    address: contracts.staking as `0x${string}`,
    abi: stakingAbi.abi,
    functionName: 'getStakeInfo',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 15000, // Auto-refresh every 15 seconds
    },
  })

  if (!stakeInfo || !Array.isArray(stakeInfo) || !address) {
    return {
      stakedAmount: '0',
      startTime: '0',
      lockupEnd: '0',
      lockupType: 0,
      pendingRewards: '0',
      isLocked: false,
      isLoading,
      refetch,
    }
  }

  return {
    stakedAmount: formatUnits(stakeInfo[0] as bigint, 18),
    startTime: (stakeInfo[1] as bigint).toString(),
    lockupEnd: (stakeInfo[2] as bigint).toString(),
    lockupType: Number(stakeInfo[3]),
    pendingRewards: formatUnits(stakeInfo[4] as bigint, 18),
    isLocked: Boolean(stakeInfo[5]),
    isLoading,
    refetch,
  }
}

/**
 * Hook for historical staking data (for charts)
 * Fetches real historical data from blockchain event logs or backend
 */
export const useStakingHistory = () => {
  const [data, setData] = React.useState<Array<{ date: string; staked: number; rewards: number }>>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch from backend API that aggregates blockchain event logs
        const response = await fetchFromApi('/api/staking/history?days=30')
        
        // API is optional - if not configured, just skip
        if (!response) {
          setData([])
          return
        }
        
        const result = await response.json()
        setData(result.history || [])
      } catch (err) {
        if (import.meta.env.VITE_ENABLE_DEBUG) {
          console.error('Error fetching staking history:', err)
        }
        setError(err instanceof Error ? err.message : 'Failed to fetch staking history')
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoricalData()

    // Auto-refresh every 1 hour
    const interval = setInterval(fetchHistoricalData, 3600000)
    return () => clearInterval(interval)
  }, [])

  return {
    data,
    isLoading,
    error,
  }
}
