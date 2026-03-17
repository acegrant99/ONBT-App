#!/usr/bin/env node

/**
 * Base Mainnet Hub Deployment Wrapper
 * 
 * Usage:
 *   node scripts/deploy-base-hub.js [--testnet]
 * 
 * Environment:
 *   BASE_RPC_URL or BASE_SEPOLIA_RPC_URL must be set in .env
 *   PRIVATE_KEY must be set in .env
 */

const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config();

const isTestnet = process.argv.includes("--testnet");
const network = isTestnet ? "baseSepolia" : "base";

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║       ONBT Base Hub OFT Deployment - 1B Supply            ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Validate environment
if (!process.env.PRIVATE_KEY) {
  console.error("❌ Error: PRIVATE_KEY not set in .env file");
  process.exit(1);
}

const baseRpcUrl = isTestnet ? process.env.BASE_SEPOLIA_RPC_URL : process.env.BASE_RPC_URL;
if (!baseRpcUrl) {
  console.error(`❌ Error: ${isTestnet ? "BASE_SEPOLIA_RPC_URL" : "BASE_RPC_URL"} not set in .env file`);
  process.exit(1);
}

console.log("✅ Environment Validation:");
console.log(`   Network: ${network} (${isTestnet ? "Testnet" : "Mainnet"})`);
console.log(`   RPC URL: ${baseRpcUrl.substring(0, 40)}...`);
console.log(`   Deployer: ${process.env.PRIVATE_KEY.substring(0, 3)}...${process.env.PRIVATE_KEY.substring(-3)}`);
console.log(`   Hub Chain: true (1,000,000,000 ONBT will be minted)\n`);

// Run deployment
const deployCmd = `npx hardhat run scripts/deploy-base-oft.mjs --network ${network}`;

console.log("📜 Running command:");
console.log(`   ${deployCmd}\n`);

try {
  execSync(deployCmd, {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      IS_HUB_CHAIN: "true",
    },
  });
  console.log("\n✨ Deployment completed successfully!");
  process.exit(0);
} catch (error) {
  console.error("\n❌ Deployment failed!");
  process.exit(1);
}
