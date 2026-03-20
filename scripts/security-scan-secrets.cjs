#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const allowedTextExtensions = new Set([
  '.env',
  '.example',
  '.txt',
  '.md',
  '.json',
  '.js',
  '.cjs',
  '.mjs',
  '.ts',
  '.tsx',
  '.yml',
  '.yaml',
]);

const placeholderHints = [
  'your_',
  'example',
  'placeholder',
  'changeme',
  'dummy',
  'sample',
  'test',
  '<',
  '>',
  'xxx',
  'process.env.',
  'os.environ',
];

const sensitiveEnvKeyPattern = /(?:^|_)(?:PRIVATE_KEY|API_KEY|SECRET|SECRET_KEY|MNEMONIC|SEED_PHRASE|ACCESS_TOKEN|AUTH_TOKEN|BEARER_TOKEN|JWT)(?:$|_)/i;

function isLikelyPlaceholder(value) {
  const v = String(value || '').trim().toLowerCase();
  if (!v) return true;
  return placeholderHints.some(hint => v.includes(hint));
}

function isTextCandidate(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  if (basename === '.env' || basename.startsWith('.env.')) return true;
  const ext = path.extname(filePath).toLowerCase();
  return allowedTextExtensions.has(ext);
}

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function getTrackedFiles() {
  const output = execSync('git ls-files', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function findSecretsInContent(filePath, content) {
  const findings = [];
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (/-----BEGIN(?: [A-Z]+)? PRIVATE KEY-----/i.test(line)) {
      findings.push({ line: i + 1, type: 'private-key-block' });
      continue;
    }

    const envMatch = line.match(/\b([A-Z0-9_]+)\s*=\s*([^\s#]+)/i);
    if (envMatch) {
      const keyName = envMatch[1];
      const value = envMatch[2];
      if (sensitiveEnvKeyPattern.test(keyName) && !isLikelyPlaceholder(value)) {
        findings.push({ line: i + 1, type: `env-${keyName}` });
      }
      continue;
    }

    const hardcodedPk = line.match(/PRIVATE_KEY[^\n]*["'`]((?:0x)?[a-fA-F0-9]{64})["'`]/i);
    if (hardcodedPk) {
      findings.push({ line: i + 1, type: 'hardcoded-private-key' });
      continue;
    }
  }

  return findings;
}

function main() {
  const args = process.argv.slice(2);
  const scanAll = args.includes('--all');

  let filesToScan = [];
  try {
    filesToScan = scanAll ? getTrackedFiles() : getStagedFiles();
  } catch (error) {
    console.error('Secret scan failed to list files.');
    process.exit(1);
  }

  if (filesToScan.length === 0) {
    console.log(scanAll ? 'Secret scan: no tracked files.' : 'Secret scan: no staged files.');
    process.exit(0);
  }

  const allFindings = [];

  for (const filePath of filesToScan) {
    if (!isTextCandidate(filePath)) continue;
    if (!fs.existsSync(filePath)) continue;

    const stats = fs.statSync(filePath);
    if (stats.size > 1024 * 1024) continue;

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }

    const findings = findSecretsInContent(filePath, content);
    findings.forEach(finding => allFindings.push({ filePath, ...finding }));
  }

  if (allFindings.length === 0) {
    console.log('Secret scan: passed.');
    process.exit(0);
  }

  console.error(scanAll
    ? '\nSecret scan: potential secrets detected in tracked files:'
    : '\nSecret scan: potential secrets detected in staged changes:');
  for (const finding of allFindings) {
    console.error(`- ${finding.filePath}:${finding.line} (${finding.type})`);
  }

  console.error('\nCommit blocked. Remove or replace sensitive values, then re-stage.');
  process.exit(1);
}

main();
