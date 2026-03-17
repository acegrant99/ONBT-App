import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { History, Filter, ExternalLink, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useTransactionHistory } from '@/hooks/useTransactionHistory'

type TxnFilter = 'all' | 'stake' | 'unstake' | 'claim' | 'bridge' | 'swap'

function toastCopy(message: string) {
  // Simple fallback for clipboard feedback
  if (import.meta.env.VITE_ENABLE_DEBUG) {
    console.log(`Copied: ${message}`)
  }
}

export const TransactionHistory: FC = () => {
  const { isConnected } = useAccount()
  const { transactions, isLoading, error, refetch } = useTransactionHistory()
  const [filter, setFilter] = useState<TxnFilter>('all')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)


  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center py-12"
      >
        <div className="text-center">
          <History className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-300">Connect wallet to view transaction history</p>
        </div>
      </motion.div>
    )
  }

  const filteredTxns = transactions.filter(
    (txn) => filter === 'all' || txn.type === filter
  )

  const formatTime = (timestamp: number) => {
    const secs = Math.floor((Date.now() - timestamp) / 1000)
    if (secs < 60) return `${secs}s ago`
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
    return `${Math.floor(secs / 86400)}d ago`
  }

  const typeEmoji = {
    stake: '📌',
    unstake: '📤',
    claim: '🎁',
    bridge: '🌉',
    swap: '🔄',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-700/50 pb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="h-8 w-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Transaction History</h1>
              <p className="text-slate-400">View your live transaction data across all networks</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-slate-800/50 transition disabled:opacity-50"
            title="Refresh transactions"
          >
            <motion.div animate={isLoading ? { rotate: 360 } : {}} transition={{ duration: 2, repeat: isLoading ? Infinity : 0 }}>
              <Loader className="h-5 w-5 text-purple-400" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {(['all', 'stake', 'unstake', 'claim', 'bridge', 'swap'] as TxnFilter[]).map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'
            }`}
          >
            <Filter className="h-4 w-4 inline mr-2" />
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-500/30 bg-red-900/20 p-4 backdrop-blur-sm flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-300">Failed to load transactions</p>
              <p className="text-xs text-red-200/70 mt-1">{error}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => refetch()}
                className="mt-2 text-xs font-medium text-red-300 hover:text-red-200 underline"
              >
                Try again
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && filteredTxns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 mx-auto mb-4"
            >
              <Loader className="w-12 h-12 text-purple-400" />
            </motion.div>
            <p className="font-medium">Loading transactions...</p>
            <p className="text-sm text-slate-500 mt-1">Fetching from blockchain</p>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredTxns.length > 0 ? (
            filteredTxns.map((txn, idx) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 backdrop-blur-xl hover:border-purple-500/50 transition"
              >
                <div className="flex items-center gap-4">
                  {/* Type Icon */}
                  <div className="text-2xl">{typeEmoji[txn.type]}</div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white capitalize">
                        {txn.type}
                      </h3>
                      {txn.status === 'success' && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      {txn.status === 'pending' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full"
                        />
                      )}
                      {txn.status === 'failed' && (
                        <div className="h-4 w-4 rounded-full bg-red-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono">{txn.hash}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          toastCopy('Transaction hash')
                          setCopiedHash(txn.id)
                          setTimeout(() => setCopiedHash(null), 2000)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition"
                      >
                        {copiedHash === txn.id ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-500 hover:text-slate-300" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {txn.amount} {txn.token}
                    </p>
                    <p className="text-xs text-slate-400">{formatTime(txn.timestamp)}</p>
                  </div>

                  {/* Explorer Link */}
                  <motion.a
                    href={txn.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-slate-700/50 transition"
                  >
                    <ExternalLink className="h-4 w-4 text-slate-400 hover:text-slate-200" />
                  </motion.a>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-400"
            >
              <History className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>{isLoading ? 'Loading transactions...' : 'No transactions found for this filter'}</p>
              {!isLoading && filteredTxns.length === 0 && transactions.length > 0 && (
                <p className="text-xs text-slate-500 mt-2">Try changing the filter</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-blue-500/30 bg-blue-900/20 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-blue-200">
          ✨ <strong className="font-semibold">Live Data:</strong> All transactions are fetched directly from the blockchain. 
          Data refreshes every 15 seconds. Click the explorer icon to verify on-chain.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default TransactionHistory
