import { readFileSync } from 'fs';

const files = [
  { label: 'PrivateSale', path: 'miniapp/config/abis/ONBTPrivateSaleOApp.abi.ts' },
  { label: 'Staking',     path: 'miniapp/config/abis/ONBTOmnichainStaking.abi.ts' },
  { label: 'OFT',         path: 'miniapp/config/abis/OmnichainNabatOFT.abi.ts' },
];

for (const { label, path } of files) {
  let txt = readFileSync(path, 'utf8');
  // Strip TS: remove leading export / as const; keep the array literal
  txt = txt.replace(/^.*?=\s*/s, '').replace(/\s+as\s+const\s*;?\s*$/, '');
  const abi = JSON.parse(txt);
  const fns = abi
    .filter(e => e.type === 'function')
    .map(e => e.name)
    .sort();
  console.log(`\n== ${label} (${fns.length} functions) ==`);
  console.log(fns.join(', '));
}
