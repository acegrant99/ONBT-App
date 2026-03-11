import React, { useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { parseEther, formatEther, isAddress } from 'viem';
import { Avatar, Name, Identity, Address } from '@coinbase/onchainkit/identity';
import {
  ONBT_TOKEN_ABI,
  TOKEN_INFO,
  CHAIN_CONFIG,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_STAKING_ROUTER_BASE_ADDRESS,
  ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import { runActionPreflight } from '@/lib/transactions/actionPreflight';
import { publishGlobalTxStatus } from '@/lib/txStatus';
import { ChainSelector } from '@/components/ChainSelector';

type TokenInterfaceProps = {
  quantumSignal?: 'risk-on' | 'caution';
  quantumConfidence?: number;
};

/**
 * TokenInterface Component
 * OnchainKit-powered token interface for ONBT
 * View balance, transfer tokens, and check allowances
 */
export function TokenInterface({ quantumSignal = 'caution', quantumConfidence }: TokenInterfaceProps) {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'transfer' | 'info'>('transfer');
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [reviewArmedKey, setReviewArmedKey] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isArbitrum = selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const activeTokenAddress = (isArbitrum
    ? CHAIN_CONFIG.arbitrum.tokenAddress
    : CHAIN_CONFIG.base.tokenAddress) as `0x${string}`;
  const explorerBase = isArbitrum ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;
  const chainName = isArbitrum ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const cautionMode = quantumSignal === 'caution';
  const publicClient = usePublicClient({ chainId: selectedChainId });
  const selectedStakingAddress = (isArbitrum
    ? ONBT_STAKING_ARBITRUM_ADDRESS
    : ONBT_STAKING_ADDRESS) as `0x${string}`;
  const selectedStakingRouterAddress = (isArbitrum
    ? ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS
    : ONBT_STAKING_ROUTER_BASE_ADDRESS) as `0x${string}`;

  // Read user's balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { refetchInterval: 15_000 },
  });

  // Read total supply
  const { data: totalSupply } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'totalSupply',
    query: { refetchInterval: 60_000 },
  });

  const { data: stakingAllowance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, selectedStakingAddress] : undefined,
    query: { refetchInterval: 30_000 },
  });

  const { data: stakingRouterAllowance } = useReadContract({
    chainId: selectedChainId,
    address: activeTokenAddress,
    abi: ONBT_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, selectedStakingRouterAddress] : undefined,
    query: { refetchInterval: 30_000 },
  });

  // Write functions
  const { data: txHash, writeContract: transfer, isPending, error } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const normalizedRecipient = transferTo.trim();
  const isRecipientValid = normalizedRecipient ? isAddress(normalizedRecipient) : false;
  const isSelfTransfer = Boolean(
    address && isRecipientValid && address.toLowerCase() === normalizedRecipient.toLowerCase()
  );
  const reviewContextKey = `${selectedChainId}:${normalizedRecipient.toLowerCase()}:${transferAmount}`;
  const reviewArmed = cautionMode && reviewArmedKey === reviewContextKey;
  const numericTransferAmount = Number(transferAmount);
  const hasValidAmount = Number.isFinite(numericTransferAmount) && numericTransferAmount > 0;
  const availableBalance = Number(balance ? formatEther(balance) : '0');
  const hasSufficientBalance = hasValidAmount && numericTransferAmount <= availableBalance;
  const suggestedTestAmount = useMemo(() => {
    if (!Number.isFinite(availableBalance) || availableBalance <= 0) return '0.1';
    const candidate = Math.min(Math.max(availableBalance * 0.02, 0.1), 10);
    return candidate.toFixed(2);
  }, [availableBalance]);

  const handleTransfer = async () => {
    setValidationError(null);

    if (!normalizedRecipient || !hasValidAmount) {
      setValidationError('Enter a valid recipient and transfer amount before continuing.');
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (!isRecipientValid) {
      setValidationError('Recipient address format is invalid. Check the destination carefully.');
      return;
    }

    if (isSelfTransfer) {
      setValidationError('Recipient is your connected wallet. Use a different destination address.');
      return;
    }

    if (!hasSufficientBalance) {
      setValidationError('Amount exceeds your available ONBT balance on this chain.');
      return;
    }

    if (cautionMode && !reviewArmed) {
      setReviewArmedKey(reviewContextKey);
      return;
    }

    const preflight = await runActionPreflight({
      actionLabel: 'Token transfer',
      account: address,
      connectedChainId: chain?.id,
      targetChainId: selectedChainId,
      publicClient,
      request: {
        address: activeTokenAddress,
        abi: ONBT_TOKEN_ABI,
        functionName: 'transfer',
        args: [normalizedRecipient as `0x${string}`, parseEther(transferAmount)],
      },
    });

    if (!preflight.ok) {
      setValidationError(preflight.copy);
      return;
    }

    setReviewArmedKey(null);

    try {
      transfer({
        address: activeTokenAddress,
        abi: ONBT_TOKEN_ABI,
        functionName: 'transfer',
        args: [normalizedRecipient as `0x${string}`, parseEther(transferAmount)],
      });
    } catch (err) {
      console.error('Transfer error:', err);
      setValidationError(err instanceof Error ? err.message : 'Failed to submit transfer.');
    }
  };

  // Refetch balance after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance]);

  useEffect(() => {
    if (error) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'error',
        errorMessage: error.message,
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isPending) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'pending',
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isConfirming && txHash) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'confirming',
        txHash,
        explorerBaseUrl: explorerBase,
      });
      return;
    }

    if (isConfirmed && txHash) {
      publishGlobalTxStatus({
        source: 'token',
        stage: 'success',
        txHash,
        explorerBaseUrl: explorerBase,
      });
    }
  }, [error, isPending, isConfirming, isConfirmed, txHash, explorerBase]);

  const userBalance = balance ? formatEther(balance) : '0';
  const supply = totalSupply ? formatEther(totalSupply) : TOKEN_INFO.totalSupply;
  const formattedStakingAllowance = stakingAllowance ? formatEther(stakingAllowance) : '0';
  const formattedStakingRouterAllowance = stakingRouterAllowance ? formatEther(stakingRouterAllowance) : '0';

  return (
    <div className="brand-card module-shell module-grid-bg max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header with Identity */}
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-4">ONBT Token</h2>
        <span className="module-accent-chip mb-3">Token Operations</span>
        <div className="module-banner module-banner-token text-xs text-[color:var(--brand-ink)]/85">
          Transfer lane: caution-aware recipient checks, staged confirmations, and allowance visibility.
        </div>
        <ChainSelector
          label="Use case chain"
          selectedChainId={selectedChainId}
          onSelectChain={setSelectedChainId}
        />
        <div className="mb-3 inline-flex items-center rounded-full border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)] px-3 py-1 text-xs text-[color:var(--brand-ink)]/75">
          Capability: Read + transfer ONBT on selected chain ({chainName})
        </div>
        {address && (
          <Identity address={address} className="mb-2">
            <Avatar />
            <Name />
            <Address />
          </Identity>
        )}
      </div>

      {/* Balance Card */}
      <div className="glass-tile motion-card p-6 mb-6">
        <p className="text-sm text-[color:var(--brand-ink)]/60 mb-1">Your Balance</p>
        <p className="text-4xl font-semibold text-[color:var(--brand-forest)] mb-2">
          {parseFloat(userBalance).toFixed(4)} ONBT
        </p>
        <p className="text-xs text-[color:var(--brand-ink)]/60">
          Total Supply: {parseFloat(supply).toLocaleString()} ONBT
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-[color:var(--brand-leaf)]/30">
        {(['transfer', 'info'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-[color:var(--brand-forest)] border-b-2 border-[color:var(--brand-forest)]'
                : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-forest)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transfer Tab */}
      {activeTab === 'transfer' && (
        <div className="space-y-4">
          <div
            className={`rounded-lg border px-3 py-2 text-xs ${
              cautionMode
                ? 'border-amber-300 bg-amber-50 text-amber-900'
                : 'border-emerald-300 bg-emerald-50 text-emerald-900'
            }`}
          >
            Quantum posture: <span className="font-semibold">{quantumSignal}</span>
            {typeof quantumConfidence === 'number' ? ` (${(quantumConfidence * 100).toFixed(1)}% confidence)` : ''}.
            {cautionMode
              ? ' Caution mode is active: review recipient and start with a smaller test transfer before confirming.'
              : ' Risk-on posture allows normal transfer flow with standard validation checks.'}
          </div>

          {!isWalletOnSelectedChain && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              Wallet is on {chain?.id === 42161 ? 'Arbitrum' : chain?.id === 8453 ? 'Base' : 'an unsupported chain'}.
              Switch to {chainName} to submit transfers on this use case.
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={transferTo}
              onChange={(e) => {
                setTransferTo(e.target.value);
                setValidationError(null);
              }}
              placeholder="0x..."
              className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
            />
            <div className="mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-2.5 py-2 text-xs text-[color:var(--brand-ink)]/80">
              {!normalizedRecipient && <p>Enter the full destination address to validate recipient safety.</p>}
              {normalizedRecipient && !isRecipientValid && <p className="text-rose-700">Recipient format is invalid.</p>}
              {isRecipientValid && isSelfTransfer && <p className="text-amber-700">Recipient matches your connected wallet.</p>}
              {isRecipientValid && !isSelfTransfer && (
                <p className="text-emerald-700">
                  Recipient format is valid: {normalizedRecipient.slice(0, 6)}...{normalizedRecipient.slice(-4)}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => {
                setTransferAmount(e.target.value);
                setValidationError(null);
              }}
              placeholder="0.0"
              className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60">
              <span>Available: {parseFloat(userBalance).toFixed(4)} ONBT</span>
              <button
                onClick={() => setTransferAmount(userBalance)}
                className="text-[color:var(--brand-forest)] hover:underline"
              >
                Max
              </button>
            </div>
            {!hasSufficientBalance && transferAmount && (
              <p className="mt-2 text-xs text-rose-700">Amount exceeds available balance on {chainName}.</p>
            )}
          </div>

          <div className="rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-3 py-2 text-xs text-[color:var(--brand-ink)]/85">
            <p className="font-semibold">Allowance Visibility</p>
            <p className="mt-1">Staking contract allowance: {Number(formattedStakingAllowance).toFixed(4)} ONBT</p>
            <p>Staking router allowance: {Number(formattedStakingRouterAllowance).toFixed(4)} ONBT</p>
            <p className="mt-1 text-[color:var(--brand-ink)]/70">Transfer does not consume allowance, but high allowances to spenders increase delegated spending risk.</p>
          </div>

          {cautionMode && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <p className="font-semibold">Caution Transfer Staging</p>
              <p className="mt-1">Step 1: Validate recipient and set a small test amount (suggested {suggestedTestAmount} ONBT).</p>
              <p>Step 2: Use &quot;Review Transfer Safety&quot; to arm confirmation.</p>
              <p>Step 3: Submit only after reviewing destination and amount details.</p>
              <button
                type="button"
                onClick={() => setTransferAmount(suggestedTestAmount)}
                className="mt-2 rounded-md border border-amber-400 bg-white px-2 py-1 text-xs font-medium hover:bg-amber-100"
              >
                Use Suggested Test Amount
              </button>
            </div>
          )}

          {reviewArmed && cautionMode && (
            <div className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-2 text-xs text-orange-900">
              Review armed: confirming will submit {transferAmount || '0'} ONBT to{' '}
              {isRecipientValid ? `${normalizedRecipient.slice(0, 6)}...${normalizedRecipient.slice(-4)}` : 'invalid recipient'} on {chainName}.
            </div>
          )}

          {validationError && (
            <div className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800">
              {validationError}
            </div>
          )}

          <button
            type="button"
            className="brand-button w-full text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleTransfer}
            disabled={!normalizedRecipient || !hasValidAmount || isPending || isConfirming || !address}
          >
            {isPending
              ? 'Confirming...'
              : isConfirming
                ? 'Processing...'
                : !isWalletOnSelectedChain
                  ? `Switch to ${chainName}`
                  : cautionMode
                    ? reviewArmed
                      ? 'Confirm Reviewed Transfer'
                      : 'Review Transfer Safety'
                    : 'Transfer ONBT'}
          </button>

          {txHash && (
            <a
              href={`${explorerBase}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm text-[color:var(--brand-forest)] hover:underline"
            >
              View transaction on explorer
            </a>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                Error: {error.message}
              </p>
            </div>
          )}

          {isConfirmed && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✓ Transfer successful!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info Tab */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
            <h3 className="font-semibold text-[color:var(--brand-ink)] mb-3">Token Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Name</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{TOKEN_INFO.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Symbol</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{TOKEN_INFO.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Decimals</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{TOKEN_INFO.decimals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Network</span>
                <span className="font-medium text-[color:var(--brand-ink)]">{chainName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--brand-ink)]/60">Contract</span>
                <a
                  href={`${explorerBase}/address/${activeTokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[color:var(--brand-forest)] hover:underline"
                >
                  {activeTokenAddress.slice(0, 6)}...{activeTokenAddress.slice(-4)}
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20">
            <h3 className="font-semibold text-[color:var(--brand-ink)] mb-2">About ONBT</h3>
            <p className="text-sm text-[color:var(--brand-ink)]/70 mb-3">
              {TOKEN_INFO.description}
            </p>
            <div className="flex space-x-3">
              <a
                href={TOKEN_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[color:var(--brand-forest)] hover:underline"
              >
                Website
              </a>
              <a
                href={`${explorerBase}/token/${activeTokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[color:var(--brand-forest)] hover:underline"
              >
                Explorer
              </a>
            </div>
          </div>

          <div className="p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-sun)]/40">
            <p className="text-xs text-[color:var(--brand-ink)]/70">
              🌉 ONBT is an omnichain token powered by LayerZero V2. Use the Bridge tab to move ONBT between Base and Arbitrum.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
