#!/usr/bin/env node

const { spawn } = require('child_process');

const defaultMaxOldSpaceSize = process.env.WORKER_MAX_OLD_SPACE_SIZE || '1536';
const rawArgs = process.argv.slice(2);
let maxOldSpaceSize = defaultMaxOldSpaceSize;
const args = [];

for (const arg of rawArgs) {
  if (arg.startsWith('--mem=')) {
    const value = arg.slice('--mem='.length);
    if (/^\d+$/.test(value) && Number(value) > 0) {
      maxOldSpaceSize = value;
      continue;
    }
    console.error('Invalid --mem value. Use a positive integer in MB, e.g. --mem=2048');
    process.exit(1);
  }
  args.push(arg);
}

if (args.length === 0) {
  console.error('Usage: npm run worker:env -- <command> [args...]');
  console.error('Example: npm run worker:env -- npx hardhat compile');
  process.exit(1);
}

const [command, ...commandArgs] = args;
const env = { ...process.env };

if (!String(env.NODE_OPTIONS || '').includes('--max-old-space-size')) {
  env.NODE_OPTIONS = `${env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ` : ''}--max-old-space-size=${maxOldSpaceSize}`;
}

const child = spawn(command, commandArgs, {
  stdio: 'inherit',
  shell: true,
  env,
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
