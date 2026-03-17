import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'
import { useRewardBreakdown } from '../../hooks/rewards'
import { itemVariant } from '../../lib/animations'
import { formatEther } from 'viem'

export default function RewardsBreakdown() {
  const { sources, isLoading } = useRewardBreakdown()

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Reward Sources">
          <div className="h-64 bg-slate-700/50 rounded-lg animate-pulse" />
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariant}>
      <Card title="Reward Sources Breakdown">
        <div className="space-y-4">
          {sources.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No active reward sources</p>
          ) : (
            <>
              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sources}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percentage }) => `${percentage.toFixed(0)}%`}
                    >
                      {sources.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatEther(BigInt(value as number))}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Source List */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                {sources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <svg className="h-3 w-3" viewBox="0 0 12 12" aria-hidden="true">
                        <circle cx="6" cy="6" r="6" fill={COLORS[idx % COLORS.length]} />
                      </svg>
                      <span className="text-sm text-slate-300">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{formatEther(source.amount)}</p>
                      <p className="text-xs text-slate-500">{source.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
