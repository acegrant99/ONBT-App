import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp } from 'lucide-react'
import Button from '../Button'
import Card from '../Card'
import { useClaimableRevenue } from '../../hooks/revenue'
import { fadeInUp, containerVariant, itemVariant } from '../../lib/animations'
import RevenueSources from './RevenueSources'
import RevenueHistory from './RevenueHistory'
import AllocationDisplay from './AllocationDisplay'

export default function RevenueShare() {
  const { isConnected } = useAccount()
  const { claimableFormatted } = useClaimableRevenue()
  const [claimed, setClaimed] = useState(false)

  if (!isConnected) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <DollarSign className="w-16 h-16 text-green-400 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Revenue Share</h1>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Connect your wallet to claim your share of protocol revenue
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
              <DollarSign className="w-10 h-10 text-green-400" />
              Revenue Share
            </h1>
            <p className="text-slate-400 mt-2">Earn passive income from protocol revenue</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Claimable Revenue" icon={<TrendingUp className="w-6 h-6 text-blue-400" />}>
          <p className="text-3xl font-bold text-white">${claimableFormatted}</p>
          <p className="text-sm text-slate-400 mt-2">Ready to claim</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setClaimed(true)}
            className="mt-3 w-full"
            disabled={claimed}
          >
            {claimed ? 'Claimed!' : 'Claim Now'}
          </Button>
        </Card>

        <Card title="Total Protocol Revenue" icon={<DollarSign className="w-6 h-6 text-yellow-400" />}>
          <p className="text-3xl font-bold text-white">$245.8K</p>
          <p className="text-sm text-slate-400 mt-2">30-day total</p>
          <p className="text-xs text-green-400 mt-1 font-semibold">+8.5% from last month</p>
        </Card>

        <Card title="Your Share" icon={<DollarSign className="w-6 h-6 text-purple-400" />}>
          <p className="text-3xl font-bold text-white">0.47%</p>
          <p className="text-sm text-slate-400 mt-2">Of protocol revenue</p>
          <p className="text-xs text-blue-400 mt-1">Based on voting power</p>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Sources */}
        <div className="space-y-6">
          <RevenueSources />
          <AllocationDisplay />
        </div>

        {/* Revenue History */}
        <div className="space-y-6">
          <RevenueHistory />
        </div>
      </motion.div>
    </motion.div>
  )
}
