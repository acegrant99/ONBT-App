#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const shouldFix = args.has("--fix");
const strict = args.has("--strict");
const updateBaseline = args.has("--update-baseline");
const baselineArg = process.argv.find((arg) => arg.startsWith("--baseline="));
const baselineFileName = baselineArg ? baselineArg.split("=")[1] : ".workspace-guard-baseline.json";
const baselinePath = path.join(root, baselineFileName);

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "artifacts",
  "cache",
  "coverage",
  "dist",
  "build",
  "out",
  ".next",
  "typechain",
  "typechain-types"
]);

const requiredGitignoreEntries = [
  ".env",
  "node_modules/",
  "cache",
  "artifacts",
  "*.log",
  ".vscode/"
];

const clutterDeletePatterns = [
  /(^|\\|\/)Thumbs\.db$/i,
  /(^|\\|\/)\.DS_Store$/i,
  /(^|\\|\/)npm-debug\.log(\..+)?$/i,
  /(^|\\|\/)yarn-error\.log$/i,
  /(^|\\|\/)pnpm-debug\.log$/i
];

const secretPatterns = [
  {
    name: "Private key assignment",
    regex: /(private[_-]?key|deployer[_-]?key|wallet[_-]?key|mnemonic)\s*[:=]\s*["']?(0x)?[a-fA-F0-9]{64}["']?/gi
  },
  {
    name: "AWS Access Key",
    regex: /AKIA[0-9A-Z]{16}/g
  },
  {
    name: "GitHub token",
    regex: /gh[pousr]_[A-Za-z0-9_]{20,}/g
  },
  {
    name: "Hardcoded API key assignment",
    regex: /(api[_-]?key|alchemy[_-]?key|infura[_-]?key|secret|token)\s*[:=]\s*["'][A-Za-z0-9_\-.]{20,}["']/gi
  },
  {
    name: "Seed phrase style text",
    regex: /(mnemonic|seed phrase|recovery phrase)\s*[:=]/gi
  }
];

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const blocked = new Set([
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".gz", ".7z", ".rar", ".mp4", ".mp3", ".wav", ".woff", ".woff2", ".ttf", ".otf", ".eot"
  ]);
  return !blocked.has(ext);
}

function walk(dir, collector = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      walk(full, collector);
    } else {
      collector.push({ full, rel });
    }
  }
  return collector;
}

function checkGitignore() {
  const gitignorePath = path.join(root, ".gitignore");
  const missing = [];

  if (!exists(gitignorePath)) {
    return {
      ok: false,
      message: ".gitignore file is missing.",
      missing: requiredGitignoreEntries
    };
  }

  const content = readSafe(gitignorePath);
  for (const entry of requiredGitignoreEntries) {
    if (!content.includes(entry)) {
      missing.push(entry);
    }
  }

  return {
    ok: missing.length === 0,
    message: missing.length ? "Missing recommended .gitignore entries." : "All recommended .gitignore entries are present.",
    missing
  };
}

function checkSafetyFiles() {
  const risky = [];

  const alwaysSensitive = [".env", ".env.local"];
  for (const file of alwaysSensitive) {
    if (exists(path.join(root, file))) risky.push(file);
  }

  const npmrcPath = path.join(root, ".npmrc");
  if (exists(npmrcPath)) {
    const npmrcContent = readSafe(npmrcPath);
    const hasNpmAuth = /(authToken|_authToken|_password|npmAuthToken|always-auth)\s*=|:\s*_authToken\s*=|\/\/.+?:_authToken\s*=|\/\/.+?:_password\s*=/i.test(npmrcContent);
    if (hasNpmAuth) {
      risky.push(".npmrc");
    }
  }

  return risky;
}

function findSecrets(allFiles) {
  const findings = [];

  for (const file of allFiles) {
    if (!isTextFile(file.full)) continue;
    const normalizedRel = file.rel.replace(/\\/g, "/");
    if (
      normalizedRel.startsWith("frontend/.next/") ||
      normalizedRel.startsWith("docs/archive/") ||
      normalizedRel.endsWith(".tsbuildinfo") ||
      normalizedRel.endsWith("package-lock.json") ||
      normalizedRel.endsWith("yarn.lock")
    ) {
      continue;
    }

    const content = readSafe(file.full);
    if (!content) continue;

    for (const pattern of secretPatterns) {
      const matches = content.match(pattern.regex);
      if (matches && matches.length) {
        findings.push({
          file: file.rel,
          type: pattern.name,
          count: matches.length
        });
      }
    }
  }

  return findings;
}

function findClutter(allFiles) {
  const clutter = [];
  for (const file of allFiles) {
    const normalized = file.rel.replace(/\\/g, "/");
    const isClutter = clutterDeletePatterns.some((pattern) => pattern.test(normalized));
    if (isClutter) clutter.push(file);
  }
  return clutter;
}

function removeFiles(files) {
  let removed = 0;
  for (const file of files) {
    try {
      fs.unlinkSync(file.full);
      removed += 1;
    } catch {
      // ignore removal failures
    }
  }
  return removed;
}

function ensureOrganizedFolders() {
  const recommended = ["contracts", "scripts", "deploy", "docs", "test", "frontend"];
  return recommended.filter((dir) => !exists(path.join(root, dir)));
}

function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

function toBaselineKey(finding) {
  return `${finding.file}|${finding.type}`;
}

function loadBaseline(filePath) {
  if (!exists(filePath)) return new Set();

  try {
    const raw = readSafe(filePath);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    const findings = Array.isArray(parsed.findings) ? parsed.findings : [];
    return new Set(findings.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function writeBaseline(filePath, findings) {
  const keys = [...new Set(findings.map(toBaselineKey))].sort((a, b) => a.localeCompare(b));
  const payload = {
    generatedAt: new Date().toISOString(),
    findings: keys
  };
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return keys.length;
}

function main() {
  console.log("Workspace Guard");
  console.log(`Mode: ${shouldFix ? "audit + fix" : "audit only"}`);
  console.log(`Baseline: ${baselineFileName}`);

  const allFiles = walk(root);

  const gitignoreCheck = checkGitignore();
  const riskyFiles = checkSafetyFiles();
  const secretFindings = findSecrets(allFiles);
  const baseline = loadBaseline(baselinePath);
  const actionableSecretFindings = secretFindings.filter((finding) => !baseline.has(toBaselineKey(finding)));
  const clutterFiles = findClutter(allFiles);
  const missingFolders = ensureOrganizedFolders();

  if (updateBaseline) {
    const count = writeBaseline(baselinePath, secretFindings);
    printSection("Baseline");
    console.log(`Updated ${baselineFileName} with ${count} finding key(s).`);
    process.exitCode = 0;
    return;
  }

  printSection("Safety");
  console.log(gitignoreCheck.message);
  if (gitignoreCheck.missing.length) {
    console.log("Missing entries:");
    gitignoreCheck.missing.forEach((entry) => console.log(`  - ${entry}`));
  }

  if (riskyFiles.length) {
    console.log("Found sensitive local config files:");
    riskyFiles.forEach((file) => console.log(`  - ${file}`));
  } else {
    console.log("No sensitive local config files found at repo root.");
  }

  if (actionableSecretFindings.length) {
    console.log("Potential secret leaks detected (excluding baseline):");
    for (const finding of actionableSecretFindings.slice(0, 30)) {
      console.log(`  - ${finding.file} | ${finding.type} x${finding.count}`);
    }
    if (actionableSecretFindings.length > 30) {
      console.log(`  ...and ${actionableSecretFindings.length - 30} more findings.`);
    }
  } else {
    console.log("No new secret patterns detected.");
  }

  if (secretFindings.length) {
    const suppressed = secretFindings.length - actionableSecretFindings.length;
    console.log(`Total secret findings: ${secretFindings.length} (baseline suppressed: ${suppressed})`);
  }

  printSection("Organization");
  if (missingFolders.length) {
    console.log("Missing recommended project folders:");
    missingFolders.forEach((dir) => console.log(`  - ${dir}`));
  } else {
    console.log("Recommended project folders are present.");
  }

  if (clutterFiles.length) {
    console.log(`Found ${clutterFiles.length} clutter file(s) that can be cleaned.`);
    clutterFiles.slice(0, 20).forEach((file) => console.log(`  - ${file.rel}`));
    if (clutterFiles.length > 20) {
      console.log(`  ...and ${clutterFiles.length - 20} more.`);
    }

    if (shouldFix) {
      const removed = removeFiles(clutterFiles);
      console.log(`Removed ${removed}/${clutterFiles.length} clutter file(s).`);
    } else {
      console.log("Run with --fix to remove these clutter files.");
    }
  } else {
    console.log("No clutter files found.");
  }

  const hasProblems =
    !gitignoreCheck.ok ||
    actionableSecretFindings.length > 0 ||
    (strict && riskyFiles.length > 0) ||
    (strict && missingFolders.length > 0);

  printSection("Result");
  if (hasProblems) {
    console.log("Issues found. Review output above.");
    process.exitCode = 1;
  } else {
    console.log("Workspace checks passed.");
    process.exitCode = 0;
  }

  console.log("\nUsage:");
  console.log("  node scripts/workspace-guard.mjs");
  console.log("  node scripts/workspace-guard.mjs --fix");
  console.log("  node scripts/workspace-guard.mjs --strict");
  console.log("  node scripts/workspace-guard.mjs --update-baseline");
  console.log("  node scripts/workspace-guard.mjs --baseline=.workspace-guard-baseline.json");
}

main();
