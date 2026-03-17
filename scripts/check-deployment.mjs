import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHashes = [
    "0x3a8ec176328ed37b6c2c9a775ba4bf693c179f0bc62b9c63b6afc0dd8d19b26d",
    "0x22e1f72f849cac2df59aff6926aba869d1ae74d86d97f21fd390a0223af1bed4"
  ];
  
  for (const txHash of txHashes) {
    console.log("\n🔍 Checking transaction:", txHash);
    
    try {
      const receipt = await ethers.provider.getTransactionReceipt(txHash);
      
      if (receipt) {
        console.log("✅ Transaction confirmed!");
        console.log("📍 Contract Address:", receipt.contractAddress);
        console.log("⛽ Gas Used:", receipt.gasUsed.toString());
        console.log("📦 Block:", receipt.blockNumber);
        console.log("✅ Status:", receipt.status === 1 ? "SUCCESS" : "FAILED");
        
        if (receipt.contractAddress && receipt.status === 1) {
          console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
          return receipt.contractAddress;
        }
      } else {
        console.log("⏳ Transaction pending...");
      }
    } catch (error) {
      console.log("⚠️  Error checking:", error.message.slice(0, 100));
    }
  }
}

main().catch(() => process.exit(1));
