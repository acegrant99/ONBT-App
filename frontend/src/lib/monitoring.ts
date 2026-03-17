/**
 * Performance monitoring and metrics collection
 */

interface PerformanceMetrics {
  // Navigation timing
  navigationStart: number
  domInteractive: number
  domComplete: number
  loadComplete: number

  // Resource timing
  largestContentfulPaint?: number
  firstInputDelay?: number
  cumulativeLayoutShift?: number

  // Custom metrics
  firstPageLoadTime?: number
  timeToInteractive?: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics | null = null
  private observers: Map<string, PerformanceObserver> = new Map()

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === 'undefined') return

    // Get navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as any
    if (navigation) {
      this.metrics = {
        navigationStart: navigation.navigationStart || 0,
        domInteractive: navigation.domInteractive || 0,
        domComplete: navigation.domComplete || 0,
        loadComplete: navigation.loadEventEnd || 0,
        firstPageLoadTime: (navigation.loadEventEnd || 0) - (navigation.navigationStart || 0),
      }
    }

    // Monitor Core Web Vitals
    this.monitorLCP()
    this.monitorFID()
    this.monitorCLS()
  }

  /**
   * Monitor Largest Contentful Paint (LCP)
   */
  private monitorLCP(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        if (this.metrics) {
          this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime
        }
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.set('lcp', observer)
    } catch (e) {
      console.debug('LCP monitoring not supported')
    }
  }

  /**
   * Monitor First Input Delay (FID)
   */
  private monitorFID(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (this.metrics) {
            this.metrics.firstInputDelay = entry.processingDuration
          }
        })
      })

      observer.observe({ entryTypes: ['first-input'] })
      this.observers.set('fid', observer)
    } catch (e) {
      console.debug('FID monitoring not supported')
    }
  }

  /**
   * Monitor Cumulative Layout Shift (CLS)
   */
  private monitorCLS(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      let cls = 0
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cls += entry.value
            if (this.metrics) {
              this.metrics.cumulativeLayoutShift = cls
            }
          }
        })
      })

      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('cls', observer)
    } catch (e) {
      console.debug('CLS monitoring not supported')
    }
  }

  /**
   * Get collected metrics
   */
  getMetrics(): PerformanceMetrics | null {
    return this.metrics
  }

  /**
   * Report metrics to analytics
   */
  reportMetrics(endpoint?: string): void {
    if (!this.metrics) return

    const data = {
      ...this.metrics,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    if (endpoint) {
      // Report to custom endpoint
      navigator.sendBeacon(endpoint, JSON.stringify(data))
    } else {
      // Console log in development
      if (import.meta.env.DEV) {
        console.table(data)
      }
    }
  }

  /**
   * Clean up observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => {
      observer.disconnect()
    })
    this.observers.clear()
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()

/**
 * Measure component render time
 */
export function measureComponentRender(componentName: string): () => void {
  const startMark = `${componentName}-start`
  const endMark = `${componentName}-end`
  const measureName = `${componentName}-render`

  performance.mark(startMark)

  return () => {
    performance.mark(endMark)
    performance.measure(measureName, startMark, endMark)

    const measure = performance.getEntriesByName(measureName)[0]
    if (import.meta.env.DEV) {
      console.debug(`${componentName} render time: ${measure.duration.toFixed(2)}ms`)
    }
  }
}

/**
 * Memory usage information (if available)
 */
export function getMemoryUsage(): { usedJSHeapSize: number; totalJSHeapSize: number } | null {
  if (!(performance as any).memory) {
    return null
  }

  return {
    usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
    totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
  }
}

/**
 * Network information (if available)
 */
export function getNetworkInfo(): {
  effectiveType: string
  saveData: boolean
  downlink: number
} | null {
  if (!('connection' in navigator)) {
    return null
  }

  const connection = (navigator as any).connection
  return {
    effectiveType: connection.effectiveType,
    saveData: connection.saveData,
    downlink: connection.downlink,
  }
}
