import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         FRESH ONBT REDEPLOYMENT (Bypass Mode)            ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("📝 Deployer:", deployer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.005")) {
    console.error("\n❌ Insufficient balance");
    process.exit(1);
  }
  
  console.log("\n🔨 Preparing deployment...");
  
  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  // Get the bytecode
  const bytecode = OFT.bytecode;
  console.log("📦 Bytecode size:", bytecode.length / 2, "bytes");
  
  // Encode constructor args
  const constructorArgs = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address", "uint256", "string", "string", "string", "string"],
    [
      "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
      deployer.address,
      ethers.parseEther("1000000000"),
      "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
      "https://nabat.finance",
      "ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero. It enables seamless cross-chain transfers across multiple blockchains with a fixed supply of 1 billion tokens and professional branding. Deployed via peer configuration, no proxies needed.",
      JSON.stringify({
        twitter: "https://twitter.com/nabatfinance",
        telegram: "https://t.me/nabatfinance",
        discord: "https://discord.gg/nabatfinance",
        github: "https://github.com/acegrant99/ONBT-App",
        medium: "https://medium.com/@nabatfinance"
      })
    ]
  );
  
  const deployData = bytecode + constructorArgs.slice(2);
  
  console.log("📤 Sending deployment transaction...");
  
  const tx = await deployer.sendTransaction({
    data: deployData,
    gasLimit: 5000000,
    value: 0
  });
  
  console.log("✅ TX Sent:", tx.hash);
  console.log("⏳ Waiting for confirmation (this may take 20-30 seconds)...\n");
  
  // Wait with timeout
  let receipt = null;
  let attempts = 0;
  const maxAttempts = 60; // 60 attempts * 5 seconds = 5 minutes
  
  while (!receipt && attempts < maxAttempts) {
    try {
      receipt = await ethers.provider.getTransactionReceipt(tx.hash);
      if (receipt) {
        console.log("✅ Transaction confirmed!");
        break;
      }
    } catch (e) {
      // Ignore errors during polling
    }
    
    if (!receipt) {
      attempts++;
      if (attempts % 6 === 0) { // Print every 30 seconds
        console.log(`⏳ Still waiting... (${attempts * 5}s)`);
      }
      await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
    }
  }
  
  if (!receipt) {
    console.log("\n⚠️  Transaction not confirmed within 5 minutes");
    console.log("TX Hash:", tx.hash);
    console.log("Check status manually on BaseScan");
    process.exit(1);
  }
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                   ✅ DEPLOYMENT SUCCESS!                  ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📍 NEW Contract Address:", receipt.contractAddress);
  console.log("🔗 TX Hash:            ", tx.hash);
  console.log("📦 Block Number:       ", receipt.blockNumber);
  console.log("⛽ Gas Used:           ", receipt.gasUsed.toString());
  console.log("✅ Status:             ", receipt.status === 1 ? "SUCCESS" : "FAILED");
  
  // Verify contract
  if (receipt.contractAddress) {
    try {
      const contract = await ethers.getContractAt("OmnichainNabatOFT", receipt.contractAddress);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const supply = await contract.totalSupply();
      const owner = await contract.owner();
      
      console.log("\n--- Contract Verification ---");
      console.log("Name:   ", name);
      console.log("Symbol: ", symbol);
      console.log("Supply: ", ethers.formatEther(supply), "ONBT");
      console.log("Owner:  ", owner);
      
      // Save deployment info
      const deploymentInfo = {
        network: network.name,
        chainId: network.chainId,
        address: receipt.contractAddress,
        txHash: tx.hash,
        deployer: deployer.address,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        timestamp: new Date().toISOString(),
        status: "SUCCESS"
      };
      
      fs.writeFileSync(
        "deployment-onbt-8453-latest.json",
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("\n✅ Deployment info saved to deployment-onbt-8453-latest.json");
      console.log("\n🎉 Fresh OmnichainNabatOFT successfully deployed!");
      
    } catch (error) {
      console.log("\n⚠️  Contract verification failed:", error.message);
    }
  }
}

main().catch(error => {
  console.error("\n❌ Deployment failed:", error.message);
  process.exit(1);
});
