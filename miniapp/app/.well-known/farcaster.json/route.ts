import { NextResponse } from 'next/server';
import { withValidManifest } from '@coinbase/onchainkit/minikit';
import { minikitConfig } from '@/minikit.config';

/**
 * Farcaster manifest endpoint.
 * Required for frame discovery — Farcaster clients fetch /.well-known/farcaster.json
 * to verify the app's account association and mini-app metadata.
 *
 * Reference: https://miniapps.farcaster.xyz/docs/guides/publishing
 */
export async function GET() {
  return NextResponse.json(withValidManifest(minikitConfig));
}
