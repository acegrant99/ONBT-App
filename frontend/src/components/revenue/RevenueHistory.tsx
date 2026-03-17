import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'
import { useRevenueHistory } from '../../hooks/revenue'
import { itemVariant } from '../../lib/animations'
import { TrendingUp } from 'lucide-react'

export default function RevenueHistory() {
  const { chartData, totalEarned, claimCount, isLoading } = useRevenueHistory(90)

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Revenue History">
          <div className="h-64 bg-slate-700/50 rounded-lg animate-pulse" />
        </Card>
      </motion.div>
    )
  }

  const hasData = chartData.length > 0

  return (
    <motion.div variants={itemVariant}>
      <Card title="90-Day Revenue History" icon={<TrendingUp className="w-6 h-6 text-green-400" />}>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-700/30 rounded">
              <p className="text-xs text-slate-400">Total Claimed</p>
              <p className="text-lg font-bold text-white">${(Number(totalEarned) / 1e18).toFixed(2)}</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded">
              <p className="text-xs text-slate-400">Claim Count</p>
              <p className="text-lg font-bold text-white">{claimCount}</p>
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
                    formatter={(value) => `$${(Number(value) || 0).toFixed(2)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8b5cf6"
                    dot={{ fill: '#8b5cf6', r: 4 }}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              <p>No revenue history yet</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
