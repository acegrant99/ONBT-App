import hre from "hardhat";
const { run, network } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEPLOYMENTS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    verifyArgs: path.join(__dirname, "..", "deploy", "verify-args-staking-base.cjs")
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    verifyArgs: path.join(__dirname, "..", "deploy", "verify-args-staking-arbitrum.cjs")
  }
};

async function verifyContract(address, argsPath, contractName) {
  console.log(`\nVerifying ${contractName} at ${address}...`);
  console.log(`Using args: ${argsPath}`);
  
  try {
    const argsModule = await import(`file:///${argsPath.replace(/\\/g, '/')}`);
    const constructorArgs = argsModule.default || argsModule;
    await run("verify:verify", {
      address: address,
      constructorArguments: constructorArgs,
      contract: "contracts/defi/ONBTOmnichainStaking.sol:ONBTOmnichainStaking"
    });
    console.log(`✅ ${contractName} verified successfully!`);
    return true;
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log(`✅ ${contractName} already verified`);
      return true;
    } else {
      console.log(`❌ ${contractName} verification failed:`);
      console.log(`   ${error.message}`);
      return false;
    }
  }
}

async function main() {
  const networkName = network.name;
  
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Verify ONBTOmnichainStaking - ${networkName.toUpperCase().padEnd(30, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝`);

  const deployment = DEPLOYMENTS[networkName];
  
  if (!deployment) {
    console.error(`\n❌ No deployment found for network: ${networkName}`);
    console.error(`   Supported networks: base, arbitrum\n`);
    process.exit(1);
  }

  console.log(`\nNetwork: ${networkName}`);
  console.log(`Staking contract: ${deployment.staking}`);

  // Verify staking contract
  const success = await verifyContract(
    deployment.staking,
    deployment.verifyArgs,
    "ONBTOmnichainStaking"
  );

  if (success) {
    console.log(`\n${"═".repeat(62)}`);
    console.log(`✅ VERIFICATION COMPLETE`);
    console.log(`${"═".repeat(62)}`);
    console.log(`\nView on block explorer:`);
    if (networkName === "base") {
      console.log(`https://basescan.org/address/${deployment.staking}#code`);
    } else if (networkName === "arbitrum") {
      console.log(`https://arbiscan.io/address/${deployment.staking}#code`);
    }
    console.log(``);
  } else {
    console.log(`\n❌ Verification failed - see errors above\n`);
    process.exit(1);
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("\n❌ Script failed:", error);
  process.exit(1);
});
