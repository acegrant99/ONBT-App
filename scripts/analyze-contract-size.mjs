import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  console.log("\n=== Contract Size Analysis ===\n");
  
  // Read artifact
  const artifactPath = "artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json";
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  
  const bytecodeSize = (artifact.bytecode.length - 2) / 2; // Remove 0x and divide by 2
  const deployedSize = (artifact.deployedBytecode.length - 2) / 2;
  
  console.log("Contract: OmnichainNabatOFT");
  console.log("Bytecode Size:", bytecodeSize, "bytes");
  console.log("Deployed Size:", deployedSize, "bytes");
  console.log("Max Allowed:", 24576, "bytes (24 KB)");
  
  if (deployedSize > 24576) {
    console.log("\n❌ CONTRACT TOO LARGE!");
    console.log("   Exceeds Ethereum contract size limit");
    console.log("   Need to reduce by:", deployedSize - 24576, "bytes");
  } else {
    console.log("\n✅ Size OK:", (24576 - deployedSize), "bytes remaining");
  }
  
  // Test constructor locally
  console.log("\n=== Testing Constructor Locally ===\n");
  
  try {
    const OFT = await ethers.getContractFactory("OmnichainNabatOFT");
    
    const socialLinks = {
      twitter: "https://twitter.com/nabatfinance",
      telegram: "https://t.me/nabatfinance",
      discord: "https://discord.gg/nabatfinance",
      github: "https://github.com/acegrant99/ONBT-App",
      medium: "https://medium.com/@nabatfinance"
    };
    
    // Try to estimate gas
    const deployTx = await OFT.getDeployTransaction(
      "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
      "0x44497B9FF645A995b18967b34eFeFDe82AeC8144",
      ethers.parseEther("1000000000"),
      "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
      "https://nabat.finance",
      "Description",
      JSON.stringify(socialLinks)
    );
    
    console.log("✅ Constructor parameters valid");
    console.log("Deploy data length:", deployTx.data.length / 2, "bytes");
    
  } catch (error) {
    console.log("❌ Constructor error:", error.message);
  }
}

main().catch(console.error);
