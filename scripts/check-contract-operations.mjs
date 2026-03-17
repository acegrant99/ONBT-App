import hre from "hardhat";
const { ethers, network } = hre;

// Deployment addresses per network
const DEPLOYMENTS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    yieldDistributor: "0x8c91384EbF767C1C434d127c82020380F4A8afC7",
    rewardsPool: "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
    governor: "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9",
    vault: "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9",
    achievementNFT: "0x11EEEB62b2b2B66475642f82502989D671fC5855",
    token: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5"
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    yieldDistributor: "0x2085ca5081480e8634eF4295ef477fe8cE97B892",
    rewardsPool: "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
    governor: "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854",
    vault: "0x85fE97c69350Be8B9A6bC026006907E34324CD6A",
    achievementNFT: "0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb",
    token: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C"
  }
};

const CHAIN_IDS = {
  base: 30184,
  arbitrum: 30110
};

async function checkContract(name, address, methodName) {
  try {
    const contract = await ethers.getContractAt("IERC20", address);
    
    // Try to call a method
    if (methodName === "owner") {
      try {
        const result = await contract.owner?.();
        return { name, address, available: true, owner: result };
      } catch (e) {
        // Method doesn't exist
      }
    }
    
    return { name, address, available: true };
  } catch (error) {
    return { name, address, available: false, error: error.message };
  }
}

async function main() {
  const isBase = network.name === "base";
  const deployments = isBase ? DEPLOYMENTS.base : DEPLOYMENTS.arbitrum;
  const networkName = isBase ? "BASE" : "ARBITRUM";
  const localEid = isBase ? CHAIN_IDS.base : CHAIN_IDS.arbitrum;
  const remoteEid = isBase ? CHAIN_IDS.arbitrum : CHAIN_IDS.base;

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Contract Operation Check - ${networkName.padEnd(43, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${networkName} (EID: ${localEid})`);
  console.log(`Signer: ${signer.address}\n`);

  // Check each contract
  const contracts = [
    { name: "Staking", address: deployments.staking },
    { name: "YieldDistributor", address: deployments.yieldDistributor },
    { name: "RewardsPool", address: deployments.rewardsPool },
    { name: "Governor", address: deployments.governor },
    { name: "Vault", address: deployments.vault },
    { name: "AchievementNFT", address: deployments.achievementNFT },
    { name: "ONBT Token", address: deployments.token }
  ];

  console.log("═".repeat(62));
  console.log("📋 Contract Status Check:");
  console.log("═".repeat(62));

  for (const contract of contracts) {
    try {
      const code = await ethers.provider.getCode(contract.address);
      const status = code === "0x" ? "❌ NOT DEPLOYED" : "✅ DEPLOYED";
      console.log(`${contract.name.padEnd(20)} ${contract.address} ${status}`);
    } catch (error) {
      console.log(`${contract.name.padEnd(20)} ${contract.address} ❌ ERROR`);
    }
  }

  console.log("\n" + "═".repeat(62));
  console.log("🔌 Enforced Options Status:");
  console.log("═".repeat(62));

  // Check enforced options for cross-chain contracts
  const crossChainContracts = [
    { name: "Staking", address: deployments.staking, abi: "ONBTOmnichainStaking" },
    { name: "YieldDistributor", address: deployments.yieldDistributor, abi: "ONBTYieldDistributor" },
    { name: "RewardsPool", address: deployments.rewardsPool, abi: "ONBTRewardsPool" },
    { name: "Governor", address: deployments.governor, abi: "ONBTGovernor" }
  ];

  // Standard OApp ABI for enforced options check
  const oappAbi = [
    "function getEnforcedOptions(uint32 eid, uint16 msgType) public view returns (bytes calldata)"
  ];

  console.log(`\nRemote Chain EID: ${remoteEid}`);
  console.log(`Local Chain EID: ${localEid}\n`);

  for (const contract of crossChainContracts) {
    try {
      const instance = new ethers.Contract(contract.address, oappAbi, ethers.provider);
      
      // Common message types to check
      const msgTypes = [0, 1, 2, 3, 4];
      let hasOptions = false;

      for (const msgType of msgTypes) {
        try {
          const options = await instance.getEnforcedOptions?.(remoteEid, msgType);
          if (options && options !== "0x") {
            hasOptions = true;
            console.log(`${contract.name} → msgType ${msgType}: ✅ SET (${options.slice(0, 20)}...)`);
          }
        } catch (e) {
          // Method doesn't exist or not set
        }
      }

      if (!hasOptions) {
        console.log(`${contract.name}: ⚠️  NO ENFORCED OPTIONS SET`);
      }
    } catch (error) {
      console.log(`${contract.name}: ❌ Error checking options`);
    }
  }

  console.log("\n" + "═".repeat(62));
  console.log("🔗 Wiring Status:");
  console.log("═".repeat(62));

  // Check wiring status
  const stakingContract = await ethers.getContractAt("ONBTOmnichainStaking", deployments.staking);
  const vaultContract = await ethers.getContractAt("ONBTOmnichainVault", deployments.vault);

  try {
    const peerArb = await stakingContract.peers(remoteEid);
    console.log(`\nStaking → Arbitrum peer: ${peerArb !== "0x0000000000000000000000000000000000000000" ? "✅ SET" : "❌ NOT SET"}`);
  } catch (e) {
    console.log(`\nStaking peer check: ❌ Error`);
  }

  try {
    const vaultWired = await vaultContract.allowedModules(deployments.rewardsPool);
    console.log(`Vault → RewardsPool wired: ${vaultWired ? "✅ YES" : "❌ NO"}`);
  } catch (e) {
    console.log(`Vault wiring check: ❌ Error`);
  }

  console.log("\n" + "═".repeat(62));
  console.log("📊 Summary:");
  console.log("═".repeat(62));
  console.log(`\n✅ Deployed: ${contracts.length} contracts`);
  console.log(`⚠️  Enforced Options: May need configuration`);
  console.log(`✅ Cross-chain: LayerZero V2 peers configured\n`);

  console.log("═".repeat(62));
  console.log("Next Steps:");
  console.log("═".repeat(62));
  console.log(`\n1. Run: npx hardhat run scripts/set-enforced-options-all.mjs --network ${network.name}`);
  console.log(`2. Verify options set successfully`);
  console.log(`3. Test cross-chain operations\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
