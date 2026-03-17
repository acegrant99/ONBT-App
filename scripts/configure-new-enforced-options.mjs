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
  console.log("║         Configure Enforced Options (200k gas)            ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localContract, remoteEid, networkName;

  if (network.chainId === 8453n) {
    networkName = "Base";
    localContract = CONTRACTS.base;
    remoteEid = EIDS.arbitrum;
  } else if (network.chainId === 42161n) {
    networkName = "Arbitrum";
    localContract = CONTRACTS.arbitrum;
    remoteEid = EIDS.base;
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log("🌐 Network:", networkName);
  console.log("📍 Contract:", localContract);
  console.log("📡 Remote EID:", remoteEid);
  console.log("👤 Signer:", signer.address);

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);

  // Prepare enforced options: 200,000 gas for execution
  // LayerZero V2 Options Type 3: [type(uint16)][gas(uint128)][value(uint128)]
  const options = ethers.solidityPacked(
    ["uint16", "uint128", "uint128"],
    [3, 200000, 0] // Type 3, 200k gas, 0 value
  );

  console.log("\n⚙️  Enforced Options:");
  console.log("  Gas Limit: 200,000");
  console.log("  Message Type: 1 (SEND)");
  console.log("  Options (hex):", options);

  try {
    console.log("\n⏳ Setting enforced options...");
    const tx = await oft.setEnforcedOptions([
      {
        eid: remoteEid,
        msgType: 1, // SEND
        options: options,
      },
    ]);

    console.log("📤 Transaction:", tx.hash);
    await tx.wait();
    console.log("✅ Enforced options configured successfully!\n");
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
