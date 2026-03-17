require('dotenv').config();
const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const contractAddress = '0x41d34924bd261efEB834615f991B40b02C3F2FB3';
  
  const OmnichainNabatOFT = await ethers.getContractFactory('OmnichainNabatOFT');
  const contract = OmnichainNabatOFT.attach(contractAddress);
  
  const newLogoURI = 'ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy';
  
  console.log('Updating logo URI on Arbitrum...');
  const tx = await contract.updateBranding(
    newLogoURI,
    await contract.website(),
    await contract.description(),
    await contract.socialLinks()
  );
  
  await tx.wait();
  console.log('✅ Logo URI updated on Arbitrum!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
