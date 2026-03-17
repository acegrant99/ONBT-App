import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const isV6 = !!ethers.AbiCoder;
const solidityPacked = (types, values) => (
  isV6 ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values)
);
const getBytes = (value) => (
  isV6 ? ethers.getBytes(value) : ethers.utils.arrayify(value)
);

function buildLzReceiveOptions(gas, value = 0n) {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);

  const optionSize = getBytes(option).length + 1; // +1 for optionType

  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option] // type3, executor worker, lzReceive
  );
}

async function setEnforcedOptions(networkName) {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n${"═".repeat(80)}`);
  console.log(`⚙️  SET ENFORCED OPTIONS FOR ${networkName.toUpperCase()}`);
  console.log(`${"═".repeat(80)}\n`);

  let localChain, remoteChain, localOFT, remoteEid;

  if (networkName === "base") {
    localChain = "base";
    remoteChain = "arbitrum";
    localOFT = config.oft.base.address;
    remoteEid = config.oft.arbitrum.lzEid;

    if (Number(network.chainId) !== 8453) {
      console.error(`❌ ERROR: Not connected to Base. Current chain: ${network.chainId}`);
      return false;
    }
  } else {
    localChain = "arbitrum";
    remoteChain = "base";
    localOFT = config.oft.arbitrum.address;
    remoteEid = config.oft.base.lzEid;

    if (Number(network.chainId) !== 42161) {
      console.error(`❌ ERROR: Not connected to Arbitrum. Current chain: ${network.chainId}`);
      return false;
    }
  }

  console.log(`📍 Chain: ${networkName.toUpperCase()}`);
  console.log(`📍 Remote Chain: ${remoteChain.toUpperCase()}`);
  console.log(`📍 OFT Contract: ${localOFT}`);
  console.log(`📍 Remote EID: ${remoteEid}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);

  // Check current enforced options
  console.log(`🔍 Checking current enforced options...`);
  try {
    const currentOptions = await oft.enforcedOptions(remoteEid, 1); // msgType 1 = SEND
    if (currentOptions && currentOptions !== "0x") {
      console.log(`✅ Enforced options already configured`);
      console.log(`   Current: ${currentOptions}`);
      return true;
    } else {
      console.log(`ℹ️  No enforced options configured yet`);
    }
  } catch (e) {
    console.log(`⚠️  Could not read enforced options: ${e.message}`);
  }

  // Prepare enforced options
  console.log(`\n⚙️  Preparing enforced options...`);

  // Message types: 1 = SEND, 2 = SEND_AND_CALL
  const msgTypes = [1]; // Configure for SEND
  const minGas = BigInt(config.configuration.enforcedOptions.minGas || 200000);
  const encodedOptions = buildLzReceiveOptions(minGas, 0n);

  console.log(`✅ Message types: [${msgTypes.join(", ")}]`);
  console.log(`✅ Option type: 3 (LZ_RECEIVE)`);
  console.log(`✅ Minimum gas for lzReceive: ${minGas.toString()}`);
  console.log(`✅ Encoded options: ${encodedOptions}`);

  // Set enforced options
  console.log(`\n🚀 Setting enforced options on ${localChain.toUpperCase()}...`);
  try {
    const params = [{
      eid: remoteEid,
      msgType: msgTypes[0],
      options: encodedOptions,
    }];
    const tx = await oft.setEnforcedOptions(params, { gasLimit: 300000 });

    console.log(`📝 Transaction: ${tx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);

    const receipt = await tx.wait();

    if (receipt.status === 1) {
      console.log(`✅ SUCCESS! Enforced options configured`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
      return true;
    } else {
      console.log(`❌ FAILED: Transaction reverted`);
      return false;
    }
  } catch (e) {
    console.error(`❌ ERROR setting enforced options`);
    console.error(`   ${e.message}`);
    return false;
  }
}

async function main() {
  console.log(`\n╔${"═".repeat(78)}╗`);
  console.log(`║ ${"SET ENFORCED OPTIONS FOR CROSS-CHAIN OFT".padEnd(76)} ║`);
  console.log(`╚${"═".repeat(78)}╝`);

  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  let networkName;
  if (Number(network.chainId) === 8453) {
    networkName = "base";
  } else if (Number(network.chainId) === 42161) {
    networkName = "arbitrum";
  } else {
    console.error(`\n❌ Unsupported network: ${network.chainId}`);
    process.exit(1);
  }

  const result = await setEnforcedOptions(networkName);

  console.log(`\n${"═".repeat(80)}`);
  if (result) {
    console.log(`✅ ENFORCED OPTIONS CONFIGURATION COMPLETE`);
  } else {
    console.log(`❌ ENFORCED OPTIONS CONFIGURATION FAILED`);
  }
  console.log(`${"═".repeat(80)}\n`);

  process.exit(result ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
