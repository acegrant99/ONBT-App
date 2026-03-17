import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0x77233011815c2a9ef4c8903c3e1dc4a9c66b555fb26c2fab2f71d91027601685";
  
  console.log("Checking deployment transaction...");
  console.log("TX Hash:", txHash);
  console.log("BaseScan: https://basescan.org/tx/" + txHash + "\n");
  
  const receipt = await ethers.provider.getTransactionReceipt(txHash);
  
  if (!receipt) {
    console.log("⏳ Transaction pending...");
    return;
  }
  
  console.log("✅ Transaction Confirmed!");
  console.log("Block:", receipt.blockNumber);
  console.log("Status:", receipt.status === 1 ? "✅ SUCCESS" : "❌ FAILED");
  console.log("Gas Used:", receipt.gasUsed.toString());
  
  if (receipt.contractAddress) {
    console.log("\n🎉 CONTRACT DEPLOYED!");
    console.log("Address:", receipt.contractAddress);
    console.log("BaseScan: https://basescan.org/address/" + receipt.contractAddress);
    
    // Verify contract details
    const contract = await ethers.getContractAt("OmnichainNabatOFT", receipt.contractAddress);
    
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const supply = await contract.totalSupply();
      const owner = await contract.owner();
      
      console.log("\n📋 Contract Details:");
      console.log("Name:", name);
      console.log("Symbol:", symbol);
      console.log("Supply:", ethers.formatEther(supply), "ONBT");
      console.log("Owner:", owner);
    } catch (error) {
      console.log("\n⚠️ Could not verify contract (may need indexing)");
    }
  } else {
    console.log("❌ Contract creation failed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
