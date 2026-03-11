import React from 'react';
import type { GlobalTxStatus } from '@/lib/txStatus';
import { TX_LABEL_BY_SOURCE, TX_MESSAGE_BY_STAGE } from '@/config/app-shell';

type TxStatusBannerProps = {
  status: GlobalTxStatus;
};

export function TxStatusBanner({ status }: TxStatusBannerProps) {
  const tone =
    status.stage === 'error'
      ? 'bg-red-50 border-red-200 text-red-800'
      : status.stage === 'success'
        ? 'bg-green-50 border-green-200 text-green-800'
        : 'bg-[color:var(--brand-cream)] border-[color:var(--brand-leaf)]/30 text-[color:var(--brand-ink)]';

  return (
    <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${tone}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-semibold">{TX_LABEL_BY_SOURCE[status.source]}</span>
        <span>•</span>
        <span>{TX_MESSAGE_BY_STAGE[status.stage]}</span>
        {status.txHash && status.explorerBaseUrl && (
          <a
            href={`${status.explorerBaseUrl}/tx/${status.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--brand-forest)] hover:underline"
          >
            View transaction
          </a>
        )}
      </div>
      {status.errorMessage && (
        <p className="mt-1 text-xs opacity-90">{status.errorMessage}</p>
      )}
    </div>
  );
}
