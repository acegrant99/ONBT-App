import { useQuery } from '@tanstack/react-query';
import type { BackendOverview } from '@/types/app-shell';

export function useBackendOverview() {
  return useQuery<BackendOverview>({
    queryKey: ['backend-overview'],
    queryFn: async () => {
      const response = await fetch('/api/chains/overview', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Backend overview failed with status ${response.status}`);
      }
      return response.json() as Promise<BackendOverview>;
    },
    refetchInterval: 20_000,
    staleTime: 10_000,
  });
}
