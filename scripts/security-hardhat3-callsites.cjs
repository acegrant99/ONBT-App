#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const MAX_TARGETS = 10;

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'artifacts',
  'cache',
  'coverage',
  'dist',
  'build',
  'out',
  '.next',
  'frontend',
]);

function walk(dirPath, collector = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      walk(fullPath, collector);
      continue;
    }

    collector.push(fullPath);
  }

  return collector;
}

function isScanTarget(filePath) {
  return /\.(js|cjs|mjs|ts)$/i.test(filePath);
}

function shouldIncludeInRanking(relPath) {
  if (relPath.startsWith('deploy/')) return true;
  if (relPath.startsWith('scripts/')) {
    if (relPath.startsWith('scripts/security-')) return false;
    return true;
  }
  return false;
}

function ensureReportDir() {
  const reportDir = path.join(ROOT, 'reports', 'security');
  fs.mkdirSync(reportDir, { recursive: true });
  return reportDir;
}

function classifyLine(line) {
  if (/getSigners\s*\(/.test(line)) return 'Signer acquisition';
  if (/getContractFactory\s*\(/.test(line)) return 'Contract factory';
  if (/new\s+hre\.ethers\.Contract\s*\(/.test(line)) return 'Contract instance';
  if (/provider\./.test(line)) return 'Provider access';
  if (/parse(Ether|Units)\s*\(|format(Ether|Units)\s*\(/.test(line)) return 'Value conversion';
  if (/constants\./.test(line)) return 'Ethers constants';
  if (/BigNumber\./.test(line)) return 'BigNumber usage';
  if (/hre\.ethers\s*;/.test(line)) return 'Ethers aliasing';
  return 'General hre.ethers usage';
}

function findCallsites() {
  const files = walk(ROOT);
  const callsites = [];

  for (const fullPath of files) {
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');

    if (!isScanTarget(relPath)) {
      continue;
    }

    if (!shouldIncludeInRanking(relPath)) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);
    let count = 0;
    const samples = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (!line.includes('hre.ethers')) continue;

      count += 1;
      if (samples.length < 3) {
        samples.push({
          line: index + 1,
          text: line.trim(),
          category: classifyLine(line),
        });
      }
    }

    if (count > 0) {
      callsites.push({
        file: relPath,
        count,
        samples,
      });
    }
  }

  callsites.sort((a, b) => b.count - a.count || a.file.localeCompare(b.file));
  return callsites;
}

function writeReport(callsites) {
  const top = callsites.slice(0, MAX_TARGETS);
  const total = callsites.reduce((sum, item) => sum + item.count, 0);

  const lines = [
    '# Hardhat 3 hre.ethers Callsite Targets',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- Total hre.ethers occurrences: ${total}`,
    `- Files with hre.ethers usage: ${callsites.length}`,
    `- Top targets listed: ${top.length}`,
    '',
    '## Top 10 Refactor Targets',
    '',
  ];

  top.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.file} (${item.count} occurrence${item.count === 1 ? '' : 's'})`);
    item.samples.forEach((sample) => {
      lines.push(`   - L${sample.line} [${sample.category}] ${sample.text}`);
    });
  });

  lines.push('');
  lines.push('## Refactor Guidance');
  lines.push('');
  lines.push('- Replace signer/provider access with Hardhat 3 compatible plugin API usage first.');
  lines.push('- Migrate value conversion and constants to ethers v6-safe patterns where required.');
  lines.push('- Handle BigNumber migration hotspots early because they cascade through deploy and test scripts.');
  lines.push('');

  const reportDir = ensureReportDir();
  const reportPath = path.join(reportDir, 'hardhat3-callsites.md');
  fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');

  return {
    reportPath,
    total,
    files: callsites.length,
    topCount: top.length,
  };
}

function main() {
  const callsites = findCallsites();
  const result = writeReport(callsites);

  console.log('Hardhat 3 callsite report generated.');
  console.log(`- file: ${result.reportPath}`);
  console.log(`- total hre.ethers occurrences: ${result.total}`);
  console.log(`- files with usage: ${result.files}`);
  console.log(`- top targets emitted: ${result.topCount}`);
}

main();
