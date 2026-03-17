import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy OmnichainNabatOFTDestination on Arbitrum
 * Destination chain deployment with ZERO initial supply
 * Tokens arrive via LayerZero cross-chain transfers from Base hub
 */

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║     OmnichainNabatOFT Deployment - Arbitrum (Destination) ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Deploying with account:", deployer.address);
  
  // Get deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("\n--- Network Information ---");
  console.log("Chain ID:", network.chainId.toString());
  
  // Get LayerZero endpoint for Arbitrum
  const config = ChainConfig["arbitrum"];
  if (!config) {
    throw new Error("No LayerZero configuration found for Arbitrum");
  }
  const lzEndpoint = config.endpoint;
  
  console.log("LayerZero Endpoint:", lzEndpoint);

  // Token configuration
  const TOKEN_NAME = "Omnichain Nabat";
  const TOKEN_SYMBOL = "ONBT";
  
  console.log("\n--- Token Configuration ---");
  console.log("Name:", TOKEN_NAME);
  console.log("Symbol:", TOKEN_SYMBOL);
  console.log("Initial Supply: 0 ONBT (DESTINATION CHAIN)");
  console.log("⚠️  Tokens will arrive via bridge from Base");
  console.log("Owner:", deployer.address);

  // Deploy OmnichainNabatOFTDestination
  console.log("\n--- Deploying Contract ---");
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFTDestination");
  
  console.log("Deploying OmnichainNabatOFTDestination...");
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

  console.log("\n✅ OmnichainNabatOFTDestination deployed successfully!");
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
  console.log("Total Supply:", ethers.formatEther(deployedSupply), "ONBT (should be 0)");
  console.log("Owner:", deployedOwner);
  console.log("Deployer Balance:", ethers.formatEther(deployerBalance), "ONBT (should be 0)");

  // Summary
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                   Deployment Summary                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("Network: Arbitrum (Chain ID: 42161)");
  console.log("Contract:", address);
  console.log("Token:", TOKEN_NAME, "(" + TOKEN_SYMBOL + ")");
  console.log("Total Supply: 0 ONBT (DESTINATION CHAIN)");
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  console.log("\n⚠️  This is a DESTINATION chain deployment");
  console.log("   Tokens will arrive via LayerZero bridge from Base");
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("1. Set peer connections:");
  console.log("   Base (30184) ↔ Arbitrum (30110)");
  console.log("2. Configure LayerZero DVNs and executor settings on BOTH chains");
  console.log("3. Bridge tokens FROM Base TO Arbitrum");
  console.log("4. Verify contract on Arbiscan");
  
  console.log("\n📝 Save this deployment information:");
  console.log(`ONBT_ARBITRUM="${address}"`);
  console.log(`DEPLOYER="${deployer.address}"`);
  
  // Save deployment info to file
  const fs = await import('fs');
  const deploymentInfo = {
    network: "arbitrum",
    chainId: 42161,
    contractAddress: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    lzEndpoint: lzEndpoint,
    tokenName: TOKEN_NAME,
    tokenSymbol: TOKEN_SYMBOL,
    totalSupply: "1000000000000000000000000000" // 1B in wei
  };
  
  fs.writeFileSync(
    './deploy/deployment-onbt-arbitrum.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to: deploy/deployment-onbt-arbitrum.json");
  
  console.log("\n🎉 Arbitrum deployment complete!");
  console.log("🌐 View on Arbiscan:");
  console.log(`   https://arbiscan.io/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
