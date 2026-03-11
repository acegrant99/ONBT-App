import { NextResponse } from 'next/server';
import {
  capabilitiesForRole,
  normalizeAddress,
  resolveEffectiveRole,
  roleFromWallet,
  type AiWalletMode,
} from '@/lib/agentkit/walletAccess';

type AccessProfileRequest = {
  walletAddress?: string;
  selectedWalletMode?: AiWalletMode;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as AccessProfileRequest;
  const selectedWalletMode: AiWalletMode =
    body.selectedWalletMode === 'cdp' ||
    body.selectedWalletMode === 'deployer' ||
    body.selectedWalletMode === 'user'
      ? body.selectedWalletMode
      : 'auto';

  const connectedWallet = normalizeAddress(body.walletAddress);
  const detectedRole = roleFromWallet(connectedWallet);
  const { effectiveRole, reason } = resolveEffectiveRole(selectedWalletMode, detectedRole);

  return NextResponse.json({
    ok: true,
    mode: 'access-profile',
    connectedWallet,
    selectedWalletMode,
    effectiveRole,
    reason,
    capabilities: capabilitiesForRole(effectiveRole),
    checkedAt: new Date().toISOString(),
  });
}
