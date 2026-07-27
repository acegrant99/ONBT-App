'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useComposeCast, useMiniKit, useOpenUrl, useViewProfile } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import type { BackendOverview } from '@/types/app-shell';

type MiniAppActionPanelProps = {
  backendOverview?: BackendOverview;
  backendRefreshing?: boolean;
};

function formatBlockNumber(value?: string) {
  if (!value) return '--';
  const block = Number(value);
  if (!Number.isFinite(block)) return value;
  return block.toLocaleString();
}

export function MiniAppActionPanel({ backendOverview, backendRefreshing = false }: MiniAppActionPanelProps) {
  const { context } = useMiniKit();
  const { composeCast, isPending: isComposingCast } = useComposeCast();
  const openUrl = useOpenUrl();
  const viewProfile = useViewProfile();
  const { address } = useAccount();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<'neutral' | 'success' | 'error'>('neutral');
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const user = context?.user;
  const client = context?.client;
  const userLabel = user?.displayName || user?.username || 'Miniapp visitor';
  const initials = userLabel
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'ON';
  const hasContext = Boolean(context);
  const hasNotificationDetails = Boolean(client?.notificationDetails);
  const isAdded = Boolean(client?.added || hasNotificationDetails);
  const shareUrl = 'https://www.nabat.finance';
  const baseHealthy = backendOverview?.chains.base.healthy;
  const arbitrumHealthy = backendOverview?.chains.arbitrum.healthy;
  const backendAgeSeconds = backendOverview?.generatedAt && now > 0
    ? Math.max(Math.floor((now - Date.parse(backendOverview.generatedAt)) / 1000), 0)
    : null;

  const statusPills = useMemo(
    () => [
      hasContext ? 'MiniKit connected' : 'Browser preview',
      isAdded ? 'Saved in Farcaster' : 'Not yet saved',
      hasNotificationDetails ? 'Notifications issued' : 'No notification token',
    ],
    [hasContext, isAdded, hasNotificationDetails]
  );

  const feedbackClassName =
    feedbackTone === 'success'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
      : feedbackTone === 'error'
        ? 'border-rose-300 bg-rose-50 text-rose-900'
        : 'border-slate-200 bg-slate-50 text-slate-700';

  const buildCastText = () => {
    const parts: string[] = [];

    // Personalized opener
    if (user?.displayName || user?.username) {
      parts.push(`${user.displayName || user.username} is tracking $ONBT omnichain.`);
    } else {
      parts.push('Tracking $ONBT omnichain via ONabat.');
    }

    // Chain health line
    const baseStatus = backendOverview?.chains.base.healthy === true ? '✅ Base' : '🔴 Base';
    const arbStatus = backendOverview?.chains.arbitrum.healthy === true ? '✅ Arb' : '🔴 Arb';
    if (backendOverview) {
      parts.push(`\n${baseStatus} · ${arbStatus} live.`);
    }

    // Wallet address hint
    if (address) {
      parts.push(`\nWallet ${address.slice(0, 6)}…${address.slice(-4)} connected.`);
    }

    parts.push('\nTrade, bridge, stake + govern ONBT in one Farcaster miniapp 👇');
    return parts.join('');
  };

    const composeCastMutation = useMutation({
      mutationFn: async () => {
        composeCast({
          text: buildCastText(),
          embeds: [shareUrl],
        });
      },
      onSuccess: () => {
        setFeedbackTone('success');
        setFeedback('Cast composer opened with an ONabat share draft.');
      },
      onError: (error) => {
        setFeedbackTone('error');
        setFeedback(error instanceof Error ? error.message : 'Unable to open the cast composer.');
      },
    });

  const handleComposeCast = () => {
    setFeedback(null);
    composeCastMutation.mutate();
  };

  return (
    <section className="action-panel reveal-up stagger-2 mb-6 rounded-3xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700"
            >
              MiniKit Actions
            </button>
            {statusPills.map((pill) => (
              <button
                key={pill}
                type="button"
                className="chip-pulse inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950"
              >
                {pill}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="mini-orb flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-700 to-cyan-400 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_24px_rgba(14,116,144,0.22)]">
              {initials}
            </div>

            {address && <WalletIdentityBadge address={address} label="Wallet" />}

            <div className="min-w-0 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-900"
              >
                {userLabel}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                {user?.fid ? `FID ${user.fid}` : 'No FID'}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                {client?.platformType ? `Client ${client.platformType}` : 'Open in Farcaster'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <button type="button" className="metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900">
              Base {baseHealthy === false ? 'Unhealthy' : baseHealthy === true ? 'Healthy' : 'Awaiting'}
              <div className="mt-1 text-xs text-slate-600">Block {formatBlockNumber(backendOverview?.chains.base.blockNumber)}</div>
            </button>
            <button type="button" className="metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900">
              Arbitrum {arbitrumHealthy === false ? 'Unhealthy' : arbitrumHealthy === true ? 'Healthy' : 'Awaiting'}
              <div className="mt-1 text-xs text-slate-600">Block {formatBlockNumber(backendOverview?.chains.arbitrum.blockNumber)}</div>
            </button>
            <button type="button" className="metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900">
              Notifications {hasNotificationDetails ? 'Ready' : 'Pending'}
              <div className="mt-1 text-xs text-slate-600">{backendRefreshing ? 'Refreshing telemetry…' : backendAgeSeconds === null ? 'Telemetry not loaded' : `Updated ${backendAgeSeconds}s ago`}</div>
            </button>
            <button type="button" className="metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900">
              Miniapp {isAdded ? 'Added' : 'Not Added'}
              <div className="mt-1 text-xs text-slate-600">{hasContext ? 'MiniKit runtime active' : 'Browser preview mode'}</div>
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 xl:w-auto xl:min-w-[250px]">
          <button
            type="button"
            onClick={() => viewProfile()}
            disabled={!user?.fid}
            className="cta-button rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            View Farcaster Profile
          </button>
          <button
            type="button"
            onClick={handleComposeCast}
            disabled={!hasContext || isComposingCast || composeCastMutation.isPending}
            className="cta-button rounded-2xl border border-cyan-300/55 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {isComposingCast || composeCastMutation.isPending ? 'Opening Cast Composer...' : 'Share ONabat in a Cast'}
          </button>
          <button
            type="button"
            onClick={() => openUrl('https://base.org/builders/minikit')}
            className="cta-button rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Open MiniKit Builder Docs
          </button>
        </div>
      </div>

      {feedback ? (
        <div className={`mt-4 rounded-2xl border px-3 py-2 text-sm ${feedbackClassName}`}>
          {feedback}
        </div>
      ) : null}
    </section>
  );
}