import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0x3119a17685c0199dfc9e7862c8aa05dad6c89d9df118ff74ddcab68a329f60b8";
  
  console.log("🔍 Checking transaction:", txHash);
  console.log("Network: Base\n");
  
  try {
    const receipt = await ethers.provider.getTransactionReceipt(txHash);
    
    if (receipt) {
      console.log("✅ Transaction confirmed!");
      console.log("📍 NEW Contract Address:", receipt.contractAddress);
      console.log("⛽ Gas Used:", receipt.gasUsed.toString());
      console.log("📦 Block Number:", receipt.blockNumber);
      console.log("✅ Status:", receipt.status === 1 ? "SUCCESS" : "FAILED");
      
      if (receipt.contractAddress) {
        // Check the contract
        const code = await ethers.provider.getCode(receipt.contractAddress);
        console.log("\n🔧 Contract deployed:", code.length > 2 ? "YES" : "NO");
        console.log("📏 Bytecode size:", (code.length - 2) / 2, "bytes");
        
        // Try to interact with it
        const onbt = await ethers.getContractAt("OmnichainNabatOFT", receipt.contractAddress);
        const name = await onbt.name();
        const symbol = await onbt.symbol();
        const supply = await onbt.totalSupply();
        
        console.log("\n--- Contract Info ---");
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Supply:", ethers.formatEther(supply), "ONBT");
      }
      
      return receipt.contractAddress;
    } else {
      console.log("⏳ Transaction pending or not found");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main()
  .then((address) => {
    if (address) {
      console.log("\n✅ New contract is live at:", address);
    }
  })
  .catch(() => process.exit(1));
