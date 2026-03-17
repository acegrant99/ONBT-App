import { motion } from 'framer-motion'
import { Percent } from 'lucide-react'
import Card from '../Card'
import { itemVariant } from '../../lib/animations'

export default function AllocationDisplay() {
  const allocations = [
    {
      name: 'Treasury Reserve',
      percentage: 40,
      amount: '$98.3K',
      description: 'Long-term protocol sustainability',
      color: 'bg-purple-500',
    },
    {
      name: 'Staking Rewards',
      percentage: 35,
      amount: '$86.0K',
      description: 'Distributed to stakers',
      color: 'bg-green-500',
    },
    {
      name: 'Insurance Fund',
      percentage: 15,
      amount: '$36.9K',
      description: 'Risk management reserves',
      color: 'bg-blue-500',
    },
    {
      name: 'Development',
      percentage: 10,
      amount: '$24.6K',
      description: 'Team and operations',
      color: 'bg-amber-500',
    },
  ]

  return (
    <motion.div variants={itemVariant}>
      <Card title="Revenue Allocation" icon={<Percent className="w-6 h-6 text-purple-400" />}>
        <div className="space-y-4">
          {allocations.map((alloc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{alloc.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{alloc.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{alloc.percentage}%</p>
                  <p className="text-sm text-slate-400">{alloc.amount}</p>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                {/* stylelint-disable-next-line */}
                <div className={`h-full ${alloc.color}`} style={{ width: `${alloc.percentage}%` }} />
              </div>
            </motion.div>
          ))}

          {/* Total */}
          <div className="pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">Total Monthly Revenue</p>
              <p className="text-2xl font-bold text-purple-400">$245.8K</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              💡 Allocation percentages determined by governance. Amounts update monthly.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
