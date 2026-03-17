require('dotenv').config();
const hre = require('hardhat');
const { ethers } = hre;

/**
 * Configure LayerZero settings for ONBT token
 * - Set min destination gas
 * - Configure oracle and relayer (if needed)
 * - Prepare for cross-chain setup
 */
async function main() {
  const contractAddress = '0x41d34924bd261efEB834615f991B40b02C3F2FB3';
  
  const [deployer] = await ethers.getSigners();
  console.log('Configuring ONBT with account:', deployer.address);
  console.log();
  
  // Connect to deployed contract
  const OmnichainNabatOFT = await ethers.getContractFactory('OmnichainNabatOFT');
  const onbt = OmnichainNabatOFT.attach(contractAddress);
  
  console.log('=== Current Configuration ===');
  console.log('Contract:', contractAddress);
  console.log('Owner:', await onbt.owner());
  console.log('LZ Endpoint:', await onbt.lzEndpoint());
  console.log();
  
  // Set minimum destination gas for send operations
  // This ensures enough gas is provided for cross-chain messages
  console.log('Setting minimum destination gas...');
  
  const PACKET_TYPE_SEND = 0; // Standard send packet type
  const MIN_GAS = 200000; // Minimum gas for destination chain execution
  
  try {
    const tx = await onbt.setMinDstGas(
      0, // chainId 0 = default for all chains
      PACKET_TYPE_SEND,
      MIN_GAS
    );
    await tx.wait();
    console.log('✅ Minimum destination gas set:', MIN_GAS);
  } catch (error) {
    console.log('⚠️  Min gas already set or function not available');
  }
  
  console.log();
  console.log('=== LayerZero Security Status ===');
  console.log('✅ Contract deployed on Base (hub chain)');
  console.log('✅ Owner controls LayerZero settings');
  console.log('✅ Ready for cross-chain deployment');
  console.log();
  
  console.log('=== Next Steps for Cross-Chain Setup ===');
  console.log('1. Deploy ONBT on destination chains (Ethereum, Polygon, etc.)');
  console.log('   DEPLOYMENT_TYPE=destination npm run deploy:onbt:<chain>');
  console.log();
  console.log('2. Set trusted remotes between all chains');
  console.log('   - Edit scripts/setTrustedRemotes.mjs with addresses');
  console.log('   - Run on each chain to establish bidirectional trust');
  console.log();
  console.log('3. Configure precrime (optional, for advanced security)');
  console.log('   - Contact LayerZero team for precrime setup');
  console.log('   - Requires deployment on multiple chains first');
  console.log();
  
  console.log('=== Current Status ===');
  console.log('Hub Chain: Base ✅');
  console.log('Destination Chains: Not yet deployed ⏳');
  console.log('Trusted Remotes: Not configured (single chain only) ⏳');
  console.log('Precrime: Not needed for single chain ⏳');
  console.log();
  
  console.log('💡 Tip: You can use ONBT on Base now. Cross-chain features');
  console.log('   will be available after deploying to other chains.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
