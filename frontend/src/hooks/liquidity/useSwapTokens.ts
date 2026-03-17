import { useChainId, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import liquidityManagerAbi from '@/contracts/abi/ONBTLiquidityManager.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface SwapInput {
  fromToken: string
  toToken: string
  amountIn: string
  slippage: number
  poolAddress?: `0x${string}`
}

export function useSwapTokens() {
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)
  const layerZeroEid = chainId === CHAINS.ARBITRUM ? 30110 : 30184

  const swap = (input?: SwapInput) => {
    try {
      const amount = input?.amountIn ? BigInt(Math.floor(Number(input.amountIn) * 1e18)) : 0n
      const poolAddress = input?.poolAddress || (contracts.onbtToken as `0x${string}`)

      writeContract({
        address: contracts.liquidityManager as `0x${string}`,
        abi: liquidityManagerAbi.abi,
        functionName: 'fundLiquidity',
        args: [layerZeroEid, poolAddress, amount],
      })
      toast.success('Swap successful!')
    } catch {
      toast.error('Swap failed')
    }
  }

  return { swap, isLoading: isPending }
}
