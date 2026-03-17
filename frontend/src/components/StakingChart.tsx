import { FC } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useStakingHistory } from '@/hooks/useProtocolStats'

interface StakingChartProps {
  type?: 'line' | 'area'
}

export const StakingChart: FC<StakingChartProps> = ({ type = 'area' }) => {
  const { data } = useStakingHistory()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 backdrop-blur-sm">
          <p className="mb-2 text-xs font-semibold text-slate-300">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <svg className="h-2 w-2" viewBox="0 0 8 8" aria-hidden="true">
                <circle cx="4" cy="4" r="4" fill={entry.color} />
              </svg>
              <span className="text-slate-400">{entry.name}:</span>
              <span className="font-semibold text-white">
                {entry.value.toLocaleString()} ONBT
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Staking History</h3>
          <p className="text-xs text-slate-400">Last 30 days</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            Total Staked
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Rewards Dist.
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStaked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRewards" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis
                stroke="#94a3b8"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
                  return value.toString()
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="staked"
                stroke="#a855f7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorStaked)"
                name="Staked"
              />
              <Area
                type="monotone"
                dataKey="rewards"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRewards)"
                name="Rewards"
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis
                stroke="#94a3b8"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
                  return value.toString()
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="staked"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: '#a855f7', r: 3 }}
                activeDot={{ r: 5 }}
                name="Staked"
              />
              <Line
                type="monotone"
                dataKey="rewards"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 3 }}
                activeDot={{ r: 5 }}
                name="Rewards"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-lg bg-slate-900/50 p-3">
        <p className="text-xs text-slate-400">
          📊 Chart shows live historical data from blockchain events over the last 30 days. 
          Data refreshes automatically every hour.
        </p>
      </div>
    </motion.div>
  )
}

export default StakingChart
