/**
 * Generic contract function form component
 * Auto-generates form UI from contract ABI function signatures
 * Handles input validation, contract calls, and result display
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ethers } from 'ethers';
import {
  useABIFunction,
  FormField,
} from '../hooks/useABIFunction';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon, Loader2Icon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { parseFormValue, formatOutputValue } from '../lib/abiTypeConversion';

export interface ContractFunctionFormProps {
  /** Contract address */
  contractAddress: string;
  /** Contract ABI (ethers.ContractInterface or array) */
  abi: any[];
  /** Function name to call */
  functionName: string;
  /** Ethers signer for sending transactions */
  signer?: ethers.Signer;
  /** Ethers provider for read-only calls */
  provider?: ethers.providers.Provider;
  /** Callback on successful execution */
  onSuccess?: (result: any) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Custom CSS class */
  className?: string;
  /** Show result modal or inline */
  showResultModal?: boolean;
  /** Override form labels */
  fieldLabels?: Record<string, string>;
  /** Custom submit button text */
  submitButtonText?: string;
  /** Default payable value in ETH (only used for payable functions) */
  payableValue?: string;
}

interface FormValues {
  [key: string]: any;
}

/**
 * Input field component for form
 */
function FormFieldComponent({
  field,
  register,
  errors,
}: {
  field: FormField;
  register: any;
  errors: any;
}) {
  const errorMessage = errors[field.name]?.message;

  switch (field.type) {
    case 'address':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="text"
            placeholder={field.placeholder}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
              pattern: {
                value: /^0x[a-fA-F0-9]{40}$/,
                message: 'Invalid Ethereum address',
              },
            })}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              errorMessage && 'border-red-500'
            )}
          />
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );

    case 'bool':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register(field.name)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            {field.label}
          </label>
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );

    case 'uint':
    case 'int':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="number"
            placeholder={field.placeholder}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
              validate: {
                validNumber: v =>
                  !isNaN(Number(v)) || 'Must be a valid number',
              },
            })}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              errorMessage && 'border-red-500'
            )}
          />
          <p className="text-xs text-gray-500">Type: {field.solidityType}</p>
          {field.isArray && (
            <p className="text-xs text-gray-400">Enter a JSON array (e.g., ["0x...", "0x..."])</p>
          )}
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );

    case 'bytes':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="text"
            placeholder={field.placeholder}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
              pattern: {
                value: /^0x[a-fA-F0-9]*$/,
                message: 'Invalid hex value (must start with 0x)',
              },
            })}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              errorMessage && 'border-red-500'
            )}
          />
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <textarea
            placeholder={field.placeholder}
            rows={3}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
            })}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              errorMessage && 'border-red-500'
            )}
          />
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="text"
            placeholder={field.placeholder}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
            })}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              errorMessage && 'border-red-500'
            )}
          />
          {field.isArray && (
            <p className="text-xs text-gray-400">Enter a JSON array (e.g., [1, 2, 3])</p>
          )}
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );
  }
}

/**
 * Generic contract function form component
 */
export const ContractFunctionForm: React.FC<ContractFunctionFormProps> = ({
  contractAddress,
  abi,
  functionName,
  signer,
  provider,
  onSuccess,
  onError,
  className,
  showResultModal = true,
  fieldLabels = {},
  submitButtonText = 'Execute Function',
  payableValue,
}) => {
  const abiData = useABIFunction(abi, functionName);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const payableFieldName = '__payableValue';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      [payableFieldName]: payableValue ?? '',
    },
  });

  if (!abiData) {
    return (
      <div className={cn('p-4 bg-yellow-50 border border-yellow-200 rounded-md', className)}>
        <p className="text-sm text-yellow-800">
          Function <code className="font-mono">{functionName}</code> not found in ABI
        </p>
      </div>
    );
  }

  const { formFields, isReadOnly, isPayable } = abiData;

  const onSubmit = async (formData: FormValues) => {
    if (!signer && !isReadOnly) {
      toast.error('Signer required for write operations');
      return;
    }

    const readProvider = provider || signer?.provider;
    if (isReadOnly && !readProvider) {
      toast.error('Provider required for read operations');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        isReadOnly ? readProvider : signer
      );

      // Convert form values to contract call arguments
      const callArgs = formFields.map(field => {
        const value = formData[field.name];
        return parseFormValue(value, field.solidityType);
      });

      // Execute function
      let txOrResult: any;

      if (isReadOnly) {
        // Call for view/pure functions
        txOrResult = await contract[functionName](...callArgs);
      } else {
        // Send transaction for write functions
        const payableInput = formData[payableFieldName];
        const ethValue = isPayable && payableInput ? ethers.utils.parseEther(String(payableInput)) : undefined;
        const tx = await contract[functionName](...callArgs, {
          ...(isPayable && ethValue ? { value: ethValue } : {}),
        });

        const receipt = await tx.wait();
        txOrResult = {
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          status: receipt.status ? 'Success' : 'Failed',
        };
      }

      if (isReadOnly) {
        setResult({ result: formatOutputValue(txOrResult) });
      } else {
        setResult(txOrResult);
      }
      setShowResult(true);

      if (onSuccess) {
        onSuccess(txOrResult);
      }

      toast.success('Function executed successfully');
      reset();
    } catch (err: any) {
      const errorMsg = err.reason || err.message || 'Unknown error';
      setError(errorMsg);

      if (onError) {
        onError(err);
      }

      toast.error(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl', className)}>
      {/* Function Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{functionName}</h3>
            <p className="text-xs text-gray-600 mt-1">
              {isReadOnly ? '📖 Read-only' : isPayable ? '💰 Payable' : '✍️ Write'}
            </p>
          </div>
          <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700 font-mono">
            {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </code>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.length > 0 ? (
          formFields.map(field => (
            <FormFieldComponent
              key={field.name}
              field={{
                ...field,
                label: fieldLabels[field.name] || field.label,
              }}
              register={register}
              errors={errors}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No parameters required</p>
        )}

        {isPayable && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payable Value (ETH)
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 0.01"
              {...register(payableFieldName, {
                validate: v =>
                  v === '' || !isNaN(Number(v)) || 'Must be a valid number',
              })}
              className={cn(
                'w-full px-3 py-2 border border-gray-300 rounded-md text-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
            />
            <p className="text-xs text-gray-500">Only used for payable functions</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md flex gap-2">
            <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'w-full py-2 px-4 rounded-md font-medium text-white transition-colors',
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          )}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2Icon className="w-4 h-4 animate-spin" />
              Executing...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </form>

      {/* Result Modal */}
      {showResultModal && result && (
        <Dialog.Root open={showResult} onOpenChange={setShowResult}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-[50%] top-[50%] w-[90%] max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  <Dialog.Title className="text-lg font-semibold">Success</Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                    <XIcon className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="space-y-3 mb-6">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <p className="text-gray-600 font-medium">{key}:</p>
                    <p className="text-gray-900 font-mono text-xs break-all bg-gray-50 p-2 rounded mt-1">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>

              <Dialog.Close asChild>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Close
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default ContractFunctionForm;
