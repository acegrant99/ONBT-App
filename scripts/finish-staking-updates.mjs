import hre from "hardhat";
const { ethers, network } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEPLOY_DIR = path.join(__dirname, "..", "deploy");

// Base network info
const BASE_NEW_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ACHIEVED_NFT_TX = "0x316b3da79a228470e0f88716af8138001b55e9756ca52b234ce2984286228744"; // Already done

function findLatestDeployment(networkKey) {
  const files = fs.readdirSync(DEPLOY_DIR).filter((f) => f.includes(`-${networkKey}-contractfix-`));
  if (files.length === 0) return null;
  files.sort();
  return path.join(DEPLOY_DIR, files[files.length - 1]);
}

async function main() {
  const networkKey = network.name === "arbitrum" ? "arbitrum" : "base";
  const deploymentPath = findLatestDeployment(networkKey);
  
  if (!deploymentPath) {
    throw new Error(`No deployment file found for ${networkKey}`);
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log(`Finishing staking contract updates - ${networkKey.toUpperCase()}`);
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log(`New staking: ${BASE_NEW_STAKING}`);
  console.log(`RewardsPool: ${deployment.contracts.rewardsPool}`);
  console.log(`Governor: ${deployment.contracts.governor}`);
  console.log(`StakingRouter: ${deployment.contracts.stakingRouter}`);

  // RewardsPool
  if (deployment.contracts.rewardsPool) {
    try {
      const rewardsPool = await ethers.getContractAt("ONBTRewardsPool", deployment.contracts.rewardsPool);
      const tx = await rewardsPool.setStakingContract(BASE_NEW_STAKING);
      console.log(`✓ RewardsPool.setStakingContract: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.log(`⚠️  RewardsPool update failed: ${error.message}`);
    }
  }

  // Governor
  if (deployment.contracts.governor) {
    try {
      const governor = await ethers.getContractAt("ONBTGovernor", deployment.contracts.governor);
      const tx = await governor.setStakingContract(BASE_NEW_STAKING);
      console.log(`✓ Governor.setStakingContract: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.log(`⚠️  Governor update failed: ${error.message}`);
    }
  }

  // StakingRouter
  if (deployment.contracts.stakingRouter) {
    try {
      const stakingRouter = await ethers.getContractAt("ONBTStakingRouter", deployment.contracts.stakingRouter);
      const tx = await stakingRouter.updateContracts(BASE_NEW_STAKING, ethers.ZeroAddress, ethers.ZeroAddress);
      console.log(`✓ StakingRouter.updateContracts: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.log(`⚠️  StakingRouter update failed: ${error.message}`);
    }
  }

  // Save updated deployment file
  const newDeployment = { ...deployment };
  newDeployment.contracts = { ...deployment.contracts, staking: BASE_NEW_STAKING };
  newDeployment.timestamp = new Date().toISOString();
  newDeployment.redeployReason = "Staking-only redeploy (bugfixes)";

  const outputPath = path.join(
    DEPLOY_DIR,
    `deployment-lzv2-resume-${networkKey}-stakingfix-${Date.now()}.json`
  );
  fs.writeFileSync(outputPath, JSON.stringify(newDeployment, null, 2));
  console.log(`\n✅ Deployment saved: ${outputPath}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
