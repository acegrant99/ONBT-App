import hre from "hardhat";
import chalk from "chalk";

const { ethers } = hre;

const OFT_ADDRESS_ARBITRUM = "0x42bB5FD891c070A64d31752855E94A01edDd766E";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`Network: ${network.name} (Chain ${network.chainId})\n`);

  // Try different approach - check raw contract code and state
  const code = await ethers.provider.getCode(OFT_ADDRESS_ARBITRUM);
  console.log(`Contract has code: ${code !== "0x"}`);
  console.log(`Contract size: ${code.length / 2} bytes\n`);

  // Storage check skipped
  console.log("");

  // Try to call a basic function that should always work
  const BASIC_ABI = [
    "function name() external view returns (string)",
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)",
    "function totalSupply() external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function endpoint() external view returns (address)",
  ];

  const oft = new ethers.Contract(OFT_ADDRESS_ARBITRUM, BASIC_ABI, ethers.provider);

  try {
    const name = await oft.name();
    console.log(chalk.green(`✓ Name: ${name}`));
  } catch (e) {
    console.log(chalk.red(`✗ Name: ${e.message}`));
  }

  try {
    const symbol = await oft.symbol();
    console.log(chalk.green(`✓ Symbol: ${symbol}`));
  } catch (e) {
    console.log(chalk.red(`✗ Symbol: ${e.message}`));
  }

  try {
    const decimals = await oft.decimals();
    console.log(chalk.green(`✓ Decimals: ${decimals}`));
  } catch (e) {
    console.log(chalk.red(`✗ Decimals: ${e.message}`));
  }

  try {
    const supply = await oft.totalSupply();
    console.log(chalk.green(`✓ Total Supply: ${ethers.formatUnits(supply, 18)}`));
  } catch (e) {
    console.log(chalk.red(`✗ Total Supply: ${e.message}`));
  }

  try {
    const endpoint = await oft.endpoint();
    console.log(chalk.green(`✓ Endpoint: ${endpoint}`));
  } catch (e) {
    console.log(chalk.red(`✗ Endpoint: ${e.message}`));
  }

  try {
    const balance = await oft.balanceOf("0x44497B9FF645A995b18967b34eFeFDe82AeC8144");
    console.log(chalk.green(`✓ Owner Balance: ${ethers.formatUnits(balance, 18)}`));
  } catch (e) {
    console.log(chalk.red(`✗ Owner Balance: ${e.message}`));
  }
}

main().catch(console.error);
