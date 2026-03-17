import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const DEPLOYER = "0x44497B9FF645A995b18967b34eFeFDe82AeC8144";
  
  console.log("Checking recent transactions from deployer:", DEPLOYER);
  console.log("BaseScan link: https://basescan.org/address/" + DEPLOYER);
  
  const balance = await ethers.provider.getBalance(DEPLOYER);
  console.log("\nCurrent Balance:", ethers.formatEther(balance), "ETH");
  
  const txCount = await ethers.provider.getTransactionCount(DEPLOYER);
  console.log("Total txs sent:", txCount);
  
  // Get the last block
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log("Current block:", blockNumber);
  
  // Check for recent contract deployments
  console.log("\n🔍 Checking recent blocks for deployment...");
  for (let i = 0; i < 5; i++) {
    const block = await ethers.provider.getBlock(blockNumber - i);
    const receipts = [];
    
    for (let j = 0; j < block.transactions.length; j++) {
      const tx = block.transactions[j];
      const receipt = await ethers.provider.getTransactionReceipt(tx);
      if (receipt && receipt.from?.toLowerCase() === DEPLOYER.toLowerCase()) {
        console.log(`\nBlock #${block.number}:`);
        console.log("  TX:", receipt.hash);
        console.log("  Type:", receipt.contractAddress ? "Contract Creation" : "Transfer");
        if (receipt.contractAddress) {
          console.log("  Contract:", receipt.contractAddress);
          console.log("  Status:", receipt.status === 1 ? "✅ Success" : "❌ Failed");
        }
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
