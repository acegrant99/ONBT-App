import { NextResponse } from 'next/server';

/**
 * Farcaster Mini App webhook endpoint
 * Handles lifecycle events sent by the Farcaster client:
 *   - frame_added           — user added the mini app
 *   - frame_removed         — user removed the mini app
 *   - notifications_enabled — user opted in to push notifications
 *   - notifications_disabled — user opted out of push notifications
 *
 * Reference: https://miniapps.farcaster.xyz/docs/guides/notifications
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, notificationDetails } = body as {
      event: string;
      notificationDetails?: { token: string; url: string };
    };

    switch (event) {
      case 'frame_added':
        // User added ONabat to their mini apps.
        // Store notificationDetails.token + notificationDetails.url
        // keyed to the user's FID (from the verified request) to send
        // push notifications later.
        console.log('[webhook] frame_added', notificationDetails);
        break;

      case 'frame_removed':
        // User removed the mini app — delete stored notification token.
        console.log('[webhook] frame_removed');
        break;

      case 'notifications_enabled':
        // User opted in — start sending notifications.
        console.log('[webhook] notifications_enabled', notificationDetails);
        break;

      case 'notifications_disabled':
        // User opted out — stop sending notifications.
        console.log('[webhook] notifications_disabled');
        break;

      default:
        console.warn('[webhook] unknown event:', event);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
