# Omnichain Nabat Token (ONBT) - Technical Specification

## Overview

**Omnichain Nabat (ONBT)** is an immutable, branded omnichain fungible token built on the LayerZero protocol. It features a fixed supply, built-in branding metadata, and seamless cross-chain transfers across multiple blockchains.

## Token Details

### Core Properties

| Property | Value | Mutability |
|----------|-------|------------|
| **Name** | Omnichain Nabat | Immutable |
| **Symbol** | ONBT | Immutable |
| **Total Supply** | 100,000,000 ONBT | Immutable |
| **Decimals** | 18 (native), 8 (shared) | Immutable |
| **Supply Model** | Fixed at deployment | Immutable |
| **Mint Function** | None | N/A |
| **Burn Function** | None | N/A |

### Branding Properties

| Property | Description | Mutability |
|----------|-------------|------------|
| **Logo URI** | IPFS/HTTP logo link | Mutable (owner only) |
| **Website** | Project website URL | Mutable (owner only) |
| **Description** | Token description | Mutable (owner only) |
| **Social Links** | JSON social media links | Mutable (owner only) |

## Smart Contract Architecture

### Contract: `OmnichainNabatOFT.sol`

```solidity
contract OmnichainNabatOFT is OFTV2 {
    // Branding storage
    string public logoURI;
    string public website;
    string public description;
    string public socialLinks;
    
    // Immutable properties
    uint256 public immutable TOTAL_SUPPLY;
    uint256 public immutable DEPLOYMENT_TIME;
    
    // Constructor
    constructor(
        uint8 _sharedDecimals,
        address _lzEndpoint,
        uint256 _initialSupply,
        string memory _logoURI,
        string memory _website,
        string memory _description,
        string memory _socialLinks
    );
    
    // Branding management
    function updateBranding(...) external onlyOwner;
    function getBrandingInfo() external view returns (...);
    function tokenURI() external view returns (string memory);
    
    // Utility functions
    function isSourceChain() external view returns (bool);
    function getAge() external view returns (uint256);
    function hasImmutableSupply() external pure returns (bool);
}
```

### Inheritance Chain

```
OmnichainNabatOFT
    └── OFTV2 (LayerZero)
            └── OFTCoreV2
                    ├── NonblockingLzApp
                    └── ERC20
```

## Key Features

### 1. Immutable Supply

**Design Philosophy:**
- Total supply is minted once at deployment
- No `mint()` function exists
- No `burn()` function exists
- Supply cannot be changed by anyone, including owner
- True economic immutability

**Benefits:**
- Predictable tokenomics
- No inflation risk
- Complete transparency
- Trust minimization
- Institutional-grade guarantees

### 2. Built-in Branding

**On-Chain Branding Storage:**
- Logo URI (IPFS recommended)
- Project website
- Token description
- Social media links (JSON format)

**Features:**
- `updateBranding()` - Owner can update branding
- `getBrandingInfo()` - Retrieve all branding data
- `tokenURI()` - Get complete metadata as JSON
- `BrandingUpdated` event for updates

**Use Cases:**
- Wallet display (logo, name, website)
- DEX listing information
- Block explorer metadata
- dApp integration
- Marketing materials

### 3. Cross-Chain Functionality

**LayerZero Integration:**
- Seamless transfers across chains
- Native bridge integration
- Gas-efficient messaging
- Secure cross-chain communication

**Supported Chains:**
- Ethereum (mainnet)
- Base (Coinbase L2)
- Polygon
- Arbitrum
- Optimism
- Avalanche
- BSC

### 4. Professional Deployment

**Deployment Features:**
- Beautiful console output
- Automatic supply minting
- Branding configuration at deployment
- Comprehensive verification
- Deployment summary
- Environment variable templates

## Technical Specifications

### Gas Optimization

**Immutable Variables:**
```solidity
uint256 public immutable TOTAL_SUPPLY;
uint256 public immutable DEPLOYMENT_TIME;
```
- Uses immutable keyword for gas savings
- Read from code instead of storage
- ~2,100 gas saved per read

**View Functions:**
- All getters are view/pure functions
- No state modifications
- Free to call off-chain

### Security Features

**Owner Control:**
- Only owner can update branding
- Transfer ownership supported (from Ownable)
- Renounce ownership supported

**Immutability:**
- No mint function (cannot create tokens)
- No burn function (cannot destroy tokens)
- Total supply permanently fixed
- Economic immutability enforced at code level

**Cross-Chain Security:**
- Trusted remotes required
- LayerZero message validation
- Replay attack prevention
- Chain ID verification

### Events

```solidity
event BrandingUpdated(
    string logoURI,
    string website,
    string description,
    string socialLinks
);

// Inherited from ERC20
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);
```

## Deployment Guide

### Prerequisites

1. **Branding Assets**
   - Logo file (512x512px minimum)
   - IPFS upload (Pinata, NFT.Storage)
   - Website URL
   - Social media accounts

2. **Network Setup**
   - RPC endpoints configured
   - Private key with gas tokens
   - LayerZero endpoints known

3. **Configuration**
   - Update `ONBT_CONFIG` in `deployONBT.mjs`
   - Set logo URI (IPFS hash)
   - Set website URL
   - Set description
   - Set social links JSON

### Deployment Steps

```bash
# 1. Configure branding in scripts/deployONBT.mjs

# 2. Deploy on primary chain (e.g., Base)
npm run deploy:onbt:base

# 3. Deploy on secondary chains
npm run deploy:onbt:ethereum
npm run deploy:onbt:polygon
npm run deploy:onbt:arbitrum

# 4. Set trusted remotes (for cross-chain)
# Update addresses in setTrustedRemotes.mjs
npm run setup:remotes:base
npm run setup:remotes:ethereum

# 5. Verify contracts on block explorers

# 6. Test cross-chain transfers
```

### Post-Deployment

```bash
# View branding
npm run branding:get <contract_address>

# Update branding (if needed)
export NEW_LOGO_URI="ipfs://Qm..."
npm run branding:update <contract_address> update

# Generate metadata JSON for IPFS
npm run branding:get <contract_address> generate
```

## Integration Guide

### Wallet Integration

```javascript
// Get token info
const onbt = new ethers.Contract(address, abi, provider);
const name = await onbt.name(); // "Omnichain Nabat"
const symbol = await onbt.symbol(); // "ONBT"
const decimals = await onbt.decimals(); // 18

// Get branding
const branding = await onbt.getBrandingInfo();
const logo = branding.logo; // "ipfs://..."
const website = branding.site; // "https://..."

// Display logo
const logoUrl = logo.replace('ipfs://', 'https://ipfs.io/ipfs/');
```

### DEX Integration

```javascript
// Token metadata
const metadata = await onbt.tokenURI();
const parsed = JSON.parse(metadata);

// List token with branding
{
  address: onbtAddress,
  name: parsed.name,
  symbol: parsed.symbol,
  decimals: parsed.decimals,
  logoURI: parsed.logoURI,
  website: parsed.website
}
```

### dApp Integration

```javascript
// Check if immutable
const isImmutable = await onbt.hasImmutableSupply(); // true

// Get total supply
const totalSupply = await onbt.TOTAL_SUPPLY();
console.log(`Total: ${ethers.formatEther(totalSupply)} ONBT`);

// Check age
const age = await onbt.getAge();
const days = age / 86400;
console.log(`Token age: ${days} days`);

// Check if source chain
const isSource = await onbt.isSourceChain();
console.log(isSource ? "Source chain" : "Remote chain");
```

## Testing

### Test Coverage

The test suite (`test/OmnichainNabatOFT.test.mjs`) covers:

1. **Deployment Tests**
   - Name and symbol verification
   - Total supply minting
   - Owner assignment
   - Deployment time recording

2. **Branding Tests**
   - Initial branding setup
   - Branding info retrieval
   - Branding updates (owner only)
   - BrandingUpdated event
   - Non-owner restrictions
   - tokenURI metadata

3. **Immutability Tests**
   - hasImmutableSupply() returns true
   - No mint function exists
   - No burn function exists
   - Supply remains constant

4. **Transfer Tests**
   - Token transfers
   - Balance updates
   - Insufficient balance failures
   - Transfer events

5. **Utility Tests**
   - Source chain detection
   - Age calculation
   - ERC20 compliance

6. **ERC20 Compliance**
   - Approve/transferFrom
   - Allowances
   - Transfer events
   - Approval events

### Running Tests

```bash
# Run all ONBT tests
npx hardhat test test/OmnichainNabatOFT.test.mjs

# Run with gas reporting
REPORT_GAS=true npx hardhat test test/OmnichainNabatOFT.test.mjs

# Run specific test
npx hardhat test test/OmnichainNabatOFT.test.mjs --grep "Immutability"
```

## Use Cases

### 1. Governance Token
- Fixed supply ensures predictable voting power
- Immutable supply prevents manipulation
- Cross-chain governance participation
- Professional branding for DAO

### 2. Ecosystem Currency
- Omnichain payments
- DEX liquidity across chains
- NFT marketplace currency
- Game economy token

### 3. Store of Value
- No inflation risk
- Truly scarce digital asset
- Cross-chain portability
- Institutional trust

### 4. Liquidity Mining
- Fixed reward pool
- Predictable emissions
- Multi-chain farming
- Cross-chain incentives

## Comparison with Alternatives

### vs. Standard ERC20

| Feature | ONBT | Standard ERC20 |
|---------|------|----------------|
| Cross-chain | ✅ Native | ❌ Bridges only |
| Immutable Supply | ✅ Yes | ⚠️ Optional |
| Built-in Branding | ✅ Yes | ❌ No |
| Mint Function | ❌ None | ⚠️ Usually yes |
| Burn Function | ❌ None | ⚠️ Usually yes |
| Metadata | ✅ On-chain | ❌ Off-chain |

### vs. LayerZero OFT

| Feature | ONBT | Standard OFT |
|---------|------|--------------|
| Supply Model | Fixed | Flexible |
| Branding | Built-in | Manual |
| Immutability | Enforced | Optional |
| Mint/Burn | None | Usually yes |

### vs. Bridged Tokens

| Feature | ONBT | Bridged Token |
|---------|------|---------------|
| Native Cross-chain | ✅ Yes | ❌ No |
| Bridge Fees | ✅ Low | ❌ High |
| Security | ✅ Protocol-level | ⚠️ Bridge-dependent |
| Liquidity | ✅ Unified | ❌ Fragmented |

## Maintenance

### Branding Updates

**When to Update:**
- Logo redesign
- Website URL change
- New social media accounts
- Description improvements

**How to Update:**
```bash
# 1. Prepare new assets
# 2. Upload new logo to IPFS (if changed)
# 3. Set environment variables
export NEW_LOGO_URI="ipfs://Qm..."
export NEW_WEBSITE="https://..."
export NEW_DESCRIPTION="..."
export NEW_SOCIAL_LINKS='{"twitter":"..."}'

# 4. Run update script
npm run branding:update <address> update

# 5. Verify update
npm run branding:get <address>

# 6. Repeat on all chains
```

### Cross-Chain Maintenance

**Trusted Remotes:**
- Must be set on all chains
- Bidirectional setup required
- Update if deploying on new chain
- Test transfers after setup

**Monitoring:**
- LayerZero Scan: https://layerzeroscan.com
- Track cross-chain transfers
- Monitor gas costs
- Check message status

## Security Considerations

### Auditing

**Recommended:**
- Code audit before mainnet
- LayerZero configuration review
- Trusted remote verification
- Ownership security check

### Best Practices

1. **Private Key Security**
   - Use hardware wallet for owner
   - Consider multi-sig for valuable deployments
   - Never share private keys
   - Rotate keys if compromised

2. **Branding Security**
   - Use IPFS for logo permanence
   - Pin content on multiple services
   - Backup original files
   - Document all IPFS hashes

3. **Cross-Chain Security**
   - Verify trusted remotes
   - Test on testnets first
   - Start with small amounts
   - Monitor LayerZero messages

4. **Ownership**
   - Consider transferring to multi-sig
   - Document ownership transfer
   - Plan for succession
   - Can renounce if desired (permanent)

## FAQ

**Q: Can the total supply be changed?**
A: No. The supply is immutable and fixed at deployment (100M ONBT).

**Q: Can new tokens be minted?**
A: No. There is no mint function. Supply is fixed forever.

**Q: Can tokens be burned?**
A: No. There is no burn function. Supply remains constant.

**Q: Can branding be updated?**
A: Yes. The owner can update logo, website, description, and social links.

**Q: What happens if owner renounces ownership?**
A: Branding becomes frozen and cannot be updated. Token still functions normally.

**Q: Can ONBT be transferred cross-chain?**
A: Yes. After setting trusted remotes, tokens can move across all 7 supported chains.

**Q: What are the gas costs?**
A: ~50k gas for deployment, ~100k for branding updates, normal ERC20 transfer costs.

**Q: Is ONBT compatible with existing wallets/DEXs?**
A: Yes. It's fully ERC20 compliant and includes metadata for integration.

## Resources

### Documentation
- [BRANDING.md](BRANDING.md) - Complete branding guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [README.md](README.md) - Main documentation

### Code
- Contract: `contracts/token/OmnichainNabatOFT.sol`
- Deploy: `scripts/deployONBT.mjs`
- Branding: `scripts/updateBranding.mjs`
- Tests: `test/OmnichainNabatOFT.test.mjs`

### External Links
- LayerZero: https://layerzero.network
- LayerZero Scan: https://layerzeroscan.com
- IPFS: https://ipfs.io
- Pinata: https://pinata.cloud

## License

MIT License - See LICENSE file for details

---

**Version:** 1.0.0  
**Last Updated:** 2026-02-02  
**Status:** Production Ready
