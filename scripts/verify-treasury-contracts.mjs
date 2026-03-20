/**
 * verify-treasury-contracts.mjs
 *
 * Verifies ONBTTokenVesting and ONBTMerkleDistributor on Basescan + Arbiscan
 * using Etherscan V2 standard-json-input (most reliable method).
 *
 * Usage:
 *   node scripts/verify-treasury-contracts.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
dotenv.config({ path: resolve(root, '.env') });

const API_KEY = process.env.ETHERSCAN_API_KEY;
if (!API_KEY) { console.error('❌  ETHERSCAN_API_KEY not set'); process.exit(1); }

const CONTRACTS = [
  {
    name: 'ONBTTokenVesting',
    file: 'contracts/treasury/ONBTTokenVesting.sol',
    network: 'base',
    chainId: 8453,
    address: '0xC964d39F30768D6Fa5891Ab6e5EF5F47E2d930ED',
    constructorArgs: [
      '0x1a44076050125825900e736c501f859c50fE728c', // lzEndpoint
      '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5', // onbtToken
      30184,                                         // localEid
    ],
    explorerUrl: 'https://basescan.org',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
  {
    name: 'ONBTMerkleDistributor',
    file: 'contracts/treasury/ONBTMerkleDistributor.sol',
    network: 'base',
    chainId: 8453,
    address: '0x8c14A90e4fe11532eB8596FB918d865733135F69',
    constructorArgs: [
      '0x1a44076050125825900e736c501f859c50fE728c',
      '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
      30184,
    ],
    explorerUrl: 'https://basescan.org',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
  {
    name: 'ONBTTokenVesting',
    file: 'contracts/treasury/ONBTTokenVesting.sol',
    network: 'arbitrum',
    chainId: 42161,
    address: '0xcA4C161c43641e9083e240CAd4fC27899cD4A50c',
    constructorArgs: [
      '0x1a44076050125825900e736c501f859c50fE728c',
      '0x169aC761Ebb210B5A93B68B44DA394776a7B230C', // onbtToken (Arbitrum)
      30110,                                          // localEid
    ],
    explorerUrl: 'https://arbiscan.io',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
  {
    name: 'ONBTMerkleDistributor',
    file: 'contracts/treasury/ONBTMerkleDistributor.sol',
    network: 'arbitrum',
    chainId: 42161,
    address: '0xB5870bAF387c62b2eB1528197Bb0FFe1C8F31E95',
    constructorArgs: [
      '0x1a44076050125825900e736c501f859c50fE728c',
      '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
      30110,
    ],
    explorerUrl: 'https://arbiscan.io',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
];

// ABI-encode constructor args (all are: address, address, uint32)
import { ethers } from 'ethers';
function encodeArgs(args) {
  // address, address, uint32
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  return abiCoder.encode(['address', 'address', 'uint32'], args).slice(2); // strip 0x
}

// Load the standard-json input from the build-info artifact (unused helper — logic inlined below)

async function checkAlreadyVerified(apiUrl, chainId, address) {
  try {
    const url = `${apiUrl}?chainid=${chainId}&module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    return d?.result?.[0]?.SourceCode?.length > 10;
  } catch (error) {
    return null;
  }
}

async function submitVerification(contract, standardInput, solcVersion, encodedArgs) {
  const { name, file, chainId, address, apiUrl } = contract;

  const body = new URLSearchParams();
  body.append('apikey', API_KEY);
  body.append('module', 'contract');
  body.append('action', 'verifysourcecode');
  body.append('contractaddress', address);
  body.append('sourceCode', JSON.stringify(standardInput));
  body.append('codeformat', 'solidity-standard-json-input');
  body.append('contractname', `${file}:${name}`);
  body.append('compilerversion', `v${solcVersion}`);
  body.append('constructorArguements', encodedArgs);

  const postUrl = `${apiUrl}?chainid=${chainId}`;
  const r = await fetch(postUrl, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  const d = await r.json();
  return d;
}

async function pollStatus(apiUrl, chainId, guid) {
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const url = `${apiUrl}?chainid=${chainId}&module=contract&action=checkverifystatus&guid=${guid}&apikey=${API_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    console.log(`     poll: ${d.result}`);
    if (d.result === 'Pass - Verified' || d.result === 'Already Verified') return true;
    if (d.result?.includes('Fail') || d.result?.includes('fail')) return false;
  }
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const { readdirSync } = await import('fs');
const buildInfoDir = resolve(root, 'artifacts', 'build-info');
const buildInfoFiles = readdirSync(buildInfoDir).filter(f => f.endsWith('.json'));

// Load all build-infos into memory (keyed by which sources they contain)
const buildInfos = buildInfoFiles.map(f => {
  try { return JSON.parse(readFileSync(resolve(buildInfoDir, f), 'utf8')); } catch { return null; }
}).filter(Boolean);

for (const contract of CONTRACTS) {
  const label = `${contract.name} (${contract.network})`;
  console.log(`\n🔍 Verifying ${label} @ ${contract.address}`);

  // 1. Already verified?
  const verified = await checkAlreadyVerified(contract.apiUrl, contract.chainId, contract.address);
  if (verified) { console.log(`   ✅ Already verified`); continue; }

  // 2. Find build-info that contains this source
  const bi = buildInfos.find(b => b?.input?.sources?.[contract.file]);
  if (!bi) { console.log(`   ❌ Build-info not found for ${contract.file} — run npx hardhat compile`); continue; }

  const encodedArgs = encodeArgs(contract.constructorArgs);
  const solcVersion = bi.solcLongVersion || bi.solcVersion;
  console.log(`   Compiler: v${solcVersion}`);
  console.log(`   Args:     ${encodedArgs.slice(0, 40)}…`);

  // 3. Submit
  const result = await submitVerification(contract, bi.input, solcVersion, encodedArgs);
  console.log(`   Submit:   status=${result.status} result=${result.result}`);

  if (result.status === '1') {
    const guid = result.result;
    const ok = await pollStatus(contract.apiUrl, contract.chainId, guid);
    if (ok === true)  console.log(`   ✅ Verified: ${contract.explorerUrl}/address/${contract.address}#code`);
    if (ok === false) console.log(`   ❌ Verification failed`);
    if (ok === null)  console.log(`   ⚠️  Timed out — check manually`);
  } else if (result.result?.toLowerCase().includes('already verified')) {
    console.log(`   ✅ Already verified`);
  } else {
    console.log(`   ❌ Error: ${result.result ?? result.message}`);
  }
}

console.log('\n🎉 Done\n');
