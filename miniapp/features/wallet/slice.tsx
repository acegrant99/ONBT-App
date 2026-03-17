import React from 'react';
import { WalletPanel } from './ui/WalletPanel';
import type { FeatureSlice } from '@/features/types';

export const walletFeatureSlice: FeatureSlice = {
  key: 'wallet',
  label: 'Wallet',
  icon: '👛',
  route: undefined,
  service: undefined,
  render: () => <WalletPanel />,
};
