import React from 'react';
import type { TabType, TabMeta } from '@/types/app-shell';

type TabsSectionProps = {
  tabs: TabMeta[];
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  featuredTabs?: TabType[];
};

export function TabsSection({ tabs, activeTab, onChangeTab, featuredTabs = [] }: TabsSectionProps) {
  const activeTabMeta = tabs.find((item) => item.key === activeTab);

  return (
    <section className="mb-6 rounded-3xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/72 p-3 sm:p-4 brand-surface">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {tabs.map((tab) => {
          const isFeatured = featuredTabs.includes(tab.key);
          return (
          <button
            key={tab.key}
            onClick={() => onChangeTab(tab.key)}
            className={`tab-pill px-3 py-2.5 rounded-2xl border text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-forest)] text-white shadow-md scale-[1.01]'
                : isFeatured
                  ? 'border-emerald-300 bg-emerald-50/90 text-emerald-900 shadow-sm'
                  : 'border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)]/95 text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/50 hover:text-[color:var(--brand-forest)] hover:-translate-y-0.5'
            }`}
          >
            <span className="mr-1.5" aria-hidden="true">{tab.icon}</span>
            {tab.label}
            {isFeatured && activeTab !== tab.key ? ' *' : ''}
          </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[color:var(--brand-ink)]/60">
        Active module: <span className="font-medium text-[color:var(--brand-forest)]">{activeTabMeta?.label}</span>
      </p>
    </section>
  );
}
