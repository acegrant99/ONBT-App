import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers, network } = hre;

const DEPLOYMENT_FILES = {
  base: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
};

const ARTIFACT_BY_KEY = {
  onbtToken: "artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json",
  vault: "artifacts/contracts/treasury/ONBTOmnichainVault.sol/ONBTOmnichainVault.json",
  staking: "artifacts/contracts/defi/ONBTOmnichainStaking.sol/ONBTOmnichainStaking.json",
  rewardsPool: "artifacts/contracts/defi/ONBTRewardsPool.sol/ONBTRewardsPool.json",
  yieldDistributor: "artifacts/contracts/defi/ONBTYieldDistributor.sol/ONBTYieldDistributor.json",
  achievementNFT: "artifacts/contracts/defi/ONBTAchievementNFT.sol/ONBTAchievementNFT.json",
  stakingRouter: "artifacts/contracts/defi/ONBTStakingRouter.sol/ONBTStakingRouter.json",
  governor: "artifacts/contracts/defi/ONBTGovernor.sol/ONBTGovernor.json",
  liquidityManager: "artifacts/contracts/defi/ONBTLiquidityManager.sol/ONBTLiquidityManager.json",
  insuranceFund: "artifacts/contracts/treasury/ONBTInsuranceFund.sol/ONBTInsuranceFund.json",
  stabilizer: "artifacts/contracts/defi/ONBTStabilizer.sol/ONBTStabilizer.json",
  incentiveController: "artifacts/contracts/defi/ONBTIncentiveController.sol/ONBTIncentiveController.json",
  revenueRouter: "artifacts/contracts/defi/ONBTRevenueRouter.sol/ONBTRevenueRouter.json",
};

const PRIORITY_METHODS = [
  "name",
  "symbol",
  "decimals",
  "owner",
  "paused",
  "endpoint",
  "totalSupply",
  "localTotalStaked",
  "globalTotalStaked",
  "totalShares",
  "totalVotingPower",
  "baseRewardRate",
];

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function detectNetworkKey() {
  if (network.name === "base") return "base";
  if (network.name === "arbitrum") return "arbitrum";
  throw new Error(`Unsupported network '${network.name}'. Use --network base|arbitrum`);
}

function loadArtifact(contractKey) {
  const artifactPath = ARTIFACT_BY_KEY[contractKey];
  if (!artifactPath) {
    return null;
  }
  try {
    return readJson(artifactPath);
  } catch {
    return null;
  }
}

function pickMethods(abi) {
  const fns = abi.filter(
    (x) =>
      x.type === "function" &&
      (x.stateMutability === "view" || x.stateMutability === "pure") &&
      (x.inputs?.length ?? 0) === 0
  );

  const byName = new Map();
  for (const fn of fns) {
    if (!byName.has(fn.name)) {
      byName.set(fn.name, fn);
    }
  }

  const selected = [];
  for (const name of PRIORITY_METHODS) {
    if (byName.has(name)) {
      selected.push(byName.get(name));
      byName.delete(name);
    }
  }

  for (const fn of byName.values()) {
    if (selected.length >= 8) break;
    selected.push(fn);
  }

  return selected;
}

function toSignature(fn) {
  return `${fn.name}()`;
}

function shortValue(value) {
  const raw = Array.isArray(value) ? value : [value];
  const asText = raw
    .map((v) => {
      if (typeof v === "bigint") return v.toString();
      if (v && typeof v.toString === "function") return v.toString();
      return String(v);
    })
    .join(", ");
  return asText.length > 70 ? `${asText.slice(0, 67)}...` : asText;
}

async function probeContract(contractKey, address) {
  const artifact = loadArtifact(contractKey);
  if (!artifact) {
    return {
      contractKey,
      address,
      deployed: false,
      passed: 0,
      failed: 1,
      notes: ["artifact missing"],
    };
  }

  const code = await ethers.provider.getCode(address);
  if (!code || code === "0x") {
    return {
      contractKey,
      address,
      deployed: false,
      passed: 0,
      failed: 1,
      notes: ["no bytecode at address"],
    };
  }

  const contract = new ethers.Contract(address, artifact.abi, ethers.provider);
  const methods = pickMethods(artifact.abi);

  let passed = 0;
  let failed = 0;
  const notes = [];

  for (const fn of methods) {
    const sig = toSignature(fn);
    try {
      const res = await contract.functions[sig]();
      passed += 1;
      notes.push(`✓ ${sig} -> ${shortValue(res)}`);
    } catch (err) {
      failed += 1;
      const msg = err?.message ? err.message.split("\n")[0] : "call failed";
      notes.push(`✗ ${sig} -> ${msg}`);
    }
  }

  return {
    contractKey,
    address,
    deployed: true,
    passed,
    failed,
    notes,
  };
}

async function main() {
  const networkKey = detectNetworkKey();
  const deploymentFile = process.env.DEPLOYMENT_FILE || DEPLOYMENT_FILES[networkKey];
  const deployment = readJson(deploymentFile);

  console.log(`\nABI probe on ${networkKey.toUpperCase()}`);
  console.log(`Deployment file: ${deploymentFile}`);
  console.log(`ChainId: ${deployment.chainId}\n`);

  let totalPassed = 0;
  let totalFailed = 0;
  let totalContracts = 0;

  for (const [key, address] of Object.entries(deployment.contracts)) {
    if (!ARTIFACT_BY_KEY[key]) continue;

    totalContracts += 1;
    const result = await probeContract(key, address);

    totalPassed += result.passed;
    totalFailed += result.failed;

    const status = result.failed === 0 ? "PASS" : result.passed > 0 ? "WARN" : "FAIL";
    console.log(`[${status}] ${key} @ ${address}`);
    console.log(`       calls: ${result.passed} passed, ${result.failed} failed`);
    for (const line of result.notes.slice(0, 6)) {
      console.log(`       ${line}`);
    }
    if (result.notes.length > 6) {
      console.log(`       ... (${result.notes.length - 6} more)`);
    }
    console.log("");
  }

  console.log("Summary");
  console.log(`Contracts probed: ${totalContracts}`);
  console.log(`ABI calls passed: ${totalPassed}`);
  console.log(`ABI calls failed: ${totalFailed}\n`);

  if (totalFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Probe failed:", error.message);
  process.exit(1);
});
