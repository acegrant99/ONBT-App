import "dotenv/config";
import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const ROOT = process.cwd();
const DEPLOY_DIR = path.join(ROOT, "deploy");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function findLatestDeployment(network) {
  const files = fs.readdirSync(DEPLOY_DIR);
  const regex = new RegExp(`deployment-lzv2-resume-${network}-contractfix-(\\d+)\\.json$`);
  const matches = files
    .map((file) => ({ file, match: file.match(regex) }))
    .filter((entry) => entry.match);

  if (matches.length === 0) {
    throw new Error(`No contractfix deployment found for ${network}.`);
  }

  matches.sort((a, b) => Number(b.match[1]) - Number(a.match[1]));
  return path.join(DEPLOY_DIR, matches[0].file);
}

async function safeSetStakingContract(label, contract, newAddress) {
  try {
    const tx = await contract.setStakingContract(newAddress);
    console.log(`   ✓ ${label} updated: ${tx.hash}`);
    await tx.wait();
  } catch (error) {
    console.log(`   ⚠️  ${label} update failed: ${error.message}`);
  }
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || findLatestDeployment(networkKey);
  const deployment = loadJson(deploymentPath);

  const lzEndpoint = deployment.layerZero.endpoint;
  const localEid = deployment.layerZero.eid;
  const hubEid = deployment.layerZero.hubEid;
  const onbtToken = deployment.contracts.onbtToken;
  const isHub = deployment.deploymentType === "hub";

  console.log("\n" + "═".repeat(70));
  console.log("Redeploying ONBTOmnichainStaking only");
  console.log("═".repeat(70));
  console.log(`Network: ${networkKey.toUpperCase()} (${chainId})`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Deployment file: ${deploymentPath}`);
  console.log(`Endpoint: ${lzEndpoint}`);
  console.log(`Local EID: ${localEid}`);
  console.log(`Hub EID: ${hubEid}`);
  console.log(`Is hub: ${isHub}`);
  console.log(`ONBT Token: ${onbtToken}`);

  const oldStakingAddress = deployment.contracts.staking;
  console.log(`Old staking: ${oldStakingAddress}`);

  let previousRewardRate = null;
  if (oldStakingAddress) {
    try {
      const oldStaking = await ethers.getContractAt("ONBTOmnichainStaking", oldStakingAddress);
      previousRewardRate = await oldStaking.baseRewardRate();
      console.log(`Previous baseRewardRate: ${previousRewardRate.toString()}`);
    } catch (error) {
      console.log(`⚠️  Could not read previous reward rate: ${error.message}`);
    }
  }

  console.log("\nDeploying new ONBTOmnichainStaking...");
  const Staking = await ethers.getContractFactory("ONBTOmnichainStaking");
  const staking = await Staking.deploy(lzEndpoint, onbtToken, localEid, hubEid, isHub);
  await staking.deployed();
  const newStakingAddress = staking.address;
  console.log(`✅ New staking deployed: ${newStakingAddress}`);

  if (previousRewardRate) {
    try {
      const currentRate = await staking.baseRewardRate();
      if (!currentRate.eq(previousRewardRate)) {
        const tx = await staking.setRewardRate(previousRewardRate);
        console.log(`   ✓ Reward rate updated: ${tx.hash}`);
        await tx.wait();
      }
    } catch (error) {
      console.log(`⚠️  Reward rate update failed: ${error.message}`);
    }
  }

  console.log("\nUpdating dependent contracts...");
  if (deployment.contracts.achievementNFT) {
    const nft = await ethers.getContractAt("ONBTAchievementNFT", deployment.contracts.achievementNFT);
    await safeSetStakingContract("AchievementNFT", nft, newStakingAddress);
  }

  if (deployment.contracts.rewardsPool) {
    const rewardsPool = await ethers.getContractAt("ONBTRewardsPool", deployment.contracts.rewardsPool);
    await safeSetStakingContract("RewardsPool", rewardsPool, newStakingAddress);
  }

  if (deployment.contracts.governor) {
    const governor = await ethers.getContractAt("ONBTGovernor", deployment.contracts.governor);
    await safeSetStakingContract("Governor", governor, newStakingAddress);
  }

  if (deployment.contracts.stakingRouter) {
    const stakingRouter = await ethers.getContractAt("ONBTStakingRouter", deployment.contracts.stakingRouter);
    try {
      const tx = await stakingRouter.updateContracts(newStakingAddress, ethers.ZeroAddress, ethers.ZeroAddress);
      console.log(`   ✓ StakingRouter updated: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.log(`   ⚠️  StakingRouter update failed: ${error.message}`);
    }
  }

  const newDeployment = { ...deployment };
  newDeployment.contracts = { ...deployment.contracts, staking: newStakingAddress };
  newDeployment.timestamp = new Date().toISOString();
  newDeployment.redeployReason = "Staking-only redeploy (bugfixes)";

  const outputPath = path.join(
    DEPLOY_DIR,
    `deployment-lzv2-resume-${networkKey}-stakingfix-${Date.now()}.json`
  );
  fs.writeFileSync(outputPath, JSON.stringify(newDeployment, null, 2));

  console.log("\nDeployment updated:");
  console.log(`- Saved: ${outputPath}`);
  console.log("\nNext steps:");
  console.log(`1. Set peers for new staking contract on both chains.`);
  console.log(`2. Set enforced options for staking messages.`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
