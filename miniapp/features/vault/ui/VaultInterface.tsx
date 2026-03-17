'use client';

import React, { useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatEther, parseEther } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_VAULT_ABI,
  ONBT_VAULT_ARBITRUM_ADDRESS,
  ONBT_VAULT_BASE_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';

const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000' as `0x${string}`;

export function VaultInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [depositAmount, setDepositAmount] = useState('0.01');
  const [validationError, setValidationError] = useState<string | null>(null);
  const publicClient = usePublicClient({ chainId: selectedChainId });

  const vaultAddress = (selectedChainId === 42161
    ? ONBT_VAULT_ARBITRUM_ADDRESS
    : ONBT_VAULT_BASE_ADDRESS) as `0x${string}`;
  const tokenAddress = (selectedChainId === 42161 ? ONBT_ARBITRUM_ADDRESS : ONBT_TOKEN_ADDRESS) as `0x${string}`;
  const chainName = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;

  const { data: isHub } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'isHub',
    query: { refetchInterval: 30_000 },
  });

  const { data: localEid } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'localEid',
    query: { refetchInterval: 60_000 },
  });

  const { data: governance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'governance',
    query: { refetchInterval: 30_000 },
  });

  const { data: nativeBalance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [NATIVE_TOKEN],
    query: { refetchInterval: 15_000 },
  });

  const { data: tokenBalance } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [tokenAddress],
    query: { refetchInterval: 15_000 },
  });

  const { data: tokenAvailable } = useReadContract({
    chainId: selectedChainId,
    address: vaultAddress,
    abi: ONBT_VAULT_ABI,
    functionName: 'getAvailableBalance',
    args: [tokenAddress],
    query: { refetchInterval: 15_000 },
  });

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const parsedDeposit = useMemo(() => {
    try {
      if (!depositAmount || Number(depositAmount) <= 0) return 0n;
      return parseEther(depositAmount);
    } catch {
      return 0n;
    }
  }, [depositAmount]);

  const handleDepositNative = async () => {
    setValidationError(null);

    if (!address) {
      setValidationError('Connect wallet to deposit native gas token.');
      return;
    }

    if (parsedDeposit <= 0n) {
      setValidationError('Enter a valid deposit amount.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Vault native deposit',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: vaultAddress,
        abi: ONBT_VAULT_ABI,
        functionName: 'depositNative',
        value: parsedDeposit,
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      return;
    }

    writeContract({
      chainId: selectedChainId,
      address: vaultAddress,
      abi: ONBT_VAULT_ABI,
      functionName: 'depositNative',
      value: parsedDeposit,
    });
  };

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Vault chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="Vault operator" />}
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-white/90 p-4 text-sm space-y-2">
        <p><strong>Chain:</strong> {chainName}</p>
        <p><strong>Vault:</strong> {vaultAddress}</p>
        <p><strong>Hub deployment:</strong> {isHub ? 'Yes' : 'No'}</p>
        <p><strong>Local EID:</strong> {localEid ? String(localEid) : '—'}</p>
        <p><strong>Governance:</strong> {governance ? String(governance) : '—'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          Native {formatEther((nativeBalance ?? 0n) as bigint)}
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          ONBT Balance {formatEther((tokenBalance ?? 0n) as bigint)}
        </button>
        <button type="button" className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 text-left font-semibold text-slate-900">
          ONBT Available {formatEther((tokenAvailable ?? 0n) as bigint)}
        </button>
      </div>

      <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Write action</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={depositAmount}
            onChange={(event) => setDepositAmount(event.target.value)}
            placeholder="0.01"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            onClick={() => void handleDepositNative()}
            disabled={!address || isPending || isConfirming}
            className="rounded-lg bg-[color:var(--brand-forest)] px-4 py-2 text-white text-sm font-semibold disabled:opacity-50"
          >
            {isPending || isConfirming ? 'Depositing...' : 'Deposit Native'}
          </button>
        </div>
        {isConfirmed && txHash && <p className="text-xs text-emerald-700">Deposit confirmed: {txHash}</p>}
        {validationError && <p className="text-xs text-rose-700">{validationError}</p>}
      </div>
    </div>
  );
}
