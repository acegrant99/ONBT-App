/**
 * Hook for executing contract functions with React Query integration
 * Provides data fetching, caching, and state management
 */

import { useMutation, useQuery, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useABIFunction } from './useABIFunction';
import { parseFormValue } from '../lib/abiTypeConversion';

interface UseContractFunctionOptions {
  /** Enable automatic refetch on mount */
  refetchOnMount?: boolean;
  /** Refetch interval in milliseconds */
  refetchInterval?: number | false;
  /** Stale time in milliseconds */
  staleTime?: number;
  /** Cache time in milliseconds */
  cacheTime?: number;
  /** Query key prefix */
  queryKeyPrefix?: string;
}

/**
 * Hook to call read-only contract functions
 */
export function useContractRead(
  contractAddress: string,
  abi: any[],
  functionName: string,
  args: any[] = [],
  provider?: ethers.providers.Provider,
  options?: UseContractFunctionOptions
): UseQueryResult<any, Error> {
  const abiData = useABIFunction(abi, functionName);

  return useQuery({
    queryKey: [
      options?.queryKeyPrefix || 'contract',
      contractAddress,
      functionName,
      ...args,
    ],
    queryFn: async () => {
      if (!abiData || !provider) {
        throw new Error('Missing ABI data or provider');
      }

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const result = await contract[functionName](...args);
      return result;
    },
    enabled: Boolean(abiData && provider),
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchInterval: options?.refetchInterval ?? false,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    cacheTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
  });
}

interface UseContractWriteOptions {
  /** Callback on success */
  onSuccess?: (data: any) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Custom mutation key */
  mutationKey?: string[];
}

/**
 * Hook to execute contract write functions
 */
export function useContractWrite(
  contractAddress: string,
  abi: any[],
  functionName: string,
  signer?: ethers.Signer,
  options?: UseContractWriteOptions
): UseMutationResult<any, Error, Record<string, any>> {
  const abiData = useABIFunction(abi, functionName);

  return useMutation({
    mutationKey: options?.mutationKey || ['contract', contractAddress, functionName],
    mutationFn: async (formData: Record<string, any>) => {
      if (!abiData || !signer) {
        throw new Error('Missing ABI data or signer');
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const { formFields } = abiData;

      // Parse form values
      const callArgs = formFields.map(field => {
        const value = formData[field.name];
        return parseFormValue(value, field.solidityType);
      });

      // Send transaction
      const tx = await contract[functionName](...callArgs);
      const receipt = await tx.wait();

      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status ? 'Success' : 'Failed',
      };
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to batch call multiple read functions
 */
export function useMultipleContractReads(
  calls: Array<{
    address: string;
    abi: any[];
    functionName: string;
    args?: any[];
  }>,
  provider?: ethers.providers.Provider,
  options?: UseContractFunctionOptions
): UseQueryResult<any[], Error> {
  return useQuery({
    queryKey: [
      options?.queryKeyPrefix || 'multiCall',
      ...calls.map(c => `${c.address}-${c.functionName}`),
    ],
    queryFn: async () => {
      if (!provider) {
        throw new Error('Provider required');
      }

      return Promise.all(
        calls.map(async call => {
          const contract = new ethers.Contract(call.address, call.abi, provider);
          return contract[call.functionName](...(call.args || []));
        })
      );
    },
    enabled: Boolean(provider && calls.length > 0),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    cacheTime: options?.cacheTime ?? 10 * 60 * 1000,
  });
}

/**
 * Hook to watch for contract events
 */
export function useContractEvents(
  contractAddress: string,
  abi: any[],
  eventName: string,
  provider?: ethers.providers.Provider,
  filter?: ethers.EventFilter
): UseQueryResult<any[], Error> {
  return useQuery({
    queryKey: ['contractEvents', contractAddress, eventName],
    queryFn: async () => {
      if (!provider) {
        throw new Error('Provider required');
      }

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const events = await contract.queryFilter(contract.filters[eventName]?.(), filter);
      return events;
    },
    enabled: Boolean(provider),
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
  });
}
