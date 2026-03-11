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
        aria-label="Open ONBT AI"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-forest)] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-105"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/35 bg-white/15 text-xs font-bold">
          AI
        </span>
        ONBT AI
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] p-3 shadow-2xl sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--brand-ink)] sm:text-base">ONBT AI Agent</h2>
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
