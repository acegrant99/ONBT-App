import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Gift, Clock } from 'lucide-react'
import Button from '../Button'
import Card from '../Card'
import { useRewardBreakdown, useAPYProjection, useClaimRewards } from '../../hooks/rewards'
import { fadeInUp, containerVariant, itemVariant } from '../../lib/animations'
import RewardsBreakdown from './RewardsBreakdown'
import APYCalculator from './APYCalculator'
import HistoricalRewards from './HistoricalRewards'
import RewardsClaimPanel from './RewardsClaimPanel'

export default function RewardsDashboard() {
  const { isConnected } = useAccount()
  const { claimableFormatted } = useRewardBreakdown()
  const { totalAPY } = useAPYProjection()
  const { claim, isLoading: claimLoading } = useClaimRewards()

  if (!isConnected) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <Gift className="w-16 h-16 text-green-400 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Rewards</h1>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Connect your wallet to view your staking rewards and claim earnings
        </p>
        <Button variant="primary">Connect Wallet</Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant} className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariant}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Gift className="w-10 h-10 text-green-400" />
              Rewards & Yield
            </h1>
            <p className="text-slate-400 mt-2">Earn passive income from staking</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Claimable Rewards" icon={<Zap className="w-6 h-6 text-yellow-400" />}>
          <p className="text-3xl font-bold text-white">{claimableFormatted}</p>
          <p className="text-sm text-slate-400 mt-2">ONBT ready to claim</p>
          <Button variant="primary" size="sm" onClick={() => claim()} isLoading={claimLoading} className="mt-3 w-full">
            Claim Now
          </Button>
        </Card>

        <Card title="Total APY" icon={<TrendingUp className="w-6 h-6 text-blue-400" />}>
          <p className="text-3xl font-bold text-white">{totalAPY.toFixed(1)}%</p>
          <p className="text-sm text-slate-400 mt-2">Annual percentage yield</p>
          <p className="text-xs text-green-400 mt-1 font-semibold">All rewards included</p>
        </Card>

        <Card title="Earning Rate" icon={<Clock className="w-6 h-6 text-purple-400" />}>
          <p className="text-2xl font-bold text-white">{((parseFloat(claimableFormatted) / 30) * totalAPY / 365).toFixed(4)}</p>
          <p className="text-sm text-slate-400 mt-2">ONBT per day</p>
          <p className="text-xs text-slate-500 mt-1">Based on current APY & staked amount</p>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <RewardsBreakdown />
          <APYCalculator />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RewardsClaimPanel />
          <HistoricalRewards />
        </div>
      </motion.div>
    </motion.div>
  )
}
