import hre from "hardhat";
const { ethers } = hre;

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const OFT_BASE = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const ARBITRUM_EID = 30110;

const ENDPOINT_ABI = [
  "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) external view returns (bytes memory)",
];

const DVNS = {
  googleCloud: "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc",
  stargateBase: "0xcdF31d62140204C08853b547E64707110fBC6680",
};

const SEND_LIB = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";
const RECEIVE_LIB = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";

async function diagnose() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n╔${"═".repeat(80)}╗`);
  console.log(`║ ${"Diagnose ULN Configuration".padEnd(78)} ║`);
  console.log(`╚${"═".repeat(80)}╝\n`);

  if (network.chainId !== 8453n) {
    console.error(`❌ Not connected to Base`);
    process.exit(1);
  }

  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  console.log(`📍 OFT: ${OFT_BASE}`);
  console.log(`📍 Send Lib: ${SEND_LIB}`);
  console.log(`📍 Receive Lib: ${RECEIVE_LIB}`);
  console.log(`📍 Endpoint: ${ENDPOINT}\n`);

  // Check current send config
  console.log(`${"─".repeat(80)}`);
  console.log(`1️⃣  CURRENT SEND CONFIG`);
  console.log(`${"─".repeat(80)}\n`);

  try {
    const sendConfig = await endpoint.getConfig(OFT_BASE, SEND_LIB, ARBITRUM_EID, 1);
    console.log(`✅ Send Config (hex): ${sendConfig}`);
    
    if (sendConfig !== "0x") {
      // Try to decode it
      try {
        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
          ["uint64", "uint8", "address[]", "address[]"],
          sendConfig
        );
        console.log(`\n   Confirmations: ${decoded[0]}`);
        console.log(`   Optional DVN Count: ${decoded[1]}`);
        console.log(`   Required DVNs: ${decoded[2].length}`);
        decoded[2].forEach((dvn, i) => {
          console.log(`     ${i + 1}. ${dvn}`);
        });
        console.log(`   Optional DVNs: ${decoded[3].length}`);
      } catch (e) {
        console.log(`   (Could not decode as standard format)`);
      }
    } else {
      console.log(`(No config set yet)`);
    }
  } catch (e) {
    console.log(`⚠️  Could not read send config: ${e.message}`);
  }

  // Check current receive config
  console.log(`\n${"─".repeat(80)}`);
  console.log(`2️⃣  CURRENT RECEIVE CONFIG`);
  console.log(`${"─".repeat(80)}\n`);

  try {
    const receiveConfig = await endpoint.getConfig(OFT_BASE, RECEIVE_LIB, ARBITRUM_EID, 2);
    console.log(`✅ Receive Config (hex): ${receiveConfig}`);
    
    if (receiveConfig !== "0x") {
      // Try to decode it
      try {
        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
          ["uint64", "uint8", "address[]", "address[]"],
          receiveConfig
        );
        console.log(`\n   Confirmations: ${decoded[0]}`);
        console.log(`   Optional DVN Count: ${decoded[1]}`);
        console.log(`   Required DVNs: ${decoded[2].length}`);
        decoded[2].forEach((dvn, i) => {
          console.log(`     ${i + 1}. ${dvn}`);
        });
        console.log(`   Optional DVNs: ${decoded[3].length}`);
      } catch (e) {
        console.log(`   (Could not decode as standard format)`);
      }
    } else {
      console.log(`(No config set yet)`);
    }
  } catch (e) {
    console.log(`⚠️  Could not read receive config: ${e.message}`);
  }

  console.log(`\n${"─".repeat(80)}`);
  console.log(`3️⃣  TEST DVN ADDRESSES`);
  console.log(`${"─".repeat(80)}\n`);

  console.log(`Google Cloud Oracle: ${DVNS.googleCloud}`);
  const gcCode = await ethers.provider.getCode(DVNS.googleCloud);
  console.log(`  Has code: ${gcCode !== "0x" ? "✅ YES" : "❌ NO"}`);

  console.log(`\nStargate DVN Base: ${DVNS.stargateBase}`);
  const sgCode = await ethers.provider.getCode(DVNS.stargateBase);
  console.log(`  Has code: ${sgCode !== "0x" ? "✅ YES" : "❌ NO"}`);

  console.log(`\n${"─".repeat(80)}\n`);
}

diagnose()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
