# Hardhat 3 Phase C Preflight

Generated: 2026-02-24

## Summary

- Phase C strict preflight was executed.
- Core blocker confirmed: current root project is CommonJS (`"type": "commonjs"`), while Hardhat 3 requires ESM (`"type": "module"`).
- Result: Hardhat 3 strict compile cannot be validated in-place at root without structural migration.

## Important Recovery Note

- A temporary in-place Hardhat 3 install test briefly replaced active CLI behavior.
- Root dependency state was restored with `npm install --legacy-peer-deps`.
- Post-recovery validation succeeded: `npx hardhat compile` -> `Nothing to compile`.

## Current Safe Guardrails

- `security:hardhat3:phasec:install` is intentionally non-destructive in root.
- `security:hardhat3:phasec:preflight` now explicitly fails on ESM mismatch before risky operations.

## Practical Next Step

- Execute Hardhat 3 Phase C in an isolated migration workspace where `package.json` is ESM:
  1. create dedicated worktree/branch,
  2. convert that workspace to `"type": "module"`,
  3. install HH3 plugin set,
  4. run strict compile/test parity,
  5. keep production root on Hardhat 2 until parity is proven.
