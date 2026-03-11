import { verifyMessage } from 'viem';

export type AiWalletRole = 'user' | 'deployer' | 'cdp';
export type AiWalletMode = 'auto' | AiWalletRole;

const WALLET_AUTH_MAX_AGE_MS = 5 * 60 * 1000;
const walletProofNonceCache = new Map<string, number>();

function redisConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_URL;

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN;

  return {
    url: url?.trim(),
    token: token?.trim(),
  };
}

export function walletProofNonceStorageMode(): 'redis' | 'memory-fallback' {
  const config = redisConfig();
  return config.url && config.token ? 'redis' : 'memory-fallback';
}

function walletProofNonceKey(input: {
  walletAddress: string;
  method: string;
  path: string;
  purpose: string;
  nonce: string;
}) {
  return [
    input.walletAddress,
    input.method.toUpperCase(),
    input.path,
    input.purpose,
    input.nonce,
  ].join('|');
}

export type WalletProofInput = {
  walletAddress: string;
  method: string;
  path: string;
  purpose: string;
  timestamp: string;
  nonce: string;
};

export type WalletProofHeaders = {
  address?: string;
  signature?: string;
  timestamp?: string;
  nonce?: string;
  purpose?: string;
};

export type WalletProofVerificationResult =
  | {
      ok: true;
      walletAddress?: string;
      reason: string;
    }
  | {
      ok: false;
      reason: string;
    };

export function normalizeAddress(value?: string): string | undefined {
  if (!value) return undefined;
  const out = value.trim().toLowerCase();
  if (!out.startsWith('0x') || out.length !== 42) return undefined;
  return out;
}

export function splitAddressList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[\s,;]+/)
    .map((part) => normalizeAddress(part))
    .filter((part): part is string => Boolean(part));
}

export function configuredWalletLists() {
  const deployer = [
    ...splitAddressList(process.env.DEPLOYER_WALLET_ADDRESS),
    ...splitAddressList(process.env.DEPLOYER_WALLET_ADDRESSES),
    ...splitAddressList(process.env.NEXT_PUBLIC_DEPLOYER_WALLET_ADDRESS),
    ...splitAddressList(process.env.NEXT_PUBLIC_DEPLOYER_WALLET_ADDRESSES),
    ...splitAddressList(process.env.ONBT_DEPLOYER_ADDRESS),
  ];

  const cdp = [
    ...splitAddressList(process.env.CDP_WALLET_ADDRESS),
    ...splitAddressList(process.env.CDP_WALLET_ADDRESSES),
    ...splitAddressList(process.env.NEXT_PUBLIC_CDP_WALLET_ADDRESS),
    ...splitAddressList(process.env.NEXT_PUBLIC_CDP_WALLET_ADDRESSES),
    ...splitAddressList(process.env.ONBT_CDP_WALLET_ADDRESS),
  ];

  return {
    deployer: Array.from(new Set(deployer)),
    cdp: Array.from(new Set(cdp)),
  };
}

export function configuredPrivilegedWallets(): string[] {
  const configured = configuredWalletLists();
  return Array.from(new Set([...configured.deployer, ...configured.cdp]));
}

export function buildWalletProofMessage(input: WalletProofInput): string {
  return [
    'ONBT AI privileged action authorization',
    `Wallet: ${input.walletAddress}`,
    `Method: ${input.method.toUpperCase()}`,
    `Path: ${input.path}`,
    `Purpose: ${input.purpose}`,
    `Timestamp: ${input.timestamp}`,
    `Nonce: ${input.nonce}`,
  ].join('\n');
}

export function extractWalletProofHeaders(request: Request): WalletProofHeaders {
  return {
    address: request.headers.get('x-ai-wallet-address') || undefined,
    signature: request.headers.get('x-ai-wallet-signature') || undefined,
    timestamp: request.headers.get('x-ai-wallet-timestamp') || undefined,
    nonce: request.headers.get('x-ai-wallet-nonce') || undefined,
    purpose: request.headers.get('x-ai-wallet-purpose') || undefined,
  };
}

function parseRequestPath(request: Request): string {
  try {
    return new URL(request.url).pathname;
  } catch {
    return '/api/agentkit/unknown';
  }
}

function purgeExpiredWalletProofNonces(now: number) {
  for (const [key, expiresAt] of walletProofNonceCache.entries()) {
    if (expiresAt <= now) {
      walletProofNonceCache.delete(key);
    }
  }
}

function consumeWalletProofNonce(input: {
  walletAddress: string;
  method: string;
  path: string;
  purpose: string;
  nonce: string;
  now: number;
}): boolean {
  purgeExpiredWalletProofNonces(input.now);
  const nonceKey = walletProofNonceKey(input);

  if (walletProofNonceCache.has(nonceKey)) {
    return false;
  }

  walletProofNonceCache.set(nonceKey, input.now + WALLET_AUTH_MAX_AGE_MS);
  return true;
}

async function consumeWalletProofNonceDistributed(input: {
  walletAddress: string;
  method: string;
  path: string;
  purpose: string;
  nonce: string;
  now: number;
}): Promise<boolean> {
  const config = redisConfig();
  if (!config.url || !config.token) {
    return consumeWalletProofNonce(input);
  }

  const ttlSeconds = Math.max(1, Math.ceil(WALLET_AUTH_MAX_AGE_MS / 1000));
  const nonceKey = `onbt:wallet-proof:${walletProofNonceKey(input)}`;

  try {
    const response = await fetch(`${config.url}/set/${encodeURIComponent(nonceKey)}/1/EX/${ttlSeconds}/NX`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return consumeWalletProofNonce(input);
    }

    const payload = (await response.json().catch(() => null)) as
      | {
          result?: 'OK' | null;
        }
      | null;

    return payload?.result === 'OK';
  } catch {
    return consumeWalletProofNonce(input);
  }
}

export async function verifyPrivilegedWalletProof(
  request: Request,
  expectedPurpose?: string
): Promise<WalletProofVerificationResult> {
  const privilegedWallets = configuredPrivilegedWallets();
  if (privilegedWallets.length === 0) {
    return {
      ok: true,
      reason: 'No privileged wallet list configured. Proof checks are bypassed for local compatibility.',
    };
  }

  const headers = extractWalletProofHeaders(request);
  const walletAddress = normalizeAddress(headers.address);
  if (!walletAddress) {
    return { ok: false, reason: 'Missing or invalid x-ai-wallet-address header.' };
  }

  if (!privilegedWallets.includes(walletAddress)) {
    return { ok: false, reason: 'Wallet is not in privileged CDP/Deployer allowlist.' };
  }

  const signature = headers.signature?.trim();
  const timestamp = headers.timestamp?.trim();
  const nonce = headers.nonce?.trim();
  const headerPurpose = headers.purpose?.trim();
  if (expectedPurpose && headerPurpose && headerPurpose !== expectedPurpose) {
    return {
      ok: false,
      reason: `Invalid wallet proof purpose. Expected ${expectedPurpose}.`,
    };
  }

  const purpose = expectedPurpose || headerPurpose || 'agentkit-privileged-action';

  if (!signature || !timestamp || !nonce) {
    return {
      ok: false,
      reason: 'Missing privileged proof headers. Expected signature, timestamp, and nonce.',
    };
  }

  const timestampMs = Number(timestamp);
  if (!Number.isFinite(timestampMs)) {
    return { ok: false, reason: 'Invalid proof timestamp format.' };
  }

  const now = Date.now();
  if (Math.abs(now - timestampMs) > WALLET_AUTH_MAX_AGE_MS) {
    return { ok: false, reason: 'Wallet proof expired. Please sign a fresh authorization message.' };
  }

  const requestPath = parseRequestPath(request);

  const message = buildWalletProofMessage({
    walletAddress,
    method: request.method,
    path: requestPath,
    purpose,
    timestamp,
    nonce,
  });

  const valid = await verifyMessage({
    address: walletAddress as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  }).catch(() => false);

  if (!valid) {
    return { ok: false, reason: 'Invalid wallet signature for privileged request.' };
  }

  const nonceAccepted = await consumeWalletProofNonceDistributed({
    walletAddress,
    method: request.method,
    path: requestPath,
    purpose,
    nonce,
    now,
  });
  if (!nonceAccepted) {
    return {
      ok: false,
      reason: 'Wallet proof nonce was already used. Please sign a new authorization message.',
    };
  }

  return {
    ok: true,
    walletAddress,
    reason: 'Privileged wallet signature verified.',
  };
}

export function roleFromWallet(walletAddress?: string): AiWalletRole {
  const normalized = normalizeAddress(walletAddress);
  if (!normalized) return 'user';

  const configured = configuredWalletLists();
  if (configured.deployer.includes(normalized)) return 'deployer';
  if (configured.cdp.includes(normalized)) return 'cdp';
  return 'user';
}

export function capabilitiesForRole(role: AiWalletRole) {
  if (role === 'deployer' || role === 'cdp') {
    return {
      advisor: true,
      githubScout: true,
      takeover: true,
      adminTasks: true,
      preflight: true,
      envHealth: true,
      websiteEditor: true,
      abiConfigurator: true,
    };
  }

  return {
    advisor: true,
    githubScout: true,
    takeover: false,
    adminTasks: false,
    preflight: false,
    envHealth: false,
    websiteEditor: false,
    abiConfigurator: false,
  };
}

export function resolveEffectiveRole(selectedWalletMode: AiWalletMode, detectedRole: AiWalletRole) {
  if (selectedWalletMode === 'auto') {
    return {
      effectiveRole: detectedRole,
      reason: `Auto mode mapped connected wallet to ${detectedRole} role.`,
    };
  }

  if (selectedWalletMode === 'user') {
    return {
      effectiveRole: 'user' as const,
      reason: 'User mode selected. AI is limited to user-safe capabilities.',
    };
  }

  if (detectedRole === selectedWalletMode) {
    return {
      effectiveRole: detectedRole,
      reason: `${selectedWalletMode.toUpperCase()} mode verified against connected wallet identity.`,
    };
  }

  return {
    effectiveRole: 'user' as const,
    reason: `${selectedWalletMode.toUpperCase()} mode requested but connected wallet is not authorized for that role. Falling back to user-safe mode.`,
  };
}

export async function isPrivilegedWalletRequest(request: Request, expectedPurpose?: string): Promise<boolean> {
  const result = await verifyPrivilegedWalletProof(request, expectedPurpose);
  return result.ok;
}
