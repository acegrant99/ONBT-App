import { NextResponse } from 'next/server';
import { deleteNotificationToken, getAllNotificationTokens } from '@/lib/notificationStore';
import { deliverNotificationWithRetry } from '@/lib/notifications/delivery';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SendNotificationRequest = {
  title: string;
  body: string;
  targetUrl?: string;
  fids?: number[];
};

type FarcasterSendRequest = {
  notificationId: string;
  title: string;
  body: string;
  targetUrl: string;
  tokens: string[];
};

type FarcasterSendResponse = {
  result?: {
    successfulTokens: string[];
    invalidTokens: string[];
    rateLimitedTokens: string[];
  };
};

function resolveTargetUrl(targetUrl?: string): string {
  return (
    targetUrl ||
    process.env.NEXT_PUBLIC_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  );
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.MINIKIT_NOTIFY_SECRET;
  if (!secret || secret.trim().length === 0) return false;

  return request.headers.get('x-notify-secret') === secret.trim();
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as SendNotificationRequest | null;
    if (!body?.title || !body.body) {
      return NextResponse.json({ error: 'Missing required fields: title, body' }, { status: 400 });
    }

    const allTokens = await getAllNotificationTokens();
    const selectedTokens = Array.isArray(body.fids) && body.fids.length > 0
      ? allTokens.filter((entry) => body.fids?.includes(entry.fid))
      : allTokens;

    if (selectedTokens.length === 0) {
      return NextResponse.json({ error: 'No notification subscribers available' }, { status: 404 });
    }

    const groupedByUrl = new Map<string, typeof selectedTokens>();
    for (const entry of selectedTokens) {
      const existing = groupedByUrl.get(entry.url);
      if (existing) {
        existing.push(entry);
      } else {
        groupedByUrl.set(entry.url, [entry]);
      }
    }

    const targetUrl = resolveTargetUrl(body.targetUrl);
    const results = [] as Array<{
      url: string;
      requested: number;
      successfulTokens: string[];
      invalidTokens: string[];
      rateLimitedTokens: string[];
    }>;

    for (const [url, entries] of groupedByUrl.entries()) {
      const payload: FarcasterSendRequest = {
        notificationId: crypto.randomUUID(),
        title: body.title,
        body: body.body,
        targetUrl,
        tokens: entries.map((entry) => entry.token),
      };

      const delivery = await deliverNotificationWithRetry<FarcasterSendResponse>(url, payload, {
        maxAttempts: 3,
        initialDelayMs: 300,
      });

      if (!delivery.ok) {
        results.push({
          url,
          requested: entries.length,
          successfulTokens: [],
          invalidTokens: entries.map((entry) => entry.token),
          rateLimitedTokens: [],
        });
        console.error(
          '[send-notification] upstream failed',
          JSON.stringify({ url, status: delivery.status, attempts: delivery.attempts, upstream: delivery.rawBody }),
        );
        continue;
      }

      const parsed = delivery.parsed;
      if (!parsed?.result) {
        results.push({
          url,
          requested: entries.length,
          successfulTokens: [],
          invalidTokens: entries.map((entry) => entry.token),
          rateLimitedTokens: [],
        });
        console.error(
          '[send-notification] invalid upstream payload',
          JSON.stringify({ url, attempts: delivery.attempts, upstream: delivery.rawBody }),
        );
        continue;
      }

      const successfulTokens = parsed.result?.successfulTokens ?? [];
      const invalidTokens = parsed.result?.invalidTokens ?? [];
      const rateLimitedTokens = parsed.result?.rateLimitedTokens ?? [];

      for (const invalidToken of invalidTokens) {
        const entry = entries.find((item) => item.token === invalidToken);
        if (entry) {
          await deleteNotificationToken(entry.fid);
        }
      }

      results.push({
        url,
        requested: entries.length,
        successfulTokens,
        invalidTokens,
        rateLimitedTokens,
      });

      console.log(
        '[send-notification] delivery',
        JSON.stringify({ url, attempts: delivery.attempts, requested: entries.length, success: successfulTokens.length, invalid: invalidTokens.length, rateLimited: rateLimitedTokens.length }),
      );
    }

    return NextResponse.json({
      ok: true,
      requestedSubscribers: selectedTokens.length,
      deliveredSubscribers: results.reduce((sum, item) => sum + item.successfulTokens.length, 0),
      invalidSubscribers: results.reduce((sum, item) => sum + item.invalidTokens.length, 0),
      rateLimitedSubscribers: results.reduce((sum, item) => sum + item.rateLimitedTokens.length, 0),
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send notifications' },
      { status: 500 },
    );
  }
}