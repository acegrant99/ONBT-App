import React from 'react';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address, Identity } from '@coinbase/onchainkit/identity';

type AppHeaderProps = {
  aiTakeoverEnabled?: boolean;
};

export function AppHeader({ aiTakeoverEnabled = false }: AppHeaderProps) {
  return (
    <header className="brand-surface sticky top-0 z-50 border-b border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 rounded-2xl bg-[color:var(--brand-cream)] border border-[color:var(--brand-leaf)]/40 flex items-center justify-center shadow-sm">
              <picture>
                <source srcSet="/branding/onabat-logo-light.png" media="(prefers-color-scheme: dark)" />
                <img src="/branding/onabat-logo-dark.png" alt="ONabat logo" className="h-8 w-8 object-contain" />
              </picture>
            </div>
            <div className="min-w-0">
              <h1 className="brand-display text-lg sm:text-2xl font-semibold tracking-tight truncate">ONabat</h1>
              <p className="text-xs text-[color:var(--brand-ink)]/65 truncate">Omnichain ONBT • Base + Arbitrum</p>
              {aiTakeoverEnabled && (
                <span className="mt-1 inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                  ONBT AI Takeover Active
                </span>
              )}
            </div>
          </div>

          <Wallet>
            <ConnectWallet>
              <div className="flex items-center gap-2">
                <Avatar />
                <Name />
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2">
                <Avatar />
                <Name />
                <Address className="text-[color:var(--brand-ink)]/60" />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://www.nabat.finance" target="_blank">
                Website
              </WalletDropdownLink>
              <WalletDropdownFundLink text="Fund wallet" />
              <WalletDropdownDisconnect text="Disconnect" />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </header>
  );
}
