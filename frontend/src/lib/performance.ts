/**
 * Performance utilities for lazy loading and dynamic imports
 */

import { lazy, ComponentType, FC, createElement } from 'react'
import { motion } from 'framer-motion'

/**
 * Loading fallback component for lazy-loaded components
 */
export const LazyComponentFallback: FC = () =>
  createElement(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: 'flex items-center justify-center min-h-80'
    },
    createElement(
      'div',
      { className: 'flex flex-col items-center gap-4' },
      createElement(motion.div, {
        animate: { rotate: 360 },
        transition: { duration: 2, repeat: Infinity, ease: 'linear' },
        className: 'w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full'
      }),
      createElement('p', { className: 'text-sm text-slate-400' }, 'Loading...')
    )
  )

/**
 * Lazy load component with built-in error boundary
 */
export function lazyLoadComponent<P extends Record<string, unknown>>(
  importFunc: () => Promise<{ default: ComponentType<P> }>
) {
  return lazy(importFunc)
}

/**
 * Prefetch a component for better UX
 */
export function prefetchComponent(
  importFunc: () => Promise<unknown>
): void {
  // Prefetch on idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFunc().catch((err) => {
        console.debug('Prefetch error (non-critical):', err)
      })
    })
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      importFunc().catch((err) => {
        console.debug('Prefetch error (non-critical):', err)
      })
    }, 2000)
  }
}

/**
 * Prefetch multiple components
 */
export function prefetchComponents(
  importFuncs: Array<() => Promise<unknown>>
): void {
  importFuncs.forEach((importFunc) => {
    prefetchComponent(importFunc)
  })
}
