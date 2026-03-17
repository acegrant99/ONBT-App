#!/usr/bin/env node

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║     HARDHAT VERIFICATION - QUICK START GUIDE              ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("📋 Prerequisites:\n");
console.log("  1. API Keys in .env file:");
console.log("     BASESCAN_API_KEY=your_basescan_key");
console.log("     ARBISCAN_API_KEY=your_arbiscan_key\n");

console.log("     Get keys from:");
console.log("     - Basescan: https://basescan.org/apis");
console.log("     - Arbiscan: https://arbiscan.io/apis\n");

console.log("📦 Contracts to Verify:\n");
console.log("  Base OFT:      0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5");
console.log("  Arbitrum OFT:  0x169aC761Ebb210B5A93B68B44DA394776a7B230C\n");

console.log("🚀 Verification Methods:\n");

console.log("Method 1️⃣ : Quick Verify (Recommended)");
console.log(`  $ npm run verify:hardhat\n`);

console.log("Method 2️⃣ : Manual Base OFT");
console.log(`  $ npx hardhat verify 0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5 \\`);
console.log(`      --network base \\`);
console.log(`      "Omnichain Nabat" "ONBT" \\`);
console.log(`      "0x1a44076050125825900e736c501f859c50fE728c" \\`);
console.log(`      "0x44497B9FF645A995b18967b34eFeFDe82AeC8144"\n`);

console.log("Method 3️⃣ : Manual Arbitrum OFT");
console.log(`  $ npx hardhat verify 0x169aC761Ebb210B5A93B68B44DA394776a7B230C \\`);
console.log(`      --network arbitrum \\`);
console.log(`      "Omnichain Nabat" "ONBT" \\`);
console.log(`      "0x1a44076050125825900e736c501f859c50fE728c" \\`);
console.log(`      "0x44497B9FF645A995b18967b34eFeFDe82AeC8144"\n`);

console.log("💡 Tips:\n");
console.log("  • Verify Base OFT first (simpler networks sometimes work better)");
console.log("  • Wait a few blocks after deployment before verifying");
console.log("  • If verification fails, check:");
console.log("    - API keys are correct");
console.log("    - Enough rate limit remaining");
console.log("    - Block explorers are not under maintenance\n");

console.log("✅ Success Indicators:\n");
console.log("  • No error output");
console.log("  • Message: 'Successfully verified contract...'");
console.log("  • Contract page shows 'Contract source code verified'\n");

console.log("🔗 After Verification:\n");
console.log("  Base OFT:");
console.log("    → https://basescan.org/address/0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5\n");
console.log("  Arbitrum OFT:");
console.log("    → https://arbiscan.io/address/0x169aC761Ebb210B5A93B68B44DA394776a7B230C\n");

console.log("═".repeat(70) + "\n");
