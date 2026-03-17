'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TokenInterface,
  PrivateSaleInterface,
  GovernanceInterface,
  BridgeInterface,
  StakingInterface,
} from './components';
import {
  AppFooter,
  AppHeader,
  AboutPanel,
  HeroSection,
  MiniAppActionPanel,
  MiniAppNotificationCard,
  QuantumAgentKitPanel,
  QuantumAiLauncher,
  QuantumSignalPanel,
  ShellStyles,
  TabsSection,
  TxStatusBanner,
} from '@/components/shell';
import { APP_TABS } from '@/config/app-shell';
import { CHAIN_CONFIG, ONBT_ARBITRUM_ADDRESS, ONBT_TOKEN_ADDRESS } from '@/config/contracts';
import { useBackendOverview } from '@/hooks/useBackendOverview';
import { useQuantumPrediction } from '@/hooks/useQuantumPrediction';
import { useMiniApp } from '@/hooks/useMiniApp';
import { useGlobalTxStatus } from '@/hooks/useGlobalTxStatus';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { WalletPanel } from '@/features/wallet/ui/WalletPanel';
import { DefiFactoryInterface } from '@/features/defiFactory/ui/DefiFactoryInterface';
import { YieldDistributorInterface } from '@/features/yieldDistributor/ui/YieldDistributorInterface';
import { VaultInterface } from '@/features/vault/ui/VaultInterface';
import type { TabType } from '@/types/app-shell';

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
  const [retrainingQuantum, setRetrainingQuantum] = useState(false);
  const quantumAdminToken = process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN;

  // MiniKit: fires sdk.actions.ready() once on mount, hiding the splash screen.
  const { isInMiniApp, context: miniAppContext } = useMiniApp();
  // Global tx status — auto-clears after success/error; driven by publishGlobalTxStatus events.
  const globalTxStatus = useGlobalTxStatus();
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

  const explorerBase = CHAIN_CONFIG.base.blockExplorer;
  const explorerArbitrum = CHAIN_CONFIG.arbitrum.blockExplorer;
  const hasNotificationDetails = Boolean(miniAppContext?.client.notificationDetails);
  const isMiniAppAdded = Boolean(miniAppContext?.client.added || hasNotificationDetails);
  const miniAppFid = miniAppContext?.user.fid;

  const renderActivePanel = () => {
    if (activeTab === 'token') return <TokenInterface />;
    if (activeTab === 'bridge') return <BridgeInterface />;
    if (activeTab === 'staking') return <StakingInterface />;
    if (activeTab === 'governance') return <GovernanceInterface />;
    if (activeTab === 'private-sale') return <PrivateSaleInterface />;
    if (activeTab === 'defi-factory') return <DefiFactoryInterface />;
    if (activeTab === 'yield-distributor') return <YieldDistributorInterface />;
    if (activeTab === 'vault') return <VaultInterface />;
    if (activeTab === 'quantum-ai') return (
      <div className="space-y-6">
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
        <QuantumAgentKitPanel
          activeTab={activeTab}
          prediction={quantumPrediction}
        />
      </div>
    );
    if (activeTab === 'wallet') return (
      <div className="space-y-6">
        <MiniAppNotificationCard
          isInMiniApp={isInMiniApp}
          fid={miniAppFid}
          isAdded={isMiniAppAdded}
          hasNotificationDetails={hasNotificationDetails}
        />
        <MiniAppActionPanel />
        <WalletPanel />
      </div>
    );
    // about (default)
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
      const headers: Record<string, string> = {};
      if (quantumAdminToken) {
        headers['x-quantum-admin-token'] = quantumAdminToken;
      }
      const response = await fetch('/api/quantum/retrain', {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Retrain request failed with status ${response.status}`);
      }

      await refetchQuantumPrediction();
    } catch (error) {
      publishGlobalTxStatus({
        source: 'governance',
        stage: 'error',
        errorMessage: error instanceof Error ? error.message : 'Failed to trigger retrain',
      });
    } finally {
      setRetrainingQuantum(false);
    }
  };

  const backendAgeMs = backendOverview?.generatedAt ? Math.max(Date.now() - Date.parse(backendOverview.generatedAt), 0) : Number.POSITIVE_INFINITY;
  const quantumAgeMs = quantumPrediction?.generatedAt ? Math.max(Date.now() - Date.parse(quantumPrediction.generatedAt), 0) : Number.POSITIVE_INFINITY;
  const tabFreshness: Partial<Record<TabType, { ageMs: number; refreshing?: boolean; staleAfterMs?: number }>> = {
    token: { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    bridge: { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    staking: { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    'private-sale': { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    governance: { ageMs: quantumAgeMs, refreshing: quantumRefreshing, staleAfterMs: 35_000 },
    'defi-factory': { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    'yield-distributor': { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    vault: { ageMs: backendAgeMs, refreshing: backendRefreshing, staleAfterMs: 30_000 },
    about: { ageMs: Math.max(backendAgeMs, quantumAgeMs), refreshing: backendRefreshing || quantumRefreshing, staleAfterMs: 45_000 },
  };

  const refreshStaleData = () => {
    void refetchBackendOverview();
    void refetchQuantumPrediction();
  };

  return (
    <div className="brand-root min-h-screen text-[color:var(--brand-ink)]">
      <ShellStyles />
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <HeroSection />

        {globalTxStatus && <TxStatusBanner status={globalTxStatus} />}

        {backendHasError && (
          <div className="mb-6 rounded-2xl border border-rose-300 bg-rose-50/92 px-4 py-3 text-sm text-rose-900 shadow-[0_14px_28px_rgba(190,24,93,0.12)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className="rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900">Telemetry Offline</button>
                {backendError instanceof Error && (
                  <button type="button" className="rounded-2xl border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900">{backendError.message}</button>
                )}
              </div>
              <button
                type="button"
                onClick={() => void refetchBackendOverview()}
                className="rounded-md border border-rose-300 bg-white px-3 py-1 text-xs font-medium text-rose-900 transition-colors hover:bg-rose-100"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <section className="grid gap-6 xl:items-start">
          <div className="space-y-6">
            <TabsSection
              tabs={APP_TABS}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              freshnessByTab={tabFreshness}
              onRefreshStale={refreshStaleData}
            />

            <section className="content-stage pb-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  {renderActivePanel()}
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </section>
      </main>

      <QuantumAiLauncher
        activeTab={activeTab}
        prediction={quantumPrediction}
      />

      <AppFooter />
    </div>
  );
}

export default ONBTMiniApp;
