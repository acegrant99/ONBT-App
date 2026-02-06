# OmnichainNabatOFT Smart Contract

## Overview

This directory contains the `OmnichainNabatOFT.sol` smart contract, implementing the LayerZero V2 OFT (Omnichain Fungible Token) standard for the Nabat ecosystem.

## Architecture: No Proxies Required

### Why No Proxies?

According to [LayerZero V2 Documentation](https://docs.layerzero.network/v2/developers/evm/oft/quickstart), the OFT standard is designed to work **WITHOUT proxy patterns**. Here's why:

1. **Native OFT Design**: The LayerZero V2 OFT contract inherits directly from `OFT.sol`, which provides all necessary omnichain functionality through built-in burn/mint mechanics.

2. **Simplified Architecture**: No need for proxy/implementation separation as OFT contracts are deployed fresh on each chain with the same code.

3. **Security Benefits**: Eliminates proxy-related risks such as:
   - Storage collision issues
   - Proxy upgrade vulnerabilities
   - Complex initialization patterns
   - Delegatecall risks

4. **Direct Deployment**: Each chain gets the same contract deployed with its specific LayerZero endpoint address.

### How It Works

```
Source Chain                LayerZero                Destination Chain
┌─────────────┐            ┌──────────┐            ┌─────────────┐
│   OFT       │───burn───▶ │ Messaging│───mint───▶ │    OFT      │
│ Contract    │            │  Layer   │            │  Contract   │
└─────────────┘            └──────────┘            └─────────────┘
```

**Transfer Flow:**
1. User initiates transfer on source chain
2. OFT contract burns tokens on source chain
3. LayerZero messaging layer transmits message
4. OFT contract mints same amount on destination chain
5. Unified global supply maintained across all chains

## Contract Structure

### OmnichainNabatOFT.sol

```solidity
contract OmnichainNabatOFT is OFT {
    constructor(address _lzEndpoint, address _delegate) 
        OFT("Nabat Token", "NBT", _lzEndpoint, _delegate) 
        Ownable(_delegate) {}
    
    function mint(address _to, uint256 _amount) external onlyOwner;
    function burn(uint256 _amount) external;
}
```

**Key Features:**
- ✅ Direct inheritance from LayerZero's OFT.sol
- ✅ No proxy pattern
- ✅ Native burn/mint for cross-chain transfers
- ✅ Owner-controlled minting for initial supply
- ✅ User-controlled burning
- ✅ ERC20 compatible

## Deployment

### Multi-Chain Deployment Process

Deploy the **same contract** on each supported chain:

```bash
# Example: Deploy on Ethereum
LAYERZERO_ENDPOINT=0x1a44076050125825900e736c501f859c50fE728c \
DELEGATE_ADDRESS=your_address \
npx hardhat run scripts/deploy.js --network ethereum

# Example: Deploy on Polygon
LAYERZERO_ENDPOINT=0x1a44076050125825900e736c501f859c50fE728c \
DELEGATE_ADDRESS=your_address \
npx hardhat run scripts/deploy.js --network polygon
```

### LayerZero V2 Endpoint Addresses

All chains use the same endpoint address in V2:
- **Universal Endpoint**: `0x1a44076050125825900e736c501f859c50fE728c`

Supported chains include:
- Ethereum
- Polygon
- Arbitrum
- Optimism
- BSC
- Avalanche
- Base
- And many more...

Verify current endpoints at: https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts

### Post-Deployment Configuration

After deploying on multiple chains:

1. **Set Peer Addresses**: Configure each contract to recognize its counterparts on other chains
   ```solidity
   setPeer(dstEid, bytes32(addressToBytes32(peerAddress)));
   ```

2. **Mint Initial Supply**: On your primary chain (optional)
   ```solidity
   mint(treasuryAddress, initialSupply);
   ```

3. **Transfer Ownership**: If needed
   ```solidity
   transferOwnership(newOwner);
   ```

## Development

### Install Dependencies

```bash
npm install
```

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

## Security Considerations

### No Proxy = Reduced Attack Surface

By following LayerZero's no-proxy architecture:

- ✅ No storage collision risks
- ✅ No proxy upgrade vulnerabilities
- ✅ No delegatecall complexity
- ✅ Simpler security auditing
- ✅ More transparent contract behavior

### Access Control

- `mint()`: Only contract owner can mint tokens
- `burn()`: Any token holder can burn their own tokens
- LayerZero configuration: Only delegate address can modify settings

## References

- [LayerZero V2 OFT Quickstart](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)
- [LayerZero V2 Contract Standards](https://docs.layerzero.network/v2/concepts/protocol/contract-standards)
- [LayerZero V2 GitHub](https://github.com/LayerZero-Labs/LayerZero-v2)

## License

See [LICENSE](../LICENSE) file for details.
