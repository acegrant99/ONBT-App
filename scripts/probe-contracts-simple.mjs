import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers, network } = hre;

const DEPLOYMENT_FILES = {
  base: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
};

const CONTRACT_INTERFACES = {
  onbtToken: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function owner() view returns (address)",
    "function endpoint() view returns (address)",
  ],
  vault: [
    "function owner() view returns (address)",
    "function getBalance(address) view returns (uint256)",
    "function getAvailableBalance(address) view returns (uint256)"
  ],
  staking: [
    "function owner() view returns (address)",
    "function baseRewardRate() view returns (uint256)",
    "function isHub() view returns (bool)",
    "function paused() view returns (bool)",
    "function totalStaked() view returns (uint256)"
  ],
  rewardsPool: [
    "function owner() view returns (address)",
    "function paused() view returns (bool)",
    "function stakingContractBalance() view returns (uint256)",
    "function needsRefill() view returns (bool)",
    "function getSupportedTokens() view returns (address[])"
  ],
  yieldDistributor: [
    "function owner() view returns (address)"
  ],
  achievementNFT: [
    "function owner() view returns (address)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalMinted() view returns (uint256)"
  ],
  stakingRouter: [
    "function owner() view returns (address)",
    "function getGlobalMetrics() view returns (uint256,uint256,uint256,uint256,uint256)"
  ],
  governor: [
    "function owner() view returns (address)",
    "function votingPeriod() view returns (uint256)",
    "function proposalThreshold() view returns (uint256)",
    "function quorum(uint256) view returns (uint256)"
  ],
  liquidityManager: [
    "function owner() view returns (address)",
  ],
  insuranceFund: [
    "function owner() view returns (address)",
    "function onbtToken() view returns (address)"
  ],
  stabilizer: [
    "function owner() view returns (address)",
    "function onbtToken() view returns (address)",
    "function activeStrategy() view returns (bytes32)"
  ],
  incentiveController: [
    "function owner() view returns (address)",
    "function defaultRateBps() view returns (uint256)"
  ],
  revenueRouter: [
    "function owner() view returns (address)",
    "function vault() view returns (address)",
    "function rewards() view returns (address)",
    "function insurance() view returns (address)",
    "function toVaultBps() view returns (uint256)",
    "function toRewardsBps() view returns (uint256)",
    "function toInsuranceBps() view returns (uint256)"
  ],
};

function loadDeployment(networkName) {
  const relative = DEPLOYMENT_FILES[networkName];
  if (!relative) {
    throw new Error(`Unsupported network ${networkName}. Expected base|arbitrum`);
  }
  const fullPath = path.join(process.cwd(), relative);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function probeContract(contractLabel, address, iface) {
  const code = await ethers.provider.getCode(address);
  if (code === "0x") {
    return {
      contractLabel,
      address,
      deployed: false,
      ok: 0,
      failed: 0,
    };
  }

  const contract = new ethers.Contract(address, iface, ethers.provider);
  let ok = 0;
  let failed = 0;
  const skipped = [];
  const errors = [];

  for (const sig of iface) {
    const fnName = sig.trim().split("(")[0].split(" ").pop();
    
    // Extract parameters from function signature (between first ( and first ))
    const match = sig.match(/function\s+\w+\(([^)]*)\)/);
    const paramSection = match ? match[1].trim() : "";
    
    // Skip functions with actual parameters
    if (paramSection && paramSection.length > 0) {
      skipped.push(fnName);
      continue;
    }

    try {
      const fn = contract[fnName];
      if (typeof fn !== "function") {
        failed += 1;
        errors.push(`${fnName}: not a callable function`);
        continue;
      }
      
      const callPromise = fn();
      const result = await Promise.race([
        callPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`timeout`)), 3000)
        ),
      ]);
      ok += 1;
    } catch (err) {
      failed += 1;
      const msg = err?.message || "failed";
      errors.push(`${fnName}: ${msg.slice(0, 100)}`);
    }
  }

  return {
    contractLabel,
    address,
    deployed: true,
    ok,
    failed,
    skipped: skipped.length,
    errors: errors.slice(0, 3),
  };
}

async function main() {
  const deployment = loadDeployment(network.name);

  console.log("\n" + "=".repeat(88));
  console.log(
    `Simple ABI Probe: ${deployment.network.toUpperCase()} (chainId ${deployment.chainId})`
  );
  console.log("=".repeat(88) + "\n");

  let totalOk = 0;
  let totalFailed = 0;

  for (const [key, address] of Object.entries(deployment.contracts)) {
    const iface = CONTRACT_INTERFACES[key];
    if (!iface) {
      console.log(`⚠️  ${key}: no interface defined`);
      continue;
    }

    process.stdout.write(`${key}... `);
    const result = await probeContract(key, address, iface);
    console.log("done");
    if (!result.deployed) {
      console.log(`❌ ${key} not deployed at ${address}`);
      continue;
    }

    totalOk += result.ok;
    totalFailed += result.failed;

    const status = result.failed === 0 ? "✅" : "⚠️";
    console.log(
      `${status} ${key.padEnd(25)} ok=${result.ok.toString().padStart(2)} fail=${result.failed.toString().padStart(2)} skip=${result.skipped.toString().padStart(2)}`
    );

    if (result.failed > 0) {
      for (const err of result.errors) {
        console.log(`   - ${err}`);
      }
    }
  }

  console.log("\n" + "-".repeat(88));
  console.log(`Total calls: ok=${totalOk}, failed=${totalFailed}`);
  console.log("-".repeat(88) + "\n");

  process.exitCode = totalFailed > 0 ? 1 : 0;
}

main().catch((e) => {
  console.error("❌ Probe failed:", e.message);
  process.exit(1);
});
