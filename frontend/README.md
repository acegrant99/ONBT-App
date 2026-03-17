# ONBT Frontend

React/Web3 frontend for the ONBT Omnichain Ecosystem.

## Features

- 🔗 **Wallet Connection** - Multi-wallet support via ConnectKit
- 💰 **Staking** - Stake ONBT and earn rewards
- 🌉 **Cross-Chain Bridge** - Transfer ONBT between Base and Arbitrum
- 🏆 **Achievements** - Earn and view NFT achievements
- 📊 **Dashboard** - View holdings, rewards, and activity
- 🗳️ **Governance** - Participate in protocol governance
- ⚡ **Real-time Updates** - Live contract data via wagmi/react-query

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Wagmi v2** - Ethereum wallet client
- **Viem v2** - Low-level Ethereum primitives
- **TanStack React Query** - Server state management
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Prerequisites

- Node.js 18+
- npm or yarn
- Wallet Connect project ID (from [walletconnect.com](https://walletconnect.com))
- Alchemy API keys (from [alchemy.com](https://alchemy.com))

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your values:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_id_here

VITE_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration (contract addresses, chains)
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Hooks

### `useONBTBalance()`

Get user's ONBT token balance.

```typescript
const { balance, formatted } = useONBTBalance()
```

### `useStakingInfo()`

Get staking information for current user.

```typescript
const { stakedAmount, startTime, lastRewardTime, pendingRewards } = useStakingInfo()
```

### `useStake(amount)`

Stake ONBT tokens.

```typescript
const { stake, isLoading, isSuccess } = useStake('100')
await stake?.()
```

### `useUnstake(amount)`

Unstake ONBT tokens.

```typescript
const { unstake, isLoading, isSuccess } = useUnstake('50')
await unstake?.()
```

### `useClaimRewards()`

Claim pending staking rewards.

```typescript
const { claim, isLoading, isSuccess } = useClaimRewards()
await claim?.()
```

### `useAchievementNFTs()`

Get user's achievement NFT count.

```typescript
const { count } = useAchievementNFTs()
```

### `useApproveToken(spender, amount)`

Approve token spending for a contract.

```typescript
const { approve, isLoading } = useApproveToken(stakingAddress, '1000')
await approve?.()
```

## Contract Integration

Contract addresses are automatically loaded from the deployment files in the parent directory:

- Base: `../deploy/deployment-lzv2-resume-base-stakingfix-*.json`
- Arbitrum: `../deploy/deployment-lzv2-resume-arbitrum-stakingfix-*.json`

Access them via:

```typescript
import { getContractAddresses, CONTRACTS } from '@config/contracts'

const addresses = getContractAddresses(8453) // Base
```

## Build

```bash
npm run build
```

Outputs to `dist/` directory.

## Preview

```bash
npm run preview
```

## Type Checking

```bash
npm run type-check
```

## Linting

```bash
npm run lint
```

## Configuration

### Supported Networks

- **Base** (Chain ID: 8453)
- **Arbitrum One** (Chain ID: 42161)

Both networks are configured in `src/config/contracts.ts`.

### Adding New Networks

1. Update `src/config/contracts.ts`
2. Add deployment configuration
3. Update `SUPPORTED_CHAINS` array

### Environment Variables

- `VITE_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `VITE_BASE_RPC_URL` - Base RPC endpoint
- `VITE_ARBITRUM_RPC_URL` - Arbitrum RPC endpoint
- `VITE_ENABLE_TESTNET` - Enable testnet features
- `VITE_ENABLE_ANALYTICS` - Enable analytics

## Development Tips

### Hot Module Replacement (HMR)

Changes to React components/styles are instantly reflected in the browser without full page reload.

### Contract ABIs

Contract ABIs are in the parent directory's `artifacts/` folder. Import them as needed:

```typescript
import { abi as ONBTTokenABI } from '../../artifacts/contracts/token/ONBTToken.sol/ONBTToken.json'
```

### React Query Devtools

React Query devtools are included in development mode (bottom-right corner).

### Network Switching

Users can switch networks via their wallet. The app automatically updates contract interactions for the selected network.

## Deployment

### Vercel

```bash
npm run build
vercel deploy
```

### Self-hosted

```bash
npm run build
# Serve dist/ folder with your web server
```

### Environment Setup for Production

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_production_id
VITE_BASE_RPC_URL=https://prod-base-rpc.com
VITE_ARBITRUM_RPC_URL=https://prod-arbitrum-rpc.com
VITE_ENABLE_ANALYTICS=true
```

## Troubleshooting

### Wallet not connecting

1. Check `VITE_WALLET_CONNECT_PROJECT_ID` is set
2. Verify wallet is on Base or Arbitrum network
3. Try clearing browser cache

### Contract read/write failing

1. Ensure wallet is on correct network
2. Check contract addresses in deployment files
3. Verify RPC URLs are valid
4. Check user has sufficient balance and gas

### Build errors

1. Run `npm install` to update dependencies
2. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run type-check`

## Support

- **Documentation:** See `../FRONTEND-INTEGRATION.md` in parent directory
- **Contract Info:** See `../DEPLOYMENT-STATUS.md`
- **Monitoring:** Use tools in `../scripts/` directory

## License

MIT
