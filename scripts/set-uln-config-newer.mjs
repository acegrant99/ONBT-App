import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY not set in environment");
}

const baseConfig = config.networks.base;
const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const baseProvider = new ethers.JsonRpcProvider(baseConfig.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(arbitrumConfig.rpc);

const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);
const arbitrumSigner = new ethers.Wallet(PRIVATE_KEY, arbitrumProvider);

const SEND_ULN_302 = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";

// Endpoint V2 config interface
const ENDPOINT_ABI = [
  "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata _config) external",
];

// Required DVNs
const REQUIRED_DVNS = [
  "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc", // Google Cloud
  "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra
];

async function setUlnConfig() {
  try {
    console.log("=== Set ULN Config for Newer OFTs ===\n");

    const endpointAddr = baseConfig.endpoint;

    // ULN config structure:
    // abi.encode(confirmations, requiredDVNCount, requiredDVNs[], optionalDVNCount, optionalDVNs[], optionalThreshold)

    // Base → Arbitrum
    console.log("1. Base OFT send config (to Arbitrum EID 30110)");
    const baseEndpoint = new ethers.Contract(
      endpointAddr,
      ENDPOINT_ABI,
      baseSigner
    );

    // Encode ULN send config: 10 confirmations, 2 required DVNs, 0 optional
    const baseUlnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      [
        "uint8",    // confirmations
        "uint8",    // required DVN count
        "address[]",// required DVNs
        "uint8",    // optional DVN count
        "address[]",// optional DVNs
        "uint8",    // optional threshold
      ],
      [
        10,                                    // confirmations
        REQUIRED_DVNS.length,                 // required DVN count
        REQUIRED_DVNS,                        // required DVNs
        0,                                     // optional DVN count (0 optional)
        [],                                    // optional DVNs
        0,                                     // optional threshold
      ]
    );

    console.log(`   Sending config (EID 30110, type 0 for ULN send)...`);
    const baseTx = await baseEndpoint.setConfig(
      oftConfig.base.address,
      SEND_ULN_302,
      arbitrumConfig.lzEid,
      0, // configType 0 = ULN send
      baseUlnConfig,
      { gasLimit: 500000 }
    );
    console.log(`   Tx: ${baseTx.hash}`);
    const baseReceipt = await baseTx.wait();
    if (baseReceipt && baseReceipt.status === 1) {
      console.log(`   ✓ Success at block ${baseReceipt.blockNumber}`);
    } else {
      console.error(`   ✗ Failed`);
      return;
    }

    // Arbitrum → Base
    console.log("\n2. Arbitrum OFT send config (to Base EID 30184)");
    const arbEndpoint = new ethers.Contract(
      endpointAddr,
      ENDPOINT_ABI,
      arbitrumSigner
    );

    // Encode ULN send config: 20 confirmations, 2 required DVNs, 0 optional
    const arbUlnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      [
        "uint8",
        "uint8",
        "address[]",
        "uint8",
        "address[]",
        "uint8",
      ],
      [
        20,                                   // confirmations (higher for Arbitrum)
        REQUIRED_DVNS.length,
        REQUIRED_DVNS,
        0,
        [],
        0,
      ]
    );

    console.log(`   Sending config (EID 30184, type 0 for ULN send)...`);
    const arbTx = await arbEndpoint.setConfig(
      oftConfig.arbitrum.address,
      SEND_ULN_302,
      baseConfig.lzEid,
      0,
      arbUlnConfig,
      { gasLimit: 500000 }
    );
    console.log(`   Tx: ${arbTx.hash}`);
    const arbReceipt = await arbTx.wait();
    if (arbReceipt && arbReceipt.status === 1) {
      console.log(`   ✓ Success at block ${arbReceipt.blockNumber}`);
    } else {
      console.error(`   ✗ Failed`);
      return;
    }

    console.log("\n✓ ULN configs set on both OFTs!");
  } catch (error) {
    console.error("Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

setUlnConfig();
