# LayerZero Peer Configuration Complete ✅

**Date**: February 8, 2026  
**Status**: Cross-chain ready for Base ↔ Arbitrum transfers

---

## 🎯 Configuration Summary

### Deployed Contracts

| Chain | Address | Supply | Status |
|-------|---------|--------|--------|
| **Base** (8453) | `0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d` | 1,000,000,000 ONBT | ✅ Verified |
| **Arbitrum** (42161) | `0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27` | 0 ONBT | ✅ Deployed |

### LayerZero V2 Configuration

| Chain | Endpoint | Peer Set | Status |
|-------|----------|----------|--------|
| Base | `0x1a44076050125825900e736c501f859c50fE728c` | Arbitrum (EID 30110) | ✅ |
| Arbitrum | `0x1a44076050125825900e736c501f859c50fE728c` | Base (EID 30184) | ✅ |

### Transactions

- **Base setPeer**: `0xfb63da2512bbeff38a0b08286adf35170e156ade79d737b6d82b546b196497a8`
- **Arbitrum setPeer**: `0xc9be95bf9002c6af4f40847cc2920df36f38e173386d5dfb0ac4b5344ea7a879`

---

## 📋 What Was Configured

### 1. Peer Relationships

**Base → Arbitrum**
```
Remote EID: 30110
Remote Contract: 0x000000000000000000000000a5c3cf591e9ed6a4f3b2667146f630d4c8b08c27
Gas Used: 47,746
```

**Arbitrum → Base**
```
Remote EID: 30184
Remote Contract: 0x000000000000000000000000f7dc0593d982da36827763aa1cb4b9b6f2d2201d
Gas Used: 47,853
```

### 2. Architecture

- **Hub-and-Spoke Model**: Base is the hub chain with full 1B supply
- **Destination Chains**: Arbitrum starts with 0 supply, receives via bridge
- **Total Supply**: Fixed at 1 billion ONBT across all chains
- **Token Standard**: LayerZero OFT V2 (Omnichain Fungible Token)

---

## 🚀 How to Use

### Verify Configuration

```bash
node scripts/verify-configuration.mjs
```

Expected output:
```
Base → Arbitrum: ✅
Arbitrum → Base: ✅
Cross-chain ready: ✅ YES
```

### Test Cross-Chain Transfer

**From Base to Arbitrum:**
```bash
npx hardhat run scripts/test-cross-chain-transfer.mjs --network base
```

**From Arbitrum to Base:**
```bash
npx hardhat run scripts/test-cross-chain-transfer.mjs --network arbitrum
```

### Check Balances

**Arbitrum Balance:**
```bash
node scripts/check-arbitrum-balance.mjs [address]
```

**Base Balance:**
```bash
npx hardhat run scripts/check-balance.mjs --network base
```

---

## 📊 Transfer Parameters

### LayerZero V2 SendParam Structure

```javascript
const sendParam = {
  dstEid: 30110,              // Destination endpoint ID
  to: "0x...",                // Recipient (bytes32)
  amountLD: "1000000000...",  // Amount in local decimals
  minAmountLD: "1000000...",  // Minimum amount (slippage)
  extraOptions: "0x",         // Gas/execution options
  composeMsg: "0x",           // Compose message
  oftCmd: "0x"                // OFT command
};
```

### Typical Fees

| Chain | Native Fee | Time |
|-------|------------|------|
| Base → Arbitrum | ~0.002-0.005 ETH | 1-3 min |
| Arbitrum → Base | ~0.0001-0.0003 ETH | 1-3 min |

*Fees vary based on gas prices and message complexity*

---

## 🔍 Monitoring

### LayerZero Scan

Track cross-chain messages:
```
https://layerzeroscan.com/tx/{txHash}
```

### Block Explorers

- **Base**: https://basescan.org/address/0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d
- **Arbitrum**: https://arbiscan.io/address/0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27

---

## ⚙️ Technical Details

### Contract Interface

```solidity
interface IOmnichainNabatOFT {
    // LayerZero V2 OFT methods
    function send(SendParam calldata, MessagingFee calldata, address) external payable;
    function quoteSend(SendParam calldata, bool) external view returns (MessagingFee memory);
    function setPeer(uint32 eid, bytes32 peer) external; // onlyOwner
    function peers(uint32 eid) external view returns (bytes32);
    function isPeer(uint32 eid, bytes32 peer) external view returns (bool);
    
    // Branding
    function logoURI() external view returns (string memory);
    function website() external view returns (string memory);
    function description() external view returns (string memory);
    function socialLinks() external view returns (string memory);
    function updateBranding(...) external; // onlyOwner
}
```

### Supported Chains

Currently configured:
- ✅ Base (mainnet)
- ✅ Arbitrum One

Can be extended to:
- Optimism (EID 30111)
- Polygon (EID 30109)
- Avalanche (EID 30106)
- BSC (EID 30102)
- Ethereum (EID 30101)

---

## 🔐 Security Considerations

### Owner Controls

- **Owner Address**: `0x44497B9FF645A995b18967b34eFeFDe82AeC8144`
- **Capabilities**:
  - Set/update peers
  - Update branding metadata
  - Configure DVN settings
  - Set enforced options

### DVN Configuration

Default LayerZero DVN (Decentralized Verifier Network) is used. For custom security:

```javascript
// Set required DVNs
await oft.setConfig({
  eid: destEid,
  configType: CONFIG_TYPE_DVN,
  config: encodeDVNConfig([...dvnAddresses])
});
```

---

## 📝 Next Steps

### Immediate
- ✅ Peers configured
- ⏳ Test transfer (recommended)
- ⏳ Verify Arbitrum contract on Arbiscan

### Optional Enhancements
- Configure custom DVN settings
- Set enforced options for gas limits
- Add more destination chains
- Configure rate limiting
- Set up monitoring/alerts

---

## 📚 Resources

- **LayerZero V2 Docs**: https://docs.layerzero.network/
- **OFT Standard**: https://docs.layerzero.network/contracts/oft
- **Endpoint Addresses**: https://docs.layerzero.network/contracts/endpoint-addresses
- **LayerZero Scan**: https://layerzeroscan.com/

---

## 🆘 Troubleshooting

### "Peer not set" error
Run verification: `node scripts/verify-configuration.mjs`

### High gas fees
Check network congestion on target chain

### Transfer not arriving
- Wait 3-5 minutes for delivery
- Check LayerZero Scan for message status
- Verify both peers are set correctly

### Insufficient balance
Check native token balance on source chain for fees

---

**Configuration completed successfully!** 🎉

All scripts and tools are ready in the `scripts/` directory.
