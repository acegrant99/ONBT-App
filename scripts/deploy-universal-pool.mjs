/**
 * deploy-universal-pool.mjs
 *
 * Deploys ONBTUniversalLiquidityPool (ONBT/USDC volatile AMM) on Base and/or Arbitrum,
 * then optionally registers the deployed pool in the ONBTDeFiFactory registry.
 *
 * Usage:
 *   node scripts/deploy-universal-pool.mjs base
 *   node scripts/deploy-universal-pool.mjs arbitrum
 *   node scripts/deploy-universal-pool.mjs all
 *
 * Requires .env with PRIVATE_KEY set.
 * If ONBT_DEFI_FACTORY_BASE_ADDRESS / ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS are set the
 * pool will be auto-registered in the corresponding factory.
 */

import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
dotenv.config({ path: resolve(rootDir, '.env') });

const deployerKey = process.env['PRIVATE_KEY'];
if (!deployerKey) {
  console.error('❌  PRIVATE_KEY not found in .env');
  process.exit(1);
}

const CHAINS = {
  base: {
    rpc:       process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    chainId:   8453,
    name:      'Base',
    explorer:  'https://basescan.org/address/',
    onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    usdc:      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
    envKey:    'NEXT_PUBLIC_ONBT_UNIVERSAL_POOL_BASE_ADDRESS',
    factoryEnvKey: 'ONBT_DEFI_FACTORY_BASE_ADDRESS',
  },
  arbitrum: {
    rpc:       process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId:   42161,
    name:      'Arbitrum',
    explorer:  'https://arbiscan.io/address/',
    onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    usdc:      '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC on Arbitrum
    envKey:    'NEXT_PUBLIC_ONBT_UNIVERSAL_POOL_ARBITRUM_ADDRESS',
    factoryEnvKey: 'ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS',
  },
};

const REGISTER_POOL_ABI = [
  'function registerLiquidityPool(address pool) external',
];

function loadArtifact(contractName, subdir) {
  const artifactPath = resolve(rootDir, `artifacts/contracts/${subdir}/${contractName}.sol/${contractName}.json`);
  try {
    return JSON.parse(readFileSync(artifactPath, 'utf8'));
  } catch {
    console.error(`❌  Artifact not found at ${artifactPath}. Run: npx hardhat compile`);
    process.exit(1);
  }
}

async function deployToChain(chainKey) {
  const chain = CHAINS[chainKey];
  const artifact = loadArtifact('ONBTUniversalLiquidityPool', 'liquidity');

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Deploying ONBTUniversalLiquidityPool → ${chain.name} (${chain.chainId})`);
  console.log(`${'═'.repeat(60)}`);

  const provider = new ethers.JsonRpcProvider(chain.rpc, chain.chainId);
  const wallet   = new ethers.Wallet(deployerKey, provider);

  console.log(`  Deployer:   ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`  Balance:    ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.error(`  ❌  Deployer has zero balance on ${chain.name}`);
    return null;
  }

  const feeData = await provider.getFeeData();
  console.log(`  Gas price:  ${feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, 'gwei') : '?'} gwei`);
  console.log(`  Token0 (ONBT): ${chain.onbtToken}`);
  console.log(`  Token1 (USDC): ${chain.usdc}`);
  console.log(`  Fee recipient: ${wallet.address} (deployer)`);
  console.log(`  Stable curve:  false (volatile xy=k)`);

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log('  Broadcasting deployment transaction…');
  // constructor(address _token0, address _token1, address _feeRecipient, bool _stable)
  const pool = await factory.deploy(
    chain.onbtToken,
    chain.usdc,
    wallet.address, // feeRecipient = deployer
    false,          // volatile AMM (xy=k)
  );
  const deployTx = pool.deploymentTransaction();
  console.log(`  Tx hash: ${deployTx?.hash}`);
  console.log('  Waiting for confirmation…');
  await pool.waitForDeployment();

  const poolAddress = await pool.getAddress();
  console.log(`\n  ✅  Deployed at ${poolAddress}`);
  console.log(`  Explorer: ${chain.explorer}${poolAddress}`);

  // Optionally register in factory if address is set in env
  const factoryAddress = process.env[chain.factoryEnvKey];
  if (factoryAddress && ethers.isAddress(factoryAddress)) {
    console.log(`\n  Registering pool in ONBTDeFiFactory (${factoryAddress})…`);
    try {
      const registryContract = new ethers.Contract(factoryAddress, REGISTER_POOL_ABI, wallet);
      const tx = await registryContract.registerLiquidityPool(poolAddress);
      await tx.wait();
      console.log(`  ✅  Pool registered in factory`);
    } catch (err) {
      console.warn(`  ⚠️   Factory registration failed: ${err.message}`);
    }
  } else {
    console.log(`\n  ℹ️   Set ${chain.factoryEnvKey}=<factory-address> in .env to auto-register the pool.`);
  }

  console.log(`\n  Add to miniapp/.env.local:`);
  console.log(`  ${chain.envKey}=${poolAddress}`);

  return poolAddress;
}

const target  = process.argv[2] ?? 'all';
const targets = target === 'all' ? ['base', 'arbitrum'] : [target];

for (const key of targets) {
  if (!CHAINS[key]) {
    console.error(`❌  Unknown chain "${key}". Use: base | arbitrum | all`);
    process.exit(1);
  }
  await deployToChain(key);
}

console.log('\n✅  Done. Copy the addresses above into miniapp/.env.local and restart the dev server.\n');
