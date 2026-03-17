import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import os from 'node:os';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const execFileAsync = promisify(execFile);

export type QpandaSubmitInput = {
  pilotUrl: string;
  apiKey: string;
  shots?: number;
  chipId?: string;
  originIr?: string;
  describe?: string;
  waitResult?: boolean;
};

export type QpandaQueryInput = {
  pilotUrl: string;
  apiKey: string;
  taskId: string;
};

function pythonCandidates(repoRoot: string): string[] {
  return [
    path.join(repoRoot, '.venv', 'Scripts', 'python.exe'),
    path.join(repoRoot, '.venv312', 'Scripts', 'python.exe'),
    path.join(repoRoot, '.venv313', 'Scripts', 'python.exe'),
    'python',
  ];
}

async function runWithPythonFallback(
  repoRoot: string,
  scriptPath: string,
  scriptArgs: string[]
): Promise<{ stdout: string; stderr: string }> {
  const candidates = pythonCandidates(repoRoot);
  let lastError: unknown = null;

  for (const pythonExe of candidates) {
    try {
      return await execFileAsync(pythonExe, [scriptPath, ...scriptArgs], {
        cwd: repoRoot,
        timeout: 70_000,
        windowsHide: true,
        maxBuffer: 4 * 1024 * 1024,
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Unable to run python for QPanda task');
}

export async function submitQpandaTask(input: QpandaSubmitInput): Promise<Record<string, unknown>> {
  const repoRoot = path.resolve(process.cwd(), '..');
  const scriptPath = path.join(repoRoot, 'scripts', 'quantum-ai', 'qpanda_task.py');
  const reportPath = path.join(os.tmpdir(), `onbt_qpanda_submit_${Date.now()}.json`);

  const args: string[] = [
    '--report',
    reportPath,
    'submit',
    '--pilot-url',
    input.pilotUrl,
    '--api-key',
    input.apiKey,
    '--shots',
    String(input.shots ?? 1024),
  ];

  if (input.chipId) args.push('--chip-id', input.chipId);
  if (input.originIr) args.push('--origin-ir', input.originIr);
  if (input.describe) args.push('--describe', input.describe);
  if (input.waitResult) args.push('--wait-result');

  const { stdout, stderr } = await runWithPythonFallback(repoRoot, scriptPath, args);
  const raw = await readFile(reportPath, 'utf-8');
  const parsed = JSON.parse(raw) as Record<string, unknown>;

  return {
    ...parsed,
    diagnostics: {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    },
  };
}

export async function queryQpandaTask(input: QpandaQueryInput): Promise<Record<string, unknown>> {
  const repoRoot = path.resolve(process.cwd(), '..');
  const scriptPath = path.join(repoRoot, 'scripts', 'quantum-ai', 'qpanda_task.py');
  const reportPath = path.join(os.tmpdir(), `onbt_qpanda_query_${Date.now()}.json`);

  const args: string[] = [
    '--report',
    reportPath,
    'query',
    '--pilot-url',
    input.pilotUrl,
    '--api-key',
    input.apiKey,
    '--task-id',
    input.taskId,
  ];

  const { stdout, stderr } = await runWithPythonFallback(repoRoot, scriptPath, args);
  const raw = await readFile(reportPath, 'utf-8');
  const parsed = JSON.parse(raw) as Record<string, unknown>;

  return {
    ...parsed,
    diagnostics: {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    },
  };
}
