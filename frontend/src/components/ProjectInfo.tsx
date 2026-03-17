import { FC } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { TOKEN_INFO, PROTOCOL_STATS, DEPLOYMENT_INFO, FEATURES } from '@/config/projectInfo'
import { useProtocolStats } from '@/hooks/useProtocolStats'

export const ProjectInfo: FC = () => {
  const { chainId } = useAccount()
  const currentNetwork = chainId === 8453 ? 'base' : chainId === 42161 ? 'arbitrum' : 'unknown'
  const { display: protocolStats, isLoading: statsLoading } = useProtocolStats()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Protocol Stats Overview */}
      <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Protocol Statistics</h3>
          {!statsLoading && (
            <span className="flex items-center gap-2 text-xs text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              Live Data
            </span>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Total Value Locked</p>
            <p className={`text-2xl font-bold text-purple-400 ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.globalTotalStaked || 'Loading...'} ONBT
            </p>
            <p className="text-xs text-slate-500">Across both chains</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Daily Rewards</p>
            <p className={`text-2xl font-bold text-green-400 ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.dailyRewards || 'Loading...'} ONBT
            </p>
            <p className="text-xs text-slate-500">Combined distribution</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Current APY</p>
            <p className={`text-2xl font-bold text-blue-400 ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.baseAPY || '0'}% - {protocolStats.maxAPY || '0'}%
            </p>
            <p className="text-xs text-slate-500">With lockup multipliers</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 border-t border-slate-700/50 pt-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Available Rewards Pool</p>
            <p className={`text-lg font-semibold text-yellow-400 ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.availableRewards || 'Loading...'} ONBT
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Reward Runway</p>
            <p className={`text-lg font-semibold text-cyan-400 ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.rewardRunwayDays || 'N/A'} days
            </p>
          </div>
        </div>
      </div>

      {/* Token Information */}
      <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Token Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Token Name</span>
            <span className="font-mono text-sm text-white">{TOKEN_INFO.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Symbol</span>
            <span className="font-mono text-sm text-white">{TOKEN_INFO.symbol}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Total Supply</span>
            <span className={`font-mono text-sm text-white ${statsLoading ? 'animate-pulse' : ''}`}>
              {protocolStats.totalSupply || TOKEN_INFO.totalSupply}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Type</span>
            <span className="text-sm text-white">{TOKEN_INFO.type}</span>
          </div>
          {currentNetwork !== 'unknown' && (
            <div className="mt-4 rounded-lg bg-slate-900/50 p-3">
              <p className="mb-2 text-xs font-medium text-slate-400">
                {currentNetwork === 'base' ? 'Base' : 'Arbitrum'} Contract
              </p>
              <div className="flex items-center gap-2">
                <span className="flex-1 overflow-hidden text-ellipsis font-mono text-xs text-purple-400">
                  {TOKEN_INFO.addresses[currentNetwork]}
                </span>
                <a
                  href={TOKEN_INFO.explorers[currentNetwork]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  View ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deployment Info */}
      <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Deployment Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Status</span>
            <span className="flex items-center gap-2 text-sm font-semibold text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              {DEPLOYMENT_INFO.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Deployment Date</span>
            <span className="text-sm text-white">{DEPLOYMENT_INFO.deploymentDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Total Contracts</span>
            <span className="text-sm text-white">{DEPLOYMENT_INFO.contractCount} contracts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Networks</span>
            <span className="text-sm text-white">Base (Hub) + Arbitrum (Spoke)</span>
          </div>
        </div>
      </div>

      {/* Lockup Multipliers */}
      <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Staking Lockup Tiers</h3>
        <div className="space-y-2">
          {PROTOCOL_STATS.lockup.multiplierTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between rounded-lg bg-slate-900/50 p-3"
            >
              <span className="text-sm text-slate-300">
                {tier.days === 0 ? 'No Lockup' : `${tier.days} days`}
              </span>
              <span className="font-semibold text-purple-400">{tier.multiplier}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Lock your tokens for longer periods to earn higher APY rewards
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Key Features</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="mt-1 text-xs text-slate-400">{feature.description}</p>
                </div>
              </div>
              <ul className="ml-11 space-y-1">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-slate-500">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectInfo
