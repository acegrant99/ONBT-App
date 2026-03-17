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

const OFT_ABI = [
  "function send((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, (uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) external payable returns ((uint64 msgType, uint64 nonce) msgReceipt)",
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
  "function balanceOf(address account) external view returns (uint256)",
];

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

function buildLzReceiveOptions(gas, value = 0n) {
  const option = ethers.solidityPacked(["uint128"], [gas]);
  const optionSize = ethers.getBytes(option).length + 1;
  return ethers.solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
}

async function main() {
  try {
    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║         Cross-Chain Transfer: Base → Arbitrum              ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    const oft = new ethers.Contract(
      oftConfig.base.address,
      OFT_ABI,
      baseSigner
    );

    // Check balance
    const balance = await oft.balanceOf(baseSigner.address);
    console.log(`Signer: ${baseSigner.address}`);
    console.log(`Balance: ${ethers.formatUnits(balance, 18)} ONBT\n`);

    if (balance === 0n) {
      console.error("❌ No ONBT balance on Base!");
      return;
    }

    // Transfer amount: 1 ONBT
    const transferAmount = ethers.parseUnits("1", 18);
    console.log(`Transfer Amount: ${ethers.formatUnits(transferAmount, 18)} ONBT`);

    // Build send parameters
    const extraOptions = buildLzReceiveOptions(200000n, 0n);
    const sendParam = {
      dstEid: arbitrumConfig.lzEid,
      to: addressToBytes32(baseSigner.address),
      amountLD: transferAmount,
      minAmountLD: (transferAmount * 95n) / 100n, // 95% slippage
      extraOptions,
      composeMsg: "0x",
      oftCmd: "0x",
    };

    console.log(`Destination EID: ${sendParam.dstEid}`);
    console.log(`Recipient: ${baseSigner.address}\n`);

    // Quote the fee
    console.log("📊 Quoting fee...");
    const fee = await oft.quoteSend(sendParam, false);
    console.log(`✅ Quote Success!`);
    console.log(`   Native Fee: ${ethers.formatUnits(fee.nativeFee, 18)} ETH`);
    console.log(`   LZ Token Fee: ${ethers.formatUnits(fee.lzTokenFee, 18)} LZ\n`);

    // Create plain fee object (not the contract response)
    const feeObj = {
      nativeFee: fee.nativeFee,
      lzTokenFee: fee.lzTokenFee,
    };

    // Execute send
    console.log("🚀 Sending cross-chain message...");
    const tx = await oft.send(sendParam, feeObj, baseSigner.address, {
      value: feeObj.nativeFee,
      gasLimit: 500000,
    });

    console.log(`📝 Transaction: ${tx.hash}`);
    console.log(`   Waiting for confirmation...`);

    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
      console.log(`\n╔════════════════════════════════════════════════════════════╗`);
      console.log(`║                 ✅ TRANSFER SUCCESSFUL                    ║`);
      console.log(`╚════════════════════════════════════════════════════════════╝\n`);

      console.log(`Block Number: ${receipt.blockNumber}`);
      console.log(`Gas Used: ${receipt.gasUsed}`);
      console.log(`Transaction Hash: ${receipt.hash}`);

      console.log(`\n📊 Summary:`);
      console.log(`   From: Base (EID ${baseConfig.lzEid})`);
      console.log(`   To: Arbitrum (EID ${arbitrumConfig.lzEid})`);
      console.log(`   Amount: ${ethers.formatUnits(transferAmount, 18)} ONBT`);
      console.log(`   Fee: ${ethers.formatUnits(feeObj.nativeFee, 18)} ETH`);
      console.log(
        `\n✅ Tokens should arrive on Arbitrum in 1-5 minutes (check explorer)`
      );
    } else {
      console.error(`\n❌ Transaction failed or reverted`);
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
    process.exit(1);
  }
}

main();
