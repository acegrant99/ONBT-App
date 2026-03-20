/**
 * verify-defi-contracts.mjs
 *
 * Verifies ONBTDeFiFactory and ONBTUniversalLiquidityPool on Basescan + Arbiscan
 * using Etherscan V2 standard-json-input.
 *
 * Usage:
 *   node scripts/verify-defi-contracts.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ethers } from 'ethers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
dotenv.config({ path: resolve(root, '.env') });

const API_KEY = process.env.ETHERSCAN_API_KEY;
if (!API_KEY) { console.error('❌  ETHERSCAN_API_KEY not set'); process.exit(1); }

const DEPLOYER = '0x44497B9FF645A995b18967b34eFeFDe82AeC8144';

const CONTRACTS = [
  // ── ONBTDeFiFactory ────────────────────────────────────────────────────────
  {
    name: 'ONBTDeFiFactory',
    file: 'contracts/registry/ONBTDeFiFactory.sol',
    network: 'base',
    chainId: 8453,
    address: '0xe3Fb063Fc96307CCB7E59D073A8C10cA96a52D95',
    // constructor(address _lzEndpoint, address _onbtToken, uint32 _localEid)
    abiTypes:       ['address', 'address', 'uint32'],
    constructorArgs: ['0x1a44076050125825900e736c501f859c50fE728c', '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5', 30184],
    explorerUrl: 'https://basescan.org',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
  {
    name: 'ONBTDeFiFactory',
    file: 'contracts/registry/ONBTDeFiFactory.sol',
    network: 'arbitrum',
    chainId: 42161,
    address: '0x31F3595D6d5F371bB3413F8E31237791FbfFcfdB',
    abiTypes:       ['address', 'address', 'uint32'],
    constructorArgs: ['0x1a44076050125825900e736c501f859c50fE728c', '0x169aC761Ebb210B5A93B68B44DA394776a7B230C', 30110],
    explorerUrl: 'https://arbiscan.io',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },

  // ── ONBTUniversalLiquidityPool ─────────────────────────────────────────────
  {
    name: 'ONBTUniversalLiquidityPool',
    file: 'contracts/liquidity/ONBTUniversalLiquidityPool.sol',
    network: 'base',
    chainId: 8453,
    address: '0xfab5a9B2e0Fc2D2e4E1e4b1ceAa7e64511a0e03e',
    // constructor(address _token0, address _token1, address _feeRecipient, bool _stable)
    abiTypes:       ['address', 'address', 'address', 'bool'],
    constructorArgs: [
      '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5', // ONBT (Base)
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC (Base)
      DEPLOYER,
      false,
    ],
    explorerUrl: 'https://basescan.org',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
  {
    name: 'ONBTUniversalLiquidityPool',
    file: 'contracts/liquidity/ONBTUniversalLiquidityPool.sol',
    network: 'arbitrum',
    chainId: 42161,
    address: '0x884A26b195b5661B4e90a7b66350572fD3C3e02c',
    abiTypes:       ['address', 'address', 'address', 'bool'],
    constructorArgs: [
      '0x169aC761Ebb210B5A93B68B44DA394776a7B230C', // ONBT (Arbitrum)
      '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC (Arbitrum)
      DEPLOYER,
      false,
    ],
    explorerUrl: 'https://arbiscan.io',
    apiUrl: 'https://api.etherscan.io/v2/api',
  },
];

function encodeArgs(types, args) {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  return abiCoder.encode(types, args).slice(2); // strip 0x
}

async function checkAlreadyVerified(apiUrl, chainId, address) {
  try {
    const url = `${apiUrl}?chainid=${chainId}&module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    return d?.result?.[0]?.SourceCode?.length > 10;
  } catch {
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

  const r = await fetch(`${apiUrl}?chainid=${chainId}`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return r.json();
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
const buildInfoDir = resolve(root, 'artifacts', 'build-info');
const buildInfoFiles = readdirSync(buildInfoDir).filter(f => f.endsWith('.json'));

const buildInfos = buildInfoFiles.map(f => {
  try { return JSON.parse(readFileSync(resolve(buildInfoDir, f), 'utf8')); } catch { return null; }
}).filter(Boolean);

for (const contract of CONTRACTS) {
  const label = `${contract.name} (${contract.network})`;
  console.log(`\n🔍 Verifying ${label} @ ${contract.address}`);

  // 1. Already verified?
  const verified = await checkAlreadyVerified(contract.apiUrl, contract.chainId, contract.address);
  if (verified) { console.log(`   ✅ Already verified`); continue; }

  // 2. Find build-info that contains this source file
  const bi = buildInfos.find(b => b?.input?.sources?.[contract.file]);
  if (!bi) {
    console.log(`   ❌ Build-info not found for ${contract.file} — run: npx hardhat compile --force`);
    continue;
  }

  const encodedArgs = encodeArgs(contract.abiTypes, contract.constructorArgs);
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
