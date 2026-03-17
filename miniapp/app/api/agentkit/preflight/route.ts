import { NextResponse } from 'next/server';
import { createPrivateKey } from 'node:crypto';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ApiKeyIdDiagnostics = {
  kind: 'resource-name' | 'uuid' | 'other' | 'missing';
  preview?: string;
  orgIdFromResourceName?: string;
  apiKeyIdFromResourceName?: string;
};

type ApiKeySelection = {
  selected?: string;
  selectedSource: 'CDP_API_KEY_ID' | 'CDP_API_KEY_NAME' | 'CDP_CLIENT_API_KEY' | 'none';
  fromApiKeyId?: string;
  fromApiKeyName?: string;
  fromClientApiKey?: string;
};

type SecretSelection = {
  selected?: string;
  selectedSource: 'CDP_API_KEY_SECRET' | 'CDP_SECRET_KEY' | 'PEM_ECDSA_PRIVATE_KEY' | 'none';
  fromApiKeySecret?: string;
  fromSecretKey?: string;
  fromPemEcdsaPrivateKey?: string;
};

function normalizeEnvValue(value?: string): string | undefined {
  if (!value) return undefined;
  let out = value.trim();
  if (
    (out.startsWith('"') && out.endsWith('"')) ||
    (out.startsWith("'") && out.endsWith("'"))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function normalizeApiKeySecret(value?: string): string | undefined {
  const normalized = normalizeEnvValue(value);
  if (!normalized) return undefined;

  let out = normalized;

  // Accept both literal PEM newlines and escaped newline strings from env files.
  if (out.includes('\\n') && out.includes('BEGIN')) {
    out = out.replace(/\\n/g, '\n').trim();
  }

  out = out.trim();

  // CDP SDK validates EC keys using PKCS8 import, so convert SEC1 when needed.
  if (out.includes('BEGIN EC PRIVATE KEY')) {
    try {
      const key = createPrivateKey({ key: out, format: 'pem' });
      return key.export({ format: 'pem', type: 'pkcs8' }).toString().trim();
    } catch {
      return out;
    }
  }

  return out;
}

function computeSecretFingerprint(value?: string): string | undefined {
  if (!value) return undefined;
  const body = value
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s+/g, '');
  if (!body) return undefined;

  let hash = 2166136261;
  for (let i = 0; i < body.length; i += 1) {
    hash ^= body.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const unsigned = hash >>> 0;
  return unsigned.toString(16).padStart(8, '0');
}

function selectApiKeyId(): ApiKeySelection {
  const fromApiKeyId = normalizeEnvValue(process.env.CDP_API_KEY_ID);
  const fromApiKeyName = normalizeEnvValue(process.env.CDP_API_KEY_NAME);
  const fromClientApiKey = normalizeEnvValue(process.env.CDP_CLIENT_API_KEY);

  if (fromApiKeyId) {
    return {
      selected: fromApiKeyId,
      selectedSource: 'CDP_API_KEY_ID',
      fromApiKeyId,
      fromApiKeyName,
      fromClientApiKey,
    };
  }

  if (fromApiKeyName) {
    return {
      selected: fromApiKeyName,
      selectedSource: 'CDP_API_KEY_NAME',
      fromApiKeyId,
      fromApiKeyName,
      fromClientApiKey,
    };
  }

  if (fromClientApiKey) {
    return {
      selected: fromClientApiKey,
      selectedSource: 'CDP_CLIENT_API_KEY',
      fromApiKeyId,
      fromApiKeyName,
      fromClientApiKey,
    };
  }

  return {
    selected: undefined,
    selectedSource: 'none',
    fromApiKeyId,
    fromApiKeyName,
    fromClientApiKey,
  };
}

function selectApiKeySecret(): SecretSelection {
  const fromApiKeySecret = normalizeApiKeySecret(process.env.CDP_API_KEY_SECRET);
  const fromSecretKey = normalizeApiKeySecret(process.env.CDP_SECRET_KEY);
  const fromPemEcdsaPrivateKey = normalizeApiKeySecret(process.env.PEM_ECDSA_PRIVATE_KEY);

  const candidateList: Array<{ source: SecretSelection['selectedSource']; value?: string }> = [
    { source: 'CDP_API_KEY_SECRET', value: fromApiKeySecret },
    { source: 'CDP_SECRET_KEY', value: fromSecretKey },
    { source: 'PEM_ECDSA_PRIVATE_KEY', value: fromPemEcdsaPrivateKey },
  ];

  const firstValid = candidateList.find((candidate) => isLikelyCdpSecretFormat(candidate.value));
  const firstDefined = candidateList.find((candidate) => Boolean(candidate.value));
  const selected = firstValid?.value || firstDefined?.value;
  const selectedSource = firstValid?.source || firstDefined?.source || 'none';

  if (!selected) {
    return {
      selected: undefined,
      selectedSource: 'none',
      fromApiKeySecret,
      fromSecretKey,
      fromPemEcdsaPrivateKey,
    };
  }

  if (selectedSource === 'CDP_API_KEY_SECRET') {
    return {
      selected,
      selectedSource: 'CDP_API_KEY_SECRET',
      fromApiKeySecret,
      fromSecretKey,
      fromPemEcdsaPrivateKey,
    };
  }

  if (selectedSource === 'CDP_SECRET_KEY') {
    return {
      selected,
      selectedSource: 'CDP_SECRET_KEY',
      fromApiKeySecret,
      fromSecretKey,
      fromPemEcdsaPrivateKey,
    };
  }

  if (selectedSource === 'PEM_ECDSA_PRIVATE_KEY') {
    return {
      selected,
      selectedSource: 'PEM_ECDSA_PRIVATE_KEY',
      fromApiKeySecret,
      fromSecretKey,
      fromPemEcdsaPrivateKey,
    };
  }

  return {
    selected,
    selectedSource: 'none',
    fromApiKeySecret,
    fromSecretKey,
    fromPemEcdsaPrivateKey,
  };
}

function isLikelyCdpSecretFormat(value?: string): boolean {
  if (!value) return false;
  const v = value.trim();

  // Legacy EC PEM key format.
  if (v.includes('BEGIN EC PRIVATE KEY') || v.includes('BEGIN PRIVATE KEY')) return true;

  // Ed25519 key format is base64-ish and typically longer than API key IDs.
  const base64ish = /^[A-Za-z0-9+/=]+$/.test(v);
  return base64ish && v.length >= 60;
}

function pickPreferredSecret(candidates: Array<string | undefined>): string | undefined {
  const normalized = candidates
    .map((candidate) => normalizeApiKeySecret(candidate))
    .filter((candidate): candidate is string => Boolean(candidate));

  const valid = normalized.find((candidate) => isLikelyCdpSecretFormat(candidate));
  return valid || normalized[0];
}

function previewValue(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.length <= 14) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function classifyApiKeyId(value?: string): ApiKeyIdDiagnostics {
  if (!value) return { kind: 'missing' };
  const resourceMatch = value.match(/^organizations\/([^/]+)\/apiKeys\/([^/]+)$/);
  if (resourceMatch) {
    return {
      kind: 'resource-name',
      preview: previewValue(value),
      orgIdFromResourceName: resourceMatch[1],
      apiKeyIdFromResourceName: resourceMatch[2],
    };
  }
  if (/^[0-9a-fA-F-]{36}$/.test(value)) {
    return { kind: 'uuid', preview: previewValue(value) };
  }
  return { kind: 'other', preview: previewValue(value) };
}

function expandApiKeyIdCandidates(value?: string): string[] {
  if (!value) return [];
  const out = new Set<string>([value]);
  const resourceMatch = value.match(/^organizations\/[^/]+\/apiKeys\/([^/]+)$/);
  if (resourceMatch?.[1]) {
    out.add(resourceMatch[1]);
  }
  return Array.from(out);
}

function detectSecretFormat(value?: string): 'ec-pem' | 'pkcs8-pem' | 'base64-ed25519-like' | 'unknown' | 'missing' {
  if (!value) return 'missing';
  const v = value.trim();
  if (v.includes('BEGIN EC PRIVATE KEY')) return 'ec-pem';
  if (v.includes('BEGIN PRIVATE KEY')) return 'pkcs8-pem';
  const base64ish = /^[A-Za-z0-9+/=]+$/.test(v);
  if (base64ish && v.length >= 60) return 'base64-ed25519-like';
  return 'unknown';
}

function buildRemediationHints(input: {
  credentialsPresent: boolean;
  projectId?: string;
  apiKeyIdKind: 'resource-name' | 'uuid' | 'other' | 'missing';
  orgIdFromApiKeyId?: string;
  apiKeyIdFromResourceName?: string;
  secretFormat: 'ec-pem' | 'pkcs8-pem' | 'base64-ed25519-like' | 'unknown' | 'missing';
  diagnosticMessage?: string;
}): string[] {
  const hints: string[] = [];

  if (!input.credentialsPresent) {
    hints.push('Set CDP_API_KEY_ID and CDP_API_KEY_SECRET in .env.local (server-side values only).');
    return hints;
  }

  if (input.secretFormat === 'unknown' || input.secretFormat === 'missing') {
    hints.push('Use a valid CDP secret format: EC PEM (BEGIN EC PRIVATE KEY) or base64 Ed25519 secret.');
  }

  if (input.apiKeyIdKind === 'resource-name') {
    hints.push(
      `If your portal does not expose organization IDs, set CDP_API_KEY_ID to plain key id ${input.apiKeyIdFromResourceName || '(unknown)'} instead of the full organizations/.../apiKeys/... form.`
    );
  } else {
    hints.push('Use the full resource-name style key when possible: organizations/<org-id>/apiKeys/<key-id>.');
  }

  if (input.projectId) {
    hints.push(`Confirm the API key is scoped to project ${input.projectId}.`);
  }

  if ((input.diagnosticMessage || '').toLowerCase().includes('rejected')) {
    hints.push('Copy API key ID and private key from the same key record; do not mix records or regenerated secrets.');
    hints.push('If uncertain, regenerate a fresh Secret API key and update both values together.');
  }

  return hints;
}

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

function sanitizeError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return { message: String(error || 'Unknown CDP preflight error') };
  }

  const maybe = error as {
    name?: string;
    message?: string;
    statusCode?: number;
    errorType?: string;
    correlationId?: string;
    toJSON?: () => unknown;
  };

  let json: Record<string, unknown> = {};
  try {
    if (typeof maybe.toJSON === 'function') {
      const out = maybe.toJSON();
      if (out && typeof out === 'object') {
        json = out as Record<string, unknown>;
      }
    }
  } catch {
    // Ignore serialization errors.
  }

  const rawMessage =
    maybe.message ||
    (typeof json.errorMessage === 'string' ? json.errorMessage : undefined) ||
    'CDP preflight failed';

  const normalizedMessage = rawMessage.includes('Invalid key format - must be either PEM EC key or base64 Ed25519 key')
    ? 'CDP rejected the API key material. If your secret is already valid ECDSA PEM, this usually indicates a mismatched API key ID/secret pair or a key copied from a different source/project.'
    : rawMessage;

  return {
    name: maybe.name || (typeof json.name === 'string' ? json.name : undefined),
    message: normalizedMessage,
    statusCode:
      maybe.statusCode ||
      (typeof json.statusCode === 'number' ? json.statusCode : undefined),
    errorType:
      maybe.errorType ||
      (typeof json.errorType === 'string' ? json.errorType : undefined),
    correlationId:
      maybe.correlationId ||
      (typeof json.correlationId === 'string' ? json.correlationId : undefined),
  };
}

function sanitizeCompactError(error: unknown) {
  const out = sanitizeError(error);
  return {
    name: out.name,
    message: out.message,
    statusCode: out.statusCode ?? null,
    errorType: out.errorType ?? null,
    correlationId: out.correlationId ?? null,
  };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unauthorized preflight request',
      },
      { status: 401 }
    );
  }

  const proof = await verifyPrivilegedWalletProof(request, 'cdp-preflight');
  if (!proof.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `CDP preflight requires a verified privileged wallet signature. ${proof.reason}`,
      },
      { status: 403 }
    );
  }

  const apiKeySelection = selectApiKeyId();
  const cdpApiKeyId = apiKeySelection.selected;
  const secretSelection = selectApiKeySecret();
  const cdpApiKeySecret = secretSelection.selected;
  const networkId = process.env.AGENTKIT_NETWORK_ID || 'base';
  const baseAppOwner = normalizeEnvValue(process.env.NEXT_PUBLIC_BASE_APP_OWNER);
  const projectId = normalizeEnvValue(process.env.CDP_PROJECT_ID);
  const apiKeyIdDiagnostics = classifyApiKeyId(cdpApiKeyId);
  const secretFormat = detectSecretFormat(cdpApiKeySecret);

  const cdpConfig = {
    baseAppOwner,
    projectId,
    apiKeyIdKind: apiKeyIdDiagnostics.kind,
    apiKeyIdPreview: apiKeyIdDiagnostics.preview,
    orgIdFromApiKeyId: apiKeyIdDiagnostics.orgIdFromResourceName,
    apiKeyIdFromResourceName: apiKeyIdDiagnostics.apiKeyIdFromResourceName,
    apiKeyIdSource: apiKeySelection.selectedSource,
    rawSourcePreview: {
      CDP_API_KEY_ID: previewValue(apiKeySelection.fromApiKeyId),
      CDP_API_KEY_NAME: previewValue(apiKeySelection.fromApiKeyName),
      CDP_CLIENT_API_KEY: previewValue(apiKeySelection.fromClientApiKey),
    },
    secretSource: secretSelection.selectedSource,
    rawSecretSourcePreview: {
      CDP_API_KEY_SECRET: previewValue(secretSelection.fromApiKeySecret),
      CDP_SECRET_KEY: previewValue(secretSelection.fromSecretKey),
      PEM_ECDSA_PRIVATE_KEY: previewValue(secretSelection.fromPemEcdsaPrivateKey),
    },
    secretFingerprint: computeSecretFingerprint(cdpApiKeySecret),
    secretFormat,
    usesServerEnvOnly: true,
  };

  const credentialsPresent = Boolean(cdpApiKeyId && cdpApiKeySecret);

  const remediationHints = buildRemediationHints({
    credentialsPresent,
    projectId,
    apiKeyIdKind: cdpConfig.apiKeyIdKind,
    orgIdFromApiKeyId: cdpConfig.orgIdFromApiKeyId,
    apiKeyIdFromResourceName: cdpConfig.apiKeyIdFromResourceName,
    secretFormat: cdpConfig.secretFormat,
  });

  if (!credentialsPresent) {
    const apiKeyIdMissing = !cdpApiKeyId;
    const secretMissing = !cdpApiKeySecret;

    return NextResponse.json({
      ok: false,
      mode: 'cdp-preflight',
      credentialsPresent: false,
      projectReachable: false,
      networkId,
      remediationHints,
      cdpConfig,
      diagnostics: {
        apiKeyIdMissing,
        secretMissing,
        apiKeyIdSource: apiKeySelection.selectedSource,
        secretSource: secretSelection.selectedSource,
        message: 'Missing CDP API credentials (CDP_API_KEY_ID or CDP_CLIENT_API_KEY, and CDP_API_KEY_SECRET or CDP_SECRET_KEY). CDP_WALLET_SECRET is not required for this preflight.',
      },
      checkedAt: new Date().toISOString(),
    });
  }

  if (!isLikelyCdpSecretFormat(cdpApiKeySecret)) {
    return NextResponse.json({
      ok: false,
      mode: 'cdp-preflight',
      credentialsPresent: true,
      projectReachable: false,
      networkId,
      remediationHints,
      cdpConfig,
      diagnostics: {
        name: 'InvalidCredentialFormat',
        message:
          'CDP secret format is invalid. Use a PEM EC private key or base64 Ed25519 secret from CDP API Keys.',
      },
      checkedAt: new Date().toISOString(),
    });
  }

  const candidateAttempts: Array<{
    apiKeyIdCandidate: string;
    candidateKind: 'resource-name' | 'uuid' | 'other' | 'missing';
    apiKeyIdPreview?: string;
    ok: boolean;
    error?: ReturnType<typeof sanitizeCompactError>;
  }> = [];

  try {
    const { CdpClient } = await import('@coinbase/cdp-sdk');
    const apiKeyIdCandidates = expandApiKeyIdCandidates(cdpApiKeyId);
    let policies: unknown = null;
    let lastError: unknown = null;

    for (const apiKeyIdCandidate of apiKeyIdCandidates) {
      try {
        const cdp = new CdpClient({
          apiKeyId: apiKeyIdCandidate,
          apiKeySecret: cdpApiKeySecret,
        });
        policies = await cdp.policies.listPolicies({ pageSize: 5 });
        const candidateDiagnostics = classifyApiKeyId(apiKeyIdCandidate);
        candidateAttempts.push({
          apiKeyIdCandidate,
          candidateKind: candidateDiagnostics.kind,
          apiKeyIdPreview: candidateDiagnostics.preview,
          ok: true,
        });
        break;
      } catch (candidateError) {
        const candidateDiagnostics = classifyApiKeyId(apiKeyIdCandidate);
        candidateAttempts.push({
          apiKeyIdCandidate,
          candidateKind: candidateDiagnostics.kind,
          apiKeyIdPreview: candidateDiagnostics.preview,
          ok: false,
          error: sanitizeCompactError(candidateError),
        });
        lastError = candidateError;
      }
    }

    if (!policies) {
      throw lastError instanceof Error ? lastError : new Error('Unable to authenticate with any API key ID form');
    }

    const count = Array.isArray((policies as { policies?: unknown[] }).policies)
      ? ((policies as { policies?: unknown[] }).policies || []).length
      : 0;

    return NextResponse.json({
      ok: true,
      mode: 'cdp-preflight',
      credentialsPresent: true,
      projectReachable: true,
      networkId,
      remediationHints: [],
      cdpConfig,
      candidateAttempts,
      policyCount: count,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    const diagnostics = sanitizeError(error);
    const failureHints = buildRemediationHints({
      credentialsPresent,
      projectId,
      apiKeyIdKind: cdpConfig.apiKeyIdKind,
      orgIdFromApiKeyId: cdpConfig.orgIdFromApiKeyId,
      apiKeyIdFromResourceName: cdpConfig.apiKeyIdFromResourceName,
      secretFormat: cdpConfig.secretFormat,
      diagnosticMessage: diagnostics.message,
    });

    return NextResponse.json({
      ok: false,
      mode: 'cdp-preflight',
      credentialsPresent: true,
      projectReachable: false,
      networkId,
      remediationHints: failureHints,
      cdpConfig,
      diagnostics,
      candidateAttempts:
        candidateAttempts.length > 0
          ? candidateAttempts
          : expandApiKeyIdCandidates(cdpApiKeyId).map((candidate) => {
              const candidateDiagnostics = classifyApiKeyId(candidate);
              return {
                apiKeyIdCandidate: candidate,
                candidateKind: candidateDiagnostics.kind,
                apiKeyIdPreview: candidateDiagnostics.preview,
                ok: false,
              };
            }),
      checkedAt: new Date().toISOString(),
    });
  }
}
