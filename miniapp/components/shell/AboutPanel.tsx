import React from 'react';
import { OnchainSdkPanel } from '@/components';

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
      <h2 className="text-2xl font-semibold brand-display mb-4">
        About ONBT
      </h2>
      <div className="space-y-4 text-[color:var(--brand-ink)]/80">
        <p>
          <strong className="text-[color:var(--brand-forest)]">Omnichain Nabat Token (ONBT)</strong> is
          a LayerZero V2 Omnichain Fungible Token (OFT) that exists natively across multiple blockchains.
        </p>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <h3 className="font-semibold text-[color:var(--brand-ink)] mb-2">🔗 Supported Chains</h3>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Base</strong> (Hub Chain) - EID 30184</li>
            <li>• <strong>Arbitrum</strong> - EID 30110</li>
          </ul>
        </div>
        <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
          <h3 className="font-semibold text-[color:var(--brand-ink)] mb-2">✨ Features</h3>
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
          <h3 className="font-semibold text-[color:var(--brand-ink)] mb-2">📜 Contracts</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-[color:var(--brand-ink)]/60 mb-1">Base:</p>
              <a
                href={`${baseExplorer}/address/${baseTokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all"
              >
                {baseTokenAddress}
              </a>
            </div>
            <div>
              <p className="text-[color:var(--brand-ink)]/60 mb-1">Arbitrum:</p>
              <a
                href={`${arbitrumExplorer}/address/${arbitrumTokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all"
              >
                {arbitrumTokenAddress}
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[color:var(--brand-sun)]/20 rounded-lg border border-[color:var(--brand-sun)]/40">
          <p className="text-sm">
            <strong>⚡ LayerZero-Native:</strong> This miniapp exclusively features LayerZero-enabled
            contracts. All functionality leverages omnichain messaging for true cross-chain interoperability.
          </p>
        </div>

        <OnchainSdkPanel />
      </div>
    </div>
  );
}
