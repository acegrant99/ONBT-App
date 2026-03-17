import hre from "hardhat";
const { ethers, network } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// >>> UPDATE THIS WITH YOUR TIMELOCK ADDRESS <<<
const TIMELOCK_ADDRESS = "0xYOUR_TIMELOCK_ADDRESS_HERE";

async function main() {
  if (TIMELOCK_ADDRESS === "0xYOUR_TIMELOCK_ADDRESS_HERE") {
    console.error("❌ Please update TIMELOCK_ADDRESS in this script first!");
    process.exit(1);
  }

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Queue Timelock Transaction                                ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const timelock = await ethers.getContractAt("SimpleTimelock", TIMELOCK_ADDRESS);
  const delay = await timelock.delay();
  const [admin] = await ethers.getSigners();

  console.log(`Timelock: ${TIMELOCK_ADDRESS}`);
  console.log(`Admin: ${admin.address}`);
  console.log(`Delay: ${delay.toString()} seconds (${delay / 3600} hours)\n`);

  // Example: Update staking reward rate
  // Modify this section for your specific transaction
  console.log("═".repeat(62));
  console.log("EXAMPLE ACTION: Update Staking Base Reward Rate");
  console.log("═".repeat(62));

  const targetContract = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe"; // Base staking
  const stakingInterface = new ethers.utils.Interface([
    "function setBaseRewardRate(uint256 newRate)"
  ]);
  const calldata = stakingInterface.encodeFunctionData("setBaseRewardRate", [1200]); // 12% APY

  console.log(`Target: ${targetContract}`);
  console.log(`Function: setBaseRewardRate(1200)`);
  console.log(`Calldata: ${calldata}\n`);

  // Queue transaction
  console.log("Queueing transaction...");
  const tx = await timelock.queueTransaction(targetContract, 0, calldata);
  console.log(`⏳ Queue tx: ${tx.hash}`);
  const receipt = await tx.wait();

  // Get the queued event
  const queuedEvent = receipt.events?.find(e => e.event === "TransactionQueued");
  const txHash = queuedEvent?.args?.txHash;
  const eta = queuedEvent?.args?.eta;

  console.log(`✅ Transaction queued!`);
  console.log(`   Transaction Hash: ${txHash}`);
  console.log(`   ETA: ${new Date(eta * 1000).toISOString()}`);
  console.log(`   Local Time: ${new Date(eta * 1000).toLocaleString()}\n`);

  // Save for later execution
  const queuedTx = {
    network: network.name,
    timelock: TIMELOCK_ADDRESS,
    target: targetContract,
    value: 0,
    data: calldata,
    eta: eta.toString(),
    etaDate: new Date(eta * 1000).toISOString(),
    txHash,
    description: "Set base reward rate to 12% APY",
    queuedAt: new Date().toISOString(),
    queueTxHash: tx.hash
  };

  const savePath = path.join(
    __dirname,
    "..",
    "deploy",
    `queued-tx-${Date.now()}.json`
  );
  fs.writeFileSync(savePath, JSON.stringify(queuedTx, null, 2));
  console.log(`Queued transaction saved: ${savePath}\n`);

  console.log("═".repeat(62));
  console.log("TO EXECUTE THIS TRANSACTION");
  console.log("═".repeat(62));
  console.log(`Wait until: ${new Date(eta * 1000).toLocaleString()}`);
  console.log(`Then run:\n`);
  console.log(`npx hardhat run scripts/execute-timelock-action.mjs --network ${network.name}\n`);
  console.log("Note: Anyone can execute after the delay, not just admin\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
