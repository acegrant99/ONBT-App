import { unstable_cache } from 'next/cache';

export type BackendCacheAdapterConfig = {
  key: string;
  revalidateSeconds: number;
  tags: string[];
};

export function withBackendCache<T>(config: BackendCacheAdapterConfig, loader: () => Promise<T>): Promise<T> {
  const cached = unstable_cache(loader, [config.key], {
    revalidate: config.revalidateSeconds,
    tags: config.tags,
  });
  return cached();
}

export function cacheControlFor(seconds: number): string {
  return `public, s-maxage=${seconds}, stale-while-revalidate=${Math.max(seconds * 2, 30)}`;
}
