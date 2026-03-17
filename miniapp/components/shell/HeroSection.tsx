'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import type { AiTakeoverPlan } from '@/types/app-shell';
import { PriceTicker } from './PriceTicker';
import { ONBT_TOKEN_ADDRESS } from '@/config/contracts';

const BENEFIT_BUTTONS = ['Trade ONBT', 'Bridge Fast', 'Stake Live', 'Vote Onchain'];
const ROUTE_BUTTONS = ['Base 8453', 'Arbitrum 42161', 'OnchainKit + Wagmi'];

type HeroSectionProps = {
  takeoverPlan?: AiTakeoverPlan;
};

export function HeroSection({ takeoverPlan }: HeroSectionProps) {
  const aiActive = Boolean(takeoverPlan?.enabled);
  const heading = aiActive
    ? takeoverPlan?.headline || 'RAYAY command mode'
    : 'Tap the ONBT flow you want.';

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-badge]', { opacity: 0, y: -8, duration: 0.35, stagger: 0.08 })
        .from('[data-hero-heading]', { opacity: 0, y: 14, duration: 0.4 }, '-=0.15')
        .from('[data-hero-cta] > *', { opacity: 0, y: 8, duration: 0.3, stagger: 0.06 }, '-=0.2')
        .from('[data-hero-ticker]', { opacity: 0, scale: 0.95, duration: 0.35 }, '-=0.15')
        .from('[data-hero-metric]', { opacity: 0, y: 10, duration: 0.32, stagger: 0.07 }, '-=0.25')
        .from('[data-hero-orb]', { opacity: 0, scale: 0.7, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`brand-hero hero-graphic mb-5 rounded-3xl p-4 sm:p-6 ${aiActive ? 'takeover-glow takeover-pulse' : ''}`}
    >
      <span className="mesh-overlay" aria-hidden="true" />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2" data-hero-badge>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-900/15 bg-white/95 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700"
            >
              LayerZero V2 Omnichain Interface
            </button>
            {aiActive && (
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800"
              >
                RAYAY Visibility Mode
              </button>
            )}
          </div>
          <button
            type="button"
            data-hero-heading
            className="brand-display max-w-3xl rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-2 text-left text-3xl font-extrabold leading-[1.02] text-slate-900 sm:text-[3.25rem]"
          >
            {heading}
          </button>
          <div className="flex flex-wrap gap-2 max-w-3xl" data-hero-cta>
            {BENEFIT_BUTTONS.map((item) => (
              <button
                key={item}
                type="button"
                className="cta-button rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Live ONBT price ticker */}
          <div data-hero-ticker>
            <PriceTicker
              tokenAddress={ONBT_TOKEN_ADDRESS as `0x${string}`}
              chainId={8453}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3 sm:text-sm lg:max-w-[520px]">
          {ROUTE_BUTTONS.map((item) => (
            <button
              key={item}
              type="button"
              data-hero-metric
              className="motion-card metric-card rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-3 text-left font-['IBM_Plex_Mono'] font-semibold text-slate-900"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none mt-3 hidden items-center justify-end lg:flex">
        <div
          data-hero-orb
          className="hero-orb relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-900/12 bg-white/85 backdrop-blur-sm"
        >
          <Image
            src="/branding/onabat-logo-light.png"
            alt="ONabat"
            width={32}
            height={32}
            className="h-8 w-8 object-contain logo-float"
            priority
          />
          <span className="hero-ring absolute inset-[-6px] rounded-full border border-cyan-300/50" />
        </div>
      </div>
    </section>
  );
}
