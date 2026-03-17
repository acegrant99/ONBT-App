#!/usr/bin/env node

import { ethers } from "ethers";
import fs from "fs";

const CONFIG = {
  base: {
    rpc: "https://mainnet.base.org",
    eid: 30184,
    chainName: "Base"
  },
  arbitrum: {
    rpc: "https://arb1.arbitrum.io/rpc",
    eid: 30110,
    chainName: "Arbitrum"
  }
};

async function checkGovernanceConfig() {
  console.log(`\n${'='.repeat(60)}`);
  console.log("Checking ONBTGovernanceOApp Configuration");
  console.log(`${'='.repeat(60)}`);

  // Load deployment files
  let baseAddress, arbitrumAddress;

  try {
    const baseDeployment = JSON.parse(
      fs.readFileSync("deployment-governance-30184.json", "utf8")
    );
    baseAddress = baseDeployment.address;
    console.log(`\n📍 Base Governance: ${baseAddress}`);
  } catch (e) {
    console.log(`\n⚠️  Base deployment file not found`);
  }

  try {
    const arbitrumDeployment = JSON.parse(
      fs.readFileSync("deployment-governance-30110.json", "utf8")
    );
    arbitrumAddress = arbitrumDeployment.address;
    console.log(`📍 Arbitrum Governance: ${arbitrumAddress}`);
  } catch (e) {
    console.log(`⚠️  Arbitrum deployment file not found`);
  }

  if (!baseAddress || !arbitrumAddress) {
    throw new Error("Missing deployment files");
  }

  // Load contract ABI
  const artifactPath = "./artifacts/contracts/governance/ONBTGovernanceOApp.sol/ONBTGovernanceOApp.json";
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abi = artifact.abi;

  // Check Base
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Checking Base Governance Configuration`);
  console.log(`${'='.repeat(60)}`);

  const baseProvider = new ethers.JsonRpcProvider(CONFIG.base.rpc);
  const baseContract = new ethers.Contract(baseAddress, abi, baseProvider);

  try {
    const owner = await baseContract.owner();
    console.log(`✅ Owner: ${owner}`);

    const isHub = await baseContract.isHub();
    console.log(`✅ Is Hub: ${isHub}`);

    const hubEid = await baseContract.hubEid();
    console.log(`✅ Hub EID: ${hubEid} (${hubEid === 30184n ? "30184 ✓" : "MISMATCH ❌"})`);

    const arbitrumPeer = await baseContract.peers(CONFIG.arbitrum.eid);
    const arbitrumPeerAddr = ethers.toBeHex(arbitrumPeer, 20);
    console.log(`✅ Arbitrum Peer: ${arbitrumPeerAddr}`);
    console.log(`   ${arbitrumPeerAddr === arbitrumAddress.toLowerCase() ? "✓ Correct" : "❌ Mismatch"}`);

  } catch (error) {
    console.error(`❌ Error reading Base config: ${error.message}`);
  }

  // Check Arbitrum
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Checking Arbitrum Governance Configuration`);
  console.log(`${'='.repeat(60)}`);

  const arbitrumProvider = new ethers.JsonRpcProvider(CONFIG.arbitrum.rpc);
  const arbitrumContract = new ethers.Contract(arbitrumAddress, abi, arbitrumProvider);

  try {
    const owner = await arbitrumContract.owner();
    console.log(`✅ Owner: ${owner}`);

    const isHub = await arbitrumContract.isHub();
    console.log(`✅ Is Hub: ${isHub}`);

    const hubEid = await arbitrumContract.hubEid();
    console.log(`✅ Hub EID: ${hubEid} (${hubEid === 30184n ? "30184 ✓" : "MISMATCH ❌"})`);

    const basePeer = await arbitrumContract.peers(CONFIG.base.eid);
    const basePeerAddr = ethers.toBeHex(basePeer, 20);
    console.log(`✅ Base Peer: ${basePeerAddr}`);
    console.log(`   ${basePeerAddr === baseAddress.toLowerCase() ? "✓ Correct" : "❌ Mismatch"}`);

  } catch (error) {
    console.error(`❌ Error reading Arbitrum config: ${error.message}`);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log("✅ Configuration check complete!");
  console.log(`${'='.repeat(60)}`);
}

async function main() {
  try {
    await checkGovernanceConfig();
  } catch (error) {
    console.error("❌ Check failed:", error.message);
    process.exit(1);
  }
}

main();
