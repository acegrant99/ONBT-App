import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

// Configuration
const ONBT_CONFIG = {
  initialSupply: ethers.parseEther("1000000000"), // 1 billion tokens
  logoURI: "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
  website: "https://nabat.finance",
  description: "Omnichain Nabat Token - Immutable and Decentralized",
  socialLinks: JSON.stringify({
    twitter: "https://twitter.com/nabat",
    discord: "https://discord.gg/nabat",
    website: "https://nabat.finance",
  }),
};

// LayerZero chain IDs
const CHAIN_IDS = {
  base: 110,
  arbitrum: 110, // Update this if different
};

// LayerZero endpoints
const ENDPOINTS = {
  8453: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7", // Base
  42161: "0x3c2269811836af69497E5F486A85D7316753cf62", // Arbitrum
};

// ULN and DVN addresses (LayerZero standard libraries)
const LIBRARIES = {
  sendULN: {
    8453: "0x0355DC42b4e14cdfF28b4a0f3d03e00f8a0D5A74", // Base SendULN
    42161: "0x6c26c4a88e5987aaef88c37a5aafc7144a9e478b", // Arbitrum SendULN
  },
  receiveULN: {
    8453: "0x0355DC42b4e14cdfF28b4a0f3d03e00f8a0D5A74", // Base ReceiveULN
    42161: "0x6c26c4a88e5987aaef88c37a5aafc7144a9e478b", // Arbitrum ReceiveULN
  },
};

async function compileContract() {
  console.log("📦 Compiling OmnichainNabatOFT contract...\n");
  try {
    const { stdout } = await execAsync("npx hardhat compile");
    console.log(stdout);
    console.log("✅ Compilation successful\n");
    return true;
  } catch (error) {
    console.error("❌ Compilation failed:", error.message);
    return false;
  }
}

async function deployToChain(chainName, chainId) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📤 Deploying to ${chainName} (Chain ${chainId})`);
  console.log(`${"=".repeat(60)}\n`);

  const network = await ethers.provider.getNetwork();
  console.log(`Connected to: ${network.name} (${network.chainId})`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);

  // Verify we're on the correct chain
  if (network.chainId !== chainId) {
    throw new Error(`Expected chain ${chainId}, but connected to ${network.chainId}`);
  }

  // Determine supply based on chain
  const isHubChain = chainId === 8453; // Base is hub
  const supply = isHubChain ? ONBT_CONFIG.initialSupply : 0n; // Arbitrum gets 0

  console.log(`Supply: ${supply === 0n ? "0 (destination chain)" : "1 billion (hub chain)"}\n`);

  // Get endpoint
  const endpoint = ENDPOINTS[chainId];
  console.log(`LayerZero Endpoint: ${endpoint}`);

  // Deploy OmnichainNabatOFT
  console.log("\nDeploying OmnichainNabatOFT...");
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const oft = await OmnichainNabatOFT.deploy(
    endpoint,
    deployer.address,
    supply,
    ONBT_CONFIG.logoURI,
    ONBT_CONFIG.website,
    ONBT_CONFIG.description,
    ONBT_CONFIG.socialLinks
  );

  await oft.waitForDeployment();
  const oftAddress = await oft.getAddress();
  console.log(`✅ OmnichainNabatOFT deployed: ${oftAddress}\n`);

  // Save deployment info
  const deploymentInfo = {
    chainId,
    chainName,
    contract: "OmnichainNabatOFT",
    address: oftAddress,
    deployer: deployer.address,
    endpoint,
    isHubChain,
    supply: supply.toString(),
    timestamp: new Date().toISOString(),
    blockNumber: (await ethers.provider.getBlockNumber()).toString(),
  };

  const filename = `deployment-${chainId}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment info saved to ${filename}\n`);

  return oftAddress;
}

async function configureDVNAndULN(chainName, chainId, oftAddress) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`⚙️  Configuring DVN & ULN on ${chainName}`);
  console.log(`${"=".repeat(60)}\n`);

  const network = await ethers.provider.getNetwork();
  if (network.chainId !== chainId) {
    console.log(`⏭️  Skipping - not connected to ${chainName}`);
    return;
  }

  const [signer] = await ethers.getSigners();
  const OFT_ABI = [
    "function setSendLibrary(uint32 remoteChainId, address libraryAddress) external",
    "function setReceiveLibrary(uint32 remoteChainId, address libraryAddress, uint128 gracePeriod) external",
    "function setMessageLibrary(uint32 remoteChainId, address sendLibrary, address receiveLibrary) external",
  ];

  const oft = new ethers.Contract(oftAddress, OFT_ABI, signer);

  // Get remote chain ID (other chain)
  const remoteChainId = chainId === 8453 ? 110 : 110; // Both currently 110, adjust as needed

  console.log(`Remote Chain ID: ${remoteChainId}`);

  const sendLib = LIBRARIES.sendULN[chainId];
  const receiveLib = LIBRARIES.receiveULN[chainId];

  console.log(`Send ULN: ${sendLib}`);
  console.log(`Receive ULN: ${receiveLib}\n`);

  try {
    console.log("Setting message libraries...");
    const tx = await oft.setMessageLibrary(remoteChainId, sendLib, receiveLib, {
      gasLimit: 500000,
    });

    console.log(`Transaction: ${tx.hash}`);
    const receipt = await tx.wait();

    console.log(`✅ DVN/ULN configured on ${chainName}`);
    console.log(`Block: ${receipt.blockNumber}\n`);

    return true;
  } catch (error) {
    if (error.message.includes("not connected")) {
      console.log(`⏭️  Not connected to ${chainName}, skipping DVN/ULN config`);
      return true;
    }
    console.error(`❌ Error configuring DVN/ULN: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 ONBT Redeployment with DVN & ULN Configuration");
  console.log("=".repeat(60) + "\n");

  // Step 1: Compile
  const compiled = await compileContract();
  if (!compiled) {
    console.error("❌ Compilation failed. Aborting.");
    process.exit(1);
  }

  // Step 2: Deploy to Base
  console.log("\n📍 STEP 1: Deploy to Base Mainnet");
  let baseAddress;
  try {
    baseAddress = await deployToChain("Base", 8453);
  } catch (error) {
    console.error("❌ Base deployment failed:", error.message);
  }

  // Step 3: Deploy to Arbitrum
  console.log("\n📍 STEP 2: Deploy to Arbitrum");
  let arbitrumAddress;
  try {
    arbitrumAddress = await deployToChain("Arbitrum", 42161);
  } catch (error) {
    console.error("❌ Arbitrum deployment failed:", error.message);
  }

  // Step 4: Configure DVN & ULN on Base
  console.log("\n📍 STEP 3: Configure DVN & ULN on Base");
  if (baseAddress) {
    try {
      await configureDVNAndULN("Base", 8453, baseAddress);
    } catch (error) {
      console.error("❌ Base DVN/ULN config failed:", error.message);
    }
  }

  // Step 5: Configure DVN & ULN on Arbitrum
  console.log("\n📍 STEP 4: Configure DVN & ULN on Arbitrum");
  if (arbitrumAddress) {
    try {
      await configureDVNAndULN("Arbitrum", 42161, arbitrumAddress);
    } catch (error) {
      console.error("❌ Arbitrum DVN/ULN config failed:", error.message);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Deployment Summary");
  console.log("=".repeat(60));
  if (baseAddress) console.log(`✅ Base: ${baseAddress}`);
  if (arbitrumAddress) console.log(`✅ Arbitrum: ${arbitrumAddress}`);
  console.log("\n⚠️  Next steps:");
  console.log("1. Verify contracts on block explorers");
  console.log("2. Set trusted remotes between chains");
  console.log("3. Test cross-chain transfers");
  console.log("=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
