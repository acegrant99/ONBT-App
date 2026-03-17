#!/usr/bin/env node

/**
 * Direct Etherscan API verification script for live deployed contracts.
 * Avoids Hardhat compilation and leverages pre-compiled artifacts.
 * Targets: Base (8453) and Arbitrum (42161) live deployments.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================================
// CONFIGURATION
// ============================================================================

const LIVE_CONTRACTS = {
  base: {
    chainId: 8453,
    explorerUrl: "https://basescan.org",
    apiUrl: "https://api.basescan.org/api",
    contracts: {
      "OmnichainNabatOFT": "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
      "ONBTOmnichainVault": "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9",
      "ONBTRewardsPool": "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
      "ONBTYieldDistributor": "0x8c91384EbF767C1C434d127c82020380F4A8afC7",
      "ONBTAchievementNFT": "0x11EEEB62b2b2B66475642f82502989D671fC5855",
      "ONBTOmnichainStaking": "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
      "ONBTStakingRouter": "0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B",
      "ONBTGovernor": "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9",
      "ONBTLiquidityManager": "0xb362Af3da1497A551C08F79bC03CbA12D2b7e908",
      "ONBTInsuranceFund": "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE",
      "ONBTStabilizer": "0x26D75024c2491636a1A1145a3d6966788EF54667",
      "ONBTIncentiveController": "0x7b06795D31482fef0213b24E8ad5f348692A73BD",
      "ONBTRevenueRouter": "0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0"
    }
  },
  arbitrum: {
    chainId: 42161,
    explorerUrl: "https://arbiscan.io",
    apiUrl: "https://api.arbiscan.io/api",
    contracts: {
      "OmnichainNabatOFT": "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
      "ONBTOmnichainVault": "0x85fE97c69350Be8B9A6bC026006907E34324CD6A",
      "ONBTRewardsPool": "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
      "ONBTYieldDistributor": "0x2085ca5081480e8634eF4295ef477fe8cE97B892",
      "ONBTAchievementNFT": "0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb",
      "ONBTOmnichainStaking": "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
      "ONBTStakingRouter": "0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64",
      "ONBTGovernor": "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854",
      "ONBTLiquidityManager": "0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3",
      "ONBTInsuranceFund": "0x85BB4B6268446a71110db6f296885AA1EE36c695",
      "ONBTStabilizer": "0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587",
      "ONBTIncentiveController": "0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50",
      "ONBTRevenueRouter": "0xa66CA14df740B142d8E2DE515A8743ad1eE25850"
    }
  }
};

// ============================================================================
// SOURCE CODE LOADING
// ============================================================================

function loadSourceCode(contractName) {
  const contractFileMap = {
    "OmnichainNabatOFT": "contracts/token/OmnichainNabatOFT.sol",
    "ONBTOmnichainVault": "contracts/treasury/ONBTOmnichainVault.sol",
    "ONBTRewardsPool": "contracts/defi/ONBTRewardsPool.sol",
    "ONBTYieldDistributor": "contracts/defi/ONBTYieldDistributor.sol",
    "ONBTAchievementNFT": "contracts/defi/ONBTAchievementNFT.sol",
    "ONBTOmnichainStaking": "contracts/defi/ONBTOmnichainStaking.sol",
    "ONBTStakingRouter": "contracts/defi/ONBTStakingRouter.sol",
    "ONBTGovernor": "contracts/defi/ONBTGovernor.sol",
    "ONBTLiquidityManager": "contracts/defi/ONBTLiquidityManager.sol",
    "ONBTInsuranceFund": "contracts/treasury/ONBTInsuranceFund.sol",
    "ONBTStabilizer": "contracts/defi/ONBTStabilizer.sol",
    "ONBTIncentiveController": "contracts/defi/ONBTIncentiveController.sol",
    "ONBTRevenueRouter": "contracts/defi/ONBTRevenueRouter.sol"
  };

  const filePath = contractFileMap[contractName];
  if (!filePath) {
    console.log(`   ⚠️  No source code mapping for ${contractName}`);
    return null;
  }

  const fullPath = path.join(__dirname, "..", filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  Source file not found: ${filePath}`);
    return null;
  }

  return fs.readFileSync(fullPath, "utf-8");
}

// ============================================================================
// VERIFICATION STATUS CHECK
// ============================================================================

async function checkVerificationStatus(apiUrl, address) {
  try {
    const response = await fetch(
      `${apiUrl}?module=contract&action=getsourcecode&address=${address}`
    );
    const data = await response.json();
    
    if (data.result && data.result[0]) {
      const result = data.result[0];
      return result.SourceCode && result.SourceCode.length > 0;
    }
    return false;
  } catch (error) {
    console.log(`   ⚠️  Status check failed: ${error.message}`);
    return null;
  }
}

// ============================================================================
// VERIFICATION SUBMISSION
// ============================================================================

async function submitVerification(
  apiUrl,
  chainId,
  apiKey,
  address,
  contractName,
  sourceCode,
  explorerName
) {
  if (!apiKey) {
    return { success: false, error: "Missing API key" };
  }

  if (!sourceCode) {
    return { success: false, error: "Source code not available" };
  }

  try {
    const params = new URLSearchParams();
    params.append("apikey", apiKey);
    params.append("module", "contract");
    params.append("action", "verifysourcecode");
    params.append("contractaddress", address);
    params.append("sourceCode", sourceCode);
    params.append("codeformat", "solidity-single-file");
    params.append("contractname", contractName);
    params.append("compilerversion", "v0.8.22+commit.4fc1097e");
    params.append("optimizationUsed", "1");
    params.append("runs", "200");
    params.append("licenseType", "3");
    params.append("chainid", chainId);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 60000,
    });

    const result = await response.json();

    if (result.status === "1") {
      return { success: true, submissionId: result.result };
    } else if (result.status === "0") {
      if (result.result?.toLowerCase().includes("already verified")) {
        return { success: true, alreadyVerified: true };
      }
      return { success: false, error: result.result };
    }
    return { success: false, error: result.message || "Unknown error" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// ENVIRONMENT & API KEY LOADING
// ============================================================================

function loadApiKey() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env file not found");
    return null;
  }

  const envContent = fs.readFileSync(envPath, "utf-8");
  const keyLine = envContent
    .split("\n")
    .find(line => line.startsWith("ETHERSCAN_API_KEY="));
  
  if (!keyLine) {
    console.error("❌ ETHERSCAN_API_KEY not found in .env");
    return null;
  }

  return keyLine.split("=")[1].trim();
}

// ============================================================================
// MAIN VERIFICATION WORKFLOW
// ============================================================================

async function verifyNetwork(network, apiKey) {
  const config = LIVE_CONTRACTS[network];
  console.log(`\n${"═".repeat(70)}`);
  console.log(`🔐 VERIFYING ${network.toUpperCase()} CONTRACTS`);
  console.log(`${"═".repeat(70)}\n`);

  const results = {
    already: [],
    submitted: [],
    failed: [],
  };

  for (const [name, address] of Object.entries(config.contracts)) {
    console.log(`📝 ${name.padEnd(35)} ${address.substring(0, 12)}...`);

    // Check current status
    const isVerified = await checkVerificationStatus(config.apiUrl, address);
    if (isVerified === true) {
      console.log(`   ✅ Already verified`);
      results.already.push({ name, address });
      continue;
    }

    // Load source code
    const sourceCode = loadSourceCode(name);
    if (!sourceCode) {
      console.log(`   ❌ Could not load source code`);
      results.failed.push({ name, address, error: "Source code not available" });
      continue;
    }

    // Submit verification
    const result = await submitVerification(
      config.apiUrl,
      config.chainId,
      apiKey,
      address,
      name,
      sourceCode,
      config.explorerUrl
    );

    if (result.alreadyVerified) {
      console.log(`   ✅ Already verified`);
      results.already.push({ name, address });
    } else if (result.success) {
      console.log(`   ✅ Submitted (ID: ${result.submissionId})`);
      results.submitted.push({ name, address, id: result.submissionId });
    } else {
      console.log(`   ❌ ${result.error}`);
      results.failed.push({ name, address, error: result.error });
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  LIVE CONTRACT VERIFICATION - DIRECT ETHERSCAN API        ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  const apiKey = loadApiKey();
  if (!apiKey) {
    process.exit(1);
  }

  console.log(`\n✅ Etherscan API key loaded\n`);

  // Verify on both networks
  const baseResults = await verifyNetwork("base", apiKey);
  const arbResults = await verifyNetwork("arbitrum", apiKey);

  // Summary
  console.log(`\n${"═".repeat(70)}`);
  console.log(`📊 VERIFICATION SUMMARY`);
  console.log(`${"═".repeat(70)}\n`);

  const totalAlready = baseResults.already.length + arbResults.already.length;
  const totalSubmitted = baseResults.submitted.length + arbResults.submitted.length;
  const totalFailed = baseResults.failed.length + arbResults.failed.length;

  console.log(`✅ Already Verified: ${totalAlready}`);
  if (baseResults.already.length > 0) {
    console.log(`   Base: ${baseResults.already.map(r => r.name).join(", ")}`);
  }
  if (arbResults.already.length > 0) {
    console.log(`   Arbitrum: ${arbResults.already.map(r => r.name).join(", ")}`);
  }

  console.log(`\n📤 Newly Submitted: ${totalSubmitted}`);
  if (baseResults.submitted.length > 0) {
    console.log(`   Base: ${baseResults.submitted.map(r => r.name).join(", ")}`);
  }
  if (arbResults.submitted.length > 0) {
    console.log(`   Arbitrum: ${arbResults.submitted.map(r => r.name).join(", ")}`);
  }

  if (totalFailed > 0) {
    console.log(`\n❌ Failed: ${totalFailed}`);
    [...baseResults.failed, ...arbResults.failed].forEach(r => {
      console.log(`   ${r.name}: ${r.error}`);
    });
  }

  console.log(`\n${"═".repeat(70)}`);
  console.log(`📝 VERIFICATION LINKS`);
  console.log(`${"═".repeat(70)}\n`);

  console.log(`🔍 Base Chain (Basescan):`);
  [...baseResults.already, ...baseResults.submitted].forEach(r => {
    console.log(`   ${r.name}: https://basescan.org/address/${r.address}#code`);
  });

  console.log(`\n🔍 Arbitrum Chain (Arbiscan):`);
  [...arbResults.already, ...arbResults.submitted].forEach(r => {
    console.log(`   ${r.name}: https://arbiscan.io/address/${r.address}#code`);
  });

  console.log(`\n${"═".repeat(70)}\n`);

  if (totalFailed === 0) {
    console.log(`✅ All live contracts verified or submitted successfully!\n`);
    process.exit(0);
  } else {
    console.log(`⚠️  Some contracts require manual verification.\n`);
    process.exit(1);
  }
}

main().catch(error => {
  console.error("\n❌ Fatal error:", error.message);
  process.exit(1);
});
