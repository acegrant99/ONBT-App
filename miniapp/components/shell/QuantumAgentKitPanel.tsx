'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import type {
  AgentAccessProfileResult,
  AgentAdvisorMessage,
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
  const [autoTakeoverEnabled, setAutoTakeoverEnabled] = useState(false);
  const [autoTakeoverStatus, setAutoTakeoverStatus] = useState<string | null>(null);
  const [walletMode, setWalletMode] = useState<AiWalletMode>('auto');
  const [accessProfile, setAccessProfile] = useState<AgentAccessProfileResult | null>(null);
  const [accessLoading, setAccessLoading] = useState(false);
  const lastAutoTakeoverKey = useRef('');
  const { address: connectedWallet } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const buildWalletProofMessage = (input: {
    walletAddress: string;
    method: string;
    path: string;
    purpose: string;
    timestamp: string;
    nonce: string;
  }) => {
    return [
      'ONBT AI privileged action authorization',
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
    return {
      'x-ai-wallet-address': connectedWallet,
      'x-ai-wallet-signature': signature,
      'x-ai-wallet-timestamp': timestamp,
      'x-ai-wallet-nonce': nonce,
      'x-ai-wallet-purpose': params.purpose,
    };
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
      headline: `ONBT AI auto-takeover engaged for ${activeTab === 'private-sale' ? 'private sale' : activeTab} (${confidencePct} confidence)`,
      subline:
        summaryHint ||
        'Visibility routing is now auto-tuned by ONBT AI based on quantum confidence and stack intelligence.',
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
  };

  const enabledCapabilities = (Object.keys(canUse) as Array<keyof typeof canUse>)
    .filter((key) => canUse[key])
    .map((key) => capabilityLabelMap[key]);

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

    setIsRunningTask(true);
    setError(null);

    try {
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/integrity',
        purpose: 'integrity-task',
      });

      const apiResponse = await fetch('/api/agentkit/integrity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-agentkit-admin-token': agentkitAdminToken,
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
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/preflight',
        purpose: 'cdp-preflight',
      });

      const apiResponse = await fetch('/api/agentkit/preflight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-agentkit-admin-token': agentkitAdminToken,
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
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'GET',
        path: '/api/agentkit/env-health',
        purpose: 'env-health',
      });

      const apiResponse = await fetch('/api/agentkit/env-health', {
        method: 'GET',
        headers: {
          'x-agentkit-admin-token': agentkitAdminToken,
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
    }, 5 * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const runWebsiteEditor = async () => {
    if (!canUse.websiteEditor) {
      denySensitiveAction('Website edit planning');
      return;
    }

    setIsRunningTask(true);
    setError(null);

    try {
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'POST',
        path: '/api/agentkit/website-editor',
        purpose: 'website-editor',
      });

      const apiResponse = await fetch('/api/agentkit/website-editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-agentkit-admin-token': agentkitAdminToken,
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
      const walletProofHeaders = await buildPrivilegedHeaders({
        method: 'GET',
        path: '/api/agentkit/abi-configurator',
        purpose: 'abi-configurator',
      });

      const apiResponse = await fetch('/api/agentkit/abi-configurator', {
        method: 'GET',
        headers: {
          'x-agentkit-admin-token': agentkitAdminToken,
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
      headline: `ONBT AI is amplifying ${focusTab === 'private-sale' ? 'private sale' : focusTab} visibility for growth`,
      subline: 'High-impact modules are promoted and CTAs are tuned for stronger discovery and conversion.',
      featuredTabs,
    });
  };

  return (
    <section className="mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/80 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-semibold">ONBT AI AgentKit Integrity Advisor</h3>
          <p className="text-xs text-[color:var(--brand-ink)]/65">
            ONBT AI interactive component for integrity assurance and UX upgrades from your current module stack.
          </p>
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
      </div>

      <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-3 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="ai-wallet-mode" className="font-semibold text-[color:var(--brand-ink)]/85">
            AI Wallet Toggle
          </label>
          <select
            id="ai-wallet-mode"
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
        <p className="mt-1 text-[11px] text-[color:var(--brand-ink)]/70">
          {accessProfile?.reason || 'User-safe mode is active until wallet role is resolved.'}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {enabledCapabilities.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80"
            >
              {capability}
            </span>
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
          {takeoverEnabled ? 'Refresh ONBT AI Takeover' : 'Activate ONBT AI Takeover'}
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
          onClick={() => void runAbiConfigurator()}
          disabled={isRunningTask || !canUse.abiConfigurator}
          className="rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-left text-xs font-semibold text-cyan-900 hover:border-cyan-500 disabled:opacity-60"
        >
          {isRunningTask ? 'Running...' : 'Sync ABI Config (Base+Arb)'}
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
              setAutoTakeoverStatus('Auto mode enabled. ONBT AI will auto-activate takeover when thresholds are met.');
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
          ONBT AI Takeover is active. Graphics and feature visibility are being amplified.
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
              <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">AgentKit Capabilities</p>
              <div className="mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85">
                <p>Package installed: <span className="font-semibold">{response.agentkit.packageInstalled ? 'yes' : 'no'}</span></p>
                <p>Credentials configured: <span className="font-semibold">{response.agentkit.credentialsConfigured ? 'yes' : 'no'}</span></p>
                <p>Network: <span className="font-semibold">{response.agentkit.networkId || '--'}</span></p>
                <p>Actions discovered: <span className="font-semibold">{response.agentkit.actionCount ?? 0}</span></p>
              </div>
              {response.agentkit.cdpConfig && (
                <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                  <p className="font-semibold">CDP Wiring</p>
                  <p>Project ID: {response.agentkit.cdpConfig.projectId || '--'}</p>
                  <p>Base App owner: {response.agentkit.cdpConfig.baseAppOwner || '--'}</p>
                  <p>API key kind: {response.agentkit.cdpConfig.apiKeyIdKind}</p>
                  <p>API key: {response.agentkit.cdpConfig.apiKeyIdPreview || '--'}</p>
                  <p>Org from key: {response.agentkit.cdpConfig.orgIdFromApiKeyId || '--'}</p>
                  <p>Key id from resource: {response.agentkit.cdpConfig.apiKeyIdFromResourceName || '--'}</p>
                  <p>Secret format: {response.agentkit.cdpConfig.secretFormat}</p>
                  <p>Server env only: {response.agentkit.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'}</p>
                </div>
              )}
              {response.agentkit.initError && (
                <div className="mt-1 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800">
                  <p>Init error: {response.agentkit.initError}</p>
                  {response.agentkit.initErrorDetails && (
                    <p className="mt-1">
                      {response.agentkit.initErrorDetails.name ? `${response.agentkit.initErrorDetails.name} ` : ''}
                      {response.agentkit.initErrorDetails.code !== undefined ? `code=${response.agentkit.initErrorDetails.code} ` : ''}
                      {response.agentkit.initErrorDetails.status !== undefined ? `status=${response.agentkit.initErrorDetails.status} ` : ''}
                      {response.agentkit.initErrorDetails.type ? `type=${response.agentkit.initErrorDetails.type}` : ''}
                    </p>
                  )}
                </div>
              )}
              {(response.agentkit.actionNames || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {(response.agentkit.actionNames || []).map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80"
                    >
                      {name}
                    </span>
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
                <p className="font-semibold">{check.label}</p>
                <p className="mt-1">{check.detail}</p>
              </div>
            ))}
          </div>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">UX Enhancements</p>
              <ul className="mt-1 space-y-1 text-xs text-[color:var(--brand-ink)]/85">
                {response.uxEnhancements.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Agent Suggestions</p>
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
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Task Result</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">{taskResult.summary}</p>
          <p className="mt-1 text-[11px] text-[color:var(--brand-ink)]/65">
            Task: {taskResult.task} | Exit: {taskResult.exitCode}
          </p>
          {taskResult.output && (
            <pre className="mt-2 max-h-44 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 p-2 text-[11px] text-[color:var(--brand-ink)]/80">
              {taskResult.output}
            </pre>
          )}
        </div>
      )}

      {preflight && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">CDP Preflight</p>
          <div className="mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85">
            <p>Credentials present: <span className="font-semibold">{preflight.credentialsPresent ? 'yes' : 'no'}</span></p>
            <p>Project reachable: <span className="font-semibold">{preflight.projectReachable ? 'yes' : 'no'}</span></p>
            <p>Network: <span className="font-semibold">{preflight.networkId}</span></p>
            <p>Policy count: <span className="font-semibold">{preflight.policyCount ?? 0}</span></p>
          </div>
          {preflight.cdpConfig && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <p className="font-semibold">Resolved Config</p>
              <p>Project ID: {preflight.cdpConfig.projectId || '--'}</p>
              <p>Base App owner: {preflight.cdpConfig.baseAppOwner || '--'}</p>
              <p>API key kind: {preflight.cdpConfig.apiKeyIdKind}</p>
              <p>API key: {preflight.cdpConfig.apiKeyIdPreview || '--'}</p>
              <p>Org from key: {preflight.cdpConfig.orgIdFromApiKeyId || '--'}</p>
              <p>Key id from resource: {preflight.cdpConfig.apiKeyIdFromResourceName || '--'}</p>
              <p>Secret format: {preflight.cdpConfig.secretFormat}</p>
              <p>Server env only: {preflight.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'}</p>
            </div>
          )}
          {preflight.diagnostics && (
            <div className="mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800">
              <p>{preflight.diagnostics.message || 'Preflight diagnostic details available.'}</p>
              <p className="mt-1">
                {preflight.diagnostics.name ? `${preflight.diagnostics.name} ` : ''}
                {preflight.diagnostics.statusCode !== undefined ? `status=${preflight.diagnostics.statusCode} ` : ''}
                {preflight.diagnostics.errorType ? `type=${preflight.diagnostics.errorType} ` : ''}
                {preflight.diagnostics.correlationId ? `corr=${preflight.diagnostics.correlationId}` : ''}
              </p>
            </div>
          )}
          {(preflight.remediationHints || []).length > 0 && (
            <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-900">
              <p className="font-semibold">Recommended Fixes</p>
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
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">GitHub Usecase Scout</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">Prompt: {githubScout.prompt}</p>

          {(githubScout.enhancements || []).length > 0 && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <p className="font-semibold">Stack Enhancements</p>
              <ul className="mt-1 space-y-1">
                {(githubScout.enhancements || []).map((hint) => (
                  <li key={hint}>- {hint}</li>
                ))}
              </ul>
            </div>
          )}

          {(githubScout.repositories || []).length > 0 && (
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
              <p className="font-semibold">Top Repositories</p>
              <ul className="mt-1 space-y-1">
                {githubScout.repositories.map((repo) => (
                  <li key={repo.full_name}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[color:var(--brand-forest)] underline-offset-2 hover:underline"
                    >
                      {repo.full_name}
                    </a>{' '}
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
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Environment Health</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">{envHealth.summary}</p>
          {envHealth.diagnostics?.walletProofNonceStorage && (
            <p className="mt-1 text-xs text-[color:var(--brand-ink)]/75">
              Wallet proof nonce storage: <span className="font-semibold">{envHealth.diagnostics.walletProofNonceStorage}</span>
            </p>
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
                <p className="font-semibold">{check.key}</p>
                <p>
                  {check.present ? 'present' : check.required ? 'missing (required)' : 'missing (optional)'} | {check.source}
                </p>
                {check.note && <p className="mt-1">{check.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {dependencyHealth && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Dependency Integrity</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">{dependencyHealth.summary}</p>
          <p className="mt-1 text-[11px] text-[color:var(--brand-ink)]/65">Last checked: {new Date(dependencyHealth.checkedAt).toLocaleString()}</p>

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
                <p className="font-semibold">{check.label}</p>
                <p className="mt-1">{check.detail}</p>
              </div>
            ))}
          </div>

          {(dependencyHealth.criticalUpdates || []).length > 0 ? (
            <div className="mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-900">
              <p className="font-semibold">Critical Package Updates</p>
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

      {websiteEdit && (
        <div className="mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Website Edit Plan</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">{websiteEdit.summary}</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/70">Target: {websiteEdit.targetSite}</p>

          <div className="mt-2 space-y-2">
            {websiteEdit.edits.map((entry) => (
              <div key={entry.area} className="rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                <p className="font-semibold">{entry.area}</p>
                <p className="mt-1">{entry.objective}</p>
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
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">ABI Config Sync</p>
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/85">{abiConfig.summary}</p>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {abiConfig.networks.map((network) => (
              <div key={network.network} className="rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85">
                <p className="font-semibold">{network.network.toUpperCase()} ({network.chainId})</p>
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
            <p className="font-semibold">Tab Configuration</p>
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

      {messages.length > 0 && (
        <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2">
          <p className="mb-2 text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Conversation</p>
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
                <p className="mb-1 font-semibold capitalize">{message.role}</p>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
