import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { VestingInterface } from './ui/VestingInterface';

export const vestingFeatureSlice: FeatureSlice = {
  key: 'vesting',
  label: 'Vesting',
  icon: '🔒',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <VestingInterface />,
};
