require('dotenv').config();
const { execSync } = require('child_process');

// Validate environment
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!ETHEREUM_RPC_URL) {
  console.error('❌ ETHEREUM_RPC_URL not set in .env file');
  console.log('📝 Add to .env:');
  console.log('   ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
  process.exit(1);
}

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY not set in .env file');
  process.exit(1);
}

console.log('✅ Environment configured');
console.log('📡 Ethereum RPC:', ETHEREUM_RPC_URL.substring(0, 40) + '...');
const ethers = require('ethers');
console.log('💰 Deployer:', new ethers.Wallet(PRIVATE_KEY).address);
console.log('⚠️  DESTINATION CHAIN: Will deploy with ZERO supply');
console.log();

// Set environment and deploy
process.env.DEPLOYMENT_TYPE = 'destination';

try {
  execSync('npx hardhat run scripts/deployONBT.mjs --network ethereum', {
    stdio: 'inherit',
    env: { ...process.env, DEPLOYMENT_TYPE: 'destination' }
  });
} catch (error) {
  console.error('Deployment failed');
  process.exit(1);
}
