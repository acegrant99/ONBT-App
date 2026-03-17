export interface RewardPoint {
  date: string
  amount: number
}

export function useHistoricalRewards(days: number = 30) {
  const chartData: RewardPoint[] = []
  const totalEarned = 0n
  const averagePerDay = days > 0 ? totalEarned / BigInt(days) : 0n

  return {
    chartData,
    totalEarned,
    averagePerDay,
    isLoading: false,
  }
}
