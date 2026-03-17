import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const endpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";
  
  console.log("Checking LayerZero endpoint:", endpoint);
  
  const code = await ethers.provider.getCode(endpoint);
  
  if (code === "0x" || code === "0x0") {
    console.log("❌ Endpoint NOT deployed (no code at address)");
  } else {
    console.log("✅ Endpoint deployed");
    console.log("   Code size:", code.length, "bytes");
  }
}

main().catch(console.error);
