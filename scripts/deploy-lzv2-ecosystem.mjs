import hre from "hardhat";
const { ethers } = hre;
import fs from 'fs';
import path from 'path';

const VALIDATE_ONLY = process.argv.includes('--validate-only') || process.env.VALIDATE_ONLY === 'true';
const parseEther = (value) => (ethers.parseEther ? ethers.parseEther(value) : ethers.utils.parseEther(value));
const formatEther = (value) => (ethers.formatEther ? ethers.formatEther(value) : ethers.utils.formatEther(value));
const waitForDeployment = async (contract) => {
  if (contract.waitForDeployment) {
    await contract.waitForDeployment();
    return;
  }
  await contract.deployed();
};
const getContractAddress = async (contract) => {
  if (contract.getAddress) {
    return contract.getAddress();
  }
  return contract.address;
};

/**
 * Deploy LayerZero V2 Ecosystem Contracts
 * 
 * Deploys the following contracts in order:
 * 1. ONBTOmnichainVault (treasury management)
 * 2. ONBTRewardsPool (auto-refill staking rewards)
 * 3. ONBTYieldDistributor (proportional yield distribution)
 * 4. ONBTAchievementNFT (ONFT721 achievements)
 * 5. ONBTOmnichainStaking (staking with lockups)
 * 6. ONBTStakingRouter (integration coordinator)
 * 7. ONBTGovernor (cross-chain DAO governance)
 * 
 * Configuration:
 * - HUB_CHAIN: Set to true for Base (8453) - hub aggregates data
 * - SPOKE_CHAIN: Set to false for Arbitrum (42161) - spoke reports data
 * 
 * Prerequisites:
 * - ONBT Token must already be deployed (OFT)
 * - LayerZero V2 endpoint addresses configured
 * - Sufficient gas in deployer wallet
 */

// ============ Configuration ============

const IS_HUB_CHAIN = (process.env.IS_HUB_CHAIN ?? "true") === "true";
const DEPLOYMENT_TYPE = IS_HUB_CHAIN ? "HUB (Base 8453)" : "SPOKE (Arbitrum 42161)";

// LayerZero V2 Endpoint addresses
const LZ_ENDPOINTS = {
  base: "0x1a44076050125825900e736c501f859c50fE728c", // Base Mainnet
  arbitrum: "0x1a44076050125825900e736c501f859c50fE728c", // Arbitrum One
  baseSepolia: "0x6EDCE65403992e310A62460808c4b910D972f10f", // Base Sepolia Testnet
  arbitrumSepolia: "0x6EDCE65403992e310A62460808c4b910D972f10f" // Arbitrum Sepolia Testnet
};

// LayerZero V2 EID (Endpoint IDs)
const LZ_EIDS = {
  base: 30184,
  arbitrum: 30110,
  baseSepolia: 40245,
  arbitrumSepolia: 40231
};

// Configuration
const CONFIG = {
  // Vault Configuration
  vault: {
    initialFunding: parseEther("10000000"), // 10M ONBT initial funding
  },
  
  // Rewards Pool Configuration
  rewardsPool: {
    maxRequestAmount: parseEther("100000"), // 100k ONBT max per request
    requestCooldown: 3600, // 1 hour cooldown
    refillThreshold: parseEther("10000"), // Auto-refill when below 10k
    refillAmount: parseEther("50000") // Refill with 50k ONBT
  },
  
  // Staking Configuration
  staking: {
    rewardRate: parseEther("0.001"), // 0.001 ONBT per second base rate
    minimumStake: parseEther("100"), // 100 ONBT minimum
    lockupMultipliers: [10000, 11000, 12500, 15000, 20000] // 1x, 1.1x, 1.25x, 1.5x, 2x
  },
  
  // Governor Configuration
  governor: {
    votingDelay: 1, // 1 block delay before voting starts
    votingPeriod: 50400, // ~7 days (assuming 12s blocks)
    proposalThreshold: parseEther("10000"), // 10k ONBT to create proposal
    quorumPercentage: 4 // 4% quorum requirement
  },
  
  // Achievement NFT Configuration
  achievementNFT: {
    baseURI: "ipfs://QmYourAchievementMetadataHash/",
    maxSupplyPerAchievement: 10000
  }
};

function getDefaultOnbtAddressForNetwork(networkKey) {
  try {
    const oftConfigPath = path.join(process.cwd(), 'config', 'oft-configuration.json');
    const raw = fs.readFileSync(oftConfigPath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed?.oft?.[networkKey]?.address || null;
  } catch {
    return null;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     ONBT LayerZero V2 Ecosystem Deployment                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  
  let networkKey;
  if (chainId === 8453) networkKey = 'base';
  else if (chainId === 42161) networkKey = 'arbitrum';
  else if (chainId === 84532) networkKey = 'baseSepolia';
  else if (chainId === 421614) networkKey = 'arbitrumSepolia';
  else throw new Error(`Unsupported chain ID: ${chainId}`);
  
  const lzEndpoint = LZ_ENDPOINTS[networkKey];
  const localEid = LZ_EIDS[networkKey];
  const peerEid = IS_HUB_CHAIN ? LZ_EIDS.arbitrum : LZ_EIDS.base;
  const hubChainEid = LZ_EIDS.base;

  const expectedHub = networkKey === 'base' || networkKey === 'baseSepolia';
  if (IS_HUB_CHAIN !== expectedHub) {
    console.warn(
      `⚠️  IS_HUB_CHAIN=${IS_HUB_CHAIN} does not match expected role for ${networkKey}.` +
        ` Expected IS_HUB_CHAIN=${expectedHub}.`
    );
  }
  
  console.log("📝 Deployment Info:");
  console.log("   Deployer:", deployer.address);
  console.log("   Network:", networkKey.toUpperCase());
  console.log("   Chain ID:", chainId);
  console.log("   Deployment Type:", DEPLOYMENT_TYPE);
  console.log("   Balance:", formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
  console.log("\n🌐 LayerZero V2 Config:");
  console.log("   Endpoint:", lzEndpoint);
  console.log("   Local EID:", localEid);
  console.log("   Peer EID:", peerEid);
  console.log("   Hub EID:", hubChainEid);
  console.log("");
  
  const deployedContracts = {};
  
  // Get existing ONBT token address (must be deployed first)
  const ONBT_TOKEN = process.env.ONBT_TOKEN_ADDRESS || getDefaultOnbtAddressForNetwork(networkKey);
  if (!ONBT_TOKEN) {
    throw new Error("ONBT token address not found. Set ONBT_TOKEN_ADDRESS or populate config/oft-configuration.json");
  }
  console.log("🪙 Using ONBT Token:", ONBT_TOKEN, "\n");

  if (VALIDATE_ONLY) {
    console.log("✅ Validation-only mode (no transactions will be sent)");
    console.log("   Resolved network:", networkKey);
    console.log("   Resolved ONBT token:", ONBT_TOKEN);
    console.log("   Resolved endpoint:", lzEndpoint);
    console.log("   Resolved local EID:", localEid);
    console.log("   Resolved hub EID:", hubChainEid);
    return;
  }
  
  // ============================================================================
  // STEP 1: Deploy Omnichain Vault
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 1: Deploying ONBTOmnichainVault");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTOmnichainVault = await ethers.getContractFactory("ONBTOmnichainVault");
  const vault = await ONBTOmnichainVault.deploy(
    lzEndpoint,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    deployer.address
  );
  await waitForDeployment(vault);
  deployedContracts.vault = await getContractAddress(vault);
  
  console.log("✅ ONBTOmnichainVault deployed:", deployedContracts.vault);
  console.log("   Role: Omnichain treasury management\n");

  console.log("⚙️  Configuring Vault...");
  await vault.whitelistToken(ONBT_TOKEN, true);
  console.log("   ✓ ONBT whitelisted in vault\n");
  
  // ============================================================================
  // STEP 2: Deploy Omnichain Staking
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 2: Deploying ONBTOmnichainStaking");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTOmnichainStaking = await ethers.getContractFactory("ONBTOmnichainStaking");
  const staking = await ONBTOmnichainStaking.deploy(
    lzEndpoint,
    ONBT_TOKEN,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN
  );
  await waitForDeployment(staking);
  deployedContracts.staking = await getContractAddress(staking);
  
  console.log("✅ ONBTOmnichainStaking deployed:", deployedContracts.staking);
  console.log("   Role: Multi-chain staking with lockup periods\n");
  
  console.log("⚙️  Configuring Staking...");
  await staking.setRewardRate(CONFIG.staking.rewardRate);
  console.log("   ✓ Reward rate:", formatEther(CONFIG.staking.rewardRate), "ONBT/second\n");
  
  // ============================================================================
  // STEP 3: Deploy Rewards Pool
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 3: Deploying ONBTRewardsPool");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTRewardsPool = await ethers.getContractFactory("ONBTRewardsPool");
  const rewardsPool = await ONBTRewardsPool.deploy(
    lzEndpoint,
    ONBT_TOKEN,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    deployedContracts.staking
  );
  await waitForDeployment(rewardsPool);
  deployedContracts.rewardsPool = await getContractAddress(rewardsPool);
  
  console.log("✅ ONBTRewardsPool deployed:", deployedContracts.rewardsPool);
  console.log("   Role: Auto-refill staking contracts with rewards\n");
  
  console.log("⚙️  Configuring Rewards Pool...");
  await rewardsPool.setRateLimits(CONFIG.rewardsPool.maxRequestAmount, CONFIG.rewardsPool.requestCooldown);
  await rewardsPool.setRefillConfig(CONFIG.rewardsPool.refillThreshold, CONFIG.rewardsPool.refillAmount);
  console.log("   ✓ Max request amount:", formatEther(CONFIG.rewardsPool.maxRequestAmount), "ONBT");
  console.log("   ✓ Request cooldown:", CONFIG.rewardsPool.requestCooldown, "seconds");
  console.log("   ✓ Refill threshold:", formatEther(CONFIG.rewardsPool.refillThreshold), "ONBT");
  console.log("   ✓ Refill amount:", formatEther(CONFIG.rewardsPool.refillAmount), "ONBT\n");
  
  // ============================================================================
  // STEP 4: Deploy Yield Distributor
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 4: Deploying ONBTYieldDistributor");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTYieldDistributor = await ethers.getContractFactory("ONBTYieldDistributor");
  const yieldDistributor = await ONBTYieldDistributor.deploy(
    lzEndpoint,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    ONBT_TOKEN
  );
  await waitForDeployment(yieldDistributor);
  deployedContracts.yieldDistributor = await getContractAddress(yieldDistributor);
  
  console.log("✅ ONBTYieldDistributor deployed:", deployedContracts.yieldDistributor);
  console.log("   Role: Proportional yield distribution across chains\n");
  
  // ============================================================================
  // STEP 5: Deploy Achievement NFT (ERC721 OApp)
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 5: Deploying ONBTAchievementNFT");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTAchievementNFT = await ethers.getContractFactory("ONBTAchievementNFT");
  const achievementNFT = await ONBTAchievementNFT.deploy(
    "ONBT Achievements",
    "ONBTA",
    lzEndpoint,
    localEid,
    deployedContracts.staking
  );
  await waitForDeployment(achievementNFT);
  deployedContracts.achievementNFT = await getContractAddress(achievementNFT);
  
  console.log("✅ ONBTAchievementNFT deployed:", deployedContracts.achievementNFT);
  console.log("   Role: Cross-chain portable achievement NFTs\n");
  // Link staking to achievement NFT
  await staking.setAchievementNFT(deployedContracts.achievementNFT);
  console.log("   ✓ Achievement NFT linked to staking\n");
  
  // ============================================================================
  // STEP 6: Deploy Staking Router
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 6: Deploying ONBTStakingRouter");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTStakingRouter = await ethers.getContractFactory("ONBTStakingRouter");
  const stakingRouter = await ONBTStakingRouter.deploy(
    lzEndpoint,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    deployedContracts.staking,
    deployedContracts.yieldDistributor,
    deployedContracts.rewardsPool
  );
  await waitForDeployment(stakingRouter);
  deployedContracts.stakingRouter = await getContractAddress(stakingRouter);
  
  console.log("✅ ONBTStakingRouter deployed:", deployedContracts.stakingRouter);
  console.log("   Role: Integration coordinator for staking ecosystem\n");
  
  // ============================================================================
  // STEP 7: Deploy Governor (DAO Governance)
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 7: Deploying ONBTGovernor");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTGovernor = await ethers.getContractFactory("ONBTGovernor");
  const governor = await ONBTGovernor.deploy(
    lzEndpoint,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    deployedContracts.staking
  );
  await waitForDeployment(governor);
  deployedContracts.governor = await getContractAddress(governor);
  
  console.log("✅ ONBTGovernor deployed:", deployedContracts.governor);
  console.log("   Role: Cross-chain DAO governance with omnichain voting");
  console.log("   ✓ Voting period:", CONFIG.governor.votingPeriod, "blocks (~7 days)");
  console.log("   ✓ Proposal threshold:", formatEther(CONFIG.governor.proposalThreshold), "ONBT");
  console.log("   ✓ Quorum:", CONFIG.governor.quorumPercentage, "%\n");

  console.log("⚙️  Configuring Governor params...");
  await governor.setGovernanceParams(
    CONFIG.governor.proposalThreshold,
    CONFIG.governor.quorumPercentage * 100,
    CONFIG.governor.votingPeriod,
    CONFIG.governor.votingDelay
  );
  console.log("   ✓ Governance params updated\n");
  
  // ============================================================================
  // STEP 8: Deploy Doorway Modules
  // ============================================================================

  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 8: Deploying Doorway Modules");
  console.log("═══════════════════════════════════════════════════════════\n");

  const ONBTLiquidityManager = await ethers.getContractFactory("ONBTLiquidityManager");
  const liquidityManager = await ONBTLiquidityManager.deploy(lzEndpoint, ONBT_TOKEN);
  await waitForDeployment(liquidityManager);
  deployedContracts.liquidityManager = await getContractAddress(liquidityManager);

  const ONBTInsuranceFund = await ethers.getContractFactory("ONBTInsuranceFund");
  const insuranceFund = await ONBTInsuranceFund.deploy(lzEndpoint, ONBT_TOKEN);
  await waitForDeployment(insuranceFund);
  deployedContracts.insuranceFund = await getContractAddress(insuranceFund);

  const ONBTStabilizer = await ethers.getContractFactory("ONBTStabilizer");
  const stabilizer = await ONBTStabilizer.deploy(lzEndpoint, ONBT_TOKEN);
  await waitForDeployment(stabilizer);
  deployedContracts.stabilizer = await getContractAddress(stabilizer);

  const ONBTIncentiveController = await ethers.getContractFactory("ONBTIncentiveController");
  const incentiveController = await ONBTIncentiveController.deploy(lzEndpoint);
  await waitForDeployment(incentiveController);
  deployedContracts.incentiveController = await getContractAddress(incentiveController);

  const ONBTRevenueRouter = await ethers.getContractFactory("ONBTRevenueRouter");
  const revenueRouter = await ONBTRevenueRouter.deploy(
    lzEndpoint,
    deployedContracts.vault,
    deployedContracts.rewardsPool,
    deployedContracts.insuranceFund
  );
  await waitForDeployment(revenueRouter);
  deployedContracts.revenueRouter = await getContractAddress(revenueRouter);

  console.log("✅ LiquidityManager:", deployedContracts.liquidityManager);
  console.log("✅ InsuranceFund:", deployedContracts.insuranceFund);
  console.log("✅ Stabilizer:", deployedContracts.stabilizer);
  console.log("✅ IncentiveController:", deployedContracts.incentiveController);
  console.log("✅ RevenueRouter:", deployedContracts.revenueRouter, "\n");

  console.log("⚙️  Wiring Doorway Modules...");
  await vault.setLiquidityManager(deployedContracts.liquidityManager);
  await vault.setInsuranceFund(deployedContracts.insuranceFund);
  await vault.setStabilizer(deployedContracts.stabilizer);
  await vault.setRevenueRouter(deployedContracts.revenueRouter);

  await governor.setVault(deployedContracts.vault);
  await governor.setRewardsPool(deployedContracts.rewardsPool);
  await governor.setLiquidityManager(deployedContracts.liquidityManager);
  await governor.setInsuranceFund(deployedContracts.insuranceFund);
  await governor.setStabilizer(deployedContracts.stabilizer);
  await governor.setRevenueRouter(deployedContracts.revenueRouter);
  await governor.setIncentiveController(deployedContracts.incentiveController);

  await rewardsPool.setIncentiveController(deployedContracts.incentiveController);
  console.log("   ✓ Doorway modules wired\n");

  // ============================================================================
  // STEP 9: Configure contract integrations
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 9: Configuring Integrations");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  console.log("⚙️  Wiring contract integrations...");
  await rewardsPool.setStakingContract(deployedContracts.staking);
  await achievementNFT.setStakingContract(deployedContracts.staking);
  await yieldDistributor.addRewardDepositor(deployedContracts.stakingRouter);
  console.log("   ✓ RewardsPool linked to Staking");
  console.log("   ✓ AchievementNFT linked to Staking");
  console.log("   ✓ StakingRouter authorized as YieldDistributor depositor\n");
  
  // ============================================================================
  // STEP 10: Save deployment addresses
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 10: Saving Deployment Addresses");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const deployment = {
    network: networkKey,
    chainId: chainId,
    deploymentType: IS_HUB_CHAIN ? 'hub' : 'spoke',
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    layerZero: {
      endpoint: lzEndpoint,
      eid: localEid,
      peerEid: peerEid
    },
    contracts: {
      onbtToken: ONBT_TOKEN,
      ...deployedContracts
    },
    config: CONFIG
  };
  
  const filename = `deployment-lzv2-${networkKey}-${Date.now()}.json`;
  const filepath = path.join(process.cwd(), 'deploy', filename);
  fs.writeFileSync(filepath, JSON.stringify(deployment, null, 2));
  
  console.log("💾 Deployment saved to:", filename);
  console.log("");
  
  // ============================================================================
  // STEP 11: Display summary
  // ============================================================================
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Deployment Complete! 🎉                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📋 Deployed Contracts:");
  console.log("   ONBTToken:            ", ONBT_TOKEN);
  console.log("   ONBTOmnichainVault:   ", deployedContracts.vault);
  console.log("   ONBTRewardsPool:      ", deployedContracts.rewardsPool);
  console.log("   ONBTYieldDistributor: ", deployedContracts.yieldDistributor);
  console.log("   ONBTAchievementNFT:   ", deployedContracts.achievementNFT);
  console.log("   ONBTOmnichainStaking: ", deployedContracts.staking);
  console.log("   ONBTStakingRouter:    ", deployedContracts.stakingRouter);
  console.log("   ONBTGovernor:         ", deployedContracts.governor);
  console.log("");
  
  console.log("⚠️  NEXT STEPS:");
  console.log("1. Deploy to the peer chain (", IS_HUB_CHAIN ? "Arbitrum" : "Base", ")");
  console.log("2. Run the peer configuration script to connect the chains");
  console.log("3. Fund the Vault and Rewards Pool with ONBT tokens");
  console.log("4. Verify all contracts on block explorers");
  console.log("5. Update the frontend with new contract addresses");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
