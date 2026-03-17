import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("\n🧪 Final Transfer Attempt\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  const balance = await oft.balanceOf(signer.address);
  console.log("Balance:", ethers.formatEther(balance), "ONBT\n");
  
  const amount = ethers.parseEther("100"); // 100 ONBT
  
  // Try with 0 minAmountLD to bypass slippage
  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: ethers.zeroPadValue(signer.address, 32),
    amountLD: amount,
    minAmountLD: 0, // No minimum - accept any amount
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x"
  };
  
  console.log("Quoting with minAmountLD = 0...");
  
  try {
    const fee = await oft.quoteSend(sendParam, false);
    console.log("✅ Quote successful!");
    console.log("Native fee:", ethers.formatEther(fee.nativeFee), "ETH");
    console.log("LZ token fee:", ethers.formatEther(fee.lzTokenFee));
    
    // Check ETH balance
    const ethBalance = await ethers.provider.getBalance(signer.address);
    console.log("\nETH balance:", ethers.formatEther(ethBalance), "ETH");
    
    if (ethBalance < fee.nativeFee) {
      console.log("❌ Insufficient ETH for fee");
      return;
    }
    
    console.log("\n🚀 Executing transfer...");
    
    const tx = await oft.send(
      sendParam,
      { nativeFee: fee.nativeFee, lzTokenFee: fee.lzTokenFee },
      signer.address,
      { value: fee.nativeFee }
    );
    
    console.log("📤 TX:", tx.hash);
    console.log("⏳ Waiting...");
    
    const receipt = await tx.wait();
    
    console.log("\n✅ SUCCESS!");
    console.log("Block:", receipt.blockNumber);
    console.log("Gas:", receipt.gasUsed.toString());
    
    const newBalance = await oft.balanceOf(signer.address);
    console.log("\nNew balance:", ethers.formatEther(newBalance), "ONBT");
    console.log("Sent:", ethers.formatEther(balance - newBalance), "ONBT");
    
    console.log("\n🔍 LayerZero Scan:");
    console.log(`https://layerzeroscan.com/tx/${tx.hash}`);
    console.log("\n⏰ Check Arbitrum in 2-3 minutes:");
    console.log(`node scripts/check-arbitrum-balance.mjs`);
    
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.data) console.error("Data:", e.data);
  }
}

main().catch(console.error);
