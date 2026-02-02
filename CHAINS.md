# Multi-Chain SDK Integration Guide

Complete SDK and toolkit integrations for all destination chains in the Nabat Omnichain Ecosystem.

## 📦 Overview

We've integrated SDKs and ecosystem tools for all major blockchain networks, providing developers with chain-specific utilities comparable to our Coinbase integration.

## 🌐 Supported Chains

| Chain | SDK Module | Key Features |
|-------|-----------|--------------|
| **Ethereum** | `eth-sdk.mjs` | ENS, DeFi protocols, EVM utilities |
| **Polygon** | `polygon-sdk.mjs` | PoS Bridge, zkEVM, Gas Station |
| **Arbitrum** | `arbitrum-sdk.mjs` | Nitro, Stylus, L2 bridges |
| **Optimism** | `optimism-sdk.mjs` | Bedrock, Superchain, Attestations |
| **Avalanche** | `avalanche-sdk.mjs` | Subnets, C/P/X chains, Core wallet |
| **BSC** | `bsc-sdk.mjs` | opBNB, BEP tokens, GameFi |
| **Base** | Coinbase SDKs | AgentKit, CDP, OnchainKit, Wallet SDK |

## 📁 Project Structure

```
integrations/
├── coinbase/          # Coinbase/Base ecosystem
│   ├── agentkit.mjs
│   ├── cdp-sdk.mjs
│   ├── onchainkit.mjs
│   └── wallet-sdk.mjs
├── ethereum/          # Ethereum ecosystem
│   └── eth-sdk.mjs
├── polygon/           # Polygon ecosystem
│   └── polygon-sdk.mjs
├── arbitrum/          # Arbitrum ecosystem
│   └── arbitrum-sdk.mjs
├── optimism/          # Optimism ecosystem
│   └── optimism-sdk.mjs
├── avalanche/         # Avalanche ecosystem
│   └── avalanche-sdk.mjs
└── bsc/               # BSC ecosystem
    └── bsc-sdk.mjs
```

---

## 1. Ethereum Integration

### Features
- **ENS Resolution**: Resolve names and reverse lookups
- **Gas Price Monitoring**: Real-time gas price data
- **ERC20/721 Support**: Token and NFT utilities
- **DeFi Protocols**: Uniswap, Aave, Curve integrations

### Quick Start

```javascript
import { 
  getEthereumProvider, 
  getENSName, 
  getETHBalance,
  EthereumDeFi 
} from './integrations/ethereum/eth-sdk.mjs';

// Get provider
const provider = getEthereumProvider("mainnet");

// Resolve ENS
const ensName = await getENSName("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
// Returns: "vitalik.eth"

// Check balance
const balance = await getETHBalance("vitalik.eth", provider);
console.log(`Balance: ${balance} ETH`);

// Access DeFi protocols
console.log("Uniswap V3:", EthereumDeFi.uniswapV3Router);
```

### Key Utilities
- `getENSName()` - Reverse ENS lookup
- `resolveENS()` - Forward ENS resolution
- `getGasPrice()` - Current gas prices
- `getERC20Balance()` - Token balances
- `EthereumDeFi` - DeFi protocol addresses

---

## 2. Polygon Integration

### Features
- **PoS Bridge**: Cross-chain asset transfers
- **Gas Station**: Real-time gas price recommendations
- **zkEVM Support**: Polygon zkEVM utilities
- **DeFi Protocols**: QuickSwap, Aave, Curve

### Quick Start

```javascript
import { 
  getPolygonProvider, 
  getMATICBalance,
  getPolygonGasPrice,
  PolygonBridge 
} from './integrations/polygon/polygon-sdk.mjs';

// Get provider
const provider = getPolygonProvider("mainnet");

// Check MATIC balance
const balance = await getMATICBalance(address, provider);

// Get gas prices
const gasPrice = await getPolygonGasPrice();
console.log("Standard:", gasPrice.standard);

// Bridge estimation
console.log("Bridge time:", PolygonBridge.estimateBridgeTime("eth-to-polygon"));
// Output: "7-8 minutes"
```

### Key Features
- `getPolygonGasPrice()` - Live gas recommendations
- `PolygonBridge` - Bridge utilities and timing
- `PolygonZkEVM` - zkEVM-specific tools
- `PolygonDeFi` - Native DeFi protocols

---

## 3. Arbitrum Integration

### Features
- **Nitro Technology**: Latest Arbitrum upgrades
- **Stylus Support**: WASM contract information
- **L2 Bridge**: Ethereum ↔ Arbitrum bridging
- **DeFi Protocols**: GMX, Camelot, Radiant

### Quick Start

```javascript
import { 
  getArbitrumProvider, 
  getArbitrumETHBalance,
  ArbitrumBridge,
  ArbitrumNitro 
} from './integrations/arbitrum/arbitrum-sdk.mjs';

// Get provider
const provider = getArbitrumProvider("one");

// Check balance
const balance = await getArbitrumETHBalance(address, provider);

// Bridge information
console.log("L1 → L2:", ArbitrumBridge.estimateBridgeTime("l1-to-l2"));
// Output: "10-15 minutes"

console.log("L2 → L1:", ArbitrumBridge.estimateBridgeTime("l2-to-l1"));
// Output: "~7 days (challenge period)"

// Nitro features
console.log("Nitro features:", ArbitrumNitro.features);
```

### Key Features
- `ArbitrumNitro` - Nitro upgrade information
- `ArbitrumStylus` - WASM smart contract support
- `ArbitrumBridge` - Cross-chain bridge utilities
- `ArbitrumDeFi` - Native protocols (GMX, Camelot)

---

## 4. Optimism Integration

### Features
- **Bedrock Upgrade**: Latest OP Stack features
- **Superchain**: Multi-chain OP Stack network
- **Attestation Station**: On-chain identity/reputation
- **DeFi Protocols**: Velodrome, Synthetix

### Quick Start

```javascript
import { 
  getOptimismProvider, 
  getOptimismETHBalance,
  OptimismSuperchain,
  OptimismBedrock 
} from './integrations/optimism/optimism-sdk.mjs';

// Get provider
const provider = getOptimismProvider("mainnet");

// Check balance
const balance = await getOptimismETHBalance(address, provider);

// Superchain networks
console.log("Superchain members:", OptimismSuperchain.networks);
// Includes: Optimism, Base, Zora, Mode

// Bedrock features
console.log("Bedrock features:", OptimismBedrock.features);
```

### Key Features
- `OptimismBedrock` - Bedrock upgrade details
- `OptimismSuperchain` - Superchain network info
- `OptimismAttestation` - Identity/reputation system
- `OptimismDeFi` - Native protocols (Velodrome, Synthetix)

---

## 5. Avalanche Integration

### Features
- **Subnets**: Custom blockchain networks
- **C/P/X Chains**: Primary network chains
- **Core Wallet**: Official wallet integration
- **Sub-second Finality**: Avalanche consensus

### Quick Start

```javascript
import { 
  getAvalancheProvider, 
  getAVAXBalance,
  AvalancheSubnets,
  AvalancheConsensus 
} from './integrations/avalanche/avalanche-sdk.mjs';

// Get provider
const provider = getAvalancheProvider("mainnet");

// Check AVAX balance
const balance = await getAVAXBalance(address, provider);

// Subnet information
console.log("Subnets:", AvalancheSubnets.examples);

// Consensus features
console.log("Finality:", AvalancheConsensus.features);
// Includes: "Sub-second finality", "High throughput (4,500+ TPS)"
```

### Key Features
- `AvalancheChains` - C/P/X chain information
- `AvalancheSubnets` - Subnet utilities and examples
- `AvalancheConsensus` - Consensus mechanism details
- `AvalancheDeFi` - Trader Joe, Pangolin, Benqi

---

## 6. BSC Integration

### Features
- **opBNB Layer 2**: BSC's L2 solution
- **BEP Token Standards**: BEP20, BEP721, BEP1155
- **GameFi Hub**: Gaming and metaverse projects
- **DeFi Protocols**: PancakeSwap, Venus, Alpaca

### Quick Start

```javascript
import { 
  getBSCProvider, 
  getBNBBalance,
  opBNB,
  BSCDeFi 
} from './integrations/bsc/bsc-sdk.mjs';

// Get provider
const provider = getBSCProvider("mainnet");

// Check BNB balance
const balance = await getBNBBalance(address, provider);

// opBNB information
console.log("opBNB features:", opBNB.features);
// Includes: "Lower gas fees (~$0.001 per tx)", "Higher throughput"

// DeFi protocols
console.log("PancakeSwap:", BSCDeFi.pancakeSwapRouter);
```

### Key Features
- `opBNB` - Layer 2 information and bridge
- `BSCBridge` - Cross-chain bridge utilities
- `BSCGameFi` - Gaming and metaverse projects
- `BSCDeFi` - PancakeSwap, Venus, BiSwap

---

## 🔧 Environment Variables

Add these to your `.env` file:

```bash
# Ethereum
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/your-api-key
GOERLI_RPC=https://goerli.infura.io/v3/your-api-key

# Polygon
POLYGON_RPC=https://polygon-rpc.com
MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
POLYGON_ZKEVM_RPC=https://zkevm-rpc.com

# Arbitrum
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
ARBITRUM_NOVA_RPC=https://nova.arbitrum.io/rpc

# Optimism
OPTIMISM_RPC=https://mainnet.optimism.io
OPTIMISM_GOERLI_RPC=https://goerli.optimism.io

# Avalanche
AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
AVALANCHE_FUJI_RPC=https://api.avax-test.network/ext/bc/C/rpc

# BSC
BSC_RPC=https://bsc-dataseed1.binance.org
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545
OPBNB_RPC=https://opbnb-mainnet-rpc.bnbchain.org
```

---

## 📊 Chain Comparison

| Feature | Ethereum | Polygon | Arbitrum | Optimism | Avalanche | BSC |
|---------|----------|---------|----------|----------|-----------|-----|
| **Block Time** | ~12s | ~2s | ~0.25s | ~2s | ~2s | ~3s |
| **Finality** | ~15 min | ~4 min | Instant | Instant | <1s | ~15s |
| **Gas Token** | ETH | MATIC | ETH | ETH | AVAX | BNB |
| **Consensus** | PoS | PoS | Rollup | Rollup | Avalanche | PoSA |
| **TPS** | ~15 | ~7,000 | ~4,000 | ~2,000 | ~4,500 | ~300 |

---

## 🚀 Multi-Chain Example

See `examples/multi-chain-example.mjs` for a complete example that:
- Checks balances across all chains
- Compares network characteristics
- Shows DeFi protocol addresses
- Demonstrates cross-chain workflows

```bash
node examples/multi-chain-example.mjs
```

---

## 💡 Use Cases by Chain

### Ethereum
- ✅ Highest security and decentralization
- ✅ Blue-chip DeFi (Uniswap, Aave, Maker)
- ✅ Premium NFT collections
- ✅ Enterprise adoption

### Polygon
- ✅ Low transaction fees
- ✅ Gaming and NFT platforms
- ✅ Enterprise solutions
- ✅ zkEVM scaling

### Arbitrum
- ✅ DeFi derivatives (GMX)
- ✅ High-performance dApps
- ✅ Gaming (Treasure DAO)
- ✅ Nitro technology

### Optimism
- ✅ Public goods funding
- ✅ Superchain ecosystem
- ✅ Identity solutions
- ✅ OP Stack adoption

### Avalanche
- ✅ Sub-second finality
- ✅ Custom subnets
- ✅ GameFi projects
- ✅ Enterprise blockchains

### BSC
- ✅ High user adoption
- ✅ GameFi hub
- ✅ Low fees
- ✅ opBNB Layer 2

---

## 🔗 Integration with OFT/ONFT

### Deploy OFT on Multiple Chains

```javascript
import { getEthereumProvider } from './integrations/ethereum/eth-sdk.mjs';
import { getPolygonProvider } from './integrations/polygon/polygon-sdk.mjs';
// ... import other chains

// Deploy on Ethereum
const ethProvider = getEthereumProvider("mainnet");
// Use ethProvider with deployment scripts

// Deploy on Polygon
const polyProvider = getPolygonProvider("mainnet");
// Use polyProvider with deployment scripts

// Set up LayerZero cross-chain messaging
// Configure trusted remotes between all chains
```

### Cross-Chain Transfer Flow

```javascript
// 1. Deploy OFT on source and destination chains
// 2. Configure trusted remotes using LayerZero
// 3. Use chain-specific SDKs for native features
// 4. Execute cross-chain transfers via LayerZero
// 5. Monitor using chain explorers and utilities
```

---

## 📚 Additional Resources

### Documentation
- **Ethereum**: https://ethereum.org/developers
- **Polygon**: https://docs.polygon.technology/
- **Arbitrum**: https://docs.arbitrum.io/
- **Optimism**: https://docs.optimism.io/
- **Avalanche**: https://docs.avax.network/
- **BSC**: https://docs.bnbchain.org/

### Block Explorers
- **Ethereum**: https://etherscan.io
- **Polygon**: https://polygonscan.com
- **Arbitrum**: https://arbiscan.io
- **Optimism**: https://optimistic.etherscan.io
- **Avalanche**: https://snowtrace.io
- **BSC**: https://bscscan.com

---

## 🛠️ Best Practices

1. **Use Chain-Specific Features**
   - Leverage ENS on Ethereum
   - Use Polygon Gas Station for optimal fees
   - Tap into Arbitrum Nitro performance
   - Utilize Optimism Attestations
   - Deploy Avalanche Subnets
   - Access BSC GameFi ecosystem

2. **Monitor Network Status**
   - Check gas prices before transactions
   - Verify network health
   - Monitor bridge times
   - Track finality requirements

3. **Optimize for Each Chain**
   - Use appropriate gas limits
   - Leverage native tokens
   - Integrate chain-specific wallets
   - Follow chain conventions

4. **Security Considerations**
   - Verify contract addresses
   - Test on testnets first
   - Monitor cross-chain messages
   - Audit chain-specific integrations

---

**Last Updated**: 2026-02-02  
**Total Chains**: 7 (Ethereum, Polygon, Arbitrum, Optimism, Avalanche, BSC, Base)  
**Total SDKs**: 7 integration modules