import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useAchievementDetails, useAchievementNFTs, useAchievementsByOwner } from '@/hooks/useContract'
import { CardSkeleton } from './LoadingSkeletons'

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  category: 'staking' | 'trading' | 'governance' | 'community'
}

const RARITY_COLORS: Record<Achievement['rarity'], string> = {
  common: 'from-gray-400 to-gray-500',
  uncommon: 'from-green-400 to-green-500',
  rare: 'from-blue-400 to-blue-500',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600',
}

const RARITY_BORDERS: Record<Achievement['rarity'], string> = {
  common: 'border-gray-400',
  uncommon: 'border-green-400',
  rare: 'border-blue-400',
  epic: 'border-purple-500',
  legendary: 'border-yellow-400',
}

interface AchievementCardProps {
  achievement: Achievement
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <div
    className={`relative overflow-hidden rounded-lg border-2 ${
      achievement.earned
        ? `${RARITY_BORDERS[achievement.rarity]} bg-gradient-to-br ${RARITY_COLORS[achievement.rarity]}/20`
        : 'border-slate-600 bg-slate-800/30 opacity-60'
    } p-4 transition hover:scale-105 hover:shadow-lg`}
  >
    {/* Earned Badge */}
    {achievement.earned && (
      <div className="absolute right-0 top-0">
        <div className={`rounded-bl-lg bg-gradient-to-b ${RARITY_COLORS[achievement.rarity]} px-3 py-1 text-xs font-bold text-white`}>
          EARNED
        </div>
      </div>
    )}

    {/* Icon */}
    <div
      className={`text-5xl mb-3 ${achievement.earned ? '' : 'grayscale'}`}
    >
      {achievement.icon}
    </div>

    {/* Content */}
    <h3 className="font-semibold text-white">{achievement.name}</h3>
    <p className="mt-1 text-xs text-slate-300">{achievement.description}</p>

    {/* Rarity & Date */}
    <div className="mt-3 flex items-center justify-between">
      <span className={`text-xs font-medium uppercase ${
        achievement.rarity === 'common'
          ? 'text-gray-300'
          : achievement.rarity === 'uncommon'
            ? 'text-green-300'
            : achievement.rarity === 'rare'
              ? 'text-blue-300'
              : achievement.rarity === 'epic'
                ? 'text-purple-300'
                : 'text-yellow-300'
      }`}>
        {achievement.rarity}
      </span>
      {achievement.earnedDate && (
        <span className="text-xs text-slate-400">{achievement.earnedDate}</span>
      )}
    </div>
  </div>
)

export const Achievements: React.FC = () => {
  const { isConnected } = useAccount()
  const { count: achievementCount } = useAchievementNFTs()
  const { tokenIds } = useAchievementsByOwner()
  const { achievements: chainAchievements, isLoading } = useAchievementDetails(tokenIds)
  const [selectedCategory, setSelectedCategory] = useState<'all' | Achievement['category']>('all')

  const formatDate = (timestamp: bigint) => {
    if (timestamp === 0n) return undefined
    const date = new Date(Number(timestamp) * 1000)
    return date.toISOString().slice(0, 10)
  }

  const mapCategory = (achievementType: number): Achievement['category'] => {
    switch (achievementType) {
      case 0:
        return 'staking'
      case 1:
        return 'trading'
      case 2:
        return 'governance'
      default:
        return 'community'
    }
  }

  const mapRarity = (rarity: number): Achievement['rarity'] => {
    switch (rarity) {
      case 0:
        return 'common'
      case 1:
        return 'uncommon'
      case 2:
        return 'rare'
      case 3:
        return 'epic'
      default:
        return 'legendary'
    }
  }

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'staking':
        return '🎯'
      case 'trading':
        return '🌉'
      case 'governance':
        return '🗳️'
      default:
        return '👥'
    }
  }

  const getCategoryDescription = (category: Achievement['category']) => {
    switch (category) {
      case 'staking':
        return 'Earned through staking activity'
      case 'trading':
        return 'Earned through trading activity'
      case 'governance':
        return 'Earned through governance participation'
      default:
        return 'Earned through community engagement'
    }
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg text-slate-300">Connect wallet to view achievements</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Achievements</h1>
          <p className="mt-2 text-slate-400">Collect NFT achievements by participating in the ONBT ecosystem</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  const achievements: Achievement[] = chainAchievements.length > 0
    ? chainAchievements.map((achievement) => {
      const category = mapCategory(achievement.achievementType)
      const name = achievement.name?.trim()
        ? achievement.name
        : `Achievement #${achievement.tokenId.toString()}`

      return {
        id: Number(achievement.tokenId),
        name,
        description: `${getCategoryDescription(category)} · Chain ${achievement.originChain}`,
        icon: getCategoryIcon(category),
        earned: true,
        earnedDate: formatDate(achievement.unlockedAt),
        rarity: mapRarity(achievement.rarity),
        category,
      }
    })
    : [] // Show empty array - only real blockchain data, no sample data fallback

  const filtered =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory)

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalCount = achievements.length
  const mintedCount = tokenIds.length > 0 ? tokenIds.length : achievementCount
  const earnedPercent = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-700 pb-6">
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
        <p className="mt-2 text-slate-400">Collect NFT achievements by participating in the ONBT ecosystem</p>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Achievements Earned</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {earnedCount} <span className="text-lg text-slate-500">/ {totalCount}</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {earnedPercent}% Complete
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-400">NFTs Minted</p>
            <p className="mt-2 text-3xl font-bold text-purple-400">{mintedCount}</p>
            <p className="mt-1 text-xs text-slate-400">In your wallet</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700"
          role="progressbar"
          aria-label={`Progress: ${earnedCount} of ${totalCount} achievements earned`}
          aria-valuetext={`${earnedPercent}% complete`}
        >
          <svg className="h-full w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="achievements-progress-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width={earnedPercent} height="8" fill="url(#achievements-progress-gradient)" rx="4" />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'border border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          All ({achievements.length})
        </button>
        <button
          onClick={() => setSelectedCategory('staking')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'staking'
              ? 'bg-purple-600 text-white'
              : 'border border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          Staking ({achievements.filter((a) => a.category === 'staking').length})
        </button>
        <button
          onClick={() => setSelectedCategory('trading')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'trading'
              ? 'bg-purple-600 text-white'
              : 'border border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          Trading ({achievements.filter((a) => a.category === 'trading').length})
        </button>
        <button
          onClick={() => setSelectedCategory('governance')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'governance'
              ? 'bg-purple-600 text-white'
              : 'border border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          Governance ({achievements.filter((a) => a.category === 'governance').length})
        </button>
        <button
          onClick={() => setSelectedCategory('community')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'community'
              ? 'bg-purple-600 text-white'
              : 'border border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          Community ({achievements.filter((a) => a.category === 'community').length})
        </button>
      </div>

      {/* Achievement Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* Rarity Legend */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
        <h3 className="font-semibold text-white">Rarity Levels</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {Object.entries(RARITY_COLORS).map(([rarity, gradient]) => (
            <div key={rarity} className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded bg-gradient-to-b ${gradient}`} />
              <span className="text-xs font-medium capitalize text-slate-300">{rarity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-lg border border-blue-700/30 bg-blue-900/10 p-4">
        <p className="text-sm text-blue-200">
          💡 <strong>Tip:</strong> To earn more achievements, participate in staking, trading, governance, and community activities. Each achieved milestone will mint a new achievement NFT to your wallet.
        </p>
      </div>
    </div>
  )
}

export default Achievements
