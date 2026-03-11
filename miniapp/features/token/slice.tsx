import React from 'react';
import { TokenInterface } from './ui/TokenInterface';
import type { FeatureSlice } from '@/features/types';

export const tokenFeatureSlice: FeatureSlice = {
  key: 'token',
  label: 'Token',
  icon: '💰',
  route: '/api/chains/overview',
  service: '@/lib/backend/overview',
  render: ({ quantumPrediction }) => (
    <TokenInterface
      quantumSignal={quantumPrediction?.signal}
      quantumConfidence={quantumPrediction?.confidence}
    />
  ),
};
