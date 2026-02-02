import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy Omnichain Nabat Token (ONBT)
 * This script deploys the immutable branded OFT with fixed parameters
 */

// ============ ONBT Configuration ============
const ONBT_CONFIG = {
  // Token parameters (immutable)
  name: "ONabat",
  symbol: "ONBT",
  sharedDecimals: 8, // 8 decimals for cross-chain compatibility
  
  // Total supply (1 billion ONBT)
  totalSupply: "1000000000", // In ether units (will be 1B * 10^18)
  
  // Branding metadata
  branding: {
    logoURI: "ipfs://QmYourLogoHashHere", // Replace with actual IPFS hash after upload
    website: "https://nabat.finance", // Official Nabat Finance website (Vercel deployment)
    description: "ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero. It enables seamless cross-chain transfers across multiple blockchains with a fixed supply of 1 billion tokens and professional branding. Deployed via peer configuration, no proxies needed.",
    socialLinks: JSON.stringify({
      twitter: "https://twitter.com/nabatfinance",
      telegram: "https://t.me/nabatfinance",
      discord: "https://discord.gg/nabatfinance",
      github: "https://github.com/acegrant99/ONBT-App",
      medium: "https://medium.com/@nabatfinance"
    })
  }
};

/**
 * Main deployment function
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║             ONabat Token (ONBT) Deployment                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Deploying with account:", deployer.address);
  
  // Get deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "hardhat" : network.name;
  
  console.log("\n--- Network Information ---");
  console.log("Network:", networkName);
  console.log("Chain ID:", network.chainId.toString());

  // Get LayerZero endpoint for this network
  let lzEndpoint;
  
  if (networkName === "hardhat" || networkName === "localhost") {
    console.log("\n⚠️  Warning: Using mock endpoint for local testing");
    lzEndpoint = "0x0000000000000000000000000000000000000000";
  } else {
    const config = ChainConfig[networkName];
    if (!config) {
      throw new Error(`No LayerZero configuration found for network: ${networkName}`);
    }
    lzEndpoint = config.endpoint;
  }

  console.log("LayerZero Endpoint:", lzEndpoint);

  // Calculate total supply in wei
  const totalSupplyWei = ethers.parseEther(ONBT_CONFIG.totalSupply);
  
  console.log("\n--- Token Configuration ---");
  console.log("Name:", ONBT_CONFIG.name);
  console.log("Symbol:", ONBT_CONFIG.symbol);
  console.log("Decimals:", 18, "(native) /", ONBT_CONFIG.sharedDecimals, "(shared)");
  console.log("Total Supply:", ONBT_CONFIG.totalSupply, "ONBT");
  console.log("Total Supply (wei):", totalSupplyWei.toString());
  
  console.log("\n--- Branding Information ---");
  console.log("Logo URI:", ONBT_CONFIG.branding.logoURI);
  console.log("Website:", ONBT_CONFIG.branding.website);
  console.log("Description:", ONBT_CONFIG.branding.description);
  console.log("Social Links:", ONBT_CONFIG.branding.socialLinks);

  // Deploy OmnichainNabatOFT
  console.log("\n--- Deploying Contract ---");
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  console.log("Deploying OmnichainNabatOFT...");
  const onbt = await OmnichainNabatOFT.deploy(
    ONBT_CONFIG.sharedDecimals,
    lzEndpoint,
    totalSupplyWei,
    ONBT_CONFIG.branding.logoURI,
    ONBT_CONFIG.branding.website,
    ONBT_CONFIG.branding.description,
    ONBT_CONFIG.branding.socialLinks
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
  const isImmutable = await onbt.hasImmutableSupply();
  
  console.log("Name:", deployedName);
  console.log("Symbol:", deployedSymbol);
  console.log("Total Supply:", ethers.formatEther(deployedSupply), "ONBT");
  console.log("Owner:", deployedOwner);
  console.log("Immutable Supply:", isImmutable);
  
  // Get branding info
  const brandingInfo = await onbt.getBrandingInfo();
  console.log("\n--- Deployed Branding ---");
  console.log("Logo URI:", brandingInfo.logo);
  console.log("Website:", brandingInfo.site);
  
  // Check deployer balance
  const deployerBalance = await onbt.balanceOf(deployer.address);
  console.log("\nDeployer ONBT Balance:", ethers.formatEther(deployerBalance), "ONBT");

  // Get token URI (metadata)
  const tokenMetadata = await onbt.tokenURI();
  console.log("\n--- Token Metadata (JSON) ---");
  console.log(tokenMetadata);

  // Summary
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                   Deployment Summary                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("Network:", networkName);
  console.log("Contract:", address);
  console.log("Token:", ONBT_CONFIG.name, "(" + ONBT_CONFIG.symbol + ")");
  console.log("Total Supply:", ONBT_CONFIG.totalSupply, "ONBT (immutable)");
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("1. Upload logo to IPFS and update logoURI");
  console.log("2. Deploy this contract on other chains");
  console.log("3. Set trusted remotes for cross-chain transfers");
  console.log("4. Update branding if needed: updateBranding()");
  console.log("5. Transfer tokens to liquidity pools and users");
  console.log("6. Verify contract on block explorer");
  
  console.log("\n📝 Save this deployment information:");
  console.log(`export ONBT_ADDRESS_${networkName.toUpperCase()}="${address}"`);
  console.log(`export ONBT_DEPLOYER="${deployer.address}"`);
  console.log(`export ONBT_SUPPLY="${ONBT_CONFIG.totalSupply}"`);
  
  console.log("\n✨ Deployment complete! Your ONBT token (1B supply) is immutable and ready for omnichain use via peer configuration.");
  console.log("🌐 Visit: https://nabat.finance");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
