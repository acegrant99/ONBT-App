'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatUnits, maxUint256, parseUnits } from 'viem';
import {
  CHAIN_CONFIG,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_TOKEN_ADDRESS,
  ONBT_UNIVERSAL_POOL_ABI,
  ONBT_UNIVERSAL_POOL_BASE_ADDRESS,
  ONBT_UNIVERSAL_POOL_ARBITRUM_ADDRESS,
  USDC_BASE_ADDRESS,
  USDC_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import { ChainSelector } from '@/components/ChainSelector';
import { WalletIdentityBadge } from '@/components/WalletIdentityBadge';
import { MiniAppExternalLink } from '@/components/MiniAppExternalLink';

// Minimal ERC-20 ABI for approve + balanceOf + allowance
const ERC20_ABI = [
  { inputs: [{ name: 'owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
] as const;

type PanelKey = 'swap' | 'add' | 'remove' | 'fees';
const PANELS: { key: PanelKey; label: string; icon: string }[] = [
  { key: 'swap',   label: 'Swap',      icon: '⇄'  },
  { key: 'add',    label: 'Add LP',    icon: '+'   },
  { key: 'remove', label: 'Remove LP', icon: '−'   },
  { key: 'fees',   label: 'LP Fees',   icon: '💸'  },
];

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0];
const DEFAULT_DEADLINE_MIN = 20;

function fmt(value: bigint | undefined, decimals = 18, dp = 4): string {
  if (value === undefined) return '—';
  const s = formatUnits(value, decimals);
  const n = parseFloat(s);
  if (!isFinite(n)) return '—';
  return n.toLocaleString(undefined, { maximumFractionDigits: dp });
}

function pct(bps: bigint | undefined): string {
  if (bps === undefined) return '—';
  return (Number(bps) / 100).toFixed(2) + '%';
}

export function LiquidityPoolInterface() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedChainId, setSelectedChainId] = useState<8453 | 42161>(chain?.id === 42161 ? 42161 : 8453);
  const [panel, setPanel]         = useState<PanelKey>('swap');
  const [slippage, setSlippage]   = useState(0.5);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [approvalStep, setApprovalStep]       = useState<'idle' | 'approving' | 'done'>('idle');

  // ── Swap state ──────────────────────────────────────────────────────────────
  const [swapIn, setSwapIn]         = useState('');
  const [swapDirection, setSwapDirection] = useState<boolean>(true); // true = token0→token1

  // ── Add LP state ────────────────────────────────────────────────────────────
  const [addAmount0, setAddAmount0] = useState('');
  const [addAmount1, setAddAmount1] = useState('');

  // ── Remove LP state ─────────────────────────────────────────────────────────
  const [removeAmount, setRemoveAmount] = useState('');

  const poolAddress = (selectedChainId === 42161
    ? ONBT_UNIVERSAL_POOL_ARBITRUM_ADDRESS
    : ONBT_UNIVERSAL_POOL_BASE_ADDRESS) as `0x${string}`;

  const onbtAddress = (selectedChainId === 42161 ? ONBT_ARBITRUM_ADDRESS : ONBT_TOKEN_ADDRESS) as `0x${string}`;
  const usdcAddress = (selectedChainId === 42161 ? USDC_ARBITRUM_ADDRESS : USDC_BASE_ADDRESS) as `0x${string}`;
  const explorerBase = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.blockExplorer : CHAIN_CONFIG.base.blockExplorer;
  const chainName    = selectedChainId === 42161 ? CHAIN_CONFIG.arbitrum.name : CHAIN_CONFIG.base.name;
  const isWalletOnSelectedChain = chain?.id === selectedChainId;

  const publicClient = usePublicClient({ chainId: selectedChainId });

  // ── Pool reads ──────────────────────────────────────────────────────────────
  const { data: token0 }   = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'token0',   query: { refetchInterval: 60_000 } });
  const { data: reserve0 } = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'reserve0', query: { refetchInterval: 8_000  } });
  const { data: reserve1 } = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'reserve1', query: { refetchInterval: 8_000  } });
  const { data: feeBps }   = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'feeBps',   query: { refetchInterval: 60_000 } });
  const { data: lpSupply } = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'totalSupply', query: { refetchInterval: 8_000 } });
  const { data: lpFees0 }  = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'lpFees0',  query: { refetchInterval: 15_000 } });
  const { data: lpFees1 }  = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'lpFees1',  query: { refetchInterval: 15_000 } });

  // ── User-specific reads ─────────────────────────────────────────────────────
  const { data: lpBalance }    = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'balanceOf', args: address ? [address] : undefined, query: { enabled: !!address, refetchInterval: 10_000 } });
  const { data: claimable0 }   = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'claimable0', args: address ? [address] : undefined, query: { enabled: !!address, refetchInterval: 10_000 } });
  const { data: claimable1 }   = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'claimable1', args: address ? [address] : undefined, query: { enabled: !!address, refetchInterval: 10_000 } });
  const { data: onbtUserBal }  = useReadContract({ chainId: selectedChainId, address: onbtAddress, abi: ERC20_ABI, functionName: 'balanceOf', args: address ? [address] : undefined, query: { enabled: !!address, refetchInterval: 10_000 } });
  const { data: usdcUserBal }  = useReadContract({ chainId: selectedChainId, address: usdcAddress, abi: ERC20_ABI, functionName: 'balanceOf', args: address ? [address] : undefined, query: { enabled: !!address, refetchInterval: 10_000 } });
  const { data: onbtAllowance } = useReadContract({ chainId: selectedChainId, address: onbtAddress, abi: ERC20_ABI, functionName: 'allowance', args: address ? [address, poolAddress] : undefined, query: { enabled: !!address, refetchInterval: 5_000 } });
  const { data: usdcAllowance } = useReadContract({ chainId: selectedChainId, address: usdcAddress, abi: ERC20_ABI, functionName: 'allowance', args: address ? [address, poolAddress] : undefined, query: { enabled: !!address, refetchInterval: 5_000 } });
  const { data: lpAllowance }   = useReadContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'allowance', args: address ? [address, poolAddress] : undefined, query: { enabled: !!address, refetchInterval: 5_000 } });

  // Determine which token is token0 (ONBT or USDC — depends on lexicographic order)
  const onbtIsToken0 = token0?.toLowerCase() === onbtAddress.toLowerCase();

  // Swap quote
  const swapInParsed = useMemo(() => {
    try { return swapIn ? parseUnits(swapIn, swapDirection === onbtIsToken0 ? 18 : 6) : 0n; } catch { return 0n; }
  }, [swapIn, swapDirection, onbtIsToken0]);

  const { data: swapQuote } = useReadContract({
    chainId: selectedChainId,
    address: poolAddress,
    abi: ONBT_UNIVERSAL_POOL_ABI,
    functionName: 'getAmountOut',
    args: swapInParsed > 0n ? [swapInParsed, swapDirection] : undefined,
    query: { enabled: swapInParsed > 0n, refetchInterval: 4_000 },
  });

  // LP value for remove preview
  const removeParsed = useMemo(() => {
    try { return removeAmount ? parseUnits(removeAmount, 18) : 0n; } catch { return 0n; }
  }, [removeAmount]);

  const { data: lpValue } = useReadContract({
    chainId: selectedChainId,
    address: poolAddress,
    abi: ONBT_UNIVERSAL_POOL_ABI,
    functionName: 'getLiquidityValue',
    args: removeParsed > 0n ? [removeParsed] : undefined,
    query: { enabled: removeParsed > 0n, refetchInterval: 4_000 },
  });

  // ── Write ────────────────────────────────────────────────────────────────────
  const { data: txHash, writeContract, isPending, error: writeError, reset: resetWrite } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) setApprovalStep('idle');
  }, [isConfirmed]);

  const ensureOnChain = useCallback(() => {
    if (!isWalletOnSelectedChain) { switchChain({ chainId: selectedChainId }); return false; }
    return true;
  }, [isWalletOnSelectedChain, selectedChainId, switchChain]);

  const deadline = () => BigInt(Math.floor(Date.now() / 1000) + DEFAULT_DEADLINE_MIN * 60);
  const slippageFactor = (amount: bigint) => (amount * BigInt(Math.floor((1 - slippage / 100) * 10000))) / 10000n;

  // ── Swap action ──────────────────────────────────────────────────────────────
  const handleSwap = async () => {
    setValidationError(null);
    if (!address) { setValidationError('Connect wallet first.'); return; }
    if (!ensureOnChain()) return;
    if (!swapInParsed || swapInParsed === 0n) { setValidationError('Enter swap amount.'); return; }
    if (!swapQuote) { setValidationError('Quote unavailable — try again.'); return; }

    const tokenIn = swapDirection === onbtIsToken0 ? onbtAddress : usdcAddress;
    const needsApproval = swapDirection === onbtIsToken0
      ? (onbtAllowance ?? 0n) < swapInParsed
      : (usdcAllowance ?? 0n) < swapInParsed;

    if (needsApproval) {
      setApprovalStep('approving');
      writeContract({ chainId: selectedChainId, address: tokenIn, abi: ERC20_ABI, functionName: 'approve', args: [poolAddress, maxUint256] });
      return;
    }

    const amountOutMin = slippageFactor(swapQuote);
    writeContract({
      chainId: selectedChainId,
      address: poolAddress,
      abi: ONBT_UNIVERSAL_POOL_ABI,
      functionName: 'swapExactTokensForTokens',
      args: [swapInParsed, amountOutMin, swapDirection, address, deadline()],
    });
  };

  // ── Add LP action ────────────────────────────────────────────────────────────
  const handleAddLiquidity = async () => {
    setValidationError(null);
    if (!address) { setValidationError('Connect wallet first.'); return; }
    if (!ensureOnChain()) return;
    let amount0: bigint, amount1: bigint;
    try {
      amount0 = onbtIsToken0 ? parseUnits(addAmount0, 18) : parseUnits(addAmount0, 6);
      amount1 = onbtIsToken0 ? parseUnits(addAmount1, 6)  : parseUnits(addAmount1, 18);
    } catch { setValidationError('Invalid amount.'); return; }
    if (amount0 === 0n || amount1 === 0n) { setValidationError('Enter both amounts.'); return; }

    const needsOnbt = (onbtIsToken0 ? (onbtAllowance ?? 0n) < amount0 : (onbtAllowance ?? 0n) < amount1);
    const needsUsdc = (onbtIsToken0 ? (usdcAllowance ?? 0n) < amount1 : (usdcAllowance ?? 0n) < amount0);

    if (needsOnbt) {
      writeContract({ chainId: selectedChainId, address: onbtAddress, abi: ERC20_ABI, functionName: 'approve', args: [poolAddress, maxUint256] });
      return;
    }
    if (needsUsdc) {
      writeContract({ chainId: selectedChainId, address: usdcAddress, abi: ERC20_ABI, functionName: 'approve', args: [poolAddress, maxUint256] });
      return;
    }

    writeContract({
      chainId: selectedChainId,
      address: poolAddress,
      abi: ONBT_UNIVERSAL_POOL_ABI,
      functionName: 'addLiquidity',
      args: [amount0, amount1, slippageFactor(amount0), slippageFactor(amount1), address, deadline()],
    });
  };

  // ── Remove LP action ─────────────────────────────────────────────────────────
  const handleRemoveLiquidity = async () => {
    setValidationError(null);
    if (!address) { setValidationError('Connect wallet first.'); return; }
    if (!ensureOnChain()) return;
    if (!removeParsed || removeParsed === 0n) { setValidationError('Enter LP amount to remove.'); return; }

    const needsLpApproval = (lpAllowance ?? 0n) < removeParsed;
    if (needsLpApproval) {
      writeContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'approve', args: [poolAddress, maxUint256] });
      return;
    }

    const val0 = lpValue ? slippageFactor(lpValue[0]) : 0n;
    const val1 = lpValue ? slippageFactor(lpValue[1]) : 0n;
    writeContract({
      chainId: selectedChainId,
      address: poolAddress,
      abi: ONBT_UNIVERSAL_POOL_ABI,
      functionName: 'removeLiquidity',
      args: [removeParsed, val0, val1, address, deadline()],
    });
  };

  // ── Claim fees action ────────────────────────────────────────────────────────
  const handleClaimFees = () => {
    if (!address) { setValidationError('Connect wallet first.'); return; }
    if (!ensureOnChain()) return;
    setValidationError(null);
    writeContract({ chainId: selectedChainId, address: poolAddress, abi: ONBT_UNIVERSAL_POOL_ABI, functionName: 'claimFees', args: [] });
  };

  const isBusy = isPending || isConfirming;

  // Compute price ratio from reserves
  const priceOnbtInUsdc = useMemo(() => {
    if (!reserve0 || !reserve1 || reserve0 === 0n || reserve1 === 0n) return null;
    const r0 = onbtIsToken0 ? Number(formatUnits(reserve0, 18)) : Number(formatUnits(reserve0, 6));
    const r1 = onbtIsToken0 ? Number(formatUnits(reserve1, 6))  : Number(formatUnits(reserve1, 18));
    if (r0 === 0) return null;
    return onbtIsToken0 ? r1 / r0 : r0 / r1;
  }, [reserve0, reserve1, onbtIsToken0]);

  const tvl = useMemo(() => {
    if (!reserve0 || !reserve1) return null;
    const usdcReserve = onbtIsToken0 ? Number(formatUnits(reserve1, 6)) : Number(formatUnits(reserve0, 6));
    const onbtReserve = onbtIsToken0 ? Number(formatUnits(reserve0, 18)) : Number(formatUnits(reserve1, 18));
    const price = priceOnbtInUsdc ?? 0;
    return usdcReserve + onbtReserve * price;
  }, [reserve0, reserve1, onbtIsToken0, priceOnbtInUsdc]);

  const userLpPct = useMemo(() => {
    if (!lpBalance || !lpSupply || lpSupply === 0n) return 0;
    return (Number(formatUnits(lpBalance, 18)) / Number(formatUnits(lpSupply, 18))) * 100;
  }, [lpBalance, lpSupply]);

  const outDecimals = swapDirection === onbtIsToken0 ? 6 : 18;
  const inSymbol  = swapDirection === onbtIsToken0 ? 'ONBT' : 'USDC';
  const outSymbol = swapDirection === onbtIsToken0 ? 'USDC' : 'ONBT';

  return (
    <div className="brand-card module-shell max-w-3xl mx-auto p-4 sm:p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20 space-y-5">

      {/* ── Header ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3">
        <ChainSelector label="Pool chain" selectedChainId={selectedChainId} onSelectChain={setSelectedChainId} />
        {address && <WalletIdentityBadge address={address} className="ml-auto" label="LP wallet" />}
      </div>

      {/* ── Pool Stats ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'ONBT Price',    value: priceOnbtInUsdc !== null ? `$${priceOnbtInUsdc.toFixed(4)}` : '—' },
          { label: 'TVL',           value: tvl !== null ? `$${tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '—' },
          { label: 'Fee',           value: pct(feeBps) },
          { label: 'LP Supply',     value: fmt(lpSupply, 18, 2) },
        ].map(({ label, value }) => (
          <motion.div key={label} whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-900/10 bg-white/90 px-3 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.06)] text-center"
          >
            <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{label}</span>
            <span className="block text-lg font-bold text-slate-900 mt-0.5">{value}</span>
          </motion.div>
        ))}
      </div>

      {/* Reserve bar */}
      {reserve0 !== undefined && reserve1 !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>ONBT {fmt(onbtIsToken0 ? reserve0 : reserve1, 18, 2)}</span>
            <span>USDC {fmt(onbtIsToken0 ? reserve1 : reserve0, 6, 2)}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            {reserve0 + reserve1 > 0n && (
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Number((reserve0 * 100n) / (reserve0 + reserve1))}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Explorer link ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-mono text-slate-400 truncate">{poolAddress.slice(0, 10)}…{poolAddress.slice(-8)}</span>
        <MiniAppExternalLink href={`${explorerBase}/address/${poolAddress}`} className="shrink-0 text-sky-600 hover:text-sky-800 font-medium">
          Explorer ↗
        </MiniAppExternalLink>
      </div>

      {/* ── Sub-panel tabs ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <div className="flex gap-1.5 rounded-2xl border border-slate-900/10 bg-white/60 p-1">
        {PANELS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => { setPanel(p.key); setValidationError(null); resetWrite(); }}
            className={`flex-1 rounded-xl px-2 py-2 text-xs font-semibold transition-all ${
              panel === p.key
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span aria-hidden="true" className="mr-1">{p.icon}</span>{p.label}
          </button>
        ))}
      </div>

      {/* ── Slippage selector ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      {panel !== 'fees' && (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold shrink-0">Slippage</span>
          {SLIPPAGE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlippage(s)}
              className={`rounded-full border px-2.5 py-0.5 font-semibold transition-colors ${
                slippage === s
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >{s}%</button>
          ))}
          <input
            type="number"
            min={0.01} max={50} step={0.01}
            value={slippage}
            title="Custom slippage %"
            placeholder="0.5"
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="w-16 rounded-full border border-slate-200 px-2 py-0.5 text-center text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      )}

      {/* ── Active panel ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={panel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-4"
        >

          {/* ─── SWAP ─────────────────────────────────────────────────── */}
          {panel === 'swap' && (
            <div className="space-y-3">
              {/* From */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">You pay</span>
                  <span className="text-xs text-slate-400">
                    Bal: {inSymbol === 'ONBT' ? fmt(onbtUserBal, 18, 4) : fmt(usdcUserBal, 6, 2)} {inSymbol}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="0.0"
                    value={swapIn}
                    onChange={(e) => setSwapIn(e.target.value)}
                    className="flex-1 bg-transparent text-2xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                  />
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-800">{inSymbol}</span>
                </div>
              </div>

              {/* Flip button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setSwapDirection(!swapDirection)}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-transform hover:rotate-180 hover:bg-slate-50"
                  aria-label="Flip swap direction"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform">
                    <path d="M8 2v12M3 10l5 5 5-5M3 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* To */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">You receive</span>
                  <span className="text-xs text-slate-400">
                    Bal: {outSymbol === 'ONBT' ? fmt(onbtUserBal, 18, 4) : fmt(usdcUserBal, 6, 2)} {outSymbol}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-2xl font-bold text-slate-400">
                    {swapQuote ? fmt(swapQuote, outDecimals, 4) : '—'}
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-800">{outSymbol}</span>
                </div>
              </div>

              {/* Rate */}
              {priceOnbtInUsdc !== null && (
                <p className="text-xs text-slate-500 text-center">
                  1 ONBT ≈ ${priceOnbtInUsdc.toFixed(4)} USDC · Fee {pct(feeBps)}
                </p>
              )}

              <button
                type="button"
                disabled={isBusy || !swapIn}
                onClick={handleSwap}
                className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isBusy ? (isConfirming ? 'Confirming…' : 'Approving / Swapping…') : approvalStep === 'approving' ? 'Approve then Swap' : `Swap ${inSymbol} → ${outSymbol}`}
              </button>
            </div>
          )}

          {/* ─── ADD LP ───────────────────────────────────────────────── */}
          {panel === 'add' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="font-semibold">ONBT amount</span>
                  <span>Bal: {fmt(onbtUserBal, 18, 4)}</span>
                </div>
                <input
                  type="number" min={0} placeholder="0.0"
                  value={addAmount0}
                  onChange={(e) => setAddAmount0(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="font-semibold">USDC amount</span>
                  <span>Bal: {fmt(usdcUserBal, 6, 2)}</span>
                </div>
                <input
                  type="number" min={0} placeholder="0.0"
                  value={addAmount1}
                  onChange={(e) => setAddAmount1(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                />
              </div>
              {address && (
                <p className="text-xs text-slate-500">
                  Your LP: {fmt(lpBalance, 18, 4)} ({userLpPct.toFixed(2)}% of pool)
                </p>
              )}
              <button
                type="button"
                disabled={isBusy || !addAmount0 || !addAmount1}
                onClick={handleAddLiquidity}
                className="w-full rounded-xl bg-sky-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isBusy ? 'Processing…' : 'Add Liquidity'}
              </button>
            </div>
          )}

          {/* ─── REMOVE LP ────────────────────────────────────────────── */}
          {panel === 'remove' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="font-semibold">LP tokens to burn</span>
                  <span>Bal: {fmt(lpBalance, 18, 4)}</span>
                </div>
                <input
                  type="number" min={0} placeholder="0.0"
                  value={removeAmount}
                  onChange={(e) => setRemoveAmount(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                />
                {lpBalance && lpBalance > 0n && (
                  <button
                    type="button"
                    onClick={() => setRemoveAmount(formatUnits(lpBalance, 18))}
                    className="text-xs text-sky-600 hover:text-sky-800 font-semibold"
                  >
                    Max
                  </button>
                )}
              </div>
              {lpValue && removeParsed > 0n && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1 text-sm">
                  <p className="text-slate-500 font-semibold text-xs mb-1">You will receive (min)</p>
                  <div className="flex justify-between">
                    <span className="text-slate-700">ONBT</span>
                    <span className="font-bold">{fmt(onbtIsToken0 ? lpValue[0] : lpValue[1], 18, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">USDC</span>
                    <span className="font-bold">{fmt(onbtIsToken0 ? lpValue[1] : lpValue[0], 6, 4)}</span>
                  </div>
                </div>
              )}
              <button
                type="button"
                disabled={isBusy || !removeAmount}
                onClick={handleRemoveLiquidity}
                className="w-full rounded-xl bg-rose-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isBusy ? 'Processing…' : 'Remove Liquidity'}
              </button>
            </div>
          )}

          {/* ─── LP FEES ──────────────────────────────────────────────── */}
          {panel === 'fees' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Pool ONBT Fees</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{fmt(onbtIsToken0 ? lpFees0 : lpFees1, 18, 4)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Pool USDC Fees</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{fmt(onbtIsToken0 ? lpFees1 : lpFees0, 6, 4)}</p>
                </div>
              </div>
              {address && (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 space-y-2">
                  <p className="text-xs font-semibold text-indigo-800">Your claimable fees</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ONBT</span>
                    <span className="font-bold text-slate-900">{fmt(onbtIsToken0 ? claimable0 : claimable1, 18, 6)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">USDC</span>
                    <span className="font-bold text-slate-900">{fmt(onbtIsToken0 ? claimable1 : claimable0, 6, 4)}</span>
                  </div>
                  <p className="text-xs text-slate-500">LP share: {userLpPct.toFixed(4)}%</p>
                </div>
              )}
              <button
                type="button"
                disabled={isBusy || !address}
                onClick={handleClaimFees}
                className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isBusy ? 'Claiming…' : 'Claim LP Fees'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Status / Errors ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
      <AnimatePresence>
        {validationError && (
          <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800"
          >
            {validationError}
          </motion.p>
        )}
        {writeError && (
          <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800"
          >
            {writeError.message.slice(0, 120)}
          </motion.p>
        )}
        {isConfirmed && (
          <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800"
          >
            ✅ Transaction confirmed on {chainName}!
          </motion.p>
        )}
      </AnimatePresence>

      {/* Tx hash link */}
      {txHash && (
        <MiniAppExternalLink
          href={`${explorerBase}/tx/${txHash}`}
          className="block text-center text-xs text-sky-600 hover:text-sky-800 font-medium"
        >
          View tx on explorer ↗
        </MiniAppExternalLink>
      )}
    </div>
  );
}
