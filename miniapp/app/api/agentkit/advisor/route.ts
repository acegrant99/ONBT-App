import { NextResponse } from 'next/server';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { createPrivateKey } from 'node:crypto';
import { isOriginPilotConfigured, callOriginPilotJSON } from '@/lib/ai/originPilot';
import type { ChatMessage } from '@/lib/ai/originPilot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Signal = 'risk-on' | 'caution';
type ActiveTab = 'token' | 'bridge' | 'staking' | 'governance' | 'private-sale' | 'about' | 'quantum-ai' | 'wallet';

type RequestBody = {
  prompt: string;
  activeTab: ActiveTab;
  quantum?: {
    signal?: Signal;
    confidence?: number;
    recommendation?: string;
  };
  history?: Array<{
    role: 'user' | 'assistant';
    text: string;
    at: string;
  }>;
};

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type AgentKitCapabilities = {
  packageInstalled: boolean;
  credentialsConfigured: boolean;
  walletSecretConfigured?: boolean;
  mnemonicConfigured?: boolean;
  networkId?: string;
  cdpConfig?: {
    baseAppOwner?: string;
    projectId?: string;
    apiKeyIdKind: 'resource-name' | 'uuid' | 'other' | 'missing';
    apiKeyIdPreview?: string;
    orgIdFromApiKeyId?: string;
    apiKeyIdFromResourceName?: string;
    apiKeyIdSource?: 'CDP_API_KEY_ID' | 'CDP_API_KEY_NAME' | 'CDP_CLIENT_API_KEY' | 'none';
    rawSourcePreview?: {
      CDP_API_KEY_ID?: string;
      CDP_API_KEY_NAME?: string;
      CDP_CLIENT_API_KEY?: string;
    };
    secretSource?: 'CDP_API_KEY_SECRET' | 'CDP_SECRET_KEY' | 'PEM_ECDSA_PRIVATE_KEY' | 'none';
    rawSecretSourcePreview?: {
      CDP_API_KEY_SECRET?: string;
      CDP_SECRET_KEY?: string;
      PEM_ECDSA_PRIVATE_KEY?: string;
    };
    secretFingerprint?: string;
    secretFormat: 'ec-pem' | 'pkcs8-pem' | 'base64-ed25519-like' | 'unknown' | 'missing';
    usesServerEnvOnly: boolean;
  };
  actionCount?: number;
  actionNames?: string[];
  initError?: string;
  initErrorDetails?: {
    name?: string;
    message?: string;
    code?: string | number;
    status?: number;
    type?: string;
  };
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

type EnvFallback = Record<string, string>;

function parseEnvText(raw: string): EnvFallback {
  const out: EnvFallback = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!key) continue;
    out[key] = value;
  }
  return out;
}

async function loadServerEnvFallback(miniappRoot: string): Promise<EnvFallback> {
  const candidatePaths = [
    path.join(miniappRoot, '.env.local'),
    path.join(miniappRoot, 'miniapp', '.env.local'),
  ];

  for (const candidatePath of candidatePaths) {
    try {
      const raw = await readFile(candidatePath, 'utf-8');
      return parseEnvText(raw);
    } catch {
      // Continue to next candidate path.
    }
  }

  return {};
}

function readEnvValue(key: string, fallback: EnvFallback): string | undefined {
  return normalizeEnvValue(process.env[key] || fallback[key]);
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

function selectApiKeyId(envFallback: EnvFallback): {
  selected?: string;
  selectedSource: 'CDP_API_KEY_ID' | 'CDP_API_KEY_NAME' | 'CDP_CLIENT_API_KEY' | 'none';
  fromApiKeyId?: string;
  fromApiKeyName?: string;
  fromClientApiKey?: string;
} {
  const fromApiKeyId = readEnvValue('CDP_API_KEY_ID', envFallback);
  const fromApiKeyName = readEnvValue('CDP_API_KEY_NAME', envFallback);
  const fromClientApiKey = readEnvValue('CDP_CLIENT_API_KEY', envFallback);

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

function selectApiKeySecret(envFallback: EnvFallback): {
  selected?: string;
  selectedSource: 'CDP_API_KEY_SECRET' | 'CDP_SECRET_KEY' | 'PEM_ECDSA_PRIVATE_KEY' | 'none';
  fromApiKeySecret?: string;
  fromSecretKey?: string;
  fromPemEcdsaPrivateKey?: string;
} {
  const fromApiKeySecret = normalizeApiKeySecret(readEnvValue('CDP_API_KEY_SECRET', envFallback));
  const fromSecretKey = normalizeApiKeySecret(readEnvValue('CDP_SECRET_KEY', envFallback));
  const fromPemEcdsaPrivateKey = normalizeApiKeySecret(readEnvValue('PEM_ECDSA_PRIVATE_KEY', envFallback));

  const candidateList: Array<{ source: 'CDP_API_KEY_SECRET' | 'CDP_SECRET_KEY' | 'PEM_ECDSA_PRIVATE_KEY'; value?: string }> = [
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

function classifyApiKeyId(value?: string): {
  kind: 'resource-name' | 'uuid' | 'other' | 'missing';
  preview?: string;
  orgIdFromResourceName?: string;
  apiKeyIdFromResourceName?: string;
} {
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

function sanitizeAgentError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return {
      message: String(error || 'Unknown AgentKit error'),
    };
  }

  const err = error as {
    name?: string;
    message?: string;
    code?: string | number;
    status?: number;
    type?: string;
    cause?: { message?: string };
  };

  const rawMessage = err.message || err.cause?.message || 'AgentKit initialization failed';
  const message = rawMessage.includes('Invalid key format - must be either PEM EC key or base64 Ed25519 key')
    ? 'CDP rejected API key material. If your secret is valid ECDSA PEM, this usually means the API key ID and secret do not belong to the same CDP key pair/project.'
    : rawMessage;
  return {
    name: err.name,
    message,
    code: err.code,
    status: err.status,
    type: err.type,
  };
}

function hasModule(pkg: PackageJson, name: string): boolean {
  return Boolean(pkg.dependencies?.[name] || pkg.devDependencies?.[name]);
}

function normalizeAgentkitNetworkId(networkId?: string): string {
  const value = (networkId || '').trim().toLowerCase();
  if (!value) return 'base-mainnet';

  const aliases: Record<string, string> = {
    base: 'base-mainnet',
    'base-mainnet': 'base-mainnet',
    'base-sepolia': 'base-sepolia',
    ethereum: 'ethereum-mainnet',
    'ethereum-mainnet': 'ethereum-mainnet',
    'ethereum-sepolia': 'ethereum-sepolia',
    polygon: 'polygon-mainnet',
    'polygon-mainnet': 'polygon-mainnet',
    'polygon-mumbai': 'polygon-mumbai',
    arbitrum: 'arbitrum-mainnet',
    'arbitrum-mainnet': 'arbitrum-mainnet',
    'arbitrum-sepolia': 'arbitrum-sepolia',
    optimism: 'optimism-mainnet',
    'optimism-mainnet': 'optimism-mainnet',
    'optimism-sepolia': 'optimism-sepolia',
  };

  return aliases[value] || value;
}

function tabSpecificHint(tab: ActiveTab): string {
  if (tab === 'bridge') return 'Prioritize cross-chain reliability and fee quote transparency in the bridge flow.';
  if (tab === 'staking') return 'Focus on stake lifecycle clarity, pending rewards readability, and lockup risk hints.';
  if (tab === 'private-sale') return 'Emphasize payment token approval checks and purchase guardrails.';
  if (tab === 'governance') return 'Highlight proposal states, voting windows, and delegated voting health.';
  if (tab === 'token') return 'Focus on transfer safety cues, allowance visibility, and recipient validation.';
  return 'Provide high-level operational integrity and navigation clarity suggestions.';
}

function buildUxEnhancements(modules: string[], tab: ActiveTab, signal: Signal | undefined): string[] {
  const output: string[] = [];

  if (modules.includes('wagmi') && modules.includes('viem')) {
    output.push('Add preflight simulation before each write and display decoded revert reasons in-panel.');
  }
  if (modules.includes('@tanstack/react-query')) {
    output.push('Use stale-while-revalidate for chain data with per-tab freshness badges and optimistic refetch hints.');
  }
  if (modules.includes('@coinbase/onchainkit')) {
    output.push('Embed wallet identity confidence badges beside high-risk actions to reduce signing mistakes.');
  }

  if (tab === 'bridge') {
    output.push('Show bridge ETA, route confidence, and fee drift warnings before signature.');
  }
  if (tab === 'staking') {
    output.push('Add projected APY confidence bands using quantum signal and recent reward variance.');
  }
  if (tab === 'token') {
    output.push('Add recipient validation states (invalid, self-transfer, and verified-format) directly under the address field.');
    output.push('Expose spender allowance snapshots near transfer actions so users can detect stale high approvals.');
    output.push('Split transfer flow into review then confirm steps with a suggested test amount for new recipients.');
  }

  if (signal === 'caution') {
    output.push('Enable caution mode defaults: smaller suggested amounts, tighter slippage, and explicit confirmation copy.');
    output.push('Increase warning density around irreversible actions and require a clear review checkpoint before submit.');
  }

  return output;
}

function buildSuggestions(tab: ActiveTab, signal: Signal | undefined, confidence: number | undefined): string[] {
  const suggestions: string[] = [
    tabSpecificHint(tab),
    signal === 'risk-on'
      ? 'Current quantum posture is risk-on. Keep normal UX friction but preserve high-risk confirmations.'
      : 'Current quantum posture is caution. Increase contextual warnings and stage actions into smaller steps.',
  ];

  if (typeof confidence === 'number') {
    if (confidence < 0.55) {
      suggestions.push('Model confidence is moderate. Encourage users to re-check metrics before major writes.');
    } else {
      suggestions.push('Model confidence is strong enough to personalize UX defaults per active tab.');
    }
  }

  suggestions.push('Run a periodic dependency integrity check and surface critical package updates in the advisor panel.');
  return suggestions;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const prompt = String(body.prompt || '').trim();
    const activeTab = body.activeTab || 'about';

    const miniappRoot = process.cwd();
    const envFallback = await loadServerEnvFallback(miniappRoot);
    const packagePath = path.join(miniappRoot, 'package.json');
    const rawPackage = await readFile(packagePath, 'utf-8');
    const pkg = JSON.parse(rawPackage) as PackageJson;

    const allModules = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ];

    const criticalModules = [
      '@coinbase/onchainkit',
      'wagmi',
      'viem',
      '@tanstack/react-query',
      'next',
      'react',
    ];

    const missingCritical = criticalModules.filter((moduleName) => !hasModule(pkg, moduleName));

    const agentkitConfiguredInWorkspace = hasModule(pkg, '@coinbase/agentkit');
    const apiKeySelection = selectApiKeyId(envFallback);
    const cdpApiKeyId = apiKeySelection.selected;
    const secretSelection = selectApiKeySecret(envFallback);
    const cdpApiKeySecret = secretSelection.selected;
    const networkId = readEnvValue('AGENTKIT_NETWORK_ID', envFallback) || 'base';
    const providerNetworkId = normalizeAgentkitNetworkId(networkId);
    const walletSecretConfigured = Boolean(readEnvValue('CDP_WALLET_SECRET', envFallback));
    const mnemonicConfigured = Boolean(readEnvValue('MNEMONIC_PHRASE', envFallback));
    const baseAppOwner = readEnvValue('NEXT_PUBLIC_BASE_APP_OWNER', envFallback);
    const projectId = readEnvValue('CDP_PROJECT_ID', envFallback);
    const apiKeyIdDiagnostics = classifyApiKeyId(cdpApiKeyId);
    const secretFormat = detectSecretFormat(cdpApiKeySecret);

    const credentialsConfigured = Boolean(cdpApiKeyId && cdpApiKeySecret && isLikelyCdpSecretFormat(cdpApiKeySecret));

    const capabilities: AgentKitCapabilities = {
      packageInstalled: agentkitConfiguredInWorkspace,
      credentialsConfigured,
      walletSecretConfigured,
      mnemonicConfigured,
      networkId,
      cdpConfig: {
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
      },
    };

    let agentkitLive = false;
    if (agentkitConfiguredInWorkspace && credentialsConfigured) {
      try {
        const { AgentKit, CdpEvmWalletProvider } = await import('@coinbase/agentkit');
        const apiKeyIdCandidates = expandApiKeyIdCandidates(cdpApiKeyId);

        let walletProvider: Awaited<ReturnType<typeof CdpEvmWalletProvider.configureWithWallet>> | null = null;
        let lastError: unknown = null;

        for (const apiKeyIdCandidate of apiKeyIdCandidates) {
          if (!apiKeyIdCandidate || !cdpApiKeySecret) continue;
          try {
            walletProvider = await CdpEvmWalletProvider.configureWithWallet({
              apiKeyId: apiKeyIdCandidate,
              apiKeySecret: cdpApiKeySecret,
              networkId: providerNetworkId,
            });
            break;
          } catch (candidateError) {
            lastError = candidateError;
          }
        }

        if (!walletProvider) {
          throw lastError instanceof Error ? lastError : new Error('Unable to initialize AgentKit wallet provider');
        }

        const agentkit = await AgentKit.from({ walletProvider });
        const actions = agentkit.getActions();
        const uniqueNames = Array.from(new Set(actions.map((action) => action.name))).sort();
        capabilities.actionCount = uniqueNames.length;
        capabilities.actionNames = uniqueNames.slice(0, 24);
        agentkitLive = true;
      } catch (error) {
        const details = sanitizeAgentError(error);
        capabilities.initError = details.message || 'AgentKit initialization failed';
        capabilities.initErrorDetails = details;

        if (mnemonicConfigured) {
        try {
          const { AgentKit, LegacyCdpWalletProvider } = await import('@coinbase/agentkit');
          const apiKeyIdCandidates = expandApiKeyIdCandidates(cdpApiKeyId);

          let walletProvider: Awaited<ReturnType<typeof LegacyCdpWalletProvider.configureWithWallet>> | null = null;
          let lastError: unknown = null;

          for (const apiKeyIdCandidate of apiKeyIdCandidates) {
            if (!apiKeyIdCandidate || !cdpApiKeySecret) continue;
            try {
              walletProvider = await LegacyCdpWalletProvider.configureWithWallet({
                apiKeyId: apiKeyIdCandidate,
                apiKeySecret: cdpApiKeySecret,
                networkId: providerNetworkId,
              });
              break;
            } catch (candidateError) {
              lastError = candidateError;
            }
          }

          if (!walletProvider) {
            throw lastError instanceof Error ? lastError : new Error('Unable to initialize legacy AgentKit wallet provider');
          }

          const agentkit = await AgentKit.from({ walletProvider });
          const actions = agentkit.getActions();
          const uniqueNames = Array.from(new Set(actions.map((action) => action.name))).sort();
          capabilities.actionCount = uniqueNames.length;
          capabilities.actionNames = uniqueNames.slice(0, 24);
          agentkitLive = true;
        } catch (error) {
          const details = sanitizeAgentError(error);
          capabilities.initError = details.message || 'Legacy AgentKit initialization failed';
          capabilities.initErrorDetails = details;
        }
        }
      }
    }

    // Backfill quantum context if the client request did not include one.
    let quantum = body.quantum;
    if (!quantum?.signal) {
      try {
        const baseOrigin = request.headers.get('origin') || new URL(request.url).origin;
        const quantumResponse = await fetch(`${baseOrigin}/api/quantum/prediction`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (quantumResponse.ok) {
          const q = await quantumResponse.json() as {
            prediction?: {
              signal?: Signal;
              confidence?: number;
              recommendation?: string;
            };
          };
          if (q?.prediction?.signal) {
            quantum = {
              signal: q.prediction.signal,
              confidence: q.prediction.confidence,
              recommendation: q.prediction.recommendation,
            };
          }
        }
      } catch {
        // Leave quantum undefined; integrity check will report missing signal.
      }
    }

    const signal = quantum?.signal;
    const confidence = quantum?.confidence;
    const uxEnhancements = buildUxEnhancements(allModules, activeTab, signal);
    const suggestions = buildSuggestions(activeTab, signal, confidence);

    const integrityChecks = [
      {
        label: 'Core Web3 Stack',
        status: missingCritical.length === 0 ? ('pass' as const) : ('warn' as const),
        detail:
          missingCritical.length === 0
            ? 'Required wallet and RPC libraries detected.'
            : `Missing: ${missingCritical.join(', ')}`,
      },
      {
        label: 'AgentKit Runtime',
        status: agentkitLive ? ('pass' as const) : ('warn' as const),
        detail: agentkitLive
          ? `AgentKit live mode is active on ${networkId}. ${capabilities.actionCount || 0} actions available.`
          : Boolean(cdpApiKeyId && cdpApiKeySecret) && !isLikelyCdpSecretFormat(cdpApiKeySecret)
            ? 'CDP credentials found but secret format is invalid (must be PEM EC or base64 Ed25519).'
            : !mnemonicConfigured && !walletSecretConfigured
            ? 'CDP wallet seed secrets are not configured. Advisor attempted API-key live mode; add MNEMONIC_PHRASE only if legacy fallback is required.'
            : capabilities.initError
            ? `AgentKit detected but failed to initialize: ${capabilities.initError}`
            : 'AgentKit package or CDP credentials not configured in miniapp runtime; using advisory mode.',
      },
      {
        label: 'Quantum Context Feed',
        status: signal ? ('pass' as const) : ('warn' as const),
        detail: signal
          ? `Quantum signal available (${signal}${typeof confidence === 'number' ? `, confidence ${(confidence * 100).toFixed(1)}%` : ''}).`
          : 'Quantum signal missing in request payload.',
      },
    ];

    const summary = agentkitLive
      ? 'AgentKit is available. Advisor can orchestrate live onchain agent workflows with quantum context.'
      : 'Advisor running in compatibility mode. It still provides integrity and UX guidance from installed modules and quantum signals.';

    // ── Origin Pilot: replace template text with real LLM responses ──────────
    let assistantText = [
      summary,
      prompt ? `You asked: ${prompt}` : 'No explicit prompt provided. Generated proactive recommendations.',
      ...suggestions,
    ].join(' ');

    let aiSuggestions = suggestions;
    let aiUxEnhancements = uxEnhancements;
    let aiSummary = summary;
    let originPilotActive = false;

    if (isOriginPilotConfigured()) {
      try {
        const systemPrompt = [
          'You are the Quantum AI Advisor for the ONBT Mini App — an onchain DeFi and governance mini-application on Base.',
          `Current active tab: ${activeTab}.`,
          `Quantum signal: ${signal ?? 'unknown'}.`,
          typeof confidence === 'number'
            ? `Model confidence: ${(confidence * 100).toFixed(1)}%.`
            : 'Model confidence: unavailable.',
          agentkitLive
            ? `AgentKit is LIVE on ${networkId}. ${capabilities.actionCount || 0} actions loaded.`
            : 'AgentKit is in advisory/compatibility mode.',
          `Installed modules (count): ${allModules.length}.`,
          missingCritical.length > 0
            ? `Missing critical packages: ${missingCritical.join(', ')}.`
            : 'All critical Web3 packages are present.',
          '',
          'Return ONLY valid JSON with this exact shape (no markdown fences):',
          '{',
          '  "summary": "2–3 sentence advisor summary for the current state",',
          '  "assistantText": "2–4 sentence conversational reply to the user prompt",',
          '  "suggestions": ["string", "string", "string", "string"],',
          '  "uxEnhancements": ["string", "string", "string"]',
          '}',
        ].join('\n');

        const userContent = prompt
          ? `User prompt: ${prompt}`
          : `No explicit prompt. Generate proactive integrity and UX recommendations for the ${activeTab} tab.`;

        const chatMessages: ChatMessage[] = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ];

        interface AdvisorAIResponse {
          summary?: string;
          assistantText?: string;
          suggestions?: string[];
          uxEnhancements?: string[];
        }

        const aiResp = await callOriginPilotJSON<AdvisorAIResponse>(chatMessages, {
          maxTokens: 600,
          temperature: 0.7,
        });

        if (aiResp.summary) aiSummary = aiResp.summary;
        if (aiResp.assistantText) assistantText = aiResp.assistantText;
        if (Array.isArray(aiResp.suggestions) && aiResp.suggestions.length > 0) {
          aiSuggestions = aiResp.suggestions;
        }
        if (Array.isArray(aiResp.uxEnhancements) && aiResp.uxEnhancements.length > 0) {
          aiUxEnhancements = aiResp.uxEnhancements;
        }
        originPilotActive = true;
      } catch {
        // silently fall back to deterministic templates
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    const history = body.history || [];
    const messages = [
      ...history.slice(-6),
      {
        role: 'user' as const,
        text: prompt || 'Assess integrity and optimize UX for current tab.',
        at: new Date().toISOString(),
      },
      {
        role: 'assistant' as const,
        text: assistantText,
        at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      ok: true,
      mode: agentkitLive ? 'agentkit-live' : originPilotActive ? 'origin-pilot' : 'agentkit-unavailable',
      summary: aiSummary,
      integrityChecks,
      uxEnhancements: aiUxEnhancements,
      availableModules: allModules,
      suggestions: aiSuggestions,
      messages,
      agentkit: capabilities,
      originPilot: originPilotActive,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to run AgentKit advisor',
      },
      { status: 500 }
    );
  }
}
