# Base Mainnet Deployment Checklist

## Pre-Deployment

- [ ] **Repository Ready**
  - [ ] Clone ONBT-App repository
  - [ ] Run `npm install`
  - [ ] Run `npx hardhat compile` (all contracts compile without errors)

- [ ] **Environment Configuration**
  - [ ] Copy `.env.example` → `.env`
  - [ ] Add `BASE_RPC_URL` (Alchemy, Infura, QuickNode, etc.)
  - [ ] Add `PRIVATE_KEY` from your wallet
  - [ ] (Optional) Add `BASESCAN_API_KEY` for verification
  - [ ] (Optional) Add branding metadata (logo, website, social)

- [ ] **Wallet Funding**
  - [ ] Deployer address funded with 10+ Base ETH (for hub + potential retries)
  - [ ] Funds verified in wallet before starting

- [ ] **Testnet Test** (Recommended)
  - [ ] Deploy to Base Sepolia testnet first
  - [ ] Verify all contracts deploy successfully
  - [ ] Test cross-chain messaging (if deploying destinations)

---

## Hub Chain Deployment (Base Mainnet)

### Option 1: PowerShell (Windows)
```powershell
.\scripts\Deploy-BaseHub.ps1
```

### Option 2: Node.js Wrapper (All platforms)
```bash
node scripts/deploy-base-hub.js
```

### Option 3: npm Script (All platforms)
```bash
npm run deploy:base:hub
```

### What Gets Deployed

✅ ONBT Token (OFTV2) - 1 billion supply
✅ Governance OApp - Cross-chain governance
✅ Omnichain Vault - Treasury management
✅ DeFi Stack - Staking, pools, router, oracle
✅ Compose Handler - Complex operations

### During Deployment

- Watch for transaction confirmations
- Note the block number for verification
- **Copy and save all contract addresses**

### After Deployment

- [ ] **Save Addresses**: Copy all deployed contract addresses to a safe location
- [ ] **Verify Contracts** (optional):
  ```bash
  npx hardhat verify --network base 0xONBT_ADDRESS
  ```
- [ ] **Update Branding** (optional):
  ```bash
  export ONBT_ADDRESS="0x..."
  npx hardhat run scripts/updateBranding.mjs --network base
  ```

---

## Destination Chain Deployment (Optional)

If deploying to other chains (Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche):

### For Each Chain:

**PowerShell:**
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

### After Each Deployment

- [ ] Copy contract addresses for that chain
- [ ] Update `scripts/configurePeers.mjs` with addresses

---

## Peer Configuration (Required for Cross-Chain)

Once all chains are deployed:

1. **Update** `scripts/configurePeers.mjs`:
   - Replace all `0x0000...` with actual deployed addresses
   - Include all chains you deployed to

2. **Run Configuration** on each chain:

   **PowerShell:**
   ```powershell
   $env:NETWORK="base"; npx hardhat run scripts/configurePeers.mjs --network base
   $env:NETWORK="ethereum"; npx hardhat run scripts/configurePeers.mjs --network ethereum
   # ... repeat for all chains
   ```

   **Bash:**
   ```bash
   NETWORK=base npx hardhat run scripts/configurePeers.mjs --network base
   NETWORK=ethereum npx hardhat run scripts/configurePeers.mjs --network ethereum
   # ... repeat for all chains
   ```

---

## Post-Deployment

### Miniapp Integration

Update `miniapp/config/contracts.ts`:
```typescript
export const ONBT_TOKEN_ADDRESS = "0x..."; // From deployment
export const STAKING_ADDRESS = "0x...";
export const POOL_ADDRESS = "0x...";
// ... etc
```

### Fund Staking (Optional)

If using staking rewards:
```bash
# Transfer ONBT to staking contract
# Amount depends on your reward rate and duration
```

### Add Liquidity (Optional)

Provide initial ONBT/ETH liquidity for swaps:
```bash
# Through UI or directly via router
# Recommended: 10-50 ETH worth to bootstrap
```

### Monitor Deployment

Track transactions:
- [BaseScan](https://basescan.org) - Block explorer for Base
- [LayerZero Scan](https://layerzero.gitbook.io) - Cross-chain messages

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Error: insufficient funds for gas` | Fund deployer with more Base ETH |
| `Cannot find module '@openzeppelin/contracts'` | Run `npm install` |
| `Contract compilation failed` | Check Solidity version, run `npx hardhat compile` |
| `RPC URL failed` | Verify `BASE_RPC_URL` in `.env` is correct |
| `Private key invalid` | Ensure `PRIVATE_KEY` is valid hex (starts with 0x) |
| `Peer configuration failed` | Verify addresses in `configurePeers.mjs` match deployed contracts |

---

## Gas Cost Estimates

| Component | Estimated Cost |
|-----------|-----------------|
| ONBT Token | 0.5-1 Base ETH |
| Governance OApp | 1-2 Base ETH |
| DeFi Stack | 2-5 Base ETH |
| Vault & Oracle | 1-2 Base ETH |
| **Hub Total** | **5-10 Base ETH** |
| Per Destination | 2-5 chain ETH |

*Costs vary with network congestion; use Tenderly or dry-run for exact estimates*

---

## Security Notes

🔒 **Critical**
- NEVER commit `.env` file
- NEVER share your `PRIVATE_KEY`
- Use a dedicated deployment wallet
- Keep private keys in a secure vault (1Password, LastPass, etc.)

✅ **Best Practices**
- Test on testnet first
- Verify contract addresses before confirming transactions
- Monitor gas prices before deploying
- Keep transaction hashes for auditing

---

## Support Resources

- **LayerZero Docs**: https://docs.layerzero.network/
- **Base Docs**: https://docs.base.org/
- **Hardhat Docs**: https://hardhat.org/docs
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **BaseScan**: https://basescan.org

---

## Quick Links

- Deployment Guide: [MAINNET_DEPLOYMENT.md](./MAINNET_DEPLOYMENT.md)
- Full Architecture: [FULL_ECOSYSTEM_ARCHITECTURE.md](./FULL_ECOSYSTEM_ARCHITECTURE.md)
- Quick Reference: [ECOSYSTEM_QUICK_REFERENCE.md](./ECOSYSTEM_QUICK_REFERENCE.md)

---

**Ready to deploy?** Start with:
```bash
.\scripts\Deploy-BaseHub.ps1
# or
node scripts/deploy-base-hub.js
```

Good luck! 🚀