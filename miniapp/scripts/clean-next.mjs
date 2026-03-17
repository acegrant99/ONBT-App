#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = path.join(process.cwd(), '.next');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function removeWithRetries(dirPath, attempts = 5) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      return true;
    } catch {
      await sleep(300 * (index + 1));
    }
  }
  return false;
}

async function main() {
  if (!fs.existsSync(target)) {
    console.log('No .next directory to clean.');
    return;
  }

  const cleaned = await removeWithRetries(target);
  if (cleaned) {
    console.log('Cleaned .next build cache.');
  } else {
    console.warn('Could not fully clean .next (continuing).');
  }
}

main();
