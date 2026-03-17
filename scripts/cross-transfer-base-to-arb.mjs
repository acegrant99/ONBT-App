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

// OFT ABI (minimal needed for send)
const OFT_ABI = [
  "function send((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, (uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) external payable returns ((uint64 msgType, uint64 nonce) msgReceipt)",
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
  "function balanceOf(address account) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

const baseConfig = config.networks.base;
const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const JsonRpcProvider = ethers.JsonRpcProvider || (ethers.providers && ethers.providers.JsonRpcProvider);
const baseProvider = new JsonRpcProvider(baseConfig.rpc);
const arbitrumProvider = new JsonRpcProvider(arbitrumConfig.rpc);

const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);
const arbitrumSigner = new ethers.Wallet(PRIVATE_KEY, arbitrumProvider);

const formatUnits = (value, decimals) => (
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals)
);
const parseUnits = (value, decimals) => (
  ethers.parseUnits ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals)
);
const getAddress = (value) => (
  ethers.getAddress ? ethers.getAddress(value) : ethers.utils.getAddress(value)
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

console.log(`Base Signer: ${baseSigner.address}`);
console.log(`Arbitrum Signer: ${arbitrumSigner.address}`);

async function crossTransfer() {
  try {
    console.log("\n=== Cross-Chain Transfer: Base → Arbitrum ===\n");

    // Get OFT instance on Base
    const baseOft = new ethers.Contract(
      oftConfig.base.address,
      OFT_ABI,
      baseSigner
    );

    // Check balance
    const balance = await baseOft.balanceOf(baseSigner.address);
    console.log(`Signer balance on Base: ${formatUnits(balance, 18)} ONBT`);

    if (balance === 0n) {
      console.error("No ONBT balance on Base!");
      return;
    }

    const amountInput = process.env.TRANSFER_AMOUNT || "1";
    const transferAmount = parseUnits(amountInput, 18);
    console.log(`Transfer amount: ${formatUnits(transferAmount, 18)} ONBT`);

    // Destination endpoint ID (Arbitrum)
    const dstEid = arbitrumConfig.lzEid; // 30110

    // Recipient on Arbitrum (same address)
    const toAddress = getAddress(baseSigner.address);
    const toBytes32 = ethers.zeroPadValue
      ? ethers.zeroPadValue(toAddress, 32)
      : ethers.utils.hexZeroPad(toAddress, 32);

    // Enforced options for LZ_RECEIVE (msgType=1, optionType=3)
    // Format: uint16 optionType + uint256 gas (encoded in bytes)
    const enforcedOptions = buildLzReceiveOptions(200000n, 0n);

    // Build send parameters
    const sendParam = {
      dstEid,
      to: toBytes32,
      amountLD: transferAmount,
      minAmountLD: calculateMinAmount(transferAmount), // 95% slippage tolerance
      extraOptions: enforcedOptions,
      composeMsg: "0x",
      oftCmd: "0x",
    };

    console.log(`\nSend parameters:`);
    console.log(`  Destination EID: ${sendParam.dstEid}`);
    console.log(`  Recipient: ${toAddress}`);
    console.log(`  Amount: ${formatUnits(sendParam.amountLD, 18)} ONBT`);

    // Quote the fee
    console.log(`\nQuoting fee...`);
    let fee;
    try {
      fee = await baseOft.quoteSend(sendParam, false);
      console.log(`Quote successful!`);
      console.log(`  Native fee: ${formatUnits(fee.nativeFee, 18)} ETH`);
      console.log(`  LZ token fee: ${fee.lzTokenFee}`);
    } catch (err) {
      console.error(`Quote failed: ${err.reason || err.message}`);
      return;
    }

    // Execute send
    console.log(`\nSending cross-chain message...`);
    try {
      const tx = await baseOft.send(sendParam, fee, baseSigner.address, {
        value: fee.nativeFee,
        gasLimit: 500000,
      });

      console.log(`Transaction sent: ${tx.hash}`);
      const receipt = await tx.wait();

      if (receipt && receipt.status === 1) {
        console.log(`✓ Transfer successful!`);
        console.log(`  Block: ${receipt.blockNumber}`);
        console.log(`  Gas used: ${receipt.gasUsed}`);
      } else {
        console.error(`✗ Transaction failed or reverted`);
      }
    } catch (err) {
      console.error(`Send failed: ${err.reason || err.message}`);
      console.error(err);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

crossTransfer();
