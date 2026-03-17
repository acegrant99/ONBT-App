import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-contractfix-1771497364067.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-contractfix-1771497392397.json",
};

const formatEther = (value) =>
  ethers.formatEther ? ethers.formatEther(value) : ethers.utils.formatEther(value);

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const yieldDistributor = deployment.contracts.yieldDistributor;
  const isHub = deployment.deploymentType === "hub";

  console.log(`\nYield Distributor State on ${networkKey.toUpperCase()} (chainId ${chainId})`);
  console.log(`Signer: ${signer.address}`);
  console.log(`YieldDistributor: ${yieldDistributor}`);
  console.log(`Is Hub: ${isHub}\n`);

  const yd = await ethers.getContractAt("ONBTYieldDistributor", yieldDistributor, signer);

  const totalShares = await yd.totalShares();
  const accRewardsPerShare = await yd.accRewardsPerShare();
  const userInfo = await yd.users(signer.address);

  console.log("Current state:");
  console.log(`  Total shares: ${formatEther(totalShares)}`);
  console.log(`  Acc rewards per share: ${accRewardsPerShare}`);
  console.log(`  User shares: ${formatEther(userInfo.shares)}`);
  console.log(`  User pending: ${formatEther(userInfo.pendingRewards)}`);
  console.log(`  User claimed: ${formatEther(userInfo.totalClaimed)}\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ YieldDistributor state check failed:", error);
  process.exit(1);
});
