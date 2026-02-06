# 🔐 Deployer Wallet Setup Guide

Complete guide for adding your deployer wallet to the ONBT ecosystem.

## 📋 Table of Contents

- [Quick Start (5 Minutes)](#quick-start-5-minutes)
- [Detailed Setup Guide](#detailed-setup-guide)
- [Security Best Practices](#security-best-practices)
- [Getting Your Private Key](#getting-your-private-key)
- [Funding Your Wallet](#funding-your-wallet)
- [Verification Steps](#verification-steps)
- [Common Issues](#common-issues)
- [Network-Specific Details](#network-specific-details)
- [Deployment Cost Estimates](#deployment-cost-estimates)
- [Production Best Practices](#production-best-practices)
- [Quick Reference](#quick-reference)

---

## Quick Start (5 Minutes)

### 1. Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

### 2. Add Your Private Key

Edit `.env` and add your private key:

```bash
# Open in your editor
nano .env  # or vim .env, or code .env

# Replace the placeholder
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

### 3. Verify Configuration

```bash
# Check that the key is loaded
node -e "require('dotenv').config(); console.log('✓ Private key loaded:', process.env.PRIVATE_KEY ? 'YES' : 'NO')"
```

### 4. Fund Your Wallet

Get testnet ETH from faucets (see [Funding Section](#funding-your-wallet))

### 5. Deploy!

```bash
# Deploy to Base Sepolia testnet
npm run deploy:onbt:baseSepolia
```

---

## Detailed Setup Guide

### Prerequisites

Before you begin, ensure you have:

- [ ] A crypto wallet (MetaMask, Coinbase Wallet, etc.)
- [ ] Node.js and npm installed
- [ ] This repository cloned locally
- [ ] Basic understanding of blockchain deployments

### Step-by-Step Instructions

#### Step 1: Choose Your Deployer Wallet

**🔒 Security Recommendation:** Create a NEW wallet specifically for deployments. Do NOT use your main wallet with all your funds.

**Why?**
- Limits exposure if private key is compromised
- Easier to manage deployment-specific permissions
- Can be funded with only the amount needed for deployment

#### Step 2: Export Your Private Key

See the [Getting Your Private Key](#getting-your-private-key) section below for wallet-specific instructions.

#### Step 3: Create .env File

```bash
# In the project root directory
cp .env.example .env
```

#### Step 4: Add Private Key to .env

Open `.env` in your favorite editor:

```bash
# Using nano
nano .env

# Using vim
vim .env

# Using VS Code
code .env
```

Find this line:
```
PRIVATE_KEY=your_private_key_here
```

Replace with your actual private key:
```
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

**⚠️ WARNING:** Your private key should start with `0x` and be 66 characters total (0x + 64 hex characters)

#### Step 5: Add RPC URLs (Optional but Recommended)

For better performance and reliability, add your own RPC URLs:

```bash
# Example with Alchemy
BASE_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Or with Infura
ETHEREUM_RPC=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_RPC=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

Get free API keys from:
- Alchemy: https://www.alchemy.com/
- Infura: https://infura.io/
- QuickNode: https://www.quicknode.com/

#### Step 6: Add Block Explorer API Keys (For Verification)

```bash
ETHERSCAN_API_KEY=your_etherscan_api_key
BASESCAN_API_KEY=your_basescan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

Get free API keys from:
- Etherscan: https://etherscan.io/apis
- BaseScan: https://basescan.org/apis
- PolygonScan: https://polygonscan.com/apis

#### Step 7: Verify Your Setup

```bash
# Check wallet address
node -e "const ethers = require('ethers'); require('dotenv').config(); const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); console.log('Deployer Address:', wallet.address);"
```

#### Step 8: Fund Your Wallet

See [Funding Your Wallet](#funding-your-wallet) section for details.

---

## Security Best Practices

### 🔒 Critical Security Rules

1. **NEVER commit your .env file to git**
   - Already protected by `.gitignore`
   - Double-check before pushing

2. **Use a separate deployer wallet**
   - Don't use your main wallet
   - Create a new wallet just for deployments

3. **Limit funds in deployer wallet**
   - Only fund with amount needed for deployment
   - Don't keep large amounts in hot wallet

4. **Test on testnet first**
   - Always deploy to testnet before mainnet
   - Verify everything works with testnet funds (free)

5. **Use hardware wallet for production**
   - For mainnet deployments with significant value
   - Consider Ledger or Trezor integration

6. **Backup your private key securely**
   - Store encrypted backup offline
   - Use password manager with encryption
   - Consider multi-sig for production

7. **Monitor your deployer wallet**
   - Set up alerts for transactions
   - Regularly check for unauthorized activity

8. **Rotate keys periodically**
   - Change deployer wallet every 6-12 months
   - Especially if you suspect any compromise

### ⚠️ Things to NEVER Do

- ❌ Never share your private key with anyone
- ❌ Never post private key in Slack, Discord, etc.
- ❌ Never commit .env file to repository
- ❌ Never store private key in plain text long-term
- ❌ Never use the same wallet for dev and production
- ❌ Never ignore security warnings

---

## Getting Your Private Key

### From MetaMask

1. Open MetaMask extension
2. Click the three dots (⋮) menu
3. Select "Account details"
4. Click "Show private key"
5. Enter your MetaMask password
6. Click to reveal and copy private key
7. Paste into `.env` file

**Format:** `0x` followed by 64 hexadecimal characters

### From Coinbase Wallet

1. Open Coinbase Wallet app
2. Go to Settings
3. Select "Active wallet"
4. Click "Show recovery phrase"
5. Use a tool to derive private key from mnemonic
   - Or import mnemonic into MetaMask first
   - Then export private key from MetaMask

### From Trust Wallet

1. Open Trust Wallet app
2. Go to Settings
3. Select "Wallets"
4. Tap on your wallet
5. Tap "Show Secret Phrase"
6. Use mnemonic to derive private key (same as Coinbase)

### Creating a New Wallet

**Option 1: Using ethers.js**

```bash
# Create new random wallet
node -e "const ethers = require('ethers'); const wallet = ethers.Wallet.createRandom(); console.log('Address:', wallet.address); console.log('Private Key:', wallet.privateKey);"
```

**Option 2: Using MetaMask**

1. Install MetaMask
2. Create new account
3. Export private key (see above)

**🔒 Remember:** Save the mnemonic/seed phrase securely. This is your backup!

---

## Funding Your Wallet

### For Testnet Deployment (FREE)

Get free testnet tokens from faucets:

#### Base Sepolia (Recommended)
- **Coinbase Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- **Alchemy Faucet**: https://www.alchemy.com/faucets/base-sepolia
- Need: 0.1 ETH (free)

#### Ethereum Sepolia
- **Alchemy Faucet**: https://sepoliafaucet.com/
- **Infura Faucet**: https://www.infura.io/faucet/sepolia
- Need: 0.1 ETH (free)

#### Polygon Mumbai
- **Alchemy Faucet**: https://mumbaifaucet.com/
- **QuickNode Faucet**: https://faucet.quicknode.com/polygon/mumbai
- Need: 1 MATIC (free)

#### Arbitrum Sepolia
- **Alchemy Faucet**: https://www.alchemy.com/faucets/arbitrum-sepolia
- Need: 0.1 ETH (free)

#### Optimism Sepolia
- **Alchemy Faucet**: https://www.alchemy.com/faucets/optimism-sepolia
- Need: 0.1 ETH (free)

#### Avalanche Fuji
- **Official Faucet**: https://faucet.avax.network/
- Need: 1 AVAX (free)

#### BSC Testnet
- **Official Faucet**: https://testnet.bnbchain.org/faucet-smart
- Need: 0.1 BNB (free)

### For Mainnet Deployment (Real Money)

#### Recommended Amounts

| Chain | Amount Needed | Cost (USD) |
|-------|---------------|------------|
| Base | 0.005 ETH | ~$10 |
| Ethereum | 0.1 ETH | ~$200 |
| Polygon | 10 MATIC | ~$10 |
| Arbitrum | 0.01 ETH | ~$20 |
| Optimism | 0.01 ETH | ~$20 |
| Avalanche | 1 AVAX | ~$30 |
| BSC | 0.05 BNB | ~$15 |

#### Where to Buy Crypto

1. **Coinbase** - https://www.coinbase.com/
   - Best for beginners
   - Buy ETH with credit card or bank transfer

2. **Binance** - https://www.binance.com/
   - Lower fees
   - More trading pairs

3. **Kraken** - https://www.kraken.com/
   - Good security
   - Fiat on-ramps

#### Bridging to Other Chains

If you have ETH on Ethereum mainnet, bridge to other chains:

- **Base**: https://bridge.base.org/
- **Polygon**: https://wallet.polygon.technology/bridge
- **Arbitrum**: https://bridge.arbitrum.io/
- **Optimism**: https://app.optimism.io/bridge

---

## Verification Steps

### 1. Check Wallet Address

```bash
node -e "const ethers = require('ethers'); require('dotenv').config(); const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); console.log('Deployer Address:', wallet.address);"
```

Expected output:
```
Deployer Address: 0x1234567890abcdef1234567890abcdef12345678
```

### 2. Check Wallet Balance

```bash
# For Base Sepolia
npx hardhat run --network baseSepolia scripts/checkBalance.js

# Or use ethers directly
node -e "const ethers = require('ethers'); require('dotenv').config(); const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC || 'https://sepolia.base.org'); const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); wallet.provider.getBalance(wallet.address).then(balance => console.log('Balance:', ethers.formatEther(balance), 'ETH'));"
```

### 3. Test Network Connection

```bash
node -e "const ethers = require('ethers'); const provider = new ethers.JsonRpcProvider('https://sepolia.base.org'); provider.getBlockNumber().then(block => console.log('Connected! Current block:', block));"
```

### 4. Verify Hardhat Configuration

```bash
npx hardhat --network baseSepolia --version
```

### 5. Pre-Deployment Checklist

Before deploying, verify:

- [ ] `.env` file exists with PRIVATE_KEY
- [ ] Private key is 66 characters (0x + 64 hex)
- [ ] Deployer wallet is funded
- [ ] Network RPC is working
- [ ] Block explorer API key added (for verification)
- [ ] You're on the correct network (testnet for testing!)

---

## Common Issues

### Issue: "Invalid private key"

**Cause:** Private key format is incorrect

**Solution:**
- Ensure it starts with `0x`
- Should be exactly 66 characters
- Contains only hexadecimal characters (0-9, a-f)

Example of correct format:
```
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

### Issue: "Insufficient funds"

**Cause:** Deployer wallet doesn't have enough balance

**Solution:**
1. Check balance (see verification section)
2. Fund wallet from faucet (testnet) or exchange (mainnet)
3. Wait for transaction to confirm
4. Try deployment again

### Issue: "Network connection error"

**Cause:** RPC endpoint is down or incorrect

**Solution:**
1. Check RPC URL in `.env` or hardhat.config.js
2. Try alternative RPC provider
3. Check your internet connection
4. Use public RPC as fallback

### Issue: "Invalid API key"

**Cause:** Block explorer API key is missing or invalid

**Solution:**
1. Get API key from block explorer website
2. Add to `.env` file
3. Verify API key is active

### Issue: "Gas estimation failed"

**Cause:** Contract deployment error or network congestion

**Solution:**
1. Check contract code compiles
2. Verify constructor parameters
3. Increase gas limit manually
4. Try during off-peak hours

### Issue: "Nonce too low"

**Cause:** Transaction already submitted with this nonce

**Solution:**
1. Wait for pending transactions to confirm
2. Reset nonce if stuck
3. Increase gas price to replace transaction

---

## Network-Specific Details

### Base (Recommended for ONBT)

**Why Base?**
- Low transaction fees (~$0.01)
- Fast confirmations (~2 seconds)
- Coinbase ecosystem integration
- OnchainKit native support
- Growing DeFi ecosystem

**Setup:**
```bash
BASE_RPC=https://mainnet.base.org
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

**Deployment:**
```bash
npm run deploy:onbt:base  # Mainnet
npm run deploy:onbt:baseSepolia  # Testnet
```

### Ethereum (Most Secure)

**Why Ethereum?**
- Maximum security
- Largest ecosystem
- Most liquidity
- Highest decentralization

**Drawbacks:**
- High gas fees ($20-200 per deployment)
- Slower confirmations (~12 seconds)

**Setup:**
```bash
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC=https://sepolia.infura.io/v3/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Other Chains

Similar setup for:
- **Polygon**: Cheap, fast, EVM compatible
- **Arbitrum**: Low fees, Ethereum security
- **Optimism**: Similar to Arbitrum
- **Avalanche**: Fast finality, subnets
- **BSC**: Very cheap, high throughput

---

## Deployment Cost Estimates

### ONBT Token Deployment

| Chain | Gas Cost | USD Cost (approx) |
|-------|----------|-------------------|
| Base | 500,000 gas | ~$0.50 |
| Ethereum | 2,000,000 gas | ~$50 |
| Polygon | 1,500,000 gas | ~$0.30 |
| Arbitrum | 3,000,000 gas | ~$2 |
| Optimism | 2,500,000 gas | ~$2 |
| Avalanche | 2,000,000 gas | ~$4 |
| BSC | 1,500,000 gas | ~$0.50 |

### DeFi Ecosystem Deployment

| Contract | Gas Cost | Base Cost | Ethereum Cost |
|----------|----------|-----------|---------------|
| Staking | 2,000,000 | ~$1 | ~$50 |
| LP Pool | 3,000,000 | ~$1.50 | ~$75 |
| Yield Distributor | 1,500,000 | ~$0.75 | ~$40 |
| Factory | 1,000,000 | ~$0.50 | ~$25 |
| **Total** | 7,500,000 | ~$3.75 | ~$190 |

### Total Ecosystem Cost

| Chain | ONBT + DeFi | Total USD |
|-------|-------------|-----------|
| Base | Both | ~$4-5 |
| Ethereum | Both | ~$240-300 |
| Polygon | Both | ~$1-2 |

**💡 Recommendation:** Deploy to Base for low costs and excellent ecosystem fit!

---

## Production Best Practices

### Use Multi-Sig Wallet

For production deployments with significant value:

**Gnosis Safe:**
1. Create multi-sig wallet: https://app.safe.global/
2. Require 2-3 signers for transactions
3. Use multi-sig as owner of deployed contracts

**Benefits:**
- No single point of failure
- Requires multiple approvals
- Better security for large deployments

### Separate Deployment & Ownership

**Pattern:**
1. Deploy contracts with deployer wallet (funded)
2. Transfer ownership to multi-sig (secure)
3. Empty deployer wallet (minimize risk)

**Example:**
```solidity
// After deployment
onbt.transferOwnership(MULTISIG_ADDRESS);
```

### Use Hardware Wallet

For mainnet deployments:

**Ledger:**
- Connect Ledger to MetaMask
- Export private key NOT recommended
- Use Ledger Live for transactions

**Trezor:**
- Similar to Ledger
- Connect to MetaMask
- Sign transactions on device

### Monitor Deployments

**Set up monitoring:**
- Use Tenderly: https://tenderly.co/
- Use Defender: https://defender.openzeppelin.com/
- Set up alerts for:
  - Unusual transactions
  - Large transfers
  - Admin function calls

---

## Quick Reference

### Environment Variables

```bash
# Required
PRIVATE_KEY=0x...

# Recommended
BASE_RPC=https://mainnet.base.org
BASESCAN_API_KEY=...

# Optional (better performance)
ETHEREUM_RPC=...
POLYGON_RPC=...
ARBITRUM_RPC=...
```

### Network Names

```bash
# Mainnets
--network ethereum
--network base
--network polygon
--network arbitrum
--network optimism
--network avalanche
--network bsc

# Testnets
--network sepolia
--network baseSepolia
--network mumbai
--network arbitrumGoerli
--network optimismGoerli
--network avalancheFuji
--network bscTestnet
```

### Chain IDs

| Network | Chain ID |
|---------|----------|
| Ethereum | 1 |
| Base | 8453 |
| Polygon | 137 |
| Arbitrum | 42161 |
| Optimism | 10 |
| Avalanche | 43114 |
| BSC | 56 |
| Base Sepolia | 84532 |

### Common Commands

```bash
# Check wallet address
node -e "const ethers = require('ethers'); require('dotenv').config(); console.log(new ethers.Wallet(process.env.PRIVATE_KEY).address);"

# Check balance
npx hardhat run --network baseSepolia scripts/checkBalance.js

# Deploy ONBT
npm run deploy:onbt:baseSepolia

# Deploy DeFi
npm run deploy:defi:baseSepolia

# Verify contract
npx hardhat verify --network baseSepolia CONTRACT_ADDRESS
```

---

## Need Help?

### Documentation
- Main README: [README.md](README.md)
- Quick Setup: [QUICK_SETUP.md](QUICK_SETUP.md)
- Deployment Guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### Support Channels
- GitHub Issues: [Open an issue](https://github.com/acegrant99/ONBT-App/issues)
- Documentation: Check other .md files in repo

### Security Concerns
If you suspect your private key has been compromised:
1. Create new wallet immediately
2. Transfer all funds to new wallet
3. Update .env with new private key
4. Transfer contract ownership if deployed

---

## Summary Checklist

Before deploying, ensure:

- [ ] Created `.env` file from `.env.example`
- [ ] Added PRIVATE_KEY (starts with 0x, 66 characters)
- [ ] Wallet address verified
- [ ] Wallet funded (testnet or mainnet)
- [ ] RPC endpoints configured
- [ ] Block explorer API keys added
- [ ] Network connectivity tested
- [ ] Using separate deployer wallet (not main wallet)
- [ ] Tested on testnet first
- [ ] Security best practices reviewed

**You're ready to deploy! 🚀**

Start with testnet:
```bash
npm run deploy:onbt:baseSepolia
```

Good luck with your deployment!
