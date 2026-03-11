export type TabType = 'token' | 'bridge' | 'staking' | 'governance' | 'private-sale' | 'about';

export type AiWalletRole = 'user' | 'deployer' | 'cdp';
export type AiWalletMode = 'auto' | AiWalletRole;

export type BackendOverview = {
  generatedAt: string;
  summary: {
    healthyChains: number;
    totalChains: number;
  };
  chains: {
    base: {
      blockNumber: string;
      healthy: boolean;
    };
    arbitrum: {
      blockNumber: string;
      healthy: boolean;
    };
  };
};

export type TabMeta = {
  key: TabType;
  label: string;
  icon: string;
};

export type QuantumPrediction = {
  generatedAt: string;
  source: string;
  mode: string;
  probabilityHealthy: number;
  confidence: number;
  signal: 'risk-on' | 'caution';
  recommendation: string;
  label: number;
  features: {
    liquidity_health: number;
    bridge_reliability: number;
    governance_participation: number;
  };
  backend: {
    healthyChains: number;
    totalChains: number;
  };
  recent: Array<{
    generatedAt: string;
    probabilityHealthy: number;
    signal: 'risk-on' | 'caution';
  }>;
};

export type AgentAdvisorMessage = {
  role: 'user' | 'assistant';
  text: string;
  at: string;
};

export type AgentAdvisorResponse = {
  ok: boolean;
  mode: 'agentkit-live' | 'agentkit-unavailable';
  summary: string;
  integrityChecks: Array<{
    label: string;
    status: 'pass' | 'warn' | 'fail';
    detail: string;
  }>;
  uxEnhancements: string[];
  availableModules: string[];
  suggestions: string[];
  messages: AgentAdvisorMessage[];
  agentkit?: {
    packageInstalled: boolean;
    credentialsConfigured: boolean;
    networkId?: string;
    cdpConfig?: {
        baseAppOwner?: string;
      projectId?: string;
      apiKeyIdKind: 'resource-name' | 'uuid' | 'other' | 'missing';
      apiKeyIdPreview?: string;
      orgIdFromApiKeyId?: string;
      apiKeyIdFromResourceName?: string;
      secretFormat: 'ec-pem' | 'pkcs8-pem' | 'base64-ed25519-like' | 'unknown' | 'missing';
      usesServerEnvOnly: boolean;
    };
    actionCount?: number;
    actionNames?: string[];
    initError?: string;
    initErrorDetails?: {
      name?: string;
      message?: string;
      code?: string | number;
      status?: number;
      type?: string;
    };
  };
  generatedAt: string;
};

export type AgentTaskResult = {
  ok: boolean;
  task: 'rate-app-quick' | 'advance-miniapp-quick';
  command: string;
  exitCode: number;
  summary: string;
  output: string;
  ranAt: string;
};

export type AgentPreflightResult = {
  ok: boolean;
  mode: 'cdp-preflight';
  credentialsPresent: boolean;
  projectReachable: boolean;
  networkId: string;
  remediationHints?: string[];
  cdpConfig?: {
    baseAppOwner?: string;
    projectId?: string;
    apiKeyIdKind: 'resource-name' | 'uuid' | 'other' | 'missing';
    apiKeyIdPreview?: string;
    orgIdFromApiKeyId?: string;
    apiKeyIdFromResourceName?: string;
    secretFormat: 'ec-pem' | 'pkcs8-pem' | 'base64-ed25519-like' | 'unknown' | 'missing';
    usesServerEnvOnly: boolean;
  };
  policyCount?: number;
  diagnostics?: {
    name?: string;
    message?: string;
    statusCode?: number;
    errorType?: string;
    correlationId?: string;
  };
  checkedAt: string;
};

export type AgentGithubScoutResult = {
  ok: boolean;
  mode: 'github-scout';
  prompt: string;
  activeTab: TabType;
  repositories: Array<{
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    topics?: string[];
  }>;
  enhancements: string[];
  searchedAt: string;
};

export type AgentEnvHealthResult = {
  ok: boolean;
  mode: 'env-health';
  summary: string;
  checks: Array<{
    key: string;
    required: boolean;
    present: boolean;
    source: 'server' | 'client';
    note?: string;
  }>;
  diagnostics?: {
    walletProofNonceStorage: 'redis' | 'memory-fallback';
  };
  checkedAt: string;
};

export type AgentDependencyHealthResult = {
  ok: boolean;
  mode: 'dependency-health';
  summary: string;
  checkedAt: string;
  criticalUpdates: Array<{
    name: string;
    current: string;
    latest: string;
    status: 'up-to-date' | 'patch-available' | 'minor-available' | 'major-available' | 'unknown';
    critical: boolean;
    notes?: string;
  }>;
  updates: Array<{
    name: string;
    current: string;
    latest: string;
    status: 'up-to-date' | 'patch-available' | 'minor-available' | 'major-available' | 'unknown';
    critical: boolean;
    notes?: string;
  }>;
  checks: Array<{
    label: string;
    status: 'pass' | 'warn' | 'fail';
    detail: string;
  }>;
};

export type AiTakeoverPlan = {
  enabled: boolean;
  focus: TabType | 'all';
  headline: string;
  subline: string;
  featuredTabs: TabType[];
};

export type AgentAccessProfileResult = {
  ok: boolean;
  mode: 'access-profile';
  connectedWallet?: string;
  selectedWalletMode: AiWalletMode;
  effectiveRole: AiWalletRole;
  reason: string;
  capabilities: {
    advisor: boolean;
    githubScout: boolean;
    takeover: boolean;
    adminTasks: boolean;
    preflight: boolean;
    envHealth: boolean;
    websiteEditor: boolean;
    abiConfigurator: boolean;
  };
  checkedAt: string;
};

export type AgentAbiConfiguratorResult = {
  ok: boolean;
  mode: 'abi-configurator';
  summary: string;
  networks: Array<{
    chainId: number;
    network: 'base' | 'arbitrum';
    contracts: Array<{
      key: string;
      address: `0x${string}`;
      functionCount: number;
      readFunctions: string[];
      writeFunctions: string[];
      detectedFeatures: string[];
    }>;
  }>;
  tabConfiguration: Array<{
    tab: TabType;
    requiredContracts: string[];
    enabledWrites: string[];
    readDependencies: string[];
    notes: string[];
  }>;
  generatedAt: string;
};

export type AgentWebsiteEditResult = {
  ok: boolean;
  mode: 'website-editor';
  targetSite: string;
  activeTab: TabType;
  title: string;
  summary: string;
  edits: Array<{
    area: string;
    objective: string;
    changes: string[];
  }>;
  deploymentNotes: string[];
  generatedAt: string;
};
