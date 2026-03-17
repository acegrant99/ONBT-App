import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { Droplet, ArrowRightLeft } from 'lucide-react'
import Button from '../Button'
import Card from '../Card'
import { usePools, useLiquidityPositions } from '../../hooks/liquidity'
import { fadeInUp, containerVariant, itemVariant } from '../../lib/animations'
import LiquidityPositions from './LiquidityPositions'
import SwapInterface from './SwapInterface'
import AddLiquidity from './AddLiquidity'
import PoolStats from './PoolStats'

export default function Liquidity() {
  const { isConnected } = useAccount()
  const { pools } = usePools()
  const { totalValueLockedFormatted } = useLiquidityPositions()
  const [showAddLiquidity, setShowAddLiquidity] = useState(false)
  const [activeTab, setActiveTab] = useState<'positions' | 'swap'>('positions')

  if (!isConnected) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <Droplet className="w-16 h-16 text-cyan-400 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Liquidity</h1>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Connect your wallet to manage liquidity and swap tokens on the ONBT protocol
        </p>
        <Button variant="primary">Connect Wallet</Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant} className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariant}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Droplet className="w-10 h-10 text-cyan-400" />
              Liquidity
            </h1>
            <p className="text-slate-400 mt-2">Provide liquidity and earn fees</p>
          </div>
          {activeTab === 'positions' && (
            <Button variant="primary" onClick={() => setShowAddLiquidity(!showAddLiquidity)}>
              {showAddLiquidity ? 'Cancel' : '+ Add Liquidity'}
            </Button>
          )}
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Value Locked">
          <p className="text-3xl font-bold text-white">${totalValueLockedFormatted}</p>
          <p className="text-sm text-slate-400 mt-2">All LP positions</p>
        </Card>

        <Card title="Available Pools">
          <p className="text-3xl font-bold text-white">{pools.length}</p>
          <p className="text-sm text-slate-400 mt-2">Trading pairs</p>
        </Card>

        <Card title="24h Volume">
          <p className="text-3xl font-bold text-white">$0</p>
          <p className="text-sm text-slate-400 mt-2">Protocol volume</p>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariant} className="flex gap-2 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'positions'
              ? 'text-purple-400 border-purple-400'
              : 'text-slate-400 border-transparent hover:text-slate-300'
          }`}
        >
          My Positions
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'swap'
              ? 'text-purple-400 border-purple-400'
              : 'text-slate-400 border-transparent hover:text-slate-300'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Swap
        </button>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariant}>
        {activeTab === 'positions' ? (
          <div className="space-y-6">
            {showAddLiquidity && <AddLiquidity onSuccess={() => setShowAddLiquidity(false)} />}
            <LiquidityPositions />
            <PoolStats />
          </div>
        ) : (
          <SwapInterface />
        )}
      </motion.div>
    </motion.div>
  )
}
