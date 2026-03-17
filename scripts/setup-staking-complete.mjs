import hre from "hardhat";
const { ethers, network } = hre;

const CONTRACTS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    onbt: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5"
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    onbt: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C"
  }
};

// Configure amounts here
const REWARD_POOL_FUND = ethers.utils.parseEther("1000000"); // 1M ONBT per chain
const STAKE_AMOUNT = ethers.utils.parseEther("10000000"); // 10M ONBT per chain
const LOCKUP = 0; // No lockup

async function main() {
  const isBase = network.name === "base";
  const config = CONTRACTS[network.name];
  const networkName = network.name.toUpperCase();

  if (!config) {
    console.error(`Unsupported network: ${network.name}`);
    process.exit(1);
  }

  console.log(`\n${"═".repeat(70)}`);
  console.log(`  ONBT DEPLOYMENT SETUP - ${networkName}`);
  console.log(`${"═".repeat(70)}\n`);

  const [deployer] = await ethers.getSigners();
  const onbt = await ethers.getContractAt("IERC20", config.onbt);
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", config.staking);

  console.log(`Deployer: ${deployer.address}`);
  console.log(`Staking: ${config.staking}`);
  console.log(`ONBT: ${config.onbt}\n`);

  // Step 1: Check balances
  console.log("STEP 1: Check Balances");
  console.log("─".repeat(70));
  
  const deployerBalance = await onbt.balanceOf(deployer.address);
  const stakingBalance = await onbt.balanceOf(config.staking);
  const totalStaked = await staking.localTotalStaked();

  console.log(`Deployer ONBT: ${ethers.utils.formatEther(deployerBalance)} ONBT`);
  console.log(`Reward pool: ${ethers.utils.formatEther(stakingBalance)} ONBT`);
  console.log(`Total staked: ${ethers.utils.formatEther(totalStaked)} ONBT\n`);

  const totalNeeded = REWARD_POOL_FUND.add(STAKE_AMOUNT);
  if (deployerBalance.lt(totalNeeded)) {
    console.error(`❌ Insufficient ONBT balance!`);
    console.error(`   Need: ${ethers.utils.formatEther(totalNeeded)} ONBT`);
    console.error(`   Have: ${ethers.utils.formatEther(deployerBalance)} ONBT`);
    console.error(`   Short: ${ethers.utils.formatEther(totalNeeded.sub(deployerBalance))} ONBT\n`);
    process.exit(1);
  }

  // Step 2: Fund reward pool
  console.log("STEP 2: Fund Reward Pool");
  console.log("─".repeat(70));
  console.log(`Transferring ${ethers.utils.formatEther(REWARD_POOL_FUND)} ONBT to reward pool...\n`);

  const fundTx = await onbt.transfer(config.staking, REWARD_POOL_FUND);
  console.log(`⏳ Fund tx: ${fundTx.hash}`);
  await fundTx.wait();
  
  const newRewardBalance = await onbt.balanceOf(config.staking);
  console.log(`✅ Reward pool funded: ${ethers.utils.formatEther(newRewardBalance)} ONBT\n`);

  // Step 3: Approve staking contract
  console.log("STEP 3: Approve Staking Contract");
  console.log("─".repeat(70));
  
  const allowance = await onbt.allowance(deployer.address, config.staking);
  if (allowance.lt(STAKE_AMOUNT)) {
    console.log("Approving staking contract...\n");
    const approveTx = await onbt.approve(config.staking, ethers.constants.MaxUint256);
    console.log(`⏳ Approve tx: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("✅ Approval confirmed\n");
  } else {
    console.log("✅ Already approved\n");
  }

  // Step 4: Stake
  console.log("STEP 4: Stake ONBT");
  console.log("─".repeat(70));
  console.log(`Staking ${ethers.utils.formatEther(STAKE_AMOUNT)} ONBT with lockup=${LOCKUP}...\n`);

  const stakeTx = await staking.stake(STAKE_AMOUNT, LOCKUP);
  console.log(`⏳ Stake tx: ${stakeTx.hash}`);
  await stakeTx.wait();
  console.log("✅ Staking confirmed!\n");

  // Step 5: Verify final state
  console.log("STEP 5: Final State");
  console.log("─".repeat(70));

  const stakeInfo = await staking.getStakeInfo(deployer.address);
  const finalTotalStaked = await staking.localTotalStaked();
  const votingPower = await staking.getVotingPower(deployer.address);
  const baseRewardRate = await staking.baseRewardRate();
  
  console.log(`Your staked: ${ethers.utils.formatEther(stakeInfo.amount)} ONBT`);
  console.log(`Your voting power: ${ethers.utils.formatEther(votingPower)} votes`);
  console.log(`Network total staked: ${ethers.utils.formatEther(finalTotalStaked)} ONBT`);
  console.log(`Reward pool balance: ${ethers.utils.formatEther(newRewardBalance)} ONBT\n`);

  // Calculate daily rewards
  const dailyRewards = stakeInfo.amount.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
  const yearlyRewards = stakeInfo.amount.mul(baseRewardRate).div(10000);

  console.log("💵 Your Reward Projections:");
  console.log(`   Daily: ${ethers.utils.formatEther(dailyRewards)} ONBT`);
  console.log(`   Monthly: ${ethers.utils.formatEther(dailyRewards.mul(30))} ONBT`);
  console.log(`   Yearly (10% APY): ${ethers.utils.formatEther(yearlyRewards)} ONBT\n`);

  // Calculate reward pool runway
  const poolDailyBurn = finalTotalStaked.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
  const daysRemaining = newRewardBalance.div(poolDailyBurn.add(1));
  
  console.log("⏱️  Reward Pool Runway:");
  console.log(`   Daily burn: ${ethers.utils.formatEther(poolDailyBurn)} ONBT/day`);
  console.log(`   Days remaining: ${daysRemaining.toString()} days\n`);

  console.log(`${"═".repeat(70)}`);
  console.log(`  ✅ ${networkName} SETUP COMPLETE`);
  console.log(`${"═".repeat(70)}\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("\n❌ Setup failed:", error.message);
  process.exit(1);
});
