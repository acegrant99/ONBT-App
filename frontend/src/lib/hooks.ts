/**
 * Custom React hooks using premium dependencies
 */

import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useLocalStorage, useInterval, useWindowSize, useMedia } from 'react-use'
import { copyToClipboard } from './utils'
import { toastCopy } from './toast'

/**
 * Hook for copying text to clipboard with toast notification
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string, label?: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      toastCopy(label)
      setTimeout(() => setCopied(false), 2000)
    }
    return success
  }, [])

  return { copied, copy }
}

/**
 * Hook for managing user preferences in localStorage
 */
export function useUserPreferences() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('onbt-theme', 'dark')
  const [slippage, setSlippage] = useLocalStorage<string>('onbt-slippage', '0.5')
  const [gasSpeed, setGasSpeed] = useLocalStorage<'slow' | 'standard' | 'fast'>('onbt-gas-speed', 'standard')
  const [showTestnets, setShowTestnets] = useLocalStorage<boolean>('onbt-show-testnets', false)

  return {
    theme,
    setTheme,
    slippage,
    setSlippage,
    gasSpeed,
    setGasSpeed,
    showTestnets,
    setShowTestnets,
  }
}

/**
 * Hook for tracking wallet connection status
 */
export function useWalletStatus() {
  const { address, isConnected, isConnecting, isDisconnected, chain } = useAccount()
  const [previousAddress, setPreviousAddress] = useLocalStorage<string>('onbt-last-address', '')

  useEffect(() => {
    if (address && address !== previousAddress) {
      setPreviousAddress(address)
    }
  }, [address, previousAddress, setPreviousAddress])

  const isNewUser = !previousAddress
  const isReturningUser = !!previousAddress && previousAddress !== address

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chain,
    isNewUser,
    isReturningUser,
    previousAddress,
  }
}

/**
 * Hook for debounced input value
 */
export function useDebouncedInput(initialValue: string = '', delay: number = 500) {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return {
    value,
    setValue,
    debouncedValue,
  }
}

/**
 * Hook for auto-refresh data at interval
 */
export function useAutoRefresh(callback: () => void, interval: number = 10000, enabled: boolean = true) {
  useInterval(
    () => {
      if (enabled) {
        callback()
      }
    },
    enabled ? interval : null
  )
}

/**
 * Hook for responsive design breakpoints
 */
export function useBreakpoint() {
  const isMobile = useMedia('(max-width: 768px)', false)
  const isTablet = useMedia('(max-width: 1024px)', false)
  const isDesktop = useMedia('(min-width: 1024px)', false)
  const { width } = useWindowSize()

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
  }
}

/**
 * Hook for managing modal state
 */
export function useModal(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}

/**
 * Hook for transaction state management
 */
export function useTransaction() {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hash, setHash] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const reset = useCallback(() => {
    setIsPending(false)
    setIsSuccess(false)
    setIsError(false)
    setHash(null)
    setError(null)
  }, [])

  const startTransaction = useCallback(() => {
    setIsPending(true)
    setIsSuccess(false)
    setIsError(false)
    setError(null)
  }, [])

  const completeTransaction = useCallback((txHash: string) => {
    setIsPending(false)
    setIsSuccess(true)
    setHash(txHash)
  }, [])

  const failTransaction = useCallback((err: Error) => {
    setIsPending(false)
    setIsError(true)
    setError(err)
  }, [])

  return {
    isPending,
    isSuccess,
    isError,
    hash,
    error,
    reset,
    startTransaction,
    completeTransaction,
    failTransaction,
  }
}

/**
 * Hook for countdown timer
 */
export function useCountdown(endTime: number) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000)
      const remaining = Math.max(0, endTime - now)
      setTimeRemaining(remaining)
      setIsComplete(remaining === 0)
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const days = Math.floor(timeRemaining / 86400)
  const hours = Math.floor((timeRemaining % 86400) / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  return {
    timeRemaining,
    isComplete,
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  }
}

/**
 * Hook for scroll position
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollY(position)
      setIsScrolled(position > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    scrollY,
    isScrolled,
  }
}

/**
 * Hook for tracking element visibility (intersection observer)
 */
export function useInView(options?: IntersectionObserverInit) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return {
    ref: setRef,
    isInView,
  }
}
