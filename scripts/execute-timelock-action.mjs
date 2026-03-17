import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEPLOY_DIR = path.join(__dirname, "..", "deploy");

async function main() {
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Execute Timelock Transaction                              ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  // Find most recent queued transaction
  const files = fs.readdirSync(DEPLOY_DIR)
    .filter(f => f.startsWith("queued-tx-"))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.error("❌ No queued transactions found");
    console.error("   Run queue-timelock-action.mjs first\n");
    process.exit(1);
  }

  const latestFile = path.join(DEPLOY_DIR, files[0]);
  const queuedTx = JSON.parse(fs.readFileSync(latestFile, "utf8"));

  console.log(`Loaded: ${files[0]}`);
  console.log(`Description: ${queuedTx.description}`);
  console.log(`Target: ${queuedTx.target}`);
  console.log(`ETA: ${queuedTx.etaDate}`);
  console.log(`Transaction Hash: ${queuedTx.txHash}\n`);

  // Check if ready to execute
  const currentTime = Math.floor(Date.now() / 1000);
  const eta = parseInt(queuedTx.eta);

  if (currentTime < eta) {
    const remaining = eta - currentTime;
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    console.error(`❌ Timelock still active!`);
    console.error(`   Wait ${hours}h ${minutes}m more`);
    console.error(`   Ready at: ${new Date(eta * 1000).toLocaleString()}\n`);
    process.exit(1);
  }

  if (currentTime > eta + (7 * 24 * 60 * 60)) {
    console.error(`❌ Transaction expired (>7 days old)`);
    console.error(`   Must queue again\n`);
    process.exit(1);
  }

  // Execute
  console.log("Executing transaction...");
  const timelock = await ethers.getContractAt("SimpleTimelock", queuedTx.timelock);
  
  const tx = await timelock.executeTransaction(
    queuedTx.target,
    queuedTx.value,
    queuedTx.data,
    queuedTx.eta
  );
  
  console.log(`⏳ Execution tx: ${tx.hash}`);
  await tx.wait();
  
  console.log(`✅ Transaction executed successfully!\n`);

  // Archive the queued transaction file
  fs.renameSync(
    latestFile,
    latestFile.replace("queued-tx-", "executed-tx-")
  );
  
  console.log("Transaction file archived as executed\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Execution failed:", error);
  process.exit(1);
});
