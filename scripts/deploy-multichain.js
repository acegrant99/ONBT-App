#!/usr/bin/env node

/**
 * Multi-Chain Deployment Tracker
 * 
 * Usage: node scripts/deploy-multichain.js
 * 
 * This script helps you deploy ONBT to multiple chains and tracks addresses
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const NETWORKS = [
  { name: "base", chainId: 8453, eid: 184, deployed: true },
  { name: "arbitrum", chainId: 42161, eid: 110, deployed: true },
  { name: "optimism", chainId: 10, eid: 111, deployed: false },
  { name: "polygon", chainId: 137, eid: 109, deployed: false },
  { name: "bsc", chainId: 56, eid: 102, deployed: false },
  { name: "avalanche", chainId: 43114, eid: 106, deployed: false },
  { name: "ethereum", chainId: 1, eid: 101, deployed: false },
];

const DEPLOYED_ADDRESSES = {
  base: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
  arbitrum: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
};

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║       ONBT Multi-Chain Deployment Tracker                ║");
  console.log("╚═══════════════════════════════════════════════════════════╝\n");

  console.log("📊 Current Deployment Status:\n");
  
  for (const network of NETWORKS) {
    const status = network.deployed ? "✅ DEPLOYED" : "🟡 NOT DEPLOYED";
    const address = DEPLOYED_ADDRESSES[network.name] || "Not deployed";
    console.log(`${status} | ${network.name.padEnd(12)} | Chain ${network.chainId.toString().padEnd(6)} | EID ${network.eid.toString().padEnd(4)} | ${address}`);
  }

  console.log("\n");
  const answer = await question("Would you like to deploy to a new network? (y/n): ");
  
  if (answer.toLowerCase() !== "y") {
    console.log("\n👋 Exiting...");
    rl.close();
    return;
  }

  console.log("\n📋 Available Networks for Deployment:\n");
  const undeployedNetworks = NETWORKS.filter(n => !n.deployed);
  
  undeployedNetworks.forEach((network, index) => {
    console.log(`${index + 1}. ${network.name} (Chain ${network.chainId}, EID ${network.eid})`);
  });

  const selection = await question("\nSelect network number to deploy: ");
  const networkIndex = parseInt(selection) - 1;

  if (networkIndex < 0 || networkIndex >= undeployedNetworks.length) {
    console.log("❌ Invalid selection");
    rl.close();
    return;
  }

  const selectedNetwork = undeployedNetworks[networkIndex];

  console.log(`\n🚀 Deploying to ${selectedNetwork.name}...\n`);
  console.log("Run this command:");
  console.log(`\n   node scripts/deploy-destination.js ${selectedNetwork.name}\n`);
  
  const deployed = await question("After deployment, enter the contract address (or 'skip'): ");

  if (deployed.toLowerCase() !== "skip" && deployed.startsWith("0x")) {
    DEPLOYED_ADDRESSES[selectedNetwork.name] = deployed;
    
    console.log("\n✅ Address saved!");
    console.log("\n📝 Updated deployment addresses:");
    console.log(JSON.stringify(DEPLOYED_ADDRESSES, null, 2));

    // Generate peer configuration file
    const peerConfigScript = generatePeerConfigScript(DEPLOYED_ADDRESSES);
    const scriptPath = path.join(__dirname, "configure-multichain-peers.mjs");
    
    fs.writeFileSync(scriptPath, peerConfigScript);
    console.log(`\n✅ Peer configuration script generated: ${scriptPath}`);
    console.log("\nNext steps:");
    console.log("1. Verify the contract on the explorer");
    console.log("2. Run peer configuration on ALL networks:");
    console.log(`   npx hardhat run scripts/configure-multichain-peers.mjs --network ${selectedNetwork.name}`);
    console.log("   (Repeat for each network)");
  }

  rl.close();
}

function generatePeerConfigScript(addresses) {
  return `import hre from "hardhat";
const { ethers } = hre;

// Deployed contract addresses
const CONTRACTS = ${JSON.stringify(addresses, null, 2)};

// LayerZero Endpoint IDs
const ENDPOINT_IDS = {
  ethereum: 101,
  bsc: 102,
  avalanche: 106,
  polygon: 109,
  arbitrum: 110,
  optimism: 111,
  base: 184,
};

async function configurePeers() {
  const currentNetwork = hre.network.name;
  const currentContract = CONTRACTS[currentNetwork];

  if (!currentContract) {
    throw new Error(\`No contract address for network: \${currentNetwork}\`);
  }

  console.log(\`\\n🔧 Configuring peers for \${currentNetwork}\`);
  console.log(\`Contract: \${currentContract}\\n\`);

  const OFT = await ethers.getContractAt("OmnichainNabatOFT", currentContract);

  // Configure peer for each OTHER network
  for (const [networkName, contractAddress] of Object.entries(CONTRACTS)) {
    if (networkName === currentNetwork) continue; // Skip self

    const peerEid = ENDPOINT_IDS[networkName];
    const peerBytes32 = ethers.zeroPadValue(contractAddress, 32);

    console.log(\`Setting peer for \${networkName} (EID: \${peerEid})\`);
    try {
      const tx = await OFT.setPeer(peerEid, peerBytes32);
      await tx.wait();
      console.log(\`✅ Peer set: \${contractAddress}\`);
    } catch (error) {
      console.log(\`⚠️  Failed: \${error.message}\`);
    }
  }

  console.log(\`\\n✅ All peers configured for \${currentNetwork}!\`);
}

configurePeers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
`;
}

main().catch(console.error);
