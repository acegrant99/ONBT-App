# Dependencies and Compatibility Guide

This document explains the dependency choices and compatibility considerations for the Nabat Omnichain Ecosystem.

## Current Dependencies (Latest Compatible Versions)

### Core Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| hardhat | 3.1.6 | Smart contract development framework |
| @nomicfoundation/hardhat-ethers | 4.0.4 | Ethers.js plugin for Hardhat |
| ethers | 6.16.0 | Ethereum library for interacting with contracts |
| typescript | 5.9.3 | TypeScript compiler (dev only) |
| ts-node | 10.9.2 | TypeScript execution environment |
| dotenv | 17.2.3 | Environment variable management |
| @types/node | 25.2.0 | Node.js type definitions |

### LayerZero & Blockchain Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| @layerzerolabs/solidity-examples | 1.1.0 | LayerZero OFT and ONFT base contracts |
| @layerzerolabs/lz-evm-sdk-v1 | 3.0.158 | LayerZero SDK for cross-chain messaging |
| @openzeppelin/contracts | 4.9.6 | Smart contract library (ERC20, ERC721, etc.) |

## Why These Versions?

### Hardhat 3.x (Latest)
- **Why latest?** Modern ESM support, better performance, improved type safety
- **Breaking changes:** Requires ESM format, different network configuration
- **Migration:** All scripts converted to ESM (.mjs), updated network types

### Ethers.js 6.x (Latest)
- **Why latest?** Better TypeScript support, improved performance, more features
- **Breaking changes:** API changes from v5 (parseEther vs utils.parseEther)
- **Compatibility:** Works with Hardhat 3.x and latest tooling

### OpenZeppelin Contracts 4.9.6 (Not Latest)
- **Why not v5?** LayerZero contracts are built with OpenZeppelin v4
- **Incompatibility:** LayerZero imports OpenZeppelin v4 paths
- **Solution:** Use 4.9.6 which is the latest v4 release
- **Impact:** Contracts use stable, well-tested OpenZeppelin v4 APIs

### LayerZero (Latest)
- **Why latest?** Latest security patches and features
- **Stability:** v1.1.0 is stable and widely deployed
- **Dependency:** Requires OpenZeppelin v4

## Solidity Version

### 0.8.22 (Latest Stable)
- Compatible with LayerZero contracts (^0.8.0)
- Compatible with OpenZeppelin v4 (^0.8.0)
- Includes latest compiler optimizations and security features
- Backward compatible with 0.8.20 used in LayerZero examples

## ESM (ECMAScript Modules) Migration

### What Changed?
The project now uses ESM format throughout:

**Before (CommonJS):**
```javascript
const { ethers } = require("hardhat");
module.exports = config;
```

**After (ESM):**
```javascript
import hre from "hardhat";
const { ethers } = hre;
export default config;
```

### Why ESM?
- Modern JavaScript standard
- Required by Hardhat 3.x
- Better tree-shaking and module resolution
- Native browser compatibility
- Future-proof

### File Extensions
- Configuration: `hardhat.config.js` (with "type": "module" in package.json)
- Scripts: `*.mjs` (explicit ESM modules)
- Tests: `*.mjs` (ESM format)
- Constants: `*.mjs` (shared modules)

## Package.json Configuration

### Key Settings
```json
{
  "type": "module",  // Enable ESM
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test"
  }
}
```

### Why "type": "module"?
- Enables ESM for all .js files
- Required for Hardhat 3.x
- Allows modern import/export syntax
- .mjs files are explicitly ESM

## Hardhat 3.x Network Configuration

### New Format Required
Hardhat 3.x requires explicit network types:

```javascript
networks: {
  ethereum: {
    type: "http",  // Required in Hardhat 3.x
    url: "https://eth-mainnet.g.alchemy.com/...",
    accounts: [...],
    chainId: 1
  }
}
```

### Breaking Change
Hardhat 2.x didn't require the `type` field. Hardhat 3.x needs it to distinguish between:
- `"http"`: Standard HTTP RPC endpoint
- `"edr-simulated"`: Hardhat's EDR (Ethereum Development Runtime)

## Compatibility Matrix

### Tested Combinations

| Component | Version | Compatible With |
|-----------|---------|-----------------|
| Hardhat | 3.1.6 | Node.js 18+, ESM |
| Ethers | 6.16.0 | Hardhat 3.x, OpenZeppelin 4.x |
| OpenZeppelin | 4.9.6 | Solidity 0.8.0+, LayerZero |
| LayerZero | 1.1.0 | OpenZeppelin 4.x, Solidity 0.8.0+ |
| Solidity | 0.8.22 | All above |

### Known Incompatibilities

| Package A | Package B | Issue | Solution |
|-----------|-----------|-------|----------|
| OpenZeppelin 5.x | LayerZero 1.x | Import paths changed | Use OpenZeppelin 4.9.6 |
| Hardhat 3.x | CommonJS | ESM required | Convert to ESM |
| Ethers 6.x | Old Scripts | API changes | Update to new API |

## Migration from TypeScript to JavaScript

### Why JavaScript ESM?
1. **Simpler**: No compilation step needed
2. **Native**: Direct execution with Node.js
3. **Compatible**: Works seamlessly with Hardhat 3.x
4. **Flexible**: Still type-safe with JSDoc comments

### Type Safety with JSDoc
You can still get type checking without TypeScript:

```javascript
/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  // TypeScript will check this in editors
};
```

## Upgrading Guide

### From Previous Version

1. **Install Latest Dependencies**
   ```bash
   npm install --save-dev hardhat@latest @nomicfoundation/hardhat-ethers@latest ethers@latest
   npm install @layerzerolabs/solidity-examples@latest @openzeppelin/contracts@^4.9.6
   ```

2. **Update package.json**
   ```bash
   npm pkg set type="module"
   ```

3. **Convert Scripts**
   - Rename `.ts` files to `.mjs`
   - Change `import { ethers } from "hardhat"` to `import hre from "hardhat"; const { ethers } = hre;`
   - Update relative imports to include `.mjs` extension
   - Remove TypeScript type annotations

4. **Update Hardhat Config**
   - Add `type: "http"` to all network configurations
   - Use ESM export: `export default config`
   - Import with ESM: `import "dotenv/config"`

5. **Update Contracts**
   - Change Solidity version to `^0.8.22`
   - Verify imports are correct

6. **Test**
   ```bash
   npx hardhat compile
   npx hardhat test
   ```

## Common Issues and Solutions

### Issue: "Cannot find module"
**Cause:** ESM requires explicit file extensions  
**Solution:** Add `.mjs` to imports: `import { X } from "./file.mjs"`

### Issue: "Invalid config: type"
**Cause:** Hardhat 3.x requires network type  
**Solution:** Add `type: "http"` to network configs

### Issue: "No Hardhat config file found"
**Cause:** Wrong config file name or location  
**Solution:** Ensure `hardhat.config.js` exists and `"type": "module"` is in package.json

### Issue: "OpenZeppelin import not found"
**Cause:** LayerZero uses v4, you have v5  
**Solution:** Downgrade to OpenZeppelin 4.9.6

### Issue: "Compiler version not found"
**Cause:** Network issues downloading compiler  
**Solution:** Check network, wait and retry, or use cached compiler

## Best Practices

### 1. Lock Dependency Versions
Use exact versions in package.json for production:
```json
{
  "dependencies": {
    "@openzeppelin/contracts": "4.9.6",  // Not ^4.9.6
    "@layerzerolabs/solidity-examples": "1.1.0"
  }
}
```

### 2. Regular Updates
- Check for security updates monthly
- Test thoroughly before upgrading LayerZero
- Read changelogs before updating major versions

### 3. Compatibility Testing
- Always compile contracts after updating
- Run full test suite
- Test deployment on testnet

### 4. Documentation
- Document why specific versions are used
- Note any incompatibilities
- Keep upgrade notes

## Future Updates

### Watching For

1. **LayerZero v2**
   - Major rewrite expected
   - May support OpenZeppelin v5
   - Migration guide will be provided

2. **OpenZeppelin v5**
   - Can upgrade when LayerZero supports it
   - Includes security improvements
   - API changes minimal

3. **Hardhat Updates**
   - Currently on 3.x (stable)
   - ESM is the standard going forward
   - Minor updates should be safe

4. **Ethers.js**
   - v6 is stable
   - v7 may come eventually
   - Generally backward compatible

## Resources

- [Hardhat 3.x Docs](https://hardhat.org/hardhat-runner/docs/getting-started)
- [Ethers.js v6 Migration Guide](https://docs.ethers.org/v6/migrating/)
- [LayerZero Docs](https://layerzero.gitbook.io/docs/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Node.js ESM Documentation](https://nodejs.org/api/esm.html)

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Search Hardhat/Ethers/LayerZero docs
4. Ask in respective Discord communities
5. Open an issue on GitHub

---

**Last Updated:** 2026-02-02  
**Hardhat Version:** 3.1.6  
**Ethers Version:** 6.16.0  
**OpenZeppelin Version:** 4.9.6  
**LayerZero Version:** 1.1.0