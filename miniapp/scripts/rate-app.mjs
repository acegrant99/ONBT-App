import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const quickMode = args.has('--quick');
const jsonMode = args.has('--json');
const ciMode = args.has('--ci');
const root = process.cwd();

const categories = [
  { key: 'reliability', label: 'Reliability', max: 45, score: 0, notes: [] },
  { key: 'integrity', label: 'Contract Integrity', max: 25, score: 0, notes: [] },
  { key: 'ux', label: 'UX Clarity', max: 20, score: 0, notes: [] },
  { key: 'docs', label: 'Docs/Product Messaging', max: 10, score: 0, notes: [] },
];

const tasks = [];

function readFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : '';
}

function getCategory(key) {
  return categories.find((c) => c.key === key);
}

function addScore(key, value, note) {
  const category = getCategory(key);
  if (!category) return;
  category.score += value;
  if (note) category.notes.push(note);
}

function addTask(priority, title, detail) {
  tasks.push({ priority, title, detail });
}

function listFilesRecursively(dirPath, output = []) {
  if (!fs.existsSync(dirPath)) return output;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const rel = path.relative(root, fullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'artifacts', 'cache'].includes(entry.name)) continue;
      listFilesRecursively(fullPath, output);
    } else {
      output.push(rel);
    }
  }
  return output;
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function runNpmScript(scriptName, timeoutMs = 0) {
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npmCmd, ['run', scriptName], {
    cwd: root,
    stdio: 'pipe',
    encoding: 'utf8',
    shell: process.platform === 'win32',
    maxBuffer: 15 * 1024 * 1024,
    timeout: timeoutMs,
  });
  return {
    ok: result.status === 0 && !result.error,
    status: result.status,
    signal: result.signal,
    error: result.error ? String(result.error.message || result.error) : '',
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function parseEnvFile(relativePath) {
  const envContent = readFile(relativePath);
  const values = {};

  if (!envContent) return values;

  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const equalsIndex = line.indexOf('=');
    if (equalsIndex <= 0) continue;

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function evaluateEnvReadiness() {
  const env = parseEnvFile('.env');
  const requiredVars = [
    'NEXT_PUBLIC_ONCHAINKIT_API_KEY',
    'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID',
    'NEXT_PUBLIC_URL',
    'NEXT_PUBLIC_ONBT_BASE_ADDRESS',
    'NEXT_PUBLIC_ONBT_ARBITRUM_ADDRESS',
    'NEXT_PUBLIC_ONBT_STAKING_BASE_ADDRESS',
    'NEXT_PUBLIC_ONBT_STAKING_ARBITRUM_ADDRESS',
    'NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS',
    'NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS',
  ];

  const missing = requiredVars.filter((key) => {
    const value = env[key];
    if (!value) return true;
    return /your_|placeholder|changeme/i.test(value);
  });

  if (missing.length === 0) {
    addScore('reliability', 5, '.env readiness check passed for all required NEXT_PUBLIC variables.');
    return;
  }

  addTask(
    'P0',
    'Complete .env for runtime flows',
    `Missing or placeholder values in .env: ${missing.join(', ')}`
  );
}

function cleanupNextArtifacts() {
  const nextDir = path.join(root, '.next');
  if (!fs.existsSync(nextDir)) return;
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
  } catch {
    // Best-effort cleanup for transient Windows file-lock scenarios.
  }
}

function isNextTraceLockError(result) {
  const combinedOutput = `${result.stdout || ''}\n${result.stderr || ''}`;
  return /EPERM: operation not permitted, open '.*\\\.next\\\\trace'/i.test(combinedOutput)
    || /EPERM: operation not permitted, open '.*\.next\\trace'/i.test(combinedOutput)
    || /Unable to acquire lock at .*\.next\\lock/i.test(combinedOutput);
}

function hasEslintConfig() {
  const candidates = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.json',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
  ];
  return candidates.some((file) => fs.existsSync(path.join(root, file)));
}

function summarizeFailureOutput(output) {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-12);

  if (lines.length === 0) {
    return 'No diagnostic output captured.';
  }

  return lines.join(' | ');
}

function summarizeCommandFailure(result) {
  const statusPart = result.status === null || result.status === undefined ? 'status=unknown' : `status=${result.status}`;
  const signalPart = result.signal ? `, signal=${result.signal}` : '';
  const errorPart = result.error ? `, error=${result.error}` : '';
  const outputPart = summarizeFailureOutput(`${result.stdout}\n${result.stderr}`);
  return `${statusPart}${signalPart}${errorPart}. ${outputPart}`;
}

function evaluateReliability() {
  evaluateEnvReadiness();

  if (quickMode) {
    addScore('reliability', 10, 'Quick mode: runtime checks skipped (type-check/lint/build).');
    addTask('P0', 'Run full reliability checks', 'Run without --quick to include type-check, lint, and production build.');
    return;
  }

  const typecheck = runNpmScript('type-check', 180000);
  if (typecheck.ok) {
    addScore('reliability', 15, 'Type-check passes.');
  } else {
    addTask(
      'P0',
      'Fix TypeScript errors',
      `type-check failed. ${summarizeCommandFailure(typecheck)}`
    );
  }

  if (!hasEslintConfig()) {
    addScore('reliability', 4, 'ESLint not configured yet; lint check skipped to avoid interactive Next.js prompt.');
    addTask('P1', 'Initialize ESLint', 'Run `npm run lint` once and select a config to enable lint scoring.');
  } else {
    const lint = runNpmScript('lint', 180000);
    if (lint.ok) {
      addScore('reliability', 10, 'Lint passes.');
    } else {
      addTask(
        'P1',
        'Fix lint warnings/errors',
        `lint failed. ${summarizeCommandFailure(lint)}`
      );
    }
  }

  cleanupNextArtifacts();

  let build = runNpmScript('build', 420000);
  let buildRecoveredAfterRetry = false;
  if (!build.ok && isNextTraceLockError(build)) {
    cleanupNextArtifacts();
    build = runNpmScript('build', 420000);
    buildRecoveredAfterRetry = build.ok;
  }

  if (build.ok) {
    addScore(
      'reliability',
      20,
      buildRecoveredAfterRetry
        ? 'Production build passes (recovered after .next cleanup retry on Windows lock error).'
        : 'Production build passes.'
    );
  } else {
    addTask(
      'P0',
      'Fix production build',
      `build failed. ${summarizeCommandFailure(build)}`
    );
  }
}

function evaluateContractIntegrity() {
  const files = listFilesRecursively(path.join(root, 'components')).concat(['App.tsx', 'config/contracts.ts', 'README.md']);
  const content = files
    .map((f) => ({ file: f, text: readFile(f) }))
    .filter((x) => x.text.length > 0);

  const allText = content.map((x) => x.text).join('\n');

  const swapRefs = countMatches(allText, /SwapInterface|ONBT_POOL_ADDRESS|ONBT_POOL_ABI/gi);
  if (swapRefs === 0) {
    addScore('integrity', 10, 'No undeployed swap surface detected.');
  } else {
    addTask('P0', 'Remove undeployed swap references', `Found ${swapRefs} swap references in app surface/config.`);
  }

  const hardcodedExplorers = countMatches(allText, /https:\/\/(basescan\.org|arbiscan\.io)\/(address|token)\//gi);
  if (hardcodedExplorers === 0) {
    addScore('integrity', 8, 'Explorer links are config-driven (no hardcoded chain links).');
  } else {
    addTask('P1', 'Replace hardcoded explorer URLs', `Found ${hardcodedExplorers} hardcoded explorer address/token links.`);
  }

  const contractsConfig = readFile('config/contracts.ts');
  const hasBaseSale = /ONBT_PRIVATE_SALE_BASE_ADDRESS/.test(contractsConfig);
  const hasArbSale = /ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS/.test(contractsConfig);
  const hasStakingBoth = /ONBT_STAKING_ADDRESS/.test(contractsConfig) && /ONBT_STAKING_ARBITRUM_ADDRESS/.test(contractsConfig);

  if (hasBaseSale && hasArbSale && hasStakingBoth) {
    addScore('integrity', 7, 'Deployed contract map includes Base+Arbitrum private sale and staking addresses.');
  } else {
    addTask('P0', 'Complete deployed contract mapping', 'Missing expected Base/Arbitrum sale or staking address constants.');
  }
}

function evaluateUxClarity() {
  const appText = readFile('App.tsx');
  const txStatusFile = readFile('lib/txStatus.ts');
  const token = readFile('features/token/ui/TokenInterface.tsx');
  const bridge = readFile('features/bridge/ui/BridgeInterface.tsx');
  const stake = readFile('features/staking/ui/StakingInterface.tsx');
  const gov = readFile('features/governance/ui/GovernanceInterface.tsx');
  const sale = readFile('features/privateSale/ui/PrivateSaleInterface.tsx');

  const hasGlobalTxBar = /GLOBAL_TX_STATUS_EVENT/.test(appText) && /globalTxStatus/.test(appText) && txStatusFile.length > 0;
  if (hasGlobalTxBar) {
    addScore('ux', 10, 'Global transaction status bar is wired.');
  } else {
    addTask('P0', 'Add global transaction status bar', 'App-level pending/success/error visibility is missing.');
  }

  const capabilityBadgeChecks = [token, bridge, stake, gov, sale].map((t) => /Capability:/.test(t));
  const badgeCount = capabilityBadgeChecks.filter(Boolean).length;
  addScore('ux', Math.round((badgeCount / 5) * 10), `Capability badges detected in ${badgeCount}/5 transaction tabs.`);
  if (badgeCount < 5) {
    addTask('P1', 'Add capability badges to all tabs', `Missing capability labels in ${5 - badgeCount} tab(s).`);
  }
}

function evaluateDocs() {
  const readme = readFile('README.md');
  const hasPrivateSaleDoc = /private sale/i.test(readme);
  const hasSwapMention = /swap interface|swap contract|liquidity pool/i.test(readme);

  if (hasPrivateSaleDoc) {
    addScore('docs', 6, 'README includes private sale flow messaging.');
  } else {
    addTask('P2', 'Document private sale flow', 'README should describe the primary purchase path.');
  }

  if (!hasSwapMention) {
    addScore('docs', 4, 'README avoids deprecated swap messaging.');
  } else {
    addTask('P2', 'Remove stale swap messaging from docs', 'README still references swap features that are out of scope.');
  }
}

function createSummary() {
  for (const category of categories) {
    category.score = Math.min(category.score, category.max);
  }

  const total = categories.reduce((sum, c) => sum + c.score, 0);
  const max = categories.reduce((sum, c) => sum + c.max, 0);
  const rating = Number(((total / max) * 10).toFixed(1));

  const sortedTasks = tasks.sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2 };
    return order[a.priority] - order[b.priority];
  });

  return {
    quickMode,
    score: total,
    maxScore: max,
    rating,
    categories,
    tasks: sortedTasks,
    timestamp: new Date().toISOString(),
  };
}

function printReport(report) {
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('ONBT Miniapp 10/10 Audit');
  console.log('========================');
  console.log(`Score: ${report.score}/${report.maxScore} | Rating: ${report.rating}/10${report.quickMode ? ' (quick mode)' : ''}`);
  console.log('');

  for (const category of report.categories) {
    console.log(`${category.label}: ${category.score}/${category.max}`);
    for (const note of category.notes) {
      console.log(`  - ${note}`);
    }
  }

  console.log('');
  if (report.tasks.length === 0) {
    console.log('Action Plan: No blockers detected. App is close to production-grade 10/10 readiness.');
    return;
  }

  console.log('Action Plan (priority order):');
  for (const task of report.tasks) {
    console.log(`  - [${task.priority}] ${task.title}: ${task.detail}`);
  }
}

evaluateReliability();
evaluateContractIntegrity();
evaluateUxClarity();
evaluateDocs();

const report = createSummary();
printReport(report);

if (!quickMode && report.rating < 10) {
  if (ciMode) {
    process.exitCode = 1;
  }
}
