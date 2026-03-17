import hre from "hardhat";
const { ethers, network } = hre;

const BASE_GOVERNOR = "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9";
const ARBITRUM_GOVERNOR = "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854";

async function main() {
  const isBase = network.name === "base";
  const governorAddress = isBase ? BASE_GOVERNOR : ARBITRUM_GOVERNOR;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n${networkName} ONBTGovernor: ${governorAddress}`);
  
  const governor = await ethers.getContractAt("ONBTGovernor", governorAddress);
  
  try {
    const owner = await governor.owner();
    console.log(`Owner: ${owner}`);
  } catch (error) {
    console.log(`Error checking owner: ${error.message}`);
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
