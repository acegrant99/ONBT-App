'use client';

/**
 * MobileBottomNav — fixed bottom tab bar, visible on small screens only (hidden sm:hidden).
 *
 * Shows 5 priority tabs. Each item displays icon + short label and highlights when active.
 * Farcaster MiniApp safe: respects bottom safe-area insets via pb-safe.
 */
import React from 'react';
import { motion } from 'framer-motion';
import type { TabType } from '@/types/app-shell';

type NavItem = { key: TabType; icon: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { key: 'token', icon: '💰', label: 'Token' },
  { key: 'staking', icon: '🔒', label: 'Stake' },
  { key: 'leaderboard', icon: '🏆', label: 'Rank' },
  { key: 'wallet', icon: '👛', label: 'Wallet' },
  { key: 'quantum-ai', icon: '✦', label: 'AI' },
];

type MobileBottomNavProps = {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
};

export function MobileBottomNav({ activeTab, onChangeTab }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
    >
      {/* Frosted glass bar */}
      <div
        className="mobile-nav-bar flex items-stretch border-t border-slate-200/80 bg-white/92 backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeTab(item.key)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-center transition-colors"
            >
              {/* Active indicator pill behind icon */}
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-indicator"
                  className="absolute top-1 h-7 w-12 rounded-full bg-slate-900"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 text-[20px] leading-none transition-transform ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span
                className={`relative z-10 font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-white' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
