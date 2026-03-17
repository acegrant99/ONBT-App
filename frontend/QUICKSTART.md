# ONBT Frontend - Quick Start Guide

**Last Updated:** February 21, 2026  
**Status:** ✅ Ready for Development

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Get WalletConnect Project ID

1. Go to [walletconnect.com](https://walletconnect.com)
2. Create new project
3. Copy project ID

### 3. Get Alchemy API Keys

1. Go to [alchemy.com](https://alchemy.com)
2. Create Base app → copy API key
3. Create Arbitrum app → copy API key

### 4. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here

VITE_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
VITE_ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✨

---

## 📋 Features Implemented

### ✅ Current Features
- [x] Wallet connection (ConnectKit + Wagmi)
- [x] Network switching (Base/Arbitrum)
- [x] Contract hooks (balance, staking, rewards)
- [x] Tailwind CSS styling
- [x] TypeScript configuration
- [x] Vite build setup
- [x] Environment configuration

### 🚧 Next to Implement
- [ ] Dashboard page with stats
- [ ] Staking interface
- [ ] Cross-chain bridge modal
- [ ] Achievements gallery
- [ ] Rewards claiming
- [ ] Governance interface
- [ ] Transaction history
- [ ] Portfolio tracking

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── hooks/              # Contract interaction hooks
│   ├── config/             # Contract addresses & chains
│   ├── components/         # Future: React components
│   ├── pages/              # Future: Page components
│   ├── utils/              # Future: Utility functions
│   ├── App.tsx             # Main component
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
└── README.md               # Full documentation
```

---

## 💡 Development Tips

### Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run type-check    # Check TypeScript
npm run lint          # Run ESLint
```

### Contract Addresses

Automatically loaded from parent deployment files:
```typescript
import { getContractAddresses } from '@config/contracts'

const { onbtToken, staking, achievementNFT } = getContractAddresses(8453)
```

### Using Contract Hooks

```typescript
import { useONBTBalance, useStakingInfo } from '@hooks/useContract'

export function Dashboard() {
  const { formatted: balance } = useONBTBalance()
  const { stakedAmount, pendingRewards } = useStakingInfo()
  
  return (
    <div>
      <p>Balance: {balance} ONBT</p>
      <p>Staked: {stakedAmount} ONBT</p>
      <p>Rewards: {pendingRewards} ONBT</p>
    </div>
  )
}
```

### Hot Reload

Changes to React components automatically reload without losing state.

### React Query Devtools

Open React Query devtools in browser:
- Bottom-right corner in development
- Shows all queries, mutations, and cache

---

## 🔗 Smart Contract Integration

All contracts automatically loaded from deployment files:

**Base Deployment:**
```
../deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json
```

**Arbitrum Deployment:**
```
../deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json
```

### Key Contracts

| Contract | Purpose | Hook |
|----------|---------|------|
| ONBT Token | Token balance & transfers | `useONBTBalance()` |
| Staking | Staking & rewards | `useStakingInfo()` / `useStake()` / `useClaimRewards()` |
| Achievement NFT | User achievements | `useAchievementNFTs()` |
| Rewards Pool | Reward distribution | (included in staking hook) |

---

## 🎨 Styling

### Tailwind CSS

All styles use Tailwind CSS configured in:
- `tailwind.config.ts` - Tailwind config
- `postcss.config.js` - PostCSS config
- `src/index.css` - Global styles & CSS variables

### Color Variables

```css
--primary: #7c3aed (Purple)
--secondary: #10b981 (Green)
--accent: #3b82f6 (Blue)
--background: Light/Dark mode
```

### Example Styling

```jsx
<div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-slate-300">Description</p>
</div>
```

---

## 🌐 Networks

### Base Mainnet
- **Chain ID:** 8453
- **RPC:** Alchemy or https://mainnet.base.org
- **Explorer:** https://basescan.org

### Arbitrum One
- **Chain ID:** 42161
- **RPC:** Alchemy or https://arb1.arbitrum.io/rpc
- **Explorer:** https://arbiscan.io

Both networks are auto-configured in `src/config/contracts.ts`.

---

## 🚨 Common Issues

### "Wallet not connecting"
- ✅ Check `VITE_WALLET_CONNECT_PROJECT_ID` in .env.local
- ✅ Verify wallet is on Base or Arbitrum
- ✅ Try refreshing page

### "Contract read failed"
- ✅ Verify RPC URLs are correct
- ✅ Check user is on correct network
- ✅ Ensure contract addresses match deployment files

### "Build error"
- ✅ Run `npm install` to update deps
- ✅ Check TypeScript: `npm run type-check`
- ✅ Clear cache: `rm -rf node_modules dist`

---

## 📚 Next Steps

1. **Implement Pages**
   - Create `components/` for reusable UI
   - Create `pages/Dashboard.tsx`, `Staking.tsx`, etc.
   - Add routing with React Router

2. **Build Features**
   - Staking interface
   - Cross-chain bridge
   - Achievement gallery
   - Governance voting

3. **Testing**
   - Unit tests (Vitest)
   - E2E tests (Playwright)
   - Contract interaction tests

4. **Deployment**
   - Deploy to Vercel
   - Configure custom domain
   - Setup CI/CD

---

## 📖 Documentation

- **Full Frontend Guide:** `../FRONTEND-INTEGRATION.md`
- **Contract Info:** `../DEPLOYMENT-STATUS.md`
- **Operations Guide:** `../OPERATIONS-GUIDE.md`
- **Smart Contracts:** `../contracts/`

---

## 🎯 Success Criteria

- [x] React/Vite project created
- [x] Wallet connection (ConnectKit)
- [x] Contract hooks implemented
- [x] Tailwind CSS configured
- [x] TypeScript setup
- [x] Environment configuration
- [x] Development server working
- [ ] Pages & components (next)
- [ ] Full feature implementation (next)
- [ ] Testing (next)

---

## 💬 Support

Need help?

1. **Check README.md** in this directory
2. **Review FRONTEND-INTEGRATION.md** for examples
3. **Check contract hooks** - most patterns already implemented
4. **React Query Devtools** - inspect cache/queries

---

**Ready to develop!** 🚀

Start with `npm run dev` and open http://localhost:3000

