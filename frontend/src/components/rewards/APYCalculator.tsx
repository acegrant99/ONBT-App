import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle } from 'lucide-react'
import Card from '../Card'
import { useAPYProjection } from '../../hooks/rewards'
import { itemVariant } from '../../lib/animations'
import { formatEther } from 'viem'

export default function APYCalculator() {
  const { baseAPY, incentiveAPY, totalAPY, monthlyEarnings, yearlyEarnings, isLoading } = useAPYProjection()

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="APY Projections">
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-700/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariant}>
      <Card title="APY & Projections" icon={<TrendingUp className="w-6 h-6 text-blue-400" />}>
        <div className="space-y-4">
          {/* APY Breakdown */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Base Staking APY</span>
                <span className="text-lg font-bold text-green-400">{baseAPY.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <svg className="h-full w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="0" y="0" width={Math.min(baseAPY * 2, 100)} height="8" fill="#22c55e" rx="4" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Incentive Rewards APY</span>
                <span className="text-lg font-bold text-blue-400">{incentiveAPY.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <svg className="h-full w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="0" y="0" width={Math.min(incentiveAPY * 2, 100)} height="8" fill="#3b82f6" rx="4" />
                </svg>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-purple-300">Total APY (Combined)</span>
                <span className="text-2xl font-bold text-purple-400">{totalAPY.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Earning Projections */}
          <div className="border-t border-slate-700 pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Projected Earnings
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                <span className="text-sm text-slate-400">Monthly</span>
                <span className="font-semibold text-white">{formatEther(monthlyEarnings)} ONBT</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                <span className="text-sm text-slate-400">Yearly</span>
                <span className="font-semibold text-white">{formatEther(yearlyEarnings)} ONBT</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            💡 Projections based on current staked amount. Actual earnings may vary.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
