# Workspace Source Of Truth

Updated: 2026-03-05

## What We Have

- Canonical ecosystem whitepaper:
  - `docs/whitepapers/THE_OMNICHAIN_NABAT_ECOSYSTEM.md`
- Verification configs:
  - `hardhat-verify.config.cjs` (lightweight verify-focused)
  - `hardhat.config.cjs` (full config)
- Verification scripts (multiple generations):
  - `scripts/verify-all-contracts.mjs`
  - `scripts/batch-verify-contracts.mjs`
  - `scripts/check-verification-status.mjs`
  - `scripts/verify-live-contracts-direct.mjs`
  - Plus additional legacy helpers under `scripts/*verify*`
- Constructor arg files currently available:
  - `deploy/verify-args-onbt-8453.cjs`
  - `deploy/verify-args-onbt-42161.cjs`
  - `deploy/verify-args-onbt-base.cjs`
  - `deploy/verify-args-onbt-arbitrum.cjs`
  - `deploy/verify-args-staking-base.cjs`
  - `deploy/verify-args-staking-arbitrum.cjs`
- Verification tracking doc:
  - `CONTRACT-VERIFICATION-STATUS.md`
- Verified live deployment status (Etherscan V2 check):
  - Base: 13/13 verified
  - Arbitrum: 13/13 verified
  - Combined: 26/26 verified

## What We Do Not Have / Known Gaps

- Contract-level whitepaper folder is not present:
  - `docs/whitepapers/contracts` (removed)
- Stable one-command re-verification across all scripts is not yet guaranteed.
- Some broad compile-based verify scripts can still fail if optional LayerZero dependencies are missing from local environment.

## Known Contradictions To Treat Carefully

- Historical docs may still describe pending verification workflows.
- Treat Etherscan V2 API checks as current source of truth over older static summaries.

## Operational Rules For Future Chat Steps

- Prefer `hardhat-verify.config.cjs` for focused verification attempts.
- Validate status from explorer/API and latest deploy JSON, not archival docs alone.
- When verification fails, classify quickly:
  - config/plugin issue
  - missing dependency issue
  - constructor-args mismatch
  - explorer/API submission issue
