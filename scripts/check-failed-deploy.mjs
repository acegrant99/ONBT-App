import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0x689c3155829e8db910fa5803686a90db50c3e70fa2a0412fe24b62b2e2958cb0";
  
  console.log("Checking failed deployment transaction:", txHash);
  console.log("BaseScan:", `https://basescan.org/tx/${txHash}`);
  
  const tx = await ethers.provider.getTransaction(txHash);
  const receipt = await ethers.provider.getTransactionReceipt(txHash);
  
  console.log("\nTransaction Details:");
  console.log("- From:", tx.from);
  console.log("- To:", tx.to || "Contract Creation");
  console.log("- Gas Limit:", tx.gasLimit.toString());
  console.log("- Gas Used:", receipt.gasUsed.toString());
  console.log("- Status:", receipt.status === 1 ? "Success" : "Failed");
  console.log("- Contract Address:", receipt.contractAddress);
  
  if (receipt.status === 0) {
    console.log("\n❌ Transaction reverted");
    console.log("\nPossible reasons:");
    console.log("1. Constructor logic failed (require/assert)");
    console.log("2. Out of gas (but gas used is less than limit)");
    console.log("3. Invalid constructor parameters");
    console.log("4. Inheritance/interface issues");
    
    // Try to get revert reason by replaying the transaction
    try {
      await ethers.provider.call(tx, receipt.blockNumber - 1);
    } catch (error) {
      console.log("\n📋 Error Details:");
      console.log(error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
