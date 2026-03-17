/**
 * Example components: Token transfer and balance lookups using ContractFunctionForm
 */

import React from 'react';
import ContractFunctionForm from './ContractFunctionForm';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { useEthersProvider } from '../hooks/useEthersProvider';
import OmnichainNabatOFTABI from '../contracts/abi/OmnichainNabatOFT.json';
import { useAccount } from 'wagmi';
import { getContractAddresses } from '@/config/contracts';
import toast from 'react-hot-toast';

/**
 * Form to transfer ONBT tokens
 */
export const TokenTransferForm: React.FC = () => {
  const signer = useEthersSigner();
  const { chainId } = useAccount();
  const contracts = getContractAddresses(chainId || 8453);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Transfer ONBT</h2>
        <p className="text-gray-600 mt-2">
          Send ONBT tokens to another address
        </p>
      </div>

      <ContractFunctionForm
        contractAddress={contracts.onbtToken}
        abi={OmnichainNabatOFTABI}
        functionName="transfer"
        signer={signer}
        submitButtonText="Send Tokens"
        fieldLabels={{
          to: 'Recipient Address',
          amount: 'Amount (wei)',
        }}
        onSuccess={(result) => {
          console.log('Transfer complete:', result);
          toast.success('Transfer sent successfully!');
        }}
        onError={(error) => {
          console.error('Transfer failed:', error);
          toast.error(`Transfer failed: ${error.message}`);
        }}
      />
    </div>
  );
};

/**
 * Form to read ONBT balance
 */
export const TokenBalanceForm: React.FC = () => {
  const provider = useEthersProvider();
  const { chainId } = useAccount();
  const contracts = getContractAddresses(chainId || 8453);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Check ONBT Balance</h2>
        <p className="text-gray-600 mt-2">
          Read token balance for any wallet address
        </p>
      </div>

      <ContractFunctionForm
        contractAddress={contracts.onbtToken}
        abi={OmnichainNabatOFTABI}
        functionName="balanceOf"
        provider={provider}
        submitButtonText="Read Balance"
        fieldLabels={{
          account: 'Wallet Address',
        }}
        onSuccess={(result) => {
          console.log('Balance result:', result);
          toast.success('Balance fetched successfully!');
        }}
        onError={(error) => {
          console.error('Balance read failed:', error);
          toast.error(`Failed to read balance: ${error.message}`);
        }}
      />
    </div>
  );
};

/**
 * Generic contract form builder - accepts any contract and function
 */
export const GenericContractForm: React.FC<{
  contractAddress: string;
  contractABI: any[];
  functionName: string;
  contractName?: string;
}> = ({ contractAddress, contractABI, functionName, contractName = 'Contract' }) => {
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{functionName}</h2>
        <p className="text-gray-600 mt-2">{contractName}</p>
      </div>

      <ContractFunctionForm
        contractAddress={contractAddress}
        abi={contractABI}
        functionName={functionName}
        signer={signer}
        provider={provider}
        showResultModal={true}
      />
    </div>
  );
};

export default TokenTransferForm;
