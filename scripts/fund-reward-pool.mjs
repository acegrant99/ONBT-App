import hre from "hardhat";
const { ethers, network } = hre;

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";
const BASE_ONBT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_ONBT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

// Amount to fund (adjust as needed)
const FUND_AMOUNT = ethers.utils.parseEther("1000000"); // 1M ONBT default

async function main() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const onbtAddress = isBase ? BASE_ONBT : ARBITRUM_ONBT;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Fund Reward Pool - ${networkName.padEnd(40, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [deployer] = await ethers.getSigners();
  const onbt = await ethers.getContractAt("IERC20", onbtAddress);
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);

  console.log(`Deployer: ${deployer.address}`);
  console.log(`Staking: ${stakingAddress}`);
  console.log(`ONBT: ${onbtAddress}\n`);

  // Check balances
  const deployerBalance = await onbt.balanceOf(deployer.address);
  const stakingBalance = await onbt.balanceOf(stakingAddress);

  console.log("📊 Current Balances:");
  console.log(`   Deployer: ${ethers.utils.formatEther(deployerBalance)} ONBT`);
  console.log(`   Reward pool: ${ethers.utils.formatEther(stakingBalance)} ONBT\n`);

  if (deployerBalance.lt(FUND_AMOUNT)) {
    console.error(`❌ Insufficient balance!`);
    console.error(`   Need: ${ethers.utils.formatEther(FUND_AMOUNT)} ONBT`);
    console.error(`   Have: ${ethers.utils.formatEther(deployerBalance)} ONBT\n`);
    process.exit(1);
  }

  console.log(`💰 Funding reward pool with ${ethers.utils.formatEther(FUND_AMOUNT)} ONBT...\n`);

  // Transfer ONBT to staking contract
  const tx = await onbt.transfer(stakingAddress, FUND_AMOUNT);
  console.log(`⏳ Transfer tx: ${tx.hash}`);
  await tx.wait();

  // Verify
  const newBalance = await onbt.balanceOf(stakingAddress);
  console.log(`✅ Transfer complete!`);
  console.log(`   New reward pool balance: ${ethers.utils.formatEther(newBalance)} ONBT\n`);

  // Calculate runway
  const totalStaked = await staking.localTotalStaked();
  if (totalStaked.gt(0)) {
    const baseRewardRate = await staking.baseRewardRate();
    const dailyRewards = totalStaked.mul(baseRewardRate).mul(86400).div(365 * 86400 * 10000);
    const daysRemaining = newBalance.div(dailyRewards.add(1));
    
    console.log("⏱️  Reward Pool Runway:");
    console.log(`   Total staked: ${ethers.utils.formatEther(totalStaked)} ONBT`);
    console.log(`   Daily burn: ${ethers.utils.formatEther(dailyRewards)} ONBT`);
    console.log(`   Days remaining: ${daysRemaining.toString()} days\n`);
  } else {
    console.log("ℹ️  No stakers yet - pool is ready for rewards\n");
  }

  console.log("═".repeat(62));
  console.log("✅ REWARD POOL FUNDED");
  console.log("═".repeat(62));
  console.log(`Pool can now pay 10% APY rewards on ${networkName}\n`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Funding failed:", error);
  process.exit(1);
});
