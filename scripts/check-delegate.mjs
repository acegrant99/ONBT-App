import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║           Check Endpoint Delegate Configuration          ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const [signer] = await ethers.getSigners();
  
  const endpoint = await ethers.getContractAt([
    "function delegates(address oapp) view returns (address)"
  ], ENDPOINT);
  
  console.log("Contract:", BASE_CONTRACT);
  console.log("Signer:", signer.address);
  console.log();
  
  try {
    const delegate = await endpoint.delegates(BASE_CONTRACT);
    console.log("Current Endpoint Delegate:", delegate);
    console.log();
    
    if (delegate.toLowerCase() === signer.address.toLowerCase()) {
      console.log("✅ You are the delegate! You can set libraries.");
    } else if (delegate === ethers.ZeroAddress) {
      console.log("⚠️  No delegate set. Need to set delegate first.");
    } else {
      console.log("❌ Someone else is the delegate:", delegate);
      console.log("   You cannot modify settings without being the delegate.");
    }
  } catch (e) {
    console.log("❌ Could not read delegate:", e.message);
  }
}

main().catch(console.error);
