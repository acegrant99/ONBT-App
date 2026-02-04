# Quick Reference Guide

## 🚀 TRY FAUCETS NOW

### Get Free Testnet ETH in 2 Minutes:

1. **[🎯 Ethereum Sepolia → Click Here](https://sepoliafaucet.com/)** (Get 0.5 ETH)
2. **[🎯 Base Sepolia → Click Here](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)** (Get 0.1 ETH)

> ⚠️ **Important**: Switch your wallet to Sepolia testnet first!

📚 **See [FAUCETS.md](FAUCETS.md) for all faucet options**

---

## I Need Testnet ETH - Where Do I Get It?

### Fastest Options (No Mining Required)

1. **Alchemy Sepolia Faucet** ⭐ RECOMMENDED
   - URL: https://sepoliafaucet.com/
   - Amount: 0.5 ETH per day
   - Requires: Free Alchemy account

2. **Coinbase Base Sepolia Faucet** ⭐ RECOMMENDED
   - URL: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
   - Amount: 0.1 ETH per day
   - Requires: Coinbase account

### Important Chain IDs

- **Ethereum Sepolia**: `11155111`
- **Base Sepolia**: `84532`

### RPC Endpoints (Already in .env)

```
ETH_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd
```

## Error: "Not enough ETH on mainnet"

### Quick Fix:
1. Open MetaMask (or your wallet)
2. Click network dropdown at top
3. Switch to **"Sepolia Test Network"** (NOT "Ethereum Mainnet")
4. Get free testnet ETH from faucets above

### Why This Happens:
- You're connected to **mainnet** (real ETH with real value)
- You need **testnet** (free ETH with no value)
- Faucets only work on testnets

## Network Setup in MetaMask

### Add Ethereum Sepolia:
1. Click network dropdown → "Add Network"
2. Fill in:
   - **Network**: Sepolia Test Network
   - **RPC**: `https://eth-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd`
   - **Chain ID**: `11155111`
   - **Symbol**: ETH

### Add Base Sepolia:
1. Click network dropdown → "Add Network"
2. Fill in:
   - **Network**: Base Sepolia
   - **RPC**: `https://base-sepolia.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd`
   - **Chain ID**: `84532`
   - **Symbol**: ETH

## How Much ETH Do I Need?

- **For testing**: 0.01-0.1 ETH is plenty
- **Gas fees on testnet**: Very cheap (a few transactions cost ~0.001 ETH)
- **Faucets give**: Usually 0.05-0.5 ETH per request

## Still Need Help?

See **SETUP.md** for detailed step-by-step instructions.
