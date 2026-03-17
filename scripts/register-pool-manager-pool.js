require("dotenv/config");
const hre = require("hardhat");

function requireAddress(value, name) {
  if (!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

function requireBytes32(value, name) {
  if (!value || !/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

async function main() {
  const { ethers, network } = hre;
  const [signer] = await ethers.getSigners();

  const networkKey = network.name.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  const strictNetworkEnv = (process.env.STRICT_NETWORK_ENV || "true").toLowerCase() !== "false";

  const getEnv = (key, fallback) => process.env[`${networkKey}_${key}`] || process.env[key] || fallback;
  const getCriticalEnv = (key, fallback) => {
    const networkScoped = process.env[`${networkKey}_${key}`];
    if (strictNetworkEnv && !networkScoped) {
      throw new Error(`Missing required env: ${networkKey}_${key} (STRICT_NETWORK_ENV=true)`);
    }
    return networkScoped || process.env[key] || fallback;
  };

  const poolManagerAddress = requireAddress(
    getCriticalEnv("POOL_MANAGER_ADDRESS"),
    `${networkKey}_POOL_MANAGER_ADDRESS or POOL_MANAGER_ADDRESS`
  );
  const poolId = requireBytes32(getCriticalEnv("POOL_ID"), `${networkKey}_POOL_ID or POOL_ID`);
  const token0 = requireAddress(getCriticalEnv("POOL_TOKEN0"), `${networkKey}_POOL_TOKEN0 or POOL_TOKEN0`);
  const token1 = requireAddress(getCriticalEnv("POOL_TOKEN1"), `${networkKey}_POOL_TOKEN1 or POOL_TOKEN1`);
  const fee = Number(getCriticalEnv("POOL_FEE", "3000"));
  const chainEid = Number(getCriticalEnv("POOL_CHAIN_EID"));
  const allocation = ethers.BigNumber.from(getCriticalEnv("POOL_ALLOCATION", "1"));

  if (!Number.isInteger(fee) || fee <= 0) throw new Error(`Invalid fee: ${fee}`);
  if (!Number.isInteger(chainEid) || chainEid <= 0) throw new Error(`Invalid chain eid: ${chainEid}`);
  if (allocation.lte(0)) throw new Error("POOL_ALLOCATION must be > 0");

  console.log(`Registering pool on ${network.name}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`PoolManager: ${poolManagerAddress}`);
  console.log(`PoolId: ${poolId}`);

  const poolManager = await ethers.getContractAt("ONBTPoolManager", poolManagerAddress);
  const existing = await poolManager.poolInfos(poolId);

  if (existing.isActive) {
    console.log("Pool already registered; skipping");
    return;
  }

  const tx = await poolManager.registerPool(poolId, token0, token1, fee, chainEid, allocation);
  console.log(`registerPool tx: ${tx.hash}`);
  await tx.wait();

  const created = await poolManager.poolInfos(poolId);
  if (!created.isActive) {
    throw new Error("Pool registration verification failed");
  }

  console.log("Pool registered successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
