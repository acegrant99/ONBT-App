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

type ConfidenceComponents = {
  modelMargin: number;
  featureConsensus: number;
  temporalStability: number;
  backendReliability: number;
  trendAlignment: number;
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

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function average(values: number[], fallback = 0.5): number {
  if (values.length === 0) return fallback;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdDev(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = average(values, 0);
  const variance = average(values.map((value) => (value - mean) ** 2), 0);
  return Math.sqrt(variance);
}

function mapOverviewToFeatures(payload: Awaited<ReturnType<typeof getOverviewPayload>>) {
  const healthyChains = toInt(payload.summary?.healthyChains, 0);
  const totalChains = Math.max(1, toInt(payload.summary?.totalChains, 2));
  const healthyRatio = clamp01(healthyChains / totalChains);

  const liquidityScores: number[] = [];
  const stakingScores: number[] = [];
  const saleExecutionScores: number[] = [];

  const baseBlock = toInt(payload.chains?.base?.blockNumber, 0);
  const arbitrumBlock = toInt(payload.chains?.arbitrum?.blockNumber, 0);
  const blockSkew = Math.abs(baseBlock - arbitrumBlock);
  const blockReference = Math.max(baseBlock, arbitrumBlock, 1);
  const chainSyncScore = clamp01(1 - blockSkew / Math.max(12, blockReference * 0.00002));

  for (const key of ['base', 'arbitrum'] as const) {
    const chain = payload.chains?.[key];
    if (!chain) continue;

    liquidityScores.push(
      toRatio(chain.privateSale?.remainingTokens, chain.privateSale?.saleAllocation, healthyRatio)
    );

    const saleFill = toRatio(chain.privateSale?.totalSold, chain.privateSale?.saleAllocation, 0.5);
    const salePausedPenalty = chain.privateSale?.paused === true ? 0.75 : 1;
    saleExecutionScores.push(clamp01((0.4 + 0.6 * saleFill) * salePausedPenalty));

    const staked = toInt(chain.staking?.globalTotalStaked, 0);
    const supply = toInt(chain.token?.totalSupply, 0);
    const stakeToSupply = supply > 0 ? staked / supply : 0;
    const compressed = 1 - Math.exp(-staked / 1_000_000_000_000_000_000_000);
    stakingScores.push(clamp01(0.65 * compressed + 0.35 * clamp01(stakeToSupply * 8)));
  }

  const liquidityHealth = average(liquidityScores, healthyRatio);
  const stakingAvg = average(stakingScores, healthyRatio);
  const saleExecution = average(saleExecutionScores, healthyRatio);
  const governanceParticipation = clamp01(0.55 * stakingAvg + 0.3 * healthyRatio + 0.15 * saleExecution);
  const bridgeReliability = clamp01(0.75 * healthyRatio + 0.25 * chainSyncScore);

  return {
    liquidity_health: Number(liquidityHealth.toFixed(6)),
    bridge_reliability: Number(bridgeReliability.toFixed(6)),
    governance_participation: Number(governanceParticipation.toFixed(6)),
  };
}

function classify(probabilityHealthy: number): SignalType {
  return probabilityHealthy >= 0.5 ? 'risk-on' : 'caution';
}

function confidence(probabilityHealthy: number): number {
  return Number((Math.abs(probabilityHealthy - 0.5) * 2).toFixed(4));
}

function computeConfidenceEngine(input: {
  probabilityHealthy: number;
  features: QuantumPayload['features'];
  recent: QuantumHistoryPoint[];
  backendReliability: number;
}): { confidence: number; components: ConfidenceComponents } {
  const modelMargin = clamp01(Math.abs(input.probabilityHealthy - 0.5) * 2);
  const featureValues = [
    input.features.liquidity_health,
    input.features.bridge_reliability,
    input.features.governance_participation,
  ].map((value) => clamp01(value));

  const featureSpread = stdDev(featureValues);
  const featureConsensus = clamp01(1 - featureSpread * 2.5);

  const recentValues = input.recent.map((point) => point.probabilityHealthy);
  const temporalVariance = stdDev(recentValues);
  const temporalStability = clamp01(1 - temporalVariance * 3.2);

  const trendSlope = recentValues.length >= 2 ? recentValues[recentValues.length - 1] - recentValues[0] : 0;
  const trendAlignment =
    (input.probabilityHealthy >= 0.5 && trendSlope >= 0) ||
    (input.probabilityHealthy < 0.5 && trendSlope <= 0)
      ? 1
      : clamp01(1 - Math.abs(trendSlope) * 6);

  const backendReliability = clamp01(input.backendReliability);
  const baseScore =
    modelMargin * 0.42 +
    featureConsensus * 0.2 +
    temporalStability * 0.18 +
    backendReliability * 0.14 +
    trendAlignment * 0.06;

  const highEvidenceBoost =
    modelMargin >= 0.9 && featureConsensus >= 0.88 && temporalStability >= 0.86 && backendReliability >= 0.95
      ? 0.045
      : 0;

  const confidence = clamp01(Math.min(0.995, baseScore + highEvidenceBoost));

  return {
    confidence: Number(confidence.toFixed(4)),
    components: {
      modelMargin: Number(modelMargin.toFixed(4)),
      featureConsensus: Number(featureConsensus.toFixed(4)),
      temporalStability: Number(temporalStability.toFixed(4)),
      backendReliability: Number(backendReliability.toFixed(4)),
      trendAlignment: Number(trendAlignment.toFixed(4)),
    },
  };
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
        const backendReliability = clamp01(overview.summary.healthyChains / Math.max(overview.summary.totalChains, 1));
        const nowIso = new Date().toISOString();

        quantumHistory.push({
          generatedAt: nowIso,
          probabilityHealthy: parsed.probability_healthy,
          signal,
        });
        if (quantumHistory.length > HISTORY_MAX) {
          quantumHistory.splice(0, quantumHistory.length - HISTORY_MAX);
        }

        const confidenceState = computeConfidenceEngine({
          probabilityHealthy: parsed.probability_healthy,
          features: parsed.features,
          recent: quantumHistory.slice(-8),
          backendReliability,
        });

        const modelConfidence = confidenceState.confidence;

        return {
          generatedAt: new Date().toISOString(),
          source: parsed.source,
          mode: parsed.mode,
          probabilityHealthy: parsed.probability_healthy,
          confidence: modelConfidence,
          confidenceEngine: {
            version: 'v2-fusion-calibrated',
            components: confidenceState.components,
            theoreticalMax: 0.995,
            note: 'Confidence approaches the ceiling only when model margin, feature consensus, trend stability, and backend reliability align.',
          },
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
