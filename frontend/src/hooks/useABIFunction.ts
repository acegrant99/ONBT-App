/**
 * Hook to parse contract ABI and extract function metadata
 * Converts Solidity function signatures to form field definitions
 */

import { useMemo } from 'react';

export interface ABIInput {
  name: string;
  type: string;
  internalType?: string;
  components?: ABIInput[];
  indexed?: boolean;
}

export interface ABIFunction {
  name: string;
  type: 'function';
  inputs: ABIInput[];
  outputs?: ABIInput[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
  constant?: boolean;
  payable?: boolean;
}

export interface FormField {
  name: string;
  type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea' | 'address' | 'bytes' | 'uint' | 'int' | 'bool';
  label: string;
  placeholder?: string;
  required: boolean;
  solidityType: string;
  isArray: boolean;
  arraySize?: number;
  defaultValue?: string | boolean | number;
}

/**
 * Map Solidity types to form input types
 */
function getSolidityTypeCategory(solidityType: string): FormField['type'] {
  if (solidityType.startsWith('address')) return 'address';
  if (solidityType.startsWith('uint') || solidityType.startsWith('int')) return 'uint';
  if (solidityType.startsWith('bool')) return 'bool';
  if (solidityType.startsWith('bytes')) return 'bytes';
  if (solidityType.startsWith('string')) return 'textarea';
  return 'text';
}

/**
 * Parse ABI function inputs into form fields
 */
function abiInputsToFormFields(inputs: ABIInput[]): FormField[] {
  return inputs.map((input, index) => {
    const isArray = input.type.endsWith('[]');
    const baseType = isArray ? input.type.slice(0, -2) : input.type;
    const arrayMatch = input.type.match(/\[(\d+)\]/);
    const arraySize = arrayMatch ? parseInt(arrayMatch[1]) : undefined;
    const fallbackName = `arg${index}`;

    return {
      name: input.name || fallbackName,
      type: getSolidityTypeCategory(baseType),
      label: formatLabel(input.name || fallbackName),
      placeholder: getPlaceholder(baseType),
      required: true,
      solidityType: input.type,
      isArray,
      arraySize,
    };
  });
}

/**
 * Format camelCase/snake_case field names for display
 */
function formatLabel(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Get placeholder text based on Solidity type
 */
function getPlaceholder(solidityType: string): string {
  if (solidityType.startsWith('address')) return '0x742d35Cc6634C0532925a3b844Bc9e7595f...';
  if (solidityType.startsWith('uint')) return 'e.g., 1000000000000000000';
  if (solidityType.startsWith('int')) return 'e.g., -1000000000000000000';
  if (solidityType.startsWith('bool')) return 'true / false';
  if (solidityType.startsWith('bytes32')) return '0x0000000000000000000000000000000000000000000000000000000000000000';
  if (solidityType.startsWith('bytes')) return '0x...';
  if (solidityType.startsWith('string')) return 'Enter text...';
  return 'Enter value...';
}

/**
 * Check if function is read-only (view/pure)
 */
export function isReadOnlyFunction(func: ABIFunction): boolean {
  return func.stateMutability === 'view' || func.stateMutability === 'pure';
}

/**
 * Check if function requires payment (payable)
 */
export function isPayableFunction(func: ABIFunction): boolean {
  return func.stateMutability === 'payable' || func.payable === true;
}

/**
 * Main hook to parse ABI and extract function data
 */
export function useABIFunction(abi: any[], functionName: string) {
  return useMemo(() => {
    const func = abi.find(
      (f: any) => f.type === 'function' && f.name === functionName
    ) as ABIFunction | undefined;

    if (!func) {
      return null;
    }

    return {
      function: func,
      formFields: abiInputsToFormFields(func.inputs || []),
      isReadOnly: isReadOnlyFunction(func),
      isPayable: isPayableFunction(func),
      outputTypes: func.outputs || [],
    };
  }, [abi, functionName]);
}

/**
 * Get all write functions from ABI (non-view, non-pure)
 */
export function useABIWriteFunctions(abi: any[]) {
  return useMemo(() => {
    return (abi || [])
      .filter((f: any) => f.type === 'function' && !isReadOnlyFunction(f as ABIFunction))
      .map((f: ABIFunction) => ({
        name: f.name,
        inputs: f.inputs || [],
        isPayable: isPayableFunction(f),
      }));
  }, [abi]);
}

/**
 * Get all read functions from ABI (view/pure)
 */
export function useABIReadFunctions(abi: any[]) {
  return useMemo(() => {
    return (abi || [])
      .filter((f: any) => f.type === 'function' && isReadOnlyFunction(f as ABIFunction))
      .map((f: ABIFunction) => ({
        name: f.name,
        inputs: f.inputs || [],
        outputs: f.outputs || [],
      }));
  }, [abi]);
}
