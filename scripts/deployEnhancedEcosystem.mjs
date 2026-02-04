import { ethers } from "hardhat";
import "dotenv/config";

/**
 * Deploy Enhanced DeFi Ecosystem with Universal Liquidity Pool Support
 * 
 * This script deploys:
 * 1. ONBTMathLib (math library)
 * 2. ONBTSecurityLib (security library)
 * 3. ONBTMultiTokenFactory (enhanced factory)
 * 4. Example universal liquidity pools
 */

async function main() {
    console.log("\n🚀 Deploying Enhanced ONBT DeFi Ecosystem...\n");
    
    // Get deployer
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying from:", deployer.address);
    console.log("💰 Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");
    
    // Configuration
    const ONBT_TOKEN_ADDRESS = process.env.ONBT_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000";
    const FEE_RECIPIENT = process.env.FEE_RECIPIENT || deployer.address;
    
    if (ONBT_TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000") {
        console.log("⚠️  Warning: ONBT_TOKEN_ADDRESS not set in .env");
        console.log("    Using zero address - deploy ONBT token first!\n");
    }
    
    console.log("🔧 Configuration:");
    console.log("   ONBT Token:", ONBT_TOKEN_ADDRESS);
    console.log("   Fee Recipient:", FEE_RECIPIENT);
    console.log();
    
    // ============================================================================
    // STEP 1: Deploy Libraries
    // ============================================================================
    
    console.log("📚 Step 1: Deploying Libraries...\n");
    
    // Deploy ONBTMathLib
    console.log("   Deploying ONBTMathLib...");
    const ONBTMathLib = await ethers.getContractFactory("ONBTMathLib");
    const mathLib = await ONBTMathLib.deploy();
    await mathLib.waitForDeployment();
    const mathLibAddress = await mathLib.getAddress();
    console.log("   ✅ ONBTMathLib deployed:", mathLibAddress);
    
    // Deploy ONBTSecurityLib
    console.log("   Deploying ONBTSecurityLib...");
    const ONBTSecurityLib = await ethers.getContractFactory("ONBTSecurityLib");
    const securityLib = await ONBTSecurityLib.deploy();
    await securityLib.waitForDeployment();
    const securityLibAddress = await securityLib.getAddress();
    console.log("   ✅ ONBTSecurityLib deployed:", securityLibAddress);
    console.log();
    
    // ============================================================================
    // STEP 2: Deploy Enhanced Factory
    // ============================================================================
    
    console.log("🏭 Step 2: Deploying Enhanced Factory...\n");
    
    const ONBTMultiTokenFactory = await ethers.getContractFactory("ONBTMultiTokenFactory", {
        libraries: {
            ONBTSecurityLib: securityLibAddress
        }
    });
    
    const factory = await ONBTMultiTokenFactory.deploy(ONBT_TOKEN_ADDRESS);
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();
    
    console.log("   ✅ ONBTMultiTokenFactory deployed:", factoryAddress);
    console.log();
    
    // ============================================================================
    // STEP 3: Deploy Sample Pools (Optional)
    // ============================================================================
    
    if (ONBT_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000") {
        console.log("🌊 Step 3: Deploying Sample Pools...\n");
        
        // Deploy ONBT/ETH pool (original style)
        console.log("   Deploying ONBT/ETH Pool...");
        const tx1 = await factory.deployONBTLiquidityPool(FEE_RECIPIENT);
        const receipt1 = await tx1.wait();
        
        // Get deployed pool address from event
        const onbtPoolAddress = receipt1.logs
            .filter(log => log.fragment?.name === "ONBTLiquidityPoolDeployed")
            .map(log => log.args[0])[0];
        
        console.log("   ✅ ONBT/ETH Pool deployed:", onbtPoolAddress);
        console.log();
        
        // Note about universal pools
        console.log("   ℹ️  To deploy universal pools for other token pairs:");
        console.log("      Use: factory.deployUniversalLiquidityPool(tokenA, tokenB, feeRecipient)");
        console.log("      Example tokens: USDC, WETH, DAI, etc.");
        console.log();
    } else {
        console.log("⏭️  Step 3: Skipping pool deployment (deploy ONBT token first)\n");
    }
    
    // ============================================================================
    // STEP 4: Summary
    // ============================================================================
    
    console.log("=" .repeat(80));
    console.log("✅ Deployment Complete!");
    console.log("=" .repeat(80));
    console.log();
    
    console.log("📋 Deployed Contracts:");
    console.log();
    console.log("Libraries:");
    console.log("  ONBTMathLib:        ", mathLibAddress);
    console.log("  ONBTSecurityLib:    ", securityLibAddress);
    console.log();
    console.log("Contracts:");
    console.log("  ONBTMultiTokenFactory:", factoryAddress);
    console.log();
    
    console.log("📝 Environment Variables for Miniapp:");
    console.log();
    console.log(`export REACT_APP_MATH_LIB_ADDRESS="${mathLibAddress}"`);
    console.log(`export REACT_APP_SECURITY_LIB_ADDRESS="${securityLibAddress}"`);
    console.log(`export REACT_APP_FACTORY_ADDRESS="${factoryAddress}"`);
    console.log();
    
    console.log("🔗 Contract Verification Commands:");
    console.log();
    console.log(`npx hardhat verify --network ${process.env.HARDHAT_NETWORK || "base"} ${mathLibAddress}`);
    console.log(`npx hardhat verify --network ${process.env.HARDHAT_NETWORK || "base"} ${securityLibAddress}`);
    console.log(`npx hardhat verify --network ${process.env.HARDHAT_NETWORK || "base"} ${factoryAddress} ${ONBT_TOKEN_ADDRESS}`);
    console.log();
    
    console.log("📖 Next Steps:");
    console.log();
    console.log("1. Verify contracts on block explorer");
    console.log("2. Update miniapp configuration with contract addresses");
    console.log("3. Deploy universal pools for desired token pairs:");
    console.log("   - Use factory.deployUniversalLiquidityPool(tokenA, tokenB, feeRecipient)");
    console.log("   - Example: ONBT/USDC, WETH/DAI, etc.");
    console.log("4. Test all functions on testnet before mainnet");
    console.log("5. Add initial liquidity to pools");
    console.log("6. Update frontend to use new pools");
    console.log();
    
    console.log("📚 Documentation:");
    console.log("   - UNIVERSAL_LP_GUIDE.md - Complete guide for universal pools");
    console.log("   - DEFI_ECOSYSTEM.md - Original DeFi ecosystem documentation");
    console.log();
    
    console.log("🎉 Enhanced DeFi Ecosystem Ready!");
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
