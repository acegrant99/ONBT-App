export type GlobalTxStage = 'pending' | 'confirming' | 'success' | 'error';

export type GlobalTxStatus = {
  source: 'token' | 'bridge' | 'staking' | 'governance' | 'private-sale';
  stage: GlobalTxStage;
  txHash?: `0x${string}`;
  errorMessage?: string;
  explorerBaseUrl?: string;
  updatedAt: number;
};

export const GLOBAL_TX_STATUS_EVENT = 'onbt:global-tx-status';

export function publishGlobalTxStatus(status: Omit<GlobalTxStatus, 'updatedAt'>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<GlobalTxStatus>(GLOBAL_TX_STATUS_EVENT, {
      detail: {
        ...status,
        updatedAt: Date.now(),
      },
    })
  );
}
