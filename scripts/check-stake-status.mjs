import hre from "hardhat";
const { ethers, network } = hre;

const BASE_STAKING = "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe";
const ARBITRUM_STAKING = "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44";

async function main() {
  const isBase = network.name === "base";
  const stakingAddress = isBase ? BASE_STAKING : ARBITRUM_STAKING;
  const networkName = isBase ? "BASE" : "ARBITRUM";

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Check Stake Status - ${networkName.padEnd(41, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const [signer] = await ethers.getSigners();
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);

  console.log(`Account: ${signer.address}`);
  console.log(`Staking Contract: ${stakingAddress}\n`);

  const stakeInfo = await staking.getStakeInfo(signer.address);
  const amount = stakeInfo[0];
  const startTime = stakeInfo[1];
  const lockupEnd = stakeInfo[2];
  const lockupPeriod = stakeInfo[3];
  const pendingRewards = stakeInfo[4];
  const isLocked = stakeInfo[5];

  const lockupNames = ["None", "30 days", "90 days", "180 days", "365 days"];

  console.log("═".repeat(62));
  console.log("📊 Stake Information:");
  console.log("═".repeat(62));
  console.log(`Staked Amount: ${ethers.utils.formatEther(amount)} ONBT`);
  console.log(`Lockup Period: ${lockupNames[lockupPeriod] || lockupPeriod}`);
  console.log(`Start Time: ${startTime > 0 ? new Date(startTime * 1000).toISOString() : "N/A"}`);
  console.log(`Lockup End: ${lockupEnd > 0 ? new Date(lockupEnd * 1000).toISOString() : "N/A"}`);
  console.log(`Currently Locked: ${isLocked ? "YES 🔒" : "NO"}`);
  console.log(`Pending Rewards: ${ethers.utils.formatEther(pendingRewards)} ONBT`);

  if (isLocked && lockupEnd > 0) {
    const daysRemaining = Math.ceil((lockupEnd - Date.now() / 1000) / 86400);
    console.log(`Days Until Unlock: ${daysRemaining} days`);
  }

  console.log("═".repeat(62));

  const votingPower = await staking.getVotingPower(signer.address);
  const totalStaked = await staking.localTotalStaked();
  
  console.log(`\nVoting Power: ${ethers.utils.formatEther(votingPower)} votes`);
  console.log(`Total Staked on ${networkName}: ${ethers.utils.formatEther(totalStaked)} ONBT\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
