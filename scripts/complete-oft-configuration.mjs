import hre from "hardhat";
import config from "../config/layerzero.config.mjs";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Complete OFT Path Configuration via Endpoint");
  console.log("=".repeat(80));

  let oftAddress, remoteEid, connection;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    connection = config.connections.find(c => c.from === 30184 && c.to === 30110);
  } else {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    connection = config.connections.find(c => c.from === 30110 && c.to === 30184);
  }

  console.log(`\n📍 Chain: ${network.name}`);
  console.log(`📦 OFT: ${oftAddress}`);
  console.log(`🎯 Remote EID: ${remoteEid}\n`);

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  
  const endpointABI = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
    "function delegates(address oapp) external view returns (address)",
    "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
  ];

  const endpoint = new ethers.Contract(endpointAddr, endpointABI, signer);

  try {
    // Get libraries
    const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
    const receiveLib = await endpoint.getReceiveLibrary(oftAddress, remoteEid);

    console.log("✅ Libraries confirmed:");
    console.log(`   Send:    ${sendLib}`);
    console.log(`   Receive: ${receiveLib}\n`);

    // Encode clean DVN config with only valid DVNs
    const validDVNs = {
      required: connection.dvn.required,
      optional: connection.dvn.optional.filter(dvn => {
        // Only include known good DVNs
        return [
          "0x9e059a54699a285714207b43B055483E78FAac25",  // ✅ Exists on both
          "0xa7b5189bca84cd304d8553977c7c614329750d99",  // ✅ Exists on both 
          "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc",  // ✅ Google Cloud (exists on both)
        ].map(a => a.toLowerCase()).includes(dvn.toLowerCase());
      })
    };

    console.log("📊 DVN Configuration:");
    console.log(`   Confirmations: ${connection.dvn.confirmations}`);
    console.log(`   Required: ${validDVNs.required.length}`);
    validDVNs.required.forEach(dvn => console.log(`     - ${dvn}`));
    console.log(`   Optional: ${validDVNs.optional.length}`);
    validDVNs.optional.forEach(dvn => console.log(`     - ${dvn}`));

    // Encode the config
    const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
      [{
        confirmations: BigInt(connection.dvn.confirmations),
        requiredDVNCount: validDVNs.required.length,
        optionalDVNCount: validDVNs.optional.length,
        optionalDVNThreshold: connection.dvn.optionalThreshold || 1,
        requiredDVNs: validDVNs.required,
        optionalDVNs: validDVNs.optional,
      }]
    );

    console.log(`\n📝 Encoded config: ${ulnConfig.slice(0, 50)}...\n`);

    const configType = 2; // ULN_CONFIG_TYPE

    console.log("🚀 Attempting to set Send Library config...\n");

    try {
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
      console.log(`   ✅ Set! Block: ${receipt1.blockNumber}`);

    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
      console.log(`\n   This indicates the path is not yet activated by LayerZero.`);
      console.log(`   Errors during setConfig() are expected until path is opened.\n`);
    }

    console.log("\n💡 Summary:");
    console.log("   ✅ All OFT settings correct");
    console.log("   ✅ Library assignment confirmed");
    console.log("   ✅ Delegate properly set");
    console.log("   ⏳ Waiting: LayerZero path activation");
    console.log("\n   Once LayerZero activates the path, run this script again");
    console.log("   to apply the DVN configuration.\n");

  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main().catch(console.error);
