#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function safeExec(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], shell: true }).trim();
  } catch {
    return '';
  }
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function walkFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'artifacts' || entry.name === 'cache' || entry.name === 'frontend') {
        continue;
      }
      walkFiles(fullPath, files);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function isSourceLikeFile(filePath) {
  return /\.(js|cjs|mjs|ts|json)$/i.test(filePath);
}

function countPatternOccurrences(pattern, fileFilter) {
  const regex = new RegExp(pattern, 'g');
  const allFiles = walkFiles(process.cwd());
  let count = 0;

  for (const filePath of allFiles) {
    const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

    if (!isSourceLikeFile(relPath)) {
      continue;
    }

    if (fileFilter && !fileFilter(relPath)) {
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matches = fileContent.match(regex);
    if (matches) {
      count += matches.length;
    }
  }

  return count;
}

function ensureReportDir() {
  const reportDir = path.join(process.cwd(), 'reports', 'security');
  fs.mkdirSync(reportDir, { recursive: true });
  return reportDir;
}

function main() {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const configPath = path.join(process.cwd(), 'hardhat.config.cjs');

  const packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const scripts = packageJson.scripts || {};
  const devDependencies = packageJson.devDependencies || {};
  const dependencies = packageJson.dependencies || {};

  const hardhatVersion = devDependencies.hardhat || '(missing)';
  const legacyEthersPlugin = devDependencies['@nomiclabs/hardhat-ethers'] || '(missing)';
  const foundationEthersPlugin = devDependencies['@nomicfoundation/hardhat-ethers'] || '(missing)';
  const toolboxVersion = devDependencies['@nomicfoundation/hardhat-toolbox'] || '(missing)';
  const hardhatVerifyVersion = devDependencies['@nomicfoundation/hardhat-verify'] || '(missing)';
  const hardhatDeployVersion = devDependencies['hardhat-deploy'] || '(missing)';
  const ethersVersion = dependencies.ethers || devDependencies.ethers || '(missing)';

  const hardhatLatest = safeExec('npm view hardhat@latest version');
  const hardhatVerifyLatest = parseJson(safeExec('npm view @nomicfoundation/hardhat-verify@latest version peerDependencies --json'));
  const hardhatEthersLatest = parseJson(safeExec('npm view @nomicfoundation/hardhat-ethers@latest version peerDependencies --json'));
  const toolboxLatest = parseJson(safeExec('npm view @nomicfoundation/hardhat-toolbox@latest version peerDependencies --json'));
  const lzToolboxLatest = parseJson(safeExec('npm view @layerzerolabs/toolbox-hardhat@latest version peerDependencies --json'));

  const hreEthersCount = countPatternOccurrences('hre\\.ethers', relPath => /\.(js|cjs|mjs|ts)$/i.test(relPath));
  const legacyPluginRequireCount = countPatternOccurrences('@nomiclabs/hardhat-ethers', relPath => relPath === 'hardhat.config.cjs' || relPath === 'hardhat-minimal.config.cjs');
  const v5TypechainCount = countPatternOccurrences('@typechain/ethers-v5');

  const blockers = [
    'LayerZero toolbox currently peers with Hardhat 2 and ethers 5.',
    'hardhat-deploy 2.x requires Hardhat 3 and rocketh migration.',
    'Config currently requires @nomiclabs/hardhat-ethers (legacy plugin).',
    'Project scripts and code heavily rely on hre.ethers API patterns; some behavior changed with Hardhat 3 plugin ecosystem.',
  ];

  const checklist = [
    'Create migration branch and freeze deploy scripts changes.',
    'Upgrade Hardhat core to ^3.1.x and @nomicfoundation/hardhat-verify to ^3.0.x in branch only.',
    'Replace @nomiclabs/hardhat-ethers with @nomicfoundation/hardhat-ethers@^4 and validate signer/provider flows.',
    'Decide ethers strategy: keep ethers 5 compatibility layer where possible, or migrate deploy/runtime scripts to ethers 6.',
    'Evaluate LayerZero toolbox compatibility: pin current Hardhat 2 toolchain for LayerZero ops OR split tooling into separate workspace until HL3-compatible release exists.',
    'Plan hardhat-deploy transition: 0.12.x -> 2.x with rocketh adapter and deployment script rewiring.',
    'Run staged validation: compile, one network dry-run deploy, verify task, security audit diffs.',
  ];

  const reportLines = [
    '# Hardhat 3 Migration Readiness',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Current Snapshot',
    '',
    `- hardhat: ${hardhatVersion}`,
    `- hardhat latest: ${hardhatLatest || 'unknown'}`,
    `- @nomiclabs/hardhat-ethers: ${legacyEthersPlugin}`,
    `- @nomicfoundation/hardhat-ethers: ${foundationEthersPlugin}`,
    `- @nomicfoundation/hardhat-toolbox: ${toolboxVersion}`,
    `- @nomicfoundation/hardhat-verify: ${hardhatVerifyVersion}`,
    `- hardhat-deploy: ${hardhatDeployVersion}`,
    `- ethers: ${ethersVersion}`,
    '',
    '## Compatibility Signals',
    '',
    `- @nomicfoundation/hardhat-verify latest: ${(hardhatVerifyLatest && hardhatVerifyLatest.version) || 'unknown'} (peer hardhat: ${(hardhatVerifyLatest && hardhatVerifyLatest.peerDependencies && hardhatVerifyLatest.peerDependencies.hardhat) || 'unknown'})`,
    `- @nomicfoundation/hardhat-ethers latest: ${(hardhatEthersLatest && hardhatEthersLatest.version) || 'unknown'} (peer hardhat: ${(hardhatEthersLatest && hardhatEthersLatest.peerDependencies && hardhatEthersLatest.peerDependencies.hardhat) || 'unknown'})`,
    `- @nomicfoundation/hardhat-toolbox latest: ${(toolboxLatest && toolboxLatest.version) || 'unknown'} (peer hardhat: ${(toolboxLatest && toolboxLatest.peerDependencies && toolboxLatest.peerDependencies.hardhat) || 'unknown'})`,
    `- @layerzerolabs/toolbox-hardhat latest: ${(lzToolboxLatest && lzToolboxLatest.version) || 'unknown'} (peer hardhat: ${(lzToolboxLatest && lzToolboxLatest.peerDependencies && lzToolboxLatest.peerDependencies.hardhat) || 'unknown'}, peer ethers: ${(lzToolboxLatest && lzToolboxLatest.peerDependencies && lzToolboxLatest.peerDependencies.ethers) || 'unknown'})`,
    '',
    '## Codebase Impact',
    '',
    `- hre.ethers occurrences: ${hreEthersCount}`,
    `- legacy plugin require occurrences (@nomiclabs/hardhat-ethers): ${legacyPluginRequireCount}`,
    `- typechain v5 references: ${v5TypechainCount}`,
    '',
    '## Blockers',
    '',
    ...blockers.map(item => `- ${item}`),
    '',
    '## Migration Checklist',
    '',
    ...checklist.map((item, index) => `${index + 1}. ${item}`),
    '',
    '## Recommendation',
    '',
    '- Keep current Hardhat 2 production toolchain pinned for now.',
    '- Run Hardhat 3 migration in an isolated branch/workspace with parity tests before merging.',
    '- Prioritize security reductions not requiring framework migration while preparing plugin/tooling upgrades in parallel.',
    '',
  ];

  const reportDir = ensureReportDir();
  const reportPath = path.join(reportDir, 'hardhat3-readiness.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');

  console.log('Hardhat 3 readiness report generated.');
  console.log(`- file: ${reportPath}`);
  console.log(`- hre.ethers occurrences: ${hreEthersCount}`);
  console.log(`- current hardhat: ${hardhatVersion}, latest: ${hardhatLatest || 'unknown'}`);
}

main();
