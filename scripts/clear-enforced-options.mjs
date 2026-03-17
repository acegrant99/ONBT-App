import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("\n🔧 Removing enforced options to test...\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Try to clear enforced options
  const emptyOptions = [{
    eid: ARBITRUM_EID,
    msgType: 1,
    options: "0x"
  }];
  
  console.log("Setting empty enforced options...");
  
  try {
    const tx = await oft.setEnforcedOptions(emptyOptions);
    console.log("TX Hash:", tx.hash);
    await tx.wait();
    console.log("✅ Enforced options cleared\n");
    
    // Now try quote again
    console.log("Testing quote with no enforced options...");
    const amount = ethers.parseEther("100");
    
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: amount,
      minAmountLD: amount,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log("✅ Quote successful!");
    console.log("Native fee:", ethers.formatEther(fee.nativeFee), "ETH");
    
  } catch (e) {
    console.error("❌ Error:", e.message);
    
    if (e.message.includes("0x6780cfaf")) {
      console.log("\n🔍 Error 0x6780cfaf analysis:");
      console.log("This is likely InvalidOptions or similar error from LayerZero");
      console.log("\nLet me try manually calculating the options...");
      
      // Try with manually specified options
      try {
        // Type 3 options: 0x0003 + gas(uint128) + value(uint128)
        const gasLimit = 200000;
        const manualOptions = ethers.solidityPacked(
          ["uint16", "uint128", "uint128"],
          [3, gasLimit, 0]
        );
        
        console.log("Manual options:", manualOptions);
        
        const sendParam2 = {
          dstEid: ARBITRUM_EID,
          to: ethers.zeroPadValue(signer.address, 32),
          amountLD: amount,
          minAmountLD: amount,
          extraOptions: manualOptions,
          composeMsg: "0x",
          oftCmd: "0x"
        };
        
        const fee2 = await oft.quoteSend(sendParam2, false);
        console.log("\n✅ Quote with manual options successful!");
        console.log("Native fee:", ethers.formatEther(fee2.nativeFee), "ETH");
      } catch (e2) {
        console.error("Manual options also failed:", e2.message);
      }
    }
  }
}

main().catch(console.error);
