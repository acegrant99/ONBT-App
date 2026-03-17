/**
 * Ethers signer helper for the frontend
 * Uses the injected wallet provider when connected
 */

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

export const useEthersSigner = (): ethers.Signer | undefined => {
  const { isConnected } = useAccount();

  return useMemo(() => {
    if (!isConnected || typeof window === 'undefined') {
      return undefined;
    }
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      return undefined;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    return provider.getSigner();
  }, [isConnected]);
};
