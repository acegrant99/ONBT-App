import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);

const ABI = [
  "function totalSupply() external view returns (uint256)",
  "function getRegisteredChains() external view returns (uint32[])",
  "function getTokenDistribution() external view returns (uint32[] chains, uint256[] supplies, uint256 localSupply)",
  "function getRemoteChainSupply(uint32 eid) external view returns (uint256)",
  "function remoteChainSupply(uint32 eid) external view returns (uint256)",
  "function registeredChains(uint256 index) external view returns (uint32)",
  "function isChainRegistered(uint32 eid) external view returns (bool)"
];

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

  const onbtToken = deployment.contracts.onbtToken;
  const peerEid = deployment.layerZero.peerEid;

  console.log(`\nSupply tracking on ${networkKey.toUpperCase()} (chainId ${chainId})`);
  console.log(`OFT: ${onbtToken}`);
  console.log(`Peer EID: ${peerEid}\n`);

  const oft = new ethers.Contract(onbtToken, ABI, ethers.provider);

  const totalSupply = await oft.totalSupply();
  console.log(`Total supply: ${formatUnits(totalSupply, 18)} ONBT`);

  try {
    const chains = await oft.getRegisteredChains();
    console.log(`Registered chains: ${chains.length ? chains.join(", ") : "(none)"}`);
  } catch (error) {
    console.log("Registered chains: unavailable (tracking module not exposed)");
  }

  try {
    const remoteSupply = await oft.getRemoteChainSupply(peerEid);
    console.log(`Remote chain supply (getRemoteChainSupply): ${formatUnits(remoteSupply, 18)} ONBT`);
  } catch (error) {
    try {
      const remoteSupply = await oft.remoteChainSupply(peerEid);
      console.log(`Remote chain supply (remoteChainSupply): ${formatUnits(remoteSupply, 18)} ONBT`);
    } catch (inner) {
      console.log("Remote chain supply: unavailable");
    }
  }

  try {
    const [chains, supplies, localSupply] = await oft.getTokenDistribution();
    console.log(`Token distribution:`);
    console.log(`  Local supply: ${formatUnits(localSupply, 18)} ONBT`);
    for (let i = 0; i < chains.length; i++) {
      console.log(`  Chain ${chains[i]}: ${formatUnits(supplies[i], 18)} ONBT`);
    }
  } catch (error) {
    console.log("Token distribution: unavailable");
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Supply tracking check failed:", error);
  process.exit(1);
});
