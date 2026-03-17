#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const fastMode = args.has('--fast');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';
const npxCmd = isWin ? 'npx.cmd' : 'npx';

function directoryExists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function packageJsonExists(relPath) {
  return fs.existsSync(path.join(root, relPath, 'package.json'));
}

function hasWarning(output) {
  if (!output) return false;
  const normalized = String(output).toLowerCase();
  return /\bwarning\b|\bwarn\b/.test(normalized);
}

function runCheck(step) {
  const cwd = path.join(root, step.cwd);
  const label = `${step.cwd}: ${step.name}`;
  console.log(`\n[quality-gate] ${label}`);
  console.log(`[quality-gate] command: ${step.command} ${step.args.join(' ')}`);

  const result = spawnSync(step.command, step.args, {
    cwd,
    encoding: 'utf8',
    shell: false,
  });

  const stdout = result.stdout || '';
  const stderr = result.stderr || '';
  const combined = `${stdout}\n${stderr}`;

  if (stdout.trim()) process.stdout.write(stdout);
  if (stderr.trim()) process.stderr.write(stderr);

  if (typeof result.status === 'number' && result.status !== 0) {
    return {
      ok: false,
      reason: `exit code ${result.status}`,
      label,
    };
  }

  if (step.failOnWarning && hasWarning(combined)) {
    return {
      ok: false,
      reason: 'warnings detected in output',
      label,
    };
  }

  return { ok: true, label };
}

function buildChecks() {
  const checks = [];

  checks.push({
    cwd: '.',
    name: 'workspace guard strict',
    command: npmCmd,
    args: ['run', 'workspace:guard:strict'],
    failOnWarning: true,
  });

  if (!fastMode) {
    checks.push({
      cwd: '.',
      name: 'hardhat compile',
      command: npxCmd,
      args: ['hardhat', 'compile', '--show-stack-traces'],
      failOnWarning: true,
    });
  }

  if (directoryExists('frontend') && packageJsonExists('frontend')) {
    checks.push(
      {
        cwd: 'frontend',
        name: 'type-check',
        command: npmCmd,
        args: ['run', 'type-check'],
        failOnWarning: true,
      },
      {
        cwd: 'frontend',
        name: 'lint (max warnings 0)',
        command: npmCmd,
        args: ['run', 'lint', '--', '--max-warnings=0'],
        failOnWarning: true,
      }
    );

    if (!fastMode) {
      checks.push({
        cwd: 'frontend',
        name: 'build',
        command: npmCmd,
        args: ['run', 'build'],
        failOnWarning: true,
      });
    }
  }

  if (directoryExists('miniapp') && packageJsonExists('miniapp')) {
    checks.push(
      {
        cwd: 'miniapp',
        name: 'type-check',
        command: npmCmd,
        args: ['run', 'type-check'],
        failOnWarning: true,
      },
      {
        cwd: 'miniapp',
        name: 'lint (max warnings 0)',
        command: npmCmd,
        args: ['run', 'lint', '--', '--max-warnings=0'],
        failOnWarning: true,
      }
    );

    if (!fastMode) {
      checks.push({
        cwd: 'miniapp',
        name: 'build',
        command: npmCmd,
        args: ['run', 'build'],
        failOnWarning: true,
      });
    }
  }

  return checks;
}

function main() {
  const checks = buildChecks();
  const failures = [];

  console.log('[quality-gate] Starting quality gate');
  console.log(`[quality-gate] Mode: ${fastMode ? 'fast' : 'full'}`);
  console.log(`[quality-gate] Steps: ${checks.length}`);

  for (const check of checks) {
    const outcome = runCheck(check);
    if (!outcome.ok) failures.push(outcome);
  }

  console.log('\n[quality-gate] Summary');
  console.log(`[quality-gate] Passed: ${checks.length - failures.length}/${checks.length}`);

  if (failures.length > 0) {
    for (const failure of failures) {
      console.log(`[quality-gate] FAIL -> ${failure.label} (${failure.reason})`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('[quality-gate] All checks passed with zero warnings/errors.');
  process.exitCode = 0;
}

main();
