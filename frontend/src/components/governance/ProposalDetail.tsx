import { motion } from 'framer-motion'
import { X, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Proposal } from '../../hooks/governance'
import { fadeInUp } from '../../lib/animations'
import VotingPanel from './VotingPanel'

interface ProposalDetailProps {
  proposal: Proposal
  onClose?: () => void
}

export default function ProposalDetail({ proposal, onClose }: ProposalDetailProps) {
  const [hasVoted, setHasVoted] = useState(false)

  const forPercentage = proposal.totalVotingPower > 0n
    ? Number(proposal.forVotes * 100n) / Number(proposal.totalVotingPower)
    : 0
  const againstPercentage = proposal.totalVotingPower > 0n
    ? Number(proposal.againstVotes * 100n) / Number(proposal.totalVotingPower)
    : 0
  const abstainPercentage = proposal.totalVotingPower > 0n
    ? Number(proposal.abstainVotes * 100n) / Number(proposal.totalVotingPower)
    : 0

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-purple-400">Proposal #{proposal.id.toString()}</span>
            <span className="px-2 py-1 text-xs rounded bg-blue-900/30 text-blue-300">Active</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{proposal.title}</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Close proposal details">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Description</h3>
        <p className="text-slate-400">{proposal.description}</p>
      </div>

      {/* Vote Stats */}
      <div className="mb-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-300">Vote Breakdown</h3>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-green-400">
              <Check className="w-4 h-4" />
              For
            </span>
            <span className="text-lg font-semibold text-white">
              {forPercentage.toFixed(1)}%
              <span className="text-sm text-slate-400 ml-2">
                {Number(proposal.forVotes / 10n ** 18n)} votes
              </span>
            </span>
          </div>
          {/* stylelint-disable */}
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${forPercentage}%` }} />
          </div>
          {/* stylelint-enable */}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              Against
            </span>
            <span className="text-lg font-semibold text-white">
              {againstPercentage.toFixed(1)}%
              <span className="text-sm text-slate-400 ml-2">
                {Number(proposal.againstVotes / 10n ** 18n)} votes
              </span>
            </span>
          </div>
          {/* stylelint-disable */}
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: `${againstPercentage}%` }} />
          </div>
          {/* stylelint-enable */}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              Abstain
            </span>
            <span className="text-lg font-semibold text-white">
              {abstainPercentage.toFixed(1)}%
              <span className="text-sm text-slate-400 ml-2">
                {Number(proposal.abstainVotes / 10n ** 18n)} votes
              </span>
            </span>
          </div>
          {/* stylelint-disable */}
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${abstainPercentage}%` }} />
          </div>
          {/* stylelint-enable */}
        </div>
      </div>

      {/* Voting Panel */}
      {!hasVoted && (
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Cast Your Vote</h3>
          <VotingPanel proposalId={proposal.id} onVoted={() => setHasVoted(true)} />
        </div>
      )}

      {hasVoted && (
        <div className="border-t border-slate-700 pt-6">
          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Thank you for voting!</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
