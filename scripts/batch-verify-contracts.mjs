#!/usr/bin/env node

/**
 * Batch Smart Contract Verification Script
 * Verifies all live deployed contracts on Base and Arbitrum using Hardhat verify
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LIVE_CONTRACTS = {
  base: {
    network: "base",
    config: "hardhat-verify.config.cjs",
    contracts: {
      "OmnichainNabatOFT": {
        address: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
        path: "contracts/token/OmnichainNabatOFT.sol",
        args: "deploy/verify-args-onbt-base.cjs"
      },
      "ONBTOmnichainVault": {
        address: "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9",
        path: "contracts/treasury/ONBTOmnichainVault.sol",
        args: null
      },
      "ONBTRewardsPool": {
        address: "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
        path: "contracts/defi/ONBTRewardsPool.sol",
        args: null
      },
      "ONBTYieldDistributor": {
        address: "0x8c91384EbF767C1C434d127c82020380F4A8afC7",
        path: "contracts/defi/ONBTYieldDistributor.sol",
        args: null
      },
      "ONBTAchievementNFT": {
        address: "0x11EEEB62b2b2B66475642f82502989D671fC5855",
        path: "contracts/defi/ONBTAchievementNFT.sol",
        args: null
      },
      "ONBTOmnichainStaking": {
        address: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
        path: "contracts/defi/ONBTOmnichainStaking.sol",
        args: null
      },
      "ONBTStakingRouter": {
        address: "0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B",
        path: "contracts/defi/ONBTStakingRouter.sol",
        args: null
      },
      "ONBTGovernor": {
        address: "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9",
        path: "contracts/defi/ONBTGovernor.sol",
        args: null
      },
      "ONBTLiquidityManager": {
        address: "0xb362Af3da1497A551C08F79bC03CbA12D2b7e908",
        path: "contracts/defi/ONBTLiquidityManager.sol",
        args: null
      },
      "ONBTInsuranceFund": {
        address: "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE",
        path: "contracts/treasury/ONBTInsuranceFund.sol",
        args: null
      },
      "ONBTStabilizer": {
        address: "0x26D75024c2491636a1A1145a3d6966788EF54667",
        path: "contracts/defi/ONBTStabilizer.sol",
        args: null
      },
      "ONBTIncentiveController": {
        address: "0x7b06795D31482fef0213b24E8ad5f348692A73BD",
        path: "contracts/defi/ONBTIncentiveController.sol",
        args: null
      },
      "ONBTRevenueRouter": {
        address: "0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0",
        path: "contracts/defi/ONBTRevenueRouter.sol",
        args: null
      }
    }
  },
  arbitrum: {
    network: "arbitrum",
    config: "hardhat-verify.config.cjs",
    contracts: {
      "OmnichainNabatOFT": {
        address: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
        path: "contracts/token/OmnichainNabatOFT.sol",
        args: "deploy/verify-args-onbt-arbitrum.cjs"
      },
      "ONBTOmnichainVault": {
        address: "0x85fE97c69350Be8B9A6bC026006907E34324CD6A",
        path: "contracts/treasury/ONBTOmnichainVault.sol",
        args: null
      },
      "ONBTRewardsPool": {
        address: "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
        path: "contracts/defi/ONBTRewardsPool.sol",
        args: null
      },
      "ONBTYieldDistributor": {
        address: "0x2085ca5081480e8634eF4295ef477fe8cE97B892",
        path: "contracts/defi/ONBTYieldDistributor.sol",
        args: null
      },
      "ONBTAchievementNFT": {
        address: "0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb",
        path: "contracts/defi/ONBTAchievementNFT.sol",
        args: null
      },
      "ONBTOmnichainStaking": {
        address: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
        path: "contracts/defi/ONBTOmnichainStaking.sol",
        args: null
      },
      "ONBTStakingRouter": {
        address: "0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64",
        path: "contracts/defi/ONBTStakingRouter.sol",
        args: null
      },
      "ONBTGovernor": {
        address: "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854",
        path: "contracts/defi/ONBTGovernor.sol",
        args: null
      },
      "ONBTLiquidityManager": {
        address: "0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3",
        path: "contracts/defi/ONBTLiquidityManager.sol",
        args: null
      },
      "ONBTInsuranceFund": {
        address: "0x85BB4B6268446a71110db6f296885AA1EE36c695",
        path: "contracts/treasury/ONBTInsuranceFund.sol",
        args: null
      },
      "ONBTStabilizer": {
        address: "0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587",
        path: "contracts/defi/ONBTStabilizer.sol",
        args: null
      },
      "ONBTIncentiveController": {
        address: "0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50",
        path: "contracts/defi/ONBTIncentiveController.sol",
        args: null
      },
      "ONBTRevenueRouter": {
        address: "0xa66CA14df740B142d8E2DE515A8743ad1eE25850",
        path: "contracts/defi/ONBTRevenueRouter.sol",
        args: null
      }
    }
  }
};

async function verifyContract(network, contractName, config, hardhatConfig) {
  const cmd = [
    "npx.cmd hardhat",
    `--config ${hardhatConfig}`,
    `--network ${network}`,
    "verify",
    `--contract ${config.path}:${contractName}`,
  ];

  if (config.args && fs.existsSync(path.join(__dirname, "..", config.args))) {
    cmd.push(`--constructor-args ${config.args}`);
  }

  cmd.push(config.address);

  try {
    const output = execSync(cmd.join(" "), {
      cwd: path.join(__dirname, ".."),
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    // Check if already verified
    if (output.includes("Already Verified")) {
      return { status: "already", message: "Already verified" };
    }

    // Check if verification submitted
    if (output.includes("Pass") || output.includes("Success") || !output.includes("error")) {
      return { status: "submitted", message: "Submitted for verification" };
    }

    return { status: "unknown", message: output.substring(0, 100) };
  } catch (error) {
    const msg = error.toString();

    if (msg.includes("Already Verified")) {
      return { status: "already", message: "Already verified" };
    }

    if (msg.includes("constructor")) {
      return { status: "failed", message: "Constructor args mismatch" };
    }

    if (msg.includes("V1")) {
      // V1 deprecation is not a failure
      return { status: "submitted", message: "Submitted (V1 endpoint)" };
    }

    return { status: "failed", message: msg.substring(0, 150) };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  BATCH CONTRACT VERIFICATION - HARDHAT                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const allResults = {
    submitted: [],
    already: [],
    failed: [],
  };

  for (const [chainKey, chainConfig] of Object.entries(LIVE_CONTRACTS)) {
    console.log(`\n${"═".repeat(70)}`);
    console.log(`🔐 Verifying ${chainConfig.network.toUpperCase()} Contracts`);
    console.log(`${"═".repeat(70)}\n`);

    for (const [contractName, contractConfig] of Object.entries(chainConfig.contracts)) {
      process.stdout.write(`📝 ${contractName.padEnd(35)} `);

      const result = await verifyContract(
        chainConfig.network,
        contractName,
        contractConfig,
        chainConfig.config
      );

      switch (result.status) {
        case "submitted":
          console.log("✅ Submitted");
          allResults.submitted.push({
            network: chainConfig.network,
            contract: contractName,
            address: contractConfig.address,
          });
          break;
        case "already":
          console.log("✅ Already verified");
          allResults.already.push({
            network: chainConfig.network,
            contract: contractName,
            address: contractConfig.address,
          });
          break;
        case "failed":
          console.log(`❌ ${result.message}`);
          allResults.failed.push({
            network: chainConfig.network,
            contract: contractName,
            address: contractConfig.address,
            error: result.message,
          });
          break;
        default:
          console.log(`❓ ${result.message}`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log(`\n${"═".repeat(70)}`);
  console.log(`📊 BATCH VERIFICATION SUMMARY`);
  console.log(`${"═".repeat(70)}\n`);

  const total = allResults.submitted.length + allResults.already.length + allResults.failed.length;

  console.log(`Total: ${total} contracts`);
  console.log(`✅ Submitted or Already Verified: ${allResults.submitted.length + allResults.already.length}`);
  if (allResults.failed.length > 0) {
    console.log(`❌ Failed: ${allResults.failed.length}\n`);

    allResults.failed.forEach(item => {
      console.log(`   ${item.network.toUpperCase()} - ${item.contract}`);
      console.log(`      Error: ${item.error}`);
    });
  }

  console.log(`\n${"═".repeat(70)}\n`);

  process.exit(allResults.failed.length > 0 ? 1 : 0);
}

main().catch(error => {
  console.error("Fatal error:", error.message);
  process.exit(1);
});
