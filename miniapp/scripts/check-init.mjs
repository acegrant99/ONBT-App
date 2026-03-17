import { createPublicClient, http, formatEther } from 'viem';
import { base, arbitrum } from 'viem/chains';

const bc = createPublicClient({ chain: base, transport: http('https://base-rpc.publicnode.com') });
const ac = createPublicClient({ chain: arbitrum, transport: http('https://arb1.arbitrum.io/rpc') });

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

const r = async (client, address, abi, fn) => {
  try {
    const v = await client.readContract({ address, abi, functionName: fn });
    return typeof v === 'bigint' ? v : v;
  } catch (e) {
    return `FAIL: ${e.message.slice(0, 80)}`;
  }
};

const fmt = (v, unit = 'ONBT') =>
  typeof v === 'bigint' ? `${Number(formatEther(v)).toLocaleString()} ${unit}` : v;

const BASE_SALE     = '0xEA52c0c5Cb4962490d1132d9c255aa044296576e';
const ARB_SALE      = '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';
const BASE_STAKING  = '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe';
const ARB_STAKING   = '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44';
const BASE_GOV      = '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9';
const ARB_GOV       = '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854';

const results = await Promise.all([
  // Base Private Sale
  r(bc, BASE_SALE, SALE_ABI, 'saleStart'),
  r(bc, BASE_SALE, SALE_ABI, 'saleEnd'),
  r(bc, BASE_SALE, SALE_ABI, 'totalSold'),
  r(bc, BASE_SALE, SALE_ABI, 'saleAllocation'),
  r(bc, BASE_SALE, SALE_ABI, 'remainingTokens'),
  r(bc, BASE_SALE, SALE_ABI, 'paused'),
  r(bc, BASE_SALE, SALE_ABI, 'owner'),
  // Arb Private Sale
  r(ac, ARB_SALE, SALE_ABI, 'saleStart'),
  r(ac, ARB_SALE, SALE_ABI, 'saleEnd'),
  r(ac, ARB_SALE, SALE_ABI, 'totalSold'),
  r(ac, ARB_SALE, SALE_ABI, 'saleAllocation'),
  r(ac, ARB_SALE, SALE_ABI, 'remainingTokens'),
  r(ac, ARB_SALE, SALE_ABI, 'paused'),
  r(ac, ARB_SALE, SALE_ABI, 'owner'),
  // Base Staking
  r(bc, BASE_STAKING, STAKING_ABI, 'globalTotalStaked'),
  r(bc, BASE_STAKING, STAKING_ABI, 'baseRewardRate'),
  r(bc, BASE_STAKING, STAKING_ABI, 'rewardPerSecond'),
  r(bc, BASE_STAKING, STAKING_ABI, 'getRewardTokens'),
  r(bc, BASE_STAKING, STAKING_ABI, 'paused'),
  r(bc, BASE_STAKING, STAKING_ABI, 'owner'),
  // Arb Staking
  r(ac, ARB_STAKING, STAKING_ABI, 'globalTotalStaked'),
  r(ac, ARB_STAKING, STAKING_ABI, 'baseRewardRate'),
  r(ac, ARB_STAKING, STAKING_ABI, 'rewardPerSecond'),
  r(ac, ARB_STAKING, STAKING_ABI, 'getRewardTokens'),
  r(ac, ARB_STAKING, STAKING_ABI, 'paused'),
  r(ac, ARB_STAKING, STAKING_ABI, 'owner'),
  // Base Governor
  r(bc, BASE_GOV, GOV_ABI, 'name'),
  r(bc, BASE_GOV, GOV_ABI, 'votingDelay'),
  r(bc, BASE_GOV, GOV_ABI, 'votingPeriod'),
  r(bc, BASE_GOV, GOV_ABI, 'proposalCount'),
  // Arb Governor
  r(ac, ARB_GOV, GOV_ABI, 'name'),
  r(ac, ARB_GOV, GOV_ABI, 'votingDelay'),
  r(ac, ARB_GOV, GOV_ABI, 'votingPeriod'),
  r(ac, ARB_GOV, GOV_ABI, 'proposalCount'),
]);

const [
  bSaleStart, bSaleEnd, bTotalSold, bSaleAlloc, bRemaining, bSalePaused, bSaleOwner,
  aSaleStart, aSaleEnd, aTotalSold, aSaleAlloc, aRemaining, aSalePaused, aSaleOwner,
  bStakeTotal, bBaseRate, bRPS, bRewardTokens, bStakePaused, bStakeOwner,
  aStakeTotal, aBaseRate, aRPS, aRewardTokens, aStakePaused, aStakeOwner,
  bGovName, bGovVD, bGovVP, bGovPC,
  aGovName, aGovVD, aGovVP, aGovPC,
] = results;

const toDate = (v) => typeof v === 'bigint' && v > 0n
  ? new Date(Number(v) * 1000).toISOString()
  : (v === 0n ? 'âš   NOT SET (0)' : String(v));

const check = (label, v, isOk) => {
  const ok = typeof isOk === 'function' ? isOk(v) : isOk;
  console.log(`  ${ok ? 'âœ…' : 'âŒ'} ${label}: ${typeof v === 'bigint' ? fmt(v) : String(v)}`);
};

const NOW = BigInt(Math.floor(Date.now() / 1000));

console.log('\n=== BASE PRIVATE SALE (' + BASE_SALE + ') ===');
check('saleStart', bSaleStart, (v) => typeof v === 'bigint' && v > 0n);
check('saleEnd', bSaleEnd, (v) => typeof v === 'bigint' && v > NOW);
check('saleAllocation', bSaleAlloc, (v) => typeof v === 'bigint' && v > 0n);
check('totalSold (0 = no buys yet)', bTotalSold, true);
check('remaining', bRemaining, (v) => typeof v === 'bigint' && v > 0n);
check('paused (want false)', bSalePaused, bSalePaused === false);
console.log(`  ðŸ“… saleStart: ${toDate(bSaleStart)}`);
console.log(`  ðŸ“… saleEnd  : ${toDate(bSaleEnd)}`);
console.log(`  ðŸ‘¤ owner    : ${bSaleOwner}`);

console.log('\n=== ARBITRUM PRIVATE SALE (' + ARB_SALE + ') ===');
check('saleStart', aSaleStart, (v) => typeof v === 'bigint' && v > 0n);
check('saleEnd', aSaleEnd, (v) => typeof v === 'bigint' && v > NOW);
check('saleAllocation', aSaleAlloc, (v) => typeof v === 'bigint' && v > 0n);
check('totalSold (0 = no buys yet)', aTotalSold, true);
check('remaining', aRemaining, (v) => typeof v === 'bigint' && v > 0n);
check('paused (want false)', aSalePaused, aSalePaused === false);
console.log(`  ðŸ“… saleStart: ${toDate(aSaleStart)}`);
console.log(`  ðŸ“… saleEnd  : ${toDate(aSaleEnd)}`);
console.log(`  ðŸ‘¤ owner    : ${aSaleOwner}`);

console.log('\n=== BASE STAKING (' + BASE_STAKING + ') ===');
check('globalTotalStaked', bStakeTotal, (v) => typeof v === 'bigint');
check('baseRewardRate', bBaseRate, (v) => typeof v === 'bigint' && v > 0n);
check('rewardPerSecond', bRPS, (v) => typeof v === 'bigint' && v > 0n);
console.log(`  ðŸ’° rewardTokens: ${Array.isArray(bRewardTokens) ? (bRewardTokens.length === 0 ? 'âš   NONE ADDED' : bRewardTokens.join(', ')) : bRewardTokens}`);
check('paused (want false)', bStakePaused, bStakePaused === false);
console.log(`  ðŸ‘¤ owner: ${bStakeOwner}`);

console.log('\n=== ARBITRUM STAKING (' + ARB_STAKING + ') ===');
check('globalTotalStaked', aStakeTotal, (v) => typeof v === 'bigint');
check('baseRewardRate', aBaseRate, (v) => typeof v === 'bigint' && v > 0n);
check('rewardPerSecond', aRPS, (v) => typeof v === 'bigint' && v > 0n);
console.log(`  ðŸ’° rewardTokens: ${Array.isArray(aRewardTokens) ? (aRewardTokens.length === 0 ? 'âš   NONE ADDED' : aRewardTokens.join(', ')) : aRewardTokens}`);
check('paused (want false)', aStakePaused, aStakePaused === false);
console.log(`  ðŸ‘¤ owner: ${aStakeOwner}`);

console.log('\n=== BASE GOVERNOR (' + BASE_GOV + ') ===');
check('name', bGovName, (v) => typeof v === 'string' && !String(v).startsWith('FAIL'));
check('votingDelay', bGovVD, (v) => typeof v === 'bigint' && v >= 0n);
check('votingPeriod', bGovVP, (v) => typeof v === 'bigint' && v > 0n);
check('proposalCount', bGovPC, (v) => typeof v === 'bigint' && v >= 0n);

console.log('\n=== ARBITRUM GOVERNOR (' + ARB_GOV + ') ===');
check('name', aGovName, (v) => typeof v === 'string' && !String(v).startsWith('FAIL'));
check('votingDelay', aGovVD, (v) => typeof v === 'bigint' && v >= 0n);
check('votingPeriod', aGovVP, (v) => typeof v === 'bigint' && v > 0n);
check('proposalCount', aGovPC, (v) => typeof v === 'bigint' && v >= 0n);

console.log('\n--- SUMMARY ---');
