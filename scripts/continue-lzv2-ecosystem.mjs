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
  console.log("║   Resume LayerZero V2 Ecosystem Deployment (Step 6+)      ║");
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
  const stakingAddress = requireEnv("STAKING_ADDRESS");
  const rewardsPoolAddress = requireEnv("REWARDS_POOL_ADDRESS");
  const yieldDistributorAddress = requireEnv("YIELD_DISTRIBUTOR_ADDRESS");
  const achievementNftAddress = requireEnv("ACHIEVEMENT_NFT_ADDRESS");

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
  console.log("\n🔁 Resuming with existing contracts:");
  console.log("   Vault:", vaultAddress);
  console.log("   Staking:", stakingAddress);
  console.log("   RewardsPool:", rewardsPoolAddress);
  console.log("   YieldDistributor:", yieldDistributorAddress);
  console.log("   AchievementNFT:", achievementNftAddress);
  console.log("");

  const vault = await ethers.getContractAt("ONBTOmnichainVault", vaultAddress);
  const staking = await ethers.getContractAt("ONBTOmnichainStaking", stakingAddress);
  const rewardsPool = await ethers.getContractAt("ONBTRewardsPool", rewardsPoolAddress);
  const yieldDistributor = await ethers.getContractAt("ONBTYieldDistributor", yieldDistributorAddress);
  const achievementNFT = await ethers.getContractAt("ONBTAchievementNFT", achievementNftAddress);

  const deployedContracts = {
    vault: vaultAddress,
    staking: stakingAddress,
    rewardsPool: rewardsPoolAddress,
    yieldDistributor: yieldDistributorAddress,
    achievementNFT: achievementNftAddress
  };

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

  // ============================================================================
  // STEP 10: Save deployment addresses
  // ============================================================================

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
