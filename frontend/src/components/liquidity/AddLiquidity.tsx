import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input'
import { useAddLiquidity } from '../../hooks/liquidity'
import { itemVariant } from '../../lib/animations'

interface AddLiquidityProps {
  onSuccess?: () => void
}

export default function AddLiquidity({ onSuccess }: AddLiquidityProps) {
  const [amount0, setAmount0] = useState('')
  const [amount1, setAmount1] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const { addLiquidity, isLoading } = useAddLiquidity()

  const handleAddLiquidity = () => {
    if (!amount0 || !amount1) return

    addLiquidity({
      poolId: 'ONBT-USDC',
      amount0: BigInt(Math.floor(parseFloat(amount0) * 1e18)),
      amount1: BigInt(Math.floor(parseFloat(amount1) * 1e18)),
      minAmount0: BigInt(Math.floor(parseFloat(amount0) * 1e18 * (1 - slippage / 100))),
      minAmount1: BigInt(Math.floor(parseFloat(amount1) * 1e18 * (1 - slippage / 100))),
      slippageTolerance: slippage,
    })

    if (onSuccess) {
      setTimeout(() => onSuccess(), 1500)
    }
  }

  return (
    <motion.div variants={itemVariant}>
      <Card title="Add Liquidity" icon={<Plus className="w-6 h-6 text-green-400" />}>
        <div className="space-y-4">
          {/* Pool Selection */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Trading Pair</label>
            <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-700">
              <p className="text-white font-semibold">ONBT / USDC</p>
              <p className="text-sm text-slate-400 mt-1">0.30% fee tier</p>
            </div>
          </div>

          {/* Amount Inputs */}
          <Input
            label="ONBT Amount"
            placeholder="0.00"
            value={amount0}
            onChange={(e) => setAmount0(e.target.value)}
            hint="Amount of ONBT to provide"
            icon={undefined}
          />

          <Input
            label="USDC Amount"
            placeholder="0.00"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            hint="Amount of USDC to provide"
            icon={undefined}
          />

          {/* Slippage */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Slippage Tolerance</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={slippage}
                onChange={(e) => setSlippage(parseFloat(e.target.value))}
                aria-label="Slippage tolerance slider"
                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <span className="text-sm font-semibold text-white min-w-12">{slippage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Summary */}
          {amount0 && amount1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-purple-900/20 border border-purple-700/30 rounded-lg space-y-2"
            >
              <div className="flex justify-between">
                <span className="text-slate-400">Share of pool:</span>
                <span className="text-white font-semibold">~0.01%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">LP Tokens to receive:</span>
                <span className="text-white font-semibold">Loading...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated APY:</span>
                <span className="text-green-400 font-semibold">15.2%</span>
              </div>
            </motion.div>
          )}

          <Button
            variant="primary"
            onClick={handleAddLiquidity}
            disabled={!amount0 || !amount1}
            isLoading={isLoading}
            className="w-full"
          >
            Add Liquidity
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
