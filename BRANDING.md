# ONBT Branding Guide

## Overview

**Omnichain Nabat Token (ONBT / ONabat)** is an immutable omnichain fungible token with built-in branding capabilities. This guide explains how to configure, update, and manage the branding metadata for your ONBT deployment.

## Table of Contents

1. [Token Identity](#token-identity)
2. [Branding Features](#branding-features)
3. [Logo & Visual Assets](#logo--visual-assets)
4. [Deployment with Branding](#deployment-with-branding)
5. [Updating Branding](#updating-branding)
6. [Metadata Standards](#metadata-standards)
7. [IPFS Integration](#ipfs-integration)
8. [Best Practices](#best-practices)

---

## Token Identity

### Fixed Token Information

The following properties are **immutable** and set at deployment:

- **Name**: `ONabat`
- **Symbol**: `ONBT`
- **Total Supply**: 1,000,000,000 ONBT (1 billion, immutable)
- **Decimals**: 18 (native), 8 (shared for cross-chain)
- **Website**: https://nabat.finance (Vercel deployment)
- **Cross-Chain**: Peer-based configuration (no proxies needed)

These values **cannot be changed** after deployment, ensuring consistency across all chains.

### Mutable Branding

The following branding properties **can be updated** by the contract owner:

- Logo URI (IPFS/HTTP link)
- Website URL
- Description
- Social media links

---

## Branding Features

### 1. Logo URI

The logo URI can point to:
- **IPFS**: `ipfs://QmYourLogoHash`
- **HTTP/HTTPS**: `https://yoursite.com/logo.png`
- **Data URI**: `data:image/svg+xml;base64,...`

**Recommended**: Use IPFS for permanent, decentralized storage.

### 2. Website

Your project's main website:
```
https://nabat.finance
```

Deployed on Vercel with nabat.finance and www.nabat.finance domains.

### 3. Description

A brief description of your token (max 500 characters recommended):
```
ONabat (ONBT) is an immutable omnichain fungible token with 1 billion 
supply built on LayerZero. It enables seamless cross-chain transfers 
across multiple blockchains via peer configuration with no proxies needed 
on destination chains. Visit https://nabat.finance for more information.
```

### 4. Social Links

JSON object containing social media links:
```json
{
  "twitter": "https://twitter.com/nabatfinance",
  "telegram": "https://t.me/nabatfinance",
  "discord": "https://discord.gg/nabatfinance",
  "github": "https://github.com/acegrant99/ONBT-App",
  "medium": "https://medium.com/@nabatfinance",
  "website": "https://nabat.finance"
}
```

---

## Logo & Visual Assets

### Logo Specifications

#### Primary Logo
- **Format**: PNG with transparent background
- **Size**: 512x512px (minimum), 1024x1024px (recommended)
- **Aspect Ratio**: 1:1 (square)
- **Color Space**: RGB
- **File Size**: < 100KB (for fast loading)

#### Alternative Formats
- **SVG**: Vector format for scalability
- **WebP**: Modern format with better compression
- **ICO**: For favicons (16x16, 32x32, 48x48)

### Visual Guidelines

1. **Colors**: Use consistent brand colors
2. **Style**: Clean, professional, recognizable
3. **Simplicity**: Works at small sizes (16x16px)
4. **Contrast**: Readable on both light and dark backgrounds

### File Naming Convention

```
onbt-logo-512.png       # Primary logo
onbt-logo-1024.png      # High resolution
onbt-logo.svg           # Vector version
onbt-logo-dark.png      # Dark mode variant
onbt-logo-light.png     # Light mode variant
```

---

## Deployment with Branding

### Step 1: Prepare Branding Assets

Before deployment, prepare your branding assets:

1. **Design your logo** (512x512px minimum)
2. **Upload to IPFS** (recommended)
3. **Prepare description** (clear, concise)
4. **Set up website** (or use temporary landing page)
5. **Create social accounts** (Twitter, Telegram, etc.)

### Step 2: Upload Logo to IPFS

Using Pinata, NFT.Storage, or IPFS CLI:

```bash
# Using IPFS CLI
ipfs add onbt-logo-1024.png
# Returns: QmYourLogoHash

# Your logo URI will be:
ipfs://QmYourLogoHash
```

### Step 3: Configure Deployment Script

Edit the `ONBT_CONFIG` in `scripts/deployONBT.mjs`:

```javascript
const ONBT_CONFIG = {
  totalSupply: "100000000", // 100 million ONBT
  sharedDecimals: 8,
  
  branding: {
    logoURI: "ipfs://QmYourActualLogoHash",
    website: "https://omnichainabat.com",
    description: "Your token description here",
    socialLinks: JSON.stringify({
      twitter: "https://twitter.com/yourproject",
      telegram: "https://t.me/yourproject",
      discord: "https://discord.gg/yourproject",
      github: "https://github.com/yourproject",
      medium: "https://medium.com/@yourproject"
    })
  }
};
```

### Step 4: Deploy

```bash
# Deploy on Base Sepolia testnet
npx hardhat run scripts/deployONBT.mjs --network baseSepolia

# Deploy on Base mainnet
npx hardhat run scripts/deployONBT.mjs --network base
```

---

## Updating Branding

### Using the Update Script

```bash
# View current branding
node scripts/updateBranding.mjs <contract_address> get

# Update branding (set environment variables)
export NEW_LOGO_URI="ipfs://QmNewLogoHash"
export NEW_WEBSITE="https://newsite.com"
export NEW_DESCRIPTION="Updated description"
export NEW_SOCIAL_LINKS='{"twitter":"https://twitter.com/new"}'

node scripts/updateBranding.mjs <contract_address> update
```

### Using Smart Contract Directly

```javascript
import { ethers } from "ethers";

const onbt = await ethers.getContractAt("OmnichainNabatOFT", contractAddress);

await onbt.updateBranding(
  "ipfs://QmNewLogoHash",
  "https://newsite.com",
  "Updated description",
  JSON.stringify({ twitter: "https://twitter.com/new" })
);
```

### Important Notes

- **Only the owner** can update branding
- Updates emit `BrandingUpdated` event
- Gas cost: ~100,000 gas (approximately)
- Can be updated multiple times as needed

---

## Metadata Standards

### Token Metadata (JSON)

ONBT follows standard token metadata format:

```json
{
  "name": "Omnichain Nabat",
  "symbol": "ONBT",
  "decimals": 18,
  "description": "Immutable omnichain fungible token",
  "image": "ipfs://QmYourLogoHash",
  "external_url": "https://omnichainabat.com",
  "properties": {
    "totalSupply": "100000000",
    "immutable": true,
    "omnichain": true,
    "layerzero": true,
    "socialMedia": {
      "twitter": "https://twitter.com/omnichainabat",
      "telegram": "https://t.me/omnichainabat"
    }
  }
}
```

### Generating Metadata

```bash
# Generate metadata JSON for IPFS
node scripts/updateBranding.mjs <contract_address> generate
```

This creates a standard metadata file you can upload to IPFS.

### On-Chain Metadata

The contract includes a `tokenURI()` function that returns metadata:

```solidity
function tokenURI() external view returns (string memory)
```

This is useful for wallets and dApps to fetch token information.

---

## IPFS Integration

### Why IPFS?

- **Decentralized**: No single point of failure
- **Permanent**: Content-addressed storage
- **Immutable**: Hash-based addressing
- **Cost-effective**: No hosting fees

### IPFS Providers

1. **Pinata** - https://pinata.cloud
2. **NFT.Storage** - https://nft.storage
3. **Infura IPFS** - https://infura.io/product/ipfs
4. **Fleek** - https://fleek.co

### Upload Process

#### Using Pinata:

1. Sign up at https://pinata.cloud
2. Upload your logo file
3. Pin the file for permanent storage
4. Copy the IPFS hash (CID)
5. Use: `ipfs://QmYourHash`

#### Using NFT.Storage:

```javascript
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ token: 'YOUR_API_KEY' });
const metadata = await client.store({
  name: 'Omnichain Nabat',
  description: 'Token logo',
  image: new File([/* your file */], 'logo.png', { type: 'image/png' })
});

console.log('IPFS URI:', metadata.url);
```

### IPFS Gateway URLs

To view IPFS content in browsers:

- Cloudflare: `https://cloudflare-ipfs.com/ipfs/QmYourHash`
- Pinata: `https://gateway.pinata.cloud/ipfs/QmYourHash`
- IPFS.io: `https://ipfs.io/ipfs/QmYourHash`

---

## Best Practices

### 1. Logo Design

✅ **Do:**
- Use simple, recognizable designs
- Ensure readability at small sizes
- Use high contrast
- Test on different backgrounds
- Include transparent background

❌ **Don't:**
- Use complex gradients
- Include small text
- Use low resolution
- Use copyrighted images
- Rely on color alone for recognition

### 2. IPFS Storage

✅ **Do:**
- Pin your content permanently
- Use multiple pinning services
- Keep backup of files
- Document IPFS hashes
- Use CIDv1 when possible

❌ **Don't:**
- Rely on single gateway
- Forget to pin content
- Use temporary uploads
- Delete original files

### 3. Metadata Management

✅ **Do:**
- Keep branding consistent across chains
- Update all chains if changing branding
- Document all updates
- Announce changes to community
- Test updates on testnet first

❌ **Don't:**
- Change branding frequently
- Use broken links
- Forget to update social links
- Skip testing
- Update without announcement

### 4. Social Media

✅ **Do:**
- Maintain active social presence
- Use consistent branding
- Verify accounts
- Engage with community
- Update links regularly

❌ **Don't:**
- Use dead links
- Abandon accounts
- Ignore impersonators
- Forget to secure accounts

### 5. Security

✅ **Do:**
- Secure owner private keys
- Use multi-sig for valuable tokens
- Test on testnet first
- Verify transactions
- Keep backups

❌ **Don't:**
- Share private keys
- Update without verification
- Rush deployments
- Skip security audits (for large deployments)

---

## Integration Examples

### Wallet Integration

Wallets can fetch token metadata:

```javascript
const onbt = new ethers.Contract(address, abi, provider);
const metadata = await onbt.tokenURI();
const parsed = JSON.parse(metadata);

console.log("Logo:", parsed.logoURI);
console.log("Website:", parsed.website);
```

### dApp Integration

Display token branding in your dApp:

```javascript
const branding = await onbt.getBrandingInfo();

// Display logo
<img src={branding.logo.replace('ipfs://', 'https://ipfs.io/ipfs/')} />

// Display website
<a href={branding.site}>Visit Website</a>

// Display social links
const social = JSON.parse(branding.social);
<a href={social.twitter}>Twitter</a>
```

### Explorer Integration

Block explorers can display rich token information:

```javascript
const info = {
  name: await onbt.name(),
  symbol: await onbt.symbol(),
  logo: await onbt.logoURI(),
  website: await onbt.website(),
  description: await onbt.description()
};
```

---

## Checklist

### Pre-Deployment

- [ ] Logo designed (512x512px minimum)
- [ ] Logo uploaded to IPFS
- [ ] Website created or landing page ready
- [ ] Social media accounts created
- [ ] Description written (clear and concise)
- [ ] Social links JSON prepared
- [ ] Deployment script configured
- [ ] Testnet deployment tested

### Post-Deployment

- [ ] Contract deployed on all target chains
- [ ] Branding verified on all chains
- [ ] Block explorer verification submitted
- [ ] Metadata uploaded to IPFS
- [ ] Community announced
- [ ] Documentation updated
- [ ] Social media profiles updated
- [ ] Logo added to token lists

### Maintenance

- [ ] Monitor IPFS pinning status
- [ ] Update social links as needed
- [ ] Respond to community feedback
- [ ] Keep website current
- [ ] Regular security reviews
- [ ] Backup all materials

---

## Support

For questions or assistance:

- **GitHub Issues**: https://github.com/acegrant99/ONBT-App/issues
- **Documentation**: See other guides in this repository
- **Community**: Join our social channels (after deployment)

---

## License

This branding guide is part of the ONBT project and follows the same MIT license.
