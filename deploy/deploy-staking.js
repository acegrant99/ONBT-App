// Deploy ONBTOmnichainStaking contract
// Usage: node deploy/deploy-staking.js

const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const { ethers } = hre;

const isV6 = typeof ethers.parseEther === 'function';
const formatEther = (value) => (isV6 ? ethers.formatEther(value) : ethers.utils.formatEther(value));

async function waitForDeploymentCompat(contract) {
  if (contract.waitForDeployment) {
    await contract.waitForDeployment();
    return;
  }
  if (contract.deployed) {
    await contract.deployed();
  }
}

async function getAddressCompat(contract) {
  if (contract.getAddress) {
    return contract.getAddress();
  }
  return contract.address;
}

function getDeploymentTx(contract) {
  if (contract.deploymentTransaction) {
    return contract.deploymentTransaction();
  }
  return contract.deployTransaction;
}

// LayerZero Endpoint addresses
const LZ_ENDPOINTS = {
  base: '0x1a44076050125825900e736c501f859c50fE728c',       // Base mainnet
  arbitrum: '0x1a44076050125825900e736c501f859c50fE728c',   // Arbitrum mainnet
};

// LayerZero EIDs
const LZ_EIDS = {
  base: 30184,
  arbitrum: 30110,
};

// Current deployed ONBT/OFT addresses (fallback defaults)
const DEFAULT_ONBT_ADDRESSES = {
  base: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
  arbitrum: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
};

// Optional network-specific ONBT addresses from environment
const ONBT_ADDRESSES = {
  base: process.env.ONBT_TOKEN_BASE || DEFAULT_ONBT_ADDRESSES.base,
  arbitrum: process.env.ONBT_TOKEN_ARBITRUM || DEFAULT_ONBT_ADDRESSES.arbitrum,
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = hre.network.name;
  
  console.log('\n🚀 Deploying ONBTOmnichainStaking Contract');
  console.log('==========================================');
  console.log(`Network: ${network}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${formatEther(await ethers.provider.getBalance(deployer.address))} ETH\n`);
  
  // Determine if this is the hub chain (Base)
  const isHub = network === 'base';
  const localEid = LZ_EIDS[network];
  const hubChainEid = LZ_EIDS.base;
  const lzEndpoint = LZ_ENDPOINTS[network];
  const onbtToken = process.env.ONBT_TOKEN_ADDRESS || ONBT_ADDRESSES[network];
  
  if (!lzEndpoint || !onbtToken) {
    throw new Error(
      `Missing config for network ${network}. Set ONBT_TOKEN_ADDRESS or ONBT_TOKEN_${network.toUpperCase()} (e.g. ONBT_TOKEN_BASE / ONBT_TOKEN_ARBITRUM).`
    );
  }
  
  console.log('Deployment Configuration:');
  console.log(`- LayerZero Endpoint: ${lzEndpoint}`);
  console.log(`- ONBT Token: ${onbtToken}`);
  console.log(`- Local EID: ${localEid}`);
  console.log(`- Hub EID: ${hubChainEid}`);
  console.log(`- Is Hub: ${isHub}\n`);
  
  // Deploy contract
  console.log('Deploying contract...');
  const ONBTOmnichainStaking = await ethers.getContractFactory('ONBTOmnichainStaking');
  const staking = await ONBTOmnichainStaking.deploy(
    lzEndpoint,
    onbtToken,
    localEid,
    hubChainEid,
    isHub
  );
  
  await waitForDeploymentCompat(staking);
  const stakingAddress = await getAddressCompat(staking);
  
  console.log(`✅ ONBTOmnichainStaking deployed to: ${stakingAddress}`);
  
  // Save deployment info
  const deploymentNetwork = await ethers.provider.getNetwork();
  const deploymentTx = getDeploymentTx(staking);

  const deploymentInfo = {
    network,
    chainId: Number(deploymentNetwork.chainId),
    contractName: 'ONBTOmnichainStaking',
    address: stakingAddress,
    deployer: deployer.address,
    lzEndpoint,
    onbtToken,
    localEid,
    hubChainEid,
    isHub,
    timestamp: new Date().toISOString(),
    deploymentTx: deploymentTx?.hash,
  };
  
  const filename = `deployment-staking-${network}-${Date.now()}.json`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
  
  console.log(`\n📄 Deployment info saved to: ${filename}`);
  
  // Wait for confirmations before verification
  console.log('\n⏳ Waiting for block confirmations...');
  if (deploymentTx?.wait) {
    await deploymentTx.wait(5);
  }
  
  // Verify on explorer
  if (network !== 'hardhat' && network !== 'localhost') {
    console.log('\n🔍 Verifying contract on explorer...');
    try {
      await hre.run('verify:verify', {
        address: stakingAddress,
        constructorArguments: [lzEndpoint, onbtToken, localEid, hubChainEid, isHub],
      });
      console.log('✅ Contract verified');
    } catch (error) {
      console.log('❌ Verification failed:', error.message);
    }
  }
  
  // Setup instructions
  console.log('\n📋 Next Steps:');
  console.log('===============');
  console.log('1. Deploy on other chains (Base and Arbitrum)');
  console.log('2. Set LayerZero V2 peers:');
  console.log(`   - From Base to Arbitrum: setPeer(${LZ_EIDS.arbitrum}, bytes32(uint256(uint160(<arbitrum_address>))))`);
  console.log(`   - From Arbitrum to Base: setPeer(${LZ_EIDS.base}, bytes32(uint256(uint160(<base_address>))))`);
  console.log('3. Fund contract with ONBT rewards pool');
  console.log('4. Update miniapp config/contracts.ts with new address');
  console.log('5. Test staking on both chains\n');
  
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
