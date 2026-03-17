import hre from "hardhat";
const { ethers } = hre;

/**
 * Bridge ONBT tokens from Base to Arbitrum using LayerZero V2
 * Uses addresses from layerzero.config.ts
 */
async function main() {
  const [sender] = await ethers.getSigners();
  console.log("🔗 Bridging tokens with account:", sender.address);

  // ===== CONFIGURATION FROM LAYERZERO.CONFIG.TS =====
  const BASE_CONTRACT = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
  const ARB_CONTRACT = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
  const ARBITRUM_EID = 30110; // Arbitrum mainnet endpoint ID
  const AMOUNT_TO_SEND = ethers.parseEther("10"); // 10 ONBT tokens

  console.log("\n=== Bridge Configuration ===");
  console.log("From: Base (EID 30184)");
  console.log("To: Arbitrum (EID 30110)");
  console.log("Base OFT:", BASE_CONTRACT);
  console.log("Arbitrum OFT:", ARB_CONTRACT);
  console.log("Amount:", ethers.formatEther(AMOUNT_TO_SEND), "ONBT");

  // ===== CONNECT TO BASE OFT =====
  const OFT = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);

  // Check sender balance
  console.log("\n=== Checking Balance ===");
  const balance = await OFT.balanceOf(sender.address);
  console.log("Your balance:", ethers.formatEther(balance), "ONBT");

  if (balance < AMOUNT_TO_SEND) {
    throw new Error(`Insufficient balance. Have: ${ethers.formatEther(balance)}, Need: ${ethers.formatEther(AMOUNT_TO_SEND)}`);
  }

  // ===== PREPARE SEND PARAMETERS =====
  const recipientAddressBytes32 = ethers.zeroPadValue(sender.address, 32);
  
  // Create options for gas on destination (manually encoded)
  // Options format: 0x0003 (version) + encoded options for executor
  // ExecutorOptions: 0x01 (LZ_RECEIVE) + gas (uint128) + value (uint128)
  const executorLzReceiveOption = ethers.solidityPacked(
    ["uint16", "uint8", "uint128", "uint128"],
    [3, 1, 200000, 0] // version 3, option type 1 (LZ_RECEIVE), 200k gas, 0 value
  );

  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: recipientAddressBytes32,
    amountLD: AMOUNT_TO_SEND,
    minAmountLD: AMOUNT_TO_SEND, // No slippage for this example
    extraOptions: executorLzReceiveOption,
    composeMsg: "0x",
    oftCmd: "0x"
  };

  // ===== QUOTE THE FEE =====
  console.log("\n=== Estimating Fees ===");
  const feeQuote = await OFT.quoteSend(sendParam, false);
  const nativeFee = feeQuote.nativeFee;
  
  console.log("Native fee:", ethers.formatEther(nativeFee), "ETH");
  console.log("Fee breakdown:");
  console.log("  - DVN verification fees");
  console.log("  - Executor gas on Arbitrum");
  console.log("  - LayerZero protocol fees");

  // Check ETH balance
  const ethBalance = await ethers.provider.getBalance(sender.address);
  console.log("\nYour ETH balance:", ethers.formatEther(ethBalance), "ETH");
  
  if (ethBalance < nativeFee) {
    throw new Error(`Insufficient ETH for fees. Have: ${ethers.formatEther(ethBalance)}, Need: ${ethers.formatEther(nativeFee)}`);
  }

  // ===== SEND TOKENS =====
  console.log("\n=== Sending Tokens ===");
  console.log("Executing cross-chain transfer...");
  
  const tx = await OFT.send(
    sendParam,
    { nativeFee: nativeFee, lzTokenFee: 0 },
    sender.address, // refund address
    { value: nativeFee }
  );

  console.log("\n✅ Transaction submitted!");
  console.log("TX Hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed in block:", receipt.blockNumber);

  console.log("\n=== Next Steps ===");
  console.log("1. ⏳ Wait 5-10 minutes for LayerZero to relay the message");
  console.log("2. 🔍 Track on LayerZero Scan:");
  console.log(`   https://layerzeroscan.com/tx/${tx.hash}`);
  console.log("3. ✅ Check balance on Arbitrum:");
  console.log(`   https://arbiscan.io/token/${ARB_CONTRACT}?a=${sender.address}`);
  console.log("\n💡 If the path is not initialized yet, LayerZero Labs may need to activate it first.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
