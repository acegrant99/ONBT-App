import hre from "hardhat";

const { ethers } = hre;

// OFT Contract ABI - simplified for path initialization
const OFT_ABI = [
  "function peer(uint32 eid) external view returns (bytes32)",
  "function setPeer(uint32 eid, bytes32 peer) external",
  "function initializePathWithinMinGasLimit(uint32 pathEid) external",
  "function setEnforcedOptions(uint32[] calldata _eid, uint16[] calldata _msgType, bytes[] calldata _options) external",
  "function endpoint() external view returns (address)",
  "function owner() external view returns (address)",
];

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Initialize Path Through OFT Contract");
  console.log("=".repeat(80));

  console.log(`\nChain: ${network.name} (${chainId})`);
  console.log(`Signer: ${signer.address}\n`);

  let oftAddress, remoteEid;

  if (chainId === 8453) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110; // Arbitrum
    console.log("📍 Local: Base → Remote: Arbitrum (EID 30110)");
  } else if (chainId === 42161) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184; // Base
    console.log("📍 Local: Arbitrum → Remote: Base (EID 30184)");
  } else {
    console.error("❌ Unsupported chain");
    process.exit(1);
  }

  console.log(`\n📋 OFT Contract: ${oftAddress}`);
  console.log(`🎯 Remote EID: ${remoteEid}\n`);

  try {
    const oft = new ethers.Contract(oftAddress, OFT_ABI, signer);

    // Check owner
    const owner = await oft.owner();
    console.log(`👤 OFT Owner: ${owner}`);
    if (owner.toLowerCase() !== signer.address.toLowerCase()) {
      console.error("❌ Signer is not the OFT owner!");
      process.exit(1);
    }
    console.log("✅ Signer is OFT owner\n");

    // Check peers
    console.log("🔍 Checking peer configuration:");
    try {
      const peer = await oft.peer(remoteEid);
      console.log(`   Peer for EID ${remoteEid}: ${peer}`);
      if (peer !== ethers.ZeroHash) {
        console.log("   ✅ Peer already set");
      }
    } catch (err) {
      console.log(`   ⚠️  Could not read peer: ${err.message}`);
    }

    // Get endpoint
    const endpointAddr = await oft.endpoint();
    console.log(`\n🔗 Endpoint: ${endpointAddr}\n`);

    // Try to initialize path
    console.log("🚀 Attempting to initialize path through OFT:");
    console.log(`   Method: initializePathWithinMinGasLimit(${remoteEid})\n`);

    try {
      const tx = await oft.initializePathWithinMinGasLimit(remoteEid);
      console.log(`📤 Transaction hash: ${tx.hash}`);
      console.log(`⏳ Waiting for confirmation...\n`);

      const receipt = await tx.wait();
      console.log(`✅ Path initialized! Block: ${receipt.blockNumber}`);
      console.log(`   Gas used: ${receipt.gasUsed.toString()}`);

      console.log("\n" + "=".repeat(80));
      console.log("✅ Path Initialization Complete!");
      console.log("=".repeat(80));
      console.log(`\n🔗 View transaction:`);
      if (chainId === 8453) {
        console.log(`   https://basescan.org/tx/${tx.hash}`);
      } else {
        console.log(`   https://arbiscan.io/tx/${tx.hash}`);
      }
      console.log(`\n💡 Next step: Run set-config-via-endpoint.mjs to configure DVNs\n`);
    } catch (txErr) {
      if (txErr.message.includes("not found")) {
        console.log(`⚠️  initializePathWithinMinGasLimit not found on this OFT version`);
        console.log(`   This method may not be needed or is named differently\n`);

        // Try alternative approach - check what methods exist
        console.log("📌 Available OFT methods include:");
        console.log("   - setPeer()");
        console.log("   - setEnforcedOptions()");
        console.log("   - endpoint()");
        console.log("   - owner()\n");

        console.log("💡 The path may already be initialized or LayerZero needs to activate it manually.");
        console.log("   Trying to set DVN config via Endpoint instead...\n");
      } else {
        throw txErr;
      }
    }
  } catch (error) {
    console.error("\n❌ Error:");
    console.error("   Message:", error.message);

    if (error.message.includes("call revert")) {
      console.error("\n💡 The OFT may not support path initialization method.");
      console.error("   This is normal - the path is typically initialized by LayerZero.");
      console.error("   Next step: Configure DVN via setConfig on Endpoint.\n");
    }

    process.exit(1);
  }
}

main().catch(console.error);
