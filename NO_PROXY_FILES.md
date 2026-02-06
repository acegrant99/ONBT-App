# Proxy Contracts: Intentionally Omitted

## Status: NO PROXY CONTRACTS

This repository **deliberately does not include** any proxy contract files such as:

❌ No `TransparentUpgradeableProxy.sol`  
❌ No `UUPSUpgradeable.sol`  
❌ No `BeaconProxy.sol`  
❌ No `ProxyAdmin.sol`  
❌ No proxy-related imports or dependencies  

## Why?

The `OmnichainNabatOFT.sol` contract follows **LayerZero V2 OFT standard**, which explicitly does NOT require or recommend proxy patterns.

## What You'll Find Instead

✅ `contracts/OmnichainNabatOFT.sol` - Direct OFT implementation  
✅ `contracts/README.md` - Architecture documentation  
✅ `NO_PROXIES.md` - Detailed explanation of no-proxy approach  
✅ `scripts/deploy.js` - Direct deployment script (no proxy setup)  

## File Structure

```
contracts/
├── OmnichainNabatOFT.sol    ← Main contract (inherits OFT directly)
└── README.md                ← Documentation

scripts/
└── deploy.js                ← Direct deployment (no proxy initialization)

test/
└── OmnichainNabatOFT.test.js ← Tests for direct contract (no proxy tests)
```

## Comparison: What's Missing vs Traditional Projects

| Traditional Proxy Project | This OFT Project |
|---------------------------|------------------|
| `Implementation.sol` | ✅ `OmnichainNabatOFT.sol` (direct) |
| `Proxy.sol` | ❌ Not needed |
| `ProxyAdmin.sol` | ❌ Not needed |
| `initialize()` function | ❌ Uses constructor |
| Upgrade scripts | ❌ Not needed |
| Storage layout concerns | ❌ Not applicable |

## References

For full explanation, see:
- [NO_PROXIES.md](NO_PROXIES.md) - Why proxies are not used
- [contracts/README.md](contracts/README.md) - Implementation details
- [LayerZero Documentation](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)

## Questions?

**Q: Why can't I find any proxy files?**  
A: They don't exist because LayerZero V2 OFT standard doesn't use proxies.

**Q: How do I upgrade the contract?**  
A: For OFT tokens, deploy new contracts on each chain and migrate if needed. Proxies aren't the solution for omnichain tokens.

**Q: Is this a bug or oversight?**  
A: No, this is intentional and follows official LayerZero documentation.

**Q: Can I add a proxy?**  
A: You could, but it would violate LayerZero best practices and add unnecessary complexity and risk.

## Verification

To verify no proxy patterns are used:

```bash
# Search for proxy-related code (should find nothing)
grep -r "Proxy" contracts/
grep -r "upgradeable" contracts/
grep -r "initialize()" contracts/

# Check imports (no proxy imports)
grep -r "import.*Proxy" contracts/

# Verify direct inheritance only
grep "contract OmnichainNabatOFT" contracts/OmnichainNabatOFT.sol
# Should show: contract OmnichainNabatOFT is OFT
```

All searches should return no proxy-related results, confirming the clean, direct implementation.
