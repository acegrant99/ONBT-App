# ONabat Miniapp Architecture

## Overview

The ONabat miniapp is a Next.js 15 application providing a unified interface for interacting with the Omnichain Nabat Token (ONBT) ecosystem across Base and Arbitrum blockchains.

**Key Design Principle**: Per-use-case chain selection with automatic wallet switching

Users can select Base or Arbitrum independently for each contract operation, and the wallet automatically prompts to switch networks when needed before executing transactions.

---

## Directory Structure

```
miniapp/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Tailwind + base styles
│   ├── page.tsx                 # Entry point (renders App.tsx)
│   └── api/                     # API routes (if needed)
│
├── components/                  # React components
│   ├── TokenInterface.tsx       # ONBT token transfer
│   ├── PrivateSaleInterface.tsx # Token purchase
│   ├── GovernanceInterface.tsx  # DAO voting
│   ├── BridgeInterface.tsx      # LayerZero transfers
│   ├── StakingInterface.tsx     # Multi-chain staking
│   ├── ChainSelector.tsx        # Reusable chain picker
│   └── shell/                   # Shell components (future)
│
├── config/                      # Configuration
│   ├── contracts.ts            # Contract addresses & ABIs
│   ├── wagmi.ts                # Wagmi configuration
│   ├── index.ts                # Config exports
│   └── abis/                   # Contract ABIs
│
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities (txStatus, etc.)
├── providers.tsx               # Context providers wrapper
├── App.tsx                     # Main app with page tabs
├── package.json                # Dependencies
└── tsconfig.json              # TypeScript config
```

---

## Data Layer

### Wagmi + viem
- **Chains**: Base (8453) + Arbitrum (42161)
- **Connectors**: MetaMask, Injected, WalletConnect, Coinbase Wallet
- **Transports**: HTTP RPC for both chains

### Contract Interaction Pattern
```typescript
// Read: Target selected chain via chainId parameter
const { data: balance } = useReadContract({
  chainId: selectedChainId,        // User-selected chain
  address: tokenAddress,
  abi: TOKEN_ABI,
  functionName: 'balanceOf',
  args: [userAddress],
});

// Write: Check wallet chain before executing
const handleTransfer = () => {
  if (chain?.id !== selectedChainId) {
    switchChain({ chainId: selectedChainId }); // Prompt wallet switch
    return;
  }
  transfer({ /* transaction */ });
};
```

---

## Component Architecture

### Page Components (Tabs)

Each page component follows a consistent pattern:

#### 1. **TokenInterface**
- **Purpose**: View balance, transfer ONBT
- **Features**:
  - Per-chain balance display
  - Transfer to recipient address
  - Transaction status tracking
- **Chain Support**: Base + Arbitrum (per-use-case selection)

#### 2. **PrivateSaleInterface**
- **Purpose**: Purchase ONBT with stablecoins/ETH
- **Features**:
  - Payment token selection (ETH, USDC, USDT)
  - Real-time pricing
  - Approval flow
- **Chain Support**: Base + Arbitrum

#### 3. **GovernanceInterface**
- **Purpose**: On-chain DAO voting
- **Features**:
  - Proposal state viewing
  - Voting power calculation
  - Vote casting on-chain
- **Uses**: ONBTGovernor contract (not staking delegation)
- **Chain Support**: Base + Arbitrum

#### 4. **BridgeInterface**
- **Purpose**: Cross-chain transfers via LayerZero
- **Features**:
  - Source chain selection (auto-sets destination to opposite)
  - Balance display
  - Fee estimation
- **Uses**: OmnichainNabatOFT LayerZero V2
- **Chain Support**: Base → Arbitrum, Arbitrum → Base

#### 5. **StakingInterface**
- **Purpose**: Multi-chain staking with rewards
- **Features**:
  - Multiple lockup periods
  - Bonus calculation
  - Rewards display
  - Delegation tracking
- **Chain Support**: Base + Arbitrum (independent staking)

### Reusable Components

#### **ChainSelector**
```tsx
<ChainSelector
  label="Use case chain"
  selectedChainId={selectedChainId}
  onSelectChain={setSelectedChainId}
/>
```
- Simple Base/Arbitrum toggle
- Used in all contract interface pages
- Drives chainId parameter for reads
- Triggers switchChain before writes

---

## State Management

### Local Component State
- React `useState` for UI state (tabs, inputs, form data)
- `selectedChainId`: User's per-use-case chain choice

### Remote State (wagmi)
- `useReadContract()`: Contract data reads (auto-refetch)
- `useWriteContract()`: Transaction writes
- `useWaitForTransactionReceipt()`: TX confirmation tracking
- `useSwitchChain()`: Wallet network switching

### Global State
- Wagmi config (chains, connectors, transports)
- React Query client (caching, refetch intervals)
- OnchainKit provider (Identity components)

---

## Transaction Flow

```
User clicks action
    ↓
Check if wallet chain matches selectedChainId
    ├─ YES: Execute contract write
    ├─ NO: Call switchChain() → prompt wallet
    │      ↓
    │      Wallet switches
    │      ↓
    │      Execute contract write
    │
    ↓
Write transaction submitted
    ↓
Wait for confirmation (useWaitForTransactionReceipt)
    ↓
On success: Refetch contract data
    ↓
Update UI with new state
    ↓
Publish TX status (publishGlobalTxStatus)
```

---

## Styling System

### Tailwind CSS
- Base styles in `app/globals.css`
- Component styles via class names
- CSS custom properties for theming:
  - `--brand-forest`: Primary color (emerald-700)
  - `--brand-leaf`: Secondary color (emerald-300)
  - `--brand-cream`: Background (emerald-50)
  - `--brand-ink`: Text (gray-900)

### OnchainKit Components
- Identity (Avatar, Name, Address)
- Wallet (ConnectWallet button)
- Styled with OnchainKit CSS

---

## Provider Stack (app/layout.tsx)

```
<html>
  <body>
    <ClientProviders>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider chain={base}>
            {children}  ← App.tsx renders here
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ClientProviders>
  </body>
</html>
```

---

## Configuration

### Contract Addresses (config/contracts.ts)

```typescript
export const CHAIN_CONFIG = {
  base: {
    name: 'Base',
    blockExplorer: 'https://basescan.org',
    tokenAddress: '0x05aA0C...',
    stakingAddress: '0xf51Be1...',
    governorAddress: '0xf41971...',
    privateSaleAddress: '0xEA52c0...',
  },
  arbitrum: {
    name: 'Arbitrum',
    blockExplorer: 'https://arbiscan.io',
    tokenAddress: '0x169aC7...',
    stakingAddress: '0x4E8cF6...',
    governorAddress: '0x1e8C14...',
    privateSaleAddress: '0xD9df78...',
  },
};
```

### Environment Variables (.env.local)
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect V2 project ID
- `NEXT_PUBLIC_URL`: App URL (for metadata/OG tags)

---

## Key Design Decisions

### 1. Per-Use-Case Chain Selection
- Users choose chain for each contract interaction independently
- No global "connected chain" requirement
- Avoids friction from constant network switching

### 2. Automatic Wallet Switching
- Before writes: check if wallet is on selected chain
- If not: call `switchChain()` → let wallet prompt user
- Only execute write after wallet confirms switch

### 3. Wagmi for Contract Interaction
- React hooks for contract reads/writes
- Automatic data refetching
- Built-in gas estimation + error handling
- Multi-chain out of the box

### 4. OnchainKit UI Components
- Identity display (avatar, name, address)
- Wallet connection (supports all major wallets)
- Consistent Coinbase design system

### 5. Centralized Contract Config
- Single source of truth for addresses/ABIs
- Easy to deploy to new chains
- Clear contract interface definitions

---

## Adding a New Contract Interface

1. **Create component** (e.g., `components/MyInterface.tsx`)
   - Accept `selectedChainId` state
   - Use `ChainSelector` for chain picker
   - Add wallet switch checks before writes

2. **Export from** `components/index.ts`

3. **Add tab to App.tsx**
   ```tsx
   const TABS = [
     // ... existing
     { id: 'myfeature', label: 'My Feature', description: '...' },
   ];
   ```

4. **Add contracts to config** (if needed)
   - Update `CHAIN_CONFIG` with addresses
   - Define ABI in `config/abis/`

---

## Performance Optimizations

- **Query caching**: React Query caches contract reads
- **Refetch intervals**: Automatic data refresh (tuned per contract)
- **Lazy loading**: Components render only when tab is active
- **SSR disabled**: `export const dynamic = 'force-dynamic'` (query client in browser)

---

## Deployment

### Vercel
1. App automatically deploys on `main` branch push
2. Environment variables set in Vercel dashboard
3. Production URL: https://miniapp-dppjpl2kt-nabat-omnichain-genesis-government.vercel.app

### Build Process
```bash
npm run build     # TypeScript + Next.js build
npm run dev       # Local development
npm run lint      # ESLint check
```

---

## Troubleshooting

### "Wallet is on wrong chain" warning
- User's wallet is connected to different chain than `selectedChainId`
- Click button to trigger automatic `switchChain()` prompt

### "Contract read failed"
- Check if contract address is correct in `config/contracts.ts`
- Verify ABI matches contract interface
- Check if RPC endpoint is responding

### "Cannot find module 'wagmi'"
- Run `npm install` in miniapp directory
- Check `package.json` has wagmi, viem, @tanstack/react-query

