import type { AgentAbiConfiguratorResult, TabType } from '@/types/app-shell';

export type AbiRuntimeConfig = {
  sourceMode: 'abi-configurator';
  generatedAt: string;
  enabledTabs: TabType[];
  tabNotes: Record<TabType, string[]>;
};

export const ABI_RUNTIME_CONFIG_STORAGE_KEY = 'onbt:abi-runtime-config:v1';
export const ABI_RUNTIME_CONFIG_UPDATED_EVENT = 'onbt:abi-runtime-config:updated';

function dedupeTabs(tabs: TabType[]): TabType[] {
  return Array.from(new Set(tabs));
}

export function deriveAbiRuntimeConfig(payload: AgentAbiConfiguratorResult): AbiRuntimeConfig {
  const enabledFromAbi = payload.tabConfiguration
    .filter((tab) => tab.requiredContracts.length > 0 && (tab.enabledWrites.length > 0 || tab.readDependencies.length > 0))
    .map((tab) => tab.tab);

  const enabledTabs = dedupeTabs([...enabledFromAbi, 'about']);

  const tabNotes = {
    token: [] as string[],
    bridge: [] as string[],
    staking: [] as string[],
    governance: [] as string[],
    'private-sale': [] as string[],
    'defi-factory': [] as string[],
    'yield-distributor': [] as string[],
    vault: [] as string[],
    about: ['About tab is always enabled for fallback project and chain metadata.'],
    'quantum-ai': [] as string[],
    wallet: [] as string[],
    'liquidity-pool': [] as string[],
    vesting: [] as string[],
    airdrop: [] as string[],
    leaderboard: [] as string[],
  } satisfies Record<TabType, string[]>;

  for (const tabConfig of payload.tabConfiguration) {
    tabNotes[tabConfig.tab] = tabConfig.notes;
  }

  return {
    sourceMode: 'abi-configurator',
    generatedAt: payload.generatedAt,
    enabledTabs,
    tabNotes,
  };
}

export function loadAbiRuntimeConfig(): AbiRuntimeConfig | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ABI_RUNTIME_CONFIG_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AbiRuntimeConfig;
    if (!parsed || parsed.sourceMode !== 'abi-configurator' || !Array.isArray(parsed.enabledTabs)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAbiRuntimeConfig(config: AbiRuntimeConfig): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ABI_RUNTIME_CONFIG_STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent(ABI_RUNTIME_CONFIG_UPDATED_EVENT, { detail: config }));
}

export function clearAbiRuntimeConfig(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ABI_RUNTIME_CONFIG_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(ABI_RUNTIME_CONFIG_UPDATED_EVENT, { detail: null }));
}
