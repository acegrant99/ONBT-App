/**
 * deploy-defi-factory.mjs
 *
 * Deploys ONBTDeFiFactory to Base and Arbitrum mainnet.
 *
 * Usage:
 *   node scripts/deploy-defi-factory.mjs base
 *   node scripts/deploy-defi-factory.mjs arbitrum
 *   node scripts/deploy-defi-factory.mjs all
 *
 * Requires .env with PRIVATE_KEY set.
 * Writes deployed addresses to stdout for manual .env.local update.
 */

import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

dotenv.config({ path: resolve(rootDir, '.env') });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error('❌  PRIVATE_KEY not found in .env');
  process.exit(1);
}

const CHAINS = {
  base: {
    rpc: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    chainId: 8453,
    onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    name: 'Base',
    envKey: 'NEXT_PUBLIC_ONBT_DEFI_FACTORY_BASE_ADDRESS',
    explorer: 'https://basescan.org/address/',
  },
  arbitrum: {
    rpc: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId: 42161,
    onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    name: 'Arbitrum',
    envKey: 'NEXT_PUBLIC_ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS',
    explorer: 'https://arbiscan.io/address/',
  },
};

// Load compiled ABI + bytecode from hardhat artifacts
function loadArtifact(contractName) {
  const artifactPath = resolve(rootDir, `artifacts/contracts/defi/${contractName}.sol/${contractName}.json`);
  try {
    return JSON.parse(readFileSync(artifactPath, 'utf8'));
  } catch {
    console.error(`❌  Artifact not found at ${artifactPath}. Run: npx hardhat compile`);
    process.exit(1);
  }
}

async function deployToChain(chainKey) {
  const chain = CHAINS[chainKey];
  const artifact = loadArtifact('ONBTDeFiFactory');

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Deploying ONBTDeFiFactory → ${chain.name} (${chain.chainId})`);
  console.log(`${'═'.repeat(60)}`);

  const provider = new ethers.JsonRpcProvider(chain.rpc, chain.chainId);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(`  Deployer: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`  Balance:  ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.error(`  ❌  Deployer has zero balance on ${chain.name}`);
    return null;
  }

  const feeData = await provider.getFeeData();
  console.log(`  Gas price: ${feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, 'gwei') : '?'} gwei`);
  console.log(`  ONBT token: ${chain.onbtToken}`);

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log('  Broadcasting deployment transaction…');
  const contract = await factory.deploy(chain.onbtToken);
  const deployTx = contract.deploymentTransaction();
  console.log(`  Tx hash: ${deployTx?.hash}`);
  console.log('  Waiting for confirmation…');

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`\n  ✅  Deployed!`);
  console.log(`  Address: ${address}`);
  console.log(`  Explorer: ${chain.explorer}${address}`);
  console.log(`\n  Add to miniapp/.env.local:`);
  console.log(`  ${chain.envKey}=${address}`);

  return address;
}

const target = process.argv[2] ?? 'all';
const targets = target === 'all' ? ['base', 'arbitrum'] : [target];

for (const key of targets) {
  if (!CHAINS[key]) {
    console.error(`❌  Unknown chain "${key}". Use: base | arbitrum | all`);
    process.exit(1);
  }
  await deployToChain(key);
}

console.log('\n✅  Done. Copy the addresses above into miniapp/.env.local and restart the dev server.\n');
