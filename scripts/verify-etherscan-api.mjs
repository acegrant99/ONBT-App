import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

// Load environment variables
const envPath = path.join(__dirname, "../.env");
let basescanApiKey = "";
let arbiscanApiKey = "";
let etherscanApiKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const lines = envContent.split("\n");
  lines.forEach((line) => {
    if (line.startsWith("BASESCAN_API_KEY=")) {
      basescanApiKey = line.split("=")[1].trim();
    }
    if (line.startsWith("ARBISCAN_API_KEY=")) {
      arbiscanApiKey = line.split("=")[1].trim();
    }
    if (line.startsWith("ETHERSCAN_API_KEY=")) {
      etherscanApiKey = line.split("=")[1].trim();
    }
  });
}

// Use ETHERSCAN_API_KEY as fallback if specific keys aren't set
if (!basescanApiKey && etherscanApiKey) {
  basescanApiKey = etherscanApiKey;
}
if (!arbiscanApiKey && etherscanApiKey) {
  arbiscanApiKey = etherscanApiKey;
}

// Read contract source code
const oftSolPath = path.join(__dirname, "../contracts/token/OmnichainNabatOFT.sol");
const oftDestSolPath = path.join(__dirname, "../contracts/token/OmnichainNabatOFTDestination.sol");

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

async function verifyContract(
  apiUrl,
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
    // Prepare request body for V2 API
    const requestBody = {
      apikey: apiKey,
      module: "contract",
      action: "verifysourcecode",
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: "solidity-single-file",
      contractname: "OmnichainNabatOFT",
      compilerversion: "v0.8.22+commit.4fc1097e",
      optimizationUsed: "1",
      runs: "200",
      licenseType: "3", // MIT
      constructorArguements: "",
    };

    console.log(`📤 Sending verification request to ${explorerName}...`);
    console.log(`   URL: ${apiUrl}`);
    console.log(`   Source code size: ${sourceCode.length} bytes\n`);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: new URLSearchParams(requestBody),
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
      console.log(`   Status: Pending - may take a few minutes\n`);
      return { success: true, submissionId: result.result };
    } else if (result.status === "0") {
      console.log(`⚠️  Verification failed`);
      console.log(`   Error: ${result.result || "Unknown error"}\n`);
      return { success: false, error: result.result };
    } else {
      console.log(`❓ Unexpected response status: ${result.status}\n`);
      return { success: false, error: result.result };
    }
  } catch (error) {
    console.log(`❌ Error during verification: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

async function checkVerificationStatus(apiUrl, apiKey, contractAddress, explorerName) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`Checking verification status on ${explorerName}`);
  console.log(`${"─".repeat(70)}`);

  try {
    const params = new URLSearchParams();
    params.append("apikey", apiKey);
    params.append("module", "contract");
    params.append("action", "getabi");
    params.append("address", contractAddress);

    const response = await fetch(`${apiUrl}?${params}`);
    const result = await response.json();

    if (result.status === "1" && result.result !== "Contract source code not verified") {
      console.log(`✅ Contract is verified on ${explorerName}\n`);
      return { verified: true };
    } else if (result.result === "Contract source code not verified") {
      console.log(`⏳ Contract is not yet verified on ${explorerName}\n`);
      return { verified: false };
    } else {
      console.log(`❓ Status check inconclusive: ${result.result}\n`);
      return { verified: false };
    }
  } catch (error) {
    console.log(`❌ Error checking status: ${error.message}\n`);
    return { verified: false };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║    ETHERSCAN API - CONTRACT VERIFICATION TOOL             ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\n📋 Configuration:\n`);
  console.log(`Base OFT:           ${baseOftAddr}`);
  console.log(`Arbitrum OFT:       ${arbOftAddr}`);
  console.log(`Basescan API Key:   ${basescanApiKey ? "✅ Set" : "❌ Missing"}`);
  console.log(`Arbiscan API Key:   ${arbiscanApiKey ? "✅ Set" : "❌ Missing"}\n`);

  if (!basescanApiKey || !arbiscanApiKey) {
    console.log(`⚠️  Missing API keys!\n`);
    console.log(`To get API keys:\n`);
    console.log(`1. Basescan: https://basescan.org/apis`);
    console.log(`2. Arbiscan: https://arbiscan.io/apis\n`);
    console.log(`Add to .env file:`);
    console.log(`   BASESCAN_API_KEY=your_key`);
    console.log(`   ARBISCAN_API_KEY=your_key\n`);
    process.exit(1);
  }

  console.log(`═`.repeat(70));
  console.log(`Starting verification process...`);
  console.log(`═`.repeat(70));

  // Verify Base OFT
  const baseResult = await verifyContract(
    "https://api.basescan.org/api",
    basescanApiKey,
    baseOftAddr,
    "Base OFT",
    "Basescan"
  );

  // Verify Arbitrum OFT
  const arbResult = await verifyContract(
    "https://api.arbiscan.io/api",
    arbiscanApiKey,
    arbOftAddr,
    "Arbitrum OFT",
    "Arbiscan"
  );

  // Check status
  console.log(`\n${"═".repeat(70)}`);
  console.log(`Checking verification status...`);
  console.log(`${"═".repeat(70)}`);

  const baseStatus = await checkVerificationStatus(
    "https://api.basescan.org/api",
    basescanApiKey,
    baseOftAddr,
    "Basescan"
  );

  const arbStatus = await checkVerificationStatus(
    "https://api.arbiscan.io/api",
    arbiscanApiKey,
    arbOftAddr,
    "Arbiscan"
  );

  // Summary
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                   VERIFICATION SUMMARY                      ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT:`);
  if (baseResult.success) {
    console.log(`  ✅ Submission successful (ID: ${baseResult.submissionId})`);
    console.log(`  Status: ${baseStatus.verified ? "Verified ✅" : "Pending ⏳"}`);
  } else {
    console.log(`  ❌ Submission failed: ${baseResult.error}`);
  }
  console.log(`  Link: https://basescan.org/address/${baseOftAddr}\n`);

  console.log(`Arbitrum OFT:`);
  if (arbResult.success) {
    console.log(`  ✅ Submission successful (ID: ${arbResult.submissionId})`);
    console.log(`  Status: ${arbStatus.verified ? "Verified ✅" : "Pending ⏳"}`);
  } else {
    console.log(`  ❌ Submission failed: ${arbResult.error}`);
  }
  console.log(`  Link: https://arbiscan.io/address/${arbOftAddr}\n`);

  console.log(`═`.repeat(70));
  console.log(`\n💡 Note: Verification may take a few minutes to process.`);
  console.log(`   Check the explorer links above to see full details.\n`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
