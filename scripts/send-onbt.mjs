import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

// Hub/Base OFT
const BASE_OFT = config.oft.base.address;
const ARBITRUM_EID = 30110;

const AMOUNT = ethers.parseEther("0.1");

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

function buildLzReceiveOptions(gas, value = 0n) {
  const option = value === 0n
    ? ethers.solidityPacked(["uint128"], [gas])
    : ethers.solidityPacked(["uint128", "uint128"], [gas, value]);

  const optionSize = ethers.getBytes(option).length + 1; // +1 for optionType

  return ethers.solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option] // type3, executor worker, lzReceive
  );
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  if (network.chainId !== 8453n) {
    throw new Error(`Run on Base (chainId 8453). Current: ${network.chainId}`);
  }

  const recipient = signer.address;
  const recipientBytes32 = addressToBytes32(recipient);

  console.log("\nSending ONBT Base -> Arbitrum");
  console.log("Sender:", signer.address);
  console.log("Recipient:", recipient);
  console.log("Amount:", ethers.formatEther(AMOUNT), "ONBT\n");

  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_OFT);

  const extraOptions = buildLzReceiveOptions(200000n, 0n);

  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: recipientBytes32,
    amountLD: AMOUNT,
    minAmountLD: AMOUNT,
    extraOptions,
    composeMsg: "0x",
    oftCmd: "0x"
  };

  console.log("Quoting fees...");
  const quote = await oft.quoteSend(sendParam, false);
  console.log("Native Fee:", ethers.formatEther(quote.nativeFee), "ETH");

  console.log("\nSending... (this will use native fee)");
  const tx = await oft.send(sendParam, { value: quote.nativeFee });
  console.log("Tx:", tx.hash);

  const receipt = await tx.wait();
  console.log("Confirmed in block:", receipt.blockNumber);
  console.log("\n✅ Send complete. Monitor delivery on LayerZero Scan.");
}

main().catch((error) => {
  console.error("\n❌ Send failed:", error.message || error);
  process.exit(1);
});
