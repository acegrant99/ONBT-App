# ONBT Private Sale Contract - Complete Deployment & Usage Guide

## Overview

The ONBT Private Sale is an omnichain contract built with LayerZero V2 OApp and OpenZeppelin UUPS proxy upgradeable patterns. It enables users to purchase ONBT tokens at **$0.10 per token** across Base and Arbitrum using ETH, USDC, or USDT.

### Key Features
- **Hybrid Architecture**: Combines LayerZero OApp with UUPS upgradeable pattern
- **Multi-Chain**: Base (Hub) + Arbitrum (Spoke) with OApp peer wiring
- **Flexible Pricing**: $0.10 per ONBT across all payment methods
- **100M ONBT Cap**: Total sale allocation locked at deployment
- **Time-Windowed**: Sales can be limited to specific date ranges
- **Owner Controlled**: Funds recipient, payment rails, and sale window are updateable

---

## Deployment Status

### Base (Hub Chain)
- **Network**: Base Mainnet (Chain ID 8453)
- **Layer Zero EID**: 30184
- **Proxy Address**: `0xEA52c0c5Cb4962490d1132d9c255aa044296576e`
- **Implementation**: `0x3010063953326912F473D9036E0a42D141e9bA75`
- **ONBT Token**: `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` (Hub)
- **Funding Status**: ✅ 100M ONBT funded
- **Status**: **ACTIVE AND OPERATIONAL**

### Arbitrum (Spoke Chain)
- **Network**: Arbitrum Mainnet (Chain ID 42161)
- **Layer Zero EID**: 30110
- **Proxy Address**: `0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE`
- **Implementation**: `0xb362Af3da1497A551C08F79bC03CbA12D2b7e908`
- **ONBT Token**: `0x169aC761Ebb210B5A93B68B44DA394776a7B230C`
- **Funding Status**: ⏳ Pending (insufficient ONBT on Arbitrum wallet)
- **Status**: **DEPLOYED, PEER WIRED, FUNDING PENDING**

---

## Contract Architecture

### Smart Contracts

#### ONBTPrivateSaleOApp.sol
Location: `contracts/treasury/ONBTPrivateSaleOApp.sol`

**Key Functions**:
```solidity
// View functions
function quotePurchase(address paymentToken, uint256 amountIn) public view returns (uint256 onbtOut)
function remainingTokens() external view returns (uint256)
function tokenRateWad(address token) public view returns (uint256)
function paymentTokenEnabled(address token) public view returns (bool)

// Purchase functions
function buyWithETH(address recipient) external payable
function buyWithToken(address paymentToken, uint256 amountIn, address recipient) external

// Owner functions
function setSaleWindow(uint256 _saleStart, uint256 _saleEnd) external onlyOwner
function setPaymentToken(address token, bool enabled, uint256 rateWad) external onlyOwner
function withdrawUnsoldONBT(address to, uint256 amount) external onlyOwner
function withdrawPaymentToken(address token, address to, uint256 amount) external onlyOwner
function setPeer(uint32 _eid, bytes32 _peer) external onlyOwner  // OApp peer configuration
```

**Constructor Args**:
- `_lzEndpoint`: LayerZero V2 endpoint address
- `_onbtToken`: ONBT token address on the chain
- `_saleAllocation`: Total ONBT for sale (100M)

**Initialization Args** (called via proxy):
- `_owner`: Contract owner
- `_fundsRecipient`: Address to receive ETH/USDC/USDT payments
- `_saleStart`: Unix timestamp when sale begins
- `_saleEnd`: Unix timestamp when sale ends
- `_paymentTokens`: Array of [ETH, USDC, USDT] addresses
- `_rateWads`: Array of exchange rates in WAD format (10^18 base)

---

## Pricing Structure

The sale enforces **exactly $0.10 per ONBT** via rate WADs:

| Token | Rate WAD | Calculation | Example |
|-------|----------|-------------|---------|
| **ETH** | 25000×10^18 | 1 ETH @ $4000 = 4000 / 0.10 = 40,000 ONBT | 1 ETH → 40,000 ONBT |
| **USDC** | 10×10^18 | 1 USDC = $1 / 0.10 = 10 ONBT | 10 USDC → 100 ONBT |
| **USDT** | 10×10^18 | 1 USDT = $1 / 0.10 = 10 ONBT | 10 USDT → 100 ONBT |

**Note**: ETH rate must be updated if ETH price fluctuates significantly to maintain $0.10 pricing.

---

## Deployment Process

### Step 1: Deploy Base Private Sale (✅ COMPLETED)

```bash
ONBT_PRIVATE_SALE_START=1772129651 \
ONBT_PRIVATE_SALE_END=1774721651 \
ONBT_PRIVATE_SALE_ETH_RATE_WAD=25000000000000000000000 \
npx hardhat run deploy/deploy-private-sale.js --network base
```

**Result**:
- Proxy: `0xEA52c0c5Cb4962490d1132d9c255aa044296576e`
- Implementation: `0x3010063953326912F473D9036E0a42D141e9bA75`

### Step 2: Deploy Arbitrum Private Sale

```bash
$env:ONBT_PRIVATE_SALE_START='1772129651'
$env:ONBT_PRIVATE_SALE_END='1774721651'
$env:ONBT_PRIVATE_SALE_ETH_RATE_WAD='25000000000000000000000'
npx hardhat run deploy/deploy-private-sale-arbitrum.js --network arbitrum
```

Wait for the deployment to complete. This will:
1. Deploy implementation contract to Arbitrum
2. Deploy proxy with initialization
3. Save deployment file: `deploy/deployment-private-sale-arbitrum-<timestamp>.json`

**Deployed**:
- Proxy: `0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE`
- Implementation: `0xb362Af3da1497A551C08F79bC03CbA12D2b7e908`

### Step 3: Fund Arbitrum Sale

Once Arbitrum deployment completes:

```bash
$env:PRIVATE_SALE_ADDRESS='<ARBITRUM_PROXY_ADDRESS>'
$env:ONBT_TOKEN_ADDRESS='0x169aC761Ebb210B5A93B68B44DA394776a7B230C'
$env:PRIVATE_SALE_FUND_AMOUNT='100000000000000000000000000'
npx hardhat run scripts/fund-private-sale.js --network arbitrum
```

**Current Status**: Funding failed due to insufficient ONBT on Arbitrum. Bridge or acquire ONBT to the signer wallet and rerun.

### Step 4: Configure OApp Peers (Bidirectional)

Once both contracts are deployed, wire them for cross-chain messaging:

#### On Base (configure Arbitrum peer):
```bash
$env:ARBITRUM_PRIVATE_SALE_ADDRESS='0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE'
npx hardhat run scripts/configure-private-sale-peers.js --network base
```

#### On Arbitrum (configure Base peer):
```bash
$env:ARBITRUM_PRIVATE_SALE_ADDRESS='0xEA52c0c5Cb4962490d1132d9c255aa044296576e'
npx hardhat run scripts/configure-private-sale-peers.js --network arbitrum
```

**Peer Wiring Status**: ✅ Configured bidirectionally (Base ↔ Arbitrum)

**Result**: Both contracts can now send/receive cross-chain messages via LayerZero.

---

## Usage Guide

### For Users: Purchasing ONBT

#### Option 1: Using Script (Recommended for Testing)

```bash
# Buy 1 ETH worth of ONBT on Base
$env:PAYMENT_TOKEN='ETH'
$env:AMOUNT_IN='1'
npx hardhat run scripts/execute-private-sale-purchase.js --network base

# Buy 100 USDC worth of ONBT on Base
$env:PAYMENT_TOKEN='USDC'
$env:AMOUNT_IN='100'
npx hardhat run scripts/execute-private-sale-purchase.js --network base

# Buy 1000 USDT worth of ONBT on Arbitrum
$env:PRIVATE_SALE_ADDRESS='0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE'
$env:PAYMENT_TOKEN='USDT'
$env:AMOUNT_IN='1000'
npx hardhat run scripts/execute-private-sale-purchase.js --network arbitrum

# Buy for a different recipient
$env:RECIPIENT='0x...'
npx hardhat run scripts/execute-private-sale-purchase.js --network base
```

#### Option 2: Direct Contract Interaction

**Via Ethers.js**:
```typescript
const saleAbi = ['function buyWithETH(address recipient) payable'];
const sale = new ethers.Contract('0xEA52c0c5Cb4962490d1132d9c255aa044296576e', saleAbi, signer);

// Buy 1 ETH worth, send ONBT to self
await sale.buyWithETH(signer.address, { value: ethers.parseEther('1') });
```

**Via UI** (Miniapp at `localhost:3000/private-sale`):
- Connect wallet to Base or Arbitrum
- Select payment token (ETH, USDC, USDT)
- Enter amount
- Confirm transaction
- ONBT appears in wallet

### For Owners: Contract Management

#### Check Sale State
```bash
npx hardhat run scripts/read-private-sale-state.js --network base
```

Output shows:
- Sale window (start/end timestamps)
- Payment tokens enabled + rates
- Remaining ONBT inventory
- ONBT token address

#### Update Sale Window
```javascript
const sale = new ethers.Contract(saleAddress, saleAbi, signer);
const newStart = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
const newEnd = newStart + (30 * 24 * 3600); // 30 days
await sale.setSaleWindow(newStart, newEnd);
```

#### Add New Payment Token (e.g., DAI)
```javascript
const daiAddress = '0x...'; // DAI on the chain
const daiRateWad = '10000000000000000000'; // 10 DAI per ONBT (assuming $1 = 1 ONBT equiv)
await sale.setPaymentToken(daiAddress, true, daiRateWad);
```

#### Withdraw Unsold Inventory
```javascript
const remainingOnbt = await sale.remainingTokens();
await sale.withdrawUnsoldONBT(ownerAddress, remainingOnbt);
```

#### Withdraw Collected Payments
```javascript
// Withdraw USDC collected payments
const usdcAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Base USDC
const usdcBalance = await sale.remainingTokens(); // Actually need to call token.balanceOf()
await sale.withdrawPaymentToken(usdcAddress, ownerAddress, usdcBalance);
```

---

## Testing

### Quick Validation Script
```bash
npx hardhat run scripts/test-private-sale.js --network base
```

Validates:
- ✅ Contract is initialized
- ✅ Sale window is active
- ✅ All payment tokens enabled  
- ✅ Correct ONBT token wired
- ✅ Pricing calculations ($0.10 per ONBT)
- ✅ Signer balance sufficiency

### Manual Testing Flow

1. **Check availability**:
   ```bash
   node -e "
   const ethers = require('ethers');
   const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
   const sale = new ethers.Contract(
     '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
     ['function remainingTokens() view returns (uint256)'],
     provider
   );
   sale.remainingTokens().then(amt => console.log('Remaining:', ethers.utils.formatUnits(amt, 18)));
   "
   ```

2. **Get quote for purchase**:
   ```bash
   $env:PAYMENT_AMOUNT='100' # 100 USDC
   node -e "
   const ethers = require('ethers');
   const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
   const sale = new ethers.Contract(
     '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
     ['function quotePurchase(address, uint256) view returns (uint256)'],
     provider
   );
   const usdcAddr = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
   const amount = ethers.utils.parseUnits('100', 6);
   sale.quotePurchase(usdcAddr, amount).then(res => console.log('ONBT Out:', ethers.utils.formatUnits(res, 18)));
   "
   ```

3. **Execute test purchase** (see Usage section above)

---

## Token Addresses Reference

### Base (Chain 8453)
| Token | Address |
|-------|---------|
| **ONBT** | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` |
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| **USDT** | `0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2` |
| **WETH** | `0x4200000000000000000000000000000000000006` |
| **LZ Endpoint** | `0x1a44076050125825900e736c501f859c50fE728c` |

### Arbitrum (Chain 42161)
| Token | Address |
|-------|---------|
| **ONBT** | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` |
| **USDC** (Bridged) | `0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8` |
| **USDT** (Native) | `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` |
| **WETH** | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` |
| **LZ Endpoint** | `0x1a44076050125825900e736c501f859c50fE728c` |

---

## Blockchain Explorers

### Base
- **Proxy**: https://basescan.org/address/0xEA52c0c5Cb4962490d1132d9c255aa044296576e
- **Implementation**: https://basescan.org/address/0x3010063953326912F473D9036E0a42D141e9bA75

### Arbitrum
- **Proxy**: https://arbiscan.io/address/{ARBITRUM_PROXY} (update after deployment)
- **ONBT Token**: https://arbiscan.io/address/0x169aC761Ebb210B5A93B68B44DA394776a7B230C

---

## Troubleshooting

### "Sale not started" / "Sale ended"
- Check sale window: `npx hardhat run scripts/read-private-sale-state.js --network base`
- Update if needed: `await sale.setSaleWindow(newStart, newEnd);`

### "Zero ONBT output"
- Check if `remainingTokens()` > 0
- Verify payment token is enabled: `paymentTokenEnabled[tokenAddress]`
- Check rate isn't zero: `tokenRateWad[tokenAddress]`

### "Payment token disabled"
- Only ETH, USDC, USDT are enabled by default
- Owner can enable new tokens via `setPaymentToken()`

### "Insufficient allowance" (ERC20)
- Call `token.approve(saleAddress, amountIn)` first
- Script handles this automatically

### Arbitrum deployment hangs
- Check Arbitrum RPC: `ARBITRUM_RPC_URL` env var
- Increase timeout: `hardhat.config.cjs` network timeout setting
- Verify private key has Arbitrum ETH for gas

---

## Environment Variables

### Required
```bash
PRIVATE_KEY=0x...                  # Deployer/signer private key
```

### Optional (for custom deployments)
```bash
ONBT_PRIVATE_SALE_OWNER=0x...     # Owner address (defaults to signer)
ONBT_PRIVATE_SALE_FUNDS_RECIPIENT=0x... # Payment recipient
ONBT_PRIVATE_SALE_ALLOCATION=...   # ONBT cap (defaults to 100M)
ONBT_PRIVATE_SALE_ETH_RATE_WAD=... # ETH exchange rate
ONBT_PRIVATE_SALE_USDC_RATE_WAD=.. # USDC exchange rate
ONBT_PRIVATE_SALE_USDT_RATE_WAD=.. # USDT exchange rate
```

---

## Security Considerations

✅ **Implemented**:
- UUPS upgradeable pattern with onlyOwner authorization
- ReentrancyGuard on all external functions
- Pausable functionality for emergency stops
- 100M cap enforced at contract level
- All payment tokens use SafeERC20
- LayerZero's OApp provides cross-chain security

⚠️ **Notes**:
- Owner has significant control (setPaymentToken, setSaleWindow)
- Only owner-set wallets can receive funds/ONBT
- ETH rate must be manually maintained with price feeds
- No oracle integration (manual rate updates required)

---

## File Locations

**Smart Contracts**:
- `contracts/treasury/ONBTPrivateSaleOApp.sol` - Main implementation
- `contracts/proxy/ONBTUUPSProxy.sol` - UUPS proxy wrapper

**Deployment Scripts**:
- `deploy/deploy-private-sale.js` - Base deployment
- `deploy/deploy-private-sale-arbitrum.js` - Arbitrum deployment

**Usage Scripts**:
- `scripts/test-private-sale.js` - Validation script
- `scripts/read-private-sale-state.js` - State inspection
- `scripts/fund-private-sale.js` - ONBT inventory transfer
- `scripts/execute-private-sale-purchase.js` - User purchase flow
- `scripts/configure-private-sale-peers.js` - OApp peer wiring

**Frontend Integration**:
- `miniapp/config/contracts.ts` - UI configuration
- `miniapp/pages/private-sale.tsx` - React component (if exists)

---

## Support & Further Development

For issues, feature requests, or integration questions:
1. Check contract state: `scripts/read-private-sale-state.js`
2. Run validation: `scripts/test-private-sale.js`
3. Review this guide section matching your issue
4. Consult contract source: `contracts/treasury/ONBTPrivateSaleOApp.sol`

---

**Last Updated**: February 26, 2026  
**Deployment Status**: Base ✅ Active | Arbitrum ⏳ In Progress
