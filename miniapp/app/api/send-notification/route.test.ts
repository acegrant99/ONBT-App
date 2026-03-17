import { afterEach, describe, expect, it } from 'vitest';
import { POST } from './route';

const ORIGINAL_ENV = process.env;

function makeRequest(headers?: Record<string, string>, body?: unknown): Request {
  return new Request('http://localhost:3000/api/send-notification', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(headers || {}),
    },
    body: JSON.stringify(body ?? {}),
  });
}

describe('/api/send-notification auth hardening', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns 401 when MINIKIT_NOTIFY_SECRET is not configured', async () => {
    delete process.env.MINIKIT_NOTIFY_SECRET;

    const response = await POST(makeRequest(undefined, { title: 'A', body: 'B' }));
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.error).toBe('Unauthorized');
  });

  it('returns 401 when x-notify-secret does not match', async () => {
    process.env.MINIKIT_NOTIFY_SECRET = 'expected-secret';

    const response = await POST(
      makeRequest({ 'x-notify-secret': 'wrong-secret' }, { title: 'A', body: 'B' })
    );

    expect(response.status).toBe(401);
  });

  it('passes auth when x-notify-secret matches and reaches payload validation', async () => {
    process.env.MINIKIT_NOTIFY_SECRET = 'expected-secret';

    const response = await POST(
      makeRequest({ 'x-notify-secret': 'expected-secret' }, { title: '', body: '' })
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain('Missing required fields');
  });
});
