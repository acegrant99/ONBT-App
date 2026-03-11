import { NextResponse } from 'next/server';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type TabType = 'token' | 'bridge' | 'staking' | 'governance' | 'private-sale' | 'about';

type WebsiteEditRequest = {
  prompt?: string;
  activeTab?: TabType;
  targetSite?: string;
};

const DEFAULT_AGENTKIT_TOKEN = 'QuantumLayer';
const DEFAULT_TARGET_SITE = 'https://www.nabat.finance';

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

function normalizeSite(input?: string): string {
  const value = (input || DEFAULT_TARGET_SITE).trim();
  return value.replace(/\/+$/, '');
}

function tabObjectives(activeTab: TabType) {
  if (activeTab === 'bridge') {
    return [
      {
        area: 'Bridge hero and flow',
        objective: 'Increase bridge conversion with confidence and failure prevention.',
        changes: [
          'Add a bridge trust strip with live route status, estimated finality, and supported chain chips.',
          'Introduce step timeline states (approve, quote lock, submit, relay, finalize) with explicit recovery copy.',
          'Pin a drift-warning note when quote refresh exceeds TTL to reduce failed submissions.',
        ],
      },
    ];
  }

  if (activeTab === 'staking') {
    return [
      {
        area: 'Staking dashboard',
        objective: 'Improve staking clarity and retention through better projections.',
        changes: [
          'Add projected yield cards for base/optimistic/caution scenarios tied to quantum signal confidence.',
          'Visualize lock periods with timeline milestones and unlock reminders.',
          'Promote a leaderboard snapshot module to increase recurring engagement.',
        ],
      },
    ];
  }

  return [
    {
      area: 'Homepage conversion path',
      objective: 'Make ONBT product surfaces easier to discover and activate.',
      changes: [
        'Feature ONBT AI recommendations as a contextual panel in hero and tab headers.',
        'Highlight the three highest-value modules with one-click deep links and intent-driven CTA copy.',
        'Add trust and telemetry widgets for chain health and transaction success indicators.',
      ],
    },
  ];
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unauthorized website editor request',
      },
      { status: 401 }
    );
  }

  const proof = await verifyPrivilegedWalletProof(request, 'website-editor');
  if (!proof.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Website edit planning requires a verified privileged wallet signature. ${proof.reason}`,
      },
      { status: 403 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as WebsiteEditRequest;
  const activeTab = (body.activeTab || 'about') as TabType;
  const targetSite = normalizeSite(body.targetSite);

  if (targetSite !== DEFAULT_TARGET_SITE) {
    return NextResponse.json(
      {
        ok: false,
        error: `Website editor is restricted to ${DEFAULT_TARGET_SITE}`,
      },
      { status: 400 }
    );
  }

  const prompt = (body.prompt || '').trim();
  const edits = tabObjectives(activeTab);

  return NextResponse.json({
    ok: true,
    mode: 'website-editor',
    targetSite,
    activeTab,
    title: 'Nabat.finance Feature Uplift Draft',
    summary: prompt
      ? `ONBT AI generated a targeted edit plan for ${targetSite} using your prompt: ${prompt}`
      : `ONBT AI generated a targeted edit plan for ${targetSite}.`,
    edits,
    deploymentNotes: [
      'Apply these edits in this miniapp codebase, then deploy the updated build to nabat.finance hosting.',
      'Validate mobile and desktop interaction states before promotion.',
      'Run npm run verify before production deployment.',
    ],
    generatedAt: new Date().toISOString(),
  });
}
