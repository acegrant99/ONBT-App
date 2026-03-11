import { NextResponse } from 'next/server';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import os from 'node:os';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { cacheControlFor, withBackendCache } from '@/lib/backend/adapters/cache';
import { getOverviewPayload } from '@/lib/backend/overview';

const execFileAsync = promisify(execFile);

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 30;

type QuantumPayload = {
  source: string;
  mode: string;
  probability_healthy: number;
  label: number;
  features: {
    liquidity_health: number;
    bridge_reliability: number;
    governance_participation: number;
  };
};

type SignalType = 'risk-on' | 'caution';

type QuantumHistoryPoint = {
  generatedAt: string;
  probabilityHealthy: number;
  signal: SignalType;
};

const HISTORY_MAX = 24;
const quantumHistory: QuantumHistoryPoint[] = [];

function toInt(value: unknown, fallback = 0): number {
  const n = Number.parseInt(String(value ?? fallback), 10);
  return Number.isFinite(n) ? n : fallback;
}

function toRatio(num: unknown, den: unknown, fallback = 0.5): number {
  const n = toInt(num, -1);
  const d = toInt(den, 0);
  if (n < 0 || d <= 0) return fallback;
  return Math.max(0, Math.min(1, n / d));
}

function mapOverviewToFeatures(payload: Awaited<ReturnType<typeof getOverviewPayload>>) {
  const healthyChains = toInt(payload.summary?.healthyChains, 0);
  const totalChains = Math.max(1, toInt(payload.summary?.totalChains, 2));
  const healthyRatio = Math.max(0, Math.min(1, healthyChains / totalChains));

  const liquidityScores: number[] = [];
  const stakingScores: number[] = [];

  for (const key of ['base', 'arbitrum'] as const) {
    const chain = payload.chains?.[key];
    if (!chain) continue;

    liquidityScores.push(
      toRatio(chain.privateSale?.remainingTokens, chain.privateSale?.saleAllocation, healthyRatio)
    );

    const staked = toInt(chain.staking?.globalTotalStaked, 0);
    const compressed = 1 - Math.exp(-staked / 1_000_000_000_000_000_000_000);
    stakingScores.push(Math.max(0, Math.min(1, compressed)));
  }

  const liquidityHealth =
    liquidityScores.length > 0
      ? liquidityScores.reduce((a, b) => a + b, 0) / liquidityScores.length
      : healthyRatio;

  const stakingAvg =
    stakingScores.length > 0
      ? stakingScores.reduce((a, b) => a + b, 0) / stakingScores.length
      : healthyRatio;

  const governanceParticipation = Math.max(
    0,
    Math.min(1, 0.7 * stakingAvg + 0.3 * healthyRatio)
  );

  return {
    liquidity_health: Number(liquidityHealth.toFixed(6)),
    bridge_reliability: Number(healthyRatio.toFixed(6)),
    governance_participation: Number(governanceParticipation.toFixed(6)),
  };
}

function classify(probabilityHealthy: number): SignalType {
  return probabilityHealthy >= 0.5 ? 'risk-on' : 'caution';
}

function confidence(probabilityHealthy: number): number {
  return Number((Math.abs(probabilityHealthy - 0.5) * 2).toFixed(4));
}

function recommendation(signal: SignalType, modelConfidence: number): string {
  if (signal === 'risk-on' && modelConfidence >= 0.7) {
    return 'Favorable conditions. Consider standard bridge slippage and normal staking horizons.';
  }
  if (signal === 'risk-on') {
    return 'Positive but moderate confidence. Keep position sizing disciplined and monitor chain health.';
  }
  if (modelConfidence >= 0.7) {
    return 'Defensive posture suggested. Prefer lower slippage, smaller bridge batches, and shorter lockups.';
  }
  return 'Mixed caution signal. Wait for stronger confirmation before aggressive cross-chain moves.';
}

export async function GET() {
  try {
    const payload = await withBackendCache(
      {
        key: 'quantum-predict',
        revalidateSeconds: 30,
        tags: ['quantum-predict', 'chains-overview'],
      },
      async () => {
        const repoRoot = path.resolve(process.cwd(), '..');
        const pythonExe = path.join(repoRoot, '.venv312', 'Scripts', 'python.exe');
        const scriptPath = path.join(repoRoot, 'scripts', 'quantum-ai', 'nabat_quantum_ai.py');
        const modelPath = path.join(repoRoot, 'reports', 'quantum-ai', 'nabat_quantum_ai_model.npz');
        const reportPath = path.join(os.tmpdir(), `nabat_quantum_predict_${Date.now()}.json`);

        const overview = await getOverviewPayload();
        const features = mapOverviewToFeatures(overview);

        const args = [
          scriptPath,
          '--predict',
          '--from-features',
          '--feature-liquidity-health',
          String(features.liquidity_health),
          '--feature-bridge-reliability',
          String(features.bridge_reliability),
          '--feature-governance-participation',
          String(features.governance_participation),
          '--model',
          modelPath,
          '--prediction-report',
          reportPath,
        ];

        const { stdout, stderr } = await execFileAsync(pythonExe, args, {
          cwd: repoRoot,
          timeout: 25_000,
          windowsHide: true,
          maxBuffer: 2 * 1024 * 1024,
        });

        const raw = await readFile(reportPath, 'utf-8');
        const parsed = JSON.parse(raw) as QuantumPayload;

        const signal = classify(parsed.probability_healthy);
        const modelConfidence = confidence(parsed.probability_healthy);
        const nowIso = new Date().toISOString();

        quantumHistory.push({
          generatedAt: nowIso,
          probabilityHealthy: parsed.probability_healthy,
          signal,
        });
        if (quantumHistory.length > HISTORY_MAX) {
          quantumHistory.splice(0, quantumHistory.length - HISTORY_MAX);
        }

        return {
          generatedAt: new Date().toISOString(),
          source: parsed.source,
          mode: parsed.mode,
          probabilityHealthy: parsed.probability_healthy,
          confidence: modelConfidence,
          signal,
          recommendation: recommendation(signal, modelConfidence),
          label: parsed.label,
          features: parsed.features,
          recent: quantumHistory.slice(-8),
          backend: {
            healthyChains: overview.summary.healthyChains,
            totalChains: overview.summary.totalChains,
          },
          diagnostics: {
            stdout: stdout.trim(),
            stderr: stderr.trim(),
          },
        };
      }
    );

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': cacheControlFor(30),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Quantum prediction failed',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': cacheControlFor(5),
        },
      }
    );
  }
}
