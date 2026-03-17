import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0x0330753299d4ee726d2992ea2c3367f7686fcf78ad05951240a06215a325a02b";
  
  console.log("Checking deployment...");
  console.log("TX: https://basescan.org/tx/" + txHash + "\n");
  
  const receipt = await ethers.provider.getTransactionReceipt(txHash);
  
  if (!receipt) {
    console.log("⏳ Still pending...");
    return;
  }
  
  console.log("✅ Confirmed!");
  console.log("Block:", receipt.blockNumber);
  console.log("Status:", receipt.status === 1 ? "✅ SUCCESS" : "❌ FAILED");
  console.log("Gas Used:", receipt.gasUsed.toString(), "/ 1500000");
  
  if (receipt.status === 1 && receipt.contractAddress) {
    console.log("\n🎉 DEPLOYMENT SUCCESS!\n");
    console.log("Contract: " + receipt.contractAddress);
    console.log("BaseScan: https://basescan.org/address/" + receipt.contractAddress);
    console.log("\nNetwork: Base (Chain 8453)");
    console.log("Deployer: 0x44497B9FF645A995b18967b34eFeFDe82AeC8144");
  } else if (receipt.status === 0) {
    console.log("\n❌ Transaction failed (out of gas or revert)");
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
