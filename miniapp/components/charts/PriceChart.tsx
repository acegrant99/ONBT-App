'use client';

/**
 * PriceChart — lightweight-charts v5 area chart for ONBT price history.
 *
 * Pre-DEX: renders 90 days of synthetic data at the $0.10 private sale price
 * with organic micro-noise to visualise stable price floor.
 * Once DEX pairs exist the parent can pass real OHLCV data via `data` prop.
 */
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';

type TimePoint = { time: string; value: number };

type Props = {
  /** Override with real data once token lists on DEX */
  data?: TimePoint[];
  /**
   * Tailwind height class — e.g. "h-48" (default) or "h-56".
   * Accepts any class string; pass className for full control.
   */
  heightClass?: string;
  className?: string;
};

/** Build 90 daily synthetic points at $0.10 ± tiny noise */
function buildPrivateSaleData(): TimePoint[] {
  const BASE = 0.1;
  const today = new Date(2026, 2, 16); // March 16 2026
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (89 - i));
    const dateStr = d.toISOString().slice(0, 10);
    // Deterministic micro noise so the chart looks organic but stable
    const noise = Math.sin(i * 2.7 + 1) * 0.0012 + Math.cos(i * 1.4) * 0.0009;
    return { time: dateStr, value: parseFloat((BASE + noise).toFixed(6)) };
  });
}

export function PriceChart({ data, heightClass = 'h-48', className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      crosshair: {
        vertLine: { color: 'rgba(139,92,246,0.4)', labelBackgroundColor: '#7c3aed' },
        horzLine: { color: 'rgba(139,92,246,0.4)', labelBackgroundColor: '#7c3aed' },
      },
      rightPriceScale: {
        borderColor: '#e2e8f0',
        scaleMargins: { top: 0.18, bottom: 0.12 },
      },
      timeScale: {
        borderColor: '#e2e8f0',
        timeVisible: false,
      },
      // Disable interaction for embedded views — user can't pan/zoom
      handleScroll: false,
      handleScale: false,
    });

    const area = chart.addSeries(AreaSeries, {
      lineColor: '#7c3aed',
      topColor: 'rgba(124, 58, 237, 0.22)',
      bottomColor: 'rgba(124, 58, 237, 0.0)',
      lineWidth: 2,
      priceLineVisible: true,
      priceLineColor: 'rgba(124, 58, 237, 0.5)',
    });

    area.setData(data ?? buildPrivateSaleData());
    chart.timeScale().fitContent();

    return () => { chart.remove(); };
  // Only rebuild when external data changes; private-sale data is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isPrivateSale = !data;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-violet-200/60 bg-white/90 ${heightClass} ${className}`}
    >
      <div ref={containerRef} className="absolute inset-0" />

      {/* Top-left overlay badge */}
      <div className="pointer-events-none absolute left-3 top-2 flex items-center gap-2">
        <span className="rounded-full border border-violet-300/60 bg-violet-50/90 px-2 py-0.5 font-['IBM_Plex_Mono'] text-[9px] font-bold uppercase tracking-[0.14em] text-violet-600">
          {isPrivateSale ? 'Private Sale' : 'Price'}
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[9px] text-slate-400">
          {isPrivateSale ? '$0.10 · 90d' : 'Live'}
        </span>
      </div>

      {/* Watermark */}
      {isPrivateSale && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none font-['IBM_Plex_Mono'] text-[11px] font-bold uppercase tracking-[0.2em] text-violet-200">
            PRIVATE SALE · $0.10
          </span>
        </div>
      )}
    </div>
  );
}
