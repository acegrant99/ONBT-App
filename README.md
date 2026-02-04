# ONBT-App - Nabat Omnichain Ecosystem

A comprehensive LayerZero-based omnichain ecosystem featuring OFT (Omnichain Fungible Tokens) and ONFT (Omnichain Non-Fungible Tokens) implementations. Built from scratch for the Nabat Government ecosystem with full Coinbase/Base chain integration.

## 🚀 Ready to Get Started?

### → [QUICK_SETUP.md](./QUICK_SETUP.md) - Deploy in 15 minutes! ⚡

### → [NEXT_STEPS.md](./NEXT_STEPS.md) - Complete roadmap & recommendations 🗺️

### → [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Track your progress ✅

---

## 🚀 Quick Answer: Do I Need a Bridging Contract?

**NO!** The OmnichainNabatOFT contract **already has built-in LayerZero bridging**. You do NOT need a separate bridge contract. You just need to build a UI that calls the existing `sendFrom()` function.

📖 **Read the complete explanation:** [BRIDGING_ARCHITECTURE.md](./BRIDGING_ARCHITECTURE.md)  
💻 **See UI integration examples:** [UI_INTEGRATION_GUIDE.md](./UI_INTEGRATION_GUIDE.md)

## ❓ How Does Supply Minting Work?

**Hub Chain**: Deploy with full 1B supply (mints all tokens)  
**Destination Chains**: Deploy with 0 supply (no minting)  
**Cross-Chain**: Burn on source, mint on destination (total stays 1B)

📖 **Read the complete explanation:** [SUPPLY_MODEL.md](./SUPPLY_MODEL.md)

## 🌟 Features

- **ONBT (ONabat Token)**: Immutable branded OFT with 1 billion token supply, built-in logo and metadata
- **OFT (Omnichain Fungible Token)**: Transfer tokens seamlessly across multiple blockchain networks
- **ONFT (Omnichain Non-Fungible Token)**: Send NFTs across different chains while maintaining ownership
- **Branding System**: Professional logo, website, and social media integration for tokens
- **Multi-Chain Support**: Ethereum, Base, Polygon, Arbitrum, Optimism, Avalanche, BSC (7 chains)
- **Multi-Chain SDKs**: Complete SDK integrations for all 7 supported chains
- **Coinbase Ecosystem**: AgentKit, CDP SDK, OnchainKit, Wallet SDK
- **Chain-Specific Tools**: Native features for each blockchain (ENS, bridges, DeFi)
- **LayerZero Protocol**: Secure cross-chain messaging and asset transfers
- **Latest Dependencies**: Hardhat 3.x, Ethers.js 6.x, OpenZeppelin 4.9.6
- **ESM Format**: Modern JavaScript with ES modules

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Cross-Chain Operations](#cross-chain-operations)
- [Testing](#testing)
- [Smart Contracts](#smart-contracts)
- [Scripts](#scripts)
- [Network Configuration](#network-configuration)

## 🔧 Prerequisites

- Node.js v18+ (v22+ recommended for Hardhat 3.x)
- npm or yarn
- Hardhat 3.x
- MetaMask or another Web3 wallet
- RPC endpoints for target networks (Alchemy, Infura, etc.)
- Private key with native tokens on networks you want to deploy to

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/acegrant99/ONBT-App.git
cd ONBT-App
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - Private key for deployments
   - RPC endpoints for each network
   - Block explorer API keys (optional, for verification)

## 📁 Project Structure

```
ONBT-App/
├── contracts/
│   ├── token/
│   │   ├── OmnichainNabatOFT.sol  # Immutable branded ONBT token
│   │   ├── NabatOFT.sol          # Main OFT implementation
│   │   └── NabatProxyOFT.sol     # Proxy OFT for existing tokens
│   └── nft/
│       ├── NabatONFT.sol          # Main ONFT implementation
│       └── NabatProxyONFT.sol     # Proxy ONFT for existing NFTs
├── integrations/
│   ├── coinbase/                  # Coinbase/Base SDKs
│   │   ├── agentkit.mjs
│   │   ├── cdp-sdk.mjs
│   │   ├── onchainkit.mjs
│   │   └── wallet-sdk.mjs
│   ├── ethereum/                  # Ethereum SDK (ENS, DeFi)
│   ├── polygon/                   # Polygon SDK (PoS, zkEVM)
│   ├── arbitrum/                  # Arbitrum SDK (Nitro, Stylus)
│   ├── optimism/                  # Optimism SDK (Bedrock, Superchain)
│   ├── avalanche/                 # Avalanche SDK (Subnets, C/P/X)
│   └── bsc/                       # BSC SDK (opBNB, GameFi)
├── examples/
│   ├── agentkit-example.mjs       # Coinbase AgentKit usage
│   ├── cdp-sdk-example.mjs        # CDP SDK usage
│   └── multi-chain-example.mjs    # Multi-chain SDK demo
├── scripts/
│   ├── deployONBT.mjs             # Deploy immutable ONBT token
│   ├── deployOFT.mjs              # Deploy OFT contract
│   ├── deployONFT.mjs             # Deploy ONFT contract
│   ├── updateBranding.mjs         # Manage ONBT branding
│   ├── setTrustedRemotes.mjs      # Configure cross-chain trust
│   ├── sendOFT.mjs                # Send tokens cross-chain
│   └── sendONFT.mjs               # Send NFTs cross-chain
├── constants/
│   └── layerzero.mjs              # LayerZero chain IDs and endpoints
├── test/                          # Test files
│   ├── OmnichainNabatOFT.test.mjs # ONBT tests
│   └── NabatOFT.test.mjs          # OFT tests
├── docs/
│   ├── README.md                  # Main documentation
│   ├── BRANDING.md                # Logo and branding guide
│   ├── QUICKSTART.md              # Quick start guide
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── ARCHITECTURE.md            # Technical architecture
│   ├── DEPENDENCIES.md            # Dependency management
│   ├── COINBASE.md                # Coinbase integration guide
│   └── CHAINS.md                  # Multi-chain SDK guide
└── hardhat.config.js              # Hardhat configuration (ESM)
```

## ⚙️ Configuration

### Network Setup

The project supports multiple networks configured in `hardhat.config.js`:

- **Ethereum Mainnet** (Chain ID: 1)
- **Base Mainnet** (Chain ID: 8453) - Coinbase L2
- **Base Sepolia** (Chain ID: 84532) - Base Testnet
- **Polygon** (Chain ID: 137)
- **Arbitrum** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Avalanche** (Chain ID: 43114)
- **BSC** (Chain ID: 56)

### LayerZero Configuration

LayerZero chain IDs and endpoints are defined in `constants/layerzero.mjs`. The configuration includes:

- Chain IDs for LayerZero protocol
- Endpoint addresses for each network
- Gas limits for cross-chain operations

## 🚀 Deployment

### Deploy ONBT (ONabat Token - Immutable Branded OFT)

**ONabat (ONBT)** is the flagship immutable token with built-in branding:
- **Total Supply**: 1 billion ONBT (immutable)
- **Website**: https://nabat.finance (Vercel deployment)
- **Cross-Chain**: Peer-based configuration (no proxies needed on destination chains)

1. **Prepare branding assets**:
   - Design your logo (512x512px minimum)
   - Upload logo to IPFS (see [BRANDING.md](BRANDING.md))
   - Configure website and social links

2. **Update deployment configuration** in `scripts/deployONBT.mjs`:
   ```javascript
   const ONBT_CONFIG = {
     totalSupply: "1000000000", // 1 billion ONBT
     branding: {
       logoURI: "ipfs://QmYourLogoHash",
       website: "https://nabat.finance",
       description: "Your description",
       socialLinks: JSON.stringify({ /* social links */ })
     }
   };
   ```

3. **Deploy on multiple chains**:
   ```bash
   # Deploy on Base mainnet
   npm run deploy:onbt:base
   
   # Deploy on Ethereum
   npm run deploy:onbt:ethereum
   
   # Deploy on Polygon
   npm run deploy:onbt:polygon
   
   # Deploy on Base Sepolia (testnet)
   npm run deploy:onbt:baseSepolia
   ```

4. **Verify deployment**:
   - Total supply is immutable (1B ONBT)
   - No mint/burn functions exist
   - Branding metadata is set
   - All supply minted to deployer
   - Deployed via peer configuration (no proxies on destination chains)

5. **Update branding** (optional, after deployment):
   ```bash
   # View current branding
   npm run branding:get <contract_address>
   
   # Update branding
   export NEW_LOGO_URI="ipfs://NewHash"
   npm run branding:update <contract_address> update
   ```

See [BRANDING.md](BRANDING.md) for complete branding guide.

### Deploy OFT (Omnichain Fungible Token)

For custom OFT with mint/burn capabilities:

1. Deploy on source chain (e.g., Ethereum):
```bash
npx hardhat run scripts/deployOFT.mjs --network ethereum
```

2. Deploy on destination chains (e.g., Base):
```bash
npx hardhat run scripts/deployOFT.mjs --network base
```

3. Save all deployed contract addresses.

### Deploy ONFT (Omnichain Non-Fungible Token)

1. Deploy on source chain:
```bash
npx hardhat run scripts/deployONFT.mjs --network ethereum
```

2. Deploy on destination chains:
```bash
npx hardhat run scripts/deployONFT.mjs --network base
```

### Configure Trusted Remotes

After deploying on multiple chains, configure bidirectional trust:

1. Update contract addresses in `scripts/setTrustedRemotes.mjs`
2. Run on each chain:
```bash
npx hardhat run scripts/setTrustedRemotes.mjs --network ethereum
npx hardhat run scripts/setTrustedRemotes.mjs --network base
```

This allows contracts to communicate across chains securely.

## 🔄 Cross-Chain Operations

### Send OFT Tokens

1. Update configuration in `scripts/sendOFT.mjs`:
   - Contract address
   - Destination chain
   - Recipient address
   - Amount to send

2. Execute the transfer:
```bash
npx hardhat run scripts/sendOFT.ts --network ethereum
```

3. Monitor on LayerZero Scan: https://layerzeroscan.com

### Send ONFT (NFT)

1. Update configuration in `scripts/sendONFT.ts`:
   - Contract address
   - Destination chain
   - Recipient address
   - Token ID

2. Execute the transfer:
```bash
npx hardhat run scripts/sendONFT.ts --network ethereum
```

## 🧪 Testing

Compile contracts:
```bash
npx hardhat compile
```

Run tests:
```bash
npx hardhat test
```

## 📜 Smart Contracts

### NabatOFT.sol
Main OFT implementation for creating new omnichain tokens. Features:
- Mint/burn functionality
- Cross-chain transfers
- ERC20 compatible
- Configurable decimals

### NabatProxyOFT.sol
Proxy wrapper for existing ERC20 tokens to make them omnichain-compatible.

### NabatONFT.sol
Main ONFT implementation for creating new omnichain NFTs. Features:
- Mint/batch mint
- Cross-chain NFT transfers
- ERC721 compatible
- Configurable metadata URI
- Max supply control

### NabatProxyONFT.sol
Proxy wrapper for existing ERC721 tokens to make them omnichain-compatible.

## 📝 Scripts

### Deployment Scripts
- `deployOFT.ts` - Deploy OFT token contract
- `deployONFT.ts` - Deploy ONFT (NFT) contract

### Configuration Scripts
- `setTrustedRemotes.ts` - Set up cross-chain trust relationships

### Operational Scripts
- `sendOFT.ts` - Transfer tokens across chains
- `sendONFT.ts` - Transfer NFTs across chains

## 🌐 Network Configuration

### Base (Coinbase L2)

**Mainnet:**
- RPC: https://mainnet.base.org
- Chain ID: 8453
- LayerZero Chain ID: 184
- Explorer: https://basescan.org

**Testnet (Sepolia):**
- RPC: https://sepolia.base.org
- Chain ID: 84532
- LayerZero Chain ID: 10245
- Explorer: https://sepolia.basescan.org

### Key Features of Base Integration
- Low transaction costs
- Fast finality
- Full EVM compatibility
- Native USDC support
- Seamless bridging with other chains

## 🔐 Security Considerations

1. **Never commit private keys** - Use environment variables
2. **Test on testnets first** - Validate all functionality before mainnet
3. **Verify contracts** - Use block explorer verification
4. **Audit smart contracts** - Consider professional audits for production
5. **Set appropriate gas limits** - Ensure sufficient gas for cross-chain ops
6. **Monitor transactions** - Use LayerZero Scan for tracking

## 📚 Resources

- [LayerZero Documentation](https://layerzero.gitbook.io/docs/)
- [Base Documentation](https://docs.base.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Open an issue on GitHub
- Check LayerZero documentation
- Review Base developer resources

## 🚦 Getting Started Quick Guide

1. **Install dependencies**: `npm install`
2. **Configure environment**: Copy `.env.example` to `.env` and fill in values
3. **Deploy on testnet**: Start with Base Sepolia
4. **Test cross-chain**: Use small amounts first
5. **Monitor transactions**: Track on LayerZero Scan
6. **Scale to mainnet**: Deploy on production networks

## ⚡ Advanced Features

### Custom Adapter Parameters
Adjust gas limits and other parameters for cross-chain transfers in the send scripts.

### Multiple Chain Support
Deploy on any LayerZero-supported chain by adding configuration to `hardhat.config.ts`.

### Proxy Contracts
Use Proxy OFT/ONFT contracts to make existing tokens omnichain-compatible without creating new tokens.

---

**Built with ❤️ for the Nabat Omnichain Government Ecosystem** 
