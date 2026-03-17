import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENT = "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json";

const parseUnits = (value, decimals) =>
  ethers.parseUnits ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals);
const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  if (chainId !== 8453) {
    throw new Error("Run this on Base (chainId 8453)");
  }

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENT;
  const deployment = readJson(deploymentPath);

  if (deployment.chainId !== 8453) {
    throw new Error("Deployment file is not for Base. Set DEPLOYMENT_FILE to the Base deployment.");
  }

  const onbtToken = deployment.contracts.onbtToken;
  const vault = deployment.contracts.vault;
  const rewardsPool = deployment.contracts.rewardsPool;

  const vaultAmount = process.env.VAULT_REFUND || "10000000";
  const rewardsAmount = process.env.REWARDS_REFUND || "1000000";

  const tokenAbi = [
    "function balanceOf(address account) external view returns (uint256)"
  ];
  const vaultAbi = [
    "function withdraw(address token, uint256 amount, address recipient) external",
    "function tokenBalances(address token) external view returns (uint256)"
  ];
  const rewardsAbi = [
    "function emergencyWithdraw(address token, uint256 amount) external"
  ];

  const token = new ethers.Contract(onbtToken, tokenAbi, ethers.provider);
  const vaultContract = new ethers.Contract(vault, vaultAbi, signer);
  const rewardsContract = new ethers.Contract(rewardsPool, rewardsAbi, signer);

  console.log(`\nNormalizing Base funding`);
  console.log(`Deployment file: ${deploymentPath}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Vault: ${vault}`);
  console.log(`RewardsPool: ${rewardsPool}`);
  console.log(`Refund to: ${signer.address}`);
  console.log(`Vault refund: ${vaultAmount} ONBT`);
  console.log(`Rewards refund: ${rewardsAmount} ONBT\n`);

  const [vaultBalance, rewardsBalance] = await Promise.all([
    token.balanceOf(vault),
    token.balanceOf(rewardsPool)
  ]);

  console.log(`Vault balance: ${formatUnits(vaultBalance, 18)} ONBT`);
  console.log(`RewardsPool balance: ${formatUnits(rewardsBalance, 18)} ONBT\n`);

  const vaultRefund = parseUnits(vaultAmount, 18);
  const rewardsRefund = parseUnits(rewardsAmount, 18);

  const vaultTracked = await vaultContract.tokenBalances(onbtToken);
  console.log(`Vault tracked balance: ${formatUnits(vaultTracked, 18)} ONBT`);

  if ((typeof vaultTracked === "bigint" && vaultTracked >= vaultRefund) ||
      (vaultTracked.gte && vaultTracked.gte(vaultRefund))) {
    console.log("Withdrawing from Vault...");
    const txVault = await vaultContract.withdraw(onbtToken, vaultRefund, signer.address);
    console.log(`Tx: ${txVault.hash}`);
    await txVault.wait();
    console.log("✅ Vault refund complete");
  } else {
    console.log("⚠️  Vault tracked balance is lower than requested refund. Skipping vault withdrawal.");
  }

  console.log("\nWithdrawing from RewardsPool...");
  const txRewards = await rewardsContract.emergencyWithdraw(onbtToken, rewardsRefund);
  console.log(`Tx: ${txRewards.hash}`);
  await txRewards.wait();
  console.log("✅ RewardsPool refund complete\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Normalize failed:", error);
  process.exit(1);
});
