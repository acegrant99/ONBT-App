# ABI-Driven Form Component System

## Overview

The **ContractFunctionForm** system provides automatic UI generation from contract ABIs. Instead of manually building forms for each smart contract function, you define the ABI once and the forms are generated automatically.

This approach provides:
- **Type Safety**: Input validation based on Solidity function signatures
- **Smart Defaults**: Auto-detection of input types (address, uint, bool, etc.)
- **Reusability**: One component handles all contract interactions
- **React Query Integration**: Built-in caching, refetching, and state management

## Architecture

```
Contract ABI
    ↓
useABIFunction Hook (Parses ABI)
    ↓
FormField[] (Auto-generated field definitions)
    ↓
ContractFunctionForm Component (Renders UI)
    ↓
React Hook Form (State management)
    ↓
ethers.js (Sends transaction / calls function)
```

## Components

### 1. **ContractFunctionForm** Component

Main form component that auto-generates from ABI.

**Props:**
```typescript
{
  // Contract details
  contractAddress: string;           // Target contract address
  abi: any[];                        // Contract ABI array
  functionName: string;              // Function to call
  
  // Interaction
  signer?: ethers.Signer;           // For write operations (optional for view functions)
  
  // Callbacks
  onSuccess?: (result: any) => void; // Called when function executes successfully
  onError?: (error: Error) => void;  // Called on error
  
  // UI Customization
  className?: string;                // Custom CSS class
  showResultModal?: boolean;         // Show result dialog (default: true)
  fieldLabels?: Record<string, string>; // Custom field labels
  submitButtonText?: string;         // Custom button text
}
```

**Example:**
```typescript
import ContractFunctionForm from '@/components/ContractFunctionForm';
import ONBTPoolManagerABI from '@/contracts/abi/ONBTPoolManager.json';

export function RegisterPoolPage() {
  const signer = useWalletSigner();

  return (
    <ContractFunctionForm
      contractAddress="0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3"
      abi={ONBTPoolManagerABI}
      functionName="registerPool"
      signer={signer}
      submitButtonText="Register New Pool"
      fieldLabels={{
        poolId: "Pool Identifier",
        token0: "Base Token",
        token1: "Quote Token",
        fee: "Fee Tier",
      }}
      onSuccess={(result) => {
        console.log('Pool registered:', result);
        // Refetch pools, show toast, redirect, etc.
      }}
    />
  );
}
```

### 2. **useABIFunction** Hook

Parses ABI and extracts function metadata.

**Return Value:**
```typescript
{
  function: ABIFunction;      // Full function ABI object
  formFields: FormField[];    // Auto-generated field definitions
  isReadOnly: boolean;        // Is this a view/pure function?
  isPayable: boolean;         // Can this function receive payment?
  outputTypes: ABIInput[];    // Return value types
}
```

**Usage:**
```typescript
import { useABIFunction } from '@/hooks/useABIFunction';

function MyComponent() {
  const abiData = useABIFunction(contractABI, 'myFunction');

  if (!abiData) return <div>Function not found</div>;

  return (
    <div>
      <h3>{abiData.function.name}</h3>
      <p>{abiData.isReadOnly ? 'Read-only' : 'Write operation'}</p>
      {abiData.formFields.map(field => (
        <div key={field.name}>{field.label}: {field.solidityType}</div>
      ))}
    </div>
  );
}
```

### 3. **useContractFunction** Hook

React Query integration for contract reads and writes.

**useContractRead** - Call read-only functions:
```typescript
import { useContractRead } from '@/hooks/useContractFunction';

function GetPoolBalance() {
  const provider = useProvider();
  
  const { data, isLoading, error } = useContractRead(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    "getPoolBalance",
    ["0x...", 1], // Function arguments
    provider,
    { staleTime: 5 * 60 * 1000 } // 5 minutes
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Balance: {data?.toString()}</div>;
}
```

**useContractWrite** - Execute write functions:
```typescript
import { useContractWrite } from '@/hooks/useContractFunction';

function UpdatePoolConfig() {
  const signer = useSigner();
  const mutation = useContractWrite(
    "0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3",
    ONBTPoolManagerABI,
    "updatePoolConfig",
    signer,
    {
      onSuccess: (data) => {
        console.log('Transaction:', data.transactionHash);
        // Invalidate queries, show success toast, etc.
      },
      onError: (error) => {
        console.error('Transaction failed:', error);
      }
    }
  );

  return (
    <button onClick={() => mutation.mutate({ newConfig: "0x..." })}>
      {mutation.isLoading ? 'Updating...' : 'Update Config'}
    </button>
  );
}
```

## Utilities

### **abiTypeConversion.ts** - Type Conversion

Convert form strings to Solidity types:

```typescript
import { parseFormValue, formatOutputValue } from '@/lib/abiTypeConversion';

// Convert form input to contract-compatible type
const address = parseFormValue("0x742d35Cc6634C0532925a3b844Bc9e7595fbD7B3", "address");
const amount = parseFormValue("1000000000000000000", "uint256");
const flag = parseFormValue("true", "bool");

// Format contract output for display
const formatted = formatOutputValue(ethers.BigNumber.from("1000000000000000000"), "uint256");
// → "1000000000000000000"
```

### **abiParser.ts** - ABI Analysis

Analyze contract ABIs:

```typescript
import { getWriteFunctions, getReadFunctions, getABIEvents } from '@/lib/abiParser';

const writeFuncs = getWriteFunctions(ONBTPoolManagerABI);
// → [{ name: 'registerPool', inputs: [...] }, ...]

const readFuncs = getReadFunctions(ONBTPoolManagerABI);
// → [{ name: 'getPool', outputs: [...] }, ...]

const events = getABIEvents(ONBTPoolManagerABI);
// → [{ name: 'PoolRegistered', inputs: [...] }, ...]
```

## Form Input Type Mapping

The system automatically detects Solidity types and creates appropriate form fields:

| Solidity Type | Form Field | Validation |
|---|---|---|
| `address` | Text input | Must be valid checksum address |
| `uint256`, `uint8`, etc. | Number input | Must be valid integer or hex |
| `int256`, `int8`, etc. | Number input | Must be valid integer |
| `bool` | Checkbox | True/false |
| `bytes32`, `bytes16`, etc. | Hex text input | Must start with `0x` |
| `bytes` | Hex text input | Must be valid hex |
| `string` | Textarea | Any text |
| `Type[]` | JSON array input | Must be valid JSON |

## Advanced Usage

### Custom Form Building

Use `useABIFunction` to build custom forms:

```typescript
import { useABIFunction } from '@/hooks/useABIFunction';
import { useForm } from 'react-hook-form';

function CustomPoolForm() {
  const abiData = useABIFunction(ONBTPoolManagerABI, 'registerPool');
  const { register, handleSubmit } = useForm();

  if (!abiData) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {abiData.formFields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            {...register(field.name, { required: true })}
            type={field.type === 'bool' ? 'checkbox' : 'text'}
            placeholder={field.placeholder}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Batch Reading Data

```typescript
import { useMultipleContractReads } from '@/hooks/useContractFunction';

function PoolDashboard() {
  const provider = useProvider();
  
  const { data: [balance, isActive, owner] } = useMultipleContractReads(
    [
      {
        address: POOL_MANAGER,
        abi: ONBTPoolManagerABI,
        functionName: 'getPoolBalance',
        args: [POOL_ID],
      },
      {
        address: POOL_MANAGER,
        abi: ONBTPoolManagerABI,
        functionName: 'isPoolActive',
        args: [POOL_ID],
      },
      {
        address: POOL_MANAGER,
        abi: ONBTPoolManagerABI,
        functionName: 'getPoolOwner',
        args: [POOL_ID],
      },
    ],
    provider
  );

  return <div>Balance: {balance}, Active: {isActive}, Owner: {owner}</div>;
}
```

### Watching for Events

```typescript
import { useContractEvents } from '@/hooks/useContractFunction';

function PoolEventViewer() {
  const provider = useProvider();
  
  const { data: events } = useContractEvents(
    POOL_MANAGER,
    ONBTPoolManagerABI,
    'PoolRegistered',
    provider
  );

  return (
    <ul>
      {events?.map(event => (
        <li key={event.transactionHash}>
          Pool {event.args.poolId} registered
        </li>
      ))}
    </ul>
  );
}
```

## Best Practices

### 1. **Memoize ABIs**
```typescript
const ONBTPoolManagerABI = useMemo(() => 
  require('@/contracts/abi/ONBTPoolManager.json'),
  []
);
```

### 2. **Handle Edge Cases**
```typescript
<ContractFunctionForm
  // ... props
  onError={(error) => {
    if (error.message.includes('insufficient balance')) {
      showInsufficientBalanceModal();
    } else if (error.message.includes('not authorized')) {
      redirectToLogin();
    } else {
      showGenericError(error);
    }
  }}
/>
```

### 3. **Validate Before Submission**
```typescript
import { validateInputs } from '@/lib/abiParser';

const { valid, errors } = validateInputs(abiData.formFields, formValues);
if (!valid) {
  setFormErrors(errors);
  return;
}
```

### 4. **Estimate Gas Before Sending**
```typescript
import { estimateGas, formatGasCost } from '@/lib/abiTypeConversion';

const gas = await estimateGas(contract, 'registerPool', [poolId, token0, token1]);
const cost = await formatGasCost(gas, provider);
showGasEstimate(cost);
```

## Troubleshooting

### Form fields not appearing
- Check ABI is valid JSON and contains function with matching name
- Use browser DevTools to inspect `useABIFunction` return value
- Verify function name matches exactly (case-sensitive)

### Cannot read address / Checksum mismatch
- Use `ethers.utils.getAddress()` to convert to checksum format
- Verify address has leading `0x`
- Test with known valid addresses first

### Transaction fails silently
- Check signer is connected to correct network
- Verify gas price and limits are reasonable
- Use `estimateGas` before submitting

### React Query cache issues
- Invalidate query keys after successful mutations:
  ```typescript
  const queryClient = useQueryClient();
  onSuccess: () => {
    queryClient.invalidateQueries(['contract', POOL_MANAGER, 'getPool']);
  }
  ```

## File Structure

```
frontend/src/
├── components/
│   ├── ContractFunctionForm.tsx       # Main form component
│   └── ContractFormExamples.tsx       # Example implementations
├── hooks/
│   ├── useABIFunction.ts             # ABI parsing hook
│   └── useContractFunction.ts        # React Query integration
├── lib/
│   ├── abiTypeConversion.ts          # Type conversion utilities
│   └── abiParser.ts                  # ABI analysis utilities
└── contracts/
    └── abi/
        ├── ONBTPoolManager.json
        ├── ONBTGovernor.json
        ├── ONBTLiquidityManager.json
        └── ... (other ABIs)
```

## Next Steps

1. **Add more contract ABIs** to `frontend/src/contracts/abi/`
2. **Create pages** using `ContractFunctionForm` for each major operation
3. **Integrate with wallet** hooks and context providers
4. **Add real-time monitoring** using `useContractEvents` hook
5. **Build admin dashboard** with batch operations and event logs

## Related Documentation

- [System Architecture](./SYSTEM_ARCHITECTURE.md)
- [Deployment Status](./DEPLOYMENT_STATUS.md)
- [USDT Pool Guide](./USDT_POOL_GUIDE.md)
