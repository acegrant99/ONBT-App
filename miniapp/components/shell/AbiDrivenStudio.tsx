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
  const [selectedChainId, setSelectedChainId] = useState<SupportedChainId>(chain?.id === 42161 ? 42161 : 8453);
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

  const modeFunctions = useMemo(
    () =>
      contractFunctions.filter((item) =>
        mode === 'read'
          ? item.stateMutability === 'view' || item.stateMutability === 'pure'
          : item.stateMutability === 'nonpayable' || item.stateMutability === 'payable'
      ),
    [contractFunctions, mode]
  );

  const selectedFunction = useMemo(
    () => modeFunctions.find((fn) => fn.name === selectedFunctionName),
    [modeFunctions, selectedFunctionName]
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

  const groupedModeFunctions = useMemo(() => {
    const grouped = new Map<FunctionCategory, AbiFunction[]>();
    CATEGORY_ORDER.forEach((category) => grouped.set(category, []));

    modeFunctions.forEach((fn) => {
      const category = categorizeFunction(fn.name);
      const bucket = grouped.get(category);
      if (bucket) bucket.push(fn);
    });

    return CATEGORY_ORDER.map((category) => ({
      category,
      items: grouped.get(category) || [],
    })).filter((group) => group.items.length > 0);
  }, [modeFunctions]);

  useEffect(() => {
    if (!selectedFunction && modeFunctions.length > 0) {
      setSelectedFunctionName(modeFunctions[0].name);
    }
    if (modeFunctions.length === 0) {
      setSelectedFunctionName('');
    }
  }, [selectedFunction, modeFunctions]);

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
    <section className="mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/80 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-semibold">ABI-Driven Contract Studio</h3>
          <p className="text-xs text-[color:var(--brand-ink)]/65">
            Quantum-assisted interaction surface generated from live contract ABIs.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs text-[color:var(--brand-ink)]/80">
          Quantum mode: {prediction?.signal ?? 'caution'}
        </span>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-3 py-2">
          <span className="mb-1 block text-xs uppercase tracking-wide text-[color:var(--brand-ink)]/55">Contract Profile</span>
          <select
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
          <p className="mt-1 text-xs text-[color:var(--brand-ink)]/65">{selectedContract.description}</p>
        </label>

        <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/60 px-3 py-2">
          <span className="mb-1 block text-xs uppercase tracking-wide text-[color:var(--brand-ink)]/55">Execution Chain</span>
          <ChainSelector
            label=""
            selectedChainId={selectedChainId}
            onSelectChain={setSelectedChainId}
          />
          <p className="text-xs text-[color:var(--brand-ink)]/65 break-all">{activeAddress}</p>
        </div>
      </div>

      {suggestedFunctions.length > 0 && (
        <div className="mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-sun)]/10 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55">Quantum Suggestions</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {suggestedFunctions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedFunctionName(name)}
                className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45"
              >
                {humanizeFunctionName(name)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode('read')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${
            mode === 'read'
              ? 'bg-[color:var(--brand-forest)] text-white'
              : 'border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]/80'
          }`}
        >
          Read
        </button>
        <button
          type="button"
          onClick={() => setMode('write')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${
            mode === 'write'
              ? 'bg-[color:var(--brand-forest)] text-white'
              : 'border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]/80'
          }`}
        >
          Write
        </button>

        <select
          value={selectedFunctionName}
          onChange={(event) => setSelectedFunctionName(event.target.value)}
          className="brand-input min-w-[220px] rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
        >
          {modeFunctions.length === 0 && <option value="">No ABI functions in this mode</option>}
          {groupedModeFunctions.map((group) => (
            <optgroup key={group.category} label={CATEGORY_LABELS[group.category]}>
              {group.items.map((fn) => (
                <option key={fn.name} value={fn.name}>
                  {humanizeFunctionName(fn.name)} ({fn.inputs.length} args)
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {selectedFunction && (
        <div className="space-y-2 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] px-2 py-0.5 text-xs text-[color:var(--brand-ink)]/80">
              {selectedFunctionLabel}
            </span>
            <span className="rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] px-2 py-0.5 text-xs text-[color:var(--brand-ink)]/70">
              Category: {CATEGORY_LABELS[selectedFunctionCategory]}
            </span>
            <span className="rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] px-2 py-0.5 text-xs text-[color:var(--brand-ink)]/70">
              ABI: {selectedFunction.name}
            </span>
          </div>

          {mode === 'write' && blockedWrite && (
            <div className="rounded-md border border-rose-300 bg-rose-50 px-2.5 py-2 text-xs text-rose-800">
              This function is blocked in ABI Studio safety policy: <span className="font-semibold">{selectedFunction.name}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => applySmartTemplate('wallet-self')}
              className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45"
            >
              Fill wallet args
            </button>
            <button
              type="button"
              onClick={() => applySmartTemplate('numeric-smoke')}
              className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45"
            >
              Numeric smoke template
            </button>
            <button
              type="button"
              onClick={() => applySmartTemplate('reset')}
              className="rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45"
            >
              Reset args
            </button>
          </div>

          {selectedFunction.inputs.length === 0 && (
            <p className="text-xs text-[color:var(--brand-ink)]/65">This function requires no arguments.</p>
          )}

          {selectedFunction.inputs.map((input, index) => {
            const key = `${input.name || 'arg'}:${index}`;
            const value = inputValues[key] ?? '';
            return (
              <label key={key} className="block">
                <span className="mb-1 block text-xs text-[color:var(--brand-ink)]/75">
                  {input.name || `arg${index}`} ({input.type})
                </span>
                {input.type === 'bool' ? (
                  <select
                    value={value}
                    onChange={(event) =>
                      setInputValues((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                      setInputValues((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                    placeholder={
                      input.type === 'tuple' || input.type.startsWith('tuple')
                        ? '{"field":"value"}'
                        : input.type.endsWith('[]')
                          ? 'comma,separated,values (tuple[]: JSON array)'
                          : input.type
                    }
                  />
                )}
              </label>
            );
          })}

          {requiresRiskConfirmation && (
            <label className="block">
              <span className="mb-1 block text-xs text-[color:var(--brand-ink)]/75">
                Confirmation phrase required for high-risk write
              </span>
              <input
                type="text"
                value={confirmationText}
                onChange={(event) => setConfirmationText(event.target.value)}
                placeholder={requiredPhrase}
                className="brand-input w-full rounded-md border border-amber-300 px-2 py-1.5 text-sm"
              />
            </label>
          )}

          {mode === 'write' && selectedFunction.stateMutability === 'payable' && (
            <label className="block">
              <span className="mb-1 block text-xs text-[color:var(--brand-ink)]/75">Native value (ETH)</span>
              <input
                type="number"
                min="0"
                step="0.000001"
                value={payableValue}
                onChange={(event) => setPayableValue(event.target.value)}
                className="brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
              />
            </label>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={mode === 'read' ? runRead : runWrite}
              disabled={isBusy || !selectedFunctionName || blockedWrite}
              className="brand-button rounded-md px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {isBusy ? 'Working...' : mode === 'read' ? 'Run Read' : 'Send Transaction'}
            </button>
            <p className="text-xs text-[color:var(--brand-ink)]/70">{statusText}</p>
          </div>

          {readResult && (
            <pre className="max-h-48 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 p-2 text-xs text-[color:var(--brand-ink)]/85">
              {readResult}
            </pre>
          )}

          {writeHash && (
            <p className="text-xs text-[color:var(--brand-ink)]/75 break-all">
              Tx hash: {writeHash}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
