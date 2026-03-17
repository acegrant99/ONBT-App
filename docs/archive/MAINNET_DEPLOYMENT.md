# ONBT Base Mainnet Deployment Guide

This guide walks you through deploying the full ONBT omnichain ecosystem to Base mainnet (as hub) and optionally to destination chains.

## Prerequisites

### 1. Environment Setup

**Clone repository and install dependencies:**
```bash
git clone https://github.com/acegrant99/ONBT-App
cd ONBT-App
npm install
```

**Create `.env` file:**
```bash
cp .env.example .env
```

Edit `.env` and fill in:
```env
# REQUIRED: Base mainnet RPC endpoint (Alchemy, Infura, etc.)
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# OPTIONAL: Base Sepolia testnet RPC (for testing before mainnet)
BASE_SEPOLIA_RPC_URL=https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# REQUIRED: Private key (NEVER commit this!)
# Must have sufficient Base ETH for deployment gas
PRIVATE_KEY=0x...

# OPTIONAL: BaseScan API key for contract verification
BASESCAN_API_KEY=your_basescan_api_key

# OPTIONAL: Branding metadata (can update later via updateBranding.mjs)
ONBT_LOGO_URI=ipfs://QmYourLogoHash
ONBT_WEBSITE=https://nabat.finance
ONBT_DESCRIPTION=ONabat is an immutable omnichain token
```

### 2. Account Funding

The deployer account (derived from `PRIVATE_KEY`) needs Base ETH to pay for gas:

- **Hub chain deployment**: ~5-10 Base ETH (depends on current gas)
- **Each destination chain**: ~2-5 ETH equiv (varies per chain)

Get Base ETH from:
- Coinbase (simplest if you have an account)
- [Base Faucet](https://www.quicknode.com/faucets/base)
- Bridge from Ethereum

### 3. Compile Contracts

```bash
npx hardhat compile
```

Verify all contracts compile without errors.

---

## Deployment Steps

### STEP 1: Deploy Hub Chain (Base Mainnet)

This creates the primary ONBT token with 1 billion initial supply on Base.

**Option A: PowerShell (Windows)**
```powershell
.\scripts\Deploy-BaseHub.ps1
```

**Option B: Node.js (All platforms)**
```bash
node scripts/deploy-base-hub.js
```

**Option C: Direct Hardhat (All platforms)**
```bash
npx hardhat run scripts/deployFullEcosystem.mjs --network base
```

### Expected Output

```
╔════════════════════════════════════════════════════════════╗
║     ONBT Full Ecosystem Deployment (OFTV2 + OApp)         ║
╚════════════════════════════════════════════════════════════╝

📝 Deployment Info:
   Deployer: 0x...
   Network: base
   Chain ID: 8453
   Deployment Type: HUB
   Balance: X.XX ETH

📋 Deployed Contracts:

Core:
  ONBT Token:          0x...
  Governance OApp:     0x...
  Omnichain Vault:     0x...

DeFi:
  Math Library:        0x...
  Security Library:    0x...
  Multi-Token Factory: 0x...
  Staking Contract:    0x...
  Liquidity Pool:      0x...
  Router:              0x...

Advanced:
  Oracle Adapter:      0x...
  Compose Handler:     0x...
```

**Save all addresses!** You'll need them for the next steps.

### STEP 2: (Optional) Deploy Destination Chains

Supported chains: ethereum, polygon, arbitrum, optimism, bsc, avalanche

**For each chain, use:**

**PowerShell (Windows):**
```powershell
.\scripts\Deploy-Destination.ps1 -Network ethereum
.\scripts\Deploy-Destination.ps1 -Network polygon
# ... repeat for each chain
```

**Node.js:**
```bash
node scripts/deploy-destination.js ethereum
node scripts/deploy-destination.js polygon
# ... repeat for each chain
```

**Direct Hardhat:**
```bash
npx hardhat run scripts/deployFullEcosystem.mjs --network ethereum
npx hardhat run scripts/deployFullEcosystem.mjs --network polygon
# ... repeat for each chain
```

### STEP 3: Configure Cross-Chain Peers

Once all chains are deployed, update `scripts/configurePeers.mjs`:

```javascript
const CONTRACT_ADDRESSES = {
  base: {
    onbt: "0x...",  // From Step 1
    governanceOApp: "0x...",
    vault: "0x..."
  },
  ethereum: {
    onbt: "0x...",  // From Step 2 (ethereum)
    governanceOApp: "0x...",
    vault: "0x..."
  },
  // ... repeat for all chains
};
```

Then run peer configuration on each chain:

```powershell
# PowerShell
$env:NETWORK="base"; npx hardhat run scripts/configurePeers.mjs --network base
$env:NETWORK="ethereum"; npx hardhat run scripts/configurePeers.mjs --network ethereum
# ... repeat for all chains
```

or:

```bash
# Bash/Linux
NETWORK=base npx hardhat run scripts/configurePeers.mjs --network base
NETWORK=ethereum npx hardhat run scripts/configurePeers.mjs --network ethereum
# ... repeat for all chains
```

### STEP 4: Post-Deployment Configuration

1. **Update Miniapp**
   - Update `miniapp/config/contracts.ts` with deployed addresses

2. **Update Branding** (optional)
   ```bash
   export ONBT_ADDRESS="0x..."  # Your deployed ONBT address
   npx hardhat run scripts/updateBranding.mjs --network base
   ```

3. **Verify Contracts** (optional, requires BaseScan API key)
   ```bash
   npx hardhat verify --network base 0xONBT_ADDRESS constructor_args
   ```

4. **Fund Staking Rewards** (optional)
   - Transfer ONBT to staking contract for reward distribution
   - Set reward rate in staking contract

5. **Add Liquidity** (optional)
   - Add ETH and ONBT to liquidity pool for swaps

---

## Testnet Deployment (Recommended First)

Test everything on Base Sepolia before mainnet:

**Deploy to Sepolia:**
```powershell
# PowerShell
.\scripts\Deploy-BaseHub.ps1 -Testnet

# Node.js
node scripts/deploy-base-hub.js --testnet

# Hardhat
npx hardhat run scripts/deployFullEcosystem.mjs --network baseSepolia
```

## Troubleshooting

### "Insufficient Funds for Gas"
- Fund the deployer account with more Base ETH
- Use less expensive chains for testing (Sepolia testnet)
- Reduce gas price in hardhat.config.js if safe

### "Contract not found at address"
- Verify the address is correct (copy/paste from deployment output)
- Verify you're on the correct network
- Delete contract addresses and re-deploy

### "LayerZero endpoint not found"
- Verify network name is correct in hardhat.config.js
- Check that ChainConfig in constants/layerzero.mjs has the network
- Use hardhat/localhost for local testing

### Peer Configuration Failed
- Ensure all contracts are deployed before running configurePeers
- Verify CONTRACT_ADDRESSES in configurePeers.mjs matches actual deployed addresses
- Run on each chain (don't skip any)

---

## Architecture

```
BASE (Hub)
├── 1B ONBT supply (OFTV2)
├── Governance OApp (receives votes from everywhere, executes globally)
├── Omnichain Vault (manages treasury across chains)
└── Full DeFi stack

ETHEREUM, POLYGON, etc. (Destinations)
├── 0 initial ONBT supply (minted via token bridges)
├── Governance OApp (sends votes to hub)
├── Omnichain Vault (receives fund allocations from hub)
└── Full DeFi stack
```

All cross-chain communication uses LayerZero for security and reliability.

---

## Gas Cost Estimates

| Step | Chain | Gas Cost |
|------|-------|----------|
| Hub Deployment | Base | 5-10 Base ETH |
| ONBT Token | Base | 0.5-1 Base ETH |
| Governance OApp | Base | 1-2 Base ETH |
| DeFi Stack | Base | 2-5 Base ETH |
| Per Destination | Any | 2-5 chain ETH |

Total for hub + 6 destinations: ~40-50 ETH equivalent

---

## Security Checklist

- [ ] Private key kept secure (never committed)
- [ ] All deployed addresses saved for peer configuration
- [ ] Contracts compiled without warnings
- [ ] Testnet deployment tested first
- [ ] Peer configuration completed on all chains
- [ ] Contracts verified on block explorers
- [ ] Mainnet transactions reviewed before confirmation
- [ ] Post-deployment configuration (branding, liquidity) completed

---

## Support

- **LayerZero Docs**: https://docs.layerzero.network/
- **Base Docs**: https://base.org/docs
- **Hardhat Docs**: https://hardhat.org/docs
- **OpenZeppelin**: https://docs.openzeppelin.com/

---

## Next Steps After Mainnet Deployment

1. Update miniapp frontend with deployed addresses
2. Test cross-chain token transfers
3. Set up monitoring and alerting
4. Launch marketing campaign
5. Add node operator fees/rewards if applicable
6. Monitor LayerZero message delivery

Good luck! 🚀
