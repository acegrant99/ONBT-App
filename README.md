# ONabat - Nabat Omnichain Government Ecosystem

New repository for revamped efforts in deploying the Nabat Omnichain Government ecosystem dApp.

## About ONabat

Nabat is an innovative omnichain governance ecosystem that enables decentralized decision-making and coordination across multiple blockchain networks. The platform provides a unified governance framework that seamlessly operates across different chains, empowering communities to participate in transparent and efficient governance processes.

## Smart Contracts

### OmnichainNabatOFT - No Proxy Architecture

The `OmnichainNabatOFT.sol` contract implements LayerZero V2 OFT (Omnichain Fungible Token) standard **WITHOUT proxies**, as recommended by LayerZero documentation.

**Why No Proxies?**
- ✅ LayerZero V2 OFT contracts don't require proxies
- ✅ Simpler, more secure architecture
- ✅ Direct inheritance from OFT.sol provides all omnichain functionality
- ✅ Eliminates proxy-related vulnerabilities (storage collisions, upgrade risks)
- ✅ Native burn/mint mechanics for cross-chain transfers

**Key Features:**
- ERC20-compatible token with omnichain capabilities
- Burns tokens on source chain, mints on destination chain
- Maintains unified global supply across all chains
- Owner-controlled minting for initial supply
- No intermediate contracts or adapters needed

For detailed documentation, see [contracts/README.md](contracts/README.md).

### Development

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test

# Deploy (configure .env first)
npm run deploy
```

## Website

🌐 [nabat.finance](https://nabat.finance)

## Community & Social

Stay connected with the ONabat community:

- **Twitter (X)**: [@NBT_V2](https://x.com/NBT_V2)
- **Telegram**: [Nabat Omnichain Genesis Government](https://t.me/NabatOmnichainGenesisGovernment)
- **Discord**: [Join our Discord](https://discord.gg/Tug6F8H8C)

## Branding

For branding guidelines, logo assets, and usage information, please refer to [BRANDING.md](BRANDING.md).

The official ONabat logo is available at: [iCloud Photo Link](https://share.icloud.com/photos/05b2OQFlv5lYFnJHoHDfqgfcg)

## License

See [LICENSE](LICENSE) for more information.
