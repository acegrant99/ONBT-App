import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(config.networks.arbitrum.rpc);

const ENDPOINT_ABI = [
  "function getSendLibrary(address oapp, uint32 eid) external view returns (address)",
  "function getReceiveLibrary(address oapp, uint32 eid) external view returns (address)",
  "function getAssignedSendLibrary(address oapp, uint32 eid) external view returns (address)",
];

const SENDULI_ABI = [
  "function getExecutorConfig(address oapp, uint32 eid) external view returns ((uint32 maxMessageSize) config)",
];

async function checkConfig(name, address, provider) {
  try {
    const endpoint = new ethers.Contract(
      config.networks.base.endpoint,
      ENDPOINT_ABI,
      provider
    );

    const sendLib = await endpoint.getSendLibrary(address, 30110).catch(() => "error");
    const recvLib = await endpoint.getReceiveLibrary(address, 30110).catch(() => "error");

    console.log(`\n${name}`);
    console.log(`  Address: ${address}`);
    console.log(`  Send Library: ${sendLib === "error" ? "❌ ERROR" : sendLib}`);
    console.log(`  Recv Library: ${recvLib === "error" ? "❌ ERROR" : recvLib}`);
  } catch (error) {
    console.log(`\n${name}: Error - ${error.message.split("\n")[0]}`);
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║          Comparing OFT Endpoint Configurations              ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log("\n--- WORKING: Newer OFT (just wired, transfers work) ---");
  await checkConfig("Base Newer", config.oft.base.address, baseProvider);
  await checkConfig("Arbitrum Newer", config.oft.arbitrum.address, arbitrumProvider);

  console.log("\n--- NOT WORKING: V3 OFT (just wired, quotes fail) ---");
  await checkConfig("Base V3", "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD", baseProvider);
  await checkConfig("Arbitrum V3", "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da", arbitrumProvider);

  console.log(
    "\nNote: Complete configuration requires more than just peers:"
  );
  console.log("  - Send Library assignment");
  console.log("  - Receive Library assignment");
  console.log("  - ULN configuration (maxMessageSize, etc)");
  console.log("  - Optional: LZ Token allowance");
}

main();
