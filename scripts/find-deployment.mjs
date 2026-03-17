import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const deployer = "0x44497B9FF645A995b18967b34eFeFDe82AeC8144";
  const network = await ethers.provider.getNetwork();
  
  console.log("🔍 Checking for recent ONBT deployments\n");
  console.log("Deployer:", deployer);
  console.log("Network:", network.name, "\n");
  
  // Check known contract addresses
  const knownAddresses = [
    "0xD1669D6801D5883999BD0544D9e1b8722eA6F219",
    "0xA646B59c550E9BF646Fd8b6Cb63BfEC9f9674a9D"
  ];
  
  for (const addr of knownAddresses) {
    const code = await ethers.provider.getCode(addr);
    const isContract = code.length > 2;
    
    if (isContract) {
      try {
        const contract = await ethers.getContractAt("OmnichainNabatOFT", addr);
        const name = await contract.name();
        const supply = await contract.totalSupply();
        const owner = await contract.owner();
        
        console.log("✅ Found ONBT at:", addr);
        console.log("   Name:", name);
        console.log("   Supply:", ethers.formatEther(supply), "ONBT");
        console.log("   Owner:", owner);
        console.log("   Deployer match:", owner.toLowerCase() === deployer.toLowerCase() ? "YES" : "NO");
        console.log("");
      } catch (e) {
        console.log("❌", addr, "- Not an ONBT contract");
      }
    } else {
      console.log("⚠️ ", addr, "- No contract found");
    }
  }
  
  // Get latest transaction nonce
  const nonce = await ethers.provider.getTransactionCount(deployer);
  console.log("\n📊 Latest Nonce:", nonce);
  
  // Try to get the last successful transaction
  const lastBlock = await ethers.provider.getBlockNumber();
  console.log("📦 Latest Block:", lastBlock);
}

main().catch(console.error);
