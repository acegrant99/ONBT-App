import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const zeroPadValue = (value, length) =>
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length);

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
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

  const yieldDistributor = deployment.contracts.yieldDistributor;
  const peerEid = deployment.layerZero.peerEid;

  console.log(`\nYield Distributor Peer Check on ${networkKey.toUpperCase()}`);
  console.log(`YieldDistributor: ${yieldDistributor}`);
  console.log(`Peer EID: ${peerEid}\n`);

  const yd = await ethers.getContractAt("ONBTYieldDistributor", yieldDistributor);

  const peer = await yd.peers(peerEid);
  const peerSet = peer.toLowerCase() !== zeroPadValue("0x0000000000000000000000000000000000000000", 32).toLowerCase();

  console.log(`Peer for EID ${peerEid}: ${peer}`);
  console.log(`Peer is set: ${peerSet}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Peer check failed:", error);
  process.exit(1);
});
