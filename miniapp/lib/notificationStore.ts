import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

/**
 * Notification token store — persists Farcaster push-notification tokens
 * received from the webhook lifecycle events.
 *
 * Storage priority:
 * 1. Standard Redis TCP (REDIS_URL — Redis Labs, self-hosted, etc.)
 * 2. Upstash / Vercel KV Redis REST (UPSTASH_REDIS_REST_URL + token)
 * 3. Local JSON file fallback for development durability across restarts.
 */

export interface NotificationToken {
  /** Farcaster FID of the token owner. */
  fid: number;
  /** Push token issued by the Farcaster client. */
  token: string;
  /** Endpoint URL to send the notification to. */
  url: string;
  /** ISO timestamp of when the token was stored. */
  storedAt: string;
}

const STORAGE_DIR = process.env.ONBT_NOTIFICATION_STORE_DIR?.trim() || path.join(os.tmpdir(), 'onbt-miniapp');
const STORAGE_FILE = path.join(STORAGE_DIR, 'notification-store.json');
const REDIS_INDEX_KEY = 'onbt:notification-token:fids';

// ─── Backend detection ────────────────────────────────────────────────────────

type StorageMode = 'redis-tcp' | 'redis-rest' | 'file-fallback';

function detectStorageMode(): StorageMode {
  if (process.env.REDIS_URL?.trim()) return 'redis-tcp';

  const restUrl = (
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    process.env.REDIS_API_URL
  )?.trim();
  const restToken = (
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    process.env.REDIS_API_KEY
  )?.trim();

  if (restUrl && restToken) return 'redis-rest';
  return 'file-fallback';
}

export function notificationTokenStorageMode(): StorageMode {
  return detectStorageMode();
}

function isFileFallbackAllowed(): boolean {
  if (process.env.MINIKIT_ALLOW_FILE_FALLBACK === 'true') return true;
  return process.env.NODE_ENV !== 'production';
}

function requiresRedis(): boolean {
  return !isFileFallbackAllowed();
}

function assertPersistenceConfigured() {
  if (detectStorageMode() === 'file-fallback' && requiresRedis()) {
    throw new Error(
      'Notification persistence requires Redis in this environment. Configure REDIS_URL (standard Redis), or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash), or set MINIKIT_ALLOW_FILE_FALLBACK=true.',
    );
  }
}

function redisTokenKey(fid: number): string {
  return `onbt:notification-token:${fid}`;
}

// ─── ioredis TCP backend ──────────────────────────────────────────────────────

interface IRedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<string | 'OK' | null>;
  del(...keys: string[]): Promise<number>;
  sadd(key: string, ...members: Array<string | number>): Promise<number>;
  srem(key: string, ...members: Array<string | number>): Promise<number>;
  smembers(key: string): Promise<string[]>;
}

// Persistent singleton across Next.js hot-reloads
const _g = globalThis as { __onbt_ioredis?: IRedisClient };

function getIoRedisClient(): IRedisClient {
  if (_g.__onbt_ioredis) return _g.__onbt_ioredis;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { default: Redis } = require('ioredis') as { default: new (url: string, opts?: object) => IRedisClient };
  const client = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  });
  _g.__onbt_ioredis = client;
  return client;
}

// ─── Upstash REST backend ─────────────────────────────────────────────────────

function restConfig() {
  const url = (
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    process.env.REDIS_API_URL
  )?.trim();
  const token = (
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    process.env.REDIS_API_KEY
  )?.trim();
  return { url, token };
}

async function redisRequest<T>(segments: Array<string | number>): Promise<T | null> {
  const config = restConfig();
  if (!config.url || !config.token) {
    if (requiresRedis()) {
      throw new Error('Redis is required for notification persistence but is not configured.');
    }
    return null;
  }

  const endpoint = `${config.url}/${segments.map((segment) => encodeURIComponent(String(segment))).join('/')}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (requiresRedis()) {
        throw new Error(`Redis REST command failed with status ${response.status}`);
      }
      return null;
    }

    const payload = (await response.json().catch(() => null)) as { result?: T } | null;
    return payload?.result ?? null;
  } catch (error) {
    if (requiresRedis()) {
      throw error instanceof Error ? error : new Error('Redis REST command failed.');
    }
    return null;
  }
}

function normalizeToken(value: unknown): NotificationToken | null {
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Partial<NotificationToken>;
  if (!Number.isInteger(candidate.fid) || candidate.fid! <= 0) return null;
  if (typeof candidate.token !== 'string' || !candidate.token) return null;
  if (typeof candidate.url !== 'string' || !candidate.url) return null;

  return {
    fid: candidate.fid!,
    token: candidate.token,
    url: candidate.url,
    storedAt:
      typeof candidate.storedAt === 'string' && candidate.storedAt
        ? candidate.storedAt
        : new Date().toISOString(),
  };
}

async function ensureStorageDir() {
  await mkdir(STORAGE_DIR, { recursive: true });
}

async function readFileStore(): Promise<Record<string, NotificationToken>> {
  try {
    const raw = await readFile(STORAGE_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const normalized: Record<string, NotificationToken> = {};

    for (const [key, value] of Object.entries(parsed)) {
      const token = normalizeToken(value);
      if (token) {
        normalized[key] = token;
      }
    }

    return normalized;
  } catch {
    return {};
  }
}

async function writeFileStore(store: Record<string, NotificationToken>): Promise<void> {
  await ensureStorageDir();
  const tempFile = `${STORAGE_FILE}.tmp`;
  await writeFile(tempFile, JSON.stringify(store, null, 2), 'utf-8');
  await rename(tempFile, STORAGE_FILE);
}

async function setTokenFileFallback(fid: number, token: string, url: string): Promise<void> {
  const store = await readFileStore();
  store[String(fid)] = {
    fid,
    token,
    url,
    storedAt: new Date().toISOString(),
  };
  await writeFileStore(store);
}

async function deleteTokenFileFallback(fid: number): Promise<void> {
  const store = await readFileStore();
  delete store[String(fid)];
  await writeFileStore(store);
}

async function getTokenFileFallback(fid: number): Promise<NotificationToken | null> {
  const store = await readFileStore();
  return store[String(fid)] ?? null;
}

async function getAllTokensFileFallback(): Promise<NotificationToken[]> {
  const store = await readFileStore();
  return Object.values(store);
}

/** Save or update a notification token for a user. */
export async function setNotificationToken(
  fid: number,
  token: string,
  url: string,
): Promise<void> {
  assertPersistenceConfigured();

  const record: NotificationToken = {
    fid,
    token,
    url,
    storedAt: new Date().toISOString(),
  };
  const serialized = JSON.stringify(record);

  if (detectStorageMode() === 'redis-tcp') {
    const client = getIoRedisClient();
    await client.set(redisTokenKey(fid), serialized);
    await client.sadd(REDIS_INDEX_KEY, fid);
    return;
  }

  const redisStored = await redisRequest<string>([
    'set',
    redisTokenKey(fid),
    serialized,
  ]);

  if (redisStored === 'OK') {
    await redisRequest<number>(['sadd', REDIS_INDEX_KEY, fid]);
    return;
  }

  await setTokenFileFallback(fid, token, url);
}

/** Remove the notification token for a user (frame removed / notifications disabled). */
export async function deleteNotificationToken(fid: number): Promise<void> {
  assertPersistenceConfigured();

  if (detectStorageMode() === 'redis-tcp') {
    const client = getIoRedisClient();
    await client.del(redisTokenKey(fid));
    await client.srem(REDIS_INDEX_KEY, fid);
    return;
  }

  const redisDeleted = await redisRequest<number>(['del', redisTokenKey(fid)]);
  if (redisDeleted !== null) {
    await redisRequest<number>(['srem', REDIS_INDEX_KEY, fid]);
    return;
  }

  await deleteTokenFileFallback(fid);
}

/** Retrieve the notification token for a user, or null if not stored. */
export async function getNotificationToken(fid: number): Promise<NotificationToken | null> {
  assertPersistenceConfigured();

  if (detectStorageMode() === 'redis-tcp') {
    const client = getIoRedisClient();
    const raw = await client.get(redisTokenKey(fid));
    if (raw === null) return null;
    return normalizeToken(JSON.parse(raw));
  }

  const redisValue = await redisRequest<string | NotificationToken>(['get', redisTokenKey(fid)]);
  if (redisValue !== null) {
    if (typeof redisValue === 'string') {
      return normalizeToken(JSON.parse(redisValue));
    }
    return normalizeToken(redisValue);
  }

  return getTokenFileFallback(fid);
}

/** Return all stored tokens (for broadcast notifications). */
export async function getAllNotificationTokens(): Promise<NotificationToken[]> {
  assertPersistenceConfigured();

  if (detectStorageMode() === 'redis-tcp') {
    const client = getIoRedisClient();
    const members = await client.smembers(REDIS_INDEX_KEY);
    const tokens = await Promise.all(
      members.map(async (fidStr) => {
        const fid = Number(fidStr);
        if (!Number.isInteger(fid) || fid <= 0) return null;
        return getNotificationToken(fid);
      }),
    );
    return tokens.filter((t): t is NotificationToken => Boolean(t));
  }

  const redisMembers = await redisRequest<Array<string | number>>(['smembers', REDIS_INDEX_KEY]);
  if (redisMembers) {
    const tokens = await Promise.all(
      redisMembers.map(async (fidValue) => {
        const fid = Number(fidValue);
        if (!Number.isInteger(fid) || fid <= 0) {
          return null;
        }

        return getNotificationToken(fid);
      }),
    );

    return tokens.filter((entry): entry is NotificationToken => Boolean(entry));
  }

  return getAllTokensFileFallback();
}
