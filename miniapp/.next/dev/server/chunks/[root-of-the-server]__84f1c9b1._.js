module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[project]/app/api/agentkit/dependency-health/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "revalidate",
    ()=>revalidate,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
;
;
;
const runtime = 'nodejs';
const dynamic = 'force-dynamic';
const revalidate = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;
let cache = null;
const TRACKED_PACKAGES = [
    'next',
    'react',
    'wagmi',
    'viem',
    '@coinbase/onchainkit',
    '@coinbase/agentkit',
    'typescript'
];
const CRITICAL_PACKAGES = new Set([
    'next',
    'react',
    'wagmi',
    'viem',
    '@coinbase/onchainkit',
    '@coinbase/agentkit'
]);
const FEATURE_PACK_DEFINITIONS = [
    {
        key: 'data-viz-pro',
        title: 'Data Viz Pro',
        objective: 'Richer quantum and onchain charts for decision-grade dashboards.',
        dependencies: [
            'recharts',
            'd3-scale',
            'lightweight-charts'
        ]
    },
    {
        key: 'motion-cinema',
        title: 'Motion Cinema',
        objective: 'Intentional motion scenes and orchestration for premium UI moments.',
        dependencies: [
            'framer-motion',
            'gsap'
        ]
    },
    {
        key: 'validation-safety',
        title: 'Validation Safety',
        objective: 'Schema-safe API boundaries and stronger runtime parsing.',
        dependencies: [
            'zod',
            'valibot'
        ]
    },
    {
        key: 'observability-core',
        title: 'Observability Core',
        objective: 'Actionable production diagnostics and user-impact tracking.',
        dependencies: [
            '@sentry/nextjs',
            'posthog-js'
        ]
    },
    {
        key: 'testing-velocity',
        title: 'Testing Velocity',
        objective: 'Fast confidence loops for UI and integration behavior.',
        dependencies: [
            'vitest',
            '@testing-library/react',
            '@playwright/test'
        ]
    }
];
function normalizeVersion(raw) {
    const withoutAlias = raw.startsWith('npm:') ? raw.split('@').pop() || raw : raw;
    const cleaned = withoutAlias.trim().replace(/^[^0-9]*/, '');
    return cleaned || raw.trim();
}
function parseSemver(version) {
    const match = normalizeVersion(version).match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;
    return [
        Number(match[1]),
        Number(match[2]),
        Number(match[3])
    ];
}
function classifyUpdate(current, latest) {
    const a = parseSemver(current);
    const b = parseSemver(latest);
    if (!a || !b) return 'unknown';
    if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) return 'up-to-date';
    if (b[0] > a[0]) return 'major-available';
    if (b[1] > a[1]) return 'minor-available';
    if (b[2] > a[2]) return 'patch-available';
    return 'unknown';
}
async function fetchLatestVersion(pkg) {
    try {
        const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`, {
            cache: 'no-store'
        });
        if (!response.ok) return null;
        const body = await response.json();
        return body['dist-tags']?.latest || null;
    } catch  {
        return null;
    }
}
async function GET() {
    const now = Date.now();
    if (cache && cache.expiresAt > now) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cache.result);
    }
    const packagePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), 'package.json');
    const packageLockPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), 'package-lock.json');
    const rawPackage = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(packagePath, 'utf-8');
    const pkg = JSON.parse(rawPackage);
    const installed = {
        ...pkg.dependencies || {},
        ...pkg.devDependencies || {}
    };
    const updates = [];
    for (const name of TRACKED_PACKAGES){
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
                notes: 'Unable to reach npm registry for latest version.'
            });
            continue;
        }
        const status = classifyUpdate(current, latest);
        const critical = CRITICAL_PACKAGES.has(name) && (status === 'major-available' || status === 'minor-available');
        updates.push({
            name,
            current,
            latest,
            status,
            critical
        });
    }
    const criticalUpdates = updates.filter((item)=>item.critical);
    const featurePacks = FEATURE_PACK_DEFINITIONS.map((pack)=>{
        const installedCount = pack.dependencies.filter((dep)=>Boolean(installed[dep])).length;
        const coverage = pack.dependencies.length > 0 ? installedCount / pack.dependencies.length : 0;
        const status = coverage >= 0.99 ? 'ready' : coverage > 0 ? 'partial' : 'missing';
        return {
            key: pack.key,
            title: pack.title,
            objective: pack.objective,
            dependencies: pack.dependencies,
            installedCount,
            coverage: Number(coverage.toFixed(2)),
            status
        };
    });
    const packCoverageAvg = featurePacks.length > 0 ? featurePacks.reduce((sum, item)=>sum + item.coverage, 0) / featurePacks.length : 0;
    const packageLockPresent = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(packageLockPath, 'utf-8').then(()=>true).catch(()=>false);
    const checks = [
        {
            label: 'Tracked Dependency Coverage',
            status: updates.length >= 5 ? 'pass' : 'warn',
            detail: updates.length >= 5 ? `Monitoring ${updates.length} critical packages.` : `Only ${updates.length} tracked packages found in package.json.`
        },
        {
            label: 'Lockfile Integrity',
            status: packageLockPresent ? 'pass' : 'warn',
            detail: packageLockPresent ? 'package-lock.json detected.' : 'package-lock.json missing; reproducibility risk is higher.'
        },
        {
            label: 'Critical Updates',
            status: criticalUpdates.length === 0 ? 'pass' : 'warn',
            detail: criticalUpdates.length === 0 ? 'No critical major/minor updates detected.' : `${criticalUpdates.length} critical package update(s) detected.`
        },
        {
            label: 'Feature Pack Coverage',
            status: packCoverageAvg >= 0.75 ? 'pass' : packCoverageAvg >= 0.35 ? 'warn' : 'fail',
            detail: packCoverageAvg >= 0.75 ? `Feature foundations are strong (${Math.round(packCoverageAvg * 100)}% average coverage).` : `Feature expansion opportunity detected (${Math.round(packCoverageAvg * 100)}% average coverage).`
        }
    ];
    const summary = criticalUpdates.length === 0 ? 'Dependency integrity is stable. No critical package updates require immediate action.' : 'Critical package updates detected. Review advisor panel update list before next production deploy.';
    const result = {
        ok: true,
        mode: 'dependency-health',
        summary,
        checkedAt: new Date().toISOString(),
        criticalUpdates,
        updates,
        checks,
        featurePacks
    };
    cache = {
        result,
        expiresAt: now + CACHE_TTL_MS
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84f1c9b1._.js.map