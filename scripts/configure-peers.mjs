import hre from "hardhat";
const { ethers } = hre;

// LayerZero V2 Endpoint IDs (eid)
const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

// Deployed contract addresses (UPDATED: 2026-02-08)
const CONTRACTS = {
  base: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
  arbitrum: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
};

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║           LayerZero Peer Configuration                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📝 Deployer:", signer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})\n`);
  
  let localContract, remoteContract, remoteEid;
  
  if (network.chainId === 8453n) {
    // Configuring Base → Arbitrum
    console.log("🔧 Configuring Base OFT to connect to Arbitrum");
    localContract = CONTRACTS.base;
    remoteContract = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.arbitrum;
  } else if (network.chainId === 42161n) {
    // Configuring Arbitrum → Base
    console.log("🔧 Configuring Arbitrum OFT to connect to Base");
    localContract = CONTRACTS.arbitrum;
    remoteContract = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.base;
  } else {
    console.error("❌ Unsupported network. Run on Base or Arbitrum.");
    process.exit(1);
  }
  
  console.log("Local contract:", localContract);
  console.log("Remote contract:", remoteContract);
  console.log("Remote endpoint ID:", remoteEid);
  
  // Convert address to bytes32 (pad with zeros)
  const peerBytes32 = ethers.zeroPadValue(remoteContract, 32);
  console.log("Peer (bytes32):", peerBytes32, "\n");
  
  // Get contract instance
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);
  
  // Check if peer is already set
  try {
    const currentPeer = await oft.peers(remoteEid);
    console.log("Current peer:", currentPeer);
    
    if (currentPeer !== ethers.ZeroHash) {
      console.log("⚠️  Peer already configured!");
      const proceed = true; // Auto-proceed for now
      if (!proceed) {
        console.log("Exiting without changes.");
        return;
      }
    }
  } catch (e) {
    console.log("Unable to check current peer, proceeding...");
  }
  
  // Set peer
  console.log("\n🔄 Setting peer...");
  const tx = await oft.setPeer(remoteEid, peerBytes32);
  console.log("📤 Transaction sent:", tx.hash);
  
  console.log("⏳ Waiting for confirmation...");
  const receipt = await tx.wait();
  
  if (receipt.status === 1) {
    console.log("\n✅ SUCCESS!");
    console.log("Gas used:", receipt.gasUsed.toString());
    console.log(`\n${network.chainId === 8453n ? "Base" : "Arbitrum"} → ${network.chainId === 8453n ? "Arbitrum" : "Base"} peer configured!`);
  } else {
    console.log("\n❌ Transaction failed");
    process.exit(1);
  }
  
  // Verify
  const verifiedPeer = await oft.peers(remoteEid);
  console.log("\nVerified peer:", verifiedPeer);
  console.log("Expected:", peerBytes32);
  console.log("Match:", verifiedPeer.toLowerCase() === peerBytes32.toLowerCase() ? "✅" : "❌");
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
