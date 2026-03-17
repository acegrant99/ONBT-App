// NOTE: server-only module — only import from app/api/ route handlers.
import {
  ONBT_TOKEN_ABI,
  ONBT_STAKING_ABI,
  ONBT_PRIVATE_SALE_ABI,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_PRIVATE_SALE_BASE_ADDRESS,
  ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
  CHAIN_CONFIG,
} from '@/config';
import { backendChains } from './clients';

type ChainKey = 'base' | 'arbitrum';

type ChainSnapshot = {
  key: ChainKey;
  chainId: number;
  name: string;
  blockNumber: string;
  token: {
    address: `0x${string}`;
    totalSupply: string | null;
  };
  staking: {
    address: `0x${string}`;
    paused: boolean | null;
    minStake: string | null;
    globalTotalStaked: string | null;
  };
  privateSale: {
    address: `0x${string}`;
    paused: boolean | null;
    saleAllocation: string | null;
    totalSold: string | null;
    remainingTokens: string | null;
  };
  healthy: boolean;
  error?: string;
};

const addressesByChain: Record<ChainKey, {
  token: `0x${string}`;
  staking: `0x${string}`;
  privateSale: `0x${string}`;
}> = {
  base: {
    token: ONBT_TOKEN_ADDRESS,
    staking: ONBT_STAKING_ADDRESS,
    privateSale: ONBT_PRIVATE_SALE_BASE_ADDRESS,
  },
  arbitrum: {
    token: ONBT_ARBITRUM_ADDRESS,
    staking: ONBT_STAKING_ARBITRUM_ADDRESS,
    privateSale: ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
  },
};

async function readSafe<T>(reader: () => Promise<T>): Promise<T | null> {
  try {
    return await reader();
  } catch {
    return null;
  }
}

export async function getChainSnapshot(key: ChainKey): Promise<ChainSnapshot> {
  const network = backendChains[key];
  const addresses = addressesByChain[key];

  try {
    const blockNumber = await network.client.getBlockNumber();

    const [
      totalSupply,
      stakingPaused,
      minStake,
      globalTotalStaked,
      salePaused,
      saleAllocation,
      totalSold,
      remainingTokens,
    ] = await Promise.all([
      readSafe(() => network.client.readContract({ address: addresses.token, abi: ONBT_TOKEN_ABI, functionName: 'totalSupply' })),
      readSafe(() => network.client.readContract({ address: addresses.staking, abi: ONBT_STAKING_ABI, functionName: 'paused' })),
      readSafe(() => network.client.readContract({ address: addresses.staking, abi: ONBT_STAKING_ABI, functionName: 'MIN_STAKE' })),
      readSafe(() => network.client.readContract({ address: addresses.staking, abi: ONBT_STAKING_ABI, functionName: 'globalTotalStaked' })),
      readSafe(() => network.client.readContract({ address: addresses.privateSale, abi: ONBT_PRIVATE_SALE_ABI, functionName: 'paused' })),
      readSafe(() => network.client.readContract({ address: addresses.privateSale, abi: ONBT_PRIVATE_SALE_ABI, functionName: 'saleAllocation' })),
      readSafe(() => network.client.readContract({ address: addresses.privateSale, abi: ONBT_PRIVATE_SALE_ABI, functionName: 'totalSold' })),
      readSafe(() => network.client.readContract({ address: addresses.privateSale, abi: ONBT_PRIVATE_SALE_ABI, functionName: 'remainingTokens' })),
    ]);

    return {
      key,
      chainId: network.chainId,
      name: network.name,
      blockNumber: blockNumber.toString(),
      token: {
        address: addresses.token,
        totalSupply: totalSupply ? (totalSupply as bigint).toString() : null,
      },
      staking: {
        address: addresses.staking,
        paused: typeof stakingPaused === 'boolean' ? stakingPaused : null,
        minStake: minStake ? (minStake as bigint).toString() : null,
        globalTotalStaked: globalTotalStaked ? (globalTotalStaked as bigint).toString() : null,
      },
      privateSale: {
        address: addresses.privateSale,
        paused: typeof salePaused === 'boolean' ? salePaused : null,
        saleAllocation: saleAllocation ? (saleAllocation as bigint).toString() : null,
        totalSold: totalSold ? (totalSold as bigint).toString() : null,
        remainingTokens: remainingTokens ? (remainingTokens as bigint).toString() : null,
      },
      healthy: true,
    };
  } catch (error) {
    return {
      key,
      chainId: network.chainId,
      name: network.name,
      blockNumber: '0',
      token: {
        address: addresses.token,
        totalSupply: null,
      },
      staking: {
        address: addresses.staking,
        paused: null,
        minStake: null,
        globalTotalStaked: null,
      },
      privateSale: {
        address: addresses.privateSale,
        paused: null,
        saleAllocation: null,
        totalSold: null,
        remainingTokens: null,
      },
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown backend read error',
    };
  }
}

export async function getOverviewPayload() {
  const [baseSnapshot, arbitrumSnapshot] = await Promise.all([
    getChainSnapshot('base'),
    getChainSnapshot('arbitrum'),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    source: 'server',
    chains: {
      base: baseSnapshot,
      arbitrum: arbitrumSnapshot,
    },
    summary: {
      healthyChains: [baseSnapshot, arbitrumSnapshot].filter((item) => item.healthy).length,
      totalChains: 2,
      configuredRpc: {
        base: process.env.BASE_RPC_URL || CHAIN_CONFIG.base.rpcUrl,
        arbitrum: process.env.ARBITRUM_RPC_URL || CHAIN_CONFIG.arbitrum.rpcUrl,
      },
    },
  };
}
