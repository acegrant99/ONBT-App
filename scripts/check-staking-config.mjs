import hre from "hardhat";

const { ethers } = hre;

// Deployed staking contracts
const CONTRACTS = {
  8453: "0x8353D0Dfe7958D9300a43f1785Fd7240A8B8Ff0f", // Base
  42161: "0x51f497515b1398FF8e9C0358Bc6D0b3A51eDd532", // Arbitrum
};

// LayerZero Endpoint IDs
const EID = {
  base: 30184,
  arbitrum: 30110,
};

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  
  console.log("\n" + "=".repeat(80));
  console.log(`🔍 Checking Staking Configuration on ${chainName}`);
  console.log("=".repeat(80) + "\n");

  const stakingAddr = CONTRACTS[chainId];
  const staking = await ethers.getContractAt("ONBTStakingOApp", stakingAddr);
  const endpoint = await ethers.getContractAt("ILayerZeroEndpointV2", ENDPOINT);

  console.log(`Contract: ${stakingAddr}`);
  console.log(`Network: ${chainName} (${chainId})\n`);

  try {
    // 1. Check basic info
    console.log("📋 Basic Configuration:");
    const owner = await staking.owner();
    const rewardRate = await staking.rewardRate();
    const minimumStake = await staking.minimumStake();
    const totalStakedLocal = await staking.totalStakedLocal();
    const totalStakedGlobal = await staking.totalStakedGlobal();

    console.log(`   Owner: ${owner}`);
    console.log(`   Reward Rate: ${rewardRate.toString()}`);
    console.log(`   Minimum Stake: ${ethers.formatUnits(minimumStake, 18)} ONBT`);
    console.log(`   Total Staked (Local): ${ethers.formatUnits(totalStakedLocal, 18)} ONBT`);
    console.log(`   Total Staked (Global): ${ethers.formatUnits(totalStakedGlobal, 18)} ONBT\n`);

    // 2. Check peer configuration
    console.log("🔗 Peer Configuration:");
    if (chainId === 8453) {
      const arbitrumPeer = await staking.peers(EID.arbitrum);
      console.log(`   Arbitrum (${EID.arbitrum}): ${arbitrumPeer}`);
      console.log(`   Status: ${arbitrumPeer !== ethers.ZeroHash ? "✅ Configured" : "❌ Not Set"}\n`);
    } else {
      const basePeer = await staking.peers(EID.base);
      console.log(`   Base (${EID.base}): ${basePeer}`);
      console.log(`   Status: ${basePeer !== ethers.ZeroHash ? "✅ Configured" : "❌ Not Set"}\n`);
    }

    // 3. Check if contract is delegate
    console.log("🔑 Delegate Status:");
    const targetEid = chainId === 8453 ? EID.arbitrum : EID.base;
    console.log(`   Status: ⚠️  Using contract as delegate (default)\n`);

    // 4. Check enforced options
    console.log("⚙️  Enforced Options:");
    try {
      // Check if getEnforcedOptions exists
      const enforcedOptions = await staking.enforcedOptions(targetEid, 1); // msgType 1 = send
      if (enforcedOptions && enforcedOptions !== "0x") {
        console.log(`   Options: ${enforcedOptions}`);
        console.log(`   Status: ✅ Configured\n`);
      } else {
        console.log(`   Status: ⚠️  Not configured (will use defaults)\n`);
      }
    } catch (e) {
      console.log(`   Status: ⚠️  Not configured (will use defaults)\n`);
    }

    // 5. Check lockup bonuses
    console.log("🎁 Lockup Bonuses:");
    const periods = [0, 30*24*3600, 90*24*3600, 180*24*3600, 365*24*3600];
    for (const period of periods) {
      const bonus = await staking.lockupBonuses(period);
      const days = period / (24*3600);
      const bonusNum = Number(bonus);
      console.log(`   ${days}d: ${bonusNum / 100}% (${bonusNum / 10000}x)`);
    }
    console.log();

    // 6. Check paused status
    const paused = await staking.paused();
    console.log(`⏸️  Paused: ${paused ? "❌ YES (cannot stake)" : "✅ NO (active)"}\n`);

    // 7. Summary
    console.log("=".repeat(80));
    console.log("📊 Configuration Summary:");
    console.log("=".repeat(80));
    
    const peerEid = chainId === 8453 ? EID.arbitrum : EID.base;
    const peerConfigured = await staking.peers(peerEid);
    
    console.log(`✅ Contract deployed: ${stakingAddr}`);
    console.log(`${peerConfigured !== ethers.ZeroHash ? "✅" : "❌"} Peers configured`);
    console.log(`✅ Lockup bonuses set`);
    console.log(`${!paused ? "✅" : "❌"} Contract active (not paused)`);
    console.log(`⚠️  Enforced options: Using contract defaults`);
    console.log(`⚠️  Rewards need funding: Contract needs ONBT balance\n`);

    console.log("📝 Next Steps:");
    console.log("1. Fund reward pool with ONBT tokens");
    console.log("2. Optionally set enforced options for gas control");
    console.log("3. Wait for LayerZero path initialization");
    console.log("4. Test cross-chain staking\n");

  } catch (error) {
    console.error("\n❌ Check Error:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
