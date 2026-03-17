import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { ethers } = hre;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findLatestDeployment(networkName) {
  const deployDir = path.join(__dirname, "..", "deploy");
  const files = fs.readdirSync(deployDir);
  const deploymentFiles = files
    .filter(f => f.startsWith("deployment-lzv2-") && f.includes(networkName) && f.endsWith(".json"))
    .sort()
    .reverse();

  if (deploymentFiles.length === 0) {
    throw new Error(`No deployment files found for ${networkName}`);
  }

  const latestFile = path.join(deployDir, deploymentFiles[0]);
  return JSON.parse(fs.readFileSync(latestFile, "utf8"));
}

async function checkBalances() {
  const [signer] = await ethers.getSigners();
  
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 ONBT Balance Check");
  console.log(`${"=".repeat(60)}\n`);
  console.log(`Address: ${signer.address}\n`);

  // Load ABI
  const artifactPath = path.join(process.cwd(), "artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  const networkName = chainId === 8453 ? "base" : chainId === 42161 ? "arbitrum" : null;
  if (!networkName) {
    console.log(`❌ Unsupported chain ${chainId}`);
    return;
  }

  const deployment = findLatestDeployment(networkName);
  const contractAddress = deployment.contracts.onbtToken;

  const oft = new ethers.Contract(contractAddress, artifact.abi, signer);
  
  const balance = await oft.balanceOf(signer.address);
  const totalSupply = await oft.totalSupply();
  
  const chainName = chainId === 8453 ? "Base" : chainId === 42161 ? "Arbitrum" : `Chain ${chainId}`;
  
  console.log(`Chain: ${chainName}`);
  console.log(`Contract: ${contractAddress}`);
  console.log(`Balance: ${ethers.utils.formatEther(balance)} ONBT`);
  console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)} ONBT`);
  console.log(`\n${"=".repeat(60)}\n`);
}

checkBalances()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Check failed:", error);
    process.exit(1);
  });
