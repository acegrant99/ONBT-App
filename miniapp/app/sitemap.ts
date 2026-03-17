import type { MetadataRoute } from 'next';
import { getServerAppUrl } from '@/config/app-url';

const ROOT_URL = getServerAppUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ROOT_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${ROOT_URL}/.well-known/farcaster.json`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
