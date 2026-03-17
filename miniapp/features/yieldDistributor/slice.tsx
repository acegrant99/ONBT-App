import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { YieldDistributorInterface } from './ui/YieldDistributorInterface';

export const yieldDistributorFeatureSlice: FeatureSlice = {
  key: 'yield-distributor',
  label: 'Yield Dist.',
  icon: '💸',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <YieldDistributorInterface />,
};
