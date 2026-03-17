import { motion } from 'framer-motion'
import { TrendingUp, ChevronRight } from 'lucide-react'
import Card from '../Card'
import { useLiquidityPositions } from '../../hooks/liquidity'
import { itemVariant } from '../../lib/animations'
import { formatEther } from 'viem'

export default function LiquidityPositions() {
  const { positions, isLoading } = useLiquidityPositions()

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Your Liquidity Positions">
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-700/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </Card>
      </motion.div>
    )
  }

  if (positions.length === 0) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Your Liquidity Positions">
          <div className="flex flex-col items-center justify-center py-12">
            <TrendingUp className="w-12 h-12 text-slate-500 mb-3" />
            <p className="text-slate-400 mb-1">No liquidity positions yet</p>
            <p className="text-sm text-slate-500">Add liquidity to get started</p>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariant}>
      <Card title={`Your Positions (${positions.length})`}>
        <div className="space-y-3">
          {positions.map((position, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">
                    {position.token0Symbol}/{position.token1Symbol}
                  </p>
                  <p className="text-sm text-slate-400">
                    {formatEther(position.shares)} / {formatEther(position.totalShare)} LP
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 pt-3 border-t border-slate-700">
                <div>
                  <p className="text-xs text-slate-400">Token A</p>
                  <p className="text-sm font-semibold text-white">{formatEther(position.amount0)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Token B</p>
                  <p className="text-sm font-semibold text-white">{formatEther(position.amount1)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">LP Rewards</p>
                  <p className="text-sm font-semibold text-green-400">{formatEther(position.lpRewardsEarned)}</p>
                </div>
              </div>

              {/*  Unrealized Gains */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-400">Unrealized gains:</p>
                <p className="text-sm font-semibold text-white">{formatEther(position.unrealizedGains)} ONBT</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
