import { useState } from 'react'
import { useChainId, useReadContract } from 'wagmi'
import governorAbi from '@/contracts/abi/ONBTGovernor.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface Proposal {
  id: bigint
  proposer: `0x${string}`
  title: string
  description: string
  startBlock: bigint
  endBlock: bigint
  forVotes: bigint
  againstVotes: bigint
  abstainVotes: bigint
  totalVotingPower: bigint
  executed: boolean
  canceled: boolean
  eta: bigint
}

export enum ProposalState {
  Pending = 'Pending',
  Active = 'Active',
  Canceled = 'Canceled',
  Defeated = 'Defeated',
  Succeeded = 'Succeeded',
  Queued = 'Queued',
  Executed = 'Executed',
}

/**
 * Hook to fetch all governance proposals
 * Only available on hub chain (Base)
 */
export function useGovernanceProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const { data: proposalCount } = useReadContract({
    address: contracts.governor as `0x${string}`,
    abi: governorAbi.abi,
    functionName: 'proposalCount',
  })

  const getProposalState = (proposal: Proposal): ProposalState => {
    if (proposal.executed) return ProposalState.Executed
    if (proposal.canceled) return ProposalState.Canceled
    return ProposalState.Pending
  }

  return {
    proposals,
    isLoading: false,
    proposalCount: proposalCount ? Number(proposalCount) : 0,
    getProposalState,
    refetch: () => setProposals([]),
  }
}
