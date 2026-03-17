export interface APYData {
  baseAPY: number
  incentiveAPY: number
  totalAPY: number
  monthlyEarnings: bigint
  yearlyEarnings: bigint
}

export function useAPYProjection(): APYData & { isLoading: boolean } {
  return {
    baseAPY: 0,
    incentiveAPY: 0,
    totalAPY: 0,
    monthlyEarnings: 0n,
    yearlyEarnings: 0n,
    isLoading: false,
  }
}
