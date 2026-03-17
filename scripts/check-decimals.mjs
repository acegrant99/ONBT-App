import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";

async function main() {
  const oft = await ethers.getContractAt([
   "function sharedDecimals() view returns (uint8)",
    "function decimals() view returns (uint8)",
    "function decimalConversionRate() view returns (uint256)"
  ], BASE_CONTRACT);
  
  console.log("\n📊 OFT Decimal Configuration\n");
  
  const sharedDecimals = await oft.sharedDecimals();
  const decimals = await oft.decimals();
  const conversionRate = await oft.decimalConversionRate();
  
  console.log("Decimals:", decimals);
  console.log("Shared Decimals:", sharedDecimals);
  console.log("Conversion Rate:", conversionRate.toString());
  
  console.log("\nThis means:");
  console.log("- Local amount: 1000000000000000000 (1 ONBT)");
  console.log("- Converted to SD: 1000000 (after dividing by", conversionRate.toString() + ")");
  console.log("- Back to LD: 1000000000000000000\n"); 
}

main().catch(console.error);
