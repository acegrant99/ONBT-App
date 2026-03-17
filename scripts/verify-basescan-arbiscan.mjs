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

async function verifyWithEtherscanV2(
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
    // Try the standard Etherscan V2 POST endpoint format
    const apiUrl = `${baseUrl}/api`;
    
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

    console.log(`📤 Sending Etherscan V2 verification request...`);
    console.log(`   Network: ${explorerName}`);
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

    const responseText = await response.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.log(`❌ Invalid JSON response from ${explorerName}`);
      console.log(`Response: ${responseText.substring(0, 200)}\n`);
      return { success: false, error: "Invalid response from explorer" };
    }

    console.log(`Response Status: ${response.status}`);
    console.log(`Response:\n`, JSON.stringify(result, null, 2), "\n");

    if (result.status === "1") {
      console.log(`✅ Verification submitted successfully!`);
      console.log(`   Submission ID: ${result.result}`);
      console.log(`   Status: Processing\n`);
      return { success: true, submissionId: result.result };
    } else if (result.status === "0") {
      if (
        result.result?.toLowerCase().includes("already verified")
      ) {
        console.log(`✅ Contract is already verified on ${explorerName}\n`);
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
  console.log("║  ETHERSCAN API V2 - VERIFY ON BASESCAN & ARBISCAN         ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Configuration:\n`);
  console.log(`Base OFT:        ${baseOftAddr}`);
  console.log(`Arbitrum OFT:    ${arbOftAddr}`);
  console.log(`Etherscan API:   ${etherscanApiKey ? "✅ Set (V2 Universal)" : "❌ Missing"}\n`);

  if (!etherscanApiKey) {
    console.log(`⚠️  ETHERSCAN_API_KEY not found in .env\n`);
    process.exit(1);
  }

  console.log(`═`.repeat(70));
  console.log(`Using Etherscan API key (V2 format) on Basescan & Arbiscan`);
  console.log(`═`.repeat(70));

  const baseResult = await verifyWithEtherscanV2(
    "https://api.basescan.org",
    etherscanApiKey,
    baseOftAddr,
    "Base OFT",
    "Basescan"
  );

  const arbResult = await verifyWithEtherscanV2(
    "https://api.arbiscan.io",
    etherscanApiKey,
    arbOftAddr,
    "Arbitrum OFT",
    "Arbiscan"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                   VERIFICATION SUMMARY                      ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT - Basescan:`);
  if (baseResult.success) {
    console.log(`  ✅ ${baseResult.alreadyVerified ? "Already verified" : "Submitted successfully"}`);
    if (baseResult.submissionId) console.log(`  ID: ${baseResult.submissionId}`);
    console.log(`  Link: https://basescan.org/address/${baseOftAddr}\n`);
  } else {
    console.log(`  ❌ ${baseResult.error}\n`);
  }

  console.log(`Arbitrum OFT - Arbiscan:`);
  if (arbResult.success) {
    console.log(`  ✅ ${arbResult.alreadyVerified ? "Already verified" : "Submitted successfully"}`);
    if (arbResult.submissionId) console.log(`  ID: ${arbResult.submissionId}`);
    console.log(`  Link: https://arbiscan.io/address/${arbOftAddr}\n`);
  } else {
    console.log(`  ❌ ${arbResult.error}\n`);
  }

  console.log(`═`.repeat(70) + "\n");

  if (baseResult.success && arbResult.success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
