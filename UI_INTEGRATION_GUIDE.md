# UI Integration Guide for ONBT Cross-Chain Transfers

## Overview

This guide shows you exactly how to build a UI for cross-chain ONBT transfers. The smart contract work is complete - you just need to call the existing functions from a web interface.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Technology Stack Options](#technology-stack-options)
3. [Contract Integration](#contract-integration)
4. [Complete React Example](#complete-react-example)
5. [Next.js + OnchainKit Example](#nextjs--onchainkit-example)
6. [Key Features to Build](#key-features-to-build)
7. [UI/UX Best Practices](#uiux-best-practices)
8. [Error Handling](#error-handling)
9. [Testing Guide](#testing-guide)

---

## Quick Start

### Step 1: Install Dependencies

```bash
# For React + ethers.js
npm install ethers@6

# For Next.js + OnchainKit + wagmi
npm install @coinbase/onchainkit wagmi viem@2.x @tanstack/react-query

# For Vercel deployment
npm install -g vercel
```

### Step 2: Get Contract Details

```javascript
// Contract address (deploy first, then update these)
const ONBT_ADDRESSES = {
  ethereum: "0x...", // Your deployed address
  base: "0x...",     // Your deployed address
  polygon: "0x...",  // Your deployed address
  arbitrum: "0x...", // Your deployed address
};

// LayerZero Chain IDs
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

### Step 3: Set Up ABI

```javascript
// Minimal ABI for UI integration
const ONBT_ABI = [
  // Transfer function
  "function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint _amount, tuple(address refundAddress, address zroPaymentAddress, bytes adapterParams) _callParams) payable",
  
  // Fee estimation
  "function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint _amount, bool _useZro, bytes _adapterParams) view returns (uint nativeFee, uint zroFee)",
  
  // Balance and info
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  
  // Branding
  "function logoURI() view returns (string)",
  "function website() view returns (string)",
  "function getBrandingInfo() view returns (string, string, string, string)"
];
```

---

## Technology Stack Options

### Option 1: React + ethers.js (Simple)

**Best for:** Quick prototypes, simple dApps

```javascript
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

// Direct ethers.js integration
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(address, abi, signer);
```

**Pros:**
- Simple and direct
- Full control
- Lightweight

**Cons:**
- More boilerplate
- Manual state management
- Need to handle network switching manually

### Option 2: Next.js + wagmi + OnchainKit (Recommended)

**Best for:** Production apps, especially on Base/Coinbase

```javascript
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

// Hooks handle everything
const { address } = useAccount();
const { writeContract } = useWriteContract();
```

**Pros:**
- Production-ready
- Beautiful Coinbase UI components
- Automatic network handling
- Built-in caching and state management

**Cons:**
- More setup
- Heavier bundle size
- Opinionated structure

### Option 3: React + viem + wagmi (Modern)

**Best for:** Modern dApps, type safety

```javascript
import { useAccount, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

// Modern TypeScript-first approach
const { writeContract } = useContractWrite({
  address: contractAddress,
  abi: contractABI,
  functionName: 'sendFrom',
});
```

**Pros:**
- Modern and fast
- Type-safe
- Smaller bundle than ethers

**Cons:**
- Different API from ethers
- Learning curve

---

## Contract Integration

### Core Functions You'll Use

#### 1. Connect Wallet

```javascript
// ethers.js
const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  }
  throw new Error("No wallet found");
};

// wagmi
const { address, isConnected } = useAccount();
// Automatically handled by wagmi
```

#### 2. Get Balance

```javascript
// ethers.js
const getBalance = async (address) => {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const balance = await contract.balanceOf(address);
  return ethers.formatEther(balance); // Returns string like "1000.0"
};

// wagmi
const { data: balance } = useReadContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'balanceOf',
  args: [userAddress],
});
```

#### 3. Estimate Fee

```javascript
// ethers.js
const estimateFee = async (destChainId, recipient, amount) => {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const recipientBytes = ethers.zeroPadValue(recipient, 32);
  const amountWei = ethers.parseEther(amount.toString());
  
  const [nativeFee, zroFee] = await contract.estimateSendFee(
    destChainId,
    recipientBytes,
    amountWei,
    false,      // useZro
    "0x"        // adapterParams
  );
  
  return {
    native: ethers.formatEther(nativeFee),
    zro: ethers.formatEther(zroFee)
  };
};

// wagmi
const { data: fees } = useReadContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'estimateSendFee',
  args: [destChainId, recipientBytes, amountWei, false, "0x"],
});
```

#### 4. Send Cross-Chain

```javascript
// ethers.js
const sendCrossChain = async (destChainId, recipient, amount, fee) => {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const recipientBytes = ethers.zeroPadValue(recipient, 32);
  const amountWei = ethers.parseEther(amount.toString());
  
  const tx = await contract.sendFrom(
    await signer.getAddress(),  // from
    destChainId,                // destination
    recipientBytes,             // to
    amountWei,                  // amount
    {
      refundAddress: await signer.getAddress(),
      zroPaymentAddress: ethers.ZeroAddress,
      adapterParams: "0x"
    },
    { value: fee }              // pay fee
  );
  
  await tx.wait();
  return tx.hash;
};

// wagmi
const { writeContract } = useWriteContract();

const send = () => {
  writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'sendFrom',
    args: [userAddress, destChainId, recipientBytes, amountWei, callParams],
    value: fee,
  });
};
```

---

## Complete React Example

### Full Component with ethers.js

```jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract configuration
const ONBT_ABI = [
  "function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint _amount, tuple(address refundAddress, address zroPaymentAddress, bytes adapterParams) _callParams) payable",
  "function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint _amount, bool _useZro, bytes _adapterParams) view returns (uint nativeFee, uint zroFee)",
  "function balanceOf(address) view returns (uint256)",
];

const ONBT_ADDRESS = "0x..."; // Your deployed ONBT address

const CHAINS = [
  { id: 101, name: "Ethereum", lzId: 101 },
  { id: 184, name: "Base", lzId: 184 },
  { id: 109, name: "Polygon", lzId: 109 },
  { id: 110, name: "Arbitrum", lzId: 110 },
];

function ONBTBridge() {
  // State
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [destChain, setDestChain] = useState(184); // Base
  const [estimatedFee, setEstimatedFee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet({ provider, signer, address });
      
      // Get balance
      const contract = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, provider);
      const bal = await contract.balanceOf(address);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error("Failed to connect:", error);
      alert("Failed to connect wallet");
    }
  };

  // Estimate fee
  const handleEstimateFee = async () => {
    if (!wallet || !amount || !recipient) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, wallet.provider);
      
      const amountWei = ethers.parseEther(amount);
      const recipientBytes = ethers.zeroPadValue(recipient, 32);
      
      const [nativeFee] = await contract.estimateSendFee(
        destChain,
        recipientBytes,
        amountWei,
        false,
        "0x"
      );
      
      setEstimatedFee(nativeFee);
      console.log("Estimated fee:", ethers.formatEther(nativeFee), "ETH");
    } catch (error) {
      console.error("Fee estimation failed:", error);
      alert("Failed to estimate fee: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Send tokens
  const handleSend = async () => {
    if (!wallet || !estimatedFee) {
      alert("Please estimate fee first");
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, wallet.signer);
      
      const amountWei = ethers.parseEther(amount);
      const recipientBytes = ethers.zeroPadValue(recipient, 32);
      
      const tx = await contract.sendFrom(
        wallet.address,
        destChain,
        recipientBytes,
        amountWei,
        {
          refundAddress: wallet.address,
          zroPaymentAddress: ethers.ZeroAddress,
          adapterParams: "0x"
        },
        { value: estimatedFee }
      );

      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);
      
      await tx.wait();
      console.log("Transaction confirmed!");
      
      // Refresh balance
      const newBal = await contract.balanceOf(wallet.address);
      setBalance(ethers.formatEther(newBal));
      
      alert("Transfer successful! Check LayerZero Scan for status.");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onbt-bridge">
      <h1>ONBT Cross-Chain Bridge</h1>
      
      {!wallet ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
          <p>Balance: {parseFloat(balance).toFixed(2)} ONBT</p>
          
          <div className="transfer-form">
            <h2>Transfer Tokens</h2>
            
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Recipient Address:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Destination Chain:</label>
              <select 
                value={destChain} 
                onChange={(e) => setDestChain(Number(e.target.value))}
                disabled={loading}
              >
                {CHAINS.map(chain => (
                  <option key={chain.lzId} value={chain.lzId}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleEstimateFee}
              disabled={loading || !amount || !recipient}
            >
              Estimate Fee
            </button>
            
            {estimatedFee && (
              <div className="fee-display">
                <p>Estimated Fee: {parseFloat(ethers.formatEther(estimatedFee)).toFixed(6)} ETH</p>
              </div>
            )}
            
            <button 
              onClick={handleSend}
              disabled={loading || !estimatedFee}
              className="send-button"
            >
              {loading ? "Processing..." : "Send Tokens"}
            </button>
            
            {txHash && (
              <div className="tx-info">
                <p>Transaction: {txHash}</p>
                <a 
                  href={`https://layerzeroscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Track on LayerZero Scan →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .onbt-bridge {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .transfer-form {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          background: #0052ff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        
        button:hover:not(:disabled) {
          background: #0041cc;
        }
        
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .send-button {
          background: #00cc66;
        }
        
        .send-button:hover:not(:disabled) {
          background: #00aa55;
        }
        
        .fee-display {
          background: #fff;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .tx-info {
          background: #e6f7ff;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
        }
        
        .tx-info a {
          color: #0052ff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default ONBTBridge;
```

---

## Next.js + OnchainKit Example

### Complete Next.js App with Coinbase OnchainKit

#### 1. Setup (`_app.tsx` or `layout.tsx`)

```tsx
import '@coinbase/onchainkit/styles.css';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base, mainnet, polygon, arbitrum } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';

const config = createConfig({
  chains: [base, mainnet, polygon, arbitrum],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          <Component {...pageProps} />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

#### 2. Bridge Component (`components/ONBTBridge.tsx`)

```tsx
import { useState } from 'react';
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import { 
  useAccount, 
  useWriteContract, 
  useReadContract,
  useWaitForTransactionReceipt 
} from 'wagmi';
import { parseEther, formatEther, pad } from 'viem';

const ONBT_ADDRESS = '0x...' as `0x${string}`;
const ONBT_ABI = [...] as const;

const LZ_CHAINS = {
  ethereum: 101,
  base: 184,
  polygon: 109,
  arbitrum: 110,
};

export default function ONBTBridge() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [destChain, setDestChain] = useState(184);

  // Read balance
  const { data: balance } = useReadContract({
    address: ONBT_ADDRESS,
    abi: ONBT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Estimate fee
  const { data: feeEstimate } = useReadContract({
    address: ONBT_ADDRESS,
    abi: ONBT_ABI,
    functionName: 'estimateSendFee',
    args: amount && recipient ? [
      destChain,
      pad(recipient as `0x${string}`, { size: 32 }),
      parseEther(amount),
      false,
      '0x',
    ] : undefined,
  });

  // Write contract
  const { 
    writeContract, 
    data: hash, 
    isPending 
  } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = () => {
    if (!address || !feeEstimate) return;

    writeContract({
      address: ONBT_ADDRESS,
      abi: ONBT_ABI,
      functionName: 'sendFrom',
      args: [
        address,
        destChain,
        pad(recipient as `0x${string}`, { size: 32 }),
        parseEther(amount),
        {
          refundAddress: address,
          zroPaymentAddress: '0x0000000000000000000000000000000000000000',
          adapterParams: '0x',
        },
      ],
      value: feeEstimate[0],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Wallet>
          <ConnectWallet>
            <WalletDropdown>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </ConnectWallet>
        </Wallet>
      </div>

      {isConnected && address && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">ONBT Bridge</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Your Balance</p>
            <p className="text-3xl font-bold">
              {balance ? formatEther(balance) : '0'} ONBT
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="0x..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Destination Chain
              </label>
              <select
                value={destChain}
                onChange={(e) => setDestChain(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value={101}>Ethereum</option>
                <option value={184}>Base</option>
                <option value={109}>Polygon</option>
                <option value={110}>Arbitrum</option>
              </select>
            </div>

            {feeEstimate && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">Estimated Fee</p>
                <p className="text-lg font-bold">
                  {formatEther(feeEstimate[0])} ETH
                </p>
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={isPending || isConfirming || !feeEstimate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300"
            >
              {isPending || isConfirming ? 'Sending...' : 'Send Tokens'}
            </button>

            {isSuccess && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">✓ Transfer successful!</p>
                <a
                  href={`https://layerzeroscan.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Track on LayerZero Scan →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Key Features to Build

### 1. Multi-Chain Balance View

Show ONBT balance across all chains:

```jsx
function MultiChainBalance({ address }) {
  const chains = ['ethereum', 'base', 'polygon', 'arbitrum'];
  const [balances, setBalances] = useState({});

  useEffect(() => {
    // Fetch balance from each chain
    chains.forEach(async (chain) => {
      const balance = await getBalanceOnChain(chain, address);
      setBalances(prev => ({ ...prev, [chain]: balance }));
    });
  }, [address]);

  return (
    <div className="balance-grid">
      {chains.map(chain => (
        <div key={chain} className="balance-card">
          <h3>{chain}</h3>
          <p>{balances[chain] || '0'} ONBT</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Transaction History

Track past transfers:

```jsx
function TransactionHistory({ address }) {
  const [transactions, setTransactions] = useState([]);

  // Listen for transfer events
  useEffect(() => {
    const contract = new ethers.Contract(address, abi, provider);
    
    // Listen for SendToChain events
    contract.on("SendToChain", (dstChainId, from, toAddress, amount) => {
      setTransactions(prev => [...prev, {
        type: 'send',
        chain: dstChainId,
        amount,
        timestamp: Date.now()
      }]);
    });

    return () => contract.removeAllListeners();
  }, [address]);

  return (
    <div className="tx-history">
      {transactions.map((tx, i) => (
        <div key={i} className="tx-item">
          <span>{tx.type}</span>
          <span>Chain {tx.chain}</span>
          <span>{tx.amount} ONBT</span>
        </div>
      ))}
    </div>
  );
}
```

### 3. Fee Optimizer

Show cheapest route:

```jsx
function FeeOptimizer({ amount, recipient, allChains }) {
  const [fees, setFees] = useState({});

  useEffect(() => {
    // Estimate fee for each destination
    allChains.forEach(async (chain) => {
      const fee = await estimateFee(chain.id, recipient, amount);
      setFees(prev => ({ ...prev, [chain.name]: fee }));
    });
  }, [amount, recipient]);

  // Find cheapest
  const cheapest = Object.entries(fees).sort((a, b) => a[1] - b[1])[0];

  return (
    <div className="fee-optimizer">
      <p>Cheapest route: {cheapest?.[0]} (${cheapest?.[1]})</p>
      <div className="all-fees">
        {Object.entries(fees).map(([chain, fee]) => (
          <div key={chain}>
            {chain}: ${fee}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## UI/UX Best Practices

### Loading States

```jsx
{loading ? (
  <div className="loading">
    <Spinner />
    <p>Processing transaction...</p>
  </div>
) : (
  <button onClick={handleSend}>Send</button>
)}
```

### Error Messages

```jsx
{error && (
  <div className="error-message">
    <p>❌ {error.message}</p>
    {error.code === 'INSUFFICIENT_FUNDS' && (
      <p>You don't have enough ETH to pay the gas fee.</p>
    )}
  </div>
)}
```

### Success Feedback

```jsx
{success && (
  <div className="success-message">
    <p>✓ Transfer successful!</p>
    <p>Tokens will arrive in 5-10 minutes.</p>
    <a href={layerZeroScanUrl}>Track transfer →</a>
  </div>
)}
```

### Input Validation

```jsx
const validateAmount = (value) => {
  if (value <= 0) return "Amount must be positive";
  if (value > balance) return "Insufficient balance";
  return null;
};

const validateAddress = (addr) => {
  if (!ethers.isAddress(addr)) return "Invalid address";
  return null;
};
```

---

## Error Handling

### Common Errors and Solutions

```javascript
const handleError = (error) => {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return "Not enough ETH to pay gas fee";
  }
  
  if (error.message.includes('user rejected')) {
    return "Transaction rejected by user";
  }
  
  if (error.message.includes('trusted remote')) {
    return "Chains not configured. Contact support.";
  }
  
  if (error.message.includes('exceeds balance')) {
    return "Insufficient ONBT balance";
  }
  
  return "Transaction failed: " + error.message;
};
```

---

## Testing Guide

### Test on Testnet First

1. **Deploy to testnets:**
   - Base Sepolia
   - Ethereum Goerli
   - Polygon Mumbai

2. **Get test tokens:**
   - Use faucets for testnet ETH
   - Mint test ONBT

3. **Test scenarios:**
   - Small transfer (1 ONBT)
   - Large transfer (1000 ONBT)
   - Same address on dest chain
   - Different address on dest chain
   - Multiple chains

4. **Monitor:**
   - LayerZero Scan
   - Block explorers
   - Transaction timing

### Production Checklist

- [ ] Test all chains
- [ ] Verify fee estimates
- [ ] Check error handling
- [ ] Test mobile responsive
- [ ] Security audit
- [ ] Load testing
- [ ] Deploy to Vercel
- [ ] Set up monitoring

---

## Deployment

### Vercel Deployment

```bash
# Initialize
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_ONBT_ADDRESS
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY

# Custom domain
vercel domains add nabat.finance
vercel domains add www.nabat.finance
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_ONBT_ADDRESS_ETHEREUM=0x...
NEXT_PUBLIC_ONBT_ADDRESS_BASE=0x...
NEXT_PUBLIC_ONBT_ADDRESS_POLYGON=0x...
NEXT_PUBLIC_ONBT_ADDRESS_ARBITRUM=0x...

NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

---

## Summary

You now have everything needed to build the ONBT bridge UI:

1. **Contract integration** - Direct function calls
2. **Complete examples** - React and Next.js
3. **UI components** - Transfer form, balance display, history
4. **Best practices** - Error handling, validation, UX
5. **Deployment guide** - Vercel with custom domain

The smart contract work is **complete**. Focus on building a great UI that calls the existing `sendFrom()` function!
