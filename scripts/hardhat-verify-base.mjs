#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Temporarily rename the problematic dependency
const nodeModulesPath = path.join(__dirname, "../node_modules/@safe-global");
const backupPath = path.join(__dirname, "../node_modules/@safe-global-backup");

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║  HARDHAT VERIFY - BASE OFT (Dependency Workaround)        ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

try {
  // Check if @safe-global exists
  if (fs.existsSync(nodeModulesPath)) {
    console.log("🔧 Temporarily disabling @safe-global to avoid dependency conflicts...\n");
    execSync(`mv "${nodeModulesPath}" "${backupPath}"`, { stdio: "inherit" });
  }

  // Run hardhat verify
  console.log("📤 Running hardhat verify...\n");
  const cmd = `npx hardhat verify --network base 0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5 "Omnichain Nabat" "ONBT" "0x1a44076050125825900e736c501f859c50fE728c" "0x44497B9FF645A995b18967b34eFeFDe82AeC8144"`;
  
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log("\n✅ Verification completed!\n");
  } catch (error) {
    console.error("\n❌ Verification failed\n");
    throw error;
  }
} finally {
  // Restore @safe-global
  if (fs.existsSync(backupPath)) {
    console.log("\n🔧 Restoring @safe-global...\n");
    execSync(`mv "${backupPath}" "${nodeModulesPath}"`, { stdio: "inherit" });
  }
}
