import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║    FRESH ONBT REDEPLOYMENT (Ignore Signature Error)      ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log("📝 Deployer:", deployer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})`);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.005")) {
    console.error("❌ Insufficient balance");
    process.exit(1);
  }
  
  console.log("\n🔨 Deploying OmnichainNabatOFT...");
  
  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  let deploymentTx;
  try {
    const contract = await OFT.deploy(
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
      }),
      { gasLimit: 5000000 }
    );
    
    deploymentTx = contract.deploymentTransaction();
    console.log("✅ TX Sent:", deploymentTx.hash);
    console.log("⏳ Waiting for confirmation (ignoring signature errors)...\n");
    
    // Try to wait but catch signature errors
    try {
      await deploymentTx.wait(1);
    } catch (e) {
      if (e.message.includes("yParity")) {
        console.log("⚠️  Ignoring yParity error - transaction was broadcast");
      } else {
        throw e;
      }
    }
    
    let receipt = null;
    let attempts = 0;
    
    // Poll for receipt directly
    while (!receipt && attempts < 120) {
      try {
        receipt = await ethers.provider.getTransactionReceipt(deploymentTx.hash);
        if (receipt) {
          console.log("✅ Transaction confirmed!");
          break;
        }
      } catch (e) {
        // Continue polling
      }
      
      attempts++;
      if (attempts % 12 === 0) {
        console.log(`⏳ Waiting... (${attempts * 2.5}s elapsed)`);
      }
      await new Promise(r => setTimeout(r, 2500));
    }
    
    if (!receipt) {
      console.error("\n❌ Transaction not confirmed within timeout");
      process.exit(1);
    }
    
    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║                 ✅ DEPLOYMENT SUCCESS!                    ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");
    
    console.log("📍 NEW Contract Address:", receipt.contractAddress);
    console.log("🔗 TX Hash:            ", deploymentTx.hash);
    console.log("📦 Block Number:       ", receipt.blockNumber);
    console.log("⛽ Gas Used:           ", receipt.gasUsed.toString());
    console.log("✅ Status:             ", receipt.status === 1 ? "SUCCESS" : "FAILED");
    
    // Verify
    if (receipt.contractAddress && receipt.status === 1) {
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
      
      const deploymentInfo = {
        network: network.name,
        chainId: network.chainId,
        address: receipt.contractAddress,
        txHash: deploymentTx.hash,
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
      
      console.log("\n✅ Deployment info saved");
      console.log("\n🎉 Fresh OmnichainNabatOFT successfully deployed!");
    }
    
  } catch (error) {
    if (!error.message.includes("yParity")) {
      console.error("\n❌ Deployment failed:", error.message);
      console.error(error);
      process.exit(1);
    }
  }
}

main().catch(error => {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
});
