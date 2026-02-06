# Quick Start Guide

Get started with the Nabat Omnichain Ecosystem in 5 minutes!

## Prerequisites

- Node.js v16+ installed
- A wallet with some testnet tokens (Base Sepolia ETH)
- Basic understanding of Ethereum and smart contracts

## Step 1: Clone and Install

```bash
git clone https://github.com/acegrant99/ONBT-App.git
cd ONBT-App
npm install
```

## Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your private key:
```env
PRIVATE_KEY=your_private_key_here
BASE_SEPOLIA_RPC=https://sepolia.base.org
```

⚠️ **Important**: Never commit your real private key! Use a test wallet only.

## Step 3: Get Testnet Tokens

Get Base Sepolia ETH from a faucet:
- https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- or https://faucet.quicknode.com/base/sepolia

## Step 4: Deploy Your First OFT

Deploy on Base Sepolia testnet:

```bash
npm run deploy:oft:baseSepolia
```

Save the contract address from the output!

## Step 5: Mint Some Tokens

After deployment, the script automatically mints 1,000,000 tokens to your address.

Check your balance with Hardhat console:
```bash
npx hardhat console --network baseSepolia
```

Then in the console:
```javascript
const NabatOFT = await ethers.getContractFactory("NabatOFT");
const oft = await NabatOFT.attach("YOUR_CONTRACT_ADDRESS");
const [signer] = await ethers.getSigners();
const balance = await oft.balanceOf(signer.address);
console.log("Balance:", ethers.formatEther(balance));
```

## Step 6: Deploy on Another Chain (Optional)

To test cross-chain functionality, deploy on another testnet:

```bash
# Deploy on Goerli or another testnet
npx hardhat run scripts/deployOFT.ts --network goerli
```

## Step 7: Set Up Cross-Chain Trust

1. Edit `scripts/setTrustedRemotes.ts` with your deployed addresses
2. Run on each chain:
```bash
npm run setup:remotes:baseSepolia
npx hardhat run scripts/setTrustedRemotes.ts --network goerli
```

## Step 8: Test Cross-Chain Transfer

1. Edit `scripts/sendOFT.ts` with your contract address and destination
2. Send tokens cross-chain:
```bash
npm run send:oft -- --network baseSepolia
```

3. Track on LayerZero Scan: https://testnet.layerzeroscan.com

## Deploy ONFT (NFTs)

Same process for NFTs:

```bash
npm run deploy:onft:baseSepolia
```

## Common Commands

```bash
# Compile contracts
npm run compile

# Deploy OFT on different networks
npm run deploy:oft:ethereum
npm run deploy:oft:base
npm run deploy:oft:polygon

# Deploy ONFT
npm run deploy:onft:ethereum
npm run deploy:onft:base

# Set up trusted remotes
npm run setup:remotes:ethereum
npm run setup:remotes:base

# Send tokens/NFTs
npm run send:oft
npm run send:onft

# Clean build artifacts
npm run clean
```

## What's Next?

1. **Mainnet Deployment**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production
2. **Custom Implementation**: Modify contracts in `contracts/` folder
3. **Frontend Integration**: Use ethers.js to interact with contracts
4. **Add More Chains**: Configure in `hardhat.config.js`

## Project Structure

```
ONBT-App/
├── contracts/
│   ├── token/        # OFT contracts
│   └── nft/          # ONFT contracts
├── scripts/          # Deployment and utility scripts
├── constants/        # LayerZero configuration
├── test/             # Contract tests
├── README.md         # Full documentation
└── DEPLOYMENT.md     # Deployment guide
```

## Need Help?

- 📖 Read the full [README.md](README.md)
- 📝 Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment
- 🔗 Visit [LayerZero Docs](https://layerzero.gitbook.io/docs/)
- 🌐 Explore [Base Docs](https://docs.base.org/)

## Troubleshooting

**Issue: "Cannot find module"**
```bash
npm install
```

**Issue: "Insufficient funds"**
- Get testnet tokens from faucet
- Make sure you're on the right network

**Issue: "No trusted remote"**
- Run `setTrustedRemotes.ts` on both chains
- Wait a few minutes after deployment

**Issue: "Transaction failed"**
- Check your gas balance
- Verify contract addresses are correct
- Ensure trusted remotes are set

## Security Reminders

- ✅ Always test on testnets first
- ✅ Never commit private keys
- ✅ Use environment variables for secrets
- ✅ Verify contracts on block explorers
- ✅ Start with small amounts

## Example Workflow

Here's a complete workflow from start to finish:

```bash
# 1. Setup
npm install
cp .env.example .env
# Edit .env with your private key

# 2. Deploy on Base Sepolia
npm run deploy:oft:baseSepolia
# Save the address: 0xABC...

# 3. Deploy on Goerli (optional, for cross-chain testing)
npx hardhat run scripts/deployOFT.ts --network goerli
# Save the address: 0xDEF...

# 4. Configure trusted remotes
# Edit scripts/setTrustedRemotes.ts with the addresses above
npm run setup:remotes:baseSepolia
npx hardhat run scripts/setTrustedRemotes.ts --network goerli

# 5. Test cross-chain transfer
# Edit scripts/sendOFT.ts with your address
npm run send:oft -- --network baseSepolia

# 6. Monitor on LayerZero Scan
# Visit: https://testnet.layerzeroscan.com
```

---

**Happy Building! 🚀**

Built with ❤️ for the Nabat Omnichain Government Ecosystem