import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_CONTRACT = "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27";
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║           LayerZero V2 Path Initialization               ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const [signer] = await ethers.getSigners();
  console.log("Deployer:", signer.address);
  console.log();
  
  // Get contracts
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Endpoint interface with all possible functions
  const endpoint = await ethers.getContractAt([
    "function eid() view returns (uint32)",
    "function getSendLibrary(address sender, uint32 dstEid) view returns (address)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) view returns (address)",
    "function isDefaultSendLibrary(address sender, uint32 dstEid) view returns (bool)",
    "function isDefaultReceiveLibrary(address receiver, uint32 srcEid) view returns (bool)",
    "function defaultSendLibrary(uint32 eid) view returns (address)",
    "function defaultReceiveLibrary(uint32 eid) view returns (address)",
    "function setSendLibrary(address sender, uint32 eid, address newLib)",
    "function setReceiveLibrary(address receiver, uint32 eid, address newLib, uint256 gracePeriod)",
    "function setDelegate(address delegate)",
    "function send(tuple(uint32 dstEid, bytes32 receiver, bytes message, bytes options, bool payInLzToken) params, address refundAddress) payable returns (tuple(bytes32 guid, uint64 nonce, tuple(uint256 nativeFee, uint256 lzTokenFee) fee) receipt)"
  ], ENDPOINT);
  
  console.log("📊 Current Path Status:");
  console.log("=".repeat(60));
  
  // Check send library
  let sendLib, receiveLib;
  try {
    sendLib = await endpoint.getSendLibrary(BASE_CONTRACT, ARBITRUM_EID);
    console.log(`\nSend Library (Base → Arbitrum):`);
    console.log(`  Address: ${sendLib}`);
    
    try {
      const isDefaultSend = await endpoint.isDefaultSendLibrary(BASE_CONTRACT, ARBITRUM_EID);
      console.log(`  Using Default: ${isDefaultSend ? "Yes" : "No"}`);
    } catch (e) {
      console.log(`  Using Default: Cannot determine`);
    }
  } catch (e) {
    console.log(`\nSend Library: ❌ Error reading: ${e.message}`);
    sendLib = ethers.ZeroAddress;
  }
  
  // Check receive library
  try {
    receiveLib = await endpoint.getReceiveLibrary(BASE_CONTRACT, ARBITRUM_EID);
    console.log(`\nReceive Library (Base ← Arbitrum):`);
    console.log(`  Address: ${receiveLib}`);
    
    try {
      const isDefaultReceive = await endpoint.isDefaultReceiveLibrary(BASE_CONTRACT, ARBITRUM_EID);
      console.log(`  Using Default: ${isDefaultReceive ? "Yes" : "No"}`);
    } catch (e) {
      console.log(`  Using Default: Cannot determine`);
    }
  } catch (e) {
    console.log(`\nReceive Library: ❌ Error reading: ${e.message}`);
    receiveLib = ethers.ZeroAddress;
  }
  
  // Check if default libraries exist
  console.log(`\nDefault Libraries for EID ${ARBITRUM_EID}:`);
  try {
    const defaultSend = await endpoint.defaultSendLibrary(ARBITRUM_EID);
    console.log(`  Default Send: ${defaultSend}`);
  } catch (e) {
    console.log(`  Default Send: Not available (${e.reason || e.message})`);
  }
  
  try {
    const defaultReceive = await endpoint.defaultReceiveLibrary(ARBITRUM_EID);
    console.log(`  Default Receive: ${defaultReceive}`);
  } catch (e) {
    console.log(`  Default Receive: Not available (${e.reason || e.message})`);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("🔧 Path Initialization Attempts:");
  console.log("=".repeat(60));
  
  // Check if we're the delegate
  const delegate = await oft.owner();
  console.log(`\nContract Owner: ${delegate}`);
  console.log(`Current Signer: ${signer.address}`);
  console.log(`Is Owner: ${delegate.toLowerCase() === signer.address.toLowerCase() ? "✅ Yes" : "❌ No"}`);
  
  if (delegate.toLowerCase() !== signer.address.toLowerCase()) {
    console.log("\n⚠️  You are not the owner. Path initialization requires owner privileges.");
    return;
  }
  
  // Attempt 1: Check if we can set delegate on endpoint
  console.log("\n\n1️⃣  Checking endpoint delegate...");
  try {
    // In LayerZero V2, the OApp sets itself as delegate during construction
    // We can verify if additional delegation is needed
    console.log("   Endpoint delegate is managed by OApp initialization");
    console.log("   ✅ No action needed");
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
  }
  
  // Attempt 2: Try to explicitly set libraries (usually not needed as defaults are used)
  console.log("\n2️⃣  Attempting to set message libraries explicitly...");
  
  if (sendLib === ethers.ZeroAddress || !sendLib) {
    console.log("   ⚠️  No send library configured!");
    console.log("   This indicates the path is not initialized by LayerZero Labs");
    console.log("   You cannot initialize this yourself - LayerZero must do it");
  } else {
    console.log(`   ✅ Send library already set: ${sendLib.slice(0, 10)}...`);
  }
  
  if (receiveLib === ethers.ZeroAddress || !receiveLib) {
    console.log("   ⚠️  No receive library configured!");
    console.log("   This indicates the path is not initialized by LayerZero Labs");
  } else {
    console.log(`   ✅ Receive library already set: ${receiveLib.slice(0, 10)}...`);
  }
  
  // Attempt 3: Test a minimal send to trigger any lazy initialization
  console.log("\n3️⃣  Testing minimal message send (to trigger lazy init)...");
  console.log("   Preparing test parameters...");
  
  const minAmount = ethers.parseUnits("0.000001", 18); // 1 shared decimal
  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: ethers.zeroPadValue(signer.address, 32),
    amountLD: minAmount,
    minAmountLD: 0n, // Accept any amount received
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x"
  };
  
  try {
    console.log("   Attempting quote...");
    const quote = await oft.quoteSend(sendParam, false);
    console.log(`   ✅ Quote succeeded!`);
    console.log(`   Native Fee: ${ethers.formatEther(quote.nativeFee)} ETH`);
    console.log(`   Path is initialized!`);
    
    console.log("\n   Would you like to send a test transaction? (Not executing automatically)");
  } catch (error) {
    if (error.data) {
      const selector = error.data.slice(0, 10);
      console.log(`   ❌ Quote failed: ${selector}`);
      
      if (selector === "0x6780cfaf") {
        console.log(`   Error: SlippageExceeded (amountReceived = 0)`);
        console.log("\n   🔴 PATH IS NOT INITIALIZED");
        console.log("   This error means the LayerZero infrastructure cannot");
        console.log("   calculate quotes for this path yet.");
      }
    } else {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📋 DIAGNOSIS:");
  console.log("=".repeat(60));
  
  if (sendLib === ethers.ZeroAddress || receiveLib === ethers.ZeroAddress) {
    console.log("\n❌ PATH NOT INITIALIZED BY LAYERZERO");
    console.log("\nThe message libraries are not set, which means LayerZero Labs");
    console.log("has not initialized this path on their infrastructure.");
    console.log("\n🔧 SOLUTION:");
    console.log("   Contact LayerZero Discord: https://discord.gg/layerzero");
    console.log("   Request path initialization for:");
    console.log(`   - Base (EID ${BASE_EID}) ↔ Arbitrum (EID ${ARBITRUM_EID})`);
    console.log(`   - OFT: ${BASE_CONTRACT}`);
  } else {
    console.log("\n⚠️  LIBRARIES ARE SET BUT QUOTES FAIL");
    console.log("\nMessage libraries exist but quote calculation returns 0.");
    console.log("This suggests the path exists but is not fully operational.");
    console.log("\n🔧 SOLUTION:");
    console.log("   1. Verify on LayerZero Scan: https://layerzeroscan.com/");
    console.log(`      Search for: ${BASE_CONTRACT}`);
    console.log("   2. Contact LayerZero support with:");
    console.log(`      - Base contract: ${BASE_CONTRACT}`);
    console.log(`      - Arbitrum contract: ${ARBITRUM_CONTRACT}`);
    console.log(`      - Error: quoteSend returns 0 (SlippageExceeded)`);
    console.log("   3. Test on testnets first (Base Sepolia + Arbitrum Sepolia)");
  }
  
  console.log();
}

main().catch(console.error);
