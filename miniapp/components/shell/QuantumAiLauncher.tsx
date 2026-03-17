'use client';

import React, { useState } from 'react';
import type { AgentAbiConfiguratorResult, AiTakeoverPlan, QuantumPrediction, TabType } from '@/types/app-shell';
import { QuantumAgentKitPanel } from './QuantumAgentKitPanel';

type QuantumAiLauncherProps = {
  activeTab: TabType;
  prediction?: QuantumPrediction;
  takeoverPlan?: AiTakeoverPlan;
  onActivateTakeover?: (plan: AiTakeoverPlan) => void;
  onDeactivateTakeover?: () => void;
  onApplyAbiConfiguration?: (payload: AgentAbiConfiguratorResult) => void;
  onResetAbiConfiguration?: () => void;
};

export function QuantumAiLauncher({
  activeTab,
  prediction,
  takeoverPlan,
  onActivateTakeover,
  onDeactivateTakeover,
  onApplyAbiConfiguration,
  onResetAbiConfiguration,
}: QuantumAiLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open RAYAY"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_16px_32px_rgba(15,23,42,0.2)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-[10px] font-bold text-slate-700">
          AI
        </span>
        RAYAY
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-300 bg-[color:var(--brand-cream)] p-3 shadow-[0_28px_64px_rgba(15,23,42,0.28)] sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)] sm:text-base">RAYAY Agent</button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-medium text-[color:var(--brand-ink)]/85"
              >
                Close
              </button>
            </div>
            <div className="max-h-[78vh] overflow-auto">
              <QuantumAgentKitPanel
                activeTab={activeTab}
                prediction={prediction}
                takeoverEnabled={Boolean(takeoverPlan?.enabled)}
                onActivateTakeover={onActivateTakeover}
                onDeactivateTakeover={onDeactivateTakeover}
                onApplyAbiConfiguration={onApplyAbiConfiguration}
                onResetAbiConfiguration={onResetAbiConfiguration}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
