import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { useONBTBalance, useStake, useUnstake, useApproveToken, useStakingInfo } from '@/hooks/useContract'
import { getContractAddresses } from '@/config/contracts'
import { CardSkeleton } from './LoadingSkeletons'

interface TabProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative px-6 py-2.5 text-sm font-medium transition ${
      active
        ? 'text-white'
        : 'text-slate-400 hover:text-slate-300'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative">{children}</span>
  </motion.button>
)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-300">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:scale-[1.01]"
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
)

export const Staking: React.FC = () => {
  const { isConnected, chainId } = useAccount()
  const { formatted: balance, isLoading: balanceLoading } = useONBTBalance()
  const { stakedAmount, pendingRewards, isLoading: stakingLoading } = useStakingInfo()
  
  const [tab, setTab] = useState<'stake' | 'unstake'>('stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Get staking contract address for token approval
  const contracts = getContractAddresses(chainId || 8453)
  const stakingAddress = contracts.staking
  
  // Initialize hooks with dynamic amounts
  const stake = useStake(stakeAmount)
  const unstake = useUnstake(unstakeAmount)
  const approve = useApproveToken(stakingAddress, stakeAmount)

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return
    setLoading(true)
    try {
      // First approve, then stake
      const approveTx = await approve.approve?.()
      await approveTx
      const stakeTx = await stake.stake?.()
      await stakeTx
      setStakeAmount('')
    } finally {
      setLoading(false)
    }
  }

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return
    setLoading(true)
    try {
      const tx = await unstake.unstake?.()
      await tx
      setUnstakeAmount('')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg text-slate-300">Connect wallet to stake</p>
        </div>
      </div>
    )
  }

  if (balanceLoading || stakingLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Staking</h1>
          <p className="text-slate-400">Lock ONBT tokens to earn rewards</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-700/50 pb-6"
      >
        <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold text-transparent">
          Staking
        </h1>
        <p className="mt-2 text-slate-400">Stake ONBT tokens to earn rewards and unlock achievements</p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Your Balance', value: parseFloat(balance).toFixed(2), color: 'text-white', subtext: 'Available to stake', index: 0 },
          { label: 'Staked Amount', value: parseFloat(stakedAmount).toFixed(2), color: 'text-green-400', subtext: 'Currently earning', index: 1 },
          { label: 'Pending Rewards', value: parseFloat(pendingRewards).toFixed(2), color: 'text-purple-400', subtext: 'Ready to claim', index: 2 },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stat.index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:from-purple-500/5 group-hover:to-blue-500/5 group-hover:opacity-100" />
            <div className="relative">
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p className={`mt-2 text-2xl font-bold ${stat.color}`}>{stat.value} ONBT</p>
              <p className="mt-1 text-xs text-slate-500">{stat.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Staking Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl"
      >
        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-slate-900/50 p-1">
          <Tab active={tab === 'stake'} onClick={() => setTab('stake')}>
            Stake
          </Tab>
          <Tab active={tab === 'unstake'} onClick={() => setTab('unstake')}>
            Unstake
          </Tab>
        </div>

        {/* Stake Tab */}
        {tab === 'stake' && (
          <div className="space-y-4">
            <Input
              label="Amount to Stake"
              type="number"
              placeholder="0.00"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              min="0"
              step="0.01"
            />

            {/* Quick buttons for percentages */}
            <div className="flex gap-2">
              {['Max', '50%', '25%'].map((label) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const multiplier = label === 'Max' ? 1 : label === '50%' ? 0.5 : 0.25
                    setStakeAmount((parseFloat(balance) * multiplier).toString())
                  }}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-purple-400 transition hover:bg-slate-700 hover:text-purple-300"
                >
                  {label}
                </motion.button>
              ))}
            </div>

            {/* Gas & Info */}
            <div className="space-y-2 rounded-lg bg-slate-900/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gas Fee:</span>
                <span className="text-white">~0.01 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total:</span>
                <span className="font-medium text-white">{parseFloat(stakeAmount || '0').toFixed(2)} ONBT</span>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStake}
              disabled={
                loading ||
                !stakeAmount ||
                parseFloat(stakeAmount) <= 0 ||
                parseFloat(stakeAmount) > parseFloat(balance)
              }
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3.5 font-medium text-white shadow-lg shadow-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:shadow-xl hover:enabled:shadow-purple-500/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Stake ONBT'}
            </motion.button>
          </div>
        )}

        {/* Unstake Tab */}
        {tab === 'unstake' && (
          <div className="space-y-4">
            <Input
              label="Amount to Unstake"
              type="number"
              placeholder="0.00"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              min="0"
              step="0.01"
            />

            {/* Quick buttons for percentages */}
            <div className="flex gap-2">
              {['Max', '50%', '25%'].map((label) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const multiplier = label === 'Max' ? 1 : label === '50%' ? 0.5 : 0.25
                    setUnstakeAmount((parseFloat(stakedAmount) * multiplier).toString())
                  }}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-purple-400 transition hover:bg-slate-700 hover:text-purple-300"
                >
                  {label}
                </motion.button>
              ))}
            </div>
            <div className="hidden">
              <button
                onClick={() => setUnstakeAmount((parseFloat(stakedAmount) * 0.5).toString())}
                className="text-xs font-medium text-purple-400 transition hover:text-purple-300"
              >
                50%
              </button>
              <button
                onClick={() => setUnstakeAmount((parseFloat(stakedAmount) * 0.25).toString())}
                className="text-xs font-medium text-purple-400 transition hover:text-purple-300"
              >
                25%
              </button>
            </div>

            {/* Info */}
            <div className="space-y-2 rounded-lg bg-slate-900/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gas Fee:</span>
                <span className="text-white">~0.01 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">You will receive:</span>
                <span className="font-medium text-white">{parseFloat(unstakeAmount || '0').toFixed(2)} ONBT</span>
              </div>
            </div>

            {/* Warning */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 backdrop-blur-sm"
            >
              <p className="text-sm text-orange-200">
                ⚠️ <strong className="font-semibold">Warning:</strong> Unstaking will stop earning rewards. You can stake again anytime.
              </p>
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUnstake}
              disabled={
                loading ||
                !unstakeAmount ||
                parseFloat(unstakeAmount) <= 0 ||
                parseFloat(unstakeAmount) > parseFloat(stakedAmount)
              }
              className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 py-3.5 font-medium text-white shadow-lg shadow-orange-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:shadow-xl hover:enabled:shadow-orange-500/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Unstake ONBT'}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* FAQ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-white">Staking FAQs</h3>

        <div className="space-y-3">
          {[
            { q: 'How are rewards calculated?', a: 'Rewards are calculated based on your staked amount and the reward rate. The more you stake, the more rewards you earn.' },
            { q: 'Is there a minimum staking amount?', a: 'There is no minimum amount. You can stake any amount of ONBT tokens.' },
            { q: 'When do I earn rewards?', a: 'Rewards accumulate continuously. You can claim them anytime from your dashboard.' },
          ].map((faq, i) => (
            <motion.details 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-sm transition-all hover:border-slate-600"
            >
              <summary className="cursor-pointer font-medium text-white transition-colors group-open:text-purple-400">
                {faq.q}
              </summary>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-sm leading-relaxed text-slate-400"
              >
                {faq.a}
              </motion.p>
            </motion.details>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Staking
