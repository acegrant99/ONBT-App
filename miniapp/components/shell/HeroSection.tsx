import React from 'react';
import Image from 'next/image';
import type { AiTakeoverPlan } from '@/types/app-shell';

type HeroSectionProps = {
  takeoverPlan?: AiTakeoverPlan;
};

export function HeroSection({ takeoverPlan }: HeroSectionProps) {
  const aiActive = Boolean(takeoverPlan?.enabled);
  const heading = aiActive
    ? takeoverPlan?.headline || 'ONBT AI is actively optimizing product visibility'
    : 'Buy, Bridge, Stake, and Govern ONBT from one miniapp';
  const subline = aiActive
    ? takeoverPlan?.subline || 'Adaptive visuals and focused feature guidance are now enabled by ONBT AI.'
    : 'Production contracts, real-time reads, and transaction-aware UX across Base and Arbitrum.';

  return (
    <section className={`brand-hero hero-graphic mb-4 rounded-2xl border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/72 p-3 sm:p-4 ${aiActive ? 'takeover-glow takeover-pulse' : ''}`}>
      <span className="mesh-overlay" aria-hidden="true" />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80 bg-[color:var(--brand-cream)]/80">
              LayerZero V2 Omnichain Interface
            </p>
            {aiActive && (
              <p className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                ONBT AI Visibility Mode
              </p>
            )}
          </div>
          <h2 className="brand-display text-xl sm:text-2xl font-semibold leading-tight max-w-3xl">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-[color:var(--brand-ink)]/70 max-w-2xl">
            {subline}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="motion-card rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)]/82 px-3 py-2">
            <p className="text-[color:var(--brand-ink)]/60">Hub Chain</p>
            <p className="font-semibold">Base (8453)</p>
          </div>
          <div className="motion-card rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)]/82 px-3 py-2">
            <p className="text-[color:var(--brand-ink)]/60">Destination</p>
            <p className="font-semibold">Arbitrum (42161)</p>
          </div>
          <div className="motion-card rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)]/82 px-3 py-2">
            <p className="text-[color:var(--brand-ink)]/60">SDK Stack</p>
            <p className="font-semibold">OnchainKit + wagmi</p>
          </div>
        </div>
      </div>

      <div className="mt-2 hidden lg:flex items-center justify-end pointer-events-none">
        <div className="hero-orb relative h-14 w-14 rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)]/60 backdrop-blur-sm flex items-center justify-center">
          <Image
            src="/branding/onabat-logo-dark.png"
            alt="ONabat"
            width={32}
            height={32}
            className="h-8 w-8 object-contain logo-float"
            priority
          />
          <span className="hero-ring absolute inset-[-6px] rounded-full border border-[color:var(--brand-leaf)]/25" />
        </div>
      </div>
    </section>
  );
}
