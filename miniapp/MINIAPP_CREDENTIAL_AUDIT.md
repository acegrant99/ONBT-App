# Miniapp Credential Audit

Generated: 2026-03-08
Workspace: `c:\ONBT-App\miniapp`

## Miniapp Runtime Identity

- App name: `onbt-miniapp`
- Version: `1.0.0`
- Dev URL: `http://localhost:3000`
- Next.js env load order observed in runtime logs: `.env.local`, `.env`

## Active Credential Inputs (from `.env.local`)

- `CDP_PROJECT_ID`: `0d3e4af9-0c71-4270-9f49-7660b948dcac`
- `CDP_API_KEY_ID`: `organizations/c14e4398-60b1-40fe-9605-91b7830495c8/apiKeys/3213b04a-96d3-4d15-9bbe-23e3dc37a29c`
- `CDP_API_KEY_SECRET`: present (EC PEM format detected)
- `NEXT_PUBLIC_CDP_CLIENT_API_KEY`: present (`Ck1Ct...`)
- `AGENTKIT_NETWORK_ID`: `base`

Notes:
- Backend auth paths (`/api/agentkit/preflight`, `/api/agentkit/advisor`) are configured to use server-side vars only (no `NEXT_PUBLIC_*` fallback).
- `NEXT_PUBLIC_CDP_CLIENT_API_KEY` is client-side and not used for backend server-auth in current route logic.

## Current Runtime Results

- `POST /api/agentkit/preflight` returns `ok=false`, `projectReachable=false`
- Diagnostic message: CDP rejected API key material (likely key ID/secret mismatch)
- `POST /api/agentkit/advisor` returns `mode=agentkit-unavailable`

## Portal Cross-Check Checklist

1. In CDP Portal, open key ID:
   - `3213b04a-96d3-4d15-9bbe-23e3dc37a29c`
2. Confirm org scope matches:
   - `c14e4398-60b1-40fe-9605-91b7830495c8`
3. Confirm this key belongs to project:
   - `0d3e4af9-0c71-4270-9f49-7660b948dcac`
4. Confirm the private key in `.env.local` was copied from this exact key record creation event.
5. If any mismatch exists, regenerate a new Secret API key and replace both `CDP_API_KEY_ID` and `CDP_API_KEY_SECRET` together.

## Suggested Minimal `.env.local` Block

```env
AGENTKIT_NETWORK_ID=base
AGENTKIT_ADMIN_TOKEN=QuantumLayer
CDP_PROJECT_ID=0d3e4af9-0c71-4270-9f49-7660b948dcac
CDP_API_KEY_ID=organizations/<org-id>/apiKeys/<api-key-id>
CDP_API_KEY_SECRET=-----BEGIN EC PRIVATE KEY-----\n...\n-----END EC PRIVATE KEY-----\n
```
