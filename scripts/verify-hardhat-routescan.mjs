#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

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

const constructorArgsString = constructorArgs.join(" ");

async function verify(address, network, contractName) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`Verifying ${contractName} on ${network} (Routescan)`);
  console.log(`${"─".repeat(70)}`);
  console.log(`Contract: ${address}`);

  try {
    console.log(`\n📤 Submitting verification request...`);
    const command = `npx hardhat verify --network ${network} ${address} ${constructorArgsString}`;
    console.log(`Command: ${command}\n`);

    const { stdout, stderr } = await execAsync(command, {
      cwd: path.dirname(__dirname),
      maxBuffer: 10 * 1024 * 1024,
      timeout: 120000,
    });

    if (stderr && !stderr.includes("Already Verified")) {
      console.log(`⚠️  stderr output:\n${stderr}`);
    }

    if (stdout.includes("Already Verified")) {
      console.log(`✅ Contract is already verified on ${network}`);
      return { success: true, alreadyVerified: true };
    }

    if (stdout.includes("Successfully submitted source code for contract")) {
      console.log(`✅ Verification submitted successfully!`);
      console.log(`\nResponse:\n${stdout}`);
      return { success: true, alreadyVerified: false };
    }

    console.log(`Verification response:\n${stdout}`);
    return { success: true, output: stdout };
  } catch (error) {
    console.log(`❌ Verification failed`);
    console.log(`Error: ${error.message}`);

    if (error.stdout) {
      console.log(`\nStdout:\n${error.stdout}`);
    }
    if (error.stderr) {
      console.log(`\nStderr:\n${error.stderr}`);
    }

    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  HARDHAT VERIFICATION (ROUTESCAN)                          ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Configuration:\n`);
  console.log(`Base OFT:     ${baseOftAddr}`);
  console.log(`Arbitrum OFT: ${arbOftAddr}\n`);
  console.log(
    `Constructor Args: ${constructorArgsString}\n`
  );

  // Try Routescan first (more reliable)
  console.log(`═`.repeat(70));
  console.log(`Using Routescan for verification (no API key required)`);
  console.log(`═`.repeat(70));

  const baseResult = await verify(
    baseOftAddr,
    "baseRoutescan",
    "Base OFT"
  );

  const arbResult = await verify(
    arbOftAddr,
    "arbitrumRoutescan",
    "Arbitrum OFT"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                   VERIFICATION SUMMARY                      ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT (${baseOftAddr}):`);
  if (baseResult.success) {
    console.log(
      `  ✅ ${baseResult.alreadyVerified ? "Already verified" : "Verification successful"}`
    );
    console.log(`  Explorer: https://basescan.org/address/${baseOftAddr}`);
  } else {
    console.log(`  ❌ Verification failed: ${baseResult.error}`);
  }

  console.log(`\nArbitrum OFT (${arbOftAddr}):`);
  if (arbResult.success) {
    console.log(
      `  ✅ ${arbResult.alreadyVerified ? "Already verified" : "Verification successful"}`
    );
    console.log(`  Explorer: https://arbiscan.io/address/${arbOftAddr}`);
  } else {
    console.log(`  ❌ Verification failed: ${arbResult.error}`);
  }

  console.log(`\n═`.repeat(70));

  if (baseResult.success && arbResult.success) {
    console.log(`\n✅ All verifications completed successfully!\n`);
    process.exit(0);
  } else {
    console.log(`\n⚠️  Some verifications had issues. See details above.\n`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
