import { useState } from 'react'
import { useCastVote, VoteType } from '../../hooks/governance'
import Button from '../Button'
import { Check, AlertCircle } from 'lucide-react'

interface VotingPanelProps {
  proposalId: bigint
  onVoted?: () => void
}

export default function VotingPanel({ proposalId, onVoted }: VotingPanelProps) {
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null)
  const { castVote, isLoading } = useCastVote()

  const voteOptions = [
    {
      type: VoteType.For,
      label: 'Vote For',
      description: 'Support this proposal',
      icon: <Check className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700/30',
    },
    {
      type: VoteType.Against,
      label: 'Vote Against',
      description: 'Oppose this proposal',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700/30',
    },
    {
      type: VoteType.Abstain,
      label: 'Abstain',
      description: 'No stance',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/20',
      borderColor: 'border-amber-700/30',
    },
  ]

  const handleVote = (voteType: VoteType) => {
    setSelectedVote(voteType)
    castVote(proposalId, voteType)
    if (onVoted) {
      setTimeout(() => onVoted(), 1000)
    }
  }

  return (
    <div className="space-y-3">
      {voteOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => handleVote(option.type)}
          disabled={isLoading}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            selectedVote === option.type
              ? `${option.borderColor} ${option.bgColor} border-opacity-100`
              : 'border-slate-700 bg-slate-900/20 hover:border-slate-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex items-center gap-3">
            <div className={option.color}>{option.icon}</div>
            <div className="text-left">
              <div className="font-semibold text-white">{option.label}</div>
              <div className="text-sm text-slate-400">{option.description}</div>
            </div>
          </div>
        </button>
      ))}

      {selectedVote !== null && (
        <Button
          variant="primary"
          onClick={() => handleVote(selectedVote)}
          isLoading={isLoading}
          className="w-full mt-4"
        >
          Confirm Vote
        </Button>
      )}
    </div>
  )
}
