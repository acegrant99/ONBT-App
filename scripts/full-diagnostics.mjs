import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("\n🔍 Comprehensive Diagnostics\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Test basic reads
  console.log("1. Basic Contract Info:");
  const name = await oft.name();
  const symbol = await oft.symbol();
  const balance = await oft.balanceOf(signer.address);
  const peer = await oft.peers(ARBITRUM_EID);
  const endpoint = await oft.endpoint();
  const owner = await oft.owner();
  
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Balance:", ethers.formatEther(balance));
  console.log("   Peer:", peer);
  console.log("   Endpoint:", endpoint);
  console.log("   Owner:", owner);
  console.log("   Signer:", signer.address);
( "   Is Owner:", owner === signer.address ? "✅" : "❌");
  
  // Check endpoint contract
  console.log("\n2. Endpoint Check:");
  const lzEndpoint = await ethers.getContractAt([
    "function eid() external view returns (uint32)"
  ], endpoint);
  
  try {
    const eid = await lzEndpoint.eid();
    console.log("   Local EID:", eid);
  } catch (e) {
    console.log("   Could not get EID");
  }
  
  // Try to get the ABI and check available functions
  console.log("\n3. Checking OFT Functions:");
  const fragment = oft.interface.getFunction("quoteSend");
  console.log("   quoteSend exists:", fragment ? "✅" : "❌");
  
  if (fragment) {
    console.log("   quoteSend signature:", fragment.format());
  }
  
  // Check if there's a simpler send function
  console.log("\n4. Testing Different Approaches:");
  
  // Approach 1: Try with empty everything
  console.log("   a) Minimal params with 0 amount:");
  try {
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: 0, // Test with 0
      minAmountLD: 0,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log("      ✅ Works with 0 amount!");
    console.log("      Fee:", ethers.formatEther(fee.nativeFee), "ETH");
  } catch (e) {
    console.log("      ❌ Failed:", e.message.substring(0, 50));
  }
  
  // Approach 2: Try with 1 wei
  console.log("   b) With 1 wei:");
  try {
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: 1,
      minAmountLD: 1,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log("      ✅ Works with 1 wei!");
    console.log("      Fee:", ethers.formatEther(fee.nativeFee), "ETH");
  } catch (e) {
    console.log("      ❌ Failed:", e.message.substring(0, 50));
  }
  
  // Check if sharedDecimals might be causing issues
  console.log("\n5. Checking Shared Decimals:");
  try {
    const sharedDecimals = await oft.sharedDecimals();
    const decimals = await oft.decimals();
    console.log("   Decimals:", decimals);
    console.log("   Shared Decimals:", sharedDecimals);
    
    // Calculate the conversion rate
    const decimalConversion = 10 ** (Number(decimals) - Number(sharedDecimals));
    console.log("   Conversion factor:", decimalConversion);
    
    // Try with amount adjusted for shared decimals
    console.log("\n6. Testing with shared decimals adjustment:");
    const amount = ethers.parseEther("100"); // 100 ONBT in LD
    const amountSD = amount / BigInt(decimalConversion); // Convert to SD
    
    console.log("   Amount LD:", amount.toString());
    console.log("  Amount SD:", amountSD.toString());
    
    try {
      const sendParam = {
        dstEid: ARBITRUM_EID,
        to: ethers.zeroPadValue(signer.address, 32),
        amountLD: amount,
        minAmountLD: amountSD * BigInt(decimalConversion), // minAmount should be in LD but account for SD loss
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x"
      };
      
      const fee = await oft.quoteSend(sendParam, false);
      console.log("      ✅ Success!");
      console.log("      Fee:", ethers.formatEther(fee.nativeFee), "ETH");
    } catch (e) {
      console.log("      ❌ Still failed");
    }
  } catch (e) {
    console.log("   Could not get shared decimals");
  }
}

main().catch(console.error);
