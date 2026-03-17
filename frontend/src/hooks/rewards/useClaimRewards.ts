import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import rewardsPoolAbi from '@/contracts/abi/ONBTRewardsPool.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export function useClaimRewards() {
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const claim = (amount: bigint = 0n) => {
    try {
      writeContract({
        address: contracts.rewardsPool as `0x${string}`,
        abi: rewardsPoolAbi.abi,
        functionName: 'requestRewards',
        args: [amount],
      })
      toast.success('Rewards claimed!')
    } catch {
      toast.error('Claim failed')
    }
  }

  const claimMultiple = (amount: bigint = 0n) => {
    claim(amount)
  }

  return { claim, claimMultiple, isLoading: isPending }
}
