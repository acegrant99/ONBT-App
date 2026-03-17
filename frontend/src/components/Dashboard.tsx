import React from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { useONBTBalance, useStakingInfo, useCrossChainStakes, useAchievementNFTs } from '@/hooks/useContract'
import { useProtocolStats } from '@/hooks/useProtocolStats'
import { TOKEN_INFO } from '@/config/projectInfo'
import AddTokenButton from './AddTokenButton'
import NetworkStatus from './NetworkStatus'
import StakingChart from './StakingChart'
import { DashboardSkeleton } from './LoadingSkeletons'

interface StatCardProps {
  label: string
  value: string
  subtext?: string
  action?: React.ReactNode
  index?: number
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, action, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:from-purple-500/5 group-hover:to-blue-500/5 group-hover:opacity-100" />
    <div className="relative">
      <p className="text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  </motion.div>
)

export const Dashboard: React.FC = () => {
  const { address, isConnected, chainId } = useAccount()
  const { formatted: balance, isLoading: balanceLoading } = useONBTBalance()
  const { stakedAmount, pendingRewards, lockupEnd, isLocked, isLoading: stakingLoading } = useStakingInfo()
  const { baseStake, arbitrumStake, totalCrossChain, isLoading: crossChainLoading } = useCrossChainStakes()
  const { count: achievementCount, isLoading: achievementLoading } = useAchievementNFTs()
  const { display: protocolStats, isLoading: statsLoading } = useProtocolStats()

  // Show skeleton while loading critical data
  const isLoading = balanceLoading || stakingLoading || crossChainLoading || statsLoading || achievementLoading
  
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg text-slate-300">Connect wallet to view dashboard</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Format large numbers
  const formatNumber = (num: string): string => {
    const parsed = parseFloat(num)
    if (parsed === 0) return '0'
    if (parsed < 0.01) return '<0.01'
    return parsed.toFixed(2)
  }

  const formatDate = (timestamp: string | undefined): string => {
    if (!timestamp || timestamp === '0') return 'Never'
    const date = new Date(parseInt(timestamp) * 1000)
    return date.toLocaleDateString()
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-700/50 pb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold text-transparent">
                Dashboard
              </h1>
              <NetworkStatus chainId={chainId} isConnected={isConnected} />
            </div>
            <p className="mt-2 text-slate-400">
              Wallet: <span className="font-mono text-xs">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AddTokenButton />
          </motion.div>
        </div>
      </motion.div>

      {/* Protocol Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h3 className="font-semibold text-white">ONBT Protocol</h3>
              <p className="text-xs text-slate-400">{TOKEN_INFO.name} • {TOKEN_INFO.type}</p>
            </div>
          </div>
          <div className="hidden gap-8 md:flex">
            <div className="text-right">
              <p className="text-xs text-slate-400">Total Supply</p>
              <p className={`font-semibold text-white ${statsLoading ? 'animate-pulse' : ''}`}>
                {protocolStats.totalSupply || 'Loading...'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Total Staked
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" title="Live data"></span>
              </p>
              <p className={`font-semibold text-green-400 ${statsLoading ? 'animate-pulse' : ''}`}>
                {protocolStats.globalTotalStaked || 'Loading...'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Daily Rewards
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" title="Live data"></span>
              </p>
              <p className={`font-semibold text-purple-400 ${statsLoading ? 'animate-pulse' : ''}`}>
                {protocolStats.dailyRewards || 'Loading...'} ONBT
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                APY Range
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" title="Live data"></span>
              </p>
              <p className={`font-semibold text-blue-400 ${statsLoading ? 'animate-pulse' : ''}`}>
                {protocolStats.baseAPY || '0'}% - {protocolStats.maxAPY || '0'}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Overview */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-white">Portfolio</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            index={0}
            label="ONBT Balance"
            value={`${formatNumber(balance)} ONBT`}
            subtext="Available for staking or transfer"
          />
          <StatCard
            index={1}
            label="Staked Amount"
            value={`${formatNumber(stakedAmount)} ONBT`}
            subtext="Earning rewards"
          />
          <StatCard
            index={2}
            label="Pending Rewards"
            value={`${formatNumber(pendingRewards)} ONBT`}
            subtext="Claimable now"
            action={
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30"
              >
                Claim Rewards
              </motion.button>
            }
          />
        </div>
      </div>

      {/* Staking Chart */}
      <StakingChart type="area" />

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="mb-6 text-xl font-semibold text-white">Achievements</h2>
        <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:from-green-500/5 group-hover:to-emerald-500/5 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">NFT Achievements</p>
              <p className="mt-2 text-3xl font-bold text-white">{achievementCount} Earned</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-xl hover:shadow-green-500/30"
            >
              View Gallery
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: 'Stakes & Yields', desc: 'Manage your staking position', icon: '💰', delay: 0 },
            { title: 'Cross-Chain Bridge', desc: 'Transfer between Base & Arbitrum', icon: '🌉', delay: 0.1 },
            { title: 'Governance', desc: 'Vote on protocol proposals', icon: '🗳️', delay: 0.2 },
            { title: 'Settings', desc: 'Manage preferences & alerts', icon: '⚙️', delay: 0.3 },
          ].map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + action.delay }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 text-left transition-all hover:border-slate-600 hover:bg-slate-800/75 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <p className="font-medium text-white transition-colors group-hover:text-purple-300">{action.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{action.desc}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <h2 className="mb-6 text-xl font-semibold text-white">Activity</h2>
        <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-400">Lockup Status</p>
              <p className="mt-2 text-lg font-semibold text-white">{isLocked ? '🔒 Locked' : '🔓 Unlocked'}</p>
              {isLocked && <p className="text-xs text-slate-400">Until {formatDate(lockupEnd)}</p>}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Cross-Chain Stakes</p>
              <p className="mt-2 text-lg font-semibold text-white">{formatNumber(totalCrossChain)} ONBT</p>
              <p className="text-xs text-slate-400">Base: {formatNumber(baseStake)} | Arbitrum: {formatNumber(arbitrumStake)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-5 backdrop-blur-sm"
      >
        <p className="text-sm leading-relaxed text-blue-200">
          💡 <strong className="font-semibold">Tip:</strong> Stake your ONBT tokens to earn rewards. Check back regularly to claim your earnings and unlock new achievements.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
