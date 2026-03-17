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

const JsonRpcProvider = ethers.JsonRpcProvider || (ethers.providers && ethers.providers.JsonRpcProvider);
const formatUnits = (value, decimals) => (
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals)
);
const parseUnits = (value, decimals) => (
  ethers.parseUnits ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals)
);
const getAddress = (value) => (
  ethers.getAddress ? ethers.getAddress(value) : ethers.utils.getAddress(value)
);
const zeroPadValue = (value, length) => (
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length)
);
const solidityPacked = (types, values) => (
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values)
);
const getBytes = (value) => (
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value)
);
const calculateMinAmount = (amount) => {
  if (typeof amount === "bigint") {
    return (amount * 95n) / 100n;
  }
  return amount.mul(95).div(100);
};

const buildLzReceiveOptions = (gas, value = 0n) => {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);
  const optionSize = getBytes(option).length + 1;
  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
};

const baseConfig = config.networks.base;
const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const baseProvider = new JsonRpcProvider(baseConfig.rpc);
const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);

const OFT_ABI = [
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
  "function balanceOf(address account) external view returns (uint256)"
];

async function main() {
  console.log("\n=== Quote Base → Arbitrum ===\n");
  console.log(`Base Signer: ${baseSigner.address}`);

  const baseOft = new ethers.Contract(oftConfig.base.address, OFT_ABI, baseSigner);
  const balance = await baseOft.balanceOf(baseSigner.address);
  console.log(`Signer balance on Base: ${formatUnits(balance, 18)} ONBT`);

  const transferAmount = parseUnits("1", 18);
  const dstEid = arbitrumConfig.lzEid;
  const toAddress = getAddress(baseSigner.address);
  const toBytes32 = zeroPadValue(toAddress, 32);

  const enforcedOptions = buildLzReceiveOptions(200000n, 0n);

  const sendParam = {
    dstEid,
    to: toBytes32,
    amountLD: transferAmount,
    minAmountLD: calculateMinAmount(transferAmount),
    extraOptions: enforcedOptions,
    composeMsg: "0x",
    oftCmd: "0x"
  };

  console.log(`\nQuote params:`);
  console.log(`  Destination EID: ${sendParam.dstEid}`);
  console.log(`  Recipient: ${toAddress}`);
  console.log(`  Amount: ${formatUnits(sendParam.amountLD, 18)} ONBT`);

  try {
    const fee = await baseOft.quoteSend(sendParam, false);
    console.log("\n✅ Quote successful");
    console.log(`  Native fee: ${formatUnits(fee.nativeFee, 18)} ETH`);
    console.log(`  LZ token fee: ${fee.lzTokenFee}`);
  } catch (err) {
    console.error(`\n❌ Quote failed: ${err.reason || err.message}`);
    if (err?.error?.data) {
      console.error("Error data:", err.error.data);
    }
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Quote script failed:", error);
  process.exit(1);
});
