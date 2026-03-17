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

const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const JsonRpcProvider = ethers.JsonRpcProvider || (ethers.providers && ethers.providers.JsonRpcProvider);
const arbitrumProvider = new JsonRpcProvider(arbitrumConfig.rpc);
const arbSigner = new ethers.Wallet(PRIVATE_KEY, arbitrumProvider);

const OFT_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
];

async function main() {
  try {
    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║     Checking ONBT Balance on Arbitrum...                  ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    const oft = new ethers.Contract(
      oftConfig.arbitrum.address,
      OFT_ABI,
      arbSigner
    );

    console.log(`Checking address: ${arbSigner.address}`);
    console.log(`Arbitrum OFT: ${oftConfig.arbitrum.address}\n`);

    const minExpected = process.env.MIN_EXPECTED
      ? parseFloat(process.env.MIN_EXPECTED)
      : null;

    // Check balance multiple times (in case message is still in flight)
    for (let i = 0; i < 5; i++) {
      const balance = await oft.balanceOf(arbSigner.address);
      const balanceFormatted = ethers.formatUnits
        ? ethers.formatUnits(balance, 18)
        : ethers.utils.formatUnits(balance, 18);

      console.log(`[Attempt ${i + 1}/5] Balance: ${balanceFormatted} ONBT`);

      const balanceNum = Number(balanceFormatted);
      if (minExpected !== null && balanceNum >= minExpected) {
        console.log(`\n╔════════════════════════════════════════════════════════════╗`);
        console.log(`║              ✅ TARGET BALANCE REACHED!                   ║`);
        console.log(`╚════════════════════════════════════════════════════════════╝\n`);
        console.log(`Amount: ${balanceFormatted} ONBT`);
        console.log(`Address: ${arbSigner.address}`);
        console.log(`Chain: Arbitrum (EID 30110)`);
        break;
      }

      if (i < 4) {
        console.log(`   Waiting 10 seconds before retry...\n`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
