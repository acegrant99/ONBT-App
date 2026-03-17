import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft, Settings } from 'lucide-react'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input'
import { useSwapTokens } from '../../hooks/liquidity'
import { itemVariant } from '../../lib/animations'

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState('ONBT')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const { swap, isLoading } = useSwapTokens()

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const handleSwap = () => {
    swap({ fromToken, toToken, amountIn: fromAmount, slippage })
  }

  return (
    <motion.div variants={itemVariant} className="max-w-md mx-auto">
      <Card title="Swap Tokens">
        <div className="space-y-4">
          {/* From Token */}
          <Input
            label={`From (${fromToken})`}
            placeholder="0.00"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            hint={`Balance: 10.5 ${fromToken}`}
          />

          {/* Swap Button */}
          <div className="flex justify-center relative -my-2 z-10">
            <button
              onClick={handleSwapTokens}
              aria-label="Swap tokens"
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors border-2 border-slate-800"
            >
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* To Token */}
          <Input
            label={`To (${toToken})`}
            placeholder="0.00"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            hint={`Balance: 5,234.50 ${toToken}`}
          />

          {/* Slippage & Settings */}
          <div className="p-3 bg-slate-700/20 border border-slate-700 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-300">Slippage Tolerance</span>
              </div>
              <span className="text-sm font-semibold text-white">{slippage.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              aria-label="Slippage tolerance slider"
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Swap Details */}
          {fromAmount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg space-y-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="text-slate-400">Price impact:</span>
                <span className="text-white">-0.12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Liquidity provider fee:</span>
                <span className="text-white">0.30 USDC</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">You will receive:</span>
                <span className="text-white">{Number(fromAmount) * 2000} USDC</span>
              </div>
            </motion.div>
          )}

          <Button
            variant="primary"
            onClick={handleSwap}
            disabled={!fromAmount}
            isLoading={isLoading}
            className="w-full"
          >
            {fromAmount ? `Swap ${fromAmount} ${fromToken}` : 'Enter amount'}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Gas fee will be calculated at checkout
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
