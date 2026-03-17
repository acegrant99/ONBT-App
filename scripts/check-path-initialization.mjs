import hre from "hardhat";

const { ethers } = hre;

// Staking contracts
const STAKING = {
  8453: "0x8353D0Dfe7958D9300a43f1785Fd7240A8B8Ff0f",  // Base
  42161: "0x51f497515b1398FF8e9C0358Bc6D0b3A51eDd532", // Arbitrum
};

// OFT contracts (for comparison)
const OFT = {
  8453: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",  // Base
  42161: "0x42bB5FD891c070A64d31752855E94A01edDd766E", // Arbitrum
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

const EID = {
  base: 30184,
  arbitrum: 30110,
};

async function checkPath(endpoint, eid, oappAddress, description) {
  console.log(`\n📍 ${description}:`);
  console.log(`   OApp: ${oappAddress}`);
  console.log(`   Destination EID: ${eid}`);
  
  try {
    // Try to get send library (indicates path is configured)
    const sendLibrary = await endpoint.getSendLibrary(oappAddress, eid);
    console.log(`   Send Library: ${sendLibrary}`);
    
    if (sendLibrary === ethers.ZeroAddress) {
      console.log(`   Status: ❌ NOT INITIALIZED (using default)\n`);
      return false;
    }
    
    // Try to get receive library
    const receiveLibrary = await endpoint.getReceiveLibrary(oappAddress, eid);
    console.log(`   Receive Library: ${receiveLibrary}`);
    
    if (receiveLibrary === ethers.ZeroAddress) {
      console.log(`   Status: ⚠️  PARTIALLY INITIALIZED\n`);
      return false;
    }
    
    console.log(`   Status: ✅ INITIALIZED\n`);
    return true;
    
  } catch (e) {
    console.log(`   Status: ❌ ERROR - ${e.message}\n`);
    return false;
  }
}

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  const remoteEid = chainId === 8453 ? EID.arbitrum : EID.base;
  const remoteName = chainId === 8453 ? "Arbitrum" : "Base";
  
  console.log("\n" + "=".repeat(80));
  console.log(`🔍 Checking LayerZero Path Initialization from ${chainName}`);
  console.log("=".repeat(80));

  const endpoint = await ethers.getContractAt("ILayerZeroEndpointV2", ENDPOINT);
  const stakingAddr = STAKING[chainId];
  const oftAddr = OFT[chainId];

  console.log(`\nEndpoint: ${ENDPOINT}`);
  console.log(`Checking paths to ${remoteName} (EID ${remoteEid})\n`);

  // Check staking contract path
  console.log("━".repeat(80));
  console.log("📊 STAKING CONTRACT PATH");
  console.log("━".repeat(80));
  const stakingInitialized = await checkPath(endpoint, remoteEid, stakingAddr, `${chainName} Staking → ${remoteName}`);

  // Check OFT contract path (for comparison)
  console.log("━".repeat(80));
  console.log("🪙 OFT CONTRACT PATH (For Comparison)");
  console.log("━".repeat(80));
  const oftInitialized = await checkPath(endpoint, remoteEid, oftAddr, `${chainName} OFT → ${remoteName}`);

  // Summary
  console.log("=".repeat(80));
  console.log("📋 SUMMARY");
  console.log("=".repeat(80));
  
  if (stakingInitialized) {
    console.log("\n✅ STAKING PATH IS INITIALIZED!");
    console.log("   You can now test cross-chain staking functionality.");
  } else {
    console.log("\n⏳ STAKING PATH NOT YET INITIALIZED");
    console.log("\n📝 To request initialization:");
    console.log("   1. Visit https://layerzero.network/contact");
    console.log("   2. Or join LayerZero Discord: https://discord-layerzero.netlify.app/discord");
    console.log("   3. Provide:");
    console.log(`      - Source Chain: ${chainName} (${chainId})`);
    console.log(`      - Destination Chain: ${remoteName}`);
    console.log(`      - OApp Address: ${stakingAddr}`);
    console.log(`      - Endpoint: ${ENDPOINT}`);
    console.log("   4. Expected timeline: 1-7 business days");
  }
  
  if (oftInitialized) {
    console.log(`\n✅ Your OFT path (${oftAddr}) is already initialized!`);
    console.log("   This is a good sign - LayerZero is already familiar with your project.");
  }

  console.log("\n💡 TIP: Run this script periodically to check status:");
  console.log(`   npx hardhat run scripts/check-path-initialization.mjs --network ${chainName.toLowerCase()}`);
  console.log("\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
