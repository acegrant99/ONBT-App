import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  const network = await ethers.provider.getNetwork();
  
  console.log("Wallet:", deployer.address);
  console.log("Network:", network.name);
  console.log("ETH Balance:", ethers.formatEther(balance), "ETH");
  console.log("Wei:", balance.toString());
  
  const minRequired = ethers.parseEther("0.005");
  if (balance < minRequired) {
    console.log("\n⚠️  WARNING: Balance too low for deployment!");
    console.log("   Need at least: 0.005 ETH");
    console.log("   Current: " + ethers.formatEther(balance) + " ETH");
  } else {
    console.log("\n✅ Sufficient balance for deployment");
  }
}

main();
