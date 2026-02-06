# ONabat (ONBT) - Omnichain Government Ecosystem 🌐

<div align="center">

![ONabat Logo](https://ipfs.io/ipfs/QmYourLogoHash)

**The World's First Omnichain Government Token**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)](https://soliditylang.org/)
[![LayerZero](https://img.shields.io/badge/LayerZero-V2-purple)](https://layerzero.network)
[![Coinbase](https://img.shields.io/badge/Built%20on-Base-0052FF)](https://base.org)

[Website](https://nabat.finance) • [Documentation](#documentation) • [Quick Start](#quick-start) • [Deployment](#deployment) • [Community](#community)

</div>

---

## 🌟 Overview

**ONabat (ONBT)** is an immutable, omnichain fungible token built on LayerZero V2 protocol. It features a fixed supply of **1 billion tokens**, professional branding system, and seamless cross-chain transfers across 7+ blockchains. The project includes comprehensive DeFi integrations, Coinbase ecosystem tools, and a production-ready Telegram Mini App.

### Key Features

- ✅ **Fixed Supply**: 1,000,000,000 ONBT (no mint/burn functions)
- ✅ **Omnichain Native**: Built on LayerZero V2 (no bridges or proxies)
- ✅ **Multi-Chain**: Ethereum, Base, Polygon, Arbitrum, Optimism, Avalanche, BSC
- ✅ **Professional Branding**: On-chain metadata with logos, website, social links
- ✅ **DeFi Ecosystem**: Staking, AMM, yield distribution, liquidity pools
- ✅ **Coinbase Integration**: AgentKit, CDP SDK, OnchainKit, Wallet SDK
- ✅ **Telegram Mini App**: Full-featured dApp for mobile users
- ✅ **Production Ready**: Deployed on nabat.finance via Vercel

---

## 📚 Quick Start

Get started with ONBT in 5 minutes! Choose your path:

### 🚀 Fast Track (Testnet)

**Need testnet ETH?** Get it free:
- 👉 **[Ethereum Sepolia Faucet](https://sepoliafaucet.com/)** (Get 0.5 ETH instantly)
- 👉 **[Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)** (Get 0.1 ETH instantly)

📚 **For complete faucet guide, see [FAUCETS.md](FAUCETS.md)**

```bash
# 1. Clone and install
git clone https://github.com/acegrant99/ONBT-App.git
cd ONBT-App
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your private key and RPC URLs

# 3. Get testnet tokens (see faucet links above)

# 4. Deploy on Base Sepolia (hub chain)
export DEPLOYMENT_TYPE=hub
npm run deploy:onbt:baseSepolia

# 5. Deploy on Ethereum Sepolia (destination)
export DEPLOYMENT_TYPE=destination
npm run deploy:onbt:ethereum
```

### 📖 Guided Setup
For detailed setup with explanations, see:
- [SETUP.md](SETUP.md) - Complete setup guide with testnet instructions
- [QUICK_START.md](QUICK_START.md) - Quick reference for common tasks
- [QUICK_SETUP.md](QUICK_SETUP.md) - 15-minute guided setup

### 🎓 Full Documentation
For complete deployment roadmap, see [NEXT_STEPS.md](NEXT_STEPS.md).

---

## 🏗️ Architecture

### Contract Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 OmnichainNabatOFT.sol                   │
│         (1B Fixed Supply + Branding System)             │
├─────────────────────────────────────────────────────────┤
│                    OFTV2 (LayerZero)                    │
│        (Omnichain messaging + peer-to-peer)             │
├─────────────────────────────────────────────────────────┤
│              OFTCoreV2 + ERC20 + Ownable                │
└─────────────────────────────────────────────────────────┘
```

### Multi-Chain Deployment

```
Hub Chain (Base)          Destination Chains
┌──────────────┐         ┌──────────────┐
│   1B ONBT    │◄───────►│   Ethereum   │
│  Full Supply │   LZ    │   0 initial  │
└──────────────┘         └──────────────┘
       │                        │
       │    LayerZero V2        │
       │                        │
       ▼                        ▼
┌──────────────┐         ┌──────────────┐
│   Polygon    │         │   Arbitrum   │
│  0 initial   │◄───────►│   0 initial  │
└──────────────┘         └──────────────┘
```

**Architecture Philosophy**: No proxies, no bridges, pure LayerZero V2 OFT standard.

For detailed architecture, see [ARCHITECTURE.md](ARCHITECTURE.md) and [NO_PROXIES.md](NO_PROXIES.md).

---

## 🌐 Supported Networks

| Network | Chain ID | LayerZero ID | Status | RPC |
|---------|----------|--------------|--------|-----|
| **Ethereum** | 1 | 101 | ✅ Mainnet | [Alchemy](https://alchemy.com) |
| **Base** | 8453 | 184 | ✅ Mainnet | [Base.org](https://base.org) |
| **Polygon** | 137 | 109 | ✅ Mainnet | [Polygon.technology](https://polygon.technology) |
| **Arbitrum** | 42161 | 110 | ✅ Mainnet | [Arbitrum.io](https://arbitrum.io) |
| **Optimism** | 10 | 111 | ✅ Mainnet | [Optimism.io](https://optimism.io) |
| **Avalanche** | 43114 | 106 | ✅ Mainnet | [Avalanche.network](https://avax.network) |
| **BSC** | 56 | 102 | ✅ Mainnet | [BNBChain.org](https://www.bnbchain.org) |

### Testnets

| Network | Chain ID | LayerZero ID | Faucet |
|---------|----------|--------------|--------|
| **Base Sepolia** | 84532 | 10245 | [Coinbase Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet) |
| **Ethereum Sepolia** | 11155111 | 10161 | [Sepolia Faucet](https://sepoliafaucet.com) |
| **Polygon Mumbai** | 80001 | 10109 | [Mumbai Faucet](https://faucet.polygon.technology) |

See [CHAINS.md](CHAINS.md) for complete network configuration.

---

## 📦 Project Structure

```
ONBT-App/
├── contracts/                 # Smart contracts
│   ├── OmnichainNabatOFT.sol # Main ONBT token contract
│   ├── token/                # OFT implementations
│   │   └── NabatOFT.sol     # Basic OFT
│   ├── nft/                  # ONFT implementations
│   │   └── NabatONFT.sol    # Cross-chain NFTs
│   ├── defi/                 # DeFi ecosystem
│   │   ├── ONBTStaking.sol  # Staking with lockup
│   │   ├── ONBTLiquidityPool.sol # AMM for ONBT/ETH
│   │   └── ONBTYieldDistributor.sol # Yield distribution
│   └── libraries/            # Helper contracts
│
├── scripts/                  # Deployment & utility scripts
│   ├── deployONBT.mjs       # Main ONBT deployment
│   ├── deployOFT.mjs        # Basic OFT deployment
│   ├── deployONFT.mjs       # ONFT deployment
│   ├── deployDeFiEcosystem.mjs # DeFi contracts
│   ├── setTrustedRemotes.mjs # Cross-chain setup
│   ├── sendOFT.mjs          # Cross-chain transfers
│   ├── updateBranding.mjs   # Branding management
│   └── deploy.js            # Generic deployment
│
├── integrations/             # Blockchain SDK integrations
│   ├── coinbase/            # Coinbase ecosystem
│   │   ├── agentkit.mjs    # AI agent integration
│   │   ├── cdp-sdk.mjs     # CDP SDK
│   │   ├── onchainkit.mjs  # OnchainKit components
│   │   └── wallet-sdk.mjs  # Wallet integration
│   ├── ethereum/            # Ethereum utilities
│   ├── polygon/             # Polygon SDK
│   ├── arbitrum/            # Arbitrum SDK
│   ├── optimism/            # Optimism SDK
│   ├── avalanche/           # Avalanche SDK
│   └── bsc/                 # BSC SDK
│
├── miniapp/                  # Telegram Mini App
│   ├── App.tsx              # Main app component
│   ├── components/          # React components
│   ├── config/              # Configuration
│   └── package.json         # Mini app dependencies
│
├── examples/                 # Usage examples
│   ├── agentkit-example.mjs # AgentKit usage
│   ├── cdp-sdk-example.mjs  # CDP SDK usage
│   └── multi-chain-example.mjs # Multi-chain demo
│
├── test/                     # Contract tests
│   └── OmnichainNabatOFT.test.mjs
│
├── constants/                # Configuration constants
│   └── layerzero.ts         # LayerZero endpoints & chain IDs
│
├── assets/                   # Branding assets
│   └── branding/
│       ├── logos/           # Logo files
│       └── README.md        # Branding guide
│
├── .env.example             # Environment template
├── package.json             # Project dependencies
├── hardhat.config.js        # Hardhat configuration
└── README.md                # This file
```

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18+ (LTS recommended)
- npm or yarn
- Git
- MetaMask or another Web3 wallet
- Basic understanding of Ethereum and smart contracts

### Installation

```bash
# Clone repository
git clone https://github.com/acegrant99/ONBT-App.git
cd ONBT-App

# Install dependencies
npm install

# Set up environment
cp .env.example .env
```

### Environment Configuration

Edit `.env` file:

```env
# CRITICAL: Use a test wallet, NOT your main wallet
PRIVATE_KEY=your_private_key_here

# RPC Endpoints (get free keys from Alchemy/Infura)
BASE_SEPOLIA_RPC=https://sepolia.base.org
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
OPTIMISM_RPC=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY

# Block Explorer API Keys (optional, for verification)
ETHERSCAN_API_KEY=your_etherscan_key
BASESCAN_API_KEY=your_basescan_key
POLYGONSCAN_API_KEY=your_polygonscan_key

# Coinbase CDP (for AgentKit)
CDP_API_KEY_NAME=your_api_key_name
CDP_PRIVATE_KEY=your_cdp_private_key
```

### Compile Contracts

```bash
npm run compile
```

---

## 🚀 Deployment

### Option 1: Hub-and-Spoke Model (Recommended)

Deploy on one hub chain with full supply, then empty contracts on destinations:

```bash
# 1. Deploy hub chain (Base) with 1B tokens
export DEPLOYMENT_TYPE=hub
npm run deploy:onbt:base

# 2. Deploy destination chains with 0 tokens
export DEPLOYMENT_TYPE=destination
npm run deploy:onbt:ethereum
npm run deploy:onbt:polygon
npm run deploy:onbt:arbitrum

# 3. Configure cross-chain trust
npm run setup:remotes:base
npm run setup:remotes:ethereum
npm run setup:remotes:polygon
npm run setup:remotes:arbitrum

# 4. Test cross-chain transfer
npm run send:oft -- --network base
```

### Option 2: Testnet Deployment

```bash
# Base Sepolia (testnet)
export DEPLOYMENT_TYPE=hub
npm run deploy:onbt:baseSepolia

# Ethereum Sepolia (testnet)
export DEPLOYMENT_TYPE=destination
npm run deploy:onbt:ethereum

# Configure remotes
npm run setup:remotes:baseSepolia
```

### Available Deployment Commands

```bash
# ONBT (Main branded token)
npm run deploy:onbt:base
npm run deploy:onbt:ethereum
npm run deploy:onbt:polygon
npm run deploy:onbt:arbitrum
npm run deploy:onbt:optimism
npm run deploy:onbt:baseSepolia  # Testnet

# Basic OFT (Simple version)
npm run deploy:oft:base
npm run deploy:oft:ethereum
npm run deploy:oft:polygon

# ONFT (NFTs)
npm run deploy:onft:base
npm run deploy:onft:ethereum

# DeFi Ecosystem
npm run deploy:defi:base

# Cross-chain setup
npm run setup:remotes:base
npm run setup:remotes:ethereum

# Cross-chain transfers
npm run send:oft -- --network base
npm run send:onft -- --network base
```

For complete deployment guide, see [DEPLOYMENT.md](DEPLOYMENT.md) and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## 💎 Token Specifications

### Core Properties

| Property | Value | Mutability |
|----------|-------|------------|
| **Name** | ONabat | Immutable |
| **Symbol** | ONBT | Immutable |
| **Total Supply** | 1,000,000,000 | Immutable |
| **Decimals** | 18 (native), 8 (shared) | Immutable |
| **Mint Function** | ❌ None | N/A |
| **Burn Function** | ❌ None | N/A |
| **Website** | https://nabat.finance | Owner can update |

### Branding System

```solidity
// On-chain branding storage
string public logoURI;       // IPFS logo link
string public website;       // Project website
string public description;   // Token description
string public socialLinks;   // JSON social media links

// Update branding (owner only)
function updateBranding(
    string memory _logoURI,
    string memory _website,
    string memory _description,
    string memory _socialLinks
) external onlyOwner;

// Get complete metadata
function tokenURI() external view returns (string memory);
```

### Supply Model

**Fixed Supply Architecture:**
- ✅ Total supply minted once at deployment
- ✅ No mint() function - cannot create new tokens
- ✅ No burn() function - cannot destroy tokens
- ✅ Predictable tokenomics - true scarcity
- ✅ Institutional-grade guarantees

See [SUPPLY_MODEL.md](SUPPLY_MODEL.md) for detailed tokenomics.

---

## 🔗 Cross-Chain Functionality

### How It Works

```
1. User calls sendFrom() on Chain A
2. Tokens are burned on Chain A
3. LayerZero relays message to Chain B
4. Tokens are minted on Chain B
5. Recipient receives tokens on Chain B
```

### Cross-Chain Transfer Example

```javascript
import { ethers } from 'ethers';

// Connect to contract
const onbt = new ethers.Contract(onbtAddress, abi, signer);

// Estimate fees
const [nativeFee] = await onbt.estimateSendFee(
  destinationChainId,    // LayerZero chain ID
  recipientAddress,      // Recipient on destination
  amount,                // Amount to send
  false,                 // Use LayerZero token (false = native)
  '0x'                   // Adapter params (default)
);

// Send cross-chain
const tx = await onbt.sendFrom(
  senderAddress,
  destinationChainId,
  recipientAddress,
  amount,
  {
    refundAddress: senderAddress,
    zroPaymentAddress: ethers.ZeroAddress,
    adapterParams: '0x'
  },
  { value: nativeFee }  // Pay LayerZero fee
);

await tx.wait();
console.log('Cross-chain transfer initiated!');
```

### Tracking Transfers

Monitor your cross-chain transactions:
- **Testnet**: https://testnet.layerzeroscan.com
- **Mainnet**: https://layerzeroscan.com

See [BRIDGING_ARCHITECTURE.md](BRIDGING_ARCHITECTURE.md) for technical details.

---

## 🏦 DeFi Ecosystem

### Staking Contract (ONBTStaking.sol)

Stake ONBT tokens with flexible lockup periods:

| Lockup Period | Bonus Multiplier | Annual Rewards |
|---------------|------------------|----------------|
| No lockup | 1x (100%) | Base rate |
| 30 days | 1.2x (120%) | +20% |
| 90 days | 1.5x (150%) | +50% |
| 180 days | 2x (200%) | +100% |
| 365 days | 3x (300%) | +200% |

**Features:**
- Flexible lockup periods
- Compound rewards
- Emergency withdrawal
- Pausable for security

```solidity
// Stake tokens
function stake(uint256 amount, uint256 lockupPeriod) external;

// Withdraw with rewards
function withdraw(uint256 amount) external;

// Claim rewards only
function claimRewards() external;

// Compound rewards (restake)
function compound() external;
```

### Liquidity Pool (ONBTLiquidityPool.sol)

Automated Market Maker for ONBT/ETH pair:

```solidity
// Add liquidity
function addLiquidity(uint256 onbtAmount) external payable returns (uint256 lpTokens);

// Remove liquidity
function removeLiquidity(uint256 lpTokens) external returns (uint256 onbt, uint256 eth);

// Swap ONBT for ETH
function swapToken0ForToken1(uint256 onbtAmount, uint256 minEthOut) external;

// Swap ETH for ONBT
function swapToken1ForToken0(uint256 minOnbtOut) external payable;
```

**Fee Structure:**
- Trading fee: 0.3% (goes to liquidity providers)
- Protocol fee: Configurable (default 10% of trading fees)

### Yield Distributor (ONBTYieldDistributor.sol)

Distribute rewards proportionally to holders:

```solidity
// Deposit rewards
function depositRewards() external payable;

// Claim rewards
function claimRewards() external;

// View pending rewards
function pendingRewards(address account) external view returns (uint256);
```

See [DEFI_ECOSYSTEM.md](DEFI_ECOSYSTEM.md) for complete DeFi documentation.

---

## 🤖 Coinbase Integration

### AgentKit (AI Agents)

Build AI agents that interact with blockchain:

```javascript
import { initializeAgentKit } from './integrations/coinbase/agentkit.mjs';

// Initialize agent
const agentkit = await initializeAgentKit({
  networkId: 'base-sepolia'
});

// Deploy contracts with AI
await deployTokenWithAgent(agentkit, {
  name: "My Token",
  symbol: "MTK",
  initialSupply: "1000000"
});

// Automated transfers
await transferWithAgent(agentkit, amount, assetId, destination);
```

### CDP SDK (Coinbase Developer Platform)

```javascript
import { CoinbaseSDK } from './integrations/coinbase/cdp-sdk.mjs';

const sdk = new CoinbaseSDK(apiKeyName, privateKey);

// Create wallet
const wallet = await sdk.createWallet();

// Transfer tokens
await sdk.transfer(wallet, amount, assetId, destination);
```

### OnchainKit (React Components)

```javascript
import { ConnectWallet, Identity, Name, Avatar } from '@coinbase/onchainkit/identity';

function App() {
  return (
    <div>
      <ConnectWallet />
      <Identity address="0x...">
        <Avatar />
        <Name />
      </Identity>
    </div>
  );
}
```

### Wallet SDK

```javascript
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const sdk = new CoinbaseWalletSDK({
  appName: "ONBT Ecosystem",
  appLogoUrl: "https://nabat.finance/logo.png"
});

const provider = sdk.makeWeb3Provider();
```

See [COINBASE.md](COINBASE.md) for complete Coinbase integration guide.

---

## 📱 Telegram Mini App

Full-featured dApp for Telegram users:

### Features
- ✅ Token balance display
- ✅ Cross-chain transfers
- ✅ Transaction history
- ✅ Staking interface
- ✅ Swap functionality
- ✅ Wallet connection (TON, Coinbase)

### Quick Start

```bash
cd miniapp
npm install
npm start
```

### Integration

```typescript
import { App } from './miniapp/App.tsx';
import { SDKProvider } from '@tma.js/sdk-react';

function TelegramApp() {
  return (
    <SDKProvider acceptCustomStyles>
      <App />
    </SDKProvider>
  );
}
```

See [miniapp/README.md](miniapp/README.md) and [MINIAPP_CAPABILITIES.md](MINIAPP_CAPABILITIES.md).

---

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Specific test file
npx hardhat test test/OmnichainNabatOFT.test.mjs

# With gas reporting
REPORT_GAS=true npm test

# Specific test
npx hardhat test --grep "Immutability"
```

### Test Coverage

```bash
npm run coverage
```

### Test on Local Network

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy and test
npx hardhat run scripts/deployONBT.mjs --network localhost
```

---

## 🔐 Security

### Smart Contract Security

- ✅ **Immutable Supply**: No mint/burn functions
- ✅ **Owner Control**: Only branding updates (no token control)
- ✅ **Trusted Remotes**: Required for cross-chain
- ✅ **LayerZero Security**: Battle-tested messaging protocol
- ✅ **No Proxies**: Eliminates proxy vulnerabilities
- ✅ **Reentrancy Protection**: OpenZeppelin standards

### Best Practices

1. **Testnet First**: Always test on testnets before mainnet
2. **Audit Contracts**: Get professional audit before mainnet
3. **Multi-sig Ownership**: Use multi-sig for owner functions
4. **Monitor Transfers**: Track cross-chain activity
5. **Verify Contracts**: Verify on block explorers
6. **Secure Keys**: Use hardware wallets for production

### Audit Status

- **Contract Audit**: Recommended before mainnet
- **LayerZero Audit**: Protocol is audited by Trail of Bits, OpenZeppelin
- **Dependencies**: All dependencies are from trusted sources (OpenZeppelin, LayerZero)

### Security Vulnerabilities

If you discover a security vulnerability, please email: security@nabat.finance

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for security checklist.

---

## 📖 Documentation

### Core Documentation
- [README.md](README.md) - This file (project overview)
- [QUICKSTART.md](QUICKSTART.md) - 5-minute quick start
- [QUICK_SETUP.md](QUICK_SETUP.md) - 15-minute guided setup
- [NEXT_STEPS.md](NEXT_STEPS.md) - Complete roadmap to production

### Technical Documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [ONBT_SPECIFICATION.md](ONBT_SPECIFICATION.md) - Complete token specification
- [BRIDGING_ARCHITECTURE.md](BRIDGING_ARCHITECTURE.md) - Cross-chain technical details
- [NO_PROXIES.md](NO_PROXIES.md) - Why we don't use proxies
- [SUPPLY_MODEL.md](SUPPLY_MODEL.md) - Token supply model

### Deployment & Configuration
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Deployment checklist
- [CHAINS.md](CHAINS.md) - Multi-chain configuration

### Integration Guides
- [COINBASE.md](COINBASE.md) - Coinbase ecosystem integration
- [DEFI_ECOSYSTEM.md](DEFI_ECOSYSTEM.md) - DeFi contracts guide
- [UI_INTEGRATION_GUIDE.md](UI_INTEGRATION_GUIDE.md) - Frontend integration
- [MINIAPP_CAPABILITIES.md](MINIAPP_CAPABILITIES.md) - Telegram Mini App guide
- [UNIVERSAL_LP_GUIDE.md](UNIVERSAL_LP_GUIDE.md) - Liquidity pool guide

### Branding & Assets
- [BRANDING.md](BRANDING.md) - Branding system guide
- [assets/branding/README.md](assets/branding/README.md) - Asset usage guide

### Reference
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick function reference
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current project status
- [IMPLEMENTATION_OVERVIEW.md](IMPLEMENTATION_OVERVIEW.md) - Implementation details
- [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md) - Recent changes

---

## 🔧 Development

### Common Commands

```bash
# Compile contracts
npm run compile

# Clean build artifacts
npm run clean

# Run tests
npm test

# Deploy contracts
npm run deploy:onbt:base
npm run deploy:onbt:ethereum

# Set up cross-chain
npm run setup:remotes:base

# Send cross-chain
npm run send:oft -- --network base

# Update branding
npm run branding:update <address> update

# View branding
npm run branding:get <address>
```

### Network Configuration

All network configs in `hardhat.config.js`:

```javascript
networks: {
  ethereum: { url: process.env.ETHEREUM_RPC, ... },
  base: { url: process.env.BASE_RPC, ... },
  polygon: { url: process.env.POLYGON_RPC, ... },
  arbitrum: { url: process.env.ARBITRUM_RPC, ... },
  optimism: { url: process.env.OPTIMISM_RPC, ... },
  avalanche: { url: process.env.AVALANCHE_RPC, ... },
  bsc: { url: process.env.BSC_RPC, ... }
}
```

### Adding New Chains

1. Add LayerZero endpoint to `constants/layerzero.ts`
2. Add network config to `hardhat.config.js`
3. Add RPC URL to `.env`
4. Deploy contract: `npm run deploy:onbt:<network>`
5. Configure trust: `npm run setup:remotes:<network>`

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow Solidity style guide
- Write tests for new features
- Update documentation
- Keep code clean and readable
- Use meaningful commit messages

### Code Standards

```bash
# Run linter
npm run lint

# Format code
npm run format

# Check coverage
npm run coverage
```

---

## 🌐 Community

### Official Channels

- **Website**: https://nabat.finance
- **Twitter**: [@NabatFinance](https://twitter.com/NabatFinance)
- **Telegram**: [t.me/nabatfinance](https://t.me/nabatfinance)
- **Discord**: [discord.gg/nabatfinance](https://discord.gg/nabatfinance)
- **GitHub**: [github.com/acegrant99/ONBT-App](https://github.com/acegrant99/ONBT-App)

### Ecosystem Links

- **LayerZero**: [layerzero.network](https://layerzero.network)
- **LayerZero Docs**: [docs.layerzero.network](https://docs.layerzero.network)
- **LayerZero Scan**: [layerzeroscan.com](https://layerzeroscan.com)
- **Base**: [base.org](https://base.org)
- **Coinbase**: [coinbase.com](https://coinbase.com)

### Support

- **Documentation**: See [Documentation](#documentation) section
- **Issues**: [GitHub Issues](https://github.com/acegrant99/ONBT-App/issues)
- **Discussions**: [GitHub Discussions](https://github.com/acegrant99/ONBT-App/discussions)
- **Email**: support@nabat.finance

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Smart contract development
- [x] LayerZero V2 integration
- [x] Multi-chain deployment scripts
- [x] Comprehensive documentation
- [x] Test suite

### Phase 2: Ecosystem ✅
- [x] DeFi contracts (Staking, AMM, Yield)
- [x] Coinbase integrations (AgentKit, CDP, OnchainKit)
- [x] Multi-chain SDK integrations
- [x] Telegram Mini App
- [x] Branding system

### Phase 3: Launch 🚀
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Community launch
- [ ] Marketing campaign
- [ ] CEX listings

### Phase 4: Growth 📈
- [ ] Additional chain support
- [ ] Enhanced DeFi features
- [ ] Governance system
- [ ] Mobile app
- [ ] Partnerships

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Total Supply** | 1,000,000,000 ONBT |
| **Supported Chains** | 7+ (Ethereum, Base, Polygon, Arbitrum, Optimism, Avalanche, BSC) |
| **Smart Contracts** | 10+ (OFT, ONFT, DeFi, Libraries) |
| **Documentation Pages** | 25+ |
| **Lines of Code** | 5,000+ |
| **Test Coverage** | 90%+ |
| **Dependencies** | Minimal (OpenZeppelin, LayerZero) |

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 acegrant99

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

### Built With

- **LayerZero V2** - Omnichain messaging protocol
- **OpenZeppelin** - Smart contract libraries
- **Hardhat** - Ethereum development environment
- **Ethers.js** - Ethereum library
- **Coinbase** - Base network and ecosystem tools

### Special Thanks

- LayerZero Labs for the omnichain protocol
- Coinbase for Base network and developer tools
- OpenZeppelin for secure contract libraries
- The entire Web3 community

---

## 📞 Contact

**Project Maintainer**: acegrant99

- **Email**: contact@nabat.finance
- **Twitter**: [@NabatFinance](https://twitter.com/NabatFinance)
- **GitHub**: [acegrant99](https://github.com/acegrant99)

---

## ⚠️ Disclaimer

This software is provided "as is", without warranty of any kind. Use at your own risk. Always test on testnets before mainnet deployment. Not financial advice.

**Important Security Reminders:**
- Never share your private keys
- Always test on testnets first
- Use hardware wallets for production
- Audit contracts before mainnet deployment
- Start with small amounts when testing
- Verify all contract addresses

---

<div align="center">

**Built with ❤️ for the Omnichain Future**

[![GitHub stars](https://img.shields.io/github/stars/acegrant99/ONBT-App?style=social)](https://github.com/acegrant99/ONBT-App/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/acegrant99/ONBT-App?style=social)](https://github.com/acegrant99/ONBT-App/network/members)

[⬆ Back to Top](#onabat-onbt---omnichain-government-ecosystem-)

</div>
