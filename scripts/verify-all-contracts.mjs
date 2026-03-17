import hre from "hardhat";
const { run, ethers } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for which contracts to verify
const CONTRACT_CONFIG = {
  onbtToken: {
    contract: "contracts/token/OmnichainNabatOFT.sol:OmnichainNabatOFT",
    skip: true, // User confirmed OFTs are already verified
  },
  vault: {
    contract: "contracts/treasury/ONBTOmnichainVault.sol:ONBTOmnichainVault",
    skip: false,
  },
  staking: {
    contract: "contracts/defi/ONBTOmnichainStaking.sol:ONBTOmnichainStaking",
    skip: false,
  },
  rewardsPool: {
    contract: "contracts/defi/ONBTRewardsPool.sol:ONBTRewardsPool",
    skip: false,
  },
  yieldDistributor: {
    contract: "contracts/defi/ONBTYieldDistributor.sol:ONBTYieldDistributor",
    skip: false,
  },
  achievementNFT: {
    contract: "contracts/defi/ONBTAchievementNFT.sol:ONBTAchievementNFT",
    skip: false,
  },
  stakingRouter: {
    contract: "contracts/defi/ONBTStakingRouter.sol:ONBTStakingRouter",
    skip: false,
  },
  governor: {
    contract: "contracts/defi/ONBTGovernor.sol:ONBTGovernor",
    skip: false,
  },
  liquidityManager: {
    contract: "contracts/defi/ONBTLiquidityManager.sol:ONBTLiquidityManager",
    skip: false,
  },
  insuranceFund: {
    contract: "contracts/treasury/ONBTInsuranceFund.sol:ONBTInsuranceFund",
    skip: false,
  },
  stabilizer: {
    contract: "contracts/defi/ONBTStabilizer.sol:ONBTStabilizer",
    skip: false,
  },
  incentiveController: {
    contract: "contracts/defi/ONBTIncentiveController.sol:ONBTIncentiveController",
    skip: false,
  },
  revenueRouter: {
    contract: "contracts/defi/ONBTRevenueRouter.sol:ONBTRevenueRouter",
    skip: false,
  },
};

// Verification services to use
const VERIFICATION_SERVICES = {
  etherscan: {
    base: "base",
    arbitrum: "arbitrumOne",
  },
  blockscout: {
    base: "baseBlockscout",
    arbitrum: "arbitrumBlockscout",
  },
  routescan: {
    base: "baseRoutescan",
    arbitrum: "arbitrumRoutescan",
  },
};

function findLatestDeployment(network) {
  const deployDir = path.join(__dirname, "..", "deploy");
  const files = fs.readdirSync(deployDir);
  
  const deploymentFiles = files
    .filter(f => f.startsWith(`deployment-lzv2-`) && f.includes(network) && f.endsWith(".json"))
    .sort()
    .reverse();
    
  if (deploymentFiles.length === 0) {
    throw new Error(`No deployment files found for ${network}`);
  }
  
  const latestFile = path.join(deployDir, deploymentFiles[0]);
  console.log(`📄 Loading: ${deploymentFiles[0]}`);
  
  return JSON.parse(fs.readFileSync(latestFile, "utf8"));
}

function getIsHub(network, deployment) {
  return deployment.deploymentType === "hub" || network === "base";
}

async function getConstructorArgs(contractName, address, deployment, network) {
  const argsDir = path.join(__dirname, "..", "deploy");
  const localEid = deployment.layerZero?.eid;
  const hubChainEid = deployment.layerZero?.hubEid;
  const lzEndpoint = deployment.layerZero?.endpoint;
  const isHub = getIsHub(network, deployment);
  
  // Check for existing constructor args files
  if (contractName === "staking") {
    const argsFile = path.join(argsDir, `verify-args-staking-${network}.cjs`);
    if (fs.existsSync(argsFile)) {
      const argsModule = await import(`file:///${argsFile.replace(/\\/g, '/')}`);
      return argsModule.default || argsModule;
    }
  } else if (contractName === "onbtToken") {
    // User confirmed OFTs are already verified; skip constructor args.
    const chainId = deployment.chainId;
    const argsFile = path.join(argsDir, `verify-args-onbt-${chainId}.cjs`);
    if (fs.existsSync(argsFile)) {
      const argsModule = await import(`file:///${argsFile.replace(/\\/g, '/')}`);
      return argsModule.default || argsModule;
    }
    return [];
  }

  if (!lzEndpoint || localEid === undefined || hubChainEid === undefined) {
    console.log(`⚠️  Missing LayerZero metadata for ${contractName}, attempting verification without args...`);
    return [];
  }

  switch (contractName) {
    case "vault":
      return [
        lzEndpoint,
        localEid,
        hubChainEid,
        isHub,
        deployment.contracts.governor
      ];
    case "rewardsPool":
      return [
        lzEndpoint,
        deployment.contracts.onbtToken,
        localEid,
        hubChainEid,
        isHub,
        deployment.contracts.staking
      ];
    case "yieldDistributor":
      return [
        lzEndpoint,
        localEid,
        hubChainEid,
        isHub,
        deployment.contracts.onbtToken
      ];
    case "achievementNFT": {
      const nftAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)"
      ];
      const nft = new ethers.Contract(address, nftAbi, ethers.provider);
      const name = await nft.name();
      const symbol = await nft.symbol();
      return [
        name,
        symbol,
        lzEndpoint,
        localEid,
        deployment.contracts.staking
      ];
    }
    case "stakingRouter":
      return [
        lzEndpoint,
        localEid,
        hubChainEid,
        isHub,
        deployment.contracts.staking,
        deployment.contracts.yieldDistributor,
        deployment.contracts.rewardsPool
      ];
    case "governor":
      return [
        lzEndpoint,
        localEid,
        hubChainEid,
        isHub,
        deployment.contracts.staking
      ];
    case "liquidityManager":
    case "insuranceFund":
    case "stabilizer":
      return [
        lzEndpoint,
        deployment.contracts.onbtToken
      ];
    case "incentiveController":
      return [lzEndpoint];
    case "revenueRouter":
      return [
        lzEndpoint,
        deployment.contracts.vault,
        deployment.contracts.rewardsPool,
        deployment.contracts.insuranceFund
      ];
    default:
      break;
  }

  console.log(`⚠️  No constructor args found for ${contractName}, attempting verification without args...`);
  return [];
}

async function verifyOnService(serviceName, networkKey, address, contractPath, constructorArgs) {
  try {
    console.log(`   ${serviceName}: Verifying...`);
    
    const verifyParams = {
      address: address,
      constructorArguments: constructorArgs,
      contract: contractPath,
    };
    
    // For non-etherscan services, we need to use the custom network
    if (serviceName !== "Etherscan") {
      // Hardhat verify doesn't directly support changing networks mid-run
      // We'll need to use manual verification or separate runs
      console.log(`   ${serviceName}: ⏭️  Skipped (requires separate --network flag)`);
      return { success: false, message: "Run with separate --network flag", skipped: true };
    }
    
    await run("verify:verify", verifyParams);
    
    console.log(`   ${serviceName}: ✅ Verified`);
    return { success: true, message: "Verified successfully" };
    
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log(`   ${serviceName}: ✅ Already verified`);
      return { success: true, message: "Already verified" };
    } else if (error.message.includes("does not have bytecode")) {
      console.log(`   ${serviceName}: ❌ Contract not found`);
      return { success: false, message: "Contract address has no bytecode" };
    } else if (error.message.includes("Reason: Already Verified")) {
      console.log(`   ${serviceName}: ✅ Already verified`);
      return { success: true, message: "Already verified" };
    } else {
      const shortError = error.message.split('\n')[0].substring(0, 80);
      console.log(`   ${serviceName}: ❌ ${shortError}`);
      return { success: false, message: error.message };
    }
  }
}

async function verifyContract(contractName, address, deployment, network) {
  const config = CONTRACT_CONFIG[contractName];
  
  if (!config) {
    console.log(`❌ No configuration found for ${contractName}`);
    return { success: false, verified: [], failed: [] };
  }
  
  if (config.skip) {
    console.log(`⏭️  ${contractName}: Skipped (configured to skip)`);
    return { success: true, verified: [], failed: [], skipped: true };
  }
  
  console.log(`\n📝 ${contractName.toUpperCase()}`);
  console.log(`   Address: ${address}`);
  console.log(`   Contract: ${config.contract}`);
  
  const constructorArgs = await getConstructorArgs(contractName, address, deployment, network);
  
  const results = {
    verified: [],
    failed: [],
    skipped: [],
  };
  
  // Verify on current network (Etherscan)
  const etherscanResult = await verifyOnService(
    "Etherscan",
    VERIFICATION_SERVICES.etherscan[network],
    address,
    config.contract,
    constructorArgs
  );
  
  if (etherscanResult.success) {
    results.verified.push("Etherscan");
  } else if (etherscanResult.skipped) {
    results.skipped.push("Etherscan");
  } else {
    results.failed.push({ service: "Etherscan", error: etherscanResult.message });
  }
  
  return {
    success: results.failed.length === 0,
    ...results
  };
}

async function main() {
  const network = hre.network.name;
  
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Verify All Contracts - ${network.toUpperCase().padEnd(35, ' ')}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝`);
  
  if (!["base", "arbitrum"].includes(network)) {
    console.error(`\n❌ Unsupported network: ${network}`);
    console.error(`   Supported: base, arbitrum\n`);
    process.exit(1);
  }
  
  console.log(`\n🔍 Loading deployment info...`);
  const deployment = findLatestDeployment(network);
  
  console.log(`\n📊 Deployment Info:`);
  console.log(`   Network: ${deployment.network}`);
  console.log(`   Chain ID: ${deployment.chainId}`);
  console.log(`   Deployed: ${deployment.timestamp}`);
  console.log(`   Type: ${deployment.deploymentType}`);
  
  const summary = {
    total: 0,
    verified: 0,
    failed: 0,
    skipped: 0,
    details: [],
  };
  
  console.log(`\n${"═".repeat(62)}`);
  console.log(`🔐 VERIFYING CONTRACTS`);
  console.log(`${"═".repeat(62)}`);
  
  for (const [contractName, address] of Object.entries(deployment.contracts)) {
    summary.total++;
    
    const result = await verifyContract(contractName, address, deployment, network);
    
    summary.details.push({
      contract: contractName,
      address: address,
      result: result,
    });
    
    if (result.skipped) {
      summary.skipped++;
    } else if (result.success) {
      summary.verified++;
    } else {
      summary.failed++;
    }
    
    // Small delay between verifications to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n${"═".repeat(62)}`);
  console.log(`📊 VERIFICATION SUMMARY`);
  console.log(`${"═".repeat(62)}`);
  console.log(`\n✅ Verified: ${summary.verified}/${summary.total}`);
  console.log(`❌ Failed: ${summary.failed}/${summary.total}`);
  console.log(`⏭️  Skipped: ${summary.skipped}/${summary.total}`);
  
  if (summary.failed > 0) {
    console.log(`\n❌ Failed Contracts:`);
    summary.details
      .filter(d => d.result.failed && d.result.failed.length > 0)
      .forEach(d => {
        console.log(`\n   ${d.contract} (${d.address})`);
        d.result.failed.forEach(f => {
          console.log(`   - ${f.service}: ${f.error.substring(0, 80)}...`);
        });
      });
  }
  
  console.log(`\n${"═".repeat(62)}`);
  console.log(`📍 VERIFICATION LINKS`);
  console.log(`${"═".repeat(62)}`);
  
  const explorerBase = network === "base" 
    ? "https://basescan.org"
    : "https://arbiscan.io";
    
  console.log(`\n🔍 Etherscan Verified Contracts:`);
  summary.details
    .filter(d => d.result.verified && d.result.verified.includes("Etherscan"))
    .forEach(d => {
      console.log(`   ${d.contract}: ${explorerBase}/address/${d.address}#code`);
    });
  
  console.log(`\n\n📝 ADDITIONAL VERIFICATION STEPS:\n`);
  console.log(`To verify on other services, run these commands:\n`);
  
  // Sourcify instructions
  console.log(`🔹 Sourcify (Decentralized):`);
  console.log(`   npx hardhat --network ${network} sourcify`);
  
  // Blockscout instructions
  console.log(`\n🔹 Blockscout:`);
  const blockscoutNetwork = network === "base" ? "baseBlockscout" : "arbitrumBlockscout";
  for (const [contractName, address] of Object.entries(deployment.contracts)) {
    const config = CONTRACT_CONFIG[contractName];
    if (config && !config.skip) {
      const argsFile = contractName === "staking" 
        ? `deploy/verify-args-staking-${network}.cjs`
        : `deploy/verify-args-${contractName}-${deployment.chainId}.cjs`;
      
      console.log(`   npx hardhat verify --network ${blockscoutNetwork} ${address} \\`);
      console.log(`     --contract ${config.contract} \\`);
      if (fs.existsSync(path.join(__dirname, "..", argsFile))) {
        console.log(`     --constructor-args ${argsFile}`);
      }
      console.log(``);
    }
  }
  
  // Routescan instructions
  console.log(`🔹 Routescan:`);
  const routescanNetwork = network === "base" ? "baseRoutescan" : "arbitrumRoutescan";
  console.log(`   (Same commands as Blockscout, but replace network with ${routescanNetwork})\n`);
  
  // Manual verification links
  console.log(`🔹 Manual Verification (if automated fails):`);
  if (network === "base") {
    console.log(`   - BaseScan: https://basescan.org/verifyContract`);
    console.log(`   - Blockscout: https://base.blockscout.com/contract-verification`);
    console.log(`   - Sourcify: https://sourcify.dev/`);
  } else {
    console.log(`   - Arbiscan: https://arbiscan.io/verifyContract`);
    console.log(`   - Blockscout: https://arbitrum.blockscout.com/contract-verification`);
    console.log(`   - Sourcify: https://sourcify.dev/`);
  }
  
  console.log(`\n`);
  
  if (summary.failed > 0) {
    console.log(`⚠️  Some contracts failed verification. Review errors above.\n`);
    process.exit(1);
  } else {
    console.log(`✅ All contracts verified successfully!\n`);
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("\n❌ Script failed:", error.message);
  console.error(error.stack);
  process.exit(1);
});
