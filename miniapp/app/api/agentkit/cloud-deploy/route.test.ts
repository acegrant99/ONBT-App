import { afterEach, describe, expect, it } from 'vitest';
import { POST } from './route';

const ORIGINAL_ENV = process.env;

function makeRequest(headers?: Record<string, string>): Request {
  return new Request('http://localhost:3000/api/agentkit/cloud-deploy', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(headers || {}),
    },
    body: JSON.stringify({ action: 'deploy' }),
  });
}

describe('/api/agentkit/cloud-deploy auth hardening', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns 401 when no server admin token is configured', async () => {
    delete process.env.AGENTKIT_ADMIN_TOKEN;
    delete process.env.QUANTUM_ADMIN_TOKEN;

    const response = await POST(makeRequest());
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.error).toBe('Unauthorized cloud deploy request');
  });

  it('returns 401 when provided token does not match', async () => {
    process.env.AGENTKIT_ADMIN_TOKEN = 'expected-agentkit-token';

    const response = await POST(
      makeRequest({ 'x-agentkit-admin-token': 'wrong-token' })
    );

    expect(response.status).toBe(401);
  });
});
