import { useEffect, useState } from 'react';
import { GLOBAL_TX_STATUS_EVENT, type GlobalTxStatus } from '@/lib/txStatus';

export function useGlobalTxStatus() {
  const [globalTxStatus, setGlobalTxStatus] = useState<GlobalTxStatus | null>(null);

  useEffect(() => {
    const onStatus = (event: Event) => {
      const customEvent = event as CustomEvent<GlobalTxStatus>;
      setGlobalTxStatus(customEvent.detail);
    };

    window.addEventListener(GLOBAL_TX_STATUS_EVENT, onStatus as EventListener);
    return () => window.removeEventListener(GLOBAL_TX_STATUS_EVENT, onStatus as EventListener);
  }, []);

  useEffect(() => {
    if (!globalTxStatus) return;
    if (globalTxStatus.stage !== 'success' && globalTxStatus.stage !== 'error') return;

    const timeout = setTimeout(() => {
      setGlobalTxStatus((current) => {
        if (!current) return null;
        return current.updatedAt === globalTxStatus.updatedAt ? null : current;
      });
    }, globalTxStatus.stage === 'success' ? 8000 : 12000);

    return () => clearTimeout(timeout);
  }, [globalTxStatus]);

  return globalTxStatus;
}
