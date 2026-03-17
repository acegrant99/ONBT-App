require("dotenv/config");
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

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
  const [deployer] = await ethers.getSigners();

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

  const cfg = {
    lzEndpoint: requireAddress(getCriticalEnv("LZ_ENDPOINT"), `${networkKey}_LZ_ENDPOINT or LZ_ENDPOINT`),
    swapRouter: requireAddress(getCriticalEnv("UNISWAP_V3_SWAP_ROUTER"), `${networkKey}_UNISWAP_V3_SWAP_ROUTER or UNISWAP_V3_SWAP_ROUTER`),
    nftPositionManager: requireAddress(getCriticalEnv("UNISWAP_V3_POSITION_MANAGER"), `${networkKey}_UNISWAP_V3_POSITION_MANAGER or UNISWAP_V3_POSITION_MANAGER`),
    onbtToken: requireAddress(getCriticalEnv("ONBT_TOKEN"), `${networkKey}_ONBT_TOKEN or ONBT_TOKEN`),
    feeCollector: requireAddress(getCriticalEnv("FEE_COLLECTOR", deployer.address), `${networkKey}_FEE_COLLECTOR or FEE_COLLECTOR`),
    rewardsCollector: requireAddress(getCriticalEnv("REWARDS_COLLECTOR", getCriticalEnv("FEE_COLLECTOR", deployer.address)), `${networkKey}_REWARDS_COLLECTOR or REWARDS_COLLECTOR`),
    rewardsBps: Number(getEnv("REWARDS_BPS", "7000")),
  };

  if (!Number.isInteger(cfg.rewardsBps) || cfg.rewardsBps < 0 || cfg.rewardsBps > 10000) {
    throw new Error(`Invalid REWARDS_BPS: ${cfg.rewardsBps}`);
  }

  console.log(`Deploying ONBTPoolManager to ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);

  const Factory = await ethers.getContractFactory("ONBTPoolManager");
  const poolManager = await Factory.deploy(
    cfg.lzEndpoint,
    cfg.swapRouter,
    cfg.nftPositionManager,
    cfg.onbtToken,
    cfg.feeCollector,
    cfg.rewardsCollector,
    cfg.rewardsBps
  );
  await poolManager.deployed();

  console.log(`ONBTPoolManager: ${poolManager.address}`);

  const poolId = parseOptionalBytes32(getEnv("POOL_ID"), `${networkKey}_POOL_ID or POOL_ID`);
  const token0 = getEnv("POOL_TOKEN0");
  const token1 = getEnv("POOL_TOKEN1");
  const fee = getEnv("POOL_FEE") ? Number(getEnv("POOL_FEE")) : 3000;
  const chainEid = getEnv("POOL_CHAIN_EID") ? Number(getEnv("POOL_CHAIN_EID")) : 0;
  const allocation = getEnv("POOL_ALLOCATION", "0");

  if (poolId && token0 && token1 && chainEid > 0 && allocation !== "0") {
    console.log("Registering initial pool...");
    const tx = await poolManager.registerPool(
      poolId,
      requireAddress(token0, "POOL_TOKEN0"),
      requireAddress(token1, "POOL_TOKEN1"),
      fee,
      chainEid,
      ethers.BigNumber.from(allocation)
    );
    await tx.wait();
    console.log(`Pool registered: ${poolId}`);

    const poolFund = getEnv("POOL_FUND", "0");
    if (poolFund !== "0") {
      const approveTx = await (await ethers.getContractAt("IERC20", cfg.onbtToken)).approve(
        poolManager.address,
        ethers.BigNumber.from(poolFund)
      );
      await approveTx.wait();

      const fundTx = await poolManager.depositLiquidity(poolId, ethers.BigNumber.from(poolFund));
      await fundTx.wait();
      console.log(`Pool funded: ${poolFund}`);
    }

    const peerEid = getEnv("PEER_EID");
    const peerPoolManager = getEnv("PEER_POOL_MANAGER");
    if (peerEid && peerPoolManager) {
      const peerTx = await poolManager.registerCrossChainPool(
        poolId,
        Number(peerEid),
        requireAddress(peerPoolManager, `${networkKey}_PEER_POOL_MANAGER or PEER_POOL_MANAGER`)
      );
      await peerTx.wait();
      console.log(`Peer registered for EID ${peerEid}`);
    }
  }

  const out = {
    network: network.name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      ONBTPoolManager: poolManager.address,
    },
    config: cfg,
  };

  const file = path.join(__dirname, `../deployment-v3-pools-${network.name}-${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log(`Deployment artifact: ${file}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
