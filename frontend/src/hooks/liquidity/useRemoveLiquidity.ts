import { useState } from 'react'
import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import liquidityManagerAbi from '@/contracts/abi/ONBTLiquidityManager.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface RemoveLiquidityInput {
  positionId: string
  liquidityAmount: bigint
  minAmount0: bigint
  minAmount1: bigint
}

export function useRemoveLiquidity() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)
  const layerZeroEid = chainId === CHAINS.ARBITRUM ? 30110 : 30184

  const handleRemoveLiquidity = (input: RemoveLiquidityInput) => {
    if (input.liquidityAmount === 0n) {
      toast.error('Please enter a liquidity amount')
      return
    }

    setIsSubmitting(true)
    try {
      const poolAddress = input.positionId.startsWith('0x')
        ? (input.positionId as `0x${string}`)
        : (contracts.onbtToken as `0x${string}`)

      writeContract({
        address: contracts.liquidityManager as `0x${string}`,
        abi: liquidityManagerAbi.abi,
        functionName: 'withdrawLiquidity',
        args: [layerZeroEid, poolAddress, input.liquidityAmount],
      })
      toast.success('Liquidity removed successfully!')
    } catch (error) {
      toast.error('Remove liquidity failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    removeLiquidity: handleRemoveLiquidity,
    isLoading: isPending || isSubmitting,
  }
}

