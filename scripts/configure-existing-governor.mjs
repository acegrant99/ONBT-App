import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENT = "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json";

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

  if (chainId !== 8453) {
    throw new Error("Run this on Base (chainId 8453)");
  }

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENT;
  const deployment = readJson(deploymentPath);

  const newGovernor = process.env.GOV_ADDRESS;
  if (!newGovernor) {
    throw new Error("Set GOV_ADDRESS to the new governor address");
  }

  const oldGovernor = deployment.contracts.governor;

  console.log(`\nConfiguring existing governor on Base`);
  console.log(`Deployment file: ${deploymentPath}`);
  console.log(`Old Governor: ${oldGovernor}`);
  console.log(`New Governor: ${newGovernor}`);
  console.log(`Signer: ${signer.address}\n`);

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
    "function setGovernanceParams(uint256,uint256,uint256,uint256) external",
    "function setVault(address) external",
    "function setRewardsPool(address) external",
    "function setLiquidityManager(address) external",
    "function setInsuranceFund(address) external",
    "function setStabilizer(address) external",
    "function setRevenueRouter(address) external",
    "function setIncentiveController(address) external"
  ];

  const oldGov = new ethers.Contract(oldGovernor, governorAbi, ethers.provider);
  const newGov = new ethers.Contract(newGovernor, governorAbi, signer);

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

  console.log("Configuring governance params...");
  const txParams = await newGov.setGovernanceParams(
    proposalThreshold,
    quorumPercentage,
    votingPeriod,
    timelockDelay,
    { gasLimit: 300000 }
  );
  await txParams.wait();

  console.log("Wiring module addresses...");
  await (await newGov.setVault(vault, { gasLimit: 300000 })).wait();
  await (await newGov.setRewardsPool(rewardsPool, { gasLimit: 300000 })).wait();
  await (await newGov.setLiquidityManager(liquidityManager, { gasLimit: 300000 })).wait();
  await (await newGov.setInsuranceFund(insuranceFund, { gasLimit: 300000 })).wait();
  await (await newGov.setStabilizer(stabilizer, { gasLimit: 300000 })).wait();
  await (await newGov.setRevenueRouter(revenueRouter, { gasLimit: 300000 })).wait();
  await (await newGov.setIncentiveController(incentiveController, { gasLimit: 300000 })).wait();

  console.log("✅ Governor configured");

  const updated = {
    ...deployment,
    contracts: {
      ...deployment.contracts,
      governor: newGovernor,
    },
  };

  const filename = `deployment-lzv2-resume-base-governorfix-${Date.now()}.json`;
  const filepath = path.join(process.cwd(), "deploy", filename);
  fs.writeFileSync(filepath, JSON.stringify(updated, null, 2));
  console.log(`\n📄 Updated deployment saved: ${filename}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Configure governor failed:", error);
  process.exit(1);
});
