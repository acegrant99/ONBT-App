import React from 'react';
import { GovernanceInterface } from './ui/GovernanceInterface';
import type { FeatureSlice } from '@/features/types';

export const governanceFeatureSlice: FeatureSlice = {
  key: 'governance',
  label: 'Governance',
  icon: '🏛️',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <GovernanceInterface />,
};
