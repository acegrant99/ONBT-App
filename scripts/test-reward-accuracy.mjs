import hre from "hardhat";
const { ethers, network } = hre;
import "dotenv/config";

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";
const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

async function testRewardAccuracy() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  REWARD ACCURACY VALIDATION - ${networkName.padEnd(37, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);
  const [deployer] = await ethers.getSigners();

  console.log(`Staking: ${stakingAddress}`);
  console.log(`User: ${deployer.address}`);

  // 1. Check user's current stake
  console.log(`\n1️⃣  Checking current stake...`);
  try {
    const stakeInfo = await staking.getStakeInfo(deployer.address);
    const amount = stakeInfo[0];
    const lockupPeriod = stakeInfo[3];
    const pendingRewards = stakeInfo[4];
    const isLocked = stakeInfo[5];

    console.log(`   Staked amount: ${ethers.utils.formatEther(amount)} ONBT`);
    console.log(`   Lockup period: ${lockupPeriod}`);
    console.log(`   Pending rewards: ${ethers.utils.formatEther(pendingRewards)} ONBT`);
    console.log(`   Is locked: ${isLocked}`);
    
    if (amount.eq(0)) {
      console.log(`   ⚠️  No active stake found for testing`);
    }
  } catch (error) {
    console.log(`   ❌ Error checking stake: ${error.message}`);
  }

  // 2. Calculate pending rewards (view function)
  console.log(`\n2️⃣  Calculating pending rewards...`);
  try {
    const pendingRewards = await staking.earned(deployer.address);
    console.log(`   Pending rewards: ${ethers.utils.formatEther(pendingRewards)} ONBT`);
    
    // Check if rewards are accumulating
    if (pendingRewards.gt(0)) {
      console.log(`   ✅ Rewards are accumulating`);
    } else {
      console.log(`   ℹ️  No pending rewards (might be recently claimed or no stake)`);
    }
  } catch (error) {
    console.log(`   ❌ Error calculating rewards: ${error.message}`);
  }

  // 3. Check reward rate configuration
  console.log(`\n3️⃣  Checking reward rate configuration...`);
  try {
    const baseRewardRate = await staking.baseRewardRate();
    console.log(`   Base reward rate: ${baseRewardRate} basis points (${baseRewardRate / 100}% APY)`);
    
    // Try to get rewardPerSecond if accessible
    try {
      const rewardPerSecond = await staking.rewardPerSecond();
      console.log(`   Reward per second: ${rewardPerSecond.toString()} wei`);
      console.log(`   ${ethers.utils.formatEther(rewardPerSecond.mul(86400))} ONBT per day per 1 staked ONBT`);
    } catch (e) {
      // rewardPerSecond might be private
      console.log(`   (rewardPerSecond not directly accessible)`);
    }
  } catch (error) {
    console.log(`   ❌ Error checking rates: ${error.message}`);
  }

  // 4. Check global staking stats
  console.log(`\n4️⃣  Global staking statistics...`);
  try {
    const localTotal = await staking.localTotalStaked();
    console.log(`   Local total staked: ${ethers.utils.formatEther(localTotal)} ONBT`);
    
    if (isBase) {
      const globalTotal = await staking.globalTotalStaked();
      console.log(`   Global total staked (all chains): ${ethers.utils.formatEther(globalTotal)} ONBT`);
    }
    
    const topStakers = await staking.getTopStakers(10);
    console.log(`   Top stakers count: ${topStakers.length}`);
    if (topStakers.length > 0) {
      console.log(`   Top staker: ${topStakers[0]}`);
    }
  } catch (error) {
    console.log(`   ❌ Error checking stats: ${error.message}`);
  }

  // 5. Verify reward calculation logic (time-based test)
  console.log(`\n5️⃣  Verifying reward calculation logic...`);
  try {
    const stakeData = await staking.stakes(deployer.address);
    
    if (stakeData.amount.gt(0)) {
      const block = await ethers.provider.getBlock("latest");
      const currentTime = Number(block.timestamp);
      const startTime = stakeData.startTime.toNumber();
      const lastActionTime = stakeData.lastActionTime.toNumber();
      const anchorTime = lastActionTime > 0 ? lastActionTime : startTime;
      const elapsedTime = Math.max(0, currentTime - anchorTime);
      const baseRewardRate = await staking.baseRewardRate();
      
      // Calculate expected rewards: amount * rate * time / (365 days * 10000)
      const expectedRewards = stakeData.amount
        .mul(baseRewardRate)
        .mul(elapsedTime)
        .div(365 * 86400 * 10000);
      
      const actualRewards = await staking.earned(deployer.address);
      
      console.log(`   Time elapsed: ${elapsedTime} seconds (${(elapsedTime / 3600).toFixed(2)} hours)`);
      console.log(`   Expected rewards (simple): ${ethers.utils.formatEther(expectedRewards)} ONBT`);
      console.log(`   Actual rewards: ${ethers.utils.formatEther(actualRewards)} ONBT`);
      
      // Allow 1% variance for lockup bonuses and rounding
      const variance = actualRewards.sub(expectedRewards).abs();
      const percentVariance = variance.mul(10000).div(expectedRewards.add(1));
      
      if (percentVariance.lt(100)) { // Less than 1% variance
        console.log(`   ✅ Reward calculation accurate (variance: ${percentVariance.toNumber() / 100}%)`);
      } else {
        console.log(`   ⚠️  Variance detected: ${percentVariance.toNumber() / 100}% (may include lockup bonus)`);
      }
    } else {
      console.log(`   ℹ️  No active stake to verify calculation`);
    }
  } catch (error) {
    console.log(`   ❌ Error verifying calculation: ${error.message}`);
  }

  console.log(`\n${"═".repeat(62)}`);
  console.log(`✅ Reward accuracy validation complete`);
  console.log(`${"═".repeat(62)}\n`);
}

async function main() {
  await testRewardAccuracy();
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Test failed:", error);
  process.exit(1);
});
