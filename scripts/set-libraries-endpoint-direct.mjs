import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Set Send/Receive Libraries via Endpoint");
  console.log("=".repeat(80));

  let oftAddress, remoteEid;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    console.log(`\n📍 Base → Arbitrum`);
  } else if (network.chainId === 42161n) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    console.log(`\n📍 Arbitrum → Base`);
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

  // Libraries for this chain
  let sendLib, receiveLib;
  if (network.chainId === 8453n) {
    sendLib = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";
    receiveLib = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";
  } else {
    sendLib = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";
    receiveLib = "0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6";
  }

  console.log("📚 Libraries to set:");
  console.log(`   Send:    ${sendLib}`);
  console.log(`   Receive: ${receiveLib}\n`);

  try {
    console.log("🚀 Step 1: Set Send Library via Endpoint\n");

    const sendLibTx = await endpoint.setSendLibrary(
      oftAddress,
      remoteEid,
      sendLib,
      { gasLimit: 300000 }
    );

    console.log(`📤 TX: ${sendLibTx.hash}`);
    const sendReceipt = await sendLibTx.wait();
    console.log(`✅ Sent! Block: ${sendReceipt.blockNumber}\n`);

    console.log("🚀 Step 2: Set Receive Library via Endpoint\n");

    const receiveLibTx = await endpoint.setReceiveLibrary(
      oftAddress,
      remoteEid,
      receiveLib,
      0, // gracePeriod = 0
      { gasLimit: 300000 }
    );

    console.log(`📤 TX: ${receiveLibTx.hash}`);
    const receiveReceipt = await receiveLibTx.wait();
    console.log(`✅ Sent! Block: ${receiveReceipt.blockNumber}\n`);

    console.log("=".repeat(80));
    console.log("✅ Libraries Set Successfully!");
    console.log("=".repeat(80));
    console.log(`\n✅ Path libraries configured via Endpoint`);
    console.log(`   This INITIALIZES the path without waiting for LayerZero Labs!\n`);

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message.slice(0, 150));
    
    if (err.message.includes("execution reverted")) {
      console.error("\n💡 Possible reasons:");
      console.error("   - Wrong OFT address");
      console.error("   - Wrong remote EID");
      console.error("   - Signer is not authorized");
    }

    process.exit(1);
  }
}

main().catch(console.error);
