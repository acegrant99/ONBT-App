import { ethers } from "hardhat";
import { LayerZeroChainIds } from "../constants/layerzero";

/**
 * Set trusted remote addresses for cross-chain communication
 * This script configures which contracts on other chains are trusted
 * 
 * Usage:
 * 1. Deploy contracts on multiple chains
 * 2. Update the addresses in this script
 * 3. Run this script on each chain to set up bidirectional trust
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Setting up trusted remotes with account:", deployer.address);

  // ===== CONFIGURATION =====
  // Replace these with your actual deployed contract addresses
  const contractAddresses = {
    ethereum: "0x0000000000000000000000000000000000000000", // Replace with actual address
    base: "0x0000000000000000000000000000000000000000",     // Replace with actual address
    polygon: "0x0000000000000000000000000000000000000000",  // Replace with actual address
    arbitrum: "0x0000000000000000000000000000000000000000", // Replace with actual address
  };

  // Contract address on current network
  const currentContractAddress = "0x0000000000000000000000000000000000000000"; // Replace with current chain contract
  const isOFT = true; // Set to false for ONFT

  // ===== SETUP =====
  const contractFactory = isOFT 
    ? await ethers.getContractFactory("NabatOFT")
    : await ethers.getContractFactory("NabatONFT");
  
  const contract = contractFactory.attach(currentContractAddress);
  
  console.log("Contract type:", isOFT ? "OFT" : "ONFT");
  console.log("Contract address:", currentContractAddress);
  console.log("\nSetting trusted remotes...\n");

  // Set trusted remote for Ethereum
  if (contractAddresses.ethereum !== "0x0000000000000000000000000000000000000000") {
    console.log("Setting trusted remote for Ethereum...");
    const tx1 = await contract.setTrustedRemoteAddress(
      LayerZeroChainIds.ethereum,
      contractAddresses.ethereum
    );
    await tx1.wait();
    console.log("✓ Ethereum trusted remote set");
  }

  // Set trusted remote for Base
  if (contractAddresses.base !== "0x0000000000000000000000000000000000000000") {
    console.log("Setting trusted remote for Base...");
    const tx2 = await contract.setTrustedRemoteAddress(
      LayerZeroChainIds.base,
      contractAddresses.base
    );
    await tx2.wait();
    console.log("✓ Base trusted remote set");
  }

  // Set trusted remote for Polygon
  if (contractAddresses.polygon !== "0x0000000000000000000000000000000000000000") {
    console.log("Setting trusted remote for Polygon...");
    const tx3 = await contract.setTrustedRemoteAddress(
      LayerZeroChainIds.polygon,
      contractAddresses.polygon
    );
    await tx3.wait();
    console.log("✓ Polygon trusted remote set");
  }

  // Set trusted remote for Arbitrum
  if (contractAddresses.arbitrum !== "0x0000000000000000000000000000000000000000") {
    console.log("Setting trusted remote for Arbitrum...");
    const tx4 = await contract.setTrustedRemoteAddress(
      LayerZeroChainIds.arbitrum,
      contractAddresses.arbitrum
    );
    await tx4.wait();
    console.log("✓ Arbitrum trusted remote set");
  }

  console.log("\n✅ All trusted remotes configured!");
  console.log("\n=== Next Steps ===");
  console.log("1. Run this script on each chain to complete bidirectional setup");
  console.log("2. Test cross-chain transfers");
  console.log("3. Monitor gas costs and adjust as needed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
