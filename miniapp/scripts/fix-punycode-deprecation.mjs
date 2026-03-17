import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const patches = [
  {
    file: path.join(root, 'node_modules', 'whatwg-url', 'lib', 'url-state-machine.js'),
    search: 'require("punycode")',
    replace: 'require("punycode/")',
  },
  {
    file: path.join(root, 'node_modules', 'tr46', 'index.js'),
    search: 'require("punycode")',
    replace: 'require("punycode/")',
  },
  {
    file: path.join(root, 'node_modules', 'uri-js', 'dist', 'esnext', 'uri.js'),
    search: 'from "punycode"',
    replace: 'from "punycode/"',
  },
  {
    file: path.join(root, 'node_modules', 'uri-js', 'dist', 'esnext', 'schemes', 'mailto.js'),
    search: 'from "punycode"',
    replace: 'from "punycode/"',
  },
];

let updated = 0;

for (const patch of patches) {
  if (!fs.existsSync(patch.file)) {
    continue;
  }

  const source = fs.readFileSync(patch.file, 'utf8');
  if (!source.includes(patch.search) || source.includes(patch.replace)) {
    continue;
  }

  const next = source.replace(patch.search, patch.replace);
  if (next !== source) {
    fs.writeFileSync(patch.file, next, 'utf8');
    updated += 1;
  }
}

if (updated > 0) {
  console.log(`Applied punycode deprecation patch to ${updated} file(s).`);
} else {
  console.log('No punycode deprecation patches needed.');
}
