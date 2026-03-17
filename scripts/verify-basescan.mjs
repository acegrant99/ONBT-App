#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;

// Read contract source code
const oftSolPath = path.join(__dirname, "../contracts/token/OmnichainNabatOFT.sol");
let sourceCode = "";
if (fs.existsSync(oftSolPath)) {
  sourceCode = fs.readFileSync(oftSolPath, "utf-8");
}

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

async function verifyOnBasescan(apiKey, contractAddress, contractName) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`Verifying ${contractName} on Basescan`);
  console.log(`${"─".repeat(70)}`);
  console.log(`Address: ${contractAddress}`);
  console.log(`API Key: ${apiKey ? "✅ Present" : "❌ Missing"}\n`);

  if (!apiKey) {
    console.log(`⚠️  API key not found.\n`);
    return { success: false, error: "Missing API key" };
  }

  if (!sourceCode) {
    console.log(`⚠️  Source code not found.\n`);
    return { success: false, error: "Missing source code" };
  }

  try {
    // Try Routescan API endpoint directly for Basescan
    const apiUrl = "https://api.routescan.io/v2/network/mainnet/evm/8453/etherscan/api";
    
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
    params.append("licenseType", "3");

    console.log(`📤 Sending verification request via Routescan (Base)...`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   Source code size: ${sourceCode.length} bytes\n`);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 60000,
    });

    const result = await response.json();

    console.log(`Response Status: ${response.status}`);
    console.log(`Response:\n`, JSON.stringify(result, null, 2), "\n");

    if (result.status === "1") {
      console.log(`✅ Verification submitted successfully!`);
      console.log(`   Submission ID: ${result.result}`);
      console.log(`   Status: Processing (2-5 minutes)\n`);
      return { success: true, submissionId: result.result };
    } else if (result.status === "0") {
      if (result.result?.toLowerCase().includes("already verified")) {
        console.log(`✅ Contract is already verified\n`);
        return { success: true, alreadyVerified: true };
      }

      console.log(`⚠️  Submission failed`);
      console.log(`   Error: ${result.result}\n`);
      return { success: false, error: result.result };
    }

    return { success: false, error: result.message || "Unknown error" };
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  BASESCAN VERIFICATION                                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Configuration:\n`);
  console.log(`Base OFT: ${baseOftAddr}`);
  console.log(`API Key:  ${etherscanApiKey ? "✅ Set" : "❌ Missing"}\n`);

  if (!etherscanApiKey) {
    console.log(`⚠️  ETHERSCAN_API_KEY not found in .env\n`);
    process.exit(1);
  }

  console.log(`═`.repeat(70));
  console.log(`Verifying Base OFT on Basescan (via Routescan)`);
  console.log(`═`.repeat(70));

  const result = await verifyOnBasescan(
    etherscanApiKey,
    baseOftAddr,
    "Base OFT"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                   VERIFICATION RESULT                       ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT - Basescan:`);
  if (result.success) {
    console.log(`  ✅ ${result.alreadyVerified ? "Already verified" : "Submitted successfully"}`);
    if (result.submissionId) console.log(`  ID: ${result.submissionId}`);
    console.log(`  Link: https://basescan.org/address/${baseOftAddr}\n`);
  } else {
    console.log(`  ❌ ${result.error}\n`);
  }

  console.log(`═`.repeat(70) + "\n");

  process.exit(result.success ? 0 : 1);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
