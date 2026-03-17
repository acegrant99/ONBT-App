import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { FileText, Plus, Vote, TrendingUp } from 'lucide-react'
import Button from '../Button'
import Card from '../Card'
import { useGovernanceProposals, useVotingPower } from '../../hooks/governance'
import { fadeInUp, containerVariant, itemVariant } from '../../lib/animations'
import ProposalList from './ProposalList'
import VotingPowerDisplay from './VotingPowerDisplay'

export default function Governance() {
  const { isConnected } = useAccount()
  const { proposals, isLoading: proposalsLoading } = useGovernanceProposals()
  const { votingPowerFormatted } = useVotingPower()
  const [showCreateModal, setShowCreateModal] = useState(false)

  if (!isConnected) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <FileText className="w-16 h-16 text-purple-400 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Connect your wallet to participate in ONBT protocol governance and vote on proposals
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
              <Vote className="w-10 h-10 text-purple-400" />
              Governance
            </h1>
            <p className="text-slate-400 mt-2">Participate in ONBT protocol decisions</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)} icon={<Plus className="w-5 h-5" />}>
            New Proposal
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Voting Power" icon={<TrendingUp className="w-6 h-6 text-purple-400" />}>
          <p className="text-3xl font-bold text-white">{votingPowerFormatted}</p>
          <p className="text-sm text-slate-400 mt-2">ONBT staked</p>
        </Card>

        <Card title="Active Proposals" icon={<FileText className="w-6 h-6 text-blue-400" />}>
          <p className="text-3xl font-bold text-white">{proposals.length}</p>
          <p className="text-sm text-slate-400 mt-2">Awaiting your vote</p>
        </Card>

        <Card title="Participation" icon={<Vote className="w-6 h-6 text-green-400" />}>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-sm text-slate-400 mt-2">Votes cast</p>
        </Card>
      </motion.div>

      {/* Voting Power Details */}
      <motion.div variants={itemVariant}>
        <VotingPowerDisplay />
      </motion.div>

      {/* Proposals */}
      <motion.div variants={itemVariant}>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Proposals</h2>
            <p className="text-slate-400">
              {proposals.length === 0
                ? 'No active proposals. Check back soon!'
                : `${proposals.length} proposal${proposals.length !== 1 ? 's' : ''} available to vote on`}
            </p>
          </div>
          <ProposalList proposals={proposals} isLoading={proposalsLoading} />
        </div>
      </motion.div>

      {/* Create Proposal Modal */}
      {showCreateModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Create Proposal</h3>
            <p className="text-slate-400 text-sm mb-4">
              Proposal creation coming soon. You need sufficient voting power to create proposals.
            </p>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)} className="w-full">
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
