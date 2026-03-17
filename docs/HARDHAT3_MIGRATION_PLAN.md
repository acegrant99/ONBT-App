# Hardhat 3 Migration Plan

## Current Blockers

- LayerZero toolbox currently peers with Hardhat 2 and ethers 5.
- `hardhat-deploy` 2.x requires Hardhat 3 and rocketh migration.
- Config currently requires `@nomiclabs/hardhat-ethers` (legacy plugin).
- Project scripts and code heavily rely on `hre.ethers` API patterns; some behavior changed with Hardhat 3 plugin ecosystem.

## Migration Checklist

1. Create migration branch and freeze deploy scripts changes.
2. Upgrade Hardhat core to `^3.1.x` and `@nomicfoundation/hardhat-verify` to `^3.0.x` in branch only.
3. Replace `@nomiclabs/hardhat-ethers` with `@nomicfoundation/hardhat-ethers@^4` and validate signer/provider flows.
4. Decide ethers strategy: keep ethers 5 compatibility layer where possible, or migrate deploy/runtime scripts to ethers 6.
5. Evaluate LayerZero toolbox compatibility: pin current Hardhat 2 toolchain for LayerZero ops OR split tooling into separate workspace until HL3-compatible release exists.
6. Plan `hardhat-deploy` transition (`0.12.x -> 2.x`) with rocketh adapter and deployment script rewiring.
7. Run staged validation: compile, one network dry-run deploy, verify task, security audit diffs.

## Recommended Execution Order

### Phase 0: Baseline & Freeze

- Freeze deployment script feature changes.
- Record baseline outputs from current stack:
  - `npx hardhat compile`
  - one representative deploy dry-run
  - verify task output

Exit criteria:
- Baseline artifacts and command outputs are stored and reproducible.

### Phase 1: Toolchain Upgrade in Isolation

- Upgrade core Hardhat + verify plugin in migration branch only.
- Swap ethers plugin to foundation variant.
- Keep LayerZero path isolated if incompatibility appears.

Exit criteria:
- Compile succeeds with new plugin set.
- No legacy plugin references remain in active config.

### Phase 2: Runtime Compatibility

- Refactor deploy/runtime code paths that rely on legacy `hre.ethers` behavior.
- Apply ethers compatibility strategy (v5 bridge or v6 migration).

Exit criteria:
- Deploy scripts execute on local/simulated networks.
- Verify scripts pass for representative contracts.

### Phase 3: Deployment Framework Transition

- Migrate `hardhat-deploy` path to required 2.x/rocketh model (or pin until planned window).
- Validate deployment artifacts, tags, and task wiring.

Exit criteria:
- Dry-run deployment parity with baseline.
- Artifact metadata shape remains consumable by existing tooling.

### Phase 4: Security/Integrity Gate

- Run security and readiness checks.
- Diff results against baseline for regressions.

Exit criteria:
- No critical regressions in deploy, verify, or security checks.

## Decision Matrix (Important)

- If LayerZero toolbox remains Hardhat-2-bound:
  - Keep LayerZero operations on Hardhat 2 in an isolated workflow/workspace.
  - Move generic contracts/dev tooling to Hardhat 3.
- If LayerZero tooling becomes HL3-compatible:
  - Consolidate back into a single Hardhat 3 toolchain.

## Tracking Commands

- Readiness report: `npm run security:hardhat3:readiness`
- Security matrix: `npm run security:hardhat3:matrix`
- Top callsites report: `npm run security:hardhat3:callsites`
- Isolated migration compile: `npm run hardhat3:migration:compile`
- Strict isolated migration compile: `npm run hardhat3:migration:compile:strict`

## Migration Config Set

- Primary isolated config: `config/hardhat3-migration/hardhat3.migration.config.cjs`
- Strict compile-only config: `config/hardhat3-migration/hardhat3.migration.strict.config.cjs`
- Callsite target report output: `reports/security/hardhat3-callsites.md`

## Done Definition

- Hardhat 3 compile stable.
- Deploy/verify dry-runs pass on representative chains.
- Security reports show no new critical blockers.
- Team runbook updated with final toolchain and rollback procedure.
