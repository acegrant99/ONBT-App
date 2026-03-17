import hre from "hardhat";

const { ethers } = hre;

// Configuration
const CONFIG = {
  hubSupply: ethers.parseEther("1000000000"), // 1 billion ONBT
  destSupply: 0n, // 0 for destination chains
  logoURI: "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
  website: "https://nabat.finance",
  description: "Omnichain Nabat Token - Immutable and Decentralized",
  socialLinks: JSON.stringify({
    twitter: "https://twitter.com/nabat",
    discord: "https://discord.gg/nabat",
    telegram: "https://t.me/nabat",
    website: "https://nabat.finance",
  }),
};

// LayerZero endpoints
const ENDPOINTS = {
  8453: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7", // Base
  42161: "0x3c2269811836af69497E5F486A85D7316753cf62", // Arbitrum
};

// Hub chains (get full supply)
const HUB_CHAINS = [8453]; // Base is hub

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(60));
  console.log("🚀 Deploying OmnichainNabatOFT");
  console.log("=".repeat(60) + "\n");

  const [deployer] = await ethers.getSigners();
  console.log(`Network: ${network.name} (Chain ${chainId})`);
  console.log(`Deployer: ${deployer.address}`);

  const endpoint = ENDPOINTS[chainId];
  if (!endpoint) {
    throw new Error(`LayerZero endpoint not found for chain ${chainId}`);
  }

  console.log(`LayerZero Endpoint: ${endpoint}`);

  // Determine supply based on chain
  const isHub = HUB_CHAINS.includes(chainId);
  const supply = isHub ? CONFIG.hubSupply : CONFIG.destSupply;

  console.log(`Chain Type: ${isHub ? "HUB (mints supply)" : "DESTINATION (0 supply)"}`);
  console.log(`Supply: ${ethers.formatEther(supply)} ONBT\n`);

  // Deploy OmnichainNabatOFT
  console.log("Deploying OmnichainNabatOFT...");
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  const oft = await OmnichainNabatOFT.deploy(
    endpoint,
    deployer.address,
    supply,
    CONFIG.logoURI,
    CONFIG.website,
    CONFIG.description,
    CONFIG.socialLinks
  );

  await oft.waitForDeployment();
  const oftAddress = await oft.getAddress();

  console.log(`\n✅ OmnichainNabatOFT deployed: ${oftAddress}`);

  // Wait for contract to be indexed
  console.log(`\nWaiting for contract to be indexed...`);
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Get deployment details
  const deploymentBlock = (await ethers.provider.getBlockNumber()).toString();

  console.log(`\nDeployment Details:`);
  console.log(`  Block: ${deploymentBlock}`);
  console.log(`  Supply: ${ethers.formatEther(supply)} ONBT`);

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId,
    contractName: "OmnichainNabatOFT",
    address: oftAddress,
    deployer: deployer.address,
    endpoint,
    isHub,
    supply: supply.toString(),
    blockNumber: deploymentBlock,
    timestamp: new Date().toISOString(),
    config: CONFIG,
  };

  const fs = await import("fs");
  const filename = `deployment-onbt-${chainId}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\nDeployment saved to: ${filename}`);

  // Constructor args for verification
  const verifyArgs = {
    endpoint,
    owner: deployer.address,
    supply: supply.toString(),
    logoURI: CONFIG.logoURI,
    website: CONFIG.website,
    description: CONFIG.description,
    socialLinks: CONFIG.socialLinks,
  };

  const verifyFilename = `verify-args-onbt-${chainId}.js`;
  const verifyContent = `module.exports = [
  "${endpoint}", // lzEndpoint
  "${deployer.address}", // owner
  "${supply.toString()}", // initialSupply
  "${CONFIG.logoURI}", // logoURI
  "${CONFIG.website}", // website
  "${CONFIG.description}", // description
  '${CONFIG.socialLinks}' // socialLinks
];
`;
  fs.writeFileSync(verifyFilename, verifyContent);
  console.log(`Verification args saved to: ${verifyFilename}`);

  console.log("\n" + "=".repeat(60));
  console.log("📋 Next Steps:");
  console.log("=".repeat(60));
  console.log(`\n1. Verify contract on block explorer:`);
  if (chainId === 8453) {
    console.log(`   npx hardhat verify --network base --constructor-args ${verifyFilename} ${oftAddress}`);
  } else if (chainId === 42161) {
    console.log(`   npx hardhat verify --network arbitrum --constructor-args ${verifyFilename} ${oftAddress}`);
  }
  
  console.log(`\n2. Wire cross-chain configuration:`);
  if (chainId === 8453) {
    console.log(`   npx hardhat wire-oft --network base`);
  } else if (chainId === 42161) {
    console.log(`   npx hardhat wire-oft --network arbitrum`);
  }

  console.log(`\n3. Update miniapp config with new address:`);
  console.log(`   Update ONBT_TOKEN_ADDRESS in miniapp/config/contracts.ts to ${oftAddress}`);

  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
