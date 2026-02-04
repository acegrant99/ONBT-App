import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy ONabat Token (ONBT)
 * This script deploys the immutable branded OFT with fixed parameters
 * 
 * IMPORTANT: Supply Minting Strategy
 * - Hub Chain (Source): Deploy with FULL supply (1B ONBT)
 * - Destination Chains: Deploy with ZERO supply (0 ONBT)
 * 
 * Set DEPLOYMENT_TYPE environment variable:
 * - "hub" = Mint full 1B supply (use for first deployment)
 * - "destination" = Mint 0 supply (use for all other chains)
 * 
 * Examples:
 *   DEPLOYMENT_TYPE=hub npm run deploy:onbt:base
 *   DEPLOYMENT_TYPE=destination npm run deploy:onbt:ethereum
 */

// ============ Deployment Type ============
const DEPLOYMENT_TYPE = process.env.DEPLOYMENT_TYPE || "hub";
const IS_HUB_CHAIN = DEPLOYMENT_TYPE === "hub";

// ============ ONBT Configuration ============
const ONBT_CONFIG = {
  // Token parameters (immutable)
  name: "ONabat",
  symbol: "ONBT",
  sharedDecimals: 8, // 8 decimals for cross-chain compatibility
  
  // Total supply - ONLY minted on hub chain!
  totalSupply: IS_HUB_CHAIN ? "1000000000" : "0", // 1B on hub, 0 on destinations
  
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
  
  console.log("--- Deployment Type ---");
  console.log("Type:", DEPLOYMENT_TYPE.toUpperCase());
  console.log("Hub Chain:", IS_HUB_CHAIN ? "YES (will mint full supply)" : "NO (will mint 0 tokens)");
  
  console.log("\nDeploying with account:", deployer.address);
  
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
  
  if (IS_HUB_CHAIN) {
    console.log("Total Supply:", ONBT_CONFIG.totalSupply, "ONBT (FULL SUPPLY - HUB CHAIN)");
    console.log("⚠️  This is the HUB chain - ALL 1B tokens will be minted here!");
  } else {
    console.log("Total Supply:", ONBT_CONFIG.totalSupply, "ONBT (DESTINATION CHAIN)");
    console.log("ℹ️  This is a DESTINATION chain - 0 tokens will be minted.");
    console.log("ℹ️  Tokens will arrive via cross-chain transfers from hub chain.");
  }
  
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
  console.log("Deployment Type:", DEPLOYMENT_TYPE.toUpperCase());
  console.log("Hub Chain:", IS_HUB_CHAIN ? "YES" : "NO");
  console.log("Network:", networkName);
  console.log("Contract:", address);
  console.log("Token:", ONBT_CONFIG.name, "(" + ONBT_CONFIG.symbol + ")");
  console.log("Total Supply:", ONBT_CONFIG.totalSupply, "ONBT", IS_HUB_CHAIN ? "(immutable)" : "(awaiting bridge transfers)");
  console.log("Deployer:", deployer.address);
  console.log("LayerZero Endpoint:", lzEndpoint);
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      Next Steps                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  
  if (IS_HUB_CHAIN) {
    console.log("✅ Hub Chain Deployment Complete!");
    console.log("1. Deploy on DESTINATION chains with DEPLOYMENT_TYPE=destination");
    console.log("2. Set trusted remotes between all chains");
    console.log("3. Bridge tokens from this hub chain to destinations");
    console.log("4. Verify that global supply = 1B across all chains");
  } else {
    console.log("✅ Destination Chain Deployment Complete!");
    console.log("1. Deploy on other destination chains (if needed)");
    console.log("2. Set trusted remotes to connect with hub chain");
    console.log("3. Bridge tokens FROM hub chain TO this chain");
    console.log("4. This chain will receive tokens via burn/mint mechanism");
  }
  
  console.log("\nGeneral next steps:");
  console.log("- Upload logo to IPFS and update logoURI");
  console.log("- Set trusted remotes: scripts/setTrustedRemotes.mjs");
  console.log("- Update branding if needed: updateBranding()");
  console.log("- Transfer tokens to liquidity pools and users");
  console.log("- Verify contract on block explorer");
  
  console.log("\n📝 Save this deployment information:");
  console.log(`export ONBT_${IS_HUB_CHAIN ? 'HUB' : 'DEST'}_${networkName.toUpperCase()}="${address}"`);
  console.log(`export ONBT_DEPLOYER="${deployer.address}"`);
  console.log(`export ONBT_SUPPLY_${networkName.toUpperCase()}="${ONBT_CONFIG.totalSupply}"`);
  
  if (IS_HUB_CHAIN) {
    console.log("\n✨ Hub chain deployment complete! Your ONBT token (1B supply) is immutable.");
    console.log("   Next: Deploy on destination chains with DEPLOYMENT_TYPE=destination");
  } else {
    console.log("\n✨ Destination chain deployment complete! This chain starts with 0 ONBT.");
    console.log("   Next: Bridge tokens from hub chain to activate this deployment.");
  }
  
  console.log("🌐 Visit: https://nabat.finance");
  console.log("📖 Read: SUPPLY_MODEL.md for hub/destination chain details");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
