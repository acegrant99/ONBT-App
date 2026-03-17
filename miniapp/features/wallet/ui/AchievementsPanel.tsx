'use client';

import { motion } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import { ONBT_STAKING_ADDRESS, ONBT_STAKING_ABI } from '../../../config/contracts';

const ACHIEVEMENT_META = [
  { bit: 0, name: 'First Stake',       icon: '🌱', desc: 'Made your first stake' },
  { bit: 1, name: 'Long-Term Holder',  icon: '⏳', desc: 'Staked for 365 consecutive days' },
  { bit: 2, name: 'Whale',             icon: '🐋', desc: 'Staked 100,000+ ONBT' },
  { bit: 3, name: 'Compound Master',   icon: '🔄', desc: 'Compounded rewards 10+ times' },
  { bit: 4, name: 'Early Adopter',     icon: '⭐', desc: 'One of the first 100 stakers' },
  { bit: 5, name: 'Loyal Staker',      icon: '🛡️', desc: 'Never unstaked for 180 days' },
  { bit: 6, name: 'Governance Active', icon: '🗳️', desc: 'Delegated or received delegation' },
  { bit: 7, name: 'Rewards Pioneer',   icon: '🏆', desc: 'Claimed rewards in the first week' },
] as const;

export function AchievementsPanel() {
  const { address } = useAccount();

  const { data: bitmap, isLoading } = useReadContract({
    chainId: 8453,
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'achievementsBitmap',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  if (!address) {
    return (
      <div className="text-center text-gray-400 py-8 text-sm">
        Connect your wallet to view achievements
      </div>
    );
  }

  const parsedBitmap = (bitmap as bigint | undefined) ?? 0n;
  const earnedCount = ACHIEVEMENT_META.filter((a) => (parsedBitmap >> BigInt(a.bit)) & 1n).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Achievement NFTs</h3>
        <span className="text-xs text-gray-400 bg-white/5 rounded-full px-2 py-0.5">
          {isLoading ? '…' : `${earnedCount} / ${ACHIEVEMENT_META.length}`}
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENT_META.map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENT_META.map((ach, i) => {
            const earned = Boolean((parsedBitmap >> BigInt(ach.bit)) & 1n);
            return (
              <motion.div
                key={ach.bit}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className={`rounded-xl border p-3 flex flex-col gap-1 transition-colors ${
                  earned
                    ? 'border-amber-500/40 bg-amber-900/20'
                    : 'border-white/10 bg-white/5 opacity-50 grayscale'
                }`}
              >
                <span className="text-2xl leading-none">{ach.icon}</span>
                <span className={`text-xs font-semibold ${earned ? 'text-amber-300' : 'text-gray-400'}`}>
                  {ach.name}
                </span>
                <span className="text-[10px] text-gray-500 leading-tight">{ach.desc}</span>
                {earned && (
                  <span className="text-[10px] text-amber-400 font-mono mt-auto">✓ Earned</span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
