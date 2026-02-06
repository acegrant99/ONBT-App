import hre from "hardhat";
const { ethers } = hre;

/**
 * Update branding metadata for ONBT token
 * This script allows updating logo, website, description, and social links
 */

/**
 * Update branding for a deployed ONBT contract
 * @param {string} contractAddress - Address of the deployed ONBT contract
 * @param {object} newBranding - New branding metadata
 */
async function updateBranding(contractAddress, newBranding) {
  const [signer] = await ethers.getSigners();
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           ONBT Branding Update Utility                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("Updating branding for:", contractAddress);
  console.log("Signer:", signer.address);
  
  // Get contract instance
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const onbt = OmnichainNabatOFT.attach(contractAddress);
  
  // Check current owner
  const owner = await onbt.owner();
  console.log("Contract owner:", owner);
  
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error("Only the contract owner can update branding!");
  }
  
  // Get current branding
  console.log("\n--- Current Branding ---");
  const currentBranding = await onbt.getBrandingInfo();
  console.log("Logo URI:", currentBranding.logo);
  console.log("Website:", currentBranding.site);
  console.log("Description:", currentBranding.desc);
  console.log("Social Links:", currentBranding.social);
  
  // Prepare new branding (use existing if not provided)
  const updatedBranding = {
    logoURI: newBranding.logoURI || currentBranding.logo,
    website: newBranding.website || currentBranding.site,
    description: newBranding.description || currentBranding.desc,
    socialLinks: newBranding.socialLinks || currentBranding.social
  };
  
  console.log("\n--- New Branding ---");
  console.log("Logo URI:", updatedBranding.logoURI);
  console.log("Website:", updatedBranding.website);
  console.log("Description:", updatedBranding.description);
  console.log("Social Links:", updatedBranding.socialLinks);
  
  // Update branding
  console.log("\n--- Updating Branding ---");
  const tx = await onbt.updateBranding(
    updatedBranding.logoURI,
    updatedBranding.website,
    updatedBranding.description,
    updatedBranding.socialLinks
  );
  
  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log("✅ Branding updated! Block:", receipt.blockNumber);
  
  // Verify update
  console.log("\n--- Verifying Update ---");
  const verifyBranding = await onbt.getBrandingInfo();
  console.log("Logo URI:", verifyBranding.logo);
  console.log("Website:", verifyBranding.site);
  
  // Get updated metadata
  const tokenMetadata = await onbt.tokenURI();
  console.log("\n--- Updated Token Metadata ---");
  console.log(tokenMetadata);
  
  console.log("\n✨ Branding update complete!");
}

/**
 * Generate IPFS metadata JSON for ONBT
 * This creates a standard ERC-20 metadata JSON file
 */
function generateMetadataJSON(branding, tokenInfo) {
  return JSON.stringify({
    name: tokenInfo.name || "ONabat",
    symbol: tokenInfo.symbol || "ONBT",
    decimals: tokenInfo.decimals || 18,
    description: branding.description,
    image: branding.logoURI,
    external_url: branding.website,
    properties: {
      totalSupply: tokenInfo.totalSupply || "100000000",
      immutable: true,
      omnichain: true,
      layerzero: true,
      socialMedia: JSON.parse(branding.socialLinks)
    }
  }, null, 2);
}

/**
 * Get current branding information
 */
async function getBranding(contractAddress) {
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const onbt = OmnichainNabatOFT.attach(contractAddress);
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              ONBT Branding Information                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const name = await onbt.name();
  const symbol = await onbt.symbol();
  const totalSupply = await onbt.TOTAL_SUPPLY();
  const branding = await onbt.getBrandingInfo();
  const tokenURI = await onbt.tokenURI();
  
  console.log("Contract:", contractAddress);
  console.log("\n--- Token Information ---");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Total Supply:", ethers.formatEther(totalSupply), "ONBT");
  
  console.log("\n--- Branding ---");
  console.log("Logo URI:", branding.logo);
  console.log("Website:", branding.site);
  console.log("Description:", branding.desc);
  console.log("Social Links:", branding.social);
  
  console.log("\n--- Full Metadata (JSON) ---");
  console.log(tokenURI);
  
  return {
    name,
    symbol,
    totalSupply: ethers.formatEther(totalSupply),
    branding: {
      logoURI: branding.logo,
      website: branding.site,
      description: branding.desc,
      socialLinks: branding.social
    },
    tokenURI
  };
}

// ============ Main Script Execution ============

async function main() {
  // Get contract address from environment or command line
  const contractAddress = process.env.ONBT_ADDRESS || process.argv[2];
  
  if (!contractAddress) {
    console.error("❌ Error: Contract address required!");
    console.log("\nUsage:");
    console.log("  node scripts/updateBranding.mjs <contract_address>");
    console.log("  or set ONBT_ADDRESS environment variable");
    process.exit(1);
  }
  
  const action = process.argv[3] || "get";
  
  if (action === "get" || action === "show") {
    // Get current branding
    await getBranding(contractAddress);
  } else if (action === "update") {
    // Update branding
    const newBranding = {
      logoURI: process.env.NEW_LOGO_URI,
      website: process.env.NEW_WEBSITE,
      description: process.env.NEW_DESCRIPTION,
      socialLinks: process.env.NEW_SOCIAL_LINKS
    };
    
    await updateBranding(contractAddress, newBranding);
  } else if (action === "generate") {
    // Generate metadata JSON
    const info = await getBranding(contractAddress);
    const metadata = generateMetadataJSON(info.branding, {
      name: info.name,
      symbol: info.symbol,
      decimals: 18,
      totalSupply: info.totalSupply
    });
    
    console.log("\n--- Generated Metadata JSON ---");
    console.log(metadata);
    console.log("\n💾 Save this to a file and upload to IPFS for token metadata.");
  } else {
    console.error("❌ Unknown action:", action);
    console.log("\nAvailable actions: get, update, generate");
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

// Export functions for use in other scripts
export { updateBranding, getBranding, generateMetadataJSON };
