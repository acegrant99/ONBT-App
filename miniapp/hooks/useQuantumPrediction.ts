import { useQuery } from '@tanstack/react-query';
import type { QuantumPrediction } from '@/types/app-shell';

export function useQuantumPrediction() {
  return useQuery<QuantumPrediction>({
    queryKey: ['quantum-prediction'],
    queryFn: async () => {
      const response = await fetch('/api/quantum/predict', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Quantum prediction failed with status ${response.status}`);
      }
      return response.json() as Promise<QuantumPrediction>;
    },
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}
