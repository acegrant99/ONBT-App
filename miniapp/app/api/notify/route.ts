import { NextResponse } from 'next/server';
import { deleteNotificationToken, getNotificationToken } from '@/lib/notificationStore';
import { deliverNotificationWithRetry } from '@/lib/notifications/delivery';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Notification proxy endpoint used by MiniKitProvider (`notificationProxyUrl`).
 *
 * The client POSTs:
 *   {
 *     fid: number,
 *     notification: {
 *       notificationId: string,          // UUID
 *       notificationDetails: { token, url } | null,
 *       title: string,
 *       body: string,
 *     }
 *   }
 *
 * This server:
 *  1. Resolves the push token — prefers the notificationDetails supplied by the
 *     client; falls back to the server-side stored token for the FID.
 *  2. POSTs the Farcaster SendNotification payload to the stored URL.
 *  3. Returns the Farcaster response (successfulTokens / invalidTokens / rateLimitedTokens).
 *
 * Reference: https://miniapps.farcaster.xyz/docs/guides/notifications
 */

interface ClientNotificationRequest {
  fid: number;
  notification: {
    notificationId?: string;
    notificationDetails: { token: string; url: string } | null;
    title: string;
    body: string;
    targetUrl?: string;
  };
}

interface FarcasterSendRequest {
  notificationId: string;
  title: string;
  body: string;
  targetUrl: string;
  tokens: string[];
}

interface FarcasterSendResponse {
  result: {
    successfulTokens: string[];
    invalidTokens: string[];
    rateLimitedTokens: string[];
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ClientNotificationRequest;
    const { fid, notification } = body;

    if (!Number.isInteger(fid) || fid <= 0 || !notification?.title || !notification?.body) {
      return NextResponse.json(
        { error: 'Missing required fields: fid, notification.title, notification.body' },
        { status: 400 },
      );
    }

    // Resolve token + URL — prefer client-supplied details, fall back to stored
    const details = notification.notificationDetails ?? await getNotificationToken(fid);
    if (!details) {
      return NextResponse.json(
        { error: 'No notification token found for this user. User must add the frame first.' },
        { status: 404 },
      );
    }

    const { token, url } = details;

    // Build the Farcaster send-notification payload
    const appUrl =
      notification.targetUrl ||
      process.env.NEXT_PUBLIC_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const sendPayload: FarcasterSendRequest = {
      notificationId: notification.notificationId || crypto.randomUUID(),
      title: notification.title,
      body: notification.body,
      targetUrl: appUrl,
      tokens: [token],
    };

    const delivery = await deliverNotificationWithRetry<FarcasterSendResponse>(url, sendPayload, {
      maxAttempts: 3,
      initialDelayMs: 300,
    });

    if (!delivery.ok) {
      console.error(
        '[notify] Farcaster push failed',
        JSON.stringify({ fid, status: delivery.status, attempts: delivery.attempts, upstream: delivery.rawBody }),
      );
      return NextResponse.json(
        { error: 'Farcaster notification delivery failed', upstream: delivery.rawBody, attempts: delivery.attempts },
        { status: delivery.status || 502 },
      );
    }

    const result = delivery.parsed;
    if (!result?.result) {
      return NextResponse.json(
        { error: 'Invalid Farcaster notification response format', upstream: delivery.rawBody },
        { status: 502 },
      );
    }

    if (result.result.invalidTokens.includes(token)) {
      await deleteNotificationToken(fid);
    }

    console.log('[notify] delivery',
      JSON.stringify({
        fid,
        attempts: delivery.attempts,
        success: result.result.successfulTokens.length,
        invalid: result.result.invalidTokens.length,
        rateLimited: result.result.rateLimitedTokens.length,
      }),
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error('[notify] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
