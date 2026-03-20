/**
 * wire-peers.mjs
 * One-shot: set LZ peers between already-deployed Base + Arbitrum contracts.
 */
import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir   = resolve(__dirname, '..');
dotenv.config({ path: resolve(rootDir, '.env') });

const key     = process.env['PRIVATE_KEY'];
const BASE_RPC = process.env['BASE_RPC_URL']     || 'https://mainnet.base.org';
const ARB_RPC  = process.env['ARBITRUM_RPC_URL'] || 'https://arb1.arbitrum.io/rpc';

const VESTING_BASE = '0xC964d39F30768D6Fa5891Ab6e5EF5F47E2d930ED';
const VESTING_ARB  = '0xcA4C161c43641e9083e240CAd4fC27899cD4A50c';
const DIST_BASE    = '0x8c14A90e4fe11532eB8596FB918d865733135F69';
const DIST_ARB     = '0xB5870bAF387c62b2eB1528197Bb0FFe1C8F31E95';
const EID_BASE = 30184;
const EID_ARB  = 30110;

const vestArt = JSON.parse(readFileSync(resolve(rootDir,
  'artifacts/contracts/treasury/ONBTTokenVesting.sol/ONBTTokenVesting.json'), 'utf8'));
const distArt = JSON.parse(readFileSync(resolve(rootDir,
  'artifacts/contracts/treasury/ONBTMerkleDistributor.sol/ONBTMerkleDistributor.json'), 'utf8'));

const baseP = new ethers.JsonRpcProvider(BASE_RPC);
const arbP  = new ethers.JsonRpcProvider(ARB_RPC);
const baseW = new ethers.Wallet(key, baseP);
const arbW  = new ethers.Wallet(key, arbP);

async function wire(addr, abi, wallet, peerAddr, peerEid, label) {
  const c = new ethers.Contract(addr, abi, wallet);
  const peerBytes = ethers.zeroPadValue(peerAddr, 32);

  // Check if peer already set to avoid redundant TX
  let alreadyPeered = false;
  try {
    const existing = await c.peers(peerEid);
    alreadyPeered = existing && existing !== ethers.ZeroHash && existing.toLowerCase() !== ethers.ZeroHash;
  } catch { /* ignore if peers() not available */ }

  if (!alreadyPeered) {
    console.log(`  setPeer    [${label}]...`);
    const nonce1 = await wallet.provider.getTransactionCount(wallet.address, 'latest');
    const t1 = await c.setPeer(peerEid, peerBytes, { nonce: nonce1 });
    await t1.wait();
  } else {
    console.log(`  setPeer    [${label}] already set, skipping.`);
  }

  console.log(`  addPeerEid [${label}]...`);
  try {
    const nonce2 = await wallet.provider.getTransactionCount(wallet.address, 'latest');
    const t2 = await c.addPeerEid(peerEid, { nonce: nonce2 });
    await t2.wait();
  } catch (e) {
    const msg = e?.reason ?? e?.message ?? '';
    if (msg.toLowerCase().includes('already')) {
      console.log(`  addPeerEid [${label}] already registered, skipping.`);
    } else { throw e; }
  }
  console.log(`  ✓ done     [${label}]`);
}

console.log('\n🔗 Wiring Vesting peers...');
await wire(VESTING_BASE, vestArt.abi, baseW, VESTING_ARB,  EID_ARB,  'Vesting Base→Arb');
await wire(VESTING_ARB,  vestArt.abi, arbW,  VESTING_BASE, EID_BASE, 'Vesting Arb→Base');

console.log('\n🔗 Wiring Distributor peers...');
await wire(DIST_BASE, distArt.abi, baseW, DIST_ARB,  EID_ARB,  'Distributor Base→Arb');
await wire(DIST_ARB,  distArt.abi, arbW,  DIST_BASE, EID_BASE, 'Distributor Arb→Base');

console.log('\n✅ All LZ peers wired.\n');
