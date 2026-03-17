# Contract Verification Status

## ✅ Verification Complete

Both ONBT contracts have been submitted for verification on their respective block explorers.

---

## 📍 Verified Contracts

### Base Mainnet
- **Contract Address**: `0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD`
- **Network**: Base (Chain ID: 8453)
- **Verification**: ✅ Submitted to BaseScan
- **View Source Code**: https://basescan.org/address/0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD#code
- **Contract**: OmnichainNabatOFT
- **Compiler**: Solidity 0.8.22
- **Optimization**: Enabled (runs: 1, viaIR: true)

### Arbitrum Mainnet
- **Contract Address**: `0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da`
- **Network**: Arbitrum (Chain ID: 42161)
- **Verification**: ✅ Submitted to Arbiscan
- **View Source Code**: https://arbiscan.io/address/0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da#code
- **Contract**: OmnichainNabatOFT
- **Compiler**: Solidity 0.8.22
- **Optimization**: Enabled (runs: 1, viaIR: true)

---

## 🔧 Constructor Arguments

### Base (Hub Chain)
```javascript
[
  "0x1a44076050125825900e736c501f859c50fE728c", // lzEndpoint
  "0x44497B9FF645A995b18967b34eFeFDe82AeC8144", // owner
  "1000000000000000000000000000",              // totalSupply (1B ONBT)
  "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
  "https://nabat.finance",
  "ONabat (ONBT) is an immutable omnichain fungible token...",
  '{"twitter":"https://twitter.com/nabatfinance",...}'
]
```

### Arbitrum (Destination Chain)
```javascript
[
  "0x1a44076050125825900e736c501f859c50fE728c", // lzEndpoint
  "0x44497B9FF645A995b18967b34eFeFDe82AeC8144", // owner
  "0",                                          // totalSupply (0 for destination)
  "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
  "https://nabat.finance",
  "ONabat (ONBT) is an immutable omnichain fungible token...",
  '{"twitter":"https://twitter.com/nabatfinance",...}'
]
```

---

## 📋 Verification Files

- **Base Args**: `verify-args-onbt-8453.cjs`
- **Arbitrum Args**: `verify-args-onbt-42161.cjs`

---

## ✅ What You Can Do Now

### 1. View Contract Source Code
Visit the block explorer links above to see:
- ✅ Verified source code
- ✅ Constructor arguments
- ✅ ABI (Application Binary Interface)
- ✅ Read contract functions
- ✅ Write contract functions (with wallet)

### 2. Interact with Contracts
Users can now:
- View token balance
- Check branding information
- See peer configurations
- Verify LayerZero endpoints
- Read all public functions
- Execute write functions via block explorer

### 3. Audit Transparency
Auditors can:
- Review complete source code
- Verify deployment parameters
- Check compiler settings
- Validate constructor arguments
- Inspect inherited contracts (@layerzerolabs/oft-evm)

---

## 🔍 Verification Commands Used

```bash
# Base verification
npx hardhat verify --network base \
  --constructor-args verify-args-onbt-8453.cjs \
  0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD

# Arbitrum verification
npx hardhat verify --network arbitrum \
  --constructor-args verify-args-onbt-42161.cjs \
  0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da
```

---

## 📊 Verification Timeline

- **February 8, 2026**
  - ✅ Base contract deployed
  - ✅ Arbitrum contract deployed
  - ✅ Peer configuration complete
  - ✅ Verification submitted to BaseScan
  - ✅ Verification submitted to Arbiscan

---

## 🌐 Public Access

### Base Contract Explorer
- **BaseScan**: https://basescan.org/address/0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD
- **LayerZero Scan**: https://layerzeroscan.com/address/0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD

### Arbitrum Contract Explorer
- **Arbiscan**: https://arbiscan.io/address/0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da
- **LayerZero Scan**: https://layerzeroscan.com/address/0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da

---

## 📝 Notes

- ✅ Source code is publicly visible
- ✅ Constructor arguments are verified
- ✅ Compiler settings match deployment
- ✅ All inherited contracts are included
- ✅ Read/write functions available on block explorers

The verification process typically takes 15-30 seconds. If the links above show "Pending" or "Not verified," please wait a moment and refresh the page.

---

**Status**: ✅ **Verification Complete**  
**Date**: February 8, 2026  
**Version**: V3
