import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0xfca8f3e73a2b07e21f40606a1d2365871f3ce83a477babf1b9a76b4bd229b3ac";
  
  console.log("📋 Checking transaction:", txHash);
  
  const provider = ethers.provider;
  const receipt = await provider.getTransactionReceipt(txHash);
  const tx = await provider.getTransaction(txHash);
  
  console.log("\n--- Transaction Details ---");
  console.log("Status:       ", receipt.status === 1 ? "✅ SUCCESS" : "❌ REVERTED");
  console.log("Gas Used:     ", receipt.gasUsed.toString());
  console.log("Gas Price:    ", ethers.formatUnits(receipt.gasPrice, "gwei"), "gwei");
  console.log("Contract Addr:", receipt.contractAddress);
  console.log("Data Length:  ", tx.data.length / 2, "bytes");
  
  // Try to decode revert reason
  console.log("\n--- Deployment Data Sent ---");
  console.log("Data (hex):", tx.data.substring(0, 100) + "...");
  
  if (receipt.status === 0) {
    console.log("\n❌ Transaction reverted!");
    console.log("Gas used:", receipt.gasUsed.toString());
    console.log("\nPossible causes:");
    console.log("1. Constructor parameter mismatch");
    console.log("2. LayerZero endpoint not valid");
    console.log("3. Insufficient gas");
    console.log("4. Owner/deployer validation failure");
  }
}

main().catch(console.error);
