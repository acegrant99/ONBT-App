import type { ReactNode } from 'react';
import type { QuantumPrediction, TabType } from '@/types/app-shell';

export type FeatureSliceKey = Exclude<TabType, 'about'>;

export type FeatureUiContext = {
  quantumPrediction?: QuantumPrediction;
};

export type FeatureSlice = {
  key: FeatureSliceKey;
  label: string;
  icon: string;
  route?: string;
  service?: string;
  render: (context: FeatureUiContext) => ReactNode;
};
