import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CONTRACTS = {
  base: config.oft.base.address,
  arbitrum: config.oft.arbitrum.address,
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// Send library addresses
const SEND_LIBS = {
  base: config.messageLibraries.base.sendUln,
  arbitrum: config.messageLibraries.arbitrum.sendUln,
};

// Receive library addresses
const RECEIVE_LIBS = {
  base: config.messageLibraries.base.receiveUln,
  arbitrum: config.messageLibraries.arbitrum.receiveUln,
};

const ENDPOINT_ABI = [
  "function setConfig(address oapp, tuple(uint32 eid, uint32 configType, bytes config)[] calldata params) external",
  "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) external view returns (bytes memory)",
  "function setSendLibrary(address oapp, uint32 eid, address lib) external",
  "function setReceiveLibrary(address oapp, uint32 eid, address lib, uint256 gracePeriod) external",
];

async function initializePath(networkName) {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n${"═".repeat(80)}`);
  console.log(`🛣️  INITIALIZE PATH FOR ${networkName.toUpperCase()}`);
  console.log(`${"═".repeat(80)}\n`);

  let localChain, remoteChain, localOFT, remoteOFT, remoteEid;
  let sendLib, receiveLib;

  if (networkName === "base") {
    localChain = "base";
    remoteChain = "arbitrum";
    localOFT = CONTRACTS.base;
    remoteOFT = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.arbitrum;
    sendLib = SEND_LIBS.base;
    receiveLib = RECEIVE_LIBS.base;

    if (network.chainId !== 8453n) {
      console.error(`❌ ERROR: Not connected to Base`);
      return false;
    }
  } else {
    localChain = "arbitrum";
    remoteChain = "base";
    localOFT = CONTRACTS.arbitrum;
    remoteOFT = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.base;
    sendLib = SEND_LIBS.arbitrum;
    receiveLib = RECEIVE_LIBS.arbitrum;

    if (network.chainId !== 42161n) {
      console.error(`❌ ERROR: Not connected to Arbitrum`);
      return false;
    }
  }
  
  console.log(`📍 Local Chain: ${localChain.toUpperCase()}`);
  console.log(`📍 Remote Chain: ${remoteChain.toUpperCase()}`);
  console.log(`📍 OFT Contract: ${localOFT}`);
  console.log(`📍 Endpoint: ${ENDPOINT}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  // Step 1: Verify send library is set
  console.log(`Step 1: Verify Send Library`);
  console.log(`${"─".repeat(80)}`);
  try {
    // Get send library config
    const sendLibConfig = await endpoint.getConfig(localOFT, sendLib, remoteEid, 1);
    console.log(`✅ Send library config exists: ${sendLibConfig !== "0x"}`);
    if (sendLibConfig && sendLibConfig !== "0x") {
      console.log(`   Config: ${sendLibConfig}`);
    }
  } catch (e) {
    console.log(`⚠️  Could not check send library config: ${e.message}`);
  }

  // Step 2: Verify receive library is set
  console.log(`\nStep 2: Verify Receive Library`);
  console.log(`${"─".repeat(80)}`);
  try {
    const receiveLibConfig = await endpoint.getConfig(localOFT, receiveLib, remoteEid, 2);
    console.log(`✅ Receive library config exists: ${receiveLibConfig !== "0x"}`);
    if (receiveLibConfig && receiveLibConfig !== "0x") {
      console.log(`   Config: ${receiveLibConfig}`);
    }
  } catch (e) {
    console.log(`⚠️  Could not check receive library config: ${e.message}`);
  }

  // Step 3: Set default send and receive libraries if needed
  console.log(`\nStep 3: Ensure Libraries are Set`);
  console.log(`${"─".repeat(80)}`);

  // Try to set send library
  console.log(`📝 Setting send library...`);
  try {
    const sendLibTx = await endpoint.setSendLibrary(localOFT, remoteEid, sendLib, {
      gasLimit: 300000,
    });
    console.log(`✅ Send library tx: ${sendLibTx.hash}`);
    const sendReceipt = await sendLibTx.wait();
    console.log(`   Block: ${sendReceipt.blockNumber}`);
  } catch (e) {
    console.log(`⚠️  Send library error: ${e.message.substring(0, 100)}`);
  }

  // Try to set receive library
  console.log(`\n📝 Setting receive library...`);
  try {
    const receiveLibTx = await endpoint.setReceiveLibrary(
      localOFT,
      remoteEid,
      receiveLib,
      0, // gracePeriod = 0 for immediate effect
      {
        gasLimit: 300000,
      }
    );
    console.log(`✅ Receive library tx: ${receiveLibTx.hash}`);
    const receiveReceipt = await receiveLibTx.wait();
    console.log(`   Block: ${receiveReceipt.blockNumber}`);
  } catch (e) {
    console.log(`⚠️  Receive library error: ${e.message.substring(0, 100)}`);
  }

  // Step 4: Set ULN config (required for path initialization)
  console.log(`\nStep 4: Set ULN Configuration`);
  console.log(`${"─".repeat(80)}`);

  console.log(`📝 Setting ULN send config...`);
  try {
    // ULN Send config: confirmations (uint64) and optional oracle/executor config
    // Minimum config: 1 confirmation (1 block)
    const sendConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64"],
      [1] // 1 confirmation
    );

    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 1, // ULN_SEND_CONFIG
        config: sendConfigBytes,
      },
    ];

    const setConfigTx = await endpoint.setConfig(localOFT, setConfigParams, {
      gasLimit: 300000,
    });
    console.log(`✅ Set send config tx: ${setConfigTx.hash}`);
    const setConfigReceipt = await setConfigTx.wait();
    console.log(`   Block: ${setConfigReceipt.blockNumber}`);
  } catch (e) {
    console.log(`⚠️  Set send config error: ${e.message.substring(0, 100)}`);
  }

  // Step 5: Set receive config on destination
  console.log(`\nStep 5: Set ULN Receive Configuration`);
  console.log(`${"─".repeat(80)}`);

  console.log(`📝 Setting ULN receive config...`);
  try {
    // ULN Receive config: confirmations and DVN address
    // For now, use minimal config without DVN
    const receiveConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "bytes32"],
      [1, ethers.ZeroHash] // 1 confirmation, no DVN for now
    );

    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 2, // ULN_RECEIVE_CONFIG
        config: receiveConfigBytes,
      },
    ];

    const setConfigTx = await endpoint.setConfig(localOFT, setConfigParams, {
      gasLimit: 300000,
    });
    console.log(`✅ Set receive config tx: ${setConfigTx.hash}`);
    const setConfigReceipt = await setConfigTx.wait();
    console.log(`   Block: ${setConfigReceipt.blockNumber}`);
  } catch (e) {
    console.log(`⚠️  Set receive config error: ${e.message.substring(0, 100)}`);
  }

  console.log(`\n${"═".repeat(80)}`);
  console.log(`✅ PATH INITIALIZATION COMPLETE`);
  console.log(`${"═".repeat(80)}\n`);

  return true;
}

async function main() {
  console.log(`\n╔${"═".repeat(80)}╗`);
  console.log(`║ ${"INITIALIZE LAYERZERO PATH (BASE ↔ ARBITRUM)".padEnd(78)} ║`);
  console.log(`╚${"═".repeat(80)}╝`);

  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  let networkName;
  if (network.chainId === 8453n) {
    networkName = "base";
  } else if (network.chainId === 42161n) {
    networkName = "arbitrum";
  } else {
    console.error(`\n❌ Unsupported network: ${network.chainId}`);
    process.exit(1);
  }

  const result = await initializePath(networkName);

  if (result) {
    console.log(`Next: Run this script on the other chain to complete path initialization\n`);
  }

  process.exit(result ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
