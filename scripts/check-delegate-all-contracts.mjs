import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

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

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║        LayerZero Endpoint Delegate Configuration         ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  console.log(`Network: ${networkKey.toUpperCase()}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Endpoint: ${LZ_ENDPOINT}\n`);

  const endpointAbi = [
    "function delegates(address oapp) external view returns (address)",
    "function setDelegate(address delegate) external",
  ];

  const endpoint = new ethers.Contract(LZ_ENDPOINT, endpointAbi, signer);

  const contractsToCheck = [
    { name: "YieldDistributor", address: deployment.contracts.yieldDistributor },
    { name: "AchievementNFT", address: deployment.contracts.achievementNFT },
    { name: "Staking", address: deployment.contracts.staking },
    { name: "StakingRouter", address: deployment.contracts.stakingRouter },
    { name: "Governor", address: deployment.contracts.governor },
    { name: "Vault", address: deployment.contracts.vault },
    { name: "RewardsPool", address: deployment.contracts.rewardsPool },
  ];

  console.log("═══════════════════════════════════════════════════════════");
  console.log("Checking Delegate Status for All OApps");
  console.log("═══════════════════════════════════════════════════════════\n");

  const needsDelegateUpdate = [];

  for (const contract of contractsToCheck) {
    try {
      const delegate = await endpoint.delegates(contract.address);
      const isSignerDelegate = delegate.toLowerCase() === signer.address.toLowerCase();
      const hasNoDelegate = delegate.toLowerCase() === "0x0000000000000000000000000000000000000000";
      
      console.log(`${contract.name}:`);
      console.log(`  Address: ${contract.address}`);
      console.log(`  Current Delegate: ${delegate}`);
      
      if (isSignerDelegate) {
        console.log(`  ✅ Signer is already delegate\n`);
      } else if (hasNoDelegate) {
        console.log(`  ⚠️  No delegate set - signer can set itself as delegate\n`);
        needsDelegateUpdate.push(contract);
      } else {
        console.log(`  ⚠️  Different delegate set - need contract owner to change\n`);
      }
    } catch (error) {
      console.log(`${contract.name}: ❌ ${error.message}\n`);
    }
  }

  if (needsDelegateUpdate.length > 0) {
    console.log("═══════════════════════════════════════════════════════════");
   console.log("Contracts That Can Be Updated");
    console.log("═══════════════════════════════════════════════════════════\n");
    
    for (const contract of needsDelegateUpdate) {
      console.log(`- ${contract.name}: ${contract.address}`);
    }
    
    console.log(`\nTo set signer as delegate, call on each OApp contract:`);
    console.log(`  OApp.setDelegate("${signer.address}")\n`);
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log("Next Steps for Enforced Options Configuration");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  console.log("Once signer is delegate for each contract:");
  console.log("1. Access LayerZero V2 Endpoint configuration");
  console.log("2. Use SendUln302 contract to set enforced options");
  console.log("3. Configure for each message type per contract\n");
  
  console.log("Alternative: Update contracts to include explicit options");
  console.log("- Follow StakingRouter pattern (_getLzReceiveOptions)");
  console.log("- Pass options directly in _lzSend calls");
  console.log("- Redeploy and rewire contracts\n");

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Delegate Configuration Check                 ║");
  console.log("║                      Complete! ✅                          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
