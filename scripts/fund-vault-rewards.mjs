import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-1771466159957.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-1771466361444.json",
};

const DEFAULTS = {
  vault: "10000000",
  rewards: "1000000",
};

const parseUnits = (value, decimals) =>
  ethers.parseUnits ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals);
const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);

const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
];

function readJson(relativePath) {
  const fullPath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const vaultAmount = process.env.VAULT_AMOUNT || DEFAULTS.vault;
  const rewardsAmount = process.env.REWARDS_AMOUNT || DEFAULTS.rewards;

  const onbtToken = deployment.contracts.onbtToken;
  const vault = deployment.contracts.vault;
  const rewardsPool = deployment.contracts.rewardsPool;

  if (!onbtToken || !vault || !rewardsPool) {
    throw new Error("Missing onbtToken, vault, or rewardsPool in deployment file");
  }

  console.log(`\nFunding on ${networkKey.toUpperCase()} (chainId ${chainId})`);
  console.log(`Signer: ${signer.address}`);
  console.log(`ONBT: ${onbtToken}`);
  console.log(`Vault: ${vault}`);
  console.log(`RewardsPool: ${rewardsPool}`);
  console.log(`Vault amount: ${vaultAmount} ONBT`);
  console.log(`Rewards amount: ${rewardsAmount} ONBT\n`);

  const token = new ethers.Contract(onbtToken, ERC20_ABI, signer);

  const balance = await token.balanceOf(signer.address);
  const totalAmount = parseUnits(vaultAmount, 18).add
    ? parseUnits(vaultAmount, 18).add(parseUnits(rewardsAmount, 18))
    : parseUnits(vaultAmount, 18) + parseUnits(rewardsAmount, 18);

  console.log(`Signer balance: ${formatUnits(balance, 18)} ONBT`);

  const hasEnough = typeof balance === "bigint"
    ? balance >= totalAmount
    : balance.gte(totalAmount);

  if (!hasEnough) {
    console.log("\n❌ Insufficient balance for requested funding.");
    console.log("Set VAULT_AMOUNT and REWARDS_AMOUNT env vars to smaller values.");
    return;
  }

  console.log("\nSending to Vault...");
  const txVault = await token.transfer(vault, parseUnits(vaultAmount, 18));
  console.log(`Tx: ${txVault.hash}`);
  await txVault.wait();
  console.log("✅ Vault funded");

  console.log("\nSending to RewardsPool...");
  const txRewards = await token.transfer(rewardsPool, parseUnits(rewardsAmount, 18));
  console.log(`Tx: ${txRewards.hash}`);
  await txRewards.wait();
  console.log("✅ RewardsPool funded\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Funding failed:", error);
  process.exit(1);
});
