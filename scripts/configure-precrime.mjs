import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

// ONBT contract address (same on all chains)
const ONBT_ADDRESS = "0x41d34924bd261efEB834615f991B40b02C3F2FB3";

// Chain configurations
const chains = {
  8453: {
    name: "base",
    rpcUrl: process.env.BASE_RPC_URL,
    precrtmeFile: "precrime-8453.json",
  },
  42161: {
    name: "arbitrum",
    rpcUrl: process.env.ARBITRUM_RPC_URL,
    precrtmeFile: "precrime-42161.json",
  },
};

async function configurePrecrtmeOnChain(chainId, precrtmeAddress) {
  const chain = chains[chainId];
  console.log(`\n=== Configuring Precrime on ${chain.name} (Chain ${chainId}) ===`);

  // Create provider and signer
  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
  const [signer] = await ethers.getSigners();
  const signerWithProvider = signer.connect(provider);

  // Get ONBT contract
  const ONBT_ABI = [
    "function setPrecrtme(address _precrtme) external",
    "function precrtme() public view returns (address)",
  ];

  const onbt = new ethers.Contract(ONBT_ADDRESS, ONBT_ABI, signerWithProvider);

  // Check current precrime
  const currentPrecrtme = await onbt.precrtme();
  console.log(`Current precrime: ${currentPrecrtme}`);
  console.log(`New precrime: ${precrtmeAddress}`);

  if (currentPrecrtme.toLowerCase() === precrtmeAddress.toLowerCase()) {
    console.log("✓ Precrime already set correctly");
    return;
  }

  // Set precrime
  console.log("Setting precrime...");
  const tx = await onbt.setPrecrtme(precrtmeAddress);
  console.log(`Transaction: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`✅ Precrime configured on ${chain.name}`);
  console.log(`Block: ${receipt.blockNumber}`);
}

async function main() {
  console.log("=== Configuring Precrime on ONBT Contracts ===\n");

  // Check if precrime files exist
  for (const [chainId, chain] of Object.entries(chains)) {
    const chainIdNum = parseInt(chainId);
    if (!fs.existsSync(chain.precrtmeFile)) {
      throw new Error(`Precrime file not found: ${chain.precrtmeFile}. Please deploy precrime first using: npx hardhat run scripts/deploy-precrime.mjs --network ${chain.name}`);
    }
  }

  // Configure precrime on each chain
  for (const [chainId, chain] of Object.entries(chains)) {
    const chainIdNum = parseInt(chainId);
    const precrtmeData = JSON.parse(fs.readFileSync(chain.precrtmeFile, "utf8"));
    const precrtmeAddress = precrtmeData.precrtmeAddress;

    console.log(`\nReading precrime from ${chain.precrtmeFile}: ${precrtmeAddress}`);

    try {
      await configurePrecrtmeOnChain(chainIdNum, precrtmeAddress);
    } catch (error) {
      console.error(`Error configuring precrime on ${chain.name}:`, error.message);
    }
  }

  console.log("\n=== Precrime Configuration Complete ===");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
