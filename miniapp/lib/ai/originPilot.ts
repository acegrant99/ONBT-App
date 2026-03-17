/**
 * Origin Pilot — OpenAI-compatible LLM client for the Quantum AI advisor.
 *
 * Reads the ORIGIN_PILOT_API bearer token from env.
 * Reads ORIGIN_PILOT_URL for a custom/self-hosted base URL
 * (default: https://api.openai.com/v1).
 * Reads ORIGIN_PILOT_MODEL for the model name
 * (default: gpt-4o-mini).
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OriginPilotOptions {
  /** Override the model for this call. Falls back to ORIGIN_PILOT_MODEL env var then gpt-4o-mini. */
  model?: string;
  /** Maximum tokens in the completion. Default: 1400. */
  maxTokens?: number;
  /** Sampling temperature 0–2. Default: 0.7. */
  temperature?: number;
  /** AbortSignal for timeout / cancellation. */
  signal?: AbortSignal;
}

/** Returns true when ORIGIN_PILOT_API is present in the environment. */
export function isOriginPilotConfigured(): boolean {
  return Boolean(process.env.ORIGIN_PILOT_API?.trim());
}

/** The base URL for completions requests. */
export function originPilotBaseUrl(): string {
  return process.env.ORIGIN_PILOT_URL?.trim() || 'https://api.openai.com/v1';
}

/** The default model to use. */
export function originPilotModel(): string {
  return process.env.ORIGIN_PILOT_MODEL?.trim() || 'gpt-4o-mini';
}

/**
 * Call the Origin Pilot LLM endpoint.
 *
 * @throws When ORIGIN_PILOT_API is not set.
 * @throws When the API returns a non-2xx status.
 */
export async function callOriginPilot(
  messages: ChatMessage[],
  options: OriginPilotOptions = {}
): Promise<string> {
  const apiKey = process.env.ORIGIN_PILOT_API?.trim();
  if (!apiKey) {
    throw new Error('ORIGIN_PILOT_API is not configured');
  }

  const baseUrl = originPilotBaseUrl();
  const url = `${baseUrl}/chat/completions`;

  const body = JSON.stringify({
    model: options.model || originPilotModel(),
    messages,
    max_tokens: options.maxTokens ?? 1400,
    temperature: options.temperature ?? 0.7,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body,
    cache: 'no-store',
    signal: options.signal,
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = await response.text();
      detail = ` — ${errBody.slice(0, 280)}`;
    } catch {
      // ignore
    }
    throw new Error(`Origin Pilot API error ${response.status}${detail}`);
  }

  interface CompletionResponse {
    choices?: { message?: { content?: string } }[];
  }

  const payload = (await response.json()) as CompletionResponse;
  return payload.choices?.[0]?.message?.content?.trim() ?? '';
}

/**
 * Convenience wrapper that parses a JSON block from the LLM response.
 * The LLM is instructed to return pure JSON; this extracts the JSON
 * even if the model wraps it in a markdown code fence.
 */
export async function callOriginPilotJSON<T>(
  messages: ChatMessage[],
  options: OriginPilotOptions = {}
): Promise<T> {
  const text = await callOriginPilot(messages, options);

  // Strip possible ```json ... ``` fences
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  return JSON.parse(cleaned) as T;
}
