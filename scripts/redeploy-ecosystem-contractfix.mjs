import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-governorfix-1771472126318.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-governorfix-1771472201577.json",
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║   Redeploy Ecosystem Contracts with setEnforcedOptions   ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  console.log(`Network: ${networkKey.toUpperCase()}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Deployer: ${deployer.address}\n`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  console.log(`Reading deployment from: ${deploymentPath}`);
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  console.log(`Deployment network: ${deployment.network}, eid: ${deployment.layerZero.eid}`);

  const lzEndpoint = deployment.layerZero.endpoint;
  const localEid = deployment.layerZero.eid;
  const hubEid = deployment.layerZero.hubEid;
  const peerEid = deployment.layerZero.peerEid;
  const onbtToken = deployment.contracts.onbtToken;
  const isHub = deployment.deploymentType === "hub";

  console.log(`LayerZero Endpoint: ${lzEndpoint}`);
  console.log(`Local EID: ${localEid}`);
  console.log(`Hub EID: ${hubEid}`);
  console.log(`Peer EID: ${peerEid}`);
  console.log(`ONBT Token: ${onbtToken}`);
  console.log(`Is Hub: ${isHub}\n`);

  const contractsToRedeploy = ["YieldDistributor", "AchievementNFT", "Staking"];
  const newDeployment = { ...deployment };

  console.log("═══════════════════════════════════════════════════════════");
  console.log("Redeploying Contracts with setEnforcedOptions");
  console.log("═══════════════════════════════════════════════════════════\n");

  // Redeploy YieldDistributor
  console.log("1. Redeploying ONBTYieldDistributor...");
  const YieldDistributor = await ethers.getContractFactory("ONBTYieldDistributor");
  const yieldDistributor = await YieldDistributor.deploy(
    lzEndpoint,
    localEid,
    hubEid,
    isHub,
    onbtToken
  );
  await yieldDistributor.deployed();
  const ydAddress = yieldDistributor.address;
  console.log(`   ✅ Deployed at: ${ydAddress}\n`);

  // Redeploy Staking
  console.log("2. Redeploying ONBTOmnichainStaking...");
  const Staking = await ethers.getContractFactory("ONBTOmnichainStaking");
  const staking = await Staking.deploy(
    lzEndpoint,
    onbtToken,
    localEid,
    hubEid,
    isHub
  );
  await staking.deployed();
  const stakingAddress = staking.address;
  console.log(`   ✅ Deployed at: ${stakingAddress}\n`);

  // Redeploy AchievementNFT
  console.log("3. Redeploying ONBTAchievementNFT...");
  const AchievementNFT = await ethers.getContractFactory("ONBTAchievementNFT");
  const achievementNFT = await AchievementNFT.deploy(
    "ONBT Achievement",
    "ONBTACH",
    lzEndpoint,
    localEid,
    stakingAddress // Use new staking address
  );
  await achievementNFT.deployed();
  const nftAddress = achievementNFT.address;
  console.log(`   ✅ Deployed at: ${nftAddress}\n`);

  // Update deployment record
  newDeployment.contracts.yieldDistributor = ydAddress;
  newDeployment.contracts.staking = stakingAddress;
  newDeployment.contracts.achievementNFT = nftAddress;
  newDeployment.timestamp = new Date().toISOString();
  newDeployment.redeployReason = "Added setEnforcedOptions methods";

  // Save deployment
  const outputPath = `deploy/deployment-lzv2-resume-${networkKey}-contractfix-${Date.now()}.json`;
  fs.writeFileSync(outputPath, JSON.stringify(newDeployment, null, 2));
  console.log(`✅ Deployment saved to: ${outputPath}\n`);

  console.log("═══════════════════════════════════════════════════════════");
  console.log("Summary");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`YieldDistributor: ${ydAddress}`);
  console.log(`Staking:          ${stakingAddress}`);
  console.log(`AchievementNFT:   ${nftAddress}`);
  console.log("\n⚠️  NEXT STEPS:");
  console.log("1. Wire peers for all three contracts");
  console.log("2. Configure depositors for YieldDistributor");
  console.log("3. Link AchievementNFT to new Staking address");
  console.log("4. Set enforced options on all contracts");
  console.log("5. Update cross-contract references\n");

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Deployment Complete! 🎉                       ║");
  console.log("║            Contracts now support enforced options          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
