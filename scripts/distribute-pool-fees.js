require("dotenv/config");
const hre = require("hardhat");

function requireAddress(value, name) {
  if (!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

async function main() {
  const { ethers, network } = hre;
  const targetNetwork = (process.env.TARGET_NETWORK || "").trim().toLowerCase();
  if (targetNetwork && network.name.toLowerCase() !== targetNetwork) {
    throw new Error(
      `TARGET_NETWORK mismatch: script running on "${network.name}", but TARGET_NETWORK is "${targetNetwork}"`
    );
  }

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

  const feeToken = requireAddress(
    getCriticalEnv("FEE_DISTRIBUTION_TOKEN", getCriticalEnv("ONBT_TOKEN")),
    `${networkKey}_FEE_DISTRIBUTION_TOKEN or FEE_DISTRIBUTION_TOKEN`
  );

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${network.name}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`PoolManager: ${poolManagerAddress}`);
  console.log(`Fee token: ${feeToken}`);

  const poolManager = await ethers.getContractAt("ONBTPoolManager", poolManagerAddress);

  const tx = await poolManager.distributeFees(feeToken);
  console.log(`Submitted tx: ${tx.hash}`);
  const receipt = await tx.wait();

  console.log(`Confirmed in block ${receipt.blockNumber}`);
  console.log("Fees distributed successfully");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
