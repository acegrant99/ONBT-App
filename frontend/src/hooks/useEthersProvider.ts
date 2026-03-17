/**
 * Ethers provider helper for the frontend
 * Uses network RPCs based on current chain
 */

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { getNetworkConfig } from '@/config/contracts';

export const useEthersProvider = (): ethers.providers.JsonRpcProvider => {
  const { chainId } = useAccount();

  return useMemo(() => {
    const network = getNetworkConfig(chainId || 8453);
    return new ethers.providers.JsonRpcProvider(network.rpcUrl, {
      chainId: network.chainId,
      name: network.name.toLowerCase(),
    });
  }, [chainId]);
};
