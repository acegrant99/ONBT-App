import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy OmnichainNabatOFT on Base (HUB CHAIN)
 * Hub chain deployment with 1B token initial supply minted
 * This is the ONLY chain where tokens are minted
 */

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║     OmnichainNabatOFT Deployment - Base HUB (1B Supply)   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Deploying with account:", deployer.address);
  
  // Get deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("\n--- Network Information ---");
  console.log("Chain ID:", network.chainId.toString());
  
  // Get LayerZero endpoint for Base
  const config = ChainConfig["base"];
  if (!config) {
    throw new Error("No LayerZero configuration found for Base");
  }
  const lzEndpoint = config.endpoint;
  
  console.log("LayerZero Endpoint:", lzEndpoint);

  // Token configuration
  const TOKEN_NAME = "Omnichain Nabat";
  const TOKEN_SYMBOL = "ONBT";
  
  console.log("\n--- Token Configuration ---");
  console.log("Name:", TOKEN_NAME);
  console.log("Symbol:", TOKEN_SYMBOL);
  console.log("Initial Supply: 1,000,000,000 ONBT (minted to owner)");
  console.log("Owner:", deployer.address);

  // Deploy OmnichainNabatOFT
  console.log("\n--- Deploying Contract ---");
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  console.log("Deploying OmnichainNabatOFT...");
  const onbt = await OmnichainNabatOFT.deploy(
    TOKEN_NAME,
    TOKEN_SYMBOL,
    lzEndpoint,
    deployer.address,
    {
      gasLimit: 3000000
    }
  );

  console.log("Waiting for deployment confirmation...");
  await onbt.waitForDeployment();
  const address = await onbt.getAddress();

  console.log("\n✅ OmnichainNabatOFT deployed successfully!");
  console.log("Contract Address:", address);

  // Verify deployment
  console.log("\n--- Verifying Deployment ---");
  const deployedName = await onbt.name();
  const deployedSymbol = await onbt.symbol();
  const deployedSupply = await onbt.totalSupply();
  const deployedOwner = await onbt.owner();
  const deployerBalance = await onbt.balanceOf(deployer.address);
  
  console.log("Name:", deployedName);
  console.log("Symbol:", deployedSymbol);
  console.log("Total Supply:", ethers.formatEther(deployedSupply), "ONBT");
  console.log("Owner:", deployedOwner);
  console.log("Deployer Balance:", ethers.formatEther(deployerBalance), "ONBT");

  // Summary
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                   Deployment Summary                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("Network: Base (Chain ID: 8453)");
  console.log("Contract:", address);
  console.log("Token:", TOKEN_NAME, "(" + TOKEN_SYMBOL + ")");
  console.log("Total Supply: 1,000,000,000 ONBT");
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("1. Deploy OFT on destination chains (Arbitrum, Ethereum, etc.)");
  console.log("2. Set trusted remotes/peers between all chains");
  console.log("3. Configure LayerZero DVNs and executor settings");
  console.log("4. Test cross-chain transfers");
  console.log("5. Verify contract on BaseScan");
  
  console.log("\n📝 Save this deployment information:");
  console.log(`ONBT_BASE="${address}"`);
  console.log(`DEPLOYER="${deployer.address}"`);
  
  // Save deployment info to file
  const fs = await import('fs');
  const deploymentInfo = {
    network: "base",
    chainId: 8453,
    contractAddress: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    lzEndpoint: lzEndpoint,
    tokenName: TOKEN_NAME,
    tokenSymbol: TOKEN_SYMBOL,
    totalSupply: "1000000000000000000000000000" // 1B in wei
  };
  
  fs.writeFileSync(
    './deploy/deployment-onbt-base-hub.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to: deploy/deployment-onbt-base-hub.json");
  
  console.log("\n🎉 Base Hub deployment complete!");
  console.log("🌐 View on BaseScan:");
  console.log(`   https://basescan.org/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
