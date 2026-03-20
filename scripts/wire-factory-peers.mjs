/**
 * wire-factory-peers.mjs
 *
 * Sets LZ peers between the two deployed ONBTDeFiFactory registries
 * and optionally registers deployed pools in each factory.
 *
 * Usage:
 *   node scripts/wire-factory-peers.mjs
 */

import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const deployerKey = process.env['PRIVATE_KEY'];
if (!deployerKey) { console.error('❌  PRIVATE_KEY not set'); process.exit(1); }

// ─── Deployed addresses ───────────────────────────────────────────────────────
const FACTORY_BASE     = '0xe3Fb063Fc96307CCB7E59D073A8C10cA96a52D95';
const FACTORY_ARBITRUM = '0x31F3595D6d5F371bB3413F8E31237791FbfFcfdB';
const POOL_BASE        = '0xfab5a9B2e0Fc2D2e4E1e4b1ceAa7e64511a0e03e';

const CHAINS = {
  base: {
    rpc:     process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    chainId: 8453,
    localEid: 30184,
    name:    'Base',
    factory: FACTORY_BASE,
  },
  arbitrum: {
    rpc:     process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    chainId: 42161,
    localEid: 30110,
    name:    'Arbitrum',
    factory: FACTORY_ARBITRUM,
  },
};

const ABI = [
  'function setPeer(uint32 eid, bytes32 peer) external',
  'function registerLiquidityPool(address pool) external',
  'function isRegisteredContract(address) view returns (bool)',
];

async function main() {
  // ── Wire Base → Arbitrum ────────────────────────────────────────────────────
  {
    const chain   = CHAINS.base;
    const dstChain = CHAINS.arbitrum;
    const provider = new ethers.JsonRpcProvider(chain.rpc, chain.chainId);
    const wallet   = new ethers.Wallet(deployerKey, provider);
    const factory  = new ethers.Contract(chain.factory, ABI, wallet);
    const peer     = ethers.zeroPadValue(dstChain.factory, 32);

    console.log(`\n[${chain.name}] setPeer(eid=${dstChain.localEid}, ${dstChain.factory})`);
    try {
      const tx = await factory.setPeer(dstChain.localEid, peer);
      await tx.wait();
      console.log(`  ✅  ${chain.name} factory → ${dstChain.name} factory peer wired`);
    } catch (err) {
      console.warn(`  ⚠️   ${err.message}`);
    }

    // Register Base pool in Base factory
    const alreadyRegistered = await factory.isRegisteredContract(POOL_BASE);
    if (!alreadyRegistered) {
      console.log(`[${chain.name}] registerLiquidityPool(${POOL_BASE})`);
      try {
        const tx = await factory.registerLiquidityPool(POOL_BASE);
        await tx.wait();
        console.log(`  ✅  Universal Pool registered in Base factory`);
      } catch (err) {
        console.warn(`  ⚠️   Pool registration failed: ${err.message}`);
      }
    } else {
      console.log(`  ℹ️   Pool already registered in Base factory`);
    }
  }

  // ── Wire Arbitrum → Base ────────────────────────────────────────────────────
  {
    const chain    = CHAINS.arbitrum;
    const dstChain = CHAINS.base;
    const provider = new ethers.JsonRpcProvider(chain.rpc, chain.chainId);
    const wallet   = new ethers.Wallet(deployerKey, provider);
    const factory  = new ethers.Contract(chain.factory, ABI, wallet);
    const peer     = ethers.zeroPadValue(dstChain.factory, 32);

    console.log(`\n[${chain.name}] setPeer(eid=${dstChain.localEid}, ${dstChain.factory})`);
    try {
      const tx = await factory.setPeer(dstChain.localEid, peer);
      await tx.wait();
      console.log(`  ✅  ${chain.name} factory → ${dstChain.name} factory peer wired`);
    } catch (err) {
      console.warn(`  ⚠️   ${err.message}`);
    }
  }

  console.log('\n✅  Peer wiring complete.\n');
  console.log('Add to miniapp/.env.local:');
  console.log(`  NEXT_PUBLIC_ONBT_DEFI_FACTORY_BASE_ADDRESS=${FACTORY_BASE}`);
  console.log(`  NEXT_PUBLIC_ONBT_DEFI_FACTORY_ARBITRUM_ADDRESS=${FACTORY_ARBITRUM}`);
  console.log(`  NEXT_PUBLIC_ONBT_UNIVERSAL_POOL_BASE_ADDRESS=${POOL_BASE}`);
  console.log();
}

await main();
