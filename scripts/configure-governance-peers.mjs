#!/usr/bin/env node

import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const CONFIG = {
  base: {
    rpc: "https://mainnet.base.org",
    eid: 30184,
    deployer: process.env.PRIVATE_KEY,
    chainName: "Base"
  },
  arbitrum: {
    rpc: "https://arb1.arbitrum.io/rpc",
    eid: 30110,
    deployer: process.env.PRIVATE_KEY,
    chainName: "Arbitrum"
  }
};

async function configurePeers() {
  console.log(`\n${'='.repeat(60)}`);
  console.log("Configuring ONBTGovernanceOApp Peers");
  console.log(`${'='.repeat(60)}`);

  // Load deployment files
  const baseDeployment = JSON.parse(
    fs.readFileSync("deployment-governance-30184.json", "utf8")
  );
  const arbitrumDeployment = JSON.parse(
    fs.readFileSync("deployment-governance-30110.json", "utf8")
  );

  const baseAddress = baseDeployment.address;
  const arbitrumAddress = arbitrumDeployment.address;

  console.log(`\n📍 Base Governance: ${baseAddress}`);
  console.log(`📍 Arbitrum Governance: ${arbitrumAddress}`);

  // Load contract ABI
  const artifactPath = "./artifacts/contracts/governance/ONBTGovernanceOApp.sol/ONBTGovernanceOApp.json";
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abi = artifact.abi;

  // Configure Base → Arbitrum
  console.log(`\n🔗 Setting Base peer to Arbitrum...`);
  const baseProvider = new ethers.JsonRpcProvider(CONFIG.base.rpc);
  const baseDeployer = new ethers.Wallet(CONFIG.base.deployer, baseProvider);
  const baseContract = new ethers.Contract(baseAddress, abi, baseDeployer);

  const arbitrumPeerBytes32 = ethers.zeroPadValue(arbitrumAddress, 32);
  console.log(`  Peer bytes32: ${arbitrumPeerBytes32}`);

  try {
    const tx1 = await baseContract.setPeer(
      CONFIG.arbitrum.eid,
      arbitrumPeerBytes32,
      { gasLimit: 500000 }
    );
    console.log(`  ✅ Tx sent: ${tx1.hash}`);
    await tx1.wait();
    console.log(`  ✅ Confirmed on Base`);
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    throw error;
  }

  // Configure Arbitrum → Base
  console.log(`\n🔗 Setting Arbitrum peer to Base...`);
  const arbitrumProvider = new ethers.JsonRpcProvider(CONFIG.arbitrum.rpc);
  const arbitrumDeployer = new ethers.Wallet(CONFIG.arbitrum.deployer, arbitrumProvider);
  const arbitrumContract = new ethers.Contract(arbitrumAddress, abi, arbitrumDeployer);

  const basePeerBytes32 = ethers.zeroPadValue(baseAddress, 32);
  console.log(`  Peer bytes32: ${basePeerBytes32}`);

  try {
    const tx2 = await arbitrumContract.setPeer(
      CONFIG.base.eid,
      basePeerBytes32,
      { gasLimit: 500000 }
    );
    console.log(`  ✅ Tx sent: ${tx2.hash}`);
    await tx2.wait();
    console.log(`  ✅ Confirmed on Arbitrum`);
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    throw error;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log("✅ Peer configuration complete!");
  console.log(`${'='.repeat(60)}`);
  console.log(`\nConfiguration saved:`);
  console.log(`  Base → Arbitrum EID 30110`);
  console.log(`  Arbitrum → Base EID 30184`);
}

async function main() {
  try {
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY environment variable not set");
    }

    await configurePeers();
  } catch (error) {
    console.error("❌ Configuration failed:", error.message);
    process.exit(1);
  }
}

main();
