import React from 'react';
import type { GlobalTxStatus } from '@/lib/txStatus';
import { TX_LABEL_BY_SOURCE, TX_MESSAGE_BY_STAGE } from '@/config/app-shell';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

type TxStatusBannerProps = {
  status: GlobalTxStatus;
};

export function TxStatusBanner({ status }: TxStatusBannerProps) {
  const tone =
    status.stage === 'error'
      ? 'border-rose-300 bg-rose-50/95 text-rose-900'
      : status.stage === 'success'
        ? 'border-emerald-300 bg-emerald-50/95 text-emerald-900'
        : 'border-slate-900/12 bg-white/88 text-[color:var(--brand-ink)]';

  return (
    <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm shadow-[0_12px_26px_rgba(15,23,42,0.08)] ${tone}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold uppercase tracking-wide">{TX_LABEL_BY_SOURCE[status.source]}</button>
        <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2 py-1 font-semibold">•</button>
        <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold">{TX_MESSAGE_BY_STAGE[status.stage]}</button>
        {status.txHash && status.explorerBaseUrl && (
          <MiniAppExternalLink
            href={`${status.explorerBaseUrl}/tx/${status.txHash}`}
            className="text-cyan-700 underline-offset-2 hover:underline"
          >
            View transaction
          </MiniAppExternalLink>
        )}
      </div>
      {status.errorMessage && (
        <button type="button" className="mt-1 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-left text-xs font-semibold text-rose-700">{status.errorMessage}</button>
      )}
    </div>
  );
}
