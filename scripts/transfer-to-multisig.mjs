import hre from "hardhat";
const { ethers, network } = hre;

// Current deployment addresses
const CONTRACTS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    vault: "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9",
    rewardsPool: "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
    yieldDistributor: "0x8c91384EbF767C1C434d127c82020380F4A8afC7",
    achievementNFT: "0x11EEEB62b2b2B66475642f82502989D671fC5855",
    stakingRouter: "0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B",
    governor: "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9",
    liquidityManager: "0xb362Af3da1497A551C08F79bC03CbA12D2b7e908",
    insuranceFund: "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE",
    stabilizer: "0x26D75024c2491636a1A1145a3d6966788EF54667",
    incentiveController: "0x7b06795D31482fef0213b24E8ad5f348692A73BD",
    revenueRouter: "0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0"
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    vault: "0x85fE97c69350Be8B9A6bC026006907E34324CD6A",
    rewardsPool: "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
    yieldDistributor: "0x2085ca5081480e8634eF4295ef477fe8cE97B892",
    achievementNFT: "0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb",
    stakingRouter: "0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64",
    governor: "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854",
    liquidityManager: "0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3",
    insuranceFund: "0x85BB4B6268446a71110db6f296885AA1EE36c695",
    stabilizer: "0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587",
    incentiveController: "0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50",
    revenueRouter: "0xa66CA14df740B142d8E2DE515A8743ad1eE25850"
  }
};

// >>> UPDATE THIS ADDRESS WITH YOUR GNOSIS SAFE MULTISIG <<<
const MULTISIG_ADDRESS = "0xYOUR_GNOSIS_SAFE_ADDRESS_HERE";

async function main() {
  const isBase = network.name === "base";
  const networkName = isBase ? "base" : "arbitrum";
  const contracts = CONTRACTS[networkName];

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Transfer Ownership to Multisig - ${networkName.toUpperCase().padEnd(32, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  if (MULTISIG_ADDRESS === "0xYOUR_GNOSIS_SAFE_ADDRESS_HERE") {
    console.error("❌ ERROR: Please update MULTISIG_ADDRESS in this script first!");
    console.error("   1. Create Gnosis Safe at https://safe.global");
    console.error("   2. Update MULTISIG_ADDRESS constant");
    console.error("   3. Run this script again\n");
    process.exit(1);
  }

  console.log(`New owner (multisig): ${MULTISIG_ADDRESS}\n`);
  console.log(`⚠️  WARNING: This will transfer ownership of ALL contracts!`);
  console.log(`⚠️  Make sure multisig is set up correctly before proceeding.\n`);

  const [deployer] = await ethers.getSigners();
  console.log(`Current deployer: ${deployer.address}\n`);

  // Confirmation check
  console.log("═".repeat(62));
  console.log("PREFLIGHT CHECKS:");
  console.log("═".repeat(62));
  
  // Check if multisig exists
  const multisigCode = await ethers.provider.getCode(MULTISIG_ADDRESS);
  if (multisigCode === "0x") {
    console.error(`❌ Multisig address has no code (not a contract)`);
    console.error(`   Verify address is correct: ${MULTISIG_ADDRESS}\n`);
    process.exit(1);
  }
  console.log(`✓ Multisig contract verified`);

  // Check current ownership
  let allOwnedByDeployer = true;
  for (const [name, address] of Object.entries(contracts)) {
    try {
      const contract = await ethers.getContractAt("Ownable", address);
      const owner = await contract.owner();
      if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
        console.log(`⚠️  ${name}: Already owned by ${owner}`);
        allOwnedByDeployer = false;
      }
    } catch (error) {
      console.log(`⚠️  ${name}: Could not check owner (${error.message})`);
    }
  }

  if (!allOwnedByDeployer) {
    console.log(`\n⚠️  Some contracts not owned by deployer - review above\n`);
  }

  console.log("\n" + "═".repeat(62));
  console.log("TRANSFERRING OWNERSHIP");
  console.log("═".repeat(62) + "\n");

  const contractNames = Object.keys(contracts);
  for (const name of contractNames) {
    const address = contracts[name];
    try {
      console.log(`${name.padEnd(20, ' ')} (${address})`);
      const contract = await ethers.getContractAt("Ownable", address);
      
      // Check current owner
      const currentOwner = await contract.owner();
      if (currentOwner.toLowerCase() === MULTISIG_ADDRESS.toLowerCase()) {
        console.log(`   ✓ Already owned by multisig\n`);
        continue;
      }

      // Transfer ownership
      const tx = await contract.transferOwnership(MULTISIG_ADDRESS);
      console.log(`   ⏳ Transfer tx: ${tx.hash}`);
      await tx.wait();
      
      // Verify
      const newOwner = await contract.owner();
      if (newOwner.toLowerCase() === MULTISIG_ADDRESS.toLowerCase()) {
        console.log(`   ✅ Confirmed: Owned by multisig\n`);
      } else {
        console.log(`   ❌ FAILED: Owner is ${newOwner}\n`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }

  console.log("═".repeat(62));
  console.log("✅ OWNERSHIP TRANSFER COMPLETE");
  console.log("═".repeat(62));
  console.log(`\nAll contracts on ${networkName} now owned by:`);
  console.log(`${MULTISIG_ADDRESS}\n`);
  console.log("Next steps:");
  console.log("1. Verify ownership on block explorer");
  console.log("2. Test multisig can execute transactions");
  console.log("3. Run this script on other network if needed");
  console.log("4. Document multisig signers publicly\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
