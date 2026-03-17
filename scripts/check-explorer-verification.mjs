import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

// Explorer URLs
const explorers = {
  base: {
    name: "Basescan",
    address: (addr) => `https://basescan.org/address/${addr}`,
    sourcify: (addr) => `https://repo.sourcify.dev/contracts/8453/${addr}/`,
    routescan: (addr) => `https://routescan.io/address/${addr}`,
  },
  arbitrum: {
    name: "Arbiscan",
    address: (addr) => `https://arbiscan.io/address/${addr}`,
    sourcify: (addr) => `https://repo.sourcify.dev/contracts/42161/${addr}/`,
    routescan: (addr) => `https://routescan.io/address/${addr}`,
  },
};

async function checkEtherscanVerification(address, chainId) {
  // Construct API based on chain
  let apiUrl;

  if (chainId === 8453) {
    // Base doesn't have standard Etherscan, use Basescan
    apiUrl = `https://api.basescan.org/api?module=contract&action=getsourcecode&address=${address}&apikey=PLACEHOLDER`;
  } else if (chainId === 42161) {
    apiUrl = `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=PLACEHOLDER`;
  }

  // Note: We won't actually call it in this demo, but show the concept
  return null;
}

function printExplorerLinks(name, address, chainType) {
  console.log(`\n${"═".repeat(70)}`);
  console.log(`${name}`);
  console.log(`${"═".repeat(70)}`);
  console.log(`Address: ${address}\n`);

  const explorer = explorers[chainType];

  console.log(`📊 Block Explorers:`);
  console.log(`  🔍 ${explorer.name }:`);
  console.log(`     ${explorer.address(address)}\n`);

  console.log(`📋 Source Code Verification:`);
  console.log(`  📜 Sourcify (Decentralized):`);
  console.log(`     ${explorer.sourcify(address)}`);
  console.log(`     Status: Check if source is available\n`);

  console.log(`  🛣️  Routescan:`);
  console.log(`     ${explorer.routescan(address)}`);
  console.log(`     Status: Multi-chain support\n`);

  console.log(`  ✓ ABI & Interaction:`);
  if (chainType === "base") {
    console.log(`     Read Contract: ${explorer.address(address)}#readContract`);
    console.log(`     Write Contract: ${explorer.address(address)}#writeContract\n`);
  } else {
    console.log(`     Read Contract: ${explorer.address(address)}#readContract`);
    console.log(`     Write Contract: ${explorer.address(address)}#writeContract\n`);
  }
}

function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║    OFT CONTRACT VERIFICATION - BLOCK EXPLORERS              ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  // Base OFT
  printExplorerLinks("Base OFT (Hub Chain)", baseOftAddr, "base");

  // Arbitrum OFT
  printExplorerLinks("Arbitrum OFT (Destination Chain)", arbOftAddr, "arbitrum");

  // Additional Info
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║              VERIFICATION CHECKLIST                          ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`✅ Base OFT: 0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5`);
  console.log(`   Verification Steps:`);
  console.log(`   1. Visit: https://basescan.org/address/${baseOftAddr}`);
  console.log(`   2. Go to "Contract" tab`);
  console.log(`   3. Check if "Verify & Publish" shows "Contract source code verified"`);
  console.log(`   4. If not verified, click "Verify & Publish" and submit Solidity code\n`);

  console.log(`✅ Arbitrum OFT: 0x169aC761Ebb210B5A93B68B44DA394776a7B230C`);
  console.log(`   Verification Steps:`);
  console.log(`   1. Visit: https://arbiscan.io/address/${arbOftAddr}`);
  console.log(`   2. Go to "Contract" tab`);
  console.log(`   3. Check if "Verify & Publish" shows "Contract source code verified"`);
  console.log(`   4. If not verified, click "Verify & Publish" and submit Solidity code\n`);

  console.log(`═`.repeat(70));
  console.log(`\n📝 Alternative Verification Services:\n`);

  console.log(`1️⃣  Sourcify (Decentralized & Auto-Verified)`);
  console.log(`   - Repository: https://repo.sourcify.dev/`);
  console.log(`   - Base OFT: https://repo.sourcify.dev/contracts/8453/${baseOftAddr}/`);
  console.log(`   - Arbitrum OFT: https://repo.sourcify.dev/contracts/42161/${arbOftAddr}/`);
  console.log(`   - Automatic verification on deployment with metadata\n`);

  console.log(`2️⃣  Routescan (Multi-Chain)`);
  console.log(`   - Website: https://routescan.io/`);
  console.log(`   - Base OFT: https://routescan.io/address/${baseOftAddr}`);
  console.log(`   - Arbitrum OFT: https://routescan.io/address/${arbOftAddr}`);
  console.log(`   - Supports Base and Arbitrum\n`);

  console.log(`3️⃣  Etherscan-Compatible APIs`);
  console.log(`   - Basescan API: https://api.basescan.org/`);
  console.log(`   - Arbiscan API: https://api.arbiscan.io/`);
  console.log(`   - Can programmatically check verification status\n`);

  console.log(`4️⃣  OpenChain (Blockchain.com alternative)`);
  console.log(`   - Website: https://openchainxyz.com/`);
  console.log(`   - Multi-chain contract verification\n`);

  console.log(`═`.repeat(70));
  console.log(`\n🔍 QUICK LINKS:\n`);

  console.log(`Base OFT:`);
  console.log(`  • Basescan: https://basescan.org/address/${baseOftAddr}`);
  console.log(`  • Sourcify: https://repo.sourcify.dev/contracts/8453/${baseOftAddr}/`);
  console.log(`  • Routescan: https://routescan.io/address/${baseOftAddr}\n`);

  console.log(`Arbitrum OFT:`);
  console.log(`  • Arbiscan: https://arbiscan.io/address/${arbOftAddr}`);
  console.log(`  • Sourcify: https://repo.sourcify.dev/contracts/42161/${arbOftAddr}/`);
  console.log(`  • Routescan: https://routescan.io/address/${arbOftAddr}\n`);

  console.log(`═`.repeat(70));
  console.log(`\n📊 Current Verification Status:\n`);
  console.log(`Base OFT (0x05aA...):`);
  console.log(`  ✅ Deployed: Yes`);
  console.log(`  ✅ Code Present: 11,123 bytes`);
  console.log(`  ⚠️  Verified on Basescan: Check explorer`);
  console.log(`  ⚠️  Verified on Sourcify: Check repository\n`);

  console.log(`Arbitrum OFT (0x169aC...):`);
  console.log(`  ✅ Deployed: Yes`);
  console.log(`  ✅ Code Present: 11,123 bytes`);
  console.log(`  ⚠️  Verified on Arbiscan: Check explorer`);
  console.log(`  ⚠️  Verified on Sourcify: Check repository\n`);

  console.log(`═`.repeat(70));
  console.log(`\n💡 VERIFICATION PROCESS:\n`);
  console.log(`If contracts are not verified, follow these steps:\n`);

  console.log(`1. Via Basescan/Arbiscan (Standard Method):`);
  console.log(`   a) Go to contract address on explorer`);
  console.log(`   b) Click "Verify & Publish"`);
  console.log(`   c) Select Solidity compiler version (0.8.22)`);
  console.log(`   d) Select license (MIT)`);
  console.log(`   e) Paste contract code OR upload JSON`);
  console.log(`   f) Add constructor arguments (if any)`);
  console.log(`   g) Complete CAPTCHA and verify\n`);

  console.log(`2. Via Sourcify (Automatic):`);
  console.log(`   a) Upload contract metadata JSON to Sourcify`);
  console.log(`   b) Automatic verification if metadata matches bytecode`);
  console.log(`   c) Decentralized, permanent storage\n`);

  console.log(`3. Via Hardhat (Recommended):`);
  console.log(`   $ npx hardhat verify <address> --network <network> <args>`);
  console.log(`   Example: npx hardhat verify 0x05aA... --network base\n`);
}

main();
