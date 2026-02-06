# Deployment Guide

This guide walks you through deploying the Nabat Omnichain ecosystem contracts on multiple chains.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Testnet Deployment](#testnet-deployment)
4. [Mainnet Deployment](#mainnet-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Testing Cross-Chain Transfers](#testing-cross-chain-transfers)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js v16+ installed
- [ ] npm dependencies installed (`npm install`)
- [ ] `.env` file configured with:
  - Private key (with funds on target networks)
  - RPC URLs for each network
  - Block explorer API keys (optional)
- [ ] Native tokens on each network for gas fees
- [ ] Sufficient balance for cross-chain messaging fees

### Estimated Gas Costs

| Network | Contract Deployment | Set Trusted Remote | Cross-Chain Transfer |
|---------|-------------------|-------------------|---------------------|
| Ethereum | ~2-3M gas | ~50k gas | ~200k gas + msg fee |
| Base | ~2-3M gas | ~50k gas | ~200k gas + msg fee |
| Polygon | ~2-3M gas | ~50k gas | ~200k gas + msg fee |

**Tip:** Start with testnets to avoid costly mistakes!

## Initial Setup

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your details:
```env
PRIVATE_KEY=your_private_key_here
BASE_SEPOLIA_RPC=https://sepolia.base.org
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### 2. Compile Contracts

```bash
npm run compile
```

Verify that compilation succeeds without errors.

## Testnet Deployment

### Phase 1: Deploy OFT on Base Sepolia

1. Deploy the OFT contract:
```bash
npm run deploy:oft:baseSepolia
```

2. Save the contract address from the output:
```
NabatOFT deployed to: 0x1234...
```

3. Verify on BaseScan:
```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS> "Nabat Token" "NABT" 8 "0x6EDCE65403992e310A62460808c4b910D972f10f"
```

### Phase 2: Deploy OFT on Second Testnet (Optional)

Deploy on another testnet like Mumbai or Goerli to test cross-chain functionality:
```bash
# For Goerli (if configured)
npx hardhat run scripts/deployOFT.ts --network goerli
```

### Phase 3: Configure Trusted Remotes

1. Update `scripts/setTrustedRemotes.ts` with your deployed addresses:
```typescript
const contractAddresses = {
  baseSepolia: "0x1234...", // Your Base Sepolia address
  goerli: "0x5678...",      // Your Goerli address
};

const currentContractAddress = "0x1234..."; // Current chain contract
```

2. Run on Base Sepolia:
```bash
npm run setup:remotes:baseSepolia
```

3. Run on Goerli (or other testnet):
```bash
npx hardhat run scripts/setTrustedRemotes.ts --network goerli
```

### Phase 4: Test Cross-Chain Transfer

1. Update `scripts/sendOFT.ts`:
```typescript
const oftAddress = "0x1234..."; // Your Base Sepolia address
const destinationChainId = 10121; // Goerli LayerZero chain ID
```

2. Send tokens:
```bash
npx hardhat run scripts/sendOFT.ts --network baseSepolia
```

3. Monitor on LayerZero Scan:
   - https://testnet.layerzeroscan.com

4. Wait 5-10 minutes for the message to be relayed

5. Verify receipt on destination chain

## Mainnet Deployment

⚠️ **Warning:** Mainnet deployment uses real funds. Triple-check everything!

### Phase 1: Deploy on Ethereum

```bash
npm run deploy:oft:ethereum
```

Save the contract address and verify:
```bash
npx hardhat verify --network ethereum <CONTRACT_ADDRESS> "Nabat Token" "NABT" 8 "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675"
```

### Phase 2: Deploy on Base

```bash
npm run deploy:oft:base
```

Save the contract address and verify:
```bash
npx hardhat verify --network base <CONTRACT_ADDRESS> "Nabat Token" "NABT" 8 "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7"
```

### Phase 3: Deploy on Additional Chains

Repeat for each chain you want to support:
```bash
npx hardhat run scripts/deployOFT.ts --network polygon
npx hardhat run scripts/deployOFT.ts --network arbitrum
npx hardhat run scripts/deployOFT.ts --network optimism
```

### Phase 4: Configure Cross-Chain Trust

1. Update `scripts/setTrustedRemotes.ts` with all mainnet addresses

2. Run on each chain:
```bash
npm run setup:remotes:ethereum
npm run setup:remotes:base
npx hardhat run scripts/setTrustedRemotes.ts --network polygon
npx hardhat run scripts/setTrustedRemotes.ts --network arbitrum
```

## ONFT Deployment

The process is similar for ONFT (NFT) contracts:

### Testnet
```bash
npm run deploy:onft:baseSepolia
```

### Mainnet
```bash
npm run deploy:onft:ethereum
npm run deploy:onft:base
```

Then configure trusted remotes using the same `setTrustedRemotes.ts` script (set `isOFT = false`).

## Post-Deployment Configuration

### 1. Security Checklist

- [ ] Verify all contracts on block explorers
- [ ] Confirm trusted remotes are set correctly on all chains
- [ ] Test with small amounts first
- [ ] Set up monitoring for transactions
- [ ] Document all contract addresses
- [ ] Backup deployment information

### 2. Initial Token Distribution (OFT)

If you want to mint initial supply:
```bash
npx hardhat console --network ethereum
```

```javascript
const NabatOFT = await ethers.getContractFactory("NabatOFT");
const oft = await NabatOFT.attach("YOUR_CONTRACT_ADDRESS");
await oft.mint("RECIPIENT_ADDRESS", ethers.parseEther("1000000"));
```

### 3. Mint Initial NFTs (ONFT)

```javascript
const NabatONFT = await ethers.getContractFactory("NabatONFT");
const onft = await NabatONFT.attach("YOUR_CONTRACT_ADDRESS");
await onft.batchMint("RECIPIENT_ADDRESS", 10); // Mint 10 NFTs
```

## Testing Cross-Chain Transfers

### OFT Transfer Test

1. Update `scripts/sendOFT.ts` with production addresses
2. Test with small amount:
```bash
npm run send:oft -- --network ethereum
```
3. Monitor on LayerZero Scan: https://layerzeroscan.com
4. Verify receipt on destination chain

### ONFT Transfer Test

1. Update `scripts/sendONFT.ts` with production addresses
2. Send a test NFT:
```bash
npm run send:onft -- --network ethereum
```
3. Verify NFT appears on destination chain

## Troubleshooting

### Common Issues

**Issue: "Insufficient balance"**
- Solution: Ensure your wallet has enough native tokens for gas

**Issue: "No trusted remote"**
- Solution: Run `setTrustedRemotes.ts` on both source and destination chains

**Issue: "Message not received after 1 hour"**
- Solution: Check LayerZero Scan for stuck messages
- Contact LayerZero support if needed

**Issue: "Transaction reverted"**
- Solution: Increase gas limit in adapter params
- Check that trusted remotes are configured

**Issue: "Failed to estimate gas"**
- Solution: Check RPC endpoint is working
- Verify contract addresses are correct

### Verification Commands

Check contract owner:
```bash
npx hardhat console --network base
const NabatOFT = await ethers.getContractFactory("NabatOFT");
const oft = await NabatOFT.attach("YOUR_ADDRESS");
await oft.owner(); // Should return your address
```

Check trusted remote:
```bash
await oft.trustedRemoteLookup(101); // Ethereum chain ID
// Should return remote address
```

Check balance:
```bash
await oft.balanceOf("YOUR_ADDRESS");
```

## Deployment Checklist

### Pre-Deployment
- [ ] Contracts compiled successfully
- [ ] Tests pass (if available)
- [ ] Environment variables configured
- [ ] Sufficient funds on all networks
- [ ] RPC endpoints tested

### Deployment
- [ ] Contracts deployed on all chains
- [ ] Contract addresses documented
- [ ] Contracts verified on block explorers
- [ ] Ownership verified

### Configuration
- [ ] Trusted remotes set on all chains
- [ ] Initial token/NFT supply minted (if needed)
- [ ] Transfer tests successful

### Post-Deployment
- [ ] Documentation updated with addresses
- [ ] Team notified of deployment
- [ ] Monitoring set up
- [ ] Backup of deployment data

## Support Resources

- **LayerZero Docs**: https://layerzero.gitbook.io/docs/
- **LayerZero Scan**: https://layerzeroscan.com
- **Base Docs**: https://docs.base.org/
- **Hardhat Docs**: https://hardhat.org/docs

## Emergency Procedures

If you need to pause operations or fix issues:

1. **Pause transfers**: Contact LayerZero if message relay needs to be paused
2. **Update trusted remotes**: You can change trusted remotes if needed
3. **Transfer ownership**: Use `transferOwnership()` if needed

## Next Steps

After successful deployment:

1. Integrate with your dApp frontend
2. Set up monitoring and alerts
3. Create user documentation
4. Plan marketing and launch
5. Consider smart contract audit for production use

---

**Need Help?** Open an issue on GitHub or consult LayerZero documentation.