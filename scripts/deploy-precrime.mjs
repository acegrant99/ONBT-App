import { ethers } from "hardhat";

async function main() {
  console.log("Deploying NabatPrecrime contract...\n");

  const network = await ethers.provider.getNetwork();
  console.log(`Deploying to network: ${network.name} (Chain ID: ${network.chainId})`);

  // Get the signer
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  // LayerZero endpoints
  const endpoints = {
    8453: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7", // Base
    42161: "0x3c2269811836af69497E5F486A85D7316753cf62", // Arbitrum
  };

  const endpointAddress = endpoints[network.chainId];
  if (!endpointAddress) {
    throw new Error(`LayerZero endpoint not found for chain ${network.chainId}`);
  }

  console.log(`LayerZero Endpoint: ${endpointAddress}`);

  // Deploy NabatPrecrime
  const NabatPrecrime = await ethers.getContractFactory("NabatPrecrime");
  const precrime = await NabatPrecrime.deploy(endpointAddress);

  await precrime.waitForDeployment();
  const precrtmeAddress = await precrime.getAddress();

  console.log(`\n✅ NabatPrecrime deployed at: ${precrtmeAddress}`);

  // Save the precrime address
  const fs = require("fs");
  const data = {
    network: network.name,
    chainId: network.chainId,
    precrtmeAddress: precrtmeAddress,
    endpoint: endpointAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  const filename = `precrime-${network.chainId}.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`\nPrecrime address saved to ${filename}`);

  return {
    chainId: network.chainId,
    network: network.name,
    precrtmeAddress: precrtmeAddress,
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
