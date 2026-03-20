/**
 * deploy-merkle-distributor.mjs
 *
 * Deploys ONBTMerkleDistributor to Base and/or Arbitrum mainnet.
 * Sets LZ peers so round metadata broadcasts cross-chain automatically.
 *
 * Usage:
 *   node scripts/deploy-merkle-distributor.mjs base
 *   node scripts/deploy-merkle-distributor.mjs arbitrum
 *   node scripts/deploy-merkle-distributor.mjs all
 *
 * Requires .env with PRIVATE_KEY, BASE_RPC_URL, ARBITRUM_RPC_URL.
 *
 * Typical full workflow:
 *   1. node scripts/deploy-merkle-distributor.mjs all
 *   2. node scripts/generate-merkle-tree.mjs airdrop-list.json
 *   3. Approve ONBT to the Base distributor address for totalAmount
 *   4. Call createRound(root, totalAmount, 0, 0, "TGE Wave 1") on Base
 *      → automatically broadcasts round metadata to Arbitrum via LZ
 *   5. Users call claim(roundId, amount, proof) on Base
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
    envKey: 'NEXT_PUBLIC_ONBT_DISTRIBUTOR_BASE_ADDRESS',
    explorer: 'https://basescan.org/address/',
  },
  arbitrum: {
    rpc:       process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId:   42161,
    lzEid:     30110,
    lzEndpoint:'0x1a44076050125825900e736c501f859c50fE728c',
    onbtToken: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    name: 'Arbitrum',
    envKey: 'NEXT_PUBLIC_ONBT_DISTRIBUTOR_ARBITRUM_ADDRESS',
    explorer: 'https://arbiscan.io/address/',
  },
};

const artifactPath = resolve(rootDir, 'artifacts/contracts/treasury/ONBTMerkleDistributor.sol/ONBTMerkleDistributor.json');
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
  console.log(`\n🚀 Deploying ONBTMerkleDistributor to ${chain.name}...`);

  const provider = new ethers.JsonRpcProvider(chain.rpc);
  const wallet   = new ethers.Wallet(deployerKey, provider);
  const balance  = await provider.getBalance(wallet.address);
  console.log(`   Deployer: ${wallet.address}`);
  console.log(`   Balance:  ${ethers.formatEther(balance)} ETH`);

  const factory  = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(
    chain.lzEndpoint,
    chain.onbtToken,
    chain.lzEid,
    { gasLimit: 6_000_000 }
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

      console.log(`   ${src.chainKey} → addPeerEid(${dst.lzEid})`);
      const tx2 = await contract.addPeerEid(dst.lzEid);
      await tx2.wait();
    }
  }
  console.log('✅ Peers wired\n');
}

const target = process.argv[2]?.toLowerCase();
if (!target || !['base', 'arbitrum', 'all'].includes(target)) {
  console.error('Usage: node scripts/deploy-merkle-distributor.mjs [base|arbitrum|all]');
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
console.log('   4. Generate your Merkle tree:');
console.log('      node scripts/generate-merkle-tree.mjs airdrop-list.json');
console.log('   5. Approve ONBT to the distributor, then createRound()');
