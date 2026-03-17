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

async function main() {
  console.log("\n" + "=".repeat(88));
  console.log(`VERIFY CONFIGURATION: ${network.name.toUpperCase()}`);
  console.log("=".repeat(88) + "\n");

  const deployment = loadDeployment(network.name);

  console.log("Reading configuration from fresh contract instances...\n");

  // Create fresh contract instance
  const stakingIface = new ethers.utils.Interface([
    "function achievementNFT() view returns (address)",
    "function owner() view returns (address)"
  ]);
  const staking = new ethers.Contract(deployment.contracts.staking, stakingIface, ethers.provider);

  console.log("Contracts:");
  console.log(`  Staking:        ${deployment.contracts.staking}`);
  console.log(`  Expected NFT:   ${deployment.contracts.achievementNFT}\n`);

  // Read multiple times to ensure consistency
  console.log("Reading achievementNFT address (attempt 1)...");
  const nft1 = await staking.achievementNFT();
  console.log(`  Result: ${nft1}\n`);

  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("Reading achievementNFT address (attempt 2 after 2s delay)...");
  const nft2 = await staking.achievementNFT();
  console.log(`  Result: ${nft2}\n`);

  const owner = await staking.owner();
  console.log(`Owner: ${owner}\n`);

  // Check if configured correctly
  const isConfigured = nft2.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase();
  const isZero = nft2 === ethers.constants.AddressZero;

  console.log("=".repeat(88));
  if (isConfigured) {
    console.log("✅ CONFIGURATION CORRECT");
    console.log(`   AchievementNFT is properly set to: ${nft2}`);
  } else if (isZero) {
    console.log("❌ CONFIGURATION NOT SET");
    console.log("   AchievementNFT is still at zero address");
    console.log(`   Expected: ${deployment.contracts.achievementNFT}`);
  } else {
    console.log("⚠️  CONFIGURATION MISMATCH");
    console.log(`   Current:  ${nft2}`);
    console.log(`   Expected: ${deployment.contracts.achievementNFT}`);
  }
  console.log("=".repeat(88) + "\n");
}

main().catch((error) => {
  console.error("\n❌ Verification failed:", error.message);
  process.exit(1);
});
