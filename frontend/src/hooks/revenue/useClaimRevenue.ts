import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import revenueRouterAbi from '@/contracts/abi/ONBTRevenueRouter.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export function useClaimRevenue() {
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const claim = (amount: bigint = 0n) => {
    try {
      writeContract({
        address: contracts.revenueRouter as `0x${string}`,
        abi: revenueRouterAbi.abi,
        functionName: 'routeFees',
        args: [contracts.onbtToken as `0x${string}`, amount],
      })
      toast.success('Revenue claimed!')
    } catch {
      toast.error('Claim failed')
    }
  }

  return { claim, isLoading: isPending }
}
