# ONBT App

## Quality Gate (Strict)

- All pull requests and pushes to `main` are gated by `.github/workflows/quality-gate.yml`.
- The gate is intentionally always-on (no `paths` or `paths-ignore` filters).
- Local check: `npm run quality:gate`.
- Merge policy: do not merge unless the `Quality Gate / quality-gate` check is green.