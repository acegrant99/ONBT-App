# AchievementNFT Configuration Fix

## Problem Identified

Integration testing revealed that the **AchievementNFT contract address is not configured** in the Staking contract on both Base and Arbitrum networks.

**Current State:**
- Staking contract has `achievementNFT` set to `0x0000000000000000000000000000000000000000`
- AchievementNFT contract exists and is deployed
- Achievement minting functionality is currently disabled

**Impact:**
- Users cannot earn achievement NFTs for staking milestones
- Core staking/rewards functionality works normally
- No security risk, just missing feature activation

---

## Solution

Call the `setAchievementNFT(address)` function on the Staking contract with the correct AchievementNFT contract address.

### Required Information

**Base Network:**
- Staking Contract: `0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe`
- AchievementNFT: `0x11EEEB62b2b2B66475642f82502989D671fC5855`

**Arbitrum Network:**
- Staking Contract: (from arbitrum deployment file)
- AchievementNFT: (from arbitrum deployment file)

---

## Fix Procedure

### Option 1: Using the Automated Script (Recommended)

**Prerequisites:**
- Admin wallet private key with owner permissions
- Sufficient ETH for gas fees (~0.001 ETH)

**Steps:**

1. **Set up environment variables:**
```bash
# Add to .env file
PRIVATE_KEY=your_admin_wallet_private_key_here
```

2. **Run the fix script on Base:**
```bash
npx hardhat run scripts/fix-achievement-nft-config.mjs --network base
```

3. **Run the fix script on Arbitrum:**
```bash
npx hardhat run scripts/fix-achievement-nft-config.mjs --network arbitrum
```

**What the script does:**
1. ✓ Loads deployment configuration
2. ✓ Checks current AchievementNFT setting
3. ✓ Verifies you are the contract owner
4. ✓ Estimates gas cost
5. ✓ Executes `setAchievementNFT(address)` transaction
6. ✓ Waits for confirmation
7. ✓ Verifies the new configuration

**Expected Output:**
```
========================================================================================
CONFIGURATION FIX: BASE
========================================================================================

Using account: 0x...
Account balance: 1.5 ETH

Contracts:
  Staking:        0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe
  AchievementNFT: 0x11EEEB62b2b2B66475642f82502989D671fC5855

Checking current configuration...
  Current NFT address: 0x0000000000000000000000000000000000000000
  Staking owner:       0x... (your address)
  Signer is owner:     true

Estimating gas...
  Estimated gas: 45000
  Gas price: 0.05 gwei
  Estimated cost: 0.00000225 ETH

Setting AchievementNFT address in Staking contract...
  ✓ Transaction submitted: 0x...
    Waiting for confirmation...

  ✅ Transaction confirmed!
     Block: 12345678
     Gas used: 43521
     Status: Success

Verifying configuration...
  ✅ Configuration verified!
     AchievementNFT is now set to: 0x11EEEB62b2b2B66475642f82502989D671fC5855

========================================================================================
SUCCESS: Staking contract is now properly configured for achievement minting.
========================================================================================
```

---

### Option 2: Manual Transaction via Etherscan

If you prefer to execute manually:

**Base Network:**

1. Go to [Staking Contract on BaseScan](https://basescan.org/address/0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe#writeContract)
2. Click "Connect to Web3" and connect your admin wallet
3. Find function `setAchievementNFT`
4. Enter address: `0x11EEEB62b2b2B66475642f82502989D671fC5855`
5. Click "Write" and confirm transaction

**Arbitrum Network:**

1. Go to [Staking Contract on Arbiscan](https://arbiscan.io/address/[STAKING_ADDRESS]#writeContract)
2. Repeat steps above with Arbitrum's AchievementNFT address

---

### Option 3: Using Hardhat Console

```javascript
const deployment = JSON.parse(fs.readFileSync('deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json'));
const staking = await ethers.getContractAt("ONBTOmnichainStaking", deployment.contracts.staking);
const tx = await staking.setAchievementNFT(deployment.contracts.achievementNFT);
await tx.wait();
console.log("Configuration updated!");
```

---

## Verification

After executing the fix, verify with:

```bash
npx hardhat run scripts/test-integration-flows.mjs --network base
```

Look for:
```
✅ Staking → AchievementNFT wiring          NFT: 0x11EEEB62...
```

---

## Security Checklist

Before executing:
- [ ] Verified you have the correct admin wallet
- [ ] Confirmed you are the contract owner
- [ ] Checked the AchievementNFT address is correct
- [ ] Have sufficient ETH for gas
- [ ] Backed up your private key securely
- [ ] Tested on testnet first (if available)

After executing:
- [ ] Transaction confirmed on block explorer
- [ ] Configuration verified via integration tests
- [ ] Both networks (Base + Arbitrum) configured
- [ ] Achievement minting tested with test wallet

---

## Rollback

If you need to revert:
```javascript
await staking.setAchievementNFT(ethers.constants.AddressZero);
```

This will disable achievement minting again.

---

## Cost Estimate

- **Base:** ~45,000 gas @ 0.05 gwei = ~$0.0001 USD
- **Arbitrum:** ~45,000 gas @ 0.01 gwei = ~$0.00002 USD
- **Total:** Less than $1 USD for both networks

---

## Support

If the script fails:
1. Check you're using the correct private key
2. Verify you have enough ETH for gas
3. Ensure your wallet is the contract owner
4. Check network RPC is responding
5. Try increasing gas limit manually

Contact the development team if issues persist.
