import React from 'react';
import { motion } from 'framer-motion';
import type { TabType, TabMeta } from '@/types/app-shell';

type TabsSectionProps = {
  tabs: TabMeta[];
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  featuredTabs?: TabType[];
  freshnessByTab?: Partial<Record<TabType, { ageMs: number; refreshing?: boolean; staleAfterMs?: number }>>;
  onRefreshStale?: () => void;
};

export function TabsSection({ tabs, activeTab, onChangeTab, featuredTabs = [], freshnessByTab = {}, onRefreshStale }: TabsSectionProps) {
  const activeTabMeta = tabs.find((item) => item.key === activeTab);
  const staleTabs = tabs.filter((tab) => {
    const freshness = freshnessByTab[tab.key];
    if (!freshness) return false;
    const staleAfter = freshness.staleAfterMs ?? 30_000;
    return freshness.ageMs > staleAfter;
  });

  const formatAge = (ageMs: number) => {
    if (!Number.isFinite(ageMs) || ageMs < 0) return '--';
    if (ageMs < 1000) return '<1s';
    if (ageMs < 60_000) return `${Math.floor(ageMs / 1000)}s`;
    return `${Math.floor(ageMs / 60_000)}m`;
  };

  return (
    <section className="brand-panel reveal-up mb-6 p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {tabs.map((tab) => {
          const isFeatured = featuredTabs.includes(tab.key);
          const freshness = freshnessByTab[tab.key];
          const freshnessText = freshness
            ? (freshness.refreshing ?? false)
              ? 'live'
              : `age ${formatAge(freshness.ageMs ?? 0)}`
            : undefined;
          return (
            <motion.button
              key={tab.key}
              onClick={() => onChangeTab(tab.key)}
              whileTap={{ scale: 0.98 }}
              aria-label={freshnessText ? `${tab.label} ${freshnessText}` : tab.label}
              className={`tab-pill relative flex min-h-[56px] items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key ? 'tab-pill-active' : ''
              } ${
                activeTab === tab.key
                  ? 'border-slate-900/20 bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)]'
                  : isFeatured
                    ? 'border-blue-300/60 bg-blue-50/70 text-blue-900'
                    : 'border-slate-900/12 bg-white/92 text-slate-700 hover:border-slate-900/28 hover:bg-white'
              }`}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden="true">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </span>
              {freshness && (
                <span
                  aria-hidden="true"
                  className={`shrink-0 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    (freshness.refreshing ?? false)
                      ? 'bg-white/20 text-white'
                      : activeTab === tab.key
                        ? 'bg-white/20 text-white'
                        : (freshness.ageMs ?? 0) > (freshness.staleAfterMs ?? 30_000)
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {freshnessText}
                </span>
              )}
              {activeTab === tab.key && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 -z-10 rounded-2xl border border-slate-900/20"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
          Active {activeTabMeta?.label}
        </button>
      </div>
      {staleTabs.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          <button type="button" className="rounded-full border border-amber-400/65 bg-white px-3 py-1 font-medium text-amber-900">
            Stale {staleTabs.map((tab) => tab.label).join(', ')}
          </button>
          {onRefreshStale && (
            <button
              type="button"
              onClick={onRefreshStale}
              className="rounded-md border border-amber-400/65 bg-white px-2 py-1 font-medium text-amber-900 transition-colors hover:bg-amber-100"
            >
              Refresh
            </button>
          )}
        </div>
      )}
    </section>
  );
}
