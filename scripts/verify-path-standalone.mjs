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

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

function buildLzReceiveOptions(gas, value = 0n) {
  const option = ethers.solidityPacked(["uint128"], [gas]);
  const optionSize = ethers.getBytes(option).length + 1; // +1 for optionType
  return ethers.solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option] // type3, executor worker, lzReceive
  );
}

const OFT_ABI = [
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) sendParam, bool payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
  "function peers(uint32 eid) external view returns (bytes32)",
  "function balanceOf(address account) external view returns (uint256)",
];

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║           LayerZero V2 Path Verification                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("Signer:", baseSigner.address);
  console.log("Network: Base");
  console.log();

  const localOFT = oftConfig.base.address;
  const remoteOFT = oftConfig.arbitrum.address;
  const remoteEid = arbitrumConfig.lzEid;
  const localName = "Base";
  const remoteName = "Arbitrum";

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log(`║  Path: ${localName} → ${remoteName}`.padEnd(61) + "║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log(`Local OFT: ${localOFT}`);
  console.log(`Remote OFT: ${remoteOFT}`);
  console.log(`Remote EID: ${remoteEid}`);
  console.log();

  // Get OFT contract
  const oft = new ethers.Contract(localOFT, OFT_ABI, baseProvider);

  // Check peer configuration
  console.log("--- Checking Peer Configuration ---");
  const peer = await oft.peers(remoteEid);
  const remoteBytes32 = addressToBytes32(remoteOFT);

  console.log(`Peer for EID ${remoteEid}:`);
  console.log(`  Current: ${peer}`);
  console.log(`  Expected: ${remoteBytes32}`);

  if (peer === remoteBytes32) {
    console.log("  ✅ Peer configured correctly!\n");
  } else if (
    peer ===
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    console.log("  ❌ Peer not set!\n");
    process.exit(1);
  } else {
    console.log("  ❌ Peer mismatch!\n");
    process.exit(1);
  }

  // Check balance
  const balance = await oft.balanceOf(baseSigner.address);
  console.log("--- Checking Balance ---");
  console.log(`Balance: ${ethers.formatUnits(balance, 18)} ONBT\n`);

  // Test quote for a transfer
  console.log("--- Testing Transfer Quote ---");
  console.log(`Testing: ${localName} → ${remoteName}`);
  console.log("Amount: 1 ONBT\n");

  const extraOptions = buildLzReceiveOptions(200000n, 0n);

  const sendParam = {
    dstEid: remoteEid,
    to: remoteBytes32,
    amountLD: ethers.parseUnits("1", 18),
    minAmountLD: ethers.parseUnits("1", 18),
    extraOptions,
    composeMsg: "0x",
    oftCmd: "0x",
  };

  try {
    const quote = await oft.quoteSend(sendParam, false);

    console.log("✅ Quote Successful!");
    console.log(
      "─────────────────────────────────────────────────────────"
    );
    console.log(`Native Fee: ${ethers.formatUnits(quote.nativeFee, 18)} ETH`);
    console.log(`LZ Token Fee: ${ethers.formatUnits(quote.lzTokenFee, 18)} LZ`);
    console.log();

    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║               PATH STATUS: READY ✅                        ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    console.log(`✅ Path is initialized and ready for transfers!`);
    console.log(`✅ ${localName} → ${remoteName} fully operational`);

    console.log("\n📝 To send 1 ONBT:");
    console.log(`   const sendParam = {`);
    console.log(`     dstEid: ${remoteEid},`);
    console.log(`     to: "${remoteBytes32}",`);
    console.log(`     amountLD: ethers.parseEther("1"),`);
    console.log(`     minAmountLD: ethers.parseEther("1"),`);
    console.log(`     extraOptions: "0x",`);
    console.log(`     composeMsg: "0x",`);
    console.log(`     oftCmd: "0x"`);
    console.log(`   };`);
    console.log(
      `   await oft.send(sendParam, { value: "${quote.nativeFee}" });`
    );
  } catch (error) {
    console.log("❌ Quote Failed!");
    console.log(
      "─────────────────────────────────────────────────────────"
    );
    console.error("Error:", error.message);

    if (error.message.includes("NoPeer")) {
      console.log("\n💡 The peer is not properly configured.");
      console.log("   Run manual-wire-ofts.mjs on both chains");
    } else if (
      error.message.includes("pathway not initialized") ||
      error.message.includes("PATH_NOT_INITIALIZABLE")
    ) {
      console.log("\n💡 The pathway needs initialization.");
      console.log("   Run initialize-path.mjs on both chains");
    } else {
      console.log("\n💡 Troubleshooting:");
      console.log(
        "   1. Verify peers are set on both chains (run manual-wire-ofts.mjs)"
      );
      console.log("   2. Initialize the path (run initialize-path.mjs)");
      console.log("   3. Ensure libraries are configured");
      console.log("   4. Check that you have enough balance");
    }

    console.log("\n📖 Documentation:");
    console.log(
      "   https://docs.layerzero.network/v2/developers/evm/troubleshooting\n"
    );

    process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n❌ Path verification failed!");
  console.error(error);
  process.exit(1);
});
