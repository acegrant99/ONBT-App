import hre from "hardhat";
const { ethers } = hre;

/**
 * Set LayerZero OApp Configuration for OmnichainNabatOFT
 * This configures DVNs and Executor for the OFT on Base
 */

// Contract address on Base
const OFT_ADDRESS = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";

// LayerZero V2 Endpoint on Base
const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// Base Mainnet DVNs (Decentralized Verifier Networks)
const LAYERZERO_DVN = "0x9e059a54699a285714207b43B055483E78FAac25";
const GOOGLE_CLOUD_DVN = "0xa7b5189bca84cd304d8553977c7c614329750d99";
const POLYHEDRA_DVN = "0x8ddf05F9A5c488b4973897E278B58895bF87Cb24";

// Base Mainnet Executor
const LAYERZERO_EXECUTOR = "0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4";

// MessageLib addresses on Base
const SEND_LIB_302 = "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2";
const RECEIVE_LIB_302 = "0xc1B621b18187F74c8F6D52a6F709Dd2780C09821";

async function main() {
  const [signer] = await ethers.getSigners();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║       LayerZero V2 Configuration for OmnichainNabatOFT   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Signer:", signer.address);
  console.log("OFT Address:", OFT_ADDRESS);
  console.log("Network: Base Mainnet\n");

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", OFT_ADDRESS);
  
  // Get Endpoint contract
  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol:ILayerZeroEndpointV2",
    LZ_ENDPOINT
  );

  console.log("--- Current Configuration ---");
  const owner = await oft.owner();
  console.log("OFT Owner:", owner);

  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.error("\n❌ Error: Signer is not the owner of the OFT");
    console.log("Please use the owner account:", owner);
    process.exit(1);
  }

  console.log("\n✅ You are the owner - ready to configure!");
  
  console.log("\n--- LayerZero V2 Configuration Details ---");
  console.log("\nBase Mainnet Resources:");
  console.log("  Endpoint ID (eid): 30184");
  console.log("  Send Library (ULN302):", SEND_LIB_302);
  console.log("  Receive Library (ULN302):", RECEIVE_LIB_302);
  console.log("\nRecommended DVNs:");
  console.log("  LayerZero DVN:", LAYERZERO_DVN);
  console.log("  Google Cloud DVN:", GOOGLE_CLOUD_DVN);
  console.log("  Polyhedra DVN:", POLYHEDRA_DVN);
  console.log("\nRecommended Executor:");
  console.log("  LayerZero Executor:", LAYERZERO_EXECUTOR);

  // For now, just display the configuration that should be set
  // Actual setting requires destination chain to be deployed first
  
  console.log("📝 Configuration to set once destination chain is deployed:");
  console.log("\nFor each destination endpoint ID (eid):");
  console.log("1. Set Send Config (DVNs)");
  console.log("   - Required DVNs: LayerZero + Google Cloud");
  console.log("   - Optional DVN: Polyhedra");
  console.log("   - Confirmations: 10-15 blocks");
  console.log("\n2. Set Receive Config (DVNs)");
  console.log("   - Same DVN configuration");
  console.log("\n3. Set Executor Config");
  console.log("   - Executor:", LAYERZERO_EXECUTOR);
  console.log("   - Max Message Size: 10000 bytes");
  console.log("\n4. Set Peers (setPeer)");
  console.log("   - Connect Base OFT ↔ Destination OFT");

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("1. Deploy OFT on destination chain (e.g., Arbitrum)");
  console.log("2. Use LayerZero's official tooling to wire configs:");
  console.log("   https://docs.layerzero.network/v2/developers/evm/configuration");
  console.log("\n3. Or use the setPeer function directly:");
  console.log("   await oft.setPeer(destinationEid, addressToBytes32(destAddress))");
  console.log("\n4. Test cross-chain transfer with quote:");
  console.log("   Use LayerZero's send function to bridge tokens");
  
  console.log("\n✅ Configuration guide complete!");
  console.log("🌐 Current deployment: Base only");
  console.log("📌 Ready for cross-chain setup after destination deployment");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Configuration failed!");
    console.error(error);
    process.exit(1);
  });
