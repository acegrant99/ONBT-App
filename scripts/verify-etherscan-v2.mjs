#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

// Read contract source code
const oftSolPath = path.join(__dirname, "../contracts/token/OmnichainNabatOFT.sol");
let sourceCode = "";
if (fs.existsSync(oftSolPath)) {
  sourceCode = fs.readFileSync(oftSolPath, "utf-8");
}

const constructorArgs = [
  "Omnichain Nabat",
  "ONBT",
  "0x1a44076050125825900e736c501f859c50fE728c",
  "0x44497B9FF645A995b18967b34eFeFDe82AeC8144",
];

// Load environment variables
const envPath = path.join(__dirname, "../.env");
let etherscanApiKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const lines = envContent.split("\n");
  lines.forEach((line) => {
    if (line.startsWith("ETHERSCAN_API_KEY=")) {
      etherscanApiKey = line.split("=")[1].trim();
    }
  });
}

async function verifyOnExplorer(
  baseUrl,
  apiKey,
  contractAddress,
  contractName,
  explorerName
) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`Verifying ${contractName} on ${explorerName}`);
  console.log(`${"─".repeat(70)}`);
  console.log(`Address: ${contractAddress}`);
  console.log(`API Key: ${apiKey ? "✅ Present" : "❌ Missing"}\n`);

  if (!apiKey) {
    console.log(`⚠️  API key not found. Skipping verification.\n`);
    return { success: false, error: "Missing API key" };
  }

  if (!sourceCode) {
    console.log(`⚠️  Source code not found. Skipping verification.\n`);
    return { success: false, error: "Missing source code" };
  }

  try {
    // Use Etherscan API V2 endpoint format
    const apiUrl = `${baseUrl}/api/v2`;
    
    const params = new URLSearchParams();
    params.append("apikey", apiKey);
    params.append("module", "contract");
    params.append("action", "verifysourcecode");
    params.append("contractaddress", contractAddress);
    params.append("sourceCode", sourceCode);
    params.append("codeformat", "solidity-single-file");
    params.append("contractname", "OmnichainNabatOFT");
    params.append("compilerversion", "v0.8.22+commit.4fc1097e");
    params.append("optimizationUsed", "1");
    params.append("runs", "200");
    params.append("licenseType", "3"); // MIT
    params.append("constructorArguements", "");

    console.log(`📤 Sending verification request to ${explorerName}...`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   Source code size: ${sourceCode.length} bytes\n`);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 45000,
    });

    const result = await response.json();

    console.log(`Response Status: ${response.status}`);
    console.log(`Response:\n`, JSON.stringify(result, null, 2), "\n");

    if (result.status === "1") {
      console.log(`✅ Verification submitted successfully!`);
      console.log(`   Submission ID: ${result.result}`);
      console.log(`   Status: Processing (may take 2-5 minutes)\n`);
      return { success: true, submissionId: result.result };
    } else if (result.status === "0") {
      // Check if already verified
      if (
        result.result?.includes("already verified") ||
        result.result?.includes("Already Verified")
      ) {
        console.log(`✅ Contract is already verified on ${explorerName}\n`);
        return { success: true, alreadyVerified: true };
      }

      console.log(`⚠️  Submission failed`);
      console.log(`   Error: ${result.result || "Unknown error"}\n`);
      return { success: false, error: result.result };
    } else {
      console.log(`❓ Unexpected response status: ${result.status}\n`);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.log(`❌ Error during verification: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  ETHERSCAN API V2 - CONTRACT VERIFICATION                  ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Configuration:\n`);
  console.log(`Base OFT:        ${baseOftAddr}`);
  console.log(`Arbitrum OFT:    ${arbOftAddr}`);
  console.log(`Etherscan API:   ${etherscanApiKey ? "✅ Set (V2)" : "❌ Missing"}\n`);

  if (!etherscanApiKey) {
    console.log(`⚠️  ETHERSCAN_API_KEY not found in .env\n`);
    console.log(`Get your key from: https://etherscan.io/apis\n`);
    process.exit(1);
  }

  console.log(`═`.repeat(70));
  console.log(`Using Etherscan API V2 (universal across all Etherscan networks)`);
  console.log(`═`.repeat(70));

  // Verify Base OFT using V2 endpoint
  const baseResult = await verifyOnExplorer(
    "https://basescan.org",
    etherscanApiKey,
    baseOftAddr,
    "Base OFT",
    "Basescan (Etherscan API V2)"
  );

  // Verify Arbitrum OFT using V2 endpoint
  const arbResult = await verifyOnExplorer(
    "https://arbiscan.io",
    etherscanApiKey,
    arbOftAddr,
    "Arbitrum OFT",
    "Arbiscan (Etherscan API V2)"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                   VERIFICATION SUMMARY                      ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT (${baseOftAddr}):`);
  if (baseResult.success) {
    if (baseResult.alreadyVerified) {
      console.log(`  ✅ Already verified on Basescan`);
    } else {
      console.log(`  ✅ Verification submitted successfully`);
      console.log(`  ID: ${baseResult.submissionId}`);
    }
    console.log(`  Link: https://basescan.org/address/${baseOftAddr}\n`);
  } else {
    console.log(`  ❌ Verification failed: ${baseResult.error}\n`);
  }

  console.log(`Arbitrum OFT (${arbOftAddr}):`);
  if (arbResult.success) {
    if (arbResult.alreadyVerified) {
      console.log(`  ✅ Already verified on Arbiscan`);
    } else {
      console.log(`  ✅ Verification submitted successfully`);
      console.log(`  ID: ${arbResult.submissionId}`);
    }
    console.log(`  Link: https://arbiscan.io/address/${arbOftAddr}\n`);
  } else {
    console.log(`  ❌ Verification failed: ${arbResult.error}\n`);
  }

  console.log(`═`.repeat(70));

  if (baseResult.success && arbResult.success) {
    console.log(`\n✅ All verifications completed successfully!\n`);
    console.log(`💡 Check back in 2-5 minutes for verification completion.\n`);
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
