import { motion } from 'framer-motion'
import { BarChart3, TrendingUp } from 'lucide-react'
import Card from '../Card'
import { itemVariant } from '../../lib/animations'

interface PoolStat {
  name: string
  value: string
  change: string
  icon: string
}

export default function PoolStats() {
  const poolStats: PoolStat[] = [
    {
      name: 'Total Volume',
      value: '$(2.5M',
      change: '+12.5%',
      icon: '📊',
    },
    {
      name: 'TVL',
      value: '$5.2M',
      change: '+8.3%',
      icon: '💰',
    },
    {
      name: 'Avg APY',
      value: '15.2%',
      change: '+2.1%',
      icon: '📈',
    },
  ]

  return (
    <motion.div variants={itemVariant}>
      <Card title="Pool Statistics" icon={<BarChart3 className="w-6 h-6 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {poolStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-slate-400">{stat.name}</p>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-green-400 font-semibold mt-1">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Pool Info */}
        <div className="mt-6 space-y-3 pt-6 border-t border-slate-700">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            ONBT-USDC Pool Details
          </h4>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-slate-700/20 rounded">
              <p className="text-slate-400 mb-1">Fee Tier</p>
              <p className="font-semibold text-white">0.30%</p>
            </div>
            <div className="p-3 bg-slate-700/20 rounded">
              <p className="text-slate-400 mb-1">Total Liquidity</p>
              <p className="font-semibold text-white">$5.2M</p>
            </div>
            <div className="p-3 bg-slate-700/20 rounded">
              <p className="text-slate-400 mb-1">24h Volume</p>
              <p className="font-semibold text-white">$2.5M</p>
            </div>
            <div className="p-3 bg-slate-700/20 rounded">
              <p className="text-slate-400 mb-1">Current APY</p>
              <p className="font-semibold text-green-400">15.2%</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
