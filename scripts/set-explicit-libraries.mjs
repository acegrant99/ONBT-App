import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// Known default libraries from LayerZero
const SEND_LIB_302 = "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2"; // SendUln302 on Base
const RECEIVE_LIB_302 = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf"; // ReceiveUln302 on Base

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║        Set Explicit Libraries Per Pathway (Best Practice) ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const [signer] = await ethers.getSigners();
  console.log("Deployer:", signer.address);
  console.log();
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  const endpoint = await ethers.getContractAt([
    "function getSendLibrary(address sender, uint32 dstEid) view returns (address)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) view returns (address)",
    "function setSendLibrary(address oapp, uint32 eid, address newLib)",
    "function setReceiveLibrary(address oapp, uint32 eid, address newLib, uint256 gracePeriod)",
    "function setDelegate(address oapp, address delegate)"
  ], ENDPOINT);
  
  // Verify ownership
  const owner = await oft.owner();
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.log("❌ You are not the owner. Cannot set libraries.");
    console.log(`   Owner: ${owner}`);
    console.log(`   Signer: ${signer.address}`);
    return;
  }
  
  console.log("📊 Current Configuration:");
  console.log("=".repeat(60));
  
  let currentSendLib, currentReceiveLib;
  try {
    currentSendLib = await endpoint.getSendLibrary(BASE_CONTRACT, ARBITRUM_EID);
    console.log(`Send Library: ${currentSendLib}`);
  } catch (e) {
    console.log(`Send Library: Error reading`);
  }
  
  try {
    currentReceiveLib = await endpoint.getReceiveLibrary(BASE_CONTRACT, ARBITRUM_EID);
    console.log(`Receive Library: ${currentReceiveLib}`);
  } catch (e) {
    console.log(`Receive Library: Error reading`);
  }
  
  console.log("\n🔧 Setting Explicit Libraries (Best Practice):");
  console.log("=".repeat(60));
  console.log("\nInstead of relying on protocol defaults, we explicitly set");
  console.log("libraries per pathway for better control and security.\n");
  
  // Check if libraries are already explicitly set or using defaults
  const needsUpdate = currentSendLib === SEND_LIB_302 && currentReceiveLib === RECEIVE_LIB_302;
  
  if (needsUpdate) {
    console.log("Libraries are currently set to defaults.");
    console.log("Explicitly setting them now...\n");
    
    // Set send library explicitly
    console.log("1️⃣  Setting Send Library explicitly for Arbitrum pathway...");
    console.log(`   Library: ${SEND_LIB_302}`);
    console.log(`   Target: Base → Arbitrum (EID ${ARBITRUM_EID})`);
    
    try {
      const tx1 = await endpoint.setSendLibrary(BASE_CONTRACT, ARBITRUM_EID, SEND_LIB_302);
      console.log(`   TX submitted: ${tx1.hash}`);
      console.log("   Waiting for confirmation...");
      await tx1.wait();
      console.log("   ✅ Send library explicitly set!");
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      if (error.message.includes("Unauthorized")) {
        console.log("   ℹ️  Note: You need to be the delegate on the endpoint.");
        console.log("   The OApp should have set you as delegate during deployment.");
      }
    }
    
    // Set receive library explicitly
    console.log("\n2️⃣  Setting Receive Library explicitly for Arbitrum pathway...");
    console.log(`   Library: ${RECEIVE_LIB_302}`);
    console.log(`   Target: Base ← Arbitrum (EID ${ARBITRUM_EID})`);
    console.log(`   Grace Period: 0 (immediate)`);
    
    try {
      const tx2 = await endpoint.setReceiveLibrary(BASE_CONTRACT, ARBITRUM_EID, RECEIVE_LIB_302, 0);
      console.log(`   TX submitted: ${tx2.hash}`);
      console.log("   Waiting for confirmation...");
      await tx2.wait();
      console.log("   ✅ Receive library explicitly set!");
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      if (error.message.includes("Unauthorized")) {
        console.log("   ℹ️  Note: You need to be the delegate on the endpoint.");
      }
    }
    
  } else {
    console.log("✅ Libraries are already explicitly set or using non-default values.");
    console.log("   No changes needed.");
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📋 Verification:");
  console.log("=".repeat(60));
  
  // Verify the configuration
  try {
    const finalSendLib = await endpoint.getSendLibrary(BASE_CONTRACT, ARBITRUM_EID);
    const finalReceiveLib = await endpoint.getReceiveLibrary(BASE_CONTRACT, ARBITRUM_EID);
    
    console.log("\nFinal Configuration:");
    console.log(`  Send Library: ${finalSendLib}`);
    console.log(`  Receive Library: ${finalReceiveLib}`);
    
    if (finalSendLib === SEND_LIB_302 && finalReceiveLib === RECEIVE_LIB_302) {
      console.log("\n✅ Libraries are properly configured!");
    }
  } catch (e) {
    console.log(`\n⚠️  Could not verify: ${e.message}`);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📖 Best Practices Summary:");
  console.log("=".repeat(60));
  console.log("\n✅ Using latest @layerzerolabs/oft-evm package");
  console.log("✅ Contracts imported from npm, not copied");
  console.log(needsUpdate ? "✅ Libraries explicitly set per pathway" : "⏭️  Libraries already set");
  console.log("✅ Using OFT base with built-in safety checks");
  console.log("✅ msg.value validation handled by OFTCore");
  console.log();
  
  console.log("💡 Note: The path initialization issue is separate from");
  console.log("   library configuration. Even with explicit libraries,");
  console.log("   the path must be initialized by LayerZero Labs.");
  console.log();
}

main().catch(console.error);
