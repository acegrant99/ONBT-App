import { FC } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { base, arbitrum } from 'wagmi/chains'
import { motion } from 'framer-motion'

const SUPPORTED_CHAINS = [
  {
    chain: base,
    icon: '🔵',
    color: 'from-blue-500 to-blue-600',
  },
  {
    chain: arbitrum,
    icon: '🔷',
    color: 'from-indigo-500 to-indigo-600',
  },
]

export const ChainSwitcher: FC = () => {
  const { chainId, isConnected } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  if (!isConnected) return null

  const currentChainConfig = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId)
  const isUnsupportedChain = !currentChainConfig

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2">
        {isUnsupportedChain ? (
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div className="text-left">
              <p className="text-xs font-medium text-yellow-400">Unsupported Chain</p>
              <p className="text-xs text-slate-400">Switch to Base or Arbitrum</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentChainConfig.icon}</span>
            <div className="text-left">
              <p className="text-xs text-slate-400">Network</p>
              <p className="text-sm font-medium text-white">{currentChainConfig.chain.name}</p>
            </div>
          </div>
        )}

        <div className="ml-2 flex gap-1">
          {SUPPORTED_CHAINS.map(({ chain, icon, color }) => {
            const isActive = chainId === chain.id
            const isDisabled = isPending || isActive

            return (
              <motion.button
                key={chain.id}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && switchChain({ chainId: chain.id })}
                disabled={isDisabled}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? `bg-gradient-to-r ${color} text-white`
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                title={`Switch to ${chain.name}`}
              >
                {icon} {chain.name}
              </motion.button>
            )
          })}
        </div>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            Switching...
          </div>
        </div>
      )}
    </div>
  )
}
