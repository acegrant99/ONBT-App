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
      // Turbopack on Windows doesn't resolve exports-map subpaths for these;
      // use relative paths (relative to project root / next.config location).
      '@coinbase/onchainkit/minikit': './node_modules/@coinbase/onchainkit/dist/minikit/index.js',
      '@coinbase/onchainkit/styles.css': './node_modules/@coinbase/onchainkit/dist/assets/style.css',
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
