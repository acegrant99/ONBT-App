import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { fetchFromApi } from '@/lib/utils'

export interface Transaction {
  id: string
  hash: string
  type: 'stake' | 'unstake' | 'claim' | 'bridge' | 'swap'
  from?: string
  to?: string
  amount: string
  token: string
  status: 'pending' | 'success' | 'failed'
  timestamp: number
  chainId: number
  explorerUrl: string
}

/**
 * Hook to fetch live transaction history for the connected user
 * Fetches from blockchain event logs via JSON-RPC or subgraph
 */
export const useTransactionHistory = () => {
  const { address, isConnected } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected || !address) {
      setTransactions([])
      return
    }

    const fetchTransactions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch from backend API that aggregates blockchain events
        // This endpoint should return all user transactions across chains
        const response = await fetchFromApi(`/api/transactions/${address}`)
        
        // API is optional - if not configured, just skip
        if (!response) {
          setTransactions([])
          return
        }
        
        const data = await response.json()
        setTransactions(data.transactions || [])
      } catch (err) {
        if (import.meta.env.VITE_ENABLE_DEBUG) {
          console.error('Error fetching transactions:', err)
        }
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
        setTransactions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()

    // Auto-refresh every 15 seconds for real-time updates
    const interval = setInterval(fetchTransactions, 15000)
    return () => clearInterval(interval)
  }, [address, isConnected])

  const refetch = async () => {
    if (!isConnected || !address) return

    try {
      setIsLoading(true)
      const response = await fetchFromApi(`/api/transactions/${address}`)
      
      // API is optional - if not configured, just skip
      if (!response) {
        setTransactions([])
        return
      }
      
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_DEBUG) {
        console.error('Error refetching transactions:', err)
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    transactions,
    isLoading,
    error,
    refetch,
  }
}

/**
 * Get explorer URL for a transaction hash based on chain ID
 */
export const getExplorerUrl = (hash: string, chainId: number): string => {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    42161: 'https://arbiscan.io',
    8453: 'https://basescan.org',
  }

  const base = explorers[chainId] || 'https://etherscan.io'
  return `${base}/tx/${hash}`
}
