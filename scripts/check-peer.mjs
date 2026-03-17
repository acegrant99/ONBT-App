import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
  const ARBITRUM_EID = 30110;
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  console.log("Checking peer for Arbitrum (EID 30110)...");
  
  try {
    const peer = await oft.peers(ARBITRUM_EID);
    console.log("Peer:", peer);
  } catch (e) {
    console.log("Error calling peers():", e.message);
  }
  
  // Try alternative methods
  try {
    console.log("\nTrying isPeer()...");
    const isPeer = await oft.isPeer(ARBITRUM_EID, "0x000000000000000000000000a5c3cf591e9ed6a4f3b2667146f630d4c8b08c27");
    console.log("isPeer:", isPeer);
  } catch (e) {
    console.log("No isPeer() function");
  }
}

main().catch(console.error);
