import { NextResponse } from 'next/server';
import { spawn } from 'node:child_process';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type RetrainStatus = {
  inFlight: boolean;
  startedAt?: string;
  finishedAt?: string;
  exitCode?: number;
};

let retrainStatus: RetrainStatus = {
  inFlight: false,
};

function configuredToken(): string | null {
  return process.env.QUANTUM_ADMIN_TOKEN || process.env.AGENTKIT_ADMIN_TOKEN || null;
}

function isAuthorized(request: Request): boolean {
  const token = configuredToken();
  if (!token) return false;
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const headerToken = request.headers.get('x-quantum-admin-token')?.trim();

  return bearer === token || headerToken === token;
}

function npmCommand(): string {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: retrainStatus,
      authMode: 'QuantumLayer',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized retrain request' },
      { status: 401 }
    );
  }

  if (retrainStatus.inFlight) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Retrain already in progress',
        status: retrainStatus,
      },
      { status: 409 }
    );
  }

  const repoRoot = path.resolve(process.cwd(), '..');
  let child;
  try {
    child = process.platform === 'win32'
      ? spawn('cmd.exe', ['/d', '/s', '/c', 'npm run quantum:ai:retrain:live'], {
          cwd: repoRoot,
          windowsHide: true,
          stdio: 'ignore',
        })
      : spawn(npmCommand(), ['run', 'quantum:ai:retrain:live'], {
          cwd: repoRoot,
          windowsHide: true,
          stdio: 'ignore',
          shell: false,
        });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to spawn retrain process',
      },
      { status: 500 }
    );
  }

  retrainStatus = {
    inFlight: true,
    startedAt: new Date().toISOString(),
  };

  child.on('error', () => {
    retrainStatus = {
      inFlight: false,
      startedAt: retrainStatus.startedAt,
      finishedAt: new Date().toISOString(),
      exitCode: -1,
    };
  });

  child.on('exit', (code) => {
    retrainStatus = {
      inFlight: false,
      startedAt: retrainStatus.startedAt,
      finishedAt: new Date().toISOString(),
      exitCode: code ?? -1,
    };
  });

  child.unref();

  return NextResponse.json(
    {
      ok: true,
      message: 'Retrain job started',
      status: retrainStatus,
    },
    {
      status: 202,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
