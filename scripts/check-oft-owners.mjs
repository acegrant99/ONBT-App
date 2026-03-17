import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const signer = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY) : null;

const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(
  config.networks.arbitrum.rpc
);

const OFT_ABI = [
  "function owner() external view returns (address)",
  "function getPeer(uint32 eid) external view returns (bytes32)",
];

async function checkOFT(name, address, provider, chainName, eid) {
  try {
    const oft = new ethers.Contract(address, OFT_ABI, provider);
    const owner = await oft.owner();
    let peer = "0x";
    try {
      peer = await oft.getPeer(eid);
    } catch (e) {
      peer = "Error reading peer";
    }

    const isOwnedBySigner =
      signer && owner.toLowerCase() === signer.address.toLowerCase();
    const peerSet = peer !== "0x" && peer !== "0x0000000000000000000000000000000000000000";

    console.log(`\n${name} (${chainName})`);
    console.log(`  Address: ${address}`);
    console.log(`  Owner: ${owner}`);
    console.log(`  Owned by Signer: ${isOwnedBySigner ? "✅ YES" : "❌ NO"}`);
    console.log(`  Peer for EID ${eid}: ${peer === "0x" ? "NOT SET" : peer}`);
    console.log(`  Status: ${isOwnedBySigner ? "✅ CAN WIRE" : "❌ CANNOT WIRE"}`);

    return { isOwnedBySigner, peerSet };
  } catch (error) {
    console.log(`\n${name}: ❌ Error - ${error.message}`);
    return { isOwnedBySigner: false, peerSet: false };
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Checking OFT Ownership & Configuration             ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  if (signer) {
    console.log(`\nSigner Address: ${signer.address}`);
  } else {
    console.log(`\nNo signer (PRIVATE_KEY not set)`);
  }

  console.log("\n--- NEWER OFT PAIR ---");
  await checkOFT(
    "Newer OFT",
    config.oft.base.address,
    baseProvider,
    "Base",
    config.networks.arbitrum.lzEid
  );
  await checkOFT(
    "Newer OFT",
    config.oft.arbitrum.address,
    arbitrumProvider,
    "Arbitrum",
    config.networks.base.lzEid
  );

  console.log("\n--- CHECKING OTHER OFT VERSIONS ---");
  console.log(
    "\nSearching for other OFT addresses in config or deployment files...\n"
  );

  // Check deployment files for other OFT addresses
  const deployDir = path.join(__dirname, "../deploy");
  const deployFiles = fs
    .readdirSync(deployDir)
    .filter(
      (f) =>
        f.includes("deployment") &&
        (f.endsWith(".json") || f.endsWith(".cjs"))
    );

  console.log(`Found deployment files: ${deployFiles.join(", ")}\n`);

  for (const file of deployFiles) {
    const filePath = path.join(deployDir, file);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const baseMatches = content.match(/0x[a-fA-F0-9]{40}/g) || [];
      const uniqueAddresses = [...new Set(baseMatches)];

      console.log(`${file}:`);
      uniqueAddresses.slice(0, 5).forEach((addr) => {
        console.log(`  ${addr}`);
      });
      console.log("");
    } catch (e) {
      // Skip files that can't be read
    }
  }

  console.log(
    "To check specific OFT addresses, update this script with their addresses."
  );
}

main();
