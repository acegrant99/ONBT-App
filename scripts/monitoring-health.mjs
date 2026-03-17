import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { ethers, network } = hre;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findLatestDeployment(networkName) {
  const deployDir = path.join(__dirname, "..", "deploy");
  const files = fs.readdirSync(deployDir);
  const deploymentFiles = files
    .filter(f => f.startsWith("deployment-lzv2-") && f.includes(networkName) && f.endsWith(".json"))
    .sort()
    .reverse();

  if (deploymentFiles.length === 0) {
    throw new Error(`No deployment files found for ${networkName}`);
  }

  const latestFile = path.join(deployDir, deploymentFiles[0]);
  return JSON.parse(fs.readFileSync(latestFile, "utf8"));
}

function formatEther(value) {
  return ethers.utils.formatEther(value);
}

async function main() {
  const networkName = network.name;
  if (networkName !== "base" && networkName !== "arbitrum") {
    throw new Error(`Unsupported network: ${networkName}`);
  }

  const deployment = findLatestDeployment(networkName);
  const stakingAddress = deployment.contracts.staking;
  const onbtAddress = deployment.contracts.onbtToken;

  const [signer] = await ethers.getSigners();
  const monitorAddress = process.env.MONITOR_ADDRESS || signer.address;
  const minRunwayDays = parseInt(process.env.MIN_RUNWAY_DAYS || "30", 10);

  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);

  console.log("\n============================");
  console.log(`Monitoring Health (${networkName.toUpperCase()})`);
  console.log("============================\n");

  console.log(`Staking: ${stakingAddress}`);
  console.log(`ONBT: ${onbtAddress}`);
  console.log(`Monitor address: ${monitorAddress}\n`);

  const poolBalance = await onbt.balanceOf(stakingAddress);
  const localStaked = await staking.localTotalStaked();
  const baseRewardRate = await staking.baseRewardRate();
  const pendingRewards = await staking.earned(monitorAddress);

  console.log("Pool & Rewards:");
  console.log(`  Reward pool balance: ${formatEther(poolBalance)} ONBT`);
  console.log(`  Local total staked: ${formatEther(localStaked)} ONBT`);
  console.log(`  Pending rewards (monitor): ${formatEther(pendingRewards)} ONBT`);
  console.log(`  Base reward rate: ${baseRewardRate.toString()} bps (${baseRewardRate / 100}% APY)`);

  let dailyRewards = ethers.constants.Zero;
  let daysRemaining = null;

  if (localStaked.gt(0)) {
    dailyRewards = localStaked.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
    daysRemaining = poolBalance.div(dailyRewards.add(1));
    console.log(`  Daily burn: ${formatEther(dailyRewards)} ONBT/day`);
    console.log(`  Runway: ${daysRemaining.toString()} days`);
  } else {
    console.log("  No local stake yet (runway not applicable)");
  }

  if (daysRemaining !== null && daysRemaining.lt(minRunwayDays)) {
    console.log(`\n⚠️  ALERT: Runway below ${minRunwayDays} days`);
  }

  if (networkName === "base") {
    const globalTotal = await staking.globalTotalStaked();
    console.log(`\nGlobal total staked: ${formatEther(globalTotal)} ONBT`);
  }

  console.log("\n============================");
  console.log("Health check complete");
  console.log("============================\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Monitoring check failed:", error.message);
  process.exit(1);
});
