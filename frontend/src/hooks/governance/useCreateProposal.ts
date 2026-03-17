import { useState } from 'react'
import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import governorAbi from '@/contracts/abi/ONBTGovernor.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface ProposalInput {
  title: string
  description: string
  targets: `0x${string}`[]
  values: bigint[]
  calldatas: `0x${string}`[]
}

/**
 * Hook to create a new governance proposal
 * Only addresses with sufficient voting power can create proposals
 */
export function useCreateProposal() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const handleCreateProposal = (proposal: ProposalInput) => {
    if (!proposal.title.trim()) {
      toast.error('Proposal title is required')
      return
    }
    if (!proposal.description.trim()) {
      toast.error('Proposal description is required')
      return
    }
    if (proposal.targets.length === 0) {
      toast.error('Proposal must have at least one target')
      return
    }

    setIsSubmitting(true)
    try {
      writeContract({
        address: contracts.governor as `0x${string}`,
        abi: governorAbi.abi,
        functionName: 'propose',
        args: [
          proposal.title,
          proposal.description,
          proposal.targets,
          proposal.values,
          proposal.calldatas,
        ],
      })
      toast.success('Proposal created successfully!')
    } catch (error) {
      toast.error('Proposal creation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    createProposal: handleCreateProposal,
    isLoading: isPending || isSubmitting,
  }
}
