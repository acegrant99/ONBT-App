import { useState } from 'react'
import { useAccount, useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import votesAbi from '@/contracts/abi/OmnichainNabatVotes.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

/**
 * Hook to delegate voting power to another address
 * Delegates can vote on behalf of delegators
 */
export function useDelegateVotes() {
  const [delegatee, setDelegatee] = useState<`0x${string}` | null>(null)
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const { address } = useAccount()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)

  const handleDelegate = (delegateAddress: `0x${string}`) => {
    if (!delegateAddress || !delegateAddress.startsWith('0x')) {
      toast.error('Invalid address format')
      return
    }
    setDelegatee(delegateAddress)
    try {
      writeContract({
        address: contracts.onbtToken as `0x${string}`,
        abi: votesAbi.abi,
        functionName: 'delegate',
        args: [delegateAddress],
      })
      toast.success('Voting power delegated successfully!')
    } catch (error) {
      toast.error('Delegation failed')
    }
  }

  const handleSelfDelegate = () => {
    if (!address) {
      toast.error('Wallet not connected')
      return
    }
    handleDelegate(address)
  }

  return {
    delegate: handleDelegate,
    selfDelegate: handleSelfDelegate,
    isLoading: isPending,
    currentDelegatee: delegatee,
  }
}
