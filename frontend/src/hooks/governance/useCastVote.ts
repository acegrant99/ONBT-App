import { useState } from 'react'
import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import governorAbi from '@/contracts/abi/ONBTGovernor.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export enum VoteType {
  Against = 0,
  For = 1,
  Abstain = 2,
}

/**
 * Hook to cast a vote on a governance proposal
 */
export function useCastVote() {
  const [proposalId, setProposalId] = useState<bigint | null>(null)
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const handleVote = (pId: bigint, voteType: VoteType) => {
    setProposalId(pId)
    try {
      writeContract({
        address: contracts.governor as `0x${string}`,
        abi: governorAbi.abi,
        functionName: 'castVote',
        args: [pId, voteType],
      })
      toast.success('Vote cast successfully!')
    } catch (error) {
      toast.error('Vote failed')
    }
  }

  return {
    castVote: handleVote,
    isLoading: isPending,
    proposalId,
  }
}
