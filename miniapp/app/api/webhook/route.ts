import { NextResponse } from 'next/server';
import { createPublicKey, verify } from 'node:crypto';
import {
  setNotificationToken,
  deleteNotificationToken,
} from '@/lib/notificationStore';

/**
 * Farcaster Mini App webhook endpoint.
 *
 * Farcaster sends a signed JFS (JSON Farcaster Signature) envelope:
 *   { header: base64url, payload: base64url, signature: base64url }
 *
 * header (decoded): { fid: number, type: string, key: string }
 * payload (decoded): one of the MiniAppServerEvent union members
 *
 * Full cryptographic Ed25519 verification against a Farcaster Hub would be
 * added before enabling production push sends. For now we decode and store.
 *
 * Reference: https://miniapps.farcaster.xyz/docs/guides/notifications
 */

interface JFSHeader {
  fid: number;
  type: string;
  key: string;
}

interface NotificationDetails {
  token: string;
  url: string;
}

type WebhookEvent =
  | { event: 'miniapp_added'; notificationDetails?: NotificationDetails }
  | { event: 'miniapp_removed' }
  | { event: 'notifications_enabled'; notificationDetails: NotificationDetails }
  | { event: 'notifications_disabled' }
  // legacy casing kept for backwards compat
  | { event: 'frame_added'; notificationDetails?: NotificationDetails }
  | { event: 'frame_removed' };

type RawWebhookBody = {
  header?: string;
  payload?: string;
  signature?: string;
  /** FID present in plain-JSON (non-JFS) webhook payloads. */
  fid?: number;
  event?: string;
  notificationDetails?: NotificationDetails;
};

function decodeBase64UrlBytes(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = padded.length % 4;
  const base64 = remainder === 0 ? padded : padded + '='.repeat(4 - remainder);
  return Buffer.from(base64, 'base64');
}

function decodeBase64Url(input: string): unknown {
  const json = decodeBase64UrlBytes(input).toString('utf-8');
  return JSON.parse(json);
}

function decodePublicKey(rawKey: string): Buffer | null {
  const key = rawKey.trim();
  if (!key) return null;

  if (/^[0-9a-fA-F]{64}$/.test(key)) {
    return Buffer.from(key, 'hex');
  }

  if (/^0x[0-9a-fA-F]{64}$/.test(key)) {
    return Buffer.from(key.slice(2), 'hex');
  }

  try {
    const asB64Url = decodeBase64UrlBytes(key);
    if (asB64Url.length === 32) return asB64Url;
  } catch {
    // noop
  }

  try {
    const asB64 = Buffer.from(key, 'base64');
    if (asB64.length === 32) return asB64;
  } catch {
    // noop
  }

  return null;
}

function isValidNotificationDetails(value: unknown): value is NotificationDetails {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<NotificationDetails>;
  if (typeof candidate.token !== 'string' || !candidate.token.trim()) return false;
  if (typeof candidate.url !== 'string' || !candidate.url.trim()) return false;

  try {
    const parsed = new URL(candidate.url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function requiresSignatureVerification(): boolean {
  if (process.env.MINIKIT_REQUIRE_JFS_SIGNATURE === 'false') return false;
  return process.env.NODE_ENV === 'production' || process.env.MINIKIT_REQUIRE_JFS_SIGNATURE === 'true';
}

function verifyJfsEnvelope(headerB64Url: string, payloadB64Url: string, signatureB64Url: string, key: string): boolean {
  const keyBytes = decodePublicKey(key);
  if (!keyBytes || keyBytes.length !== 32) {
    return false;
  }

  const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
  const spkiKey = Buffer.concat([spkiPrefix, keyBytes]);
  const publicKey = createPublicKey({ key: spkiKey, format: 'der', type: 'spki' });
  const signedMessage = Buffer.from(`${headerB64Url}.${payloadB64Url}`, 'utf-8');
  const signature = decodeBase64UrlBytes(signatureB64Url);

  return verify(null, signedMessage, publicKey, signature);
}

function parseWebhookEvent(input: RawWebhookBody): { fid?: number; event: WebhookEvent } | null {
  let fid: number | undefined;
  let event: WebhookEvent | null = null;

  if (input.header && input.payload) {
    const header = decodeBase64Url(input.header) as JFSHeader;
    const payload = decodeBase64Url(input.payload) as WebhookEvent;

    if (!Number.isInteger(header.fid) || header.fid <= 0 || typeof header.key !== 'string' || !header.key.trim()) {
      return null;
    }

    if (requiresSignatureVerification()) {
      if (!input.signature) {
        return null;
      }

      if (!verifyJfsEnvelope(input.header, input.payload, input.signature, header.key)) {
        return null;
      }
    }

    fid = header.fid;
    event = payload;
  } else if (input.event) {
    event = input as WebhookEvent;
    // Plain-JSON (non-JFS) path — extract fid from body if present
    if (Number.isInteger(input.fid) && input.fid! > 0) {
      fid = input.fid;
    }
  }

  if (!event) return null;

  const validEvent = new Set([
    'miniapp_added',
    'miniapp_removed',
    'notifications_enabled',
    'notifications_disabled',
    'frame_added',
    'frame_removed',
  ]);

  if (!validEvent.has((event as { event?: string }).event || '')) {
    return null;
  }

  if ((event.event === 'miniapp_added' || event.event === 'frame_added') && event.notificationDetails) {
    if (!isValidNotificationDetails(event.notificationDetails)) {
      return null;
    }
  }

  if (event.event === 'notifications_enabled' && !isValidNotificationDetails(event.notificationDetails)) {
    return null;
  }

  return { fid, event };
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RawWebhookBody;
    const parsed = parseWebhookEvent(body);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid webhook envelope or event payload' }, { status: 400 });
    }

    const { fid, event } = parsed;

    switch (event.event) {
      case 'miniapp_added':
      case 'frame_added':
        if (fid && event.notificationDetails) {
          await setNotificationToken(fid, event.notificationDetails.token, event.notificationDetails.url);
          console.log(`[webhook] ${event.event}: stored token for fid=${fid}`);
        } else {
          console.log(`[webhook] ${event.event}: no notification details or fid — skipping token store`);
        }
        break;

      case 'miniapp_removed':
      case 'frame_removed':
        if (fid) {
          await deleteNotificationToken(fid);
          console.log(`[webhook] ${event.event}: removed token for fid=${fid}`);
        }
        break;

      case 'notifications_enabled':
        if (fid) {
          await setNotificationToken(fid, event.notificationDetails.token, event.notificationDetails.url);
          console.log(`[webhook] notifications_enabled: stored token for fid=${fid}`);
        }
        break;

      case 'notifications_disabled':
        if (fid) {
          await deleteNotificationToken(fid);
          console.log(`[webhook] notifications_disabled: removed token for fid=${fid}`);
        }
        break;

      default:
        console.warn('[webhook] unknown event:', (event as { event: string }).event);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
