import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const txHash = "0xc8d267e59bb7f9acd0df9f9e8302c4f869c555e0ebbcfc76fd31cfba5b457006";
  
  console.log("🔍 Checking transaction:", txHash);
  
  const provider = ethers.provider;
  const receipt = await provider.getTransactionReceipt(txHash);
  
  if (!receipt) {
    console.log("⏳ Transaction pending...");
    
    // Wait for it
    console.log("⏳ Waiting for confirmation...");
    const tx = await provider.getTransaction(txHash);
    if (tx) {
      const confirmed = await tx.wait();
      console.log("\n✅ Transaction confirmed!");
      console.log("Block:", confirmed.blockNumber);
      console.log("Gas Used:", confirmed.gasUsed.toString());
      console.log("Status:", confirmed.status === 1 ? "SUCCESS" : "FAILED");
      console.log("Contract Address:", confirmed.contractAddress);
      
      if (confirmed.status === 1 && confirmed.contractAddress) {
        // Verify contract
        const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
        const contract = OFT.attach(confirmed.contractAddress);
        
        console.log("\n--- Contract Details ---");
        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Supply:", ethers.formatEther(supply), "ONBT");
        console.log("\n🎉 Modular ONBT deployed successfully!");
      }
    }
  } else {
    console.log("\n✅ Transaction confirmed!");
    console.log("Block:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("Status:", receipt.status === 1 ? "SUCCESS" : "FAILED");
    console.log("Contract Address:", receipt.contractAddress);
    
    if (receipt.status === 1 && receipt.contractAddress) {
      const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
      const contract = OFT.attach(receipt.contractAddress);
      
      console.log("\n--- Contract Details ---");
      const name = await contract.name();
      const symbol = await contract.symbol();
      const supply = await contract.totalSupply();
      const owner = await contract.owner();
      
      console.log("Name:", name);
      console.log("Symbol:", symbol);
      console.log("Supply:", ethers.formatEther(supply), "ONBT");
      console.log("Owner:", owner);
      console.log("\n🎉 Modular ONBT deployed successfully!");
    }
  }
}

main().catch(console.error);
