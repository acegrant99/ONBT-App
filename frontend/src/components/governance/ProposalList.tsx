import { motion } from 'framer-motion'
import { ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'
import Card from '../Card'
import { Proposal } from '../../hooks/governance'
import { itemVariant } from '../../lib/animations'
import ProposalDetail from './ProposalDetail'

interface ProposalListProps {
  proposals: Proposal[]
  isLoading?: boolean
}

export default function ProposalList({ proposals, isLoading }: ProposalListProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)

  if (isLoading) {
    return (
      <motion.div variants={itemVariant} className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-700 rounded-lg animate-pulse" />
        ))}
      </motion.div>
    )
  }

  if (proposals.length === 0) {
    return (
      <motion.div variants={itemVariant}>
        <Card>
          <div className="flex flex-col items-center justify-center py-12">
            <Clock className="w-12 h-12 text-slate-500 mb-3" />
            <p className="text-slate-400">No proposals to display</p>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariant} className="space-y-3">
      {proposals.map((proposal) => (
        <motion.div
          key={proposal.id.toString()}
          variants={itemVariant}
          onClick={() => setSelectedProposal(proposal)}
          className="cursor-pointer"
        >
          <Card interactive>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-purple-400">#{proposal.id.toString()}</span>
                  <span className="px-2 py-1 text-xs rounded bg-blue-900/30 text-blue-300">Active</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{proposal.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{proposal.description}</p>

                {/* Vote Breakdown */}
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-green-400 font-semibold">For</span>
                        <span className="text-xs text-slate-400">
                          {Number(proposal.forVotes) / 1e18}
                          votes
                        </span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-green-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-red-400 font-semibold">Against</span>
                        <span className="text-xs text-slate-400">
                          {Number(proposal.againstVotes) / 1e18}
                          votes
                        </span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[30%] bg-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-500 ml-4 flex-shrink-0 mt-1" />
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProposal(null)}
        >
          <motion.div
            className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProposalDetail proposal={selectedProposal} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
