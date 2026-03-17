#!/usr/bin/env node

import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";

const CONFIG = {
  base: {
    rpc: "https://mainnet.base.org",
    eid: 30184,
    deployer: process.env.PRIVATE_KEY,
    hubEid: 30184,
    isHub: true,
    chainName: "Base"
  },
  arbitrum: {
    rpc: "https://arb1.arbitrum.io/rpc",
    eid: 30110,
    deployer: process.env.PRIVATE_KEY,
    hubEid: 30184,
    isHub: false,
    chainName: "Arbitrum"
  }
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const CONTRACT_ABI = [
  "function initialize(address _lzEndpoint) public",
  "function transferOwnership(address newOwner) public",
  "function setTrustedExecutor(address executor, bool trusted) public"
];

async function deployGovernance(chainConfig) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Deploying ONBTGovernanceOApp to ${chainConfig.chainName}`);
  console.log(`${'='.repeat(60)}`);

  const provider = new ethers.JsonRpcProvider(chainConfig.rpc);
  const deployer = new ethers.Wallet(chainConfig.deployer, provider);

  console.log(`\n📍 Chain: ${chainConfig.chainName}`);
  console.log(`📍 Deployer: ${deployer.address}`);
  console.log(`📍 EID: ${chainConfig.eid}`);
  console.log(`📍 Hub EID: ${chainConfig.hubEid}`);
  console.log(`📍 Is Hub: ${chainConfig.isHub}`);

  // Check deployer balance
  const balance = await provider.getBalance(deployer.address);
  console.log(`📍 Deployer balance: ${ethers.formatEther(balance)} ETH`);

  if (balance < ethers.parseEther("0.01")) {
    throw new Error(`Insufficient balance on ${chainConfig.chainName}: ${ethers.formatEther(balance)} ETH`);
  }

  // Load contract artifact
  const artifactPath = path.resolve(
    "./artifacts/contracts/governance/ONBTGovernanceOApp.sol/ONBTGovernanceOApp.json"
  );

  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Contract artifact not found: ${artifactPath}`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abi = artifact.abi;
  const bytecode = artifact.bytecode;

  // Deploy contract
  const factory = new ethers.ContractFactory(abi, bytecode, deployer);
  console.log("\n🚀 Deploying contract...");

  const contract = await factory.deploy(
    ENDPOINT,
    deployer.address,
    chainConfig.hubEid,
    chainConfig.isHub,
    {
      gasLimit: 5000000,
    }
  );

  await contract.waitForDeployment();
  const deployedAddress = await contract.getAddress();

  console.log(`✅ Deployed to: ${deployedAddress}`);

  // Write deployment info
  const deploymentInfo = {
    chainId: chainConfig.eid,
    chainName: chainConfig.chainName,
    contractName: "ONBTGovernanceOApp",
    address: deployedAddress,
    deployer: deployer.address,
    hubEid: chainConfig.hubEid,
    isHub: chainConfig.isHub,
    endpoint: ENDPOINT,
    deploymentTime: new Date().toISOString(),
    txHash: contract.deploymentTransaction()?.hash || ""
  };

  const fileName = `deployment-governance-${chainConfig.eid}.json`;
  fs.writeFileSync(fileName, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📄 Deployment info saved to: ${fileName}`);

  return deployedAddress;
}

async function main() {
  try {
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY environment variable not set");
    }

    const baseAddress = await deployGovernance(CONFIG.base);
    console.log(`\n✅ Base governance: ${baseAddress}`);

    const arbitrumAddress = await deployGovernance(CONFIG.arbitrum);
    console.log(`\n✅ Arbitrum governance: ${arbitrumAddress}`);

    console.log(`\n${'='.repeat(60)}`);
    console.log("✅ Governance V2 deployment complete!");
    console.log(`${'='.repeat(60)}`);
    console.log(`\nNext steps:`);
    console.log(`1. Configure peers: npx hardhat run scripts/configure-governance-peers.mjs`);
    console.log(`2. Check configuration: npx hardhat run scripts/check-governance-config.mjs`);

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

main();
