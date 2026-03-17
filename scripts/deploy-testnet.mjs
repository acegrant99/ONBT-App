import hre from "hardhat";
const { ethers } = hre;

// Testnet LayerZero Endpoint addresses
const ENDPOINTS = {
  sepolia: "0x6EDCE65403992e310A62460808c4b910D5D20bD9",
  arbitrumSepolia: "0x6EDCE65403992e310A62460808c4b910D5D20bD9",
};

// Testnet Endpoint IDs
const ENDPOINT_IDS = {
  sepolia: 40161,
  arbitrumSepolia: 40231,
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     Deploy ONBT OFT to Testnet (Sepolia/Arb Sepolia)    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("📍 Network:", network.name, `(Chain ${network.chainId})`);
  console.log("👤 Deployer:", deployer.address);
  console.log("🔗 Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  let endpoint, endpointId, hubChainName;
  
  if (network.chainId === 11155111n) {
    // Sepolia
    endpoint = ENDPOINTS.sepolia;
    endpointId = ENDPOINT_IDS.sepolia;
    hubChainName = "Sepolia (testnet hub)";
    console.log("🎯 Deploying to Sepolia (hub chain with 1B ONBT)");
  } else if (network.chainId === 421614n) {
    // Arbitrum Sepolia
    endpoint = ENDPOINTS.arbitrumSepolia;
    endpointId = ENDPOINT_IDS.arbitrumSepolia;
    hubChainName = "Arbitrum Sepolia (testnet destination)";
    console.log("🎯 Deploying to Arbitrum Sepolia (destination chain, 0 ONBT)");
  } else {
    console.error("❌ This script is for testnet only (Sepolia or Arbitrum Sepolia)");
    process.exit(1);
  }

  console.log("LayerZero Endpoint:", endpoint);
  console.log("Endpoint ID:", endpointId);

  // Deployment parameters
  const initialSupply = network.chainId === 11155111n 
    ? ethers.parseUnits("1000000000", 18) // 1B on Sepolia hub
    : ethers.parseUnits("0", 18); // 0 on Arbitrum Sepolia

  const logoURI = "https://gateway.pinata.cloud/ipfs/QmVxL5qnXqDxFbL5qmQ5qxLpL5qzQqZQqZQqZQqZQqZQq";
  const website = "https://onbttoken.io";
  const description = "Omnichain Nabat - Testnet Version";
  const socialLinks = JSON.stringify({
    twitter: "https://twitter.com/onbttoken",
    discord: "https://discord.gg/onbt"
  });

  console.log("\n📊 Deployment Parameters:");
  console.log("  Initial Supply:", ethers.formatUnits(initialSupply, 18), "ONBT");
  console.log("  Logo URI:", logoURI);
  console.log("  Website:", website);
  console.log("  Description:", description);

  // Deploy contract
  console.log("\n🚀 Deploying OmnichainNabatOFT...");

  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const oft = await OFT.deploy(
    endpoint,
    deployer.address,
    initialSupply,
    logoURI,
    website,
    description,
    socialLinks
  );

  await oft.waitForDeployment();
  const contractAddress = await oft.getAddress();

  console.log("✅ Deployed to:", contractAddress);

  // Verify on block explorer
  console.log("\n📋 Contract Verification:");
  console.log("  Constructor arguments (for manual verification):");
  console.log("  1. Endpoint:", endpoint);
  console.log("  2. Owner:", deployer.address);
  console.log("  3. Initial Supply:", initialSupply.toString());
  console.log("  4. Logo URI:", logoURI);
  console.log("  5. Website:", website);
  console.log("  6. Description:", description);
  console.log("  7. Social Links:", socialLinks);

  // Get contract info
  const name = await oft.name();
  const symbol = await oft.symbol();
  const decimals = await oft.decimals();
  const totalSupply = await oft.totalSupply();
  const owner = await oft.owner();

  console.log("\n✨ Contract Info:");
  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Decimals:", decimals);
  console.log("  Total Supply:", ethers.formatUnits(totalSupply, decimals));
  console.log("  Owner:", owner);

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    address: contractAddress,
    endpoint: endpoint,
    endpointId: endpointId,
    deployer: deployer.address,
    initialSupply: initialSupply.toString(),
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("\n📝 Deployment saved to memory");
  console.log("Next steps:");
  console.log("  1. Fund the contract with testnet ETH if needed");
  console.log("  2. Configure peer on the other testnet:");
  console.log("     npx hardhat run scripts/configure-testnet-peers.mjs --network " + 
    (network.chainId === 11155111n ? "arbitrumSepolia" : "sepolia"));
  console.log("  3. Test transfers:");
  console.log("     npx hardhat run scripts/test-testnet-transfer.mjs --network " + network.name);

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Deployment failed:", e.message);
    process.exit(1);
  });
