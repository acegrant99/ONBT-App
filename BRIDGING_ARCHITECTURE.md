# Bridging Architecture for Omnichain Nabat (ONBT)

## Quick Answer

**Do you need a separate bridging contract?**  
**NO.** The OmnichainNabatOFT contract already inherits LayerZero's OFTV2, which means it **IS** the bridge. You only need to build a UI that interacts with the existing contract.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Why No Separate Bridge?](#why-no-separate-bridge)
3. [How OFT Works](#how-oft-works)
4. [What You Already Have](#what-you-already-have)
5. [What You Need to Build](#what-you-need-to-build)
6. [Contract Functions](#contract-functions)
7. [UI Integration](#ui-integration)
8. [Complete Flow](#complete-flow)
9. [Comparison with Traditional Bridges](#comparison)

---

## Architecture Overview

### Traditional Bridge Architecture (NOT NEEDED)
```
┌─────────────┐     ┌──────────┐     ┌─────────────┐
│   Token A   │────▶│  Bridge  │────▶│   Token B   │
│  (Chain 1)  │     │ Contract │     │  (Chain 2)  │
└─────────────┘     └──────────┘     └─────────────┘
```

### OFT Architecture (WHAT YOU HAVE)
```
┌──────────────────┐                 ┌──────────────────┐
│ OmnichainNabatOFT│◄───LayerZero───▶│ OmnichainNabatOFT│
│    (Chain 1)     │    Protocol     │    (Chain 2)     │
│  Built-in Bridge │                 │  Built-in Bridge │
└──────────────────┘                 └──────────────────┘
```

**The OFT contract IS the bridge!**

---

## Why No Separate Bridge?

### 1. OFT Inherits LayerZero

Your `OmnichainNabatOFT.sol` already inherits from `OFTV2`:

```solidity
contract OmnichainNabatOFT is OFTV2 {
    // LayerZero bridging functionality is built-in
}
```

This gives you:
- ✅ `sendFrom()` - Cross-chain transfer function
- ✅ `estimateSendFee()` - Fee estimation
- ✅ `setTrustedRemoteAddress()` - Peer configuration
- ✅ Message validation and security
- ✅ Automatic token burning/minting

### 2. Peer-Based Architecture

Instead of a separate bridge contract, OFT uses **peers**:

```
Ethereum OFT ←→ Base OFT ←→ Polygon OFT
     ↑                           ↓
     └───────────────────────────┘
        All peers trust each other
```

Each chain has the **same OFT contract**, and they communicate through LayerZero.

### 3. Simpler & Safer

**Traditional Bridge Problems:**
- ❌ Separate bridge contract can be hacked
- ❌ Bridge holds locked tokens (honeypot)
- ❌ Complex lock/mint mechanism
- ❌ Bridge contract needs maintenance

**OFT Solution:**
- ✅ No central bridge to hack
- ✅ Tokens burned on source, minted on destination
- ✅ Direct peer-to-peer messaging
- ✅ Protocol-level security from LayerZero

---

## How OFT Works

### Cross-Chain Transfer Process

```
User on Chain A wants to send 100 ONBT to Chain B
         │
         ▼
┌─────────────────────┐
│ 1. User calls       │
│    sendFrom()       │
│    on Chain A OFT   │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ 2. Chain A OFT      │
│    burns 100 ONBT   │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ 3. LayerZero sends  │
│    message to       │
│    Chain B          │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ 4. Chain B OFT      │
│    receives message │
│    and mints        │
│    100 ONBT         │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ 5. Recipient on     │
│    Chain B has      │
│    100 ONBT         │
└─────────────────────┘
```

### Key Points

1. **No Token Locking**: Tokens are burned on source chain, not locked
2. **Automatic Minting**: Tokens are automatically minted on destination
3. **Atomic Operation**: Either completes fully or fails (no stuck tokens)
4. **Same Total Supply**: Total supply across all chains equals 1 billion

---

## What You Already Have

### ✅ Smart Contract (Complete)

**File:** `contracts/token/OmnichainNabatOFT.sol`

```solidity
contract OmnichainNabatOFT is OFTV2 {
    // Inherits all LayerZero bridging functionality
    
    // Built-in functions from OFTV2:
    // - sendFrom() - for cross-chain transfers
    // - estimateSendFee() - for fee calculation
    // - setTrustedRemoteAddress() - for peer setup
}
```

### ✅ Deployment Script (Complete)

**File:** `scripts/deployONBT.mjs`

Deploys the OFT contract on each chain with:
- Fixed name: "ONabat"
- Fixed symbol: "ONBT"
- Total supply: 1 billion (minted on first chain)
- Branding metadata

### ✅ Configuration Script (Complete)

**File:** `scripts/setTrustedRemotes.mjs`

Sets up trusted peers between chains:
```javascript
// On Chain A, trust Chain B's OFT contract
await oftContract.setTrustedRemoteAddress(chainBId, chainBAddress);

// On Chain B, trust Chain A's OFT contract  
await oftContract.setTrustedRemoteAddress(chainAId, chainAAddress);
```

### ✅ Transfer Script (Complete)

**File:** `scripts/sendOFT.mjs`

Shows how to perform cross-chain transfers:
```javascript
// Send 100 tokens from current chain to Base
const tx = await nabatOFT.sendFrom(
    sender.address,           // from
    LayerZeroChainIds.base,  // destination chain
    recipientAddress,         // to
    amount,                   // amount
    { value: nativeFee }      // pay LayerZero fee
);
```

---

## What You Need to Build

### ❌ UI Frontend (Needs to be Built)

You need a web interface that calls the existing contract functions. The smart contract is complete; you just need to expose it to users.

#### Required UI Components

1. **Chain Selector**
   - Dropdown to select source chain
   - Dropdown to select destination chain
   - Display current chain connection

2. **Balance Display**
   - Show ONBT balance on current chain
   - Show ONBT balance on other chains
   - Show total balance across all chains

3. **Transfer Form**
   - Input: Amount to transfer
   - Input: Recipient address
   - Button: Estimate fees
   - Button: Send tokens

4. **Fee Display**
   - Show estimated LayerZero fee
   - Show fee in native token (ETH, MATIC, etc.)
   - Show approximate USD value

5. **Transaction Status**
   - Show pending transaction
   - Show confirmation
   - Link to LayerZero Scan
   - Link to block explorer

6. **Transfer History**
   - List recent transfers
   - Show status (pending/complete)
   - Filter by chain

---

## Contract Functions

### Core Functions You'll Call from UI

#### 1. `sendFrom()` - Perform Cross-Chain Transfer

```solidity
function sendFrom(
    address _from,              // Sender address
    uint16 _dstChainId,        // Destination LayerZero chain ID
    bytes calldata _toAddress,  // Recipient address (bytes format)
    uint _amount,               // Amount to send
    LzCallParams calldata _callParams // LayerZero parameters
) external payable
```

**JavaScript Example:**
```javascript
const tx = await onbtContract.sendFrom(
    userAddress,                          // from
    LayerZeroChainIds.base,              // to Base
    ethers.zeroPadValue(recipientAddress, 32), // recipient
    ethers.parseEther("100"),            // 100 ONBT
    {
        refundAddress: userAddress,
        zroPaymentAddress: ethers.ZeroAddress,
        adapterParams: "0x"
    },
    { value: estimatedFee }              // pay fee in native token
);
```

#### 2. `estimateSendFee()` - Calculate Transfer Cost

```solidity
function estimateSendFee(
    uint16 _dstChainId,        // Destination chain
    bytes calldata _toAddress,  // Recipient
    uint _amount,               // Amount
    bool _useZro,               // Use ZRO token for fee
    bytes calldata _adapterParams // LayerZero parameters
) external view returns (uint nativeFee, uint zroFee)
```

**JavaScript Example:**
```javascript
const [nativeFee, zroFee] = await onbtContract.estimateSendFee(
    LayerZeroChainIds.base,              // to Base
    ethers.zeroPadValue(recipientAddress, 32),
    ethers.parseEther("100"),
    false,                               // don't use ZRO
    "0x"                                 // default params
);

console.log("Fee:", ethers.formatEther(nativeFee), "ETH");
```

#### 3. `balanceOf()` - Check Balance

```solidity
function balanceOf(address account) external view returns (uint256)
```

**JavaScript Example:**
```javascript
const balance = await onbtContract.balanceOf(userAddress);
console.log("Balance:", ethers.formatEther(balance), "ONBT");
```

#### 4. View Functions - Get Token Info

```solidity
function name() external view returns (string memory)        // "ONabat"
function symbol() external view returns (string memory)      // "ONBT"
function decimals() external view returns (uint8)            // 18
function totalSupply() external view returns (uint256)       // Current chain supply
function TOTAL_SUPPLY() external view returns (uint256)      // 1 billion (immutable)
```

---

## UI Integration

### Complete React Example

```jsx
import { ethers } from 'ethers';
import { useState } from 'react';

// OFT ABI (only functions we need)
const OFT_ABI = [
  "function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint _amount, tuple(address refundAddress, address zroPaymentAddress, bytes adapterParams) _callParams) payable",
  "function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint _amount, bool _useZro, bytes _adapterParams) view returns (uint nativeFee, uint zroFee)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)"
];

// LayerZero Chain IDs
const CHAIN_IDS = {
  ethereum: 101,
  base: 184,
  polygon: 109,
  arbitrum: 110
};

function CrossChainTransfer() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [destChain, setDestChain] = useState('base');
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(false);

  // Contract address on current chain
  const CONTRACT_ADDRESS = "0x..."; // Your deployed ONBT address

  // Estimate fee
  const estimateFee = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, OFT_ABI, signer);

    const amountWei = ethers.parseEther(amount);
    const recipientBytes = ethers.zeroPadValue(recipient, 32);
    const destChainId = CHAIN_IDS[destChain];

    const [nativeFee] = await contract.estimateSendFee(
      destChainId,
      recipientBytes,
      amountWei,
      false,
      "0x"
    );

    setFee(ethers.formatEther(nativeFee));
    return nativeFee;
  };

  // Send tokens
  const sendTokens = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, OFT_ABI, signer);
      const userAddress = await signer.getAddress();

      // Estimate fee first
      const estimatedFee = await estimateFee();

      // Send transaction
      const amountWei = ethers.parseEther(amount);
      const recipientBytes = ethers.zeroPadValue(recipient, 32);
      const destChainId = CHAIN_IDS[destChain];

      const tx = await contract.sendFrom(
        userAddress,
        destChainId,
        recipientBytes,
        amountWei,
        {
          refundAddress: userAddress,
          zroPaymentAddress: ethers.ZeroAddress,
          adapterParams: "0x"
        },
        { value: estimatedFee }
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!");
      alert("Transfer successful! Check LayerZero Scan for status.");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-form">
      <h2>Cross-Chain ONBT Transfer</h2>
      
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
        />
      </div>

      <div>
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
        />
      </div>

      <div>
        <label>Destination Chain:</label>
        <select value={destChain} onChange={(e) => setDestChain(e.target.value)}>
          <option value="ethereum">Ethereum</option>
          <option value="base">Base</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
      </div>

      <button onClick={estimateFee} disabled={!amount || !recipient}>
        Estimate Fee
      </button>

      {fee && (
        <div className="fee-display">
          <p>Estimated Fee: {fee} ETH</p>
        </div>
      )}

      <button onClick={sendTokens} disabled={loading || !fee}>
        {loading ? "Sending..." : "Send Tokens"}
      </button>
    </div>
  );
}

export default CrossChainTransfer;
```

### Next.js with OnchainKit Example

```tsx
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownLink, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { base } from 'wagmi/chains';

const OFT_ADDRESS = "0x..."; // Your ONBT contract address
const OFT_ABI = [...]; // ABI from above

export default function ONBTBridge() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Read balance
  const { data: balance } = useReadContract({
    address: OFT_ADDRESS,
    abi: OFT_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  // Send cross-chain
  const handleSend = async (destChain: number, recipient: string, amount: bigint) => {
    const recipientBytes = ethers.zeroPadValue(recipient, 32);
    
    // Estimate fee
    const [fee] = await readContract({
      address: OFT_ADDRESS,
      abi: OFT_ABI,
      functionName: 'estimateSendFee',
      args: [destChain, recipientBytes, amount, false, "0x"],
    });

    // Send tokens
    writeContract({
      address: OFT_ADDRESS,
      abi: OFT_ABI,
      functionName: 'sendFrom',
      args: [
        address,
        destChain,
        recipientBytes,
        amount,
        {
          refundAddress: address,
          zroPaymentAddress: '0x0000000000000000000000000000000000000000',
          adapterParams: "0x"
        }
      ],
      value: fee,
    });
  };

  return (
    <div>
      <Wallet>
        <ConnectWallet>
          <WalletDropdown>
            <WalletDropdownLink href="/profile">Profile</WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </ConnectWallet>
      </Wallet>

      {address && (
        <div>
          <p>Balance: {balance?.toString()} ONBT</p>
          {/* Transfer form here */}
        </div>
      )}
    </div>
  );
}
```

---

## Complete Flow

### Setup Phase (Already Done)

1. ✅ Deploy OmnichainNabatOFT on each chain
2. ✅ Set trusted remotes (peers) between all chains
3. ✅ Test transfers with scripts

### User Flow (Need UI)

```
1. User connects wallet to dApp
   ├─ Connect to Ethereum, Base, Polygon, etc.
   └─ Display ONBT balance on current chain

2. User selects destination chain
   ├─ Choose from dropdown (Base, Polygon, etc.)
   └─ Show LayerZero chain ID

3. User enters transfer details
   ├─ Amount to send (e.g., 100 ONBT)
   └─ Recipient address on destination

4. User clicks "Estimate Fee"
   ├─ Call estimateSendFee()
   └─ Display fee in native token

5. User confirms and sends
   ├─ Call sendFrom() with fee
   ├─ Sign transaction
   └─ Pay gas + LayerZero fee

6. Transaction processing
   ├─ Source chain: Burn tokens
   ├─ LayerZero: Relay message (5-10 min)
   └─ Dest chain: Mint tokens

7. User sees confirmation
   ├─ Link to LayerZero Scan
   ├─ Link to block explorer
   └─ Updated balances
```

---

## Comparison

### Traditional Bridge vs OFT

| Feature | Traditional Bridge | OFT (What You Have) |
|---------|-------------------|---------------------|
| **Architecture** | Separate bridge contract | Built into token contract |
| **Token Movement** | Lock on source, mint on dest | Burn on source, mint on dest |
| **Security** | Bridge can be hacked | Protocol-level security |
| **Complexity** | High (3+ contracts) | Low (1 contract per chain) |
| **Maintenance** | Bridge needs updates | Protocol maintained |
| **Trust** | Trust bridge operator | Trust LayerZero protocol |
| **Liquidity** | Fragmented (locked vs wrapped) | Unified (same token) |
| **Gas Costs** | Higher (more contracts) | Lower (direct) |
| **Setup** | Deploy bridge + tokens | Deploy tokens only |
| **UI Needed?** | Yes | Yes |

---

## Summary

### What You Have ✅

- ✅ **Smart Contract**: OmnichainNabatOFT with built-in LayerZero bridging
- ✅ **Deployment Scripts**: Deploy on any chain
- ✅ **Configuration Scripts**: Set up trusted remotes
- ✅ **Transfer Scripts**: Example of how to send tokens
- ✅ **Documentation**: Complete guides

### What You Need ❌

- ❌ **Web UI**: User-friendly interface to call contract functions
- ❌ **Balance Display**: Show ONBT on multiple chains
- ❌ **Transfer Form**: Input amount, recipient, destination
- ❌ **Fee Estimation**: Show costs before sending
- ❌ **Transaction History**: Track transfers

### What You DON'T Need ❌

- ❌ **Separate Bridge Contract**: OFT IS the bridge
- ❌ **Lock/Unlock Mechanism**: Burns/mints automatically
- ❌ **Liquidity Pools**: No wrapped tokens needed
- ❌ **Bridge Operator**: LayerZero handles everything

---

## Next Steps

1. **Choose Frontend Framework**
   - React + ethers.js
   - Next.js + wagmi + OnchainKit
   - Vue + viem

2. **Build UI Components**
   - Wallet connection
   - Chain selector
   - Transfer form
   - Fee display
   - Transaction status

3. **Test on Testnet**
   - Deploy to Base Sepolia
   - Test transfers
   - Verify fees
   - Check timing

4. **Deploy to Production**
   - Use nabat.finance domain (Vercel)
   - Deploy UI
   - Test with real tokens
   - Monitor transactions

5. **Add Features**
   - Multi-chain balance view
   - Transfer history
   - Fee optimization
   - Transaction tracking

---

## Resources

- **LayerZero Docs**: https://layerzero.gitbook.io/
- **LayerZero Scan**: https://layerzeroscan.com/
- **OnchainKit**: https://onchainkit.xyz/
- **Wagmi Docs**: https://wagmi.sh/
- **Your Scripts**: See `scripts/` folder for examples

---

## Conclusion

**You do NOT need a separate bridging contract.** The OmnichainNabatOFT contract you already have **IS** the bridge. It inherits all the bridging functionality from LayerZero's OFTV2.

All you need to do is build a UI that:
1. Connects to the user's wallet
2. Calls `sendFrom()` on the OFT contract
3. Displays balances and transaction status

The smart contract side is **complete**. Focus on building the frontend!
