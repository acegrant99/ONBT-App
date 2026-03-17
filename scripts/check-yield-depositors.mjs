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
  const stakingRouter = deployment.contracts.stakingRouter;

  console.log(`\nYield Distributor Depositor Check on ${networkKey.toUpperCase()}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`YieldDistributor: ${yieldDistributor}`);
  console.log(`StakingRouter: ${stakingRouter}\n`);

  const yd = await ethers.getContractAt("ONBTYieldDistributor", yieldDistributor, signer);

  const owner = await yd.owner();
  const isSignerDepositor = await yd.rewardDepositors(signer.address);
  const isRouterDepositor = await yd.rewardDepositors(stakingRouter);

  console.log(`Owner: ${owner}`);
  console.log(`Signer is owner: ${owner.toLowerCase() === signer.address.toLowerCase()}`);
  console.log(`Signer is depositor: ${isSignerDepositor}`);
  console.log(`StakingRouter is depositor: ${isRouterDepositor}\n`);

  if (owner.toLowerCase() === signer.address.toLowerCase() && !isSignerDepositor) {
    console.log("Adding signer as depositor...");
    const tx = await yd.addRewardDepositor(signer.address);
    console.log(`Tx: ${tx.hash}`);
    await tx.wait();
    console.log("✅ Signer added as depositor");
  } else if (!isSignerDepositor) {
    console.log("⚠️  Signer is not owner and not a depositor");
  } else {
    console.log("✅ Signer is already a depositor");
  }

  if (!isRouterDepositor && owner.toLowerCase() === signer.address.toLowerCase()) {
    console.log("\nAdding StakingRouter as depositor...");
    const tx = await yd.addRewardDepositor(stakingRouter);
    console.log(`Tx: ${tx.hash}`);
    await tx.wait();
    console.log("✅ StakingRouter added as depositor");
  } else if (isRouterDepositor) {
    console.log("✅ StakingRouter is already a depositor");
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Check depositors failed:", error);
  process.exit(1);
});
