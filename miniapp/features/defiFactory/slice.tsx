import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { DefiFactoryInterface } from './ui/DefiFactoryInterface';

export const defiFactoryFeatureSlice: FeatureSlice = {
  key: 'defi-factory',
  label: 'DeFi Factory',
  icon: '🏭',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <DefiFactoryInterface />,
};
