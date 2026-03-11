import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ['@react-native-async-storage/async-storage', 'pino-pretty'],
  turbopack: {
    resolveAlias: {
      '@react-native-async-storage/async-storage': './lib/shims/noop.ts',
      'pino-pretty': './lib/shims/noop.ts',
    },
  },
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
