import hre from "hardhat";
const { ethers } = hre;

const CONTRACTS = {
  base: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  arbitrum: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const EIDS = {
  base: 30184,
  arbitrum: 30110,
};

async function main() {
  const network = await ethers.provider.getNetwork();
  const [signer] = await ethers.getSigners();

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║           Configure Peer for OFT Contract                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localContract, remoteContract, remoteEid, networkName;

  if (network.chainId === 8453n) {
    networkName = "Base";
    localContract = CONTRACTS.base;
    remoteContract = CONTRACTS.arbitrum;
    remoteEid = EIDS.arbitrum;
    console.log("🌐 Network: Base → Arbitrum");
  } else if (network.chainId === 42161n) {
    networkName = "Arbitrum";
    localContract = CONTRACTS.arbitrum;
    remoteContract = CONTRACTS.base;
    remoteEid = EIDS.base;
    console.log("🌐 Network: Arbitrum → Base");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log("📍 Local Contract:", localContract);
  console.log("📍 Remote Contract:", remoteContract);
  console.log("📡 Remote EID:", remoteEid);
  console.log("👤 Signer:", signer.address, "\n");

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);

  // Convert address to bytes32
  const peerBytes32 = ethers.zeroPadValue(remoteContract, 32);
  console.log("🔗 Peer (bytes32):", peerBytes32);

  try {
    console.log("\n⏳ Setting peer...");
    const tx = await oft.setPeer(remoteEid, peerBytes32);
    console.log("📤 Transaction:", tx.hash);

    await tx.wait();
    console.log("✅ Peer configured successfully!\n");

    // Verify
    const setPeer = await oft.peers(remoteEid);
    console.log("🔍 Verification:");
    console.log("  Configured peer:", setPeer);
    console.log("  Expected peer:", peerBytes32);
    console.log("  Status:", setPeer === peerBytes32 ? "✅ Match" : "❌ Mismatch");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.data) console.error("Data:", e.data);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Fatal error:", e.message);
    process.exit(1);
  });
