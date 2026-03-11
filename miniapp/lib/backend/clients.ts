import { createPublicClient, http } from 'viem';
import { base, arbitrum } from 'viem/chains';
import { CHAIN_CONFIG } from '@/config';

const baseRpcUrl = process.env.BASE_RPC_URL || CHAIN_CONFIG.base.rpcUrl;
const arbitrumRpcUrl = process.env.ARBITRUM_RPC_URL || CHAIN_CONFIG.arbitrum.rpcUrl;

export const basePublicClient = createPublicClient({
  chain: base,
  transport: http(baseRpcUrl),
});

export const arbitrumPublicClient = createPublicClient({
  chain: arbitrum,
  transport: http(arbitrumRpcUrl),
});

export const backendChains = {
  base: {
    key: 'base' as const,
    chainId: CHAIN_CONFIG.base.chainId,
    name: CHAIN_CONFIG.base.name,
    client: basePublicClient,
  },
  arbitrum: {
    key: 'arbitrum' as const,
    chainId: CHAIN_CONFIG.arbitrum.chainId,
    name: CHAIN_CONFIG.arbitrum.name,
    client: arbitrumPublicClient,
  },
};
