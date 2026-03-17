import hre from "hardhat";
const { ethers, network } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEPLOY_DIR = path.join(__dirname, "..", "deploy");

// New staking addresses
const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";

// LayerZero EIDs
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

// Enforced options: 200k gas for lzReceive
const ENFORCED_OPTIONS = "0x00030100110100000000000000000000000000030d40";

// Message types
const MSG_TYPES = {
  STAKE: 1,
  UNSTAKE: 2,
  SYNC_REWARDS: 3,
  CLAIM_REWARDS: 4,
  COMPOUND: 5
};

function addressToBytes32(address) {
  return ethers.utils.hexZeroPad(address, 32);
}

async function main() {
  const isBase = network.name === "base";
  const networkName = isBase ? "BASE" : "ARBITRUM";
  const localStaking = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const remoteStaking = isBase ? ARBITRUM_STAKING : BASE_STAKING;
  const remoteEid = isBase ? ARBITRUM_EID : BASE_EID;

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log(`Configuring Staking Contract - ${networkName}`);
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log(`Local staking: ${localStaking}`);
  console.log(`Remote staking: ${remoteStaking}`);
  console.log(`Remote EID: ${remoteEid}`);

  const staking = await ethers.getContractAt("ONBTOmnichainStaking", localStaking);

  // 1. Set peer
  console.log("\n1. Setting peer...");
  try {
    const peerBytes32 = addressToBytes32(remoteStaking);
    const currentPeer = await staking.peers(remoteEid);
    
    if (currentPeer === peerBytes32) {
      console.log(`   ✓ Peer already set correctly`);
    } else {
      const tx = await staking.setPeer(remoteEid, peerBytes32);
      console.log(`   ✓ setPeer tx: ${tx.hash}`);
      await tx.wait();
      console.log(`   ✓ Peer confirmed`);
    }
  } catch (error) {
    console.log(`   ⚠️  setPeer failed: ${error.message}`);
  }

  // 2. Set enforced options for all message types
  console.log("\n2. Setting enforced options...");
  const enforcedOptionsConfigs = Object.entries(MSG_TYPES).map(([name, msgType]) => ({
    eid: remoteEid,
    msgType,
    options: ENFORCED_OPTIONS
  }));

  try {
    const tx = await staking.setEnforcedOptions(enforcedOptionsConfigs);
    console.log(`   ✓ setEnforcedOptions tx: ${tx.hash}`);
    await tx.wait();
    console.log(`   ✓ Set options for ${Object.keys(MSG_TYPES).length} message types`);
  } catch (error) {
    console.log(`   ⚠️  setEnforcedOptions failed: ${error.message}`);
  }

  // 3. Verify configuration
  console.log("\n3. Verifying configuration...");
  try {
    const peer = await staking.peers(remoteEid);
    const expectedPeer = addressToBytes32(remoteStaking);
    console.log(`   Peer: ${peer === expectedPeer ? "✓" : "✗"} ${peer}`);

    for (const [name, msgType] of Object.entries(MSG_TYPES)) {
      const options = await staking.enforcedOptions(remoteEid, msgType);
      const isCorrect = options.toLowerCase() === ENFORCED_OPTIONS.toLowerCase();
      console.log(`   ${name} (${msgType}): ${isCorrect ? "✓" : "✗"} ${options}`);
    }
  } catch (error) {
    console.log(`   ⚠️  Verification failed: ${error.message}`);
  }

  console.log("\n✅ Configuration complete!");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
