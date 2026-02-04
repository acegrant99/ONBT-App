# Quick Reference - ONBT Cross-Chain Integration

## TL;DR

**Q: Do I need a separate bridge contract?**  
**A: NO!** OmnichainNabatOFT already has built-in LayerZero bridging. Just build a UI.

---

## Essential Information

### Contract Address (Update After Deployment)
```javascript
const ONBT_ADDRESS = "0x..."; // Your deployed ONBT address
```

### LayerZero Chain IDs
```javascript
const LZ_CHAIN_IDS = {
  ethereum: 101,
  base: 184,
  polygon: 109,
  arbitrum: 110,
  optimism: 111,
  avalanche: 106,
  bsc: 102
};
```

### Minimal ABI
```javascript
const ONBT_ABI = [
  "function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint _amount, tuple(address refundAddress, address zroPaymentAddress, bytes adapterParams) _callParams) payable",
  "function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint _amount, bool _useZro, bytes _adapterParams) view returns (uint nativeFee, uint zroFee)",
  "function balanceOf(address) view returns (uint256)"
];
```

---

## Quick Integration (5 Steps)

### 1. Connect Wallet
```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();
```

### 2. Get Contract Instance
```javascript
const contract = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, signer);
```

### 3. Estimate Fee
```javascript
const [fee] = await contract.estimateSendFee(
  destChainId,
  ethers.zeroPadValue(recipient, 32),
  ethers.parseEther(amount),
  false,
  "0x"
);
```

### 4. Send Tokens
```javascript
const tx = await contract.sendFrom(
  userAddress,
  destChainId,
  ethers.zeroPadValue(recipient, 32),
  ethers.parseEther(amount),
  {
    refundAddress: userAddress,
    zroPaymentAddress: ethers.ZeroAddress,
    adapterParams: "0x"
  },
  { value: fee }
);
```

### 5. Wait for Confirmation
```javascript
await tx.wait();
console.log("Transaction confirmed!");
console.log("Track on LayerZero Scan:", `https://layerzeroscan.com/tx/${tx.hash}`);
```

---

## Common Code Snippets

### Check Balance
```javascript
const balance = await contract.balanceOf(address);
console.log(ethers.formatEther(balance), "ONBT");
```

### Get Token Info
```javascript
const name = await contract.name();        // "ONabat"
const symbol = await contract.symbol();    // "ONBT"
const decimals = await contract.decimals(); // 18
```

### Listen for Transfers
```javascript
contract.on("SendToChain", (dstChainId, from, toAddress, amount) => {
  console.log(`Sent ${amount} to chain ${dstChainId}`);
});
```

### Handle Errors
```javascript
try {
  await contract.sendFrom(...);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    alert("Not enough ETH for gas");
  } else if (error.message.includes('exceeds balance')) {
    alert("Not enough ONBT");
  } else {
    alert("Transfer failed: " + error.message);
  }
}
```

---

## React Component (Minimal)

```jsx
import { ethers } from 'ethers';
import { useState } from 'react';

function BridgeONBT() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const sendTokens = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, signer);

    // Estimate fee
    const [fee] = await contract.estimateSendFee(
      184, // Base
      ethers.zeroPadValue(recipient, 32),
      ethers.parseEther(amount),
      false,
      "0x"
    );

    // Send
    const tx = await contract.sendFrom(
      await signer.getAddress(),
      184,
      ethers.zeroPadValue(recipient, 32),
      ethers.parseEther(amount),
      {
        refundAddress: await signer.getAddress(),
        zroPaymentAddress: ethers.ZeroAddress,
        adapterParams: "0x"
      },
      { value: fee }
    );

    await tx.wait();
    alert("Success!");
  };

  return (
    <div>
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <input value={recipient} onChange={e => setRecipient(e.target.value)} />
      <button onClick={sendTokens}>Send to Base</button>
    </div>
  );
}
```

---

## Important Notes

### ✅ You Already Have
- Smart contract with built-in bridging
- Deployment scripts
- Configuration scripts
- Transfer examples

### ❌ You Need to Build
- UI for wallet connection
- UI for transfer form
- UI for balance display
- UI for transaction tracking

### 🚫 You DON'T Need
- Separate bridge contract
- Lock/unlock mechanism
- Wrapped tokens
- Liquidity pools

---

## Architecture

```
Source Chain                Destination Chain
┌──────────┐               ┌──────────┐
│   ONBT   │               │   ONBT   │
│ Contract │               │ Contract │
└──────────┘               └──────────┘
     │                          ▲
     │ 1. Burn tokens           │ 4. Mint tokens
     ▼                          │
┌──────────┐               ┌──────────┐
│LayerZero │──────────────▶│LayerZero │
│ Endpoint │  2. Message   │ Endpoint │
└──────────┘   3. Relay    └──────────┘
```

1. User calls `sendFrom()` on source chain
2. Source chain burns tokens
3. LayerZero relays message (5-10 min)
4. Destination chain mints tokens

**No bridge contract in between!**

---

## Helpful Commands

```bash
# Deploy ONBT
npm run deploy:onbt:base

# Set up trusted remotes
node scripts/setTrustedRemotes.mjs

# Send tokens (example)
node scripts/sendOFT.mjs

# Update branding
npm run branding:update <address> update

# Run tests
npx hardhat test test/OmnichainNabatOFT.test.mjs
```

---

## Resources

- **Architecture Guide**: [BRIDGING_ARCHITECTURE.md](./BRIDGING_ARCHITECTURE.md)
- **UI Integration**: [UI_INTEGRATION_GUIDE.md](./UI_INTEGRATION_GUIDE.md)
- **Branding Guide**: [BRANDING.md](./BRANDING.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **LayerZero Scan**: https://layerzeroscan.com/

---

## Support

Need help? Check these guides:
1. **BRIDGING_ARCHITECTURE.md** - Why no bridge needed
2. **UI_INTEGRATION_GUIDE.md** - How to build the UI
3. **DEPLOYMENT.md** - How to deploy contracts

---

**Remember:** The smart contracts are complete. You only need to build a UI that calls the existing `sendFrom()` function!
