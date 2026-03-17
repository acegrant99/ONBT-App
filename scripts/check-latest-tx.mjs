import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0xa94fefbddc91cdb5fdda4f13c22aa81a8b38b7bb44a0584b4becb877963b9b8c";
  
  console.log("Checking transaction:", txHash, "\n");
  
  try {
    const receipt = await ethers.provider.getTransactionReceipt(txHash);
    
    if (!receipt) {
      console.log("⏳ Transaction pending (not yet mined)");
      return;
    }
    
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("Status:", receipt.status === 1 ? "✅ SUCCESS" : "❌ FAILED");
    console.log("Contract Address:", receipt.contractAddress || "N/A");
    
    if (receipt.status === 1 && receipt.contractAddress) {
      console.log("\n✨ Deployment Successful!");
      console.log("Contract:", receipt.contractAddress);
      console.log("BaseScan: https://basescan.org/address/" + receipt.contractAddress);
    } else if (receipt.status === 0) {
      console.log("\n❌ Transaction failed/reverted");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main().catch(console.error);
