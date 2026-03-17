#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

const constructorArgs = [
  '"Omnichain Nabat"',
  '"ONBT"',
  '"0x1a44076050125825900e736c501f859c50fE728c"',
  '"0x44497B9FF645A995b18967b34eFeFDe82AeC8144"',
];

async function verify(contract, network, description) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`${description}`);
  console.log(`${"─".repeat(70)}`);
  console.log(`Contract: ${contract}`);
  console.log(`Network: ${network}`);
  console.log(`Constructor Args: ${constructorArgs.join(", ")}\n`);

  const cmd = `npx hardhat verify --network ${network} ${contract} ${constructorArgs.join(" ")}`;
  console.log(`Running: ${cmd}\n`);

  try {
    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    return { success: true };
  } catch (error) {
    console.log(`❌ Verification failed`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.log(error.stderr);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║      HARDHAT SMART CONTRACT VERIFICATION TOOL              ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Contracts to verify:\n`);
  console.log(`  Base OFT:      ${baseOftAddr}`);
  console.log(`  Arbitrum OFT:  ${arbOftAddr}\n`);

  console.log(`🔧 Network Configuration:\n`);
  console.log(`  Base RPC:      ${config.networks.base.rpc}`);
  console.log(`  Arbitrum RPC:  ${config.networks.arbitrum.rpc}\n`);

  console.log(`${"═".repeat(70)}`);
  console.log(`Starting verification process...`);
  console.log(`${"═".repeat(70)}`);

  // Verify both contracts
  const baseResult = await verify(
    baseOftAddr,
    "base",
    "1️⃣  Verifying Base OFT on Basescan"
  );

  const arbResult = await verify(
    arbOftAddr,
    "arbitrum",
    "2️⃣  Verifying Arbitrum OFT on Arbiscan"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                 VERIFICATION RESULTS                        ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT (0x05aA...):`);
  console.log(`  Status: ${baseResult.success ? "✅ VERIFIED" : "❌ FAILED"}`);
  if (baseResult.success) {
    console.log(`  Link: https://basescan.org/address/${baseOftAddr}\n`);
  } else {
    console.log(`  Error: ${baseResult.error}\n`);
  }

  console.log(`Arbitrum OFT (0x169aC...):`);
  console.log(`  Status: ${arbResult.success ? "✅ VERIFIED" : "❌ FAILED"}`);
  if (arbResult.success) {
    console.log(`  Link: https://arbiscan.io/address/${arbOftAddr}\n`);
  } else {
    console.log(`  Error: ${arbResult.error}\n`);
  }

  console.log(`${"═".repeat(70)}`);

  if (baseResult.success && arbResult.success) {
    console.log(`✅ All contracts verified successfully!\n`);
    process.exit(0);
  } else {
    console.log(`⚠️  Some verifications failed. Check output above.\n`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error.message);
  process.exit(1);
});
