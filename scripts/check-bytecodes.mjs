#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

async function getDeployedBytecode(rpcUrl, address) {
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getCode",
        params: [address, "latest"],
        id: 1,
      }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error fetching bytecode: ${error.message}`);
    return null;
  }
}

async function getCompiledBytecode(contractPath) {
  try {
    const artifactPath = path.join(
      __dirname,
      "../artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json"
    );

    if (!fs.existsSync(artifactPath)) {
      console.log(`⚠️  Artifact not found at ${artifactPath}`);
      return null;
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
    return artifact.deployedBytecode || artifact.bytecode;
  } catch (error) {
    console.error(`Error reading compiled bytecode: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  BYTECODE COMPARISON - HUB OFT (Base)                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log(`📍 Base OFT Address: ${baseOftAddr}\n`);

  // Get deployed bytecode from network
  console.log("🔗 Fetching deployed bytecode from Base network...\n");
  const deployedBytecode = await getDeployedBytecode(
    "https://mainnet.base.org",
    baseOftAddr
  );

  if (!deployedBytecode) {
    console.log("❌ Failed to fetch deployed bytecode\n");
    process.exit(1);
  }

  console.log(`✅ Deployed bytecode retrieved`);
  console.log(`   Length: ${deployedBytecode.length} characters (${(deployedBytecode.length / 2)} bytes)\n`);

  // Get compiled bytecode
  console.log("📦 Fetching compiled bytecode from artifact...\n");
  const compiledBytecode = await getCompiledBytecode();

  if (!compiledBytecode) {
    console.log("❌ Failed to fetch compiled bytecode\n");
    process.exit(1);
  }

  console.log(`✅ Compiled bytecode retrieved`);
  console.log(`   Length: ${compiledBytecode.length} characters (${(compiledBytecode.length / 2)} bytes)\n`);

  // Compare
  console.log("━".repeat(70));
  console.log("COMPARISON\n");

  if (deployedBytecode === compiledBytecode) {
    console.log("✅ BYTECODES MATCH!");
    console.log("\nDeployed bytecode is identical to compiled bytecode.");
    console.log("The contract should verify successfully.\n");
  } else {
    console.log("❌ BYTECODES DO NOT MATCH!\n");

    // Show first divergence
    let firstDiff = -1;
    for (let i = 0; i < Math.min(deployedBytecode.length, compiledBytecode.length); i++) {
      if (deployedBytecode[i] !== compiledBytecode[i]) {
        firstDiff = i;
        break;
      }
    }

    if (firstDiff >= 0) {
      console.log(`First difference at character ${firstDiff}:`);
      console.log(`  Deployed:  ...${deployedBytecode.substring(Math.max(0, firstDiff - 20), firstDiff + 20)}...`);
      console.log(`  Compiled:  ...${compiledBytecode.substring(Math.max(0, firstDiff - 20), firstDiff + 20)}...\n`);
    }

    if (deployedBytecode.length !== compiledBytecode.length) {
      console.log(`Length mismatch:`);
      console.log(`  Deployed:  ${(deployedBytecode.length / 2)} bytes`);
      console.log(`  Compiled:  ${(compiledBytecode.length / 2)} bytes`);
      console.log(`  Difference: ${Math.abs(deployedBytecode.length - compiledBytecode.length) / 2} bytes\n`);
    }

    console.log("Possible causes:");
    console.log("  1. Different compiler version");
    console.log("  2. Different optimizer settings (runs)");
    console.log("  3. Different viaIR setting");
    console.log("  4. Contract was modified after deployment\n");
  }

  console.log("━".repeat(70));

  // Save bytecodes to files for manual inspection
  const deployedPath = path.join(__dirname, "../artifacts/deployed-bytecode.txt");
  const compiledPath = path.join(__dirname, "../artifacts/compiled-bytecode.txt");

  fs.writeFileSync(deployedPath, deployedBytecode);
  fs.writeFileSync(compiledPath, compiledBytecode);

  console.log(`\n📄 Bytecodes saved for inspection:`);
  console.log(`   Deployed: ${deployedPath}`);
  console.log(`   Compiled: ${compiledPath}\n`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
