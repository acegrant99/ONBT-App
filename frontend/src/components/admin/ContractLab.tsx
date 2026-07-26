/**
 * Contract Lab - ABI-driven form playground
 * Select a contract and function to auto-generate a transaction form
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import ContractFunctionForm from '@components/ContractFunctionForm';
import { useABIReadFunctions, useABIWriteFunctions, useABIFunction } from '@hooks/useABIFunction';
import { useEthersSigner } from '@hooks/useEthersSigner';
import { useEthersProvider } from '@hooks/useEthersProvider';
import { generateFunctionSignature } from '@lib/abiParser';
import { cn } from '@lib/utils';
import { getContractAddresses } from '@/config/contracts';

import OmnichainNabatOFTABI from '@/contracts/abi/OmnichainNabatOFT.json';
import ONBTOmnichainStakingABI from '@/contracts/abi/ONBTOmnichainStaking.json';
import ONBTGovernorABI from '@/contracts/abi/ONBTGovernor.json';
import ONBTRewardsPoolABI from '@/contracts/abi/ONBTRewardsPool.json';
import ONBTLiquidityManagerABI from '@/contracts/abi/ONBTLiquidityManager.json';
import ONBTRevenueRouterABI from '@/contracts/abi/ONBTRevenueRouter.json';
import ONBTAchievementNFTABI from '@/contracts/abi/ONBTAchievementNFT.json';

type ContractOptionKey = 'onbtToken' | 'staking' | 'governor' | 'rewardsPool' | 'liquidityManager' | 'revenueRouter' | 'achievementNFT';

const CONTRACT_OPTIONS: { key: ContractOptionKey; label: string; abi: any[]; addressKey: string }[] = [
  { key: 'onbtToken', label: 'ONBT Token (OFT)', abi: OmnichainNabatOFTABI.abi, addressKey: 'onbtToken' },
  { key: 'staking', label: 'Omnichain Staking', abi: ONBTOmnichainStakingABI.abi, addressKey: 'staking' },
  { key: 'governor', label: 'Governor', abi: ONBTGovernorABI.abi, addressKey: 'governor' },
  { key: 'rewardsPool', label: 'Rewards Pool', abi: ONBTRewardsPoolABI.abi, addressKey: 'rewardsPool' },
  { key: 'liquidityManager', label: 'Liquidity Manager', abi: ONBTLiquidityManagerABI.abi, addressKey: 'liquidityManager' },
  { key: 'revenueRouter', label: 'Revenue Router', abi: ONBTRevenueRouterABI.abi, addressKey: 'revenueRouter' },
  { key: 'achievementNFT', label: 'Achievement NFT', abi: ONBTAchievementNFTABI.abi, addressKey: 'achievementNFT' },
];

type Mode = 'write' | 'read';

const ContractLab: React.FC = () => {
  const { chainId, isConnected } = useAccount();
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const contracts = getContractAddresses(chainId || 8453);

  const [selectedContract, setSelectedContract] = useState<ContractOptionKey>('onbtToken');
  const [mode, setMode] = useState<Mode>('write');
  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [customAddress, setCustomAddress] = useState<string>('');

  const contractOption = useMemo(() => {
    return CONTRACT_OPTIONS.find(option => option.key === selectedContract) || CONTRACT_OPTIONS[0];
  }, [selectedContract]);

  const writeFunctions = useABIWriteFunctions(contractOption.abi);
  const readFunctions = useABIReadFunctions(contractOption.abi);

  const functionList = mode === 'write' ? writeFunctions : readFunctions;

  useEffect(() => {
    if (functionList.length > 0) {
      setSelectedFunction(functionList[0].name);
    } else {
      setSelectedFunction('');
    }
  }, [contractOption, mode, functionList.length]);

  const addressKey = contractOption.addressKey as keyof typeof contracts;
  const resolvedAddress = customAddress.trim() || contracts[addressKey] || '';

  const abiDetails = useABIFunction(contractOption.abi, selectedFunction);
  const signature = abiDetails ? generateFunctionSignature(abiDetails.function) : '';

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Contract Lab</h2>
            <p className="text-sm text-slate-400">
              Build transactions instantly from contract ABIs. Select a contract, choose a function, and execute.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('write')}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition',
                mode === 'write'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              Write
            </button>
            <button
              onClick={() => setMode('read')}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition',
                mode === 'read'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contract</label>
            <select
              value={selectedContract}
              onChange={event => setSelectedContract(event.target.value as ContractOptionKey)}
              aria-label="Select contract"
              title="Select contract"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-purple-500 focus:outline-none"
            >
              {CONTRACT_OPTIONS.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contract Address</label>
            <input
              type="text"
              value={customAddress}
              onChange={event => setCustomAddress(event.target.value)}
              placeholder={contracts[addressKey]}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-purple-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500">Leave blank to use the deployed address for the current chain.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Function</label>
            <select
              value={selectedFunction}
              onChange={event => setSelectedFunction(event.target.value)}
              aria-label="Select function"
              title="Select function"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-purple-500 focus:outline-none"
            >
              {functionList.length === 0 && <option value="">No functions available</option>}
              {functionList.map(func => (
                <option key={func.name} value={func.name}>
                  {func.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
            <p className="font-semibold text-slate-300">Signature</p>
            <p className="mt-2 break-words font-mono text-[11px] text-slate-400">
              {signature || 'Select a function to preview the signature.'}
            </p>
          </div>

          {!isConnected && mode === 'write' && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
              Connect a wallet to execute write transactions.
            </div>
          )}

          {!resolvedAddress && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-200">
              No contract address resolved. Provide a custom address to proceed.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-white p-6 shadow-xl">
          {resolvedAddress && selectedFunction ? (
            <ContractFunctionForm
              contractAddress={resolvedAddress}
              abi={contractOption.abi}
              functionName={selectedFunction}
              signer={signer}
              provider={provider}
              showResultModal={true}
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
              Select a contract and function to generate a form.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractLab;
