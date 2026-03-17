# Hardhat 3 Phase A Checklist (Scaffold Only)

Generated: 2026-02-24

## Scope

- This checklist prepares migration work in an isolated branch/worktree.
- No production dependency installs or config rewrites should happen on mainline.
- Goal: stage deterministic, reviewable edits before any install or runtime migration.

## Preconditions

- Node version pinned to >= 20.19.0 (already enforced).
- Security baseline preserved: critical vulnerabilities remain zero.
- Current Hardhat 2 workflow remains available for release/deploy continuity.

## Phase A Steps

1. Create isolated migration branch/worktree for Hardhat 3 work.
2. Add dependency swap edits only (do not run install yet).
3. Replace legacy plugin imports in config scaffold.
4. Add dual-config fallback strategy:
   - Keep `hardhat.config.cjs` (Hardhat 2) as authoritative.
   - Add `hardhat3.config.cjs` as migration target.
5. Enumerate script/task compatibility surface (`hre.ethers`, verify flows, deploy tooling).
6. Freeze a review checkpoint before any package lockfile changes.

## Validation Gates (Phase A)

- Gate A1: Migration diff is small, scoped to plugin/dependency/config entry points.
- Gate A2: No accidental changes to deploy scripts, Solidity sources, or production JSON deployment files.
- Gate A3: Checklist + diff pack reviewed and approved.

## Explicit Non-Goals in Phase A

- No lockfile churn.
- No Hardhat 3 compile/test execution yet.
- No hardhat-deploy 2.x migration or rocketh rewiring yet.
- No ethers v6-wide script migration yet.

## Exit Criteria

- A reviewed plugin/dependency/config patch set exists.
- Follow-up Phase B can begin with controlled install + compile smoke test.
