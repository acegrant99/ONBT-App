import { formatEther } from 'viem'

export interface LiquidityPosition {
  id: string
  poolId: string
  token0Symbol: string
  token1Symbol: string
  amount0: bigint
  amount1: bigint
  liquidityAmount: bigint
  shares: bigint
  totalShare: bigint
  unrealizedGains: bigint
  lpRewardsEarned: bigint
}

export function useLiquidityPositions() {
  const positions: LiquidityPosition[] = []

  const totalValueLocked = positions?.reduce((sum, pos) => {
    return sum + pos.amount0 + pos.amount1
  }, 0n) || 0n

  const totalRewardsEarned = positions?.reduce((sum, pos) => sum + pos.lpRewardsEarned, 0n) || 0n

  return {
    positions,
    totalValueLocked,
    totalValueLockedFormatted: formatEther(totalValueLocked),
    totalRewardsEarned,
    totalRewardsEarnedFormatted: formatEther(totalRewardsEarned),
    isLoading: false,
  }
}
