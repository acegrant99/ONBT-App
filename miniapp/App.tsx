import React, { useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { StakingInterface } from './components/StakingInterface';
import { SwapInterface } from './components/SwapInterface';
import '@coinbase/onchainkit/styles.css';

// Configure wagmi
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

type TabType = 'stake' | 'swap' | 'pool';

/**
 * Main ONBT DeFi Miniapp
 * Integrates staking, swapping, and liquidity provision
 */
export function ONBTMiniApp() {
  const [activeTab, setActiveTab] = useState<TabType>('stake');

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={base} apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">ON</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Omnichain Nabat</h1>
                      <p className="text-xs text-gray-500">DeFi Ecosystem</p>
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
              <div className="flex space-x-2 border-b mb-8">
                {(['stake', 'swap', 'pool'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    } rounded-t-lg`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="pb-16">
                {activeTab === 'stake' && <StakingInterface />}
                {activeTab === 'swap' && <SwapInterface />}
                {activeTab === 'pool' && (
                  <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Liquidity Pool
                    </h2>
                    <p className="text-gray-600">
                      Add liquidity to the ONBT/ETH pool and earn trading fees.
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        🚧 Liquidity Pool interface coming soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">About ONBT</h3>
                    <p className="text-sm text-gray-600">
                      Omnichain Nabat Token is a cross-chain DeFi ecosystem built on
                      LayerZero with native Base integration.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <a href="https://nabat.finance" className="hover:text-blue-600">
                          Website
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-blue-600">
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-blue-600">
                          GitHub
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Community</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <a href="#" className="hover:text-blue-600">
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-blue-600">
                          Discord
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-blue-600">
                          Telegram
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                  © 2026 Omnichain Nabat. Built on Base with OnchainKit.
                </div>
              </div>
            </footer>
          </div>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ONBTMiniApp;
