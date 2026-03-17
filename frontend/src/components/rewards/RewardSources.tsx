import { motion } from 'framer-motion'
import { Info, AlertCircle } from 'lucide-react'
import Card from '../Card'
import { itemVariant } from '../../lib/animations'
import { useProtocolStats } from '@/hooks/useProtocolStats'

interface RewardSourceDetail {
  name: string
  description: string
  apy: number
  requirements: string
  status: 'active' | 'coming' | 'inactive'
}

export default function RewardSources() {
  const { display: protocolStats } = useProtocolStats()

  const rewardSources: RewardSourceDetail[] = [
    {
      name: 'Base Staking APY',
      description: 'Earn rewards from staking ONBT tokens in the protocol',
      apy: parseFloat(protocolStats.baseAPY || '0'),
      requirements: 'Staking is open and active',
      status: 'active',
    },
    {
      name: 'Maximum APY',
      description: 'Highest achievable APY with optimal lockup period',
      apy: parseFloat(protocolStats.maxAPY || '0'),
      requirements: 'Maximum lockup period required',
      status: 'active',
    },
    {
      name: 'Governance Rewards',
      description: 'Earn bonus APY by voting on protocol proposals',
      apy: parseFloat(protocolStats.baseAPY || '0') * 0.25,
      requirements: 'Active participation in governance',
      status: 'active',
    },
    {
      name: 'Liquidity Provider Rewards',
      description: 'Earn rewards by providing liquidity in ONBT pools',
      apy: parseFloat(protocolStats.baseAPY || '0') * 1.5,
      requirements: 'Provide liquidity to DEX pool',
      status: 'active',
    },
    {
      name: 'Partner Pool Rewards',
      description: 'Cross-protocol rewards from partner integrations',
      apy: parseFloat(protocolStats.baseAPY || '0') * 0.5,
      requirements: 'Whitelist status - contact team',
      status: 'active',
    },
  ]

  const activeCount = rewardSources.filter((s) => s.status === 'active').length

  return (
    <motion.div variants={itemVariant}>
      <Card title="Reward Sources Details" icon={<Info className="w-6 h-6 text-blue-400" />}>
        <div className="space-y-3">
          {/* Summary */}
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-white">{activeCount} active</span> reward sources available
            </p>
          </div>

          {/* Sources List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {rewardSources.map((source, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-3 rounded-lg border border-slate-700 ${
                  source.status === 'active'
                    ? 'bg-green-900/10'
                    : source.status === 'coming'
                      ? 'bg-blue-900/10'
                      : 'bg-slate-900/20 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{source.name}</h4>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          source.status === 'active'
                            ? 'bg-green-900/30 text-green-300'
                            : source.status === 'coming'
                              ? 'bg-blue-900/30 text-blue-300'
                              : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {source.status === 'active' ? 'Active' : source.status === 'coming' ? 'Coming Soon' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{source.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className="text-2xl font-bold text-white">{source.apy}%</p>
                    <p className="text-xs text-slate-500">APY</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="flex items-start gap-2 pt-2 border-t border-slate-700">
                  <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400">{source.requirements}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-700">
            💡 APY rates are variable and may change based on protocol mechanics and market conditions
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
