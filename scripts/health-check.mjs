#!/usr/bin/env node

import hre from "hardhat";
import fs from "fs";
import path from "path";
import https from "https";

const { ethers } = hre;

import dotenv from "dotenv";
dotenv.config();

// Load contract addresses from deployment files
const baseDeployment = JSON.parse(fs.readFileSync("deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json", "utf8"));
const arbDeployment = JSON.parse(fs.readFileSync("deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json", "utf8"));

const CONTRACTS = {
  base: {
    rpc: process.env.BASE_RPC_URL || "https://base-mainnet.g.alchemy.com/v2/YOUR_KEY",
    onbt: baseDeployment.contracts.onbtToken,
    staking: baseDeployment.contracts.staking,
    rewardsPool: baseDeployment.contracts.rewardsPool,
    nft: baseDeployment.contracts.achievementNFT
  },
  arbitrum: {
    rpc: process.env.ARBITRUM_RPC_URL || "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY",
    onbt: arbDeployment.contracts.onbtToken,
    staking: arbDeployment.contracts.staking,
    rewardsPool: arbDeployment.contracts.rewardsPool,
    nft: arbDeployment.contracts.achievementNFT
  }
};

const Token_ABI = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

const Staking_ABI = [
  "function achievementNFT() view returns (address)"
];

const RewardsPool_ABI = [
  "function stakingContract() view returns (address)"
];

const NFT_ABI = [
  "function totalMinted() view returns (uint256)",
  "function nextTokenId() view returns (uint256)"
];

const Metrics = class {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  add(name, status, detail) {
    const check = {
      timestamp: new Date().toISOString(),
      name,
      status, // "pass", "warn", "fail"
      detail
    };
    this.checks.push(check);

    if (status === "warn") this.warnings.push(check);
    if (status === "fail") this.errors.push(check);

    return check;
  }

  print() {
    const passed = this.checks.filter(c => c.status === "pass").length;
    const warned = this.checks.filter(c => c.status === "warn").length;
    const failed = this.checks.filter(c => c.status === "fail").length;

    console.log("\n" + "═".repeat(70));
    console.log(`HEALTH CHECK RESULTS`);
    console.log("═".repeat(70));
    console.log(`Checks: ${passed} passed, ${warned} warned, ${failed} failed\n`);

    for (const check of this.checks) {
      const statusIcon = check.status === "pass" ? "✅" : 
                        check.status === "warn" ? "⚠️ " : "❌";
      console.log(`${statusIcon} ${check.name}`);
      if (check.detail) console.log(`   ${check.detail}`);
    }

    console.log("\n" + "═".repeat(70));
    if (failed > 0) {
      console.log("❌ HEALTH CHECK FAILED");
      console.log(`   ${failed} critical issue(s) detected`);
    } else if (warned > 0) {
      console.log("⚠️  HEALTH CHECK PASSED WITH WARNINGS");
      console.log(`   ${warned} warning(s) detected`);
    } else {
      console.log("✅ HEALTH CHECK PASSED");
      console.log("   All systems operational");
    }
    console.log("═".repeat(70) + "\n");

    return { passed, warned, failed };
  }

  exportJSON(filename = "health-check.json") {
    const filepath = path.join(process.cwd(), filename);
    fs.writeFileSync(filepath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        total: this.checks.length,
        passed: this.checks.filter(c => c.status === "pass").length,
        warned: this.checks.filter(c => c.status === "warn").length,
        failed: this.checks.filter(c => c.status === "fail").length
      },
      checks: this.checks
    }, null, 2));

    console.log(`Report saved to: ${filename}`);
    return filepath;
  }
};

async function checkNetwork(networkName, config, metrics) {
  console.log(`\n${"─".repeat(70)}`);
  console.log(`${networkName.toUpperCase()} NETWORK`);
  console.log(`${"─".repeat(70)}\n`);

  try {
    const provider = new ethers.providers.JsonRpcProvider(config.rpc);

    // 1. RPC Connectivity
    try {
      const block = await provider.getBlockNumber();
      metrics.add(`${networkName}: RPC Connected`, "pass", `Block #${block}`);
    } catch {
      metrics.add(`${networkName}: RPC Connected`, "fail", "Cannot reach RPC endpoint");
      return;
    }

    // 2. Token Contract
    try {
      const token = new ethers.Contract(config.onbt, Token_ABI, provider);
      const [name, symbol, supply] = await Promise.all([
        token.name(),
        token.symbol(),
        token.totalSupply()
      ]);
      metrics.add(`${networkName}: Token Contract`, "pass", 
        `${name} (${symbol}) - Supply: ${ethers.utils.formatUnits(supply, 18)}`);
    } catch (err) {
      metrics.add(`${networkName}: Token Contract`, "fail", err.message.slice(0, 60));
    }

    // 3. Staking Contract
    try {
      const staking = new ethers.Contract(config.staking, Staking_ABI, provider);
      const nftAddr = await staking.achievementNFT();
      const isConfigured = nftAddr !== ethers.constants.AddressZero;
      
      if (isConfigured) {
        metrics.add(`${networkName}: Staking Contract`, "pass", "AchievementNFT linked");
      } else {
        metrics.add(`${networkName}: Staking Contract`, "warn", "AchievementNFT not linked");
      }
    } catch (err) {
      metrics.add(`${networkName}: Staking Contract`, "fail", err.message.slice(0, 60));
    }

    // 4. NFT Contract
    try {
      const nft = new ethers.Contract(config.nft, NFT_ABI, provider);

      let totalMinted;
      try {
        totalMinted = await nft.totalMinted();
      } catch {
        const nextTokenId = await nft.nextTokenId();
        totalMinted = nextTokenId.sub(1);
      }

      metrics.add(`${networkName}: NFT Contract`, "pass", `${totalMinted.toString()} achievements minted`);
    } catch (err) {
      metrics.add(`${networkName}: NFT Contract`, "warn", "Cannot read mint counters");
    }

    // 5. Cross-Contract Wiring
    try {
      const staking = new ethers.Contract(config.staking, Staking_ABI, provider);
      const rewardsPool = new ethers.Contract(config.rewardsPool, RewardsPool_ABI, provider);

      const nftAddr = await staking.achievementNFT();
      const rewardsStakingAddr = await rewardsPool.stakingContract();

      const nftLinked = nftAddr.toLowerCase() === config.nft.toLowerCase();
      const rewardsLinked = rewardsStakingAddr.toLowerCase() === config.staking.toLowerCase();

      if (nftLinked && rewardsLinked) {
        metrics.add(`${networkName}: Contract Wiring`, "pass", "Staking↔NFT and RewardsPool↔Staking valid");
      } else {
        metrics.add(`${networkName}: Contract Wiring`, "warn", 
          `NFT link: ${nftLinked ? "✓" : "✗"}, RewardsPool link: ${rewardsLinked ? "✓" : "✗"}`);
      }
    } catch (err) {
      metrics.add(`${networkName}: Contract Wiring`, "warn", "Cannot verify wiring links");
    }

    // 6. Gas Prices (informational)
    try {
      const feeData = await provider.getFeeData();
      const gasPrice = ethers.utils.formatUnits(feeData.gasPrice, "gwei");
      metrics.add(`${networkName}: Gas Price`, "pass", `${gasPrice.slice(0, 6)} Gwei`);
    } catch (err) {
      metrics.add(`${networkName}: Gas Price`, "warn", "Cannot retrieve");
    }

  } catch (err) {
    metrics.add(`${networkName}: Network Status`, "fail", err.message.slice(0, 60));
  }
}

async function runHealthCheck(options = {}) {
  const metrics = new Metrics();
  
  console.log("\n" + "═".repeat(70));
  console.log("ONBT PROTOCOL HEALTH CHECK");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("═".repeat(70));

  // Check both networks
  await checkNetwork("base", CONTRACTS.base, metrics);
  await checkNetwork("arbitrum", CONTRACTS.arbitrum, metrics);

  // Print results
  metrics.print();

  // Save report if requested
  if (options.saveReport) {
    metrics.exportJSON();
  }

  return metrics;
}

// Run if executed directly
async function main() {
  const args = process.argv.slice(2);
  const options = {
    saveReport: args.includes("--save") || args.includes("-s")
  };

  await runHealthCheck(options);
}

main().catch(console.error);
