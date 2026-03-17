import hre from "hardhat";
import config from "../config/layerzero.config.mjs";

const { ethers } = hre;

const ENDPOINT_ABI = [
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  "function delegates(address oapp) external view returns (address)",
  "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
];

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Configure OFT with Polyhedra + Google Cloud DVNs");
  console.log("=".repeat(80));

  let oftAddress, remoteEid, connection;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    connection = config.connections.find(c => c.from === 30184 && c.to === 30110);
    console.log(`\n📍 Base → Arbitrum`);
  } else if (network.chainId === 42161n) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    connection = config.connections.find(c => c.from === 30110 && c.to === 30184);
    console.log(`\n📍 Arbitrum → Base`);
  } else {
    console.error("❌ Unsupported chain");
    process.exit(1);
  }

  console.log(`📦 OFT: ${oftAddress}`);
  console.log(`🎯 Remote EID: ${remoteEid}\n`);

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  const endpoint = new ethers.Contract(endpointAddr, ENDPOINT_ABI, signer);

  try {
    // Verify libraries
    const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
    const receiveLib = await endpoint.getReceiveLibrary(oftAddress, remoteEid);

    console.log("📚 Current Libraries:");
    console.log(`   Send:    ${sendLib}`);
    console.log(`   Receive: ${receiveLib}\n`);

    // Show DVN config
    console.log("📊 New DVN Configuration:");
    console.log(`   Confirmations: ${connection.dvn.confirmations}`);
    console.log(`   Required DVNs: 2`);
    console.log(`     1. Google Cloud Oracle: 0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc`);
    console.log(`     2. Polyhedra:           0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5\n`);

    // Encode ULN config
    const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
      [{
        confirmations: BigInt(connection.dvn.confirmations),
        requiredDVNCount: 2,
        optionalDVNCount: 0,
        optionalDVNThreshold: 0,
        requiredDVNs: [
          "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc", // Google Cloud
          "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra
        ],
        optionalDVNs: [],
      }]
    );

    const configType = 2; // ULN_CONFIG_TYPE

    console.log("🚀 Attempting to set Send Library config...\n");

    const tx1 = await endpoint.setConfig(
      oftAddress,
      sendLib,
      remoteEid,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );

    console.log(`   📤 TX: ${tx1.hash}`);
    const receipt1 = await tx1.wait();
    console.log(`   ✅ Send config set! Block: ${receipt1.blockNumber}`);

    console.log(`\n🚀 Attempting to set Receive Library config...\n`);

    const tx2 = await endpoint.setConfig(
      oftAddress,
      receiveLib,
      remoteEid,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );

    console.log(`   📤 TX: ${tx2.hash}`);
    const receipt2 = await tx2.wait();
    console.log(`   ✅ Receive config set! Block: ${receipt2.blockNumber}`);

    console.log("\n" + "=".repeat(80));
    console.log("✅ DVN Configuration Complete!");
    console.log("=".repeat(80));
    console.log(`\n✅ Polyhedra + Google Cloud Oracle configured`);
    console.log(`✅ Ready for cross-chain transfers\n`);

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message);
    
    if (err.message.includes("execution reverted")) {
      console.error("\n💡 The path is not yet activated by LayerZero Labs.");
      console.error("   Once activated, run this script again.");
    }
    
    process.exit(1);
  }
}

main().catch(console.error);
