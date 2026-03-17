require('dotenv').config();
const hre = require('hardhat');
const { ethers } = hre;

const toNumber = (value) => {
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value.toString === 'function') return Number(value.toString());
  return Number(value);
};

/**
 * Set up trusted remotes between Base (hub) and Arbitrum (destination)
 * Run this on BOTH chains to enable bidirectional communication
 */
async function main() {
  const contractAddress = '0x41d34924bd261efEB834615f991B40b02C3F2FB3';
  
  // LayerZero Chain IDs
  const BASE_LZ_CHAIN_ID = 184; // Base
  const ARBITRUM_LZ_CHAIN_ID = 110; // Arbitrum
  
  const OmnichainNabatOFT = await ethers.getContractFactory('OmnichainNabatOFT');
  const contract = OmnichainNabatOFT.attach(contractAddress);
  
  const network = await ethers.provider.getNetwork();
  const chainId = toNumber(network.chainId);
  console.log('Current Network:', network.name, '(Chain ID:', chainId, ')');
  console.log('Contract:', contractAddress);
  console.log();
  
  if (chainId === 8453) {
    // On Base - set Arbitrum as trusted remote
    console.log('Setting Arbitrum as trusted remote...');
    const tx = await contract.setTrustedRemoteAddress(
      ARBITRUM_LZ_CHAIN_ID,
      contractAddress // Same address on Arbitrum
    );
    await tx.wait();
    console.log('✅ Arbitrum trusted remote set on Base!');
    console.log();
    console.log('Next: Run this script on Arbitrum network');
    console.log('  npx hardhat run setup-trusted-remotes.js --network arbitrum');
    
  } else if (chainId === 42161) {
    // On Arbitrum - set Base as trusted remote
    console.log('Setting Base as trusted remote...');
    const tx = await contract.setTrustedRemoteAddress(
      BASE_LZ_CHAIN_ID,
      contractAddress // Same address on Base
    );
    await tx.wait();
    console.log('✅ Base trusted remote set on Arbitrum!');
    console.log();
    console.log('🎉 Cross-chain setup complete!');
    console.log('You can now bridge ONBT between Base and Arbitrum');
    
  } else {
    console.log('❌ Unknown network. Run on Base or Arbitrum.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
