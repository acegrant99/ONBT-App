#!/usr/bin/env node
/**
 * generate-merkle-tree.mjs
 *
 * Builds a Merkle tree from a list of (address, amount) pairs and outputs:
 *   1. The Merkle root  (paste into createRound() call)
 *   2. A proofs JSON file with per-address proofs  (distribute privately)
 *   3. A summary to stdout
 *
 * Usage
 * -----
 *   node scripts/generate-merkle-tree.mjs <input-file> [output-file]
 *
 * Input file formats
 * ------------------
 *   JSON:  [{ "address": "0x...", "amount": "1000000000000000000" }, ...]
 *   CSV:   address,amount  (header required, amount in wei/base units)
 *
 *   Amounts can be plain integers (wei) or human-readable with unit suffix:
 *     "500"          → 500 (raw)
 *     "500 ONBT"     → 500 * 1e18  (treats as 18-decimal token)
 *     "500 ether"    → 500 * 1e18
 *
 * Output
 * ------
 *   Default output-file: <input-basename>-proofs.json
 *   Schema:
 *   {
 *     "root":        "0x...",
 *     "totalAmount": "...",
 *     "count":       123,
 *     "generatedAt": "2026-03-19T...",
 *     "entries": [
 *       {
 *         "address": "0x...",
 *         "amount":  "...",
 *         "proof":   ["0x...", "0x..."]
 *       }
 *     ]
 *   }
 *
 * Security note
 * -------------
 * The proofs file contains every user's proof. Distribute individually
 * (each user gets only their own proof) unless you want the full list public.
 * The Merkle root is public — post it on-chain.
 *
 * Dependencies: none beyond Node 18 built-ins
 * (uses crypto.createHash for keccak256 via a minimal polyfill; ethers not required)
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─────────────────────────────────────────────────────────
// keccak256 via Node crypto (same as solidity keccak256)
// ─────────────────────────────────────────────────────────
function keccak256(buf) {
  return createHash('sha3-256').update(buf).digest();
  // NOTE: Node's sha3-256 is Keccak-256 (pre-standardised SHA3), matching EVM.
}

function keccak256Hex(buf) {
  return '0x' + keccak256(buf).toString('hex');
}

// ─────────────────────────────────────────────────────────
// Leaf encoding: keccak256(abi.encodePacked(address, uint256))
// Matches ONBTMerkleDistributor.sol claim() leaf construction.
// ─────────────────────────────────────────────────────────
function encodeLeaf(address, amountBigInt) {
  // address: 20 bytes (strip 0x, lowercase)
  const addrBuf = Buffer.from(address.toLowerCase().replace(/^0x/, ''), 'hex');
  if (addrBuf.length !== 20) throw new Error(`Invalid address: ${address}`);

  // uint256: 32 bytes big-endian
  const amountHex = amountBigInt.toString(16).padStart(64, '0');
  const amountBuf = Buffer.from(amountHex, 'hex');

  const packed = Buffer.concat([addrBuf, amountBuf]);
  return keccak256(packed);
}

// ─────────────────────────────────────────────────────────
// Merkle tree construction (standard binary tree, sorted pairs)
// ─────────────────────────────────────────────────────────
function hashPair(a, b) {
  // Sort to ensure deterministic tree (standard practice)
  const [left, right] = Buffer.compare(a, b) <= 0 ? [a, b] : [b, a];
  return keccak256(Buffer.concat([left, right]));
}

function buildTree(leaves) {
  if (leaves.length === 0) throw new Error('Empty leaves');

  // Pad to power of 2
  let level = [...leaves];
  const size = nextPow2(level.length);
  while (level.length < size) {
    level.push(level[level.length - 1]); // duplicate last leaf to pad
  }

  const layers = [level];
  while (level.length > 1) {
    const next = [];
    for (let i = 0; i < level.length; i += 2) {
      next.push(hashPair(level[i], level[i + 1]));
    }
    level = next;
    layers.push(level);
  }
  return layers;
}

function getProof(layers, leafIndex) {
  const proof = [];
  let idx = leafIndex;
  for (let l = 0; l < layers.length - 1; l++) {
    const layer = layers[l];
    const sibling = idx % 2 === 0 ? idx + 1 : idx - 1;
    if (sibling < layer.length) {
      proof.push('0x' + layer[sibling].toString('hex'));
    }
    idx = Math.floor(idx / 2);
  }
  return proof;
}

function nextPow2(n) {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

// ─────────────────────────────────────────────────────────
// Amount parsing
// ─────────────────────────────────────────────────────────
const UNITS = {
  onbt:  BigInt('1000000000000000000'), // 1e18
  ether: BigInt('1000000000000000000'),
  gwei:  BigInt('1000000000'),
  wei:   BigInt(1),
};

function parseAmount(raw) {
  const str = String(raw).trim().toLowerCase();
  for (const [unit, mul] of Object.entries(UNITS)) {
    if (str.endsWith(` ${unit}`)) {
      const num = str.slice(0, -unit.length - 1).trim();
      // Support decimals in human-readable amounts
      const [intPart, decPart = ''] = num.split('.');
      const dec = decPart.padEnd(18, '0').slice(0, 18);
      return BigInt(intPart) * mul + BigInt(dec) * (mul / BigInt('1000000000000000000'));
    }
  }
  return BigInt(str);
}

// ─────────────────────────────────────────────────────────
// CSV parsing (simple, no external deps)
// ─────────────────────────────────────────────────────────
function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].toLowerCase().split(',').map((h) => h.trim());
  const addrIdx = header.indexOf('address');
  const amtIdx  = header.indexOf('amount');
  if (addrIdx < 0 || amtIdx < 0) {
    throw new Error('CSV must have "address" and "amount" columns');
  }
  return lines.slice(1).filter(Boolean).map((line) => {
    const cols = line.split(',').map((c) => c.trim());
    return { address: cols[addrIdx], amount: cols[amtIdx] };
  });
}

// ─────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────
function validateAddress(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test(addr);
}

// ─────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node scripts/generate-merkle-tree.mjs <input-file> [output-file]');
    process.exit(1);
  }

  const inputPath  = resolve(process.cwd(), args[0]);
  const ext        = extname(inputPath).toLowerCase();
  const baseName   = basename(inputPath, ext);
  const outputPath = args[1]
    ? resolve(process.cwd(), args[1])
    : resolve(dirname(inputPath), `${baseName}-proofs.json`);

  console.log(`\n📂 Reading: ${inputPath}`);
  const raw = readFileSync(inputPath, 'utf8');

  let rawEntries;
  if (ext === '.csv') {
    rawEntries = parseCsv(raw);
  } else {
    rawEntries = JSON.parse(raw);
  }

  console.log(`📋 Entries found: ${rawEntries.length}`);

  // Parse + validate
  const entries = [];
  const seen = new Set();
  let totalAmount = BigInt(0);

  for (const row of rawEntries) {
    const addr = String(row.address || row.Address || '').trim();
    const amtRaw = row.amount ?? row.Amount ?? row.allocation ?? '0';

    if (!validateAddress(addr)) {
      throw new Error(`Invalid address: "${addr}"`);
    }
    const addrLower = addr.toLowerCase();
    if (seen.has(addrLower)) {
      throw new Error(`Duplicate address: ${addr} — each address may appear only once per round`);
    }
    seen.add(addrLower);

    const amount = parseAmount(amtRaw);
    if (amount <= 0n) throw new Error(`Amount must be > 0 for ${addr}`);

    totalAmount += amount;
    entries.push({ address: addr, amount });
  }

  console.log(`💰 Total allocation: ${totalAmount.toString()} (raw units)`);
  console.log(`   = ${Number(totalAmount) / 1e18} ONBT (assuming 18 decimals)`);

  // Build leaves
  const leafBuffers = entries.map((e) => encodeLeaf(e.address, e.amount));

  // Build tree
  const layers = buildTree(leafBuffers);
  const root   = '0x' + layers[layers.length - 1][0].toString('hex');

  console.log(`\n🌳 Merkle root: ${root}`);
  console.log(`   Depth: ${layers.length - 1} levels for ${entries.length} entries\n`);

  // Generate proofs
  const output = {
    root,
    totalAmount: totalAmount.toString(),
    totalAmountOnbt: (Number(totalAmount) / 1e18).toFixed(6),
    count: entries.length,
    generatedAt: new Date().toISOString(),
    entries: entries.map((e, i) => ({
      address: e.address,
      amount:  e.amount.toString(),
      proof:   getProof(layers, i),
    })),
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ Proofs written to: ${outputPath}`);
  console.log('\n─────────────────────────────────────────────────');
  console.log('Next steps:');
  console.log(`  1. Deploy ONBTMerkleDistributor to Base + Arbitrum`);
  console.log(`     node scripts/deploy-merkle-distributor.mjs base`);
  console.log(`  2. Approve ONBT transfer to the distributor contract`);
  console.log(`  3. Call createRound() with:`);
  console.log(`       merkleRoot:  ${root}`);
  console.log(`       totalAmount: ${totalAmount.toString()}`);
  console.log(`       startTime:   0  (or a future unix timestamp)`);
  console.log(`       endTime:     0  (or expiry unix timestamp)`);
  console.log(`  4. Distribute individual proofs to each recipient`);
  console.log('─────────────────────────────────────────────────\n');
}

try {
  main();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
