import hre from "hardhat";
const { ethers, network } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Timelock configuration
const DELAY = 48 * 60 * 60; // 48 hours

async function main() {
  const [deployer] = await ethers.getSigners();
  const networkName = network.name;

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Deploy Timelock Contract - ${networkName.toUpperCase().padEnd(31, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Admin: ${deployer.address}`);
  console.log(`Delay: ${DELAY / 3600} hours\n`);

  // Deploy timelock
  console.log("Deploying SimpleTimelock...");
  const Timelock = await ethers.getContractFactory("SimpleTimelock");
  const timelock = await Timelock.deploy(deployer.address, DELAY);
  await timelock.deployed();

  console.log(`✅ Timelock deployed: ${timelock.address}`);
  console.log(`   Admin: ${await timelock.admin()}`);
  console.log(`   Delay: ${(await timelock.delay()).toString()} seconds\n`);

  // Save deployment info
  const deployment = {
    network: networkName,
    chainId: network.config.chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    timelock: timelock.address,
    delay: DELAY,
    delayHours: DELAY / 3600
  };

  const outputPath = path.join(
    __dirname,
    "..",
    "deploy",
    `timelock-${networkName}-${Date.now()}.json`
  );
  fs.writeFileSync(outputPath, JSON.stringify(deployment, null, 2));
  console.log(`Deployment saved: ${outputPath}\n`);

  console.log("═".repeat(62));
  console.log("NEXT STEPS");
  console.log("═".repeat(62));
  console.log("1. Transfer ownership of all contracts to Timelock:");
  console.log(`   Update MULTISIG_ADDRESS in transfer-to-multisig.mjs to:`);
  console.log(`   ${timelock.address}`);
  console.log(``);
  console.log("2. Run transfer script:");
  console.log(`   npx hardhat run scripts/transfer-to-multisig.mjs --network ${networkName}`);
  console.log(``);
  console.log("3. All admin actions now require 48hr delay");
  console.log("4. Use queue-timelock-action.mjs to queue transactions");
  console.log("5. Anyone can execute after delay period\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
