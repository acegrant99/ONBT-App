import React from 'react';

type SdkItem = {
  id: string;
  name: string;
  network: string;
  capabilities: string[];
  fileRef: string;
};

const sdkItems: SdkItem[] = [
  {
    id: 'onchainkit',
    name: 'OnchainKit',
    network: 'Base',
    capabilities: ['Wallet UI', 'Identity', 'Transaction Components'],
    fileRef: 'integrations/coinbase/onchainkit.mjs',
  },
  {
    id: 'wallet-sdk',
    name: 'Coinbase Wallet SDK',
    network: 'Base',
    capabilities: ['Connect Wallet', 'Network Switching', 'Sign Message'],
    fileRef: 'integrations/coinbase/wallet-sdk.mjs',
  },
  {
    id: 'cdp-sdk',
    name: 'CDP SDK',
    network: 'Base',
    capabilities: ['Programmatic Wallets', 'Transfers', 'Contract Invocation'],
    fileRef: 'integrations/coinbase/cdp-sdk.mjs',
  },
  {
    id: 'multi-chain',
    name: 'Multi-chain SDK Stubs',
    network: 'Arbitrum / Optimism / Polygon / BSC / Avalanche / Ethereum',
    capabilities: ['Cross-chain Utilities', 'Network Expansion Path'],
    fileRef: 'integrations/*/*-sdk.mjs',
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

  const readinessItems = [
    { label: 'Public App URL', ok: appUrlReady },
    { label: 'OnchainKit API Key', ok: onchainKitReady },
    { label: 'WalletConnect Project ID', ok: walletConnectReady },
    { label: 'Hub ONBT Address (Base)', ok: baseAddressReady },
    { label: 'Destination ONBT Address (Arbitrum)', ok: arbAddressReady },
    { label: 'Staking Address (Base)', ok: stakingBaseReady },
    { label: 'Staking Address (Arbitrum)', ok: stakingArbitrumReady },
    { label: 'Private Sale Address (Base)', ok: saleBaseReady },
    { label: 'Private Sale Address (Arbitrum)', ok: saleArbitrumReady },
    { label: 'Farcaster FID', ok: fidReady },
    { label: 'Base Builder Code', ok: builderCodeReady },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
        <h3 className="font-semibold text-[color:var(--brand-ink)] mb-2">🧩 Onchain SDK Stack</h3>
        <p className="text-sm text-[color:var(--brand-ink)]/75">
          This miniapp now uses the onchain SDK modules mapped from your integrations workspace for wallet UX,
          transactions, and chain-ready expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sdkItems.map((sdk) => (
          <div
            key={sdk.id}
            className="p-4 rounded-lg border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/90"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[color:var(--brand-ink)]">{sdk.name}</p>
                <p className="text-xs text-[color:var(--brand-ink)]/60 mt-0.5">{sdk.network}</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full border border-[color:var(--brand-leaf)]/30 text-[color:var(--brand-forest)] bg-[color:var(--brand-sand)]">
                Active
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-[color:var(--brand-ink)]/75">
              {sdk.capabilities.map((capability) => (
                <li key={capability}>• {capability}</li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] text-[color:var(--brand-ink)]/55">Source: {sdk.fileRef}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-[color:var(--brand-sun)]/45 bg-[color:var(--brand-sun)]/20">
        <h4 className="font-semibold text-[color:var(--brand-ink)] text-sm mb-2">⚙️ Runtime Readiness</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {readinessItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2 rounded-md bg-[color:var(--brand-cream)] px-3 py-2">
              <span className="text-[color:var(--brand-ink)]/75">{item.label}</span>
              <span className={item.ok ? 'text-[color:var(--brand-forest)]' : 'text-red-700'}>
                {item.ok ? 'Ready' : 'Missing'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnchainSdkPanel;
