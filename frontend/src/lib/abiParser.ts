/**
 * Utility for parsing and formatting contract ABIs
 */

import { ABIFunction, ABIInput } from '../hooks/useABIFunction';

/**
 * Generate a human-readable function signature from ABI
 */
export function generateFunctionSignature(func: ABIFunction): string {
  const inputs = (func.inputs || [])
    .map(input => `${input.type} ${input.name}`)
    .join(', ');

  const outputs =
    func.outputs && func.outputs.length > 0
      ? func.outputs.map(o => o.type).join(', ')
      : 'void';

  return `${func.name}(${inputs}) → ${outputs}`;
}

/**
 * Get ABI function by name
 */
export function getABIFunction(abi: any[], name: string): ABIFunction | null {
  const func = abi.find(
    (f: any) => f.type === 'function' && f.name === name
  ) as ABIFunction | undefined;
  return func || null;
}

/**
 * Get all view/pure functions from ABI
 */
export function getReadFunctions(abi: any[]): ABIFunction[] {
  return (abi || []).filter(
    (f: any) =>
      f.type === 'function' &&
      (f.stateMutability === 'view' || f.stateMutability === 'pure')
  );
}

/**
 * Get all write functions from ABI
 */
export function getWriteFunctions(abi: any[]): ABIFunction[] {
  return (abi || []).filter(
    (f: any) =>
      f.type === 'function' &&
      f.stateMutability !== 'view' &&
      f.stateMutability !== 'pure'
  );
}

/**
 * Get all events from ABI
 */
export function getABIEvents(abi: any[]) {
  return (abi || []).filter((f: any) => f.type === 'event');
}

/**
 * Get constructor from ABI
 */
export function getConstructor(abi: any[]) {
  return (abi || []).find((f: any) => f.type === 'constructor');
}

/**
 * Validate form values against ABI function
 */
export function validateInputs(
  inputs: ABIInput[],
  values: Record<string, any>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  inputs.forEach(input => {
    const value = values[input.name || ''];
    const fieldName = input.name || 'unknown';

    // Required check
    if (value === undefined || value === null || value === '') {
      errors[fieldName] = 'Field is required';
      return;
    }

    // Type validation
    if (input.type === 'address') {
      if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
        errors[fieldName] = 'Invalid Ethereum address';
      }
    } else if (input.type.startsWith('uint') || input.type.startsWith('int')) {
      if (isNaN(Number(value))) {
        errors[fieldName] = 'Must be a valid number';
      }
    } else if (input.type === 'bool') {
      if (typeof value !== 'boolean') {
        errors[fieldName] = 'Must be boolean';
      }
    } else if (input.type.startsWith('bytes')) {
      if (!/^0x[a-fA-F0-9]*$/.test(value)) {
        errors[fieldName] = 'Invalid hex value';
      }
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generate TypeScript types from ABI (for code generation)
 */
export function generateTypeScriptTypes(abi: any[], contractName: string): string {
  let output = `/**\n * Auto-generated TypeScript types from ABI\n * Contract: ${contractName}\n */\n\n`;

  // Add input types for each write function
  const writeFunctions = getWriteFunctions(abi);
  writeFunctions.forEach(func => {
    if (func.inputs && func.inputs.length > 0) {
      const inputType = `${func.name.charAt(0).toUpperCase()}${func.name.slice(1)}Inputs`;
      output += `export interface ${inputType} {\n`;
      func.inputs.forEach(input => {
        output += `  ${input.name}?: ${mapSolidityTypeToTS(input.type)};\n`;
      });
      output += `}\n\n`;
    }
  });

  return output;
}

/**
 * Map Solidity type to TypeScript type
 */
function mapSolidityTypeToTS(solidityType: string): string {
  if (solidityType === 'bool') return 'boolean';
  if (solidityType === 'string') return 'string';
  if (solidityType === 'address') return 'string';
  if (solidityType.startsWith('uint') || solidityType.startsWith('int')) return 'string | number | BigNumber';
  if (solidityType.startsWith('bytes')) return 'string';
  if (solidityType.endsWith('[]')) {
    const baseType = mapSolidityTypeToTS(solidityType.slice(0, -2));
    return `${baseType}[]`;
  }
  return 'any';
}
