#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env");

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║      HARDHAT VERIFICATION - API KEY CHECK                 ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.log("❌ .env file not found at:", envPath);
  console.log("\nPlease create a .env file with the following:\n");
  console.log("PRIVATE_KEY=your_private_key");
  console.log("BASESCAN_API_KEY=your_basescan_api_key");
  console.log("ARBISCAN_API_KEY=your_arbiscan_api_key\n");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const lines = envContent.split("\n");

let hasPrivateKey = false;
let hasBasescanKey = false;
let hasArbiscanKey = false;

lines.forEach((line) => {
  if (line.startsWith("PRIVATE_KEY=") && line.length > 12) hasPrivateKey = true;
  if (line.startsWith("BASESCAN_API_KEY=") && line.length > 17) hasBasescanKey = true;
  if (line.startsWith("ARBISCAN_API_KEY=") && line.length > 17) hasArbiscanKey = true;
});

console.log("📋 API Key Status:\n");
console.log(`  PRIVATE_KEY:        ${hasPrivateKey ? "✅ Set" : "❌ Missing"}`);
console.log(`  BASESCAN_API_KEY:   ${hasBasescanKey ? "✅ Set" : "❌ Missing"}`);
console.log(`  ARBISCAN_API_KEY:   ${hasArbiscanKey ? "✅ Set" : "❌ Missing"}\n`);

if (!hasBasescanKey || !hasArbiscanKey) {
  console.log("⚠️  Missing API keys. To verify, you need:\n");
  console.log("1. Get Basescan API Key:");
  console.log("   → https://basescan.org/apis\n");
  console.log("2. Get Arbiscan API Key:");
  console.log("   → https://arbiscan.io/apis\n");
  console.log("3. Add to .env file:\n");
  if (!hasBasescanKey)
    console.log("   BASESCAN_API_KEY=your_key_here");
  if (!hasArbiscanKey)
    console.log("   ARBISCAN_API_KEY=your_key_here");
  console.log("\n");
  process.exit(1);
} else {
  console.log("✅ All API keys are configured!\n");
  console.log("You can now run:\n");
  console.log("  $ npm run verify:hardhat\n");
  console.log("Or individual networks:\n");
  console.log("  $ npx hardhat verify 0x05aA... --network base <args>");
  console.log("  $ npx hardhat verify 0x169aC... --network arbitrum <args>\n");
}
