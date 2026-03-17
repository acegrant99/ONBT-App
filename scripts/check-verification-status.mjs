#!/usr/bin/env node

/**
 * Simple verification status checker using Etherscan API
 * Non-invasive status check only - no submissions
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEtherscanApiKey() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) {
    return "";
  }

  const line = fs
    .readFileSync(envPath, "utf-8")
    .split("\n")
    .find((v) => v.startsWith("ETHERSCAN_API_KEY="));

  return line ? line.split("=")[1].trim() : "";
}

const ETHERSCAN_V2_API = "https://api.etherscan.io/v2/api";
const ETHERSCAN_API_KEY = loadEtherscanApiKey();

const LIVE_CONTRACTS = {
  base: {
    name: "Base",
    explorer: "Basescan",
    chainId: 8453,
    explorerUrl: "https://basescan.org",
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
    name: "Arbitrum",
    explorer: "Arbiscan",
    chainId: 42161,
    explorerUrl: "https://arbiscan.io",
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

async function checkVerificationStatus(chainId, address) {
  try {
    const params = new URLSearchParams();
    params.set("apikey", ETHERSCAN_API_KEY);
    params.set("chainid", String(chainId));
    params.set("module", "contract");
    params.set("action", "getsourcecode");
    params.set("address", address);

    const response = await fetch(
      `${ETHERSCAN_V2_API}?${params.toString()}`
    );
    const data = await response.json();

    // Etherscan V2 can return explicit errors; surface these to avoid false "NOT VERIFIED".
    if (data.status === "0" && typeof data.result === "string") {
      return { verified: null, error: data.result };
    }
    
    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      const result = data.result[0];
      const isVerified = Boolean(result.SourceCode && result.SourceCode.length > 0);
      const compiler = result.CompilerVersion || "Unknown";
      return { verified: isVerified, compiler };
    }
    return { verified: false, compiler: "Not found" };
  } catch (error) {
    return { verified: null, error: error.message };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  LIVE CONTRACT VERIFICATION STATUS CHECK                  ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  if (!ETHERSCAN_API_KEY) {
    console.error("❌ ETHERSCAN_API_KEY is missing in .env");
    process.exit(1);
  }

  for (const [chainKey, chainConfig] of Object.entries(LIVE_CONTRACTS)) {
    console.log(`\n${"═".repeat(70)}`);
    console.log(`📊 ${chainConfig.name} (${chainConfig.explorer})`);
    console.log(`${"═".repeat(70)}\n`);

    let verifiedCount = 0;
    let unverifiedContracts = [];

    for (const [name, address] of Object.entries(chainConfig.contracts)) {
      const status = await checkVerificationStatus(chainConfig.chainId, address);
      
      if (status.verified === null) {
        console.log(`❓ ${name.padEnd(30)} - Status check failed: ${status.error}`);
      } else if (status.verified) {
        console.log(`✅ ${name.padEnd(30)} VERIFIED (${status.compiler})`);
        verifiedCount++;
      } else {
        console.log(`❌ ${name.padEnd(30)} NOT VERIFIED`);
        unverifiedContracts.push({ name, address });
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n📈 Summary: ${verifiedCount}/${Object.keys(chainConfig.contracts).length} contracts verified`);

    if (unverifiedContracts.length > 0) {
      console.log(`\n⚠️  Unverified contracts on ${chainConfig.name}:`);
      unverifiedContracts.forEach(c => {
        console.log(`   • ${c.name}: ${chainConfig.explorerUrl}/address/${c.address}#code`);
      });
    }
  }

  console.log(`\n${"═".repeat(70)}\n`);
}

main().catch(error => {
  console.error("Error:", error.message);
  process.exit(1);
});
