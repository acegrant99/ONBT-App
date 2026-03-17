'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { useAccount, useSignMessage } from 'wagmi';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import type {
  AgentAccessProfileResult,
  AgentAdvisorMessage,
  AgentCloudDeployResult,
  AgentQpandaTaskResult,
  AgentDependencyHealthResult,
  AiTakeoverPlan,
  AiWalletMode,
  AgentEnvHealthResult,
  AgentGithubScoutResult,
  AgentWebsiteEditResult,
  AgentAbiConfiguratorResult,
  AgentPreflightResult,
  AgentAdvisorResponse,
  AgentTaskResult,
  AgentStrategyLabResult,
  QuantumDiagnosticsSnapshot,
  QuantumPrediction,
  TabType,
} from '@/types/app-shell';

type QuantumAgentKitPanelProps = {
  activeTab: TabType;
  prediction?: QuantumPrediction;
  takeoverEnabled?: boolean;
  onActivateTakeover?: (plan: AiTakeoverPlan) => void;
  onDeactivateTakeover?: () => void;
  onApplyAbiConfiguration?: (payload: AgentAbiConfiguratorResult) => void;
  onResetAbiConfiguration?: () => void;
};

export function QuantumAgentKitPanel({
  activeTab,
  prediction,
  takeoverEnabled = false,
  onActivateTakeover,
  onDeactivateTakeover,
  onApplyAbiConfiguration,
  onResetAbiConfiguration,
}: QuantumAgentKitPanelProps) {
  const DEPENDENCY_CHECK_INTERVAL_MS = 5 * 60 * 1000;
  const AUTO_TAKEOVER_CONFIDENCE_THRESHOLD = 0.72;
  const AUTO_TAKEOVER_CONFIDENCE_FALLBACK = 0.8;
  const agentkitAdminToken =
    process.env.NEXT_PUBLIC_AGENTKIT_ADMIN_TOKEN ||
    process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN ||
    'QuantumLayer';
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<AgentAdvisorMessage[]>([]);
  const [response, setResponse] = useState<AgentAdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunningTask, setIsRunningTask] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [taskResult, setTaskResult] = useState<AgentTaskResult | null>(null);
  const [preflight, setPreflight] = useState<AgentPreflightResult | null>(null);
  const [githubScout, setGithubScout] = useState<AgentGithubScoutResult | null>(null);
  const [envHealth, setEnvHealth] = useState<AgentEnvHealthResult | null>(null);
  const [dependencyHealth, setDependencyHealth] = useState<AgentDependencyHealthResult | null>(null);
  const [websiteEdit, setWebsiteEdit] = useState<AgentWebsiteEditResult | null>(null);
  const [abiConfig, setAbiConfig] = useState<AgentAbiConfiguratorResult | null>(null);
  const [strategyLab, setStrategyLab] = useState<AgentStrategyLabResult | null>(null);
  const [cloudDeploy, setCloudDeploy] = useState<AgentCloudDeployResult | null>(null);
  const [qpandaTask, setQpandaTask] = useState<AgentQpandaTaskResult | null>(null);
  const [qpandaShots, setQpandaShots] = useState('1024');
  const [qpandaChipId, setQpandaChipId] = useState('');
  const [qpandaTaskIdInput, setQpandaTaskIdInput] = useState('');
  const [qpandaOriginIr, setQpandaOriginIr] = useState('');
  const [qpandaDescribe, setQpandaDescribe] = useState('ONBT Bell-state check');
  const [qpandaWaitResult, setQpandaWaitResult] = useState(false);
  const [quantumDiagnostics, setQuantumDiagnostics] = useState<QuantumDiagnosticsSnapshot | null>(null);
  const [autoStrategyEnabled, setAutoStrategyEnabled] = useState(false);
  const [dependencyClockMs, setDependencyClockMs] = useState(() => Date.now());
  const [autoTakeoverEnabled, setAutoTakeoverEnabled] = useState(false);
  const [autoTakeoverStatus, setAutoTakeoverStatus] = useState<string | null>(null);
  const [walletMode, setWalletMode] = useState<AiWalletMode>('auto');
  const [accessProfile, setAccessProfile] = useState<AgentAccessProfileResult | null>(null);
  const [accessLoading, setAccessLoading] = useState(false);
  const lastAutoTakeoverKey = useRef('');
  const lastAutoStrategyKey = useRef('');

  // QPanda preset selector
  const [qpandaPreset, setQpandaPreset] = useState('bell');

  // Wallet creator state
  const [showWalletCreator, setShowWalletCreator] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [generatedWallet, setGeneratedWallet] = useState<{ address: string; privateKey: string } | null>(null);
  const [privateKeyVisible, setPrivateKeyVisible] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  const [savedWallets, setSavedWallets] = useState<Array<{ name: string; address: string; createdAt: string }>>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { address: connectedWallet } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const toSafeHeaderValue = (value: string) =>
    value
      .replace(/[\r\n]/g, '')
      .replace(/[^\x20-\xFF]/g, '')
      .trim();

  const buildSafeHeaders = (headers: Record<string, string>) => {
    const sanitized = Object.entries(headers).reduce<Record<string, string>>((acc, [key, value]) => {
      const safeValue = toSafeHeaderValue(String(value || ''));
      if (safeValue) {
        acc[key] = safeValue;
      }
      return acc;
    }, {});

    return sanitized;
  };

  const buildWalletProofMessage = (input: {
    walletAddress: string;
    method: string;
    path: string;
    purpose: string;
    timestamp: string;
    nonce: string;
  }) => {
    return [
      'RAYAY privileged action authorization',
      `Wallet: ${input.walletAddress}`,
      `Method: ${input.method.toUpperCase()}`,
      `Path: ${input.path}`,
      `Purpose: ${input.purpose}`,
      `Timestamp: ${input.timestamp}`,
      `Nonce: ${input.nonce}`,
    ].join('\n');
  };

  const createNonce = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  const buildPrivilegedHeaders = async (params: {
    method: 'GET' | 'POST';
    path: string;
    purpose: string;
  }) => {
    if (!connectedWallet) {
      throw new Error('Connect your privileged wallet before running this action.');
    }

    const timestamp = Date.now().toString();
    const nonce = createNonce();
    const message = buildWalletProofMessage({
      walletAddress: connectedWallet,
      method: params.method,
      path: params.path,
      purpose: params.purpose,
      timestamp,
      nonce,
    });

    const signature = await signMessageAsync({ message });
    return buildSafeHeaders({
      'x-ai-wallet-address': connectedWallet,
      'x-ai-wallet-signature': signature,
      'x-ai-wallet-timestamp': timestamp,
      'x-ai-wallet-nonce': nonce,
      'x-ai-wallet-purpose': params.purpose,
    });
  };

  const quickPrompts = useMemo(() => {
    if (activeTab === 'bridge') {
      return [
        'Audit bridge UX integrity and suggest safer defaults.',
        'Recommend ABI actions to reduce bridge failure rates.',
      ];
    }
    if (activeTab === 'staking') {
      return [
        'Check staking UX integrity and reward clarity.',
        'Suggest safer staking flows using current quantum posture.',
      ];
    }
    return [
      'Audit miniapp integrity based on installed node modules.',
      'Propose UX enhancements for the current tab using quantum context.',
    ];
  }, [activeTab]);

  const deriveFeaturedTabs = (focus: TabType, enhancements: string[] = []): TabType[] => {
    const tabs: TabType[] = [focus];
    const blob = enhancements.join(' ').toLowerCase();
    const maybeAdd = (tab: TabType, keyword: string) => {
      if (blob.includes(keyword) && !tabs.includes(tab)) {
        tabs.push(tab);
      }
    };

    maybeAdd('bridge', 'bridge');
    maybeAdd('staking', 'staking');
    maybeAdd('governance', 'governance');
    maybeAdd('token', 'token');
    maybeAdd('private-sale', 'sale');

    if (!tabs.includes('bridge')) tabs.push('bridge');
    if (!tabs.includes('staking')) tabs.push('staking');

    return tabs.slice(0, 4);
  };

  const autoApplyTakeover = useCallback((
    scoutData: AgentGithubScoutResult | null,
    currentPrediction?: QuantumPrediction
  ) => {
    if (!currentPrediction) {
      setAutoTakeoverStatus('Auto mode waiting for quantum signal data.');
      return;
    }

    const confidence = currentPrediction.confidence;
    const hasScoutSignal = Boolean(
      scoutData && (scoutData.enhancements.length >= 2 || scoutData.repositories.length >= 3)
    );

    const threshold = hasScoutSignal
      ? AUTO_TAKEOVER_CONFIDENCE_THRESHOLD
      : AUTO_TAKEOVER_CONFIDENCE_FALLBACK;

    if (confidence < threshold) {
      setAutoTakeoverStatus(
        `Auto mode armed, waiting for confidence >= ${(threshold * 100).toFixed(0)}%. Current ${(confidence * 100).toFixed(0)}%.`
      );
      return;
    }

    const featuredTabs = deriveFeaturedTabs(activeTab, scoutData?.enhancements || []);
    const summaryHint = (scoutData?.enhancements || [])[0];
    const confidencePct = `${(confidence * 100).toFixed(0)}%`;
    const key = `${activeTab}:${confidencePct}:${scoutData?.searchedAt || 'no-scout'}`;

    if (lastAutoTakeoverKey.current === key) {
      return;
    }

    lastAutoTakeoverKey.current = key;
    onActivateTakeover?.({
      enabled: true,
      focus: activeTab,
      headline: `RAYAY auto-takeover engaged for ${activeTab === 'private-sale' ? 'private sale' : activeTab} (${confidencePct} confidence)`,
      subline:
        summaryHint ||
        'Visibility routing is now auto-tuned by RAYAY based on quantum confidence and stack intelligence.',
      featuredTabs,
    });
    setAutoTakeoverStatus(
      `Auto mode activated takeover at ${confidencePct} confidence${hasScoutSignal ? ' with GitHub scout signals' : ''}.`
    );
  }, [activeTab, onActivateTakeover]);

  useEffect(() => {
    if (!autoTakeoverEnabled) return;
    autoApplyTakeover(githubScout, prediction);
  }, [autoTakeoverEnabled, githubScout, prediction, activeTab, autoApplyTakeover]);

  useEffect(() => {
    loadSavedWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resolveAccessProfile = async () => {
      setAccessLoading(true);
      try {
        const apiResponse = await fetch('/api/agentkit/access-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletAddress: connectedWallet,
            selectedWalletMode: walletMode,
          }),
        });

        if (!apiResponse.ok) {
          throw new Error(`Access profile failed with status ${apiResponse.status}`);
        }

        const payload = (await apiResponse.json()) as AgentAccessProfileResult;
        setAccessProfile(payload);
      } catch (profileError) {
        setAccessProfile({
          ok: true,
          mode: 'access-profile',
          connectedWallet,
          selectedWalletMode: walletMode,
          effectiveRole: 'user',
          reason: profileError instanceof Error ? profileError.message : 'Access profile unavailable; using user-safe mode.',
          capabilities: {
            advisor: true,
            githubScout: true,
            takeover: false,
            adminTasks: false,
            preflight: false,
            envHealth: false,
            websiteEditor: false,
            abiConfigurator: false,
            cloudDeploy: false,
            quantumTasks: false,
          },
          checkedAt: new Date().toISOString(),
        });
      } finally {
        setAccessLoading(false);
      }
    };

    void resolveAccessProfile();
  }, [connectedWallet, walletMode]);

  const canUse = {
    advisor: accessProfile?.capabilities.advisor ?? true,
    githubScout: accessProfile?.capabilities.githubScout ?? true,
    takeover: accessProfile?.capabilities.takeover ?? false,
    adminTasks: accessProfile?.capabilities.adminTasks ?? false,
    preflight: accessProfile?.capabilities.preflight ?? false,
    envHealth: accessProfile?.capabilities.envHealth ?? false,
    websiteEditor: accessProfile?.capabilities.websiteEditor ?? false,
    abiConfigurator: accessProfile?.capabilities.abiConfigurator ?? false,
    cloudDeploy: accessProfile?.capabilities.cloudDeploy ?? false,
    quantumTasks: accessProfile?.capabilities.quantumTasks ?? false,
  };

  const accessLevel = accessLoading ? 'resolving' : (accessProfile?.effectiveRole || 'user');
  const accessLevelClass =
    accessLevel === 'deployer'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
      : accessLevel === 'cdp'
        ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
        : accessLevel === 'resolving'
          ? 'border-amber-300 bg-amber-50 text-amber-900'
          : 'border-slate-300 bg-slate-50 text-slate-800';

  const capabilityLabelMap: Record<keyof typeof canUse, string> = {
    advisor: 'Advisor',
    githubScout: 'GitHub Scout',
    takeover: 'Takeover',
    adminTasks: 'Integrity Tasks',
    preflight: 'CDP Preflight',
    envHealth: 'Env Health',
    websiteEditor: 'Website Planner',
    abiConfigurator: 'ABI Config Sync',
    cloudDeploy: 'Cloud Deploy',
    quantumTasks: 'Quantum Tasks',
  };

  const enabledCapabilities = (Object.keys(canUse) as Array<keyof typeof canUse>)
    .filter((key) => canUse[key])
    .map((key) => capabilityLabelMap[key]);

  const criticalDependencyCount = dependencyHealth?.criticalUpdates?.length || 0;
  const dependencyLastCheckedMs = dependencyHealth ? new Date(dependencyHealth.checkedAt).getTime() : 0;
  const dependencyNextCheckMs = dependencyLastCheckedMs
    ? dependencyLastCheckedMs + DEPENDENCY_CHECK_INTERVAL_MS
    : 0;
  const dependencyCheckLagMs = dependencyLastCheckedMs
    ? Math.max(0, dependencyClockMs - dependencyLastCheckedMs)
    : 0;
  const dependencyCheckAgeMinutes = Math.floor(dependencyCheckLagMs / 60000);
  const dependencyCheckIsStale = dependencyCheckLagMs > DEPENDENCY_CHECK_INTERVAL_MS * 2;

  const denySensitiveAction = (feature: string) => {
    setError(
      `${feature} is restricted to CDP/Deployer wallets. User wallets can still use advisor and GitHub scout functions.`
    );
  };

  const runAdvisor = async (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextMessages: AgentAdvisorMessage[] = [
        ...messages,
        {
          role: 'user',
          text: userText,
          at: new Date().toISOString(),
        },
      ];

      const apiResponse = await fetch('/api/agentkit/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userText,
          activeTab,
          quantum: prediction
            ? {
                signal: prediction.signal,
                confidence: prediction.confidence,
                recommendation: prediction.recommendation,
              }
            : undefined,
          history: messages,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Advisor request failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentAdvisorResponse;
      setResponse(payload);
      setMessages(payload.messages || nextMessages);
      setPrompt('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to run advisor');
    } finally {
      setIsLoading(false);
    }
  };

  const runTask = async (task: 'rate-app-quick' | 'advance-miniapp-quick') => {
    if (!canUse.adminTasks) {
      denySensitiveAction('Integrity and upgrade scans');
      return;
    }

    const parsedShots = Number.parseInt(qpandaShots || '1024', 10);
    const safeShots = Number.isFinite(parsedShots)
      ? Math.max(1, Math.min(20000, parsedShots))
      : 1024;

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/integrity',
        purpose: 'integrity-task',
      });

      const apiResponse = await fetch('/api/agentkit/integrity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
        body: JSON.stringify({ task }),
      });

      if (!apiResponse.ok) {
        const failure = await apiResponse.json().catch(() => null) as { error?: string; retryAfterSeconds?: number } | null;
        const retrySuffix =
          failure?.retryAfterSeconds ? ` Retry in ${failure.retryAfterSeconds}s.` : '';
        throw new Error((failure?.error || `Integrity task failed with status ${apiResponse.status}`) + retrySuffix);
      }

      const payload = (await apiResponse.json()) as AgentTaskResult;
      setTaskResult(payload);
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : 'Failed to run integrity task');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runPreflight = async () => {
    if (!canUse.preflight) {
      denySensitiveAction('CDP preflight');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/preflight',
        purpose: 'cdp-preflight',
      });

      const apiResponse = await fetch('/api/agentkit/preflight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `Preflight failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentPreflightResult;
      setPreflight(payload);
    } catch (preflightError) {
      setError(preflightError instanceof Error ? preflightError.message : 'Failed to run CDP preflight');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runGithubScout = async (autoApply = false) => {
    if (!canUse.githubScout) {
      denySensitiveAction('GitHub scout');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const scoutPrompt =
        prompt.trim() ||
        'Find high-quality Web3 repos and stack enhancements for ONBT miniapp frontend/backend architecture';

      const apiResponse = await fetch('/api/agentkit/github-scout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: scoutPrompt,
          activeTab,
        }),
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `GitHub scout failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentGithubScoutResult;
      setGithubScout(payload);
      if (autoApply) {
        if (!canUse.takeover) {
          denySensitiveAction('Auto takeover apply');
          return;
        }
        autoApplyTakeover(payload, prediction);
      }
    } catch (scoutError) {
      setError(scoutError instanceof Error ? scoutError.message : 'Failed to run GitHub scout');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runEnvHealth = async () => {
    if (!canUse.envHealth) {
      denySensitiveAction('Environment health');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'GET',
        path: '/api/agentkit/env-health',
        purpose: 'env-health',
      });

      const apiResponse = await fetch('/api/agentkit/env-health', {
        method: 'GET',
        headers: {
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `Env health failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentEnvHealthResult;
      setEnvHealth(payload);
    } catch (healthError) {
      setError(healthError instanceof Error ? healthError.message : 'Failed to run env health check');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runDependencyHealth = async (silent = false) => {
    if (!silent) {
      setIsRunningTask(true);
      setError(null);
    }

    try {
      const apiResponse = await fetch('/api/agentkit/dependency-health', {
        method: 'GET',
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `Dependency health failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentDependencyHealthResult;
      setDependencyHealth(payload);
    } catch (dependencyError) {
      if (!silent) {
        setError(dependencyError instanceof Error ? dependencyError.message : 'Failed to run dependency health check');
      }
    } finally {
      if (!silent) {
        setIsRunningTask(false);
      }
    }
  };

  useEffect(() => {
    void runDependencyHealth(true);
    const intervalId = window.setInterval(() => {
      void runDependencyHealth(true);
    }, DEPENDENCY_CHECK_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const clockId = window.setInterval(() => {
      setDependencyClockMs(Date.now());
    }, 30 * 1000);

    return () => window.clearInterval(clockId);
  }, []);

  const runWebsiteEditor = async () => {
    if (!canUse.websiteEditor) {
      denySensitiveAction('Website edit planning');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/website-editor',
        purpose: 'website-editor',
      });

      const apiResponse = await fetch('/api/agentkit/website-editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
        body: JSON.stringify({
          prompt: prompt.trim() || 'Create splendid feature upgrades for nabat.finance',
          activeTab,
          targetSite: 'https://www.nabat.finance',
        }),
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `Website editor failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentWebsiteEditResult;
      setWebsiteEdit(payload);
    } catch (websiteError) {
      setError(websiteError instanceof Error ? websiteError.message : 'Failed to generate website edit plan');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runAbiConfigurator = async () => {
    if (!canUse.abiConfigurator) {
      denySensitiveAction('ABI configurator');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'GET',
        path: '/api/agentkit/abi-configurator',
        purpose: 'abi-configurator',
      });

      const apiResponse = await fetch('/api/agentkit/abi-configurator', {
        method: 'GET',
        headers: {
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `ABI configurator failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentAbiConfiguratorResult;
      setAbiConfig(payload);
      onApplyAbiConfiguration?.(payload);
    } catch (abiError) {
      setError(abiError instanceof Error ? abiError.message : 'Failed to run ABI configurator');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runCloudDeploy = async (action: 'deploy' | 'status' | 'list' = 'deploy') => {
    if (!canUse.cloudDeploy) {
      denySensitiveAction('Cloud Deploy');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/cloud-deploy',
        purpose: 'cloud-deploy',
      });

      const apiResponse = await fetch('/api/agentkit/cloud-deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
        body: JSON.stringify({
          action,
          deploymentId: action === 'status' && cloudDeploy?.deploymentId
            ? cloudDeploy.deploymentId
            : undefined,
        }),
      });

      const payload = (await apiResponse.json()) as AgentCloudDeployResult;
      setCloudDeploy(payload);

      if (!apiResponse.ok && !payload.ok) {
        setError(payload.message || `Cloud deploy failed with status ${apiResponse.status}`);
      }
    } catch (deployError) {
      setError(deployError instanceof Error ? deployError.message : 'Cloud deploy request failed');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runQpandaTask = async (action: 'submit' | 'query' = 'submit') => {
    if (!canUse.quantumTasks) {
      denySensitiveAction('Quantum task submission');
      return;
    }

    const parsedShots = Number.parseInt(qpandaShots || '1024', 10);
    const safeShots = Number.isFinite(parsedShots)
      ? Math.max(1, Math.min(20000, parsedShots))
      : 1024;

    const resolvedTaskId = (qpandaTaskIdInput || qpandaTask?.taskId || '').trim();

    if (action === 'query' && !resolvedTaskId) {
      setError('No QPanda task id available. Paste one in Task ID or submit a task first.');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/quantum/qpanda',
        purpose: 'quantum-qpanda',
      });

      const apiResponse = await fetch('/api/quantum/qpanda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(safeAdminToken ? { 'x-agentkit-admin-token': safeAdminToken } : {}),
          ...walletProofHeaders,
        },
        body: JSON.stringify({
          action,
          taskId: action === 'query' ? resolvedTaskId : undefined,
          shots: safeShots,
          chipId: qpandaChipId.trim() || undefined,
          originIr: qpandaOriginIr.trim() || undefined,
          describe: qpandaDescribe.trim() || undefined,
          waitResult: qpandaWaitResult,
        }),
      });

      const payload = (await apiResponse.json()) as AgentQpandaTaskResult;
      setQpandaTask(payload);
      if (payload.taskId) {
        setQpandaTaskIdInput(payload.taskId);
      }

      if (!apiResponse.ok && !payload.ok) {
        setError(payload.error || `QPanda request failed with status ${apiResponse.status}`);
      }
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : 'QPanda request failed');
    } finally {
      setIsRunningTask(false);
    }
  };

  const runStrategyLab = async (silent = false) => {
    if (!silent) {
      setIsRunningTask(true);
      setError(null);
    }

    try {
      const apiResponse = await fetch('/api/agentkit/strategy-lab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activeTab,
          quantum: prediction
            ? {
                signal: prediction.signal,
                confidence: prediction.confidence,
                recommendation: prediction.recommendation,
                confidenceEngine: prediction.confidenceEngine,
              }
            : undefined,
        }),
      });

      if (!apiResponse.ok) {
        const failure = (await apiResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(failure?.error || `Strategy lab failed with status ${apiResponse.status}`);
      }

      const payload = (await apiResponse.json()) as AgentStrategyLabResult;
      setStrategyLab(payload);
    } catch (strategyError) {
      if (!silent) {
        setError(strategyError instanceof Error ? strategyError.message : 'Failed to run strategy lab');
      }
    } finally {
      if (!silent) {
        setIsRunningTask(false);
      }
    }
  };

  const executeStrategyAction = async (actionId: AgentStrategyLabResult['actionPlan'][number]['id']) => {
    if (actionId === 'dependency-health') {
      await runDependencyHealth(false);
      return;
    }

    if (actionId === 'github-scout') {
      await runGithubScout(false);
      return;
    }

    if (actionId === 'advisor-transfer-safety') {
      await runAdvisor(
        'Focus on transfer safety cues, allowance visibility, and recipient validation. Keep normal UX friction but preserve high-risk confirmations.'
      );
      return;
    }

    if (actionId === 'abi-sync') {
      await runAbiConfigurator();
      return;
    }

    if (actionId === 'preflight') {
      await runPreflight();
    }
  };

  const snapshotQuantumDiagnostics = () => {
    if (!prediction) {
      setError('Quantum prediction not available yet. Retry after next signal refresh.');
      return;
    }

    setError(null);
    setQuantumDiagnostics({
      capturedAt: new Date().toISOString(),
      confidence: prediction.confidence,
      signal: prediction.signal,
      recommendation: prediction.recommendation,
      components: prediction.confidenceEngine?.components,
    });
  };

  useEffect(() => {
    if (!autoStrategyEnabled || !prediction) return;
    const key = `${activeTab}:${prediction.signal}:${prediction.confidence.toFixed(3)}`;
    if (lastAutoStrategyKey.current === key) return;
    lastAutoStrategyKey.current = key;
    void runStrategyLab(true);
  }, [autoStrategyEnabled, activeTab, prediction]);

  // ─── Circuit presets ────────────────────────────────────────────────────────
  const CIRCUIT_PRESETS: Record<string, { label: string; ir: string }> = {
    bell: {
      label: 'Bell State (2-qubit entanglement)',
      ir: 'QINIT 2\nCREG 2\nH q[0]\nCNOT q[0],q[1]\nMEASURE q[0],c[0]\nMEASURE q[1],c[1]',
    },
    ghz: {
      label: 'GHZ State (3-qubit entanglement)',
      ir: 'QINIT 3\nCREG 3\nH q[0]\nCNOT q[0],q[1]\nCNOT q[0],q[2]\nMEASURE q[0],c[0]\nMEASURE q[1],c[1]\nMEASURE q[2],c[2]',
    },
    rotation: {
      label: 'Single Qubit Rotation (Ry π/2)',
      ir: 'QINIT 1\nCREG 1\nRY(1.5707963) q[0]\nMEASURE q[0],c[0]',
    },
    grover: {
      label: 'Grover Search (2-qubit)',
      ir: 'QINIT 2\nCREG 2\nH q[0]\nH q[1]\nX q[0]\nX q[1]\nH q[1]\nCNOT q[0],q[1]\nH q[1]\nX q[0]\nX q[1]\nH q[0]\nH q[1]\nMEASURE q[0],c[0]\nMEASURE q[1],c[1]',
    },
    custom: { label: 'Custom OriginIR', ir: '' },
  };

  const applyCircuitPreset = (presetKey: string) => {
    setQpandaPreset(presetKey);
    const preset = CIRCUIT_PRESETS[presetKey];
    if (preset && preset.ir) {
      setQpandaOriginIr(preset.ir);
    } else if (presetKey === 'custom') {
      // keep existing IR for user editing
    }
  };

  // ─── Wallet creator helpers ─────────────────────────────────────────────────
  const loadSavedWallets = () => {
    try {
      const raw = localStorage.getItem('rayay_named_wallets');
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{ name: string; address: string; createdAt: string }>;
        if (Array.isArray(parsed)) {
          setSavedWallets(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  };

  const generateNewWallet = () => {
    const pk = generatePrivateKey();
    const account = privateKeyToAccount(pk);
    setGeneratedWallet({ address: account.address, privateKey: pk });
    setPrivateKeyVisible(false);
    setWalletSaved(false);
  };

  const saveWallet = () => {
    if (!generatedWallet || !walletName.trim()) return;
    const entry = {
      name: walletName.trim(),
      address: generatedWallet.address,
      createdAt: new Date().toISOString(),
    };
    const existing: Array<{ name: string; address: string; createdAt: string }> = (() => {
      try {
        const raw = localStorage.getItem('rayay_named_wallets');
        if (raw) return JSON.parse(raw) as Array<{ name: string; address: string; createdAt: string }>;
      } catch { /* empty */ }
      return [];
    })();
    const updated = [entry, ...existing];
    localStorage.setItem('rayay_named_wallets', JSON.stringify(updated));
    setSavedWallets(updated);
    setWalletSaved(true);
    setGeneratedWallet(null);
    setWalletName('');
    setPrivateKeyVisible(false);
  };

  const forgetWallet = (address: string) => {
    const updated = savedWallets.filter((w) => w.address !== address);
    localStorage.setItem('rayay_named_wallets', JSON.stringify(updated));
    setSavedWallets(updated);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(id);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch { /* ignore */ }
  };

  const activateTakeover = () => {
    if (!canUse.takeover) {
      denySensitiveAction('Takeover controls');
      return;
    }

    const focusTab = activeTab;
    const featuredTabs: TabType[] = focusTab === 'about' ? ['bridge', 'staking', 'governance'] : [focusTab, 'bridge', 'staking'];
    onActivateTakeover?.({
      enabled: true,
      focus: focusTab,
      headline: `RAYAY is amplifying ${focusTab === 'private-sale' ? 'private sale' : focusTab} visibility for growth`,
      subline: 'High-impact modules are promoted and CTAs are tuned for stronger discovery and conversion.',
      featuredTabs,
    });
  };

  // ─── Wallet creator view (early return) ────────────────────────────────────
  if (showWalletCreator) {
    return (
      <section className="mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/80 p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => setShowWalletCreator(false)}
              className="flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[color:var(--brand-ink)]/80 hover:border-slate-400"
            >
              ← Back to AI Advisor
            </button>
            <h2 className="mt-2 text-sm font-semibold text-[color:var(--brand-ink)]/90">My Quantum Wallets</h2>
            <p className="text-[11px] text-[color:var(--brand-ink)]/60">Generate new wallets, name them, and keep track of your addresses right here.</p>
          </div>
        </div>

        {/* Create new wallet */}
        <div className="mb-4 rounded-xl border border-[color:var(--brand-leaf)]/30 bg-white/70 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/70">
              Create Wallet
            </span>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-xs font-semibold text-[color:var(--brand-ink)]/75">Wallet Name</label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="e.g. Trading Wallet, Savings, DeFi Pool..."
              className="w-full rounded-md border border-[color:var(--brand-leaf)]/35 bg-white px-3 py-2 text-sm text-[color:var(--brand-ink)] placeholder:text-[color:var(--brand-ink)]/40 focus:outline-none focus:ring-1 focus:ring-[color:var(--brand-leaf)]/50"
              maxLength={48}
            />
          </div>

          <button
            type="button"
            onClick={generateNewWallet}
            className="rounded-lg border border-[color:var(--brand-leaf)]/50 bg-[color:var(--brand-cream)] px-4 py-2 text-sm font-semibold text-[color:var(--brand-forest)] hover:border-[color:var(--brand-forest)]/60 hover:bg-[color:var(--brand-cream)]/80"
          >
            Generate New Wallet
          </button>

          {generatedWallet && (
            <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full border border-emerald-400 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">New Wallet Generated</span>
              </div>

              {/* Address */}
              <div className="mb-2">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700/70">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-emerald-900 break-all">
                    {generatedWallet.address}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copyToClipboard(generatedWallet.address, `addr-${generatedWallet.address}`)}
                    className="shrink-0 rounded-md border border-emerald-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                  >
                    {copiedAddress === `addr-${generatedWallet.address}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Private key reveal */}
              <div className="mb-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700/70">Private Key</p>
                <div className="rounded-md border border-amber-300 bg-amber-50 p-2 text-[11px] text-amber-800">
                  ⚠ Your private key controls this wallet. Store it safely and never share it. It will not be saved by RAYAY.
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {privateKeyVisible ? (
                    <code className="flex-1 rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-emerald-900 break-all">
                      {generatedWallet.privateKey}
                    </code>
                  ) : (
                    <div className="flex-1 rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-[color:var(--brand-ink)]/40 select-none">
                      {'•'.repeat(64)}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setPrivateKeyVisible((v) => !v)}
                    className="shrink-0 rounded-md border border-emerald-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                  >
                    {privateKeyVisible ? 'Hide' : 'Reveal'}
                  </button>
                  {privateKeyVisible && (
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(generatedWallet.privateKey, `pk-${generatedWallet.address}`)}
                      className="shrink-0 rounded-md border border-emerald-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                    >
                      {copiedAddress === `pk-${generatedWallet.address}` ? 'Copied!' : 'Copy Key'}
                    </button>
                  )}
                </div>
              </div>

              {/* Save */}
              <button
                type="button"
                onClick={saveWallet}
                disabled={!walletName.trim()}
                className="rounded-lg border border-[color:var(--brand-forest)]/50 bg-[color:var(--brand-forest)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-forest)]/15 disabled:opacity-50"
              >
                Save Wallet{walletName.trim() ? ` "${walletName.trim()}"` : ' (enter a name first)'}
              </button>
            </div>
          )}

          {walletSaved && !generatedWallet && (
            <div className="mt-3 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              Wallet saved! You can find it in your list below.
            </div>
          )}
        </div>

        {/* Saved wallets list */}
        <div className="rounded-xl border border-[color:var(--brand-leaf)]/25 bg-white/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/70">
              Saved Wallets ({savedWallets.length})
            </span>
            <button
              type="button"
              onClick={loadSavedWallets}
              className="text-[11px] font-semibold text-[color:var(--brand-ink)]/50 hover:text-[color:var(--brand-ink)]"
            >
              Refresh
            </button>
          </div>

          {savedWallets.length === 0 ? (
            <p className="text-xs text-[color:var(--brand-ink)]/50">No wallets saved yet. Generate one above to get started.</p>
          ) : (
            <div className="space-y-2">
              {savedWallets.map((wallet) => (
                <div key={wallet.address} className="rounded-lg border border-[color:var(--brand-leaf)]/20 bg-white px-3 py-2">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[color:var(--brand-ink)]/90">{wallet.name}</span>
                    <span className="text-[10px] text-[color:var(--brand-ink)]/45">{new Date(wallet.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate text-[11px] text-[color:var(--brand-ink)]/70">
                      {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                    </code>
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(wallet.address, `saved-${wallet.address}`)}
                      className="shrink-0 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {copiedAddress === `saved-${wallet.address}` ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      type="button"
                      onClick={() => forgetWallet(wallet.address)}
                      className="shrink-0 rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/80 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm sm:text-base font-semibold">RAYAY AgentKit Integrity Advisor</button>
          <button type="button" className="mt-1 rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/65">
            RAYAY interactive component for integrity assurance and UX upgrades from your current module stack.
          </button>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${
            response?.mode === 'agentkit-live'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'border-amber-300 bg-amber-50 text-amber-800'
          }`}
        >
          {response?.mode === 'agentkit-live' ? 'AgentKit Live' : 'AgentKit Advisory'}
        </span>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${accessLevelClass}`}>
          Access: {accessLevel === 'resolving' ? 'Resolving...' : accessLevel.toUpperCase()}
        </span>
        {dependencyHealth && (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
              criticalDependencyCount > 0
                ? 'border-rose-300 bg-rose-50 text-rose-900'
                : 'border-emerald-300 bg-emerald-50 text-emerald-900'
            }`}
          >
            {criticalDependencyCount > 0
              ? `${criticalDependencyCount} critical package update${criticalDependencyCount === 1 ? '' : 's'}`
              : 'No critical package updates'}
          </span>
        )}
        <button
          type="button"
          onClick={() => { setShowWalletCreator(true); setGeneratedWallet(null); setWalletSaved(false); }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)] hover:border-[color:var(--brand-forest)]/50"
        >
          My Wallets
        </button>
      </div>

      <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-3 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/85">
            AI Wallet Toggle
          </button>
          <select
            id="ai-wallet-mode"
            aria-label="AI Wallet Toggle"
            title="AI Wallet Toggle"
            value={walletMode}
            onChange={(event) => setWalletMode(event.target.value as AiWalletMode)}
            className="rounded-md border border-[color:var(--brand-leaf)]/30 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]"
          >
            <option value="auto">Auto Detect</option>
            <option value="cdp">CDP Wallet Mode</option>
            <option value="deployer">Deployer Wallet Mode</option>
            <option value="user">User Safe Mode</option>
          </select>
          <span className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80">
            Role: {accessLoading ? 'resolving...' : (accessProfile?.effectiveRole || 'user')}
          </span>
          <span className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80">
            Wallet: {connectedWallet ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}` : 'not connected'}
          </span>
        </div>
        <button type="button" className="mt-1 rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
          {accessProfile?.reason || 'User-safe mode is active until wallet role is resolved.'}
        </button>
        <div className="mt-2 flex flex-wrap gap-1">
          {enabledCapabilities.map((capability) => (
            <button
              key={capability}
              type="button"
              className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80"
            >
              {capability}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {quickPrompts.map((quick) => (
          <button
            key={quick}
            type="button"
            onClick={() => void runAdvisor(quick)}
            className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45"
          >
            {quick}
          </button>
        ))}
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <button
          type="button"
          onClick={() => activateTakeover()}
          disabled={!canUse.takeover}
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500"
        >
          {takeoverEnabled ? 'Refresh RAYAY Takeover' : 'Activate RAYAY Takeover'}
        </button>

        <button
          type="button"
          onClick={() => onDeactivateTakeover?.()}
          disabled={!takeoverEnabled || !canUse.takeover}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-50"
        >
          Deactivate Takeover
        </button>

        <button
          type="button"
          onClick={() => void runTask('rate-app-quick')}
          disabled={isRunningTask || !canUse.adminTasks}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run Integrity Scan'}
        </button>

        <button
          type="button"
          onClick={() => void runTask('advance-miniapp-quick')}
          disabled={isRunningTask || !canUse.adminTasks}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run UX Upgrade Scan'}
        </button>

        <button
          type="button"
          onClick={() => void runPreflight()}
          disabled={isRunningTask || !canUse.preflight}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run CDP Preflight'}
        </button>

        <button
          type="button"
          onClick={() => void runGithubScout(false)}
          disabled={isRunningTask}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'GitHub Usecase Scout'}
        </button>

        <button
          type="button"
          onClick={() => void runGithubScout(true)}
          disabled={isRunningTask || !canUse.takeover}
          className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-left text-xs font-semibold text-indigo-900 hover:border-indigo-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Scout + Auto Apply'}
        </button>

        <button
          type="button"
          onClick={() => void runEnvHealth()}
          disabled={isRunningTask || !canUse.envHealth}
          className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run Env Health'}
        </button>

        <button
          type="button"
          onClick={() => void runDependencyHealth(false)}
          disabled={isRunningTask}
          className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-2 text-left text-xs font-semibold text-orange-900 hover:border-orange-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run Dependency Health'}
        </button>

        <button
          type="button"
          onClick={() => void runWebsiteEditor()}
          disabled={isRunningTask || !canUse.websiteEditor}
          className="rounded-lg border border-fuchsia-300 bg-fuchsia-50 px-3 py-2 text-left text-xs font-semibold text-fuchsia-900 hover:border-fuchsia-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Edit Nabat.finance Plan'}
        </button>

        <button
          type="button"
          onClick={() => void runCloudDeploy('deploy')}
          disabled={isRunningTask || !canUse.cloudDeploy}
          className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-left text-xs font-semibold text-sky-900 hover:border-sky-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Deploying...' : '🚀 Deploy to Cloud'}
        </button>

        <button
          type="button"
          onClick={() => void runCloudDeploy('list')}
          disabled={isRunningTask || !canUse.cloudDeploy}
          className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-left text-xs font-semibold text-sky-800 hover:border-sky-400 disabled:opacity-60"
        >
          {isRunningTask ? 'Loading...' : 'List Deployments'}
        </button>

        <div className="col-span-full rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white px-4 py-3">
          {/* Admin panel header */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-900">Quantum Circuit Lab</span>
              <span className="rounded-full border border-emerald-400 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                Admin Only
              </span>
            </div>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                canUse.quantumTasks
                  ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                  : 'border-rose-300 bg-rose-100 text-rose-700'
              }`}
            >
              {canUse.quantumTasks ? 'Deployer Access Active' : 'Deployer Access Required'}
            </span>
          </div>

          {!canUse.quantumTasks && (
            <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
              QPanda tasks require deployer-level access. Switch wallet mode to <strong>Deployer</strong> or connect an authorized deployer wallet.
            </div>
          )}

          {/* Circuit preset selector */}
          <div className="mb-3">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-emerald-800/70">
              Circuit Preset
            </label>
            <select
              aria-label="Circuit preset"
              value={qpandaPreset}
              onChange={(e) => applyCircuitPreset(e.target.value)}
              className="w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs text-[color:var(--brand-ink)] focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              {Object.entries(CIRCUIT_PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>{preset.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Left: Circuit configuration */}
            <div className="rounded-lg border border-emerald-200 bg-white/70 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-800/70">Circuit Configuration</p>

              <div className="mb-2">
                <label className="mb-1 block text-[11px] font-semibold text-[color:var(--brand-ink)]/70">OriginIR Code</label>
                <textarea
                  aria-label="OriginIR circuit code"
                  title="OriginIR circuit code"
                  value={qpandaOriginIr}
                  onChange={(event) => { setQpandaOriginIr(event.target.value); setQpandaPreset('custom'); }}
                  className="h-28 w-full rounded-md border border-emerald-200 bg-emerald-50/30 px-2 py-1.5 font-mono text-[11px] text-[color:var(--brand-ink)]/90 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder={'QINIT 2\nCREG 2\nH q[0]\nCNOT q[0],q[1]\nMEASURE q[0],c[0]\nMEASURE q[1],c[1]'}
                  spellCheck={false}
                />
              </div>

              <div className="mb-2">
                <label className="mb-1 block text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
                  Shots <span className="font-normal text-[color:var(--brand-ink)]/50">(measurement runs)</span>
                </label>
                <input
                  type="number"
                  aria-label="Number of shots"
                  title="Number of shots"
                  min={1}
                  step={1}
                  value={qpandaShots}
                  onChange={(event) => setQpandaShots(event.target.value)}
                  className="w-full rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-[color:var(--brand-ink)]/90 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="1024"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
                  Chip ID <span className="font-normal text-[color:var(--brand-ink)]/50">(optional)</span>
                </label>
                <input
                  type="text"
                  aria-label="Quantum chip ID"
                  title="Quantum chip ID"
                  value={qpandaChipId}
                  onChange={(event) => setQpandaChipId(event.target.value)}
                  className="w-full rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-[color:var(--brand-ink)]/90 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="e.g. OriginQ-72"
                />
              </div>
            </div>

            {/* Right: Task management */}
            <div className="rounded-lg border border-emerald-200 bg-white/70 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-800/70">Task Management</p>

              <div className="mb-2">
                <label className="mb-1 block text-[11px] font-semibold text-[color:var(--brand-ink)]/70">Task Description</label>
                <input
                  type="text"
                  aria-label="Task description"
                  title="Task description"
                  value={qpandaDescribe}
                  onChange={(event) => setQpandaDescribe(event.target.value)}
                  className="w-full rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-[color:var(--brand-ink)]/90 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="e.g. ONBT Bell-state check"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
                  Query Task ID <span className="font-normal text-[color:var(--brand-ink)]/50">(for status check)</span>
                </label>
                <input
                  type="text"
                  aria-label="Task ID for query"
                  title="Task ID for query"
                  value={qpandaTaskIdInput}
                  onChange={(event) => setQpandaTaskIdInput(event.target.value)}
                  className="w-full rounded-md border border-emerald-200 bg-white px-2 py-1.5 text-xs text-[color:var(--brand-ink)]/90 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="Paste task ID to check status"
                />
              </div>

              <label className="mb-3 flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  aria-label="Wait for final result on submit"
                  title="Sync mode: wait for result"
                  checked={qpandaWaitResult}
                  onChange={(event) => setQpandaWaitResult(event.target.checked)}
                  className="h-4 w-4 rounded border-emerald-300 text-emerald-600"
                />
                <span className="text-[11px] font-semibold text-[color:var(--brand-ink)]/80">
                  Sync mode — wait for final result on submit
                </span>
              </label>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => void runQpandaTask('submit')}
                  disabled={isRunningTask || !canUse.quantumTasks}
                  className="w-full rounded-lg border border-emerald-400 bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {isRunningTask ? '⏳ Submitting...' : 'Submit Circuit to QPanda'}
                </button>
                <button
                  type="button"
                  onClick={() => void runQpandaTask('query')}
                  disabled={isRunningTask || !canUse.quantumTasks || (!qpandaTask?.taskId && !qpandaTaskIdInput.trim())}
                  className="w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRunningTask ? '⏳ Querying...' : 'Query Task Status'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void runAbiConfigurator()}
          disabled={isRunningTask || !canUse.abiConfigurator}
          className="rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-left text-xs font-semibold text-cyan-900 hover:border-cyan-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Sync ABI Config (Base+Arb)'}
        </button>

        <button
          type="button"
          onClick={() => void runStrategyLab()}
          disabled={isRunningTask}
          className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-left text-xs font-semibold text-violet-900 hover:border-violet-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Run Strategy Lab'}
        </button>

        <button
          type="button"
          onClick={() => {
            setAutoStrategyEnabled((prev) => {
              const next = !prev;
              if (next) {
                setAutoTakeoverStatus('Auto Strategy enabled. Strategy Lab will rerun on tab/signal changes.');
              } else {
                setAutoTakeoverStatus('Auto Strategy disabled.');
              }
              return next;
            });
          }}
          className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
            autoStrategyEnabled
              ? 'border-violet-400 bg-violet-100 text-violet-900 hover:border-violet-600'
              : 'border-violet-300 bg-violet-50 text-violet-900 hover:border-violet-500'
          }`}
        >
          Auto Strategy: {autoStrategyEnabled ? 'ON' : 'OFF'}
        </button>

        <button
          type="button"
          onClick={() => snapshotQuantumDiagnostics()}
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500"
        >
          Snapshot Quantum Diagnostics
        </button>

        <button
          type="button"
          onClick={() => onResetAbiConfiguration?.()}
          className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-900 hover:border-slate-500"
        >
          Reset ABI Config
        </button>

        <button
          type="button"
          onClick={() => {
            setAutoTakeoverEnabled((prev) => !prev);
            if (autoTakeoverEnabled) {
              setAutoTakeoverStatus('Auto mode disabled. Manual takeover controls remain available.');
            } else {
              setAutoTakeoverStatus('Auto mode enabled. RAYAY will auto-activate takeover when thresholds are met.');
            }
          }}
          disabled={!canUse.takeover}
          className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
            autoTakeoverEnabled
              ? 'border-emerald-400 bg-emerald-50 text-emerald-900 hover:border-emerald-600'
              : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-500'
          }`}
        >
          Auto Visibility: {autoTakeoverEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {takeoverEnabled && (
        <div className="mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
          RAYAY Takeover is active. Graphics and feature visibility are being amplified.
        </div>
      )}

      {autoTakeoverStatus && (
        <div className="mb-3 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs text-indigo-900">
          {autoTakeoverStatus}
        </div>
      )}

      <div className="mb-3 flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask the advisor to audit integrity or improve UX for this tab..."
          className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-3 py-2 text-sm"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void runAdvisor(prompt);
            }
          }}
        />
        <button
          type="button"
          onClick={() => void runAdvisor(prompt)}
          disabled={isLoading || !prompt.trim()}
          className="brand-button rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {error}
        </div>
      )}

      {response && (
        <>
          <div className="mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-xs sm:text-sm text-[color:var(--brand-ink)]/85">
            {response.summary}
          </div>

          {response.agentkit && (
            <div className="mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
              <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">AgentKit Capabilities</button>
              <div className="mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85">
                <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Package installed: {response.agentkit.packageInstalled ? 'yes' : 'no'}</button>
                <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Credentials configured: {response.agentkit.credentialsConfigured ? 'yes' : 'no'}</button>
                <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Network: {response.agentkit.networkId || '--'}</button>
                <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Actions discovered: {response.agentkit.actionCount ?? 0}</button>
              </div>
              {response.agentkit.cdpConfig && (
                <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                  <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">CDP Wiring</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Project ID: {response.agentkit.cdpConfig.projectId || '--'}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Base App owner: {response.agentkit.cdpConfig.baseAppOwner || '--'}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">API key kind: {response.agentkit.cdpConfig.apiKeyIdKind}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">API key: {response.agentkit.cdpConfig.apiKeyIdPreview || '--'}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Org from key: {response.agentkit.cdpConfig.orgIdFromApiKeyId || '--'}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Key id from resource: {response.agentkit.cdpConfig.apiKeyIdFromResourceName || '--'}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Secret format: {response.agentkit.cdpConfig.secretFormat}</button>
                  <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Server env only: {response.agentkit.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'}</button>
                </div>
              )}
              {response.agentkit.initError && (
                <div className="mt-1 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800">
                  <button type="button" className="w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold">Init error: {response.agentkit.initError}</button>
                  {response.agentkit.initErrorDetails && (
                    <button type="button" className="mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold">
                      {response.agentkit.initErrorDetails.name ? `${response.agentkit.initErrorDetails.name} ` : ''}
                      {response.agentkit.initErrorDetails.code !== undefined ? `code=${response.agentkit.initErrorDetails.code} ` : ''}
                      {response.agentkit.initErrorDetails.status !== undefined ? `status=${response.agentkit.initErrorDetails.status} ` : ''}
                      {response.agentkit.initErrorDetails.type ? `type=${response.agentkit.initErrorDetails.type}` : ''}
                    </button>
                  )}
                </div>
              )}
              {(response.agentkit.actionNames || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {(response.agentkit.actionNames || []).map((name) => (
                    <button
                      key={name}
                      type="button"
                      className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {response.integrityChecks.map((check) => (
              <div
                key={check.label}
                className={`rounded-lg border px-3 py-2 text-xs ${
                  check.status === 'pass'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : check.status === 'warn'
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                }`}
              >
                <button type="button" className="rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold">{check.label}</button>
                <button type="button" className="mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold">{check.detail}</button>
              </div>
            ))}
          </div>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
              <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">UX Enhancements</button>
              <ul className="mt-1 space-y-1 text-xs text-[color:var(--brand-ink)]/85">
                {response.uxEnhancements.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
              <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Agent Suggestions</button>
              <ul className="mt-1 space-y-1 text-xs text-[color:var(--brand-ink)]/85">
                {response.suggestions.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {taskResult && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Task Result</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{taskResult.summary}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/65">
            Task: {taskResult.task} | Exit: {taskResult.exitCode}
          </button>
          {taskResult.output && (
            <pre className="mt-2 max-h-44 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 p-2 text-[11px] text-[color:var(--brand-ink)]/80">
              {taskResult.output}
            </pre>
          )}
        </div>
      )}

      {preflight && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">CDP Preflight</button>
          <div className="mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85">
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Credentials present: {preflight.credentialsPresent ? 'yes' : 'no'}</button>
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Project reachable: {preflight.projectReachable ? 'yes' : 'no'}</button>
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Network: {preflight.networkId}</button>
            <button type="button" className="rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Policy count: {preflight.policyCount ?? 0}</button>
          </div>
          {preflight.cdpConfig && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Resolved Config</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Project ID: {preflight.cdpConfig.projectId || '--'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Base App owner: {preflight.cdpConfig.baseAppOwner || '--'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">API key kind: {preflight.cdpConfig.apiKeyIdKind}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">API key: {preflight.cdpConfig.apiKeyIdPreview || '--'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Org from key: {preflight.cdpConfig.orgIdFromApiKeyId || '--'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Key id from resource: {preflight.cdpConfig.apiKeyIdFromResourceName || '--'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Secret format: {preflight.cdpConfig.secretFormat}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">Server env only: {preflight.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'}</button>
            </div>
          )}
          {preflight.diagnostics && (
            <div className="mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800">
              <button type="button" className="w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold">{preflight.diagnostics.message || 'Preflight diagnostic details available.'}</button>
              <button type="button" className="mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold">
                {preflight.diagnostics.name ? `${preflight.diagnostics.name} ` : ''}
                {preflight.diagnostics.statusCode !== undefined ? `status=${preflight.diagnostics.statusCode} ` : ''}
                {preflight.diagnostics.errorType ? `type=${preflight.diagnostics.errorType} ` : ''}
                {preflight.diagnostics.correlationId ? `corr=${preflight.diagnostics.correlationId}` : ''}
              </button>
            </div>
          )}
          {(preflight.remediationHints || []).length > 0 && (
            <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-900">
              <button type="button" className="font-semibold rounded-full border border-amber-300 bg-white px-2.5 py-1">Recommended Fixes</button>
              <ul className="mt-1 space-y-1">
                {(preflight.remediationHints || []).map((hint) => (
                  <li key={hint}>- {hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {githubScout && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">GitHub Usecase Scout</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">Prompt: {githubScout.prompt}</button>

          {(githubScout.enhancements || []).length > 0 && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Stack Enhancements</button>
              <ul className="mt-1 space-y-1">
                {(githubScout.enhancements || []).map((hint) => (
                  <li key={hint}>- {hint}</li>
                ))}
              </ul>
            </div>
          )}

          {(githubScout.repositories || []).length > 0 && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Top Repositories</button>
              <ul className="mt-1 space-y-1">
                {githubScout.repositories.map((repo) => (
                  <li key={repo.full_name}>
                    <MiniAppExternalLink
                      href={repo.html_url}
                      rel="noreferrer"
                      className="font-medium text-[color:var(--brand-forest)] underline-offset-2 hover:underline"
                    >
                      {repo.full_name}
                    </MiniAppExternalLink>{' '}
                    ({repo.stargazers_count} stars{repo.language ? `, ${repo.language}` : ''})
                    {repo.description ? ` - ${repo.description}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {envHealth && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Environment Health</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{envHealth.summary}</button>
          {envHealth.diagnostics?.walletProofNonceStorage && (
            <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75">Wallet proof nonce storage: {envHealth.diagnostics.walletProofNonceStorage}</button>
          )}
          <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {envHealth.checks.map((check) => (
              <div
                key={check.key}
                className={`rounded-md border px-2 py-1 text-xs ${
                  check.present
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : check.required
                      ? 'border-rose-300 bg-rose-50 text-rose-900'
                      : 'border-amber-300 bg-amber-50 text-amber-900'
                }`}
              >
                <button type="button" className="rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold">{check.key}</button>
                <button type="button" className="mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold">
                  {check.present ? 'present' : check.required ? 'missing (required)' : 'missing (optional)'} | {check.source}
                </button>
                {check.note && <button type="button" className="mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold">{check.note}</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {dependencyHealth && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Dependency Integrity</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{dependencyHealth.summary}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/65">Last checked: {new Date(dependencyHealth.checkedAt).toLocaleString()}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
            Next auto-check:{' '}
            {dependencyNextCheckMs ? new Date(dependencyNextCheckMs).toLocaleTimeString() : 'pending'}
            {' | '}Snapshot age: {dependencyCheckAgeMinutes}m
          </button>
          {dependencyCheckIsStale && (
            <button type="button" className="mt-1 w-full rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-left text-[11px] font-semibold text-amber-900">
              Integrity snapshot is stale. Run Dependency Health now to refresh package risk status.
            </button>
          )}

          <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-3">
            {dependencyHealth.checks.map((check) => (
              <div
                key={check.label}
                className={`rounded-md border px-2 py-1 text-xs ${
                  check.status === 'pass'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : check.status === 'warn'
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                }`}
              >
                <button type="button" className="rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold">{check.label}</button>
                <button type="button" className="mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold">{check.detail}</button>
              </div>
            ))}
          </div>

          {(dependencyHealth.featurePacks || []).length > 0 && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-2 text-xs text-[color:var(--brand-ink)]/85">
              <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Splendid Feature Packs</button>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(dependencyHealth.featurePacks || []).map((pack) => {
                  const badgeClass =
                    pack.status === 'ready'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                      : pack.status === 'partial'
                        ? 'border-amber-300 bg-amber-50 text-amber-900'
                        : 'border-slate-300 bg-slate-50 text-slate-800';

                  return (
                    <div
                      key={pack.key}
                      className="rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/85 px-2 py-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">{pack.title}</button>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeClass}`}>
                          {Math.round(pack.coverage * 100)}% {pack.status}
                        </span>
                      </div>
                      <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/75">{pack.objective}</button>
                      <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70">
                        Installed {pack.installedCount}/{pack.dependencies.length}: {pack.dependencies.join(', ')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(dependencyHealth.criticalUpdates || []).length > 0 ? (
            <div className="mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-900">
              <button type="button" className="font-semibold rounded-full border border-rose-300 bg-white px-2.5 py-1">Critical Package Updates</button>
              <ul className="mt-1 space-y-1">
                {dependencyHealth.criticalUpdates.map((update) => (
                  <li key={update.name}>
                    {update.name}: {update.current}{' -> '}{update.latest} ({update.status})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-2 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-900">
              No critical package updates detected.
            </div>
          )}
        </div>
      )}

      {quantumDiagnostics && (
        <div className="mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-emerald-900 rounded-full border border-emerald-300 bg-white px-2.5 py-1">Quantum Diagnostics Snapshot</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-emerald-900">
            Signal: <span className="font-semibold">{quantumDiagnostics.signal}</span>
            {' | '}Confidence: <span className="font-semibold">{(quantumDiagnostics.confidence * 100).toFixed(1)}%</span>
          </button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-emerald-900/90">{quantumDiagnostics.recommendation}</button>
          {quantumDiagnostics.components && (
            <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-5">
              <div className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900">margin {(quantumDiagnostics.components.modelMargin * 100).toFixed(0)}%</div>
              <div className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900">consensus {(quantumDiagnostics.components.featureConsensus * 100).toFixed(0)}%</div>
              <div className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900">stability {(quantumDiagnostics.components.temporalStability * 100).toFixed(0)}%</div>
              <div className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900">backend {(quantumDiagnostics.components.backendReliability * 100).toFixed(0)}%</div>
              <div className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900">trend {(quantumDiagnostics.components.trendAlignment * 100).toFixed(0)}%</div>
            </div>
          )}
          <button type="button" className="mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-emerald-900/70">Captured: {new Date(quantumDiagnostics.capturedAt).toLocaleString()}</button>
        </div>
      )}

      {strategyLab && (
        <div className="mb-3 rounded-lg border border-violet-300 bg-violet-50 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-violet-900 rounded-full border border-violet-300 bg-white px-2.5 py-1">Strategy Lab</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-violet-900">Objective: {strategyLab.objective}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-violet-900/90">{strategyLab.recommendation}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-violet-900/80">
            Confidence {(strategyLab.confidence * 100).toFixed(1)}% | Weak components: {strategyLab.diagnostics.weakComponents.join(', ') || 'none'}
          </button>

          {(strategyLab.actionPlan || []).length > 0 && (
            <div className="mt-2 rounded-md border border-violet-300 bg-white px-2 py-2 text-xs text-violet-900">
              <button type="button" className="font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1">One-Click Actions</button>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {strategyLab.actionPlan.map((action) => (
                  <div key={action.id} className="rounded-md border border-violet-300 bg-violet-50/50 px-2 py-1.5">
                    <button type="button" className="font-semibold rounded-full border border-violet-300 bg-white px-2.5 py-1">{action.label}</button>
                    <button type="button" className="mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-violet-900/85">{action.reason}</button>
                    <button
                      type="button"
                      onClick={() => void executeStrategyAction(action.id)}
                      disabled={isRunningTask}
                      className="mt-2 rounded-md border border-violet-400 bg-white px-2 py-1 text-[11px] font-semibold text-violet-900 hover:bg-violet-100 disabled:opacity-60"
                    >
                      {isRunningTask ? 'Running...' : 'Execute'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900">
              <button type="button" className="font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1">Quick Wins</button>
              <ul className="mt-1 space-y-1">
                {strategyLab.quickWins.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900">
              <button type="button" className="font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1">Growth Bets</button>
              <ul className="mt-1 space-y-1">
                {strategyLab.growthBets.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900">
              <button type="button" className="font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1">Risk Guards</button>
              <ul className="mt-1 space-y-1">
                {strategyLab.riskGuards.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {websiteEdit && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Website Edit Plan</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{websiteEdit.summary}</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/70">Target: {websiteEdit.targetSite}</button>

          <div className="mt-2 space-y-2">
            {websiteEdit.edits.map((entry) => (
              <div key={entry.area} className="rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">{entry.area}</button>
                <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">{entry.objective}</button>
                <ul className="mt-1 space-y-1">
                  {entry.changes.map((change) => (
                    <li key={change}>- {change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {abiConfig && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">ABI Config Sync</button>
          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{abiConfig.summary}</button>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {abiConfig.networks.map((network) => (
              <div key={network.network} className="rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">{network.network.toUpperCase()} ({network.chainId})</button>
                <ul className="mt-1 space-y-1">
                  {network.contracts.map((contract) => (
                    <li key={`${network.network}-${contract.key}`}>
                      {contract.key} {contract.address.slice(0, 6)}...{contract.address.slice(-4)} | fn: {contract.functionCount} | features: {contract.detectedFeatures.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
            <button type="button" className="font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Tab Configuration</button>
            <ul className="mt-1 space-y-1">
              {abiConfig.tabConfiguration.map((entry) => (
                <li key={entry.tab}>
                  {entry.tab}: contracts [{entry.requiredContracts.join(', ')}] | writes [{entry.enabledWrites.join(', ') || 'none'}]
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {cloudDeploy && (
        <div className={`mb-3 rounded-lg border px-3 py-2 ${
          cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered'
            ? 'border-sky-300 bg-sky-50'
            : cloudDeploy.status === 'no-credentials'
              ? 'border-amber-300 bg-amber-50'
              : cloudDeploy.status === 'error'
                ? 'border-rose-300 bg-rose-50'
                : 'border-sky-200 bg-white'
        }`}>
          <div className="flex items-center gap-2">
            <button type="button" className="text-[11px] uppercase tracking-wide text-sky-700/70 rounded-full border border-sky-300 bg-white px-2.5 py-1">
              Cloud Deploy — {cloudDeploy.platform.toUpperCase()}
            </button>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
              cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered'
                ? 'bg-sky-100 text-sky-800'
                : cloudDeploy.status === 'error'
                  ? 'bg-rose-100 text-rose-800'
                  : cloudDeploy.status === 'no-credentials'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
            }`}>
              {cloudDeploy.status}
            </span>
          </div>

          <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">{cloudDeploy.message}</button>

          {cloudDeploy.deploymentUrl && (
            <MiniAppExternalLink
              href={cloudDeploy.deploymentUrl}
              className="mt-1 inline-block text-xs font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              {cloudDeploy.deploymentUrl}
            </MiniAppExternalLink>
          )}

          {cloudDeploy.buildLogsUrl && (
            <MiniAppExternalLink
              href={cloudDeploy.buildLogsUrl}
              className="mt-1 ml-3 inline-block text-xs text-sky-600 underline underline-offset-2 hover:text-sky-800"
            >
              View build logs →
            </MiniAppExternalLink>
          )}

          {cloudDeploy.deployments && cloudDeploy.deployments.length > 0 && (
            <div className="mt-2 space-y-1">
              {cloudDeploy.deployments.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-md border border-sky-200 bg-white px-2 py-1 text-xs">
                  <span className="font-medium text-sky-800">{d.name}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                    d.state === 'READY' || d.state === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>{d.state}</span>
                  <MiniAppExternalLink href={d.url} className="text-sky-600 underline">
                    {d.url.replace('https://', '').slice(0, 32)}…
                  </MiniAppExternalLink>
                </div>
              ))}
            </div>
          )}

          {cloudDeploy.guidance.length > 0 && (
            <div className="mt-2 rounded-md border border-sky-200 bg-white px-2 py-1">
              <button type="button" className="text-[10px] font-semibold uppercase text-sky-700/70 rounded-full border border-sky-300 bg-sky-50 px-2.5 py-1">Next Steps</button>
              <ul className="mt-1 space-y-1">
                {cloudDeploy.guidance.map((item) => (
                  <li key={item} className="text-xs text-sky-900">→ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {cloudDeploy.deploymentId && cloudDeploy.status !== 'ready' && (
            <button
              type="button"
              onClick={() => void runCloudDeploy('status')}
              disabled={isRunningTask}
              className="mt-2 rounded-md border border-sky-300 bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-800 hover:bg-sky-200 disabled:opacity-60"
            >
              {isRunningTask ? 'Checking...' : 'Refresh Status'}
            </button>
          )}
        </div>
      )}

      {qpandaTask && (
        <div className={`mb-3 rounded-lg border px-3 py-2 ${
          qpandaTask.ok
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-rose-300 bg-rose-50'
        }`}>
          <div className="flex items-center gap-2">
            <button type="button" className="text-[11px] uppercase tracking-wide text-emerald-700/70 rounded-full border border-emerald-300 bg-white px-2.5 py-1">QPanda Task</button>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
              qpandaTask.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {qpandaTask.action}
            </span>
          </div>

          {qpandaTask.taskId && (
            <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">Task ID: {qpandaTask.taskId}</button>
          )}

          {qpandaTask.status && (
            <button type="button" className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85">Status: {qpandaTask.status}</button>
          )}

          {qpandaTask.error && (
            <button type="button" className="mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left text-xs font-semibold text-rose-900">{qpandaTask.error}</button>
          )}

          {qpandaTask.result && (
            <pre className="mt-2 max-h-40 overflow-auto rounded-md border border-emerald-200 bg-white px-2 py-1 text-[11px] text-emerald-900">
              {JSON.stringify(qpandaTask.result, null, 2)}
            </pre>
          )}
        </div>
      )}

      {messages.length > 0 && (
        <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <button type="button" className="mb-2 text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1">Conversation</button>
          <div className="max-h-48 space-y-2 overflow-auto">
            {messages.slice(-6).map((message, idx) => (
              <div
                key={`${message.role}-${message.at}-${idx}`}
                className={`rounded-md px-2.5 py-2 text-xs ${
                  message.role === 'assistant'
                    ? 'border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]/85'
                    : 'bg-[color:var(--brand-forest)]/10 text-[color:var(--brand-ink)]/85'
                }`}
              >
                <button type="button" className="mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold capitalize">{message.role}</button>
                <button type="button" className="w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold">{message.text}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
