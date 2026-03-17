'use client';

import React from 'react';
import Image from 'next/image';
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

const STACK_BUTTONS = ['Base', 'Arbitrum', 'MiniKit', 'AgentKit', 'CLI'];

type AppHeaderProps = {
  aiTakeoverEnabled?: boolean;
};

export function AppHeader({ aiTakeoverEnabled = false }: AppHeaderProps) {
  const { context } = useMiniKit();
  const { address } = useAccount();
  const clientLabel = context?.client?.platformType || 'browser';

  return (
    <header className="brand-surface sticky top-0 z-50 border-b border-slate-900/10 bg-white/78 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="reveal-up rounded-[1.2rem] border border-slate-900/12 bg-white/90 px-3 py-3 shadow-[0_16px_34px_rgba(15,23,42,0.12)] sm:px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-cyan-50 border border-slate-900/12 flex items-center justify-center shadow-sm ring-1 ring-blue-200/45">
              <Image
                src="/branding/onabat-logo-light.png"
                alt="ONabat logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              </div>
              <div className="min-w-0">
                <button type="button" className="brand-display rounded-2xl border border-slate-900/12 bg-white px-3 py-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 truncate">ONabat</button>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-slate-900/10 bg-slate-50 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700"
                  >
                    Client {clientLabel}
                  </button>
                  {STACK_BUTTONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="rounded-full border border-cyan-300/40 bg-cyan-50 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-950"
                    >
                      {item}
                    </button>
                  ))}
                  {aiTakeoverEnabled && (
                    <button
                      type="button"
                      className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-800"
                    >
                      RAYAY Takeover Active
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 lg:min-w-[290px] lg:justify-end">
              <Wallet>
                <ConnectWallet />
                <WalletDropdown>
                  {address && (
                    <div className="px-4 pb-2 pt-3">
                      <p className="font-['IBM_Plex_Mono'] text-xs text-slate-500">
                        {address.slice(0, 6)}…{address.slice(-4)}
                      </p>
                    </div>
                  )}
                  <WalletDropdownLink
                    icon="wallet"
                    href={address ? `https://basescan.org/address/${address}` : 'https://basescan.org'}
                    rel="noopener noreferrer"
                  >
                    View on Basescan
                  </WalletDropdownLink>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
