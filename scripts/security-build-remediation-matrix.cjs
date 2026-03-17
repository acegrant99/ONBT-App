#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targets = [
  { name: 'root', cwd: process.cwd() },
  { name: 'frontend', cwd: path.join(process.cwd(), 'frontend') },
];

const severityOrder = {
  critical: 4,
  high: 3,
  moderate: 2,
  low: 1,
  unknown: 0,
};

function ensureReportDir() {
  const reportDir = path.join(process.cwd(), 'reports', 'security');
  fs.mkdirSync(reportDir, { recursive: true });
  return reportDir;
}

function normalizeFixAvailable(fixAvailable) {
  if (fixAvailable === true) return 'yes';
  if (fixAvailable === false || fixAvailable == null) return 'no';

  if (typeof fixAvailable === 'object') {
    if (fixAvailable.name && fixAvailable.version) {
      return `${fixAvailable.name}@${fixAvailable.version}`;
    }
    if (fixAvailable.name) {
      return fixAvailable.name;
    }
  }

  return String(fixAvailable);
}

function getDependencyType(vuln) {
  if (vuln && vuln.isDirect === true) return 'direct';
  return 'transitive';
}

function runAudit(target) {
  const result = spawnSync('npm', ['audit', '--json', '--audit-level=low'], {
    cwd: target.cwd,
    encoding: 'utf8',
    shell: true,
  });

  let parsed = {};
  try {
    parsed = JSON.parse(result.stdout || '{}');
  } catch {
    parsed = {};
  }

  return parsed;
}

function extractRows(targetName, auditJson) {
  const vulnerabilities = auditJson.vulnerabilities || {};
  const rows = [];

  for (const [pkgName, vuln] of Object.entries(vulnerabilities)) {
    const severity = String(vuln.severity || 'unknown').toLowerCase();
    const via = Array.isArray(vuln.via) ? vuln.via : [];

    const advisory = via.find(item => item && typeof item === 'object' && item.url) || null;

    const title = advisory && advisory.title
      ? advisory.title
      : `${pkgName} vulnerability`;

    const url = advisory && advisory.url ? advisory.url : '';

    rows.push({
      target: targetName,
      package: pkgName,
      severity,
      dependencyType: getDependencyType(vuln),
      title,
      url,
      fixAvailable: normalizeFixAvailable(vuln.fixAvailable),
    });
  }

  return rows;
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const severityDelta = (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
    if (severityDelta !== 0) return severityDelta;

    if (a.dependencyType !== b.dependencyType) {
      return a.dependencyType === 'direct' ? -1 : 1;
    }

    return a.package.localeCompare(b.package);
  });
}

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key]] = (acc[row[key]] || 0) + 1;
    return acc;
  }, {});
}

function buildMarkdown(rows) {
  const now = new Date().toISOString();
  const bySeverity = countBy(rows, 'severity');
  const byTarget = countBy(rows, 'target');

  const header = [
    '# Dependency Remediation Matrix',
    '',
    `Generated: ${now}`,
    '',
    '## Summary',
    '',
    `- Total vulnerable packages: ${rows.length}`,
    `- Critical: ${bySeverity.critical || 0}`,
    `- High: ${bySeverity.high || 0}`,
    `- Moderate: ${bySeverity.moderate || 0}`,
    `- Low: ${bySeverity.low || 0}`,
    `- Root entries: ${byTarget.root || 0}`,
    `- Frontend entries: ${byTarget.frontend || 0}`,
    '',
    '## Prioritized Actions',
    '',
    '1. Patch critical vulnerabilities immediately, starting with direct dependencies.',
    '2. Patch high vulnerabilities with available non-breaking upgrades next.',
    '3. For transitive-only vulnerabilities, prefer parent package upgrades or overrides with test validation.',
    '',
    '## Matrix',
    '',
    '| Priority | Target | Package | Severity | Type | Fix | Advisory |',
    '|---|---|---|---|---|---|---|',
  ];

  const lines = rows.map((row, index) => {
    const advisory = row.url ? `[${row.title}](${row.url})` : row.title;
    return `| ${index + 1} | ${row.target} | ${row.package} | ${row.severity} | ${row.dependencyType} | ${row.fixAvailable} | ${advisory} |`;
  });

  if (lines.length === 0) {
    lines.push('| - | - | - | - | - | - | No vulnerabilities found |');
  }

  return [...header, ...lines, ''].join('\n');
}

function main() {
  const reportDir = ensureReportDir();

  const allRows = targets.flatMap(target => {
    const auditJson = runAudit(target);
    return extractRows(target.name, auditJson);
  });

  const sortedRows = sortRows(allRows);
  const markdown = buildMarkdown(sortedRows);

  const matrixPath = path.join(reportDir, 'dependency-remediation-matrix.md');
  fs.writeFileSync(matrixPath, markdown, 'utf8');

  console.log('Dependency remediation matrix generated.');
  console.log(`- entries: ${sortedRows.length}`);
  console.log(`- file: ${matrixPath}`);
}

main();
