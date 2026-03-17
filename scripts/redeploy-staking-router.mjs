import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const waitForDeployment = async (contract) => {
  if (contract.waitForDeployment) {
    await contract.waitForDeployment();
    return;
  }
  if (contract.deployed) {
    await contract.deployed();
  }
};

const getAddress = async (contract) => {
  if (contract.getAddress) {
    return contract.getAddress();
  }
  return contract.address;
};

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-1771466159957.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-1771466361444.json",
};

function readJson(relativePath) {
  const fullPath = path.join(process.cwd(), relativePath);
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

  const lzEndpoint = deployment.layerZero.endpoint;
  const localEid = deployment.layerZero.eid;
  const hubEid = deployment.layerZero.hubEid || 30184;
  const isHub = deployment.deploymentType === "hub" || networkKey === "base";

  const stakingContract = deployment.contracts.staking;
  const yieldDistributor = deployment.contracts.yieldDistributor;
  const rewardsPool = deployment.contracts.rewardsPool;

  console.log(`\nRedeploying ONBTStakingRouter on ${networkKey.toUpperCase()}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Endpoint: ${lzEndpoint}`);
  console.log(`Local EID: ${localEid}`);
  console.log(`Hub EID: ${hubEid}`);
  console.log(`Is Hub: ${isHub}`);
  console.log(`Staking: ${stakingContract}`);
  console.log(`YieldDistributor: ${yieldDistributor}`);
  console.log(`RewardsPool: ${rewardsPool}\n`);

  const Router = await ethers.getContractFactory("ONBTStakingRouter");
  const router = await Router.deploy(
    lzEndpoint,
    localEid,
    hubEid,
    isHub,
    stakingContract,
    yieldDistributor,
    rewardsPool
  );

  await waitForDeployment(router);
  const routerAddress = await getAddress(router);

  console.log(`✅ ONBTStakingRouter deployed: ${routerAddress}`);

  const updated = {
    ...deployment,
    contracts: {
      ...deployment.contracts,
      stakingRouter: routerAddress,
    },
  };

  const filename = `deployment-lzv2-resume-${networkKey}-routerfix-${Date.now()}.json`;
  const filepath = path.join(process.cwd(), "deploy", filename);
  fs.writeFileSync(filepath, JSON.stringify(updated, null, 2));
  console.log(`\n📄 Updated deployment saved: ${filename}`);

  if (yieldDistributor) {
    try {
      const yd = await ethers.getContractAt("ONBTYieldDistributor", yieldDistributor, signer);
      const isDepositor = await yd.rewardDepositors(routerAddress);
      if (!isDepositor) {
        const tx = await yd.addRewardDepositor(routerAddress);
        await tx.wait();
        console.log("✅ YieldDistributor depositor updated for new router");
      } else {
        console.log("✓ YieldDistributor depositor already set for new router");
      }
    } catch (error) {
      console.log(`⚠️  YieldDistributor depositor update skipped: ${error.message}`);
    }
  }

  console.log("\nNext: deploy router on the peer chain, then run configure-lzv2-peers.mjs with the new deployment files to set router peers.");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Redeploy failed:", error);
  process.exit(1);
});
