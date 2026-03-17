type DeliveryResult<TParsed = unknown> = {
  ok: boolean;
  status: number;
  attempts: number;
  rawBody: string;
  parsed?: TParsed;
};

type DeliveryOptions = {
  maxAttempts?: number;
  initialDelayMs?: number;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

export async function deliverNotificationWithRetry<TParsed = unknown>(
  url: string,
  payload: unknown,
  options: DeliveryOptions = {},
): Promise<DeliveryResult<TParsed>> {
  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  const initialDelayMs = Math.max(50, options.initialDelayMs ?? 300);

  let lastStatus = 0;
  let lastRawBody = '';

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const rawBody = await response.text();
      lastStatus = response.status;
      lastRawBody = rawBody;

      if (response.ok) {
        let parsed: TParsed | undefined;
        try {
          parsed = JSON.parse(rawBody) as TParsed;
        } catch {
          parsed = undefined;
        }

        return {
          ok: true,
          status: response.status,
          attempts: attempt,
          rawBody,
          parsed,
        };
      }

      if (attempt < maxAttempts && shouldRetryStatus(response.status)) {
        const delay = initialDelayMs * 2 ** (attempt - 1);
        await sleep(delay);
        continue;
      }

      return {
        ok: false,
        status: response.status,
        attempts: attempt,
        rawBody,
      };
    } catch (error) {
      lastStatus = 0;
      lastRawBody = error instanceof Error ? error.message : 'Network error';

      if (attempt < maxAttempts) {
        const delay = initialDelayMs * 2 ** (attempt - 1);
        await sleep(delay);
        continue;
      }

      return {
        ok: false,
        status: 0,
        attempts: attempt,
        rawBody: lastRawBody,
      };
    }
  }

  return {
    ok: false,
    status: lastStatus,
    attempts: maxAttempts,
    rawBody: lastRawBody,
  };
}