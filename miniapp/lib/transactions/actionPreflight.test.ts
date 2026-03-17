import { describe, expect, it, vi } from 'vitest';
import { runActionPreflight } from './actionPreflight';

const baseInput = {
  actionLabel: 'Bridge Transfer',
  account: '0x1111111111111111111111111111111111111111' as `0x${string}`,
  connectedChainId: 8453,
  targetChainId: 8453,
  request: {
    address: '0x2222222222222222222222222222222222222222' as `0x${string}`,
    abi: [] as const,
    functionName: 'send',
    args: ['test'],
  },
};

describe('runActionPreflight', () => {
  it('fails when wallet is not connected', async () => {
    const result = await runActionPreflight({
      ...baseInput,
      account: undefined,
      publicClient: undefined,
    });

    expect(result.ok).toBe(false);
    expect(result.copy).toContain('Connect your wallet');
    expect(result.decodedReason).toBe('Wallet is not connected.');
  });

  it('fails when wallet is on the wrong chain', async () => {
    const result = await runActionPreflight({
      ...baseInput,
      connectedChainId: 42161,
      targetChainId: 8453,
      publicClient: undefined,
    });

    expect(result.ok).toBe(false);
    expect(result.copy).toContain('Switch wallet network');
    expect(result.decodedReason).toContain('42161');
  });

  it('returns the first failed custom check', async () => {
    const result = await runActionPreflight({
      ...baseInput,
      checks: [
        { ok: true, reason: 'ignored' },
        { ok: false, reason: 'Allowance too low' },
      ],
      publicClient: undefined,
    });

    expect(result.ok).toBe(false);
    expect(result.copy).toBe('Allowance too low');
    expect(result.decodedReason).toBe('Allowance too low');
  });

  it('fails when no rpc client is available', async () => {
    const result = await runActionPreflight({
      ...baseInput,
      publicClient: undefined,
    });

    expect(result.ok).toBe(false);
    expect(result.copy).toContain('Chain RPC client unavailable');
  });

  it('decodes reverted simulation errors', async () => {
    const simulateContract = vi.fn(async () => {
      throw new Error("execution reverted: Insufficient stake");
    });

    const result = await runActionPreflight({
      ...baseInput,
      publicClient: { simulateContract } as never,
    });

    expect(simulateContract).toHaveBeenCalledOnce();
    expect(result.ok).toBe(false);
    expect(result.copy).toContain('Bridge Transfer preflight failed: Insufficient stake');
    expect(result.decodedReason).toBe('Insufficient stake');
  });

  it('normalizes insufficient funds simulation errors', async () => {
    const simulateContract = vi.fn(async () => {
      throw new Error('insufficient funds for intrinsic transaction cost');
    });

    const result = await runActionPreflight({
      ...baseInput,
      publicClient: { simulateContract } as never,
    });

    expect(result.ok).toBe(false);
    expect(result.decodedReason).toBe('Insufficient native gas balance for this transaction.');
  });

  it('passes when simulation succeeds', async () => {
    const simulateContract = vi.fn(async () => ({ request: 'ok' }));

    const result = await runActionPreflight({
      ...baseInput,
      publicClient: { simulateContract } as never,
    });

    expect(result.ok).toBe(true);
    expect(result.copy).toContain('simulation-safe');
    expect(simulateContract).toHaveBeenCalledWith({
      account: baseInput.account,
      address: baseInput.request.address,
      abi: baseInput.request.abi,
      functionName: baseInput.request.functionName,
      args: baseInput.request.args,
      value: undefined,
    });
  });
});
