/**
 * Quick Start Guide - ABI-Driven Forms
 * Copy-paste examples to get started immediately
 */

// ============================================================================
// EXAMPLE 1: Simple Pool Registration Form
// ============================================================================

import ContractFunctionForm from '@/components/ContractFunctionForm';
import ONBTPoolManagerABI from '@/contracts/abi/ONBTPoolManager.json';
import { useWalletConnected } from '@/hooks/useWalletConnected'; // Your wallet hook

export function SimplePoolRegistration() {
  const { signer } = useWalletConnected();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Register New Pool</h1>

      <ContractFunctionForm
        contractAddress="0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3" // Replace with actual address
        abi={ONBTPoolManagerABI}
        functionName="registerPool"
        signer={signer}
        submitButtonText="Create Pool"
        onSuccess={() => alert('Pool created!')}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Read Pool Data Using Hook
// ============================================================================

import { useContractRead } from '@/hooks/useContractFunction';
import { useProvider } from '@/hooks/useProvider'; // Your provider hook

export function GetPoolInfo() {
  const provider = useProvider();

  const { data: pool, isLoading } = useContractRead(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    "getPool",
    ["0x123..."], // poolId
    provider
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>Pool Token 0: {pool.token0}</p>
      <p>Pool Token 1: {pool.token1}</p>
      <p>Pool Fee: {pool.fee}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Dynamic Form for Any Function
// ============================================================================

import { useABIFunction } from '@/hooks/useABIFunction';

export function DynamicForm({
  contractAddress,
  abi,
  functionName,
  signer,
}) {
  // Automatically parse the ABI
  const abiData = useABIFunction(abi, functionName);

  if (!abiData) {
    return <p>Function not found</p>;
  }

  return (
    <div>
      <h2>
        {functionName}
        {abiData.isReadOnly && ' (View Only)'}
        {abiData.isPayable && ' (Accepts ETH)'}
      </h2>

      <ContractFunctionForm
        contractAddress={contractAddress}
        abi={abi}
        functionName={functionName}
        signer={signer}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Batch Read Multiple Pool Info
// ============================================================================

import { useMultipleContractReads } from '@/hooks/useContractFunction';

const POOL_IDS = ["0x1", "0x2", "0x3"];
const POOL_MANAGER = "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3";

export function PoolListWithInfo() {
  const { data: pools } = useMultipleContractReads(
    POOL_IDS.map(poolId => ({
      address: POOL_MANAGER,
      abi: ONBTPoolManagerABI,
      functionName: 'getPool',
      args: [poolId],
    })),
    provider
  );

  return (
    <table>
      <tbody>
        {pools?.map((pool, i) => (
          <tr key={i}>
            <td>{pool.token0}</td>
            <td>{pool.token1}</td>
            <td>{pool.fee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================================
// EXAMPLE 5: Parse ABI to Detect Functions
// ============================================================================

import { getReadFunctions, getWriteFunctions } from '@/lib/abiParser';

export function ContractInterface() {
  const readFuncs = getReadFunctions(ONBTPoolManagerABI);
  const writeFuncs = getWriteFunctions(ONBTPoolManagerABI);

  return (
    <div>
      <h3>Read Functions ({readFuncs.length})</h3>
      <ul>
        {readFuncs.map(f => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>

      <h3>Write Functions ({writeFuncs.length})</h3>
      <ul>
        {writeFuncs.map(f => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Convert Form Values to Solidity Types
// ============================================================================

import { parseFormValue } from '@/lib/abiTypeConversion';

const formData = {
  poolAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
  amount: "1000000000000000000",
  isActive: true,
};

// Convert to contract-compatible types
const contractArgs = [
  parseFormValue(formData.poolAddress, "address"),
  parseFormValue(formData.amount, "uint256"),
  parseFormValue(formData.isActive, "bool"),
];

// Now these can be passed to contract.functionName(...contractArgs)

// ============================================================================
// EXAMPLE 7: Watch for Pool Events
// ============================================================================

import { useContractEvents } from '@/hooks/useContractFunction';

export function PoolEventLog() {
  const { data: events } = useContractEvents(
    POOL_MANAGER,
    ONBTPoolManagerABI,
    'PoolRegistered',
    provider
  );

  return (
    <div>
      <h3>Recent Pool Registrations</h3>
      {events?.map((event) => (
        <div key={event.transactionHash} className="border p-2 mb-2">
          <p>Pool ID: {event.args.poolId}</p>
          <p>TX: {event.transactionHash}</p>
          <p>Block: {event.blockNumber}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Form with Custom Field Labels
// ============================================================================

export function PoolSyncForm() {
  return (
    <ContractFunctionForm
      contractAddress={POOL_MANAGER}
      abi={ONBTPoolManagerABI}
      functionName="syncPoolToPeer"
      signer={signer}
      fieldLabels={{
        poolId: "Which pool to sync?",
        peerChainId: "Target chain (e.g., 8453 for Base)",
        gasLimit: "Max gas for cross-chain message",
      }}
      onSuccess={(result) => {
        console.log('Synced! TX:', result.transactionHash);
      }}
    />
  );
}

// ============================================================================
// EXAMPLE 9: Tab-Based Interface for All Pool Manager Functions
// ============================================================================

import { useState } from 'react';
import { getWriteFunctions } from '@/lib/abiParser';

export function PoolManagerPanel() {
  const [activeTab, setActiveTab] = useState('registerPool');
  const writeFuncs = getWriteFunctions(ONBTPoolManagerABI);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {writeFuncs.map(func => (
          <button
            key={func.name}
            onClick={() => setActiveTab(func.name)}
            className={`px-4 py-2 rounded ${
              activeTab === func.name ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {func.name}
          </button>
        ))}
      </div>

      <ContractFunctionForm
        contractAddress={POOL_MANAGER}
        abi={ONBTPoolManagerABI}
        functionName={activeTab}
        signer={signer}
        key={activeTab}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 10: Integrate with Your Wallet/Signer
// ============================================================================

// In your main app.tsx or layout:
import { useWallet } from '@rainbow-me/rainbowkit'; // or your wallet library
import { BrowserProvider } from 'ethers';

export function MyApp() {
  const { isConnected } = useWallet();
  const { data: signer } = useSigner();
  const provider = useProvider();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  // Now pass signer to forms:
  return (
    <ContractFunctionForm
      contractAddress={POOL_MANAGER}
      abi={ONBTPoolManagerABI}
      functionName="registerPool"
      signer={signer}
    />
  );
}

// ============================================================================
// MINIMAL SETUP CHECKLIST
// ============================================================================

/*
✅ 1. Import component:
   import ContractFunctionForm from '@/components/ContractFunctionForm';

✅ 2. Import ABI:
   import SomeABI from '@/contracts/abi/SomeContract.json';

✅ 3. Get signer:
   const signer = useSigner(); // from your wallet provider

✅ 4. Render form:
   <ContractFunctionForm
     contractAddress="0x..."
     abi={SomeABI}
     functionName="myFunction"
     signer={signer}
   />

That's it! The form auto-generates fields from the ABI.
*/

// ============================================================================
// COPY THIS TEMPLATE FOR YOUR FIRST FORM
// ============================================================================

/*
import ContractFunctionForm from '@/components/ContractFunctionForm';
import YourContractABI from '@/contracts/abi/YourContract.json';
import { useSigner } from '@/hooks/useSigner';

export function YourForm() {
  const signer = useSigner();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Execute Function</h1>

      <ContractFunctionForm
        contractAddress="0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3"
        abi={YourContractABI}
        functionName="yourFunctionName"
        signer={signer}
        onSuccess={() => alert('Success!')}
        onError={(err) => alert(`Error: ${err.message}`)}
      />
    </div>
  );
}
*/
