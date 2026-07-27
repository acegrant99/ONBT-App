'use client';

import React, { useState, useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import {
  Identity,
  Avatar,
  Name,
  Address,
  EthBalance,
  useName,
} from '@coinbase/onchainkit/identity';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';
import { useWalletTransactions } from '@/hooks/useWalletTransactions';
import { ONBT_TOKEN_ADDRESS, ONBT_TOKEN_ABI, CHAIN_CONFIG } from '@/config/contracts';
import { PortfolioPanel } from './PortfolioPanel';
import { AchievementsPanel } from './AchievementsPanel';

const BASE_CHAIN_ID = 8453;

/**
 * Basename L2Resolver on Base mainnet.
 * Lets the wallet holder set text records (avatar, display) onchain.
 */
const L2_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD' as const;
const L2_RESOLVER_ABI = [
  {
    name: 'setText',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'key', type: 'string' },
      { name: 'value', type: 'string' },
    ],
    outputs: [],
  },
] as const;

/** Compute ENS namehash of a label like "username.base.eth" */
function namehash(name: string): `0x${string}` {
  if (!name) return `0x${'00'.repeat(32)}`;
  const parts = name.split('.');
  let node: Uint8Array = new Uint8Array(32).fill(0);
  for (let i = parts.length - 1; i >= 0; i--) {
    const labelHash = ethKeccak256(new TextEncoder().encode(parts[i]));
    const combined = new Uint8Array(64);
    combined.set(node, 0);
    combined.set(labelHash, 32);
    node = ethKeccak256(combined);
  }
  return `0x${Array.from(node).map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

function ethKeccak256(data: Uint8Array): Uint8Array {
  // Minimal keccak256 is unavailable without a lib — use viem's keccak256 at runtime
  // We import it lazily so this file remains a valid module without top-level await.
  // For the UI, we use viem's keccak256 which is already bundled via wagmi.
  try {
    const { keccak256 } = require('viem') as { keccak256: (d: Uint8Array) => `0x${string}` };
    const hex = keccak256(data);
    return Uint8Array.from(Buffer.from(hex.slice(2), 'hex'));
  } catch {
    return new Uint8Array(32).fill(0);
  }
}

// ─── Sub-panel: Receive ──────────────────────────────────────────────────────

function ReceivePanel({ address }: { address: `0x${string}` }) {
  const [copied, setCopied] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(address)}&size=180x180&margin=8&color=0f172a&bgcolor=ffffff&qzone=2`;

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked in-frame; fallback: select text
    }
  }, [address]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Receive</span>
        <span className="rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900">Base · 8453</span>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* QR Code */}
        <div className="flex-shrink-0 rounded-2xl border border-slate-900/10 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt={`QR code for ${address}`}
            width={180}
            height={180}
            className="h-[180px] w-[180px] rounded-xl"
          />
        </div>

        {/* Address + copy */}
        <div className="flex-1 space-y-3">
          <p className="text-xs text-slate-500">Share this address to receive any token on Base.</p>
          <div className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3">
            <p className="break-all font-['IBM_Plex_Mono'] text-[13px] font-semibold text-slate-900">{address}</p>
          </div>
          <button
            type="button"
            onClick={() => void copyAddress()}
            className={`w-full rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              copied
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-slate-900/12 bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {copied ? '✓ Address Copied' : 'Copy Address'}
          </button>
          <MiniAppExternalLink
            href={`${CHAIN_CONFIG.base.blockExplorer}/address/${address}`}
            className="block w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300/60 hover:text-cyan-700"
          >
            View on BaseScan ↗
          </MiniAppExternalLink>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-panel: Transaction History ─────────────────────────────────────────

function TxHistoryPanel({ address }: { address: `0x${string}` }) {
  const { data: txs, isLoading, isError, refetch } = useWalletTransactions(ONBT_TOKEN_ADDRESS);
  const { data: balance } = useReadContract({
    address: ONBT_TOKEN_ADDRESS,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: BASE_CHAIN_ID,
  });

  const formattedBalance = balance !== undefined
    ? parseFloat(formatEther(balance as bigint)).toLocaleString(undefined, { maximumFractionDigits: 2 })
    : '—';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Transactions</span>
          <span className="rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900">ONBT · Base</span>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-full border border-slate-900/12 bg-white px-3 py-1 text-[10px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {/* ONBT Balance */}
      <div className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3">
        <p className="text-xs text-slate-500">ONBT Balance (Base)</p>
        <p className="mt-1 font-['IBM_Plex_Mono'] text-lg font-bold text-slate-900">{formattedBalance} ONBT</p>
      </div>

      {/* Transaction list */}
      {isLoading && (
        <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-6 text-center text-sm text-slate-400">
          Scanning recent ONBT transfers…
        </div>
      )}
      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Could not load transaction history. Check your RPC connection.
        </div>
      )}
      {!isLoading && !isError && txs && txs.length === 0 && (
        <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-6 text-center text-sm text-slate-400">
          No recent ONBT transfers found in the last 5 000 blocks.
        </div>
      )}
      {txs && txs.length > 0 && (
        <div className="space-y-2">
          {txs.map((tx) => (
            <MiniAppExternalLink
              key={tx.hash}
              href={`${tx.chainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer}/tx/${tx.hash}`}
              className="flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm transition-colors hover:border-cyan-300/60"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
                  tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tx.type === 'in' ? '↓' : '↑'}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{tx.type === 'in' ? 'Received' : 'Sent'} ONBT</p>
                  <p className="font-['IBM_Plex_Mono'] text-[11px] text-slate-500">
                    {tx.type === 'in' ? 'from' : 'to'} {tx.counterpart.slice(0, 8)}…{tx.counterpart.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-['IBM_Plex_Mono'] font-semibold ${tx.type === 'in' ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {tx.type === 'in' ? '+' : '-'}{tx.amountFormatted}
                </p>
                <p className="font-['IBM_Plex_Mono'] text-[10px] text-slate-400">{tx.chainLabel} #{tx.blockNumber.toString()}</p>
              </div>
            </MiniAppExternalLink>
          ))}
        </div>
      )}

      <MiniAppExternalLink
        href={`${CHAIN_CONFIG.base.blockExplorer}/address/${address}#tokentxns`}
        className="block w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300/60 hover:text-cyan-700"
      >
        Full History on BaseScan ↗
      </MiniAppExternalLink>
    </div>
  );
}

// ─── Sub-panel: Profile / Identity ──────────────────────────────────────────

function ProfilePanel({ address }: { address: `0x${string}` }) {
  const { data: basename } = useName({ address, chain: { id: BASE_CHAIN_ID } as Parameters<typeof useName>[0]['chain'] });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Profile</span>
        {basename && (
          <span className="rounded-full border border-violet-300/50 bg-violet-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-900">
            {basename}
          </span>
        )}
      </div>

      {/* OnchainKit Identity card */}
      <div className="rounded-2xl border border-slate-900/10 bg-white p-4">
        <Identity address={address} chain={{ id: BASE_CHAIN_ID } as Parameters<typeof Identity>[0]['chain']} className="flex items-center gap-4">
          <Avatar className="h-14 w-14 rounded-2xl" />
          <div className="min-w-0 space-y-1">
            <Name className="text-base font-bold text-slate-900" />
            <Address className="font-['IBM_Plex_Mono'] text-xs text-slate-500" />
            <EthBalance className="font-['IBM_Plex_Mono'] text-xs font-semibold text-slate-700" />
          </div>
        </Identity>
      </div>

      <MiniAppExternalLink
        href="https://www.base.org/names"
        className="block w-full rounded-2xl border border-violet-300/50 bg-violet-50 px-4 py-3 text-center font-semibold text-violet-900 transition-colors hover:bg-violet-100"
      >
        Manage Basename at base.org/names ↗
      </MiniAppExternalLink>

      <div className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Basenames are onchain identities on Base. Register one at base.org/names, then it shows up automatically here and across OnchainKit apps.
      </div>
    </div>
  );
}

// ─── Sub-panel: Edit Name & Avatar onchain ───────────────────────────────────

function EditProfilePanel({ address }: { address: `0x${string}` }) {
  const { data: basename } = useName({ address, chain: { id: BASE_CHAIN_ID } as Parameters<typeof useName>[0]['chain'] });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [activeField, setActiveField] = useState<'avatar' | 'display'>('display');

  const ensNode = basename ? namehash(basename.includes('.') ? basename : `${basename}.base.eth`) : undefined;

  const calls = ensNode
    ? [
        {
          to: L2_RESOLVER_ADDRESS as `0x${string}`,
          data: (() => {
            try {
              const { encodeFunctionData } = require('viem') as {
                encodeFunctionData: (p: { abi: typeof L2_RESOLVER_ABI; functionName: string; args: unknown[] }) => `0x${string}`;
              };
              return encodeFunctionData({
                abi: L2_RESOLVER_ABI,
                functionName: 'setText',
                args: [ensNode, activeField === 'avatar' ? 'avatar' : 'display', activeField === 'avatar' ? avatarUrl : displayName],
              });
            } catch {
              return '0x' as `0x${string}`;
            }
          })(),
        },
      ]
    : undefined;

  if (!basename) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Edit Profile</span>
        </div>
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          <p className="font-semibold">No Basename Found</p>
          <p className="mt-1 text-xs">You need a Basename to set onchain profile data (avatar, display name). Register one first.</p>
        </div>
        <MiniAppExternalLink
          href="https://www.base.org/names"
          className="block w-full rounded-2xl border border-violet-300/50 bg-violet-50 px-4 py-3 text-center font-semibold text-violet-900 transition-colors hover:bg-violet-100"
        >
          Register a Basename ↗
        </MiniAppExternalLink>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Edit Profile</span>
        <span className="rounded-full border border-violet-300/50 bg-violet-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-900">{basename}</span>
        <span className="rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900">L2Resolver · Base</span>
      </div>

      {/* Field selector */}
      <div className="inline-flex rounded-xl border border-slate-900/10 bg-slate-100 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveField('display')}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${activeField === 'display' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Display Name
        </button>
        <button
          type="button"
          onClick={() => setActiveField('avatar')}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${activeField === 'avatar' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Avatar URL
        </button>
      </div>

      {activeField === 'display' ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600">New Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. ONabat Trader"
            maxLength={64}
            className="w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600">Avatar Image URL (https://…)</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.png"
            className="w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          {avatarUrl && (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl} alt="avatar preview" className="h-10 w-10 rounded-full border border-slate-200 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="text-xs text-slate-500">Preview</span>
            </div>
          )}
        </div>
      )}

      {calls && ((activeField === 'display' && displayName.trim()) || (activeField === 'avatar' && avatarUrl.trim())) ? (
        <Transaction
          chainId={BASE_CHAIN_ID}
          calls={calls as Parameters<typeof Transaction>[0]['calls']}
        >
          <TransactionButton
            text={`Set ${activeField === 'display' ? 'Display Name' : 'Avatar'} Onchain`}
            className="w-full rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          />
          <TransactionStatus>
            <TransactionStatusLabel className="text-sm text-slate-700" />
            <TransactionStatusAction className="text-sm" />
          </TransactionStatus>
        </Transaction>
      ) : (
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-2xl border border-slate-900/10 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
        >
          {`Enter a ${activeField === 'display' ? 'display name' : 'valid avatar URL'} to continue`}
        </button>
      )}

      <div className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        This writes a text record to the ENS L2Resolver on Base. Costs only gas (~$0.01). Your change will be reflected immediately across ENS-aware apps.
      </div>
    </div>
  );
}

// ─── Main WalletPanel ────────────────────────────────────────────────────────

type WalletSection = 'portfolio' | 'receive' | 'history' | 'achievements' | 'profile' | 'edit';

export function WalletPanel() {
  const { address, isConnected } = useAccount();
  const [section, setSection] = useState<WalletSection>('portfolio');

  if (!isConnected || !address) {
    return (
      <section className="brand-panel reveal-up p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">Wallet</span>
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-slate-50 px-6 py-10 text-center text-sm text-slate-400">
          Connect a wallet to view your balance, transactions, and profile.
        </div>
      </section>
    );
  }

  const navItems: { key: WalletSection; label: string; icon: string }[] = [
    { key: 'portfolio', label: 'Portfolio', icon: '📊' },
    { key: 'receive', label: 'Receive', icon: '↓' },
    { key: 'history', label: 'Transactions', icon: '📋' },
    { key: 'achievements', label: 'Achievements', icon: '🏆' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'edit', label: 'Edit Profile', icon: '✏️' },
  ];

  return (
    <section className="brand-panel reveal-up space-y-5 p-4 sm:p-6">
      {/* Section navigation */}
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSection(item.key)}
            className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-semibold transition-all ${
              section === item.key
                ? 'border-slate-900/20 bg-slate-900 text-white shadow-[0_8px_18px_rgba(15,23,42,0.18)]'
                : 'border-slate-900/12 bg-white text-slate-700 hover:border-slate-900/25 hover:bg-slate-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Active section */}
      <div className="rounded-2xl border border-slate-900/10 bg-white p-4 sm:p-5">
        {section === 'portfolio' && <PortfolioPanel />}
        {section === 'receive' && <ReceivePanel address={address} />}
        {section === 'history' && <TxHistoryPanel address={address} />}
        {section === 'achievements' && <AchievementsPanel />}
        {section === 'profile' && <ProfilePanel address={address} />}
        {section === 'edit' && <EditProfilePanel address={address} />}
      </div>
    </section>
  );
}
