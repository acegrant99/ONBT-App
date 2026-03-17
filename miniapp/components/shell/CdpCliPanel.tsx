'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

const CLI_COMMANDS = [
  { icon: '🚀', label: 'Scaffold', hint: 'create-onchain', command: 'npx create-onchain --mini' },
  { icon: '🧾', label: 'Manifest', hint: 'minikit:manifest', command: 'npm run minikit:manifest' },
  { icon: '🤖', label: 'AgentKit', hint: 'wallet + actions', command: 'AgentKit.from({ walletProvider, actionProviders })' },
  { icon: '🔐', label: 'CDP Rail', hint: 'wallet providers', command: 'cdpApiActionProvider() + cdpSmartWalletActionProvider()' },
] as const;

const BENEFIT_BUTTONS = ['Scaffold Fast', 'Manifest Ready', 'CDP Wallet Rail', 'MiniKit Native'];

export function CdpCliPanel() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const copyMutation = useMutation({
    mutationFn: async (command: string) => {
      await navigator.clipboard.writeText(command);
      return command;
    },
    onSuccess: (command) => {
      setLastCopied(command);
      setTimeout(() => setLastCopied(null), 2500);
    },
    onError: () => {
      setLastCopied('__error__');
      setTimeout(() => setLastCopied(null), 2500);
    },
  });

  return (
    <section className="brand-panel reveal-up stagger-3 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
              Base CDP / CLI
            </button>
            {BENEFIT_BUTTONS.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950"
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" className="brand-display rounded-full border border-slate-900/12 bg-white px-4 py-2 text-sm font-extrabold text-slate-900">
            Official command rail
          </button>
          <div className="pulse-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <button type="button" className="inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950">
          Base-native product shell
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <button type="button" className="kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1">
            CLI Sequence
          </button>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CLI_COMMANDS.map((entry) => (
              <motion.button
                key={entry.command}
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => copyMutation.mutate(entry.command)}
                title={entry.command}
                className="visual-icon-tile w-full justify-between text-left"
              >
                <span className="inline-flex items-center gap-2">
                  <span>{entry.icon}</span>
                  <span>{entry.label}</span>
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                  lastCopied === entry.command
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-900/10 bg-slate-50 text-slate-700'
                }`}>
                  {lastCopied === entry.command ? 'copied!' : entry.hint}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <button type="button" className="kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1">
            Benefits
          </button>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BENEFIT_BUTTONS.map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -1 }}
                className="rounded-2xl border border-slate-900/10 bg-slate-50/90 px-3 py-3 text-sm font-semibold text-slate-900"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {lastCopied ? (
          <motion.div
            key={lastCopied}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`mt-4 rounded-2xl border px-3 py-2 text-sm font-semibold ${
              lastCopied === '__error__'
                ? 'border-rose-300 bg-rose-50 text-rose-800'
                : 'border-emerald-300 bg-emerald-50 text-emerald-900'
            }`}
          >
            {lastCopied === '__error__' ? 'Copy failed in this browser session.' : `Copied to clipboard`}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniAppExternalLink
          href="https://github.com/coinbase/onchainkit/tree/main/examples/minikit-example"
          className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60"
        >
          Open MiniKit example
        </MiniAppExternalLink>
        <MiniAppExternalLink
          href="https://github.com/coinbase/agentkit/tree/main/typescript/examples/langchain-cdp-smart-wallet-chatbot"
          className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60"
        >
          Open CDP smart wallet example
        </MiniAppExternalLink>
        <MiniAppExternalLink
          href="https://github.com/coinbase/onchainkit/tree/main/packages/create-onchain"
          className="rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60"
        >
          Open create-onchain CLI
        </MiniAppExternalLink>
      </div>
    </section>
  );
}