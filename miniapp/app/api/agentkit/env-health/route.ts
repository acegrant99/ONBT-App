import { NextResponse } from 'next/server';
import { verifyPrivilegedWalletProof, walletProofNonceStorageMode } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_AGENTKIT_TOKEN = 'QuantumLayer';

type EnvCheck = {
  key: string;
  required: boolean;
  present: boolean;
  source: 'server' | 'client';
  note?: string;
};

function configuredToken(): string {
  return (
    process.env.AGENTKIT_ADMIN_TOKEN ||
    process.env.QUANTUM_ADMIN_TOKEN ||
    process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN ||
    DEFAULT_AGENTKIT_TOKEN
  );
}

function isAuthorized(request: Request): boolean {
  const expected = configuredToken();
  const headerToken = request.headers.get('x-agentkit-admin-token')?.trim();
  const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return headerToken === expected || bearerToken === expected;
}

function isPresent(value?: string): boolean {
  return Boolean(value && value.trim().length > 0);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized env health request' },
      { status: 401 },
    );
  }

  const proof = await verifyPrivilegedWalletProof(request, 'env-health');
  if (!proof.ok) {
    return NextResponse.json(
      { ok: false, error: `Environment health checks require a verified privileged wallet signature. ${proof.reason}` },
      { status: 403 },
    );
  }

  const checks: EnvCheck[] = [
    {
      key: 'AGENTKIT_NETWORK_ID',
      required: true,
      present: isPresent(process.env.AGENTKIT_NETWORK_ID),
      source: 'server',
      note: 'AgentKit network mapping (base/base-mainnet/etc).',
    },
    {
      key: 'AGENTKIT_ADMIN_TOKEN',
      required: true,
      present: isPresent(process.env.AGENTKIT_ADMIN_TOKEN) || isPresent(process.env.NEXT_PUBLIC_AGENTKIT_ADMIN_TOKEN),
      source: 'server',
      note: 'Protects admin-style API routes.',
    },
    {
      key: 'CDP_PROJECT_ID',
      required: true,
      present: isPresent(process.env.CDP_PROJECT_ID),
      source: 'server',
    },
    {
      key: 'CDP_API_KEY_ID',
      required: true,
      present: isPresent(process.env.CDP_API_KEY_ID) || isPresent(process.env.CDP_API_KEY_NAME) || isPresent(process.env.CDP_CLIENT_API_KEY),
      source: 'server',
      note: 'Supports resource-name or uuid style values.',
    },
    {
      key: 'CDP_API_KEY_SECRET',
      required: true,
      present: isPresent(process.env.CDP_API_KEY_SECRET) || isPresent(process.env.CDP_SECRET_KEY) || isPresent(process.env.PEM_ECDSA_PRIVATE_KEY),
      source: 'server',
      note: 'PEM or base64 key material expected.',
    },
    {
      key: 'CDP_WALLET_SECRET | MNEMONIC_PHRASE',
      required: true,
      present: isPresent(process.env.CDP_WALLET_SECRET) || isPresent(process.env.MNEMONIC_PHRASE),
      source: 'server',
      note: 'At least one is required to initialize a wallet provider.',
    },
    {
      key: 'GITHUB_TOKEN',
      required: false,
      present: isPresent(process.env.GITHUB_TOKEN) || isPresent(process.env.GH_TOKEN),
      source: 'server',
      note: 'Optional, improves GitHub scout API rate limits.',
    },
    {
      key: 'NEXT_PUBLIC_BASE_APP_OWNER',
      required: false,
      present: isPresent(process.env.NEXT_PUBLIC_BASE_APP_OWNER),
      source: 'client',
    },
  ];

  const missingRequired = checks.filter((c) => c.required && !c.present).map((c) => c.key);

  return NextResponse.json({
    ok: missingRequired.length === 0,
    mode: 'env-health',
    summary:
      missingRequired.length === 0
        ? 'All required ONBT AI environment variables are present.'
        : `Missing required variables: ${missingRequired.join(', ')}`,
    checks,
    diagnostics: {
      walletProofNonceStorage: walletProofNonceStorageMode(),
    },
    checkedAt: new Date().toISOString(),
  });
}
