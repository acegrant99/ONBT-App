import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TabType, TabMeta } from '@/types/app-shell';

type TabsSectionProps = {
  tabs: TabMeta[];
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  featuredTabs?: TabType[];
  freshnessByTab?: Partial<Record<TabType, { ageMs: number; refreshing?: boolean; staleAfterMs?: number }>>;
  onRefreshStale?: () => void;
};

type CategoryKey = 'defi' | 'tools' | 'info';
const CATEGORIES: { key: CategoryKey; label: string; icon: string; tabs: TabType[] }[] = [
  {
    key: 'defi',
    label: 'DeFi',
    icon: '⚡',
    tabs: ['token', 'bridge', 'staking', 'liquidity-pool', 'yield-distributor', 'vault', 'private-sale', 'vesting', 'airdrop'],
  },
  {
    key: 'tools',
    label: 'Tools',
    icon: '🛠',
    tabs: ['defi-factory', 'governance', 'wallet', 'quantum-ai'],
  },
  {
    key: 'info',
    label: 'Info',
    icon: '📊',
    tabs: ['leaderboard', 'about'],
  },
];

function getCategoryForTab(tab: TabType): CategoryKey {
  return CATEGORIES.find((c) => c.tabs.includes(tab))?.key ?? 'defi';
}

export function TabsSection({ tabs, activeTab, onChangeTab, featuredTabs = [], freshnessByTab = {}, onRefreshStale }: TabsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(() => getCategoryForTab(activeTab));

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

  const visibleTabs = tabs.filter((tab) =>
    CATEGORIES.find((c) => c.key === activeCategory)?.tabs.includes(tab.key)
  );

  const handleCategoryChange = (cat: CategoryKey) => {
    setActiveCategory(cat);
    // If active tab is not in the new category, switch to the first tab in that category
    const catTabs = CATEGORIES.find((c) => c.key === cat)?.tabs ?? [];
    if (!catTabs.includes(activeTab)) {
      const firstTab = tabs.find((t) => catTabs.includes(t.key));
      if (firstTab) onChangeTab(firstTab.key);
    }
  };

  // Keep category in sync when activeTab changes externally (e.g. MobileBottomNav)
  React.useEffect(() => {
    const cat = getCategoryForTab(activeTab);
    if (cat !== activeCategory) setActiveCategory(cat);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <section className="brand-panel reveal-up mb-6 p-3 sm:p-4 space-y-3">

      {/* ── Category switcher ──────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 rounded-2xl border border-slate-900/8 bg-slate-900/4 p-1">
        {CATEGORIES.map((cat) => {
          const hasStaleCat = staleTabs.some((t) => cat.tabs.includes(t.key));
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              <span>{cat.label}</span>
              {hasStaleCat && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-amber-400" aria-label="stale data" />
              )}
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="cat-indicator"
                  className="absolute inset-0 -z-10 rounded-xl bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab pills ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible"
        >
          {visibleTabs.map((tab) => {
            const isFeatured = featuredTabs.includes(tab.key);
            const freshness = freshnessByTab[tab.key];
            const freshnessText = freshness
              ? (freshness.refreshing ?? false)
                ? 'live'
                : `age ${formatAge(freshness.ageMs ?? 0)}`
              : undefined;
            const isStale = freshness && (freshness.ageMs ?? 0) > (freshness.staleAfterMs ?? 30_000);
            return (
              <motion.button
                key={tab.key}
                onClick={() => onChangeTab(tab.key)}
                whileTap={{ scale: 0.97 }}
                layout
                aria-label={freshnessText ? `${tab.label} ${freshnessText}` : tab.label}
                className={`tab-pill relative flex min-h-[56px] shrink-0 items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 sm:shrink ${
                  activeTab === tab.key
                    ? 'border-slate-900/20 bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)]'
                    : isFeatured
                      ? 'border-sky-300/60 bg-sky-50/70 text-sky-900 hover:bg-sky-50'
                      : 'border-slate-900/10 bg-white/92 text-slate-700 hover:border-slate-900/25 hover:bg-white'
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
                          : isStale
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-600'
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
        </motion.div>
      </AnimatePresence>

      {/* ── Status row ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
          {activeTabMeta?.icon} {activeTabMeta?.label}
        </span>
        {staleTabs.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Stale: {staleTabs.map((t) => t.label).join(', ')}
            {onRefreshStale && (
              <button
                type="button"
                onClick={onRefreshStale}
                className="ml-1 rounded-full border border-amber-400/60 bg-white px-2 py-0.5 text-[10px] font-semibold text-amber-900 hover:bg-amber-100"
              >
                Refresh
              </button>
            )}
          </span>
        )}
      </div>
    </section>
  );
}
