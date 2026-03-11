import type { GlobalTxStatus } from '@/lib/txStatus';
import { FEATURE_TABS } from '@/features';
import type { TabMeta } from '@/types/app-shell';

export const APP_TABS: TabMeta[] = [...FEATURE_TABS, { key: 'about', label: 'About', icon: 'ℹ️' }];

export const TX_LABEL_BY_SOURCE: Record<GlobalTxStatus['source'], string> = {
  token: 'Token transfer',
  bridge: 'Bridge transaction',
  staking: 'Staking transaction',
  governance: 'Governance delegation',
  'private-sale': 'Private sale transaction',
};

export const TX_MESSAGE_BY_STAGE: Record<GlobalTxStatus['stage'], string> = {
  pending: 'Awaiting wallet confirmation',
  confirming: 'Confirming onchain',
  success: 'Confirmed',
  error: 'Failed',
};
