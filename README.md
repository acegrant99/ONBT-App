# ONBT-App

New Repo for revamped efforts in deploying the new, the Nabat Omnichain Government ecosystem. The dApp.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- A wallet with testnet ETH (see instructions below)

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. The `.env` file is pre-configured for **TESTNETS** (Ethereum Sepolia and Base Sepolia). Do not use mainnet for development and testing.

### Getting Testnet ETH (For Faucets)

**IMPORTANT**: This application uses testnets, NOT mainnet. You need testnet ETH, which is free.

#### Ethereum Sepolia Testnet Faucets

Get free Sepolia ETH from these faucets:
- **Alchemy Sepolia Faucet**: https://sepoliafaucet.com/
- **Infura Sepolia Faucet**: https://www.infura.io/faucet/sepolia
- **QuickNode Faucet**: https://faucet.quicknode.com/ethereum/sepolia
- **Sepolia PoW Faucet**: https://sepolia-faucet.pk910.de/

#### Base Sepolia Testnet Faucets

Get free Base Sepolia ETH:
- **Base Sepolia Faucet**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Alchemy Base Sepolia Faucet**: https://www.alchemy.com/faucets/base-sepolia

#### Bridge from Ethereum Sepolia to Base Sepolia

If you have Sepolia ETH but need Base Sepolia ETH:
- **Base Sepolia Bridge**: https://bridge.base.org/

### Troubleshooting

#### "I don't have enough ETH on mainnet for faucet tokens"

This error means you're trying to use mainnet instead of testnet. Follow these steps:

1. **Verify your wallet is on the correct network**:
   - Open your wallet (MetaMask, etc.)
   - Switch to "Sepolia Test Network" or "Base Sepolia"
   - Do NOT use "Ethereum Mainnet"

2. **Get testnet ETH** (see faucet links above)

3. **Check your .env configuration**:
   - Ensure you're using the Sepolia RPC endpoints
   - The default configuration is already set for testnets

4. **Network Configuration**:
   - Ethereum Sepolia Chain ID: `11155111`
   - Base Sepolia Chain ID: `84532`

### Network Information

This project is configured for:
- **Ethereum Sepolia Testnet** (not Ethereum mainnet)
- **Base Sepolia Testnet** (not Base mainnet)

Testnet ETH has no real value and is free to obtain from faucets. 
