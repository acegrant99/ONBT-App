import { useState } from 'react'
import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import liquidityManagerAbi from '@/contracts/abi/ONBTLiquidityManager.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface AddLiquidityInput {
  poolId: string
  amount0: bigint
  amount1: bigint
  minAmount0: bigint
  minAmount1: bigint
  slippageTolerance: number
}

export function useAddLiquidity() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)
  const layerZeroEid = chainId === CHAINS.ARBITRUM ? 30110 : 30184

  const handleAddLiquidity = (input: AddLiquidityInput) => {
    if (input.amount0 === 0n || input.amount1 === 0n) {
      toast.error('Please enter amounts for both tokens')
      return
    }

    setIsSubmitting(true)
    try {
      const poolAddress = input.poolId.startsWith('0x')
        ? (input.poolId as `0x${string}`)
        : (contracts.onbtToken as `0x${string}`)

      writeContract({
        address: contracts.liquidityManager as `0x${string}`,
        abi: liquidityManagerAbi.abi,
        functionName: 'fundLiquidity',
        args: [layerZeroEid, poolAddress, input.amount0],
      })
      toast.success('Liquidity added successfully!')
    } catch (error) {
      toast.error('Add liquidity failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    addLiquidity: handleAddLiquidity,
    isLoading: isPending || isSubmitting,
  }
}
