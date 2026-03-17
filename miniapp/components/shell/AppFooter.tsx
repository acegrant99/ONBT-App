import React from 'react';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

export function AppFooter() {
  return (
    <footer className="brand-surface mt-12 rounded-t-2xl border-t border-slate-900/10 bg-white/72 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="reveal-up stagger-1 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
            <div className="flex flex-wrap gap-2">
              <button type="button" className="brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900">About ONBT</button>
              <button type="button" className="rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950">Omnichain OFT</button>
            </div>
          </div>
          <div className="reveal-up stagger-2 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
            <div className="mb-2">
              <button type="button" className="brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900">Resources</button>
            </div>
            <div className="grid gap-2">
              <MiniAppExternalLink href="https://www.nabat.finance" className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700">
                Website
              </MiniAppExternalLink>
              <MiniAppExternalLink href="https://docs.layerzero.network" className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700">
                LayerZero Docs
              </MiniAppExternalLink>
            </div>
          </div>
          <div className="reveal-up stagger-3 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
            <div className="mb-2">
              <button type="button" className="brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900">Community</button>
            </div>
            <div className="grid gap-2">
              <MiniAppExternalLink href="https://x.com/NBT_V2" className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700">
                Twitter
              </MiniAppExternalLink>
              <MiniAppExternalLink href="https://discord.gg/nabatfinance" className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700">
                Discord
              </MiniAppExternalLink>
              <MiniAppExternalLink href="https://t.me/NabatOmnichainGovernment" className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700">
                Telegram
              </MiniAppExternalLink>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-900/10 pt-8 text-center font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.12em] text-slate-500">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
            © 2026 ONabat
          </button>{' '}
          <MiniAppExternalLink href="https://base.org/builders/minikit" className="inline-flex rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-700 transition-colors hover:text-cyan-800">
            Built on Base with MiniKit
          </MiniAppExternalLink>
        </div>
      </div>
    </footer>
  );
}
