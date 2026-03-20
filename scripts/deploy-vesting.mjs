/**
 * deploy-vesting.mjs
 *
 * Deploys ONBTTokenVesting to Base and/or Arbitrum mainnet.
 * Sets peer EIDs so the two deployments cross-sync schedules via LayerZero.
 *
 * Usage:
 *   node scripts/deploy-vesting.mjs base
 *   node scripts/deploy-vesting.mjs arbitrum
 *   node scripts/deploy-vesting.mjs all
 *
 * Requires .env with PRIVATE_KEY, BASE_RPC_URL, ARBITRUM_RPC_URL.
 * After running "all", call setPeer on each contract to link them.
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
if (!deployerKey) { console.error('❌  PRIVATE_KEY not set'); process.exit(1); }

const CHAINS = {
  base: {
    rpc:       process.env.BASE_RPC_URL     || 'https://mainnet.base.org',
    chainId:   8453,
    lzEid:     30184,
    lzEndpoint:'0x1a44076050125825900e736c501f859c50fE728c',
    onbtToken: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    name: 'Base',
    envKey: 'NEXT_PUBLIC_ONBT_VESTING_BASE_ADDRESS',
    explorer: 'https://basescan.org/address/',
  },
  arbitrum: {
    rpc:       process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId:   42161,
    lzEid:     30110,
    lzEndpoint:'0x1a44076050125825900e736c501f859c50fE728c',
    onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    name: 'Arbitrum',
    envKey: 'NEXT_PUBLIC_ONBT_VESTING_ARBITRUM_ADDRESS',
    explorer: 'https://arbiscan.io/address/',
  },
};

// Load compiled artifact
const artifactPath = resolve(rootDir, 'artifacts/contracts/treasury/ONBTTokenVesting.sol/ONBTTokenVesting.json');
let artifact;
try {
  artifact = JSON.parse(readFileSync(artifactPath, 'utf8'));
} catch {
  console.error('❌  Artifact not found. Run: npx hardhat compile');
  process.exit(1);
}
const { abi, bytecode } = artifact;

async function deployToChain(chainKey) {
  const chain = CHAINS[chainKey];
  console.log(`\n🚀 Deploying ONBTTokenVesting to ${chain.name}...`);

  const provider = new ethers.JsonRpcProvider(chain.rpc);
  const wallet   = new ethers.Wallet(deployerKey, provider);
  const balance  = await provider.getBalance(wallet.address);
  console.log(`   Deployer: ${wallet.address}`);
  console.log(`   Balance:  ${ethers.formatEther(balance)} ETH`);

  const factory  = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(
    chain.lzEndpoint,   // _lzEndpoint
    chain.onbtToken,    // _onbtToken
    chain.lzEid,        // _localEid
    { gasLimit: 3_000_000 }
  );

  console.log(`   TX hash:  ${contract.deploymentTransaction()?.hash}`);
  console.log(`   Waiting for confirmation...`);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`\n✅ Deployed on ${chain.name}: ${address}`);
  console.log(`   Explorer: ${chain.explorer}${address}`);
  console.log(`   Set in .env.local:`);
  console.log(`   ${chain.envKey}=${address}\n`);

  return { chainKey, address, lzEid: chain.lzEid };
}

async function wirePeers(results) {
  if (results.length < 2) return;
  console.log('\n🔗 Wiring LayerZero peers...');

  for (const src of results) {
    const srcChain = CHAINS[src.chainKey];
    const provider = new ethers.JsonRpcProvider(srcChain.rpc);
    const wallet   = new ethers.Wallet(deployerKey, provider);
    const contract = new ethers.Contract(src.address, abi, wallet);

    for (const dst of results) {
      if (dst.chainKey === src.chainKey) continue;
      const peerBytes32 = ethers.zeroPadValue(dst.address, 32);
      console.log(`   ${src.chainKey} → setPeer(${dst.lzEid}, ${dst.address})`);
      const tx = await contract.setPeer(dst.lzEid, peerBytes32);
      await tx.wait();

      // Also addPeerEid so auto-broadcast works
      console.log(`   ${src.chainKey} → addPeerEid(${dst.lzEid})`);
      const tx2 = await contract.addPeerEid(dst.lzEid);
      await tx2.wait();
    }
  }
  console.log('✅ Peers wired\n');
}

const target = process.argv[2]?.toLowerCase();
if (!target || !['base', 'arbitrum', 'all'].includes(target)) {
  console.error('Usage: node scripts/deploy-vesting.mjs [base|arbitrum|all]');
  process.exit(1);
}

const targets = target === 'all' ? ['base', 'arbitrum'] : [target];
const results = [];
for (const t of targets) {
  const result = await deployToChain(t);
  results.push(result);
}

if (results.length === 2) await wirePeers(results);

console.log('\n🎉 Done. Next steps:');
console.log('   1. Verify: node scripts/verify-all-contracts.mjs');
console.log('   2. Update miniapp/.env.local with the addresses above');
console.log('   3. Fund each contract with ETH for LZ cross-chain fees');
console.log('   4. Call createSchedule() to add vesting positions');
