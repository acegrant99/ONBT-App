import hre from "hardhat";
const { ethers, network } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  
  console.log(`Network: ${network.name}`);
  console.log(`Address: ${deployer.address}`);
  console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
  console.log(`Wei: ${balance.toString()}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
