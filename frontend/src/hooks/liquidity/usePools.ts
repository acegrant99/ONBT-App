import { useChainId, useReadContract } from 'wagmi'
import liquidityManagerAbi from '@/contracts/abi/ONBTLiquidityManager.json'
import { getContractAddresses, CHAINS } from '@/config/contracts'

export interface Pool {
  id: string
  token0Symbol: string
  token1Symbol: string
  tvl: string
  apy: number
}

export function usePools() {
  const chainId = useChainId()
  const contracts = getContractAddresses(chainId || CHAINS.BASE)
  const layerZeroEid = chainId === CHAINS.ARBITRUM ? 30110 : 30184

  const { data: allocation } = useReadContract({
    address: contracts.liquidityManager as `0x${string}`,
    abi: liquidityManagerAbi.abi,
    functionName: 'poolAllocations',
    args: [layerZeroEid, contracts.onbtToken as `0x${string}`],
  })

  const pools: Pool[] = [
    {
      id: contracts.onbtToken,
      token0Symbol: 'ONBT',
      token1Symbol: 'USDC',
      tvl: allocation ? allocation.toString() : '0',
      apy: 0,
    },
  ]

  return {
    pools,
    isLoading: false,
    refetch: () => {},
  }
}
