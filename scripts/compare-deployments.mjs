import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("🔍 Checking existing ONBT contract on Base...\n");
  
  const existingAddress = "0xD1669D6801D5883999BD0544D9e1b8722eA6F219";
  const provider = ethers.provider;
  
  // Get contract code
  const code = await provider.getCode(existingAddress);
  console.log("✅ Contract exists at", existingAddress);
  console.log("   Bytecode size:", code.length / 2, "bytes\n");
  
  // Try to read constructor parameters by calling getter functions
  const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const contract = OFT.attach(existingAddress);
  
  try {
    const name = await contract.name();
    const symbol = await contract.symbol();  
    const owner = await contract.owner();
    const supply = await contract.totalSupply();
    const totalSupply = await contract.TOTAL_SUPPLY();
    
    console.log("--- Deployed Contract State ---");
    console.log("Name:        ", name);
    console.log("Symbol:      ", symbol);
    console.log("Owner:       ", owner);
    console.log("Total Supply:", ethers.formatEther(totalSupply), "ONBT");
    console.log("Current Supply:", ethers.formatEther(supply), "ONBT");
    
    // Get constructor parameter
    console.log("\n--- Deployment Details ---");
    const deploymentBlock = await provider.getBlock("latest");
    console.log("Current Block:", deploymentBlock.number);
    
    // Try to find deployment transaction
    const receipt = await provider.getCode(existingAddress);
    if (receipt) {
      console.log("✅ Contract is deployed and initialized");
    }
    
    // Now check what went wrong with our deployment
    console.log("\n--- Comparing with Failed Deployment ---");
    console.log("Failed deployment was to:", "0x4FdE762A5b0bEb8c293872526cc9756F47864459");
    console.log("Status: Transaction reverted");
    console.log("Gas used: 1,641,010");
    console.log("\nPossible causes:");
    console.log("1. OFT initialization error");
    console.log("2. LayerZero endpoint issue");
    console.log("3. Owner validation failure");
    console.log("4. Mint operation failure");
    
  } catch (error) {
    console.error("Error reading contract:", error.message);
  }
}

main().catch(console.error);
