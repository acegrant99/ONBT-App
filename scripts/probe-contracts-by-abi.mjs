import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers, artifacts, network } = hre;

const DEPLOYMENT_FILES = {
  base: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
};

const CONTRACT_NAME_BY_KEY = {
  onbtToken: "OmnichainNabatOFT",
  vault: "ONBTOmnichainVault",
  staking: "ONBTOmnichainStaking",
  rewardsPool: "ONBTRewardsPool",
  yieldDistributor: "ONBTYieldDistributor",
  achievementNFT: "ONBTAchievementNFT",
  stakingRouter: "ONBTStakingRouter",
  governor: "ONBTGovernor",
  liquidityManager: "ONBTLiquidityManager",
  insuranceFund: "ONBTInsuranceFund",
  stabilizer: "ONBTStabilizer",
  incentiveController: "ONBTIncentiveController",
  revenueRouter: "ONBTRevenueRouter",
};

function loadDeployment(networkName) {
  const relative = DEPLOYMENT_FILES[networkName];
  if (!relative) {
    throw new Error(`Unsupported network ${networkName}. Expected base|arbitrum`);
  }
  const fullPath = path.join(process.cwd(), relative);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function getNoArgReadFunctions(abi) {
  const skipList = new Set([
    "getVotes", 
    "delegates",
    "numCheckpoints",
    "checkpoints",
    "holderCount",
    "peakLocalSupply",
    "totalLocalTransferCount",
    "totalLocalTransferVolume",
    "totalBridgedOut",
    "totalBridgedIn",
    "totalCrossChainSendCount",
    "totalCrossChainReceiveCount",
  ]);
  
  return abi.filter(
    (f) =>
      f.type === "function" &&
      (f.stateMutability === "view" || f.stateMutability === "pure") &&
      Array.isArray(f.inputs) &&
      f.inputs.length === 0 &&
      !skipList.has(f.name)
  );
}

function callWithTimeout(promise, ms, label) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timeout after ${ms}ms (${label})`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

async function probeContract(contractLabel, address, contractName) {
  const code = await ethers.provider.getCode(address);
  if (code === "0x") {
    return {
      contractLabel,
      contractName,
      address,
      deployed: false,
      ok: 0,
      failed: 0,
      details: [],
    };
  }

  const artifact = await artifacts.readArtifact(contractName).catch((e) => {
    console.log(`   ⚠️  Could not load artifact for ${contractName}: ${e.message}`);
    return null;
  });
  
  if (!artifact) {
    return {
      contractLabel,
      contractName,
      address,
      deployed: true,
      ok: 0,
      failed: 0,
      details: [{ note: "artifact not found" }],
    };
  }
  
  const readFns = getNoArgReadFunctions(artifact.abi);
  const instance = new ethers.Contract(address, artifact.abi, ethers.provider);

  let ok = 0;
  let failed = 0;
  const details = [];

  for (const fn of readFns) {
    try {
      await callWithTimeout(
        instance[fn.name]({ gasLimit: 2_000_000 }),
        10_000,
        `${contractLabel}.${fn.name}`
      );
      ok += 1;
      details.push({ fn: fn.name, status: "ok" });
    } catch (err) {
      failed += 1;
      details.push({
        fn: fn.name,
        status: "failed",
        error: (err?.shortMessage || err?.message || "unknown error").slice(0, 120),
      });
    }
  }

  return {
    contractLabel,
    contractName,
    address,
    deployed: true,
    ok,
    failed,
    details,
  };
}

async function main() {
  const deployment = loadDeployment(network.name);

  console.log("\n" + "=".repeat(88));
  console.log(`ABI Probe: ${deployment.network.toUpperCase()} (chainId ${deployment.chainId})`);
  console.log("=".repeat(88));

  let totalOk = 0;
  let totalFailed = 0;
  let contractCount = 0;

  for (const [key, address] of Object.entries(deployment.contracts)) {
    const contractName = CONTRACT_NAME_BY_KEY[key];
    if (!contractName) {
      console.log(`\n⚠️  Skip ${key}: no contract-name mapping`);
      continue;
    }

    contractCount += 1;
    console.log(`\n⏳ Probing ${key} (${contractName})...`);
    const result = await probeContract(key, address, contractName);

    if (!result.deployed) {
      console.log(`\n❌ ${key} (${contractName}) not deployed at ${address}`);
      totalFailed += 1;
      continue;
    }

    totalOk += result.ok;
    totalFailed += result.failed;

    const status = result.failed === 0 ? "✅" : "⚠️";
    console.log(`\n${status} ${key} (${contractName})`);
    console.log(`   ${address}`);
    console.log(`   view/pure no-arg calls: ok=${result.ok}, failed=${result.failed}`);

    if (result.failed > 0) {
      for (const d of result.details.filter((x) => x.status === "failed").slice(0, 5)) {
        console.log(`   - ${d.fn}: ${d.error}`);
      }
    }
  }

  console.log("\n" + "-".repeat(88));
  console.log(`Contracts probed: ${contractCount}`);
  console.log(`Total read calls ok: ${totalOk}`);
  console.log(`Total read calls failed: ${totalFailed}`);
  console.log("-".repeat(88) + "\n");

  if (totalFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("❌ ABI probe failed:", e);
  process.exit(1);
});
