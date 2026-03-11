import type { Abi, Address } from 'viem';
import type { PublicClient } from 'viem';

export type PreflightCheck = {
  ok: boolean;
  reason: string;
};

export type WriteRequest = {
  address: Address;
  abi: Abi;
  functionName: string;
  args?: readonly unknown[];
  value?: bigint;
};

export type ActionPreflightInput = {
  actionLabel: string;
  account?: Address;
  connectedChainId?: number;
  targetChainId: number;
  publicClient?: PublicClient;
  request: WriteRequest;
  checks?: PreflightCheck[];
};

export type ActionPreflightResult = {
  ok: boolean;
  copy: string;
};

function firstFailedCheck(checks: PreflightCheck[] = []): string | null {
  for (const check of checks) {
    if (!check.ok) return check.reason;
  }
  return null;
}

export async function runActionPreflight(input: ActionPreflightInput): Promise<ActionPreflightResult> {
  if (!input.account) {
    return {
      ok: false,
      copy: 'Connect your wallet before submitting this transaction.',
    };
  }

  if (input.connectedChainId !== input.targetChainId) {
    return {
      ok: false,
      copy: `Switch wallet network to chain ${input.targetChainId} before continuing.`,
    };
  }

  const failedCheck = firstFailedCheck(input.checks);
  if (failedCheck) {
    return {
      ok: false,
      copy: failedCheck,
    };
  }

  if (!input.publicClient) {
    return {
      ok: false,
      copy: 'Chain RPC client unavailable. Retry in a few seconds.',
    };
  }

  try {
    await (input.publicClient as {
      simulateContract: (request: {
        account: Address;
        address: Address;
        abi: Abi;
        functionName: string;
        args?: readonly unknown[];
        value?: bigint;
      }) => Promise<unknown>;
    }).simulateContract({
      account: input.account,
      address: input.request.address,
      abi: input.request.abi,
      functionName: input.request.functionName,
      args: input.request.args,
      value: input.request.value,
    });
  } catch (error) {
    return {
      ok: false,
      copy: error instanceof Error
        ? `${input.actionLabel} preflight failed: ${error.message}`
        : `${input.actionLabel} preflight failed during simulation.`,
    };
  }

  return {
    ok: true,
    copy: `${input.actionLabel} is simulation-safe. Confirm the same details in your wallet before signing.`,
  };
}
