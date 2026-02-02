import { ethers } from "hardhat";
import { ChainConfig } from "../constants/layerzero";

/**
 * Deploy NabatOFT on a specific chain
 * This script deploys the main OFT contract
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying NabatOFT with account:", deployer.address);
  
  // Get network name from Hardhat
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "hardhat" : network.name;
  
  console.log("Network:", networkName);
  console.log("Chain ID:", network.chainId);

  // Get LayerZero endpoint for this network
  let lzEndpoint: string;
  
  if (networkName === "hardhat" || networkName === "localhost") {
    // For local testing, use a mock endpoint (you can deploy a mock)
    console.log("Using mock endpoint for local testing");
    lzEndpoint = "0x0000000000000000000000000000000000000000"; // Replace with mock if needed
  } else {
    const config = ChainConfig[networkName as keyof typeof ChainConfig];
    if (!config) {
      throw new Error(`No LayerZero configuration found for network: ${networkName}`);
    }
    lzEndpoint = config.endpoint;
  }

  console.log("LayerZero Endpoint:", lzEndpoint);

  // Deploy NabatOFT
  const NabatOFT = await ethers.getContractFactory("NabatOFT");
  const nabatOFT = await NabatOFT.deploy(
    "Nabat Token", // name
    "NABT",        // symbol
    8,             // shared decimals (8 is common for cross-chain tokens)
    lzEndpoint     // LayerZero endpoint
  );

  await nabatOFT.waitForDeployment();
  const address = await nabatOFT.getAddress();

  console.log("NabatOFT deployed to:", address);
  console.log("\nSave this address for setting up trusted remotes!");
  
  // Mint initial supply to deployer (optional)
  console.log("\nMinting initial supply...");
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens
  const mintTx = await nabatOFT.mint(deployer.address, initialSupply);
  await mintTx.wait();
  console.log("Minted", ethers.formatEther(initialSupply), "tokens to", deployer.address);

  console.log("\n=== Deployment Summary ===");
  console.log("Network:", networkName);
  console.log("NabatOFT Address:", address);
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  
  console.log("\n=== Next Steps ===");
  console.log("1. Deploy this contract on other chains");
  console.log("2. Set trusted remotes using setTrustedRemoteAddress()");
  console.log("3. Test cross-chain transfers");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
