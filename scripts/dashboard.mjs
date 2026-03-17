import hre from "hardhat";
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const formatEther = (value) => (isV6 ? ethers.formatEther(value) : ethers.utils.formatEther(value));
const parseEther = (value) => (isV6 ? ethers.parseEther(value) : ethers.utils.parseEther(value));
const bnFrom = (value) => (isV6 ? BigInt(value) : ethers.BigNumber.from(value));
const add = (a, b) => (isV6 ? a + b : a.add(b));
const mul = (a, b) => (isV6 ? a * b : a.mul(b));
const div = (a, b) => (isV6 ? a / b : a.div(b));
const gt = (a, b) => (isV6 ? a > b : a.gt(b));
const providerFor = (rpc) => (isV6 ? new ethers.JsonRpcProvider(rpc) : new ethers.providers.JsonRpcProvider(rpc));
const toNumber = (value) => {
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value.toString === 'function') return Number(value.toString());
  return Number(value);
};

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
  const provider = providerFor(addresses.rpc);
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

  const [signer] = await ethers.getSigners();
  const signerAddress = signer.address;

  const [stakeInfo, totalStaked, rewardPoolBalance, globalStaked, rewardRate] = await Promise.all([
    staking.getStakeInfo(signerAddress),
    staking.localTotalStaked(),
    onbt.balanceOf(addresses.rewardsPool),
    networkName === "base" ? staking.globalTotalStaked() : Promise.resolve(bnFrom(0)),
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
  console.log(`Your Staked:        ${formatEther(baseData.staked)} ONBT ${baseData.isLocked ? '🔒' : ''}`);
  console.log(`Lockup Period:      ${lockupNames[baseData.lockupPeriod]}`);
  if (baseData.isLocked) {
    const baseLockupEnd = toNumber(baseData.lockupEnd);
    console.log(`Unlock Date:        ${new Date(baseLockupEnd * 1000).toLocaleDateString()}`);
    const daysRemaining = Math.ceil((baseLockupEnd - Date.now() / 1000) / 86400);
    console.log(`Days Remaining:     ${daysRemaining} days`);
  }
  console.log(`Pending Rewards:    ${formatEther(baseData.pendingRewards)} ONBT`);
  console.log(`Total Staked:       ${formatEther(baseData.totalStaked)} ONBT`);
  console.log(`Reward Pool:        ${formatEther(baseData.rewardPoolBalance)} ONBT`);
  
  const baseDailyBurn = div(div(mul(baseData.totalStaked, baseData.rewardRate), bnFrom(10000)), bnFrom(365));
  const baseRunway = div(mul(baseData.rewardPoolBalance, bnFrom(365)), gt(baseDailyBurn, bnFrom(0)) ? baseDailyBurn : bnFrom(1));
  console.log(`Daily Burn:         ${formatEther(baseDailyBurn)} ONBT/day`);
  console.log(`Runway:             ${baseRunway.toString()} days\n`);

  // Arbitrum Stats
  console.log("═".repeat(62));
  console.log("🔷 ARBITRUM");
  console.log("═".repeat(62));
  console.log(`Your Staked:        ${formatEther(arbitrumData.staked)} ONBT ${arbitrumData.isLocked ? '🔒' : ''}`);
  console.log(`Lockup Period:      ${lockupNames[arbitrumData.lockupPeriod]}`);
  if (arbitrumData.isLocked) {
    const arbLockupEnd = toNumber(arbitrumData.lockupEnd);
    console.log(`Unlock Date:        ${new Date(arbLockupEnd * 1000).toLocaleDateString()}`);
    const daysRemaining = Math.ceil((arbLockupEnd - Date.now() / 1000) / 86400);
    console.log(`Days Remaining:     ${daysRemaining} days`);
  }
  console.log(`Pending Rewards:    ${formatEther(arbitrumData.pendingRewards)} ONBT`);
  console.log(`Total Staked:       ${formatEther(arbitrumData.totalStaked)} ONBT`);
  console.log(`Reward Pool:        ${formatEther(arbitrumData.rewardPoolBalance)} ONBT`);
  
  const arbDailyBurn = div(div(mul(arbitrumData.totalStaked, arbitrumData.rewardRate), bnFrom(10000)), bnFrom(365));
  const arbRunway = div(mul(arbitrumData.rewardPoolBalance, bnFrom(365)), gt(arbDailyBurn, bnFrom(0)) ? arbDailyBurn : bnFrom(1));
  console.log(`Daily Burn:         ${formatEther(arbDailyBurn)} ONBT/day`);
  console.log(`Runway:             ${arbRunway.toString()} days\n`);

  // Global Stats
  console.log("═".repeat(62));
  console.log("🌍 GLOBAL STATS");
  console.log("═".repeat(62));
  const yourTotalStaked = add(baseData.staked, arbitrumData.staked);
  const yourTotalPending = add(baseData.pendingRewards, arbitrumData.pendingRewards);
  const totalRewardPool = add(baseData.rewardPoolBalance, arbitrumData.rewardPoolBalance);
  const globalStaked = gt(baseData.globalStaked, bnFrom(0)) ? baseData.globalStaked : add(baseData.totalStaked, arbitrumData.totalStaked);
  
  console.log(`Your Total Staked:  ${formatEther(yourTotalStaked)} ONBT`);
  console.log(`Your Total Pending: ${formatEther(yourTotalPending)} ONBT`);
  console.log(`Global Total Staked: ${formatEther(globalStaked)} ONBT`);
  console.log(`Total Reward Pool:  ${formatEther(totalRewardPool)} ONBT`);
  
  const totalDailyBurn = add(baseDailyBurn, arbDailyBurn);
  const avgRunway = div(mul(totalRewardPool, bnFrom(365)), gt(totalDailyBurn, bnFrom(0)) ? totalDailyBurn : bnFrom(1));
  console.log(`Combined Daily Burn: ${formatEther(totalDailyBurn)} ONBT/day`);
  console.log(`Average Runway:     ${avgRunway.toString()} days (~${Math.floor(toNumber(avgRunway) / 365)} years)\n`);

  // Reward Projections (assuming 1.5x bonus for 90-day lockup)
  const bonusMultiplier = baseData.lockupPeriod === 2 ? 1.5 : 1; // 2 = 90 days
  const dailyRewards = bonusMultiplier === 1.5 ? div(mul(totalDailyBurn, bnFrom(15)), bnFrom(10)) : totalDailyBurn; // Apply 1.5x bonus
  const monthlyRewards = mul(dailyRewards, bnFrom(30));
  const yearlyRewards = mul(dailyRewards, bnFrom(365));
  
  console.log("═".repeat(62));
  console.log("💰 YOUR REWARD PROJECTIONS");
  console.log("═".repeat(62));
  console.log(`APY:                15% (1.5x lockup bonus)`);
  console.log(`Daily:              ${formatEther(dailyRewards)} ONBT`);
  console.log(`Monthly:            ${formatEther(monthlyRewards)} ONBT`);
  console.log(`Yearly:             ${formatEther(yearlyRewards)} ONBT`);
  console.log(`90-day Total:       ${formatEther(mul(dailyRewards, bnFrom(90)))} ONBT\n`);

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
