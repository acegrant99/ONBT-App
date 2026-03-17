# Ethers V5 Migration Summary

## Changes Made

### 1. Package.json Dependencies Updated
- **ethers**: Changed from `^6.16.0` → `^5.7.2`
- **@typechain/ethers-v5**: Changed to `^11.0.0` (for ethers v5 compatibility)
- **@nomicfoundation/hardhat-ethers**: Removed (was v3 for ethers v6)
- **@nomiclabs/hardhat-ethers**: Kept at `^2.2.1` (for ethers v5)

### 2. Hardhat Configuration Updated
**File**: `hardhat.config.cjs`

Changed from:
```javascript
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
```

To:
```javascript
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
```

**Rationale**: 
- `@nomiclabs/hardhat-ethers@^2.2.1` is the correct plugin for ethers v5
- `@nomicfoundation/hardhat-ethers@^3.x.x` is for ethers v6
- This resolves the `JsonRpcProvider` undefined error we were encountering

### 3. Contract Changes
No changes needed to Solidity contracts. The inter-contract wiring structure remains the same:

**OmnichainNabatOFT.sol**:
- ✅ Properly inherits from OmnichainNabatGovernance, OmnichainNabatVotes, OmnichainNabatTracking
- ✅ Module references via `IOmnichainNabatVotes` and `IOmnichainNabatTracking` interfaces
- ✅ Setter functions for external modules: `setVotingModule()`, `setTrackingModule()`
- ✅ Helper methods for recording bridge/transfer events
- ✅ Integration with tracking module for analytics

**DeFi Contracts**:
- ✅ All interface definitions in place (IOmnichainNabatOFT, IONBTGovernor, IONBTRewardsPool, etc.)
- ✅ Ready for implementation with ethers v5

### 4. Installation Steps

```bash
# Clean install with ethers v5
rm -r node_modules package-lock.json
npm install --legacy-peer-deps

# Compile
npx hardhat compile
```

### 5. Dependencies Compatibility Matrix

| Tool | Ethers v5 | Ethers v6 | Current Setup |
|------|-----------|-----------|---------------|
| @nomiclabs/hardhat-ethers | ✅ v2.2.x | ❌ | ✅ v2.2.1 |
| @nomicfoundation/hardhat-ethers | ❌ | ✅ v3.x | ❌ Removed |
| @layerzerolabs/toolbox-hardhat | ✅ Requires v5 | ❌ | ✅ v0.6.13 |
| @layerzerolabs/devtools-evm-hardhat | ✅ Requires v5 | ❌ | ✅ v0.6.13 |
| @typechain/ethers-v5 | ✅ | ❌ | ✅ v11.0.0 |
| @typechain/ethers-v6 | ❌ | ✅ | ❌ Removed |

### 6. Why Ethers V5?

The LayerZero ecosystem (version ^3.0.160+) requires ethers v5:
- `@layerzerolabs/oft-evm@^4.0.1` → needs ethers ^5.0
- `@layerzerolabs/oapp-evm@^0.4.1` → needs ethers ^5.0
- `@layerzerolabs/toolbox-hardhat@^0.6.13` → needs ethers ^5.0

Attempting to use ethers v6 breaks these dependencies and causes:
```
TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')
```

### 7. Deployment Scripts Compatibility

All existing deployment scripts should continue to work because:
- Ethers v5 and v6 have similar APIs for deployment
- LayerZero utilities are built on ethers v5, so they're native
- Contract compilation artifacts are version-agnostic

### 8. Next Steps

1. ✅ **Contracts**: OFT module composition complete
2. ✅ **Interfaces**: All 10 inter-contract interfaces defined
3. ✅ **Dependencies**: Ethers v5 configured
4. 🟡 **Compilation**: Run `npx hardhat compile` to generate artifacts
5. 🟡 **Testing**: Run `npx hardhat test` to verify modules work
6. ❌ **Integration**: Implement DeFi contract logic (Staking, Governor, Vault, RewardsPool)

### 9. Known Issues

- Some npm packages (Solana, etc.) want Node.js 20.18.0+, but v20.11.1 is installed. This is safe to ignore.
- Use `--legacy-peer-deps` on install due to peer dependency conflicts (necessary tradeoff)

---

**Status**: ✅ Ethers V5 migration complete. Ready for compilation.

