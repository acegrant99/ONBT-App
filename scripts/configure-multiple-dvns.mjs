import hre from "hardhat";
const { ethers } = hre;

// Configuration
const CONTRACTS = {
  base: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  arbitrum: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

const ENDPOINTS = {
  base: "0x1a44076050125825900e736c501f859c50fE728c",
  arbitrum: "0x1a44076050125825900e736c501f859c50fE728c",
};

// Known DVNs for LayerZero V2 on Base and Arbitrum
const AVAILABLE_DVNS = {
  base: {
    // Current Required DVNs (already configured)
    layerzero: "0x9e059a54699a285714207b43B055483E78FAac25", // LayerZero Labs
    horizen: "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc", // Horizen/Google Cloud
    
    // Additional DVNs available for Base (using checksummed addresses)
    polyhedra: "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra Network
    nethermind: "0xa7b5189bca84cd304d8553977c7c614329750d99", // Nethermind
    animoca: "0x129ee430cb2ff2a3664c3cad0e8e0a95d09bd04a", // Animoca Brands
  },
  arbitrum: {
    // Current Required DVNs (already configured)
    layerzero: "0x2f55C492897526677C5B68fb199ea31E2c126416", // LayerZero Labs
    horizen: "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc", // Horizen/Google Cloud
    
    // Additional DVNs available for Arbitrum
    polyhedra: "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra Network
    nethermind: "0xc1b621b18187f74c8f6d52a6f709dd2780c09821", // Nethermind
    animoca: "0x7863451183e3d3bf6e0fc0a6fb4e99d0e33f51fc", // Animoca Brands
  }
};

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Add Multiple DVNs for Enhanced Security           ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📝 Signer:", signer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})\n`);
  
  let localContract, remoteEid, chainName, remoteName, endpointAddress, dvnSet;
  
  if (network.chainId === 8453n) {
    localContract = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.arbitrum;
    chainName = "Base";
    remoteName = "Arbitrum";
    endpointAddress = ENDPOINTS.base;
    dvnSet = AVAILABLE_DVNS.base;
  } else if (network.chainId === 42161n) {
    localContract = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.base;
    chainName = "Arbitrum";
    remoteName = "Base";
    endpointAddress = ENDPOINTS.arbitrum;
    dvnSet = AVAILABLE_DVNS.arbitrum;
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }
  
  console.log(`Configuring ${chainName} → ${remoteName} with multiple DVNs`);
  console.log("Contract:", localContract);
  console.log("Endpoint:", endpointAddress);
  console.log("Remote EID:", remoteEid, "\n");
  
  // Configuration: 2 Required DVNs (LayerZero + Nethermind)
  const requiredDVNs = [
    dvnSet.layerzero,
    dvnSet.nethermind,
  ];
  
  const optionalDVNs = [];
  
  console.log("=".repeat(70));
  console.log("📊 NEW DVN CONFIGURATION");
  console.log("=".repeat(70));
  console.log("\n✅ Required DVNs (Both must verify):");
  console.log(`   1. LayerZero Labs: ${requiredDVNs[0]}`);
  console.log(`   2. Nethermind: ${requiredDVNs[1]}`);
  
  console.log("\n🔄 Optional DVNs: None");
  
  console.log("\n🔒 Security Model:");
  console.log("   - 2 Required DVNs MUST verify");
  console.log("   - ✅ Multi-signature verification");
  console.log("   - ✅ Production-grade security");
  console.log("=".repeat(70));
  
  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);
  
  // Get send and receive libraries
  const endpointAbi = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  ];
  const endpointQuery = await ethers.getContractAt(endpointAbi, endpointAddress);
  
  const sendLib = await endpointQuery.getSendLibrary(localContract, remoteEid);
  const receiveLib = await endpointQuery.getReceiveLibrary(localContract, remoteEid);
  console.log("\nSend Library:", sendLib);
  console.log("Receive Library:", receiveLib);
  
  // Encode ULN configuration
  // struct UlnConfig {
  //   uint64 confirmations;
  //   uint8 requiredDVNCount;
  //   uint8 optionalDVNCount;
  //   uint8 optionalDVNThreshold;
  //   address[] requiredDVNs;
  //   address[] optionalDVNs;
  // }
  
  const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
    ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
    [{
      confirmations: network.chainId === 8453n ? 10 : 20, // Base: 10, Arbitrum: 20
      requiredDVNCount: requiredDVNs.length,
      optionalDVNCount: optionalDVNs.length,
      optionalDVNThreshold: 0, // No optional DVNs
      requiredDVNs: requiredDVNs,
      optionalDVNs: optionalDVNs
    }]
  );
  
  console.log("\n🔄 Setting multiple DVN configuration...");
  console.log("⚠️  Using LayerZero + Nethermind for enhanced security\n");
  
  try {
    const configType = 2; // ULN config
    
    // Get endpoint contract
    const endpointABI = [
      "function setConfig(address oapp, address lib, uint32 eid, uint8 configType, bytes calldata config) external",
      "function delegates(address oapp) external view returns (address)",
    ];
    
    const endpoint = await ethers.getContractAt(endpointABI, endpointAddress);
    
    // Verify delegate
    const delegate = await endpoint.delegates(localContract);
    console.log("Current delegate:", delegate);
    console.log("Signer:", signer.address);
    
    if (delegate !== signer.address && delegate !== ethers.ZeroAddress) {
      console.error("❌ You are not the delegate for this OFT");
      console.error("   Delegate is:", delegate);
      console.error("   You are:", signer.address);
      process.exit(1);
    }
    
    // Set config for Send Library
    console.log("\n📤 Setting Send Library config...");
    const tx1 = await endpoint.setConfig(
      localContract,
      sendLib,
      remoteEid,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );
    console.log("Transaction sent:", tx1.hash);
    await tx1.wait();
    console.log("✅ Send config confirmed");
    
    // Set config for Receive Library
    console.log("\n📥 Setting Receive Library config...");
    const tx2 = await endpoint.setConfig(
      localContract,
      receiveLib,
      remoteEid,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );
    console.log("Transaction sent:", tx2.hash);
    await tx2.wait();
    console.log("✅ Receive config confirmed");
    
    console.log("\n✅ SUCCESS!");
    console.log("🎉 DVN configuration complete!");
    console.log("━".repeat(70));
    console.log("✅ 2 Required DVNs: LayerZero + Nethermind");
    console.log("✅ Both DVNs must verify messages");
    console.log("✅ Production-grade security");
    console.log("━".repeat(70));
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.data) console.error("Data:", e.data);
    process.exit(1);
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
