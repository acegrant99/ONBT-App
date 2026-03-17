'use client';

import React from 'react';
import { Identity, Avatar, Name, Address, EthBalance } from '@coinbase/onchainkit/identity';

type WalletIdentityBadgeProps = {
  address: `0x${string}`;
  className?: string;
  label?: string;
};

export function WalletIdentityBadge({ address, className = '', label = 'Connected wallet' }: WalletIdentityBadgeProps) {
  return (
    <Identity
      address={address}
      className={`inline-flex items-center gap-3 rounded-2xl border border-slate-900/12 bg-white/88 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.08)] ${className}`.trim()}
    >
      <Avatar className="h-10 w-10 rounded-2xl" />
      <div className="min-w-0">
        <button type="button" className="font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</button>
        <div className="mt-1 space-y-1">
          <Name className="font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-sm font-semibold text-slate-900" />
          <Address className="font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700" />
          <EthBalance className="font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700" />
        </div>
      </div>
    </Identity>
  );
}