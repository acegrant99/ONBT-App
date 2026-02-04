# ONabat (ONBT) Deployment Guide

## Overview

This guide explains how to deploy ONabat (ONBT) token using LayerZero's peer-based architecture. **No proxy contracts are needed on destination chains** - we use LayerZero's trusted remote (peer) configuration instead.

## Token Details

- **Name**: ONabat
- **Symbol**: ONBT
- **Total Supply**: 1,000,000,000 ONBT (1 billion, immutable)
- **Website**: https://nabat.finance (Vercel deployment)
- **Architecture**: Peer-based cross-chain (no proxies)

---

## Deployment Architecture

### Peer-Based vs Proxy-Based

**Peer-Based (ONBT Approach - ✅ Recommended)**:
- Deploy same contract on all chains
- Set trusted remotes (peers) between chains
- Direct cross-chain communication
- Simpler architecture
- Lower gas costs
- Better security

**Proxy-Based (Not Used)**:
- Deploy main contract on source chain
- Deploy proxy contracts on destination chains
- More complex architecture
- Higher deployment costs
- Not needed for ONBT

---

## Deployment Steps

### 1. Prepare Environment

Create `.env` file with your configuration:

```bash
# Deployer private key
PRIVATE_KEY=your_private_key_here

# RPC URLs for each chain
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
BSC_RPC_URL=https://bsc-dataseed.binance.org/

# Testnet (Base Sepolia for testing)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### 2. Configure Branding

Edit `scripts/deployONBT.mjs` to set your branding:

```javascript
const ONBT_CONFIG = {
  name: "ONabat",
  symbol: "ONBT",
  sharedDecimals: 8,
  totalSupply: "1000000000", // 1 billion
  
  branding: {
    logoURI: "ipfs://QmYourLogoHashHere",
    website: "https://nabat.finance",
    description: "ONabat (ONBT) - 1B supply immutable omnichain token",
    socialLinks: JSON.stringify({
      twitter: "https://twitter.com/nabatfinance",
      telegram: "https://t.me/nabatfinance",
      discord: "https://discord.gg/nabatfinance",
      github: "https://github.com/acegrant99/ONBT-App",
      website: "https://nabat.finance"
    })
  }
};
```

### 3. Deploy on Source Chain (Base)

Deploy the main contract on Base (your primary chain):

```bash
npm run deploy:onbt:base
```

**Save the contract address!** You'll need it for all chains.

Expected output:
```
✅ OmnichainNabatOFT deployed successfully!
Contract Address: 0x1234...5678
Total Supply: 1000000000 ONBT (immutable)
```

### 4. Deploy on Destination Chains

Deploy the **same contract** on all destination chains:

```bash
# Ethereum
npm run deploy:onbt:ethereum

# Polygon
npm run deploy:onbt:polygon

# Arbitrum
npm run deploy:onbt:arbitrum

# Optimism
npm run deploy:onbt:optimism

# Avalanche
npm run deploy:onbt:avalanche

# BSC
npm run deploy:onbt:bsc
```

**Important Notes**:
- Each deployment creates a new contract with 1B supply
- Only the source chain (Base) will have circulating supply initially
- Tokens are transferred cross-chain via LayerZero messaging
- No supply duplication - tokens are locked on source when sent

### 5. Record All Addresses

Create a file to track all deployments:

```javascript
// deployed-addresses.json
{
  "base": "0x1234...5678",
  "ethereum": "0xabcd...efab",
  "polygon": "0x9876...5432",
  "arbitrum": "0xfedc...ba98",
  "optimism": "0x1111...2222",
  "avalanche": "0x3333...4444",
  "bsc": "0x5555...6666"
}
```

### 6. Set Trusted Remotes (Peers)

Configure cross-chain communication by setting trusted remotes:

```javascript
// scripts/setTrustedRemotesPeers.mjs
import { ChainConfig } from "../constants/layerzero.mjs";

const DEPLOYED_ADDRESSES = {
  base: "0x...",
  ethereum: "0x...",
  polygon: "0x...",
  // ... all chains
};

async function setTrustedRemotes() {
  const network = await ethers.provider.getNetwork();
  const currentChain = network.name;
  const currentAddress = DEPLOYED_ADDRESSES[currentChain];
  
  const onbt = await ethers.getContractAt("OmnichainNabatOFT", currentAddress);
  
  // Set trusted remote for each other chain
  for (const [chainName, address] of Object.entries(DEPLOYED_ADDRESSES)) {
    if (chainName !== currentChain) {
      const remoteChainId = ChainConfig[chainName].lzChainId;
      const trustedRemote = ethers.solidityPacked(
        ["address", "address"],
        [address, currentAddress]
      );
      
      await onbt.setTrustedRemote(remoteChainId, trustedRemote);
      console.log(`✅ Set trusted remote for ${chainName}`);
    }
  }
}
```

Run on **each chain**:

```bash
# On Base
npx hardhat run scripts/setTrustedRemotesPeers.mjs --network base

# On Ethereum
npx hardhat run scripts/setTrustedRemotesPeers.mjs --network ethereum

# Repeat for all chains...
```

### 7. Verify Deployments

Verify contracts on block explorers:

```bash
# Base
npx hardhat verify --network base <address> <constructor-args>

# Ethereum
npx hardhat verify --network ethereum <address> <constructor-args>

# Continue for all chains...
```

---

## Cross-Chain Transfers

### How It Works (Peer-Based)

1. User calls `sendFrom()` on source chain (e.g., Base)
2. Tokens are **burned/locked** on source chain
3. LayerZero message sent to destination chain
4. Tokens are **minted/unlocked** on destination chain
5. Total supply across all chains remains 1B

### Example Transfer

```javascript
// Transfer 1000 ONBT from Base to Ethereum
const amount = ethers.parseEther("1000");
const toAddress = "0xRecipient...";
const destChainId = 101; // Ethereum LayerZero Chain ID

// Estimate fees
const fees = await onbt.estimateSendFee(
  destChainId,
  toAddress,
  amount,
  false,
  "0x"
);

// Send tokens
await onbt.sendFrom(
  senderAddress,
  destChainId,
  toAddress,
  amount,
  senderAddress, // refund address
  ethers.ZeroAddress, // zro payment address
  "0x", // adapter params
  { value: fees.nativeFee }
);
```

---

## Vercel Deployment (Website)

### Configure nabat.finance

1. **Create Vercel Project**:
   - Connect your GitHub repo
   - Select the web frontend directory
   - Configure build settings

2. **Add Custom Domain**:
   - Go to Project Settings → Domains
   - Add `nabat.finance`
   - Add `www.nabat.finance`
   - Follow Vercel's DNS configuration

3. **Environment Variables**:
   ```
   NEXT_PUBLIC_ONBT_BASE=0x...
   NEXT_PUBLIC_ONBT_ETHEREUM=0x...
   NEXT_PUBLIC_ONBT_POLYGON=0x...
   # ... all contract addresses
   ```

4. **Deploy**:
   ```bash
   # Automatic deployment on git push
   git push origin main
   ```

---

## Architecture Benefits

### Why Peer-Based?

✅ **Simpler**: No proxy contracts needed  
✅ **Cheaper**: Lower gas costs for deployment  
✅ **Faster**: Direct peer communication  
✅ **Cleaner**: Same contract on all chains  
✅ **Secure**: Trusted remote validation  

### Why Not Proxy-Based?

❌ More complex architecture  
❌ Higher deployment costs  
❌ Additional proxy maintenance  
❌ Not needed for immutable tokens  

---

## Testing Checklist

Before mainnet deployment, test on Base Sepolia:

- [ ] Deploy contract successfully
- [ ] Verify immutable supply (1B tokens)
- [ ] Update branding metadata
- [ ] Deploy on second testnet chain
- [ ] Set trusted remotes
- [ ] Send tokens cross-chain
- [ ] Verify token receipt
- [ ] Check balance on both chains
- [ ] Test with different addresses
- [ ] Verify total supply remains constant

---

## Mainnet Deployment Checklist

- [ ] Upload logo to IPFS
- [ ] Update branding in deployONBT.mjs
- [ ] Fund deployer wallet on all chains (for gas)
- [ ] Deploy on Base (source chain)
- [ ] Deploy on all destination chains
- [ ] Record all contract addresses
- [ ] Set trusted remotes on all chains
- [ ] Verify contracts on explorers
- [ ] Test cross-chain transfer
- [ ] Update Vercel with addresses
- [ ] Deploy website to nabat.finance
- [ ] Announce launch

---

## Support & Resources

- **Website**: https://nabat.finance
- **GitHub**: https://github.com/acegrant99/ONBT-App
- **LayerZero Docs**: https://layerzero.gitbook.io/
- **LayerZero Scan**: https://layerzeroscan.com/

---

## Summary

**Deployment Model**: Peer-based (no proxies)  
**Total Supply**: 1 billion ONBT (immutable)  
**Chains**: Base, Ethereum, Polygon, Arbitrum, Optimism, Avalanche, BSC  
**Website**: nabat.finance (Vercel)  
**Architecture**: Simple, secure, cost-effective  

✅ **Ready for production deployment!**
