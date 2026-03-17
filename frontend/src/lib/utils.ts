/**
 * Utility functions for the ONBT frontend
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, formatDistance } from 'date-fns'

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format address to short version (0x1234...5678)
 */
export function formatAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address) return ''
  if (address.length <= startLength + endLength) return address
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number | string, decimals = 2): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (n === 0) return '0'
  if (n < 0.01) return '<0.01'
  if (n < 1000) return n.toFixed(decimals)
  if (n < 1000000) return `${(n / 1000).toFixed(decimals)}K`
  if (n < 1000000000) return `${(n / 1000000).toFixed(decimals)}M`
  return `${(n / 1000000000).toFixed(decimals)}B`
}

/**
 * Format token amount (handles wei conversion)
 */
export function formatTokenAmount(amount: bigint | string, decimals = 18, displayDecimals = 4): string {
  const amountStr = typeof amount === 'bigint' ? amount.toString() : amount
  const divisor = BigInt(10 ** decimals)
  const whole = BigInt(amountStr) / divisor
  const remainder = BigInt(amountStr) % divisor
  
  const wholeStr = whole.toString()
  const remainderStr = remainder.toString().padStart(decimals, '0').slice(0, displayDecimals)
  
  if (remainder === BigInt(0)) return wholeStr
  return `${wholeStr}.${remainderStr}`.replace(/\.?0+$/, '')
}

/**
 * Format USD currency
 */
export function formatUSD(amount: number | string, decimals = 2): string {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

/**
 * Format percentage
 */
export function formatPercent(value: number | string, decimals = 2): string {
  const n = typeof value === 'string' ? parseFloat(value) : value
  return `${n.toFixed(decimals)}%`
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | number | string): string {
  const d = typeof date === 'number' ? new Date(date * 1000) : new Date(date)
  return formatDistanceToNow(d, { addSuffix: true })
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | number | string, formatStr = 'PPP'): string {
  const d = typeof date === 'number' ? new Date(date * 1000) : new Date(date)
  return format(d, formatStr)
}

/**
 * Format duration between two dates
 */
export function formatDuration(startDate: Date | number, endDate: Date | number): string {
  const start = typeof startDate === 'number' ? new Date(startDate * 1000) : startDate
  const end = typeof endDate === 'number' ? new Date(endDate * 1000) : endDate
  return formatDistance(start, end)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text:', err)
    return false
  }
}

/**
 * Truncate text to max length
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if address is valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Generate random ID
 */
export function randomId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

/**
 * Get chain name from chain ID
 */
export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    8453: 'Base',
    42161: 'Arbitrum',
    10: 'Optimism',
    137: 'Polygon',
    84532: 'Base Sepolia',
  }
  return chains[chainId] || `Chain ${chainId}`
}

/**
 * Get block explorer URL
 */
export function getExplorerUrl(chainId: number, type: 'tx' | 'address' | 'token', hash: string): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    8453: 'https://basescan.org',
    42161: 'https://arbiscan.io',
    10: 'https://optimistic.etherscan.io',
    137: 'https://polygonscan.com',
    84532: 'https://sepolia.basescan.org',
  }
  
  const baseUrl = explorers[chainId] || `https://etherscan.io`
  return `${baseUrl}/${type}/${hash}`
}
/**
 * Get API base URL with environment variable fallback and validation
 * Returns null if no API URL is configured (API is optional)
 */
export function getApiBaseUrl(): string | null {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  
  // Log warning if using localhost in non-dev environment
  if (apiUrl && !import.meta.env.DEV && apiUrl.includes('localhost')) {
    console.warn(
      'API URL is set to localhost. Set VITE_API_BASE_URL environment variable for production.'
    )
  }
  
  if (apiUrl && import.meta.env.VITE_ENABLE_DEBUG) {
    console.debug(`Using API Base URL: ${apiUrl}`)
  }
  
  return apiUrl || null
}

/**
 * Enhanced fetch with API error handling and logging
 * Returns null if API is not configured (API is optional)
 */
export async function fetchFromApi(
  endpoint: string,
  options?: RequestInit
): Promise<Response | null> {
  const apiUrl = getApiBaseUrl()
  
  // API is optional - return null if not configured
  if (!apiUrl) {
    if (import.meta.env.VITE_ENABLE_DEBUG) {
      console.debug(`Skipping API call to ${endpoint} - API URL not configured`)
    }
    return null
  }
  
  const fullUrl = `${apiUrl}${endpoint}`
  
  try {
    const response = await fetch(fullUrl, options)
    
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${fullUrl}`
      )
    }
    
    return response
  } catch (error) {
    if (import.meta.env.VITE_ENABLE_DEBUG) {
      console.error(`Failed to fetch from ${fullUrl}:`, error)
    }
    throw error
  }
}