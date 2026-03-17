import React from 'react';
import packageJson from '@/package.json';
import { BASE_APP_ID, FARCASTER_FID } from '@/minikit.config';

type SdkItem = {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  runtime: string;
};

const sdkItems: SdkItem[] = [
  {
    id: 'onchainkit',
    name: 'OnchainKit',
    version: packageJson.dependencies['@coinbase/onchainkit'] || 'n/a',
    capabilities: ['Wallet UI', 'Identity', 'Transaction Components'],
    runtime: 'Client Provider + MiniKit manifest',
  },
  {
    id: 'wagmi',
    name: 'wagmi',
    version: packageJson.dependencies.wagmi || 'n/a',
    capabilities: ['Wallet connection', 'Contract reads/writes', 'Chain switching'],
    runtime: 'Feature tabs and transaction flows',
  },
  {
    id: 'viem',
    name: 'viem',
    version: packageJson.dependencies.viem || 'n/a',
    capabilities: ['ABI-safe calls', 'Value parsing', 'Address validation'],
    runtime: 'All onchain tab contract interactions',
  },
  {
    id: 'query',
    name: '@tanstack/react-query',
    version: packageJson.dependencies['@tanstack/react-query'] || 'n/a',
    capabilities: ['Live polling', 'Stale-time controls', 'Efficient refresh'],
    runtime: 'Tab freshness and realtime UI updates',
  },
  {
    id: 'next',
    name: 'Next.js',
    version: packageJson.dependencies.next || 'n/a',
    capabilities: ['App Router', 'Metadata tags', 'Well-known route support'],
    runtime: 'Base app indexing + miniapp discoverability',
  },
];

function envReady(value?: string) {
  return Boolean(value && value.trim().length > 0 && !value.includes('your_'));
}

export function OnchainSdkPanel() {
  const onchainKitReady = envReady(process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY);
  const walletConnectReady = envReady(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);
  const appUrlReady = envReady(process.env.NEXT_PUBLIC_URL);
  const baseAddressReady = envReady(process.env.NEXT_PUBLIC_ONBT_BASE_ADDRESS);
  const arbAddressReady = envReady(process.env.NEXT_PUBLIC_ONBT_ARBITRUM_ADDRESS);
  const stakingBaseReady = envReady(process.env.NEXT_PUBLIC_ONBT_STAKING_BASE_ADDRESS);
  const stakingArbitrumReady = envReady(process.env.NEXT_PUBLIC_ONBT_STAKING_ARBITRUM_ADDRESS);
  const saleBaseReady = envReady(process.env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS);
  const saleArbitrumReady = envReady(process.env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS);
  const fidReady = envReady(process.env.NEXT_PUBLIC_FARCASTER_FID);
  const builderCodeReady = envReady(process.env.NEXT_PUBLIC_BASE_APP_BUILDER_CODE);
  const appIdReady = BASE_APP_ID.trim().length > 0;
  const manifestRouteReady = true;
  const secureAppUrl = (process.env.NEXT_PUBLIC_URL || '').startsWith('https://');

  const readinessItems = [
    { label: 'Public App URL', ok: appUrlReady },
    { label: 'HTTPS Public URL', ok: secureAppUrl },
    { label: 'OnchainKit API Key', ok: onchainKitReady },
    { label: 'WalletConnect Project ID', ok: walletConnectReady },
    { label: 'Hub ONBT Address (Base)', ok: baseAddressReady },
    { label: 'Destination ONBT Address (Arbitrum)', ok: arbAddressReady },
    { label: 'Staking Address (Base)', ok: stakingBaseReady },
    { label: 'Staking Address (Arbitrum)', ok: stakingArbitrumReady },
    { label: 'Private Sale Address (Base)', ok: saleBaseReady },
    { label: 'Private Sale Address (Arbitrum)', ok: saleArbitrumReady },
    { label: `Farcaster FID (${FARCASTER_FID || 0})`, ok: fidReady },
    { label: 'Base Builder Code', ok: builderCodeReady },
    { label: `Base App ID (${BASE_APP_ID})`, ok: appIdReady },
    { label: 'Manifest Route /.well-known/farcaster.json', ok: manifestRouteReady },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
        <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]">🧩 Onchain SDK Stack</button>
        <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/75">
          This miniapp uses a dependency-aware architecture with wagmi + viem + React Query + OnchainKit for live,
          tab-driven contract UX and Base miniapp compatibility.
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sdkItems.map((sdk) => (
          <div
            key={sdk.id}
            className="p-4 rounded-lg border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/90"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-sm font-semibold text-[color:var(--brand-ink)]">{sdk.name}</button>
                <button type="button" className="mt-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">{sdk.version}</button>
              </div>
              <button type="button" className="text-[10px] px-2 py-1 rounded-full border border-[color:var(--brand-leaf)]/30 text-[color:var(--brand-forest)] bg-[color:var(--brand-sand)]">
                Active
              </button>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-[color:var(--brand-ink)]/75">
              {sdk.capabilities.map((capability) => (
                <li key={capability}>• {capability}</li>
              ))}
            </ul>
            <button type="button" className="mt-3 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/65">Runtime: {sdk.runtime}</button>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-[color:var(--brand-sun)]/45 bg-[color:var(--brand-sun)]/20">
        <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]">⚙️ Runtime Readiness</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {readinessItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2 rounded-md bg-[color:var(--brand-cream)] px-3 py-2">
              <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75">{item.label}</button>
              <button type="button" className={`rounded-full border px-2.5 py-1 font-semibold ${item.ok ? 'border-emerald-300 bg-emerald-50 text-[color:var(--brand-forest)]' : 'border-rose-300 bg-rose-50 text-red-700'}`}>
                {item.ok ? 'Ready' : 'Missing'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnchainSdkPanel;
