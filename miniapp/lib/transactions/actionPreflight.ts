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
  decodedReason?: string;
  rawError?: string;
};

function decodeRevertReason(error: unknown): { decodedReason?: string; rawError?: string } {
  const rawError = error instanceof Error ? error.message : String(error);
  const normalized = rawError.replace(/\s+/g, ' ').trim();

  const explicitRevert = normalized.match(/execution reverted(?::| with reason string)?\s*['"]?([^'".]+)['"]?/i);
  if (explicitRevert?.[1]) {
    return { decodedReason: explicitRevert[1].trim(), rawError };
  }

  const viemShortMessage = normalized.match(/shortMessage:\s*([^,}]+)/i);
  if (viemShortMessage?.[1]) {
    return { decodedReason: viemShortMessage[1].trim(), rawError };
  }

  if (/insufficient funds/i.test(normalized)) {
    return { decodedReason: 'Insufficient native gas balance for this transaction.', rawError };
  }

  if (/user rejected|rejected the request|denied transaction/i.test(normalized)) {
    return { decodedReason: 'Signature was rejected in wallet confirmation.', rawError };
  }

  return { rawError };
}

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
      decodedReason: 'Wallet is not connected.',
    };
  }

  if (input.connectedChainId !== input.targetChainId) {
    return {
      ok: false,
      copy: `Switch wallet network to chain ${input.targetChainId} before continuing.`,
      decodedReason: `Wallet is connected to chain ${input.connectedChainId ?? 'unknown'}.`,
    };
  }

  const failedCheck = firstFailedCheck(input.checks);
  if (failedCheck) {
    return {
      ok: false,
      copy: failedCheck,
      decodedReason: failedCheck,
    };
  }

  if (!input.publicClient) {
    return {
      ok: false,
      copy: 'Chain RPC client unavailable. Retry in a few seconds.',
      decodedReason: 'RPC client missing or not initialized.',
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
    const { decodedReason, rawError } = decodeRevertReason(error);
    return {
      ok: false,
      copy: `${input.actionLabel} preflight failed${decodedReason ? `: ${decodedReason}` : ' during simulation.'}`,
      decodedReason,
      rawError,
    };
  }

  return {
    ok: true,
    copy: `${input.actionLabel} is simulation-safe. Confirm the same details in your wallet before signing.`,
  };
}
