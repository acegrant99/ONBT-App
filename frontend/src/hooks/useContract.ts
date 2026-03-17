import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import { formatUnits, parseUnits, type Abi } from 'viem'
import { getContractAddresses } from '@/config/contracts'
import achievementNftAbi from '@/contracts/abi/ONBTAchievementNFT.json'

// Hook to get ONBT token balance
export const useONBTBalance = () => {
  const { address, chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)

  const { data: balance, isLoading } = useReadContract({
    address: contracts.onbtToken as `0x${string}`,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
      },
    ],
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      refetchInterval: 10000, // Auto-refresh every 10 seconds
    },
  })

  return {
    balance: balance ? balance.toString() : '0',
    formatted: balance ? formatUnits(balance, 18) : '0',
    isLoading,
  }
}

// Hook to get staking information
export const useStakingInfo = () => {
  const { address, chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)

  const { data: stakeInfo, isLoading } = useReadContract({
    address: contracts.staking as `0x${string}`,
    abi: [
      {
        name: 'getStakeInfo',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'user', type: 'address' }],
        outputs: [
          { name: 'amount', type: 'uint256' },
          { name: 'startTime', type: 'uint256' },
          { name: 'lockupEnd', type: 'uint256' },
          { name: 'lockup', type: 'uint8' },
          { name: 'pendingRewards', type: 'uint256' },
          { name: 'isLocked', type: 'bool' },
        ],
      },
    ],
    functionName: 'getStakeInfo',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      refetchInterval: 15000, // Auto-refresh every 15 seconds
    },
  })

  if (!stakeInfo || !Array.isArray(stakeInfo) || !address) {
    return {
      stakedAmount: '0',
      startTime: '0',
      lockupEnd: '0',
      lockupType: 0,
      pendingRewards: '0',
      isLocked: false,
      isLoading,
    }
  }

  return {
    stakedAmount: formatUnits(stakeInfo[0], 18),
    startTime: stakeInfo[1].toString(),
    lockupEnd: stakeInfo[2].toString(),
    lockupType: Number(stakeInfo[3]),
    pendingRewards: formatUnits(stakeInfo[4], 18),
    isLocked: Boolean(stakeInfo[5]),
    isLoading,
  }
}

// Hook to get cross-chain staking information
export const useCrossChainStakes = () => {
  const { address, chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  
  // LayerZero EIDs: Base = 30184, Arbitrum = 30110
  const BASE_EID = 30184
  const ARBITRUM_EID = 30110

  const { data: results, isLoading } = useReadContracts({
    contracts: [
      {
        address: contracts.staking as `0x${string}`,
        abi: [
          {
            name: 'crossChainStakes',
            type: 'function',
            stateMutability: 'view',
            inputs: [
              { name: '', type: 'address' },
              { name: '', type: 'uint32' },
            ],
            outputs: [{ name: '', type: 'uint256' }],
          },
        ] as const,
        functionName: 'crossChainStakes',
        args: address ? [address as `0x${string}`, BASE_EID] : undefined,
      },
      {
        address: contracts.staking as `0x${string}`,
        abi: [
          {
            name: 'crossChainStakes',
            type: 'function',
            stateMutability: 'view',
            inputs: [
              { name: '', type: 'address' },
              { name: '', type: 'uint32' },
            ],
            outputs: [{ name: '', type: 'uint256' }],
          },
        ] as const,
        functionName: 'crossChainStakes',
        args: address ? [address as `0x${string}`, ARBITRUM_EID] : undefined,
      },
    ],
    query: {
      refetchInterval: 20000, // Auto-refresh every 20 seconds
    },
  })

  const baseStake = results?.[0]?.status === 'success' ? (results[0].result as bigint) : 0n
  const arbitrumStake = results?.[1]?.status === 'success' ? (results[1].result as bigint) : 0n
  const totalCrossChain = baseStake + arbitrumStake

  return {
    baseStake: formatUnits(baseStake, 18),
    arbitrumStake: formatUnits(arbitrumStake, 18),
    totalCrossChain: formatUnits(totalCrossChain, 18),
    isLoading,
  }
}

// Hook to stake ONBT
export const useStake = (amount: string) => {
  const { chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  const { writeContract, isPending, isSuccess } = useWriteContract()

  const stake = () => {
    const amountWei = parseUnits(amount || '0', 18)
    writeContract({
      address: contracts.staking as `0x${string}`,
      abi: [
        {
          name: 'stake',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ name: 'amount', type: 'uint256' }],
          outputs: [],
        },
      ],
      functionName: 'stake',
      args: [amountWei],
    })
  }

  return {
    stake,
    isLoading: isPending,
    isSuccess,
  }
}

// Hook to unstake ONBT
export const useUnstake = (amount: string) => {
  const { chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  const { writeContract, isPending, isSuccess } = useWriteContract()

  const unstake = () => {
    const amountWei = parseUnits(amount || '0', 18)
    writeContract({
      address: contracts.staking as `0x${string}`,
      abi: [
        {
          name: 'unstake',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ name: 'amount', type: 'uint256' }],
          outputs: [],
        },
      ],
      functionName: 'unstake',
      args: [amountWei],
    })
  }

  return {
    unstake,
    isLoading: isPending,
    isSuccess,
  }
}

// Hook to claim rewards
export const useClaimRewards = () => {
  const { chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  const { writeContract, isPending, isSuccess } = useWriteContract()

  const claim = () => {
    writeContract({
      address: contracts.staking as `0x${string}`,
      abi: [
        {
          name: 'claimRewards',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [],
          outputs: [],
        },
      ],
      functionName: 'claimRewards',
    })
  }

  return {
    claim,
    isLoading: isPending,
    isSuccess,
  }
}

// Hook to get achievement NFT count
export const useAchievementNFTs = () => {
  const { address, chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)

  const { data: balance, isLoading } = useReadContract({
    address: contracts.achievementNFT as `0x${string}`,
    abi: achievementNftAbi.abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      refetchInterval: 30000, // Auto-refresh every 30 seconds
    },
  })

  return {
    count: balance ? Number(balance) : 0,
    isLoading,
  }
}

// Hook to get achievement token IDs owned by the user
export const useAchievementsByOwner = () => {
  const { address, chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  const owner = address || '0x0000000000000000000000000000000000000000'

  const { data: tokenIds } = useReadContract({
    address: contracts.achievementNFT as `0x${string}`,
    abi: achievementNftAbi.abi,
    functionName: 'getAchievementsByOwner',
    args: [owner as `0x${string}`],
  })

  return {
    tokenIds: address && Array.isArray(tokenIds) ? (tokenIds as bigint[]) : [],
  }
}

export interface AchievementDetails {
  tokenId: bigint
  achievementType: number
  name: string
  rarity: number
  unlockedAt: bigint
  originChain: number
  originalRecipient: `0x${string}`
  transfers: bigint
}

// Hook to fetch achievement metadata for a list of token IDs
export const useAchievementDetails = (tokenIds: bigint[]) => {
  const { chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)

  const { data, isLoading } = useReadContracts({
    contracts: tokenIds.map((tokenId) => ({
      address: contracts.achievementNFT as `0x${string}`,
      abi: achievementNftAbi.abi as Abi,
      functionName: 'getAchievement',
      args: [tokenId],
    })),
    query: {
      enabled: tokenIds.length > 0,
    },
  })

  const achievements = (data || [])
    .map((item, index) => {
      const result = (item as { result?: unknown })?.result as unknown[] | undefined
      if (!result) return null

      const toBigInt = (value: unknown) => {
        if (typeof value === 'bigint') return value
        if (typeof value === 'number') return BigInt(value)
        if (typeof value === 'string') return BigInt(value)
        return 0n
      }

      return {
        tokenId: tokenIds[index],
        achievementType: Number(result[0] ?? 0),
        name: String(result[1] ?? `Achievement #${tokenIds[index]?.toString()}`),
        rarity: Number(result[2] ?? 0),
        unlockedAt: toBigInt(result[3]),
        originChain: Number(result[4] ?? 0),
        originalRecipient: (result[5] as `0x${string}`) || '0x0000000000000000000000000000000000000000',
        transfers: toBigInt(result[6]),
      }
    })
    .filter((achievement): achievement is AchievementDetails => Boolean(achievement))

  return {
    achievements,
    isLoading,
  }
}

// Hook to approve token spending
export const useApproveToken = (spender: string, amount: string) => {
  const { chainId } = useAccount()
  const contracts = getContractAddresses(chainId || 8453)
  const { writeContract, isPending, isSuccess } = useWriteContract()

  const approve = () => {
    const amountWei = parseUnits(amount || '0', 18)
    writeContract({
      address: contracts.onbtToken as `0x${string}`,
      abi: [
        {
          name: 'approve',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool' }],
        },
      ],
      functionName: 'approve',
      args: [spender as `0x${string}`, amountWei],
    })
  }

  return {
    approve,
    isLoading: isPending,
    isSuccess,
  }
}
