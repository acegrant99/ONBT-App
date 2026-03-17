require("dotenv/config");
const { ethers } = require("ethers");

function requireEnv(value, name) {
  if (!value || String(value).trim() === "") {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

function requireAddress(value, name) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(value || "")) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

function requireBytes32(value, name) {
  if (!/^0x[a-fA-F0-9]{64}$/.test(value || "")) {
    throw new Error(`Invalid ${name}: ${value || "<empty>"}`);
  }
  return value;
}

async function fetchLogsChunked(provider, filterBase, fromBlock, toBlock, step = 10) {
  const all = [];
  for (let start = fromBlock; start <= toBlock; start += step) {
    const end = Math.min(toBlock, start + step - 1);
    const logs = await provider.getLogs({ ...filterBase, fromBlock: start, toBlock: end });
    all.push(...logs);
  }
  return all;
}

async function inspectNetwork(name, rpcUrl, poolManagerAddress, poolId, lookbackBlocks) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const latest = await provider.getBlockNumber();
  const fromBlock = Math.max(0, latest - lookbackBlocks);

  const abi = [
    "event CrossChainSyncInitiated(bytes32 indexed poolId, uint32 dstEid, uint256 fee)",
    "event CrossChainSyncReceived(bytes32 indexed poolId, uint32 srcEid, uint256 liquidity, uint256 volume)",
  ];
  const iface = new ethers.utils.Interface(abi);

  const initiatedTopic = iface.getEventTopic("CrossChainSyncInitiated");
  const receivedTopic = iface.getEventTopic("CrossChainSyncReceived");

  const initiatedLogs = await fetchLogsChunked(
    provider,
    { address: poolManagerAddress, topics: [initiatedTopic, poolId] },
    fromBlock,
    latest
  );

  const receivedLogs = await fetchLogsChunked(
    provider,
    { address: poolManagerAddress, topics: [receivedTopic, poolId] },
    fromBlock,
    latest
  );

  console.log(`\n=== ${name.toUpperCase()} ===`);
  console.log(`Manager: ${poolManagerAddress}`);
  console.log(`Range: ${fromBlock} -> ${latest}`);
  console.log(`Initiated count: ${initiatedLogs.length}`);
  console.log(`Received count: ${receivedLogs.length}`);

  const initiatedDecoded = initiatedLogs
    .map((log) => ({ log, parsed: iface.parseLog(log) }))
    .slice(-3);

  const receivedDecoded = receivedLogs
    .map((log) => ({ log, parsed: iface.parseLog(log) }))
    .slice(-3);

  if (initiatedDecoded.length > 0) {
    console.log("Recent Initiated:");
    for (const item of initiatedDecoded) {
      console.log(
        `  block=${item.log.blockNumber} tx=${item.log.transactionHash} dstEid=${item.parsed.args.dstEid.toString()} fee=${item.parsed.args.fee.toString()}`
      );
    }
  }

  if (receivedDecoded.length > 0) {
    console.log("Recent Received:");
    for (const item of receivedDecoded) {
      console.log(
        `  block=${item.log.blockNumber} tx=${item.log.transactionHash} srcEid=${item.parsed.args.srcEid.toString()} liquidity=${item.parsed.args.liquidity.toString()} volume=${item.parsed.args.volume.toString()}`
      );
    }
  }
}

async function main() {
  const lookbackBlocks = Number(process.env.SYNC_STATUS_LOOKBACK_BLOCKS || "5000");

  const poolId = requireBytes32(
    process.env.BASE_POOL_ID || process.env.POOL_ID,
    "BASE_POOL_ID or POOL_ID"
  );

  const baseRpc = requireEnv(process.env.BASE_RPC_URL, "BASE_RPC_URL");
  const arbitrumRpc = requireEnv(process.env.ARBITRUM_RPC_URL, "ARBITRUM_RPC_URL");

  const baseManager = requireAddress(process.env.BASE_POOL_MANAGER_ADDRESS, "BASE_POOL_MANAGER_ADDRESS");
  const arbitrumManager = requireAddress(
    process.env.ARBITRUM_POOL_MANAGER_ADDRESS,
    "ARBITRUM_POOL_MANAGER_ADDRESS"
  );

  console.log("Checking ONBTPoolManager sync status");
  console.log(`PoolId: ${poolId}`);

  await inspectNetwork("base", baseRpc, baseManager, poolId, lookbackBlocks);
  await inspectNetwork("arbitrum", arbitrumRpc, arbitrumManager, poolId, lookbackBlocks);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
