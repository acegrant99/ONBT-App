# ONabat Token (ONBT) Supply Model Guide

## The Question

**"If I deploy my ONabatOFT on hub chain, how does the supply mint? When I deploy on dst chain, would the supply mint again?"**

## The Answer

### Quick Summary

✅ **Hub Chain (Source)**: Full 1 billion ONBT supply mints at deployment  
✅ **Destination Chains**: 0 ONBT supply at deployment (empty contract)  
✅ **Cross-Chain Transfers**: Burn on source, mint on destination  
✅ **Total Supply**: Always 1 billion across ALL chains combined  

**NO, the supply does NOT mint again on destination chains!**

---

## Understanding OFT Supply Architecture

### The Hub Chain (Source Chain)

The **hub chain** (also called source chain) is where you first deploy your ONBT token with the full supply.

**What happens on hub chain deployment:**

```solidity
// In OmnichainNabatOFT.sol constructor (line 84)
_mint(msg.sender, _initialSupply); // Mints 1 billion ONBT to deployer
```

**Result:**
- ✅ 1,000,000,000 ONBT created
- ✅ All tokens owned by deployer
- ✅ Total supply on this chain: 1B
- ✅ Total supply across all chains: 1B

**Example:**
```
Deploy on Base (Hub Chain)
├─ Contract deployed
├─ 1,000,000,000 ONBT minted
├─ Deployer receives all 1B tokens
└─ Total supply: 1,000,000,000 ONBT
```

### Destination Chains

**Destination chains** are all other chains where you deploy ONBT after the hub chain.

**What happens on destination chain deployment:**

```solidity
// Same constructor runs, but with 0 initial supply
_mint(msg.sender, 0); // No tokens minted!
```

**Wait, what?** The constructor takes `_initialSupply` as a parameter. On destination chains, you pass **0** as the initial supply!

**Result:**
- ✅ Contract deployed
- ✅ 0 ONBT minted
- ✅ Empty contract waiting for bridged tokens
- ✅ Total supply on this chain: 0
- ✅ Total supply across all chains: still 1B (on hub chain)

**Example:**
```
Deploy on Ethereum (Destination Chain)
├─ Contract deployed with _initialSupply = 0
├─ 0 ONBT minted
├─ Contract ready to receive bridged tokens
└─ Total supply: 0 ONBT (all 1B still on Base)
```

---

## Deployment Parameters

### Hub Chain Deployment

```javascript
// deployONBT.mjs on Base (hub chain)
const totalSupplyWei = ethers.parseEther("1000000000"); // 1 billion

const onbt = await OmnichainNabatOFT.deploy(
    8,                    // sharedDecimals
    lzEndpoint,           // LayerZero endpoint
    totalSupplyWei,       // ← 1,000,000,000 ONBT minted here!
    logoURI,
    website,
    description,
    socialLinks
);
```

### Destination Chain Deployment

```javascript
// deployONBT.mjs on Ethereum (destination chain)
const totalSupplyWei = ethers.parseEther("0"); // ← 0 tokens!

const onbt = await OmnichainNabatOFT.deploy(
    8,                    // sharedDecimals
    lzEndpoint,           // LayerZero endpoint
    totalSupplyWei,       // ← 0 ONBT minted here!
    logoURI,              // Same branding
    website,
    description,
    socialLinks
);
```

**Key Difference:** The `_initialSupply` parameter is different!

---

## How Cross-Chain Transfers Work

### The Burn/Mint Mechanism

When you transfer ONBT from one chain to another, LayerZero uses a **burn-and-mint** mechanism to preserve the total supply.

### Step-by-Step Transfer Flow

**Scenario:** Transfer 1000 ONBT from Base (hub) to Ethereum (destination)

```
Before Transfer:
├─ Base:     1,000,000,000 ONBT
├─ Ethereum:             0 ONBT
└─ Total:    1,000,000,000 ONBT

Step 1: User calls sendFrom() on Base
├─ Base contract BURNS 1000 ONBT
├─ Base supply now: 999,999,000 ONBT
└─ LayerZero message sent

Step 2: LayerZero relays message
├─ Message travels through LayerZero protocol
└─ Arrives at Ethereum endpoint

Step 3: Ethereum contract receives message
├─ Ethereum contract MINTS 1000 ONBT
├─ Ethereum supply now: 1000 ONBT
└─ User receives tokens

After Transfer:
├─ Base:       999,999,000 ONBT
├─ Ethereum:         1,000 ONBT
└─ Total:    1,000,000,000 ONBT ← Still 1B!
```

**Key Points:**
- Tokens are BURNED on source chain
- Tokens are MINTED on destination chain
- Total supply remains constant (1B)
- No new tokens created

---

## Visual Diagrams

### Initial Deployment

```
┌──────────────────────────────────────────┐
│         Hub Chain: Base                  │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 1,000,000,000      │  │
│  │  Deployer Balance: 1,000,000,000  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    Destination Chain: Ethereum           │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 0                  │  │
│  │  Deployer Balance: 0              │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    Destination Chain: Polygon            │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 0                  │  │
│  │  Deployer Balance: 0              │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

Global Total Supply: 1,000,000,000 ONBT
```

### After Cross-Chain Transfers

```
┌──────────────────────────────────────────┐
│         Hub Chain: Base                  │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 600,000,000        │  │
│  │  (400M transferred out)           │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    Destination Chain: Ethereum           │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 250,000,000        │  │
│  │  (250M bridged from Base)         │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    Destination Chain: Polygon            │
│  ┌────────────────────────────────────┐  │
│  │  ONabatOFT Contract               │  │
│  │  Total Supply: 150,000,000        │  │
│  │  (150M bridged from Base)         │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

Global Total Supply: 1,000,000,000 ONBT ✓
(600M + 250M + 150M = 1B)
```

---

## Deployment Strategy

### Recommended Approach

**1. Choose Your Hub Chain**

This is where ALL tokens will be minted. Common choices:
- **Base** (recommended for ONBT due to low fees, Coinbase ecosystem)
- **Ethereum** (for maximum security and visibility)
- **Polygon** (for low fees)

**2. Deploy on Hub Chain**

```bash
# Deploy with FULL supply on hub chain (Base)
npm run deploy:onbt:base
```

**Contract parameters:**
- `_initialSupply`: 1,000,000,000 (full supply)
- Result: 1B ONBT minted to deployer

**3. Deploy on Destination Chains**

```bash
# Deploy with ZERO supply on destination chains
npm run deploy:onbt:ethereum
npm run deploy:onbt:polygon
npm run deploy:onbt:arbitrum
```

**Contract parameters (MODIFIED):**
- `_initialSupply`: 0 (no tokens minted)
- Result: Empty contract ready to receive bridged tokens

**4. Configure Trusted Remotes**

```bash
# Set up peer connections between all chains
node scripts/setTrustedRemotes.mjs
```

This allows contracts to communicate and transfer tokens.

**5. Start Distributing**

Now you can:
- Transfer tokens from hub chain to destination chains
- List on DEXs on each chain
- Distribute to users

---

## Modified Deployment Script

### Current deployONBT.mjs

The current script ALWAYS mints 1B tokens. This is correct for hub chain but WRONG for destination chains.

### Updated deployONBT.mjs (Recommended)

Add a parameter to control initial supply:

```javascript
// Add at top of script
const DEPLOYMENT_TYPE = process.env.DEPLOYMENT_TYPE || "hub"; // "hub" or "destination"

// Modified supply calculation
const totalSupplyWei = DEPLOYMENT_TYPE === "hub" 
  ? ethers.parseEther("1000000000")  // 1B for hub chain
  : ethers.parseEther("0");           // 0 for destination chains

console.log("\n--- Deployment Type ---");
console.log("Type:", DEPLOYMENT_TYPE);
console.log("Initial Supply:", DEPLOYMENT_TYPE === "hub" ? "1,000,000,000 ONBT" : "0 ONBT");
```

### Usage

```bash
# Deploy on hub chain (Base)
DEPLOYMENT_TYPE=hub npm run deploy:onbt:base

# Deploy on destination chains
DEPLOYMENT_TYPE=destination npm run deploy:onbt:ethereum
DEPLOYMENT_TYPE=destination npm run deploy:onbt:polygon
DEPLOYMENT_TYPE=destination npm run deploy:onbt:arbitrum
```

---

## Supply Tracking

### Check Supply on Each Chain

```javascript
// Get total supply on a specific chain
const supply = await onbtContract.totalSupply();
console.log("Supply on this chain:", ethers.formatEther(supply));

// Check if this is the source chain
const isSource = await onbtContract.isSourceChain();
console.log("Is source chain:", isSource); // true only on hub chain initially
```

### Monitor Global Supply

Create a script to check total supply across all chains:

```javascript
// scripts/checkGlobalSupply.mjs
async function checkGlobalSupply() {
  const chains = {
    base: "0xYourBaseAddress",
    ethereum: "0xYourEthereumAddress",
    polygon: "0xYourPolygonAddress",
    arbitrum: "0xYourArbitrumAddress"
  };
  
  let totalSupply = 0n;
  
  for (const [chain, address] of Object.entries(chains)) {
    const provider = getProviderForChain(chain);
    const contract = new ethers.Contract(address, abi, provider);
    const supply = await contract.totalSupply();
    
    console.log(`${chain}: ${ethers.formatEther(supply)} ONBT`);
    totalSupply += supply;
  }
  
  console.log(`\nGlobal Total: ${ethers.formatEther(totalSupply)} ONBT`);
  console.log(`Expected: 1,000,000,000 ONBT`);
  console.log(`Match: ${totalSupply === ethers.parseEther("1000000000")}`);
}
```

---

## Common Questions

### Q1: Can I mint more tokens later?

**A:** NO. The OmnichainNabatOFT contract has NO mint function. The supply is permanently fixed at 1 billion tokens.

### Q2: What if I deploy with 1B on multiple chains?

**A:** DON'T DO THIS! You'll create multiple separate token supplies:
- Base: 1B ONBT
- Ethereum: 1B ONBT
- Polygon: 1B ONBT
- **Total: 3B ONBT** ❌ WRONG!

These won't be the same token and can't be bridged properly.

### Q3: Can I change which chain is the hub?

**A:** Technically yes, but it's complex:
1. Bridge all tokens back to hub chain
2. Deploy new contracts everywhere with new hub
3. This disrupts users and liquidity

Better to choose your hub chain carefully from the start.

### Q4: How do I know which chain is the hub?

**A:** Check the `isSourceChain()` function:

```javascript
const isHub = await onbtContract.isSourceChain();
// Returns true if totalSupply == TOTAL_SUPPLY (1B)
```

Initially, only the hub chain returns true. After distributions, this may not be accurate.

### Q5: What happens if someone tries to bridge more than exists?

**A:** The transaction fails. The burn operation would fail if the sender doesn't have enough balance.

---

## Security Considerations

### Supply Immutability

✅ **Guaranteed by smart contract code:**
- No mint function exists (lines 201-202 in contract)
- No burn function exists (lines 206-207 in contract)
- Total supply is immutable (line 37: `uint256 public immutable TOTAL_SUPPLY`)

### Cross-Chain Consistency

✅ **Guaranteed by LayerZero protocol:**
- Burn happens before mint
- Messages are validated
- Replay attacks prevented
- Chain ID verified

### Deployment Safety

⚠️ **Developer responsibility:**
- Deploy with correct initial supply on each chain
- Only mint on hub chain (1B)
- Deploy with 0 supply on destination chains
- Set up trusted remotes correctly

---

## Best Practices

### 1. Document Your Hub Chain

Create a file `DEPLOYMENT_ADDRESSES.md`:

```markdown
# ONBT Deployment Addresses

## Hub Chain: Base
- **Address**: 0x1234...
- **Initial Supply**: 1,000,000,000 ONBT
- **Deployed**: 2024-01-15
- **Explorer**: https://basescan.org/token/0x1234...

## Destination Chains

### Ethereum
- **Address**: 0x5678...
- **Initial Supply**: 0 ONBT
- **Deployed**: 2024-01-15

### Polygon
- **Address**: 0x9abc...
- **Initial Supply**: 0 ONBT
- **Deployed**: 2024-01-15
```

### 2. Test on Testnets First

Before mainnet:
1. Deploy on Base Sepolia (hub) with test supply
2. Deploy on Ethereum Sepolia (destination) with 0 supply
3. Test cross-chain transfers
4. Verify supply conservation

### 3. Monitor Supply Distribution

Track where your supply is:

```javascript
{
  "hub": "Base",
  "distribution": {
    "base": "600,000,000 ONBT (60%)",
    "ethereum": "250,000,000 ONBT (25%)",
    "polygon": "150,000,000 ONBT (15%)",
    "total": "1,000,000,000 ONBT (100%)"
  }
}
```

### 4. Gradual Distribution

Don't bridge all tokens at once:
1. Start with 10-20% on each destination chain
2. Monitor liquidity and demand
3. Bridge more as needed
4. Keep some on hub chain for flexibility

---

## Comparison with Other Models

### OFT Model (ONBT)

```
Hub Chain:         1,000,000,000 ONBT minted
Destination Chains:             0 ONBT minted
Cross-chain:       Burn/mint mechanism
Total Supply:      1,000,000,000 ONBT (constant)
```

✅ True omnichain token
✅ Same token everywhere
✅ Supply conservation guaranteed
✅ No wrapped versions

### Bridge Model (Traditional)

```
Source Chain:      1,000,000,000 Token minted
Destination Chain: Wrapped token contract
Cross-chain:       Lock/mint mechanism
Total Supply:      1B original + wrapped tokens
```

❌ Not true omnichain
❌ Different token on each chain
❌ Supply not conserved (original + wrapped)
❌ Bridge vulnerability

### Multi-Deploy Model (WRONG)

```
Chain A:  1,000,000,000 ONBT minted
Chain B:  1,000,000,000 ONBT minted
Chain C:  1,000,000,000 ONBT minted
Total:    3,000,000,000 ONBT
```

❌ Creates separate tokens
❌ Can't bridge between them
❌ Inflates total supply
❌ Defeats omnichain purpose

---

## Technical Details

### Contract Storage

```solidity
// OmnichainNabatOFT.sol
uint256 public immutable TOTAL_SUPPLY; // Set at deployment, never changes

constructor(
    uint8 _sharedDecimals,
    address _lzEndpoint,
    uint256 _initialSupply,  // ← This determines minting
    // ... other params
) {
    TOTAL_SUPPLY = _initialSupply;  // Store immutable value
    _mint(msg.sender, _initialSupply);  // Mint tokens (or 0)
}
```

### Key Functions

```solidity
// Check if this is the source chain
function isSourceChain() external view returns (bool) {
    return totalSupply() == TOTAL_SUPPLY;
}
// Initially: hub chain = true, destinations = false
// After distribution: may change as supply moves

// Verify immutability
function hasImmutableSupply() external pure returns (bool) {
    return true; // Always true, no mint/burn functions
}
```

---

## Summary

### The Complete Picture

1. **Choose Hub Chain**: Base (recommended for ONBT)

2. **Deploy on Hub**: 
   - Use `_initialSupply = 1,000,000,000`
   - 1B ONBT minted to deployer
   - This is the ONLY time tokens are minted

3. **Deploy on Destinations**:
   - Use `_initialSupply = 0`
   - No tokens minted
   - Empty contracts ready for bridging

4. **Configure Peers**:
   - Set trusted remotes
   - Enable cross-chain transfers

5. **Distribute Tokens**:
   - Bridge from hub to destinations
   - Tokens burn on source, mint on destination
   - Total supply always 1B

### Key Takeaways

✅ Supply mints ONCE on hub chain (1B ONBT)  
✅ Destination chains start with 0 supply  
✅ Cross-chain transfers use burn/mint  
✅ Total supply stays constant (1B)  
✅ No double minting ever occurs  

### Files to Review

- `contracts/token/OmnichainNabatOFT.sol` - Token contract
- `scripts/deployONBT.mjs` - Deployment script
- `BRIDGING_ARCHITECTURE.md` - Cross-chain mechanics
- `DEPLOYMENT_GUIDE.md` - Step-by-step deployment

---

## Need Help?

- Read: `BRIDGING_ARCHITECTURE.md` for cross-chain details
- Read: `QUICK_REFERENCE.md` for contract functions
- Check: `ONBT_SPECIFICATION.md` for technical specs
- Visit: https://nabat.finance for project info

**Remember:** One hub chain with full supply, all other chains start at 0!
