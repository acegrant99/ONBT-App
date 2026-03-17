/**
 * Zod schemas for on-chain transfer validation.
 * Used in TokenInterface to validate recipient and amount before
 * calling the transfer preflight and writing to chain.
 */
import { z } from 'zod';
import { isAddress } from 'viem';

export const transferSchema = z.object({
  recipient: z
    .string()
    .min(1, 'Recipient address is required')
    .refine((v) => isAddress(v.trim()), {
      message: 'Invalid Ethereum address — must be 0x followed by 40 hex characters',
    }),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (v) => {
        const n = Number(v);
        return Number.isFinite(n) && n > 0;
      },
      { message: 'Amount must be a positive number' }
    ),
});

export type TransferInput = z.infer<typeof transferSchema>;

/** Quick helper — returns first error message or null. */
export function validateTransfer(
  recipient: string,
  amount: string
): string | null {
  const result = transferSchema.safeParse({ recipient: recipient.trim(), amount });
  if (result.success) return null;
  return result.error.issues[0]?.message ?? 'Validation error';
}
