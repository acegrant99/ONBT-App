# ONBT Miniapp — Path to 10/10

Current audit result (from `node scripts/rate-app.mjs`): **7.4/10**

## P0 — Must fix now

### 1) Fix production build lock error
**Issue:** `EPERM: operation not permitted, open 'C:\ONBT-App\miniapp\.next\trace'`

**Why it matters:** Production build reliability is a top-weighted category in the 10/10 audit.

**Execution steps (Windows):**
1. Stop any running Next.js or file watchers in `miniapp` terminals.
2. Remove the build cache folder:
   - PowerShell: `Remove-Item -Recurse -Force .next`
3. Re-run build:
   - `npm run build`
4. Re-run audit:
   - `npm run rate:app`

**Done when:** `npm run build` succeeds and audit no longer reports the P0 build blocker.

---

## P1 — High-value follow-up

### 2) Initialize ESLint so reliability scoring can include lint
**Issue:** ESLint is not configured, so lint is skipped and points are withheld.

**Execution steps:**
1. Run `npm run lint`.
2. Choose a baseline config when prompted (recommended: Strict).
3. Commit the generated ESLint config.
4. Re-run lint and fix reported warnings/errors.
5. Re-run audit: `npm run rate:app`.

**Done when:** `npm run lint` runs non-interactively and passes in CI/local.

---

## Re-check loop
After each fix, run:

```bash
npm run rate:app
```

To enforce strict gate in CI only:

```bash
npm run rate:app:ci
```

Target state for 10/10:
- `type-check` passes
- `lint` configured and passes
- `build` passes
- No P0/P1 blockers in audit output
