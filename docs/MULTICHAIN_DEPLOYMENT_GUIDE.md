# Multi-Chain Deployment Guide for ONBT

This guide will walk you through deploying ONBT OFT contracts to additional destination chains beyond Base and Arbitrum.

## 📋 Additional Networks Available

| Network | Chain ID | LayerZero EID | Status |
|---------|----------|---------------|--------|
| **Optimism** | 10 | 111 | 🟡 Ready to Deploy |
| **Polygon** | 137 | 109 | 🟡 Ready to Deploy |
| **BSC** | 56 | 102 | 🟡 Ready to Deploy |
| **Avalanche** | 43114 | 106 | 🟡 Ready to Deploy |
| **Ethereum** | 1 | 101 | 🟡 Ready to Deploy |

---

## 🔑 Step 1: Get API Keys

You'll need API keys from each explorer for contract verification:

### Optimism (Optimistic Etherscan)
1. Visit: https://optimistic.etherscan.io/register
2. Create account and get API key
3. Add to `.env`: `OPTIMISM_API_KEY=your_key_here`

### Polygon (PolygonScan)
1. Visit: https://polygonscan.com/register
2. Create account and get API key
3. Add to `.env`: `POLYGONSCAN_API_KEY=your_key_here`

### BSC (BscScan)
1. Visit: https://bscscan.com/register
2. Create account and get API key
3. Add to `.env`: `BSCSCAN_API_KEY=your_key_here`

### Avalanche (Snowtrace)
1. Visit: https://snowtrace.io/register
2. Create account and get API key
3. Add to `.env`: `SNOWTRACE_API_KEY=your_key_here`

### Ethereum (Etherscan)
- You already have this: `ETHERSCAN_API_KEY` (same one works)

---

## 🌐 Step 2: Update .env File

Add these RPC URLs and API keys to your `.env`:

```bash
# RPC URLs (public endpoints, replace with private if you have them)
OPTIMISM_RPC_URL=https://mainnet.optimism.io
POLYGON_RPC_URL=https://polygon-rpc.com
BSC_RPC_URL=https://bsc-dataseed1.binance.org
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc

# Explorer API Keys
OPTIMISM_API_KEY=your_optimism_key
POLYGONSCAN_API_KEY=your_polygon_key
BSCSCAN_API_KEY=your_bsc_key
SNOWTRACE_API_KEY=your_avalanche_key
```

### 📌 Alternative RPC Providers (Recommended for Production)

**Infura** (supports Optimism, Polygon, Avalanche):
```bash
OPTIMISM_RPC_URL=https://optimism-mainnet.infura.io/v3/YOUR_INFURA_KEY
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY
AVALANCHE_RPC_URL=https://avalanche-mainnet.infura.io/v3/YOUR_INFURA_KEY
```

**Alchemy** (supports Optimism, Polygon):
```bash
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

**QuickNode** (supports all networks):
- Visit: https://www.quicknode.com/
- Create endpoints for each network

---

## 🚀 Step 3: Deploy to Each Network

### Deploy to Optimism
```bash
node scripts/deploy-destination.js optimism
```

### Deploy to Polygon
```bash
node scripts/deploy-destination.js polygon
```

### Deploy to BSC
```bash
node scripts/deploy-destination.js bsc
```

### Deploy to Avalanche
```bash
node scripts/deploy-destination.js avalanche
```

### Deploy to Ethereum Mainnet
```bash
node scripts/deploy-destination.js ethereum
```

### Expected Output
Each deployment will output:
```
✅ OFT deployed to: 0x...
✅ Endpoint: 0x1a44076050125825900e736c501f859c50fE728c
✅ LayerZero Chain ID: XXX
```

**📝 IMPORTANT:** Save each contract address immediately!

---

## 🔗 Step 4: Configure Trusted Peers

After deploying to all desired networks, you must configure trusted peers so contracts can communicate.

### Create Peer Configuration File

Create `scripts/configure-multichain-peers.mjs`:

```javascript
import hre from "hardhat";
const { ethers } = hre;

// Your deployed contract addresses
const CONTRACTS = {
  base: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
  arbitrum: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
  optimism: "0x...", // Add after deployment
  polygon: "0x...",   // Add after deployment
  bsc: "0x...",       // Add after deployment
  avalanche: "0x...", // Add after deployment
  ethereum: "0x...",  // Add after deployment (if deploying to mainnet)
};

// LayerZero Endpoint IDs
const ENDPOINT_IDS = {
  ethereum: 101,
  bsc: 102,
  avalanche: 106,
  polygon: 109,
  arbitrum: 110,
  optimism: 111,
  base: 184,
};

async function configurePeers() {
  const currentNetwork = hre.network.name;
  const currentContract = CONTRACTS[currentNetwork];

  if (!currentContract) {
    throw new Error(`No contract address for network: ${currentNetwork}`);
  }

  console.log(`\n🔧 Configuring peers for ${currentNetwork}`);
  console.log(`Contract: ${currentContract}\n`);

  const OFT = await ethers.getContractAt("OmnichainNabatOFT", currentContract);

  // Configure peer for each OTHER network
  for (const [networkName, contractAddress] of Object.entries(CONTRACTS)) {
    if (networkName === currentNetwork) continue; // Skip self

    const peerEid = ENDPOINT_IDS[networkName];
    const peerBytes32 = ethers.zeroPadValue(contractAddress, 32);

    console.log(`Setting peer for ${networkName} (EID: ${peerEid})`);
    const tx = await OFT.setPeer(peerEid, peerBytes32);
    await tx.wait();
    console.log(`✅ Peer set: ${contractAddress}`);
  }

  console.log(`\n✅ All peers configured for ${currentNetwork}!`);
}

configurePeers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

### Run Peer Configuration on EACH Network

```bash
# Configure peers on Base
npx hardhat run scripts/configure-multichain-peers.mjs --network base

# Configure peers on Arbitrum
npx hardhat run scripts/configure-multichain-peers.mjs --network arbitrum

# Configure peers on Optimism
npx hardhat run scripts/configure-multichain-peers.mjs --network optimism

# Configure peers on Polygon
npx hardhat run scripts/configure-multichain-peers.mjs --network polygon

# Configure peers on BSC
npx hardhat run scripts/configure-multichain-peers.mjs --network bsc

# Configure peers on Avalanche
npx hardhat run scripts/configure-multichain-peers.mjs --network avalanche

# Configure peers on Ethereum (if deployed)
npx hardhat run scripts/configure-multichain-peers.mjs --network ethereum
```

---

## ✅ Step 5: Verify Contracts

Each network uses different explorers:

### Optimism
```bash
npx hardhat verify --network optimism <CONTRACT_ADDRESS> "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "<DELEGATE_ADDRESS>"
```

### Polygon
```bash
npx hardhat verify --network polygon <CONTRACT_ADDRESS> "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "<DELEGATE_ADDRESS>"
```

### BSC
```bash
npx hardhat verify --network bsc <CONTRACT_ADDRESS> "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "<DELEGATE_ADDRESS>"
```

### Avalanche
```bash
npx hardhat verify --network avalanche <CONTRACT_ADDRESS> "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "<DELEGATE_ADDRESS>"
```

### Ethereum
```bash
npx hardhat verify --network ethereum <CONTRACT_ADDRESS> "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "<DELEGATE_ADDRESS>"
```

---

## 🧪 Step 6: Test Cross-Chain Transfers

Test transfers between chains using LayerZero Scan:

1. Send a small test transfer (e.g., 1 ONBT) from Base to new chain
2. Monitor on LayerZero Scan: https://layerzeroscan.com
3. Verify receipt on destination chain
4. Test reverse transfer

### Test Transfer Script

Create `scripts/test-cross-chain.mjs`:

```javascript
import hre from "hardhat";
const { ethers } = hre;

async function testTransfer() {
  const [signer] = await ethers.getSigners();
  
  const oftAddress = "YOUR_CONTRACT_ADDRESS";
  const OFT = await ethers.getContractAt("OmnichainNabatOFT", oftAddress);
  
  // Destination: optimism = 111, polygon = 109, bsc = 102, avalanche = 106
  const dstEid = 111; // Optimism
  const toAddress = signer.address;
  const amount = ethers.parseEther("1"); // 1 ONBT
  
  // Get quote for gas
  const sendParam = {
    dstEid,
    to: ethers.zeroPadValue(toAddress, 32),
    amountLD: amount,
    minAmountLD: amount,
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x"
  };
  
  const fee = await OFT.quoteSend(sendParam, false);
  console.log(`Required fee: ${ethers.formatEther(fee.nativeFee)} ETH`);
  
  // Send cross-chain
  const tx = await OFT.send(sendParam, fee, toAddress, {
    value: fee.nativeFee
  });
  
  console.log(`Transaction hash: ${tx.hash}`);
  await tx.wait();
  console.log(`✅ Transfer initiated! Track on LayerZero Scan`);
}

testTransfer();
```

---

## 📊 Step 7: Update Documentation

After successful deployment, update `TOKEN_UPDATE.md` with new network details:

```markdown
### Optimism
- **Contract**: `0x...`
- **Chain ID**: 10
- **Explorer**: [View on Optimism Etherscan](https://optimistic.etherscan.io/address/0x...)
- **Status**: ✅ Verified & Operational

### Polygon
- **Contract**: `0x...`
- **Chain ID**: 137
- **Explorer**: [View on PolygonScan](https://polygonscan.com/address/0x...)
- **Status**: ✅ Verified & Operational

### BSC
- **Contract**: `0x...`
- **Chain ID**: 56
- **Explorer**: [View on BscScan](https://bscscan.com/address/0x...)
- **Status**: ✅ Verified & Operational

### Avalanche C-Chain
- **Contract**: `0x...`
- **Chain ID**: 43114
- **Explorer**: [View on Snowtrace](https://snowtrace.io/address/0x...)
- **Status**: ✅ Verified & Operational

### Ethereum Mainnet
- **Contract**: `0x...`
- **Chain ID**: 1
- **Explorer**: [View on Etherscan](https://etherscan.io/address/0x...)
- **Status**: ✅ Verified & Operational
```

---

## 💰 Estimated Costs

| Network | Gas Price | Deployment Cost | Peer Config Cost | Total |
|---------|-----------|-----------------|------------------|-------|
| Optimism | ~0.001 Gwei | ~$0.10 | ~$0.50 | ~$0.60 |
| Polygon | ~30 Gwei | ~$0.05 | ~$0.25 | ~$0.30 |
| BSC | ~3 Gwei | ~$0.30 | ~$1.50 | ~$1.80 |
| Avalanche | ~25 nAVAX | ~$0.50 | ~$2.50 | ~$3.00 |
| Ethereum | ~15 Gwei | ~$15 | ~$75 | ~$90 |

**Total Estimated Cost**: ~$95-100 (varies with gas prices)

💡 **Pro Tip**: Deploy to cheaper networks first to test your setup!

---

## 🔍 Troubleshooting

### "insufficient funds" error
- Ensure you have native tokens on deployment wallet
- Optimism/Base: ETH
- Polygon: MATIC
- BSC: BNB
- Avalanche: AVAX

### "already verified" error
- Contract already verified, can be ignored

### Peer configuration fails
- Ensure all contracts are deployed first
- Check contract addresses are correct
- Verify you have gas tokens on each network

### Cross-chain transfer fails
- Verify peers are configured on BOTH chains
- Check LayerZero Scan for error messages
- Ensure sufficient native token for gas + LayerZero fees (~$0.15)

---

## 📚 Additional Resources

- **LayerZero Docs**: https://docs.layerzero.network
- **LayerZero Scan**: https://layerzeroscan.com
- **Supported Chains**: https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts

---

## 🎯 Quick Start Checklist

- [ ] Get API keys for all explorers
- [ ] Update `.env` with RPC URLs and API keys
- [ ] Deploy contracts to desired networks
- [ ] Save all contract addresses
- [ ] Create peer configuration script
- [ ] Run peer configuration on ALL networks
- [ ] Verify contracts on explorers
- [ ] Test cross-chain transfers
- [ ] Update TOKEN_UPDATE.md
- [ ] Announce to community!

---

**Need Help?** Check the LayerZero Discord or open an issue on GitHub.
