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
  const poolId = requireBytes32(getCriticalEnv("POOL_ID"), `${networkKey}_POOL_ID or POOL_ID`);
  const peerEid = Number(getCriticalEnv("PEER_EID"));
  if (!Number.isInteger(peerEid) || peerEid <= 0) {
    throw new Error(`Invalid ${networkKey}_PEER_EID or PEER_EID`);
  }

  const feeBufferBps = Number(process.env.SYNC_FEE_BUFFER_BPS || "12000");
  if (!Number.isInteger(feeBufferBps) || feeBufferBps < 10000) {
    throw new Error(`Invalid SYNC_FEE_BUFFER_BPS: ${feeBufferBps}`);
  }

  const poolManager = await ethers.getContractAt("ONBTPoolManager", poolManagerAddress);
  const quoted = await poolManager.quoteCrossChainSync(poolId, peerEid);
  const nativeFee = quoted.nativeFee;
  const bufferedFee = nativeFee.mul(feeBufferBps).div(10000);

  console.log(`Syncing pool on ${network.name}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`PoolManager: ${poolManagerAddress}`);
  console.log(`PoolId: ${poolId}`);
  console.log(`Peer EID: ${peerEid}`);
  console.log(`Quoted native fee: ${nativeFee.toString()}`);
  console.log(`Buffered native fee (${feeBufferBps} bps): ${bufferedFee.toString()}`);

  const tx = await poolManager.syncPoolToPeer(poolId, peerEid, { value: bufferedFee });
  console.log(`syncPoolToPeer tx: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`Confirmed in block: ${receipt.blockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
