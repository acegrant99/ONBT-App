# Hardhat 3 Isolated Worktree Validation

Generated: 2026-02-24

## Isolated Workspace

- Worktree path: `C:\ONBT-App-hh3`
- Branch: `copilot/hh3-migration-worktree`
- Goal: validate HH3 viability without destabilizing primary workspace.

## Actions Executed

1. Created isolated worktree.
2. Repaired malformed worktree `package.json` (was `404: Not Found`) using root copy.
3. Converted worktree to ESM (`npm pkg set type=module`).
4. Installed HH3 preflight packages:
   - `hardhat@3.1.9`
   - `@nomicfoundation/hardhat-ethers@4.0.4`
   - `@nomicfoundation/hardhat-verify@3.0.10`
5. Updated strict HH3 config to match HH3 schema (removed legacy `networks.hardhat` block).
6. Installed missing dependency: `@layerzerolabs/solidity-examples`.

## Results

- HH3 toolchain installation in isolated worktree: **successful**.
- Strict HH3 compile in isolated worktree: **blocked**.

## 2026-02-25 Delta (Non-Staking-Only Patch Run)

- User constraint applied: **no edits to staking files**.
- Updated non-staking imports only:
   - `contracts/defi/ONBTLiquidityPool.sol`
   - `contracts/defi/ONBTUniversalLiquidityPool.sol`
   - `contracts/defi/ONBTYieldDistributor.sol`
- Re-ran strict HH3 compile in isolated worktree.
- Remaining blocker is now isolated to staking import path:
   - `contracts/defi/ONBTStaking.sol` still imports `@openzeppelin/contracts/security/ReentrancyGuard.sol`.

## 2026-02-25 Delta (Dependency-Accurate Token-Only HH3 Run)

- Constraint applied: import only from paths that exist in installed dependencies.
- Added token-only HH3 config in isolated worktree:
   - `C:\ONBT-App-hh3\hardhat3.token.config.cjs`
- Compile command:
   - `npx hardhat compile --config hardhat3.token.config.cjs`
- Outcome: blocked by Node runtime compatibility, before Solidity-level validation completes.
- Exact runtime error:
   - `TypeError: this[#dependenciesMap].values(...).flatMap is not a function`
- Interpretation:
   - HH3 build path uses Node 22+ iterator helpers; Node 20.19.0 is insufficient in this environment.

## 2026-02-25 Delta (Node 22 Workaround + Targeted Token Compile)

- Ran HH3 compile with temporary Node 22 runtime (no system-wide change):
   - `npx -y node@22 .\node_modules\hardhat\dist\src\cli.js compile --config hardhat3.token.config.cjs`
- Full token folder compile failed due to duplicate OZ declarations in `NabatOFT.sol`.
   - Cause: OpenZeppelin contracts resolved from both top-level and nested `@layerzerolabs/solidity-examples` copies.
- Targeted compile succeeded when compiling only `OmnichainNabatOFT.sol`:
   - `npx -y node@22 .\node_modules\hardhat\dist\src\cli.js compile .\contracts\token\OmnichainNabatOFT.sol --config hardhat3.token.config.cjs`
   - Result: compiled 1 Solidity file with solc 0.8.22 (evm target: shanghai)

## Current Hard Blockers

1. **Node runtime policy**
   - HH3 reports Node 20.19.0 unsupported and recommends Node 22.10+.
   - In practice this is a hard blocker in this environment (iterator-helper runtime failure).

2. **OpenZeppelin import-path incompatibility under full HH3 resolution**
   - Compile error on:
     - `@openzeppelin/contracts/security/ReentrancyGuard.sol`
   - Package currently installed in repo is OZ v5 line, where this path has moved.
   - Likely migration action: rewrite imports to v5 paths (e.g. `utils/ReentrancyGuard.sol`) or pin OZ version in migration branch strategy.

## Primary Workspace Safety

- Root workspace dependencies were restored after temporary HH3 in-place test.
- Root compile path verified again on Hardhat 2.

## Recommended Next Step (Phase C.1)

- In isolated worktree only:
  1. Upgrade Node runtime to 22.10+ for migration tests.
  2. Perform OpenZeppelin import-path sweep and patch for v5 compatibility.
  3. Re-run strict HH3 compile to expose next blockers (if any).
  4. Keep primary workspace unchanged until parity is proven.
