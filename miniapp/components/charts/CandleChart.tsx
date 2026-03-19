'use client';

/**
 * CandleChart — lightweight-charts v5 candlestick + volume chart for ONBT.
 *
 * Props
 * - `candles`   Real OHLCV bars from useOHLCVHistory (or undefined while loading).
 * - `timeframe` Used only for the badge label.
 * - `loading`   Show skeleton shimmer while data is fetching.
 * - `source`    Source label from the API ('dex' | 'unavailable' | …).
 */
import React, { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  HistogramSeries,
  type UTCTimestamp,
} from 'lightweight-charts';
import type { OHLCVBar } from '@/hooks/useOHLCVHistory';

// Precomputed skeleton bar widths (avoids inline styles)
const SKELETON_WIDTHS = [
  'w-[55%]', 'w-[72%]', 'w-[89%]', 'w-[66%]', 'w-[83%]', 'w-[60%]',
];

type Props = {
  candles?: OHLCVBar[];
  timeframe?: string;
  loading?: boolean;
  source?: string;
  heightClass?: string;
  className?: string;
};

function formatVolume(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

export function CandleChart({
  candles,
  timeframe = '1d',
  loading = false,
  source,
  heightClass = 'h-64',
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !candles?.length) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(241,245,249,0.7)' },
        horzLines: { color: 'rgba(241,245,249,0.7)' },
      },
      crosshair: {
        vertLine: { color: 'rgba(139,92,246,0.4)', labelBackgroundColor: '#7c3aed' },
        horzLine: { color: 'rgba(139,92,246,0.4)', labelBackgroundColor: '#7c3aed' },
      },
      rightPriceScale: {
        borderColor: '#e2e8f0',
        scaleMargins: { top: 0.08, bottom: 0.28 },
      },
      timeScale: {
        borderColor: '#e2e8f0',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });

    // Volume pane (bottom)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: 'rgba(124,58,237,0.18)',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });
    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    // Candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderUpColor: '#10b981',
      borderDownColor: '#f43f5e',
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    });

    const sorted = [...candles].sort((a, b) => a.time - b.time);

    candleSeries.setData(
      sorted.map((bar) => ({
        time: bar.time as UTCTimestamp,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
      }))
    );

    volumeSeries.setData(
      sorted.map((bar) => ({
        time: bar.time as UTCTimestamp,
        value: bar.volume,
        color:
          bar.close >= bar.open
            ? 'rgba(16,185,129,0.22)'
            : 'rgba(244,63,94,0.18)',
      }))
    );

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [candles]);

  const hasData = Boolean(candles?.length);
  const lastCandle = candles?.[candles.length - 1];
  const isUp = lastCandle ? lastCandle.close >= lastCandle.open : true;
  const isDex = source === 'dex';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-violet-200/60 bg-white/90 ${heightClass} ${className}`}
    >
      {/* Candle chart canvas */}
      {hasData && <div ref={containerRef} className="absolute inset-0" />}

      {/* Loading skeleton */}
      {loading && !hasData && (
        <div className="absolute inset-0 flex flex-col gap-2 p-3">
          {SKELETON_WIDTHS.map((w, i) => (
            <div
              key={i}
              className={`h-3 animate-pulse rounded bg-slate-100 ${w}`}
            />
          ))}
        </div>
      )}

      {/* No data / pre-DEX placeholder */}
      {!loading && !hasData && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest text-slate-400">
            DEX data unavailable
          </span>
          <span className="text-[11px] text-slate-300">
            Chart will populate after ONBT lists on DEX
          </span>
        </div>
      )}

      {/* Top-left overlay */}
      {hasData && (
        <div className="pointer-events-none absolute left-3 top-2 flex items-center gap-2">
          <span className="rounded-full border border-violet-300/60 bg-violet-50/90 px-2 py-0.5 font-['IBM_Plex_Mono'] text-[9px] font-bold uppercase tracking-[0.14em] text-violet-600">
            {timeframe.toUpperCase()} Candles
          </span>
          {isDex && (
            <span className="rounded-full border border-emerald-300/60 bg-emerald-50/90 px-2 py-0.5 font-['IBM_Plex_Mono'] text-[9px] font-semibold text-emerald-700">
              DexScreener
            </span>
          )}
        </div>
      )}

      {/* Top-right price summary */}
      {lastCandle && (
        <div className="pointer-events-none absolute right-3 top-2 flex items-center gap-2">
          <span
            className={`font-['IBM_Plex_Mono'] text-[11px] font-bold ${
              isUp ? 'text-emerald-600' : 'text-rose-500'
            }`}
          >
            ${lastCandle.close.toFixed(6)}
          </span>
          {lastCandle.volume > 0 && (
            <span className="font-['IBM_Plex_Mono'] text-[9px] text-slate-400">
              vol {formatVolume(lastCandle.volume)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
