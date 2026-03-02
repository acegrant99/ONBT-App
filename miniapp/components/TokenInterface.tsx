import React, { useState } from 'react';
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { parseEther, formatEther, isAddress } from 'viem';
import { Avatar, Name, Identity, Address } from '@coinbase/onchainkit/identity';
import { ONBT_TOKEN_ABI, TOKEN_INFO, CHAIN_CONFIG } from '../config/contracts';
import { publishGlobalTxStatus } from '../lib/txStatus';
import { ChainSelector } from './ChainSelector';

/**
 * TokenInterface Component
 * OnchainKit-powered token interface for ONBT
 * View balance, transfer tokens, and check allowances
 */
export function TokenInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'transfer' | 'info'>('transfer');
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);

  const isArbitrum = selectedChainId === 42161;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;
  const activeTokenAddress = (isArbitrum
    ? CHAIN_CONFIG.arbitrum.tokenAddress
    : CHAIN_CONFIG.base.tokenAddress) as `0x${string}`;
  const explorerBase = isArbitrum ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;
  const chainName = isArbitrum ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;

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

  // Write functions
  const { data: txHash, writeContract: transfer, isPending, error } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleTransfer = () => {
    if (!transferTo || !transferAmount || parseFloat(transferAmount) <= 0) {
      return;
    }

    if (!isWalletOnSelectedChain) {
      switchChain({ chainId: selectedChainId });
      return;
    }

    if (!isAddress(transferTo)) {
      alert('Invalid recipient address');
      return;
    }

    try {
      transfer({
        address: activeTokenAddress,
        abi: ONBT_TOKEN_ABI,
        functionName: 'transfer',
        args: [transferTo as `0x${string}`, parseEther(transferAmount)],
      });
    } catch (err) {
      console.error('Transfer error:', err);
    }
  };

  // Refetch balance after successful transaction
  React.useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      setTransferTo('');
      setTransferAmount('');
    }
  }, [isConfirmed, refetchBalance]);

  React.useEffect(() => {
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

  return (
    <div className="brand-card max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20">
      {/* Header with Identity */}
      <div className="mb-6 border-b border-[color:var(--brand-leaf)]/30 pb-4">
        <h2 className="text-2xl font-semibold brand-display mb-4">ONBT Token</h2>
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
      <div className="p-6 bg-[color:var(--brand-cream)] rounded-xl border border-[color:var(--brand-leaf)]/20 mb-6">
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
              onChange={(e) => setTransferTo(e.target.value)}
              placeholder="0x..."
              className="brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--brand-ink)]/70 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
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
          </div>

          <button
            type="button"
            className="brand-button w-full text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleTransfer}
            disabled={!transferTo || !transferAmount || parseFloat(transferAmount) <= 0 || isPending || isConfirming || !address}
          >
            {isPending
              ? 'Confirming...'
              : isConfirming
                ? 'Processing...'
                : !isWalletOnSelectedChain
                  ? `Switch to ${chainName}`
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
