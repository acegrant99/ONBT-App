import { ethers } from "hardhat";
import { LayerZeroChainIds } from "../constants/layerzero";

/**
 * Send ONFT (NFT) from one chain to another
 * This demonstrates how to use LayerZero for cross-chain NFT transfers
 */
async function main() {
  const [sender] = await ethers.getSigners();
  console.log("Sending NFT with account:", sender.address);

  // ===== CONFIGURATION =====
  const onftAddress = "0x0000000000000000000000000000000000000000"; // Replace with your ONFT address
  const destinationChainId = LayerZeroChainIds.base; // Destination chain (Base)
  const recipientAddress = sender.address; // Recipient on destination chain
  const tokenId = 1; // Token ID to send

  // ===== SEND NFT =====
  const NabatONFT = await ethers.getContractFactory("NabatONFT");
  const nabatONFT = NabatONFT.attach(onftAddress);

  console.log("\n=== Transfer Details ===");
  console.log("ONFT Contract:", onftAddress);
  console.log("Destination Chain ID:", destinationChainId);
  console.log("Recipient:", recipientAddress);
  console.log("Token ID:", tokenId);

  // Check NFT ownership
  const owner = await nabatONFT.ownerOf(tokenId);
  console.log("\nCurrent owner:", owner);

  if (owner.toLowerCase() !== sender.address.toLowerCase()) {
    throw new Error("Sender does not own this token");
  }

  // Estimate fees for the cross-chain transfer
  console.log("\nEstimating fees...");
  const adapterParams = ethers.solidityPacked(
    ["uint16", "uint256"],
    [1, 200000] // version 1, 200k gas for destination
  );

  const [nativeFee, zroFee] = await nabatONFT.estimateSendFee(
    destinationChainId,
    recipientAddress,
    tokenId,
    false,
    adapterParams
  );

  console.log("Native fee:", ethers.formatEther(nativeFee), "ETH");
  console.log("ZRO fee:", ethers.formatEther(zroFee), "ZRO");

  // Send NFT
  console.log("\nSending NFT...");
  const tx = await nabatONFT.sendFrom(
    sender.address,           // from
    destinationChainId,       // destination chain
    recipientAddress,         // to address on destination
    tokenId,                  // token ID
    sender.address,           // refund address
    ethers.ZeroAddress,       // zro payment address
    adapterParams,            // adapter params
    { value: nativeFee }      // pay native fee
  );

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed!");
  console.log("Block number:", receipt?.blockNumber);

  console.log("\n=== Important ===");
  console.log("The NFT will be locked on this chain and unlocked on the destination chain.");
  console.log("To bring it back, use the same process from the destination chain.");

  console.log("\n=== Next Steps ===");
  console.log("1. Wait 5-10 minutes for LayerZero to relay the message");
  console.log("2. Check NFT ownership on destination chain");
  console.log("3. Track transaction on LayerZero Scan:");
  console.log(`   https://layerzeroscan.com/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
