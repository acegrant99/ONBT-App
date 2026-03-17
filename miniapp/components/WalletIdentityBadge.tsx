'use client';

import React, { useMemo } from 'react';

type WalletIdentityBadgeProps = {
  address: `0x${string}`;
  className?: string;
  label?: string;
};

export function WalletIdentityBadge({ address, className = '', label = 'Connected wallet' }: WalletIdentityBadgeProps) {
  const shortAddress = useMemo(() => `${address.slice(0, 6)}...${address.slice(-4)}`, [address]);
  const initials = useMemo(() => `${address.slice(2, 4)}${address.slice(-2)}`.toUpperCase(), [address]);

  return (
    <div className={`inline-flex items-center gap-3 rounded-2xl border border-slate-900/12 bg-white/88 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.08)] ${className}`.trim()}>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-700 to-cyan-500 font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
        {initials}
      </div>
      <div className="min-w-0">
        <button type="button" className="font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</button>
        <button type="button" className="mt-1 font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-sm font-semibold text-slate-900">{shortAddress}</button>
      </div>
    </div>
  );
}