import React from 'react';
import { BridgeInterface } from './ui/BridgeInterface';
import type { FeatureSlice } from '@/features/types';

export const bridgeFeatureSlice: FeatureSlice = {
  key: 'bridge',
  label: 'Bridge',
  icon: '🌉',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <BridgeInterface />,
};
