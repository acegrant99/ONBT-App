/**
 * Origin Brain — TypeScript HTTP client for OriginQC's LLM service.
 *
 * Calls the Origin Brain OpenAI-compatible API directly via fetch.
 * Quantum ML signals are produced separately by nabat_quantum_ai.py
 * (VQNet/pyvqnet VQC classifier) via /api/quantum/predict — that is the
 * correct use of pyvqnet in this stack.
 *
 * Env vars:
 *   ORIGIN_PILOT_API   – OriginQC Origin Brain bearer token (required)
 *   ORIGIN_PILOT_URL   – API base URL (default: https://qcloud.originqc.com.cn/api/v1)
 *   ORIGIN_PILOT_MODEL – Model name (default: Qwen2.5-72B-Instruct)
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OriginPilotOptions {
  /** Override the model for this call. Falls back to ORIGIN_PILOT_MODEL env var. */
  model?: string;
  /** Maximum tokens in the completion. Default: 1400. */
  maxTokens?: number;
  /** Sampling temperature 0–2. Default: 0.7. */
  temperature?: number;
  /** Optional AbortSignal for request cancellation. */
  signal?: AbortSignal;
}

/** Returns true when ORIGIN_PILOT_API is configured. */
export function isOriginPilotConfigured(): boolean {
  return Boolean(process.env.ORIGIN_PILOT_API?.trim());
}

/** The API base URL for Origin Brain requests. */
export function originPilotBaseUrl(): string {
  return (
    process.env.ORIGIN_PILOT_URL?.trim() ||
    'https://qcloud.originqc.com.cn/api/v1'
  );
}

/** The default model to use. */
export function originPilotModel(): string {
  return process.env.ORIGIN_PILOT_MODEL?.trim() || 'Qwen2.5-72B-Instruct';
}

/**
 * Call the Origin Brain LLM API directly via fetch.
 *
 * @throws When ORIGIN_PILOT_API is not set.
 * @throws When the API returns a non-2xx response.
 */
export async function callOriginPilot(
  messages: ChatMessage[],
  options: OriginPilotOptions = {}
): Promise<string> {
  const apiKey = process.env.ORIGIN_PILOT_API?.trim();
  if (!apiKey) {
    throw new Error('ORIGIN_PILOT_API is not configured');
  }

  const url = `${originPilotBaseUrl()}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: options.model ?? originPilotModel(),
      messages,
      max_tokens: options.maxTokens ?? 1400,
      temperature: options.temperature ?? 0.7,
    }),
    signal: options.signal,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(
      `Origin Brain API ${response.status}: ${errText.slice(0, 300)}`
    );
  }

  const data = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

/**
 * Convenience wrapper that parses a JSON block from the LLM response.
 * Strips markdown code fences if present.
 */
export async function callOriginPilotJSON<T>(
  messages: ChatMessage[],
  options: OriginPilotOptions = {}
): Promise<T> {
  const text = await callOriginPilot(messages, options);

  // Strip possible ```json ... ``` fences
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as T;
}
