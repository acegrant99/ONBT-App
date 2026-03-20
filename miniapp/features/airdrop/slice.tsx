import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { AirdropInterface } from './ui/AirdropInterface';

export const airdropFeatureSlice: FeatureSlice = {
  key: 'airdrop',
  label: 'Airdrop',
  icon: '🪂',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <AirdropInterface />,
};
