import { useState, type ChangeEvent } from 'react'
import { useVotingPower, useDelegateVotes } from '../../hooks/governance'
import { formatAddress } from '../../lib/utils'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input'
import { Send, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { itemVariant } from '../../lib/animations'

export default function VotingPowerDisplay() {
  const { votingPowerFormatted, delegatedTo } = useVotingPower()
  const { delegate, selfDelegate, isLoading } = useDelegateVotes()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [showDelegateForm, setShowDelegateForm] = useState(false)

  const handleDelegate = () => {
    if (!delegateAddress.trim()) return
    delegate(delegateAddress as `0x${string}`)
    setDelegateAddress('')
  }

  return (
    <motion.div variants={itemVariant} className="space-y-4">
      <Card title="Voting Power & Delegation" icon={<User className="w-6 h-6 text-purple-400" />}>
        <div className="space-y-6">
          {/* Voting Power Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Your Voting Power</p>
              <p className="text-2xl font-bold text-white">{votingPowerFormatted}</p>
              <p className="text-xs text-slate-500 mt-1">From staked ONBT</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Delegated To</p>
              <p className="text-lg font-bold text-purple-400">
                {delegatedTo ? formatAddress(delegatedTo) : 'Not delegated'}
              </p>
              <p className="text-xs text-slate-500 mt-1">Address or self</p>
            </div>
          </div>

          {/* Delegation Section */}
          <div className="border-t border-slate-700 pt-4">
            {!showDelegateForm ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDelegateForm(true)}
                icon={<Send className="w-4 h-4" />}
                className="w-full"
              >
                {delegatedTo ? 'Change Delegation' : 'Delegate Voting Power'}
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  label="Delegate Address"
                  placeholder="0x..."
                  value={delegateAddress}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDelegateAddress(e.target.value)}
                  hint="Delegate your voting power to another address"
                />

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDelegate}
                    isLoading={isLoading}
                    className="flex-1"
                  >
                    Delegate
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setShowDelegateForm(false)
                      setDelegateAddress('')
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selfDelegate}
                  className="w-full text-xs"
                >
                  Delegate to Myself (Undelegate)
                </Button>
              </div>
            )}
          </div>

          {/* Info */}
          <p className="text-xs text-slate-500 border-t border-slate-700 pt-4">
            💡 Tip: Delegate your voting power to participate in governance without moving your tokens. You can
            delegate to yourself to undelegate from others.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
