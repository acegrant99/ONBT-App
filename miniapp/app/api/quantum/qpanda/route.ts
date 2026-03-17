import { NextResponse } from 'next/server';
import { submitQpandaTask, queryQpandaTask } from '@/lib/quantum/qpandaClient';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QpandaRequest = {
  action?: 'submit' | 'query';
  shots?: number;
  chipId?: string;
  waitResult?: boolean;
  originIr?: string;
  describe?: string;
  taskId?: string;
};

function configuredToken(): string | null {
  return process.env.QUANTUM_ADMIN_TOKEN || process.env.AGENTKIT_ADMIN_TOKEN || null;
}

function isAuthorized(request: Request): boolean {
  const expected = configuredToken();
  if (!expected) return false;
  const headerToken = request.headers.get('x-quantum-admin-token')?.trim();
  const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return headerToken === expected || bearerToken === expected;
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: 'Unauthorized qpanda request',
        },
        { status: 401 }
      );
    }

    const proof = await verifyPrivilegedWalletProof(request, 'quantum-qpanda');
    if (!proof.ok) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: proof.reason,
        },
        { status: 403 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as QpandaRequest;
    const action = body.action || 'submit';

    if (action !== 'submit' && action !== 'query') {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: `Unsupported action: ${String(action)}. Use submit or query.`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.ORIGIN_PILOT_API?.trim();
    const qpandaPilotUrl = process.env.QPANDA_PILOT_URL?.trim();
    const originPilotUrl = process.env.ORIGIN_PILOT_URL?.trim();
    const pilotUrl = qpandaPilotUrl || originPilotUrl;
    const pilotUrlSource = qpandaPilotUrl ? 'QPANDA_PILOT_URL' : originPilotUrl ? 'ORIGIN_PILOT_URL' : 'none';

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: 'ORIGIN_PILOT_API is not configured.',
        },
        { status: 400 }
      );
    }

    if (!pilotUrl) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: 'No PilotOS endpoint is configured.',
          hint: 'Set QPANDA_PILOT_URL (preferred) or ORIGIN_PILOT_URL in miniapp/.env.local to your Origin Quantum PilotOS endpoint.',
        },
        { status: 400 }
      );
    }

    if (action === 'query') {
      const taskId = String(body.taskId || '').trim();
      if (!taskId) {
        return NextResponse.json(
          {
            ok: false,
            mode: 'qpanda',
            error: 'taskId is required for query action.',
          },
          { status: 400 }
        );
      }

      if (taskId.length > 256) {
        return NextResponse.json(
          {
            ok: false,
            mode: 'qpanda',
            error: 'taskId is too long.',
          },
          { status: 400 }
        );
      }

      const payload = await queryQpandaTask({
        pilotUrl,
        apiKey,
        taskId,
      });

      return NextResponse.json({
        ok: Boolean(payload.ok),
        mode: 'qpanda',
        action: 'query',
        pilotUrl,
        pilotUrlSource,
        ...payload,
        generatedAt: new Date().toISOString(),
      });
    }

    const requestedShots = Number.parseInt(String(body.shots ?? 1024), 10);
    const shots = Number.isFinite(requestedShots) ? Math.max(1, Math.min(20000, requestedShots)) : 1024;
    const originIr = body.originIr?.trim() || undefined;

    if (originIr && originIr.length > 20000) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'qpanda',
          error: 'originIr is too large. Keep it under 20,000 characters.',
        },
        { status: 400 }
      );
    }

    const payload = await submitQpandaTask({
      pilotUrl,
      apiKey,
      shots,
      chipId: body.chipId?.trim() || undefined,
      originIr,
      describe: body.describe?.trim() || undefined,
      waitResult: body.waitResult === true,
    });

    return NextResponse.json({
      ok: Boolean(payload.ok),
      mode: 'qpanda',
      action: 'submit',
      pilotUrl,
      pilotUrlSource,
      ...payload,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mode: 'qpanda',
        error: error instanceof Error ? error.message : 'QPanda task failed',
      },
      { status: 500 }
    );
  }
}
