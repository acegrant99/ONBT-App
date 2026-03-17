export interface RevenueClaim {
  date: string
  amount: number
}

export function useRevenueHistory(_days: number = 90) {
  const chartData: RevenueClaim[] = []
  const totalEarned = 0n
  const claimCount = 0

  return {
    chartData,
    totalEarned,
    claimCount,
    isLoading: false,
  }
}
