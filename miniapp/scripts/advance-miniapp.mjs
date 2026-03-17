import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const quickMode = args.has('--quick');
const jsonMode = args.has('--json');
const ciMode = args.has('--ci');
const strictMode = args.has('--strict');
const fixMode = args.has('--fix');

const root = process.cwd();
const tasks = [];
const fixesApplied = [];

const categories = [
  { key: 'architecture', label: 'Architecture & Structure', max: 30, score: 0, notes: [] },
  { key: 'data', label: 'Data Reliability', max: 35, score: 0, notes: [] },
  { key: 'contracts', label: 'Contract & ABI Integrity', max: 20, score: 0, notes: [] },
  { key: 'platform', label: 'Miniapp Metadata & Platform', max: 15, score: 0, notes: [] },
];

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

function abs(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(abs(relativePath));
}

function read(relativePath) {
  const filePath = abs(relativePath);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

function write(relativePath, content) {
  const filePath = abs(relativePath);
  fs.writeFileSync(filePath, content, 'utf8');
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
    maxBuffer: 20 * 1024 * 1024,
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

function summarizeFailureOutput(output) {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-10);

  return lines.length ? lines.join(' | ') : 'No diagnostics captured.';
}

function summarizeCommandFailure(result) {
  const status = result.status === null || result.status === undefined ? 'unknown' : String(result.status);
  const signal = result.signal ? `, signal=${result.signal}` : '';
  const error = result.error ? `, error=${result.error}` : '';
  return `status=${status}${signal}${error}. ${summarizeFailureOutput(`${result.stdout}\n${result.stderr}`)}`;
}

function hasEslintConfig() {
  const candidates = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.json',
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
  ];
  return candidates.some((file) => exists(file));
}

function extractTargetVersion() {
  const farcasterRaw = read('public/.well-known/farcaster.json');
  let farcasterVersion = '';
  if (farcasterRaw) {
    try {
      const parsed = JSON.parse(farcasterRaw);
      farcasterVersion = String(parsed?.miniapp?.version || '');
    } catch {
      farcasterVersion = '';
    }
  }

  const miniKit = read('minikit.config.ts');
  const minikitVersionMatch = miniKit.match(/miniapp:\s*\{[\s\S]*?version:\s*"([^"]+)"/);
  const minikitVersion = minikitVersionMatch ? minikitVersionMatch[1] : '';

  const layout = read('app/layout.tsx');
  const layoutVersionMatch = layout.match(/FC_MINIAPP\s*=\s*JSON\.stringify\(\{[\s\S]*?version:\s*'([^']+)'/);
  const layoutVersion = layoutVersionMatch ? layoutVersionMatch[1] : '';

  return farcasterVersion || minikitVersion || layoutVersion || '1';
}

function applyMetadataVersionFixes() {
  const targetVersion = extractTargetVersion();

  const farcasterPath = 'public/.well-known/farcaster.json';
  const farcasterRaw = read(farcasterPath);
  if (farcasterRaw) {
    try {
      const parsed = JSON.parse(farcasterRaw);
      if (String(parsed?.miniapp?.version || '') !== targetVersion) {
        parsed.miniapp.version = targetVersion;
        write(farcasterPath, `${JSON.stringify(parsed, null, 2)}\n`);
        fixesApplied.push(`Aligned ${farcasterPath} miniapp.version to ${targetVersion}`);
      }
    } catch {
      // Keep evaluation error path for invalid JSON.
    }
  }

  const minikitPath = 'minikit.config.ts';
  const minikitRaw = read(minikitPath);
  if (minikitRaw) {
    const updated = minikitRaw.replace(
      /(miniapp:\s*\{[\s\S]*?version:\s*")([^"]+)(")/,
      `$1${targetVersion}$3`
    );
    if (updated !== minikitRaw) {
      write(minikitPath, updated);
      fixesApplied.push(`Aligned ${minikitPath} miniapp.version to ${targetVersion}`);
    }
  }

  const layoutPath = 'app/layout.tsx';
  const layoutRaw = read(layoutPath);
  if (layoutRaw) {
    const updated = layoutRaw.replace(
      /(FC_MINIAPP\s*=\s*JSON\.stringify\(\{[\s\S]*?version:\s*')([^']+)(')/,
      `$1${targetVersion}$3`
    );
    if (updated !== layoutRaw) {
      write(layoutPath, updated);
      fixesApplied.push(`Aligned ${layoutPath} FC_MINIAPP version to ${targetVersion}`);
    }
  }
}

function applyRefetchIntervalFixes() {
  const componentFiles = [
    'components/TokenInterface.tsx',
    'components/BridgeInterface.tsx',
    'components/StakingInterface.tsx',
    'components/GovernanceInterface.tsx',
    'components/PrivateSaleInterface.tsx',
  ];

  for (const file of componentFiles) {
    const original = read(file);
    if (!original) continue;

    let modifiedBlocks = 0;
    const updated = original.replace(/useReadContract\(\{[\s\S]*?\}\);/g, (block) => {
      if (!/query:\s*\{/.test(block)) return block;
      if (/refetchInterval\s*:\s*\d+/.test(block)) return block;
      modifiedBlocks += 1;
      return block.replace(/query:\s*\{/, 'query: { refetchInterval: 30_000,');
    });

    if (updated !== original) {
      write(file, updated);
      fixesApplied.push(`Added refetchInterval to ${modifiedBlocks} read hook(s) in ${file}`);
    }
  }
}

function applySafeFixes() {
  if (!fixMode) return;
  applyMetadataVersionFixes();
  applyRefetchIntervalFixes();
}

function evaluateStructure() {
  const requiredDirs = ['app', 'components', 'config', 'config/abis', 'lib', 'public/.well-known', 'scripts'];
  const missingDirs = requiredDirs.filter((dir) => !exists(dir));
  if (missingDirs.length === 0) {
    addScore('architecture', 8, 'Miniapp directory structure is complete.');
  } else {
    addTask('P0', 'Restore core miniapp directories', `Missing directories: ${missingDirs.join(', ')}`);
  }

  const requiredFiles = [
    'App.tsx',
    'app/layout.tsx',
    'app/page.tsx',
    'config/contracts.ts',
    'lib/txStatus.ts',
    'public/.well-known/farcaster.json',
    'minikit.config.ts',
  ];
  const missingFiles = requiredFiles.filter((file) => !exists(file));
  if (missingFiles.length === 0) {
    addScore('architecture', 10, 'Core miniapp files are present.');
  } else {
    addTask('P0', 'Restore required miniapp files', `Missing files: ${missingFiles.join(', ')}`);
  }

  const appText = read('App.tsx');
  const hasProviders =
    /<WagmiProvider/.test(appText) &&
    /<QueryClientProvider/.test(appText) &&
    /<OnchainKitProvider/.test(appText);
  if (hasProviders) {
    addScore('architecture', 6, 'Provider stack (wagmi + react-query + OnchainKit) is wired at app root.');
  } else {
    addTask('P0', 'Fix root provider composition', 'App.tsx should wrap UI with WagmiProvider, QueryClientProvider, and OnchainKitProvider.');
  }

  const hasReadyHandshake = /sdk\.actions\.ready\(\)/.test(appText);
  if (hasReadyHandshake) {
    addScore('architecture', 3, 'Farcaster ready handshake is present.');
  } else {
    addTask('P0', 'Add Farcaster ready handshake', 'Call sdk.actions.ready() in App.tsx to avoid splash lock.');
  }

  const hasGlobalStatus = /GLOBAL_TX_STATUS_EVENT/.test(appText) && /globalTxStatus/.test(appText);
  if (hasGlobalStatus) {
    addScore('architecture', 3, 'Global transaction status channel is connected.');
  } else {
    addTask('P1', 'Restore global tx feedback', 'App.tsx should subscribe to GLOBAL_TX_STATUS_EVENT and render a status bar.');
  }
}

function evaluateDataReliability() {
  const appText = read('App.tsx');
  const hasQueryStaleTime = /staleTime\s*:\s*\d+/.test(appText);
  const hasRetryLimit = /retry\s*:\s*1/.test(appText) || /retry\s*:\s*\(.*\)/.test(appText);
  if (hasQueryStaleTime && hasRetryLimit) {
    addScore('data', 8, 'QueryClient reliability defaults are configured.');
  } else {
    addTask('P0', 'Harden QueryClient defaults', 'Set query staleTime and controlled retry policy in App.tsx.');
  }

  const componentFiles = [
    'components/TokenInterface.tsx',
    'components/BridgeInterface.tsx',
    'components/StakingInterface.tsx',
    'components/GovernanceInterface.tsx',
    'components/PrivateSaleInterface.tsx',
  ];

  let readCalls = 0;
  let intervalReads = 0;
  for (const file of componentFiles) {
    const text = read(file);
    const blocks = text.match(/useReadContract\([\s\S]*?\}\);/g) || [];
    readCalls += blocks.length;
    intervalReads += blocks.filter((block) => /refetchInterval\s*:\s*\d+/.test(block)).length;
  }

  if (readCalls === 0) {
    addTask('P1', 'No read contracts detected', 'Expected useReadContract hooks in transaction interfaces.');
  } else {
    const coverage = intervalReads / readCalls;
    if (coverage >= 0.75) {
      addScore('data', 12, `Read refresh coverage is strong (${intervalReads}/${readCalls} hooks with refetchInterval).`);
    } else {
      addTask('P1', 'Increase live-data refresh coverage', `Only ${intervalReads}/${readCalls} useReadContract hooks define refetchInterval.`);
    }
  }

  const privateSale = read('components/PrivateSaleInterface.tsx');
  const hasEthQuoteGuard = /enabled:\s*saleContractConfiguredForChain[\s\S]*isTokenPayment/.test(privateSale)
    || /quotePurchase[\s\S]*isTokenPayment/.test(privateSale);
  if (hasEthQuoteGuard) {
    addScore('data', 7, 'Private sale quote guard prevents ETH zero-address quote reverts.');
  } else {
    addTask('P0', 'Guard private sale quote path', 'Only call quotePurchase for token-payment mode to avoid revert loops.');
  }

  const staking = read('components/StakingInterface.tsx');
  const hasPauseAndMinimum = /functionName:\s*'paused'/.test(staking) && /functionName:\s*'MIN_STAKE'/.test(staking);
  if (hasPauseAndMinimum) {
    addScore('data', 8, 'Staking reads include paused and MIN_STAKE safeguards.');
  } else {
    addTask('P1', 'Add staking safety reads', 'Read paused and MIN_STAKE from staking contract and gate UI actions accordingly.');
  }
}

function evaluateContractsAndAbis() {
  const contractsConfig = read('config/contracts.ts');
  const hasRealAbiImports =
    /OmnichainNabatOFT_ABI/.test(contractsConfig) &&
    /ONBTOmnichainStaking_ABI/.test(contractsConfig) &&
    /ONBTPrivateSaleOApp_ABI/.test(contractsConfig);

  if (hasRealAbiImports) {
    addScore('contracts', 7, 'contracts.ts maps to real generated contract ABIs.');
  } else {
    addTask('P0', 'Replace stub contract ABIs', 'contracts.ts should import and re-export generated ABIs from config/abis/.');
  }

  const abiFiles = [
    'config/abis/OmnichainNabatOFT.abi.ts',
    'config/abis/ONBTOmnichainStaking.abi.ts',
    'config/abis/ONBTPrivateSaleOApp.abi.ts',
  ];

  const missingAbiFiles = abiFiles.filter((file) => !exists(file));
  if (missingAbiFiles.length > 0) {
    addTask('P0', 'Restore generated ABI files', `Missing: ${missingAbiFiles.join(', ')}`);
  } else {
    const abiEntryCounts = abiFiles.map((file) => countMatches(read(file), /"type"\s*:/g));
    const minEntries = Math.min(...abiEntryCounts);
    if (minEntries >= 20) {
      addScore('contracts', 8, `Generated ABI files are populated (${abiEntryCounts.join('/') } entries).`);
    } else {
      addTask('P1', 'Regenerate ABI files', `One or more ABI files look incomplete (${abiEntryCounts.join('/') } entries).`);
    }
  }

  const hasCrossChainAddresses =
    /NEXT_PUBLIC_ONBT_BASE_ADDRESS/.test(contractsConfig) &&
    /NEXT_PUBLIC_ONBT_ARBITRUM_ADDRESS/.test(contractsConfig) &&
    /NEXT_PUBLIC_ONBT_STAKING_BASE_ADDRESS/.test(contractsConfig) &&
    /NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS/.test(contractsConfig);

  if (hasCrossChainAddresses) {
    addScore('contracts', 5, 'Cross-chain deployed addresses are sourced from env-backed config.');
  } else {
    addTask('P0', 'Complete deployed address mapping', 'contracts.ts should map Base + Arbitrum addresses from env variables.');
  }
}

function evaluateMetadataAndAssets() {
  const farcasterRaw = read('public/.well-known/farcaster.json');
  const miniKit = read('minikit.config.ts');
  const layout = read('app/layout.tsx');

  let farcasterVersion = '';
  if (farcasterRaw) {
    try {
      const parsed = JSON.parse(farcasterRaw);
      farcasterVersion = String(parsed?.miniapp?.version || '');
    } catch {
      addTask('P0', 'Fix farcaster.json formatting', 'public/.well-known/farcaster.json must be valid JSON.');
    }
  }

  const minikitVersionMatch = miniKit.match(/miniapp:\s*\{[\s\S]*?version:\s*"([^"]+)"/);
  const minikitVersion = minikitVersionMatch ? minikitVersionMatch[1] : '';

  const layoutVersionMatch = layout.match(/FC_MINIAPP\s*=\s*JSON\.stringify\(\{[\s\S]*?version:\s*'([^']+)'/);
  const layoutVersion = layoutVersionMatch ? layoutVersionMatch[1] : '';

  const allVersionsPresent = farcasterVersion && minikitVersion && layoutVersion;
  const versionsAligned = allVersionsPresent && farcasterVersion === minikitVersion && minikitVersion === layoutVersion;

  if (versionsAligned) {
    addScore('platform', 7, `Miniapp metadata versions are aligned (${farcasterVersion}).`);
  } else {
    addTask(
      'P0',
      'Align miniapp metadata versions',
      `Version mismatch: farcaster.json=${farcasterVersion || 'missing'}, minikit.config.ts=${minikitVersion || 'missing'}, app/layout.tsx=${layoutVersion || 'missing'}`
    );
  }

  const nextConfig = read('next.config.mjs');
  const hasNoStoreFarcaster = /source:\s*'\/\.well-known\/farcaster\.json'[\s\S]*?Cache-Control[\s\S]*?no-store/.test(nextConfig);
  if (hasNoStoreFarcaster) {
    addScore('platform', 4, 'farcaster.json cache policy is protected with no-store headers.');
  } else {
    addTask('P1', 'Set no-store header for farcaster.json', 'Add next.config.mjs headers() rule for /.well-known/farcaster.json to prevent stale CDN manifests.');
  }

  const assetFiles = ['App.tsx', 'app/layout.tsx', 'minikit.config.ts', 'public/.well-known/farcaster.json'];
  const allowedAssetPatterns = [
    /^https:\/\/www\.nabat\.finance\/branding\//,
    /^\/branding\//,
    /^\$\{ROOT_URL\}\/branding\//,
  ];

  const suspiciousAssets = [];
  for (const file of assetFiles) {
    const text = read(file);
    const urls = text.match(/(?:https?:\/\/[^"'\s)]+|\/branding\/[A-Za-z0-9._-]+)/g) || [];
    for (const url of urls) {
      if (/docs\.layerzero\.network|x\.com|discord\.gg|t\.me|basescan\.org|arbiscan\.io|www\.nabat\.finance(?!\/branding\/)/.test(url)) {
        continue;
      }
      const allowed = allowedAssetPatterns.some((pattern) => pattern.test(url));
      if (!allowed && /branding|icon|image|splash|hero|og/i.test(url)) {
        suspiciousAssets.push(`${file}: ${url}`);
      }
    }
  }

  if (suspiciousAssets.length === 0) {
    addScore('platform', 4, 'Asset references use deployed branding paths only.');
  } else {
    addTask('P1', 'Remove undeployed asset references', suspiciousAssets.slice(0, 6).join(' | '));
  }
}

function evaluateRuntimeQuality() {
  if (quickMode) {
    addScore('architecture', 3, 'Quick mode enabled: runtime checks skipped.');
    addTask('P1', 'Run full advanced audit', 'Execute without --quick to include type-check/lint/build verification.');
    return;
  }

  const typecheck = runNpmScript('type-check', 240000);
  if (typecheck.ok) {
    addScore('architecture', 4, 'Type-check passes.');
  } else {
    addTask('P0', 'Fix TypeScript errors', `type-check failed. ${summarizeCommandFailure(typecheck)}`);
  }

  if (hasEslintConfig()) {
    const lint = runNpmScript('lint', 240000);
    if (lint.ok) {
      addScore('data', 3, 'Lint passes.');
    } else {
      addTask('P1', 'Fix lint issues', `lint failed. ${summarizeCommandFailure(lint)}`);
    }
  } else {
    addTask('P2', 'Initialize ESLint config', 'Run `npm run lint` once to initialize lint config for stronger CI checks.');
  }

  const build = runNpmScript('build', 480000);
  if (build.ok) {
    addScore('platform', 2, 'Production build passes.');
  } else {
    addTask('P0', 'Fix production build', `build failed. ${summarizeCommandFailure(build)}`);
  }
}

function createReport() {
  for (const category of categories) {
    category.score = Math.max(0, Math.min(category.score, category.max));
  }

  const total = categories.reduce((sum, category) => sum + category.score, 0);
  const max = categories.reduce((sum, category) => sum + category.max, 0);
  const rating = Number(((total / max) * 10).toFixed(1));

  const priorityOrder = { P0: 0, P1: 1, P2: 2 };
  const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return {
    mode: quickMode ? 'quick' : 'full',
    strictMode,
    fixMode,
    score: total,
    maxScore: max,
    rating,
    categories,
    tasks: sortedTasks,
    fixesApplied,
    timestamp: new Date().toISOString(),
  };
}

function printReport(report) {
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('ONBT Miniapp Advanced Audit');
  console.log('==========================');
  console.log(`Score: ${report.score}/${report.maxScore} | Rating: ${report.rating}/10 | Mode: ${report.mode}${report.fixMode ? ' + fix' : ''}`);
  console.log('');

  if (report.fixesApplied.length > 0) {
    console.log('Fixes Applied:');
    for (const fix of report.fixesApplied) {
      console.log(`  - ${fix}`);
    }
    console.log('');
  }

  for (const category of report.categories) {
    console.log(`${category.label}: ${category.score}/${category.max}`);
    for (const note of category.notes) {
      console.log(`  - ${note}`);
    }
  }

  console.log('');
  if (report.tasks.length === 0) {
    console.log('Action Plan: No blockers. Miniapp structure and UX reliability checks are green.');
    return;
  }

  console.log('Action Plan (priority order):');
  for (const task of report.tasks) {
    console.log(`  - [${task.priority}] ${task.title}: ${task.detail}`);
  }
}

applySafeFixes();

evaluateStructure();
evaluateDataReliability();
evaluateContractsAndAbis();
evaluateMetadataAndAssets();
evaluateRuntimeQuality();

const report = createReport();
printReport(report);

if (ciMode) {
  if (strictMode) {
    process.exitCode = report.rating >= 9.0 && report.tasks.filter((t) => t.priority === 'P0').length === 0 ? 0 : 1;
  } else {
    process.exitCode = report.tasks.filter((t) => t.priority === 'P0').length === 0 ? 0 : 1;
  }
}
