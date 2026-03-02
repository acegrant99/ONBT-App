import React from 'react';

type SupportedChainId = 8453 | 42161;

const CHAIN_OPTIONS: Array<{ id: SupportedChainId; label: string }> = [
  { id: 8453, label: 'Base' },
  { id: 42161, label: 'Arbitrum' },
];

interface ChainSelectorProps {
  label: string;
  selectedChainId: SupportedChainId;
  onSelectChain: (chainId: SupportedChainId) => void;
}

export function ChainSelector({ label, selectedChainId, onSelectChain }: ChainSelectorProps) {
  return (
    <div className="mb-4">
      <p className="text-xs uppercase tracking-wide text-[color:var(--brand-ink)]/60 mb-2">{label}</p>
      <div className="inline-flex rounded-lg border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] p-1 gap-1">
        {CHAIN_OPTIONS.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectChain(option.id)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedChainId === option.id
                ? 'bg-[color:var(--brand-forest)] text-white'
                : 'text-[color:var(--brand-ink)]/80 hover:bg-[color:var(--brand-leaf)]/15'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
