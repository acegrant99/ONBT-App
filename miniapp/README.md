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

## Notes

- Contract addresses and supported chains are defined in `config/contracts.ts`
- Keep ABI changes and address changes together in the same PR
- Run type-check before pushing changes
