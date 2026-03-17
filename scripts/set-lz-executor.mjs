import hre from "hardhat";
import config from "../config/layerzero.config.mjs";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Set LayerZero Executor Configuration");
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

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  
  const endpointABI = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
  ];

  const endpoint = new ethers.Contract(endpointAddr, endpointABI, signer);

  console.log(`📦 OFT: ${oftAddress}`);
  console.log(`🔗 Endpoint: ${endpointAddr}`);
  console.log(`🎯 Remote EID: ${remoteEid}\n`);

  try {
    // Get send library
    const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
    console.log(`📚 Send Library: ${sendLib}\n`);

    // Executor address from config
    const executorAddr = connection.executor.address;
    console.log(`⚙️  Executor Configuration:`);
    console.log(`   Executor: ${executorAddr}\n`);

    // Encode executor config
    // Format: uint32 maxMessageSize (0xFFFFFFFF for unlimited) + address executor
    const maxMessageSize = "0xFFFFFFFF"; // Unlimited
    const executorConfig = ethers.solidityPacked(
      ["uint32", "address"],
      [maxMessageSize, executorAddr]
    );

    const configType = 1; // CONFIG_TYPE_EXECUTOR

    console.log("🚀 Setting Executor Config via Endpoint\n");

    const tx = await endpoint.setConfig(
      oftAddress,
      sendLib,
      remoteEid,
      configType,
      executorConfig,
      { gasLimit: 500000 }
    );

    console.log(`📤 TX: ${tx.hash}`);
    console.log(`⏳ Waiting for confirmation...\n`);

    const receipt = await tx.wait();

    if (receipt.status === 1) {
      console.log(`✅ Executor Config Set Successfully!`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Gas Used: ${receipt.gasUsed.toString()}\n`);

      console.log("=".repeat(80));
      console.log("✅ Configuration Status:");
      console.log("=".repeat(80));
      console.log(`\n✅ Executor configured`);
      console.log(`✅ Ready for cross-chain messaging\n`);
    } else {
      console.log(`❌ Transaction failed!`);
      process.exit(1);
    }

  } catch (err) {
    console.error("\n❌ Error:");
    console.error("   " + err.message.slice(0, 150));

    if (err.message.includes("execution reverted")) {
      console.error("\n💡 The path may not be activated yet.");
      console.error("   OR executor address is invalid.");
    }

    process.exit(1);
  }
}

main().catch(console.error);
