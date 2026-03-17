import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const configPath = path.join(process.cwd(), "config", "oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const CONTRACTS = {
  base: config.oft.base.address,
  arbitrum: config.oft.arbitrum.address
};

const ENDPOINTS = {
  base: config.networks.base.endpoint,
  arbitrum: config.networks.arbitrum.endpoint
};

const ENDPOINT_IDS = {
  base: config.networks.base.lzEid,
  arbitrum: config.networks.arbitrum.lzEid
};

const abiCoder = ethers.AbiCoder ? ethers.AbiCoder.defaultAbiCoder() : ethers.utils.defaultAbiCoder;

async function main() {
  const network = await ethers.provider.getNetwork();

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     Check Current DVN Configuration                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localNetwork, remoteEid, localContract, endpoint;

  if (network.chainId === 8453n) {
    localNetwork = "base";
    remoteEid = ENDPOINT_IDS.arbitrum;
    localContract = CONTRACTS.base;
    endpoint = ENDPOINTS.base;
    console.log("🌐 Network: Base");
  } else if (network.chainId === 42161n) {
    localNetwork = "arbitrum";
    remoteEid = ENDPOINT_IDS.base;
    localContract = CONTRACTS.arbitrum;
    endpoint = ENDPOINTS.arbitrum;
    console.log("🌐 Network: Arbitrum");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  // Get endpoint instance
  const endpointABI = [
    "function getConfig(address oapp, address lib, uint32 eid, uint8 configType) external view returns (bytes memory)",
    "function delegates(address oapp) external view returns (address)",
    "function defaultSendLibrary(uint32 eid) external view returns (address)",
    "function defaultReceiveLibrary(uint32 eid) external view returns (address)",
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib, bool isDefault)",
  ];

  const endpointContract = await ethers.getContractAt(endpointABI, endpoint);

  console.log("\n📍 OFT Contract:", localContract);
  console.log("🔗 Endpoint:", endpoint);
  console.log("📡 Remote EID:", remoteEid);

  // Check delegate
  console.log("\n🔐 Permissions:");
  try {
    const delegate = await endpointContract.delegates(localContract);
    console.log("   Delegate:", delegate);
  } catch (e) {
    console.log("   Delegate: Error reading -", e.message);
  }

  // Check default libraries
  console.log("\n📚 Default Libraries:");
  try {
    const defaultSend = await endpointContract.defaultSendLibrary(remoteEid);
    const defaultReceive = await endpointContract.defaultReceiveLibrary(remoteEid);
    console.log("   Send Library (remote):", defaultSend);
    console.log("   Receive Library (remote):", defaultReceive);
  } catch (e) {
    console.log("   Error reading default libraries");
  }

  // Read current Send config
  const sendLib = await endpointContract.getSendLibrary(localContract, remoteEid);
  const receiveLibInfo = await endpointContract.getReceiveLibrary(localContract, remoteEid);
  const receiveLib = receiveLibInfo[0];

  console.log("\n📤 Send Library Configuration:");
  console.log("   Library:", sendLib);
  try {
    const sendConfig = await endpointContract.getConfig(
      localContract,
      sendLib,
      remoteEid,
      2 // ULN config type
    );
    console.log("   Raw config (hex):", sendConfig);

    // Try to decode
    if (sendConfig !== "0x") {
      try {
        const decoded = abiCoder.decode(
          ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
          sendConfig
        );
        const config = decoded[0];
        console.log("   Confirmations:", config.confirmations.toString());
        console.log("   Required DVNs:", config.requiredDVNCount.toString());
        config.requiredDVNs.forEach((dvn, i) => {
          console.log(`     [${i}]: ${dvn}`);
        });
      } catch (decodeErr) {
        console.log("   Could not decode config structure");
      }
    } else {
      console.log("   No config set (empty)");
    }
  } catch (e) {
    console.log("   Error reading config:", e.message);
  }

  // Read current Receive config
  console.log("\n📥 Receive Library Configuration:");
  console.log("   Library:", receiveLib);
  try {
    const receiveConfig = await endpointContract.getConfig(
      localContract,
      receiveLib,
      remoteEid,
      2 // ULN config type
    );
    console.log("   Raw config (hex):", receiveConfig);

    // Try to decode
    if (receiveConfig !== "0x") {
      try {
        const decoded = abiCoder.decode(
          ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
          receiveConfig
        );
        const config = decoded[0];
        console.log("   Confirmations:", config.confirmations.toString());
        console.log("   Required DVNs:", config.requiredDVNCount.toString());
        config.requiredDVNs.forEach((dvn, i) => {
          console.log(`     [${i}]: ${dvn}`);
        });
      } catch (decodeErr) {
        console.log("   Could not decode config structure");
      }
    } else {
      console.log("   No config set (empty)");
    }
  } catch (e) {
    console.log("   Error reading config:", e.message);
  }

  console.log("\n💡 Analysis:");
  console.log("   If configs are empty: DVN must be set via OFT contract method");
  console.log("   If configs exist: Endpoint.setConfig may be restricted");
  console.log("   DVN changes post-deployment may not be supported");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Fatal error:", e.message);
    process.exit(1);
  });
