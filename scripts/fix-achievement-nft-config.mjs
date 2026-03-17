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
  console.log(`CONFIGURATION FIX: ${network.name.toUpperCase()}`);
  console.log("=".repeat(88) + "\n");

  const deployment = loadDeployment(network.name);
  const [signer] = await ethers.getSigners();
  
  console.log(`Using account: ${signer.address}`);
  console.log(`Account balance: ${ethers.utils.formatEther(await signer.getBalance())} ETH\n`);

  // Get contracts
  const stakingIface = new ethers.utils.Interface([
    "function achievementNFT() view returns (address)",
    "function setAchievementNFT(address) external",
    "function owner() view returns (address)"
  ]);
  const staking = new ethers.Contract(deployment.contracts.staking, stakingIface, signer);

  console.log("Contracts:");
  console.log(`  Staking:        ${deployment.contracts.staking}`);
  console.log(`  AchievementNFT: ${deployment.contracts.achievementNFT}\n`);

  // Check current configuration
  console.log("Checking current configuration...");
  const currentNFT = await staking.achievementNFT();
  const owner = await staking.owner();
  
  console.log(`  Current NFT address: ${currentNFT}`);
  console.log(`  Staking owner:       ${owner}`);
  console.log(`  Signer is owner:     ${owner.toLowerCase() === signer.address.toLowerCase()}\n`);

  if (currentNFT.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase()) {
    console.log("✅ AchievementNFT is already correctly configured!");
    console.log("   No action needed.\n");
    return;
  }

  if (currentNFT !== ethers.constants.AddressZero) {
    console.log(`⚠️  AchievementNFT is set to a different address: ${currentNFT}`);
    console.log(`   Expected: ${deployment.contracts.achievementNFT}`);
    console.log(`   This will overwrite the existing configuration.\n`);
  }

  // Check authorization
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.log("❌ ERROR: Signer is not the contract owner!");
    console.log(`   Contract owner: ${owner}`);
    console.log(`   Your address:   ${signer.address}`);
    console.log("\n   Please run this script with the owner's wallet.\n");
    process.exit(1);
  }

  // Estimate gas
  console.log("Estimating gas...");
  try {
    const gasEstimate = await staking.estimateGas.setAchievementNFT(deployment.contracts.achievementNFT);
    console.log(`  Estimated gas: ${gasEstimate.toString()}`);
    
    const gasPrice = await ethers.provider.getGasPrice();
    const estimatedCost = gasEstimate.mul(gasPrice);
    console.log(`  Gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")} gwei`);
    console.log(`  Estimated cost: ${ethers.utils.formatEther(estimatedCost)} ETH\n`);
  } catch (err) {
    console.log(`  ⚠️  Gas estimation failed: ${err.message}`);
    console.log(`     Proceeding anyway...\n`);
  }

  // Execute configuration
  console.log("Setting AchievementNFT address in Staking contract...");
  console.log(`  Transaction: staking.setAchievementNFT("${deployment.contracts.achievementNFT}")\n`);

  try {
    const tx = await staking.setAchievementNFT(deployment.contracts.achievementNFT);
    console.log(`  ✓ Transaction submitted: ${tx.hash}`);
    console.log(`    Waiting for confirmation...\n`);
    
    const receipt = await tx.wait();
    console.log(`  ✅ Transaction confirmed!`);
    console.log(`     Block: ${receipt.blockNumber}`);
    console.log(`     Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`     Status: ${receipt.status === 1 ? "Success" : "Failed"}\n`);

    // Verify configuration
    console.log("Verifying configuration...");
    const newNFT = await staking.achievementNFT();
    const isCorrect = newNFT.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase();
    
    if (isCorrect) {
      console.log(`  ✅ Configuration verified!`);
      console.log(`     AchievementNFT is now set to: ${newNFT}\n`);
      
      console.log("=".repeat(88));
      console.log("SUCCESS: Staking contract is now properly configured for achievement minting.");
      console.log("=".repeat(88) + "\n");
    } else {
      console.log(`  ❌ Configuration mismatch!`);
      console.log(`     Expected: ${deployment.contracts.achievementNFT}`);
      console.log(`     Got:      ${newNFT}\n`);
      process.exit(1);
    }
  } catch (err) {
    console.log(`\n❌ Transaction failed: ${err.message}\n`);
    if (err.error) {
      console.log(`   Error details: ${err.error.message || err.error}\n`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n❌ Script failed:", error.message);
  console.error(error.stack);
  process.exit(1);
});
