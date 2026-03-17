import type { TabMeta } from '@/types/app-shell';
import type { FeatureSlice } from '@/features/types';
import { bridgeFeatureSlice } from '@/features/bridge/slice';
import { governanceFeatureSlice } from '@/features/governance/slice';
import { privateSaleFeatureSlice } from '@/features/privateSale/slice';
import { stakingFeatureSlice } from '@/features/staking/slice';
import { tokenFeatureSlice } from '@/features/token/slice';
import { walletFeatureSlice } from '@/features/wallet/slice';

export const FEATURE_SLICES: FeatureSlice[] = [
  tokenFeatureSlice,
  bridgeFeatureSlice,
  stakingFeatureSlice,
  governanceFeatureSlice,
  privateSaleFeatureSlice,
  walletFeatureSlice,
];

export const FEATURE_TABS: TabMeta[] = FEATURE_SLICES.map((slice) => ({
  key: slice.key,
  label: slice.label,
  icon: slice.icon,
}));
