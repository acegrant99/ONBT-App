# ONBT-App Setup Guide

This guide will help you set up the ONBT-App for development and testing.

## Quick Start

1. **Clone the repository** (if not already done)
2. **Copy environment file**: `cp .env.example .env`
3. **Get testnet ETH** (see below)
4. **Run the application**

## Understanding Testnets vs Mainnet

### What are Testnets?

- **Testnets** are blockchain networks for testing and development
- Testnet tokens (like testnet ETH) have **no real value**
- Testnet tokens are **free** and can be obtained from faucets
- Perfect for learning and testing without financial risk

### What is Mainnet?

- **Mainnet** is the real Ethereum blockchain
- Mainnet ETH has **real monetary value**
- You need to **buy** mainnet ETH with real money
- Used for production applications only

### Why This Error Happens

If you see "I don't have enough ETH on mainnet for faucet tokens", it means:

1. Your wallet is connected to **mainnet** instead of a testnet
2. You're trying to get faucet tokens on mainnet (which doesn't exist)
3. You need to switch to a testnet network

## Step-by-Step Setup

### Step 1: Install MetaMask (or another Web3 wallet)

1. Install MetaMask browser extension from https://metamask.io
2. Create a new wallet or import an existing one
3. **IMPORTANT**: Use a separate wallet for testnet development

### Step 2: Add Testnet Networks to MetaMask

#### Add Ethereum Sepolia Testnet

1. Open MetaMask
2. Click the network dropdown (top of MetaMask)
3. Click "Add Network" or "Add Network Manually"
4. Enter these details:
   - **Network Name**: Sepolia Test Network
   - **RPC URL**: `https://eth-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.etherscan.io`

#### Add Base Sepolia Testnet

1. Open MetaMask
2. Click the network dropdown
3. Click "Add Network" or "Add Network Manually"
4. Enter these details:
   - **Network Name**: Base Sepolia
   - **RPC URL**: `https://base-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd`
   - **Chain ID**: `84532`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.basescan.org`

### Step 3: Get Free Testnet ETH

#### Option A: Ethereum Sepolia Faucets

Visit any of these faucets (may require social media verification):

1. **Alchemy Sepolia Faucet** (Recommended)
   - URL: https://sepoliafaucet.com/
   - Requires: Alchemy account (free)
   - Amount: 0.5 ETH per day

2. **Infura Sepolia Faucet**
   - URL: https://www.infura.io/faucet/sepolia
   - Requires: Infura account (free)
   - Amount: 0.5 ETH per day

3. **QuickNode Sepolia Faucet**
   - URL: https://faucet.quicknode.com/ethereum/sepolia
   - Requires: Twitter account
   - Amount: 0.05 ETH

4. **Sepolia PoW Faucet**
   - URL: https://sepolia-faucet.pk910.de/
   - Requires: Mining in browser (no sign-up)
   - Amount: Variable based on mining

#### Option B: Base Sepolia Faucets

1. **Coinbase Base Sepolia Faucet**
   - URL: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
   - Requires: Coinbase account
   - Amount: 0.1 ETH per day

2. **Alchemy Base Sepolia Faucet**
   - URL: https://www.alchemy.com/faucets/base-sepolia
   - Requires: Alchemy account
   - Amount: 0.5 ETH per day

#### Option C: Bridge from Sepolia to Base Sepolia

If you have Sepolia ETH and need Base Sepolia ETH:

1. Visit: https://bridge.base.org/
2. Connect your wallet
3. Switch to Sepolia network
4. Bridge ETH to Base Sepolia (takes ~10 minutes)

### Step 4: Verify Your Setup

1. **Check your wallet**:
   - Open MetaMask
   - Switch to "Sepolia Test Network"
   - Verify you have some ETH balance (even 0.01 ETH is enough to start)

2. **Check your network**:
   - Make sure you're NOT on "Ethereum Mainnet"
   - You should see "Sepolia Test Network" or "Base Sepolia"

3. **Verify .env configuration**:
   - Open `.env` file
   - Confirm `NETWORK=testnet`
   - Confirm RPC URLs contain "sepolia"

## Common Issues

### Issue: "Not enough ETH on mainnet"

**Solution**: You're on the wrong network!
1. Open MetaMask
2. Switch to "Sepolia Test Network" (NOT "Ethereum Mainnet")
3. Get free testnet ETH from faucets above

### Issue: "Insufficient funds"

**Solution**: Get more testnet ETH
1. Visit one of the faucets listed above
2. Request testnet ETH (it's free!)
3. Wait for transaction to confirm (~1-2 minutes)

### Issue: "Network not supported"

**Solution**: Add the testnet to your wallet
1. Follow Step 2 above to add Sepolia or Base Sepolia
2. Make sure Chain ID matches exactly

### Issue: "Cannot connect to RPC"

**Solution**: Check your .env configuration
1. Verify RPC URLs are correct
2. Make sure Alchemy API key is valid
3. Try a different RPC endpoint if needed

## Security Best Practices

1. **Never use your mainnet wallet for testnet development**
2. **Never commit private keys to git** (they're in .gitignore)
3. **Never share your private keys** with anyone
4. **Use a separate wallet** for development
5. **Don't store real ETH** in testnet wallets

## Additional Resources

- Ethereum Sepolia Testnet Info: https://sepolia.dev/
- Base Documentation: https://docs.base.org/
- MetaMask Documentation: https://docs.metamask.io/
- Web3 Best Practices: https://consensys.github.io/smart-contract-best-practices/

## Need Help?

If you're still having issues:
1. Double-check you're on a testnet (not mainnet)
2. Verify you have testnet ETH in your wallet
3. Check the .env file configuration
4. Review error messages carefully - they usually indicate the specific issue
