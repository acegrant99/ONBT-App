# ⚡ Quick Setup Guide - Get Started in 15 Minutes

This guide will get you from zero to your first testnet deployment in about 15 minutes.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] A code editor (VS Code recommended)
- [ ] MetaMask or another Web3 wallet

---

## 🚀 Step 1: Environment Setup (5 minutes)

### 1.1 Create .env file
```bash
cd /path/to/ONBT-App
cp .env.example .env
```

### 1.2 Get RPC Endpoints (Free)

**Option A: Alchemy (Recommended)**
1. Go to https://alchemy.com
2. Sign up for free account
3. Create new app for "Base Sepolia"
4. Copy the RPC URL
5. Create another app for "Ethereum Sepolia"
6. Copy that RPC URL

**Option B: Public RPCs (Quick but less reliable)**
- Base Sepolia: `https://sepolia.base.org`
- Ethereum Sepolia: `https://rpc.sepolia.org`

### 1.3 Update .env file

Open `.env` in your editor and add:

```bash
# CRITICAL: Use a NEW wallet for testnet, NOT your real wallet!
PRIVATE_KEY=your_testnet_private_key_here

# RPC endpoints
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 1.4 Create Testnet Wallet

**IMPORTANT**: Create a NEW wallet just for testing. Don't use your mainnet wallet!

**Option A: MetaMask**
1. Open MetaMask
2. Click account icon → Create Account
3. Name it "ONBT Testnet"
4. Click three dots → Account Details → Show Private Key
5. Copy private key to `.env`

**Option B: Generate with ethers**
```bash
node -e "console.log(require('ethers').Wallet.createRandom().privateKey)"
```

### 1.5 Get Testnet Tokens (Free)

**Base Sepolia ETH**:
1. Go to https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. Connect your wallet or enter address
3. Request 0.1 ETH (usually instant)

**Ethereum Sepolia ETH**:
1. Go to https://sepoliafaucet.com
2. Enter your address
3. Request ETH (may require Alchemy login)

**Verify you got the tokens**:
- Base Sepolia: https://sepolia.basescan.org/address/YOUR_ADDRESS
- Ethereum Sepolia: https://sepolia.etherscan.io/address/YOUR_ADDRESS

---

## 🔨 Step 2: First Deployment - Hub Chain (5 minutes)

### 2.1 Set Deployment Type

```bash
export DEPLOYMENT_TYPE=hub
```

This tells the script to mint the full 1 billion token supply.

### 2.2 Deploy to Base Sepolia

```bash
npm run deploy:onbt:baseSepolia
```

**Expected output**:
```
🚀 Deploying OmnichainNabatOFT...
✅ Deployment Type: HUB
✅ Hub Chain: YES (will mint full supply)
✅ OmnichainNabatOFT deployed to: 0x1234...
✅ Total Supply: 1,000,000,000 ONBT (FULL SUPPLY - HUB CHAIN)
✅ Deployer ONBT Balance: 1,000,000,000 ONBT
```

### 2.3 Save Contract Address

**CRITICAL**: Save this address somewhere safe! You'll need it.

```bash
# Copy the contract address from the output
export ONBT_BASE_SEPOLIA=0x... # YOUR CONTRACT ADDRESS HERE

# Or add it to .env permanently
echo "ONBT_BASE_SEPOLIA=$ONBT_BASE_SEPOLIA" >> .env
```

### 2.4 Verify on Block Explorer

1. Go to https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS
2. You should see:
   - Contract creation transaction
   - Your address with 1,000,000,000 ONBT balance

---

## 🌉 Step 3: Deploy Destination Chain (5 minutes)

### 3.1 Set Deployment Type to Destination

```bash
export DEPLOYMENT_TYPE=destination
```

This tells the script to mint ZERO tokens (empty contract).

### 3.2 Deploy to Ethereum Sepolia

```bash
npm run deploy:onbt:ethereum
```

**Expected output**:
```
🚀 Deploying OmnichainNabatOFT...
✅ Deployment Type: DESTINATION
✅ Hub Chain: NO (will mint 0 tokens)
✅ OmnichainNabatOFT deployed to: 0x5678...
✅ Total Supply: 0 ONBT (DESTINATION CHAIN)
✅ Deployer ONBT Balance: 0 ONBT
```

### 3.3 Save This Address Too

```bash
export ONBT_ETHEREUM_SEPOLIA=0x... # YOUR CONTRACT ADDRESS HERE
echo "ONBT_ETHEREUM_SEPOLIA=$ONBT_ETHEREUM_SEPOLIA" >> .env
```

### 3.4 Verify on Etherscan

1. Go to https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
2. You should see:
   - Contract creation transaction
   - Total supply: 0 (this is correct!)

---

## 🎉 Success! What You've Accomplished

In just 15 minutes, you've:
- ✅ Set up your development environment
- ✅ Created a testnet wallet
- ✅ Got free testnet tokens
- ✅ Deployed ONBT on Base Sepolia (hub chain) with 1B supply
- ✅ Deployed ONBT on Ethereum Sepolia (destination) with 0 supply
- ✅ Verified both deployments on block explorers

---

## 🔍 Quick Verification

Let's verify everything worked:

### Check Hub Chain (Base Sepolia)
```bash
# Check your balance (should be 1 billion)
npx hardhat console --network baseSepolia

# In the console:
const ONBT = await ethers.getContractAt("OmnichainNabatOFT", process.env.ONBT_BASE_SEPOLIA)
const balance = await ONBT.balanceOf("YOUR_ADDRESS")
console.log("Balance:", ethers.formatEther(balance)) // Should show 1000000000.0
```

### Check Destination Chain (Ethereum Sepolia)
```bash
# Check total supply (should be 0)
npx hardhat console --network ethereum

# In the console:
const ONBT = await ethers.getContractAt("OmnichainNabatOFT", process.env.ONBT_ETHEREUM_SEPOLIA)
const totalSupply = await ONBT.totalSupply()
console.log("Total Supply:", ethers.formatEther(totalSupply)) // Should show 0.0
```

---

## 🎯 What's Next?

You've completed the basic deployment! Here are your next steps:

### Option 1: Test Cross-Chain Transfer (Recommended)
Continue to NEXT_STEPS.md → Phase 1.4: "Configure Cross-Chain"

This will let you bridge tokens from Base to Ethereum.

### Option 2: Build a UI
Read UI_INTEGRATION_GUIDE.md to build a web interface where users can:
- See their balances
- Transfer tokens between chains
- View transaction history

### Option 3: Deploy to More Chains
Repeat Step 3 for other chains:
- Polygon Mumbai
- Arbitrum Sepolia
- Optimism Sepolia

Just remember: Always use `DEPLOYMENT_TYPE=destination` for any chain after the hub!

### Option 4: Explore Documentation
- SUPPLY_MODEL.md - Understanding token supply
- BRIDGING_ARCHITECTURE.md - How cross-chain works
- ONBT_SPECIFICATION.md - Technical details

---

## ❓ Troubleshooting

### "Insufficient funds" error
**Problem**: Not enough ETH for gas  
**Solution**: Get more testnet ETH from faucets

### "Network not found" error
**Problem**: RPC URL not configured  
**Solution**: Check `.env` file has correct RPC URLs

### "Invalid private key" error
**Problem**: Private key format wrong  
**Solution**: Should be 64 hex characters, starting with or without 0x

### "Contract already deployed" error
**Problem**: Trying to deploy twice  
**Solution**: This is fine! Use the first deployment address

### Can't find contract on explorer
**Problem**: Transaction might still be pending  
**Solution**: Wait 30 seconds, then refresh the page

---

## 🆘 Need Help?

1. **Check the docs**: You have 70,000+ words of documentation!
   - NEXT_STEPS.md - Detailed roadmap
   - DEPLOYMENT_CHECKLIST.md - Full checklist
   - QUICK_REFERENCE.md - Quick lookups

2. **Review the error message**: Most errors are self-explanatory
   - "Insufficient funds" → Need more ETH
   - "Network error" → Check RPC URL
   - "Private key" → Check .env file

3. **Test on testnet first**: That's what it's for!
   - Testnet tokens are free
   - You can deploy as many times as you want
   - No risk of losing real money

4. **Ask the community**:
   - LayerZero Discord: https://discord.gg/layerzero
   - Base Discord: https://discord.gg/buildonbase

---

## 🎊 Congratulations!

You've successfully deployed your first omnichain token! 🚀

**What you built**:
- An immutable token (1 billion supply, can't mint more)
- Cross-chain compatible (can bridge between networks)
- Professional branding system
- Production-ready smart contracts

**Next**: Follow NEXT_STEPS.md for the complete roadmap to production!

---

## 📚 Quick Links

| Document | Purpose |
|----------|---------|
| NEXT_STEPS.md | Complete roadmap to production |
| DEPLOYMENT_CHECKLIST.md | Track your progress |
| UI_INTEGRATION_GUIDE.md | Build the web interface |
| SUPPLY_MODEL.md | Understand how supply works |
| BRIDGING_ARCHITECTURE.md | Understand cross-chain |
| QUICK_REFERENCE.md | Quick function reference |

**Happy building! 🎯**
