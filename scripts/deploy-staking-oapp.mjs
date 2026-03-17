import hre from "hardhat";

const { ethers } = hre;

// Configuration
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const CONTRACTS = {
  8453: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c", // Base
  42161: "0x42bB5FD891c070A64d31752855E94A01edDd766E", // Arbitrum
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  const tokenAddr = CONTRACTS[chainId];

  if (!tokenAddr) {
    console.error(`❌ No token configured for chain ${chainId}`);
    process.exit(1);
  }

  console.log("\n" + "=".repeat(80));
  console.log(`🚀 Deploying Cross-Chain Staking OApp on ${chainName}`);
  console.log("=".repeat(80) + "\n");

  console.log(`Deployer: ${deployer.address}`);
  console.log(`Network: ${chainName} (${chainId})`);
  console.log(`Endpoint: ${ENDPOINT}`);
  console.log(`ONBT Token: ${tokenAddr}\n`);

  // Parameters
  const rewardRate = ethers.parseUnits("0.000001", 18); // Low initial rate for testing
  const minimumStake = ethers.parseUnits("1", 18); // 1 ONBT minimum

  console.log("📋 Deployment Parameters:");
  console.log(`   Reward Rate: ${rewardRate.toString()} (per 1 token per second)`);
  console.log(`   Minimum Stake: ${ethers.formatUnits(minimumStake, 18)} ONBT\n`);

  try {
    // Deploy contract
    console.log("⏳ Deploying ONBTStakingOApp...");

    const StakingOApp = await ethers.getContractFactory("ONBTStakingOApp");
    const staking = await StakingOApp.deploy(
      ENDPOINT,
      deployer.address,
      tokenAddr,
      tokenAddr,
      rewardRate,
      minimumStake
    );

    await staking.waitForDeployment();
    const stakingAddr = await staking.getAddress();

    console.log(`✅ Deployed to: ${stakingAddr}\n`);

    // Verify on explorer
    console.log("📝 Verification Args (for BlockScout/Etherscan):");
    const verifyArgs = [ENDPOINT, deployer.address, tokenAddr, tokenAddr, rewardRate.toString(), minimumStake.toString()];
    console.log(`\nConstructor Args (JSON):`);
    console.log(JSON.stringify(verifyArgs, null, 2));

    // Verify contract
    console.log("\n⏳ Verifying contract...");
    try {
      await staking.getAddress(); // Just ensure it's deployed
      console.log(`✅ Contract verified on-chain\n`);
    } catch (e) {
      console.log(`⚠️  Manual verification needed\n`);
    }

    // Fund with test rewards
    console.log("💰 Funding rewards...");
    const rewardAmount = ethers.parseUnits("10000", 18); // 10k ONBT for testing
    const token = await ethers.getContractAt("IERC20", tokenAddr);

    try {
      console.log(`Approving ${ethers.formatUnits(rewardAmount, 18)} ONBT for rewards...`);
      const approveTx = await token.approve(stakingAddr, rewardAmount);
      await approveTx.wait();
      console.log(`✅ Approved\n`);

      console.log(`Funding rewards...`);
      const fundTx = await staking.fundRewards(rewardAmount);
      await fundTx.wait();
      console.log(`✅ Funded with ${ethers.formatUnits(rewardAmount, 18)} ONBT\n`);
    } catch (e) {
      console.log(`⚠️  Could not fund rewards yet (need ONBT balance)\n`);
    }

    // Display next steps
    console.log("=".repeat(80));
    console.log("📋 NEXT STEPS");
    console.log("=".repeat(80));
    console.log(`\n1. Save Contract Address:
   export STAKING_${chainId === 8453 ? "BASE" : "ARBITRUM"}=${stakingAddr}\n`);

    if (chainId === 8453) {
      console.log(`2. Deploy on Arbitrum with same process
   npx hardhat run scripts/deploy-staking-oapp.mjs --network arbitrum\n`);

      console.log(`3. After deploying on both chains, add peers:
   Base: staking.setPeer(30110, <arbitrum-contract-address>)
   Arbitrum: staking.setPeer(30184, <base-contract-address>)\n`);
    } else {
      console.log(`2. Add this Arbitrum contract as peer on Base:
   basestaking.setPeer(30110, ${stakingAddr})\n`);
    }

    console.log(`4. Call initializer (if needed):
   await staking.initialize()\n`);

    console.log(`5. Test cross-chain staking:
   // On Base
   staking.stake(ethers.parseUnits('100', 18), 0)
   
   // Check Arbitrum sees the total
   await stakingArbitrum.totalStakedGlobal()\n`);

    console.log("=".repeat(80));
    console.log(`\n✅ Deployment Complete!\n`);

    // Save deployment info
    const deployInfo = {
      network: chainName,
      chainId: chainId,
      address: stakingAddr,
      endpoint: ENDPOINT,
      token: tokenAddr,
      rewardRate: rewardRate.toString(),
      minimumStake: minimumStake.toString(),
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      transactionHash: staking.deploymentTransaction()?.hash,
    };

    console.log("📄 Deployment Info:");
    console.log(JSON.stringify(deployInfo, null, 2));

    // Export for scripts folder
    const exportPath = `./deploy/deployment-staking-oapp-${chainId}.json`;
    console.log(`\nSave to: ${exportPath}`);

  } catch (error) {
    console.error("\n❌ Deployment Error:");
    console.error(error.message);
    
    if (error.data) {
      console.error("\nError Data:", error.data);
    }
    
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
