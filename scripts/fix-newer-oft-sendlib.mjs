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
const messageLibs = config.messageLibraries;

const baseProvider = new ethers.JsonRpcProvider(baseConfig.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(arbitrumConfig.rpc);

const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);
const arbitrumSigner = new ethers.Wallet(PRIVATE_KEY, arbitrumProvider);

const SEND_ULN_302 = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";

const OFT_ABI = [
  "function owner() external view returns (address)",
  "function setSendLibrary(uint32 eid, address newLib) external",
];

async function fixSendLibs() {
  try {
    console.log("=== Fix Send Libraries for Newer OFTs ===\n");

    // Fix Base
    console.log("1. Base OFT");
    const baseOft = new ethers.Contract(
      oftConfig.base.address,
      OFT_ABI,
      baseSigner
    );
    const baseOwner = await baseOft.owner();
    console.log(`   Owner: ${baseOwner}`);
    console.log(`   Signer: ${baseSigner.address}`);

    if (baseOwner.toLowerCase() !== baseSigner.address.toLowerCase()) {
      console.error(`   ERROR: Signer is not owner!`);
      return;
    }

    console.log(`   Setting send library to: ${SEND_ULN_302}`);
    const baseTx = await baseOft.setSendLibrary(
      arbitrumConfig.lzEid,
      SEND_ULN_302,
      {
        gasLimit: 200000,
      }
    );
    console.log(`   Tx: ${baseTx.hash}`);
    const baseReceipt = await baseTx.wait();
    if (baseReceipt && baseReceipt.status === 1) {
      console.log(`   ✓ Success at block ${baseReceipt.blockNumber}`);
    } else {
      console.error(`   ✗ Failed`);
      return;
    }

    // Fix Arbitrum
    console.log("\n2. Arbitrum OFT");
    const arbOft = new ethers.Contract(
      oftConfig.arbitrum.address,
      OFT_ABI,
      arbitrumSigner
    );
    const arbOwner = await arbOft.owner();
    console.log(`   Owner: ${arbOwner}`);
    console.log(`   Signer: ${arbitrumSigner.address}`);

    if (arbOwner.toLowerCase() !== arbitrumSigner.address.toLowerCase()) {
      console.error(`   ERROR: Signer is not owner!`);
      return;
    }

    console.log(`   Setting send library to: ${SEND_ULN_302}`);
    const arbTx = await arbOft.setSendLibrary(baseConfig.lzEid, SEND_ULN_302, {
      gasLimit: 200000,
    });
    console.log(`   Tx: ${arbTx.hash}`);
    const arbReceipt = await arbTx.wait();
    if (arbReceipt && arbReceipt.status === 1) {
      console.log(`   ✓ Success at block ${arbReceipt.blockNumber}`);
    } else {
      console.error(`   ✗ Failed`);
      return;
    }

    console.log("\n✓ Both OFTs now use correct SendUln302!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

fixSendLibs();
