'use client';

/**
 * StakingYieldChart — recharts horizontal bar chart showing estimated APR
 * for each ONBT lockup period (sourced from on-chain LOCKUP_INFO).
 *
 * Layout: vertical BarChart (horizontal bars) with lockup period on Y axis
 * and APR% on X axis, colour-coded from light (no lockup) → deep violet (365d).
 */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const MONO = "'IBM Plex Mono', monospace";

// Derived from LOCKUP_INFO: (multiplier / 10000) * 10 = APR %
const YIELD_DATA = [
  { period: 'No lockup', apr: 10,  label: '1×',    fill: '#94a3b8' },
  { period: '30 Days',   apr: 12,  label: '1.2×',  fill: '#818cf8' },
  { period: '90 Days',   apr: 15,  label: '1.5×',  fill: '#a78bfa' },
  { period: '180 Days',  apr: 20,  label: '2×',    fill: '#8b5cf6' },
  { period: '365 Days',  apr: 30,  label: '3×',    fill: '#6d28d9' },
];

type Props = { className?: string };

export function StakingYieldChart({ className = '' }: Props) {
  return (
    <div className={`rounded-xl border border-slate-200/80 bg-white/90 p-4 ${className}`}>
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Yield Schedule
        </span>
        <span className="rounded-full border border-violet-200/60 bg-violet-50/80 px-2 py-0.5 font-['IBM_Plex_Mono'] text-[9px] font-bold uppercase tracking-wider text-violet-600">
          Base 10% APR
        </span>
      </div>

      <ResponsiveContainer width="100%" height={148}>
        <BarChart
          data={YIELD_DATA}
          layout="vertical"
          margin={{ top: 0, right: 52, bottom: 0, left: 0 }}
          barSize={14}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />

          <XAxis
            type="number"
            domain={[0, 35]}
            tick={{ fontSize: 9, fontFamily: MONO, fill: '#94a3b8' }}
            tickFormatter={(v: number) => `${v}%`}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="period"
            tick={{ fontSize: 9, fontFamily: MONO, fill: '#64748b' }}
            width={60}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            formatter={(value) => [typeof value === 'number' ? `${value}% APR` : '', 'Est. APR']}
            labelStyle={{ fontFamily: MONO, fontSize: 10, color: '#475569' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 10,
              fontFamily: MONO,
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}
          />

          <Bar dataKey="apr" radius={[0, 4, 4, 0]}>
            {YIELD_DATA.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="label"
              position="right"
              style={{ fontSize: 9, fontFamily: MONO, fill: '#64748b', fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
