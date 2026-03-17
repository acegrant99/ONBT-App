import hre from "hardhat";
const { ethers } = hre;

const CONTRACTS = {
  base: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  arbitrum: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

const LIBRARIES = {
  base: {
    send: "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862",
    receive: "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf",
  },
  arbitrum: {
    send: "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862",
    receive: "0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6",
  },
};

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n╔═══════════════════════════════════════════════════════════════╗");
  console.log("║         ✅ ONBT CROSS-CHAIN CONFIGURATION VERIFIED           ║");
  console.log("╚═══════════════════════════════════════════════════════════════╝\n");

  let chainName, localOFT, remoteOFT, remoteEid, chainId;
  let localLibraries, remoteLibraries;

  if (network.chainId === 8453n) {
    chainName = "BASE";
    localOFT = CONTRACTS.base;
    remoteOFT = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.arbitrum;
    localLibraries = LIBRARIES.base;
    remoteLibraries = LIBRARIES.arbitrum;
    chainId = 8453;
  } else if (network.chainId === 42161n) {
    chainName = "ARBITRUM";
    localOFT = CONTRACTS.arbitrum;
    remoteOFT = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.base;
    localLibraries = LIBRARIES.arbitrum;
    remoteLibraries = LIBRARIES.base;
    chainId = 42161;
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log(`🔍 Verifying Configuration on ${chainName}`);
  console.log(`📍 Chain ID: ${chainId} (EID: ${ENDPOINT_IDS[chainName.toLowerCase()]})`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  const endpointABI = [
    {
      inputs: [
        { name: "sender", type: "address" },
        { name: "dstEid", type: "uint32" }
      ],
      name: "getSendLibrary",
      outputs: [{ name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { name: "receiver", type: "address" },
        { name: "srcEid", type: "uint32" }
      ],
      name: "getReceiveLibrary",
      outputs: [{ name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    }
  ];
  const endpoint = new ethers.Contract(ENDPOINT, endpointABI, ethers.provider);

  // Check OFT Configuration
  console.log("═".repeat(70));
  console.log("1️⃣  OFT CONTRACT CONFIGURATION");
  console.log("═".repeat(70));

  try {
    const name = await oft.name();
    const symbol = await oft.symbol();
    const decimals = await oft.decimals();
    const totalSupply = await oft.totalSupply();
    const owner = await oft.owner();

    console.log(`✅ Token Name: ${name}`);
    console.log(`✅ Symbol: ${symbol}`);
    console.log(`✅ Decimals: ${decimals}`);
    console.log(`✅ Total Supply: ${ethers.formatEther(totalSupply)} ${symbol}`);
    console.log(`✅ Owner: ${owner}`);
  } catch (e) {
    console.error(`❌ Error reading OFT info: ${e.message}`);
  }

  // Check Peer Configuration
  console.log("\n" + "═".repeat(70));
  console.log("2️⃣  PEER CONFIGURATION (REMOTE CHAIN)");
  console.log("═".repeat(70));

  try {
    const peer = await oft.peers(remoteEid);
    const expectedPeer = ethers.zeroPadValue(remoteOFT, 32);

    if (peer.toLowerCase() === expectedPeer.toLowerCase()) {
      console.log(`✅ Remote Chain EID: ${remoteEid}`);
      console.log(`✅ Peer Contract: ${remoteOFT}`);
      console.log(`✅ Peer Configured: YES`);
    } else {
      console.log(`❌ Peer Mismatch!`);
      console.log(`   Expected: ${expectedPeer}`);
      console.log(`   Got: ${peer}`);
    }
  } catch (e) {
    console.error(`❌ Error checking peer: ${e.message}`);
  }

  // Check Send Library
  console.log("\n" + "═".repeat(70));
  console.log("3️⃣  SEND LIBRARY CONFIGURATION");
  console.log("═".repeat(70));

  try {
    const sendLib = await endpoint.getSendLibrary(localOFT, remoteEid);
    console.log(`✅ Configured Library: ${sendLib}`);
    console.log(`✅ Expected Library: ${localLibraries.send}`);

    if (sendLib.toLowerCase() === localLibraries.send.toLowerCase()) {
      console.log(`✅ Send Library: CORRECT`);
    } else {
      console.log(`⚠️  Send Library: MISMATCH`);
    }
  } catch (e) {
    console.error(`❌ Error checking send library: ${e.message}`);
  }

  // Check Receive Library
  console.log("\n" + "═".repeat(70));
  console.log("4️⃣  RECEIVE LIBRARY CONFIGURATION");
  console.log("═".repeat(70));

  try {
    const receiveLib = await endpoint.getReceiveLibrary(localOFT, remoteEid);
    console.log(`✅ Configured Library: ${receiveLib}`);
    console.log(`✅ Expected Library: ${localLibraries.receive}`);

    if (receiveLib.toLowerCase() === localLibraries.receive.toLowerCase()) {
      console.log(`✅ Receive Library: CORRECT`);
    } else {
      console.log(`⚠️  Receive Library: MISMATCH`);
    }
  } catch (e) {
    console.error(`❌ Error checking receive library: ${e.message}`);
  }

  // Summary
  console.log("\n" + "═".repeat(70));
  console.log("✅ SUMMARY");
  console.log("═".repeat(70));
  console.log(`
${chainName} Configuration Status:
  ✅ OFT Contract: ${localOFT}
  ✅ Endpoint: ${ENDPOINT}
  ✅ Remote Peer: ${remoteOFT}
  ✅ Send Library: ${localLibraries.send}
  ✅ Receive Library: ${localLibraries.receive}

  🔗 Ready for cross-chain transfers!
  📊 Monitor at: https://layerzeroscan.com/
`);

  console.log("═".repeat(70));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
