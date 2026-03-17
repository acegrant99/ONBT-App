import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'
import { useRevenueSources } from '../../hooks/revenue'
import { itemVariant } from '../../lib/animations'
import { Info } from 'lucide-react'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']

export default function RevenueSources() {
  const { sourcesList, isLoading } = useRevenueSources()

  if (isLoading) {
    return (
      <motion.div variants={itemVariant}>
        <Card title="Revenue Sources">
          <div className="h-64 bg-slate-700/50 rounded-lg animate-pulse" />
        </Card>
      </motion.div>
    )
  }

  const data: Array<{ name: string; amount: number; percentage: number }> = sourcesList.length > 0
    ? sourcesList.map((source) => ({
      name: source.name,
      amount: Number(source.amount),
      percentage: source.percentage,
    }))
    : [{ name: 'No data', amount: 0, percentage: 100 }]

  return (
    <motion.div variants={itemVariant}>
      <Card title="Revenue Sources Breakdown" icon={<Info className="w-6 h-6 text-blue-400" />}>
        <div className="space-y-4">
          {sourcesList.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No revenue data available</p>
          ) : (
            <>
              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percentage }) => `${percentage.toFixed(0)}%`}
                    >
                      {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Source List */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                {sourcesList.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      {/* stylelint-disable-next-line */}
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="text-sm text-slate-300">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">${(Number(source.amount) / 1e18).toFixed(2)}</p>
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
