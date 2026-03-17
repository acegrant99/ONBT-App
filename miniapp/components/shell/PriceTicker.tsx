'use client';

/**
 * PriceTicker — live ONBT price widget with framer-motion flash animations.
 *
 * Shows: current USD price, 24h % change, 24h volume, a live-pulse dot.
 * Flashes green/red when the price moves between 30-second intervals.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLivePrice } from '@/hooks/useLivePrice';

type Props = {
  tokenAddress: `0x${string}`;
  chainId?: 8453 | 42161;
  className?: string;
};

function formatPrice(p: number): string {
  if (p === 0) return '0.00';
  if (p < 0.000001) return p.toExponential(4);
  if (p < 0.001) return p.toFixed(8);
  if (p < 1) return p.toFixed(6);
  return p.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function formatVolume(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}

function formatMarketCap(mc: number): string {
  if (mc >= 1_000_000_000) return `$${(mc / 1_000_000_000).toFixed(2)}B`;
  if (mc >= 1_000_000) return `$${(mc / 1_000_000).toFixed(2)}M`;
  if (mc >= 1_000) return `$${(mc / 1_000).toFixed(1)}K`;
  return mc > 0 ? `$${mc.toFixed(0)}` : '—';
}

export function PriceTicker({ tokenAddress, chainId = 8453, className = '' }: Props) {
  const { data, isFetching, isError } = useLivePrice(tokenAddress, chainId);
  const prevPriceRef = useRef<string | null>(null);
  const [flashDir, setFlashDir] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!data?.priceUsd) return;
    const prev = prevPriceRef.current;
    if (prev !== null && prev !== data.priceUsd) {
      const dir = parseFloat(data.priceUsd) > parseFloat(prev) ? 'up' : 'down';
      setFlashDir(dir);
      const t = setTimeout(() => setFlashDir(null), 1000);
      prevPriceRef.current = data.priceUsd;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = data.priceUsd;
  }, [data?.priceUsd]);

  // Loading skeleton
  if (!data && isFetching) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1 shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300" />
          <span className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  // Error / no data
  if (isError || !data) return null;

  const isPrivateSale = data.source === 'private-sale';
  const price = parseFloat(data.priceUsd);
  const change24h = data.priceChange24h;
  const isUp24h = change24h >= 0;

  const flashBg =
    flashDir === 'up'
      ? 'rgba(16,185,129,0.18)'
      : flashDir === 'down'
        ? 'rgba(239,68,68,0.15)'
        : 'rgba(255,255,255,0.92)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`inline-flex flex-wrap items-center gap-2 ${className}`}
    >
      {/* ── Price pill with flash animation ── */}
      <motion.div
        animate={{ backgroundColor: flashBg }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex items-center gap-2 rounded-full border border-slate-900/12 px-3 py-1.5 shadow-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
      >
        <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          ONBT
        </span>
        <motion.span
          key={data.priceUsd}
          initial={{ y: flashDir === 'up' ? 4 : flashDir === 'down' ? -4 : 0, opacity: 0.6 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`font-['IBM_Plex_Mono'] text-[13px] font-bold tabular-nums ${
            flashDir === 'up'
              ? 'text-emerald-700'
              : flashDir === 'down'
                ? 'text-rose-700'
                : 'text-slate-900'
          }`}
        >
          ${formatPrice(price)}
        </motion.span>
      </motion.div>

      {/* ── 24h change pill (DEX only) or Private Sale badge ── */}
      {isPrivateSale ? (
        <div className="flex items-center gap-1.5 rounded-full border border-violet-300/60 bg-violet-50/85 px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
          <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-[0.1em] text-violet-700">
            Private Sale
          </span>
        </div>
      ) : (
        <motion.div
          key={`change-${change24h}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-['IBM_Plex_Mono'] text-[11px] font-bold ${
            isUp24h
              ? 'border-emerald-300/60 bg-emerald-50/85 text-emerald-800'
              : 'border-rose-300/60 bg-rose-50/85 text-rose-800'
          }`}
        >
          <span>{isUp24h ? '▲' : '▼'}</span>
          <span>{Math.abs(change24h).toFixed(2)}%</span>
          <span className="text-[9px] opacity-60">24h</span>
        </motion.div>
      )}

      {/* ── Volume ── */}
      {data.volume24h > 0 && (
        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 sm:flex">
          <span className="font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Vol
          </span>
          <span className="font-['IBM_Plex_Mono'] text-[11px] font-bold text-slate-700">
            {formatVolume(data.volume24h)}
          </span>
        </div>
      )}

      {/* ── Market cap ── */}
      {(data.marketCap > 0 || data.fdv > 0) && (
        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 lg:flex">
          <span className="font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            MCap
          </span>
          <span className="font-['IBM_Plex_Mono'] text-[11px] font-bold text-slate-700">
            {formatMarketCap(data.marketCap || data.fdv)}
          </span>
        </div>
      )}

      {/* ── Live pulse dot ── */}
      <span className="relative inline-flex h-2.5 w-2.5" title="Live price">
        {isFetching ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
          </>
        ) : (
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        )}
      </span>
    </motion.div>
  );
}
