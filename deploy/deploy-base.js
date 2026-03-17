require('dotenv').config();
const { execSync } = require('child_process');

// Validate environment
const BASE_RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY not set in .env file');
  process.exit(1);
}

console.log('✅ Environment configured');
console.log('📡 Base RPC:', BASE_RPC_URL);
const ethers = require('ethers');
console.log('💰 Deployer:', new ethers.Wallet(PRIVATE_KEY).address);
console.log('🌟 HUB CHAIN: Will deploy with 1 BILLION supply');
console.log('💡 Base has low gas fees (~$0.01-0.20)');
console.log();

try {
  execSync('npx hardhat run scripts/deploy-base-oft.mjs --network base', {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Deployment failed');
  process.exit(1);
}
