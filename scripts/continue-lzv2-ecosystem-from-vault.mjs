import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";
import path from "path";

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

const IS_HUB_CHAIN = (process.env.IS_HUB_CHAIN ?? "true") === "true";

const LZ_ENDPOINTS = {
  base: "0x1a44076050125825900e736c501f859c50fE728c",
  arbitrum: "0x1a44076050125825900e736c501f859c50fE728c",
  baseSepolia: "0x6EDCE65403992e310A62460808c4b910D972f10f",
  arbitrumSepolia: "0x6EDCE65403992e310A62460808c4b910D972f10f"
};

const LZ_EIDS = {
  base: 30184,
  arbitrum: 30110,
  baseSepolia: 40245,
  arbitrumSepolia: 40231
};

const CONFIG = {
  rewardsPool: {
    maxRequestAmount: parseEther("100000"),
    requestCooldown: 3600,
    refillThreshold: parseEther("10000"),
    refillAmount: parseEther("50000")
  },
  staking: {
    rewardRate: parseEther("0.001")
  },
  governor: {
    votingDelay: 1,
    votingPeriod: 50400,
    proposalThreshold: parseEther("10000"),
    quorumPercentage: 4
  }
};

function getDefaultOnbtAddressForNetwork(networkKey) {
  try {
    const oftConfigPath = path.join(process.cwd(), "config", "oft-configuration.json");
    const raw = fs.readFileSync(oftConfigPath, "utf8");
    const parsed = JSON.parse(raw);
    return parsed?.oft?.[networkKey]?.address || null;
  } catch {
    return null;
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for resume flow`);
  }
  return value;
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║  Resume LZV2 Ecosystem (from existing Vault)             ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else if (chainId === 84532) networkKey = "baseSepolia";
  else if (chainId === 421614) networkKey = "arbitrumSepolia";
  else throw new Error(`Unsupported chain ID: ${chainId}`);

  const lzEndpoint = LZ_ENDPOINTS[networkKey];
  const localEid = LZ_EIDS[networkKey];
  const peerEid = IS_HUB_CHAIN ? LZ_EIDS.arbitrum : LZ_EIDS.base;
  const hubChainEid = LZ_EIDS.base;

  const expectedHub = networkKey === "base" || networkKey === "baseSepolia";
  if (IS_HUB_CHAIN !== expectedHub) {
    console.warn(
      `⚠️  IS_HUB_CHAIN=${IS_HUB_CHAIN} does not match expected role for ${networkKey}.` +
        ` Expected IS_HUB_CHAIN=${expectedHub}.`
    );
  }

  const ONBT_TOKEN = process.env.ONBT_TOKEN_ADDRESS || getDefaultOnbtAddressForNetwork(networkKey);
  if (!ONBT_TOKEN) {
    throw new Error("ONBT token address not found. Set ONBT_TOKEN_ADDRESS or populate config/oft-configuration.json");
  }

  const vaultAddress = requireEnv("VAULT_ADDRESS");

  console.log("📝 Resume Info:");
  console.log("   Deployer:", deployer.address);
  console.log("   Network:", networkKey.toUpperCase());
  console.log("   Chain ID:", chainId);
  console.log("   Deployment Type:", IS_HUB_CHAIN ? "HUB" : "SPOKE");
  console.log("   Balance:", formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
  console.log("\n🌐 LayerZero V2 Config:");
  console.log("   Endpoint:", lzEndpoint);
  console.log("   Local EID:", localEid);
  console.log("   Peer EID:", peerEid);
  console.log("   Hub EID:", hubChainEid);
  console.log("\n🪙 Using ONBT Token:", ONBT_TOKEN);
  console.log("\n🔁 Resuming with existing vault:", vaultAddress);
  console.log("");

  const vault = await ethers.getContractAt("ONBTOmnichainVault", vaultAddress);

  console.log("⚙️  Ensuring vault token whitelist...");
  await vault.whitelistToken(ONBT_TOKEN, true);
  console.log("   ✓ ONBT whitelisted in vault\n");

  const deployedContracts = {
    vault: vaultAddress
  };

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

  // ============================================================================
  // STEP 5: Deploy Achievement NFT
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

  // ============================================================================
  // STEP 7: Deploy Governor
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
  // STEP 9: Configure Integrations
  // ============================================================================

  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 9: Configuring Integrations");
  console.log("═══════════════════════════════════════════════════════════\n");

  await rewardsPool.setStakingContract(deployedContracts.staking);
  await achievementNFT.setStakingContract(deployedContracts.staking);
  await yieldDistributor.addRewardDepositor(deployedContracts.stakingRouter);
  await staking.setAchievementNFT(deployedContracts.achievementNFT);

  console.log("   ✓ RewardsPool linked to Staking");
  console.log("   ✓ AchievementNFT linked to Staking");
  console.log("   ✓ StakingRouter authorized as YieldDistributor depositor");
  console.log("   ✓ Staking linked to AchievementNFT\n");

  const deployment = {
    network: networkKey,
    chainId: chainId,
    deploymentType: IS_HUB_CHAIN ? "hub" : "spoke",
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    layerZero: {
      endpoint: lzEndpoint,
      eid: localEid,
      peerEid: peerEid,
      hubEid: hubChainEid
    },
    contracts: {
      onbtToken: ONBT_TOKEN,
      ...deployedContracts
    }
  };

  const filename = `deployment-lzv2-resume-${networkKey}-${Date.now()}.json`;
  const filepath = path.join(process.cwd(), "deploy", filename);
  fs.writeFileSync(filepath, JSON.stringify(deployment, null, 2));

  console.log("💾 Deployment saved to:", filename);
  console.log("\n✅ Resume complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Resume failed:", error);
    process.exit(1);
  });
