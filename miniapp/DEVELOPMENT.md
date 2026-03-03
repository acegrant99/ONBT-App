# Development Guide

This guide documents local workflow, coding patterns, and quality checks for the ONabat miniapp.

## Prerequisites

- Node.js 18+
- npm
- Wallet extension (MetaMask / Coinbase Wallet) for manual testing

## Local Setup

```bash
cd miniapp
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_URL=http://localhost:3000
```

Run dev server:

```bash
npm run dev
```

## Build and Type Validation

```bash
npm run type-check
npm run build
```

Run these before committing frontend changes.

## Core Implementation Pattern

### 1) Per-use-case chain selection

Each contract page manages its own selected chain state:

```ts
const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(8453);
```

Render shared selector:

```tsx
<ChainSelector
  label="Use case chain"
  selectedChainId={selectedChainId}
  onSelectChain={setSelectedChainId}
/>
```

### 2) Contract reads on selected chain

Always include `chainId` in reads:

```ts
useReadContract({
  chainId: selectedChainId,
  address,
  abi,
  functionName,
});
```

### 3) Wallet-switch guard before writes

Before every write transaction:

```ts
if (chain?.id !== selectedChainId) {
  switchChain({ chainId: selectedChainId });
  return;
}
```

Then execute write call.

## Transaction Status Pattern

Use global publisher to keep UX consistent:

- `pending` when wallet submission starts
- `confirming` while waiting for receipt
- `success` on confirmation
- `error` on failure

Utility location:

- `lib/txStatus.ts`

## Adding a New Contract Page

1. Create component in `components/`
2. Add chain selector state (`selectedChainId`)
3. Add `chainId` to all reads
4. Add wallet-switch guard before all writes
5. Export component from `components/index.ts`
6. Add tab entry in `App.tsx`
7. Update `README.md` and `ARCHITECTURE.md` if behavior changed
8. Run type-check and build

## Styling Rules

- Use existing Tailwind + brand tokens already in project
- Do not introduce new ad-hoc color systems
- Keep interactions simple and explicit
- Keep warning and status messages readable on light backgrounds

## Troubleshooting

### Wallet switch does not happen

- Confirm `useSwitchChain()` is imported and initialized
- Confirm write handler checks `chain?.id !== selectedChainId`
- Confirm selected chain is one of `8453` or `42161`

### Read data appears from wrong chain

- Ensure read hook includes `chainId: selectedChainId`
- Ensure selected contract address resolves from selected chain config

### Governance reads/writes wrong contract

- Verify `ONBT_GOVERNOR_BASE_ADDRESS` and `ONBT_GOVERNOR_ARBITRUM_ADDRESS`
- Verify `ONBT_GOVERNOR_ABI` includes called function signatures

## Branching and PR Guidance

- Keep UI + contract config changes in same PR when coupled
- Keep docs updated for new tabs/features
- Prefer small, focused PRs with passing type-check
