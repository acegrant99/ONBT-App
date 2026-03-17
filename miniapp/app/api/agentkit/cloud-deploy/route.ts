import { NextResponse } from 'next/server';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CloudDeployAction = 'deploy' | 'status' | 'list';
type Platform = 'vercel' | 'railway' | 'none';

type CloudDeployRequest = {
  action?: CloudDeployAction;
  deploymentId?: string;
  projectName?: string;
};

type VercelDeployment = {
  id: string;
  url: string;
  state: string;
  name: string;
  createdAt: number;
};

function configuredToken(): string | null {
  return process.env.AGENTKIT_ADMIN_TOKEN || process.env.QUANTUM_ADMIN_TOKEN || null;
}

function isAuthorized(request: Request): boolean {
  const expected = configuredToken();
  if (!expected) return false;
  const headerToken = request.headers.get('x-agentkit-admin-token')?.trim();
  const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return headerToken === expected || bearerToken === expected;
}

// ─── Credential detection ─────────────────────────────────────────────────────

function detectPlatform(): Platform {
  if (process.env.VERCEL_TOKEN?.trim()) return 'vercel';
  if (process.env.RAILWAY_TOKEN?.trim()) return 'railway';
  return 'none';
}

function vercelHeaders() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN!.trim()}`,
    'Content-Type': 'application/json',
  };
}

function railwayHeaders() {
  return {
    Authorization: `Bearer ${process.env.RAILWAY_TOKEN!.trim()}`,
    'Content-Type': 'application/json',
  };
}

// ─── Vercel helpers ───────────────────────────────────────────────────────────

async function vercelListDeployments(projectName: string) {
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const qs = new URLSearchParams({ limit: '10' });
  if (teamId) qs.set('teamId', teamId);
  if (projectName) qs.set('projectId', projectName);

  const res = await fetch(`https://api.vercel.com/v6/deployments?${qs}`, {
    headers: vercelHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Vercel list deployments failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const payload = (await res.json()) as { deployments: VercelDeployment[] };
  return payload.deployments ?? [];
}

async function vercelGetDeployment(deploymentId: string): Promise<VercelDeployment> {
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const qs = teamId ? `?teamId=${teamId}` : '';
  const res = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}${qs}`, {
    headers: vercelHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Vercel get deployment failed (${res.status}): ${body.slice(0, 200)}`);
  }

  return res.json() as Promise<VercelDeployment>;
}

async function vercelDeploy(projectName: string) {
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const qs = teamId ? `?teamId=${teamId}` : '';

  // Resolve GitHub repo from GITHUB_REPOSITORY env or known repo  
  const githubRepo =
    process.env.GITHUB_REPOSITORY?.trim() ||
    process.env.VERCEL_GIT_REPO_SLUG?.trim();

  const body: Record<string, unknown> = {
    name: projectName,
    framework: 'nextjs',
    ...(githubRepo
      ? {
          gitSource: {
            type: 'github',
            repo: githubRepo,
            ref: process.env.VERCEL_GIT_COMMIT_REF?.trim() || 'main',
          },
        }
      : {
          // Trigger a re-deployment of the latest production deployment
          deploymentId: 'latest',
        }),
  };

  const res = await fetch(`https://api.vercel.com/v13/deployments${qs}`, {
    method: 'POST',
    headers: vercelHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Vercel deployment trigger failed (${res.status}): ${errBody.slice(0, 300)}`);
  }

  return res.json() as Promise<VercelDeployment>;
}

// ─── Railway helpers ──────────────────────────────────────────────────────────

async function railwayListDeployments(serviceId: string) {
  const query = `
    query deployments($serviceId: String!) {
      deployments(input: { serviceId: $serviceId }, first: 10) {
        edges {
          node {
            id
            status
            staticUrl
            createdAt
            service { name }
          }
        }
      }
    }
  `;

  const res = await fetch('https://backboard.railway.app/graphql/v2', {
    method: 'POST',
    headers: railwayHeaders(),
    body: JSON.stringify({ query, variables: { serviceId } }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Railway list deployments failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const payload = (await res.json()) as {
    data?: {
      deployments?: { edges?: Array<{ node: { id: string; status: string; staticUrl?: string; createdAt: string; service: { name: string } } }> };
    };
  };
  return payload.data?.deployments?.edges?.map((e) => e.node) ?? [];
}

async function railwayDeploy(serviceId: string) {
  const query = `
    mutation serviceInstanceRedeploy($serviceId: String!) {
      serviceInstanceRedeploy(serviceId: $serviceId)
    }
  `;

  const res = await fetch('https://backboard.railway.app/graphql/v2', {
    method: 'POST',
    headers: railwayHeaders(),
    body: JSON.stringify({ query, variables: { serviceId } }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Railway deploy failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const payload = (await res.json()) as { data?: { serviceInstanceRedeploy?: boolean }; errors?: Array<{ message: string }> };
  if (payload.errors?.length) throw new Error(payload.errors[0].message);
  return Boolean(payload.data?.serviceInstanceRedeploy);
}

// ─── No-credentials advisory ──────────────────────────────────────────────────

function noCredentialsResponse() {
  return NextResponse.json({
    ok: false,
    mode: 'cloud-deploy',
    action: 'deploy' as const,
    platform: 'none' as const,
    status: 'no-credentials' as const,
    message: 'No cloud deployment credentials found. Add one of the supported tokens to .env.local.',
    guidance: [
      'Vercel (recommended for Next.js): Add VERCEL_TOKEN from vercel.com/account/tokens. Optionally add VERCEL_TEAM_ID and VERCEL_PROJECT_NAME.',
      'Railway: Add RAILWAY_TOKEN from railway.app and RAILWAY_SERVICE_ID for your service.',
      'After adding credentials, restart the dev server and click Deploy to Cloud again.',
      'Your Redis instance is already live — the deployed app will connect to it automatically via REDIS_URL.',
    ],
    triggeredAt: new Date().toISOString(),
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized cloud deploy request' }, { status: 401 });
  }

  // Require deployer wallet proof
  const proof = await verifyPrivilegedWalletProof(request, 'cloud-deploy');
  if (!proof.ok) {
    return NextResponse.json({ error: proof.reason }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as CloudDeployRequest;
  const action: CloudDeployAction = body.action ?? 'deploy';
  const platform = detectPlatform();

  if (platform === 'none') return noCredentialsResponse();

  try {
    // ── Vercel ────────────────────────────────────────────────────────────────
    if (platform === 'vercel') {
      const projectName = (
        body.projectName?.trim() ||
        process.env.VERCEL_PROJECT_NAME?.trim() ||
        'onbt-miniapp'
      );

      if (action === 'status' && body.deploymentId) {
        const deployment = await vercelGetDeployment(body.deploymentId);
        return NextResponse.json({
          ok: true,
          mode: 'cloud-deploy',
          action: 'status',
          platform: 'vercel',
          status: deployment.state === 'READY' ? 'ready' : deployment.state === 'ERROR' ? 'error' : 'building',
          deploymentId: deployment.id,
          deploymentUrl: `https://${deployment.url}`,
          projectName,
          message: `Deployment ${deployment.id} is ${deployment.state}.`,
          guidance: deployment.state === 'READY'
            ? ['Your ONBT Mini App is live! Share the URL with your team.']
            : ['Check the Vercel dashboard for build logs.'],
          triggeredAt: new Date().toISOString(),
        });
      }

      if (action === 'list') {
        const deployments = await vercelListDeployments(projectName);
        return NextResponse.json({
          ok: true,
          mode: 'cloud-deploy',
          action: 'list',
          platform: 'vercel',
          status: 'listed',
          projectName,
          deployments: deployments.map((d) => ({
            id: d.id,
            url: `https://${d.url}`,
            state: d.state,
            name: d.name,
            createdAt: new Date(d.createdAt).toISOString(),
          })),
          message: `Found ${deployments.length} recent deployment${deployments.length === 1 ? '' : 's'} for ${projectName}.`,
          guidance: [],
          triggeredAt: new Date().toISOString(),
        });
      }

      // action === 'deploy'
      const deployment = await vercelDeploy(projectName);
      return NextResponse.json({
        ok: true,
        mode: 'cloud-deploy',
        action: 'deploy',
        platform: 'vercel',
        status: 'triggered',
        deploymentId: deployment.id,
        deploymentUrl: `https://${deployment.url}`,
        buildLogsUrl: `https://vercel.com/deployments/${deployment.id}`,
        projectName,
        message: `Deployment triggered for ${projectName}. Build is in progress.`,
        guidance: [
          `Monitor build progress at https://vercel.com/deployments/${deployment.id}`,
          'Add REDIS_URL and all other .env.local variables to the Vercel project environment settings.',
          'After the first deploy, go to Vercel → Project → Settings → Domains to assign a custom domain.',
        ],
        triggeredAt: new Date().toISOString(),
      });
    }

    // ── Railway ───────────────────────────────────────────────────────────────
    if (platform === 'railway') {
      const serviceId = process.env.RAILWAY_SERVICE_ID?.trim();
      if (!serviceId) {
        return NextResponse.json({
          ok: false,
          mode: 'cloud-deploy',
          action,
          platform: 'railway',
          status: 'error',
          message: 'RAILWAY_SERVICE_ID is not configured.',
          guidance: ['Set RAILWAY_SERVICE_ID in .env.local to the service ID from your Railway project.'],
          triggeredAt: new Date().toISOString(),
        }, { status: 400 });
      }

      if (action === 'list') {
        const deployments = await railwayListDeployments(serviceId);
        return NextResponse.json({
          ok: true,
          mode: 'cloud-deploy',
          action: 'list',
          platform: 'railway',
          status: 'listed',
          deployments: deployments.map((d) => ({
            id: d.id,
            url: d.staticUrl || '',
            state: d.status,
            name: d.service?.name || 'onbt-miniapp',
            createdAt: d.createdAt,
          })),
          message: `Found ${deployments.length} Railway deployment${deployments.length === 1 ? '' : 's'}.`,
          guidance: [],
          triggeredAt: new Date().toISOString(),
        });
      }

      const redeployed = await railwayDeploy(serviceId);
      return NextResponse.json({
        ok: redeployed,
        mode: 'cloud-deploy',
        action: 'deploy',
        platform: 'railway',
        status: redeployed ? 'triggered' : 'error',
        message: redeployed
          ? 'Railway redeploy triggered. Your ONBT Mini App is building.'
          : 'Railway redeploy returned false — check Railway dashboard.',
        guidance: [
          'Monitor at https://railway.app — your service will rebuild from the latest commit.',
          'Ensure REDIS_URL and all required env vars are set in the Railway service variables.',
        ],
        triggeredAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cloud deploy failed';
    console.error('[cloud-deploy] error:', message);
    return NextResponse.json({
      ok: false,
      mode: 'cloud-deploy',
      action,
      platform,
      status: 'error',
      message,
      guidance: [
        'Check that your deployment token is valid and has not expired.',
        'Verify your VERCEL_TOKEN or RAILWAY_TOKEN in .env.local.',
      ],
      triggeredAt: new Date().toISOString(),
    }, { status: 502 });
  }

  return NextResponse.json({
    ok: false,
    mode: 'cloud-deploy',
    action: 'deploy',
    platform: 'none',
    status: 'error',
    message: 'Unhandled cloud-deploy action.',
    guidance: [],
    triggeredAt: new Date().toISOString(),
  }, { status: 400 });
}
