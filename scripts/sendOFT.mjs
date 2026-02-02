import hre from "hardhat";
const { ethers } = hre;
import { LayerZeroChainIds } from "../constants/layerzero.mjs";

/**
 * Send OFT tokens from one chain to another
 * This demonstrates how to use LayerZero for cross-chain token transfers
 */
async function main() {
  const [sender] = await ethers.getSigners();
  console.log("Sending tokens with account:", sender.address);

  // ===== CONFIGURATION =====
  const oftAddress = "0x0000000000000000000000000000000000000000"; // Replace with your OFT address
  const destinationChainId = LayerZeroChainIds.base; // Destination chain (Base)
  const recipientAddress = sender.address; // Recipient on destination chain
  const amountToSend = ethers.parseEther("100"); // Amount to send (100 tokens)

  // ===== SEND TOKENS =====
  const NabatOFT = await ethers.getContractFactory("NabatOFT");
  const nabatOFT = NabatOFT.attach(oftAddress);

  console.log("\n=== Transfer Details ===");
  console.log("OFT Contract:", oftAddress);
  console.log("Destination Chain ID:", destinationChainId);
  console.log("Recipient:", recipientAddress);
  console.log("Amount:", ethers.formatEther(amountToSend), "tokens");

  // Check sender balance
  const balance = await nabatOFT.balanceOf(sender.address);
  console.log("\nSender balance:", ethers.formatEther(balance), "tokens");

  if (balance < amountToSend) {
    throw new Error("Insufficient balance");
  }

  // Estimate fees for the cross-chain transfer
  console.log("\nEstimating fees...");
  const adapterParams = ethers.solidityPacked(
    ["uint16", "uint256"],
    [1, 200000] // version 1, 200k gas for destination
  );

  const [nativeFee, zroFee] = await nabatOFT.estimateSendFee(
    destinationChainId,
    recipientAddress,
    amountToSend,
    false,
    adapterParams
  );

  console.log("Native fee:", ethers.formatEther(nativeFee), "ETH");
  console.log("ZRO fee:", ethers.formatEther(zroFee), "ZRO");

  // Send tokens
  console.log("\nSending tokens...");
  const tx = await nabatOFT.sendFrom(
    sender.address,           // from
    destinationChainId,       // destination chain
    recipientAddress,         // to address on destination
    amountToSend,            // amount
    {
      refundAddress: sender.address,
      zroPaymentAddress: ethers.ZeroAddress,
      adapterParams: adapterParams
    },
    { value: nativeFee }     // pay native fee
  );

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed!");
  console.log("Block number:", receipt?.blockNumber);

  console.log("\n=== Next Steps ===");
  console.log("1. Wait 5-10 minutes for LayerZero to relay the message");
  console.log("2. Check recipient balance on destination chain");
  console.log("3. Track transaction on LayerZero Scan:");
  console.log(`   https://layerzeroscan.com/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
