import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const signer = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY) : null;

const baseProvider = new ethers.JsonRpcProvider(
  "https://mainnet.base.org",
);
const arbitrumProvider = new ethers.JsonRpcProvider(
  "https://arb1.arbitrum.io/rpc"
);

const OFT_ABI = [
  "function owner() external view returns (address)",
  "function getPeer(uint32 eid) external view returns (bytes32)",
];

// Map of OFT addresses from deployment files
const ofts = {
  // Base OFTs
  "Base - Current/Newer": {
    address: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
    provider: baseProvider,
    chain: "Base (8453)",
  },
  "Base - V2/New": {
    address: "0xD1669D6801D5883999BD0544D9e1b8722eA6F219",
    provider: baseProvider,
    chain: "Base (8453)",
  },
  "Base - V2": {
    address: "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d",
    provider: baseProvider,
    chain: "Base (8453)",
  },
  "Base - V3": {
    address: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
    provider: baseProvider,
    chain: "Base (8453)",
  },

  // Arbitrum OFTs
  "Arbitrum - Current/Newer": {
    address: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
    provider: arbitrumProvider,
    chain: "Arbitrum (42161)",
  },
  "Arbitrum - V2": {
    address: "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27",
    provider: arbitrumProvider,
    chain: "Arbitrum (42161)",
  },
  "Arbitrum - V1": {
    address: "0x026beFb7808458FD5dFc77EA8E152c16FD169FF8",
    provider: arbitrumProvider,
    chain: "Arbitrum (42161)",
  },
  "Arbitrum - V3": {
    address: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
    provider: arbitrumProvider,
    chain: "Arbitrum (42161)",
  },
};

async function checkOFT(name, address, provider) {
  try {
    const oft = new ethers.Contract(address, OFT_ABI, provider);
    const owner = await oft.owner();
    const isOwnedBySigner =
      signer && owner.toLowerCase() === signer.address.toLowerCase();

    return {
      name,
      address,
      owner,
      isOwnedBySigner,
      status: isOwnedBySigner ? "✅ WIRABLE" : "❌ DIFFERENT OWNER",
    };
  } catch (error) {
    return {
      name,
      address,
      owner: "ERROR",
      isOwnedBySigner: false,
      status: `❌ ${error.message.split("\n")[0].substring(0, 40)}`,
    };
  }
}

async function main() {
  console.log("\n╔═══════════════════════════════════════════════════════════════╗");
  console.log("║         Checking All OFT Versions for Wiring Capability        ║");
  console.log("╚═══════════════════════════════════════════════════════════════╝");

  if (signer) {
    console.log(`\nSigner Address: ${signer.address}`);
  } else {
    console.log(`\nNo signer (PRIVATE_KEY not set)`);
    return;
  }

  const results = [];
  const baseOFTs = Object.entries(ofts).filter((e) => e[1].chain.includes("Base"));
  const arbOFTs = Object.entries(ofts).filter((e) => e[1].chain.includes("Arbitrum"));

  console.log("\n--- BASE OFTs (Chain ID 8453) ---\n");
  for (const [name, config] of baseOFTs) {
    const result = await checkOFT(name, config.address, config.provider);
    results.push(result);
    console.log(`${result.name}`);
    console.log(`  Address: ${result.address}`);
    console.log(`  Owner: ${result.owner}`);
    console.log(`  Status: ${result.status}\n`);
  }

  console.log("\n--- ARBITRUM OFTs (Chain ID 42161) ---\n");
  for (const [name, config] of arbOFTs) {
    const result = await checkOFT(name, config.address, config.provider);
    results.push(result);
    console.log(`${result.name}`);
    console.log(`  Address: ${result.address}`);
    console.log(`  Owner: ${result.owner}`);
    console.log(`  Status: ${result.status}\n`);
  }

  // Summary
  const wireable = results.filter((r) => r.isOwnedBySigner).length;
  const total = results.length;

  console.log("╔═══════════════════════════════════════════════════════════════╗");
  console.log(`║ Wireable OFTs: ${wireable}/${total}`);
  console.log("╚═══════════════════════════════════════════════════════════════╝\n");

  if (wireable < total) {
    console.log("⚠️  Some OFTs have different owners:");
    results
      .filter((r) => !r.isOwnedBySigner && r.owner !== "ERROR")
      .forEach((r) => {
        console.log(`   ${r.name}: Owner is ${r.owner}`);
      });
  }
}

main();
