import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Set Receive Library v302 via Endpoint");
  console.log("=".repeat(80));

  let oftAddress, remoteEid, receiveLibV302;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    receiveLibV302 = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";
    console.log(`\n📍 Base → Arbitrum (EID 30110)`);
  } else if (network.chainId === 42161n) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    receiveLibV302 = "0x60FccB9b58d5E806ca5Cb8BFCe721c2274609dE4";
    console.log(`\n📍 Arbitrum → Base (EID 30184)`);
  } else {
    console.error("❌ Unsupported chain");
    process.exit(1);
  }

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  
  const endpointABI = [
    "function setReceiveLibrary(address oapp, uint32 eid, address lib, uint256 gracePeriod) external",
  ];

  const endpoint = new ethers.Contract(endpointAddr, endpointABI, signer);

  console.log(`📦 OFT: ${oftAddress}`);
  console.log(`🎯 Remote EID: ${remoteEid}`);
  console.log(`📚 Receive Library v302: ${receiveLibV302}\n`);

  try {
    console.log("🚀 Setting Receive Library v302 via Endpoint\n");

    const receiveLibTx = await endpoint.setReceiveLibrary(
      oftAddress,
      remoteEid,
      receiveLibV302,
      0, // gracePeriod = 0
      { gasLimit: 300000 }
    );

    console.log(`📤 TX: ${receiveLibTx.hash}`);
    const receiveReceipt = await receiveLibTx.wait();
    console.log(`✅ Sent! Block: ${receiveReceipt.blockNumber}\n`);

    console.log("=".repeat(80));
    console.log("✅ Receive Library v302 Set Successfully!");
    console.log("=".repeat(80));
    console.log(`\n✅ Path now fully initialized with v302 ULNs!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. npx hardhat run scripts/set-lz-executor.mjs --network ${network.name.toLowerCase()}`);
    console.log(`   2. npx hardhat run scripts/configure-polyhedra-google-dvn.mjs --network ${network.name.toLowerCase()}\n`);

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message.slice(0, 200));
    process.exit(1);
  }
}

main().catch(console.error);
