import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const configPath = path.join(process.cwd(), "config", "oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const CONTRACTS = {
  8453: config.oft.base.address,
  42161: config.oft.arbitrum.address
};

const LZ_ENDPOINTS = {
  8453: config.networks.base.endpoint,
  42161: config.networks.arbitrum.endpoint
};

const LZ_EIDS = {
  base: config.networks.base.lzEid,
  arbitrum: config.networks.arbitrum.lzEid
};

const zeroPadValue = (value, length) => (
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length)
);
const toNumber = (value) => (ethers.toNumber ? ethers.toNumber(value) : value.toNumber());

const ENDPOINT_ABI = [
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib, bool isDefault)",
  "function defaultSendLibrary(uint32 eid) external view returns (address)",
  "function defaultReceiveLibrary(uint32 eid) external view returns (address)",
  "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) external view returns (bytes memory)"
];

const OFT_ABI = [
  "function peers(uint32 eid) external view returns (bytes32)",
  "function endpoint() external view returns (address)"
];

async function checkFullConfig() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(70));
  console.log("🔍 Complete OFT Configuration Check");
  console.log("=".repeat(70) + "\n");

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${network.name} (${chainId})`);
  console.log(`Signer: ${signer.address}\n`);

  // Determine chains
  let sourceChain, destChain, destEid, remoteContract;
  if (chainId === 8453) {
    sourceChain = "Base";
    destChain = "Arbitrum";
    destEid = LZ_EIDS.arbitrum;
    remoteContract = CONTRACTS[42161];
  } else if (chainId === 42161) {
    sourceChain = "Arbitrum";
    destChain = "Base";
    destEid = LZ_EIDS.base;
    remoteContract = CONTRACTS[8453];
  } else {
    throw new Error(`Unsupported chain: ${chainId}`);
  }

  const sourceContract = CONTRACTS[chainId];
  const endpointAddress = LZ_ENDPOINTS[chainId];

  console.log(`Source: ${sourceChain} - ${sourceContract}`);
  console.log(`Remote: ${destChain} - ${remoteContract}`);
  console.log(`Endpoint: ${endpointAddress}\n`);

  // Connect to contracts
  const oft = new ethers.Contract(sourceContract, OFT_ABI, signer);
  const endpoint = new ethers.Contract(endpointAddress, ENDPOINT_ABI, signer);

  // 1. Check peers (LayerZero V2)
  console.log("1️⃣  Peer Configuration (V2)");
  console.log("-".repeat(70));
  const expectedPeer = zeroPadValue(remoteContract, 32).toLowerCase();
  const actualPeer = (await oft.peers(destEid)).toLowerCase();

  if (actualPeer === expectedPeer) {
    console.log(`✅ Peer set: ${remoteContract}`);
  } else {
    console.log(`❌ Peer mismatch!`);
    console.log(`   Expected: ${expectedPeer}`);
    console.log(`   Got: ${actualPeer}`);
  }

  // 2. Check send/receive libraries
  console.log("\n2️⃣  LayerZero Library Addresses");
  console.log("-".repeat(70));
  try {
    const sendLib = await endpoint.getSendLibrary(sourceContract, destEid);
    const receiveLibInfo = await endpoint.getReceiveLibrary(sourceContract, destEid);
    const defaultSend = await endpoint.defaultSendLibrary(destEid);
    const defaultReceive = await endpoint.defaultReceiveLibrary(destEid);

    console.log(`Send Library: ${sendLib} ${sendLib === defaultSend ? "⚠️  (default)" : "✅"}`);
    console.log(`Receive Library: ${receiveLibInfo[0]} ${receiveLibInfo[0] === defaultReceive ? "⚠️  (default)" : "✅"}`);
    console.log(`Default Send: ${defaultSend}`);
    console.log(`Default Receive: ${defaultReceive}`);
  } catch (error) {
    console.log("❌ Could not read libraries:", error.message);
  }

  // 4. Check ULN config (block confirmations)
  console.log("\n4️⃣  ULN Configuration (Block Confirmations)");
  console.log("-".repeat(70));
  try {
    // Config type 2 = inbound block confirmations
    // Config type 5 = outbound block confirmations
    const sendLib = await endpoint.getSendLibrary(sourceContract, destEid);
    const inboundConfig = await endpoint.getConfig(sourceContract, sendLib, destEid, 2);
    const outboundConfig = await endpoint.getConfig(sourceContract, sendLib, destEid, 5);
    
    if (inboundConfig && inboundConfig !== "0x") {
      const inboundBlocks = toNumber("0x" + inboundConfig.slice(-4));
      console.log(`Inbound confirmations: ${inboundBlocks} blocks ${inboundBlocks >= 15 ? "✅" : "⚠️"}`);
    } else {
      console.log("⚠️  Inbound confirmations: using default");
    }

    if (outboundConfig && outboundConfig !== "0x") {
      const outboundBlocks = toNumber("0x" + outboundConfig.slice(-4));
      console.log(`Outbound confirmations: ${outboundBlocks} blocks ${outboundBlocks >= 15 ? "✅" : "⚠️"}`);
    } else {
      console.log("⚠️  Outbound confirmations: using default");
    }
  } catch (error) {
    console.log("❌ Could not read block confirmations:", error.message);
  }

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📋 Configuration Summary");
  console.log("=".repeat(70));
  console.log(`Chain: ${sourceChain}`);
  console.log(`Contract: ${sourceContract}`);
  console.log(`Peer: ${actualPeer === expectedPeer ? "✅ SET" : "❌ MISMATCH"}`);
  console.log("=".repeat(70) + "\n");
}

checkFullConfig()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Check failed:", error);
    process.exit(1);
  });
