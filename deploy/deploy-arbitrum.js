require('dotenv').config();
const { execSync } = require('child_process');

// Validate environment
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY not set in .env file');
  process.exit(1);
}

console.log('✅ Environment configured');
console.log('📡 Arbitrum RPC:', ARBITRUM_RPC_URL);
const ethers = require('ethers');
console.log('💰 Deployer:', new ethers.Wallet(PRIVATE_KEY).address);
console.log('⚠️  DESTINATION CHAIN: Will deploy with ZERO supply');
console.log('💡 Arbitrum has very low gas fees (~$0.10-0.50)');
console.log();

// Set environment and deploy
process.env.DEPLOYMENT_TYPE = 'destination';

try {
  execSync('npx hardhat run scripts/deployONBT.mjs --network arbitrum', {
    stdio: 'inherit',
    env: { ...process.env, DEPLOYMENT_TYPE: 'destination' }
  });
} catch (error) {
  console.error('Deployment failed');
  process.exit(1);
}
