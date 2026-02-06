import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import { ONBT_POOL_ABI, ONBT_POOL_ADDRESS } from '../config/contracts';

/**
 * SwapInterface Component
 * OnchainKit-powered swap interface for ONBT/ETH
 */
export function SwapInterface() {
  const { address } = useAccount();
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [swapDirection, setSwapDirection] = useState<'ONBTtoETH' | 'ETHtoONBT'>('ONBTtoETH');
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5%

  // Read reserves
  const { data: reserves } = useReadContract({
    address: ONBT_POOL_ADDRESS,
    abi: ONBT_POOL_ABI,
    functionName: 'getReserves',
  });

  // Calculate output amount
  const { data: calculatedOutput } = useReadContract({
    address: ONBT_POOL_ADDRESS,
    abi: ONBT_POOL_ABI,
    functionName: 'getAmountOut',
    args: amountIn && reserves ? [
      parseEther(amountIn),
      swapDirection === 'ONBTtoETH' ? reserves[0] : reserves[1],
      swapDirection === 'ONBTtoETH' ? reserves[1] : reserves[0],
    ] : undefined,
  });

  // Read prices
  const { data: price0 } = useReadContract({
    address: ONBT_POOL_ADDRESS,
    abi: ONBT_POOL_ABI,
    functionName: 'getPrice0',
  });

  const { writeContract: executeSwap } = useWriteContract();

  // Update output amount when calculation completes
  React.useEffect(() => {
    if (calculatedOutput) {
      setAmountOut(formatEther(calculatedOutput as bigint));
    }
  }, [calculatedOutput]);

  const handleSwap = () => {
    if (!amountIn || !amountOut) return;

    const minOutput = (parseFloat(amountOut) * (1 - slippage / 100)).toString();

    if (swapDirection === 'ONBTtoETH') {
      executeSwap({
        address: ONBT_POOL_ADDRESS,
        abi: ONBT_POOL_ABI,
        functionName: 'swapToken0ForToken1',
        args: [parseEther(amountIn), parseEther(minOutput)],
      });
    } else {
      executeSwap({
        address: ONBT_POOL_ADDRESS,
        abi: ONBT_POOL_ABI,
        functionName: 'swapToken1ForToken0',
        args: [parseEther(minOutput)],
        value: parseEther(amountIn),
      });
    }
  };

  const switchDirection = () => {
    setSwapDirection(swapDirection === 'ONBTtoETH' ? 'ETHtoONBT' : 'ONBTtoETH');
    setAmountIn(amountOut);
    setAmountOut('');
  };

  const currentPrice = price0 ? formatEther(price0 as bigint) : '0';
  const reserveONBT = reserves ? formatEther(reserves[0]) : '0';
  const reserveETH = reserves ? formatEther(reserves[1]) : '0';

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Swap</h2>
        {address && (
          <Identity address={address} className="mb-2">
            <Avatar />
            <Name />
          </Identity>
        )}
      </div>

      {/* Price Info */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price</span>
          <span className="font-medium text-gray-900">
            1 ONBT = {parseFloat(currentPrice).toFixed(6)} ETH
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Reserves: {parseFloat(reserveONBT).toFixed(2)} ONBT</span>
          <span>{parseFloat(reserveETH).toFixed(4)} ETH</span>
        </div>
      </div>

      {/* Swap Interface */}
      <div className="space-y-2">
        {/* Input Token */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">You Pay</label>
            <span className="text-sm font-medium text-gray-900">
              {swapDirection === 'ONBTtoETH' ? 'ONBT' : 'ETH'}
            </span>
          </div>
          <input
            type="number"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            placeholder="0.0"
            className="w-full text-2xl font-bold bg-transparent border-none outline-none"
          />
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <button
            onClick={switchDirection}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Output Token */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">You Receive</label>
            <span className="text-sm font-medium text-gray-900">
              {swapDirection === 'ONBTtoETH' ? 'ETH' : 'ONBT'}
            </span>
          </div>
          <input
            type="number"
            value={amountOut}
            readOnly
            placeholder="0.0"
            className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Slippage Settings */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Slippage Tolerance</span>
          <div className="flex space-x-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 text-xs rounded ${
                  slippage === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swap Details */}
      {amountIn && amountOut && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Rate</span>
            <span className="font-medium">
              1 {swapDirection === 'ONBTtoETH' ? 'ONBT' : 'ETH'} ={' '}
              {(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)}{' '}
              {swapDirection === 'ONBTtoETH' ? 'ETH' : 'ONBT'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fee (0.3%)</span>
            <span className="font-medium">
              {(parseFloat(amountIn) * 0.003).toFixed(6)}{' '}
              {swapDirection === 'ONBTtoETH' ? 'ONBT' : 'ETH'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Minimum Received</span>
            <span className="font-medium">
              {(parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6)}{' '}
              {swapDirection === 'ONBTtoETH' ? 'ETH' : 'ONBT'}
            </span>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <div className="mt-6">
        <Transaction chainId={8453} onStatus={(status) => console.log('Swap status:', status)}>
          <TransactionButton
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            text={amountIn ? 'Swap' : 'Enter an amount'}
            onClick={handleSwap}
            disabled={!amountIn || !amountOut || parseFloat(amountIn) <= 0}
          />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          ⚠️ Price impact and slippage may vary with pool liquidity. Large trades may experience higher slippage.
        </p>
      </div>
    </div>
  );
}
