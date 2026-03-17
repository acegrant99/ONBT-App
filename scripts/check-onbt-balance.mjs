import hre from "hardhat";
const { ethers, network } = hre;

const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

async function main() {
  const isBase = network.name === "base";
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const [deployer] = await ethers.getSigners();
  
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);
  const balance = await onbt.balanceOf(deployer.address);
  
  console.log(`\n${network.name.toUpperCase()}`);
  console.log(`Address: ${deployer.address}`);
  console.log(`ONBT Balance: ${ethers.utils.formatEther(balance)} ONBT\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
