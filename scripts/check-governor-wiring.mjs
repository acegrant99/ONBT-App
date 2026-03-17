import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-governorfix-1771472126318.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-governorfix-1771472201577.json",
};

const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);
const zeroPadValue = (value, length) =>
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length);

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const governorAddress = deployment.contracts.governor;
  const stakingAddress = deployment.contracts.staking;
  const peerEid = deployment.layerZero.peerEid;

  console.log(`\nGovernor wiring on ${networkKey.toUpperCase()} (chainId ${chainId})`);
  console.log(`Deployment file: ${deploymentPath}`);
  console.log(`Governor: ${governorAddress}`);
  console.log(`Staking:  ${stakingAddress}`);
  console.log(`Peer EID: ${peerEid}`);

  const governorAbi = [
    "function localEid() external view returns (uint32)",
    "function hubChainEid() external view returns (uint32)",
    "function isHub() external view returns (bool)",
    "function stakingContract() external view returns (address)",
    "function vault() external view returns (address)",
    "function rewardsPool() external view returns (address)",
    "function liquidityManager() external view returns (address)",
    "function insuranceFund() external view returns (address)",
    "function stabilizer() external view returns (address)",
    "function revenueRouter() external view returns (address)",
    "function incentiveController() external view returns (address)",
    "function proposalThreshold() external view returns (uint256)",
    "function quorumPercentage() external view returns (uint256)",
    "function votingPeriod() external view returns (uint256)",
    "function timelockDelay() external view returns (uint256)",
    "function peers(uint32 eid) external view returns (bytes32)",
    "function chainVotingPower(uint32 eid) external view returns (uint256)"
  ];

  const stakingAbi = [
    "function getVotingPower(address user) external view returns (uint256)",
    "function getStakedBalance(address user) external view returns (uint256)",
    "function totalVotingPower() external view returns (uint256)",
  ];

  const governor = new ethers.Contract(governorAddress, governorAbi, ethers.provider);
  const staking = new ethers.Contract(stakingAddress, stakingAbi, ethers.provider);

  const governorCode = await ethers.provider.getCode(governorAddress);
  if (governorCode === "0x") {
    throw new Error("Governor address has no code on this network. Check deployment file.");
  }

  const localEid = await governor.localEid();
  const hubEid = await governor.hubChainEid();
  const isHub = await governor.isHub();
  const stakingContract = await governor.stakingContract();
  const peerGovernor = await governor.peers(peerEid);

  console.log(`\nLocal EID: ${localEid}`);
  console.log(`Hub EID: ${hubEid}`);
  console.log(`Is Hub: ${isHub}`);
  console.log(`Governor.stakingContract: ${stakingContract}`);
  console.log(`Staking matches deployment: ${stakingContract.toLowerCase() === stakingAddress.toLowerCase()}`);

  const expectedPeer = zeroPadValue(
    deployment.contracts.governor,
    32
  ).toLowerCase();
  const peerLower = peerGovernor.toLowerCase();
  console.log(`Governor peer for ${peerEid}: ${peerGovernor}`);
  console.log(`Peer set: ${peerLower !== zeroPadValue("0x0000000000000000000000000000000000000000", 32).toLowerCase()}`);

  const [vault, rewardsPool, liquidityManager, insuranceFund, stabilizer, revenueRouter, incentiveController] = await Promise.all([
    governor.vault(),
    governor.rewardsPool(),
    governor.liquidityManager(),
    governor.insuranceFund(),
    governor.stabilizer(),
    governor.revenueRouter(),
    governor.incentiveController(),
  ]);

  console.log("\nGovernor module wiring:");
  console.log(`  Vault: ${vault}`);
  console.log(`  RewardsPool: ${rewardsPool}`);
  console.log(`  LiquidityManager: ${liquidityManager}`);
  console.log(`  InsuranceFund: ${insuranceFund}`);
  console.log(`  Stabilizer: ${stabilizer}`);
  console.log(`  RevenueRouter: ${revenueRouter}`);
  console.log(`  IncentiveController: ${incentiveController}`);

  const [proposalThreshold, quorumPercentage, votingPeriod, timelockDelay] = await Promise.all([
    governor.proposalThreshold(),
    governor.quorumPercentage(),
    governor.votingPeriod(),
    governor.timelockDelay(),
  ]);

  console.log("\nGovernance params:");
  console.log(`  Proposal threshold: ${formatUnits(proposalThreshold, 18)} ONBT`);
  console.log(`  Quorum (bps): ${quorumPercentage}`);
  console.log(`  Voting period (blocks): ${votingPeriod}`);
  console.log(`  Timelock (seconds): ${timelockDelay}`);

  console.log("\nStaking voting power:");
  try {
    const userVotes = await staking.getVotingPower(signer.address);
    console.log(`  User voting power: ${formatUnits(userVotes, 18)} ONBT`);
  } catch (error) {
    console.log("  User voting power: unavailable (getVotingPower missing)");
  }

  try {
    const totalVotingPower = await staking.totalVotingPower();
    console.log(`  Total voting power: ${formatUnits(totalVotingPower, 18)} ONBT`);
  } catch (error) {
    console.log("  Total voting power: unavailable (totalVotingPower missing)");
  }

  try {
    const stakingBalanceAbi = ["function getStakedBalance(address user) external view returns (uint256)"];
    const stakingBalance = new ethers.Contract(stakingAddress, stakingBalanceAbi, ethers.provider);
    const stakedBalance = await stakingBalance.getStakedBalance(signer.address);
    console.log(`  User staked balance: ${formatUnits(stakedBalance, 18)} ONBT`);
  } catch (error) {
    console.log("  User staked balance: unavailable (getStakedBalance missing)");
  }

  try {
    const stakingVotesAbi = ["function getVotes(address user) external view returns (uint256)"];
    const stakingVotes = new ethers.Contract(stakingAddress, stakingVotesAbi, ethers.provider);
    const votes = await stakingVotes.getVotes(signer.address);
    console.log(`  getVotes(): ${formatUnits(votes, 18)} ONBT`);
  } catch (error) {
    console.log("  getVotes(): not implemented on staking contract");
  }

  const chainVotingPower = await governor.chainVotingPower(peerEid);
  console.log(`\nChain voting power for ${peerEid}: ${formatUnits(chainVotingPower, 18)} ONBT`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Governor wiring check failed:", error);
  process.exit(1);
});
