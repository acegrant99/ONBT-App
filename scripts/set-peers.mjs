import hre from "hardhat";
const { ethers } = hre;

/**
 * Set LayerZero V2 Peer Configuration
 * Connects Base OFT ↔ Arbitrum OFT for cross-chain transfers
 */

// Deployments
const BASE_OFT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_OFT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

// LayerZero V2 Endpoint IDs
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

// Helper function to convert address to bytes32
function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         LayerZero V2 Peer Configuration Setup             ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Signer:", signer.address);
  console.log("Network Chain ID:", network.chainId.toString());
  console.log();

  let localOFT, remoteOFT, remoteEid, localName, remoteName;

  // Determine which network we're on
  if (network.chainId === 8453n) {
    // Base
    localOFT = BASE_OFT;
    remoteOFT = ARBITRUM_OFT;
    remoteEid = ARBITRUM_EID;
    localName = "Base";
    remoteName = "Arbitrum";
  } else if (network.chainId === 42161n) {
    // Arbitrum
    localOFT = ARBITRUM_OFT;
    remoteOFT = BASE_OFT;
    remoteEid = BASE_EID;
    localName = "Arbitrum";
    remoteName = "Base";
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log("--- Configuration ---");
  console.log(`Local Network: ${localName}`);
  console.log(`Local OFT: ${localOFT}`);
  console.log(`Remote Network: ${remoteName}`);
  console.log(`Remote OFT: ${remoteOFT}`);
  console.log(`Remote Endpoint ID: ${remoteEid}`);
  console.log();

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  
  // Check owner
  const owner = await oft.owner();
  console.log("OFT Owner:", owner);
  
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.error("\n❌ Error: Signer is not the owner of the OFT");
    console.log("Please use the owner account:", owner);
    process.exit(1);
  }

  console.log("✅ You are the owner\n");

  // Convert remote address to bytes32
  const remoteBytes32 = addressToBytes32(remoteOFT);
  console.log(`Remote address (bytes32): ${remoteBytes32}\n`);

  // Check current peer
  console.log("--- Checking Current Peer Configuration ---");
  try {
    const currentPeer = await oft.peers(remoteEid);
    console.log(`Current peer for EID ${remoteEid}:`, currentPeer);
    
    if (currentPeer === remoteBytes32) {
      console.log("✅ Peer already set correctly!");
      return;
    }
  } catch (error) {
    console.log("No peer currently set");
  }

  // Set peer
  console.log("\n--- Setting Peer ---");
  console.log(`Setting peer: ${localName} → ${remoteName}`);
  console.log(`EID: ${remoteEid}`);
  console.log(`Address: ${remoteOFT}`);
  
  const tx = await oft.setPeer(remoteEid, remoteBytes32);
  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log(`✅ Peer set successfully! (Block: ${receipt.blockNumber})`);

  // Verify peer was set
  console.log("\n--- Verifying Peer Configuration ---");
  const newPeer = await oft.peers(remoteEid);
  console.log(`Peer for EID ${remoteEid}:`, newPeer);
  
  if (newPeer === remoteBytes32) {
    console.log("✅ Peer verified successfully!");
  } else {
    console.log("❌ Peer verification failed");
  }

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log(`1. Run this script on ${remoteName} to set the reverse peer`);
  console.log("2. Configure DVN and Executor settings (if needed)");
  console.log("3. Test cross-chain transfer");
  console.log("\n🎉 Peer configuration complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Configuration failed!");
    console.error(error);
    process.exit(1);
  });
