import { NextResponse } from 'next/server';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

const execAsync = promisify(exec);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type TaskName = 'rate-app-quick' | 'advance-miniapp-quick';

type RequestBody = {
  task?: TaskName;
};

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const requestLog = new Map<string, number[]>();

const TASKS: Record<TaskName, string> = {
  'rate-app-quick': 'npm run rate:app:quick',
  'advance-miniapp-quick': 'npm run advance:miniapp:quick',
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

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp.trim();
  return 'local-client';
}

function consumeRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history = (requestLog.get(key) || []).filter((stamp) => stamp >= windowStart);

  if (history.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = history[0] || now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000));
    requestLog.set(key, history);
    return { allowed: false, retryAfterSeconds };
  }

  history.push(now);
  requestLog.set(key, history);
  return { allowed: true };
}

function summarizeOutput(output: string): string {
  const text = output.trim();
  if (!text) return 'Task completed with no output.';

  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const interesting = lines.filter((line) => /error|warn|pass|fail|score|success|critical|high/i.test(line));

  if (interesting.length > 0) {
    return interesting.slice(-4).join(' | ');
  }

  return lines.slice(-3).join(' | ');
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unauthorized integrity task request',
        },
        { status: 401 }
      );
    }

    const proof = await verifyPrivilegedWalletProof(request, 'integrity-task');
    if (!proof.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Integrity tasks require a verified privileged wallet signature. ${proof.reason}`,
        },
        { status: 403 }
      );
    }

    const limit = consumeRateLimit(clientKey(request));
    if (!limit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Rate limit exceeded for integrity tasks',
          retryAfterSeconds: limit.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as RequestBody;
    const task = body.task;

    if (!task || !TASKS[task]) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unsupported task',
        },
        { status: 400 }
      );
    }

    const command = TASKS[task];
    const wrapped = process.platform === 'win32' ? `cmd.exe /d /s /c "${command}"` : command;

    const { stdout, stderr } = await execAsync(wrapped, {
      cwd: process.cwd(),
      windowsHide: true,
      timeout: 120_000,
      maxBuffer: 2 * 1024 * 1024,
    });

    const output = `${stdout || ''}${stderr || ''}`;

    return NextResponse.json({
      ok: true,
      task,
      command,
      exitCode: 0,
      summary: summarizeOutput(output),
      output: output.trim().slice(-8000),
      ranAt: new Date().toISOString(),
    });
  } catch (error) {
    const err = error as Error & { code?: number; stdout?: string; stderr?: string };
    const output = `${err.stdout || ''}${err.stderr || ''}`;

    return NextResponse.json(
      {
        ok: false,
        task: 'rate-app-quick',
        command: 'n/a',
        exitCode: typeof err.code === 'number' ? err.code : -1,
        summary: err.message,
        output: output.trim().slice(-8000),
        ranAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
