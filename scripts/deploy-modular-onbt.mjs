import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║       ONBT Modular Architecture Deployment - Base        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log("📝 Deployer:", deployer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})`);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.005")) {
    console.error("\n❌ Insufficient balance for deployment");
    console.error("   Need at least 0.005 ETH");
    process.exit(1);
  }
  
  console.log("\n🔨 Deploying OmnichainNabatOFT (Optimized Architecture)...");
  console.log("   - Storage Module: OmnichainNabatStorage");
  console.log("   - Tracking Module: OmnichainNabatTracking");
  console.log("   - Core OFT: LayerZero V2 cross-chain functionality");
  
  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  const socialLinks = {
    twitter: "https://x.com/NBT_V2",
    telegram: "https://t.me/NabatOmnichainGenesisGovernment",
    github: "https://github.com/acegrant99/ONBT-App"
  };
  
  console.log("\n📋 Deployment Parameters:");
  console.log("   LayerZero Endpoint:", "0x1a44076050125825900e736c501f859c50fE728c");
  console.log("   Delegate:", deployer.address);
  console.log("   Initial Supply:", "1,000,000,000 ONBT");
  console.log("   Logo URI:", process.env.ONBT_LOGO_URI || "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy");
  console.log("   Website:", process.env.ONBT_WEBSITE || "https://nabat.finance");
  
  const contract = await OFT.deploy(
    "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 universal endpoint
    deployer.address,
    ethers.parseEther("1000000000"),
    process.env.ONBT_LOGO_URI || "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
    process.env.ONBT_WEBSITE || "https://nabat.finance",
    process.env.ONBT_DESCRIPTION || "Omnichain Nabat (ONBT) is an immutable omnichain fungible token",
    process.env.ONBT_SOCIAL_LINKS || JSON.stringify(socialLinks),
    { gasLimit: 5000000 }
  );
  
  const deploymentTx = contract.deploymentTransaction();
  console.log("\n✅ Transaction Sent:", deploymentTx.hash);
  console.log("⏳ Waiting for confirmation...\n");
  
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║              ✅ DEPLOYMENT SUCCESS!                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 TX Hash:", deploymentTx.hash);
  
  // Verify deployment
  console.log("\n--- Verifying Deployment ---");
  const name = await contract.name();
  const symbol = await contract.symbol();
  const supply = await contract.totalSupply();
  const owner = await contract.owner();
  const totalSupply = await contract.TOTAL_SUPPLY();
  const deploymentTime = await contract.DEPLOYMENT_TIME();
  
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", await contract.decimals());
  console.log("Total Supply:", ethers.formatEther(totalSupply), "ONBT");
  console.log("Current Supply:", ethers.formatEther(supply), "ONBT");
  console.log("Owner:", owner);
  console.log("Deployment Time:", new Date(Number(deploymentTime) * 1000).toISOString());
  
  // Test modular features
  console.log("\n--- Testing Modular Features ---");
  
  // Check governance module
  const paused = await contract.paused();
  console.log("✓ Governance: Pausable - Status:", paused ? "Paused" : "Active");
  
  // Check tracking module
  const holderCount = await contract.holderCount();
  const peakSupply = await contract.peakLocalSupply();
  console.log("✓ Tracking: Holder Count:", holderCount.toString());
  console.log("✓ Tracking: Peak Supply:", ethers.formatEther(peakSupply), "ONBT");
  
  // Check snapshot module
  const snapshotId = await contract.getCurrentSnapshotId();
  console.log("✓ Snapshot: Current ID:", snapshotId.toString());
  
  // Check votes module
  const votes = await contract.getVotes(deployer.address);
  console.log("✓ Votes: Deployer Voting Power:", ethers.formatEther(votes), "ONBT");
  
  // Check permit module (domain separator exists)
  const domain = await contract.DOMAIN_SEPARATOR();
  console.log("✓ Permit: Domain Separator:", domain.substring(0, 10) + "...");
  
  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    address: contractAddress,
    txHash: deploymentTx.hash,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    modules: [
      "OmnichainNabatStorage",
      "OmnichainNabatGovernance",
      "OmnichainNabatTracking",
      "OmnichainNabatPermit",
      "OmnichainNabatSnapshot",
      "OmnichainNabatVotes"
    ],
    contract: {
      name: name,
      symbol: symbol,
      totalSupply: ethers.formatEther(totalSupply),
      owner: owner,
      deploymentTime: Number(deploymentTime)
    }
  };
  
  const filename = `deployment-onbt-modular-${network.chainId}-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n✅ Deployment info saved to:", filename);
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                   NEXT STEPS                              ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("\n1. Verify contract on BaseScan:");
  console.log(`   npx hardhat verify --network base ${contractAddress}`);
  console.log(`   --constructor-args verify-args-modular.js`);
  console.log("\n2. Configure LayerZero peers for cross-chain:");
  console.log("   - Set trusted remotes on Arbitrum");
  console.log("   - Configure DVN settings");
  console.log("   - Test cross-chain transfers");
  console.log("\n3. Optional governance setup:");
  console.log("   - Enable rate limiting if needed");
  console.log("   - Configure transfer hooks");
  console.log("   - Set preferred chain routes");
  console.log("\n🎉 Modular ONBT successfully deployed on Base!");
}

main().catch(error => {
  console.error("\n❌ Deployment failed:", error.message);
  console.error(error);
  process.exit(1);
});
