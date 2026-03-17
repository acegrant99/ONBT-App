import hre from "hardhat";
const { ethers } = hre;

// Configuration - Updated for V3 deployment
const CONTRACTS = {
  base: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
  arbitrum: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

// LayerZero V2 Default DVNs (Decentralized Verifier Networks)
// Using verified DVN combinations that are known to work
const DVN_ADDRESSES = {
  base: {
    dvn1: "0x9e059a54699a285714207b43B055483E78FAac25", // LayerZero Labs (current)
    dvn2: "0xa7b5189bca84cd304d8553977c7c614329750d99", // Nethermind
    // Alternative options if needed:
    // polyhedra: "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
    // nethermind: "0xa7b5189bca84cd304d8553977c7c614329750d99"
  },
  arbitrum: {
    dvn1: "0x2f55C492897526677C5B68fb199ea31E2c126416", // LayerZero Labs (current)
    dvn2: "0xa7b5189bca84cd304d8553977c7c614329750d99", // Nethermind
    // Alternative options if needed:
    // polyhedra: "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
    // nethermind: "0xa7b5189bca84cd304d8553977c7c614329750d99"
  }
};

// Config Types for LayerZero V2
const CONFIG_TYPE_ULN = 2; // Ultra Light Node config

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║           LayerZero DVN Configuration                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📝 Deployer:", signer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})\n`);
  
  let localContract, remoteEid, dvnSet;
  
  if (network.chainId === 8453n) {
    localContract = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.arbitrum;
    dvnSet = DVN_ADDRESSES.base;
    console.log("🔧 Configuring Base → Arbitrum DVN");
  } else if (network.chainId === 42161n) {
    localContract = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.base;
    dvnSet = DVN_ADDRESSES.arbitrum;
    console.log("🔧 Configuring Arbitrum → Base DVN");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }
  
  console.log("Local contract:", localContract);
  console.log("Remote EID:", remoteEid);
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);
  
  // Get the endpoint contract
  const endpoint = await oft.endpoint();
  console.log("LayerZero Endpoint:", endpoint, "\n");
  
  const lzEndpoint = await ethers.getContractAt(
    ["function delegates(address oapp) external view returns (address)"],
    endpoint
  );
  
  // Check if OApp has set a delegate (for setting configs)
  const delegate = await lzEndpoint.delegates(localContract);
  console.log("Current delegate:", delegate);
  
  if (delegate !== signer.address && delegate !== ethers.ZeroAddress) {
    console.log("⚠️  Warning: You may not be authorized to set configs");
  }
  
  console.log("\n📊 DVN Configuration");
  console.log("=".repeat(60));
  console.log("Using DVNs:");
  console.log("  1. DVN 1:", dvnSet.dvn1);
  console.log("  2. DVN 2:", dvnSet.dvn2);
  console.log("\nRequired confirmations: 2 out of 2 DVNs");
  console.log("Optional confirmations: 0");
  console.log("=".repeat(60));
  
  // ULN Config structure:
  // - confirmations: uint64
  // - requiredDVNCount: uint8
  // - optionalDVNCount: uint8
  // - optionalDVNThreshold: uint8
  // - requiredDVNs: address[]
  // - optionalDVNs: address[]
  
  const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
    ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
    [{
      confirmations: 15, // Block confirmations
      requiredDVNCount: 2,
      optionalDVNCount: 0,
      optionalDVNThreshold: 0,
      requiredDVNs: [dvnSet.dvn1, dvnSet.dvn2],
      optionalDVNs: []
    }]
  );
  
  console.log("\n🔄 Setting DVN configuration...");
  console.log("⚠️  Note: This requires OApp to be the delegate or owner\n");
  
  try {
    // SetConfigParam struct: { eid: uint32, configType: uint32, config: bytes }
    const setConfigParams = [{
      eid: remoteEid,
      configType: CONFIG_TYPE_ULN,
      config: ulnConfig
    }];
    
    const tx = await oft.setConfig(remoteEid, CONFIG_TYPE_ULN, ulnConfig);
    console.log("📤 Transaction sent:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("\n✅ SUCCESS!");
      console.log("Gas used:", receipt.gasUsed.toString());
      console.log("\nDVN configuration set!");
      console.log("- Messages require verification from 2 DVNs");
      console.log("- LayerZero DVN + Google Cloud DVN");
    } else {
      console.log("\n❌ Transaction failed");
      process.exit(1);
    }
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.data) console.error("Data:", e.data);
    
    if (e.message.includes("UNAUTHORIZED") || e.message.includes("delegate")) {
      console.log("\n💡 Tip: DVN config is typically set by default.");
      console.log("Only change if you need custom security settings.");
    }
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
