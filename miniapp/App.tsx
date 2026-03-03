'use client';

import React, { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import {
  TokenInterface,
  PrivateSaleInterface,
  GovernanceInterface,
  BridgeInterface,
  StakingInterface,
} from './components';

type TabType = 'token' | 'private-sale' | 'governance' | 'bridge' | 'staking';

const TABS: Array<{ id: TabType; label: string; description: string }> = [
  { id: 'token', label: 'Token', description: 'Transfer ONBT across Base & Arbitrum' },
  { id: 'private-sale', label: 'Private Sale', description: 'Buy ONBT with ETH/USDC/USDT' },
  { id: 'governance', label: 'Governance', description: 'Vote on proposals' },
  { id: 'bridge', label: 'Bridge', description: 'Cross-chain transfers via LayerZero' },
  { id: 'staking', label: 'Staking', description: 'Earn yield with lockup bonuses' },
];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ON</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ONabat</h1>
                <p className="text-xs text-gray-500">Omnichain DeFi</p>
              </div>
            </div>

            {/* Connect Wallet */}
            <Wallet>
              <ConnectWallet />
            </Wallet>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-8 pb-4">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium text-sm transition-all rounded-t-lg ${
                    isActive
                      ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
                <p className={`text-xs px-4 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {tab.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="pb-16">
          {activeTab === 'token' && <TokenInterface />}
          {activeTab === 'private-sale' && <PrivateSaleInterface />}
          {activeTab === 'governance' && <GovernanceInterface />}
          {activeTab === 'bridge' && <BridgeInterface />}
          {activeTab === 'staking' && <StakingInterface />}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">About ONabat</h3>
              <p className="text-sm text-gray-600">
                Omnichain Nabat Token ecosystem: buy, bridge, stake, and govern ONBT across Base and Arbitrum with LayerZero V2.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="https://nabat.finance" className="hover:text-emerald-600 transition">
                    Website
                  </a>
                </li>
                <li>
                  <a href="https://docs.nabat.finance" className="hover:text-emerald-600 transition">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="https://github.com/acegrant99/ONBT-App" className="hover:text-emerald-600 transition">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Chain Info</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="https://basescan.org" className="hover:text-emerald-600 transition">
                    Base Explorer
                  </a>
                </li>
                <li>
                  <a href="https://arbiscan.io" className="hover:text-emerald-600 transition">
                    Arbitrum Explorer
                  </a>
                </li>
                <li>
                  <a href="https://layerzero.network" className="hover:text-emerald-600 transition">
                    LayerZero Docs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2026 Omnichain Nabat. Built with OnchainKit + wagmi + LayerZero V2.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ONBTMiniApp;
