import hre from "hardhat";
const { ethers } = hre;

const NETWORKS = {
  base: {
    staking: "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe",
    onbt: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
    rewardsPool: "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85",
    rpc: "https://mainnet.base.org"
  },
  arbitrum: {
    staking: "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44",
    onbt: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
    rewardsPool: "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1",
    rpc: "https://arb1.arbitrum.io/rpc"
  }
};

async function getChainData(networkName, addresses) {
  const provider = new ethers.providers.JsonRpcProvider(addresses.rpc);
  const staking = new ethers.Contract(
    addresses.staking,
    ["function getStakeInfo(address) view returns (uint256,uint256,uint256,uint8,uint256,bool)",
     "function localTotalStaked() view returns (uint256)",
     "function globalTotalStaked() view returns (uint256)",
     "function baseRewardRate() view returns (uint256)"],
    provider
  );
  const onbt = new ethers.Contract(
    addresses.onbt,
    ["function balanceOf(address) view returns (uint256)"],
    provider
  );

  const [signer] = await hre.ethers.getSigners();
  const signerAddress = signer.address;

  const [stakeInfo, totalStaked, rewardPoolBalance, globalStaked, rewardRate] = await Promise.all([
    staking.getStakeInfo(signerAddress),
    staking.localTotalStaked(),
    onbt.balanceOf(addresses.rewardsPool),
    networkName === "base" ? staking.globalTotalStaked() : Promise.resolve(ethers.BigNumber.from(0)),
    staking.baseRewardRate()
  ]);

  return {
    staked: stakeInfo[0],
    lockupEnd: stakeInfo[2],
    lockupPeriod: stakeInfo[3],
    pendingRewards: stakeInfo[4],
    isLocked: stakeInfo[5],
    totalStaked,
    rewardPoolBalance,
    globalStaked,
    rewardRate
  };
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║              ONBT Staking Dashboard                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const [signer] = await ethers.getSigners();
  console.log(`Account: ${signer.address}`);
  console.log(`Date: ${new Date().toISOString()}\n`);

  // Fetch data from both chains in parallel
  console.log("⏳ Fetching data from Base and Arbitrum...\n");
  const [baseData, arbitrumData] = await Promise.all([
    getChainData("base", NETWORKS.base),
    getChainData("arbitrum", NETWORKS.arbitrum)
  ]);

  const lockupNames = ["None", "30 days", "90 days", "180 days", "365 days"];

  // Base Stats
  console.log("═".repeat(62));
  console.log("🟦 BASE");
  console.log("═".repeat(62));
  console.log(`Your Staked:        ${ethers.utils.formatEther(baseData.staked)} ONBT ${baseData.isLocked ? '🔒' : ''}`);
  console.log(`Lockup Period:      ${lockupNames[baseData.lockupPeriod]}`);
  if (baseData.isLocked) {
    console.log(`Unlock Date:        ${new Date(baseData.lockupEnd * 1000).toLocaleDateString()}`);
    const daysRemaining = Math.ceil((baseData.lockupEnd - Date.now() / 1000) / 86400);
    console.log(`Days Remaining:     ${daysRemaining} days`);
  }
  console.log(`Pending Rewards:    ${ethers.utils.formatEther(baseData.pendingRewards)} ONBT`);
  console.log(`Total Staked:       ${ethers.utils.formatEther(baseData.totalStaked)} ONBT`);
  console.log(`Reward Pool:        ${ethers.utils.formatEther(baseData.rewardPoolBalance)} ONBT`);
  
  const baseDailyBurn = baseData.totalStaked.mul(baseData.rewardRate).div(10000).div(365);
  const baseRunway = baseData.rewardPoolBalance.mul(365).div(baseDailyBurn.gt(0) ? baseDailyBurn : 1);
  console.log(`Daily Burn:         ${ethers.utils.formatEther(baseDailyBurn)} ONBT/day`);
  console.log(`Runway:             ${baseRunway.toString()} days\n`);

  // Arbitrum Stats
  console.log("═".repeat(62));
  console.log("🔷 ARBITRUM");
  console.log("═".repeat(62));
  console.log(`Your Staked:        ${ethers.utils.formatEther(arbitrumData.staked)} ONBT ${arbitrumData.isLocked ? '🔒' : ''}`);
  console.log(`Lockup Period:      ${lockupNames[arbitrumData.lockupPeriod]}`);
  if (arbitrumData.isLocked) {
    console.log(`Unlock Date:        ${new Date(arbitrumData.lockupEnd * 1000).toLocaleDateString()}`);
    const daysRemaining = Math.ceil((arbitrumData.lockupEnd - Date.now() / 1000) / 86400);
    console.log(`Days Remaining:     ${daysRemaining} days`);
  }
  console.log(`Pending Rewards:    ${ethers.utils.formatEther(arbitrumData.pendingRewards)} ONBT`);
  console.log(`Total Staked:       ${ethers.utils.formatEther(arbitrumData.totalStaked)} ONBT`);
  console.log(`Reward Pool:        ${ethers.utils.formatEther(arbitrumData.rewardPoolBalance)} ONBT`);
  
  const arbDailyBurn = arbitrumData.totalStaked.mul(arbitrumData.rewardRate).div(10000).div(365);
  const arbRunway = arbitrumData.rewardPoolBalance.mul(365).div(arbDailyBurn.gt(0) ? arbDailyBurn : 1);
  console.log(`Daily Burn:         ${ethers.utils.formatEther(arbDailyBurn)} ONBT/day`);
  console.log(`Runway:             ${arbRunway.toString()} days\n`);

  // Global Stats
  console.log("═".repeat(62));
  console.log("🌍 GLOBAL STATS");
  console.log("═".repeat(62));
  const yourTotalStaked = baseData.staked.add(arbitrumData.staked);
  const yourTotalPending = baseData.pendingRewards.add(arbitrumData.pendingRewards);
  const totalRewardPool = baseData.rewardPoolBalance.add(arbitrumData.rewardPoolBalance);
  const globalStaked = baseData.globalStaked.gt(0) ? baseData.globalStaked : baseData.totalStaked.add(arbitrumData.totalStaked);
  
  console.log(`Your Total Staked:  ${ethers.utils.formatEther(yourTotalStaked)} ONBT`);
  console.log(`Your Total Pending: ${ethers.utils.formatEther(yourTotalPending)} ONBT`);
  console.log(`Global Total Staked: ${ethers.utils.formatEther(globalStaked)} ONBT`);
  console.log(`Total Reward Pool:  ${ethers.utils.formatEther(totalRewardPool)} ONBT`);
  
  const totalDailyBurn = baseDailyBurn.add(arbDailyBurn);
  const avgRunway = totalRewardPool.mul(365).div(totalDailyBurn.gt(0) ? totalDailyBurn : 1);
  console.log(`Combined Daily Burn: ${ethers.utils.formatEther(totalDailyBurn)} ONBT/day`);
  console.log(`Average Runway:     ${avgRunway.toString()} days (~${Math.floor(avgRunway.toNumber() / 365)} years)\n`);

  // Reward Projections (assuming 1.5x bonus for 90-day lockup)
  const bonusMultiplier = baseData.lockupPeriod === 2 ? 1.5 : 1; // 2 = 90 days
  const dailyRewards = totalDailyBurn.mul(15).div(10); // Apply 1.5x bonus
  const monthlyRewards = dailyRewards.mul(30);
  const yearlyRewards = dailyRewards.mul(365);
  
  console.log("═".repeat(62));
  console.log("💰 YOUR REWARD PROJECTIONS");
  console.log("═".repeat(62));
  console.log(`APY:                15% (1.5x lockup bonus)`);
  console.log(`Daily:              ${ethers.utils.formatEther(dailyRewards)} ONBT`);
  console.log(`Monthly:            ${ethers.utils.formatEther(monthlyRewards)} ONBT`);
  console.log(`Yearly:             ${ethers.utils.formatEther(yearlyRewards)} ONBT`);
  console.log(`90-day Total:       ${ethers.utils.formatEther(dailyRewards.mul(90))} ONBT\n`);

  console.log("═".repeat(62));
  console.log("✅ Dashboard Complete");
  console.log("═".repeat(62) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
