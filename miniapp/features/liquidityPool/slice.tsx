import React from 'react';
import type { FeatureSlice } from '@/features/types';
import { LiquidityPoolInterface } from './ui/LiquidityPoolInterface';

export const liquidityPoolFeatureSlice: FeatureSlice = {
  key: 'liquidity-pool',
  label: 'Pool',
  icon: '🌊',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <LiquidityPoolInterface />,
};
