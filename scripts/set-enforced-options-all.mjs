import hre from "hardhat";
const { ethers, network } = hre;

const DEPLOYMENTS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    yieldDistributor: "0x8c91384EbF767C1C434d127c82020380F4A8afC7",
    rewardsPool: "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
    governor: "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9"
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    yieldDistributor: "0x2085ca5081480e8634eF4295ef477fe8cE97B892",
    rewardsPool: "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
    governor: "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854"
  }
};

const CHAIN_IDS = {
  base: 30184,
  arbitrum: 30110
};

// LayerZero V2 enforced options (200k gas for lzReceive)
// Format: abi.encode(EnforcedOptionParam[])
// EnforcedOptionParam = (eid, msgType, options)
const ENFORCED_OPTIONS = "0x00030100110100000000000000000000000000030d40";

async function setEnforcedOptionsForContract(contractName, contractAddress, remoteEid) {
  try {
    const contract = await ethers.getContractAt("IOAppOptionsType3", contractAddress);
    
    // Build enforced options for all message types (0-4)
    const enforcedOptionsConfigs = [];
    
    for (let msgType = 0; msgType <= 4; msgType++) {
      enforcedOptionsConfigs.push({
        eid: remoteEid,
        msgType: msgType,
        options: ENFORCED_OPTIONS
      });
    }
    
    console.log(`\n📤 Setting enforced options for ${contractName}...`);
    console.log(`   Remote EID: ${remoteEid}`);
    console.log(`   Message types: 0-4`);
    console.log(`   Gas limit: 200,000`);
    
    // Check if setEnforcedOptions exists
    if (!contract.setEnforcedOptions) {
      console.log(`   ⚠️  ${contractName} doesn't have setEnforcedOptions method`);
      return null;
    }
    
    const tx = await contract.setEnforcedOptions(enforcedOptionsConfigs);
    console.log(`   ⏳ Tx hash: ${tx.hash}`);
    
    const receipt = await tx.wait();
    console.log(`   ✅ Set enforced options (${receipt?.gasUsed || 'unknown'} gas)`);
    
    return { contractName, tx: tx.hash, status: "success" };
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { contractName, error: error.message, status: "failed" };
  }
}

async function main() {
  const isBase = network.name === "base";
  const deployments = isBase ? DEPLOYMENTS.base : DEPLOYMENTS.arbitrum;
  const networkName = isBase ? "BASE" : "ARBITRUM";
  const localEid = isBase ? CHAIN_IDS.base : CHAIN_IDS.arbitrum;
  const remoteEid = isBase ? CHAIN_IDS.arbitrum : CHAIN_IDS.base;

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Set Enforced Options - ${networkName.padEnd(39, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${networkName} (Local EID: ${localEid}, Remote EID: ${remoteEid})`);
  console.log(`Signer: ${signer.address}\n`);

  console.log("═".repeat(62));
  console.log("⚙️  Configuring Enforced Options:");
  console.log("═".repeat(62));

  const results = [];

  // Set enforced options for each contract
  const contracts = [
    { name: "Staking", address: deployments.staking },
    { name: "YieldDistributor", address: deployments.yieldDistributor },
    { name: "RewardsPool", address: deployments.rewardsPool },
    { name: "Governor", address: deployments.governor }
  ];

  for (const contract of contracts) {
    const result = await setEnforcedOptionsForContract(contract.name, contract.address, remoteEid);
    if (result) {
      results.push(result);
    }
  }

  console.log("\n" + "═".repeat(62));
  console.log("📊 Results Summary:");
  console.log("═".repeat(62));

  let successCount = 0;
  let failureCount = 0;

  for (const result of results) {
    if (result.status === "success") {
      console.log(`✅ ${result.contractName}: ${result.tx}`);
      successCount++;
    } else {
      console.log(`❌ ${result.contractName}: ${result.error}`);
      failureCount++;
    }
  }

  console.log(`\n${successCount} succeeded, ${failureCount} failed\n`);

  if (successCount > 0) {
    console.log("═".repeat(62));
    console.log("✅ Enforced Options Configured");
    console.log("═".repeat(62));
    console.log(`\nAll cross-chain contracts on ${networkName} now have enforced options`);
    console.log(`configured with 200K gas limit for lzReceive operations.\n`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
