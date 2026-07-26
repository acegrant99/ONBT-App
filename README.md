# ONBT App

## Repository hygiene

- Canonical Hardhat config: `/home/runner/work/ONBT-App/ONBT-App/hardhat.config.cjs`
- `/home/runner/work/ONBT-App/ONBT-App/hardhat.config.js` is a thin re-export entrypoint for tool compatibility.
- Deployment run artifacts (for example `deployment-v*.json`) should not be committed at repository root.

## Quality Gate (Strict)

- All pull requests and pushes to `main` are gated by `.github/workflows/quality-gate.yml`.
- The gate is intentionally always-on (no `paths` or `paths-ignore` filters).
- Local check: `npm run quality:gate`.
- Merge policy: do not merge unless the `Quality Gate / quality-gate` check is green.