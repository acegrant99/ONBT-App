import hre from "hardhat";

async function main() {
  console.log("\n🚀 Deploying ONBT DeFi Factory...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Get ONBT token address from environment or prompt
  const onbtTokenAddress = process.env.ONBT_TOKEN_ADDRESS;
  
  if (!onbtTokenAddress) {
    throw new Error("Please set ONBT_TOKEN_ADDRESS environment variable");
  }

  console.log("📝 Configuration:");
  console.log("  ONBT Token:", onbtTokenAddress);
  console.log();

  // Deploy Factory
  console.log("Deploying ONBTDeFiFactory...");
  const ONBTDeFiFactory = await hre.ethers.getContractFactory("ONBTDeFiFactory");
  const factory = await ONBTDeFiFactory.deploy(onbtTokenAddress);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();

  console.log("✅ ONBTDeFiFactory deployed to:", factoryAddress);
  console.log();

  // Deploy Staking via Factory
  console.log("Deploying Staking contract via Factory...");
  const rewardRate = process.env.REWARD_RATE || hre.ethers.parseEther("0.0001"); // 0.0001 ONBT per second
  const minimumStake = process.env.MINIMUM_STAKE || hre.ethers.parseEther("100"); // 100 ONBT minimum

  const stakingTx = await factory.deployStaking(
    onbtTokenAddress, // reward token (same as staking token)
    rewardRate,
    minimumStake
  );
  const stakingReceipt = await stakingTx.wait();
  
  // Get staking address from event
  const stakingEvent = stakingReceipt.logs.find(log => {
    try {
      const parsed = factory.interface.parseLog(log);
      return parsed?.name === 'StakingDeployed';
    } catch {
      return false;
    }
  });
  const stakingAddress = stakingEvent ? factory.interface.parseLog(stakingEvent).args[0] : null;
  
  console.log("✅ ONBTStaking deployed to:", stakingAddress);
  console.log();

  // Deploy Liquidity Pool via Factory
  console.log("Deploying Liquidity Pool via Factory...");
  const feeRecipient = process.env.FEE_RECIPIENT || deployer.address;
  
  const poolTx = await factory.deployLiquidityPool(feeRecipient);
  const poolReceipt = await poolTx.wait();
  
  // Get pool address from event
  const poolEvent = poolReceipt.logs.find(log => {
    try {
      const parsed = factory.interface.parseLog(log);
      return parsed?.name === 'LiquidityPoolDeployed';
    } catch {
      return false;
    }
  });
  const poolAddress = poolEvent ? factory.interface.parseLog(poolEvent).args[0] : null;
  
  console.log("✅ ONBTLiquidityPool deployed to:", poolAddress);
  console.log();

  // Deploy Yield Distributor via Factory
  console.log("Deploying Yield Distributor via Factory...");
  
  const distributorTx = await factory.deployYieldDistributor();
  const distributorReceipt = await distributorTx.wait();
  
  // Get distributor address from event
  const distributorEvent = distributorReceipt.logs.find(log => {
    try {
      const parsed = factory.interface.parseLog(log);
      return parsed?.name === 'YieldDistributorDeployed';
    } catch {
      return false;
    }
  });
  const distributorAddress = distributorEvent ? factory.interface.parseLog(distributorEvent).args[0] : null;
  
  console.log("✅ ONBTYieldDistributor deployed to:", distributorAddress);
  console.log();

  // Summary
  console.log("═══════════════════════════════════════════════════════");
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("═══════════════════════════════════════════════════════");
  console.log();
  console.log("Contract Addresses:");
  console.log("  Factory:", factoryAddress);
  console.log("  Staking:", stakingAddress);
  console.log("  Liquidity Pool:", poolAddress);
  console.log("  Yield Distributor:", distributorAddress);
  console.log();
  console.log("Configuration:");
  console.log("  ONBT Token:", onbtTokenAddress);
  console.log("  Reward Rate:", hre.ethers.formatEther(rewardRate), "ONBT/second");
  console.log("  Minimum Stake:", hre.ethers.formatEther(minimumStake), "ONBT");
  console.log("  Fee Recipient:", feeRecipient);
  console.log();
  console.log("═══════════════════════════════════════════════════════");
  console.log("✨ NEXT STEPS");
  console.log("═══════════════════════════════════════════════════════");
  console.log();
  console.log("1. Update miniapp/config/contracts.ts with deployed addresses");
  console.log("2. Fund staking contract with reward tokens:");
  console.log(`   ONBT Token.approve(${stakingAddress}, amount)`);
  console.log(`   ONBTStaking.fundRewards(amount)`);
  console.log("3. Add initial liquidity to the pool");
  console.log("4. Test all functions on testnet");
  console.log("5. Deploy miniapp to Vercel");
  console.log();
  console.log("Environment variables for miniapp:");
  console.log(`export NEXT_PUBLIC_ONBT_TOKEN="${onbtTokenAddress}"`);
  console.log(`export NEXT_PUBLIC_STAKING="${stakingAddress}"`);
  console.log(`export NEXT_PUBLIC_POOL="${poolAddress}"`);
  console.log(`export NEXT_PUBLIC_DISTRIBUTOR="${distributorAddress}"`);
  console.log(`export NEXT_PUBLIC_FACTORY="${factoryAddress}"`);
  console.log();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
