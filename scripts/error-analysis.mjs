import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("\n🔍 Deep Dive: Error Code Analysis\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Error selector 0x6780cfaf
  // Let's try to figure out what this is
  console.log("Error code: 0x6780cfaf");
  console.log("Could be:");
  console.log("  - Slippage error");  
  console.log("  - Invalid options");
  console.log("  - Path not initialized");
  console.log("  - Config missing\n");
  
  // Try with 0 amount (should give different error if amount is the issue)
  console.log("Test 1: Zero amount");
  try {
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: 0,
      minAmountLD: 0,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log("✅ Zero amount works! Fee:", ethers.formatEther(fee.nativeFee));
  } catch (e) {
    if (e.data && e.data.startsWith("0x")) {
      console.log("❌ Error:", e.data.substring(0, 10));
      if (e.data !== "0x6780cfaf0000000000000000000000000000000000000000000000000000000000000000") {
        console.log("   Different error! This is progress.");
      }
    } else {
      console.log("❌ Error:", e.message.substring(0, 50));
    }
  }
  
  // Check OFT allowance functionality (maybe we need approval?)
  console.log("\nTest 2: Check if OFT needs self-approval");
  try {
    const allowance = await oft.allowance(signer.address, BASE_CONTRACT);
    console.log("OFT allowance to self:", allowance.toString());
    
    if (allowance === 0n) {
      console.log("Approving OFT to spend own tokens...");
      const amount = ethers.parseEther("1000");
      const tx = await oft.approve(BASE_CONTRACT, amount);
      console.log("TX:", tx.hash);
      await tx.wait();
      console.log("✅ Approved!");
      
      // Try quote again
      console.log("\nRetrying quote...");
      const sendParam = {
        dstEid: ARBITRUM_EID,
        to: ethers.zeroPadValue(signer.address, 32),
        amountLD: ethers.parseEther("100"),
        minAmountLD: ethers.parseEther("100"),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x"
      };
      
      const fee = await oft.quoteSend(sendParam, false);
      console.log("✅ Quote successful after approval!");
      console.log("Fee:", ethers.formatEther(fee.nativeFee), "ETH");
    }
  } catch (e) {
    console.log("Approval test failed:", e.message.substring(0, 50));
  }
  
  // Check if maybe peer address is wrong format
  console.log("\nTest 3: Verify peer address format");
  const peer = await oft.peers(ARBITRUM_EID);
  console.log("Peer (bytes32):", peer);
  
  // Extract address from bytes32
  const peerAddress = "0x" + peer.slice(-40);
  console.log("Peer (address):", peerAddress);
  console.log("Expected:", "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27");
  console.log("Match:", peerAddress.toLowerCase() === "0xa5c3cf591e9ed6a4f3b2667146f630d4c8b08c27" ? "✅" : "❌");
  
  //Try calling the endpoint's send function directly
  console.log("\nTest 4: Try calling _debit internally");
  try {
    // Check if there's a specific debit function we can test
    const balance = await oft.balanceOf(signer.address);
    console.log("Balance:", ethers.formatEther(balance));
    
    // Maybe the issue is we need to set a specific config type
    console.log("\nChecking if we need to set send/receive config...");
    
  } catch (e) {
    console.log("Test failed");
  }
}

main().catch(console.error);
