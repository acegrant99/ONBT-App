require('dotenv').config();
const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const contractAddress = '0x41d34924bd261efEB834615f991B40b02C3F2FB3';
  
  // Connect to deployed contract
  const OmnichainNabatOFT = await ethers.getContractFactory('OmnichainNabatOFT');
  const contract = OmnichainNabatOFT.attach(contractAddress);
  
  // New logo URI
  const newLogoURI = 'ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy';
  
  console.log('Current Logo URI:', await contract.logoURI());
  
  // Update logo URI (only contract owner can do this)
  console.log('\nUpdating logo URI...');
  const tx = await contract.updateBranding(
    newLogoURI,
    await contract.website(),
    await contract.description(),
    await contract.socialLinks()
  );
  
  console.log('Transaction hash:', tx.hash);
  await tx.wait();
  
  console.log('✅ Logo URI updated!');
  console.log('New Logo URI:', await contract.logoURI());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
