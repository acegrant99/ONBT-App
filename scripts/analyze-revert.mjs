import hre from "hardhat";

const { ethers } = hre;

async function checkTransaction() {
  const txHash = "0xf68423475c57362c2a55f0cf438996b2556a6d05aedd6c0000700596db4525b8";
  
  console.log("\n🔍 Analyzing failed transaction...\n");
  console.log("TX:", txHash);
  
  try {
    const provider = ethers.provider;
    const tx = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);
    
    console.log("\n📋 Transaction Details:");
    console.log("   From:", tx.from);
    console.log("   To:", tx.to);
    console.log("   Gas Used:", receipt.gasUsed.toString());
    console.log("   Status:", receipt.status === 1 ? "✅ Success" : "❌ Failed");
    
    if (receipt.status === 0) {
      console.log("\n⚠️  Transaction reverted");
      
      // Try to decode the revert reason
      try {
        const code = await provider.call(tx, tx.blockNumber);
        console.log("   Revert data:", code);
      } catch (error) {
        console.log("   Revert reason:", error.reason || error.message);
        
        if (error.data) {
          // Try to decode custom error
          const errorData = error.data;
          console.log("   Error data:", errorData);
          
          // Check for common LayerZero errors
          if (errorData.includes("0x")) {
            const sig = errorData.slice(0, 10);
            console.log("   Error signature:", sig);
            
            const knownErrors = {
              "0x6a5cfb6d": "PayloadTooLarge()",
              "0x82b42900": "Unauthorized()",
              "0x3ee5aeb5": "OnlyOwner()",
              "0xa8e4d30d": "OnlyDelegate()",
            };
            
            if (knownErrors[sig]) {
              console.log("   Decoded error:", knownErrors[sig]);
            }
          }
        }
      }
    }
    
    console.log("\n🔗 View on BaseScan:");
    console.log(`   https://basescan.org/tx/${txHash}\n`);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkTransaction().catch(console.error);
