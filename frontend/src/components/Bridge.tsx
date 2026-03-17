import React, { useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { motion } from 'framer-motion'
import { useONBTBalance } from '@/hooks/useContract'
import { CardSkeleton } from './LoadingSkeletons'

interface NetworkOption {
  chainId: number
  name: string
  logo: string
  fee: string
  time: string
}

const NETWORKS: NetworkOption[] = [
  {
    chainId: 8453,
    name: 'Base',
    logo: '🔘',
    fee: '0.5 ONBT',
    time: '~2-3 minutes',
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    logo: '⬅️',
    fee: '0.5 ONBT',
    time: '~5-10 minutes',
  },
]

export const Bridge: React.FC = () => {
  const { isConnected, chainId: currentChain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { formatted: balance, isLoading: balanceLoading } = useONBTBalance()

  const [fromChain, setFromChain] = useState<number>(8453)
  const [toChain, setToChain] = useState<number>(42161)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg text-slate-300">Connect wallet to use bridge</p>
        </div>
      </div>
    )
  }

  const selectedFromNetwork = NETWORKS.find((n) => n.chainId === fromChain)!
  const selectedToNetwork = NETWORKS.find((n) => n.chainId === toChain)!

  const handleSwapChains = () => {
    setFromChain(toChain)
    setToChain(fromChain)
  }

  const handleBridge = async () => {
    if (!amount || parseFloat(amount) <= 0) return

    setLoading(true)
    try {
      // Switch to the source chain if needed
      if (currentChain !== fromChain) {
        await switchChain({ chainId: fromChain })
      }

      // Simulate bridge transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, call LayerZero bridge contract
      if (import.meta.env.VITE_ENABLE_DEBUG) {
        console.log(`Bridging ${amount} ONBT from ${selectedFromNetwork.name} to ${selectedToNetwork.name}`)
      }

      setAmount('')
    } finally {
      setLoading(false)
    }
  }

  const currentBalance = currentChain === fromChain ? parseFloat(balance) : 0

  if (balanceLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="border-b border-slate-700 pb-6">
          <h1 className="text-3xl font-bold text-white">Cross-Chain Bridge</h1>
          <p className="mt-2 text-slate-400">Transfer your ONBT tokens between Base and Arbitrum networks</p>
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-700 pb-6">
        <h1 className="text-3xl font-bold text-white">Cross-Chain Bridge</h1>
        <p className="mt-2 text-slate-400">Transfer your ONBT tokens between Base and Arbitrum networks</p>
      </div>

      {/* Bridge Card */}
      <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8">
        {/* From Network */}
        <div className="space-y-4">
          <label htmlFor="from-chain" className="block text-sm font-medium text-slate-300">From</label>
          <div className="rounded-lg border border-slate-600 bg-slate-900/50 p-4">
            <select
              id="from-chain"
              value={fromChain}
              onChange={(e) => setFromChain(Number(e.target.value))}
              className="w-full bg-transparent text-lg font-medium text-white focus:outline-none"
            >
              {NETWORKS.map((network) => (
                <option key={network.chainId} value={network.chainId}>
                  {network.logo} {network.name}
                </option>
              ))}
            </select>
          </div>

          {/* Balance & Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Amount</label>
              {currentChain === fromChain && (
                <button
                  onClick={() => setAmount(balance)}
                  className="text-xs font-medium text-purple-400 hover:text-purple-300"
                >
                  Max: {parseFloat(balance).toFixed(2)} ONBT
                </button>
              )}
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="my-6 flex justify-center">
          <button
            onClick={handleSwapChains}
            title="Swap source and destination chains"
            className="group rounded-full border border-slate-600 bg-slate-800/50 p-3 transition hover:border-purple-500 hover:bg-slate-800/75"
          >
            <svg
              className="h-5 w-5 text-slate-400 transition group-hover:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* To Network */}
        <div className="space-y-4">
          <label htmlFor="to-chain" className="block text-sm font-medium text-slate-300">To</label>
          <div className="rounded-lg border border-slate-600 bg-slate-900/50 p-4">
            <select
              id="to-chain"
              value={toChain}
              onChange={(e) => setToChain(Number(e.target.value))}
              className="w-full bg-transparent text-lg font-medium text-white focus:outline-none"
            >
              {NETWORKS.filter((n) => n.chainId !== fromChain).map((network) => (
                <option key={network.chainId} value={network.chainId}>
                  {network.logo} {network.name}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Receive */}
          <div className="rounded-lg bg-slate-900/50 p-4">
            <p className="text-xs text-slate-400">You will receive</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {amount ? parseFloat(amount).toFixed(2) : '0.00'} ONBT
            </p>
            <p className="mt-1 text-xs text-slate-400">After bridge fees</p>
          </div>
        </div>

        {/* Bridge Button */}
        <button
          onClick={handleBridge}
          disabled={
            loading ||
            !amount ||
            parseFloat(amount) <= 0 ||
            parseFloat(amount) > currentBalance ||
            currentChain !== fromChain
          }
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-3 font-medium text-white transition disabled:opacity-50 hover:enabled:from-blue-700 hover:enabled:to-cyan-700"
        >
          {currentChain !== fromChain
            ? `Switch to ${selectedFromNetwork.name} to bridge`
            : loading
              ? 'Bridging...'
              : 'Bridge ONBT'}
        </button>
      </div>

      {/* Bridge Details */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* From Details */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm font-medium text-slate-400">From Network Details</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Network:</span>
              <span className="text-sm text-white">{selectedFromNetwork.logo} {selectedFromNetwork.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Fee:</span>
              <span className="text-sm text-white">{selectedFromNetwork.fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Balance:</span>
              <span className="text-sm font-medium text-purple-400">
                {currentChain === fromChain ? parseFloat(balance).toFixed(2) : 'Switch chain'} ONBT
              </span>
            </div>
          </div>
        </div>

        {/* To Details */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm font-medium text-slate-400">To Network Details</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Network:</span>
              <span className="text-sm text-white">{selectedToNetwork.logo} {selectedToNetwork.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Estimated Time:</span>
              <span className="text-sm text-white">{selectedToNetwork.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Receive:</span>
              <span className="text-sm font-medium text-green-400">
                {amount ? parseFloat(amount).toFixed(2) : '0.00'} ONBT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bridge Information */}
      <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-800/50 p-6">
        <h3 className="font-semibold text-white">How It Works</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
              1
            </div>
            <div>
              <p className="font-medium text-white">Lock Tokens</p>
              <p className="text-xs text-slate-400">Your tokens are locked in the bridge contract</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
              2
            </div>
            <div>
              <p className="font-medium text-white">LayerZero Message</p>
              <p className="text-xs text-slate-400">Cross-chain message is sent via LayerZero V2</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
              3
            </div>
            <div>
              <p className="font-medium text-white">Mint on Target</p>
              <p className="text-xs text-slate-400">Tokens are minted on the destination network</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-lg border border-green-700/30 bg-green-900/10 p-4">
        <p className="text-sm text-green-200">
          ✅ <strong>Secure:</strong> Bridge powered by LayerZero V2, the most secure cross-chain messaging protocol. Your tokens are always under your control.
        </p>
      </div>
    </div>
  )
}

export default Bridge
