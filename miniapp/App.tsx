'use client';

import React, { useEffect, useState } from 'react';
import {
  AppHeader,
  AboutPanel,
  HeroSection,
  AbiDrivenStudio,
  QuantumAiLauncher,
  QuantumSignalPanel,
  ShellStyles,
  TabsSection,
  TxStatusBanner,
} from '@/components/shell';
import { APP_TABS } from '@/config/app-shell';
import { CHAIN_CONFIG, ONBT_ARBITRUM_ADDRESS, ONBT_TOKEN_ADDRESS } from '@/config/contracts';
import { FEATURE_SLICES } from '@/features';
import { useBackendOverview } from '@/hooks/useBackendOverview';
import { useQuantumPrediction } from '@/hooks/useQuantumPrediction';
import {
  ABI_RUNTIME_CONFIG_UPDATED_EVENT,
  clearAbiRuntimeConfig,
  deriveAbiRuntimeConfig,
  loadAbiRuntimeConfig,
  saveAbiRuntimeConfig,
  type AbiRuntimeConfig,
} from '@/lib/abiRuntimeConfig';
import { GLOBAL_TX_STATUS_EVENT, type GlobalTxStatus } from '@/lib/txStatus';
import type { AgentAbiConfiguratorResult, AiTakeoverPlan, TabType } from '@/types/app-shell';

/**
 * Main ONBT Miniapp
 *
 * Omnichain DeFi ecosystem with per-use-case chain selection.
 * All contract interactions support independent Base/Arbitrum selection
 * with automatic wallet network switching on writes.
 *
 * Features:
 * - Token: View balance, transfer on selected chain
 * - Private Sale: Purchase with multiple payment tokens
 * - Governance: View proposals, vote on-chain
 * - Bridge: LayerZero omnichain transfers
 * - Staking: Multi-chain staking with rewards
 *
 * Providers (Wagmi, QueryClient, OnchainKit) are handled by app/layout.tsx
 */
export function ONBTMiniApp() {
  const [activeTab, setActiveTab] = useState<TabType>('token');
  const [abiRuntimeConfig, setAbiRuntimeConfig] = useState<AbiRuntimeConfig | null>(null);
  const [takeoverPlan, setTakeoverPlan] = useState<AiTakeoverPlan>({
    enabled: false,
    focus: 'all',
    headline: 'ONBT AI is optimizing visibility',
    subline: 'Feature surfacing and conversion guidance are enabled.',
    featuredTabs: [],
  });
  const [globalTxStatus, setGlobalTxStatus] = useState<GlobalTxStatus | null>(null);
  const [retrainingQuantum, setRetrainingQuantum] = useState(false);
  const quantumAdminToken = process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN || 'QuantumLayer';
  const {
    data: backendOverview,
    isFetching: backendRefreshing,
    isError: backendHasError,
    error: backendError,
    refetch: refetchBackendOverview,
  } = useBackendOverview();
  const {
    data: quantumPrediction,
    isFetching: quantumRefreshing,
    isError: quantumHasError,
    error: quantumError,
    refetch: refetchQuantumPrediction,
  } = useQuantumPrediction();

  useEffect(() => {
    const initialConfig = loadAbiRuntimeConfig();
    if (initialConfig) {
      setAbiRuntimeConfig(initialConfig);
    }

    const onAbiConfigUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<AbiRuntimeConfig | null>;
      setAbiRuntimeConfig(customEvent.detail || null);
    };

    window.addEventListener(ABI_RUNTIME_CONFIG_UPDATED_EVENT, onAbiConfigUpdated as EventListener);
    return () => {
      window.removeEventListener(ABI_RUNTIME_CONFIG_UPDATED_EVENT, onAbiConfigUpdated as EventListener);
    };
  }, []);

  useEffect(() => {
    const onGlobalTxStatus = (event: Event) => {
      const customEvent = event as CustomEvent<GlobalTxStatus>;
      setGlobalTxStatus(customEvent.detail);
    };

    window.addEventListener(GLOBAL_TX_STATUS_EVENT, onGlobalTxStatus as EventListener);
    return () => {
      window.removeEventListener(GLOBAL_TX_STATUS_EVENT, onGlobalTxStatus as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!globalTxStatus) return;
    if (globalTxStatus.stage !== 'success') return;

    const timeout = setTimeout(() => setGlobalTxStatus(null), 12_000);
    return () => clearTimeout(timeout);
  }, [globalTxStatus]);

  const configuredTabs = abiRuntimeConfig
    ? APP_TABS.filter((tab) => abiRuntimeConfig.enabledTabs.includes(tab.key))
    : APP_TABS;

  useEffect(() => {
    if (!configuredTabs.some((tab) => tab.key === activeTab)) {
      const fallback = configuredTabs[0]?.key || 'about';
      setActiveTab(fallback);
    }
  }, [configuredTabs, activeTab]);

  const applyAbiConfiguration = (payload: AgentAbiConfiguratorResult) => {
    const derived = deriveAbiRuntimeConfig(payload);
    saveAbiRuntimeConfig(derived);
    setGlobalTxStatus({
      source: 'governance',
      stage: 'success',
      txHash: undefined,
      updatedAt: Date.now(),
      errorMessage: `ABI config applied: ${derived.enabledTabs.join(', ')}`,
    });
  };

  const resetAbiConfiguration = () => {
    clearAbiRuntimeConfig();
    setGlobalTxStatus({
      source: 'governance',
      stage: 'success',
      txHash: undefined,
      updatedAt: Date.now(),
      errorMessage: 'ABI runtime config cleared. Default miniapp tabs restored.',
    });
  };

  const explorerBase = CHAIN_CONFIG.base.blockExplorer;
  const explorerArbitrum = CHAIN_CONFIG.arbitrum.blockExplorer;

  const renderActivePanel = () => {
    const activeSlice = FEATURE_SLICES.find((slice) => slice.key === activeTab);
    if (activeSlice) {
      return activeSlice.render({
        quantumPrediction,
      });
    }

    return (
      <AboutPanel
        baseExplorer={explorerBase}
        arbitrumExplorer={explorerArbitrum}
        baseTokenAddress={ONBT_TOKEN_ADDRESS}
        arbitrumTokenAddress={ONBT_ARBITRUM_ADDRESS}
      />
    );
  };

  const triggerQuantumRetrain = async () => {
    try {
      setRetrainingQuantum(true);
      const response = await fetch('/api/quantum/retrain', {
        method: 'POST',
        headers: {
          'x-quantum-admin-token': quantumAdminToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Retrain request failed with status ${response.status}`);
      }

      await refetchQuantumPrediction();
    } catch (error) {
      setGlobalTxStatus({
        source: 'governance',
        stage: 'error',
        errorMessage: error instanceof Error ? error.message : 'Failed to trigger retrain',
        updatedAt: Date.now(),
      });
    } finally {
      setRetrainingQuantum(false);
    }
  };

  return (
    <div className={`brand-root h-full flex flex-col overflow-hidden text-[color:var(--brand-ink)] ${takeoverPlan.enabled ? 'takeover-glow' : ''}`}>
      <ShellStyles />
      <AppHeader aiTakeoverEnabled={takeoverPlan.enabled} />

      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <HeroSection
          takeoverPlan={takeoverPlan}
        />

        <QuantumSignalPanel
          activeTab={activeTab}
          prediction={quantumPrediction}
          refreshing={quantumRefreshing}
          retraining={retrainingQuantum}
          hasError={quantumHasError}
          errorText={quantumError instanceof Error ? quantumError.message : undefined}
          onRetry={() => void refetchQuantumPrediction()}
          onRetrain={() => void triggerQuantumRetrain()}
        />

        <AbiDrivenStudio
          activeTab={activeTab}
          prediction={quantumPrediction}
        />

        {backendHasError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>
                Live chain telemetry is temporarily unavailable.
                {backendError instanceof Error ? ` ${backendError.message}` : ''}
              </p>
              <button
                type="button"
                onClick={() => void refetchBackendOverview()}
                className="rounded-md border border-red-300 bg-white px-3 py-1 text-xs font-medium hover:bg-red-100"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {globalTxStatus && <TxStatusBanner status={globalTxStatus} />}

        <TabsSection
          tabs={configuredTabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          featuredTabs={takeoverPlan.enabled ? takeoverPlan.featuredTabs : []}
        />

        <section className="content-stage pb-8">
          {renderActivePanel()}
        </section>
        </div>
      </main>

      <QuantumAiLauncher
        activeTab={activeTab}
        prediction={quantumPrediction}
        takeoverPlan={takeoverPlan}
        onActivateTakeover={setTakeoverPlan}
        onDeactivateTakeover={() =>
          setTakeoverPlan((prev) => ({
            ...prev,
            enabled: false,
            featuredTabs: [],
          }))
        }
        onApplyAbiConfiguration={applyAbiConfiguration}
        onResetAbiConfiguration={resetAbiConfiguration}
      />
    </div>
  );
}

export default ONBTMiniApp;
