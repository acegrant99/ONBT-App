/**
 * Type conversion utilities for converting form values to Solidity types
 */

import { ethers } from 'ethers';

/**
 * Convert form value to BigNumber for uint/int types
 */
export function toUintBigNumber(value: string | number): ethers.BigNumber {
  try {
    return ethers.BigNumber.from(value.toString());
  } catch (error) {
    throw new Error(`Invalid uint value: ${value}`);
  }
}

/**
 * Convert form value to checksummed Ethereum address
 */
export function toAddress(value: string): string {
  try {
    return ethers.utils.getAddress(value.trim());
  } catch (error) {
    throw new Error(`Invalid Ethereum address: ${value}`);
  }
}

/**
 * Convert form string to hex/bytes
 */
export function toHex(value: string): string {
  if (value.startsWith('0x')) {
    return value;
  }
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));
}

/**
 * Convert form value to bytes32
 */
export function toBytes32(value: string): string {
  const hex = toHex(value);
  if (hex.length > 66) {
    throw new Error('Value too long for bytes32');
  }
  return ethers.utils.hexZeroPad(hex, 32);
}

/**
 * Parse form value based on Solidity type
 */
export function parseFormValue(value: any, solidityType: string): any {
  // Handle arrays
  if (solidityType.endsWith('[]')) {
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch {
        throw new Error('Invalid array format');
      }
    }
    if (!Array.isArray(value)) {
      throw new Error('Expected array');
    }
    const baseType = solidityType.slice(0, -2);
    return value.map(v => parseFormValue(v, baseType));
  }

  // Handle fixed-size arrays [n]
  const fixedArrayMatch = solidityType.match(/\[(\d+)\]$/);
  if (fixedArrayMatch) {
    const size = parseInt(fixedArrayMatch[1]);
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch {
        throw new Error('Invalid array format');
      }
    }
    if (!Array.isArray(value) || value.length !== size) {
      throw new Error(`Expected array of length ${size}`);
    }
    const baseType = solidityType.slice(0, fixedArrayMatch.index);
    return value.map(v => parseFormValue(v, baseType));
  }

  // Handle basic types
  if (solidityType.startsWith('address')) {
    return toAddress(value);
  }

  if (solidityType.startsWith('uint')) {
    return toUintBigNumber(value);
  }

  if (solidityType.startsWith('int')) {
    return ethers.BigNumber.from(value.toString());
  }

  if (solidityType === 'bool') {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    return Boolean(value);
  }

  if (solidityType.startsWith('bytes32')) {
    return toBytes32(value);
  }

  if (solidityType.startsWith('bytes')) {
    return toHex(value);
  }

  if (solidityType === 'string') {
    return String(value);
  }

  // Default: return as-is
  return value;
}

/**
 * Format output value for display
 */
export function formatOutputValue(value: any, solidityType: string = 'string'): string {
  // Handle BigNumber
  if (ethers.BigNumber.isBigNumber(value)) {
    if (solidityType.startsWith('uint') || solidityType.startsWith('int')) {
      return value.toString();
    }
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return JSON.stringify(
      value.map(v => formatOutputValue(v, solidityType)),
      null,
      2
    );
  }

  // Handle bytes
  if (typeof value === 'string' && value.startsWith('0x')) {
    return value;
  }

  // Handle objects
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

/**
 * Estimate gas for transaction
 */
export async function estimateGas(
  contract: ethers.Contract,
  functionName: string,
  args: any[],
  options?: ethers.CallOverrides
): Promise<ethers.BigNumber> {
  try {
    const gas = await contract.estimateGas[functionName](...args, options || {});
    return gas;
  } catch (error) {
    throw new Error(`Gas estimation failed: ${error}`);
  }
}

/**
 * Format gas cost with current gas price
 */
export async function formatGasCost(
  gas: ethers.BigNumber,
  provider: ethers.providers.Provider
): Promise<string> {
  try {
    const gasPrice = await provider.getGasPrice();
    const cost = gas.mul(gasPrice);
    const costInEth = ethers.utils.formatEther(cost);
    return `${costInEth} ETH (~${(parseFloat(costInEth) * 2500).toFixed(2)} USD)`; // Rough conversion
  } catch {
    return `${gas.toString()} gas units`;
  }
}
