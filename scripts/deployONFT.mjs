import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy NabatONFT on a specific chain
 * This script deploys the main ONFT contract
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying NabatONFT with account:", deployer.address);
  
  // Get network name from Hardhat
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "hardhat" : network.name;
  
  console.log("Network:", networkName);
  console.log("Chain ID:", network.chainId);

  // Get LayerZero endpoint for this network
  let lzEndpoint;
  
  if (networkName === "hardhat" || networkName === "localhost") {
    // For local testing, use a mock endpoint
    console.log("Using mock endpoint for local testing");
    lzEndpoint = "0x0000000000000000000000000000000000000000"; // Replace with mock if needed
  } else {
    const config = ChainConfig[networkName ];
    if (!config) {
      throw new Error(`No LayerZero configuration found for network: ${networkName}`);
    }
    lzEndpoint = config.endpoint;
  }

  console.log("LayerZero Endpoint:", lzEndpoint);

  // Deploy NabatONFT
  const NabatONFT = await ethers.getContractFactory("NabatONFT");
  const nabatONFT = await NabatONFT.deploy(
    "Nabat NFT",        // name
    "NABT-NFT",         // symbol
    200000,             // min gas to store (200k is typical)
    lzEndpoint,         // LayerZero endpoint
    10000,              // max supply
    "ipfs://QmExample/" // base URI (replace with your IPFS CID)
  );

  await nabatONFT.waitForDeployment();
  const address = await nabatONFT.getAddress();

  console.log("NabatONFT deployed to:", address);
  console.log("\nSave this address for setting up trusted remotes!");
  
  // Mint a few NFTs to deployer (optional)
  console.log("\nMinting initial NFTs...");
  const mintTx = await nabatONFT.batchMint(deployer.address, 3);
  await mintTx.wait();
  console.log("Minted 3 NFTs to", deployer.address);

  const totalSupply = await nabatONFT.totalSupply();
  console.log("Total Supply:", totalSupply.toString());

  console.log("\n=== Deployment Summary ===");
  console.log("Network:", networkName);
  console.log("NabatONFT Address:", address);
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  console.log("Max Supply:", 10000);
  
  console.log("\n=== Next Steps ===");
  console.log("1. Deploy this contract on other chains");
  console.log("2. Set trusted remotes using setTrustedRemoteAddress()");
  console.log("3. Update base URI with setBaseURI() if needed");
  console.log("4. Test cross-chain NFT transfers");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
