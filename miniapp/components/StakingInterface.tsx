import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { 
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import { Avatar, Name, Identity, Address } from '@coinbase/onchainkit/identity';
import { ONBT_STAKING_ABI, ONBT_STAKING_ADDRESS } from '../config/contracts';

/**
 * StakingInterface Component
 * OnchainKit-powered staking interface for ONBT tokens
 */
export function StakingInterface() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [lockupPeriod, setLockupPeriod] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake' | 'rewards'>('stake');

  // Lockup options with bonuses
  const lockupOptions = [
    { period: 0, label: 'No Lockup', bonus: '1x' },
    { period: 30 * 24 * 60 * 60, label: '30 Days', bonus: '1.2x' },
    { period: 90 * 24 * 60 * 60, label: '90 Days', bonus: '1.5x' },
    { period: 180 * 24 * 60 * 60, label: '180 Days', bonus: '2x' },
    { period: 365 * 24 * 60 * 60, label: '365 Days', bonus: '3x' },
  ];

  // Read user's stake info
  const { data: stakeInfo } = useReadContract({
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
  });

  // Read earned rewards
  const { data: earnedRewards } = useReadContract({
    address: ONBT_STAKING_ADDRESS,
    abi: ONBT_STAKING_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
  });

  // Write functions
  const { writeContract: stakeTokens } = useWriteContract();
  const { writeContract: withdrawTokens } = useWriteContract();
  const { writeContract: claimRewards } = useWriteContract();
  const { writeContract: compoundRewards } = useWriteContract();

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    stakeTokens({
      address: ONBT_STAKING_ADDRESS,
      abi: ONBT_STAKING_ABI,
      functionName: 'stake',
      args: [parseEther(stakeAmount), lockupPeriod],
    });
  };

  const handleWithdraw = (amount?: string) => {
    const withdrawAmount = amount ? parseEther(amount) : 0n;
    
    withdrawTokens({
      address: ONBT_STAKING_ADDRESS,
      abi: ONBT_STAKING_ABI,
      functionName: 'withdraw',
      args: [withdrawAmount],
    });
  };

  const handleClaimRewards = () => {
    claimRewards({
      address: ONBT_STAKING_ADDRESS,
      abi: ONBT_STAKING_ABI,
      functionName: 'claimRewards',
    });
  };

  const handleCompound = () => {
    compoundRewards({
      address: ONBT_STAKING_ADDRESS,
      abi: ONBT_STAKING_ABI,
      functionName: 'compound',
    });
  };

  const stakedAmount = stakeInfo ? formatEther(stakeInfo[0]) : '0';
  const rewards = earnedRewards ? formatEther(earnedRewards) : '0';
  const isLocked = stakeInfo ? stakeInfo[5] : false;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header with Identity */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ONBT Staking</h2>
        {address && (
          <Identity address={address} className="mb-2">
            <Avatar />
            <Name />
            <Address />
          </Identity>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Staked Balance</p>
          <p className="text-2xl font-bold text-blue-900">{parseFloat(stakedAmount).toFixed(2)} ONBT</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Rewards Earned</p>
          <p className="text-2xl font-bold text-green-900">{parseFloat(rewards).toFixed(4)} ONBT</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        {(['stake', 'unstake', 'rewards'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stake Tab */}
      {activeTab === 'stake' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Stake
            </label>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lockup Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {lockupOptions.map((option) => (
                <button
                  key={option.period}
                  onClick={() => setLockupPeriod(option.period)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    lockupPeriod === option.period
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.bonus} Rewards</div>
                </button>
              ))}
            </div>
          </div>

          <Transaction
            chainId={8453} // Base mainnet
            onStatus={(status) => console.log('Transaction status:', status)}
          >
            <TransactionButton
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              text="Stake ONBT"
              onClick={handleStake}
            />
            <TransactionStatus>
              <TransactionStatusLabel />
              <TransactionStatusAction />
            </TransactionStatus>
          </Transaction>
        </div>
      )}

      {/* Unstake Tab */}
      {activeTab === 'unstake' && (
        <div className="space-y-4">
          {isLocked && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Your stake is currently locked. You can withdraw after the lockup period ends.
              </p>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Available to Withdraw</p>
            <p className="text-xl font-bold text-gray-900">{stakedAmount} ONBT</p>
          </div>

          <Transaction chainId={8453}>
            <TransactionButton
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              text="Withdraw All"
              onClick={() => handleWithdraw()}
              disabled={isLocked || parseFloat(stakedAmount) === 0}
            />
            <TransactionStatus>
              <TransactionStatusLabel />
              <TransactionStatusAction />
            </TransactionStatus>
          </Transaction>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Claimable Rewards</p>
            <p className="text-3xl font-bold text-purple-900 mb-4">{rewards} ONBT</p>
            <p className="text-xs text-gray-500">
              Rewards are calculated in real-time based on your stake amount and lockup bonus
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Transaction chainId={8453}>
              <TransactionButton
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                text="Claim Rewards"
                onClick={handleClaimRewards}
                disabled={parseFloat(rewards) === 0}
              />
            </Transaction>

            <Transaction chainId={8453}>
              <TransactionButton
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                text="Compound"
                onClick={handleCompound}
                disabled={parseFloat(rewards) === 0}
              />
            </Transaction>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              💡 Tip: Compounding automatically restakes your rewards, increasing your future earnings!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
