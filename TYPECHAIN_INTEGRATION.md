/**
 * TypeChain Integration Guide
 * Using TypeScript types generated from ABIs for maximum type safety
 */

// ============================================================================
// SETUP: Generate TypeChain Types from ABIs
// ============================================================================

/*
In your package.json, add TypeChain configuration:

{
  "typechain": {
    "outDir": "frontend/src/types/typechain",
    "target": "ethers-v5",
    "alwaysGenerateOverloads": true,
    "discriminateTypes": true
  },
  "scripts": {
    "generate:types": "typechain --target ethers-v5 './frontend/src/contracts/abi/**/*.json'"
  }
}

Then run:
  npm run generate:types

This creates typescript files like:
  frontend/src/types/typechain/ONBTPoolManager.ts
  frontend/src/types/typechain/ONBTGovernor.ts
  frontend/src/types/typechain/index.ts
*/

// ============================================================================
// EXAMPLE 1: Typed Contract Reading
// ============================================================================

import { ONBTPoolManager } from '@/types/typechain';
import { useContractRead } from '@/hooks/useContractFunction';

export function TypedPoolReading() {
  const { data: pool } = useContractRead<ONBTPoolManager>(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    "getPool",
    ["0x1"]
  );

  // ✅ TypeScript knows pool.token0, pool.token1, etc.
  // ❌ Type error: pool.nonExistentField
  return (
    <div>
      <p>Token 0: {pool?.token0}</p>
      <p>Token 1: {pool?.token1}</p>
      <p>Fee: {pool?.fee}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Typed Contract Writing
// ============================================================================

import { useContractWrite } from '@/hooks/useContractFunction';

export function TypedPoolRegistration() {
  const mutation = useContractWrite<{ poolId: string; token0: string; token1: string; fee: number }>(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    "registerPool",
    signer
  );

  const handleRegister = () => {
    mutation.mutate({
      poolId: "POOL-001",
      token0: "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
      token1: "0x123...",
      fee: 500,
    });

    // ✅ TypeScript validates all fields exist and have correct types
    // ❌ Type error if missing required field
    // ❌ Type error if fee is a string instead of number
  };

  return (
    <button onClick={handleRegister}>
      {mutation.isLoading ? 'Registering...' : 'Register Pool'}
    </button>
  );
}

// ============================================================================
// EXAMPLE 3: Fully Typed ContractFunctionForm Wrapper
// ============================================================================

import ContractFunctionForm from '@/components/ContractFunctionForm';
import { ONBTPoolManager } from '@/types/typechain';

interface TypedFormProps<T extends ONBTPoolManager> {
  functionName: keyof T['functions']; // Only valid function names
  onSuccess: (result: any) => void;
}

export function TypedContractForm<T extends ONBTPoolManager>({
  functionName,
  onSuccess,
}: TypedFormProps<T>) {
  // ✅ functionName must be a valid function from ONBTPoolManager
  // ❌ Type error: functionName="invalidFunction"

  return (
    <ContractFunctionForm
      contractAddress="0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3"
      abi={ONBTPoolManagerABI}
      functionName={functionName as string}
      onSuccess={onSuccess}
    />
  );
}

// ============================================================================
// EXAMPLE 4: Event Types and Watchers
// ============================================================================

import { ONBTPoolManager } from '@/types/typechain';
import { useContractEvents } from '@/hooks/useContractFunction';

export function TypedEventWatcher() {
  const { data: events } = useContractEvents<ONBTPoolManager.PoolRegisteredEvent[]>(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    'PoolRegistered',
    provider
  );

  return (
    <ul>
      {events?.map(event => (
        <li key={event.transactionHash}>
          {/* ✅ TypeScript knows all event properties */}
          Pool: {event.args.poolId}
          Token0: {event.args.token0}
          Token1: {event.args.token1}
          Block: {event.blockNumber}
        </li>
      ))}
    </ul>
  );
}

// ============================================================================
// EXAMPLE 5: Multi-Contract Type Safety
// ============================================================================

import { ONBTPoolManager, ONBTGovernor, ONBTToken } from '@/types/typechain';

export function MultiContractDashboard() {
  // Read from pool manager
  const poolState = useContractRead<ONBTPoolManager.PoolStructOutput>(
    POOL_MANAGER,
    ONBTPoolManagerABI,
    "getPool",
    [poolId]
  );

  // Read from governor
  const votingDelay = useContractRead<number>(
    GOVERNOR,
    ONBTGovernorABI,
    "votingDelay",
    []
  );

  // Read token balance
  const balance = useContractRead<BigNumber>(
    TOKEN,
    ONBTTokenABI,
    "balanceOf",
    [account]
  );

  // ✅ All types are properly inferred
  return <div>Pool: {poolState.data?.token0}, Voting Delay: {votingDelay.data}</div>;
}

// ============================================================================
// EXAMPLE 6: Function Overloads and Variants
// ============================================================================

import { ONBTPoolManager } from '@/types/typechain';

export function HandleFunctionOverloads() {
  const mutation = useContractWrite(
    POOL_MANAGER,
    ONBTPoolManagerABI,
    // TypeChain handles function overloads automatically
    "updatePool"
    // If updatePool has multiple signatures, TypeChain creates overload types
  );

  // For overloaded functions, specify which overload:
  const myForm = (
    <ContractFunctionForm
      contractAddress={POOL_MANAGER}
      abi={ONBTPoolManagerABI}
      functionName="updatePool" // TypeChain resolves automatically
      signer={signer}
    />
  );

  return myForm;
}

// ============================================================================
// EXAMPLE 7: Creating Reusable Typed Components
// ============================================================================

import { ONBTPoolManager } from '@/types/typechain';
import { Contract, Signer } from 'ethers';

interface PoolManagerFormProps {
  poolManagerAddress: string;
  signer: Signer;
  functionName: keyof Omit<ONBTPoolManager['functions'], never>;
  onSuccess?: (data: any) => void;
}

export function PoolManagerForm({
  poolManagerAddress,
  signer,
  functionName,
  onSuccess,
}: PoolManagerFormProps) {
  // ✅ functionName is restricted to actual ONBTPoolManager functions
  // ❌ Type error: functionName="nonExistentFunction"

  return (
    <ContractFunctionForm
      contractAddress={poolManagerAddress}
      abi={ONBTPoolManagerABI}
      functionName={functionName as string}
      signer={signer}
      onSuccess={onSuccess}
    />
  );
}

// ============================================================================
// EXAMPLE 8: Safe Contract Calls with Type Checking
// ============================================================================

import { Contract, ContractFunction } from 'ethers';
import { ONBTPoolManager } from '@/types/typechain';

export async function safeContractCall<
  ContractType extends Contract,
  FunctionName extends keyof ContractType['functions']
>(
  contract: ContractType,
  functionName: FunctionName,
  args: Parameters<ContractType['functions'][FunctionName]>
): Promise<ReturnType<ContractType['functions'][FunctionName]>> {
  // ✅ Arguments are type-checked against function signature
  // ❌ Type error if args don't match function parameters

  return contract[functionName](...args);
}

// Usage:
const contract = new ethers.Contract(
  POOL_MANAGER,
  ONBTPoolManagerABI
) as ONBTPoolManager;

const result = await safeContractCall(contract, 'getPool', ['0x1']);
// ✅ result is properly typed as ONBTPoolManager.PoolStructOutput

// ============================================================================
// EXAMPLE 9: Batch Operations with Full Type Safety
// ============================================================================

import { ethers } from 'ethers';
import { ONBTPoolManager, ONBTToken } from '@/types/typechain';

interface PoolData {
  id: string;
  token0: string;
  token1: string;
  fee: number;
  balance: BigNumber;
}

export async function getPoolDataBatch(
  poolManager: ONBTPoolManager,
  token: ONBTToken,
  poolIds: string[]
): Promise<PoolData[]> {
  const calls = poolIds.map(async id => {
    const poolInfo = await poolManager.getPool(id);
    const balance = await token.balanceOf(poolManager.address);

    // ✅ All properties are type-safe
    return {
      id,
      token0: poolInfo.token0,
      token1: poolInfo.token1,
      fee: poolInfo.fee.toNumber(),
      balance,
    };
  });

  return Promise.all(calls);
}

// ============================================================================
// EXAMPLE 10: Testing with Typed Mocks
// ============================================================================

import { MockEthersProvider } from 'hardhat/plugins';

export async function testPoolRegistration() {
  // TypeChain types work perfectly with mock providers in tests
  const mockPool: ONBTPoolManager.PoolStructOutput = {
    token0: "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    token1: "0x123...",
    fee: ethers.BigNumber.from(500),
    liquidity: ethers.BigNumber.from("1000000000000000000"),
  };

  // ✅ Mock data is type-checked against real contract output
  // ❌ Type error if mock has wrong property types

  return mockPool;
}

// ============================================================================
// SETUP COMMANDS
// ============================================================================

/*
npm install --save-dev typechain @typechain/ethers-v5
npm run generate:types

This will create TypeScript files in:
  frontend/src/types/typechain/

You can then import types:
  import { ONBTPoolManager } from '@/types/typechain';
  import { ONBTToken } from '@/types/typechain';
*/

// ============================================================================
// BENEFITS OF TYPECHAIN INTEGRATION
// ============================================================================

/*
✅ Function Autocomplete
   - Contract methods appear in IDE autocomplete
   - All parameter names and types are visible

✅ Type Checking
   - Catch wrong arguments at compile time
   - Prevents incorrect function names

✅ Return Type Inference
   - IDE knows return types of contract calls
   - Hover over variable to see full type info

✅ Event Type Safety
   - Event args are typed
   - Can't access non-existent event properties

✅ Refactoring Safety
   - Rename function and all references update correctly
   - Change function signature and all callers get type errors

✅ Contract Interface Documentation
   - Types serve as inline API documentation
   - No guessing what functions exist or their parameters
*/

// ============================================================================
// RECOMMENDED PROJECT STRUCTURE
// ============================================================================

/*
frontend/
├── src/
│   ├── components/
│   │   ├── ContractFunctionForm.tsx
│   │   └── ContractFormExamples.tsx
│   ├── hooks/
│   │   ├── useABIFunction.ts
│   │   ├── useContractFunction.ts
│   │   └── useSigner.ts
│   ├── lib/
│   │   ├── abiTypeConversion.ts
│   │   └── abiParser.ts
│   ├── contracts/
│   │   ├── abi/
│   │   │   ├── ONBTPoolManager.json
│   │   │   ├── ONBTGovernor.json
│   │   │   └── ...
│   │   └── types/
│   │       └── typechain/ ← Generated by TypeChain
│   └── App.tsx
└── package.json
*/
