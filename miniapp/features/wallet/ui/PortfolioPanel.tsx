'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import {
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ABI,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_TOKEN_ABI,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS,
  ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS,
  ONBT_YIELD_DISTRIBUTOR_ABI,
  ONBT_VAULT_BASE_ADDRESS,
  ONBT_VAULT_ARBITRUM_ADDRESS,
  ONBT_VAULT_ABI,
} from '../../../config/contracts';
import { formatEther } from 'viem';

function fmt(raw: bigint | undefined): string {
  if (raw === undefined) return '—';
  const n = parseFloat(formatEther(raw));
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  chain?: 'Base' | 'Arbitrum' | 'Both';
};

const CHAIN_PILL: Record<string, string> = {
  Base: 'bg-blue-900/60 text-blue-300',
  Arbitrum: 'bg-indigo-900/60 text-indigo-300',
  Both: 'bg-emerald-900/60 text-emerald-300',
};

function StatCard({ label, value, sub, chain }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col gap-1"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400 truncate">{label}</span>
        {chain && (
          <span className={`text-[10px] rounded px-1.5 py-0.5 shrink-0 ${CHAIN_PILL[chain]}`}>
            {chain}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold text-white font-mono">{value}</span>
      {sub && <span className="text-[10px] text-gray-500">{sub}</span>}
    </motion.div>
  );
}

export function PortfolioPanel() {
  const { address } = useAccount();

  /* ── ONBT balances ─────────────────────────────────────── */
  const { data: baseBalance } = useReadContract({
    chainId: 8453,
    address: ONBT_TOKEN_ADDRESS,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const { data: arbBalance } = useReadContract({
    chainId: 42161,
    address: ONBT_ARBITRUM_ADDRESS,
    abi: ONBT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  /* ── Staking positions ─────────────────────────────────── */
  const { data: baseStakeInfoRaw } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const { data: arbStakeInfoRaw } = useReadContract({
    chainId: 42161,
    address: ONBT_STAKING_ARBITRUM_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  /* ── Pending staking rewards ───────────────────────────── */
  const { data: basePendingRewards } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const { data: arbPendingRewards } = useReadContract({
    chainId: 42161,
    address: ONBT_STAKING_ARBITRUM_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  /* ── Yield distributor claimable ──────────────────────── */
  const { data: baseYieldPending } = useReadContract({
    chainId: 8453,
    address: ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const { data: arbYieldPending } = useReadContract({
    chainId: 42161,
    address: ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS,
    abi: ONBT_YIELD_DISTRIBUTOR_ABI,
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  /* ── Vault balances ────────────────────────────────────── */
  // Vault holds shared protocol assets; we show total ONBT held by each vault
  const { data: baseVaultBalance } = useReadContract({
    chainId: 8453,
    address: ONBT_VAULT_BASE_ADDRESS,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [ONBT_TOKEN_ADDRESS],
    query: { refetchInterval: 30_000 },
  });

  const { data: arbVaultBalance } = useReadContract({
    chainId: 42161,
    address: ONBT_VAULT_ARBITRUM_ADDRESS,
    abi: ONBT_VAULT_ABI,
    functionName: 'getBalance',
    args: [ONBT_ARBITRUM_ADDRESS],
    query: { refetchInterval: 30_000 },
  });

  if (!address) {
    return (
      <div className="text-center text-gray-400 py-8 text-sm">
        Connect your wallet to view portfolio
      </div>
    );
  }

  /* ── Derived totals ────────────────────────────────────── */
  // getStakeInfo returns array: [staked, rewardDebt, lockupEnd, lockupPeriod, earned, isLocked, ...]
  const baseStaked = baseStakeInfoRaw ? (baseStakeInfoRaw as readonly unknown[])[0] as bigint : undefined;
  const arbStaked = arbStakeInfoRaw ? (arbStakeInfoRaw as readonly unknown[])[0] as bigint : undefined;
  const totalBalance =
    (baseBalance as bigint | undefined) !== undefined &&
    (arbBalance as bigint | undefined) !== undefined
      ? fmt(((baseBalance as bigint) ?? 0n) + ((arbBalance as bigint) ?? 0n))
      : '—';

  const totalStaked =
    baseStaked !== undefined && arbStaked !== undefined
      ? fmt((baseStaked ?? 0n) + (arbStaked ?? 0n))
      : '—';

  const totalRewards = (() => {
    const bp = basePendingRewards as bigint | undefined;
    const ap = arbPendingRewards as bigint | undefined;
    const by = baseYieldPending as bigint | undefined;
    const ay = arbYieldPending as bigint | undefined;
    if ([bp, ap, by, ay].every((v) => v !== undefined)) {
      return fmt(((bp ?? 0n) + (ap ?? 0n) + (by ?? 0n) + (ay ?? 0n)));
    }
    return '—';
  })();

  const totalVault =
    baseVaultBalance !== undefined &&
    arbVaultBalance !== undefined
      ? fmt(((baseVaultBalance as unknown as bigint) ?? 0n) + ((arbVaultBalance as unknown as bigint) ?? 0n))
      : '—';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Portfolio Overview</h3>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-400">Live</span>
        </div>
      </div>

      {/* Summary row */}
      <AnimatePresence mode="wait">
        <motion.div
          key="summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-2"
        >
          <StatCard
            label="Wallet Balance"
            value={`${totalBalance} ONBT`}
            sub="Base + Arbitrum"
            chain="Both"
          />
          <StatCard
            label="Total Staked"
            value={`${totalStaked} ONBT`}
            sub="All chains"
            chain="Both"
          />
          <StatCard
            label="Claimable Rewards"
            value={`${totalRewards} ONBT`}
            sub="Staking + Yield"
            chain="Both"
          />
          <StatCard
            label="Vault ONBT"
            value={`${totalVault} ONBT`}
            sub="Protocol vault balance"
            chain="Both"
          />
        </motion.div>
      </AnimatePresence>

      {/* Per-chain breakdown */}
      <div>
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Per Chain</p>
        <motion.div
          className="grid grid-cols-1 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            label="ONBT on Base"
            value={`${fmt(baseBalance as bigint | undefined)} ONBT`}
            chain="Base"
          />
          <StatCard
            label="Staked on Base"
            value={`${fmt(baseStaked)} ONBT`}
            chain="Base"
          />
          <StatCard
            label="Base Rewards (Staking)"
            value={`${fmt(basePendingRewards as bigint | undefined)} ONBT`}
            chain="Base"
          />
          <StatCard
            label="Base Yield Claimable"
            value={`${fmt(baseYieldPending as bigint | undefined)} ONBT`}
            chain="Base"
          />
          <StatCard
            label="Base Vault ONBT"
            value={`${fmt(baseVaultBalance as unknown as bigint | undefined)} ONBT`}
            chain="Base"
          />
          <StatCard
            label="ONBT on Arbitrum"
            value={`${fmt(arbBalance as bigint | undefined)} ONBT`}
            chain="Arbitrum"
          />
          <StatCard
            label="Staked on Arbitrum"
            value={`${fmt(arbStaked)} ONBT`}
            chain="Arbitrum"
          />
          <StatCard
            label="Arbitrum Rewards (Staking)"
            value={`${fmt(arbPendingRewards as bigint | undefined)} ONBT`}
            chain="Arbitrum"
          />
          <StatCard
            label="Arbitrum Yield Claimable"
            value={`${fmt(arbYieldPending as bigint | undefined)} ONBT`}
            chain="Arbitrum"
          />
          <StatCard
            label="Arbitrum Vault ONBT"
            value={`${fmt(arbVaultBalance as unknown as bigint | undefined)} ONBT`}
            chain="Arbitrum"
          />
        </motion.div>
      </div>
    </div>
  );
}
