# Hardhat 3 Migration Readiness

Generated: 2026-03-04T22:09:58.220Z

## Current Snapshot

- hardhat: (missing)
- hardhat latest: 3.1.10
- @nomiclabs/hardhat-ethers: (missing)
- @nomicfoundation/hardhat-ethers: (missing)
- @nomicfoundation/hardhat-toolbox: (missing)
- @nomicfoundation/hardhat-verify: (missing)
- hardhat-deploy: (missing)
- ethers: (missing)

## Compatibility Signals

- @nomicfoundation/hardhat-verify latest: 3.0.11 (peer hardhat: ^3.1.6)
- @nomicfoundation/hardhat-ethers latest: 4.0.5 (peer hardhat: ^3.0.7)
- @nomicfoundation/hardhat-toolbox latest: unknown (peer hardhat: unknown)
- @layerzerolabs/toolbox-hardhat latest: 0.6.13 (peer hardhat: ^2.22.10, peer ethers: ^5.7.2)

## Codebase Impact

- hre.ethers occurrences: 9
- legacy plugin require occurrences (@nomiclabs/hardhat-ethers): 1
- typechain v5 references: 1

## Blockers

- LayerZero toolbox currently peers with Hardhat 2 and ethers 5.
- hardhat-deploy 2.x requires Hardhat 3 and rocketh migration.
- Config currently requires @nomiclabs/hardhat-ethers (legacy plugin).
- Project scripts and code heavily rely on hre.ethers API patterns; some behavior changed with Hardhat 3 plugin ecosystem.

## Migration Checklist

1. Create migration branch and freeze deploy scripts changes.
2. Upgrade Hardhat core to ^3.1.x and @nomicfoundation/hardhat-verify to ^3.0.x in branch only.
3. Replace @nomiclabs/hardhat-ethers with @nomicfoundation/hardhat-ethers@^4 and validate signer/provider flows.
4. Decide ethers strategy: keep ethers 5 compatibility layer where possible, or migrate deploy/runtime scripts to ethers 6.
5. Evaluate LayerZero toolbox compatibility: pin current Hardhat 2 toolchain for LayerZero ops OR split tooling into separate workspace until HL3-compatible release exists.
6. Plan hardhat-deploy transition: 0.12.x -> 2.x with rocketh adapter and deployment script rewiring.
7. Run staged validation: compile, one network dry-run deploy, verify task, security audit diffs.

## Recommendation

- Keep current Hardhat 2 production toolchain pinned for now.
- Run Hardhat 3 migration in an isolated branch/workspace with parity tests before merging.
- Prioritize security reductions not requiring framework migration while preparing plugin/tooling upgrades in parallel.
