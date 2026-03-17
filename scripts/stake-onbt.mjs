import hre from "hardhat";
const { ethers, network } = hre;

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";
const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

// Amount to stake - 10 million ONBT
const STAKE_AMOUNT = ethers.utils.parseEther("10000000");

// Lockup period (0 = NONE, 1 = 30 days, 2 = 90 days, 3 = 180 days, 4 = 365 days)
const LOCKUP = 0; // No lockup for now

async function main() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Stake ONBT - ${networkName.padEnd(46, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [staker] = await ethers.getSigners();
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);

  console.log(`Staker: ${staker.address}`);
  console.log(`Staking: ${stakingAddress}`);
  console.log(`ONBT: ${onbtAddress}`);
  console.log(`Amount: ${ethers.utils.formatEther(STAKE_AMOUNT)} ONBT`);
  console.log(`Lockup: ${LOCKUP === 0 ? "None" : `${LOCKUP} period`}\n`);

  // Check balance
  const balance = await onbt.balanceOf(staker.address);
  console.log(`Your ONBT balance: ${ethers.utils.formatEther(balance)} ONBT\n`);

  if (balance.lt(STAKE_AMOUNT)) {
    console.error(`❌ Insufficient balance!`);
    console.error(`   Need: ${ethers.utils.formatEther(STAKE_AMOUNT)} ONBT`);
    console.error(`   Have: ${ethers.utils.formatEther(balance)} ONBT\n`);
    process.exit(1);
  }

  // Check allowance
  const allowance = await onbt.allowance(staker.address, stakingAddress);
  
  if (allowance.lt(STAKE_AMOUNT)) {
    console.log("📝 Approving staking contract...");
    const approveTx = await onbt.approve(stakingAddress, ethers.constants.MaxUint256);
    console.log(`⏳ Approve tx: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("✅ Approval confirmed\n");
  } else {
    console.log("✅ Already approved\n");
  }

  // Get current state before staking
  const stakeInfoBefore = await staking.getStakeInfo(staker.address);
  const totalBefore = await staking.localTotalStaked();
  const beforeAmount = stakeInfoBefore[0];
  const beforePending = stakeInfoBefore[4];

  console.log("📊 Before Staking:");
  console.log(`   Your staked: ${ethers.utils.formatEther(beforeAmount)} ONBT`);
  console.log(`   Pending rewards: ${ethers.utils.formatEther(beforePending)} ONBT`);
  console.log(`   Total staked: ${ethers.utils.formatEther(totalBefore)} ONBT\n`);

  // Stake
  console.log(`💰 Staking ${ethers.utils.formatEther(STAKE_AMOUNT)} ONBT...`);
  let stakeTx;
  if (isBase) {
    stakeTx = await staking.stake(STAKE_AMOUNT, LOCKUP);
  } else {
    const fee = await staking.quoteStakeSyncFee(staker.address, STAKE_AMOUNT, true);
    console.log(`   LZ fee: ${ethers.utils.formatEther(fee.nativeFee)} ETH`);
    stakeTx = await staking.stakeWithFee(STAKE_AMOUNT, LOCKUP, { value: fee.nativeFee });
  }
  console.log(`⏳ Stake tx: ${stakeTx.hash}`);
  const receipt = await stakeTx.wait();
  console.log("✅ Stake confirmed!\n");

  // Get state after staking
  const stakeInfoAfter = await staking.getStakeInfo(staker.address);
  const totalAfter = await staking.localTotalStaked();
  const votingPower = await staking.getVotingPower(staker.address);
  const afterAmount = stakeInfoAfter[0];
  const afterPending = stakeInfoAfter[4];

  console.log("═".repeat(62));
  console.log("📊 After Staking:");
  console.log("═".repeat(62));
  console.log(`   Your staked: ${ethers.utils.formatEther(afterAmount)} ONBT`);
  console.log(`   Your voting power: ${ethers.utils.formatEther(votingPower)} votes`);
  console.log(`   Total staked: ${ethers.utils.formatEther(totalAfter)} ONBT`);
  console.log(`   Pending rewards: ${ethers.utils.formatEther(afterPending)} ONBT\n`);

  // Check if made it to leaderboard
  try {
    const rank = await staking.getLeaderboardRank(staker.address);
    if (rank.gt(0)) {
      console.log(`🏆 Leaderboard rank: #${rank.toString()}\n`);
    }
  } catch (e) {
    // Not on leaderboard yet
  }

  // Calculate expected daily rewards
  const baseRewardRate = await staking.baseRewardRate();
  const dailyRewards = afterAmount.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
  console.log("💵 Reward Projections:");
  console.log(`   Daily: ${ethers.utils.formatEther(dailyRewards)} ONBT`);
  console.log(`   Monthly: ${ethers.utils.formatEther(dailyRewards.mul(30))} ONBT`);
  console.log(`   Yearly (10% APY): ${ethers.utils.formatEther(afterAmount.mul(baseRewardRate).div(10000))} ONBT\n`);

  console.log("═".repeat(62));
  console.log("✅ STAKING COMPLETE");
  console.log("═".repeat(62));
  console.log(`Successfully staked on ${networkName}!`);
  console.log(`\nNext steps:`);
  console.log(`1. Wait for rewards to accumulate`);
  console.log(`2. Check rewards: staking.earned(yourAddress)`);
  console.log(`3. Claim rewards: staking.claimRewards()`);
  console.log(`4. Or compound: staking.compound() to restake rewards\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Staking failed:", error);
  process.exit(1);
});
