require("dotenv/config");
const hre = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requireAddress(value, name) {
  if (!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

function parseOptionalBytes32(value, name) {
  if (!value) return null;
  if (!/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(`Invalid ${name}: must be bytes32`);
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

  const peerEid = Number(getCriticalEnv("PEER_EID"));
  if (!Number.isInteger(peerEid) || peerEid <= 0) {
    throw new Error(`Invalid ${networkKey}_PEER_EID or PEER_EID`);
  }

  const peerPoolManager = requireAddress(
    getCriticalEnv("PEER_POOL_MANAGER"),
    `${networkKey}_PEER_POOL_MANAGER or PEER_POOL_MANAGER`
  );

  const poolId = parseOptionalBytes32(getEnv("POOL_ID"), `${networkKey}_POOL_ID or POOL_ID`);

  console.log(`Configuring ONBTPoolManager peers on ${network.name}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`PoolManager: ${poolManagerAddress}`);
  console.log(`Peer EID: ${peerEid}`);
  console.log(`Peer Manager: ${peerPoolManager}`);

  const poolManager = await ethers.getContractAt("ONBTPoolManager", poolManagerAddress);

  const peerBytes32 = ethers.utils.hexZeroPad(peerPoolManager, 32);
  const currentPeer = await poolManager.peers(peerEid);

  if (currentPeer.toLowerCase() === peerBytes32.toLowerCase()) {
    console.log("setPeer already configured");
  } else {
    const tx = await poolManager.setPeer(peerEid, peerBytes32);
    console.log(`setPeer tx: ${tx.hash}`);
    await tx.wait();

    const updatedPeer = await poolManager.peers(peerEid);
    if (updatedPeer.toLowerCase() !== peerBytes32.toLowerCase()) {
      throw new Error("setPeer verification failed");
    }
    console.log("setPeer configured successfully");
  }

  if (poolId) {
    const existingPeerPool = await poolManager.crossChainPeers(poolId, peerEid);
    if (existingPeerPool.toLowerCase() === peerPoolManager.toLowerCase()) {
      console.log(`registerCrossChainPool already configured for pool ${poolId}`);
    } else {
      const tx2 = await poolManager.registerCrossChainPool(poolId, peerEid, peerPoolManager);
      console.log(`registerCrossChainPool tx: ${tx2.hash}`);
      await tx2.wait();

      let verified = false;
      for (let i = 0; i < 5; i += 1) {
        const updatedPeerPool = await poolManager.crossChainPeers(poolId, peerEid);
        if (updatedPeerPool.toLowerCase() === peerPoolManager.toLowerCase()) {
          verified = true;
          break;
        }
        await sleep(3000);
      }

      if (!verified) {
        throw new Error("registerCrossChainPool verification failed");
      }
      console.log(`registerCrossChainPool configured for pool ${poolId}`);
    }
  } else {
    console.log("No POOL_ID provided; skipped registerCrossChainPool");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
