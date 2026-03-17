# ONabat Miniapp

ONabat is a Next.js 15 miniapp for interacting with ONBT across Base and Arbitrum.

## Features

- Token transfers on selected chain
- Private sale purchases (ETH, USDC, USDT)
- Governance proposal reads and on-chain voting
- LayerZero bridge transfers between Base and Arbitrum
- Staking, rewards, claim, compound, and delegation
- Per-use-case chain selector on every contract page
- Automatic wallet chain-switch prompt before write operations

## Tech Stack

- Next.js 15 (App Router)
- React 18 + TypeScript
- wagmi + viem
- @tanstack/react-query
- @coinbase/onchainkit
- Tailwind CSS

## Project Structure

```
miniapp/
├── app/                  # Next.js app router
├── components/           # UI and contract interfaces
├── config/               # Contracts, wagmi setup, ABIs
├── lib/                  # Utilities (tx status, helpers)
├── providers.tsx         # Wagmi + Query + OnchainKit providers
└── App.tsx               # Main tabbed miniapp shell
```

## Setup

1) Install dependencies

```bash
cd miniapp
npm install
```

2) Create `.env.local`

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_URL=https://your-app-domain.example
QUANTUM_ADMIN_TOKEN=QuantumLayer
NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN=QuantumLayer
CDP_API_KEY_ID=your_cdp_api_key_id
CDP_API_KEY_SECRET=your_cdp_api_key_secret
AGENTKIT_NETWORK_ID=base
AGENTKIT_ADMIN_TOKEN=QuantumLayer
NEXT_PUBLIC_AGENTKIT_ADMIN_TOKEN=QuantumLayer
```

3) Start dev server

```bash
npm run dev
```

4) Build and run production locally

```bash
npm run build
npm start
```

## Chain Selection Model

Each feature page has its own chain selection state:

- Reads pass `chainId: selectedChainId` to target the selected chain
- Writes verify connected wallet chain matches selected chain
- If mismatch, UI calls `switchChain({ chainId: selectedChainId })`
- User confirms switch in wallet, then retries action

## Key Files

- `App.tsx` - Main tab shell and feature navigation
- `components/ChainSelector.tsx` - Shared Base/Arbitrum switcher
- `components/TokenInterface.tsx`
- `components/PrivateSaleInterface.tsx`
- `components/GovernanceInterface.tsx`
- `components/BridgeInterface.tsx`
- `components/StakingInterface.tsx`
- `config/contracts.ts` - Contract addresses and ABI exports
- `config/wagmi.ts` - Multi-chain wagmi config and connectors

## Documentation

- `ARCHITECTURE.md` - System architecture and design decisions
- `DEVELOPMENT.md` - Contributor workflow, coding patterns, and verification

## Deployment

Deploy from repo `main` branch on Vercel.

Required Vercel env vars:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` (optional but recommended)
- `NEXT_PUBLIC_URL`
- `QUANTUM_ADMIN_TOKEN`
- `NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN`
- `CDP_API_KEY_ID`
- `CDP_API_KEY_SECRET`
- `AGENTKIT_NETWORK_ID`
- `AGENTKIT_ADMIN_TOKEN`
- `NEXT_PUBLIC_AGENTKIT_ADMIN_TOKEN`

## Dependency Feature Coverage

The miniapp intentionally maps dependencies to feature responsibilities:

- `@coinbase/onchainkit`: MiniKit compatibility, wallet UX, identity components
- `wagmi`: wallet connectors, chain switching, typed contract reads/writes
- `viem`: ABI-safe argument formatting, parsing, and address checks
- `@tanstack/react-query`: live polling, stale-time control, and smooth refresh UX
- `next`: metadata tags + `/.well-known/farcaster.json` endpoint for discovery/indexing

This mapping is reflected in the in-app About section under Runtime Readiness.

## Base App Indexing Checklist

To ensure the app is indexable in Base/Farcaster surfaces:

1. Set a public HTTPS URL in `NEXT_PUBLIC_URL`
2. Ensure `.well-known` manifest route is reachable:
	- `https://<your-domain>/.well-known/farcaster.json`
3. Set `NEXT_PUBLIC_BASE_APP_BUILDER_CODE` and `NEXT_PUBLIC_FARCASTER_FID`
4. Keep `base:app_id` and `fc:miniapp` metadata tags enabled in `app/layout.tsx`
5. Keep `minikit.config.ts` account association aligned with your production domain

## Notes

- Contract addresses and supported chains are defined in `config/contracts.ts`
- Keep ABI changes and address changes together in the same PR
- Run type-check before pushing changes
