'use client';

import { useEffect, useRef } from 'react';
import { useMiniKit, useIsInMiniApp } from '@coinbase/onchainkit/minikit';

/**
 * useMiniApp — wires the MiniKit ready signal and returns frame context.
 *
 * Call once in the root app shell. Fires sdk.actions.ready() once on mount,
 * hiding the Farcaster splash screen. Safe when not running in a frame —
 * isInMiniApp will be false and context will be null.
 *
 * Returns:
 *   isInMiniApp  — true when rendered inside a Farcaster frame
 *   isMiniAppReady — true after sdk.actions.ready() has been called
 *   context      — Farcaster MiniApp context (user FID, client info, etc.)
 */
export function useMiniApp() {
  const { setMiniAppReady, isMiniAppReady, context } = useMiniKit();
  const { isInMiniApp } = useIsInMiniApp();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    // Signal to the Farcaster client that the app is fully loaded,
    // hiding the splash screen. No-op if not running inside a frame.
    setMiniAppReady();
  }, [setMiniAppReady]);

  return {
    isInMiniApp: !!isInMiniApp,
    isMiniAppReady,
    context,
  };
}
