# Workspace Guard

The workspace guard helps keep this repository safe and organized.

## Script

- Path: `scripts/workspace-guard.mjs`
- Runtime: Node.js

## Commands

- Audit only:
  - `node scripts/workspace-guard.mjs`
- Audit + safe cleanup:
  - `node scripts/workspace-guard.mjs --fix`
- Strict mode (for local gate/CI):
  - `node scripts/workspace-guard.mjs --strict`
- Create or refresh secret baseline:
  - `node scripts/workspace-guard.mjs --update-baseline`
- Use a custom baseline file:
  - `node scripts/workspace-guard.mjs --baseline=.workspace-guard-baseline.json`

## What It Checks

### Safety

- Recommended `.gitignore` entries are present.
- Sensitive root files are detected (`.env`, `.env.local`, `.npmrc`).
- Potential hardcoded secrets are detected via pattern matching.

### Organization

- Recommended folders exist (`contracts`, `scripts`, `deploy`, `docs`, `test`, `frontend`).
- Common clutter files are detected (`Thumbs.db`, `.DS_Store`, `npm-debug.log`, `yarn-error.log`, `pnpm-debug.log`).

## `--fix` Behavior

`--fix` only removes detected clutter files. It does not delete source code, docs, config, or deployment files.

## Exit Codes

- `0`: Checks passed.
- `1`: One or more issues found.

## Baseline / Allowlist

- Baseline file default: `.workspace-guard-baseline.json`
- Baseline stores known legacy secret findings as `file|type` keys.
- During normal runs, baseline findings are suppressed and only new findings fail checks.
- Regenerate baseline only when intentionally accepting current known findings.

## Recommended Team Workflow

1. Run audit before PR:
   - `node scripts/workspace-guard.mjs`
2. If legacy findings are expected in current branch, refresh baseline once:
  - `node scripts/workspace-guard.mjs --update-baseline`
2. If clutter exists, run cleanup:
   - `node scripts/workspace-guard.mjs --fix`
3. Resolve secret findings before merge.
4. Optionally run strict mode in release checks.

## CI Integration

- Workflow: `.github/workflows/workspace-guard-pr.yml`
- Triggers: `pull_request`, `workflow_dispatch`
- Enforced command: `node scripts/workspace-guard.mjs --strict`
- `pull_request` path filters:
  - `scripts/workspace-guard.mjs`
  - `.workspace-guard-baseline.json`
  - `.gitignore`
  - `.github/workflows/workspace-guard-pr.yml`
  - `deploy/**`
  - `frontend/**`
  - `contracts/**`
  - `docs/WORKSPACE_GUARD.md`
- `pull_request` paths ignored:
  - `artifacts/**`
  - `cache/**`
  - `reports/**`
  - `coverage/**`
  - `frontend/.next/**`
  - `**/*.tsbuildinfo`
- Trigger policy alignment:
  - The same `pull_request` path filter policy is applied to:
    - `.github/workflows/security-secrets-scan.yml`
    - `.github/workflows/security-dependency-audit.yml`
    - `.github/workflows/security-critical-gate.yml`
  - Canonical policy note: `.github/WORKFLOW_TRIGGER_POLICY.md`
  - Reusable trigger snippet: `.github/workflow-snippets/security-pr-trigger.yml`
