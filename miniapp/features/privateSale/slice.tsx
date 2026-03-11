import React from 'react';
import { PrivateSaleInterface } from './ui/PrivateSaleInterface';
import type { FeatureSlice } from '@/features/types';

export const privateSaleFeatureSlice: FeatureSlice = {
  key: 'private-sale',
  label: 'Private Sale',
  icon: '🛡️',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: () => <PrivateSaleInterface />,
};
