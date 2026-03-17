import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-1771466159957.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-1771466361444.json",
};

const formatEther = (value) =>
  ethers.formatEther ? ethers.formatEther(value) : ethers.utils.formatEther(value);
const solidityPacked = (types, values) =>
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values);
const getBytes = (value) =>
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value);

const buildLzReceiveOptions = (gas, value = 0n) => {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);
  const optionSize = getBytes(option).length + 1;
  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
};

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

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const stakingRouter = deployment.contracts.stakingRouter;
  const hubEid = deployment.layerZero.hubEid || 30184;

  if (!stakingRouter) {
    throw new Error("Missing stakingRouter in deployment file");
  }

  console.log(`\nSync StakingRouter on ${networkKey.toUpperCase()} (chainId ${chainId})`);
  console.log(`Signer: ${signer.address}`);
  console.log(`StakingRouter: ${stakingRouter}`);
  console.log(`Hub EID: ${hubEid}\n`);

  const router = await ethers.getContractAt("ONBTStakingRouter", stakingRouter, signer);

  // Build a payload with the same shape as _syncToHub
  const abiCoder = ethers.AbiCoder ? ethers.AbiCoder.defaultAbiCoder() : ethers.utils.defaultAbiCoder;
  const payload = abiCoder.encode(
    ["uint16", "uint256", "uint256", "uint256"],
    [1, 0, 0, Math.floor(Date.now() / 1000)]
  );

  const gas = BigInt(process.env.LZ_GAS || "200000");
  const options = buildLzReceiveOptions(gas, 0n);
  const fee = await router.quote(hubEid, payload, options, false);
  console.log(`Estimated fee: ${formatEther(fee.nativeFee)} ETH`);

  console.log("\nCalling syncToHub...");
  const tx = await router.syncToHub({ value: fee.nativeFee });
  console.log(`Tx: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`✅ syncToHub confirmed in block ${receipt.blockNumber}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ syncToHub failed:", error);
  process.exit(1);
});
