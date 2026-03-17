import { NextResponse } from 'next/server';
import { verifyPrivilegedWalletProof, walletProofNonceStorageMode } from '@/lib/agentkit/walletAccess';
import { notificationTokenStorageMode } from '@/lib/notificationStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type EnvCheck = {
  key: string;
  required: boolean;
  present: boolean;
  source: 'server' | 'client';
  note?: string;
};

function configuredToken(): string | null {
  return (
    process.env.AGENTKIT_ADMIN_TOKEN ||
    process.env.QUANTUM_ADMIN_TOKEN ||
    null
  );
}

function isAuthorized(request: Request): boolean {
  const expected = configuredToken();
  if (!expected) return false;
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
      present: isPresent(process.env.AGENTKIT_ADMIN_TOKEN) || isPresent(process.env.QUANTUM_ADMIN_TOKEN),
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
    {
      key: 'REDIS_URL',
      required: false,
      present: isPresent(process.env.REDIS_URL),
      source: 'server',
      note: 'Standard Redis TCP URL (Redis Labs, self-hosted). Takes priority over REST.',
    },
    {
      key: 'REDIS_API_KEY',
      required: false,
      present: isPresent(process.env.REDIS_API_KEY),
      source: 'server',
      note: 'Redis REST API key (Redis Cloud / Upstash). Pair with REDIS_API_URL.',
    },
    {
      key: 'REDIS_API_URL',
      required: false,
      present: isPresent(process.env.REDIS_API_URL),
      source: 'server',
      note: 'Redis REST endpoint URL. Required when using REDIS_API_KEY for REST access.',
    },
    {
      key: 'QPANDA_PILOT_API',
      required: false,
      present: isPresent(process.env.QPANDA_PILOT_API),
      source: 'server',
      note: 'API key for Origin Quantum QPanda quantum computer job submission. Obtain from https://console.originqc.com.cn/en/apikey. Used by /api/quantum/qpanda.',
    },
    {
      key: 'QPANDA_PILOT_URL',
      required: isPresent(process.env.QPANDA_PILOT_API),
      present: isPresent(process.env.QPANDA_PILOT_URL),
      source: 'server',
      note: 'OriginQC cloud QPanda endpoint (QPilotOS). Set to https://qcloud.originqc.com.cn for the OriginQC cloud quantum computer.',
    },
    {
      key: 'ORIGIN_PILOT_API',
      required: false,
      present: isPresent(process.env.ORIGIN_PILOT_API),
      source: 'server',
      note: 'LLM-specific API key for Origin Brain AI (separate from the QPanda key). Enables live RAYAY AI responses. Leave blank until LLM credentials are obtained from OriginQC.',
    },
    {
      key: 'ORIGIN_PILOT_URL',
      required: false,
      present: isPresent(process.env.ORIGIN_PILOT_URL),
      source: 'server',
      note: 'Base URL for the Origin Brain LLM endpoint (default: https://qcloud.originqc.com.cn/api/v1).',
    },
    {
      key: 'ORIGIN_PILOT_MODEL',
      required: false,
      present: isPresent(process.env.ORIGIN_PILOT_MODEL),
      source: 'server',
      note: 'Model name for the Origin Brain LLM (default: Qwen2.5-72B-Instruct).',
    },
    {
      key: 'UPSTASH_REDIS_REST_URL | KV_REST_API_URL',
      required: process.env.NODE_ENV === 'production' && !isPresent(process.env.REDIS_URL) && !isPresent(process.env.REDIS_API_KEY),
      present: isPresent(process.env.UPSTASH_REDIS_REST_URL) || isPresent(process.env.KV_REST_API_URL),
      source: 'server',
      note: 'Required in production when no other Redis credentials are configured.',
    },
    {
      key: 'UPSTASH_REDIS_REST_TOKEN | KV_REST_API_TOKEN',
      required: process.env.NODE_ENV === 'production' && !isPresent(process.env.REDIS_URL) && !isPresent(process.env.REDIS_API_KEY),
      present: isPresent(process.env.UPSTASH_REDIS_REST_TOKEN) || isPresent(process.env.KV_REST_API_TOKEN),
      source: 'server',
      note: 'Required in production for notification token persistence when using Upstash REST.',
    },
    {
      key: 'MINIKIT_NOTIFY_SECRET',
      required: process.env.NODE_ENV === 'production',
      present: isPresent(process.env.MINIKIT_NOTIFY_SECRET),
      source: 'server',
      note: 'Required in production to authorize /api/send-notification requests.',
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
      notificationTokenStorage: notificationTokenStorageMode(),
      notificationFileFallbackAllowed:
        process.env.MINIKIT_ALLOW_FILE_FALLBACK === 'true' || process.env.NODE_ENV !== 'production',
    },
    checkedAt: new Date().toISOString(),
  });
}
