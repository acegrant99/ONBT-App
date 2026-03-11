import React from 'react';
import { StakingInterface } from './ui/StakingInterface';
import type { FeatureSlice } from '@/features/types';

export const stakingFeatureSlice: FeatureSlice = {
  key: 'staking',
  label: 'Staking',
  icon: '🔒',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <StakingInterface />,
};
