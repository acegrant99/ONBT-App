import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

/**
 * Check LayerZero V2 Endpoint Configuration
 * Diagnoses why the path might not be working
 */

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

// Deployments
const BASE_OFT = config.oft.base.address;
const ARBITRUM_OFT = config.oft.arbitrum.address;

// LayerZero V2 Endpoint IDs
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

// LayerZero Endpoint
const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║      LayerZero V2 Endpoint Diagnostics                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  let localOFT, remoteEid, localName, remoteName;

  // Determine which network we're on
  if (network.chainId === 8453n) {
    localOFT = BASE_OFT;
    remoteEid = ARBITRUM_EID;
    localName = "Base";
    remoteName = "Arbitrum";
  } else if (network.chainId === 42161n) {
    localOFT = ARBITRUM_OFT;
    remoteEid = BASE_EID;
    localName = "Arbitrum";
    remoteName = "Base";
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log(`Network: ${localName}`);
  console.log(`OFT: ${localOFT}`);
  console.log(`Endpoint: ${LZ_ENDPOINT}`);
  console.log(`Signer: ${signer.address}\n`);

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  
  // Check ownership
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  1. Contract Ownership                                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  const owner = await oft.owner();
  console.log(`Owner: ${owner}`);
  console.log(`Is Signer Owner? ${owner.toLowerCase() === signer.address.toLowerCase() ? "✅ YES" : "❌ NO"}\n`);

  // Check endpoint
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  2. Endpoint Configuration                                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  const endpoint = await oft.endpoint();
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Correct? ${endpoint.toLowerCase() === LZ_ENDPOINT.toLowerCase() ? "✅ YES" : "❌ NO"}\n`);

  // Get endpoint contract
  const endpointContract = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol:ILayerZeroEndpointV2",
    LZ_ENDPOINT
  );

  // Check delegate
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  3. Endpoint Delegate                                      ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  try {
    const delegate = await endpointContract.delegates(localOFT);
    console.log(`Delegate for OFT: ${delegate}`);
    if (delegate === "0x0000000000000000000000000000000000000000") {
      console.log(`Status: ⚠️  No delegate set (using OFT itself as default)\n`);
    } else if (delegate.toLowerCase() === owner.toLowerCase()) {
      console.log(`Status: ✅ Delegate matches owner\n`);
    } else {
      console.log(`Status: ⚠️  Delegate is different from owner\n`);
    }
  } catch (error) {
    console.log(`Error checking delegate: ${error.message}\n`);
  }

  // Check peer
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  4. Peer Configuration                                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  const peer = await oft.peers(remoteEid);
  console.log(`Peer for EID ${remoteEid}: ${peer}`);
  console.log(`Is Set? ${peer !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? "✅ YES" : "❌ NO"}\n`);

  // Check send library
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  5. Send Library                                           ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  try {
    const sendLibrary = await endpointContract.getSendLibrary(localOFT, remoteEid);
    console.log(`Send Library: ${sendLibrary}`);
    console.log(`Is Set? ${sendLibrary !== "0x0000000000000000000000000000000000000000" ? "✅ YES" : "❌ NO"}\n`);
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Check receive library
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  6. Receive Library                                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  try {
    const receiveLibrary = await endpointContract.getReceiveLibrary(localOFT, remoteEid);
    console.log(`Receive Library: ${receiveLibrary[0]}`);
    console.log(`Is Set? ${receiveLibrary[0] !== "0x0000000000000000000000000000000000000000" ? "✅ YES" : "❌ NO"}\n`);
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Check enforced options
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  7. Enforced Options                                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  try {
    const enforcedOptions = await oft.enforcedOptions(remoteEid, 1); // 1 = SEND message type
    console.log(`Enforced Options: ${enforcedOptions}`);
    console.log(`Is Set? ${enforcedOptions !== "0x" ? "✅ YES" : "⚠️  NO (using defaults)"}\n`);
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Check msg inspector
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  8. Msg Inspector                                          ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  try {
    const inspector = await oft.msgInspector();
    console.log(`Msg Inspector: ${inspector}`);
    console.log(`Is Set? ${inspector !== "0x0000000000000000000000000000000000000000" ? "✅ YES" : "⚠️  NO"}\n`);
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  Summary                                                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("If all checks pass, the path should be ready.");
  console.log("If quote still fails, try:");
  console.log("  1. Set delegate: oft.setDelegate(owner)");
  console.log("  2. Wait a few blocks for confirmations");
  console.log("  3. Try again on Arbitrum side\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Diagnostics failed!");
    console.error(error);
    process.exit(1);
  });
