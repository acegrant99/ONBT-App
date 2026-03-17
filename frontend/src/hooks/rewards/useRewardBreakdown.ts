import { useChainId, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import rewardsPoolAbi from '@/contracts/abi/ONBTRewardsPool.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface RewardSource {
  name: string
  amount: bigint
  percentage: number
}

export interface RewardBreakdown {
  sources: RewardSource[]
  total: bigint
  claimable: bigint
}

export function useRewardBreakdown() {
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const { data: availableBalance } = useReadContract({
    address: contracts.rewardsPool as `0x${string}`,
    abi: rewardsPoolAbi.abi,
    functionName: 'availableBalance',
    args: [contracts.onbtToken as `0x${string}`],
  })

  const sources: RewardSource[] = []
  const total = sources.reduce((sum, source) => sum + source.amount, 0n)
  const claimable = typeof availableBalance === 'bigint' ? availableBalance : total

  return {
    sources,
    totalFormatted: formatEther(total),
    claimableFormatted: formatEther(claimable),
    isLoading: false,
  }
}
