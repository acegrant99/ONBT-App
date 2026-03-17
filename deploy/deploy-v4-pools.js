/**
 * Deployment script for ONBT Uniswap V3 Pool System with LayerZero
 * 
 * This script deploys:
 * 1. ONBTPoolManager - LayerZero-enabled Uniswap V3 pool manager for cross-chain coordination
 * 
 * Uniswap V3 provides:
 * - Concentrated liquidity via tick ranges
 * - Multiple fee tiers (0.01%, 0.05%, 0.30%, 1.00%)
 * - ERC-721 based position management
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const network = hre.network.name;
  console.log(`\n🚀 Deploying ONBT V3 Pool System on ${network}...\n`);

  const [deployer] = await ethers.getSigners();
  console.log(`📋 Deployer: ${deployer.address}`);

  // Configuration per chain
  const chainConfig = {
    arbitrum: {
      name: "Arbitrum",
      swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 Router
      nftPositionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11218f", // Position Manager
      lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c",
      onbtToken: "0x...", // Your ONBT token address
      feeCollector: deployer.address,
    },
    base: {
      name: "Base",
      swapRouter: "0x2626664c2603336E57B271c5C0b26F421741e481", // Uniswap V3 Router on Base
      nftPositionManager: "0x03a520b32C63e69bD1D97CCC44ac0B3db46A80D7", // Position Manager on Base
      lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c",
      onbtToken: "0x...", // Your ONBT token address
      feeCollector: deployer.address,
    },
    ethereum: {
      name: "Ethereum",
      swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 Router
      nftPositionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11218f", // Position Manager
      lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c",
      onbtToken: "0x...", // Your ONBT token address
      feeCollector: deployer.address,
    },
    sepolia: {
      name: "Sepolia Testnet",
      swapRouter: "0x3bFA4369f3f275A3ADAf267e213716666a440302",
      nftPositionManager: "0x27F971cb582BF9F50F0e58e33e7afA26D51a9840",
      lzEndpoint: "0x6EDCE65403992e8CE0C5ff2B0Fed3dC3A7ee278f", // Sepolia LZ endpoint
      onbtToken: "0x...", // Your test ONBT token
      feeCollector: deployer.address,
    },
  };

  const config = chainConfig[network];
  if (!config) {
    throw new Error(`❌ No configuration for network: ${network}`);
  }

  console.log(`\n📦 Configuration for ${config.name}:`);
  console.log(`   Uniswap V3 SwapRouter: ${config.swapRouter}`);
  console.log(`   NFT Position Manager: ${config.nftPositionManager}`);
  console.log(`   ONBT Token: ${config.onbtToken}`);
  console.log(`   Fee Collector: ${config.feeCollector}`);
  console.log(`   LayerZero Endpoint: ${config.lzEndpoint}`);

  // ============ Deploy ONBTPoolManager ============
  console.log(`\n🔧 Deploying ONBTPoolManager...`);
  
  const ONBTPoolManager = await ethers.getContractFactory("ONBTPoolManager");
  const poolManager = await ONBTPoolManager.deploy(
    config.lzEndpoint,
    config.swapRouter,
    config.nftPositionManager,
    config.onbtToken,
    config.feeCollector
  );
  
  await poolManager.deployed();
  console.log(`✅ ONBTPoolManager deployed at: ${poolManager.address}`);

  // ============ Save Deployment Info ============
  const deploymentInfo = {
    network,
    networkName: config.name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      ONBTPoolManager: {
        address: poolManager.address,
        txHash: poolManager.deployTransaction.hash,
      },
    },
    configuration: {
      swapRouter: config.swapRouter,
      nftPositionManager: config.nftPositionManager,
      lzEndpoint: config.lzEndpoint,
      onbtToken: config.onbtToken,
      feeCollector: config.feeCollector,
    },
    uniswapV3Features: {
      feeTiers: ["0.01% (100)", "0.05% (500)", "0.30% (3000)", "1.00% (10000)"],
      concentratedLiquidity: "Tick-based ranges for capital efficiency",
      positionManagement: "ERC-721 based NFT positions",
    },
  };

  const outputPath = path.join(
    __dirname,
    `../deployment-v3-pools-${network}-${Date.now()}.json`
  );
  
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📝 Deployment saved to: ${outputPath}`);

  // ============ Verify on Block Explorer ============
  if (network !== "localhost" && network !== "hardhat") {
    console.log(`\n🔍 Attempting to verify contracts on block explorer...`);
    
    try {
      await hre.run("verify:verify", {
        address: poolManager.address,
        constructorArguments: [
          config.lzEndpoint,
          config.swapRouter,
          config.nftPositionManager,
          config.onbtToken,
          config.feeCollector,
        ],
      });
      console.log(`✅ ONBTPoolManager verified`);
    } catch (err) {
      console.log(`⚠️  Verification pending: ${err.message}`);
    }
  }

  console.log(`\n✨ Deployment complete!\n`);
  console.log(`📊 Contract Summary:`);
  console.log(`   Network: ${config.name} (${network})`);
  console.log(`   ONBTPoolManager: ${poolManager.address}`);
  console.log(`   Deployer: ${deployer.address}`);
  console.log(`\n🔗 Next Steps:`);
  console.log(`   1. Update ONBT token addresses in chainConfig`);
  console.log(`   2. Register pools using registerPool()`);
  console.log(`   3. Allocate liquidity using allocateLiquidity()`);
  console.log(`   4. Set up peer pools for cross-chain sync`);
  console.log(`\n📚 Fee Tiers:`);
  console.log(`   - 0.01% (100 bps) for stablecoins`);
  console.log(`   - 0.05% (500 bps) for stablecoins/blue chips`);
  console.log(`   - 0.30% (3000 bps) for standard pairs (LBID RECOMMENDED)`);
  console.log(`   - 1.00% (10000 bps) for exotic/volatile pairs`);

  return {
    poolManager: poolManager.address,
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

