import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-contractfix-1771497364067.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-contractfix-1771497392397.json",
};

const solidityPacked = (types, values) =>
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values);
const getBytes = (value) =>
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value);
const getAddress = (address) =>
  ethers.getAddress ? ethers.getAddress(address) : ethers.utils.getAddress(address);
const zeroPadValue = (value, length) =>
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length);

const buildLzReceiveOptions = (gas, value = 0n) => {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);
  const optionSize = getBytes(option).length + 1;
  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey, peerKey;
  if (chainId === 8453) {
    networkKey = "base";
    peerKey = "arbitrum";
  } else if (chainId === 42161) {
    networkKey = "arbitrum";
    peerKey = "base";
  } else {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║     Configure Redeployed Contracts (contractfix)         ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  console.log(`Network: ${networkKey.toUpperCase()}`);
  console.log(`Deployer: ${deployer.address}\n`);

  const localDeployment = JSON.parse(fs.readFileSync(DEFAULT_DEPLOYMENTS[networkKey], "utf8"));
  const peerDeployment = JSON.parse(fs.readFileSync(DEFAULT_DEPLOYMENTS[peerKey], "utf8"));

  const localEid = localDeployment.layerZero.eid;
  const peerEid = peerDeployment.layerZero.eid;

  const local = {
    yd: localDeployment.contracts.yieldDistributor,
    staking: localDeployment.contracts.staking,
    nft: localDeployment.contracts.achievementNFT,
    router: localDeployment.contracts.stakingRouter,
  };

  const peer = {
    yd: peerDeployment.contracts.yieldDistributor,
    staking: peerDeployment.contracts.staking,
    nft: peerDeployment.contracts.achievementNFT,
  };

  console.log(`Local EID: ${localEid}, Peer EID: ${peerEid}`);
  console.log(`\nLocal Addresses:`);
  console.log(`  YieldDistributor: ${local.yd}`);
  console.log(`  Staking:          ${local.staking}`);
  console.log(`  AchievementNFT:   ${local.nft}`);
  console.log(`  StakingRouter:    ${local.router}`);
  console.log(`\nPeer Addresses:`);
  console.log(`  YieldDistributor: ${peer.yd}`);
  console.log(`  Staking:          ${peer.staking}`);
  console.log(`  AchievementNFT:   ${peer.nft}\n`);

  const abi = [
    "function setPeer(uint32 _eid, bytes32 _peer) external",
    "function addRewardDepositor(address depositor) external",
    "function setEnforcedOptions((uint32 eid, uint16 msgType, bytes options)[] calldata _enforcedOptions) external",
  ];

  const yd = new ethers.Contract(local.yd, abi, deployer);
  const staking = new ethers.Contract(local.staking, abi, deployer);
  const nft = new ethers.Contract(local.nft, abi, deployer);

  console.log("═══════════════════════════════════════════════════════════");
  console.log("1. Wiring Peers");
  console.log("═══════════════════════════════════════════════════════════\n");

  try {
    const peerYdBytes32 = zeroPadValue(peer.yd, 32);
    const tx1 = await yd.setPeer(peerEid, peerYdBytes32, { gasLimit: 300000 });
    await tx1.wait();
    console.log(`✅ YieldDistributor peer set (tx: ${tx1.hash})`);
  } catch (error) {
    console.log(`❌ YieldDistributor peer failed: ${error.message.slice(0, 100)}`);
  }

  try {
    const peerStakingBytes32 = zeroPadValue(peer.staking, 32);
    const tx2 = await staking.setPeer(peerEid, peerStakingBytes32, { gasLimit: 300000 });
    await tx2.wait();
    console.log(`✅ Staking peer set (tx: ${tx2.hash})`);
  } catch (error) {
    console.log(`❌ Staking peer failed: ${error.message.slice(0, 100)}`);
  }

  try {
    const peerNftBytes32 = zeroPadValue(peer.nft, 32);
    const tx3 = await nft.setPeer(peerEid, peerNftBytes32, { gasLimit: 300000 });
    await tx3.wait();
    console.log(`✅ AchievementNFT peer set (tx: ${tx3.hash})\n`);
  } catch (error) {
    console.log(`❌ AchievementNFT peer failed: ${error.message.slice(0, 100)}\n`);
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log("2. Configuring YieldDistributor Depositors");
  console.log("═══════════════════════════════════════════════════════════\n");

  try {
    const tx4 = await yd.addRewardDepositor(local.router, { gasLimit: 200000 });
    await tx4.wait();
    console.log(`✅ StakingRouter added as depositor (tx: ${tx4.hash})\n`);
  } catch (error) {
    console.log(`❌ Add depositor failed: ${error.message.slice(0, 100)}\n`);
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log("3. Setting Enforced Options");
  console.log("═══════════════════════════════════════════════════════════\n");

  const options = buildLzReceiveOptions(200000n, 0n);
  console.log(`Options: ${options}\n`);

  // YieldDistributor: MSG_SYNC_SHARES=1, MSG_DISTRIBUTE_YIELD=2, MSG_REPORT_CLAIMS=3
  try {
    const ydOptions = [
      { eid: peerEid, msgType: 1, options },
      { eid: peerEid, msgType: 2, options },
      { eid: peerEid, msgType: 3, options },
    ];
    const tx5 = await yd.setEnforcedOptions(ydOptions, { gasLimit: 500000 });
    await tx5.wait();
    console.log(`✅ YieldDistributor enforced options set (tx: ${tx5.hash})`);
  } catch (error) {
    console.log(`❌ YieldDistributor enforced options failed: ${error.message.slice(0, 100)}`);
  }

  // Staking: MSG_STAKE=1, MSG_UNSTAKE=2, MSG_SYNC_REWARDS=3, MSG_CLAIM_REWARDS=4, MSG_COMPOUND=5
  try {
    const stakingOptions = [
      { eid: peerEid, msgType: 1, options },
      { eid: peerEid, msgType: 2, options },
      { eid: peerEid, msgType: 3, options },
      { eid: peerEid, msgType: 4, options },
      { eid: peerEid, msgType: 5, options },
    ];
    const tx6 = await staking.setEnforcedOptions(stakingOptions, { gasLimit: 500000 });
    await tx6.wait();
    console.log(`✅ Staking enforced options set (tx: ${tx6.hash})`);
  } catch (error) {
    console.log(`❌ Staking enforced options failed: ${error.message.slice(0, 100)}`);
  }

  // AchievementNFT: ONFT send msgType=1
  try {
    const nftOptions = [
      { eid: peerEid, msgType: 1, options },
    ];
    const tx7 = await nft.setEnforcedOptions(nftOptions, { gasLimit: 500000 });
    await tx7.wait();
    console.log(`✅ AchievementNFT enforced options set (tx: ${tx7.hash})\n`);
  } catch (error) {
    console.log(`❌ AchievementNFT enforced options failed: ${error.message.slice(0, 100)}\n`);
  }

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║               Configuration Complete! 🎉                   ║");
  console.log("║     Contracts wired, depositors added, options set         ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Configuration failed:", error);
  process.exit(1);
});
