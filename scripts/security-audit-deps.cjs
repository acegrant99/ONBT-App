#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const softMode = args.includes('--soft');
const failOnArg = args.find(arg => arg.startsWith('--fail-on='));
const failOn = failOnArg ? failOnArg.split('=')[1] : 'high';

if (!['critical', 'high'].includes(failOn)) {
  console.error(`Invalid --fail-on value: ${failOn}. Use critical or high.`);
  process.exit(1);
}

const targets = [
  { name: 'root', cwd: process.cwd(), lockFile: 'package-lock.json' },
  { name: 'frontend', cwd: path.join(process.cwd(), 'frontend'), lockFile: 'package-lock.json' },
];

function ensureReportDir() {
  const reportDir = path.join(process.cwd(), 'reports', 'security');
  fs.mkdirSync(reportDir, { recursive: true });
  return reportDir;
}

function runAudit(target) {
  const lockPath = path.join(target.cwd, target.lockFile);
  if (!fs.existsSync(lockPath)) {
    return {
      target: target.name,
      skipped: true,
      reason: `missing ${target.lockFile}`,
      high: 0,
      critical: 0,
      total: 0,
      advisoryCount: 0,
    };
  }

  const result = spawnSync('npm', ['audit', '--json', '--audit-level=high'], {
    cwd: target.cwd,
    encoding: 'utf8',
    shell: true,
  });

  const stdout = result.stdout || '';
  const stderr = result.stderr || '';

  let parsed;
  try {
    parsed = JSON.parse(stdout || '{}');
  } catch {
    parsed = {};
  }

  const vulnerabilities = parsed.metadata && parsed.metadata.vulnerabilities
    ? parsed.metadata.vulnerabilities
    : {};

  const high = Number(vulnerabilities.high || 0);
  const critical = Number(vulnerabilities.critical || 0);
  const total = Number(vulnerabilities.total || 0);

  const viaV7 = parsed.vulnerabilities && typeof parsed.vulnerabilities === 'object'
    ? Object.keys(parsed.vulnerabilities).length
    : 0;

  const viaLegacy = parsed.advisories && typeof parsed.advisories === 'object'
    ? Object.keys(parsed.advisories).length
    : 0;

  const advisoryCount = Math.max(viaV7, viaLegacy);

  return {
    target: target.name,
    skipped: false,
    high,
    critical,
    total,
    advisoryCount,
    exitCode: typeof result.status === 'number' ? result.status : 1,
    parseError: !stdout.trim(),
    stderr: stderr.slice(0, 4000),
  };
}

function main() {
  const reportDir = ensureReportDir();
  const timestamp = new Date().toISOString();

  const results = targets.map(runAudit);

  const aggregate = results.reduce(
    (acc, item) => {
      acc.high += item.high || 0;
      acc.critical += item.critical || 0;
      acc.total += item.total || 0;
      acc.advisoryCount += item.advisoryCount || 0;
      if (item.skipped) acc.skipped += 1;
      return acc;
    },
    { high: 0, critical: 0, total: 0, advisoryCount: 0, skipped: 0 }
  );

  const summary = {
    timestamp,
    mode: softMode ? 'soft' : 'strict',
    failOn,
    thresholds: ['high', 'critical'],
    aggregate,
    targets: results,
  };

  const summaryPath = path.join(reportDir, 'dependency-audit-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log('\nDependency audit summary');
  console.log(`- root: high=${results[0].high}, critical=${results[0].critical}, total=${results[0].total}${results[0].skipped ? ' (skipped)' : ''}`);
  console.log(`- frontend: high=${results[1].high}, critical=${results[1].critical}, total=${results[1].total}${results[1].skipped ? ' (skipped)' : ''}`);
  console.log(`- aggregate: high=${aggregate.high}, critical=${aggregate.critical}, total=${aggregate.total}`);
  console.log(`- report: ${summaryPath}`);

  const hasCriticalFindings = aggregate.critical > 0;
  const hasHighOrCriticalFindings = aggregate.high > 0 || aggregate.critical > 0;
  const hasBlockingFindings = failOn === 'critical'
    ? hasCriticalFindings
    : hasHighOrCriticalFindings;

  if (hasBlockingFindings) {
    console.log(softMode
      ? 'Dependency audit: findings detected (soft mode, non-blocking).'
      : `Dependency audit: findings detected (blocking on ${failOn}).`);

    if (!softMode) {
      process.exit(1);
    }
  } else {
    console.log('Dependency audit: passed.');
  }
}

main();
