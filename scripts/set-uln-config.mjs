import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

/**
 * Set DVN and Executor Configuration for LayerZero V2
 * This configures the security stack required for cross-chain messaging
 */

const configFile = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

// LayerZero Endpoint
const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

// Send Libraries
const SEND_LIBS = {
  base: configFile.messageLibraries.base.sendUln,
  arbitrum: configFile.messageLibraries.arbitrum.sendUln,
};

// DVN Config for Base → Arbitrum
const BASE_CONFIG = {
  requiredDVNs: [
    "0x9e059a54699a285714207b43b055483e78faac25", // LayerZero DVN
    "0xa7b5189bca84cd304d8553977c7c614329750d99"  // Google Cloud DVN
  ],
  optionalDVNs: [],
  optionalDVNThreshold: 0,
  executor: "0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4",
  confirmations: 15
};

// DVN Config for Arbitrum → Base
const ARBITRUM_CONFIG = {
  requiredDVNs: [
    "0x2f55c492897526677c5b68fb199ea31e2c126416", // LayerZero DVN
    "0xa7b5189bca84cd304d8553977c7c614329750d99"  // Google Cloud DVN
  ],
  optionalDVNs: [],
  optionalDVNThreshold: 0,
  executor: "0x31CAe3B7fB82d847621859fb1585353c5720660D",
  confirmations: 15
};

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     LayerZero V2 ULN Configuration (DVN & Executor)        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  let localOFT, remoteEid, localName, remoteName, config, sendLib;

  // Determine which network we're on
  if (network.chainId === 8453n) {
    localOFT = configFile.oft.base.address;
    remoteEid = configFile.oft.arbitrum.lzEid;
    localName = "Base";
    remoteName = "Arbitrum";
    config = BASE_CONFIG;
    sendLib = SEND_LIBS.base;
  } else if (network.chainId === 42161n) {
    localOFT = configFile.oft.arbitrum.address;
    remoteEid = configFile.oft.base.lzEid;
    localName = "Arbitrum";
    remoteName = "Base";
    config = ARBITRUM_CONFIG;
    sendLib = SEND_LIBS.arbitrum;
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log(`Network: ${localName}`);
  console.log(`OFT: ${localOFT}`);
  console.log(`Destination: ${remoteName} (EID: ${remoteEid})`);
  console.log(`Signer: ${signer.address}\n`);

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  
  // Check ownership
  const owner = await oft.owner();
  console.log(`Owner: ${owner}`);
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.log("❌ You are not the owner! Configuration will fail.\n");
    process.exit(1);
  }
  console.log("✅ You are the owner\n");

  // Get endpoint contract
  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol:ILayerZeroEndpointV2",
    LZ_ENDPOINT
  );

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  Configuration Details                                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Required DVNs:");
  config.requiredDVNs.forEach((dvn, i) => {
    console.log(`  ${i + 1}. ${dvn}`);
  });
  console.log(`\nExecutor: ${config.executor}`);
  console.log(`Confirmations: ${config.confirmations}\n`);

  // Encode ULN Config
  // UlnConfig struct: (uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║  Setting Configuration via Endpoint                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const errorInterface = new ethers.Interface([
    "error LZ_Unauthorized()",
    "error LZ_OnlyRegisteredLib()",
    "error LZ_OnlyRegisteredOrDefaultLib()",
    "error LZ_OnlySendLib()",
    "error LZ_OnlyReceiveLib()",
    "error LZ_UnsupportedEid()",
    "error LZ_ULN_UnsupportedEid(uint32)",
    "error LZ_ULN_InvalidConfigType(uint32)",
    "error LZ_ULN_InvalidRequiredDVNCount()",
    "error LZ_ULN_InvalidOptionalDVNCount()",
    "error LZ_ULN_InvalidOptionalDVNThreshold()",
    "error LZ_ULN_AtLeastOneDVN()",
  ]);

  const printError = (error) => {
    if (error && error.data) {
      try {
        const decoded = errorInterface.parseError(error.data);
        console.log(`  Error: ${decoded.name}`);
        if (decoded.args && decoded.args.length > 0) {
          console.log(`  Args: ${decoded.args}`);
        }
        return;
      } catch {
        console.log(`  Error data: ${error.data}`);
        return;
      }
    }
    if (error && error.message) {
      console.log(`  Error: ${error.message.substring(0, 120)}`);
    }
  };

  try {
    // Set executor config
    console.log("Step 1: Setting Executor Config...");
    
    const executorConfigType = 1; // Executor config type
    const executorConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint32", "address"],
      [200000, config.executor] // maxMessageSize, executor
    );

    const executorParams = [{
      eid: remoteEid,
      configType: executorConfigType,
      config: executorConfig
    }];

    const executorTx = await endpoint.setConfig(localOFT, sendLib, executorParams, {
      gasLimit: 500000
    });
    console.log(`  Tx: ${executorTx.hash}`);
    await executorTx.wait();
    console.log(`  ✅ Executor config set\n`);

  } catch (error) {
    console.log("  ⚠️  Executor config failed");
    printError(error);
    console.log("");
  }

  try {
    // Set ULN config
    console.log("Step 2: Setting ULN Config (DVNs)...");
    
    const ulnConfigType = 2; // ULN config type
    const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "uint8", "uint8", "uint8", "address[]", "address[]"],
      [
        config.confirmations,
        config.requiredDVNs.length,
        config.optionalDVNs.length,
        config.optionalDVNThreshold,
        config.requiredDVNs,
        config.optionalDVNs
      ]
    );

    const ulnParams = [{
      eid: remoteEid,
      configType: ulnConfigType,
      config: ulnConfig
    }];

    const ulnTx = await endpoint.setConfig(localOFT, sendLib, ulnParams, {
      gasLimit: 500000
    });
    console.log(`  Tx: ${ulnTx.hash}`);
    await ulnTx.wait();
    console.log(`  ✅ ULN config set\n`);

  } catch (error) {
    console.log("  ⚠️  ULN config failed");
    printError(error);
    console.log("");
  }

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Configuration Complete ✅                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log(`✅ ${localName} → ${remoteName} configured`);
  console.log("✅ DVN and Executor settings applied");
  console.log("\n📝 Next: Run this script on the other chain");
  console.log("📝 Then: Test with verify-path.mjs\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Configuration failed!");
    console.error(error);
    process.exit(1);
  });
