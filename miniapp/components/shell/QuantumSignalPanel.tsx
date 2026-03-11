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
    about: 'Ecosystem posture',
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
        'Gathering baseline telemetry for adaptive suggestions.',
        'Check back after the next refresh to unlock scenario guidance.',
      ];
    }

    if (activeTab === 'bridge') {
      return signal === 'risk-on'
        ? [
            'Bridge route looks stable. Execute standard-sized transfers.',
            'Keep slippage limits near default while conditions stay green.',
          ]
        : [
            'Bridge reliability is soft. Split large transfers into smaller batches.',
            'Delay non-urgent bridge actions until confidence improves.',
          ];
    }

    if (activeTab === 'staking') {
      return signal === 'risk-on'
        ? [
            'Current conditions support normal staking horizons.',
            'Compounding cadence can remain on your regular schedule.',
          ]
        : [
            'Use shorter staking horizons during caution windows.',
            'Favor claim-and-hold over aggressive compounding for now.',
          ];
    }

    if (activeTab === 'governance') {
      return signal === 'risk-on'
        ? [
            'Governance participation is supportive. High-impact votes are timely.',
            'Delegate refresh can proceed without elevated timing risk.',
          ]
        : [
            'Participation quality is mixed. Prioritize critical votes only.',
            'Re-check signal before finalizing large governance moves.',
          ];
    }

    if (activeTab === 'private-sale') {
      return signal === 'risk-on'
        ? [
            'Private sale conditions are favorable for planned entries.',
            'Staggered entries still help control local volatility.',
          ]
        : [
            'Conditions are cautious. Use smaller staged allocations.',
            'Preserve dry powder for stronger confidence windows.',
          ];
    }

    return signal === 'risk-on'
      ? [
          'Execution conditions are favorable for regular app activity.',
          'You can keep normal cadence while confidence remains stable.',
        ]
      : [
          'Use defensive pacing across actions while caution is active.',
          'Prioritize low-slippage and reversible actions first.',
        ];
  }, [activeTab, prediction, signal]);

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
            className="rounded-md border border-amber-400 bg-white px-3 py-1 text-xs font-medium hover:bg-amber-100"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-semibold">Quantum Ecosystem Signal</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCompactMode((current) => !current)}
            className="rounded-md border border-[color:var(--brand-leaf)]/45 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-medium text-[color:var(--brand-ink)] hover:border-[color:var(--brand-forest)]/55"
          >
            {compactMode ? 'Expanded View' : 'Compact View'}
          </button>
          {onRetrain && (
            <button
              type="button"
              onClick={onRetrain}
              disabled={retraining}
              className="rounded-md border border-[color:var(--brand-leaf)]/45 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-medium text-[color:var(--brand-ink)] hover:border-[color:var(--brand-forest)]/55 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {retraining ? 'Retraining...' : 'Retrain Now'}
            </button>
          )}
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${signalClass}`}>
            {signalLabel}
          </span>
        </div>
      </div>

      <div className="mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-gradient-to-r from-[color:var(--brand-cream)] via-[color:var(--brand-leaf)]/10 to-[color:var(--brand-sun)]/10 px-3 py-2">
        <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Adaptive UX Mode</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
          <p>
            Focus: <span className="font-semibold">{tabIntentLabel[activeTab]}</span>
          </p>
          <p>
            Trend: <span className={`font-semibold ${trendClass}`}>{trendLabel}</span>
          </p>
          <p>
            Confidence:{' '}
            <span className={`font-semibold ${confidenceClass}`}>
              {prediction ? `${(confidenceValue * 100).toFixed(1)}%` : '--'}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
        <div className="motion-card rounded-xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75 px-3 py-2">
          <p className="text-[color:var(--brand-ink)]/60">Healthy Probability</p>
          <p className="font-semibold">{prediction ? `${(prediction.probabilityHealthy * 100).toFixed(1)}%` : '--'}</p>
        </div>
        <div className="motion-card rounded-xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75 px-3 py-2">
          <p className="text-[color:var(--brand-ink)]/60">Confidence</p>
          <p className="font-semibold">{prediction ? `${(prediction.confidence * 100).toFixed(1)}%` : '--'}</p>
        </div>
        <div className="motion-card rounded-xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75 px-3 py-2">
          <p className="text-[color:var(--brand-ink)]/60">Inference Mode</p>
          <p className="font-semibold">{prediction?.mode ?? '--'}</p>
        </div>
        <div className="motion-card rounded-xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75 px-3 py-2">
          <p className="text-[color:var(--brand-ink)]/60">Model Label</p>
          <p className="font-semibold flex items-center gap-2">
            {prediction?.label ?? '--'}
            {refreshing && <span className="text-[color:var(--brand-ink)]/55">refreshing...</span>}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
        <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Model Guidance</p>
        <p className="mt-1 text-xs sm:text-sm text-[color:var(--brand-ink)]/80">
          {prediction?.recommendation ?? 'Collecting enough signal data to produce guidance.'}
        </p>

        {!compactMode && (
          <div className="mt-2 grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
            {recommendationList.map((item, idx) => (
              <p
                key={idx}
                className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-2.5 py-1.5 text-[color:var(--brand-ink)]/85"
              >
                {item}
              </p>
            ))}
          </div>
        )}

        <div className="mt-2 h-2 overflow-hidden rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75">
          <span
            className={`block h-full rounded-full transition-all duration-500 ease-out ${
              scenario.signal === 'risk-on' ? 'bg-emerald-500/80' : 'bg-orange-500/80'
            }`}
            style={{ width: `${Math.round(scenario.probability * 100)}%` }}
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
                className={`w-2 rounded-sm border transition-all duration-500 ease-out ${barClass}`}
                style={{ height }}
              />
            );
          })}
        </div>
      </div>

      {!compactMode && (
        <div className="mt-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Scenario Lab</p>
            <p className="text-xs text-[color:var(--brand-ink)]/70">What-if simulation for your next action</p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs">
            <label className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <span>Liquidity bias</span>
                <span className="font-semibold">{liquidityTweak > 0 ? `+${liquidityTweak}` : liquidityTweak}%</span>
              </div>
              <input
                type="range"
                min={-30}
                max={30}
                step={5}
                value={liquidityTweak}
                onChange={(event) => setLiquidityTweak(Number(event.target.value))}
                className="w-full"
              />
            </label>

            <label className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <span>Bridge bias</span>
                <span className="font-semibold">{bridgeTweak > 0 ? `+${bridgeTweak}` : bridgeTweak}%</span>
              </div>
              <input
                type="range"
                min={-30}
                max={30}
                step={5}
                value={bridgeTweak}
                onChange={(event) => setBridgeTweak(Number(event.target.value))}
                className="w-full"
              />
            </label>

            <label className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between">
                <span>Governance bias</span>
                <span className="font-semibold">{governanceTweak > 0 ? `+${governanceTweak}` : governanceTweak}%</span>
              </div>
              <input
                type="range"
                min={-30}
                max={30}
                step={5}
                value={governanceTweak}
                onChange={(event) => setGovernanceTweak(Number(event.target.value))}
                className="w-full"
              />
            </label>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-2.5 py-2 text-xs sm:text-sm">
            <p>
              Simulated Healthy Probability:{' '}
              <span className="font-semibold">{prediction ? `${(scenario.probability * 100).toFixed(1)}%` : '--'}</span>
            </p>
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
