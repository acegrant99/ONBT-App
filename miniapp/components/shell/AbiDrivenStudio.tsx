'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { arbitrum, base } from 'wagmi/chains';
import type { Abi, AbiFunction, AbiParameter } from 'viem';
import { isAddress, parseEther } from 'viem';
import { ChainSelector } from '@/components/ChainSelector';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import {
  ONBT_OFT_ABI,
  ONBT_STAKING_ABI,
  ONBT_PRIVATE_SALE_ABI,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_PRIVATE_SALE_BASE_ADDRESS,
  ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import type { QuantumPrediction, TabType } from '@/types/app-shell';

type SupportedChainId = 8453 | 42161;
type Mode = 'read' | 'write';
type FunctionCategory = 'balances' | 'transfers' | 'staking' | 'governance' | 'permissions' | 'admin' | 'pricing' | 'other';

type ContractPreset = {
  id: 'token' | 'staking' | 'private-sale';
  label: string;
  description: string;
  addresses: Record<SupportedChainId, `0x${string}`>;
  abi: Abi;
};

type AbiDrivenStudioProps = {
  activeTab: TabType;
  prediction?: QuantumPrediction;
};

const CONTRACT_PRESETS: ContractPreset[] = [
  {
    id: 'token',
    label: 'ONBT Omnichain Token',
    description: 'ERC-20 and LayerZero OFT methods for transfers and bridge prep.',
    addresses: {
      8453: ONBT_TOKEN_ADDRESS,
      42161: ONBT_ARBITRUM_ADDRESS,
    },
    abi: ONBT_OFT_ABI as unknown as Abi,
  },
  {
    id: 'staking',
    label: 'ONBT Omnichain Staking',
    description: 'Stake, claim, and rewards operations across chains.',
    addresses: {
      8453: ONBT_STAKING_ADDRESS,
      42161: ONBT_STAKING_ARBITRUM_ADDRESS,
    },
    abi: ONBT_STAKING_ABI as unknown as Abi,
  },
  {
    id: 'private-sale',
    label: 'ONBT Private Sale',
    description: 'Sale quotas, pricing, and purchase-related contract methods.',
    addresses: {
      8453: ONBT_PRIVATE_SALE_BASE_ADDRESS,
      42161: ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
    },
    abi: ONBT_PRIVATE_SALE_ABI as unknown as Abi,
  },
];

const BLOCKED_WRITE_FUNCTIONS = new Set([
  'renounceOwnership',
  'transferOwnership',
  'setPeer',
  'setDelegate',
]);

const HIGH_RISK_WRITE_FUNCTIONS = new Set([
  'send',
  'stake',
  'withdraw',
  'claimRewards',
  'approve',
  'transfer',
  'buyWithETH',
  'buyWithUSDC',
  'buyWithUSDT',
]);

const ALLOWED_WRITE_FUNCTIONS: Record<ContractPreset['id'], Set<string>> = {
  token: new Set(['approve', 'transfer', 'send']),
  staking: new Set(['stake', 'unstake', 'claimRewards', 'compound', 'delegate']),
  'private-sale': new Set(['buyWithETH', 'buyWithToken']),
};

const FUNCTION_LABELS: Record<string, string> = {
  balanceOf: 'Wallet Balance',
  totalSupply: 'Total Supply',
  allowance: 'Allowance Check',
  approve: 'Set Spending Allowance',
  transfer: 'Transfer Tokens',
  transferFrom: 'Transfer From Allowance',
  quoteSend: 'Bridge Fee Quote',
  send: 'Bridge Transfer',
  stake: 'Stake Tokens',
  unstake: 'Unstake Tokens',
  claimRewards: 'Claim Rewards',
  pendingRewards: 'Pending Rewards',
  buyWithETH: 'Buy With ETH',
  buyWithUSDC: 'Buy With USDC',
  buyWithUSDT: 'Buy With USDT',
  getUserInfo: 'User Sale Profile',
  saleInfo: 'Sale Configuration',
  owner: 'Contract Owner',
  transferOwnership: 'Transfer Ownership',
};

const CATEGORY_LABELS: Record<FunctionCategory, string> = {
  balances: 'Balances And State',
  transfers: 'Transfers And Bridging',
  staking: 'Staking And Rewards',
  governance: 'Governance',
  permissions: 'Permissions',
  admin: 'Admin',
  pricing: 'Pricing And Sale',
  other: 'Other',
};

const CATEGORY_ORDER: FunctionCategory[] = [
  'balances',
  'transfers',
  'staking',
  'governance',
  'permissions',
  'pricing',
  'admin',
  'other',
];

const READ_CATEGORY_STYLES: Record<FunctionCategory, {
  bg: string; border: string; text: string; ring: string; shadow: string; hover: string; icon: string;
}> = {
  balances:   { bg: 'from-sky-500/15 to-cyan-500/10',      border: 'border-sky-400/45',     text: 'text-sky-950',     ring: 'ring-sky-400',     shadow: 'shadow-[0_0_18px_rgba(14,165,233,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(14,165,233,0.2)]',    icon: '💧' },
  transfers:  { bg: 'from-indigo-500/15 to-blue-500/10',   border: 'border-indigo-400/45',  text: 'text-indigo-950',  ring: 'ring-indigo-400',  shadow: 'shadow-[0_0_18px_rgba(99,102,241,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]',    icon: '🚀' },
  staking:    { bg: 'from-emerald-500/15 to-green-500/10', border: 'border-emerald-400/45', text: 'text-emerald-950', ring: 'ring-emerald-400', shadow: 'shadow-[0_0_18px_rgba(52,211,153,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(52,211,153,0.2)]',    icon: '🔒' },
  governance: { bg: 'from-violet-500/15 to-purple-500/10', border: 'border-violet-400/45',  text: 'text-violet-950',  ring: 'ring-violet-400',  shadow: 'shadow-[0_0_18px_rgba(139,92,246,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]',   icon: '🏛️' },
  permissions:{ bg: 'from-amber-400/15 to-yellow-400/10',  border: 'border-amber-400/45',   text: 'text-amber-950',   ring: 'ring-amber-400',   shadow: 'shadow-[0_0_18px_rgba(251,191,36,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(251,191,36,0.2)]',    icon: '🔐' },
  admin:      { bg: 'from-slate-300/15 to-gray-200/10',    border: 'border-slate-300/45',   text: 'text-slate-600',   ring: 'ring-slate-300',   shadow: 'shadow-[0_0_12px_rgba(148,163,184,0.25)]',   hover: 'hover:shadow-[0_0_8px_rgba(148,163,184,0.15)]',   icon: '⚙️' },
  pricing:    { bg: 'from-orange-400/15 to-amber-400/10',  border: 'border-orange-400/45',  text: 'text-orange-950',  ring: 'ring-orange-400',  shadow: 'shadow-[0_0_18px_rgba(251,146,60,0.35)]',    hover: 'hover:shadow-[0_0_12px_rgba(251,146,60,0.2)]',    icon: '💵' },
  other:      { bg: 'from-slate-200/15 to-slate-100/10',   border: 'border-slate-200/45',   text: 'text-slate-700',   ring: 'ring-slate-200',   shadow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]',    hover: 'hover:shadow-[0_0_8px_rgba(148,163,184,0.1)]',    icon: '◦' },
};

function stringifyResult(value: unknown): string {
  return JSON.stringify(
    value,
    (_key, candidate) => (typeof candidate === 'bigint' ? candidate.toString() : candidate),
    2
  );
}

function humanizeFunctionName(name: string): string {
  if (FUNCTION_LABELS[name]) return FUNCTION_LABELS[name];
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (char) => char.toUpperCase());
}

function categorizeFunction(name: string): FunctionCategory {
  if (/balance|supply|get|pending|quote|info|state|name|symbol|decimals/i.test(name)) return 'balances';
  if (/send|transfer|bridge|mint|burn/i.test(name)) return 'transfers';
  if (/stake|unstake|reward|claim|lockup/i.test(name)) return 'staking';
  if (/vote|proposal|delegate|govern/i.test(name)) return 'governance';
  if (/allowance|approve|permit/i.test(name)) return 'permissions';
  if (/buy|sale|price|quota|tier/i.test(name)) return 'pricing';
  if (/owner|admin|set|pause|upgrade|peer|delegate/i.test(name)) return 'admin';
  return 'other';
}

function tupleComponents(param: AbiParameter): readonly AbiParameter[] {
  const maybeTuple = param as AbiParameter & { components?: readonly AbiParameter[] };
  return maybeTuple.components || [];
}

function parseTupleObject(clean: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(clean);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Tuple must be a JSON object');
    }
    return parsed as Record<string, unknown>;
  } catch {
    throw new Error('Tuple input must be valid JSON object');
  }
}

function parseByParam(raw: string, param: AbiParameter): unknown {
  const solidityType = param.type;
  const clean = raw.trim();

  if (solidityType.endsWith('[]')) {
    const itemType = solidityType.slice(0, -2);
    const itemParam = { ...param, type: itemType } as AbiParameter;
    if (!clean) return [];

    if (itemType.startsWith('tuple')) {
      try {
        const parsed = JSON.parse(clean);
        if (!Array.isArray(parsed)) throw new Error();
        return parsed.map((entry) => {
          if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
            throw new Error('Tuple array entry must be an object');
          }
          const obj = entry as Record<string, unknown>;
          return tupleComponents(itemParam).map((component, index) => {
            const key = component.name || `arg${index}`;
            return parseByParam(String(obj[key] ?? ''), component);
          });
        });
      } catch {
        throw new Error('Tuple array input must be valid JSON array');
      }
    }

    return clean.split(',').map((part) => parseByParam(part, itemParam));
  }

  if (solidityType.startsWith('uint') || solidityType.startsWith('int')) {
    if (!clean) throw new Error(`Missing number for type ${solidityType}`);
    return BigInt(clean);
  }

  if (solidityType === 'bool') {
    return clean.toLowerCase() === 'true' || clean === '1';
  }

  if (solidityType === 'address') {
    if (!isAddress(clean)) throw new Error('Invalid address argument');
    return clean as `0x${string}`;
  }

  if (solidityType.startsWith('bytes')) {
    if (!clean.startsWith('0x')) throw new Error('Bytes input must be 0x-prefixed');
    return clean as `0x${string}`;
  }

  if (solidityType === 'tuple' || solidityType.startsWith('tuple')) {
    const tupleObj = parseTupleObject(clean);
    return tupleComponents(param).map((component, index) => {
      const key = component.name || `arg${index}`;
      return parseByParam(String(tupleObj[key] ?? ''), component);
    });
  }

  return clean;
}

function defaultForInput(name: string | undefined, type: string, walletAddress?: `0x${string}`): string {
  if (type === 'tuple' || type.startsWith('tuple')) {
    return '{}';
  }

  if (type.endsWith('[]')) {
    return '';
  }

  if (type === 'address' && walletAddress && /(owner|account|user|to|recipient)/i.test(name || '')) {
    return walletAddress;
  }

  if (type.startsWith('uint') || type.startsWith('int')) {
    return '0';
  }

  if (type === 'bool') {
    return 'false';
  }

  return '';
}

function recommendedFunctionNames(tab: TabType, signal: 'risk-on' | 'caution' | undefined): string[] {
  if (tab === 'bridge') {
    return signal === 'risk-on'
      ? ['quoteSend', 'send', 'balanceOf']
      : ['quoteSend', 'balanceOf'];
  }

  if (tab === 'staking') {
    return signal === 'risk-on'
      ? ['stake', 'claimRewards', 'pendingRewards']
      : ['pendingRewards', 'getStakeInfo'];
  }

  if (tab === 'private-sale') {
    return signal === 'risk-on'
      ? ['buyWithETH', 'buyWithUSDC', 'getUserInfo']
      : ['getUserInfo', 'saleInfo'];
  }

  if (tab === 'governance') {
    return ['balanceOf', 'delegates', 'allowance'];
  }

  return ['balanceOf', 'totalSupply', 'name'];
}

export function AbiDrivenStudio({ activeTab, prediction }: AbiDrivenStudioProps) {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: walletClient } = useWalletClient();

  const [selectedContractId, setSelectedContractId] = useState<ContractPreset['id']>('token');
  // Keep SSR and initial client render deterministic to avoid hydration mismatch.
  const [selectedChainId, setSelectedChainId] = useState<SupportedChainId>(8453);
  const [mode, setMode] = useState<Mode>('read');
  const [selectedFunctionName, setSelectedFunctionName] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [payableValue, setPayableValue] = useState('0');
  const [isBusy, setIsBusy] = useState(false);
  const [readResult, setReadResult] = useState<string>('');
  const [writeHash, setWriteHash] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [confirmationText, setConfirmationText] = useState('');

  const publicClient = usePublicClient({ chainId: selectedChainId });

  const selectedContract = useMemo(
    () => CONTRACT_PRESETS.find((preset) => preset.id === selectedContractId) || CONTRACT_PRESETS[0],
    [selectedContractId]
  );

  const contractFunctions = useMemo(
    () => selectedContract.abi.filter((item) => item.type === 'function') as AbiFunction[],
    [selectedContract]
  );

  const readFunctions = useMemo(
    () => contractFunctions.filter((fn) => fn.stateMutability === 'view' || fn.stateMutability === 'pure'),
    [contractFunctions]
  );

  const writeFunctions = useMemo(
    () =>
      contractFunctions.filter(
        (fn) =>
          (fn.stateMutability === 'nonpayable' || fn.stateMutability === 'payable') &&
          ALLOWED_WRITE_FUNCTIONS[selectedContractId].has(fn.name)
      ),
    [contractFunctions, selectedContractId]
  );

  const selectedFunction = useMemo(
    () =>
      mode === 'read'
        ? readFunctions.find((fn) => fn.name === selectedFunctionName)
        : writeFunctions.find((fn) => fn.name === selectedFunctionName),
    [mode, readFunctions, writeFunctions, selectedFunctionName]
  );

  const selectedFunctionLabel = selectedFunction ? humanizeFunctionName(selectedFunction.name) : '';
  const selectedFunctionCategory = selectedFunction ? categorizeFunction(selectedFunction.name) : 'other';

  const requiresRiskConfirmation =
    mode === 'write' && !!selectedFunction && HIGH_RISK_WRITE_FUNCTIONS.has(selectedFunction.name);
  const blockedWrite =
    mode === 'write' && !!selectedFunction && BLOCKED_WRITE_FUNCTIONS.has(selectedFunction.name);
  const requiredPhrase = selectedFunction ? `EXECUTE ${selectedFunction.name}` : '';

  const suggestedFunctions = useMemo(() => {
    const names = recommendedFunctionNames(activeTab, prediction?.signal);
    return names.filter((name) => contractFunctions.some((fn) => fn.name === name));
  }, [activeTab, contractFunctions, prediction?.signal]);

  useEffect(() => {
    if (chain?.id === 8453 || chain?.id === 42161) {
      setSelectedChainId(chain.id);
    }
  }, [chain?.id]);

  useEffect(() => {
    if (!selectedFunction) {
      setInputValues({});
      return;
    }

    const next: Record<string, string> = {};
    selectedFunction.inputs.forEach((input, index) => {
      const key = `${input.name || 'arg'}:${index}`;
      next[key] = defaultForInput(input.name, input.type, address);
    });
    setInputValues(next);
    setConfirmationText('');
  }, [selectedFunction, address]);

  const activeAddress = selectedContract.addresses[selectedChainId];

  const applySmartTemplate = (template: 'wallet-self' | 'numeric-smoke' | 'reset') => {
    if (!selectedFunction) return;

    if (template === 'reset') {
      const reset: Record<string, string> = {};
      selectedFunction.inputs.forEach((input, index) => {
        const key = `${input.name || 'arg'}:${index}`;
        reset[key] = defaultForInput(input.name, input.type, address);
      });
      setInputValues(reset);
      setPayableValue('0');
      return;
    }

    const patched: Record<string, string> = { ...inputValues };
    selectedFunction.inputs.forEach((input, index) => {
      const key = `${input.name || 'arg'}:${index}`;

      if (template === 'wallet-self') {
        if (address && input.type === 'address') {
          patched[key] = address;
        }
        return;
      }

      if (template === 'numeric-smoke') {
        if (input.type.startsWith('uint') || input.type.startsWith('int')) {
          patched[key] = '1';
        }
        if (input.type === 'bool') {
          patched[key] = 'false';
        }
      }
    });

    setInputValues(patched);
    if (template === 'numeric-smoke' && selectedFunction.stateMutability === 'payable') {
      setPayableValue('0.0001');
    }
  };

  const runReadDirect = async (fn: AbiFunction) => {
    if (!publicClient) return;
    setMode('read');
    setIsBusy(true);
    setStatusText('Reading…');
    setReadResult('');
    try {
      const result = await publicClient.readContract({
        address: activeAddress,
        abi: selectedContract.abi,
        functionName: fn.name,
        args: [],
      });
      setReadResult(stringifyResult(result));
      setStatusText('Read successful.');
    } catch (error) {
      setStatusText(error instanceof Error ? error.message : 'Read failed');
    } finally {
      setIsBusy(false);
    }
  };

  const runRead = async () => {
    if (!selectedFunction || !publicClient) return;

    setIsBusy(true);
    setStatusText('Running contract read...');
    setReadResult('');

    try {
      const args = selectedFunction.inputs.map((input, index) => {
        const key = `${input.name || 'arg'}:${index}`;
        return parseByParam(inputValues[key] || '', input as AbiParameter);
      });

      const result = await publicClient.readContract({
        address: activeAddress,
        abi: selectedContract.abi,
        functionName: selectedFunction.name,
        args,
      });

      setReadResult(stringifyResult(result));
      setStatusText('Read successful.');
    } catch (error) {
      setStatusText(error instanceof Error ? error.message : 'Read failed');
    } finally {
      setIsBusy(false);
    }
  };

  const runWrite = async () => {
    if (!selectedFunction || !publicClient) return;

    if (blockedWrite) {
      setStatusText(`Write blocked by studio safety policy: ${selectedFunction.name}`);
      return;
    }

    if (requiresRiskConfirmation && confirmationText !== requiredPhrase) {
      setStatusText(`Type \"${requiredPhrase}\" to confirm this high-risk write.`);
      return;
    }

    if (!address || !walletClient) {
      setStatusText('Connect wallet to submit write transactions.');
      return;
    }

    if (chain?.id !== selectedChainId) {
      switchChain({ chainId: selectedChainId });
      setStatusText('Switching wallet chain. Retry after network switch.');
      return;
    }

    setIsBusy(true);
    setStatusText('Preparing transaction...');
    setWriteHash('');

    try {
      const args = selectedFunction.inputs.map((input, index) => {
        const key = `${input.name || 'arg'}:${index}`;
        return parseByParam(inputValues[key] || '', input as AbiParameter);
      });

      const value = selectedFunction.stateMutability === 'payable' ? parseEther(payableValue || '0') : undefined;
      const preflight = await runActionPreflight({
        actionLabel: `ABI studio write (${selectedFunction.name})`,
        account: address,
        connectedChainId: chain?.id,
        targetChainId: selectedChainId,
        publicClient,
        request: {
          address: activeAddress,
          abi: selectedContract.abi,
          functionName: selectedFunction.name,
          args,
          value,
        },
      });

      if (!preflight.ok) {
        setStatusText(preflight.copy);
        return;
      }

      const hash = await walletClient.writeContract({
        account: address,
        chain: selectedChainId === 8453 ? base : arbitrum,
        address: activeAddress,
        abi: selectedContract.abi,
        functionName: selectedFunction.name,
        args,
        value,
      });

      setWriteHash(hash);
      setStatusText('Transaction submitted. Waiting for confirmation...');

      await publicClient.waitForTransactionReceipt({ hash });
      setStatusText('Transaction confirmed.');
    } catch (error) {
      setStatusText(error instanceof Error ? error.message : 'Write failed');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <section className="brand-panel scanline-panel mb-6 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            Contract Console
          </button>
          <button type="button" className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900">
            ABI Studio
          </button>
          <button type="button" className="rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950">
            Live ABI Actions
          </button>
        </div>
        <button type="button" className="brand-pill text-xs text-[color:var(--brand-ink)]/80">
          Quantum mode: {prediction?.signal ?? 'caution'}
        </button>
      </div>

      <div className="status-rail mb-3">
        <span className="status-rail-dot" aria-hidden="true" />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {selectedContract.label}
          </button>
          <button type="button" className="rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {selectedChainId === 8453 ? 'Base' : 'Arbitrum'}
          </button>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="brand-stat-card rounded-lg px-3 py-2">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            Contract Profile
          </button>
          <select
            aria-label="Contract profile"
            title="Contract profile"
            value={selectedContractId}
            onChange={(event) => setSelectedContractId(event.target.value as ContractPreset['id'])}
            className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
          >
            {CONTRACT_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
          <button type="button" className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-slate-700">
            {selectedContract.description}
          </button>
        </div>

        <div className="brand-stat-card rounded-lg px-3 py-2">
          <button type="button" className="mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            Execution Chain
          </button>
          <ChainSelector
            label=""
            selectedChainId={selectedChainId}
            onSelectChain={setSelectedChainId}
          />
          <button type="button" className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-slate-700 break-all">
            {activeAddress}
          </button>
        </div>
      </div>

      {suggestedFunctions.length > 0 && (
        <div className="brand-highlight-bar mb-3 rounded-xl px-3 py-2">
          <button type="button" className="rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            Quantum Suggestions
          </button>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {suggestedFunctions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => { setMode('read'); setSelectedFunctionName(name); }}
                className="brand-pill text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45"
              >
                {humanizeFunctionName(name)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Explore: contract reads ───────────────────────────────── */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <button type="button" className="rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800">
            Explore
          </button>
          <span className="text-[11px] text-[color:var(--brand-ink)]/45">contract reads</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {readFunctions.map((fn) => {
            const cat = categorizeFunction(fn.name);
            const cs = READ_CATEGORY_STYLES[cat] ?? READ_CATEGORY_STYLES.other;
            const isActive = mode === 'read' && selectedFunctionName === fn.name;
            const isBusyHere = isBusy && isActive;
            return (
              <button
                key={fn.name}
                type="button"
                onClick={() => {
                  const alreadyActive = mode === 'read' && selectedFunctionName === fn.name;
                  setMode('read');
                  setSelectedFunctionName(fn.name);
                  if (!alreadyActive && fn.inputs.length === 0) void runReadDirect(fn);
                }}
                className={[
                  'relative flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 select-none',
                  `bg-gradient-to-br ${cs.bg}`,
                  cs.border,
                  cs.text,
                  isActive ? `ring-2 ring-offset-1 ${cs.ring} ${cs.shadow}` : cs.hover,
                  isBusyHere ? 'animate-pulse' : '',
                ].join(' ')}
              >
                <span className="leading-none">{cs.icon}</span>
                <span>{humanizeFunctionName(fn.name)}</span>
                {fn.inputs.length > 0 && (
                  <span className="rounded-full bg-white/55 px-1 text-[9px] font-bold leading-tight">
                    {fn.inputs.length}
                  </span>
                )}
                {isBusyHere && (
                  <span className="absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-cyan-400 opacity-75" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Actions: on-chain writes ──────────────────────────────── */}
      {writeFunctions.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <button type="button" className="rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-800">
              Actions
            </button>
            <span className="text-[11px] text-[color:var(--brand-ink)]/45">on-chain writes · wallet required</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {writeFunctions.map((fn) => {
              const isActive = mode === 'write' && selectedFunctionName === fn.name;
              const isHighRisk = HIGH_RISK_WRITE_FUNCTIONS.has(fn.name);
              const isBusyHere = isBusy && isActive;
              return (
                <button
                  key={fn.name}
                  type="button"
                  onClick={() => { setMode('write'); setSelectedFunctionName(fn.name); }}
                  className={[
                    'relative flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 select-none',
                    isHighRisk
                      ? 'bg-gradient-to-br from-rose-500/15 to-red-400/10 border-rose-400/50 text-rose-950'
                      : 'bg-gradient-to-br from-amber-400/15 to-orange-300/10 border-amber-400/50 text-amber-950',
                    isActive
                      ? isHighRisk
                        ? 'ring-2 ring-offset-1 ring-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.35)]'
                        : 'ring-2 ring-offset-1 ring-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)]'
                      : isHighRisk
                        ? 'hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                        : 'hover:shadow-[0_0_12px_rgba(251,191,36,0.2)]',
                    isBusyHere ? 'animate-pulse' : '',
                  ].join(' ')}
                >
                  <span className="leading-none">{isHighRisk ? '⚡' : '✍️'}</span>
                  <span>{humanizeFunctionName(fn.name)}</span>
                  {fn.inputs.length > 0 && (
                    <span className="rounded-full bg-white/55 px-1 text-[9px] font-bold leading-tight">
                      {fn.inputs.length}
                    </span>
                  )}
                  {isBusyHere && (
                    <span className="absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-amber-400 opacity-75" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Inline expanded form for selected function ────────────── */}
      {selectedFunction && (
        <div className="brand-stat-card space-y-2.5 rounded-xl px-3 py-3">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="brand-pill text-xs text-[color:var(--brand-ink)]/80">{selectedFunctionLabel}</span>
              <span className="brand-pill brand-pill-soft text-xs text-[color:var(--brand-ink)]/60">{CATEGORY_LABELS[selectedFunctionCategory]}</span>
            </div>
            <button
              type="button"
              onClick={() => { setSelectedFunctionName(''); setReadResult(''); setStatusText(''); setWriteHash(''); }}
              className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5 text-xs text-slate-500 transition-colors hover:text-slate-800"
            >
              ✕
            </button>
          </div>

          {mode === 'write' && blockedWrite && (
            <div className="rounded-lg border border-rose-400/35 bg-rose-50/80 px-2.5 py-2 text-xs text-rose-900">
              Blocked: <span className="font-semibold">{selectedFunction.name}</span>
            </div>
          )}

          {mode === 'read' && selectedFunction.inputs.length === 0 && (
            <p className="text-xs italic text-[color:var(--brand-ink)]/50">No arguments — result loaded on click.</p>
          )}

          {selectedFunction.inputs.map((input, index) => {
            const key = `${input.name || 'arg'}:${index}`;
            const value = inputValues[key] ?? '';
            return (
              <div key={key}>
                <button type="button" className="mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/70">
                  {input.name || `arg${index}`} <span className="opacity-55">({input.type})</span>
                </button>
                {input.type === 'bool' ? (
                  <select
                    aria-label={`${input.name || `arg${index}`} (${input.type})`}
                    title={`${input.name || `arg${index}`} (${input.type})`}
                    value={value}
                    onChange={(e) => setInputValues((c) => ({ ...c, [key]: e.target.value }))}
                    className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setInputValues((c) => ({ ...c, [key]: e.target.value }))}
                    className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                    placeholder={
                      input.type === 'tuple' || input.type.startsWith('tuple')
                        ? '{"field":"value"}'
                        : input.type.endsWith('[]')
                          ? 'comma,separated'
                          : input.type
                    }
                  />
                )}
              </div>
            );
          })}

          {requiresRiskConfirmation && (
            <div>
              <button type="button" className="mb-1 rounded-full border border-amber-300/50 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-800">
                Type <span className="font-mono font-bold">{requiredPhrase}</span> to confirm
              </button>
              <input
                type="text"
                aria-label="Confirmation phrase"
                title="Confirmation phrase"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder={requiredPhrase}
                className="brand-input w-full rounded-md border border-amber-300 px-2 py-1.5 text-sm"
              />
            </div>
          )}

          {mode === 'write' && selectedFunction.stateMutability === 'payable' && (
            <div>
              <button type="button" className="mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/70">ETH value</button>
              <input
                type="number"
                aria-label="Native value in ETH"
                title="Native value in ETH"
                min="0"
                step="0.000001"
                value={payableValue}
                onChange={(e) => setPayableValue(e.target.value)}
                className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {selectedFunction.inputs.length > 0 && (
              <button
                type="button"
                onClick={() => applySmartTemplate('wallet-self')}
                className="brand-pill text-[10px] text-[color:var(--brand-ink)]/65 hover:border-[color:var(--brand-forest)]/45"
              >
                Fill wallet
              </button>
            )}
            <button
              type="button"
              onClick={mode === 'read' ? runRead : runWrite}
              disabled={isBusy || !selectedFunctionName || blockedWrite}
              className={[
                'rounded-xl px-4 py-1.5 text-sm font-semibold transition-all duration-150 disabled:opacity-50',
                mode === 'write'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:shadow-[0_0_18px_rgba(245,158,11,0.45)]'
                  : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_2px_8px_rgba(14,165,233,0.3)] hover:shadow-[0_0_18px_rgba(14,165,233,0.45)]',
                isBusy ? 'animate-pulse' : '',
              ].join(' ')}
            >
              {isBusy ? '⏳ Working…' : mode === 'read' ? '🔍 Read' : '⚡ Execute'}
            </button>
            {statusText && (
              <span className="text-[11px] text-[color:var(--brand-ink)]/55">{statusText}</span>
            )}
          </div>

          {readResult && (
            <pre className="max-h-48 overflow-auto rounded-xl border border-sky-200/50 bg-sky-50/70 p-2.5 text-xs text-[color:var(--brand-ink)]/85 shadow-inner">
              {readResult}
            </pre>
          )}

          {writeHash && (
            <div className="rounded-xl border border-emerald-300/50 bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-900 break-all">
              ✓ {writeHash}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
