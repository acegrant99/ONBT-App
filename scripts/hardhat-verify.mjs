import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

// OFT constructor args: (name, symbol, lzEndpoint, delegate)
const constructorArgs = [
  "Omnichain Nabat",
  "ONBT",
  "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero endpoint
  "0x44497B9FF645A995b18967b34eFeFDe82AeC8144", // Delegate/Owner
];

function runCommand(cmd, description) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`${description}`);
  console.log(`${"─".repeat(70)}`);
  console.log(`$ ${cmd}\n`);

  try {
    const output = execSync(cmd, { encoding: "utf-8", stdio: "inherit" });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║        HARDHAT CONTRACT VERIFICATION                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log(`📦 OFT Contracts to Verify:\n`);
  console.log(`Base OFT:      ${baseOftAddr}`);
  console.log(`Arbitrum OFT:  ${arbOftAddr}\n`);

  console.log(`🔧 Constructor Arguments:`);
  constructorArgs.forEach((arg, i) => {
    console.log(`   [${i}] ${arg}`);
  });

  console.log(`\n${"═".repeat(70)}`);
  console.log(`Starting Hardhat verification...`);
  console.log(`${"═".repeat(70)}\n`);

  // Verify Base OFT
  const baseResult = runCommand(
    `npx hardhat verify ${baseOftAddr} --network base --constructor-args ${path.join(__dirname, "verify-args-base.js")}`,
    `1️⃣  Verifying Base OFT on Basescan`
  );

  // Verify Arbitrum OFT
  const arbResult = runCommand(
    `npx hardhat verify ${arbOftAddr} --network arbitrum --constructor-args ${path.join(__dirname, "verify-args-arbitrum.js")}`,
    `2️⃣  Verifying Arbitrum OFT on Arbiscan`
  );

  // Summary
  console.log(`\n${"═".repeat(70)}`);
  console.log(`VERIFICATION SUMMARY`);
  console.log(`${"═".repeat(70)}\n`);

  if (baseResult.success) {
    console.log(`✅ Base OFT verification: SUCCESSFUL`);
    console.log(`   https://basescan.org/address/${baseOftAddr}\n`);
  } else {
    console.log(`❌ Base OFT verification: FAILED`);
    console.log(`   Error: ${baseResult.error}\n`);
  }

  if (arbResult.success) {
    console.log(`✅ Arbitrum OFT verification: SUCCESSFUL`);
    console.log(`   https://arbiscan.io/address/${arbOftAddr}\n`);
  } else {
    console.log(`❌ Arbitrum OFT verification: FAILED`);
    console.log(`   Error: ${arbResult.error}\n`);
  }

  console.log(`${"═".repeat(70)}\n`);

  if (baseResult.success && arbResult.success) {
    console.log(`🎉 All contracts verified successfully!\n`);
  } else {
    console.log(`⚠️  Some verifications failed. See details above.\n`);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
