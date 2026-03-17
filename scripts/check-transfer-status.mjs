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
const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);

console.log("\n=== Newer OFT Cross-Chain Status ===\n");
console.log(`Base OFT: ${oftConfig.base.address}`);
console.log(`Arbitrum OFT: ${oftConfig.arbitrum.address}`);
console.log(`Signer: ${baseSigner.address}`);

const OFT_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function owner() external view returns (address)",
];

const baseOft = new ethers.Contract(
  oftConfig.base.address,
  OFT_ABI,
  baseProvider
);

async function check() {
  const owner = await baseOft.owner();
  const balance = await baseOft.balanceOf(baseSigner.address);

  console.log(`\nBase OFT owner: ${owner}`);
  console.log(`Signer balance: ${ethers.formatUnits(balance, 18)} ONBT`);

  if (owner.toLowerCase() === baseSigner.address.toLowerCase()) {
    console.log(`✓ Signer is OFT owner`);
  } else {
    console.log(`✗ Signer is NOT OFT owner`);
  }

  console.log("\n**Issue**: The newer OFT pair is missing:");
  console.log("  1. Correct send library (SendUln302) on both chains");
  console.log("  2. ULN configuration (DVN settings, confirmations, etc.)");
  console.log("  3. Proper peer configuration");
  console.log("\nTo fix this, we recommend:");
  console.log("  - Upgrade to Node 20 LTS");
  console.log("  - Run: npx hardhat lz:oapp:wire");
  console.log("  - This will configure everything via LayerZero's official toolbox\n");
}

check().catch(console.error);
