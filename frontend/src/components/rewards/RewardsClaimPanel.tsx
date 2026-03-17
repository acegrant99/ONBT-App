import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Zap } from 'lucide-react'
import Card from '../Card'
import Button from '../Button'
import { useClaimRewards } from '../../hooks/rewards'
import { useRewardBreakdown } from '../../hooks/rewards'
import { itemVariant } from '../../lib/animations'

interface RewardTier {
  id: number
  name: string
  amount: bigint
  percentage: number
  claimable: boolean
}

export default function RewardsClaimPanel() {
  const { claimMultiple, isLoading } = useClaimRewards()
  const { sources, claimableFormatted } = useRewardBreakdown()
  const [selectedTiers, setSelectedTiers] = useState<number[]>([])

  // Build reward tiers from actual protocol data
  const claimableAmount = parseFloat(claimableFormatted) * 1e18
  const rewardTiers: RewardTier[] = sources.length > 0
    ? sources.map((source, idx) => ({
      id: idx,
      name: source.name,
      amount: source.amount,
      percentage: source.percentage,
      claimable: source.amount > 0n && claimableAmount >= Number(source.amount),
    }))
    : sources.length === 0
      ? [
        {
          id: 0,
          name: 'No Rewards Available',
          amount: 0n,
          percentage: 0,
          claimable: false,
        },
      ]
      : []

  const handleToggleTier = (id: number) => {
    setSelectedTiers((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const handleClaimSelected = () => {
    if (selectedTiers.length === 0) return
    claimMultiple(totalClaimable)
    setSelectedTiers([])
  }

  const totalClaimable = rewardTiers
    .filter((t) => selectedTiers.includes(t.id) && t.claimable)
    .reduce((sum, t) => sum + t.amount, 0n)

  return (
    <motion.div variants={itemVariant}>
      <Card title="Claim Rewards" icon={<Zap className="w-6 h-6 text-yellow-400" />}>
        <div className="space-y-4">
          {/* Reward Tiers */}
          <div className="space-y-2">
            {rewardTiers.map((tier) => (
              <motion.button
                key={tier.id}
                onClick={() => tier.claimable && handleToggleTier(tier.id)}
                disabled={!tier.claimable}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedTiers.includes(tier.id)
                    ? 'border-purple-500 bg-purple-900/20'
                    : tier.claimable
                      ? 'border-slate-700 bg-slate-900/20 hover:border-slate-600'
                      : 'border-slate-700 bg-slate-900/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{tier.name}</span>
                      {!tier.claimable && <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">Locked</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden max-w-xs">
                        <svg className="h-full w-full" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
                          <rect x="0" y="0" width={tier.percentage} height="6" fill="#a855f7" rx="3" />
                        </svg>
                      </div>
                      <span className="text-xs text-slate-400">{tier.percentage}%</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    {tier.claimable && selectedTiers.includes(tier.id) && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <p className="text-sm font-semibold text-white">{Number(tier.amount) / 1e18} ONBT</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Claim Summary */}
          {selectedTiers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-slate-700 pt-4">
              <div className="p-3 bg-purple-900/20 border border-purple-700/30 rounded-lg mb-3">
                <p className="text-sm text-slate-300 mb-1">Total Selected</p>
                <p className="text-2xl font-bold text-purple-400">{Number(totalClaimable) / 1e18} ONBT</p>
              </div>

              <Button variant="primary" onClick={handleClaimSelected} isLoading={isLoading} className="w-full">
                Claim {selectedTiers.length} Reward(s)
              </Button>
            </motion.div>
          )}

          {selectedTiers.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-2">Select reward tiers to claim</p>
          )}

          {/* Auto Claim Info */}
          <div className="flex gap-2 p-2 bg-blue-900/20 border border-blue-700/30 rounded text-xs text-blue-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>Governance bonus unlocks after 6 months of staking</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
