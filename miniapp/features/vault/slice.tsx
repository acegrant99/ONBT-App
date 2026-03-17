import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { VaultInterface } from './ui/VaultInterface';

export const vaultFeatureSlice: FeatureSlice = {
  key: 'vault',
  label: 'Vault',
  icon: '🏛️',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <VaultInterface />,
};
