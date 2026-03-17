import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("\n🔍 Debugging quoteSend call...\n");
  console.log("Signer:", signer.address);
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Check basic info
  const balance = await oft.balanceOf(signer.address);
  const peer = await oft.peers(ARBITRUM_EID);
  
  console.log("Balance:", ethers.formatEther(balance), "ONBT");
  console.log("Peer set:", peer !== ethers.ZeroHash ? "✅" : "❌");
  console.log("Peer:", peer, "\n");
  
  // Try with minimal amount
  const amount = ethers.parseEther("1"); // Just 1 ONBT
  const recipient = signer.address;
  const recipientBytes32 = ethers.zeroPadValue(recipient, 32);
  
  console.log("Amount:", ethers.formatEther(amount), "ONBT");
  console.log("Recipient:", recipient);
  console.log("Recipient (bytes32):", recipientBytes32, "\n");
  
  // Try different SendParam formats
  console.log("Attempting quoteSend with standard params...");
  
  try {
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: recipientBytes32,
      amountLD: amount,
      minAmountLD: amount,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    console.log("SendParam:", JSON.stringify(sendParam, (k, v) => 
      typeof v === 'bigint' ? v.toString() : v, 2));
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log("\n✅ Quote successful!");
    console.log("Native fee:", ethers.formatEther(fee.nativeFee), "ETH");
    console.log("LZ token fee:", ethers.formatEther(fee.lzTokenFee));
  } catch (e) {
    console.error("\n❌ quoteSend failed:", e.message);
    
    // Try to get more details
    if (e.data) {
      console.log("Error data:", e.data);
    }
    
    // Check if there's an enforced options issue
    console.log("\n🔍 Checking enforced options...");
    try {
      const enforcedOptions = await oft.enforcedOptions(ARBITRUM_EID, 1);
      console.log("Enforced options:", enforcedOptions);
      
      if (enforcedOptions && enforcedOptions !== "0x") {
        console.log("\n💡 Trying with enforced options in extraOptions...");
        const sendParam2 = {
          dstEid: ARBITRUM_EID,
          to: recipientBytes32,
          amountLD: amount,
          minAmountLD: amount,
          extraOptions: enforcedOptions,
          composeMsg: "0x",
          oftCmd: "0x"
        };
        
        const fee2 = await oft.quoteSend(sendParam2, false);
        console.log("✅ Quote with enforced options successful!");
        console.log("Native fee:", ethers.formatEther(fee2.nativeFee), "ETH");
      }
    } catch (e2) {
      console.error("Could not check enforced options:", e2.message);
    }
    
    // Check endpoint
    console.log("\n🔍 Checking endpoint...");
    try {
      const endpoint = await oft.endpoint();
      console.log("Endpoint:", endpoint);
      
      const expectedEndpoint = "0x1a44076050125825900e736c501f859c50fE728c";
      if (endpoint.toLowerCase() !== expectedEndpoint.toLowerCase()) {
        console.log("⚠️  Endpoint mismatch!");
        console.log("Expected:", expectedEndpoint);
      }
    } catch (e3) {
      console.error("Could not check endpoint:", e3.message);
    }
  }
}

main().catch(console.error);
