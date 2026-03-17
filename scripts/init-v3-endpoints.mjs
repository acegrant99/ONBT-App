import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY not set");
}

const signer = new ethers.Wallet(PRIVATE_KEY);
const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const arbProvider = new ethers.JsonRpcProvider(config.networks.arbitrum.rpc);

const baseSigner = signer.connect(baseProvider);
const arbSigner = signer.connect(arbProvider);

const V3_BASE = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";
const V3_ARBITRUM = "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da";

const ENDPOINT_ABI = [
  "function setDelegate(address _delegate) external",
  "function getDelegate(address oapp) external view returns (address)",
];

async function setDelegate(signer, oappAddress, endpointAddress, chainName) {
  console.log(`\n📍 ${chainName} V3 OFT: ${oappAddress}`);

  const endpoint = new ethers.Contract(
    endpointAddress,
    ENDPOINT_ABI,
    signer
  );

  console.log(`   Setting delegate to self: ${oappAddress}`);

  try {
    const tx = await endpoint.setDelegate(oappAddress, {
      gasLimit: 200000,
    });

    console.log(`   TX: ${tx.hash}`);
    console.log(`   Waiting for confirmation...`);

    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
      console.log(`   ✅ Success! Block: ${receipt.blockNumber}`);
      return true;
    } else {
      console.log(`   ❌ Transaction failed`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message.split("\n")[0]}`);
    return false;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║      Initializing V3 OFT Endpoint Authorization             ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\nSigner: ${signer.address}`);
  console.log(`Base Endpoint: ${config.networks.base.endpoint}`);
  console.log(`Arbitrum Endpoint: ${config.networks.arbitrum.endpoint}`);

  // Set delegates
  const baseSuccess = await setDelegate(
    baseSigner,
    V3_BASE,
    config.networks.base.endpoint,
    "Base"
  );

  const arbSuccess = await setDelegate(
    arbSigner,
    V3_ARBITRUM,
    config.networks.arbitrum.endpoint,
    "Arbitrum"
  );

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  if (baseSuccess && arbSuccess) {
    console.log("║         ✅ V3 OFT DELEGATES SUCCESSFULLY SET              ║");
  } else {
    console.log("║           ⚠️  SOME OPERATIONS FAILED                      ║");
  }
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
