import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

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

  const lzEndpoint = deployment.layerZero.endpoint;
  const localEid = deployment.layerZero.eid;
  const hubEid = deployment.layerZero.hubEid || 30184;
  const isHub = deployment.deploymentType === "hub" || networkKey === "base";

  const stakingContract = deployment.contracts.staking;
  const oldGovernor = deployment.contracts.governor;

  console.log(`\nRedeploying ONBTGovernor on ${networkKey.toUpperCase()}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Endpoint: ${lzEndpoint}`);
  console.log(`Local EID: ${localEid}`);
  console.log(`Hub EID: ${hubEid}`);
  console.log(`Is Hub: ${isHub}`);
  console.log(`Staking: ${stakingContract}`);
  console.log(`Old Governor: ${oldGovernor}\n`);

  const governorAbi = [
    "function proposalThreshold() external view returns (uint256)",
    "function quorumPercentage() external view returns (uint256)",
    "function votingPeriod() external view returns (uint256)",
    "function timelockDelay() external view returns (uint256)",
    "function vault() external view returns (address)",
    "function rewardsPool() external view returns (address)",
    "function liquidityManager() external view returns (address)",
    "function insuranceFund() external view returns (address)",
    "function stabilizer() external view returns (address)",
    "function revenueRouter() external view returns (address)",
    "function incentiveController() external view returns (address)",
  ];

  const oldGov = new ethers.Contract(oldGovernor, governorAbi, ethers.provider);
  const [
    proposalThreshold,
    quorumPercentage,
    votingPeriod,
    timelockDelay,
    vault,
    rewardsPool,
    liquidityManager,
    insuranceFund,
    stabilizer,
    revenueRouter,
    incentiveController,
  ] = await Promise.all([
    oldGov.proposalThreshold(),
    oldGov.quorumPercentage(),
    oldGov.votingPeriod(),
    oldGov.timelockDelay(),
    oldGov.vault(),
    oldGov.rewardsPool(),
    oldGov.liquidityManager(),
    oldGov.insuranceFund(),
    oldGov.stabilizer(),
    oldGov.revenueRouter(),
    oldGov.incentiveController(),
  ]);

  const Governor = await ethers.getContractFactory("ONBTGovernor");
  const governor = await Governor.deploy(
    lzEndpoint,
    localEid,
    hubEid,
    isHub,
    stakingContract
  );

  await waitForDeployment(governor);
  const governorAddress = await getAddress(governor);

  console.log(`✅ ONBTGovernor deployed: ${governorAddress}`);

  console.log("\nConfiguring governance params...");
  const txParams = await governor.setGovernanceParams(
    proposalThreshold,
    quorumPercentage,
    votingPeriod,
    timelockDelay,
    { gasLimit: 300000 }
  );
  await txParams.wait();
  console.log("✅ Governance params updated");

  console.log("\nWiring module addresses...");
  const tx1 = await governor.setVault(vault, { gasLimit: 300000 });
  await tx1.wait();
  const tx2 = await governor.setRewardsPool(rewardsPool, { gasLimit: 300000 });
  await tx2.wait();
  const tx3 = await governor.setLiquidityManager(liquidityManager, { gasLimit: 300000 });
  await tx3.wait();
  const tx4 = await governor.setInsuranceFund(insuranceFund, { gasLimit: 300000 });
  await tx4.wait();
  const tx5 = await governor.setStabilizer(stabilizer, { gasLimit: 300000 });
  await tx5.wait();
  const tx6 = await governor.setRevenueRouter(revenueRouter, { gasLimit: 300000 });
  await tx6.wait();
  const tx7 = await governor.setIncentiveController(incentiveController, { gasLimit: 300000 });
  await tx7.wait();
  console.log("✅ Module wiring complete");

  const updated = {
    ...deployment,
    contracts: {
      ...deployment.contracts,
      governor: governorAddress,
    },
  };

  const filename = `deployment-lzv2-resume-${networkKey}-governorfix-${Date.now()}.json`;
  const filepath = path.join(process.cwd(), "deploy", filename);
  fs.writeFileSync(filepath, JSON.stringify(updated, null, 2));
  console.log(`\n📄 Updated deployment saved: ${filename}`);

  console.log("\nNext: deploy governor on the peer chain, then run configure-lzv2-peers.mjs with the new deployment files to set governor peers.");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Redeploy failed:", error);
  process.exit(1);
});
