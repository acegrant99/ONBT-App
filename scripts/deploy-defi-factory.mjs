/**
 * deploy-defi-factory.mjs
 *
 * Deploys ONBTDeFiFactory registry to Base and/or Arbitrum mainnet,
 * then pre-registers the already-deployed ecosystem contracts.
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

const deployerKey = process.env['PRIVATE_KEY'];
if (!deployerKey) {
  console.error('❌  PRIVATE_KEY not found in .env');
  process.exit(1);
}

// Already-deployed production contracts to pre-register in the factory
const EXISTING_CONTRACTS = {
  base: {
    staking:     '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe', // ONBTOmnichainStaking
    pool:        '0xb362Af3da1497A551C08F79bC03CbA12D2b7e908', // ONBTLiquidityManager
    distributor: '0x8c91384EbF767C1C434d127c82020380F4A8afC7', // ONBTYieldDistributor
  },
  arbitrum: {
    staking:     '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44', // ONBTOmnichainStaking
    pool:        '0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3', // ONBTLiquidityManager
    distributor: '0x2085ca5081480e8634eF4295ef477fe8cE97B892', // ONBTYieldDistributor
  },
};

const CHAINS = {
  base: {
    rpc: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    chainId: 8453,
    lzEndpoint: '0x1a44076050125825900e736c501f859c50fE728c',
    localEid: 30184,
    onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    name: 'Base',
    envKey: 'NEXT_PUBLIC_ONBT_DEFI_FACTORY_BASE_ADDRESS',
    explorer: 'https://basescan.org/address/',
  },
  arbitrum: {
    rpc: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId: 42161,
    lzEndpoint: '0x1a44076050125825900e736c501f859c50fE728c',
    localEid: 30110,
    onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    name: 'Arbitrum',
    envKey: 'NEXT_PUBLIC_ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS',
    explorer: 'https://arbiscan.io/address/',
  },
};

// Minimal ABI for post-deploy registration calls
const REGISTER_ABI = [
  'function registerStaking(address staking) external',
  'function registerLiquidityPool(address pool) external',
  'function registerYieldDistributor(address distributor) external',
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
  const existing = EXISTING_CONTRACTS[chainKey];
  const artifact = loadArtifact('ONBTDeFiFactory', 'registry');

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Deploying ONBTDeFiFactory registry → ${chain.name} (${chain.chainId})`);
  console.log(`${'═'.repeat(60)}`);

  const provider = new ethers.JsonRpcProvider(chain.rpc, chain.chainId);
  const wallet = new ethers.Wallet(deployerKey, provider);

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

  console.log(`  LZ Endpoint: ${chain.lzEndpoint}`);
  console.log(`  Local EID:   ${chain.localEid}`);
  console.log('  Broadcasting deployment transaction…');
  const contract = await factory.deploy(chain.lzEndpoint, chain.onbtToken, chain.localEid);
  const deployTx = contract.deploymentTransaction();
  console.log(`  Tx hash: ${deployTx?.hash}`);
  console.log('  Waiting for confirmation…');
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`\n  ✅  Deployed at ${address}`);
  console.log(`  Explorer: ${chain.explorer}${address}`);

  // Pre-register existing production contracts
  const registry = new ethers.Contract(address, REGISTER_ABI, wallet);
  console.log('\n  Registering existing ecosystem contracts…');

  const registrations = [
    { fn: 'registerStaking',         addr: existing.staking,     label: 'ONBTOmnichainStaking' },
    { fn: 'registerLiquidityPool',   addr: existing.pool,        label: 'ONBTLiquidityManager' },
    { fn: 'registerYieldDistributor',addr: existing.distributor, label: 'ONBTYieldDistributor'  },
  ];

  for (const { fn, addr, label } of registrations) {
    try {
      const tx = await registry[fn](addr);
      await tx.wait();
      console.log(`  ✅  ${label} registered (${addr})`);
    } catch (err) {
      console.warn(`  ⚠️   ${label} registration failed: ${err.message}`);
    }
  }

  console.log(`\n  Add to miniapp/.env.local:`);
  console.log(`  ${chain.envKey}=${address}`);

  return address;
}

const SET_PEER_ABI = [
  'function setPeer(uint32 eid, bytes32 peer) external',
];

async function wirePeers(deployedAddresses) {
  const keys = Object.keys(deployedAddresses);
  if (keys.length < 2) return;

  console.log('\n' + '═'.repeat(60));
  console.log('  Wiring LZ peers between factory deployments…');
  console.log('═'.repeat(60));

  for (const srcKey of keys) {
    const srcChain = CHAINS[srcKey];
    const srcAddr  = deployedAddresses[srcKey];
    const provider = new ethers.JsonRpcProvider(srcChain.rpc, srcChain.chainId);
    const wallet   = new ethers.Wallet(deployerKey, provider);
    const contract = new ethers.Contract(srcAddr, SET_PEER_ABI, wallet);

    for (const dstKey of keys) {
      if (dstKey === srcKey) continue;
      const dstChain = CHAINS[dstKey];
      const dstAddr  = deployedAddresses[dstKey];
      const peerBytes32 = ethers.zeroPadValue(dstAddr, 32);
      try {
        const tx = await contract.setPeer(dstChain.localEid, peerBytes32);
        await tx.wait();
        console.log(`  ✅  ${srcChain.name} → ${dstChain.name} peer set (eid ${dstChain.localEid})`);
      } catch (err) {
        console.warn(`  ⚠️   setPeer failed (${srcChain.name}→${dstChain.name}): ${err.message}`);
      }
    }
  }
}

const target = process.argv[2] ?? 'all';
const targets = target === 'all' ? ['base', 'arbitrum'] : [target];

const deployedAddresses = {};
for (const key of targets) {
  if (!CHAINS[key]) {
    console.error(`❌  Unknown chain "${key}". Use: base | arbitrum | all`);
    process.exit(1);
  }
  const addr = await deployToChain(key);
  if (addr) deployedAddresses[key] = addr;
}

if (targets.length > 1) {
  await wirePeers(deployedAddresses);
}

console.log('\n✅  Done. Copy the addresses above into miniapp/.env.local and restart the dev server.\n');
