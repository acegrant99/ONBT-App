# ONBT DeFi Miniapp

OnchainKit-powered miniapp for the Omnichain Nabat Token (ONBT) DeFi ecosystem on Base.

## Features

- 🔐 **Staking**: Stake ONBT with lockup bonuses up to 3x
- 🔄 **Swapping**: Trade ONBT/ETH with low fees
- 💧 **Liquidity**: Provide liquidity and earn fees
- 💰 **Yield**: Automatic yield distribution
- 🎨 **OnchainKit**: Built with Coinbase's OnchainKit components
- ⚡ **Base**: Native Base chain integration

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Base RPC access

### Installation

```bash
cd miniapp
npm install
```

### Configuration

1. Create `.env.local`:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_id
NEXT_PUBLIC_ONBT_TOKEN=0x...
NEXT_PUBLIC_STAKING=0x...
NEXT_PUBLIC_POOL=0x...
NEXT_PUBLIC_DISTRIBUTOR=0x...
NEXT_PUBLIC_FACTORY=0x...
```

2. Update contract addresses in `config/contracts.ts`

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
vercel
```

## Components

### StakingInterface

Comprehensive staking interface with:
- Multiple lockup periods (0-365 days)
- Bonus multipliers (1x-3x)
- Real-time rewards display
- Compound functionality
- Withdraw controls

### SwapInterface

AMM swap interface featuring:
- ONBT ↔ ETH swaps
- Real-time price calculation
- Slippage protection
- Price impact display
- Transaction tracking

### LiquidityInterface (Coming Soon)

Liquidity provision with:
- Add/remove liquidity
- LP token management
- Fee earnings display
- Position tracking

## Tech Stack

- **React** 18 + **TypeScript**
- **Next.js** 14
- **OnchainKit** 1.1+ (Coinbase)
- **wagmi** 2.0+ (React Hooks)
- **viem** 2.0+ (Ethereum library)
- **Tailwind CSS** 3.3+

## Architecture

```
miniapp/
├── components/
│   ├── StakingInterface.tsx    # Staking UI
│   ├── SwapInterface.tsx        # Swap UI
│   └── [more components]
├── config/
│   └── contracts.ts             # Contract addresses & ABIs
├── hooks/
│   └── [custom hooks]
├── utils/
│   └── [utility functions]
├── App.tsx                      # Main app component
└── package.json
```

## Usage Examples

### Stake ONBT

```typescript
import { StakingInterface } from './components/StakingInterface';

function MyApp() {
  return <StakingInterface />;
}
```

### Swap Tokens

```typescript
import { SwapInterface } from './components/SwapInterface';

function MyApp() {
  return <SwapInterface />;
}
```

## Smart Contracts

| Contract | Purpose |
|----------|---------|
| ONBTStaking | Stake ONBT, earn rewards |
| ONBTLiquidityPool | AMM for ONBT/ETH |
| ONBTYieldDistributor | Distribute yield |
| ONBTDeFiFactory | Deploy ecosystem |

See [DEFI_ECOSYSTEM.md](../DEFI_ECOSYSTEM.md) for complete documentation.

## Security

- ✅ All contracts audited (recommended)
- ✅ ReentrancyGuard on state changes
- ✅ SafeERC20 for transfers
- ✅ Pausable mechanisms
- ✅ Access control

## Support

- **Website**: https://nabat.finance
- **GitHub**: https://github.com/acegrant99/ONBT-App
- **Twitter**: @nabatfinance
- **Discord**: [Join Server]

## License

MIT License
