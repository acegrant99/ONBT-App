'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { QuantumPrediction, TabType } from '@/types/app-shell';

type QuantumSignalPanelProps = {
  activeTab: TabType;
  prediction: QuantumPrediction | undefined;
  refreshing: boolean;
  retraining?: boolean;
  hasError: boolean;
  errorText?: string;
  onRetry: () => void;
  onRetrain?: () => void;
};

export function QuantumSignalPanel({
  activeTab,
  prediction,
  refreshing,
  retraining = false,
  hasError,
  errorText,
  onRetry,
  onRetrain,
}: QuantumSignalPanelProps) {
  const progressWidthClass = (probability: number) => {
    if (probability >= 0.95) return 'w-full';
    if (probability >= 0.85) return 'w-5/6';
    if (probability >= 0.7) return 'w-4/5';
    if (probability >= 0.55) return 'w-3/5';
    if (probability >= 0.4) return 'w-2/5';
    if (probability >= 0.25) return 'w-1/4';
    if (probability > 0) return 'w-[12%]';
    return 'w-[6%]';
  };

  const trendHeightClass = (probability: number) => {
    if (probability >= 0.9) return 'h-8';
    if (probability >= 0.75) return 'h-7';
    if (probability >= 0.6) return 'h-6';
    if (probability >= 0.45) return 'h-5';
    if (probability >= 0.3) return 'h-4';
    return 'h-3';
  };

  const [liquidityTweak, setLiquidityTweak] = useState(0);
  const [bridgeTweak, setBridgeTweak] = useState(0);
  const [governanceTweak, setGovernanceTweak] = useState(0);
  const [compactMode, setCompactMode] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      'quantum-panel-settings',
      JSON.stringify({
        liquidityTweak,
        bridgeTweak,
        governanceTweak,
        compactMode,
      })
    );
  }, [liquidityTweak, bridgeTweak, governanceTweak, compactMode]);

  const tabIntentLabel: Record<TabType, string> = {
    token: 'Transfer readiness',
    bridge: 'Bridge execution safety',
    staking: 'Staking opportunity quality',
    governance: 'Governance participation quality',
    'private-sale': 'Private sale timing quality',
    'defi-factory': 'Factory operation readiness',
    'yield-distributor': 'Yield claim/distribution readiness',
    vault: 'Treasury and reserve readiness',
    about: 'Ecosystem posture',
    'quantum-ai': 'AI strategy readiness',
    wallet: 'Wallet activity',
  };

  const signal = prediction?.signal ?? 'caution';
  const signalLabel = signal === 'risk-on' ? 'Risk-on' : 'Caution';
  const confidenceValue = prediction?.confidence ?? 0;
  const confidenceClass =
    confidenceValue >= 0.72
      ? 'text-emerald-700'
      : confidenceValue >= 0.5
        ? 'text-amber-700'
        : 'text-rose-700';
  const signalClass =
    signal === 'risk-on'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
      : 'border-orange-300 bg-orange-50 text-orange-900';

  const recommendationList = useMemo(() => {
    if (!prediction) {
      return [
        'Syncing telemetry',
        'Awaiting next pulse',
      ];
    }

    if (activeTab === 'bridge') {
      return signal === 'risk-on'
        ? [
            'Bridge route stable',
            'Default slippage OK',
          ]
        : [
            'Split bridge size',
            'Delay non-urgent',
          ];
    }

    if (activeTab === 'staking') {
      return signal === 'risk-on'
        ? [
            'Normal horizons',
            'Regular compounding',
          ]
        : [
            'Shorter horizons',
            'Claim then hold',
          ];
    }

    if (activeTab === 'governance') {
      return signal === 'risk-on'
        ? [
            'Vote windows open',
            'Delegate refresh OK',
          ]
        : [
            'Prioritize key votes',
            'Re-check before final',
          ];
    }

    if (activeTab === 'private-sale') {
      return signal === 'risk-on'
        ? [
            'Entry window favorable',
            'Stagger entries',
          ]
        : [
            'Smaller staged buys',
            'Preserve dry powder',
          ];
    }

    return signal === 'risk-on'
      ? [
          'Execution favorable',
          'Normal cadence',
        ]
      : [
          'Defensive pacing',
          'Low slippage first',
        ];
  }, [activeTab, prediction, signal]);

  const constellation = useMemo(() => {
    return [
      {
        icon: '💧',
        label: 'Liquidity',
        value: prediction ? `${Math.round(prediction.features.liquidity_health * 100)}%` : '--',
      },
      {
        icon: '🌉',
        label: 'Bridge',
        value: prediction ? `${Math.round(prediction.features.bridge_reliability * 100)}%` : '--',
      },
      {
        icon: '🗳️',
        label: 'Gov',
        value: prediction ? `${Math.round(prediction.features.governance_participation * 100)}%` : '--',
      },
      {
        icon: signal === 'risk-on' ? '🟢' : '🟠',
        label: 'Mode',
        value: signalLabel,
      },
    ];
  }, [prediction, signal, signalLabel]);

  const scenario = useMemo(() => {
    if (!prediction) {
      return {
        probability: 0,
        signal: 'caution' as const,
      };
    }

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const liquidity = clamp01(prediction.features.liquidity_health + liquidityTweak / 100);
    const bridge = clamp01(prediction.features.bridge_reliability + bridgeTweak / 100);
    const governance = clamp01(prediction.features.governance_participation + governanceTweak / 100);

    const weighted = liquidity * 0.45 + bridge * 0.35 + governance * 0.2;
    const uncertaintyPenalty = (1 - prediction.confidence) * 0.15;
    const probability = clamp01(weighted - uncertaintyPenalty);

    return {
      probability,
      signal: probability >= 0.55 ? ('risk-on' as const) : ('caution' as const),
    };
  }, [prediction, liquidityTweak, bridgeTweak, governanceTweak]);

  const recentDelta = useMemo(() => {
    const history = prediction?.recent ?? [];
    if (history.length < 2) return 0;
    return history[history.length - 1].probabilityHealthy - history[0].probabilityHealthy;
  }, [prediction?.recent]);

  const trendLabel = recentDelta > 0.02 ? 'Improving' : recentDelta < -0.02 ? 'Softening' : 'Stable';
  const trendClass =
    recentDelta > 0.02 ? 'text-emerald-700' : recentDelta < -0.02 ? 'text-rose-700' : 'text-[color:var(--brand-ink)]/80';
  const signalButtons = [
    signalLabel,
    tabIntentLabel[activeTab],
    trendLabel,
    prediction ? `${(confidenceValue * 100).toFixed(1)}% confidence` : 'Confidence --',
  ];

  if (hasError) {
    return (
      <section className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>
            Quantum signal is temporarily unavailable.
            {errorText ? ` ${errorText}` : ''}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="brand-secondary-button rounded-md px-3 py-1 text-xs font-medium"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="brand-panel mb-6 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
              Quantum Telemetry
            </button>
            {signalButtons.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-950"
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-sm font-semibold text-slate-900">
            Quantum Signal
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCompactMode((current) => !current)}
            className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {compactMode ? 'Show Details' : 'Hide Details'}
          </button>
          {onRetrain && (
            <button
              type="button"
              onClick={onRetrain}
              disabled={retraining}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {retraining ? 'Retraining...' : 'Retrain'}
            </button>
          )}
          <button type="button" className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${signalClass}`}>
            {signalLabel}
          </button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <button type="button" className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900">
          Healthy {prediction ? `${(prediction.probabilityHealthy * 100).toFixed(1)}%` : '--'}
        </button>
        <button type="button" className={`rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold ${confidenceClass}`}>
          Confidence {prediction ? `${(prediction.confidence * 100).toFixed(1)}%` : '--'}
        </button>
        <button type="button" className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900">
          Mode {prediction?.mode ?? '--'}
        </button>
        <button type="button" className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900">
          {prediction?.label ?? '--'} {refreshing ? 'refreshing...' : ''}
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-white/90 px-3 py-2">
        <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65">
          Signal Constellation
        </button>
        <div className="signal-constellation mt-2">
          {constellation.map((item) => (
            <button key={item.label} type="button" className="visual-icon-tile w-full justify-between">
              <span className="inline-flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              <span className="rounded-full border border-slate-900/10 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                {item.value}
              </span>
            </button>
          ))}
        </div>

        {!compactMode && (
          <div className="mt-2 grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
            {recommendationList.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="brand-pill brand-pill-soft rounded-lg px-2.5 py-1.5 text-[color:var(--brand-ink)]/85"
              >
                • {item}
              </button>
            ))}
          </div>
        )}

        <div className="mt-2 h-2 overflow-hidden rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75">
          <span
            className={`block h-full rounded-full transition-all duration-500 ease-out ${
              scenario.signal === 'risk-on' ? 'bg-emerald-500/80' : 'bg-orange-500/80'
            } ${progressWidthClass(scenario.probability)}`}
          />
        </div>

        <div className="mt-2 flex items-end gap-1 h-10" aria-label="Recent quantum signal trend">
          {(prediction?.recent ?? []).map((point, idx) => {
            const height = Math.max(10, Math.round(point.probabilityHealthy * 32));
            const barClass =
              point.signal === 'risk-on'
                ? 'bg-emerald-500/75 border-emerald-600/35'
                : 'bg-orange-500/75 border-orange-600/35';
            return (
              <span
                key={`${point.generatedAt}-${idx}`}
                title={`${(point.probabilityHealthy * 100).toFixed(1)}%`}
                className={`w-2 rounded-sm border transition-all duration-500 ease-out ${barClass} ${trendHeightClass(point.probabilityHealthy)}`}
              />
            );
          })}
        </div>
      </div>

      {!compactMode && prediction?.confidenceEngine?.components && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white/90 px-3 py-2">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65">
            Confidence Engine v{prediction.confidenceEngine.version}
          </button>
          <div className="grid grid-cols-2 gap-1.5 text-xs sm:grid-cols-5">
            {([
              { key: 'modelMargin', label: 'Model Margin' },
              { key: 'featureConsensus', label: 'Feature Consensus' },
              { key: 'temporalStability', label: 'Temporal Stability' },
              { key: 'backendReliability', label: 'Backend Reliability' },
              { key: 'trendAlignment', label: 'Trend Alignment' },
            ] as const).map(({ key, label }) => {
              const value = prediction.confidenceEngine!.components[key];
              const pct = Math.round(value * 100);
              const colorClass = pct >= 70 ? 'text-emerald-700' : pct >= 45 ? 'text-amber-700' : 'text-rose-700';
              return (
                <button key={key} type="button" className="rounded-lg border border-slate-200 bg-white/80 px-2 py-2 text-left">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/55">{label}</div>
                  <div className={`text-sm font-bold ${colorClass}`}>{pct}%</div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className={`block h-full rounded-full transition-all duration-500 ${
                        pct >= 70 ? 'bg-emerald-500/80' : pct >= 45 ? 'bg-amber-500/80' : 'bg-rose-500/80'
                      } ${progressWidthClass(value)}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!compactMode && (
        <div className="brand-stat-card mt-3 rounded-xl px-3 py-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65">
              Scenario Lab
            </button>
            <button type="button" className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75">
              What-if simulation
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs">
            <div className="brand-pill brand-pill-soft rounded-lg px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">Liquidity bias</button>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">{liquidityTweak > 0 ? `+${liquidityTweak}` : liquidityTweak}%</button>
              </div>
              <input
                type="range"
                aria-label="Liquidity bias"
                title="Liquidity bias"
                min={-30}
                max={30}
                step={5}
                value={liquidityTweak}
                onChange={(event) => setLiquidityTweak(Number(event.target.value))}
                className="w-full"
              />
            </div>

            <div className="brand-pill brand-pill-soft rounded-lg px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">Bridge bias</button>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">{bridgeTweak > 0 ? `+${bridgeTweak}` : bridgeTweak}%</button>
              </div>
              <input
                type="range"
                aria-label="Bridge bias"
                title="Bridge bias"
                min={-30}
                max={30}
                step={5}
                value={bridgeTweak}
                onChange={(event) => setBridgeTweak(Number(event.target.value))}
                className="w-full"
              />
            </div>

            <div className="brand-pill brand-pill-soft rounded-lg px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">Governance bias</button>
                <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold">{governanceTweak > 0 ? `+${governanceTweak}` : governanceTweak}%</button>
              </div>
              <input
                type="range"
                aria-label="Governance bias"
                title="Governance bias"
                min={-30}
                max={30}
                step={5}
                value={governanceTweak}
                onChange={(event) => setGovernanceTweak(Number(event.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="brand-pill brand-pill-soft mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-sm">
            <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">
              Simulated Healthy Probability:{' '}
              <span className="font-semibold">{prediction ? `${(scenario.probability * 100).toFixed(1)}%` : '--'}</span>
            </button>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                scenario.signal === 'risk-on'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-orange-300 bg-orange-50 text-orange-800'
              }`}
            >
              Simulated {scenario.signal === 'risk-on' ? 'Risk-on' : 'Caution'}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
