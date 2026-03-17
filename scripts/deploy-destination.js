#!/usr/bin/env node

/**
 * Destination Chain Deployment Helper
 * 
 * Usage:
 *   node scripts/deploy-destination.js <network> [--testnet]
 * 
 * Supported networks: ethereum, polygon, arbitrum, optimism, bsc, avalanche
 * 
 * Examples:
 *   node scripts/deploy-destination.js ethereum
 *   node scripts/deploy-destination.js polygon --testnet
 */

const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config();

const network = process.argv[2];
const isTestnet = process.argv.includes("--testnet");

const supportedNetworks = ["ethereum", "polygon", "arbitrum", "optimism", "bsc", "avalanche"];

if (!network || !supportedNetworks.includes(network)) {
  console.error(`❌ Error: Invalid or missing network argument`);
  console.error(`\nSupported networks: ${supportedNetworks.join(", ")}`);
  console.error(`\nUsage: node scripts/deploy-destination.js <network> [--testnet]`);
  process.exit(1);
}

if (!process.env.PRIVATE_KEY) {
  console.error("❌ Error: PRIVATE_KEY not set in .env file");
  process.exit(1);
}

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║     ONBT Destination Chain Deployment Wrapper Script      ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("✅ Configuration:");
console.log(`   Network: ${network} (${isTestnet ? "Testnet" : "Mainnet"})`);
console.log(`   Deployment Type: destination`);
console.log(`   Hub Chain: false\n`);

// Run deployment
const deployCmd = `npx hardhat run scripts/deployFullEcosystem.mjs --network ${network}`;

console.log("📜 Running command:");
console.log(`   ${deployCmd}\n`);

try {
  execSync(deployCmd, {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      IS_HUB_CHAIN: "false",
    },
  });
  console.log("\n✨ Deployment completed successfully!");
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Note the contract addresses above`);
  console.log(`   2. Update scripts/configurePeers.mjs with these addresses`);
  console.log(`   3. Run peer configuration on all chains`);
  process.exit(0);
} catch (error) {
  console.error("\n❌ Deployment failed!");
  process.exit(1);
}
