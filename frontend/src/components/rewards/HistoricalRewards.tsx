import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'
import { useHistoricalRewards } from '../../hooks/rewards'
import { itemVariant } from '../../lib/animations'
import { formatEther } from 'viem'
import { TrendingUp } from 'lucide-react'

export default function HistoricalRewards() {
  const { chartData, totalEarned, averagePerDay, isLoading } = useHistoricalRewards(30)

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Reward History">
          <div className="h-64 bg-slate-700/50 rounded-lg animate-pulse" />
        </Card>
      </motion.div>
    )
  }

  const hasData = chartData.length > 0

  return (
    <motion.div variants={itemVariant}>
      <Card title="30-Day Reward History" icon={<TrendingUp className="w-6 h-6 text-green-400" />}>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-700/30 rounded">
              <p className="text-xs text-slate-400">Total Earned</p>
              <p className="text-lg font-bold text-white">{formatEther(totalEarned)} ONBT</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded">
              <p className="text-xs text-slate-400">Daily Average</p>
              <p className="text-lg font-bold text-white">{formatEther(averagePerDay)} ONBT</p>
            </div>
          </div>

          {/* Chart */}
          {hasData ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${(Number(value) || 0).toFixed(4)} ONBT`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              <p>No reward history yet</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
