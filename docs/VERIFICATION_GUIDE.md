# Contract Verification Guide

This guide defines the canonical verification workflow for the current ONBT live deployments.

## Current Truth

- Live verification is currently confirmed as `26/26` contracts verified across Base and Arbitrum.
- The authoritative checker is `scripts/check-verification-status.mjs` using Etherscan V2 (`chainid` + `ETHERSCAN_API_KEY`).

## Canonical Workflow

Use this command as the single status check entrypoint:

```bash
npm run verify:status
```

Equivalent direct command:

```bash
node scripts/check-verification-status.mjs
```

Expected outcome:

- Base: `13/13` verified
- Arbitrum: `13/13` verified

## Required Environment

Add this to `.env`:

```env
ETHERSCAN_API_KEY=your_key_here
```

If missing, the checker exits with an explicit error.

## When Status Shows Unverified

Use these only for remediation or re-verification operations, not for day-to-day status checks:

```bash
npx hardhat run scripts/verify-all-contracts.mjs --network base
npx hardhat run scripts/verify-all-contracts.mjs --network arbitrum
```

Single-contract fallback:

```bash
npx hardhat verify --network <network> <contract_address> --contract <contract_path> --constructor-args <args_file>
```

## Known Constraints

- Some broad verification flows can trigger compile-time dependency issues if optional packages are missing.
- Node 22 may show Hardhat warnings, but these do not block status checks.
- Historical docs/scripts may still exist; prefer this file and `scripts/check-verification-status.mjs` as source of truth.

## Script Roles

| Script | Role |
|--------|------|
| `scripts/check-verification-status.mjs` | Canonical, non-invasive live status check |
| `scripts/verify-all-contracts.mjs` | Bulk remediation submission path |
| `scripts/verify-live-contracts-direct.mjs` | Legacy/direct verify helper |
| `scripts/verify-staking-contracts.mjs` | Targeted staking-only helper |

## Explorer Links

- BaseScan: https://basescan.org
- Arbiscan: https://arbiscan.io

## Notes

- Prefer status checks over repeated submissions.
- If status and docs diverge, trust live checker output first, then update docs.
