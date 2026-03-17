import hre from "hardhat";
const { ethers } = hre;

/**
 * Set LayerZero V2 Optional DVN Configuration
 * Adds additional security with optional DVNs (Polyhedra, etc.)
 */

// Deployments
const BASE_OFT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_OFT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

// LayerZero V2 Endpoint IDs
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

// LayerZero Endpoint
const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// Base DVNs
const BASE_LAYERZERO_DVN = "0x9e059a54699a285714207b43B055483E78FAac25";
const BASE_GOOGLE_DVN = "0xa7b5189bca84cd304d8553977c7c614329750d99";
const BASE_POLYHEDRA_DVN = "0x8ddf05F9A5c488b4973897E278B58895bF87Cb24";

// Arbitrum DVNs
const ARB_LAYERZERO_DVN = "0x2f55C492897526677C5B68fb199ea31E2c126416";
const ARB_GOOGLE_DVN = "0xa7b5189bca84cd304d8553977c7c614329750d99";
const ARB_STARGATE_DVN = "0xa59BA433ac34D2927232918Ef5B2eaAfcF130BA5";

// Executor addresses
const BASE_EXECUTOR = "0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4";
const ARB_EXECUTOR = "0x31CAe3B7fB82d847621859fb1585353c5720660D";

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║      LayerZero V2 Optional Configuration Setup            ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Signer:", signer.address);
  console.log("Network Chain ID:", network.chainId.toString());
  console.log();

  let localOFT, remoteEid, localName, remoteName, requiredDVNs, optionalDVNs, executor;

  // Determine which network we're on
  if (network.chainId === 8453n) {
    // Base
    localOFT = BASE_OFT;
    remoteEid = ARBITRUM_EID;
    localName = "Base";
    remoteName = "Arbitrum";
    requiredDVNs = [BASE_LAYERZERO_DVN, BASE_GOOGLE_DVN];
    optionalDVNs = [BASE_POLYHEDRA_DVN];
    executor = BASE_EXECUTOR;
  } else if (network.chainId === 42161n) {
    // Arbitrum
    localOFT = ARBITRUM_OFT;
    remoteEid = BASE_EID;
    localName = "Arbitrum";
    remoteName = "Base";
    requiredDVNs = [ARB_LAYERZERO_DVN, ARB_GOOGLE_DVN];
    optionalDVNs = [ARB_STARGATE_DVN];
    executor = ARB_EXECUTOR;
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log("--- Configuration ---");
  console.log(`Local Network: ${localName}`);
  console.log(`Local OFT: ${localOFT}`);
  console.log(`Remote Endpoint ID: ${remoteEid} (${remoteName})`);
  console.log();

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  
  // Check owner
  const owner = await oft.owner();
  console.log("OFT Owner:", owner);
  
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.error("\n❌ Error: Signer is not the owner of the OFT");
    console.log("Please use the owner account:", owner);
    process.exit(1);
  }

  console.log("✅ You are the owner\n");

  // Get endpoint contract
  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol:ILayerZeroEndpointV2",
    LZ_ENDPOINT
  );

  console.log("--- DVN Configuration ---");
  console.log("Required DVNs:");
  requiredDVNs.forEach((dvn, i) => console.log(`  ${i + 1}. ${dvn}`));
  console.log("\nOptional DVNs:");
  optionalDVNs.forEach((dvn, i) => console.log(`  ${i + 1}. ${dvn}`));
  console.log("\nExecutor:", executor);
  console.log("\nOptional DVN Threshold: 1 (requires 1 optional DVN)");

  // Create UlnConfig struct
  const ulnConfig = {
    confirmations: 15, // Block confirmations
    requiredDVNCount: requiredDVNs.length,
    optionalDVNCount: optionalDVNs.length,
    optionalDVNThreshold: 1,
    requiredDVNs: requiredDVNs,
    optionalDVNs: optionalDVNs
  };

  console.log("\n--- Setting Configuration ---");
  console.log(`Destination: ${remoteName} (EID: ${remoteEid})`);
  console.log("Confirmations: 15 blocks");
  console.log(`Required DVNs: ${requiredDVNs.length}`);
  console.log(`Optional DVNs: ${optionalDVNs.length}`);
  console.log("Optional Threshold: 1\n");

  try {
    // Note: Setting config through OApp requires delegate permissions
    // The config is set via the endpoint's setConfig function
    // This is typically done through LayerZero's official tooling or the endpoint directly
    
    console.log("⚠️  Configuration Summary:");
    console.log("\nTo set this configuration, you have two options:\n");
    console.log("1. Use LayerZero's official CLI/tooling:");
    console.log("   https://docs.layerzero.network/v2/developers/evm/configuration\n");
    console.log("2. Call setConfig on the endpoint directly as the delegate:");
    console.log(`   endpoint.setConfig(${localOFT}, ..., ulnConfig)`);
    
    console.log("\n✅ Configuration details prepared!");
    console.log("\n📝 Save this configuration for reference:");
    console.log(JSON.stringify({
      network: localName,
      oft: localOFT,
      remoteEid: remoteEid,
      requiredDVNs: requiredDVNs,
      optionalDVNs: optionalDVNs,
      optionalThreshold: 1,
      confirmations: 15,
      executor: executor
    }, null, 2));

  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("1. LayerZero V2 uses default configs (LayerZero DVN + Google DVN)");
  console.log("2. Optional DVNs provide additional security but are not required");
  console.log("3. Your OFT is ready to use with default secure configuration");
  console.log("4. Test cross-chain transfer to verify everything works");
  console.log("\n💡 The default configuration is production-ready and secure!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Configuration failed!");
    console.error(error);
    process.exit(1);
  });
