// Deploy ONBTPrivateSaleOApp
// Usage:
//   ONBT_PRIVATE_SALE_START=... ONBT_PRIVATE_SALE_END=... ONBT_PRIVATE_SALE_ETH_RATE_WAD=... ONBT_PRIVATE_SALE_USDC_RATE_WAD=... ONBT_PRIVATE_SALE_USDT_RATE_WAD=... npx hardhat run deploy/deploy-private-sale.js --network base

const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const ZERO_ADDRESS = isV6 ? ethers.ZeroAddress : ethers.constants.AddressZero;

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

function getDeploymentTxHash(contract) {
  if (contract.deploymentTransaction) {
    const tx = contract.deploymentTransaction();
    return tx?.hash;
  }
  return contract.deployTransaction?.hash;
}

const DEFAULTS = {
  base: {
    lzEndpoint: '0x1a44076050125825900e736c501f859c50fE728c',
    onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    usdt: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
  },
};

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function guardedOverride(network, key, envValue, defaultValue) {
  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';
  if (!envValue) {
    return defaultValue;
  }

  if (
    defaultValue &&
    envValue.toLowerCase &&
    defaultValue.toLowerCase &&
    envValue.toLowerCase() !== defaultValue.toLowerCase() &&
    !allowNonDefault
  ) {
    console.warn(
      `[deploy-private-sale] Ignoring ${key}=${envValue} for network=${network}; using default ${defaultValue}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    return defaultValue;
  }

  return envValue;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = hre.network.name;
  const cfg = DEFAULTS[network];

  if (!cfg) {
    throw new Error(`Unsupported network: ${network}. Add defaults before deploying.`);
  }

  const saleStart = Number(requiredEnv('ONBT_PRIVATE_SALE_START'));
  const saleEnd = Number(requiredEnv('ONBT_PRIVATE_SALE_END'));
  if (!Number.isFinite(saleStart) || !Number.isFinite(saleEnd) || saleStart >= saleEnd) {
    throw new Error('Invalid ONBT_PRIVATE_SALE_START/ONBT_PRIVATE_SALE_END values');
  }

  const saleAllocation = process.env.ONBT_PRIVATE_SALE_ALLOCATION || '100000000000000000000000000'; // 100M ONBT

  const ethRateWad = requiredEnv('ONBT_PRIVATE_SALE_ETH_RATE_WAD');
  const usdcRateWad = process.env.ONBT_PRIVATE_SALE_USDC_RATE_WAD || '10000000000000000000'; // $0.10 => 10 ONBT per $1
  const usdtRateWad = process.env.ONBT_PRIVATE_SALE_USDT_RATE_WAD || '10000000000000000000'; // $0.10 => 10 ONBT per $1

  const lzEndpoint = guardedOverride(network, 'ONBT_PRIVATE_SALE_LZ_ENDPOINT', process.env.ONBT_PRIVATE_SALE_LZ_ENDPOINT, cfg.lzEndpoint);
  const onbtToken = guardedOverride(network, 'ONBT_PRIVATE_SALE_ONBT_TOKEN', process.env.ONBT_PRIVATE_SALE_ONBT_TOKEN, cfg.onbtToken);
  const owner = process.env.ONBT_PRIVATE_SALE_OWNER || deployer.address;
  const fundsRecipient = process.env.ONBT_PRIVATE_SALE_FUNDS_RECIPIENT || owner;

  const usdc = guardedOverride(network, 'ONBT_PRIVATE_SALE_USDC', process.env.ONBT_PRIVATE_SALE_USDC, cfg.usdc);
  const usdt = guardedOverride(network, 'ONBT_PRIVATE_SALE_USDT', process.env.ONBT_PRIVATE_SALE_USDT, cfg.usdt);

  const paymentTokens = [ZERO_ADDRESS, usdc, usdt];
  const rateWads = [ethRateWad, usdcRateWad, usdtRateWad];

  console.log('\n🚀 Deploying ONBTPrivateSaleOApp');
  console.log('=================================');
  console.log(`Network: ${network}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`ONBT Token: ${onbtToken}`);
  console.log(`Funds recipient: ${fundsRecipient}`);
  console.log(`Sale start: ${saleStart}`);
  console.log(`Sale end: ${saleEnd}`);
  console.log(`Sale allocation: ${saleAllocation}`);
  console.log(`ETH rateWad: ${ethRateWad}`);
  console.log(`USDC: ${usdc} rateWad: ${usdcRateWad}`);
  console.log(`USDT: ${usdt} rateWad: ${usdtRateWad}`);

  if (process.env.DRY_RUN === '1') {
    console.log('\n🧪 DRY_RUN=1 set; skipping deployment transactions.');
    console.log('Resolved deployment configuration is valid.');
    return;
  }

  const Factory = await ethers.getContractFactory('ONBTPrivateSaleOApp');
  const implementation = await Factory.deploy(lzEndpoint, onbtToken, saleAllocation);
  await waitForDeploymentCompat(implementation);
  const implementationAddress = await getAddressCompat(implementation);

  let implementationCode = await ethers.provider.getCode(implementationAddress);
  let attempts = 0;
  while (implementationCode === '0x' && attempts < 5) {
    console.log(`Waiting for implementation code availability... attempt ${attempts + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    implementationCode = await ethers.provider.getCode(implementationAddress);
    attempts += 1;
  }

  if (implementationCode === '0x') {
    throw new Error(`Implementation code not available at ${implementationAddress}`);
  }

  const initData = Factory.interface.encodeFunctionData('initialize', [
    owner,
    fundsRecipient,
    saleStart,
    saleEnd,
    paymentTokens,
    rateWads,
  ]);

  const ProxyFactory = await ethers.getContractFactory('ONBTUUPSProxy');
  const proxy = await ProxyFactory.deploy(implementationAddress, initData, { gasLimit: 8_000_000 });
  await waitForDeploymentCompat(proxy);
  const address = await getAddressCompat(proxy);

  console.log(`\n✅ ONBTPrivateSaleOApp deployed: ${address}`);
  console.log(`Implementation: ${implementationAddress}`);

  const deploymentInfo = {
    network,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    contractName: 'ONBTPrivateSaleOApp',
    proxyAddress: address,
    implementationAddress,
    deployer: deployer.address,
    deploymentMode: 'UUPS Proxy',
    constructorArgs: {
      onbtToken,
      saleAllocation,
    },
    initializeArgs: {
      lzEndpoint,
      owner,
      fundsRecipient,
      saleStart,
      saleEnd,
      paymentTokens,
      rateWads,
    },
    timestamp: new Date().toISOString(),
    deploymentTx: getDeploymentTxHash(proxy),
    implementationDeploymentTx: getDeploymentTxHash(implementation),
  };

  const filename = `deployment-private-sale-${network}-${Date.now()}.json`;
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(deploymentInfo, null, 2));
  console.log(`📄 Saved: deploy/${filename}`);

  console.log('\n📌 Next steps:');
  console.log('1) Transfer ONBT inventory to this contract');
  console.log('2) Set NEXT_PUBLIC_ONBT_PRIVATE_SALE_ADDRESS in miniapp env');
  console.log('3) Run miniapp and verify ETH/USDC/USDT buy flows');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
