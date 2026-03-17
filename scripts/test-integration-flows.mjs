import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers, network } = hre;

const DEPLOYMENT_FILES = {
  base: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
};

function loadDeployment(networkName) {
  const relative = DEPLOYMENT_FILES[networkName];
  if (!relative) {
    throw new Error(`Unsupported network ${networkName}. Expected base|arbitrum`);
  }
  const fullPath = path.join(process.cwd(), relative);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function testCrossContractWiring() {
  console.log("\n" + "=".repeat(88));
  console.log("CROSS-CONTRACT WIRING TEST");
  console.log("=".repeat(88) + "\n");

  const deployment = loadDeployment(network.name);
  const results = [];

  // Test 1: Staking → AchievementNFT connection
  try {
    const iface = new ethers.utils.Interface(["function achievementNFT() view returns (address)"]);
    const staking = new ethers.Contract(deployment.contracts.staking, iface, ethers.provider);
    const nftAddr = await staking.achievementNFT();
    const hasNFT = nftAddr !== ethers.constants.AddressZero;
    const match = hasNFT && nftAddr.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase();
    results.push({
      test: "Staking → AchievementNFT wiring",
      status: match ? "✅" : (hasNFT ? "⚠️" : "⚠️"),
      details: hasNFT ? `NFT: ${nftAddr.slice(0, 10)}...` : "Not configured"
    });
  } catch (err) {
    results.push({
      test: "Staking → AchievementNFT wiring",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test 2: RewardsPool → Staking connection
  try {
    const iface = new ethers.utils.Interface(["function stakingContract() view returns (address)"]);
    const rewardsPool = new ethers.Contract(deployment.contracts.rewardsPool, iface, ethers.provider);
    const stakingAddr = await rewardsPool.stakingContract();
    const match = stakingAddr.toLowerCase() === deployment.contracts.staking.toLowerCase();
    results.push({
      test: "RewardsPool → Staking wiring",
      status: match ? "✅" : "❌",
      details: `Expected: ${deployment.contracts.staking.slice(0, 10)}..., Got: ${stakingAddr.slice(0, 10)}...`
    });
  } catch (err) {
    results.push({
      test: "RewardsPool → Staking wiring",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test 3: Token endpoint configured
  try {
    const iface = new ethers.utils.Interface(["function endpoint() view returns (address)"]);
    const token = new ethers.Contract(deployment.contracts.onbtToken, iface, ethers.provider);
    const endpointAddr = await token.endpoint();
    const hasEndpoint = endpointAddr !== ethers.constants.AddressZero;
    results.push({
      test: "Token LayerZero endpoint configured",
      status: hasEndpoint ? "✅" : "❌",
      details: hasEndpoint ? `Endpoint: ${endpointAddr.slice(0, 10)}...` : "Not configured"
    });
  } catch (err) {
    results.push({
      test: "Token LayerZero endpoint configured",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test 4: RevenueRouter → Destinations
  try {
    const iface = new ethers.utils.Interface([
      "function vault() view returns (address)",
      "function rewards() view returns (address)",
      "function insurance() view returns (address)"
    ]);
    const revenueRouter = new ethers.Contract(deployment.contracts.revenueRouter, iface, ethers.provider);
    
    const vaultAddr = await revenueRouter.vault();
    const rewardsAddr = await revenueRouter.rewards();
    const insuranceAddr = await revenueRouter.insurance();
    
    const vaultMatch = vaultAddr.toLowerCase() === deployment.contracts.vault.toLowerCase();
    const rewardsMatch = rewardsAddr.toLowerCase() === deployment.contracts.rewardsPool.toLowerCase();
    const insuranceMatch = insuranceAddr.toLowerCase() === deployment.contracts.insuranceFund.toLowerCase();
    
    const allMatch = vaultMatch && rewardsMatch && insuranceMatch;
    results.push({
      test: "RevenueRouter → Destinations",
      status: allMatch ? "✅" : "⚠️",
      details: `Vault:${vaultMatch?"✓":"✗"} Rewards:${rewardsMatch?"✓":"✗"} Insurance:${insuranceMatch?"✓":"✗"}`
    });
  } catch (err) {
    results.push({
      test: "RevenueRouter → Destinations",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test 5: Stabilizer → Token connection
  try {
    const iface = new ethers.utils.Interface(["function onbtToken() view returns (address)"]);
    const stabilizer = new ethers.Contract(deployment.contracts.stabilizer, iface, ethers.provider);
    const tokenAddr = await stabilizer.onbtToken();
    const match = tokenAddr.toLowerCase() === deployment.contracts.onbtToken.toLowerCase();
    results.push({
      test: "Stabilizer → Token wiring",
      status: match ? "✅" : "❌",
      details: `Expected: ${deployment.contracts.onbtToken.slice(0, 10)}..., Got: ${tokenAddr.slice(0, 10)}...`
    });
  } catch (err) {
    results.push({
      test: "Stabilizer → Token wiring",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test 6: InsuranceFund → Token connection
  try {
    const iface = new ethers.utils.Interface(["function onbtToken() view returns (address)"]);
    const insuranceFund = new ethers.Contract(deployment.contracts.insuranceFund, iface, ethers.provider);
    const tokenAddr = await insuranceFund.onbtToken();
    const match = tokenAddr.toLowerCase() === deployment.contracts.onbtToken.toLowerCase();
    results.push({
      test: "InsuranceFund → Token wiring",
      status: match ? "✅" : "❌",
      details: `Expected: ${deployment.contracts.onbtToken.slice(0, 10)}..., Got: ${tokenAddr.slice(0, 10)}...`
    });
  } catch (err) {
    results.push({
      test: "InsuranceFund → Token wiring",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Print results
  for (const result of results) {
    console.log(`${result.status} ${result.test.padEnd(40)} ${result.details}`);
  }

  const passed = results.filter(r => r.status === "✅").length;
  const total = results.length;
  
  console.log("\n" + "-".repeat(88));
  console.log(`Integration Tests: ${passed}/${total} passed`);
  console.log("-".repeat(88) + "\n");

  return passed === total;
}

async function testLayerZeroConfiguration() {
  console.log("\n" + "=".repeat(88));
  console.log("LAYERZERO CROSS-CHAIN CONFIGURATION TEST");
  console.log("=".repeat(88) + "\n");

  const deployment = loadDeployment(network.name);
  const results = [];

  const CHAIN_INFO = {
    base: { eid: 30184, peerEid: 30110, peerChain: "Arbitrum" },
    arbitrum: { eid: 30110, peerEid: 30184, peerChain: "Base" }
  };

  const info = CHAIN_INFO[network.name];
  if (!info) {
    console.log("⚠️  Network not configured for LayerZero testing");
    return false;
  }

  // Test Token peer configuration
  try {
    const iface = new ethers.utils.Interface([
      "function endpoint() view returns (address)",
      "function peers(uint32) view returns (bytes32)"
    ]);
    const token = new ethers.Contract(deployment.contracts.onbtToken, iface, ethers.provider);
    
    const endpoint = await token.endpoint();
    const peer = await token.peers(info.peerEid);
    
    const hasPeer = peer !== "0x0000000000000000000000000000000000000000000000000000000000000000";
    
    results.push({
      test: `Token LZ Endpoint configured`,
      status: endpoint !== ethers.constants.AddressZero ? "✅" : "❌",
      details: `Endpoint: ${endpoint.slice(0, 10)}...`
    });
    
    results.push({
      test: `Token peer set for ${info.peerChain} (EID ${info.peerEid})`,
      status: hasPeer ? "✅" : "❌",
      details: hasPeer ? `Peer: ${peer.slice(0, 10)}...` : "No peer configured"
    });
  } catch (err) {
    results.push({
      test: "Token LayerZero configuration",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test Staking peer configuration
  try {
    const iface = new ethers.utils.Interface(["function peers(uint32) view returns (bytes32)"]);
    const staking = new ethers.Contract(deployment.contracts.staking, iface, ethers.provider);
    
    const peer = await staking.peers(info.peerEid);
    const hasPeer = peer !== "0x0000000000000000000000000000000000000000000000000000000000000000";
    
    results.push({
      test: `Staking peer set for ${info.peerChain}`,
      status: hasPeer ? "✅" : "❌",
      details: hasPeer ? `Peer: ${peer.slice(0, 10)}...` : "No peer configured"
    });
  } catch (err) {
    results.push({
      test: "Staking LayerZero configuration",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Test RewardsPool peer configuration  
  try {
    const iface = new ethers.utils.Interface(["function peers(uint32) view returns (bytes32)"]);
    const rewardsPool = new ethers.Contract(deployment.contracts.rewardsPool, iface, ethers.provider);
    
    const peer = await rewardsPool.peers(info.peerEid);
    const hasPeer = peer !== "0x0000000000000000000000000000000000000000000000000000000000000000";
    
    results.push({
      test: `RewardsPool peer set for ${info.peerChain}`,
      status: hasPeer ? "✅" : "❌",
      details: hasPeer ? `Peer: ${peer.slice(0, 10)}...` : "No peer configured"
    });
  } catch (err) {
    results.push({
      test: "RewardsPool LayerZero configuration",
      status: "⚠️",
      details: `Cannot verify: ${err.message.slice(0, 60)}`
    });
  }

  // Print results
  for (const result of results) {
    console.log(`${result.status} ${result.test.padEnd(50)} ${result.details}`);
  }

  const passed = results.filter(r => r.status === "✅").length;
  const total = results.length;
  
  console.log("\n" + "-".repeat(88));
  console.log(`LayerZero Tests: ${passed}/${total} passed`);
  console.log("-".repeat(88) + "\n");

  return passed === total;
}

async function main() {
  console.log(`\n${"=".repeat(88)}`);
  console.log(`INTEGRATION TESTING: ${network.name.toUpperCase()}`);
  console.log(`${"=".repeat(88)}`);

  const wiringPassed = await testCrossContractWiring();
  const lzPassed = await testLayerZeroConfiguration();

  console.log("\n" + "=".repeat(88));
  console.log("FINAL SUMMARY");
  console.log("=".repeat(88));
  console.log(`Cross-Contract Wiring:     ${wiringPassed ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`LayerZero Configuration:   ${lzPassed ? "✅ PASS" : "❌ FAIL"}`);
  console.log("=".repeat(88) + "\n");

  process.exitCode = (wiringPassed && lzPassed) ? 0 : 1;
}

main().catch((e) => {
  console.error("❌ Integration test failed:", e.message);
  console.error(e.stack);
  process.exit(1);
});
