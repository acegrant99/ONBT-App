# Coinbase Ecosystem Integration Guide

This guide covers all Coinbase integrations in the Nabat Omnichain Ecosystem, including AgentKit, CDP SDK, OnchainKit, Wallet SDK, and more.

## 📦 Installed Coinbase Packages

| Package | Version | Purpose |
|---------|---------|---------|
| @coinbase/agentkit | 0.10.4 | Build AI agents for blockchain operations |
| @coinbase/agentkit-model-context-protocol | 0.2.0 | MCP extension for AgentKit |
| @coinbase/coinbase-sdk | 0.25.0 | Coinbase Developer Platform SDK |
| @coinbase/onchainkit | 1.1.2 | React components for onchain apps |
| @coinbase/wallet-sdk | 4.3.7 | Coinbase Wallet integration |

## 🏗️ Project Structure

```
integrations/coinbase/
├── agentkit.mjs          # AI agent integration
├── cdp-sdk.mjs           # CDP SDK integration
├── onchainkit.mjs        # OnchainKit configuration
└── wallet-sdk.mjs        # Wallet SDK integration

examples/
├── agentkit-example.mjs  # AgentKit usage example
└── cdp-sdk-example.mjs   # CDP SDK usage example
```

## 🤖 AgentKit Integration

### What is AgentKit?

AgentKit allows you to build AI agents that can interact with blockchain. These agents can:
- Deploy smart contracts
- Transfer tokens and NFTs
- Interact with DeFi protocols
- Automate blockchain operations
- Integrate with AI models (GPT-4, Claude, etc.)

### Setup

1. **Get CDP API Keys**
   - Visit https://portal.cdp.coinbase.com/
   - Create a new API key
   - Save the API Key Name and Private Key

2. **Configure Environment**
   ```bash
   CDP_API_KEY_NAME=your_api_key_name
   CDP_PRIVATE_KEY=your_private_key
   ```

3. **Initialize AgentKit**
   ```javascript
   import { initializeAgentKit } from './integrations/coinbase/agentkit.mjs';
   
   const agentkit = await initializeAgentKit({
     networkId: 'base-sepolia'
   });
   ```

### Use Cases

#### 1. Automated Token Deployment
```javascript
import { deployTokenWithAgent } from './integrations/coinbase/agentkit.mjs';

const deployment = await deployTokenWithAgent(agentkit, {
  name: "My Token",
  symbol: "MTK",
  initialSupply: "1000000"
});
```

#### 2. AI-Driven Transfers
```javascript
import { transferWithAgent } from './integrations/coinbase/agentkit.mjs';

// Agent can decide amounts and recipients based on AI logic
const transfer = await transferWithAgent(
  agentkit,
  amount,
  assetId,
  destination
);
```

#### 3. Smart Contract Automation
```javascript
import { invokeContractWithAgent } from './integrations/coinbase/agentkit.mjs';

// Agent can monitor and invoke contracts automatically
const result = await invokeContractWithAgent(
  agentkit,
  contractAddress,
  "claimRewards",
  []
);
```

### Running the Example

```bash
node examples/agentkit-example.mjs
```

## 🏦 CDP SDK Integration

### What is CDP SDK?

The Coinbase Developer Platform SDK provides programmatic access to:
- Wallet creation and management
- Smart contract deployment
- Transaction management
- Asset transfers (ETH, ERC20, ERC721)
- Testnet faucets

### Features

#### 1. Wallet Management
```javascript
import { initializeCDP, createWallet } from './integrations/coinbase/cdp-sdk.mjs';

const coinbase = initializeCDP();
const wallet = await createWallet(coinbase, 'base-sepolia');
```

#### 2. Smart Contract Deployment
```javascript
import { deployContract } from './integrations/coinbase/cdp-sdk.mjs';

const deployment = await deployContract(
  wallet,
  contractBytecode,
  constructorArgs
);
```

#### 3. Asset Transfers
```javascript
import { transferAssets } from './integrations/coinbase/cdp-sdk.mjs';

const transfer = await transferAssets(
  wallet,
  destinationAddress,
  amount,
  assetId
);
```

#### 4. Testnet Faucet
```javascript
import { requestFaucetFunds } from './integrations/coinbase/cdp-sdk.mjs';

const faucet = await requestFaucetFunds(wallet);
// Automatically get testnet ETH
```

### Running the Example

```bash
node examples/cdp-sdk-example.mjs
```

## 🎨 OnchainKit Integration

### What is OnchainKit?

OnchainKit provides React components and hooks for building onchain applications:
- Wallet connection UI
- Identity components (ENS, Basenames)
- Transaction components
- Token displays
- NFT galleries

### Frontend Integration

OnchainKit is designed for React/Next.js applications. Here's how to set it up:

#### 1. Install in Your Frontend
```bash
npm install @coinbase/onchainkit
```

#### 2. Configure Provider
```javascript
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

export default function App({ Component, pageProps }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <Component {...pageProps} />
    </OnchainKitProvider>
  );
}
```

#### 3. Use Components
```javascript
import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
} from '@coinbase/onchainkit/wallet';

export function WalletButton() {
  return (
    <Wallet>
      <ConnectWallet>
        <Avatar />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity />
        <EthBalance />
      </WalletDropdown>
    </Wallet>
  );
}
```

### Backend Configuration

Use our configuration file for backend integration:

```javascript
import { getChainConfig } from './integrations/coinbase/onchainkit.mjs';

const baseConfig = getChainConfig('base');
// Use for RPC connections, chain verification, etc.
```

### Resources

- **Documentation**: https://onchainkit.xyz/
- **Components**: https://onchainkit.xyz/components
- **GitHub**: https://github.com/coinbase/onchainkit

## 💼 Wallet SDK Integration

### What is Wallet SDK?

The Coinbase Wallet SDK allows your dApp to connect to Coinbase Wallet:
- Connect/disconnect wallet
- Send transactions
- Sign messages
- Switch networks
- Monitor account changes

### Usage

#### 1. Initialize SDK
```javascript
import { createWalletIntegration } from './integrations/coinbase/wallet-sdk.mjs';

const wallet = createWalletIntegration();
```

#### 2. Connect Wallet
```javascript
const accounts = await wallet.connect();
console.log('Connected:', accounts[0]);
```

#### 3. Send Transaction
```javascript
const txHash = await wallet.sendTransaction({
  to: recipientAddress,
  value: ethers.parseEther('0.1').toString(),
  data: '0x'
});
```

#### 4. Switch Network
```javascript
await wallet.switchNetwork(8453); // Base mainnet
```

#### 5. Sign Message
```javascript
const signature = await wallet.signMessage(
  "Sign this message",
  accountAddress
);
```

### Event Listeners

```javascript
// Watch for account changes
wallet.onAccountsChanged((accounts) => {
  console.log('Account changed:', accounts[0]);
});

// Watch for network changes
wallet.onChainChanged((chainId) => {
  console.log('Network changed:', chainId);
});
```

## 🔗 Integration with OFT/ONFT Contracts

### Deploy OFT with CDP SDK

```javascript
import { deployContract } from './integrations/coinbase/cdp-sdk.mjs';
import { ethers } from 'hardhat';

// Get OFT contract
const NabatOFT = await ethers.getContractFactory("NabatOFT");

// Deploy with CDP
const deployment = await deployContract(
  wallet,
  NabatOFT.bytecode,
  [
    "Nabat Token",
    "NABT",
    8,
    "0x6EDCE65403992e310A62460808c4b910D972f10f" // LZ endpoint
  ]
);
```

### Interact with OFT using AgentKit

```javascript
import { invokeContractWithAgent } from './integrations/coinbase/agentkit.mjs';

// Mint tokens
await invokeContractWithAgent(
  agentkit,
  oftContractAddress,
  "mint",
  [recipientAddress, amount]
);

// Send cross-chain
await invokeContractWithAgent(
  agentkit,
  oftContractAddress,
  "sendFrom",
  [fromAddress, destChainId, toAddress, amount, refundAddress, zroPaymentAddress, adapterParams]
);
```

### Frontend with OnchainKit

```javascript
import { Transaction, TransactionButton } from '@coinbase/onchainkit/transaction';

export function MintOFT() {
  const calls = [{
    to: oftContractAddress,
    data: encodeFunctionData({
      abi: OFT_ABI,
      functionName: 'mint',
      args: [address, amount]
    })
  }];

  return (
    <Transaction chainId={8453} calls={calls}>
      <TransactionButton text="Mint Tokens" />
    </Transaction>
  );
}
```

## 🚀 Complete Workflow Examples

### Example 1: Automated OFT Distribution

```javascript
// Use AgentKit to automatically distribute tokens
import { initializeAgentKit, invokeContractWithAgent } from './integrations/coinbase/agentkit.mjs';

const agentkit = await initializeAgentKit();

// Agent monitors conditions and distributes automatically
const recipients = await getEligibleRecipients(); // Your logic

for (const recipient of recipients) {
  await invokeContractWithAgent(
    agentkit,
    oftAddress,
    "mint",
    [recipient.address, recipient.amount]
  );
}
```

### Example 2: Cross-Chain NFT Bridge with CDP

```javascript
import { invokeContract } from './integrations/coinbase/cdp-sdk.mjs';

// Send ONFT cross-chain using CDP
const transfer = await invokeContract(
  wallet,
  onftAddress,
  "sendFrom",
  [
    ownerAddress,
    destinationChainId,
    recipientAddress,
    tokenId,
    refundAddress,
    zroPaymentAddress,
    adapterParams
  ]
);
```

### Example 3: dApp with Wallet + OnchainKit

Complete frontend integration:

```javascript
// Frontend: Connect wallet and interact
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Transaction } from '@coinbase/onchainkit/transaction';

export function OFTDApp() {
  return (
    <div>
      <ConnectWallet />
      
      <Transaction
        chainId={8453}
        calls={[{
          to: oftAddress,
          data: encodeMintData(address, amount)
        }]}
      >
        <TransactionButton text="Mint OFT" />
      </Transaction>
    </div>
  );
}
```

## 🔐 Security Best Practices

### API Key Management

1. **Never commit keys to version control**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   ```

2. **Use environment variables**
   ```bash
   CDP_API_KEY_NAME=from_env
   CDP_PRIVATE_KEY=from_env
   ```

3. **Rotate keys regularly**
   - Set expiration dates
   - Monitor usage
   - Revoke compromised keys immediately

### Wallet Security

1. **Export wallets securely**
   ```javascript
   const walletData = wallet.export();
   // Store encrypted, never plain text
   ```

2. **Use separate wallets for testing**
   - Development: Testnet wallets
   - Production: Secure production wallets
   - Never reuse across environments

3. **Monitor transactions**
   - Log all agent actions
   - Set up alerts for unusual activity
   - Review transaction history regularly

## 📊 Monitoring and Logging

### AgentKit Monitoring

```javascript
// Log all agent actions
import { getAgentWalletInfo } from './integrations/coinbase/agentkit.mjs';

setInterval(async () => {
  const info = await getAgentWalletInfo(agentkit);
  console.log('Agent status:', {
    address: info.address,
    balance: info.balance,
    network: info.networkId,
    timestamp: new Date()
  });
}, 60000); // Every minute
```

### Transaction Tracking

```javascript
// Track all transactions
const transactions = [];

async function trackTransaction(txHash, type) {
  transactions.push({
    hash: txHash,
    type: type,
    timestamp: Date.now()
  });
  
  // Save to database or file
  await saveTransactionLog(transactions);
}
```

## 🆘 Troubleshooting

### Common Issues

#### "API Key not found"
**Solution**: Ensure CDP_API_KEY_NAME and CDP_PRIVATE_KEY are set in `.env`

#### "Network not supported"
**Solution**: Use supported networks: base-mainnet, base-sepolia, ethereum, polygon

#### "Insufficient balance"
**Solution**: For testnet, use `requestFaucetFunds()` to get test ETH

#### "Transaction failed"
**Solution**: Check gas limits, network congestion, and contract logic

### Debug Mode

Enable verbose logging:

```javascript
process.env.DEBUG = 'coinbase:*';
```

## 📚 Additional Resources

- **CDP Portal**: https://portal.cdp.coinbase.com/
- **AgentKit Docs**: https://docs.cdp.coinbase.com/agentkit/
- **OnchainKit Docs**: https://onchainkit.xyz/
- **Wallet SDK Docs**: https://docs.cloud.coinbase.com/wallet-sdk/
- **Base Docs**: https://docs.base.org/
- **Community Discord**: https://discord.gg/coinbasecloud

## 🎯 Next Steps

1. **Get API Keys**: Register at https://portal.cdp.coinbase.com/
2. **Run Examples**: Try the example scripts
3. **Build dApp**: Integrate OnchainKit in your frontend
4. **Deploy Agents**: Set up AgentKit for automation
5. **Go Live**: Deploy on Base mainnet

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-02  
**Coinbase SDK Versions**: AgentKit 0.10.4, CDP SDK 0.25.0, OnchainKit 1.1.2, Wallet SDK 4.3.7