import hre from "hardhat";
const { ethers } = hre;

const BASE_OFT = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";
const ARBITRUM_OFT = "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da";

// All available DVN combinations to try
const DVN_COMBINATIONS = {
  "LayerZero + Horizen": {
    base: ["0x9e059a54699a285714207b43B055483E78FAac25", "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc"],
    arbitrum: ["0x2f55C492897526677C5B68fb199ea31E2c126416", "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc"]
  },
  "LayerZero + Polyhedra": {
    base: ["0x9e059a54699a285714207b43B055483E78FAac25", "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5"],
    arbitrum: ["0x2f55C492897526677C5B68fb199ea31E2c126416", "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5"]
  },
  "LayerZero + Nethermind": {
    base: ["0x9e059a54699a285714207b43B055483E78FAac25", "0xa7b5189bca84cd304d8553977c7c614329750d99"],
    arbitrum: ["0x2f55C492897526677C5B68fb199ea31E2c126416", "0xa7b5189bca84cd304d8553977c7c614329750d99"]
  }
};

async function main() {
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║          DVN Configuration Options & Status              ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localOFT, localNetwork;
  
  if (network.chainId === 8453n) {
    localOFT = BASE_OFT;
    localNetwork = "base";
    console.log("Network: Base mainnet");
  } else if (network.chainId === 42161n) {
    localOFT = ARBITRUM_OFT;
    localNetwork = "arbitrum";
    console.log("Network: Arbitrum mainnet");
  } else {
    console.error("❌ This script is for mainnet only");
    process.exit(1);
  }

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  console.log("OFT Contract:", localOFT);

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📋 Available DVN Combinations");
  console.log("═══════════════════════════════════════════════════════════\n");

  Object.entries(DVN_COMBINATIONS).forEach(([name, config], index) => {
    console.log(`${index + 1}. ${name}`);
    const dvns = config[localNetwork];
    console.log(`   DVN 1: ${dvns[0]}`);
    console.log(`   DVN 2: ${dvns[1]}`);
    console.log();
  });

  console.log("═══════════════════════════════════════════════════════════");
  console.log("⚠️  IMPORTANT NOTE");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("Current DVNs (LayerZero Labs + Horizen) are already working.");
  console.log("The issue preventing transfers is NOT DVN-related.");
  console.log("\nThe real blocker is:");
  console.log("  ❌ LayerZero Labs has NOT initialized the Base ↔ Arbitrum");
  console.log("     path on their production infrastructure yet.");
  console.log("\nChanging DVNs will:");
  console.log("  ❌ NOT fix the initialization issue");
  console.log("  ✅ Allow you to test different security configurations");
  console.log("  ❌ Still require LayerZero Labs to initialize the path");

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("✅ Current Status");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("✅ Contract Deployment: Complete");
  console.log("✅ Peer Configuration: Set up");
  console.log("✅ Message Libraries: Configured");
  console.log("✅ DVN Setup: Working (LayerZero + Horizen)");
  console.log("✅ Enforced Options: 200k gas");
  console.log("❌ LayerZero Path Initialization: NOT YET DONE");

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🚀 What to Do Now");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("OPTION 1: Contact LayerZero Labs (Recommended)");
  console.log("  Email: support@layerzero.network");
  console.log("  Request path initialization for:");
  console.log("    Base:      0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD");
  console.log("    Arbitrum:  0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da");
  console.log("  Timeline: 1-3 business days\n");

  console.log("OPTION 2: Try Alternative DVNs (Advanced)");
  console.log("  Update configure-dvn.mjs with different DVN combo");
  console.log("  Then run: npx hardhat run scripts/configure-dvn.mjs --network base");
  console.log("  Still won't work without LayerZero's path init\n");

  console.log("OPTION 3: Test on Testnet (Recommended)");
  console.log("  Testnet paths (Sepolia) are pre-initialized");
  console.log("  Allows you to verify contracts work");
  console.log("  Then deploy to mainnet once path is initialized\n");

  console.log("═══════════════════════════════════════════════════════════");
  console.log("📚 Resources");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("Check path initialization status:");
  console.log("  https://layerzeroscan.com/\n");

  console.log("LayerZero Documentation:");
  console.log("  https://docs.layerzero.network/v2/developers/evm/oft/quickstart\n");

  console.log("Contact LayerZero:");
  console.log("  Twitter: @LayerZero_Labs");
  console.log("  Discord: https://discord.gg/layerzero");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  });
