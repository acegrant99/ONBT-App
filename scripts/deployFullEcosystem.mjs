import hre from "hardhat";
const { ethers } = hre;
import { ChainConfig } from "../constants/layerzero.mjs";

/**
 * Deploy Full ONBT Omnichain Ecosystem
 * 
 * This script deploys:
 * 1. ONBT Token (OFTV2)
 * 2. Governance OApp
 * 3. Omnichain Vault (OVault)
 * 4. DeFi Ecosystem (Staking, Pools, Router)
 * 5. Oracle Adapter
 * 6. Compose Handler
 * 
 * Configuration:
 * - HUB_CHAIN: Set to true for Base (hub chain)
 * - DST_CHAIN: Set to true for destination chains
 */

// ============ Configuration ============

const IS_HUB_CHAIN = (process.env.IS_HUB_CHAIN ?? "true") === "true";
const DEPLOYMENT_TYPE = IS_HUB_CHAIN ? "hub" : "destination";
const DEFAULT_WETH_ADDRESS = process.env.WETH_ADDRESS || "0x4200000000000000000000000000000000000006";

const CONFIG = {
  // ONBT Token Configuration
  onbt: {
    name: "ONabat",
    symbol: "ONBT",
    sharedDecimals: 8,
    totalSupply: IS_HUB_CHAIN ? ethers.parseEther("1000000000") : ethers.parseEther("0"), // 1B on hub, 0 on dest
    branding: {
      logoURI: process.env.ONBT_LOGO_URI || "ipfs://QmYourLogoHashHere",
      website: process.env.ONBT_WEBSITE || "https://nabat.finance",
      description: process.env.ONBT_DESCRIPTION || "ONabat (ONBT) is an immutable omnichain fungible token",
      socialLinks: process.env.ONBT_SOCIAL_LINKS || JSON.stringify({
        twitter: "https://twitter.com/nabatfinance",
        telegram: "https://t.me/nabatfinance",
        github: "https://github.com/acegrant99/ONBT-App"
      })
    }
  },
  
  // Staking Configuration
  staking: {
    rewardRate: ethers.parseEther("0.0001"), // 0.0001 ONBT per second
    minimumStake: ethers.parseEther("100") // 100 ONBT minimum
  },
  
  // Liquidity Pool Configuration
  pool: {
    feeBps: 30, // 0.3%
    protocolFeeShare: 1000 // 10% of fees
  },
  
  // Oracle Configuration
  oracle: {
    minObservationWindow: 10 * 60, // 10 minutes
    defaultObservationWindow: 30 * 60, // 30 minutes
    maxObservationWindow: 24 * 60 * 60, // 24 hours
    stalenessThreshold: 60 * 60 // 1 hour
  }
};

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     ONBT Full Ecosystem Deployment (OFTV2 + OApp)         ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "hardhat" : network.name;
  
  console.log("📝 Deployment Info:");
  console.log("   Deployer:", deployer.address);
  console.log("   Network:", networkName);
  console.log("   Chain ID:", network.chainId.toString());
  console.log("   Deployment Type:", DEPLOYMENT_TYPE.toUpperCase());
  console.log("   Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");
  
  // Get LayerZero endpoint
  let lzEndpoint;
  let localEid;
  let hubChainEid;
  
  if (networkName === "hardhat" || networkName === "localhost") {
    lzEndpoint = "0x0000000000000000000000000000000000000000";
    hubChainEid = 184; // Base
    localEid = hubChainEid;
  } else {
    const config = ChainConfig[networkName];
    if (!config) throw new Error(`No LayerZero config for ${networkName}`);
    lzEndpoint = config.endpoint;
    localEid = config.lzChainId;
    hubChainEid = ChainConfig.base?.lzChainId || 184;
  }
  
  console.log("🌐 LayerZero Config:");
  console.log("   Endpoint:", lzEndpoint);
  console.log("   Local EID:", localEid);
  console.log("   Hub EID:", hubChainEid, "(Base)\n");
  
  const deployedContracts = {};
  
  // ============================================================================
  // STEP 1: Deploy ONBT Token (OFT V2)
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 1: Deploying ONBT Token (OFT V2)");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const onbt = await OmnichainNabatOFT.deploy(
    lzEndpoint,
    deployer.address,
    CONFIG.onbt.totalSupply,
    CONFIG.onbt.branding.logoURI,
    CONFIG.onbt.branding.website,
    CONFIG.onbt.branding.description,
    CONFIG.onbt.branding.socialLinks
  );
  await onbt.waitForDeployment();
  deployedContracts.onbt = await onbt.getAddress();
  
  console.log("✅ ONBT Token:", deployedContracts.onbt);
  console.log("   Supply:", ethers.formatEther(CONFIG.onbt.totalSupply), "ONBT\n");
  
  // ============================================================================
  // STEP 2: Deploy Governance OApp
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 2: Deploying Governance OApp");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTGovernanceOApp = await ethers.getContractFactory("ONBTGovernanceOApp");
  const governanceOApp = await ONBTGovernanceOApp.deploy(
    lzEndpoint,
    hubChainEid,
    IS_HUB_CHAIN
  );
  await governanceOApp.waitForDeployment();
  deployedContracts.governanceOApp = await governanceOApp.getAddress();
  
  console.log("✅ Governance OApp:", deployedContracts.governanceOApp);
  console.log("   Hub Chain:", IS_HUB_CHAIN ? "YES" : "NO\n");
  
  // ============================================================================
  // STEP 3: Deploy Omnichain Vault (OVault)
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 3: Deploying Omnichain Vault");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTOmnichainVault = await ethers.getContractFactory("ONBTOmnichainVault");
  const vault = await ONBTOmnichainVault.deploy(
    lzEndpoint,
    localEid,
    hubChainEid,
    IS_HUB_CHAIN,
    deployer.address // governance address
  );
  await vault.waitForDeployment();
  deployedContracts.vault = await vault.getAddress();
  
  console.log("✅ Omnichain Vault:", deployedContracts.vault, "\n");
  
  // Whitelist ONBT token in vault
  await vault.whitelistToken(deployedContracts.onbt, true);
  console.log("   ✓ ONBT whitelisted in vault\n");

  // ============================================================================
  // STEP 3.5: Deploy Doorway Modules
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 3.5: Deploying Doorway Modules");
  console.log("═══════════════════════════════════════════════════════════\n");

  const ONBTLiquidityManager = await ethers.getContractFactory("ONBTLiquidityManager");
  const liquidityManager = await ONBTLiquidityManager.deploy(lzEndpoint, deployedContracts.onbt);
  await liquidityManager.waitForDeployment();
  deployedContracts.liquidityManager = await liquidityManager.getAddress();
  console.log("✅ Liquidity Manager:", deployedContracts.liquidityManager);

  const ONBTInsuranceFund = await ethers.getContractFactory("ONBTInsuranceFund");
  const insuranceFund = await ONBTInsuranceFund.deploy(lzEndpoint, deployedContracts.onbt);
  await insuranceFund.waitForDeployment();
  deployedContracts.insuranceFund = await insuranceFund.getAddress();
  console.log("✅ Insurance Fund:", deployedContracts.insuranceFund);

  const ONBTStabilizer = await ethers.getContractFactory("ONBTStabilizer");
  const stabilizer = await ONBTStabilizer.deploy(lzEndpoint, deployedContracts.onbt);
  await stabilizer.waitForDeployment();
  deployedContracts.stabilizer = await stabilizer.getAddress();
  console.log("✅ Stabilizer:", deployedContracts.stabilizer);

  const ONBTIncentiveController = await ethers.getContractFactory("ONBTIncentiveController");
  const incentiveController = await ONBTIncentiveController.deploy(lzEndpoint);
  await incentiveController.waitForDeployment();
  deployedContracts.incentiveController = await incentiveController.getAddress();
  console.log("✅ Incentive Controller:", deployedContracts.incentiveController);

  const rewardsAddress = process.env.REWARDS_POOL_ADDRESS;
  if (rewardsAddress) {
    const ONBTRevenueRouter = await ethers.getContractFactory("ONBTRevenueRouter");
    const revenueRouter = await ONBTRevenueRouter.deploy(
      lzEndpoint,
      deployedContracts.vault,
      rewardsAddress,
      deployedContracts.insuranceFund
    );
    await revenueRouter.waitForDeployment();
    deployedContracts.revenueRouter = await revenueRouter.getAddress();
    console.log("✅ Revenue Router:", deployedContracts.revenueRouter);
  } else {
    console.log("⚠️  REWARDS_POOL_ADDRESS not set; skipping Revenue Router deployment");
  }

  await vault.setLiquidityManager(deployedContracts.liquidityManager);
  await vault.setInsuranceFund(deployedContracts.insuranceFund);
  await vault.setStabilizer(deployedContracts.stabilizer);
  if (deployedContracts.revenueRouter) {
    await vault.setRevenueRouter(deployedContracts.revenueRouter);
  }
  console.log("   ✓ Vault wired to Doorway modules\n");
  
  // ============================================================================
  // STEP 4: Deploy DeFi Libraries
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 4: Deploying DeFi Libraries");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTMathLib = await ethers.getContractFactory("ONBTMathLib");
  const mathLib = await ONBTMathLib.deploy();
  await mathLib.waitForDeployment();
  deployedContracts.mathLib = await mathLib.getAddress();
  
  const ONBTSecurityLib = await ethers.getContractFactory("ONBTSecurityLib");
  const securityLib = await ONBTSecurityLib.deploy();
  await securityLib.waitForDeployment();
  deployedContracts.securityLib = await securityLib.getAddress();
  
  console.log("✅ Math Library:", deployedContracts.mathLib);
  console.log("✅ Security Library:", deployedContracts.securityLib, "\n");
  
  // ============================================================================
  // STEP 5: Deploy DeFi Factory
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 5: Deploying DeFi Factory");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTMultiTokenFactory = await ethers.getContractFactory("ONBTMultiTokenFactory", {
    libraries: {
      ONBTSecurityLib: deployedContracts.securityLib
    }
  });
  const factory = await ONBTMultiTokenFactory.deploy(deployedContracts.onbt);
  await factory.waitForDeployment();
  deployedContracts.factory = await factory.getAddress();
  
  console.log("✅ Multi-Token Factory:", deployedContracts.factory, "\n");
  
  // Deploy staking via factory
  console.log("   Deploying Staking Contract...");
  const stakingTx = await factory.deployStaking(
    deployedContracts.onbt,
    deployedContracts.onbt,
    CONFIG.staking.rewardRate,
    CONFIG.staking.minimumStake
  );
  const stakingReceipt = await stakingTx.wait();
  const stakingEvent = stakingReceipt.logs.find(log => {
    try {
      return factory.interface.parseLog(log)?.name === 'StakingDeployed';
    } catch { return false; }
  });
  deployedContracts.staking = stakingEvent ? factory.interface.parseLog(stakingEvent).args[0] : null;
  console.log("   ✅ Staking Contract:", deployedContracts.staking, "\n");
  
  // Deploy liquidity pool via factory
  console.log("   Deploying Liquidity Pool...");
  const poolTx = await factory.deployONBTLiquidityPool(deployer.address);
  const poolReceipt = await poolTx.wait();
  const poolEvent = poolReceipt.logs.find(log => {
    try {
      return factory.interface.parseLog(log)?.name === 'ONBTLiquidityPoolDeployed';
    } catch { return false; }
  });
  deployedContracts.liquidityPool = poolEvent ? factory.interface.parseLog(poolEvent).args[0] : null;
  console.log("   ✅ Liquidity Pool:", deployedContracts.liquidityPool, "\n");
  
  // ============================================================================
  // STEP 6: Deploy Router
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 6: Deploying Router");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTRouter = await ethers.getContractFactory("ONBTRouter");
  const router = await ONBTRouter.deploy(
    deployedContracts.onbt,
    deployedContracts.factory,
    DEFAULT_WETH_ADDRESS
  );
  await router.waitForDeployment();
  deployedContracts.router = await router.getAddress();
  
  console.log("✅ Router:", deployedContracts.router, "\n");
  
  // ============================================================================
  // STEP 7: Deploy Oracle Adapter
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 7: Deploying Oracle Adapter");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTOracleAdapter = await ethers.getContractFactory("ONBTOracleAdapter");
  const oracle = await ONBTOracleAdapter.deploy();
  await oracle.waitForDeployment();
  deployedContracts.oracle = await oracle.getAddress();
  
  console.log("✅ Oracle Adapter:", deployedContracts.oracle, "\n");
  
  // Configure oracle
  await oracle.setMinObservationWindow(CONFIG.oracle.minObservationWindow);
  await oracle.setDefaultObservationWindow(CONFIG.oracle.defaultObservationWindow);
  await oracle.setMaxObservationWindow(CONFIG.oracle.maxObservationWindow);
  await oracle.setStalenessThreshold(CONFIG.oracle.stalenessThreshold);
  console.log("   ✓ Oracle configured\n");
  
  // ============================================================================
  // STEP 8: Deploy Compose Handler
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 8: Deploying Compose Handler");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTComposeHandler = await ethers.getContractFactory("ONBTComposeHandler");
  const composeHandler = await ONBTComposeHandler.deploy(
    lzEndpoint,
    deployedContracts.onbt,
    deployedContracts.staking,
    deployedContracts.liquidityPool,
    deployedContracts.router
  );
  await composeHandler.waitForDeployment();
  deployedContracts.composeHandler = await composeHandler.getAddress();
  
  console.log("✅ Compose Handler:", deployedContracts.composeHandler, "\n");
  
  // ============================================================================
  // SUMMARY
  // ============================================================================
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                  DEPLOYMENT COMPLETE                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📋 Deployed Contracts:\n");
  console.log("Core:");
  console.log(`  ONBT Token:          ${deployedContracts.onbt}`);
  console.log(`  Governance OApp:     ${deployedContracts.governanceOApp}`);
  console.log(`  Omnichain Vault:     ${deployedContracts.vault}\n`);

  console.log("Doorway Modules:");
  console.log(`  Liquidity Manager:   ${deployedContracts.liquidityManager}`);
  console.log(`  Insurance Fund:      ${deployedContracts.insuranceFund}`);
  console.log(`  Stabilizer:          ${deployedContracts.stabilizer}`);
  console.log(`  Incentive Controller:${deployedContracts.incentiveController}`);
  console.log(`  Revenue Router:      ${deployedContracts.revenueRouter || "(skipped)"}\n`);
  
  console.log("DeFi:");
  console.log(`  Math Library:        ${deployedContracts.mathLib}`);
  console.log(`  Security Library:    ${deployedContracts.securityLib}`);
  console.log(`  Multi-Token Factory: ${deployedContracts.factory}`);
  console.log(`  Staking Contract:    ${deployedContracts.staking}`);
  console.log(`  Liquidity Pool:      ${deployedContracts.liquidityPool}`);
  console.log(`  Router:              ${deployedContracts.router}\n`);
  
  console.log("Advanced:");
  console.log(`  Oracle Adapter:      ${deployedContracts.oracle}`);
  console.log(`  Compose Handler:     ${deployedContracts.composeHandler}\n`);
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("NEXT STEPS");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  if (IS_HUB_CHAIN) {
    console.log("✅ Hub Chain Deployment Complete!");
    console.log("\n1. Deploy on destination chains with IS_HUB_CHAIN=false");
    console.log("2. Set trusted remotes/peers for all contracts");
    console.log("3. Configure ULN/DVN settings for security");
    console.log("4. Fund staking contract with rewards");
    console.log("5. Add initial liquidity to pools");
    console.log("6. Register price feeds in oracle");
    console.log("7. Update miniapp with contract addresses");
  } else {
    console.log("✅ Destination Chain Deployment Complete!");
    console.log("\n1. Set trusted remotes to hub chain");
    console.log("2. Configure peer addresses for cross-chain communication");
    console.log("3. Test cross-chain token transfers");
    console.log("4. Test compose operations");
  }
  
  console.log("\n📝 Environment Variables:\n");
  console.log(`export ONBT_TOKEN_${networkName.toUpperCase()}="${deployedContracts.onbt}"`);
  console.log(`export GOVERNANCE_OAPP_${networkName.toUpperCase()}="${deployedContracts.governanceOApp}"`);
  console.log(`export VAULT_${networkName.toUpperCase()}="${deployedContracts.vault}"`);
  console.log(`export LIQUIDITY_MANAGER_${networkName.toUpperCase()}="${deployedContracts.liquidityManager}"`);
  console.log(`export INSURANCE_FUND_${networkName.toUpperCase()}="${deployedContracts.insuranceFund}"`);
  console.log(`export STABILIZER_${networkName.toUpperCase()}="${deployedContracts.stabilizer}"`);
  console.log(`export INCENTIVE_CONTROLLER_${networkName.toUpperCase()}="${deployedContracts.incentiveController}"`);
  if (deployedContracts.revenueRouter) {
    console.log(`export REVENUE_ROUTER_${networkName.toUpperCase()}="${deployedContracts.revenueRouter}"`);
  }
  console.log(`export FACTORY_${networkName.toUpperCase()}="${deployedContracts.factory}"`);
  console.log(`export ROUTER_${networkName.toUpperCase()}="${deployedContracts.router}"`);
  console.log(`export ORACLE_${networkName.toUpperCase()}="${deployedContracts.oracle}"`);
  console.log(`export COMPOSE_HANDLER_${networkName.toUpperCase()}="${deployedContracts.composeHandler}"`);
  
  console.log("\n🎉 Deployment successful!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });
