import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(PRIVATE_KEY);

const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const baseSigner = signer.connect(baseProvider);

// Both OFT addresses we're testing
const NEWER_OFT = config.oft.base.address; // 0x05aA...
const V3_OFT = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";

const OFT_ABI = [
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
];

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

async function testQuote(oftAddress, name) {
  console.log(`\n${name} (${oftAddress})`);

  const oft = new ethers.Contract(oftAddress, OFT_ABI, baseSigner);

  // Test 1: Simplest possible params
  console.log("  Testing with zero extraOptions...");
  const sendParam = {
    dstEid: 30110,
    to: addressToBytes32(signer.address),
    amountLD: ethers.parseUnits("1", 18),
    minAmountLD: ethers.parseUnits("1", 18),
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x",
  };

  try {
    const fee = await oft.quoteSend(sendParam, false);
    console.log(`  ✅ Quote successful: ${ethers.formatUnits(fee.nativeFee, 18)} ETH`);
    return true;
  } catch (error) {
    const errorMsg = error.data ? error.data.substring(0, 10) : "unknown";
    console.log(`  ❌ Error: ${errorMsg}`);
    if (error.data) {
      console.log(`     Raw error data: ${error.data.substring(0, 20)}...`);
    }
    return false;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Direct OFT.quoteSend Comparison                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  const newer = await testQuote(NEWER_OFT,  "Newer OFT (Known Working)");
  const v3 = await testQuote(V3_OFT, "V3 OFT (Not Working)");

  console.log("\n" + "═".repeat(60));
  if (newer && !v3) {
    console.log("\n💡 FINDING: Newer OFT works but V3 doesn't with identical params");
    console.log("\nPossible causes:");
    console.log("  1. V3 OFT was deployed with delegate != owner");
    console.log("  2. V3 OFT missing endpoint.setDelegate() call");
    console.log("  3. V3 OFT OApp configuration incomplete");
    console.log("  4. Different LayerZero version/interface");
  }
}

main();
