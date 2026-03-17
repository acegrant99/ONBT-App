import hre from "hardhat";
const { ethers, network } = hre;

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";
const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

async function main() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Calculate Reward Pool Funding - ${networkName.padEnd(28, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);

  // Get current state
  const localStaked = await staking.localTotalStaked();
  const poolBalance = await onbt.balanceOf(stakingAddress);
  const baseRewardRate = await staking.baseRewardRate();

  console.log("📊 Current State:");
  console.log(`   Staking contract: ${stakingAddress}`);
  console.log(`   ONBT token: ${onbtAddress}`);
  console.log(`   Total staked: ${ethers.utils.formatEther(localStaked)} ONBT`);
  console.log(`   Pool balance: ${ethers.utils.formatEther(poolBalance)} ONBT`);
  console.log(`   APY: ${baseRewardRate / 100}%\n`);

  // Calculate funding needs based on scenarios
  console.log("💰 Funding Requirements:\n");

  const scenarios = [
    { name: "Conservative (100k TVL)", tvl: 100000 },
    { name: "Moderate (500k TVL)", tvl: 500000 },
    { name: "Optimistic (1M TVL)", tvl: 1000000 },
    { name: "Aggressive (5M TVL)", tvl: 5000000 }
  ];

  for (const scenario of scenarios) {
    const tvlWei = ethers.utils.parseEther(scenario.tvl.toString());
    
    // Annual rewards at 10% APY
    const annualRewards = tvlWei.mul(baseRewardRate).div(10000);
    
    // Recommended buffer: 6 months + safety margin
    const sixMonths = annualRewards.div(2);
    const withBuffer = sixMonths.mul(120).div(100); // 20% safety buffer
    
    console.log(`${scenario.name}:`);
    console.log(`   Expected staked: ${scenario.tvl.toLocaleString()} ONBT`);
    console.log(`   Annual rewards: ${ethers.utils.formatEther(annualRewards)} ONBT`);
    console.log(`   6-month need: ${ethers.utils.formatEther(sixMonths)} ONBT`);
    console.log(`   Recommended (with buffer): ${ethers.utils.formatEther(withBuffer)} ONBT`);
    
    if (poolBalance.lt(withBuffer)) {
      const needMore = withBuffer.sub(poolBalance);
      console.log(`   ⚠️  FUND NOW: ${ethers.utils.formatEther(needMore)} ONBT\n`);
    } else {
      console.log(`   ✅ Already funded\n`);
    }
  }

  // Daily burn rate
  if (localStaked.gt(0)) {
    const dailyRewards = localStaked.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
    const daysRemaining = poolBalance.div(dailyRewards.add(1));
    
    console.log("⏱️  Current Runway:");
    console.log(`   Daily rewards: ${ethers.utils.formatEther(dailyRewards)} ONBT/day`);
    console.log(`   Days remaining: ${daysRemaining.toString()} days\n`);
    
    if (daysRemaining.lt(30)) {
      console.log(`   ⚠️  WARNING: Less than 30 days of rewards remaining!`);
    }
  }

  console.log("═".repeat(62));
  console.log("RECOMMENDATION");
  console.log("═".repeat(62));
  
  if (localStaked.eq(0)) {
    console.log("Start with Conservative scenario (pre-fund for 100k ONBT):");
    const conservative = ethers.utils.parseEther("100000").mul(baseRewardRate).div(10000).div(2).mul(120).div(100);
    console.log(`Fund staking contract with: ${ethers.utils.formatEther(conservative)} ONBT`);
    console.log(`\nTo fund:`);
    console.log(`1. Get ONBT tokens in your wallet`);
    console.log(`2. Approve staking contract to spend ONBT`);
    console.log(`3. Transfer to staking contract: ${stakingAddress}\n`);
  } else {
    console.log("Monitor daily and refund when pool drops below 60 days runway\n");
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
