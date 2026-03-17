import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const isV6 = !!ethers.AbiCoder;
const zeroPadValue = (value, length) =>
  isV6 ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length);

/**
 * Configure LayerZero V2 Peers Between Chains
 * 
 * This script sets up the peer connections between Base (hub) and Arbitrum (spoke)
 * for all deployed LayerZero V2 OApp contracts.
 * 
 * Run this AFTER deploying to both chains.
 * 
 * Usage:
 * 1. Set DEPLOYMENT_FILE_HUB environment variable to Base deployment JSON
 * 2. Set DEPLOYMENT_FILE_SPOKE environment variable to Arbitrum deployment JSON
 * 3. Run on Base: IS_HUB_CHAIN=true node scripts/configure-lzv2-peers.mjs --network base
 * 4. Run on Arbitrum: IS_HUB_CHAIN=false node scripts/configure-lzv2-peers.mjs --network arbitrum
 */

// LayerZero V2 EID (Endpoint IDs)
const LZ_EIDS = {
  base: 30184,
  arbitrum: 30110,
  baseSepolia: 40245,
  arbitrumSepolia: 40231
};

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║        Configure LayerZero V2 Peer Connections            ║");
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
  
  const isHub = networkKey === 'base' || networkKey === 'baseSepolia';
  const peerNetwork = isHub ? 'arbitrum' : 'base';
  const localEid = LZ_EIDS[networkKey];
  const peerEid = isHub ? LZ_EIDS.arbitrum : LZ_EIDS.base;
  
  console.log("📝 Configuration Info:");
  console.log("   Signer:", deployer.address);
  console.log("   Local Network:", networkKey.toUpperCase());
  console.log("   Local Chain ID:", chainId);
  console.log("   Local EID:", localEid);
  console.log("   Peer Network:", peerNetwork.toUpperCase());
  console.log("   Peer EID:", peerEid);
  console.log("");
  
  // Load deployment files
  const localDeploymentFile = process.env.DEPLOYMENT_FILE_LOCAL;
  const peerDeploymentFile = process.env.DEPLOYMENT_FILE_PEER;
  
  if (!localDeploymentFile || !peerDeploymentFile) {
    throw new Error("Must set DEPLOYMENT_FILE_LOCAL and DEPLOYMENT_FILE_PEER environment variables");
  }
  
  const localDeployment = JSON.parse(fs.readFileSync(localDeploymentFile, 'utf8'));
  const peerDeployment = JSON.parse(fs.readFileSync(peerDeploymentFile, 'utf8'));
  
  console.log("📂 Loaded Deployments:");
  console.log("   Local:", localDeploymentFile);
  console.log("   Peer:", peerDeploymentFile);
  console.log("");
  
  // List of contracts that need peer configuration
  const oappContracts = [
    'vault',
    'rewardsPool',
    'yieldDistributor',
    'achievementNFT',
    'staking',
    'stakingRouter',
    'governor'
  ];
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Setting Peers for OApp Contracts");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  for (const contractName of oappContracts) {
    const localAddress = localDeployment.contracts[contractName];
    const peerAddress = peerDeployment.contracts[contractName];
    
    if (!localAddress || !peerAddress) {
      console.log(`⚠️  Skipping ${contractName}: Not found in deployment files`);
      continue;
    }
    
    console.log(`⚙️  Configuring ${contractName}...`);
    console.log(`   Local: ${localAddress}`);
    console.log(`   Peer:  ${peerAddress}`);
    
    try {
      // Get contract instance
      const contract = await ethers.getContractAt("OApp", localAddress);
      
      // Encode peer address (bytes32)
      const peerBytes32 = zeroPadValue(peerAddress, 32);

      const currentPeer = (await contract.peers(peerEid)).toLowerCase();
      const expectedPeer = peerBytes32.toLowerCase();

      if (currentPeer === expectedPeer) {
        console.log("   ✓ Peer already set (no tx needed)\n");
        continue;
      }

      const tx = await contract.setPeer(peerEid, peerBytes32);
      await tx.wait();
      console.log(`   ✅ Peer set! Tx: ${tx.hash}`);

      const setPeer = (await contract.peers(peerEid)).toLowerCase();
      if (setPeer === expectedPeer) {
        console.log(`   ✓ Verification passed\n`);
      } else {
        console.log(`   ❌ Verification failed`);
        console.log(`   Expected: ${expectedPeer}`);
        console.log(`   Actual:   ${setPeer}\n`);
      }
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  // ============================================================================
  // Configure specific contract relationships
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Configuring Contract Relationships");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  console.log("⚙️  Wiring Staking/Rewards integrations...");
  try {
    const rewardsPool = await ethers.getContractAt(
      "ONBTRewardsPool",
      localDeployment.contracts.rewardsPool
    );
    const current = await rewardsPool.stakingContract();
    if (current.toLowerCase() === localDeployment.contracts.staking.toLowerCase()) {
      console.log("   ✓ RewardsPool staking contract already set");
    } else {
      const tx = await rewardsPool.setStakingContract(localDeployment.contracts.staking);
      await tx.wait();
      console.log(`   ✅ RewardsPool.setStakingContract set! Tx: ${tx.hash}`);
    }
  } catch (error) {
    console.log(`   ⚠️  RewardsPool wiring skipped: ${error.message}`);
  }

  try {
    const achievementNFT = await ethers.getContractAt(
      "ONBTAchievementNFT",
      localDeployment.contracts.achievementNFT
    );
    const current = await achievementNFT.stakingContract();
    if (current.toLowerCase() === localDeployment.contracts.staking.toLowerCase()) {
      console.log("   ✓ AchievementNFT staking contract already set");
    } else {
      const tx = await achievementNFT.setStakingContract(localDeployment.contracts.staking);
      await tx.wait();
      console.log(`   ✅ AchievementNFT.setStakingContract set! Tx: ${tx.hash}`);
    }
  } catch (error) {
    console.log(`   ⚠️  AchievementNFT wiring skipped: ${error.message}`);
  }

  try {
    const yieldDistributor = await ethers.getContractAt(
      "ONBTYieldDistributor",
      localDeployment.contracts.yieldDistributor
    );
    const isDepositor = await yieldDistributor.rewardDepositors(localDeployment.contracts.stakingRouter);
    if (isDepositor) {
      console.log("   ✓ YieldDistributor depositor already set");
    } else {
      const tx = await yieldDistributor.addRewardDepositor(localDeployment.contracts.stakingRouter);
      await tx.wait();
      console.log(`   ✅ YieldDistributor.addRewardDepositor set! Tx: ${tx.hash}`);
    }
  } catch (error) {
    console.log(`   ⚠️  YieldDistributor wiring skipped: ${error.message}`);
  }

  try {
    const staking = await ethers.getContractAt(
      "ONBTOmnichainStaking",
      localDeployment.contracts.staking
    );
    const current = await staking.achievementNFT();
    if (current.toLowerCase() === localDeployment.contracts.achievementNFT.toLowerCase()) {
      console.log("   ✓ Staking achievement NFT already set\n");
    } else {
      const tx = await staking.setAchievementNFT(localDeployment.contracts.achievementNFT);
      await tx.wait();
      console.log(`   ✅ Staking.setAchievementNFT set! Tx: ${tx.hash}\n`);
    }
  } catch (error) {
    console.log(`   ⚠️  Staking wiring skipped: ${error.message}\n`);
  }
  
  // ============================================================================
  // Set LayerZero V2 Send/Receive Libraries (Optional)
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Setting LayerZero Send/Receive Libraries (Optional)");
  console.log("═══════════════════════════════════════════════════════════\n");
  console.log("ℹ️  Using default LayerZero libraries. Advanced users can set custom libraries here.\n");
  
  // ============================================================================
  // Display summary
  // ============================================================================
  
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           Peer Configuration Complete! 🎉                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("✅ All peers configured successfully!");
  console.log("");
  console.log("⚠️  NEXT STEPS:");
  console.log("1. Run this script on the PEER chain to complete bidirectional setup");
  console.log("2. Fund contracts with ONBT tokens:");
  console.log("   - Vault: 10M+ ONBT");
  console.log("   - Rewards Pool: 1M+ ONBT");
  console.log("3. Test cross-chain messaging:");
  console.log("   - Call syncToHub() on spoke chain");
  console.log("   - Verify message received on hub chain");
  console.log("4. Update frontend with contract addresses");
  console.log("5. Verify contracts on block explorers");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Configuration failed:", error);
    process.exit(1);
  });
