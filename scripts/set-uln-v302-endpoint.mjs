import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Set ULN v302 Libraries via Endpoint");
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

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  
  const endpointABI = [
    "function setSendLibrary(address oapp, uint32 eid, address lib) external",
    "function setReceiveLibrary(address oapp, uint32 eid, address lib, uint256 gracePeriod) external",
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  ];

  const endpoint = new ethers.Contract(endpointAddr, endpointABI, signer);

  console.log(`📦 OFT: ${oftAddress}`);
  console.log(`🔗 Endpoint: ${endpointAddr}`);
  console.log(`🎯 Remote EID: ${remoteEid}\n`);

  console.log("📚 ULN v302 Libraries to configure:");
  console.log(`   Send:    ${sendLibV302}`);
  console.log(`   Receive: ${receiveLibV302}\n`);

  try {
    console.log("🚀 Step 1: Set Send Library v302 via Endpoint\n");

    const sendLibTx = await endpoint.setSendLibrary(
      oftAddress,
      remoteEid,
      sendLibV302,
      { gasLimit: 300000 }
    );

    console.log(`📤 TX: ${sendLibTx.hash}`);
    const sendReceipt = await sendLibTx.wait();
    console.log(`✅ Sent! Block: ${sendReceipt.blockNumber}\n`);

    console.log("🚀 Step 2: Set Receive Library v302 via Endpoint\n");

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
    console.log("✅ ULN v302 Libraries Set via Endpoint!");
    console.log("=".repeat(80));
    console.log(`\n✅ Path initialized with v302 ULNs`);
    console.log(`✅ Send Library:    ${sendLibV302}`);
    console.log(`✅ Receive Library: ${receiveLibV302}`);
    
    console.log(`\n📝 Next steps:`);
    console.log(`   1. npx hardhat run scripts/set-lz-executor.mjs --network ${network.name.toLowerCase()}`);
    console.log(`   2. npx hardhat run scripts/configure-polyhedra-google-dvn.mjs --network ${network.name.toLowerCase()}\n`);

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message.slice(0, 200));

    if (err.message.includes("execution reverted")) {
      console.error("\n💡 Path not yet activated by LayerZero Labs");
      console.error("   Waiting for path to be manually activated...");
    }

    process.exit(1);
  }
}

main().catch(console.error);
