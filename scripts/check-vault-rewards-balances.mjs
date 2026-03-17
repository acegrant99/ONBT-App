import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-1771466159957.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-1771466361444.json",
};

const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);

const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
];

function readJson(relativePath) {
  const fullPath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const onbtToken = deployment.contracts.onbtToken;
  const vault = deployment.contracts.vault;
  const rewardsPool = deployment.contracts.rewardsPool;

  if (!onbtToken || !vault || !rewardsPool) {
    throw new Error("Missing onbtToken, vault, or rewardsPool in deployment file");
  }

  const token = new ethers.Contract(onbtToken, ERC20_ABI, ethers.provider);

  const [vaultBal, rewardsBal] = await Promise.all([
    token.balanceOf(vault),
    token.balanceOf(rewardsPool),
  ]);

  console.log(`\n${networkKey.toUpperCase()} balances:`);
  console.log(`Vault: ${vault} -> ${formatUnits(vaultBal, 18)} ONBT`);
  console.log(`RewardsPool: ${rewardsPool} -> ${formatUnits(rewardsBal, 18)} ONBT\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Balance check failed:", error);
  process.exit(1);
});
