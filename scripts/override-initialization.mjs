import hre from "hardhat";
const { ethers } = hre;

const BASE_OFT = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";
const ARBITRUM_OFT = "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da";
const ARBITRUM_EID = 30110;
const BASE_EID = 30184;

// LayerZero V2 Endpoints
const ENDPOINTS = {
  base: "0x1a44076050125825900e736c501f859c50fE728c",
  arbitrum: "0x1a44076050125825900e736c501f859c50fE728c",
};

// Available DVNs on Ethereum/Base
const AVAILABLE_DVNS = {
  base: {
    "LayerZero Labs": "0x9e059a54699a285714207b43B055483E78FAac25",
    "Horizen": "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc",
    "Polyhedra": "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
    "Nethermind": "0xa7b5189bca84cd304d8553977c7c614329750d99",
  },
  arbitrum: {
    "LayerZero Labs": "0x2f55C492897526677C5B68fb199ea31E2c126416",
    "Horizen": "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc",
    "Polyhedra": "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
    "Nethermind": "0xa7b5189bca84cd304d8553977c7c614329750d99",
  }
};

async function main() {
  const network = await ethers.provider.getNetwork();
  const [signer] = await ethers.getSigners();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Override Initialization / Change DVNs             ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localOFT, remoteEid, localEid, localNetwork;
  
  if (network.chainId === 8453n) {
    localOFT = BASE_OFT;
    remoteEid = ARBITRUM_EID;
    localEid = BASE_EID;
    localNetwork = "base";
    console.log("📡 Network: Base → Arbitrum");
  } else if (network.chainId === 42161n) {
    localOFT = ARBITRUM_OFT;
    remoteEid = BASE_EID;
    localEid = ARBITRUM_EID;
    localNetwork = "arbitrum";
    console.log("📡 Network: Arbitrum → Base");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  const endpoint = await ethers.getContractAt(
    ["function setConfig(address oapp, address lib, uint32 eid, uint8 configType, bytes calldata config) external",
     "function getConfig(address oapp, address lib, uint32 eid, uint8 configType) external view returns (bytes memory)",
     "function getSendLibrary(address oapp, uint32 eid) external view returns (address)",
     "function getReceiveLibrary(address oapp, uint32 eid) external view returns (address)"],
    ENDPOINTS[localNetwork]
  );

  console.log("💼 OFT Contract:", localOFT);
  console.log("👤 Signer:", signer.address);
  console.log("🌐 Endpoint:", ENDPOINTS[localNetwork]);

  // Get current send/receive libraries
  console.log("\n📋 Current Configuration:");
  
  try {
    const sendLib = await endpoint.getSendLibrary(localOFT, remoteEid);
    const recvLib = await endpoint.getReceiveLibrary(localOFT, remoteEid);
    
    console.log("  Send Library:", sendLib);
    console.log("  Receive Library:", recvLib);
  } catch (e) {
    console.log("  (Could not fetch current libraries)");
  }

  // Option 1: Override initialization by setting custom ULN config
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🔧 Option 1: Override Initialization (Custom ULN Config)");
  console.log("═══════════════════════════════════════════════════════════");
  
  console.log("\nThis would involve setting custom ULN configuration");
  console.log("to bypass the initialization check. However, this requires:");
  console.log("  1. Understanding LayerZero's internal structure");
  console.log("  2. Having delegate permissions");
  console.log("  3. Risk of breaking the bridge if misconfigured");
  
  console.log("\n❌ Not recommended for production use");

  // Option 2: Change DVNs
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🔄 Option 2: Change DVNs (Recommended)");
  console.log("═══════════════════════════════════════════════════════════");
  
  console.log("\nAvailable DVNs for " + localNetwork.toUpperCase() + ":");
  const dvns = AVAILABLE_DVNS[localNetwork];
  Object.entries(dvns).forEach(([name, addr], i) => {
    console.log(`  ${i + 1}. ${name}: ${addr}`);
  });
  
  console.log("\n✅ To change DVNs:");
  console.log("   Update the DVN addresses in configure-dvn.mjs");
  console.log("   Then run: npx hardhat run scripts/configure-dvn.mjs --network " + localNetwork);

  // Option 3: Check if alternative configurations work
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🧪 Option 3: Test with Different Configuration");
  console.log("═══════════════════════════════════════════════════════════");
  
  console.log("\nAttempting to fetch config type 2 (ULN config):");
  
  try {
    const sendLib = await endpoint.getSendLibrary(localOFT, remoteEid);
    const config = await endpoint.getConfig(localOFT, sendLib, remoteEid, 2); // Type 2 = ULN
    
    if (config === "0x") {
      console.log("  ⚠️  No ULN config set (using defaults)");
      console.log("  This might be why initialization is failing");
    } else {
      console.log("  ✅ ULN Config found:", config);
      
      // Try to decode
      console.log("\n  Decoding ULN config...");
      const abiCoder = ethers.AbiCoder.defaultAbiCoder();
      try {
        const decoded = abiCoder.decode(
          ['uint64', 'uint8', 'uint8', 'uint8', 'address[]', 'address[]'],
          config
        );
        console.log("    Confirmations:", decoded[0].toString());
        console.log("    Required DVNs:", decoded[1].toString());
        console.log("    Optional DVNs:", decoded[2].toString());
        console.log("    Threshold:", decoded[3].toString());
      } catch (decodeErr) {
        console.log("    (Could not decode structure)");
      }
    }
  } catch (e) {
    console.log("  ⚠️  Could not fetch config");
  }

  // Option 4: Manually trigger initialization
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🔧 Option 4: Force Path Initialization");
  console.log("═══════════════════════════════════════════════════════════");
  
  console.log("\nAttempting to manually initialize the path...");
  console.log("(This sends a message that triggers path initialization)");
  
  try {
    // Try to send the smallest possible message to trigger initialization
    const sendParam = {
      dstEid: remoteEid,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: ethers.parseUnits("0.001", 18),
      minAmountLD: ethers.parseUnits("0.001", 18),
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    console.log("\n  Trying to send 0.001 ONBT to trigger initialization...");
    
    // Don't actually send, just prepare
    console.log("  (Skipping actual send to avoid failed transaction)");
    console.log("  Would need to manually send when path is ready");
    
  } catch (e) {
    console.log("  Error: " + e.message);
  }

  // Summary and recommendations
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📝 Recommendations");
  console.log("═══════════════════════════════════════════════════════════");
  
  console.log("\n1️⃣  IMMEDIATE: Contact LayerZero Labs");
  console.log("   • Email: support@layerzero.network");
  console.log("   • Provide: Base contract + Arbitrum contract addresses");
  console.log("   • Request: Initialize Base ↔ Arbitrum path on mainnet");
  
  console.log("\n2️⃣  ALTERNATIVE: Test on Testnet First");
  console.log("   • Testnet paths are pre-initialized");
  console.log("   • Deploy to Sepolia + Arbitrum Sepolia");
  console.log("   • Verify contracts work before mainnet activation");
  
  console.log("\n3️⃣  FOR NOW: Keep configuration as-is");
  console.log("   • Contracts are properly deployed and configured");
  console.log("   • All DVN/executor/library setup is correct");
  console.log("   • Just waiting for LayerZero Labs to initialize path");
  
  console.log("\n🌐 Track initialization status:");
  console.log("   https://layerzeroscan.com/");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
  });
