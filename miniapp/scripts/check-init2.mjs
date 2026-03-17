import { createPublicClient, http, formatEther } from 'viem';
import { base, arbitrum } from 'viem/chains';

const bc = createPublicClient({ chain: base, transport: http('https://base-rpc.publicnode.com') });
const ac = createPublicClient({ chain: arbitrum, transport: http('https://arb1.arbitrum.io/rpc') });

const r = async (client, address, abi, fn) => {
  try {
    return await client.readContract({ address, abi, functionName: fn });
  } catch (e) {
    return `FAIL: ${e.message.slice(0, 80)}`;
  }
};

const fmt = (v, unit = 'ONBT') =>
  typeof v === 'bigint' ? `${Number(formatEther(v)).toLocaleString()} ${unit}` : String(v);

const SALE_ABI = [
  { name: 'saleStart', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'saleEnd', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'totalSold', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'saleAllocation', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'remainingTokens', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'owner', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { name: 'paused', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'bool' }] },
];

const STAKING_ABI = [
  { name: 'globalTotalStaked', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'baseRewardRate', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'rewardPerSecond', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'getRewardTokens', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'address[]' }] },
  { name: 'MIN_STAKE', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'owner', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { name: 'paused', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'bool' }] },
];

const GOV_ABI = [
  { name: 'name', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
  { name: 'votingDelay', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'votingPeriod', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'proposalCount', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'owner', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
];

const BASE_SALE    = '0xEA52c0c5Cb4962490d1132d9c255aa044296576e';
const ARB_SALE     = '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';
const BASE_STAKING = '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe';
const ARB_STAKING  = '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44';
const BASE_GOV     = '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9';
const ARB_GOV      = '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854';
const NOW          = BigInt(Math.floor(Date.now() / 1000));

const res = await Promise.all([
  r(bc, BASE_SALE, SALE_ABI, 'saleStart'), r(bc, BASE_SALE, SALE_ABI, 'saleEnd'),
  r(bc, BASE_SALE, SALE_ABI, 'totalSold'), r(bc, BASE_SALE, SALE_ABI, 'saleAllocation'),
  r(bc, BASE_SALE, SALE_ABI, 'remainingTokens'), r(bc, BASE_SALE, SALE_ABI, 'paused'), r(bc, BASE_SALE, SALE_ABI, 'owner'),
  r(ac, ARB_SALE, SALE_ABI, 'saleStart'), r(ac, ARB_SALE, SALE_ABI, 'saleEnd'),
  r(ac, ARB_SALE, SALE_ABI, 'totalSold'), r(ac, ARB_SALE, SALE_ABI, 'saleAllocation'),
  r(ac, ARB_SALE, SALE_ABI, 'remainingTokens'), r(ac, ARB_SALE, SALE_ABI, 'paused'), r(ac, ARB_SALE, SALE_ABI, 'owner'),
  r(bc, BASE_STAKING, STAKING_ABI, 'globalTotalStaked'), r(bc, BASE_STAKING, STAKING_ABI, 'baseRewardRate'),
  r(bc, BASE_STAKING, STAKING_ABI, 'rewardPerSecond'), r(bc, BASE_STAKING, STAKING_ABI, 'getRewardTokens'),
  r(bc, BASE_STAKING, STAKING_ABI, 'paused'), r(bc, BASE_STAKING, STAKING_ABI, 'owner'),
  r(ac, ARB_STAKING, STAKING_ABI, 'globalTotalStaked'), r(ac, ARB_STAKING, STAKING_ABI, 'baseRewardRate'),
  r(ac, ARB_STAKING, STAKING_ABI, 'rewardPerSecond'), r(ac, ARB_STAKING, STAKING_ABI, 'getRewardTokens'),
  r(ac, ARB_STAKING, STAKING_ABI, 'paused'), r(ac, ARB_STAKING, STAKING_ABI, 'owner'),
  r(bc, BASE_GOV, GOV_ABI, 'name'), r(bc, BASE_GOV, GOV_ABI, 'votingDelay'),
  r(bc, BASE_GOV, GOV_ABI, 'votingPeriod'), r(bc, BASE_GOV, GOV_ABI, 'proposalCount'), r(bc, BASE_GOV, GOV_ABI, 'owner'),
  r(ac, ARB_GOV, GOV_ABI, 'name'), r(ac, ARB_GOV, GOV_ABI, 'votingDelay'),
  r(ac, ARB_GOV, GOV_ABI, 'votingPeriod'), r(ac, ARB_GOV, GOV_ABI, 'proposalCount'), r(ac, ARB_GOV, GOV_ABI, 'owner'),
]);

const [
  bSS, bSE, bTS, bSA, bRem, bSP, bSO,
  aSS, aSE, aTS, aSA, aRem, aSP, aSO,
  bGTS, bBRR, bRPS, bRT, bStP, bStO,
  aGTS, aBRR, aRPS, aRT, aStP, aStO,
  bGN, bGVD, bGVP, bGPC, bGO,
  aGN, aGVD, aGVP, aGPC, aGO,
] = res;

const ts = (v) => typeof v === 'bigint' && v > 0n
  ? new Date(Number(v) * 1000).toISOString()
  : (v === 0n ? 'NOT SET (0)' : String(v));

const icon = (ok) => ok ? '✅' : '❌';
const isOk = (v) => typeof v === 'bigint' || (typeof v === 'boolean' && v === false) || (typeof v === 'string' && !v.startsWith('FAIL'));

console.log('\n======== BASE PRIVATE SALE ========');
console.log(`  ${icon(typeof bSS === 'bigint' && bSS > 0n)} saleStart     : ${ts(bSS)}`);
console.log(`  ${icon(typeof bSE === 'bigint' && bSE > NOW)} saleEnd       : ${ts(bSE)}`);
console.log(`  ${icon(typeof bSA === 'bigint' && bSA > 0n)} allocation    : ${fmt(bSA)}`);
console.log(`  ${icon(typeof bTS === 'bigint')} totalSold     : ${fmt(bTS)}`);
console.log(`  ${icon(typeof bRem === 'bigint' && bRem > 0n)} remaining     : ${fmt(bRem)}`);
console.log(`  ${icon(bSP === false)} paused        : ${bSP}`);
console.log(`     owner         : ${bSO}`);

console.log('\n======== ARBITRUM PRIVATE SALE ========');
console.log(`  ${icon(typeof aSS === 'bigint' && aSS > 0n)} saleStart     : ${ts(aSS)}`);
console.log(`  ${icon(typeof aSE === 'bigint' && aSE > NOW)} saleEnd       : ${ts(aSE)}`);
console.log(`  ${icon(typeof aSA === 'bigint' && aSA > 0n)} allocation    : ${fmt(aSA)}`);
console.log(`  ${icon(typeof aTS === 'bigint')} totalSold     : ${fmt(aTS)}`);
console.log(`  ${icon(typeof aRem === 'bigint' && aRem > 0n)} remaining     : ${fmt(aRem)}`);
console.log(`  ${icon(aSP === false)} paused        : ${aSP}`);
console.log(`     owner         : ${aSO}`);

console.log('\n======== BASE STAKING ========');
console.log(`  ${icon(typeof bGTS === 'bigint')} globalStaked  : ${fmt(bGTS)}`);
console.log(`  ${icon(typeof bBRR === 'bigint' && bBRR > 0n)} baseRewardRate: ${fmt(bBRR, 'ONBT/sec')}`);
console.log(`  ${icon(typeof bRPS === 'bigint' && bRPS > 0n)} rewardPerSec  : ${fmt(bRPS, 'ONBT/sec')}`);
console.log(`  ${icon(Array.isArray(bRT) && bRT.length > 0)} rewardTokens  : ${Array.isArray(bRT) ? (bRT.length ? bRT.join(', ') : 'NONE ADDED') : bRT}`);
console.log(`  ${icon(bStP === false)} paused        : ${bStP}`);
console.log(`     owner         : ${bStO}`);

console.log('\n======== ARBITRUM STAKING ========');
console.log(`  ${icon(typeof aGTS === 'bigint')} globalStaked  : ${fmt(aGTS)}`);
console.log(`  ${icon(typeof aBRR === 'bigint' && aBRR > 0n)} baseRewardRate: ${fmt(aBRR, 'ONBT/sec')}`);
console.log(`  ${icon(typeof aRPS === 'bigint' && aRPS > 0n)} rewardPerSec  : ${fmt(aRPS, 'ONBT/sec')}`);
console.log(`  ${icon(Array.isArray(aRT) && aRT.length > 0)} rewardTokens  : ${Array.isArray(aRT) ? (aRT.length ? aRT.join(', ') : 'NONE ADDED') : aRT}`);
console.log(`  ${icon(aStP === false)} paused        : ${aStP}`);
console.log(`     owner         : ${aStO}`);

console.log('\n======== BASE GOVERNOR ========');
console.log(`  ${icon(typeof bGN === 'string' && !bGN.startsWith('FAIL'))} name          : ${bGN}`);
console.log(`  ${icon(typeof bGVD === 'bigint')} votingDelay   : ${typeof bGVD === 'bigint' ? bGVD.toString() + ' blocks' : bGVD}`);
console.log(`  ${icon(typeof bGVP === 'bigint' && bGVP > 0n)} votingPeriod  : ${typeof bGVP === 'bigint' ? bGVP.toString() + ' blocks' : bGVP}`);
console.log(`  ${icon(typeof bGPC === 'bigint')} proposalCount : ${typeof bGPC === 'bigint' ? bGPC.toString() : bGPC}`);
console.log(`     owner         : ${bGO}`);

console.log('\n======== ARBITRUM GOVERNOR ========');
console.log(`  ${icon(typeof aGN === 'string' && !aGN.startsWith('FAIL'))} name          : ${aGN}`);
console.log(`  ${icon(typeof aGVD === 'bigint')} votingDelay   : ${typeof aGVD === 'bigint' ? aGVD.toString() + ' blocks' : aGVD}`);
console.log(`  ${icon(typeof aGVP === 'bigint' && aGVP > 0n)} votingPeriod  : ${typeof aGVP === 'bigint' ? aGVP.toString() + ' blocks' : aGVP}`);
console.log(`  ${icon(typeof aGPC === 'bigint')} proposalCount : ${typeof aGPC === 'bigint' ? aGPC.toString() : aGPC}`);
console.log(`     owner         : ${aGO}`);

console.log('');
