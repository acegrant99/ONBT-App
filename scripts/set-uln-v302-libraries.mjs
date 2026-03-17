import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Set ULN v302 Libraries");
  console.log("=".repeat(80));

  let oftAddress, remoteEid, sendLibV302, receiveLibV302;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    sendLibV302 = "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2";
    receiveLibV302 = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";
    console.log(`\n📍 Base → Arbitrum (EID 30110)`);
  } else if (network.chainId === 42161n) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    sendLibV302 = "0x8E60b7b64b63cD56b18ebcECADcb79B04919286e";
    receiveLibV302 = "0x60FccB9b58d5E806ca5Cb8BFCe721c2274609dE4";
    console.log(`\n📍 Arbitrum → Base (EID 30184)`);
  } else {
    console.error("❌ Unsupported chain");
    process.exit(1);
  }

  console.log(`📦 OFT: ${oftAddress}\n`);

  // Try OFT method first (setSendLibrary/setReceiveLibrary)
  const OFT_ABI = [
    "function setSendLibrary(uint32 eid, address lib) external",
    "function setReceiveLibrary(uint32 eid, address lib, uint128 gracePeriod) external",
    "function sendLibrary(uint32 eid) external view returns (address)",
    "function receiveLibrary(uint32 eid) external view returns (address)",
  ];

  const oft = new ethers.Contract(oftAddress, OFT_ABI, signer);

  try {
    console.log("📚 Attempting to set ULN v302 libraries via OFT...\n");

    // Check current libraries
    try {
      const currentSend = await oft.sendLibrary(remoteEid);
      const currentReceive = await oft.receiveLibrary(remoteEid);
      console.log(`Current Send Lib:    ${currentSend}`);
      console.log(`Current Receive Lib: ${currentReceive}\n`);
    } catch (err) {
      console.log(`Note: Could not read current libraries\n`);
    }

    // Set send library
    console.log(`🚀 Setting Send Library v302...\n`);
    const sendTx = await oft.setSendLibrary(remoteEid, sendLibV302, {
      gasLimit: 300000,
    });
    console.log(`📤 TX: ${sendTx.hash}`);
    const sendReceipt = await sendTx.wait();
    console.log(`✅ Sent! Block: ${sendReceipt.blockNumber}\n`);

    // Set receive library
    console.log(`🚀 Setting Receive Library v302...\n`);
    const receiveTx = await oft.setReceiveLibrary(
      remoteEid,
      receiveLibV302,
      0, // gracePeriod
      { gasLimit: 300000 }
    );
    console.log(`📤 TX: ${receiveTx.hash}`);
    const receiveReceipt = await receiveTx.wait();
    console.log(`✅ Sent! Block: ${receiveReceipt.blockNumber}\n`);

    console.log("=".repeat(80));
    console.log("✅ ULN v302 Libraries Set Successfully!");
    console.log("=".repeat(80));
    console.log(`\n✅ Send Library v302:    ${sendLibV302}`);
    console.log(`✅ Receive Library v302: ${receiveLibV302}`);
    console.log(`\n💡 Path is now initialized with v302 ULNs!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Run: npx hardhat run scripts/set-lz-executor.mjs --network ${network.name.toLowerCase()}`);
    console.log(`   2. Run: npx hardhat run scripts/configure-polyhedra-google-dvn.mjs --network ${network.name.toLowerCase()}\n`);

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message.slice(0, 150));

    if (err.message.includes("execution reverted")) {
      console.error("\n💡 Possible causes:");
      console.error("   - OFT doesn't have setSendLibrary/setReceiveLibrary methods");
      console.error("   - Signer is not authorized");
      console.error("   - Remote EID is incorrect");
    }

    process.exit(1);
  }
}

main().catch(console.error);
