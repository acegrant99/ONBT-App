import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const formatEther = (value) =>
    ethers.formatEther ? ethers.formatEther(value) : ethers.utils.formatEther(value);
  const txHash = process.env.TX_HASH || process.argv[2] || "0x77233011815c2a9ef4c8903c3e1dc4a9c66b555fb26c2fab2f71d91027601685";
  
  console.log("Analyzing failed transaction...\n");
  
  const tx = await ethers.provider.getTransaction(txHash);
  const receipt = await ethers.provider.getTransactionReceipt(txHash);
  
  if (!tx || !receipt) {
    console.log("❌ Transaction not found on this network.");
    return;
  }

  console.log("TX Data (constructor call):");
  console.log("Input:", tx.data ? tx.data.substring(0, 130) + "..." : "<no data>");
  console.log("Value:", formatEther(tx.value), "ETH");
  console.log("Gas Limit:", tx.gasLimit.toString());
  console.log("Gas Used:", receipt.gasUsed.toString());
  
  const gasUsedPercent = (Number(receipt.gasUsed) / Number(tx.gasLimit)) * 100;
  console.log("Gas Used %:", gasUsedPercent.toFixed(1) + "%");
  
  if (gasUsedPercent > 99) {
    console.log("\n⚠️  OUT OF GAS - Contract needs more gas limit");
  } else {
    console.log("\n⚠️  Constructor reverted - possible issue:");
    console.log("   - Invalid LayerZero endpoint");
    console.log("   - Storage initialization failure");
    console.log("   - Inheritance chain issue");
  }
  
  console.log("\n💡 Trying to decode revert reason...");
  try {
    // Try to replay and get the revert data
    await ethers.provider.call(tx, receipt.blockNumber - 1);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
