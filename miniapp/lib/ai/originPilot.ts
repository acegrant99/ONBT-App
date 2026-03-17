/**
 * Origin Pilot — Python-subprocess LLM client for the Quantum AI advisor.
 *
 * Delegates LLM calls to scripts/quantum-ai/pyvqnet_llm.py via execFile,
 * following the same pattern as qpandaClient.ts → qpanda_task.py.
 *
 * This allows pyvqnet's native LLM module to be dropped in when OriginQC
 * ships one, without touching the TypeScript API layer.
 *
 * Env vars:
 *   ORIGIN_PILOT_API   – OriginQC bearer token (required)
 *   ORIGIN_PILOT_URL   – API base URL (default: https://qcloud.originqc.com.cn/api/v1)
 *   ORIGIN_PILOT_MODEL – Model name (default: Qwen2.5-72B-Instruct)
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import os from 'node:os';
import path from 'node:path';
import { readFile, writeFile, unlink } from 'node:fs/promises';

const execFileAsync = promisify(execFile);

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
  // signal is not forwarded to the subprocess but kept for API compatibility.
  signal?: AbortSignal;
}

/** Returns true when ORIGIN_PILOT_API is configured. */
export function isOriginPilotConfigured(): boolean {
  return Boolean(process.env.ORIGIN_PILOT_API?.trim());
}

/** The base URL used by the Python script. */
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

// ---------------------------------------------------------------------------
// Python subprocess helpers (mirrors qpandaClient.ts)
// ---------------------------------------------------------------------------

function pythonCandidates(repoRoot: string): string[] {
  return [
    path.join(repoRoot, '.venv312', 'Scripts', 'python.exe'),
    path.join(repoRoot, '.venv', 'Scripts', 'python.exe'),
    path.join(repoRoot, '.venv313', 'Scripts', 'python.exe'),
    'python',
  ];
}

async function runPyvqnetLlm(
  repoRoot: string,
  scriptArgs: string[]
): Promise<{ stdout: string; stderr: string }> {
  const scriptPath = path.join(
    repoRoot,
    'scripts',
    'quantum-ai',
    'pyvqnet_llm.py'
  );
  const candidates = pythonCandidates(repoRoot);
  let lastError: unknown = null;

  for (const pythonExe of candidates) {
    try {
      return await execFileAsync(pythonExe, [scriptPath, ...scriptArgs], {
        cwd: repoRoot,
        timeout: 120_000,
        windowsHide: true,
        maxBuffer: 4 * 1024 * 1024,
      });
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Unable to run python for OriginPilot LLM task');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Call the Origin Pilot LLM via the pyvqnet Python script.
 *
 * @throws When ORIGIN_PILOT_API is not set.
 * @throws When the Python script exits with an error.
 */
export async function callOriginPilot(
  messages: ChatMessage[],
  options: OriginPilotOptions = {}
): Promise<string> {
  const apiKey = process.env.ORIGIN_PILOT_API?.trim();
  if (!apiKey) {
    throw new Error('ORIGIN_PILOT_API is not configured');
  }

  const repoRoot = path.resolve(process.cwd(), '..');
  const ts = Date.now();
  const msgsFile = path.join(os.tmpdir(), `onbt_llm_msgs_${ts}.json`);
  const reportFile = path.join(os.tmpdir(), `onbt_llm_report_${ts}.json`);

  // Write messages to a temp file to avoid shell-quoting issues.
  await writeFile(msgsFile, JSON.stringify(messages), 'utf-8');

  const scriptArgs = [
    '--report',
    reportFile,
    '--api-key',
    apiKey,
    '--base-url',
    originPilotBaseUrl(),
    '--model',
    options.model || originPilotModel(),
    '--messages-file',
    msgsFile,
    '--max-tokens',
    String(options.maxTokens ?? 1400),
    '--temperature',
    String(options.temperature ?? 0.7),
  ];

  let stdout = '';
  let stderr = '';
  try {
    ({ stdout, stderr } = await runPyvqnetLlm(repoRoot, scriptArgs));
  } finally {
    // Clean up messages temp file regardless of outcome.
    unlink(msgsFile).catch(() => undefined);
  }

  const raw = await readFile(reportFile, 'utf-8').catch(() => null);
  unlink(reportFile).catch(() => undefined);

  if (!raw) {
    throw new Error(
      `pyvqnet_llm.py produced no report. stderr: ${stderr.slice(0, 400)}`
    );
  }

  interface LlmReport {
    ok: boolean;
    text?: string;
    error?: string;
  }

  const result = JSON.parse(raw) as LlmReport;

  if (!result.ok) {
    throw new Error(
      `OriginPilot LLM error: ${result.error ?? 'unknown'} | stderr: ${stderr.slice(0, 300)}`
    );
  }

  return result.text?.trim() ?? '';
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
