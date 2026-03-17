# Workflow Trigger Policy

This note keeps security workflow trigger settings consistent across the repository.

## Canonical `pull_request` paths

- `scripts/workspace-guard.mjs`
- `.workspace-guard-baseline.json`
- `.gitignore`
- `.github/workflows/workspace-guard-pr.yml`
- `deploy/**`
- `frontend/**`
- `contracts/**`
- `docs/WORKSPACE_GUARD.md`

## Canonical `pull_request` paths-ignore

- `artifacts/**`
- `cache/**`
- `reports/**`
- `coverage/**`
- `frontend/.next/**`
- `**/*.tsbuildinfo`

## Workflows using this policy

- `.github/workflows/workspace-guard-pr.yml`
- `.github/workflows/security-secrets-scan.yml`
- `.github/workflows/security-dependency-audit.yml`
- `.github/workflows/security-critical-gate.yml`

## Additional required gate

- `.github/workflows/quality-gate.yml` enforces strict zero-warning/zero-error checks across root, frontend, and miniapp via `npm run quality:gate`.
- The quality gate is intentionally always-on (no `paths`/`paths-ignore` filters) for `pull_request` and `push` to `main`.

## Contributor rule

When changing `pull_request` filters in one listed workflow, update the others in the same PR to keep trigger behavior aligned.

## Reusable snippet

- Copy source: `.github/workflow-snippets/security-pr-trigger.yml`
- Use this snippet when creating new security workflows or updating `on.pull_request` filters.
