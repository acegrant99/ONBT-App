import hre from "hardhat";
const { ethers, network } = hre;

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";
const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

// Lockup period: 2 = 90 days (1.5x rewards bonus)
const LOCKUP_90_DAYS = 2;

async function main() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Lock Stakes for 90 Days - ${networkName.padEnd(35, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [signer] = await ethers.getSigners();
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);

  console.log(`Account: ${signer.address}`);
  console.log(`Network: ${networkName}`);
  console.log(`Staking Contract: ${stakingAddress}\n`);

  // Get current stake info
  const stakeInfo = await staking.getStakeInfo(signer.address);
  const currentStake = stakeInfo[0]; // amount
  const currentLockupEnd = stakeInfo[2]; // lockupEnd
  const currentLockupPeriod = stakeInfo[3]; // lockupPeriod
  const pendingRewards = stakeInfo[4]; // pendingRewards

  console.log("📊 Current Stake Status:");
  console.log(`   Staked amount: ${ethers.utils.formatEther(currentStake)} ONBT`);
  console.log(`   Current lockup: ${currentLockupPeriod === 0 ? "None" : `Period ${currentLockupPeriod}`}`);
  console.log(`   Lockup end: ${currentLockupEnd > 0 ? new Date(currentLockupEnd * 1000).toISOString() : "N/A"}`);
  console.log(`   Pending rewards: ${ethers.utils.formatEther(pendingRewards)} ONBT\n`);

  if (currentStake.eq(0)) {
    console.error("❌ No stake found! Nothing to lock up.\n");
    process.exit(1);
  }

  if (currentLockupPeriod >= LOCKUP_90_DAYS) {
    console.log("✅ Already locked for 90+ days. No action needed.\n");
    process.exit(0);
  }

  // Check if currently locked
  if (currentLockupEnd > 0 && Date.now() / 1000 < currentLockupEnd) {
    console.error("❌ Stake is currently locked. Cannot modify until lockup expires.\n");
    console.error(`   Lockup expires: ${new Date(currentLockupEnd * 1000).toISOString()}\n`);
    process.exit(1);
  }

  console.log("🔄 Process: Unstake → Re-stake with 90-day lockup\n");
  console.log("⚠️  WARNING: This will:");
  console.log("   • Unstake all your tokens");
  console.log("   • Claim any pending rewards");
  console.log("   • Re-stake with 90-day lockup (1.5x rewards bonus)");
  console.log(`   • Lock until: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()}\n`);

  // Step 1: Claim rewards if any
  if (pendingRewards.gt(0)) {
    console.log(`💰 Claiming ${ethers.utils.formatEther(pendingRewards)} ONBT rewards...`);
    const claimTx = await staking.claimRewards();
    console.log(`⏳ Claim tx: ${claimTx.hash}`);
    await claimTx.wait();
    console.log("✅ Rewards claimed\n");
  }

  // Step 2: Unstake all
  console.log(`📤 Unstaking ${ethers.utils.formatEther(currentStake)} ONBT...`);
  let unstakeTx;
  if (isBase) {
    unstakeTx = await staking.unstake(0); // 0 = unstake all
  } else {
    const fee = await staking.quoteStakeSyncFee(signer.address, currentStake, false);
    console.log(`   LZ fee: ${ethers.utils.formatEther(fee.nativeFee)} ETH`);
    unstakeTx = await staking.unstakeWithFee(0, { value: fee.nativeFee }); // 0 = unstake all
  }
  console.log(`⏳ Unstake tx: ${unstakeTx.hash}`);
  await unstakeTx.wait();
  console.log("✅ Unstaked\n");

  // Step 3: Approve if needed
  const allowance = await onbt.allowance(signer.address, stakingAddress);
  if (allowance.lt(currentStake)) {
    console.log("📝 Approving staking contract...");
    const approveTx = await onbt.approve(stakingAddress, ethers.constants.MaxUint256);
    console.log(`⏳ Approve tx: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("✅ Approved\n");
  }

  // Step 4: Re-stake with 90-day lockup
  console.log(`🔒 Re-staking ${ethers.utils.formatEther(currentStake)} ONBT with 90-day lockup...`);
  let stakeTx;
  if (isBase) {
    stakeTx = await staking.stake(currentStake, LOCKUP_90_DAYS);
  } else {
    const fee = await staking.quoteStakeSyncFee(signer.address, currentStake, true);
    console.log(`   LZ fee: ${ethers.utils.formatEther(fee.nativeFee)} ETH`);
    stakeTx = await staking.stakeWithFee(currentStake, LOCKUP_90_DAYS, { value: fee.nativeFee });
  }
  console.log(`⏳ Stake tx: ${stakeTx.hash}`);
  await stakeTx.wait();
  console.log("✅ Re-staked!\n");

  // Get new stake info
  const newStakeInfo = await staking.getStakeInfo(signer.address);
  const newStake = newStakeInfo[0];
  const newLockupEnd = newStakeInfo[2];
  const newLockupPeriod = newStakeInfo[3];

  console.log("═".repeat(62));
  console.log("📊 New Stake Status:");
  console.log("═".repeat(62));
  console.log(`   Staked amount: ${ethers.utils.formatEther(newStake)} ONBT`);
  console.log(`   Lockup period: 90 days (1.5x rewards bonus)`);
  console.log(`   Locked until: ${new Date(newLockupEnd * 1000).toISOString()}`);
  console.log(`   Cannot unstake before: ${new Date(newLockupEnd * 1000).toLocaleDateString()}\n`);

  // Calculate enhanced rewards
  const baseRewardRate = await staking.baseRewardRate(); // 1000 = 10%
  const lockupBonus = await staking.lockupBonuses(LOCKUP_90_DAYS); // 15000 = 1.5x
  const enhancedAPY = baseRewardRate * lockupBonus / 10000 / 100; // Convert to percentage
  const yearlyRewards = newStake.mul(baseRewardRate).mul(lockupBonus).div(10000).div(10000);
  const monthlyRewards = yearlyRewards.div(12);
  const dailyRewards = yearlyRewards.div(365);

  console.log("💵 Enhanced Reward Projections (1.5x bonus):");
  console.log(`   APY: ${enhancedAPY}%`);
  console.log(`   Daily: ${ethers.utils.formatEther(dailyRewards)} ONBT`);
  console.log(`   Monthly: ${ethers.utils.formatEther(monthlyRewards)} ONBT`);
  console.log(`   Yearly: ${ethers.utils.formatEther(yearlyRewards)} ONBT\n`);

  console.log("═".repeat(62));
  console.log("✅ LOCKUP COMPLETE");
  console.log("═".repeat(62));
  console.log(`Your ${ethers.utils.formatEther(currentStake)} ONBT stake on ${networkName}`);
  console.log(`is now locked for 90 days with 1.5x rewards bonus! 🔒\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
