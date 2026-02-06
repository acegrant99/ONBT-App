# Architecture Overview

This document provides a technical overview of the Nabat Omnichain Ecosystem architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Nabat Ecosystem                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Ethereum   │         │     Base     │                 │
│  │              │         │  (Coinbase)  │                 │
│  │  NabatOFT    │◄───────►│  NabatOFT    │                 │
│  │  Contract    │   LZ    │  Contract    │                 │
│  └──────────────┘         └──────────────┘                 │
│         ▲                        ▲                          │
│         │                        │                          │
│         │    LayerZero Protocol  │                          │
│         │                        │                          │
│         ▼                        ▼                          │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Polygon    │         │   Arbitrum   │                 │
│  │              │         │              │                 │
│  │  NabatOFT    │◄───────►│  NabatOFT    │                 │
│  │  Contract    │   LZ    │  Contract    │                 │
│  └──────────────┘         └──────────────┘                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Smart Contracts

#### OFT (Omnichain Fungible Token)
- **NabatOFT.sol**: Main OFT implementation
  - Inherits from LayerZero's OFTV2
  - ERC20 compliant
  - Supports minting and burning
  - Cross-chain transfer capabilities

- **OmnichainNabatOFT.sol**: Immutable branded OFT (ONBT)
  - Fixed supply (1 billion tokens)
  - Built-in branding system
  - No mint/burn functions (immutable)
  - Peer-based cross-chain (no proxies needed)

#### ONFT (Omnichain Non-Fungible Token)
- **NabatONFT.sol**: Main ONFT implementation
  - Inherits from LayerZero's ONFT721
  - ERC721 compliant
  - Batch minting support
  - Dynamic metadata URIs
  - Max supply control
  - Peer-based cross-chain transfers

### 2. LayerZero Integration

#### Endpoints
LayerZero endpoints are pre-deployed on each supported chain:
- Ethereum: `0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675`
- Base: `0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7`
- Polygon: `0x3c2269811836af69497E5F486A85D7316753cf62`
- Others listed in `constants/layerzero.ts`

#### Chain IDs
LayerZero uses its own chain ID system:
- Ethereum: 101
- BSC: 102
- Avalanche: 106
- Polygon: 109
- Arbitrum: 110
- Optimism: 111
- Base: 184

### 3. Cross-Chain Flow

```
User initiates transfer on Chain A
           │
           ▼
    NabatOFT.sendFrom()
           │
           ▼
    Lock/Burn tokens
           │
           ▼
    Call LayerZero Endpoint
           │
           ▼
    LayerZero Relayer
           │
           ▼
    Destination Chain Endpoint
           │
           ▼
    NabatOFT.lzReceive()
           │
           ▼
    Mint/Unlock tokens
           │
           ▼
    Transfer to recipient
```

## Technical Details

### Token Flow

#### Sending Tokens
1. User calls `sendFrom()` with:
   - From address
   - Destination chain ID
   - Recipient address
   - Amount
   - Adapter params (gas settings)
   - Native fee payment

2. Contract validates:
   - User has sufficient balance
   - Trusted remote is configured
   - Sufficient fee provided

3. Tokens are:
   - Burned on source chain (for OFT)
   - Locked in proxy (for ProxyOFT)

4. LayerZero message is sent with payload

#### Receiving Tokens
1. LayerZero relayer delivers message
2. `lzReceive()` is called on destination
3. Payload is decoded
4. Tokens are:
   - Minted on destination (for OFT)
   - Unlocked from proxy (for ProxyOFT)
5. Tokens credited to recipient

### Security Features

#### Trusted Remotes
- Each contract maintains a mapping of trusted remote contracts
- Only messages from trusted remotes are accepted
- Set once during initialization per chain pair
- Can be updated by owner

#### Access Control
- `onlyOwner` modifier for admin functions
- Owner can:
  - Mint tokens (OFT only)
  - Burn tokens
  - Set trusted remotes
  - Update configuration

#### Gas Management
- Adapter parameters specify destination gas
- Prevents DoS attacks
- Ensures message delivery
- Refund mechanism for excess fees

### Gas Optimization

#### Shared Decimals
- OFT uses shared decimals (typically 6-8)
- Reduces precision loss across chains
- Minimizes gas costs for transfers
- Example: 18 decimals → 8 shared decimals

#### Batch Operations
- ONFT supports batch minting
- Reduces deployment costs
- Efficient for large collections

## Network Configuration

### Supported Networks

| Network | Chain ID | LZ Chain ID | Type |
|---------|----------|-------------|------|
| Ethereum | 1 | 101 | Mainnet |
| Base | 8453 | 184 | Mainnet |
| Base Sepolia | 84532 | 10245 | Testnet |
| Polygon | 137 | 109 | Mainnet |
| Arbitrum | 42161 | 110 | Mainnet |
| Optimism | 10 | 111 | Mainnet |
| Avalanche | 43114 | 106 | Mainnet |
| BSC | 56 | 102 | Mainnet |

### RPC Configuration
Configured in `hardhat.config.js`:
- Environment variables for each network
- Fallback to public RPCs
- Private key management

## Deployment Architecture

### Single Chain Deployment
```
1. Deploy OFT/ONFT contract
2. Verify on block explorer
3. Mint initial supply (optional)
4. Test local functionality
```

### Multi-Chain Deployment
```
1. Deploy on all target chains
2. Record all contract addresses
3. Configure trusted remotes bidirectionally
4. Test cross-chain transfers
5. Monitor with LayerZero Scan
```

## Integration Points

### Frontend Integration
```javascript
// Connect to contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(ADDRESS, ABI, signer);

// Estimate fees
const [nativeFee] = await contract.estimateSendFee(
  destChainId,
  recipientAddress,
  amount,
  false,
  adapterParams
);

// Send tokens
const tx = await contract.sendFrom(
  fromAddress,
  destChainId,
  recipientAddress,
  amount,
  { refundAddress, zroPaymentAddress, adapterParams },
  { value: nativeFee }
);
```

### Backend Integration
- Use scripts in `scripts/` folder
- Ethers.js for contract interaction
- Event monitoring for cross-chain transfers
- LayerZero Scan API for tracking

## Monitoring and Analytics

### Events
Key events to monitor:
- `Transfer`: Token movements
- `SendToChain`: Cross-chain sends
- `ReceiveFromChain`: Cross-chain receives
- `SetTrustedRemote`: Configuration changes

### LayerZero Scan
- Track message status
- View transaction history
- Monitor gas costs
- Debug failed transfers

## Security Considerations

### Best Practices
1. **Test thoroughly on testnets**
2. **Audit smart contracts before mainnet**
3. **Use multi-sig for owner functions**
4. **Monitor cross-chain activity**
5. **Keep private keys secure**
6. **Verify all contract addresses**

### Attack Vectors
- **Reentrancy**: Protected by LayerZero's design
- **Front-running**: Minimal impact due to atomic transfers
- **Griefing**: Gas limits prevent DoS
- **Unauthorized minting**: Owner-only functions

## Scalability

### Current Limitations
- Gas costs for cross-chain transfers
- Message delivery time (5-10 minutes)
- Network congestion affects speed

### Future Improvements
- Batch cross-chain transfers
- Gas optimization
- Additional chain support
- Enhanced monitoring tools

## Development Workflow

```
1. Local Development
   ├── Write contracts
   ├── Write tests
   └── Run on Hardhat network

2. Testnet Deployment
   ├── Deploy to testnets
   ├── Test cross-chain
   └── Verify functionality

3. Mainnet Deployment
   ├── Audit contracts
   ├── Deploy to mainnet
   ├── Configure production
   └── Monitor operations
```

## Resources

- **LayerZero Docs**: https://layerzero.gitbook.io/docs/
- **Base Docs**: https://docs.base.org/
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **Hardhat**: https://hardhat.org/docs
- **Ethers.js**: https://docs.ethers.org/

## Conclusion

The Nabat Omnichain Ecosystem provides a robust foundation for building cross-chain applications. The architecture leverages LayerZero's secure messaging protocol and integrates seamlessly with Coinbase's Base network and other major blockchains.

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-02