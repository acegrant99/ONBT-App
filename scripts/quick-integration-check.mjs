import fs from "fs";
import { ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();

const DEPLOYMENTS = {
  base: {
    file: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
    rpc: process.env.BASE_RPC_URL || "https://base-mainnet.g.alchemy.com/v2/YOUR_KEY"
  },
  arbitrum: {
    file: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
    rpc: process.env.ARBITRUM_RPC_URL || "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY"
  }
};

async function checkNetwork(networkName, config) {
  const deployment = JSON.parse(fs.readFileSync(config.file, "utf8"));
  const provider = new ethers.providers.JsonRpcProvider(config.rpc);
  
  const tests = [];
  
  // Test 1: AchievementNFT configured
  try {
    const stakingIface = new ethers.utils.Interface(["function achievementNFT() view returns (address)"]);
    const staking = new ethers.Contract(deployment.contracts.staking, stakingIface, provider);
    const nftAddr = await staking.achievementNFT();
    const match = nftAddr.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase();
    tests.push({ name: "AchievementNFT", pass: match });
  } catch (e) {
    tests.push({ name: "AchievementNFT", pass: false, error: e.message.slice(0, 50) });
  }
  
  // Test 2: RewardsPool → Staking
  try {
    const rewardsIface = new ethers.utils.Interface(["function stakingContract() view returns (address)"]);
    const rewards = new ethers.Contract(deployment.contracts.rewardsPool, rewardsIface, provider);
    const stakingAddr = await rewards.stakingContract();
    const match = stakingAddr.toLowerCase() === deployment.contracts.staking.toLowerCase();
    tests.push({ name: "RewardsPool→Staking", pass: match });
  } catch (e) {
    tests.push({ name: "RewardsPool→Staking", pass: false, error: e.message.slice(0, 50) });
  }
  
  // Test 3: Token endpoint
  try {
    const tokenIface = new ethers.utils.Interface(["function endpoint() view returns (address)"]);
    const token = new ethers.Contract(deployment.contracts.onbtToken, tokenIface, provider);
    const endpoint = await token.endpoint();
    const hasEndpoint = endpoint !== ethers.constants.AddressZero;
    tests.push({ name: "Token Endpoint", pass: hasEndpoint });
  } catch (e) {
    tests.push({ name: "Token Endpoint", pass: false, error: e.message.slice(0, 50) });
  }
  
  // Test 4: RevenueRouter destinations
  try {
    const routerIface = new ethers.utils.Interface([
      "function vault() view returns (address)",
      "function rewards() view returns (address)",
      "function insurance() view returns (address)"
    ]);
    const router = new ethers.Contract(deployment.contracts.revenueRouter, routerIface, provider);
    const [vault, rewards, insurance] = await Promise.all([
      router.vault(),
      router.rewards(),
      router.insurance()
    ]);
    const allMatch = 
      vault.toLowerCase() === deployment.contracts.vault.toLowerCase() &&
      rewards.toLowerCase() === deployment.contracts.rewardsPool.toLowerCase() &&
      insurance.toLowerCase() === deployment.contracts.insuranceFund.toLowerCase();
    tests.push({ name: "RevenueRouter Wiring", pass: allMatch });
  } catch (e) {
    tests.push({ name: "RevenueRouter Wiring", pass: false, error: e.message.slice(0, 50) });
  }
  
  return { network: networkName, tests };
}

async function main() {
  console.log("\n" + "═".repeat(70));
  console.log("QUICK INTEGRATION CHECK");
  console.log("═".repeat(70) + "\n");
  
  const baseResult = await checkNetwork("base", DEPLOYMENTS.base);
  const arbResult = await checkNetwork("arbitrum", DEPLOYMENTS.arbitrum);
  
  for (const result of [baseResult, arbResult]) {
    console.log(`${result.network.toUpperCase()}:`);
    let passed = 0;
    for (const test of result.tests) {
      const status = test.pass ? "✅" : "❌";
      console.log(`  ${status} ${test.name}`);
      if (test.pass) passed++;
      if (test.error) console.log(`     Error: ${test.error}`);
    }
    console.log(`  ${passed}/${result.tests.length} tests passed\n`);
  }
  
  const totalTests = baseResult.tests.length + arbResult.tests.length;
  const totalPassed = 
    baseResult.tests.filter(t => t.pass).length + 
    arbResult.tests.filter(t => t.pass).length;
  
  console.log("═".repeat(70));
  console.log(`TOTAL: ${totalPassed}/${totalTests} tests passed`);
  console.log("═".repeat(70) + "\n");
}

main().catch(console.error);
