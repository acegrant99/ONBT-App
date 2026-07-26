import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'ES2020',
    outDir: 'dist',
    // Performance optimizations
    minify: 'terser',
    rollupOptions: {
      onwarn(warning, warn) {
        const isInvalidPureAnnotation =
          warning.code === 'INVALID_ANNOTATION' &&
          warning.message?.includes('contains an annotation that Rollup cannot interpret')
        const fromOxDependency = warning.id?.includes('/node_modules/') && warning.id?.includes('/ox/_esm/')

        if (isInvalidPureAnnotation && fromOxDependency) {
          return
        }

        warn(warning)
      },
      output: {
        // Code splitting strategy
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (
            id.includes('/@reown/') ||
            id.includes('/@walletconnect/') ||
            id.includes('/viem/') ||
            id.includes('/wagmi/') ||
            id.includes('/ethers/') ||
            id.includes('/connectkit/')
          ) {
            return 'vendor-web3'
          }
          if (id.includes('/framer-motion/') || id.includes('/lucide-react/') || id.includes('/recharts/')) {
            return 'vendor-ui'
          }
          if (id.includes('/date-fns/') || id.includes('/clsx/') || id.includes('/tailwind-merge/')) {
            return 'vendor-utils'
          }
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react'
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 3000,
    // Source maps for production debugging
    sourcemap: 'hidden',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})

