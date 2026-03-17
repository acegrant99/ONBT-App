import { NextResponse } from 'next/server';
import type { TabType } from '@/types/app-shell';
import { isOriginPilotConfigured, callOriginPilotJSON } from '@/lib/ai/originPilot';
import type { ChatMessage } from '@/lib/ai/originPilot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SignalType = 'risk-on' | 'caution';

type StrategyLabRequest = {
  activeTab?: TabType;
  quantum?: {
    signal?: SignalType;
    confidence?: number;
    recommendation?: string;
    confidenceEngine?: {
      components?: {
        modelMargin?: number;
        featureConsensus?: number;
        temporalStability?: number;
        backendReliability?: number;
        trendAlignment?: number;
      };
    };
  };
};

type DependencyFeaturePack = {
  key: string;
  title: string;
  status: 'ready' | 'partial' | 'missing';
  coverage: number;
};

type DependencyUpdateStatus =
  | 'up-to-date'
  | 'patch-available'
  | 'minor-available'
  | 'major-available'
  | 'unknown';

type DependencyUpdate = {
  name: string;
  current: string;
  latest: string;
  status: DependencyUpdateStatus;
  critical: boolean;
};

type DependencyPriority = {
  key: string;
  label: string;
  status: 'keep' | 'review-update' | 'adopt';
  reason: string;
};

type DependencyHealthPayload = {
  featurePacks?: DependencyFeaturePack[];
  updates?: DependencyUpdate[];
};

type StrategyAction = {
  id:
    | 'dependency-health'
    | 'github-scout'
    | 'advisor-transfer-safety'
    | 'abi-sync'
    | 'preflight';
  label: string;
  reason: string;
};

function tabObjective(tab: TabType): string {
  if (tab === 'bridge') return 'Increase successful bridge execution with low retries.';
  if (tab === 'staking') return 'Increase staking conversion while preserving risk controls.';
  if (tab === 'governance') return 'Increase vote participation and proposal quality signals.';
  if (tab === 'private-sale') return 'Improve purchase conversion with clear guardrails.';
  if (tab === 'token') return 'Improve transfer success and reduce unsafe recipient errors.';
  return 'Improve cross-module confidence and execution quality.';
}

function buildQuickWins(input: {
  activeTab: TabType;
  confidence: number;
  signal: SignalType;
  weakComponents: string[];
}): string[] {
  const wins: string[] = [];

  wins.push(`Pin ${input.activeTab} as primary workflow and surface one-click safe presets.`);

  if (input.activeTab === 'token') {
    wins.push('Focus transfer safety cues, allowance visibility, and recipient validation in the primary transfer card.');
  }

  if (input.signal === 'risk-on') {
    wins.push('Keep normal UX friction while preserving high-risk confirmations for unfamiliar recipients and large transfers.');
  }

  if (input.confidence >= 0.7) {
    wins.push('Model confidence is strong enough to personalize UX defaults per active tab.');
  }

  if (input.confidence < 0.75) {
    wins.push('Enable stronger pre-submit checklists and add inline fallback routes for failed writes.');
  }

  if (input.weakComponents.includes('feature-consensus')) {
    wins.push('Add richer cross-module telemetry aggregation to align liquidity/bridge/governance signals.');
  }

  if (input.weakComponents.includes('temporal-stability')) {
    wins.push('Increase sample smoothing window and show confidence decay indicators before writes.');
  }

  if (input.signal === 'caution') {
    wins.push('Default to smaller staged transactions with explicit recovery instructions.');
  }

  return wins.slice(0, 4);
}

function buildGrowthBets(input: {
  featurePacks: DependencyFeaturePack[];
  confidence: number;
  weakComponents: string[];
}): string[] {
  const bets: string[] = [];
  const partialOrMissing = input.featurePacks.filter((pack) => pack.status !== 'ready');

  for (const pack of partialOrMissing.slice(0, 3)) {
    bets.push(`Complete ${pack.title} to unlock deeper ${pack.key.replace(/-/g, ' ')} capabilities.`);
  }

  if (input.confidence < 0.82) {
    bets.push('Introduce automatic confidence calibration jobs after retrain to tighten score reliability.');
  }

  if (input.weakComponents.includes('model-margin')) {
    bets.push('Add additional model features from chain-level event volatility to increase signal separation.');
  }

  return bets.slice(0, 5);
}

function buildRiskGuards(input: { signal: SignalType; confidence: number }): string[] {
  const guards: string[] = [
    'Keep rollback-safe transaction paths for all write actions.',
    'Log confidence deltas around each action to support postmortem tuning.',
  ];

  if (input.signal === 'caution' || input.confidence < 0.7) {
    guards.push('Require explicit user confirmation for medium/high value actions while confidence is soft.');
  }

  guards.push('Preserve strict rate-limit handling for integrity jobs and surface retry windows in UI.');
  guards.push('Run periodic dependency integrity checks and surface critical package updates in the advisor panel.');
  return guards;
}

function buildActionPlan(input: {
  activeTab: TabType;
  weakComponents: string[];
  confidence: number;
}): StrategyAction[] {
  const actions: StrategyAction[] = [];

  actions.push({
    id: 'dependency-health',
    label: 'Run Dependency Integrity',
    reason: 'Keeps periodic package risk visibility current and highlights critical updates.',
  });

  if (input.activeTab === 'token') {
    actions.push({
      id: 'advisor-transfer-safety',
      label: 'Apply Transfer Safety Focus',
      reason: 'Reinforce recipient validation, allowance visibility, and high-risk confirmations in token flows.',
    });
  }

  if (input.weakComponents.includes('feature-consensus')) {
    actions.push({
      id: 'abi-sync',
      label: 'Sync ABI Config',
      reason: 'Improves consistency between module contracts and runtime feature detection.',
    });
  }

  if (input.confidence < 0.75) {
    actions.push({
      id: 'github-scout',
      label: 'Run GitHub Usecase Scout',
      reason: 'Find implementation patterns that improve confidence-driving telemetry and UX safety.',
    });
  }

  actions.push({
    id: 'preflight',
    label: 'Run CDP Preflight',
    reason: 'Validates privileged execution readiness before running high-impact operations.',
  });

  return actions.slice(0, 5);
}

function buildDependencyPriorities(input: {
  updates: DependencyUpdate[];
  featurePacks: DependencyFeaturePack[];
}): DependencyPriority[] {
  const byName = new Map(input.updates.map((update) => [update.name, update]));
  const packsByKey = new Map(input.featurePacks.map((pack) => [pack.key, pack]));

  const nextUpdate = byName.get('next');
  const onchainkitUpdate = byName.get('@coinbase/onchainkit');
  const agentkitUpdate = byName.get('@coinbase/agentkit');
  const wagmiUpdate = byName.get('wagmi');
  const viemUpdate = byName.get('viem');

  const motionPack = packsByKey.get('motion-cinema');
  const vizPack = packsByKey.get('data-viz-pro');

  const priorities: DependencyPriority[] = [
    {
      key: 'next-app-router-core',
      label: 'Next App Router Core',
      status:
        nextUpdate && (nextUpdate.status === 'minor-available' || nextUpdate.status === 'major-available')
          ? 'review-update'
          : 'keep',
      reason: 'UI is delivered by a Next.js App Router miniapp. Keep Next current and use App Router conventions as the default integration layer.',
    },
    {
      key: 'coinbase-onchainkit',
      label: 'Coinbase OnchainKit First',
      status:
        onchainkitUpdate && (onchainkitUpdate.status === 'minor-available' || onchainkitUpdate.status === 'major-available')
          ? 'review-update'
          : 'keep',
      reason: 'Use OnchainKit components and MiniKit hooks as the primary UI/auth/miniapp bridge for Coinbase-native behavior.',
    },
    {
      key: 'coinbase-agentkit',
      label: 'Coinbase AgentKit Core',
      status:
        agentkitUpdate && (agentkitUpdate.status === 'minor-available' || agentkitUpdate.status === 'major-available')
          ? 'review-update'
          : 'keep',
      reason: 'Use AgentKit as the primary autonomous/assisted operations layer for advisor and privileged automation routes.',
    },
    {
      key: 'wagmi-viem-stack',
      label: 'Wagmi + Viem Chain Runtime',
      status:
        (wagmiUpdate && (wagmiUpdate.status === 'minor-available' || wagmiUpdate.status === 'major-available')) ||
        (viemUpdate && (viemUpdate.status === 'minor-available' || viemUpdate.status === 'major-available'))
          ? 'review-update'
          : 'keep',
      reason: 'Retain the typed transaction stack for reads/writes/simulation under OnchainKit provider boundaries.',
    },
    {
      key: 'motion-cinema-pack',
      label: 'Motion Cinema Pack',
      status: motionPack?.status === 'ready' ? 'keep' : 'adopt',
      reason: 'Use framer-motion + GSAP for premium motion scenes when UI surfaces need stronger visual hierarchy.',
    },
    {
      key: 'data-viz-pro-pack',
      label: 'Data Viz Pro Pack',
      status: vizPack?.status === 'ready' ? 'keep' : 'adopt',
      reason: 'Use Recharts/d3/lightweight-charts for clearer trend and confidence visualization in strategy surfaces.',
    },
  ];

  return priorities;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as StrategyLabRequest;
    const activeTab = body.activeTab || 'token';

    const origin = new URL(request.url).origin;

    const quantumPayload = body.quantum?.signal
      ? body.quantum
      : await fetch(`${origin}/api/quantum/predict`, { cache: 'no-store' })
          .then((res) => (res.ok ? res.json() : null))
          .then((payload) => payload as StrategyLabRequest['quantum'] | null)
          .catch(() => null);

    const dependencyPayload = await fetch(`${origin}/api/agentkit/dependency-health`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null) as DependencyHealthPayload | null;

    const signal: SignalType = quantumPayload?.signal || 'caution';
    const confidence = Number(quantumPayload?.confidence ?? 0);

    const components = quantumPayload?.confidenceEngine?.components;
    const weakComponents: string[] = [];
    if ((components?.modelMargin ?? 1) < 0.7) weakComponents.push('model-margin');
    if ((components?.featureConsensus ?? 1) < 0.72) weakComponents.push('feature-consensus');
    if ((components?.temporalStability ?? 1) < 0.74) weakComponents.push('temporal-stability');
    if ((components?.backendReliability ?? 1) < 0.95) weakComponents.push('backend-reliability');

    const featurePacks = dependencyPayload?.featurePacks || [];
    const dependencyUpdates = dependencyPayload?.updates || [];
    const readyCount = featurePacks.filter((pack) => pack.status === 'ready').length;
    const dependencyPriorities = buildDependencyPriorities({
      updates: dependencyUpdates,
      featurePacks,
    });

    let quickWins = buildQuickWins({ activeTab, confidence, signal, weakComponents });
    let growthBets = buildGrowthBets({ featurePacks, confidence, weakComponents });
    let riskGuards = buildRiskGuards({ signal, confidence });
    let originPilotActive = false;

    if (isOriginPilotConfigured()) {
      try {
        const packSummary = featurePacks.length > 0
          ? featurePacks
              .map((p) => `${p.title}: ${p.status} (coverage ${(p.coverage * 100).toFixed(0)}%)`)
              .join('; ')
          : 'No feature pack data available.';

        const systemPrompt = [
          'You are the Quantum Strategy Lab for the ONBT Mini App — an onchain DeFi + governance mini-app on Base.',
          `Active tab: ${activeTab}.`,
          `Quantum signal: ${signal}.`,
          `Confidence: ${(confidence * 100).toFixed(1)}%.`,
          weakComponents.length > 0
            ? `Weak confidence components: ${weakComponents.join(', ')}.`
            : 'All confidence components are healthy.',
          `Feature packs: ${packSummary}`,
          '',
          'Return ONLY valid JSON with this exact shape (no markdown fences):',
          '{',
          '  "quickWins": ["string (≤ 4 items)"],',
          '  "growthBets": ["string (≤ 5 items)"],',
          '  "riskGuards": ["string (≤ 5 items)"]',
          '}',
        ].join('\n');

        const userContent = `Generate actionable quick-wins, growth bets, and risk guards for the ${activeTab} tab given the current quantum context and feature readiness.`;

        const chatMessages: ChatMessage[] = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ];

        interface StrategyAIResponse {
          quickWins?: string[];
          growthBets?: string[];
          riskGuards?: string[];
        }

        const aiResp = await callOriginPilotJSON<StrategyAIResponse>(chatMessages, {
          maxTokens: 600,
          temperature: 0.7,
        });

        if (Array.isArray(aiResp.quickWins) && aiResp.quickWins.length > 0) quickWins = aiResp.quickWins;
        if (Array.isArray(aiResp.growthBets) && aiResp.growthBets.length > 0) growthBets = aiResp.growthBets;
        if (Array.isArray(aiResp.riskGuards) && aiResp.riskGuards.length > 0) riskGuards = aiResp.riskGuards;
        originPilotActive = true;
      } catch {
        // fall back to deterministic templates
      }
    }

    const response = {
      ok: true,
      mode: 'strategy-lab' as const,
      activeTab,
      objective: tabObjective(activeTab),
      confidence,
      signal,
      recommendation: quantumPayload?.recommendation || 'No recommendation available yet.',
      quickWins,
      growthBets,
      riskGuards,
      actionPlan: buildActionPlan({
        activeTab,
        weakComponents,
        confidence,
      }),
      framework: {
        appType: 'next-app-router-miniapp',
        importPolicy: 'coinbase-first-next-native-aliases',
      },
      preferredImports: [
        '@coinbase/onchainkit',
        '@coinbase/onchainkit/minikit',
        '@coinbase/agentkit',
        'wagmi',
        'viem',
        '@tanstack/react-query',
      ],
      dependencyPriorities,
      diagnostics: {
        weakComponents,
        readyFeaturePacks: readyCount,
        totalFeaturePacks: featurePacks.length,
      },
      originPilot: originPilotActive,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mode: 'strategy-lab',
        error: error instanceof Error ? error.message : 'Strategy lab failed',
      },
      { status: 500 }
    );
  }
}
