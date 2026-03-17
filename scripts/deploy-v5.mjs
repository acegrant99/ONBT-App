import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║    FRESH ONBT REDEPLOYMENT (ethers v5 - Stable)          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("📝 Deployer:", deployer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})`);
  
  const balance = await deployer.getBalance();
  console.log("💰 Balance:", ethers.utils.formatEther(balance), "ETH");
  
  if (balance.lt(ethers.utils.parseEther("0.005"))) {
    console.error("\n❌ Insufficient balance");
    process.exit(1);
  }
  
  console.log("\n🔨 Getting contract factory...");
  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  console.log("📤 Deploying OmnichainNabatOFT...\n");
  
  const contract = await OFT.deploy(
    "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    deployer.address,
    ethers.utils.parseEther("1000000000"),
    "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
    "https://nabat.finance",
    "ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero. It enables seamless cross-chain transfers across multiple blockchains with a fixed supply of 1 billion tokens and professional branding. Deployed via peer configuration, no proxies needed.",
    JSON.stringify({
      twitter: "https://twitter.com/nabatfinance",
      telegram: "https://t.me/nabatfinance",
      discord: "https://discord.gg/nabatfinance",
      github: "https://github.com/acegrant99/ONBT-App",
      medium: "https://medium.com/@nabatfinance"
    }),
    { gasLimit: 5000000 }
  );
  
  const txHash = contract.deployTransaction.hash;
  console.log("✅ TX Sent:", txHash);
  console.log("⏳ Waiting for confirmation...\n");
  
  const receipt = await contract.deployed();
  const address = contract.address;
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                 ✅ DEPLOYMENT SUCCESS!                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📍 NEW Contract Address:", address);
  console.log("🔗 TX Hash:            ", txHash);
  console.log("⛽ Status:             ", "CONFIRMED");
  
  // Verify contract
  try {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const owner = await contract.owner();
    
    console.log("\n--- Contract Verification ---");
    console.log("Name:   ", name);
    console.log("Symbol: ", symbol);
    console.log("Supply: ", ethers.utils.formatEther(supply), "ONBT");
    console.log("Owner:  ", owner);
    
    // Save deployment info
    const deploymentInfo = {
      network: network.name,
      chainId: network.chainId,
      address: address,
      txHash: txHash,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      status: "SUCCESS",
      note: "Fresh redeployment with ethers v5"
    };
    
    fs.writeFileSync(
      "deployment-onbt-8453-latest.json",
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    console.log("\n✅ Deployment info saved");
    console.log("\n🎉 Fresh OmnichainNabatOFT successfully deployed!");
    console.log("   Contract is now live on Base mainnet");
    
  } catch (error) {
    console.log("\n⚠️  Verification warning:", error.message);
    console.log("    Contract deployed at:", address);
  }
}

main().catch(error => {
  console.error("\n❌ Deployment failed:", error.message);
  process.exit(1);
});
