import { useAccount, useChainId, useReadContract } from 'wagmi'
import votesAbi from '@/contracts/abi/OmnichainNabatVotes.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

/**
 * Hook to get user's voting power
 * Voting power comes from staked ONBT tokens
 */
export function useVotingPower() {
  const { address } = useAccount()
  const delegatedTo: string | null = null
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const { data: votingPower } = useReadContract({
    address: contracts.onbtToken as `0x${string}`,
    abi: votesAbi.abi,
    functionName: 'getVotes',
    args: address ? [address] : undefined,
  })

  const votingPowerFormatted = votingPower ? votingPower.toString() : '0'

  return {
    votingPower: (votingPower as bigint) || 0n,
    votingPowerFormatted,
    delegatedTo,
    isLoading: false,
  }
}
