/**
 * Image optimization utilities
 */

/**
 * Lazy load images using Intersection Observer
 */
export function lazyLoadImages(): void {
  if (!('IntersectionObserver' in window)) {
    return
  }

  const images = document.querySelectorAll('img[data-src]')

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')

        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          obs.unobserve(img)

          // Add loaded class for CSS transitions
          img.classList.add('loaded')
        }
      }
    })
  })

  images.forEach((img) => observer.observe(img))
}

/**
 * Generate responsive image srcset
 */
export function getResponsiveImageUrl(
  baseUrl: string,
  sizes: number[] = [320, 640, 1024, 1280]
): string {
  return sizes.map((size) => `${baseUrl}?w=${size} ${size}w`).join(', ')
}

/**
 * Preload critical images
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
  })
}

/**
 * Prefetch images for better UX
 */
export function prefetchImages(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * WebP format support detection
 */
export function supportsWebP(): boolean {
  const canvas = document.createElement('canvas')
  return canvas.toDataURL('image/webp').includes('image/webp')
}

/**
 * Get optimized image URL based on browser support
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  webpUrl: string
): string {
  return supportsWebP() ? webpUrl : originalUrl
}
