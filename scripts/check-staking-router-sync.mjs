import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  if (chainId !== 8453) {
    throw new Error("Run this on Base (chainId 8453)");
  }

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS.base;
  const deployment = readJson(deploymentPath);

  const routerAddress = deployment.contracts.stakingRouter;
  const arbEid = deployment.layerZero.peerEid || 30110;

  console.log(`\nChecking sync metrics on Base router`);
  console.log(`Router: ${routerAddress}`);
  console.log(`Arbitrum EID: ${arbEid}\n`);

  const router = await ethers.getContractAt("ONBTStakingRouter", routerAddress);
  const metrics = await router.getChainMetrics(arbEid);

  const [totalStaked, totalShares, yieldRatio, pendingYieldAmount, lastSync] = metrics;

  console.log(`totalStaked: ${totalStaked}`);
  console.log(`totalShares: ${totalShares}`);
  console.log(`yieldRatio: ${yieldRatio}`);
  console.log(`pendingYield: ${pendingYieldAmount}`);
  console.log(`lastSyncTime: ${lastSync}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Sync check failed:", error);
  process.exit(1);
});
