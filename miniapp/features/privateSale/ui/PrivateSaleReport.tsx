'use client';

import React, { useMemo } from 'react';
import { formatEther } from 'viem';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { usePrivateSaleEvents } from '@/hooks/usePrivateSaleEvents';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

// Well-known payment token addresses (both chains)
const KNOWN_TOKENS: Record<string, string> = {
  '0x0000000000000000000000000000000000000000': 'ETH',
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': 'USDC',  // Base USDC
  '0xfde4c96c8593536e31f229ea8f37b2ada2699bb2': 'USDT',  // Base USDT
  '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': 'USDC',  // Arb USDC (old)
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': 'USDC',  // Arb USDC (native)
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': 'USDT',  // Arb USDT
};

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function paymentLabel(addr: string) {
  return KNOWN_TOKENS[addr.toLowerCase()] ?? shortAddr(addr);
}

type Props = {
  chainId: 8453 | 42161;
  contractAddress: `0x${string}` | undefined;
  saleAllocation: bigint | undefined;
  totalSold: bigint | undefined;
};

export function PrivateSaleReport({ chainId, contractAddress, saleAllocation, totalSold }: Props) {
  const { events, loading } = usePrivateSaleEvents(chainId, contractAddress, !!contractAddress);

  const explorerBase = chainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';

  // Build cumulative chart data
  const chartData = useMemo(() => {
    type Row = { index: number; label: string; purchase: number; cumulative: number };
    return events.reduce<Row[]>((rows, ev, i) => {
      const purchased = Number(formatEther(ev.onbtOut));
      const prevCumulative = rows[i - 1]?.cumulative ?? 0;
      return [
        ...rows,
        {
          index: i + 1,
          label: `#${i + 1}`,
          purchase: Number(purchased.toFixed(2)),
          cumulative: Number((prevCumulative + purchased).toFixed(2)),
        },
      ];
    }, []);
  }, [events]);

  const allocationNum = saleAllocation ? Number(formatEther(saleAllocation)) : 0;
  const soldNum = totalSold ? Number(formatEther(totalSold)) : 0;
  const progressPct = allocationNum > 0 ? Math.min(100, (soldNum / allocationNum) * 100) : 0;

  return (
    <div className="mt-6 space-y-5 border-t border-sky-900/15 pt-5">
      {/* Section header */}
      <div className="flex flex-wrap gap-2 items-center">
        <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
          Onchain Report
        </button>
        <button type="button" className="rounded-full border border-emerald-300/50 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
          {loading
            ? 'Loading…'
            : `${events.length} Purchase${events.length !== 1 ? 's' : ''} Onchain`}
        </button>
        <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
          {chainId === 8453 ? 'Base' : 'Arbitrum'} · Last 100k blocks
        </button>
      </div>

      {/* Sale progress bar */}
      {allocationNum > 0 && (
        <div className="glass-tile p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[color:var(--brand-ink)]/70">
            <span>Sale Progress</span>
            <span>{progressPct.toFixed(2)}%</span>
          </div>
          <progress
            className="w-full h-3 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-emerald-500 [&::-webkit-progress-value]:to-teal-400 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-emerald-500"
            value={soldNum}
            max={allocationNum}
          />
          <div className="flex justify-between text-xs text-[color:var(--brand-ink)]/60">
            <span>{soldNum.toLocaleString(undefined, { maximumFractionDigits: 2 })} ONBT sold</span>
            <span>{allocationNum.toLocaleString(undefined, { maximumFractionDigits: 0 })} ONBT allocation</span>
          </div>
        </div>
      )}

      {/* Cumulative chart */}
      {chartData.length > 1 && (
        <div className="glass-tile p-4 rounded-lg">
          <button type="button" className="mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
            Cumulative ONBT Purchased
          </button>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="saleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={58}
                tickFormatter={(v: number) =>
                  v >= 1_000_000
                    ? `${(v / 1_000_000).toFixed(1)}M`
                    : v >= 1000
                      ? `${(v / 1000).toFixed(1)}k`
                      : String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                }}
                formatter={(value) => [
                  typeof value === 'number'
                    ? `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ONBT`
                    : `${String(value ?? '')} ONBT`,
                  'Cumulative',
                ]}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#059669"
                strokeWidth={2}
                fill="url(#saleGradient)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length === 1 && (
        <div className="glass-tile p-4 rounded-lg">
          <button type="button" className="rounded-full border border-emerald-300/50 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
            Chart appears with 2+ purchases
          </button>
        </div>
      )}

      {/* Purchase log */}
      {events.length > 0 && (
        <div className="glass-tile rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-sky-900/10">
            <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
              Purchase Log · newest first
            </button>
          </div>
          <div className="divide-y divide-sky-900/8 max-h-72 overflow-y-auto">
            {[...events].reverse().map((ev, i) => (
              <div
                key={`${ev.transactionHash ?? 'nohash'}-${i}`}
                className="px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 text-xs"
              >
                <span className="font-semibold text-[color:var(--brand-forest)]">
                  +{Number(formatEther(ev.onbtOut)).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{' '}
                  ONBT
                </span>
                <span className="text-[color:var(--brand-ink)]/60">
                  via {paymentLabel(ev.paymentToken)}
                </span>
                <span className="text-[color:var(--brand-ink)]/50">
                  buyer {shortAddr(ev.buyer)}
                </span>
                {ev.recipient.toLowerCase() !== ev.buyer.toLowerCase() && (
                  <span className="text-[color:var(--brand-ink)]/50">
                    → {shortAddr(ev.recipient)}
                  </span>
                )}
                {ev.transactionHash && (
                  <MiniAppExternalLink
                    href={`${explorerBase}/tx/${ev.transactionHash}`}
                    className="text-[color:var(--brand-forest)] hover:underline"
                  >
                    ↗ explorer
                  </MiniAppExternalLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && events.length === 0 && contractAddress && (
        <div className="glass-tile p-4 rounded-lg">
          <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70">
            No purchases found in recent 100k blocks
          </button>
        </div>
      )}
    </div>
  );
}
