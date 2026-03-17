import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CONTRACTS = {
  base: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  arbitrum: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// DVN addresses
const DVNS = {
  googleCloud: "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc", // Both chains
  stargateBase: "0xcdF31d62140204C08853b547E64707110fBC6680",
  stargateArbitrum: "0x5756a74e8e18d8392605ba667171962b2b2826b5",
};

const ENDPOINT_ABI = [
  "function setConfig(address oapp, tuple(uint32 eid, uint32 configType, bytes config)[] calldata params) external",
];

async function configureDVN(networkName) {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n${"═".repeat(80)}`);
  console.log(`⚙️  CONFIGURE DVN FOR ${networkName.toUpperCase()}`);
  console.log(`${"═".repeat(80)}\n`);

  let localOFT, remoteEid, dvnAddresses;

  if (networkName === "base") {
    localOFT = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.arbitrum;
    dvnAddresses = [DVNS.googleCloud, DVNS.stargateBase]; // Google Cloud + Stargate

    if (network.chainId !== 8453n) {
      console.error(`❌ ERROR: Not connected to Base`);
      return false;
    }
  } else {
    localOFT = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.base;
    dvnAddresses = [DVNS.googleCloud, DVNS.stargateArbitrum]; // Google Cloud + Stargate

    if (network.chainId !== 42161n) {
      console.error(`❌ ERROR: Not connected to Arbitrum`);
      return false;
    }
  }

  console.log(`📍 Chain: ${networkName.toUpperCase()}`);
  console.log(`📍 OFT Contract: ${localOFT}`);
  console.log(`📍 Remote EID: ${remoteEid}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  console.log(`📋 DVN Addresses to configure:`);
  dvnAddresses.forEach((dvn, i) => {
    console.log(`   ${i + 1}. ${dvn}`);
  });

  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  // Configure ULN Send Config
  console.log(`\n${"─".repeat(80)}`);
  console.log(`1️⃣  CONFIGURE ULN SEND CONFIG`);
  console.log(`${"─".repeat(80)}\n`);

  try {
    // ULN Send Config encoding
    // struct UlnConfig {
    //   uint64 confirmations;
    //   uint8 optionalDVNCount;
    //   address[] requiredDVNs;
    //   address[] optionalDVNs;
    // }
    const sendConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "uint8", "address[]", "address[]"],
      [
        1, // 1 confirmation
        0, // 0 optional DVNs
        dvnAddresses, // Required DVNs
        [] // Empty optional DVNs
      ]
    );

    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 1, // ULN_SEND_CONFIG
        config: sendConfigBytes,
      },
    ];

    console.log(`📝 Setting ULN Send Config...`);
    console.log(`   Confirmations: 1`);
    console.log(`   Required DVNs: ${dvnAddresses.length}`);
    console.log(`   Optional DVNs: 0`);

    const sendConfigTx = await endpoint.setConfig(localOFT, setConfigParams, {
      gasLimit: 500000,
    });

    console.log(`\n✅ Send Config TX: ${sendConfigTx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);

    const sendReceipt = await sendConfigTx.wait();
    if (sendReceipt.status === 1) {
      console.log(`✅ Send Config confirmed at block ${sendReceipt.blockNumber}`);
    } else {
      console.log(`❌ Send Config transaction failed`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Send Config error:`, e.message);
    return false;
  }

  // Configure ULN Receive Config
  console.log(`\n${"─".repeat(80)}`);
  console.log(`2️⃣  CONFIGURE ULN RECEIVE CONFIG`);
  console.log(`${"─".repeat(80)}\n`);

  try {
    // ULN Receive Config encoding (same structure as send)
    const receiveConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "uint8", "address[]", "address[]"],
      [
        1, // 1 confirmation
        0, // 0 optional DVNs
        dvnAddresses, // Required DVNs
        [] // Empty optional DVNs
      ]
    );

    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 2, // ULN_RECEIVE_CONFIG
        config: receiveConfigBytes,
      },
    ];

    console.log(`📝 Setting ULN Receive Config...`);
    console.log(`   Confirmations: 1`);
    console.log(`   Required DVNs: ${dvnAddresses.length}`);
    console.log(`   Optional DVNs: 0`);

    const receiveConfigTx = await endpoint.setConfig(localOFT, setConfigParams, {
      gasLimit: 500000,
    });

    console.log(`\n✅ Receive Config TX: ${receiveConfigTx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);

    const receiveReceipt = await receiveConfigTx.wait();
    if (receiveReceipt.status === 1) {
      console.log(`✅ Receive Config confirmed at block ${receiveReceipt.blockNumber}`);
    } else {
      console.log(`❌ Receive Config transaction failed`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Receive Config error:`, e.message);
    return false;
  }

  console.log(`\n${"═".repeat(80)}`);
  console.log(`✅ DVN CONFIGURATION COMPLETE FOR ${networkName.toUpperCase()}`);
  console.log(`${"═".repeat(80)}\n`);

  return true;
}

async function main() {
  console.log(`\n╔${"═".repeat(80)}╗`);
  console.log(`║ ${"CONFIGURE ULN DVN FOR CROSS-CHAIN MESSAGING".padEnd(78)} ║`);
  console.log(`╚${"═".repeat(80)}╝`);

  console.log(`\n📋 DVN Configuration:`);
  console.log(`   Google Cloud Oracle: ${DVNS.googleCloud}`);
  console.log(`   Stargate Base: ${DVNS.stargateBase}`);
  console.log(`   Stargate Arbitrum: ${DVNS.stargateArbitrum}\n`);

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

  const result = await configureDVN(networkName);

  if (result) {
    console.log(`✅ SUCCESS!\n`);
    console.log(`Next: Run this script on the ${networkName === "base" ? "Arbitrum" : "Base"} chain to complete DVN configuration\n`);
  } else {
    console.log(`❌ FAILED\n`);
  }

  process.exit(result ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
