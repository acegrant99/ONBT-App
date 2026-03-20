import type { TabMeta } from '@/types/app-shell';
import type { FeatureSlice } from '@/features/types';
import { bridgeFeatureSlice } from '@/features/bridge/slice';
import { governanceFeatureSlice } from '@/features/governance/slice';
import { privateSaleFeatureSlice } from '@/features/privateSale/slice';
import { stakingFeatureSlice } from '@/features/staking/slice';
import { tokenFeatureSlice } from '@/features/token/slice';
import { defiFactoryFeatureSlice } from '@/features/defiFactory/slice';
import { yieldDistributorFeatureSlice } from '@/features/yieldDistributor/slice';
import { vaultFeatureSlice } from '@/features/vault/slice';
import { walletFeatureSlice } from '@/features/wallet/slice';
import { vestingFeatureSlice } from '@/features/vesting/slice';
import { airdropFeatureSlice } from '@/features/airdrop/slice';
import { liquidityPoolFeatureSlice } from '@/features/liquidityPool/slice';

export const FEATURE_SLICES: FeatureSlice[] = [
  tokenFeatureSlice,
  bridgeFeatureSlice,
  stakingFeatureSlice,
  liquidityPoolFeatureSlice,
  governanceFeatureSlice,
  privateSaleFeatureSlice,
  defiFactoryFeatureSlice,
  yieldDistributorFeatureSlice,
  vaultFeatureSlice,
  walletFeatureSlice,
  vestingFeatureSlice,
  airdropFeatureSlice,
];

export const FEATURE_TABS: TabMeta[] = FEATURE_SLICES.map((slice) => ({
  key: slice.key,
  label: slice.label,
  icon: slice.icon,
}));
