import { NextResponse } from 'next/server';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type NpmRegistryResponse = {
  'dist-tags'?: {
    latest?: string;
  };
};

type UpdateStatus = 'up-to-date' | 'patch-available' | 'minor-available' | 'major-available' | 'unknown';

type DependencyUpdate = {
  name: string;
  current: string;
  latest: string;
  status: UpdateStatus;
  critical: boolean;
  notes?: string;
};

type FeaturePack = {
  key: string;
  title: string;
  objective: string;
  dependencies: string[];
  installedCount: number;
  coverage: number;
  status: 'ready' | 'partial' | 'missing';
};

type CachedResult = {
  result: {
    ok: boolean;
    mode: 'dependency-health';
    summary: string;
    checkedAt: string;
    criticalUpdates: DependencyUpdate[];
    updates: DependencyUpdate[];
    checks: Array<{
      label: string;
      status: 'pass' | 'warn' | 'fail';
      detail: string;
    }>;
    featurePacks: FeaturePack[];
  };
  expiresAt: number;
};

const CACHE_TTL_MS = 10 * 60 * 1000;
let cache: CachedResult | null = null;

const TRACKED_PACKAGES = [
  'next',
  'react',
  'wagmi',
  'viem',
  '@coinbase/onchainkit',
  '@coinbase/agentkit',
  'typescript',
] as const;

const CRITICAL_PACKAGES = new Set<string>([
  'next',
  'react',
  'wagmi',
  'viem',
  '@coinbase/onchainkit',
  '@coinbase/agentkit',
]);

const FEATURE_PACK_DEFINITIONS: Array<{
  key: string;
  title: string;
  objective: string;
  dependencies: string[];
}> = [
  {
    key: 'data-viz-pro',
    title: 'Data Viz Pro',
    objective: 'Richer quantum and onchain charts for decision-grade dashboards.',
    dependencies: ['recharts', 'd3-scale', 'lightweight-charts'],
  },
  {
    key: 'motion-cinema',
    title: 'Motion Cinema',
    objective: 'Intentional motion scenes and orchestration for premium UI moments.',
    dependencies: ['framer-motion', 'gsap'],
  },
  {
    key: 'validation-safety',
    title: 'Validation Safety',
    objective: 'Schema-safe API boundaries and stronger runtime parsing.',
    dependencies: ['zod', 'valibot'],
  },
  {
    key: 'observability-core',
    title: 'Observability Core',
    objective: 'Actionable production diagnostics and user-impact tracking.',
    dependencies: ['@sentry/nextjs', 'posthog-js'],
  },
  {
    key: 'testing-velocity',
    title: 'Testing Velocity',
    objective: 'Fast confidence loops for UI and integration behavior.',
    dependencies: ['vitest', '@testing-library/react', '@playwright/test'],
  },
];

function normalizeVersion(raw: string): string {
  const withoutAlias = raw.startsWith('npm:') ? raw.split('@').pop() || raw : raw;
  const cleaned = withoutAlias.trim().replace(/^[^0-9]*/, '');
  return cleaned || raw.trim();
}

function parseSemver(version: string): [number, number, number] | null {
  const match = normalizeVersion(version).match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function classifyUpdate(current: string, latest: string): UpdateStatus {
  const a = parseSemver(current);
  const b = parseSemver(latest);
  if (!a || !b) return 'unknown';
  if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) return 'up-to-date';
  if (b[0] > a[0]) return 'major-available';
  if (b[1] > a[1]) return 'minor-available';
  if (b[2] > a[2]) return 'patch-available';
  return 'unknown';
}

async function fetchLatestVersion(pkg: string): Promise<string | null> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const body = (await response.json()) as NpmRegistryResponse;
    return body['dist-tags']?.latest || null;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return NextResponse.json(cache.result);
  }

  const packagePath = path.join(process.cwd(), 'package.json');
  const packageLockPath = path.join(process.cwd(), 'package-lock.json');

  const rawPackage = await readFile(packagePath, 'utf-8');
  const pkg = JSON.parse(rawPackage) as PackageJson;
  const installed = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };

  const updates: DependencyUpdate[] = [];
  for (const name of TRACKED_PACKAGES) {
    const current = installed[name];
    if (!current) continue;

    const latest = await fetchLatestVersion(name);
    if (!latest) {
      updates.push({
        name,
        current,
        latest: 'unknown',
        status: 'unknown',
        critical: false,
        notes: 'Unable to reach npm registry for latest version.',
      });
      continue;
    }

    const status = classifyUpdate(current, latest);
    const critical = CRITICAL_PACKAGES.has(name) && (status === 'major-available' || status === 'minor-available');
    updates.push({ name, current, latest, status, critical });
  }

  const criticalUpdates = updates.filter((item) => item.critical);

  const featurePacks: FeaturePack[] = FEATURE_PACK_DEFINITIONS.map((pack) => {
    const installedCount = pack.dependencies.filter((dep) => Boolean(installed[dep])).length;
    const coverage = pack.dependencies.length > 0 ? installedCount / pack.dependencies.length : 0;
    const status: FeaturePack['status'] =
      coverage >= 0.99 ? 'ready' : coverage > 0 ? 'partial' : 'missing';

    return {
      key: pack.key,
      title: pack.title,
      objective: pack.objective,
      dependencies: pack.dependencies,
      installedCount,
      coverage: Number(coverage.toFixed(2)),
      status,
    };
  });

  const packCoverageAvg = featurePacks.length > 0
    ? featurePacks.reduce((sum, item) => sum + item.coverage, 0) / featurePacks.length
    : 0;
  const packageLockPresent = await readFile(packageLockPath, 'utf-8')
    .then(() => true)
    .catch(() => false);

  const checks: Array<{ label: string; status: 'pass' | 'warn' | 'fail'; detail: string }> = [
    {
      label: 'Tracked Dependency Coverage',
      status: updates.length >= 5 ? 'pass' : 'warn',
      detail:
        updates.length >= 5
          ? `Monitoring ${updates.length} critical packages.`
          : `Only ${updates.length} tracked packages found in package.json.`,
    },
    {
      label: 'Lockfile Integrity',
      status: packageLockPresent ? 'pass' : 'warn',
      detail: packageLockPresent ? 'package-lock.json detected.' : 'package-lock.json missing; reproducibility risk is higher.',
    },
    {
      label: 'Critical Updates',
      status: criticalUpdates.length === 0 ? 'pass' : 'warn',
      detail:
        criticalUpdates.length === 0
          ? 'No critical major/minor updates detected.'
          : `${criticalUpdates.length} critical package update(s) detected.`,
    },
    {
      label: 'Feature Pack Coverage',
      status: packCoverageAvg >= 0.75 ? 'pass' : packCoverageAvg >= 0.35 ? 'warn' : 'fail',
      detail:
        packCoverageAvg >= 0.75
          ? `Feature foundations are strong (${Math.round(packCoverageAvg * 100)}% average coverage).`
          : `Feature expansion opportunity detected (${Math.round(packCoverageAvg * 100)}% average coverage).`,
    },
  ];

  const summary =
    criticalUpdates.length === 0
      ? 'Dependency integrity is stable. No critical package updates require immediate action.'
      : 'Critical package updates detected. Review advisor panel update list before next production deploy.';

  const result = {
    ok: true,
    mode: 'dependency-health' as const,
    summary,
    checkedAt: new Date().toISOString(),
    criticalUpdates,
    updates,
    checks,
    featurePacks,
  };

  cache = {
    result,
    expiresAt: now + CACHE_TTL_MS,
  };

  return NextResponse.json(result);
}
