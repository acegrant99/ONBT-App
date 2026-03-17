import React from 'react';
import { OnchainSdkPanel } from '@/components';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

type AboutPanelProps = {
  baseExplorer: string;
  arbitrumExplorer: string;
  baseTokenAddress: `0x${string}`;
  arbitrumTokenAddress: `0x${string}`;
};

export function AboutPanel({
  baseExplorer,
  arbitrumExplorer,
  baseTokenAddress,
  arbitrumTokenAddress,
}: AboutPanelProps) {
  return (
    <div className="brand-card max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      <button type="button" className="mb-4 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-2xl font-semibold brand-display">
        About ONBT
      </button>
      <div className="space-y-4 text-[color:var(--brand-ink)]/80">
        <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85">
          Omnichain Nabat Token (ONBT) is a LayerZero V2 Omnichain Fungible Token (OFT) that exists natively across multiple blockchains.
        </button>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">🔗 Supported Chains</button>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Base</strong> (Hub Chain) - EID 30184</li>
            <li>• <strong>Arbitrum</strong> - EID 30110</li>
          </ul>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">✨ Features</button>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Unified Supply:</strong> 1 billion ONBT across all chains</li>
            <li>• <strong>Native Transfers:</strong> Seamless cross-chain bridging</li>
            <li>• <strong>Omnichain Staking:</strong> Stake on any chain, earn everywhere</li>
            <li>• <strong>Cross-Chain Governance:</strong> Vote from any supported chain</li>
            <li>• <strong>Achievement NFTs:</strong> Portable NFTs across all chains</li>
            <li>• <strong>No Wrapping:</strong> Same token on every chain</li>
            <li>• <strong>Secure:</strong> Powered by LayerZero V2</li>
          </ul>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">📜 Contracts</button>
          <div className="space-y-2 text-sm">
            <div>
              <button type="button" className="mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">Base</button>
              <MiniAppExternalLink
                href={`${baseExplorer}/address/${baseTokenAddress}`}
                className="font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all"
              >
                {baseTokenAddress}
              </MiniAppExternalLink>
            </div>
            <div>
              <button type="button" className="mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">Arbitrum</button>
              <MiniAppExternalLink
                href={`${arbitrumExplorer}/address/${arbitrumTokenAddress}`}
                className="font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all"
              >
                {arbitrumTokenAddress}
              </MiniAppExternalLink>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[color:var(--brand-sun)]/20 rounded-lg border border-[color:var(--brand-sun)]/40">
          <button type="button" className="w-full rounded-2xl border border-[color:var(--brand-sun)]/50 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/85">⚡ LayerZero-Native: This miniapp exclusively features LayerZero-enabled contracts. All functionality leverages omnichain messaging for true cross-chain interoperability.</button>
        </div>

        <OnchainSdkPanel />
      </div>
    </div>
  );
}
