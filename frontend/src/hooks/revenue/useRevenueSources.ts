import { useChainId, useReadContract } from 'wagmi'
import revenueRouterAbi from '@/contracts/abi/ONBTRevenueRouter.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface RevenueSource {
  name: string
  amount: bigint
  percentage: number
}

export interface RevenueSources {
  sourcesList: RevenueSource[]
  total: bigint
}

export function useRevenueSources(): RevenueSources & { isLoading: boolean } {
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const { data: toRewardsBps } = useReadContract({
    address: contracts.revenueRouter as `0x${string}`,
    abi: revenueRouterAbi.abi,
    functionName: 'toRewardsBps',
  })

  const { data: toVaultBps } = useReadContract({
    address: contracts.revenueRouter as `0x${string}`,
    abi: revenueRouterAbi.abi,
    functionName: 'toVaultBps',
  })

  const { data: toInsuranceBps } = useReadContract({
    address: contracts.revenueRouter as `0x${string}`,
    abi: revenueRouterAbi.abi,
    functionName: 'toInsuranceBps',
  })

  const rewardsBps = Number(toRewardsBps || 0n)
  const vaultBps = Number(toVaultBps || 0n)
  const insuranceBps = Number(toInsuranceBps || 0n)
  const totalBps = rewardsBps + vaultBps + insuranceBps

  const sourcesList: RevenueSource[] = totalBps
    ? [
        { name: 'Rewards', amount: 0n, percentage: (rewardsBps / totalBps) * 100 },
        { name: 'Vault', amount: 0n, percentage: (vaultBps / totalBps) * 100 },
        { name: 'Insurance', amount: 0n, percentage: (insuranceBps / totalBps) * 100 },
      ]
    : []

  const total = sourcesList.reduce((sum, source) => sum + source.amount, 0n)

  return { sourcesList, total, isLoading: false }
}
