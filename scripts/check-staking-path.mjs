import hre from "hardhat";

const { ethers } = hre;

// ONBTStakingOApp contracts
const STAKING_OAPP = {
  8453: "0x8353D0Dfe7958D9300a43f1785Fd7240A8B8Ff0f",  // Base
  42161: "0x51f497515b1398FF8e9C0358Bc6D0b3A51eDd532", // Arbitrum
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

const EID = {
  base: 30184,
  arbitrum: 30110,
};

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  const remoteEid = chainId === 8453 ? EID.arbitrum : EID.base;
  const remoteName = chainId === 8453 ? "Arbitrum" : "Base";
  
  console.log("\n" + "=".repeat(80));
  console.log(`🔍 Checking ONBTStakingOApp Path Initialization`);
  console.log("=".repeat(80));
  console.log(`\nCurrent Chain: ${chainName} (${chainId})`);
  console.log(`Target Chain: ${remoteName} (EID ${remoteEid})\n`);

  const stakingAddr = STAKING_OAPP[chainId];
  console.log(`Staking Contract: ${stakingAddr}`);
  console.log(`Endpoint: ${ENDPOINT}\n`);

  try {
    const endpoint = await ethers.getContractAt("ILayerZeroEndpointV2", ENDPOINT);

    // Check send library
    console.log("━".repeat(80));
    console.log("📡 SEND PATH CONFIGURATION");
    console.log("━".repeat(80));
    
    const sendLibrary = await endpoint.getSendLibrary(stakingAddr, remoteEid);
    console.log(`Send Library: ${sendLibrary}`);
    
    if (sendLibrary === ethers.ZeroAddress) {
      console.log(`Status: ❌ NOT INITIALIZED\n`);
    } else {
      console.log(`Status: ✅ INITIALIZED\n`);
    }

    // Check receive library
    console.log("━".repeat(80));
    console.log("📥 RECEIVE PATH CONFIGURATION");
    console.log("━".repeat(80));
    
    const receiveLibrary = await endpoint.getReceiveLibrary(stakingAddr, remoteEid);
    console.log(`Receive Library: ${receiveLibrary}`);
    
    if (receiveLibrary === ethers.ZeroAddress) {
      console.log(`Status: ❌ NOT INITIALIZED\n`);
    } else {
      console.log(`Status: ✅ INITIALIZED\n`);
    }

    // Check peer configuration
    console.log("━".repeat(80));
    console.log("🔗 PEER CONFIGURATION");
    console.log("━".repeat(80));
    
    const staking = await ethers.getContractAt("ONBTStakingOApp", stakingAddr);
    const peer = await staking.peers(remoteEid);
    console.log(`Peer (${remoteName}): ${peer}`);
    console.log(`Status: ${peer !== ethers.ZeroHash ? "✅ CONFIGURED" : "❌ NOT SET"}\n`);

    // Summary
    console.log("=".repeat(80));
    console.log("📊 INITIALIZATION STATUS");
    console.log("=".repeat(80));
    
    const pathInitialized = sendLibrary !== ethers.ZeroAddress && receiveLibrary !== ethers.ZeroAddress;
    const peerConfigured = peer !== ethers.ZeroHash;
    
    if (pathInitialized && peerConfigured) {
      console.log("\n✅ READY FOR CROSS-CHAIN STAKING!");
      console.log("   - LayerZero path is initialized");
      console.log("   - Peer configuration complete");
      console.log("\n📝 Next Steps:");
      console.log("   1. Fund reward pool with ONBT tokens");
      console.log("   2. Test staking on this chain");
      console.log("   3. Verify cross-chain sync works\n");
    } else if (!pathInitialized && peerConfigured) {
      console.log("\n⏳ WAITING FOR LAYERZERO PATH INITIALIZATION");
      console.log("   - Peer configuration: ✅ Complete");
      console.log("   - Path initialization: ⏳ Pending");
      console.log("\n📝 To request initialization:");
      console.log("   🌐 https://layerzero.network/contact");
      console.log("   💬 https://discord-layerzero.netlify.app/discord");
      console.log("\n   Provide:");
      console.log(`   • Source: ${chainName} (${chainId})`);
      console.log(`   • Destination: ${remoteName} (EID ${remoteEid})`);
      console.log(`   • OApp: ${stakingAddr}`);
      console.log(`   • Endpoint: ${ENDPOINT}`);
      console.log("\n   ⏰ Expected: 1-7 business days\n");
    } else {
      console.log("\n❌ CONFIGURATION INCOMPLETE");
      if (!peerConfigured) {
        console.log("   - Run: npx hardhat run scripts/configure-staking-peers.mjs --network " + chainName.toLowerCase());
      }
      if (!pathInitialized) {
        console.log("   - Request LayerZero path initialization");
      }
      console.log();
    }

    // Check both chains
    if (chainId === 8453) {
      console.log("💡 TIP: Check Arbitrum too:");
      console.log("   npx hardhat run scripts/check-staking-path.mjs --network arbitrum\n");
    } else {
      console.log("💡 TIP: Check Base too:");
      console.log("   npx hardhat run scripts/check-staking-path.mjs --network base\n");
    }

  } catch (error) {
    console.error("\n❌ Error:");
    console.error(error.message);
    console.log();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
